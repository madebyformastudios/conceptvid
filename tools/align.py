"""Align the narration to src/script.json and write src/words.json.

Usage: python3 tools/align.py <video> <whisper-cli -ojf -ml 1 output.json> [total seconds]
  e.g. python3 tools/align.py concert-fees out/cf/vo.json
Reads src/videos/<video>/script.json and public/<video>/voiceover.mp3,
writes src/videos/<video>/words.json.

Produces, per scene, the real start/end time and a timestamp for every
script word, so animation beats land exactly when a word is spoken.
"""
import difflib, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VIDEO = sys.argv.pop(1)
VDIR = ROOT / "src/videos" / VIDEO
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower().replace("fifty", "50"))

whisper = json.load(open(sys.argv[1]))["transcription"]
heard = []  # (norm word, start s, end s)
for seg in whisper:
    for part in seg["text"].replace("-", " ").split():
        n = norm(part)
        if n:
            heard.append((n, seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000))

scenes = json.load(open(VDIR / "script.json"))
words = []  # (scene idx, char offset, norm)
for si, s in enumerate(scenes):
    for m in re.finditer(r"\S+", s["text"]):
        for sub in re.finditer(r"[^\s\-]+", m.group()):
            n = norm(sub.group())
            if n:
                words.append((si, m.start() + sub.start(), n))

sm = difflib.SequenceMatcher(None, [w[2] for w in words], [h[0] for h in heard], autojunk=False)
times = [None] * len(words)
for a, b, size in sm.get_matching_blocks():
    for k in range(size):
        times[a + k] = (heard[b + k][1], heard[b + k][2])
matched = sum(t is not None for t in times)

# Interpolate any script word whisper missed.
known = [i for i, t in enumerate(times) if t]
for i, t in enumerate(times):
    if t is None:
        prev = max((k for k in known if k < i), default=None)
        nxt = min((k for k in known if k > i), default=None)
        if prev is None:
            times[i] = times[nxt]
        elif nxt is None:
            times[i] = times[prev]
        else:
            f = (i - prev) / (nxt - prev)
            st = times[prev][1] + (times[nxt][0] - times[prev][1]) * f
            times[i] = (st, st)

# Snap word starts to real speech onsets: whisper smears pauses into the next word.
import subprocess, struct, math
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(ROOT / "public" / VIDEO / "voiceover.mp3"), "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                     capture_output=True, check=True).stdout
samples = struct.unpack(f"<{len(pcm)//2}h", pcm)
HOP = 160  # 10 ms
rms = [math.sqrt(sum(x * x for x in samples[i:i + HOP]) / HOP) for i in range(0, len(samples) - HOP, HOP)]
peak = max(rms)
loud = [r > peak * 0.06 for r in rms]

def onset(t, end=None):
    """If t sits in (or right before) silence, move it to where speech resumes."""
    i = int(t * 100)
    if i >= len(loud):
        return t
    if loud[i] and (i < 3 or loud[i - 3]):
        # already speaking; walk back to the true onset if it began up to 120 ms earlier
        j = i
        while j > 0 and loud[j - 1] and i - j < 12:
            j -= 1
        return j / 100 if not loud[max(0, j - 1)] else t
    # never push a word past its own end (that would jump into the next sentence)
    lim = 80 if end is None else max(5, min(80, int((end - t) * 100) + 5))
    j = i
    while j < len(loud) and not loud[j] and j - i < lim:
        j += 1
    return j / 100 if j < len(loud) and j - i < lim else t

times = [(onset(st, en), en) for st, en in times]

# Whisper often stamps a sentence's final word at the start of the NEXT sentence.
# If a scene's last word sits glued to the next scene's first word, pull it back
# to just after the word before it.
for si in range(len(scenes) - 1):
    idx = [i for i, w in enumerate(words) if w[0] == si]
    last, prev, nxt = idx[-1], idx[-2] if len(idx) > 1 else None, idx[-1] + 1
    if prev is not None and times[nxt][0] - times[last][0] < 0.25 and times[last][0] - times[prev][0] > 0.5:
        times[last] = (times[prev][0] + 0.3, times[prev][0] + 0.6)

out = []
for si, s in enumerate(scenes):
    idx = [i for i, w in enumerate(words) if w[0] == si]
    out.append({
        "id": s["id"],
        "first": times[idx[0]][0],
        "last": times[idx[-1]][1],
        "words": [[words[i][1], round(times[i][0], 3)] for i in idx],
    })

total = float(sys.argv[2]) if len(sys.argv) > 2 else out[-1]["last"] + 1.5
# Cut between scenes in the pause between the last word and the next first word.
for i, s in enumerate(out):
    s["start"] = 0.0 if i == 0 else round((out[i - 1]["last"] + s["first"]) / 2, 3)
for i, s in enumerate(out):
    s["end"] = round(out[i + 1]["start"], 3) if i + 1 < len(out) else round(total, 3)

json.dump({"total": round(total, 3), "scenes": out}, open(VDIR / "words.json", "w"), indent=1)
print(f"matched {matched}/{len(words)} words; total {total:.2f}s")
for s in out:
    print(f'{s["id"]}  {s["start"]:7.2f} -> {s["end"]:7.2f}')
