"""Synthesize the small SFX library into public/sfx (no third-party audio, no licensing)."""
import math, random, struct, wave
from pathlib import Path

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public/sfx"
OUT.mkdir(parents=True, exist_ok=True)
random.seed(7)

def write(name, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    with wave.open(str(OUT / f"{name}.wav"), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", int(s / peak * 0.9 * 32767)) for s in samples))

def env(i, n, a=0.005, r=1.0):
    t = i / SR
    return min(1, t / a) * math.exp(-t / r) if a else math.exp(-t / r)

def lowpass(xs, k):
    y, out = 0.0, []
    for x in xs:
        y += k * (x - y); out.append(y)
    return out

# whoosh: filtered noise swelling and fading, cutoff sweeping up
n = int(SR * 0.55)
noise = [random.uniform(-1, 1) for _ in range(n)]
y, wh = 0.0, []
for i, x in enumerate(noise):
    p = i / n
    k = 0.02 + 0.25 * math.sin(math.pi * p) ** 2
    y += k * (x - y)
    wh.append(y * math.sin(math.pi * p) ** 1.5)
write("whoosh", wh)

# pop: short pitched blip with falling pitch
n = int(SR * 0.12)
ph, pop = 0.0, []
for i in range(n):
    f = 900 - 500 * i / n
    ph += 2 * math.pi * f / SR
    pop.append(math.sin(ph) * env(i, n, 0.002, 0.03))
write("pop", pop)

# click: tiny noise transient + tick
n = int(SR * 0.05)
write("click", [(random.uniform(-1, 1) * 0.5 + math.sin(2 * math.pi * 2400 * i / SR)) * env(i, n, 0.0005, 0.006) for i in range(n)])

# thud: stamp hit, low sine + noise burst
n = int(SR * 0.35)
th = []
for i in range(n):
    t = i / SR
    th.append(math.sin(2 * math.pi * (95 - 40 * t) * t) * math.exp(-t / 0.09) + random.uniform(-1, 1) * math.exp(-t / 0.015) * 0.6)
write("thud", lowpass(th, 0.3))

# error: two-tone square-ish buzz
n = int(SR * 0.42)
er = []
for i in range(n):
    t = i / SR
    f = 330 if t < 0.2 else 247
    s = 1 if math.sin(2 * math.pi * f * t) > 0 else -1
    er.append(s * 0.5 * (1 if (t % 0.2) < 0.17 else 0) * math.exp(-(t % 0.2) / 0.25))
write("error", lowpass(er, 0.25))

# ding: bell partials
n = int(SR * 1.2)
write("ding", [sum(a * math.sin(2 * math.pi * f * i / SR) for f, a in [(1318, 1), (2637, 0.4), (3951, 0.2)]) * env(i, n, 0.002, 0.35) for i in range(n)])

# cash: two quick high bells
n = int(SR * 0.5)
write("cash", [(math.sin(2 * math.pi * 2093 * i / SR) * env(i, n, 0.001, 0.08) + (math.sin(2 * math.pi * 2637 * (i / SR - 0.07)) * env(i - int(0.07 * SR), n, 0.001, 0.12) if i > 0.07 * SR else 0)) for i in range(n)])
print(sorted(p.name for p in OUT.iterdir()))
