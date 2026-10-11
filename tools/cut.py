"""Remove a stretch of narration (e.g. a flubbed phrase) with a short crossfade,
and shift a whisper JSON transcript to match.

Usage: python3 tools/cut.py <audio.mp3> <from s> <to s> [whisper.json]
Edits the audio in place (via a temp file); the whisper JSON too, if given.
Then remove the words from script.json and re-run tools/align.py.
"""
import array, json, subprocess, sys, os

src, a, b = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
SR = 44100
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
x = array.array("f", pcm)
ia, ib = int(a * SR), int(b * SR)
FADE = int(0.015 * SR)
out = x[:ia]
for i in range(FADE):
    k = len(out) - FADE + i
    t = i / FADE
    out[k] = out[k] * (1 - t) + x[ib + i] * t
out.extend(x[ib + FADE:])
tmp = src + ".tmp.mp3"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", tmp], input=out.tobytes(), check=True)
os.replace(tmp, src)
cut = (len(x) - len(out)) / SR
print(f"removed {cut:.3f} s: {len(x) / SR:.2f} -> {len(out) / SR:.2f} s")

if len(sys.argv) > 4:
    p = sys.argv[4]
    j = json.load(open(p))
    keep = []
    for seg in j["transcription"]:
        f, t = seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000
        if f >= b:
            seg["offsets"]["from"] -= round(cut * 1000)
            seg["offsets"]["to"] -= round(cut * 1000)
        elif f >= a:
            continue  # inside the cut
        keep.append(seg)
    j["transcription"] = keep
    json.dump(j, open(p, "w"))
    print(f"shifted transcript, {len(keep)} tokens kept")
