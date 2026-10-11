"""Align the narration to src/script.json and write src/words.json.

Usage: python3 tools/align.py <whisper-cli -ojf -ml 1 output.json>

Produces, per scene, the real start/end time and a timestamp for every
script word, so animation beats land exactly when a word is spoken.
"""
import difflib, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower().replace("fifty", "50"))

whisper = json.load(open(sys.argv[1]))["transcription"]
heard = []  # (norm word, start s, end s)
for seg in whisper:
    for part in seg["text"].replace("-", " ").split():
        n = norm(part)
        if n:
            heard.append((n, seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000))

scenes = json.load(open(ROOT / "src/script.json"))
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

json.dump({"total": round(total, 3), "scenes": out}, open(ROOT / "src/words.json", "w"), indent=1)
print(f"matched {matched}/{len(words)} words; total {total:.2f}s")
for s in out:
    print(f'{s["id"]}  {s["start"]:7.2f} -> {s["end"]:7.2f}')
