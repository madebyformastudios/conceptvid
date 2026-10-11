import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, MONO, BODY} from '../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../anim';
import {Headline, Label, Stage, Sfx} from '../components/Frame';
import {G, Drop, Champagne, Page, Printer, Dialog, Bottle, Cartridge, Groceries, Cursor} from '../components/Art';

/* s01 — Title */
export const S01: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const drop = pop(frame, fps, at('printer ink'));
  const glass = pop(frame, fps, at('champagne'));
  const gt = pop(frame, fps, at('champagne', 0, 8), 9);
  return (
    <AbsoluteFill>
      <Sfx name="pop" at={at('printer ink')} />
      <Sfx name="pop" at={at('champagne')} />
      <Headline text="Why does *printer ink* cost more than *champagne?*" start={at('why')} y={150} size={104} width={1500} stagger={2} />
      <Stage>
        <G x={640} y={720 + wobble(frame, 10)} s={drop * 1.6} r={wobble(frame, 4, 0.05)} shadow>
          <Drop face />
        </G>
        <G x={960} y={700} s={gt}>
          <text textAnchor="middle" y={60} fontFamily={DISPLAY} fontSize={220} fill={C.magenta}>
            &gt;
          </text>
        </G>
        <G x={1290} y={720} s={glass * 1.4} r={wobble(frame + 20, 3, 0.05)} shadow>
          <Champagne fill={lerp(frame, [at('champagne'), at('champagne') + 14], [0, 0.85])} />
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s02 — One page */
const BoardingPass: React.FC<{x: number; y: number; s: number; r?: number}> = (p) => (
  <G {...p} shadow>
    <rect x={-240} y={-110} width={480} height={220} rx={20} fill={C.white} stroke={C.ink} strokeWidth={7} />
    <rect x={-240} y={-110} width={480} height={60} rx={20} fill={C.cyan} stroke={C.ink} strokeWidth={7} />
    <text x={-210} y={-68} fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.white}>
      BOARDING PASS
    </text>
    <text x={-210} y={10} fontFamily={DISPLAY} fontSize={54} fill={C.ink}>
      AMS → JFK
    </text>
    <text x={-210} y={60} fontFamily={MONO} fontSize={24} fill={C.grey}>
      GATE D7 · SEAT 14C
    </text>
    {Array.from({length: 14}).map((_, i) => (
      <rect key={i} x={110 + i * 8} y={-30} width={i % 3 === 0 ? 5 : 3} height={110} fill={C.ink} />
    ))}
  </G>
);

export const S02: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const page = pop(frame, fps, at('print one page'));
  const one = pop(frame, fps, at('One.'), 8);
  const bp = pop(frame, fps, at('boarding'));
  const ct = pop(frame, fps, at('contract'));
  const sign = ramp(frame, at('sign'), 14);
  return (
    <AbsoluteFill>
      <Sfx name="thud" at={at('One.')} volume={0.4} />
      <Sfx name="pop" at={at('boarding')} volume={0.25} />
      <Sfx name="pop" at={at('contract')} volume={0.25} />
      <Headline text="You need to print *one* page." start={at('you need')} y={170} size={88} />
      <Stage>
        <G x={960} y={680} s={page * 1.1} r={-2} shadow>
          <Page title="PAGE 1 / 1" lines={6} />
        </G>
        <G x={960} y={700} s={one * 1.2} r={-8} o={1 - bp}>
          <text textAnchor="middle" y={110} fontFamily={DISPLAY} fontSize={340} fill={C.magenta} stroke={C.ink} strokeWidth={8}>
            1
          </text>
        </G>
        <BoardingPass x={lerp(bp, [0, 1], [-300, 470])} y={700} s={0.95} r={-6} />
        <G x={lerp(ct, [0, 1], [2300, 1470])} y={690} r={5} shadow>
          <Page title="CONTRACT" lines={5} w={340} h={440} />
          <path
            d="M-120,150 c20,-30 40,20 60,-10 s30,-20 50,10 s30,0 60,-20"
            fill="none"
            stroke={C.cyan}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={400}
            strokeDashoffset={400 * (1 - sign)}
          />
        </G>
      </Stage>
      <Label text="(never read)" x={1470} y={940} start={at('never read')} color={C.grey} size={34} />
    </AbsoluteFill>
  );
};

/* s03 — Out of cyan */
export const S03: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPress = at('press print');
  const tCyan = at('out of cyan');
  const btn = pop(frame, fps, tPress - 6);
  const clickAt = tPress + 8;
  const pressed = frame >= clickAt && frame < clickAt + 6;
  const err = frame >= at('tells you');
  const dlg = pop(frame, fps, tCyan, 10);
  const shake = err ? Math.sin(frame * 2.2) * lerp(frame, [at('tells you'), at('tells you') + 18], [14, 0]) : 0;
  return (
    <AbsoluteFill>
      <Sfx name="click" at={at('press print') + 8} volume={0.5} />
      <Sfx name="error" at={at('out of cyan')} volume={0.3} />
      <Stage>
        <G x={960 + shake} y={700} s={1.35} shadow>
          <Printer
            screen={err ? 'ERROR' : frame > clickAt ? 'PRINTING' : 'READY'}
            screenColor={err ? C.red : C.green}
            blink={err}
            frame={frame}
          />
        </G>
        <G x={1500} y={330} s={btn * (pressed ? 0.92 : 1)} shadow>
          <rect x={-150} y={-55} width={300} height={110} rx={55} fill={C.cyan} stroke={C.ink} strokeWidth={7} />
          <text textAnchor="middle" y={18} fontFamily={DISPLAY} fontSize={50} fill={C.ink}>
            PRINT
          </text>
        </G>
        <Cursor x={lerp(frame, [tPress - 6, clickAt], [1800, 1530])} y={lerp(frame, [tPress - 6, clickAt], [560, 350])} s={btn} press={pressed} />
        <G x={760} y={330} s={dlg} r={-3} shadow>
          <Dialog title="printer.exe" msg="OUT OF CYAN" w={640} />
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s04 — Black and white */
export const S04: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pg = pop(frame, fps, at("you're"));
  const bw = pop(frame, fps, at('black and white'));
  const q = pop(frame, fps, at('black and white', 0, 10), 8);
  return (
    <AbsoluteFill>
      <Headline text="You're printing in *black & white.*" start={at("you're")} y={170} size={92} />
      <Stage>
        <G x={700} y={680} s={pg * 1.1} r={-3} shadow>
          <Page title="BLACK INK ONLY" lines={6} />
        </G>
        <G x={1250} y={700} s={bw * 1.4} r={wobble(frame, 6, 0.1)} shadow>
          <Drop color={C.cyan} face />
        </G>
        <G x={1250} y={700} s={q}>
          <line x1={-150} y1={-170} x2={150} y2={130} stroke={C.red} strokeWidth={22} strokeLinecap="round" />
        </G>
        <G x={1450} y={480} s={q} r={12}>
          <text textAnchor="middle" fontFamily={DISPLAY} fontSize={180} fill={C.magenta} stroke={C.ink} strokeWidth={6}>
            ?
          </text>
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s05 — Price per millilitre */
export const S05: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const base = 900;
  const axis = ramp(frame, at('numbers'), 14);
  const bars = [
    {label: 'Vintage champagne', color: C.yellow, h: 190, t: at('vintage champagne'), icon: 'glass'},
    {label: 'Luxury perfume', color: C.magenta, h: 280, t: at('luxury perfumes'), icon: 'perfume'},
    {label: 'Printer ink', color: C.cyan, h: 420, t: at('costs more'), icon: 'ink'},
  ];
  return (
    <AbsoluteFill>
      <Sfx name="pop" at={at('vintage champagne')} volume={0.25} />
      <Sfx name="pop" at={at('luxury perfumes')} volume={0.25} />
      <Sfx name="pop" at={at('costs more')} volume={0.3} />
      <Headline text="Let's talk *numbers.*" start={at("let's")} y={130} size={84} />
      <Label text="PRICE PER MILLILITRE" x={960} y={240} start={at('per milliliter')} color={C.grey} size={30} />
      <Stage>
        <line x1={420} y1={base} x2={420 + 1080 * axis} y2={base} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        {bars.map((b, i) => {
          const g = pop(frame, fps, b.t, 11);
          const h = b.h * g;
          const x = 560 + i * 400;
          return (
            <g key={b.label}>
              <rect x={x - 110} y={base - h} width={220} height={h} rx={14} fill={b.color} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(9px 9px 0 ${C.ink})`}} />
              <G x={x} y={base - h - 100} s={g * 0.5}>
                {b.icon === 'glass' && <Champagne />}
                {b.icon === 'perfume' && <Bottle kind="perfume" color={C.magenta} label="Nº 5" />}
                {b.icon === 'ink' && <Cartridge color={C.cyan} label="INK" />}
              </G>
              <text x={x} y={base + 60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink} opacity={g}>
                {b.label}
              </text>
            </g>
          );
        })}
      </Stage>
      <Label text="illustrative · not to scale" x={960} y={1000} start={at('costs more')} color={C.grey} size={22} />
    </AbsoluteFill>
  );
};

/* s06 — Most expensive liquids podium */
export const S06: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pod = pop(frame, fps, at('consumer'));
  const items = [
    {x: 960, h: 300, n: '1', c: C.cyan, t: at('expensive'), el: <Cartridge color={C.cyan} label="INK" />},
    {x: 600, h: 200, n: '2', c: C.magenta, t: at('compared'), el: <Bottle kind="perfume" color={C.magenta} label="Nº 5" />},
    {x: 1320, h: 140, n: '3', c: C.yellow, t: at('most'), el: <Bottle kind="wine" color={C.green} label="BRUT" />},
  ];
  const crown = pop(frame, fps, at('legally'), 8);
  return (
    <AbsoluteFill>
      <Sfx name="ding" at={at('legally')} volume={0.25} />
      <Headline text="Among the priciest liquids you can *legally* buy" start={at('some of')} y={150} size={80} width={1500} />
      <Stage>
        {items.map((it) => {
          const p = pop(frame, fps, it.t);
          return (
            <g key={it.n}>
              <G x={it.x} y={980} s={pod}>
                <rect x={-170} y={-it.h} width={340} height={it.h} fill={C.white} stroke={C.ink} strokeWidth={7} />
                <text textAnchor="middle" y={-it.h + 90} fontFamily={DISPLAY} fontSize={80} fill={it.c} stroke={C.ink} strokeWidth={4}>
                  {it.n}
                </text>
              </G>
              <G x={it.x} y={980 - it.h - 150} s={p * 0.75} shadow>
                {it.el}
              </G>
            </g>
          );
        })}
        <G x={960} y={460 - 20 * crown} s={crown} r={wobble(frame, 5, 0.12)}>
          <path d="M-80,40 L-90,-40 L-45,0 L0,-60 L45,0 L90,-40 L80,40 Z" fill={C.yellow} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s07 — What ink is made of */
export const S07: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const beaker = pop(frame, fps, at("ink isn't"));
  const layers = [
    {label: 'Water', sub: 'most of it', c: '#9EDCEB', h: 300, t: at('mostly water')},
    {label: 'Pigment or dye', sub: 'the colour', c: C.cyan, h: 80, t: at('pigment')},
    {label: 'Additives', sub: 'stops it drying out', c: C.yellow, h: 40, t: at('chemicals')},
  ];
  let acc = 0;
  return (
    <AbsoluteFill>
      <Headline text="Ink isn't *rare.*" start={at("ink isn't")} y={160} size={100} />
      <Stage>
        <G x={700} y={600} s={beaker}>
          <defs>
            <clipPath id="beaker">
              <path d="M-170,-220 v400 a30,30 0 0 0 30,30 h280 a30,30 0 0 0 30,-30 v-400 z" />
            </clipPath>
          </defs>
          <g clipPath="url(#beaker)">
            {layers.map((l) => {
              const g = ramp(frame, l.t, 16);
              const h = l.h * g;
              const y = 210 - acc - h;
              acc += h;
              return <rect key={l.label} x={-200} y={y} width={400} height={h + 2} fill={l.c} />;
            })}
          </g>
          <path d="M-190,-220 h20 v400 a30,30 0 0 0 30,30 h280 a30,30 0 0 0 30,-30 v-400 h20" fill="none" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={110} x2={150} y1={-150 + i * 80} y2={-150 + i * 80} stroke={C.ink} strokeWidth={5} />
          ))}
        </G>
      </Stage>
      {layers.map((l, i) => {
        const p = pop(frame, fps, l.t);
        return (
          <div
            key={l.label}
            style={{
              position: 'absolute',
              left: 1000,
              top: 380 + i * 170,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              opacity: p,
              transform: `translateX(${(1 - p) * 80}px)`,
            }}
          >
            <div style={{width: 70, height: 70, borderRadius: 16, background: l.c, border: `7px solid ${C.ink}`}} />
            <div>
              <div style={{fontFamily: DISPLAY, fontSize: 56, color: C.ink}}>{l.label}</div>
              <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, color: C.grey}}>{l.sub}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* s08 — Colored water vs groceries */
export const S08: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const scale = pop(frame, fps, at('so why'));
  const cart = pop(frame, fps, at('milliliters'));
  const bag = pop(frame, fps, at('weekly'));
  const tilt = lerp(frame, [at('cost more'), at('cost more') + 25], [0, -14]) + (frame > at('cost more') + 25 ? wobble(frame, 1, 0.2) : 0);
  const rad = (tilt * Math.PI) / 180;
  const lx = 960 - Math.cos(rad) * 420;
  const ly = 560 - Math.sin(rad) * 420;
  const rx = 960 + Math.cos(rad) * 420;
  const ry = 560 + Math.sin(rad) * 420;
  return (
    <AbsoluteFill>
      <Sfx name="thud" at={at('cost more') + 20} volume={0.3} />
      <Headline text="A few mL of coloured water vs. your *weekly groceries*" start={at('so why')} y={130} size={76} width={1500} />
      <Stage>
        <G s={scale} x={0} y={0}>
          <path d="M890,960 h140 l-40,-50 h-60 z" fill={C.ink} />
          <rect x={950} y={560} width={20} height={360} fill={C.ink} />
          <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
          <circle cx={960} cy={560} r={22} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
          {[
            [lx, ly],
            [rx, ry],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2={x - 110} y2={y + 170} stroke={C.ink} strokeWidth={5} />
              <line x1={x} y1={y} x2={x + 110} y2={y + 170} stroke={C.ink} strokeWidth={5} />
              <path d={`M${x - 150},${y + 170} h300 a150,40 0 0 1 -300,0 z`} fill={C.white} stroke={C.ink} strokeWidth={7} />
            </g>
          ))}
          <G x={lx} y={ly + 112} s={cart * 0.45} shadow>
            <Cartridge color={C.magenta} label="INK" />
          </G>
          <G x={rx} y={ry + 110} s={bag * 0.6} shadow>
            <Groceries />
          </G>
        </G>
      </Stage>
    </AbsoluteFill>
  );
};
