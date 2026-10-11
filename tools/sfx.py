"""Synthesize the SFX library into public/sfx (no third-party audio, no licensing).

Everything is soft on purpose: sine-based, rounded attacks, low-passed, peaks at about -14 dBFS,
so effects sit under the narration instead of poking out of it.
"""
import math, random, struct, wave
from pathlib import Path

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public/sfx"
OUT.mkdir(parents=True, exist_ok=True)
random.seed(7)
PEAK = 0.2  # ~ -14 dBFS


def write(name, samples):
    samples = lowpass(samples, 0.35)
    peak = max(1e-9, max(abs(s) for s in samples))
    fade = int(SR * 0.01)
    with wave.open(str(OUT / f"{name}.wav"), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        frames = []
        for i, s in enumerate(samples):
            g = min(1, (len(samples) - i) / fade)  # click-free tail
            frames.append(struct.pack("<h", int(s / peak * PEAK * g * 32767)))
        w.writeframes(b"".join(frames))


def lowpass(xs, k):
    y, out = 0.0, []
    for x in xs:
        y += k * (x - y); out.append(y)
    return out


def env(t, attack, decay):
    return (min(1, t / attack) if attack else 1) * math.exp(-t / decay)


def tone(dur, f0, f1, attack, decay, partials=((1, 1),)):
    n = int(SR * dur); ph = 0.0; out = []
    for i in range(n):
        t = i / SR
        f = f0 + (f1 - f0) * (t / dur)
        ph += 2 * math.pi * f / SR
        out.append(sum(a * math.sin(ph * m) for m, a in partials) * env(t, attack, decay))
    return out


def mix(*tracks):
    n = max(len(t) for t in tracks)
    return [sum(t[i] if i < len(t) else 0 for t in tracks) for i in range(n)]


def delay(xs, sec):
    return [0.0] * int(SR * sec) + xs


# pop: gentle "bloop" (soft bubble), for things appearing
write("pop", tone(0.14, 520, 300, 0.006, 0.045, ((1, 1), (2, 0.15))))

# click: soft mouse tick
write("click", tone(0.05, 1800, 1500, 0.001, 0.008))

# thud: warm low "tump" for stamps and landings
write("thud", mix(tone(0.3, 140, 70, 0.004, 0.07), [random.uniform(-1, 1) * math.exp(-i / SR / 0.012) * 0.25 for i in range(int(SR * 0.05))]))

# error: soft two-note "bonk-bonk" falling, rounded (no square wave)
write("error", mix(tone(0.22, 392, 380, 0.008, 0.08, ((1, 1), (2, 0.2))), delay(tone(0.28, 311, 300, 0.008, 0.1, ((1, 1), (2, 0.2))), 0.16)))

# ding: soft marimba-ish bell
write("ding", tone(0.9, 880, 880, 0.003, 0.22, ((1, 1), (4, 0.12), (10, 0.03))))

# cash: two soft chimes
write("cash", mix(tone(0.4, 1319, 1319, 0.002, 0.08), delay(tone(0.5, 1760, 1760, 0.002, 0.11), 0.08)))

# whoosh: airy filtered noise swell
n = int(SR * 0.5)
y = 0.0
wh = []
for i in range(n):
    p = i / n
    k = 0.015 + 0.08 * math.sin(math.pi * p) ** 2
    y += k * (random.uniform(-1, 1) - y)
    wh.append(y * math.sin(math.pi * p) ** 2)
write("whoosh", wh)

print(sorted(p.name for p in OUT.iterdir()))
