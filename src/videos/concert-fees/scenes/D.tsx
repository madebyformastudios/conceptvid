import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Coin, Cursor} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {TOP, FLOOR} from '../../../components/layout';
import {ConcertTicket, Receipt, ReceiptLine, Courthouse, Badge, Venue, Pie, Contract, Phone, Button, Bubble, Timer, BoxOffice, Stock, IconName, Bill} from '../kit';
import {SLabel, tagW, headTop, Sam, Gerald, P, SHOCK, POINT, SHRUG, CHEER, RAISE, HIPS, REST, CROSS, Count} from './common';

const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};

/* Two-company boxes that can be cut apart (also used in s51). */
const Pair: React.FC<{gap: number; y?: number; s?: number}> = ({gap, y = 520, s = 1}) => (
  <g transform={`translate(1000 ${y}) scale(${s})`}>
    {(
      [
        [-230 - gap, 'LIVE NATION', C.white],
        [230 + gap, 'TICKETMASTER', C.magenta],
      ] as const
    ).map(([x, label, color]) => (
      <g key={label} transform={`translate(${x} 0)`}>
        <rect x={-230} y={-80} width={460} height={160} rx={18} fill={color} {...ink} />
        <text y={16} textAnchor="middle" fontFamily={DISPLAY} fontSize={label.length > 11 ? 40 : 48} fill={C.ink}>{label}</text>
      </g>
    ))}
  </g>
);

/* s66 — Six days into the trial, after a face-to-face meeting between the CEO and the acting antitrust head. */
export const S66: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSix = at('six days');
  const tFace = at('face to face');
  const tCeo = at('ceo');
  const tHead = at('acting head');
  return (
    <AbsoluteFill>
      <Headline text="A *face-to-face* meeting" start={tFace} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={1620} y={420} s={pop(frame, fps, tSix, 12) * 0.62}><Timer text="DAY 6" t={6 / 10} /></G>
        <rect x={830} y={760} width={420} height={36} rx={8} fill="#B07A3E" {...ink} opacity={ramp(frame, tFace, 8)} />
        <rect x={870} y={796} width={24} height={139} fill="#8A5A2B" {...ink} opacity={ramp(frame, tFace, 8)} />
        <rect x={1186} y={796} width={24} height={139} fill="#8A5A2B" {...ink} opacity={ramp(frame, tFace, 8)} />
        <Gerald x={760} flip={false} s={0.62} seed={110} enter={tCeo - 6} start={{mouth: 'smile', lookX: 1}} keys={[{f: tHead + 8, p: {...POINT, mouth: 'smile'}, d: 8}]} />
        <SLabel text="LIVE NATION CEO" x={760} y={headTop() - 66} start={tCeo} size={26} />
        <Actor who="exec" x={1320} y={FLOOR} s={0.62} flip seed={111} enter={tHead - 4} start={{lookX: 1, mouth: 'smile'}} keys={[{f: tHead + 12, p: {...POINT, mouth: 'smile'}, d: 8}]} />
        <SLabel text="ACTING ANTITRUST HEAD" x={1320} y={headTop() - 66} start={tHead} size={26} />
        <Sam seed={112} start={{mouth: 'flat', brows: 'oneUp'}} emotes={[{f: tFace + 6, kind: '?'}]} />
      </Stage>
      <Sfx name="pop" at={tCeo} volume={0.3} />
      <Sfx name="pop" at={tHead} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s67 — Senators raised concerns, including the ousting of the previous antitrust chief. */
export const S67: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSen = at('senators');
  const tCon = at('concerns');
  const tOust = at('ousting');
  const senators = ['exec', 'librarian', 'angry3'] as const;
  return (
    <AbsoluteFill>
      <Stage>
        {/* office door with a name plate */}
        <G x={760} y={FLOOR} s={pop(frame, fps, tOust - 6, 12)}>
          <rect x={-130} y={-420} width={260} height={420} fill={C.paperDark} {...ink} />
          <rect x={-100} y={-390} width={200} height={390} fill={C.white} {...ink} strokeWidth={5} />
          <rect x={-150} y={-500} width={300} height={70} rx={8} fill={C.white} {...ink} strokeWidth={5} />
          <text y={-475} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={20} fill={C.ink}>PREVIOUS</text>
          <text y={-448} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={20} fill={C.ink}>ANTITRUST CHIEF</text>
        </G>
        <G x={760} y={700} s={pop(frame, fps, tOust + 6, 9) * 0.7} r={-10}><Stamp text="OUSTED" color={C.red} /></G>
        {senators.map((w, i) => (
          <Actor key={w} who={w} x={1300 + i * 170} y={FLOOR} s={0.5} flip seed={113 + i} enter={tSen + i * 3}
            start={{lookX: 1, mouth: 'flat', brows: 'angry', ...CROSS}} />
        ))}
        <G x={1470} y={headTop(0.5) - 110} s={pop(frame, fps, tCon, 11)}><Bubble text="How did this deal happen?" tail="right" size={34} /></G>
        <Sam seed={116} start={{mouth: 'flat'}} keys={[{f: tOust, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tCon} volume={0.3} />
      <Sfx name="thud" at={tOust + 6} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s68 — 33 states and DC refused to settle; on April 15th the jury sided with them on every claim. */
export const S68: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t33 = at('33 states');
  const tRef = at('refused');
  const tKept = at('kept going');
  const tApr = at('april 15th');
  const tEvery = at('every claim');
  const p1 = 1 - ramp(frame, tApr - 6, 8);
  const p2 = ramp(frame, tApr - 4, 8);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={0} y={0} o={p1}>
          <Count x={900} y={460} to={33} t={ramp(frame, t33 - 10, 14)} prefix="" suffix=" STATES + DC" size={110} color={C.cyan} />
          <G x={900} y={620} s={pop(frame, fps, tRef, 9) * 0.75} r={-6}><Stamp text="REFUSED TO SETTLE" color={C.red} /></G>
          <SLabel text="...AND KEPT GOING" x={900} y={730} start={tKept} size={40} />
        </G>
        {p2 > 0 && (
          <G x={0} y={0} o={p2}>
            <SLabel text="APRIL 15, 2026 · THE VERDICT" x={960} y={170} start={tApr} size={40} />
            <G x={960} y={FLOOR} s={pop(frame, fps, tApr - 4, 13) * 0.75}><Courthouse label="FEDERAL COURT" color={C.cyan} /></G>
            {['CLAIM 1', 'CLAIM 2', 'CLAIM 3'].map((c, i) => (
              <G key={c} x={1440} y={420 + i * 110} s={pop(frame, fps, tEvery + i * 4, 10) * 0.8}>
                <rect x={-130} y={-40} width={260} height={80} rx={12} fill={C.white} {...ink} strokeWidth={5} />
                <text x={-100} y={14} fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>{c}</text>
                <path d="M70,0 L86,16 L112,-14" fill="none" stroke={C.green} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
              </G>
            ))}
          </G>
        )}
        <Sam seed={117} start={{mouth: 'flat'}} keys={[{f: tEvery, p: {...CHEER, mouth: 'grin', brows: 'raised'}, d: 8, ease: 'out'}]} emotes={[{f: tEvery + 4, kind: 'sparkle', d: 40}]} />
        <Gerald seed={118} start={{mouth: 'smirk'}} keys={[{f: tEvery, p: {...SHOCK}, d: 6}]} emotes={[{f: tEvery + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="thud" at={tRef} volume={0.35} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="ding" at={tEvery + i * 4} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s69 — Illegally kept a monopoly; fans in 22 states overcharged $1.72 per ticket at major venues. */
export const S69: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tIll = at('illegally');
  const t22 = at('22 states');
  const t172 = at('$1.72');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={960} y={360} s={pop(frame, fps, tIll, 9) * 0.8} r={-5}><Stamp text="ILLEGAL MONOPOLY" color={C.red} /></G>
        {Array.from({length: 22}).map((_, i) => (
          <G key={i} x={600 + (i % 6) * 70} y={560 + Math.floor(i / 6) * 74} s={pop(frame, fps, t22 + i * 0.6, 12) * 0.36}><Badge icon="ticket" color={C.cyan} /></G>
        ))}
        <SLabel text="22 STATES" x={775} y={850} start={t22} size={36} />
        <G x={1300} y={620} s={pop(frame, fps, t172, 10) * 1.2} r={-6} shadow><Tag text="+$1.72" color={C.magenta} w={tagW('+$1.72')} /></G>
        <SLabel text="OVERCHARGED PER TICKET" x={1300} y={735} start={t172 + 4} size={30} />
        <Sam seed={119} start={{mouth: 'smile'}} keys={[{f: t172, p: {mouth: 'frown', brows: 'angry'}, d: 6}]} />
        <Gerald seed={120} start={{mouth: 'frown', brows: 'sad', ...REST}} emotes={[{f: tIll + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="thud" at={tIll} volume={0.4} />
      <Sfx name="pop" at={t172} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s70 — $1.72 sounds small. Now multiply it by every concert ticket sold at those venues. */
export const S70: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSmall = at('sounds small');
  const tMult = at('multiply');
  const n = Math.floor(lerp(frame, [tMult, tMult + 60], [0, 96]));
  return (
    <AbsoluteFill>
      <Headline text="Now *multiply* it" start={tMult - 4} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <G x={560} y={560} s={pop(frame, fps, 0, 12) * (1 - 0.35 * ramp(frame, tSmall, 10))} r={-6}><Tag text="$1.72" color={C.magenta} w={tagW('$1.72')} /></G>
        <text x={760} y={590} fontFamily={DISPLAY} fontSize={90} fill={C.ink} opacity={ramp(frame, tMult, 6)}>×</text>
        {Array.from({length: n}).map((_, i) => (
          <G key={i} x={900 + (i % 12) * 72} y={330 + Math.floor(i / 12) * 66} s={0.14} r={((i * 37) % 20) - 10}>
            <ConcertTicket price="" color={[C.cyan, C.magenta, C.yellow][i % 3]} />
          </G>
        ))}
        <Sam seed={121} start={{mouth: 'flat', brows: 'oneUp'}} keys={[{f: tMult + 30, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="whoosh" at={tMult} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s71 — The states want up to $700 million in damages, and antitrust damages can be tripled. */
export const S71: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t700 = at('$700 million');
  const tLaw = at('antitrust law');
  const tTrip = at('tripled');
  return (
    <AbsoluteFill>
      <Stage>
        <SLabel text="DAMAGES SOUGHT (UP TO)" x={860} y={300} start={t700 - 8} size={34} />
        <Count x={860} y={500} to={700} t={ramp(frame, t700 - 10, 16)} suffix="M" size={170} color={C.red} />
        <G x={1380} y={450} s={pop(frame, fps, tTrip, 9) * 1.1} r={-8}><Stamp text="×3" color={C.magenta} /></G>
        <SLabel text="= UP TO $2.1 BILLION" x={1120} y={640} start={tTrip + 10} size={46} color={C.magenta} />
        <SLabel text="US ANTITRUST LAW" x={1380} y={330} start={tLaw} size={28} color={C.grey} />
        <Gerald seed={122} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tTrip, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tTrip + 4, kind: 'sweat'}]} />
        <Sam seed={123} start={{mouth: 'smile'}} />
      </Stage>
      <Sfx name="cash" at={t700} volume={0.35} />
      <Sfx name="thud" at={tTrip} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s72 — Investors noticed: rival sellers' shares went up — Vivid Seats +9.3%, StubHub +3.5%. */
export const S72: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tInv = at('investors');
  const tUp = at('went up');
  const tViv = at('vivid seats');
  const tStub = at('stubhub');
  return (
    <AbsoluteFill>
      <Headline text="Investors *noticed*" start={tInv} y={TOP} size={84} hl={C.green} />
      <Stage>
        <G x={800} y={560} s={pop(frame, fps, tViv - 4, 12) * 1.05}><Stock name="VIVID SEATS" change="9.3%" t={ramp(frame, tViv, 16)} /></G>
        <G x={1300} y={560} s={pop(frame, fps, tStub - 4, 12) * 1.05}><Stock name="STUBHUB" change="3.5%" t={ramp(frame, tStub, 16)} color={C.green} /></G>
        <SLabel text="RIVAL TICKET SELLERS, RIGHT AFTER THE VERDICT" x={1050} y={760} start={tUp} size={28} />
        <Gerald seed={124} start={{mouth: 'frown', brows: 'angry', ...CROSS}} emotes={[{f: tViv + 6, kind: 'anger'}]} />
        <Sam seed={125} start={{mouth: 'smile'}} />
      </Stage>
      <Sfx name="ding" at={tViv} volume={0.3} />
      <Sfx name="ding" at={tStub} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s73 — Live Nation says the verdict isn't the last word, and it's challenging it. */
export const S73: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSays = at('live nation says');
  const tChal = at('challenging');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1240} y={headTop(0.8) - 140} s={pop(frame, fps, tSays + 4, 11)}><Bubble text={"This isn't\nthe last word!"} tail="right" size={42} /></G>
        <G x={900} y={600} s={pop(frame, fps, tChal, 10) * 0.75} r={-6}><Stamp text="CHALLENGED" color={C.magenta} /></G>
        <Gerald x={1500} s={0.8} seed={126} start={{mouth: 'frown', brows: 'angry'}} keys={[{f: tSays, p: {...RAISE, mouth: 'open', brows: 'angry'}, d: 7, ease: 'out'}]} />
        <Sam seed={127} start={{mouth: 'flat', brows: 'oneUp', ...CROSS}} />
      </Stage>
      <Sfx name="thud" at={tChal} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s74 — Next: a separate trial, no jury; the judge decides the penalty and the fix, maybe a forced sale of Ticketmaster. */
export const S74: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNext = at('separate trial');
  const tNo = at('no jury');
  const tJudge = at('the judge');
  const tPen = at('penalty');
  const tFix = at('the fix');
  const tSell = at('sell ticketmaster');
  const gap = lerp(frame, [tSell, tSell + 18], [0, 120]);
  return (
    <AbsoluteFill>
      <Headline text="Next: the *judge* decides" start={tJudge - 4} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={1240} y={320} s={pop(frame, fps, tNo, 9) * 0.6} r={6}><Stamp text="NO JURY" color={C.red} /></G>
        <G x={0} y={0} o={ramp(frame, tPen - 4, 8)}>
          <G x={880} y={440} s={pop(frame, fps, tPen, 11) * 0.9}><Tag text="PENALTY" color={C.yellow} w={tagW('PENALTY')} /></G>
          <G x={1300} y={440} s={pop(frame, fps, tFix, 11) * 0.9}><Tag text="THE FIX" color={C.cyan} w={tagW('THE FIX')} /></G>
        </G>
        <G x={0} y={0} o={ramp(frame, tSell - 6, 8)}>
          <Pair gap={gap} y={680} s={0.62} />
          {frame >= tSell && <line x1={1000} y1={600} x2={1000} y2={760} stroke={C.red} strokeWidth={8} strokeDasharray="14 12" opacity={1 - ramp(frame, tSell + 14, 6)} />}
        </G>
        <Actor who="judge" x={P.left} y={FLOOR} s={P.s} seed={128} enter={tNext} start={{lookX: 1, mouth: 'flat'}}
          keys={[{f: tJudge, p: {...RAISE, mouth: 'flat', brows: 'raised'}, d: 7, ease: 'out'}, {f: tJudge + 10, p: {rShoulder: -100, rElbow: 0}, d: 4, ease: 'snap'}]} />
        <Gerald seed={129} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tSell, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tSell + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="thud" at={tJudge + 10} volume={0.4} />
      <Sfx name="whoosh" at={tSell} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s75 — The same breakup senators floated after Eras. A scholar told NPR not to expect it this year. */
export const S75: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSame = at('same breakup');
  const tScholar = at('antitrust scholar');
  const tYear = at('this year');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={760} y={450} s={pop(frame, fps, tSame - 4, 10) * 0.95} r={-4}>
          <rect x={-250} y={-90} width={500} height={180} fill={C.yellow} {...ink} />
          <text y={-14} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink}>REMEMBER THIS?</text>
          <text y={44} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink}>The breakup idea</text>
          <circle cy={-90} r={16} fill={C.red} {...ink} strokeWidth={5} />
        </G>
        {/* calendar */}
        <G x={1240} y={560} s={pop(frame, fps, tYear - 8, 12) * 0.9}>
          <rect x={-150} y={-150} width={300} height={300} rx={18} fill={C.white} {...ink} />
          <rect x={-150} y={-150} width={300} height={80} rx={18} fill={C.red} {...ink} />
          <text y={-95} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.white}>2026</text>
          {Array.from({length: 12}).map((_, i) => (
            <rect key={i} x={-120 + (i % 4) * 62} y={-50 + Math.floor(i / 4) * 62} width={50} height={46} rx={6} fill={C.paperDark} />
          ))}
        </G>
        <G x={1240} y={620} s={pop(frame, fps, tYear, 9) * 0.55} r={-10}><Stamp text="NOT THIS YEAR" color={C.red} /></G>
        <Actor who="librarian" x={P.right} y={FLOOR} s={P.s} flip seed={130} enter={tScholar - 4} start={{lookX: 1, mouth: 'flat'}}
          keys={[{f: tYear, p: {...POINT, mouth: 'flat', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <SLabel text="ANTITRUST SCHOLAR · NPR" x={P.right - 40} y={headTop() - 66} start={tScholar} size={24} />
        <Sam seed={131} start={{mouth: 'smile'}} keys={[{f: tYear, p: {mouth: 'frown', brows: 'sad'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tSame} volume={0.3} />
      <Sfx name="thud" at={tYear} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s76 — Every fee has someone who wants it there: venue, promoter and ticket seller each take a slice. */
export const S76: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tEvery = at('every fee');
  const tVen = at('the venue');
  const tPro = at('the promoter');
  const tSel = at('the ticket seller');
  const tSlice = at('each take a slice');
  const out = (t: number) => ramp(frame, t, 10);
  return (
    <AbsoluteFill>
      <Headline text="Everyone takes a *slice*" start={tSlice - 4} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={1000} y={570} s={pop(frame, fps, tEvery, 12)}>
          <Pie rad={240} labelSize={30} slices={[
            {v: 35, color: C.yellow, label: 'VENUE', pop: out(tVen) * 1.5},
            {v: 25, color: C.cyan, label: 'PROMOTER', pop: out(tPro) * 1.5},
            {v: 40, color: C.magenta, label: 'SELLER', pop: out(tSel) * 1.5},
          ]} />
        </G>
        <Gerald seed={132} start={{mouth: 'grin'}} keys={[{f: tSel, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
        <Sam seed={133} start={{mouth: 'flat'}} />
      </Stage>
      {[tVen, tPro, tSel].map((t, i) => (
        <Sfx key={i} name="pop" at={t} volume={0.28} />
      ))}
    </AbsoluteFill>
  );
};

/* s77 — At checkout, the one person without a slice is the one paying. */
export const S77: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWithout = at('without a slice');
  const tPay = at('one paying');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1380} y={560} s={0.75}>
          <Pie rad={240} labelSize={30} slices={[
            {v: 35, color: C.yellow, label: 'VENUE', pop: 1.5},
            {v: 25, color: C.cyan, label: 'PROMOTER', pop: 1.5},
            {v: 40, color: C.magenta, label: 'SELLER', pop: 1.5},
          ]} />
        </G>
        <Sam x={700} s={0.85} seed={134} start={{mouth: 'flat', ...REST}}
          keys={[{f: tWithout, p: {...SHRUG, mouth: 'frown', brows: 'sad'}, d: 8}]}
          emotes={[{f: tPay + 4, kind: 'sweat'}]} />
        <SLabel text="NO SLICE." x={700} y={headTop(0.85) - 120} start={tWithout} size={44} />
        <SLabel text="JUST THE BILL." x={700} y={headTop(0.85) - 64} start={tPay} size={44} color={C.red} />
      </Stage>
      <Sfx name="thud" at={tPay} volume={0.35} />
    </AbsoluteFill>
  );
};

/* Step number badge for the tips. */
const TipNo: React.FC<{n: number; t: number; x?: number; y?: number}> = ({n, t, x = 760, y = 330}) => (
  <G x={x} y={y} s={t}>
    <circle r={70} fill={C.yellow} {...ink} />
    <text y={30} textAnchor="middle" fontFamily={DISPLAY} fontSize={84} fill={C.ink}>{n}</text>
  </G>
);

/* s78 — How to pay less. First, the box office: buying in person often skips the biggest online fees. */
export const S78: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tHow = at('pay less');
  const tFirst = at('first');
  const tPerson = at('in person');
  const tSkip = at('skips');
  return (
    <AbsoluteFill>
      <Headline text="How to *pay less*" start={tHow - 6} y={TOP} size={84} hl={C.green} />
      <Stage>
        <TipNo n={1} t={pop(frame, fps, tFirst, 10)} x={620} y={360} />
        <G x={1080} y={FLOOR} s={pop(frame, fps, tFirst + 4, 12) * 1.0}><BoxOffice /></G>
        <G x={1550} y={560} s={pop(frame, fps, tSkip - 4, 11) * 0.62}>
          <Phone>
            <text y={-120} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink}>Online fees</text>
            <text y={0} textAnchor="middle" fontFamily={DISPLAY} fontSize={80} fill={C.red}>+$$</text>
          </Phone>
          <line x1={-180} y1={-200} x2={180} y2={200} stroke={C.red} strokeWidth={22} strokeLinecap="round" opacity={ramp(frame, tSkip, 6)} />
        </G>
        <Sam seed={135} start={{mouth: 'smile'}} keys={[{f: tPerson, p: {x: 520}, d: 26}, {f: tSkip, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tFirst} volume={0.35} />
      <Sfx name="ding" at={tSkip} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s79 — CBS checked Minneapolis venues: one box office added only a $2 facility fee. */
export const S79: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCbs = at('cbs');
  const t2 = at('$2 facility');
  const lines: ReceiptLine[] = [
    {label: 'Ticket', amount: 'face value', color: C.cyan, t: 1},
    {label: 'Facility fee', amount: '$2.00', color: C.yellow, t: ramp(frame, t2 - 2, 8)},
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <SLabel text="CBS · MINNEAPOLIS VENUES" x={960} y={170} start={tCbs} size={36} />
        <G x={760} y={FLOOR} s={0.8}><BoxOffice /></G>
        <Receipt x={1330} y={330} w={520} size={32} title="BOX OFFICE" lines={lines} />
        <G x={1330} y={680} s={pop(frame, fps, t2 + 6, 10) * 0.6} r={-6}><Stamp text="THAT'S IT" color={C.green} /></G>
        <Sam x={P.left - 20} seed={136} start={{mouth: 'smile'}} keys={[{f: t2, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="ding" at={t2 + 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s80 — It depends: Target Center charges a $2–$3 facility fee on every ticket however you buy. */
export const S80: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tDep = at('depends');
  const tTc = at('target center');
  const tHow = at('however you buy');
  return (
    <AbsoluteFill>
      <Headline text="It *depends* on the venue" start={tDep - 4} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={1000} y={FLOOR} s={pop(frame, fps, tTc, 12) * 0.9}><Venue name="TARGET CENTER" color={C.red} frame={frame} /></G>
        <G x={1000} y={420} s={pop(frame, fps, tTc + 8, 10) * 0.85} r={-4}><Tag text="$2–$3 FEE" color={C.yellow} w={tagW('$2–$3 FEE')} /></G>
        <G x={620} y={580} s={pop(frame, fps, tHow, 11) * 0.55}><Phone><text textAnchor="middle" y={20} fontFamily={DISPLAY} fontSize={70} fill={C.red}>+$3</text></Phone></G>
        <G x={1500} y={540} s={pop(frame, fps, tHow + 4, 11) * 0.8}><Badge icon="booth" color={C.yellow} label="+$3" labelSize={50} /></G>
        <Sam seed={137} start={{mouth: 'flat', brows: 'oneUp'}} />
      </Stage>
      <Sfx name="pop" at={tTc + 8} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s81 — AXS venues: service fees only apply online, so check how your venue sells before the sale. */
export const S81: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tAxs = at('axs');
  const tWeb = at('the website');
  const tCheck = at('check how');
  return (
    <AbsoluteFill>
      <Headline text="*Check* how your venue sells" start={tCheck - 4} y={TOP} size={76} stagger={2} hl={C.cyan} />
      <Stage>
        <SLabel text="VENUES THAT SELL THROUGH AXS" x={1060} y={250} start={tAxs} size={34} />
        <G x={780} y={600} s={pop(frame, fps, tWeb - 4, 11) * 0.6}>
          <Phone><text textAnchor="middle" y={-40} fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink}>Website</text><text textAnchor="middle" y={60} fontFamily={DISPLAY} fontSize={64} fill={C.red}>+FEE</text></Phone>
        </G>
        <G x={1320} y={FLOOR} s={pop(frame, fps, tWeb + 4, 11) * 0.62}><BoxOffice /></G>
        <G x={1320} y={430} s={pop(frame, fps, tWeb + 10, 10) * 0.6} r={-6}><Stamp text="NO FEE" color={C.green} /></G>
        <Sam seed={138} start={{mouth: 'smile'}} keys={[{f: tCheck, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tWeb} volume={0.3} />
      <Sfx name="ding" at={tWeb + 10} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s82 — Second: buy for the whole group in one order. $3–$10 per order; four friends pay it four times. */
export const S82: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSecond = at('second');
  const tOne = at('one order');
  const tRun = at('typically run');
  const tFour = at('four friends');
  const tTimes = at('four times');
  const friends = ['sam', 'angry1', 'angry2', 'angry3'] as const;
  return (
    <AbsoluteFill>
      <Headline text="Buy in *one order*" start={tOne - 4} y={TOP} size={84} hl={C.green} />
      <Stage>
        <TipNo n={2} t={pop(frame, fps, tSecond, 10)} x={260} y={340} />
        <G x={1000} y={330} s={pop(frame, fps, tRun, 10) * 0.75}><Tag text="$3–$10 / ORDER" color={C.green} w={tagW('$3–$10 / ORDER')} /></G>
        {friends.map((w, i) => (
          <g key={w}>
            <Actor who={w} x={560 + i * 290} y={FLOOR} s={0.5} seed={140 + i} start={{lookX: 0, mouth: 'smile', rShoulder: -55, rElbow: -70}}
              keys={[{f: tTimes, p: {mouth: 'frown', brows: 'sad'}, d: 6}]} />
            <G x={560 + i * 290 + 70} y={headTop(0.5) - 30} s={pop(frame, fps, tFour + i * 4, 10) * 0.55} r={-8}><Tag text="+FEE" color={C.magenta} w={tagW('+FEE')} /></G>
          </g>
        ))}
        <G x={1000} y={470} s={pop(frame, fps, tTimes, 9) * 0.7} r={6}><Stamp text="×4" color={C.red} /></G>
      </Stage>
      <Sfx name="pop" at={tSecond} volume={0.35} />
      {friends.map((w, i) => (
        <Sfx key={w} name="pop" at={tFour + i * 4} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s83 — Third: compare all-in prices side by side on the final number. */
export const S83: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tThird = at('third');
  const tAll = at('all in');
  const tSide = at('side');
  const tFinal = at('final number');
  const card = (x: number, title: string, color: string, h: number, t: number) => (
    <G x={x} y={0} o={Math.min(1, t * 2)}>
      <rect x={-130} y={860 - h * t} width={260} height={h * t} fill={color} {...ink} />
      <text y={910} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>{title}</text>
    </G>
  );
  return (
    <AbsoluteFill>
      <Headline text="Compare *all-in* prices" start={tAll - 4} y={TOP} size={84} hl={C.cyan} />
      <Stage>
        <TipNo n={3} t={pop(frame, fps, tThird, 10)} x={620} y={360} />
        <line x1={820} y1={860} x2={1500} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        {card(980, 'OFFICIAL', C.magenta, 380, ramp(frame, tSide, 14))}
        {card(1340, 'RESALE', C.yellow, 330, ramp(frame, tSide + 6, 14))}
        <SLabel text="FINAL NUMBER" x={1160} y={330} start={tFinal} size={36} />
        <G x={1340} y={470} s={pop(frame, fps, tFinal + 6, 10) * 0.9}>
          <path d="M-30,0 L-8,22 L34,-24" fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <Sam seed={144} start={{mouth: 'smile'}} keys={[{f: tFinal, p: {...POINT, mouth: 'grin', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tThird} volume={0.35} />
      <Sfx name="ding" at={tFinal + 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s84 — Pick your maximum before the sale opens, so the countdown timer doesn't pick it for you. */
export const S84: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMax = at('maximum');
  const tTimer = at('countdown timer');
  const secs = Math.max(0, 599 - Math.floor(Math.max(0, frame - tTimer) / 3));
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <AbsoluteFill>
      <Headline text="Pick your *max* first" start={tMax - 4} y={TOP} size={84} hl={C.yellow} />
      <Stage>
        <G x={860} y={560} s={pop(frame, fps, tMax, 11) * 0.95} r={-5}>
          <rect x={-200} y={-140} width={400} height={280} fill={C.yellow} {...ink} />
          <text y={-60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={40} fill={C.ink}>MY MAX:</text>
          <text y={50} textAnchor="middle" fontFamily={DISPLAY} fontSize={96} fill={C.ink}>$80</text>
          <circle cy={-140} r={16} fill={C.red} {...ink} strokeWidth={5} />
        </G>
        <G x={1380} y={520} s={pop(frame, fps, tTimer - 4, 11) * 0.95}><Timer text={`${mm}:${ss}`} t={secs / 600} /></G>
        <Sam seed={145} start={{mouth: 'smile'}} keys={[{f: tMax, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tMax} volume={0.3} />
      <Sfx name="click" at={tTimer} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s85 — None of this fixes the system; the system just gets a little less of your money. */
export const S85: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNone = at('none of this');
  const tLess = at('a little less');
  const flow = (i: number) => ((frame * 2 + i * 40) % 200) / 200;
  const thin = lerp(frame, [tLess, tLess + 20], [7, 2]);
  return (
    <AbsoluteFill>
      <Headline text="A little *less* of your money" start={tLess - 8} y={TOP} size={76} stagger={2} hl={C.green} />
      <Stage>
        {Array.from({length: 7}).map((_, i) =>
          i < thin ? (
            <G key={i} x={420 + flow(i) * 1080} y={620 - Math.sin(flow(i) * Math.PI) * 120} s={0.55}><Coin /></G>
          ) : null,
        )}
        <Sam seed={146} start={{mouth: 'flat'}} keys={[{f: tLess, p: {mouth: 'smile', brows: 'raised'}, d: 6}]} />
        <Gerald seed={147} start={{mouth: 'grin'}} keys={[{f: tLess, p: {mouth: 'frown', brows: 'sad', ...REST}, d: 6}]} />
        <SLabel text="THE SYSTEM" x={P.right} y={headTop() - 66} start={tNone} size={28} />
      </Stage>
      <Sfx name="ding" at={tLess} volume={0.3} />
    </AbsoluteFill>
  );
};

const WHO: {icon: IconName; label: string; color: string; amount: string}[] = [
  {icon: 'star', label: 'ARTIST / PROMOTER', color: C.cyan, amount: '$50.00'},
  {icon: 'ticket', label: 'SELLER + VENUE', color: C.magenta, amount: '$10.00'},
  {icon: 'building', label: 'VENUE', color: C.yellow, amount: '$4.00'},
  {icon: 'ticket', label: 'SELLER + VENUE', color: C.green, amount: '$3.00'},
  {icon: 'gov', label: 'GOVERNMENT', color: C.grey, amount: '$3.70'},
];

/* s86 — Next time checkout adds $20 to a $50 ticket, you'll know where every part goes. */
export const S86: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNext = at('next time');
  const tKnow = at("you'll know");
  const tEvery = at('every part');
  const labels = ['Ticket', 'Service fee', 'Facility fee', 'Order processing', 'Tax'];
  const lh = 30 * 1.75;
  return (
    <AbsoluteFill>
      <Stage>
        <G x={0} y={0} s={pop(frame, fps, tNext - 4, 14)}>
          <Receipt x={800} y={230} w={560} size={30} lines={WHO.map((w, i) => ({label: labels[i], amount: w.amount, color: w.color, t: 1}))} total={{label: 'TOTAL', amount: '$70.70', t: 1}} />
        </G>
        {WHO.map((w, i) => {
          const ly = 230 + 92 + i * lh + lh * 0.62 - 10;
          const by = 290 + i * 135;
          const t0 = tKnow + i * 4;
          return (
            <g key={i}>
              <Arrow x1={1090} y1={ly} x2={1290} y2={by} t={ramp(frame, t0, 9)} color={w.color} w={8} />
              <G x={1350} y={by} s={pop(frame, fps, t0 + 4) * 0.62}><Badge icon={w.icon} color={w.color} /></G>
              <text x={1410} y={by + 12} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink} opacity={ramp(frame, t0 + 6, 8)}>{w.label}</text>
            </g>
          );
        })}
        <Sam seed={148} start={{mouth: 'smile'}} keys={[{f: tEvery, p: {mouth: 'grin', brows: 'raised', ...POINT}, d: 7, ease: 'out'}]} emotes={[{f: tEvery + 4, kind: 'sparkle', d: 40}]} />
      </Stage>
      {WHO.map((_, i) => (
        <Sfx key={i} name="pop" at={tKnow + i * 4} volume={0.22} />
      ))}
    </AbsoluteFill>
  );
};

/* s87 — It's not broken. It's working as intended. */
export const S87: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNot = at('not broken');
  const tWork = at('working as intended');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={900} y={430} s={pop(frame, fps, tNot, 10) * 0.75} r={-4} o={1 - ramp(frame, tWork, 6) * 0.6}><Stamp text="NOT BROKEN" color={C.grey} /></G>
        <G x={900} y={640} s={pop(frame, fps, tWork, 9) * 0.85} r={-6}><Stamp text="WORKING AS INTENDED" color={C.red} /></G>
        <Gerald seed={149} start={{mouth: 'smirk'}} keys={[{f: tWork, p: {...CHEER, mouth: 'grin', brows: 'smug'}, d: 8, ease: 'out'}]} emotes={[{f: tWork + 4, kind: 'sparkle', d: 40}]} />
        <Sam seed={150} start={{mouth: 'flat', ...CROSS}} keys={[{f: tWork, p: {mouth: 'frown', brows: 'angry'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tNot} volume={0.3} />
      <Sfx name="thud" at={tWork} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s88 — Why is it that you haven't subscribed yet? */
export const S88: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSub = at('subscribed');
  const press = frame >= tSub + 10 && frame < tSub + 18;
  const done = frame >= tSub + 14;
  return (
    <AbsoluteFill>
      <Headline text="Why haven't you *subscribed* yet?" start={0} y={TOP} size={76} stagger={2} hl={C.red} />
      <Stage>
        <G x={960} y={560} s={pop(frame, fps, tSub - 6, 11) * 1.6}>
          <Button text={done ? 'SUBSCRIBED' : 'SUBSCRIBE'} color={done ? C.grey : C.red} w={360} press={press ? 1 : 0} />
        </G>
        <G x={lerp(frame, [tSub, tSub + 10], [1300, 1010])} y={lerp(frame, [tSub, tSub + 10], [820, 590])} s={0.9} o={ramp(frame, tSub, 4)}><Cursor press={press} /></G>
        <Sam seed={151} start={{mouth: 'smile'}} keys={[{f: tSub - 4, p: {...POINT, mouth: 'grin', brows: 'raised'}, d: 7, ease: 'out'}]} emotes={[{f: tSub + 16, kind: 'sparkle'}]} />
        <Gerald seed={152} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tSub + 16, p: {...SHRUG, mouth: 'smile'}, d: 8}]} />
      </Stage>
      <Sfx name="click" at={tSub + 10} volume={0.5} />
      <Sfx name="ding" at={tSub + 14} volume={0.35} />
    </AbsoluteFill>
  );
};
