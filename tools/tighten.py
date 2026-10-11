"""Shorten long pauses in a narration file.

Usage: python3 tools/tighten.py in.mp3 out.mp3

Every silence longer than 0.5 s is cut down from its middle, so breaths and
word tails stay intact: a 0.8 s sentence gap becomes ~0.5 s, a 1.8 s chapter
gap ~0.85 s. Cuts use a 15 ms crossfade so they are inaudible.
"""
import re, subprocess, sys
import array

src, dst = sys.argv[1], sys.argv[2]
SR = 44100

log = subprocess.run(["ffmpeg", "-hide_banner", "-i", src, "-af", "silencedetect=noise=-40dB:d=0.5", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]

pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                     capture_output=True, check=True).stdout
x = array.array("f", pcm)

def target(d):
    return min(d, 0.40 + (d - 0.40) * 0.33)

cuts = []  # (from sample, to sample) to remove
for s, e in zip(starts, ends):
    d = e - s
    if s < 0.3:  # leading silence: keep 0.3 s
        cuts.append((0, int(max(0, e - 0.3) * SR)))
        continue
    rm = d - target(d)
    if rm < 0.05:
        continue
    mid = (s + e) / 2
    cuts.append((int((mid - rm / 2) * SR), int((mid + rm / 2) * SR)))

FADE = int(0.015 * SR)
out = array.array("f")
pos = 0
for a, b in cuts:
    out.extend(x[pos:a])
    # crossfade the tail of the kept part into the audio after the cut
    for i in range(FADE):
        if b + i >= len(x) or len(out) - FADE + i < 0:
            break
        k = len(out) - FADE + i
        t = i / FADE
        out[k] = out[k] * (1 - t) + x[b + i] * t
    pos = b + FADE
out.extend(x[pos:])

subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                "-c:a", "libmp3lame", "-b:a", "192k", dst], input=out.tobytes(), check=True)
removed = (len(x) - len(out)) / SR
print(f"{len(cuts)} pauses shortened, removed {removed:.1f} s: {len(x)/SR:.1f} s -> {len(out)/SR:.1f} s")
