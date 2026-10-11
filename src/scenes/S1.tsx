import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, MONO, BODY} from '../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../anim';
import {Headline, Label, Stage, Sfx} from '../components/Frame';
import {G, Drop, Champagne, Page, Printer, Dialog, Bottle, Cartridge, Groceries, Razor, Blade, Tag, Coin} from '../components/Art';
import {Actor} from '../characters/Actor';
import {Doc} from '../characters/Props';
import {TOP, FLOOR, PRESENTER} from './layout';

const P = PRESENTER;

/* s01 — Title */
export const S01: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tInk = at('printer');
  const tCh = at('champagne');
  return (
    <AbsoluteFill>
      <Headline text="Why does *printer ink* cost more than *champagne?*" start={at('why')} y={TOP} size={100} width={1500} stagger={2} />
      <Stage>
        <G x={640} y={720 + wobble(frame, 10)} s={pop(frame, fps, tInk) * 1.5} r={wobble(frame, 4, 0.05)} shadow>
          <Drop face />
        </G>
        <G x={960} y={740} s={pop(frame, fps, tCh + 6, 9)}>
          <text textAnchor="middle" y={60} fontFamily={DISPLAY} fontSize={220} fill={C.magenta}>&gt;</text>
        </G>
        <G x={1290} y={740} s={pop(frame, fps, tCh) * 1.4} r={wobble(frame + 20, 3, 0.05)} shadow>
          <Champagne fill={lerp(frame, [tCh, tCh + 14], [0, 0.85])} />
        </G>
      </Stage>
      <Sfx name="pop" at={tInk} volume={0.5} />
      <Sfx name="pop" at={tCh} volume={0.5} />
    </AbsoluteFill>
  );
};

/* s02 — One page. A boarding pass, a contract */
const BoardingPass: React.FC<{x: number; y: number; s: number; r?: number}> = (p) => (
  <G {...p} shadow>
    <rect x={-240} y={-110} width={480} height={220} rx={20} fill={C.white} stroke={C.ink} strokeWidth={7} />
    <rect x={-240} y={-110} width={480} height={60} rx={20} fill={C.cyan} stroke={C.ink} strokeWidth={7} />
    <text x={-210} y={-68} fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.white}>BOARDING PASS</text>
    <text x={-210} y={10} fontFamily={DISPLAY} fontSize={54} fill={C.ink}>AMS → JFK</text>
    <text x={-210} y={60} fontFamily={MONO} fontSize={24} fill={C.grey}>GATE D7 · SEAT 14C</text>
    {Array.from({length: 14}).map((_, i) => <rect key={i} x={110 + i * 8} y={-30} width={i % 3 === 0 ? 5 : 3} height={110} fill={C.ink} />)}
  </G>
);

export const S02: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPage = at('print');
  const tOne = at('One.');
  const tPass = at('boarding');
  const tContract = at('contract');
  const tSign = at('sign');
  const tNever = at('never read');
  const sign = ramp(frame, tSign, 14);
  return (
    <AbsoluteFill>
      <Headline text="You need to print *one* page." start={at('you need')} y={TOP} size={84} />
      <Stage>
        <G x={860} y={660} s={pop(frame, fps, tPage)} r={-2} shadow>
          <Page title="PAGE 1 / 1" lines={6} />
        </G>
        <G x={860} y={760} s={pop(frame, fps, tOne, 8) * 1.1} r={-8} o={1 - ramp(frame, tPass, 8)}>
          <text textAnchor="middle" y={110} fontFamily={DISPLAY} fontSize={320} fill={C.magenta} stroke={C.ink} strokeWidth={8}>1</text>
        </G>
        <BoardingPass x={1470} y={510} s={pop(frame, fps, tPass) * 0.8} r={-5} />
        <G x={1470} y={790} s={pop(frame, fps, tContract) * 0.6} r={4} shadow>
          <Page title="CONTRACT" lines={5} w={340} h={440} />
          <path d="M-120,150 c20,-30 40,20 60,-10 s30,-20 50,10 s30,0 60,-20" fill="none" stroke={C.cyan} strokeWidth={6} strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - sign)} />
        </G>
        <Actor who="sam" x={330} y={FLOOR} s={0.72} seed={1}
          keys={[
            {f: tPage, p: {rShoulder: -95, rElbow: 0, lookX: 1, mouth: 'smile'}, d: 8},
            {f: tOne, p: {rShoulder: -165, rElbow: -10, brows: 'raised', mouth: 'grin'}, d: 6, ease: 'out'},
            {f: tPass, p: {rShoulder: -95, rElbow: 0, brows: 'neutral', mouth: 'smile'}, d: 8},
            {f: tNever, p: {blink: 1, mouth: 'smirk', headTilt: -8, lShoulder: 50, lElbow: -110, rShoulder: -50, rElbow: 110}, d: 7},
          ]}
        />
      </Stage>
      <Label text="(never read)" x={1470} y={922} start={tNever} color={C.grey} size={32} />
      <Sfx name="thud" at={tOne} volume={0.6} />
      <Sfx name="pop" at={tPass} volume={0.4} />
      <Sfx name="pop" at={tContract} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s03 — Press print. Out of cyan. */
export const S03: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPress = at('press');
  const click = tPress + 5;
  const tTells = at('tells');
  const tCyan = at('out of cyan');
  const err = frame >= tTells;
  const shake = err ? Math.sin(frame * 2.2) * lerp(frame, [tTells, tTells + 16], [12, 0]) : 0;
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1100 + shake} y={640} s={1.15} shadow>
          <Printer screen={err ? 'ERROR' : frame > click ? 'PRINTING' : 'READY'} screenColor={err ? C.red : C.green} blink={err} frame={frame}
            paper={frame > click && !err ? lerp(frame, [click, tTells], [0, 0.25]) : 0} />
        </G>
        <G x={1100} y={250} s={pop(frame, fps, tCyan, 10) * 0.62} r={-3} shadow>
          <Dialog title="printer.exe" msg="OUT OF CYAN" w={640} />
        </G>
        <Actor who="sam" x={690} y={FLOOR} s={0.78} seed={2}
          start={{lookX: 1}}
          keys={[
            {f: tPress - 6, p: {rShoulder: -110, rElbow: 0, mouth: 'smile'}, d: 6},
            {f: click + 4, p: {rShoulder: -20, rElbow: 0}, d: 8},
            {f: tTells, p: {mouth: 'o', brows: 'raised', lShoulder: 150, lElbow: 30, rShoulder: -150, rElbow: -30, y: -16}, d: 5, ease: 'out'},
            {f: tTells + 6, p: {y: 0}, d: 8},
          ]}
          emotes={[{f: tTells, kind: '!'}]}
        />
      </Stage>
      <Sfx name="click" at={click} volume={0.7} />
      <Sfx name="error" at={tCyan} volume={0.55} />
    </AbsoluteFill>
  );
};

/* s04 — Printing in black and white */
export const S04: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBW = at('black');
  return (
    <AbsoluteFill>
      <Headline text="You're printing in *black & white.*" start={at("you're")} y={TOP} size={84} />
      <Stage>
        <Actor who="sam" x={620} y={FLOOR} s={0.9} seed={3}
          start={{mouth: 'flat', brows: 'neutral', rShoulder: -50, rElbow: -60}}
          keys={[{f: tBW, p: {brows: 'oneUp', headTilt: -5, lookX: 1}, d: 8}]}
          rHand={<Doc title="B&W" r={-6} />}
        />
        <G x={1300} y={660} s={pop(frame, fps, at("you're")) * 1.3} r={wobble(frame, 6, 0.1)} shadow>
          <Drop color={C.cyan} face />
        </G>
        <G x={1300} y={660} s={pop(frame, fps, tBW, 8) * 1.3}>
          <line x1={-110} y1={-130} x2={110} y2={100} stroke={C.red} strokeWidth={16} strokeLinecap="round" />
        </G>
        <G x={1500} y={500} s={pop(frame, fps, tBW + 4, 8)} r={12}>
          <text textAnchor="middle" fontFamily={DISPLAY} fontSize={170} fill={C.magenta} stroke={C.ink} strokeWidth={6}>?</text>
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s05 — Price per millilitre */
export const S05: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const base = 900;
  const tNum = at('numbers');
  const tInk = at('the ink');
  const tCh = at('champagne');
  const tPerf = at('perfumes');
  const bars = [
    {label: 'Vintage champagne', color: C.yellow, h: 180, t: tCh, x: 820, bottom: 125, icon: <Champagne />},
    {label: 'Luxury perfume', color: C.magenta, h: 270, t: tPerf, x: 1160, bottom: 90, icon: <Bottle kind="perfume" color={C.magenta} label="Nº 5" />},
    {label: 'Printer ink', color: C.cyan, h: 440, t: tInk, x: 1500, bottom: 130, icon: <Cartridge color={C.cyan} label="INK" />},
  ];
  return (
    <AbsoluteFill>
      <Headline text="Let's talk *numbers.*" start={at("let's")} y={TOP} size={84} />
      <Label text="PRICE PER MILLILITRE" x={1160} y={250} start={at('measured')} color={C.grey} size={30} />
      <Stage>
        <line x1={620} y1={base} x2={620 + 1080 * ramp(frame, tNum, 14)} y2={base} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        {bars.map((b) => {
          const g = pop(frame, fps, b.t, 11);
          const h = b.h * g;
          return (
            <g key={b.label}>
              <rect x={b.x - 110} y={base - h} width={220} height={h} rx={14} fill={b.color} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(9px 9px 0 ${C.ink})`}} />
              <G x={b.x} y={base - h - 10 - b.bottom * 0.48} s={g * 0.48}>{b.icon}</G>
              <text x={b.x} y={base + 52} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink} opacity={g}>{b.label}</text>
            </g>
          );
        })}
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={4}
          keys={[
            {f: tNum, p: {rShoulder: -100, rElbow: 0, lookX: 1, mouth: 'smile'}, d: 8},
            {f: tInk, p: {mouth: 'o', brows: 'raised'}, d: 6},
            {f: tPerf, p: {lShoulder: 150, lElbow: 30, rShoulder: -150, rElbow: -30, mouth: 'open'}, d: 6, ease: 'out'},
          ]}
          emotes={[{f: tPerf, kind: '!', d: 40}]}
        />
      </Stage>
      <Label text="illustrative · not to scale" x={1160} y={1000} start={tInk} color={C.grey} size={22} />
      <Sfx name="pop" at={tInk} volume={0.5} />
      <Sfx name="pop" at={tCh} volume={0.4} />
      <Sfx name="pop" at={tPerf} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s06 — Podium of expensive liquids */
export const S06: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLegal = at('legally');
  const items = [
    {x: 860, h: 300, n: '1', c: C.cyan, bottom: 130, t: at('liquids'), el: <Cartridge color={C.cyan} label="INK" />},
    {x: 520, h: 200, n: '2', c: C.magenta, bottom: 90, t: at('most expensive'), el: <Bottle kind="perfume" color={C.magenta} label="Nº 5" />},
    {x: 1200, h: 140, n: '3', c: C.yellow, bottom: 150, t: at('compared'), el: <Bottle kind="wine" color={C.green} label="BRUT" />},
  ];
  const crown = pop(frame, fps, tLegal, 8);
  return (
    <AbsoluteFill>
      <Headline text="Among the priciest liquids you can *legally* buy" start={at('consumer')} y={TOP} size={66} width={1500} stagger={2} />
      <Stage>
        {items.map((it) => {
          const p = pop(frame, fps, it.t);
          return (
            <g key={it.n}>
              <G x={it.x} y={FLOOR} s={p}>
                <rect x={-150} y={-it.h} width={300} height={it.h} fill={C.white} stroke={C.ink} strokeWidth={7} />
                <text textAnchor="middle" y={-it.h + 90} fontFamily={DISPLAY} fontSize={80} fill={it.c} stroke={C.ink} strokeWidth={4}>{it.n}</text>
              </G>
              <G x={it.x} y={FLOOR - it.h - 12 - it.bottom * 0.62} s={p * 0.62} shadow>{it.el}</G>
            </g>
          );
        })}
        <G x={860} y={FLOOR - 300 - 12 - 260 * 0.62 - 45 - 14 * crown} s={crown * 0.9} r={wobble(frame, 5, 0.12)}>
          <path d="M-80,40 L-90,-40 L-45,0 L0,-60 L45,0 L90,-40 L80,40 Z" fill={C.yellow} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
        </G>
        <Actor who="sam" x={P.right} y={FLOOR} s={P.s} flip seed={5}
          start={{lookX: 1}}
          keys={[{f: tLegal, p: {mouth: 'o', brows: 'raised', lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80}, d: 6, ease: 'out'}]}
          emotes={[{f: tLegal + 4, kind: 'sweat'}]}
        />
      </Stage>
      <Sfx name="ding" at={tLegal} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s07 — What ink is made of */
export const S07: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tRare = at('rare');
  const layers = [
    {label: 'Water', sub: 'most of it', c: '#9EDCEB', h: 300, t: at('water')},
    {label: 'Pigment or dye', sub: 'the colour', c: C.cyan, h: 80, t: at('pigment')},
    {label: 'Additives', sub: 'stops it drying out', c: C.yellow, h: 40, t: at('chemicals')},
  ];
  let acc = 0;
  return (
    <AbsoluteFill>
      <Headline text="Ink isn't *rare.*" start={at('ink')} y={TOP} size={96} />
      <Stage>
        <G x={780} y={660} s={pop(frame, fps, at('ink'))}>
          <defs>
            <clipPath id="beaker"><path d="M-170,-220 v400 a30,30 0 0 0 30,30 h280 a30,30 0 0 0 30,-30 v-400 z" /></clipPath>
          </defs>
          <g clipPath="url(#beaker)">
            {layers.map((l) => {
              const h = l.h * ramp(frame, l.t, 14);
              const y = 210 - acc - h;
              acc += h;
              return <rect key={l.label} x={-200} y={y} width={400} height={h + 2} fill={l.c} />;
            })}
          </g>
          <path d="M-190,-220 h20 v400 a30,30 0 0 0 30,30 h280 a30,30 0 0 0 30,-30 v-400 h20" fill="none" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={110} x2={150} y1={-150 + i * 80} y2={-150 + i * 80} stroke={C.ink} strokeWidth={5} />)}
        </G>
        <Actor who="scientist" x={P.left} y={FLOOR} s={P.s} seed={6}
          start={{lookX: 1}}
          keys={[
            {f: tRare, p: {lShoulder: 50, lElbow: -120, rShoulder: -50, rElbow: 120, brows: 'raised', mouth: 'flat'}, d: 8},
            {f: at('water'), p: {lShoulder: 12, lElbow: -6, rShoulder: -100, rElbow: 0, mouth: 'smile', brows: 'neutral'}, d: 8},
          ]}
        />
      </Stage>
      {layers.map((l, i) => {
        const p = pop(frame, fps, l.t);
        return (
          <div key={l.label} style={{position: 'absolute', left: 1080, top: 410 + i * 160, display: 'flex', alignItems: 'center', gap: 28, opacity: p, transform: `translateX(${(1 - p) * 80}px)`}}>
            <div style={{width: 70, height: 70, borderRadius: 16, background: l.c, border: `7px solid ${C.ink}`}} />
            <div>
              <div style={{fontFamily: DISPLAY, fontSize: 54, color: C.ink}}>{l.label}</div>
              <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, color: C.grey}}>{l.sub}</div>
            </div>
          </div>
        );
      })}
      {layers.map((l) => <Sfx key={l.label} name="pop" at={l.t} volume={0.35} />)}
    </AbsoluteFill>
  );
};

/* s08 — Coloured water vs groceries */
export const S08: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMl = at('milliliters');
  const tWeek = at('weekly');
  const tMore = at('cost more');
  const tilt = lerp(frame, [tMore, tMore + 22], [0, -14]);
  const cx = 1120;
  const py = 560;
  const R = 380;
  const rad = (tilt * Math.PI) / 180;
  const lx = cx - Math.cos(rad) * R, ly = py - Math.sin(rad) * R;
  const rx = cx + Math.cos(rad) * R, ry = py + Math.sin(rad) * R;
  return (
    <AbsoluteFill>
      <Headline text="Coloured water vs. *weekly groceries*" start={at('so why')} y={TOP} size={76} />
      <Stage>
        <g opacity={ramp(frame, at('so why'), 10)}>
          <path d={`M${cx - 70},${FLOOR} h140 l-40,-50 h-60 z`} fill={C.ink} />
          <rect x={cx - 10} y={py} width={20} height={FLOOR - py - 40} fill={C.ink} />
          <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
          <circle cx={cx} cy={py} r={22} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
          {[[lx, ly], [rx, ry]].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2={x - 110} y2={y + 170} stroke={C.ink} strokeWidth={5} />
              <line x1={x} y1={y} x2={x + 110} y2={y + 170} stroke={C.ink} strokeWidth={5} />
              <path d={`M${x - 150},${y + 170} h300 a150,40 0 0 1 -300,0 z`} fill={C.white} stroke={C.ink} strokeWidth={7} />
            </g>
          ))}
        </g>
        <G x={lx} y={ly + 112} s={pop(frame, fps, tMl) * 0.45} shadow><Cartridge color={C.magenta} label="INK" /></G>
        <G x={rx} y={ry + 110} s={pop(frame, fps, tWeek) * 0.6} shadow><Groceries /></G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={7}
          start={{lookX: 1}}
          keys={[
            {f: tMl, p: {rShoulder: -100, rElbow: 0, mouth: 'smile'}, d: 8},
            {f: tMore, p: {mouth: 'o', brows: 'raised', lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80}, d: 6, ease: 'out'},
          ]}
          emotes={[{f: tMore + 4, kind: '?'}]}
        />
      </Stage>
      <Sfx name="thud" at={tMore + 18} volume={0.5} />
    </AbsoluteFill>
  );
};

/* s09 — Printers ≈ razors */
export const S09: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPr = at('printers');
  const tRaz = at('razors');
  return (
    <AbsoluteFill>
      <Headline text="The *razor-and-blades* model" start={at('called')} y={TOP} size={84} hl={C.cyan} />
      <Stage>
        <G x={800} y={680} s={pop(frame, fps, tPr) * 0.8} shadow><Printer /></G>
        <G x={1140} y={660} s={pop(frame, fps, tRaz + 4, 8)}>
          <text textAnchor="middle" y={40} fontFamily={DISPLAY} fontSize={150} fill={C.magenta} stroke={C.ink} strokeWidth={5}>≈</text>
        </G>
        <G x={1480} y={560} s={pop(frame, fps, tRaz) * 0.8} r={-18} shadow><Razor /></G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={8}
          start={{lookX: 1}}
          keys={[
            {f: tPr, p: {rShoulder: -95, rElbow: 0, mouth: 'smile'}, d: 8},
            {f: tRaz, p: {rShoulder: -120, rElbow: 0, brows: 'raised'}, d: 8},
          ]}
        />
      </Stage>
      <Sfx name="pop" at={tPr} volume={0.4} />
      <Sfx name="pop" at={tRaz} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s10 — Cheap razor, blades forever */
export const S10: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSell = at('sell');
  const tCheap = at('cheap');
  const tLoss = at('loss');
  const tBlades = at('blades');
  const tForever = at('forever');
  const n = Math.max(0, Math.min(15, Math.floor((frame - tBlades) / 5)));
  const total = Math.max(0, frame - tBlades) * 0.9;
  return (
    <AbsoluteFill>
      <Label text="THE RAZOR" x={500} y={180} start={tSell} size={40} />
      <Label text="THE BLADES" x={1400} y={180} start={tBlades} size={40} />
      <Stage>
        <line x1={960} y1={260} x2={960} y2={FLOOR - 420} stroke={C.soft} strokeWidth={5} strokeDasharray="14 14" opacity={ramp(frame, tBlades, 10)} />
        <G x={500} y={520} s={pop(frame, fps, tSell) * 0.7} r={-15} shadow><Razor /></G>
        <G x={500} y={830} s={pop(frame, fps, tCheap, 10)} r={-4} shadow>
          <Tag text={frame >= tLoss ? '−$' : 'FREE'} color={frame >= tLoss ? C.red : C.yellow} w={frame >= tLoss ? 160 : 210} />
        </G>
        {Array.from({length: n}).map((_, i) => {
          const d = pop(frame, fps, tBlades + i * 5, 14);
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <G key={i} x={1260 + col * 140} y={lerp(d, [0, 1], [-100, FLOOR - 30 - row * 60])} s={0.55} r={(i % 2) * 4 - 2} shadow>
              <Blade color={[C.white, C.cyan, C.yellow][i % 3]} />
            </G>
          );
        })}
        <G x={1540} y={320} s={pop(frame, fps, tBlades + 6)}>
          <Coin />
          <text x={66} y={18} fontFamily={DISPLAY} fontSize={54} fill={C.green}>+{Math.floor(total)}</text>
        </G>
        <G x={1260} y={360} s={pop(frame, fps, tForever, 8)} r={wobble(frame, 3)}>
          <text textAnchor="middle" y={60} fontFamily={DISPLAY} fontSize={190} fill={C.magenta} stroke={C.ink} strokeWidth={6}>∞</text>
        </G>
        <Actor who="salesman" x={960} y={FLOOR} s={0.66} seed={9}
          keys={[
            {f: tSell, p: {lShoulder: 100, lElbow: 0, lookX: -1, mouth: 'grin'}, d: 8},
            {f: tBlades, p: {lShoulder: 12, lElbow: -6, rShoulder: -100, rElbow: 0, lookX: 1}, d: 8},
            {f: tForever, p: {rShoulder: -40, rElbow: -100, lShoulder: 40, lElbow: 100, mouth: 'grin', brows: 'smug'}, d: 8},
          ]}
          talk={[[tSell, tLoss + 10]]}
          emotes={[{f: tForever, kind: 'sparkle'}]}
        />
      </Stage>
      <Sfx name="cash" at={tBlades + 8} volume={0.45} />
      <Sfx name="cash" at={tForever} volume={0.45} />
    </AbsoluteFill>
  );
};
