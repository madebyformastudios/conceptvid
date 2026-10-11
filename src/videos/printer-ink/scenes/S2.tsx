import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, MONO, BODY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Label, Stage, Sfx} from '../../../components/Frame';
import {G, Printer, Cartridge, Stamp, Arrow, Razor, Blade, Tag, Coin, Chip, Dialog, Gavel, Page} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {HeldCartridge, Magnifier} from '../../../characters/Props';
import {TOP, FLOOR, PRESENTER} from '../../../components/layout';

const P = PRESENTER;

/* s11 — Printer companies perfected the idea (Gerald enters) */
export const S11: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCo = at('printer companies');
  const tTook = at('took');
  const tIdea = at('idea');
  const tPerf = at('perfected');
  return (
    <AbsoluteFill>
      <Headline text="Printer companies *perfected* it." start={tCo} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <G x={360} y={600} s={0.55} r={-18} o={1 - ramp(frame, tIdea, 10) * 0.6} shadow><Razor /></G>
        <G x={440} y={800} s={0.42} r={8} o={1 - ramp(frame, tIdea, 10) * 0.6} shadow><Blade /></G>
        <Arrow x1={520} y1={680} x2={660} y2={680} t={ramp(frame, tTook, 10)} w={12} />
        <G x={900} y={700} s={pop(frame, fps, tIdea) * 0.72} shadow><Printer screen="$$$" frame={frame} /></G>
        {[0, 1, 2].map((i) => (
          <G key={i} x={1200 + i * 110} y={720} s={pop(frame, fps, tIdea + 4 + i * 3) * 0.4} shadow>
            <Cartridge color={[C.cyan, C.magenta, C.yellow][i]} label={['C', 'M', 'Y'][i]} />
          </G>
        ))}
        <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip seed={11} enter={tCo}
          start={{lookX: 1, mouth: 'smirk', brows: 'smug', lShoulder: 40, lElbow: -100, rShoulder: -40, rElbow: 100}}
          keys={[{f: tPerf, p: {lShoulder: 140, lElbow: 20, mouth: 'grin'}, d: 7, ease: 'out'}]}
          emotes={[{f: tPerf, kind: 'sparkle'}]}
        />
      </Stage>
      <Sfx name="pop" at={tCo} volume={0.4} />
      <Sfx name="ding" at={tPerf} volume={0.4} />
    </AbsoluteFill>
  );
};

const Gauge: React.FC<{needle: number}> = ({needle}) => (
  <g>
    <path d="M-300,0 A300,300 0 0 1 0,-300" fill="none" stroke={C.red} strokeWidth={60} />
    <path d="M0,-300 A300,300 0 0 1 300,0" fill="none" stroke={C.green} strokeWidth={60} />
    <path d="M-330,0 A330,330 0 0 1 330,0" fill="none" stroke={C.ink} strokeWidth={7} />
    <path d="M-270,0 A270,270 0 0 1 270,0" fill="none" stroke={C.ink} strokeWidth={7} />
    <text x={-300} y={60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.red}>LOSS</text>
    <text x={300} y={60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.green}>PROFIT</text>
    <g transform={`rotate(${-needle})`}><line x1={0} y1={0} x2={0} y2={-250} stroke={C.ink} strokeWidth={14} strokeLinecap="round" /></g>
    <circle r={30} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
  </g>
);

/* s12 — The $49 printer, the profit gauge, Gerald's shrug */
export const S12: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPr = at('that printer');
  const tFifty = at('fifty');
  const tManu = at('manufacturer');
  const tEven = at('break even');
  const tLose = at('lose money');
  const tCare = at("don't care");
  const needle = frame < tEven ? lerp(frame, [tManu, tEven], [70, 20]) : frame < tLose ? lerp(frame, [tEven, tEven + 12], [20, 0]) : lerp(frame, [tLose, tLose + 14], [0, -55]) + wobble(frame, 2, 0.5);
  return (
    <AbsoluteFill>
      <Headline text="They don't *care.*" start={tCare} y={TOP} size={84} />
      <Stage>
        <G x={430} y={700} s={pop(frame, fps, tPr) * 0.72} shadow><Printer /></G>
        <G x={620} y={430} s={pop(frame, fps, tFifty, 10)} r={12 + wobble(frame, 6, 0.12)} shadow><Tag text="$49" w={210} /></G>
        <G x={1080} y={820} s={pop(frame, fps, tManu, 14) * 0.72}><Gauge needle={needle} /></G>
        <text x={1080} y={900} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.ink} opacity={ramp(frame, tManu, 10)}>PROFIT ON THE PRINTER</text>
        <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip seed={12}
          start={{lookX: 1, mouth: 'smirk', brows: 'smug'}}
          keys={[
            {f: tLose, p: {mouth: 'flat', brows: 'raised'}, d: 6},
            {f: tCare, p: {lShoulder: 60, lElbow: -120, rShoulder: -60, rElbow: 120, headTilt: -10, mouth: 'smirk', brows: 'smug'}, d: 8, ease: 'out'},
          ]}
        />
      </Stage>
      <Sfx name="cash" at={tFifty} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s13 — You are the product */
export const S13: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNot = at("isn't");
  const tYou = at('you are');
  return (
    <AbsoluteFill>
      <Headline text="The printer isn't the product. *You are.*" start={at('the printer')} y={TOP} size={72} hl={C.magenta} />
      <Stage>
        <G x={420} y={720} s={0.5} o={1 - ramp(frame, tYou, 10) * 0.5}>
          <Printer />
          <line x1={-280} y1={-280} x2={-280 + 560 * ramp(frame, tNot, 10)} y2={-280 + 440 * ramp(frame, tNot, 10)} stroke={C.red} strokeWidth={24} strokeLinecap="round" />
        </G>
        <Actor who="sam" x={960} y={FLOOR} s={0.8} seed={13}
          start={{mouth: 'flat', lookX: 1}}
          keys={[{f: tYou, p: {mouth: 'o', brows: 'raised', lookX: 0}, d: 6, ease: 'out'}]}
          emotes={[{f: tYou + 4, kind: 'sweat'}]}
        />
        <G x={960} y={720} s={pop(frame, fps, tYou, 10) * 0.75} r={-6}>
          <line x1={-40} y1={-120} x2={-10} y2={-40} stroke={C.ink} strokeWidth={5} />
          <line x1={40} y1={-120} x2={-10} y2={-40} stroke={C.ink} strokeWidth={5} />
          <Tag text="YOU" color={C.magenta} w={200} />
        </G>
        <Actor who="gerald" x={1500} y={FLOOR} s={0.72} flip seed={14}
          start={{lookX: 1, mouth: 'grin', brows: 'smug', lShoulder: 70, lElbow: 10}}
          lHand={<Magnifier r={-60} />}
        />
      </Stage>
      <Sfx name="pop" at={tYou} volume={0.5} />
    </AbsoluteFill>
  );
};

/* s14 — Starter cartridges */
export const S14: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tStarter = at('starter');
  const tLook = at('look exactly');
  const tLess = at('less ink');
  const tLot = at('a lot less');
  const xray = ramp(frame, tLess, 12);
  const lvl = frame < tLot ? 0.45 : lerp(frame, [tLot, tLot + 20], [0.45, 0.12]);
  return (
    <AbsoluteFill>
      <Headline text="So-called *starter* cartridges" start={at('so-called')} y={TOP} size={84} />
      <Stage>
        <G x={880} y={620} s={pop(frame, fps, tStarter) * 1.15} shadow><Cartridge color={C.magenta} label="INK" xray={xray} level={lvl} /></G>
        <G x={1460} y={620} s={pop(frame, fps, at('real ones')) * 1.15} shadow><Cartridge color={C.magenta} label="INK" xray={xray} level={0.95} /></G>
        <G x={1170} y={620} s={pop(frame, fps, tLook, 9) * (1 - xray)}>
          <text textAnchor="middle" y={40} fontFamily={DISPLAY} fontSize={150} fill={C.ink}>=</text>
        </G>
        <G x={1170} y={620} s={xray}>
          <text textAnchor="middle" y={40} fontFamily={DISPLAY} fontSize={150} fill={C.red}>≠</text>
        </G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={15}
          start={{lookX: 1}}
          keys={[
            {f: tStarter, p: {rShoulder: -100, rElbow: 0, mouth: 'smile'}, d: 8},
            {f: tLess, p: {mouth: 'o', brows: 'raised', rShoulder: -20}, d: 6},
            {f: tLot, p: {mouth: 'frown', brows: 'angry'}, d: 8},
          ]}
          emotes={[{f: tLot, kind: 'anger'}]}
        />
      </Stage>
      <Label text="STARTER" x={880} y={820} start={tStarter} size={40} color={C.magenta} />
      <Label text="REGULAR" x={1460} y={820} start={at('real ones')} size={40} />
      <Sfx name="pop" at={tLess} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s15 — Running out early: pure coincidence */
export const S15: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const x0 = 380;
  const y0 = 880;
  const w = 1180;
  const h = 520;
  const ax = ramp(frame, 0, 14);
  const tFirst = at('first time');
  const actual = ramp(frame, tFirst, 22);
  const expected = ramp(frame, at('sooner'), 26);
  const emptyX = x0 + w * 0.28;
  const tBuy = at('start buying');
  const coins = Math.max(0, Math.min(7, Math.floor((frame - tBuy) / 5)));
  const tPure = at('pure coincidence');
  const tCo = at('coincidentally');
  return (
    <AbsoluteFill>
      <Stage>
        <line x1={x0} y1={y0} x2={x0 + w * ax} y2={y0} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <line x1={x0} y1={y0} x2={x0} y2={y0 - h * ax} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <text x={x0 - 24} y={y0 - h + 20} textAnchor="end" fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink} opacity={ax}>INK</text>
        <text x={x0 + w} y={y0 + 50} textAnchor="end" fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink} opacity={ax}>TIME →</text>
        <path d={`M${x0},${y0 - h + 40} L${x0 + w * 0.9},${y0}`} fill="none" stroke={C.grey} strokeWidth={8} pathLength={1} style={{strokeDasharray: `${expected} 1`}} />
        <text x={x0 + w * 0.62} y={y0 - h * 0.44} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.grey} opacity={expected}>what you expected</text>
        <path d={`M${x0},${y0 - h + 40} L${emptyX},${y0}`} fill="none" stroke={C.magenta} strokeWidth={12} strokeLinecap="round" pathLength={1} style={{strokeDasharray: `${actual} 1`}} />
        <G x={emptyX} y={y0} s={pop(frame, fps, at('run out'), 9)}>
          <circle r={24} fill={C.red} stroke={C.ink} strokeWidth={6} />
          <text y={70} textAnchor="middle" fontFamily={DISPLAY} fontSize={38} fill={C.red}>EMPTY</text>
        </G>
        {Array.from({length: coins}).map((_, i) => (
          <G key={i} x={emptyX + 90 + i * 105} y={y0 - 80 - (i % 2) * 40} s={pop(frame, fps, tBuy + i * 5, 10) * 0.8}><Coin /></G>
        ))}
        <G x={1080} y={330} s={pop(frame, fps, tPure, 9) * 0.9} r={-8}><Stamp text="COINCIDENCE?" color={C.red} /></G>
        <Actor who="gerald" x={1740} y={FLOOR} s={0.58} flip seed={16} enter={tCo}
          start={{lookX: 1, mouth: 'smirk', brows: 'smug', lShoulder: 40, lElbow: -100, rShoulder: -40, rElbow: 100}}
          keys={[{f: tCo + 6, p: {blink: 1, headTilt: -8}, d: 4}, {f: tCo + 18, p: {blink: 0, headTilt: 0}, d: 6}]}
        />
      </Stage>
      <Label text="(absolutely.)" x={1080} y={420} start={at('absolutely')} color={C.grey} size={36} />
      <Sfx name="cash" at={tBuy} volume={0.4} />
      <Sfx name="thud" at={tPure} volume={0.6} />
    </AbsoluteFill>
  );
};

/* s16 — Cheaper ink from another brand */
export const S16: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFine = at('fine');
  const tCheap = at('cheaper');
  const tThought = at('thought of that');
  const eyes = ramp(frame, tThought, 12);
  return (
    <AbsoluteFill>
      <Headline text="“I'll just buy *cheaper* ink.”" start={tFine} y={TOP} size={84} />
      <Stage>
        <G x={700} y={640} s={pop(frame, fps, tFine)} shadow><Cartridge color={C.cyan} label="BRAND" /></G>
        <G x={700} y={880} s={pop(frame, fps, tFine)} r={-4}><Tag text="$$$" color={C.red} w={200} strike={ramp(frame, tCheap, 10)} /></G>
        <G x={1020} y={640} s={pop(frame, fps, tCheap)} shadow><Cartridge color={C.cyan} label="OTHER" cheap /></G>
        <G x={1020} y={880} s={pop(frame, fps, tCheap)} r={4}><Tag text="$" color={C.green} w={150} /></G>
        <G x={1520} y={700 - 16 * eyes} s={pop(frame, fps, tThought - 6, 14) * 0.85} shadow>
          <Printer eyes={eyes} screen="I SEE YOU" screenColor={C.red} />
        </G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={17}
          start={{lookX: 1, mouth: 'smile'}}
          keys={[
            {f: tCheap, p: {rShoulder: -100, rElbow: 0, mouth: 'grin', brows: 'raised'}, d: 8},
            {f: tThought + 4, p: {mouth: 'o', rShoulder: -12, rElbow: 6}, d: 6},
          ]}
          emotes={[{f: tThought + 4, kind: '!'}]}
        />
      </Stage>
      <Sfx name="pop" at={tCheap} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s17 — The chip, officially and unofficially */
export const S17: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tChip = at('small chip');
  const tOff = at('officially');
  const tUn = at('unofficially');
  const card = (x: number, title: string, color: string, rows: string[], p: number, rowT: number[]) => (
    <div style={{position: 'absolute', left: x, top: 300, width: 480, padding: '30px 34px', background: C.white, border: `7px solid ${C.ink}`, borderRadius: 26, boxShadow: `10px 10px 0 ${C.ink}`, opacity: p, transform: `translateY(${(1 - p) * 60}px) rotate(${x < 900 ? -2 : 2}deg)`}}>
      <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color, marginBottom: 16}}>{title}</div>
      {rows.map((r, i) => {
        const rp = pop(frame, fps, rowT[i]);
        return <div key={r} style={{fontFamily: BODY, fontWeight: 800, fontSize: 38, color: C.ink, lineHeight: 1.25, marginTop: 12, opacity: rp, transform: `translateX(${(1 - rp) * 30}px)`}}>{r}</div>;
      })}
    </div>
  );
  return (
    <AbsoluteFill>
      <Headline text="A tiny *chip*" start={tChip} y={TOP} size={84} hl={C.cyan} />
      <Stage>
        <G x={960} y={470} s={pop(frame, fps, tChip) * 0.6} r={wobble(frame, 3, 0.05)}><Chip glow={ramp(frame, tUn, 12)} /></G>
        <Actor who="sam" x={960} y={FLOOR} s={0.5} seed={18}
          start={{lookY: -1, mouth: 'o', brows: 'raised'}}
          keys={[{f: tUn, p: {mouth: 'flat', brows: 'angry', lookX: 1}, d: 8}]}
        />
      </Stage>
      {card(110, 'OFFICIALLY', C.green, ['✓ Tracks ink levels', '✓ Print quality'], pop(frame, fps, tOff), [at('tracks'), at('helps')])}
      {card(1310, 'UNOFFICIALLY', C.red, ['Is this ink…', 'genuine?'], pop(frame, fps, tUn), [at('check'), at('genuine')])}
      <Sfx name="pop" at={tChip} volume={0.45} />
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
      <Headline text="If it isn't genuine…" start={at('if it')} y={TOP} size={84} />
      <Stage>
        {ds.map((d, i) => (
          <G key={i} x={640 + i * 200} y={440 + i * 170} s={pop(frame, fps, d.t, 10) * 0.9} r={[-3, 2, -1][i]} shadow>
            <Dialog title={d.title} msg={d.msg} color={d.c} w={800} icon={d.icon} />
          </G>
        ))}
        <Actor who="sam" x={P.right} y={FLOOR} s={P.s} flip seed={19}
          start={{lookX: 1, mouth: 'flat'}}
          keys={ds.flatMap((d) => [
            {f: d.t, p: {y: -14, mouth: 'o' as const, brows: 'raised' as const, lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80}, d: 4, ease: 'out' as const},
            {f: d.t + 5, p: {y: 0}, d: 6},
          ])}
          emotes={[{f: ds[2].t + 4, kind: 'sweat'}]}
        />
      </Stage>
      {ds.map((d, i) => <Sfx key={i} name="error" at={d.t} volume={0.35} />)}
    </AbsoluteFill>
  );
};

/* s19 — The firmware update */
export const S19: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCheaper = at('cheaper');
  const tFine = at('perfectly fine');
  const tSud = at('suddenly');
  const tFw = at('firmware update');
  const tWorse = at('worse');
  const tPurpose = at('on purpose');
  const prog = lerp(frame, [tSud, tFw], [0, 1]);
  const bad = frame >= tFw;
  return (
    <AbsoluteFill>
      <Stage>
        <G x={700 + (bad ? Math.sin(frame * 2) * lerp(frame, [tFw, tFw + 14], [10, 0]) : 0)} y={700} s={0.75} shadow>
          <Printer screen={bad ? 'REJECTED' : 'READY'} screenColor={bad ? C.red : C.green} blink={bad} frame={frame} />
        </G>
        <G x={700} y={330} s={bad ? 0 : pop(frame, fps, tFine, 9)}>
          <circle r={60} fill={C.green} stroke={C.ink} strokeWidth={7} />
          <path d="M-25,0 l18,20 l32,-38" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <G x={700} y={330} s={bad ? pop(frame, fps, tFw, 9) : 0}>
          <circle r={60} fill={C.red} stroke={C.ink} strokeWidth={7} />
          <path d="M-22,-22 L22,22 M22,-22 L-22,22" stroke={C.white} strokeWidth={14} strokeLinecap="round" />
        </G>
        <G x={1400} y={360} s={pop(frame, fps, tSud) * 0.72} shadow>
          <rect x={-380} y={-110} width={760} height={220} rx={18} fill={C.white} stroke={C.ink} strokeWidth={7} />
          <text x={-340} y={-40} fontFamily={MONO} fontWeight={700} fontSize={32} fill={C.ink}>Installing firmware update…</text>
          <rect x={-340} y={10} width={680} height={50} rx={25} fill={C.paperDark} stroke={C.ink} strokeWidth={6} />
          <rect x={-334} y={16} width={668 * prog} height={38} rx={19} fill={C.cyan} />
        </G>
        <G x={1400} y={790} o={ramp(frame, tWorse, 8)}>
          <line x1={-260} y1={110} x2={260} y2={110} stroke={C.ink} strokeWidth={6} />
          <line x1={-260} y1={110} x2={-260} y2={-110} stroke={C.ink} strokeWidth={6} />
          <text x={-240} y={-86} fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink}>YOUR PRINTER</text>
          <Arrow x1={-210} y1={-40} x2={220} y2={90} t={ramp(frame, tWorse, 16)} color={C.red} w={14} />
        </G>
        <G x={1400} y={590} s={pop(frame, fps, tPurpose, 9) * 0.7} r={-5}><Stamp text="ON PURPOSE" color={C.magenta} /></G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={20}
          start={{lookX: 1, mouth: 'smile'}}
          keys={[
            {f: tFine, p: {mouth: 'grin', rShoulder: -100, rElbow: 0}, d: 8},
            {f: tFw, p: {mouth: 'o', brows: 'raised', rShoulder: -20, y: -14}, d: 5, ease: 'out'},
            {f: tFw + 6, p: {y: 0}, d: 6},
            {f: tWorse, p: {mouth: 'frown', brows: 'angry'}, d: 8},
          ]}
          rHand={frame >= tCheaper && frame < tFw ? <HeldCartridge color={C.cyan} label="OTHER" cheap s={0.36} /> : undefined}
          emotes={[{f: tWorse + 4, kind: 'anger'}]}
        />
      </Stage>
      <Sfx name="error" at={tFw} volume={0.45} />
      <Sfx name="thud" at={tPurpose} volume={0.6} />
    </AbsoluteFill>
  );
};

/* s20 — Lawsuits, settlements, the angry internet */
export const S20: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLaw = at('lawsuits');
  const tSettle = at('settlements');
  const tAngry = at('angry');
  const swing = frame < tLaw ? -40 : lerp(frame, [tLaw, tLaw + 6], [-40, 0]);
  const crowd: ['angry1' | 'angry2' | 'angry3' | 'sam', number, string][] = [['angry1', 1110, '#@%!'], ['angry2', 1320, 'SCAM!'], ['angry3', 1530, '>:('], ['sam', 1740, '!!!']];
  return (
    <AbsoluteFill>
      <Headline text="Lawsuits. Settlements. *Angry* internet." start={tLaw} y={TOP} size={72} stagger={6} />
      <Stage>
        <G x={320} y={700} s={pop(frame, fps, tLaw - 6) * 0.8}>
          <rect x={-120} y={120} width={240} height={50} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={7} />
          <G x={60} y={60} r={swing}><Gavel /></G>
        </G>
        <G x={700} y={640} s={pop(frame, fps, tSettle) * 0.72} r={-5} shadow><Page title="SETTLEMENT" lines={6} /></G>
        {crowd.map(([who, x, say], i) => (
          <g key={i}>
            <Actor who={who} x={x} y={FLOOR} s={0.48} seed={30 + i} enter={tAngry + i * 3}
              start={{mouth: 'open', brows: 'angry', lShoulder: 140, lElbow: 40, rShoulder: -140, rElbow: -40}}
              talk={[[tAngry, tAngry + 240]]}
            />
            <G x={x} y={560 - (i % 2) * 50} s={pop(frame, fps, tAngry + 6 + i * 3, 10) * 0.7} r={i % 2 ? 6 : -6}>
              <rect x={-say.length * 17 - 25} y={-60} width={say.length * 34 + 50} height={90} rx={24} fill={C.white} stroke={C.ink} strokeWidth={6} />
              <text y={8} textAnchor="middle" fontFamily={DISPLAY} fontSize={50} fill={C.red}>{say}</text>
            </G>
          </g>
        ))}
      </Stage>
      <Label text="(its natural state)" x={1300} y={968} start={at('natural')} color={C.grey} size={32} />
      <Sfx name="thud" at={tLaw} volume={0.7} />
      <Sfx name="pop" at={tSettle} volume={0.4} />
    </AbsoluteFill>
  );
};

