import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, BODY, MONO} from '../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../anim';
import {Headline, Label, Stage, Sfx} from '../components/Frame';
import {G, Printer, Razor, Blade, Tag, Coin, Cartridge, Person, Arrow, Stamp, Chip, Dialog} from '../components/Art';

/* s09 — Printers = razors */
export const S09: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pr = pop(frame, fps, at('printers'));
  const rz = pop(frame, fps, at('razors'));
  const eq = pop(frame, fps, at('razors', 0, 6), 8);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={560} y={600} s={pr * 0.95} shadow>
          <Printer />
        </G>
        <G x={960} y={600} s={eq}>
          <text textAnchor="middle" y={40} fontFamily={DISPLAY} fontSize={160} fill={C.magenta} stroke={C.ink} strokeWidth={5}>
            ≈
          </text>
        </G>
        <G x={1380} y={540} s={rz * 0.95} r={lerp(rz, [0, 1], [-40, -18])} shadow>
          <Razor />
        </G>
      </Stage>
      <Headline text="The *razor-and-blades* model" start={at('called')} y={860} size={84} stagger={3} hl={C.cyan} />
    </AbsoluteFill>
  );
};

/* s10 — Cheap razor, endless blades */
export const S10: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const rz = pop(frame, fps, at('you sell'));
  const tag = pop(frame, fps, at('cheap'));
  const loss = pop(frame, fps, at('loss'), 9);
  const tBlades = at('blades');
  const n = Math.max(0, Math.min(14, Math.floor((frame - tBlades) / 7)));
  const inf = pop(frame, fps, at('forever'), 8);
  const total = Math.max(0, frame - tBlades) * 0.9;
  return (
    <AbsoluteFill>
      <Sfx name="cash" at={at('blades') + 8} volume={0.25} />
      <Sfx name="cash" at={at('forever')} volume={0.25} />
      <Stage>
        <G x={430} y={520} s={rz * 0.85} r={-15} shadow>
          <Razor />
        </G>
        <G x={430} y={850} s={tag} r={-4} shadow>
          <Tag text={loss > 0.5 ? '−$' : '$1'} color={loss > 0.5 ? C.red : C.yellow} w={200} />
        </G>
        <Label text="the razor" x={430} y={170} start={at('razor')} />
        {/* blade stack */}
        {Array.from({length: n}).map((_, i) => {
          const t0 = tBlades + i * 7;
          const d = pop(frame, fps, t0, 14);
          const col = i % 5;
          const row = Math.floor(i / 5);
          return (
            <G key={i} x={1040 + row * 250} y={lerp(d, [0, 1], [-100, 940 - col * 82])} s={0.75} r={(i % 3) - 1} shadow>
              <Blade color={[C.white, C.cyan, C.yellow][i % 3]} />
            </G>
          );
        })}
        <Label text="the blades" x={1290} y={170} start={tBlades} />
        <G x={1650} y={420} s={pop(frame, fps, tBlades + 8)}>
          <Coin />
          <text x={70} y={18} fontFamily={DISPLAY} fontSize={56} fill={C.green}>
            +{Math.floor(total)}
          </text>
        </G>
        <G x={1650} y={640} s={inf} r={wobble(frame, 3)}>
          <text textAnchor="middle" y={60} fontFamily={DISPLAY} fontSize={220} fill={C.magenta} stroke={C.ink} strokeWidth={6}>
            ∞
          </text>
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s11 — Perfected it */
export const S11: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const morph = lerp(frame, [at('took'), at('took') + 20], [0, 1]);
  const sp = pop(frame, fps, at('perfected'), 8);
  return (
    <AbsoluteFill>
      <Sfx name="ding" at={at('perfected')} volume={0.2} />
      <Headline text="Printer companies took the idea and *perfected* it." start={at('printer')} y={150} size={80} width={1500} hl={C.magenta} />
      <Stage>
        <G x={600} y={640} s={(1 - morph) * 0.8} r={-15} o={1 - morph}>
          <Razor />
        </G>
        <G x={600} y={680} s={morph * 0.95} shadow>
          <Printer screen="$$$" />
        </G>
        <Arrow x1={900} y1={640} x2={1110} y2={640} t={morph} w={14} color={C.ink} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <G x={1300 + i * 200} y={640} s={(1 - morph) * 0.7} o={1 - morph}>
              <Blade />
            </G>
            <G x={1300 + i * 200} y={660} s={pop(frame, fps, at('took') + 10 + i * 4) * 0.75} shadow>
              <Cartridge color={[C.cyan, C.magenta, C.yellow][i]} label={['C', 'M', 'Y'][i]} />
            </G>
          </g>
        ))}
        {[
          [1180, 420],
          [1720, 470],
          [1500, 900],
        ].map(([x, y], i) => (
          <G key={i} x={x} y={y} s={sp * (0.8 + 0.3 * Math.sin(frame * 0.3 + i))} r={frame * 2}>
            <path d="M0,-40 L10,-10 L40,0 L10,10 L0,40 L-10,10 L-40,0 L-10,-10 Z" fill={C.yellow} stroke={C.ink} strokeWidth={5} />
          </G>
        ))}
      </Stage>
    </AbsoluteFill>
  );
};

/* s12 — $50 printer, profit gauge */
export const S12: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pr = pop(frame, fps, at('that printer'));
  const tag = pop(frame, fps, at('fifty'));
  const gauge = pop(frame, fps, at('manufacturer'));
  const needle =
    frame < at('break even') ? lerp(frame, [at('manufacturer'), at('break even')], [70, 20]) : frame < at('lose money') ? lerp(frame, [at('break even'), at('break even') + 15], [20, 0]) : lerp(frame, [at('lose money'), at('lose money') + 15], [0, -55]) + wobble(frame, 2, 0.5);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={560} y={640} s={pr * 1.05} shadow>
          <Printer />
        </G>
        <G x={830} y={360} s={tag} r={12 + wobble(frame, 6, 0.12)} shadow>
          <Tag text="$50" color={C.yellow} w={220} />
        </G>
        <G x={1380} y={700} s={gauge}>
          <path d="M-300,0 A300,300 0 0 1 0,-300" fill="none" stroke={C.red} strokeWidth={60} />
          <path d="M0,-300 A300,300 0 0 1 300,0" fill="none" stroke={C.green} strokeWidth={60} />
          <path d="M-300,0 A300,300 0 0 1 300,0" fill="none" stroke={C.ink} strokeWidth={7} transform="scale(1.1)" />
          <path d="M-300,0 A300,300 0 0 1 300,0" fill="none" stroke={C.ink} strokeWidth={7} transform="scale(0.9)" />
          <text x={-300} y={70} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.red}>
            LOSS
          </text>
          <text x={300} y={70} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.green}>
            PROFIT
          </text>
          <g transform={`rotate(${-needle})`}>
            <line x1={0} y1={0} x2={0} y2={-260} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          </g>
          <circle r={30} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
          <text y={140} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={32} fill={C.ink}>
            PROFIT ON THE PRINTER
          </text>
        </G>
      </Stage>
      <Headline text="They don't *care.*" start={at("don't care")} x={1380} y={180} size={84} width={800} />
    </AbsoluteFill>
  );
};

/* s13 — You are the product */
export const S13: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pr = pop(frame, fps, 0);
  const x = ramp(frame, at("isn't"), 12);
  const you = pop(frame, fps, at('you are'), 10);
  return (
    <AbsoluteFill>
      <Sfx name="pop" at={at('you are')} volume={0.35} />
      <Headline text="The printer isn't the product." start={at('the printer')} y={150} size={78} />
      <Stage>
        <G x={lerp(you, [0, 1], [960, 560])} y={660} s={pr * lerp(you, [0, 1], [1.1, 0.75])} o={lerp(you, [0, 1], [1, 0.45])}>
          <Printer />
          <line x1={-280} y1={-280} x2={-280 + 560 * x} y2={-280 + 440 * x} stroke={C.red} strokeWidth={22} strokeLinecap="round" />
        </G>
        <G x={1300} y={620} s={you * 1.4} shadow>
          <Person color={C.cyan} mood="flat" />
        </G>
        <G x={1300} y={860} s={you} r={-6}>
          <line x1={-60} y1={-140} x2={-20} y2={-50} stroke={C.ink} strokeWidth={5} />
          <Tag text="YOU" color={C.magenta} w={210} />
        </G>
      </Stage>
      <Headline text="*You* are." start={at('you are')} x={1300} y={280} size={110} width={700} hl={C.magenta} />
    </AbsoluteFill>
  );
};

/* s14 — Starter cartridges */
export const S14: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const a = pop(frame, fps, at('starter'));
  const b = pop(frame, fps, at('starter', 0, 8));
  const eq = pop(frame, fps, at('look exactly'), 9);
  const xray = ramp(frame, at('less ink'), 12);
  const lvl = frame < at('a lot less') ? 0.45 : lerp(frame, [at('a lot less'), at('a lot less') + 20], [0.45, 0.12]);
  return (
    <AbsoluteFill>
      <Sfx name="pop" at={at('less ink')} volume={0.3} />
      <Headline text="So-called *starter* cartridges" start={at('so-called')} y={150} size={88} />
      <Stage>
        <G x={640} y={640} s={a * 1.3} shadow>
          <Cartridge color={C.magenta} label="INK" xray={xray} level={lvl} />
        </G>
        <G x={1280} y={640} s={b * 1.3} shadow>
          <Cartridge color={C.magenta} label="INK" xray={xray} level={0.95} />
        </G>
        <G x={960} y={640} s={eq * (1 - xray)}>
          <text textAnchor="middle" y={40} fontFamily={DISPLAY} fontSize={150} fill={C.ink}>
            =
          </text>
        </G>
        <G x={960} y={640} s={xray}>
          <text textAnchor="middle" y={40} fontFamily={DISPLAY} fontSize={150} fill={C.red}>
            ≠
          </text>
        </G>
      </Stage>
      <Label text="STARTER" x={640} y={880} start={at('starter')} size={40} color={C.magenta} />
      <Label text="REGULAR" x={1280} y={880} start={at('real ones')} size={40} />
    </AbsoluteFill>
  );
};

/* s15 — Running out "coincidentally" */
export const S15: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const ax = ramp(frame, 0, 14);
  const x0 = 300;
  const y0 = 880;
  const wGraph = 1300;
  const hGraph = 520;
  const expected = ramp(frame, at('sooner', 0, -10), 30);
  const actual = ramp(frame, at('first time'), 24);
  const emptyX = x0 + wGraph * 0.28;
  const tBuy = at('start buying');
  const coins = Math.max(0, Math.min(8, Math.floor((frame - tBuy) / 5)));
  const stamp = pop(frame, fps, at('pure coincidence'), 9);
  return (
    <AbsoluteFill>
      <Sfx name="cash" at={at('start buying')} volume={0.25} />
      <Sfx name="thud" at={at('pure coincidence')} volume={0.4} />
      <Stage>
        <line x1={x0} y1={y0} x2={x0 + wGraph * ax} y2={y0} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <line x1={x0} y1={y0} x2={x0} y2={y0 - hGraph * ax} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <text x={x0 - 30} y={y0 - hGraph + 20} textAnchor="end" fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink} opacity={ax}>
          INK
        </text>
        <text x={x0 + wGraph} y={y0 + 50} textAnchor="end" fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink} opacity={ax}>
          TIME →
        </text>
        {/* expected */}
        <path
          d={`M${x0},${y0 - hGraph + 40} L${x0 + wGraph * 0.9},${y0}`}
          fill="none"
          stroke={C.grey}
          strokeWidth={8}
          strokeDasharray="18 16"
          pathLength={1}
          style={{strokeDasharray: `${expected * 1.0} 1`}}
        />
        <text x={x0 + wGraph * 0.6} y={y0 - hGraph * 0.42} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.grey} opacity={expected}>
          what you expected
        </text>
        {/* actual */}
        <path d={`M${x0},${y0 - hGraph + 40} L${emptyX},${y0}`} fill="none" stroke={C.magenta} strokeWidth={12} strokeLinecap="round" pathLength={1} style={{strokeDasharray: `${actual} 1`}} />
        <G x={emptyX} y={y0} s={pop(frame, fps, at('run out'), 9)}>
          <circle r={24} fill={C.red} stroke={C.ink} strokeWidth={6} />
          <text y={75} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.red}>
            EMPTY
          </text>
        </G>
        {Array.from({length: coins}).map((_, i) => (
          <G key={i} x={emptyX + 80 + i * 105} y={y0 - 80 - (i % 2) * 40} s={pop(frame, fps, tBuy + i * 5, 10) * 0.85}>
            <Coin />
          </G>
        ))}
        <G x={1250} y={330} s={stamp} r={-10}>
          <Stamp text="COINCIDENCE?" color={C.red} />
        </G>
      </Stage>
      <Label text="(absolutely.)" x={1250} y={430} start={at('absolutely')} color={C.grey} size={36} />
    </AbsoluteFill>
  );
};

/* s16 — Cheaper ink? */
export const S16: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const og = pop(frame, fps, at('fine'));
  const gen = pop(frame, fps, at('cheaper'));
  const eyes = ramp(frame, at('thought of that'), 14);
  const pr = pop(frame, fps, at('printer companies'), 14);
  return (
    <AbsoluteFill>
      <Headline text="“Fine, I'll just buy *cheaper* ink.”" start={at('fine')} y={150} size={84} />
      <Stage>
        <G x={1460} y={720 - 20 * eyes} s={pr * 1.2} o={pr}>
          <Printer eyes={eyes} screen="I SEE YOU" screenColor={C.red} />
        </G>
        <G x={480} y={660} s={og} shadow>
          <Cartridge color={C.cyan} label="BRAND" />
        </G>
        <G x={480} y={900} s={og} r={-4}>
          <Tag text="$$$" color={C.red} w={200} strike={gen} />
        </G>
        <G x={860} y={660} s={gen} shadow>
          <Cartridge color={C.cyan} label="OTHER" cheap />
        </G>
        <G x={860} y={900} s={gen} r={4}>
          <Tag text="$" color={C.green} w={160} />
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s17 — The chip */
export const S17: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const chip = pop(frame, fps, at('small chip'));
  const off = pop(frame, fps, at('officially'));
  const unoff = pop(frame, fps, at('unofficially'));
  const card = (x: number, title: string, color: string, rows: string[], p: number, rowT: number[]) => (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 330,
        width: 520,
        padding: '34px 38px',
        background: C.white,
        border: `7px solid ${C.ink}`,
        borderRadius: 26,
        boxShadow: `10px 10px 0 ${C.ink}`,
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px) rotate(${x < 900 ? -2 : 2}deg)`,
      }}
    >
      <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color, marginBottom: 20}}>{title}</div>
      {rows.map((r, i) => {
        const rp = pop(frame, fps, rowT[i]);
        return (
          <div key={r} style={{fontFamily: BODY, fontWeight: 800, fontSize: 40, color: C.ink, lineHeight: 1.25, marginTop: 14, opacity: rp, transform: `translateX(${(1 - rp) * 30}px)`}}>
            {r}
          </div>
        );
      })}
    </div>
  );
  return (
    <AbsoluteFill>
      <Sfx name="pop" at={at('small chip')} volume={0.3} />
      <Stage>
        <G x={960} y={620} s={chip * 0.75} r={wobble(frame, 3, 0.05)}>
          <Chip glow={unoff} />
        </G>
      </Stage>
      <Label text="a tiny chip" x={960} y={850} start={at('small chip')} size={36} />
      {card(110, 'OFFICIALLY', C.green, ['✓ Tracks ink levels', '✓ Print quality'], off, [at('tracks'), at('helps')])}
      {card(1290, 'UNOFFICIALLY', C.red, ['Is this ink…', 'genuine?'], unoff, [at('check'), at('genuine')])}
    </AbsoluteFill>
  );
};

/* s18 — Rejected, warned, refused */
export const S18: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const ds = [
    {t: at('reject'), title: 'cartridge.err', msg: 'Cartridge rejected', c: C.red, icon: '✕'},
    {t: at('warnings'), title: 'warning', msg: 'Non-genuine ink detected', c: C.yellow, icon: '!'},
    {t: at('refuse'), title: 'printer', msg: 'Printing disabled', c: C.magenta, icon: '⦸'},
  ];
  return (
    <AbsoluteFill>
      <Sfx name="error" at={at('reject')} volume={0.22} />
      <Sfx name="error" at={at('warnings')} volume={0.22} />
      <Sfx name="error" at={at('refuse')} volume={0.22} />
      <Headline text="If it isn't genuine…" start={at('if it')} y={150} size={80} />
      <Stage>
        {ds.map((d, i) => {
          const p = pop(frame, fps, d.t, 10);
          return (
            <G key={i} x={700 + i * 260} y={470 + i * 170} s={p} r={[-3, 2, -1][i]} shadow>
              <Dialog title={d.title} msg={d.msg} color={d.c} w={800} icon={d.icon} />
            </G>
          );
        })}
      </Stage>
    </AbsoluteFill>
  );
};
