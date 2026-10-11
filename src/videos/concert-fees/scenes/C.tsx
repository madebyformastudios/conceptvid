import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Coin} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {TOP, FLOOR} from '../../../components/layout';
import {Door, ConcertTicket, Receipt, ReceiptLine, Courthouse, Capitol, Badge, Venue, Contract, Phone, Button, Donut, Bubble, Bot, Timer, LineChart} from '../kit';
import {SLabel, tagW, headTop, Sam, Gerald, P, SHOCK, POINT, SHRUG, CHEER, RAISE, HIPS, REST, CROSS, Count} from './common';

const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};

/* s45 — The ticket you didn't get: fans aren't the only ones in the queue. */
export const S45: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tDidnt = at("didn't get");
  const tSale = at('goes on sale');
  const tQueue = at('only ones');
  const fans = ['sam', 'angry1', 'angry2', 'angry3'] as const;
  return (
    <AbsoluteFill>
      <Headline text="The ticket you *didn't get*" start={tDidnt - 4} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={1640} y={FLOOR} s={pop(frame, fps, tSale - 4, 13) * 0.8}><Door label="ON SALE" color={C.green} open={ramp(frame, tSale, 10) * 0.4} /></G>
        {fans.map((w, i) => (
          <Actor key={w} who={w} x={1360 - i * 260} y={FLOOR} s={0.48} seed={70 + i} start={{lookX: 1, mouth: 'smile'}}
            keys={[{f: tQueue + 6, p: {mouth: 'o', brows: 'raised', lookX: -1}, d: 6}]} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <G key={i} x={1230 - i * 260} y={FLOOR} s={pop(frame, fps, tQueue + i * 3, 11) * 0.62}><Bot frame={frame + i * 7} /></G>
        ))}
      </Stage>
      <Sfx name="pop" at={tSale} volume={0.3} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pop" at={tQueue + i * 3} volume={0.22} />
      ))}
    </AbsoluteFill>
  );
};

/* s46 — Eras Tour on-sale: bots and buyers without a presale code logged on anyway. */
export const S46: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tEras = at('eras tour');
  const tSaid = at('ticketmaster said');
  const tBots = at('bots');
  const tCode = at('without a pre-sale code');
  const tLog = at('logged on');
  const bots = [
    [560, 420], [640, 760], [1320, 380], [1420, 720], [520, 600], [1460, 560], [700, 300], [1260, 860],
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <G x={980} y={560} s={pop(frame, fps, tEras - 4, 13) * 0.95}>
          <Phone>
            <text y={-200} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink}>ERAS TOUR</text>
            <text y={-150} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.grey}>VIRTUAL QUEUE</text>
            <rect x={-120} y={-110} width={240} height={30} rx={15} fill={C.paperDark} stroke={C.ink} strokeWidth={4} />
            <rect x={-118} y={-108} width={236 * lerp(frame, [tEras, tLog + 30], [0.1, 0.35])} height={26} rx={13} fill={C.magenta} />
            <text y={-20} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={25} fill={C.ink}>People ahead of you:</text>
            <text y={50} textAnchor="middle" fontFamily={DISPLAY} fontSize={56} fill={C.red}>{Math.round(lerp(frame, [tBots, tLog + 20], [2400, 98000])).toLocaleString('en-US')}</text>
            <Button text="WAITING..." color={C.grey} y={170} w={240} />
          </Phone>
        </G>
        {bots.map(([x, y], i) => (
          <G key={i} x={x} y={y + 110} s={pop(frame, fps, tBots + i * 2, 10) * 0.42} r={wobble(frame + i * 9, 6, 0.2)}><Bot frame={frame + i * 5} /></G>
        ))}
        <G x={980} y={160} s={pop(frame, fps, tCode, 9) * 0.6} r={-4}><Stamp text="NO PRESALE CODE" color={C.red} /></G>
        <Gerald seed={74} enter={tSaid - 4} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tLog, p: {...SHRUG, mouth: 'flat', brows: 'raised'}, d: 8}]} emotes={[{f: tLog + 4, kind: 'sweat'}]} />
        <Sam seed={75} start={{mouth: 'flat'}} keys={[{f: tBots, p: {mouth: 'frown', brows: 'angry'}, d: 6}]} />
      </Stage>
      <Sfx name="error" at={tCode} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s47 — Resold at much higher prices: the average Eras resale ticket hit $2,424 (CBS). */
export const S47: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tResold = at('resold');
  const tHigher = at('much higher');
  const tAvg = at('the average eras');
  const tAmt = at('$2,424');
  const tCbs = at('cbs report');
  return (
    <AbsoluteFill>
      <Headline text="Resold at *much* higher prices" start={tResold - 6} y={TOP} size={74} stagger={2} />
      <Stage>
        <G x={780} y={820} s={pop(frame, fps, tResold, 13)}>
          <LineChart pts={[1, 1.5, 2.6, 4.2, 7.8]} t={ramp(frame, tHigher - 4, 40)} w={620} h={420} color={C.red} />
        </G>
        <SLabel text="AVERAGE ERAS TICKET ON RESALE" x={1440} y={380} start={tAvg} size={30} />
        <Count x={1440} y={570} to={2424} t={ramp(frame, tAmt - 14, 16)} size={130} color={C.red} />
        <SLabel text="SOURCE: CBS NEWS" x={1700} y={990} start={tCbs} size={22} color={C.grey} />
        <Sam seed={76} start={{mouth: 'flat'}} keys={[{f: tAmt, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tAmt + 3, kind: '!'}]} />
      </Stage>
      <Sfx name="cash" at={tAmt} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s48 — The artist set the face value once; everything above went elsewhere, plus resale fees. */
export const S48: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSet = at('face value once');
  const tAbove = at('everything above');
  const tFees = at('their own fees');
  const tHeavy = at('just as heavy');
  const y0 = 880;
  const hFace = 150 * ramp(frame, tSet - 6, 12);
  const hUp = 380 * ramp(frame, tAbove, 18);
  const hFee = 120 * ramp(frame, tFees, 12);
  const x = 980;
  return (
    <AbsoluteFill>
      <Stage>
        <line x1={760} y1={y0} x2={1200} y2={y0} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        {hFace > 1 && <rect x={x - 110} y={y0 - hFace} width={220} height={hFace} fill={C.cyan} {...ink} />}
        {hUp > 1 && <rect x={x - 110} y={y0 - hFace - hUp} width={220} height={hUp} fill={C.red} {...ink} />}
        {hFee > 1 && <rect x={x - 110} y={y0 - hFace - hUp - hFee} width={220} height={hFee} fill={C.magenta} {...ink} />}
        <SLabel text="FACE VALUE · SET BY THE ARTIST" x={1130} y={y0 - 100} start={tSet} size={30} anchor="start" />
        <SLabel text="MARKUP · GOES SOMEWHERE ELSE" x={1130} y={y0 - 150 - 220} start={tAbove + 8} size={30} anchor="start" color={C.red} />
        <SLabel text="RESALE FEES ON TOP" x={1130} y={y0 - 150 - 380 - 110} start={tFees + 4} size={30} anchor="start" color={C.magenta} />
        <G x={1560} y={y0 - 150 - 380 - 30} s={pop(frame, fps, tHeavy, 10) * 0.5} r={6}><Stamp text="JUST AS HEAVY" color={C.magenta} /></G>
        <G x={700} y={FLOOR} s={pop(frame, fps, tAbove + 6, 12) * 0.62}><Bot frame={frame} /></G>
        <Sam seed={77} start={{mouth: 'flat'}} keys={[{f: tFees, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7}]} />
      </Stage>
      <Sfx name="pop" at={tAbove} volume={0.3} />
      <Sfx name="pop" at={tFees} volume={0.3} />
    </AbsoluteFill>
  );
};

/* Price + fee stack, unlabelled amounts (scale only). */
const Stack: React.FC<{x: number; price: number; fee: number; tp: number; tf: number; label: string}> = ({x, price, fee, tp, tf, label}) => {
  const y0 = 860;
  const hp = price * tp;
  const hf = fee * tf;
  return (
    <g>
      {hp > 1 && <rect x={x - 110} y={y0 - hp} width={220} height={hp} fill={C.cyan} {...ink} />}
      {hf > 1 && <rect x={x - 110} y={y0 - hp - hf} width={220} height={hf} fill={C.magenta} {...ink} />}
      <text x={x} y={y0 - hp / 2 + 14} textAnchor="middle" fontFamily={DISPLAY} fontSize={36} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke" opacity={tp}>PRICE</text>
      {hf > 40 && <text x={x} y={y0 - hp - hf / 2 + 14} textAnchor="middle" fontFamily={DISPLAY} fontSize={34} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke">FEES</text>}
      <text x={x} y={y0 + 50} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>{label}</text>
    </g>
  );
};

/* s49 — Miss the first sale: you pay a bigger price, then fees on that bigger price. */
export const S49: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMiss = at('miss the first');
  const tEscape = at("don't escape");
  const tBig = at('bigger price');
  const tOn = at('fees on that');
  return (
    <AbsoluteFill>
      <Headline text="You don't *escape* the fees" start={tEscape} y={TOP} size={80} stagger={2} hl={C.magenta} />
      <Stage>
        <line x1={640} y1={860} x2={1480} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <Stack x={820} price={120} fee={40} tp={ramp(frame, tMiss - 4, 12)} tf={ramp(frame, tMiss, 10)} label="FIRST SALE" />
        <Stack x={1280} price={400} fee={130} tp={ramp(frame, tBig, 16)} tf={ramp(frame, tOn, 12)} label="RESALE" />
        <G x={820} y={560} s={pop(frame, fps, tMiss + 6, 10) * 0.55} r={-8}><Stamp text="SOLD OUT" color={C.red} /></G>
        <Sam seed={78} start={{mouth: 'flat'}} keys={[{f: tMiss, p: {mouth: 'frown', brows: 'sad'}, d: 6}, {f: tOn, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tOn + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="error" at={tMiss + 6} volume={0.3} />
      <Sfx name="pop" at={tOn} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s50 — The Eras mess reached Washington: senators asked if sellers put customers first. */
export const S50: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWash = at('washington');
  const tSen = at('senators');
  const tFirst = at('customers first');
  const senators = ['exec', 'librarian', 'angry3'] as const;
  return (
    <AbsoluteFill>
      <Headline text="It reached *Washington*" start={tWash - 4} y={TOP} size={84} hl={C.cyan} />
      <Stage>
        <G x={1000} y={FLOOR} s={pop(frame, fps, tWash, 13) * 1.05}><Capitol /></G>
        {senators.map((w, i) => (
          <Actor key={w} who={w} x={1340 + i * 170} y={FLOOR} s={0.5} flip seed={80 + i} enter={tSen + i * 3}
            start={{lookX: 1, mouth: 'flat', brows: 'angry', ...CROSS}} />
        ))}
        <G x={1500} y={headTop(0.5) - 110} s={pop(frame, fps, tFirst - 6, 11)}><Bubble text="Customers first?" tail="right" size={38} /></G>
        <Gerald x={P.left + 80} flip={false} seed={83} start={{mouth: 'flat', brows: 'raised', lookX: 1}} keys={[{f: tFirst, p: {mouth: 'o', ...REST}, d: 6}]} emotes={[{f: tFirst + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="pop" at={tFirst - 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s51 — Some suggested Live Nation and Ticketmaster split up. Remember that idea. */
export const S51: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSug = at('suggested');
  const tSep = at('separate ways');
  const tRem = at('remember');
  const gap = lerp(frame, [tSep, tSep + 16], [0, 230]);
  const box = (x: number, label: string, color: string) => (
    <g transform={`translate(${x} 520)`}>
      <rect x={-230} y={-80} width={460} height={160} rx={18} fill={color} {...ink} />
      <text y={18} textAnchor="middle" fontFamily={DISPLAY} fontSize={label.length > 10 ? 40 : 48} fill={C.ink}>{label}</text>
    </g>
  );
  return (
    <AbsoluteFill>
      <Headline text="Go their *separate ways*" start={tSep - 4} y={TOP} size={80} stagger={2} hl={C.yellow} />
      <Stage>
        <G x={0} y={0} s={1} o={ramp(frame, tSug - 6, 8)}>
          {box(1000 - 230 - gap, 'LIVE NATION', C.white)}
          {box(1000 + 230 + gap, 'TICKETMASTER', C.magenta)}
          {frame >= tSep && <path d={`M1000,${420} l-20,40 l30,30 l-25,40 l25,40 l-10,50`} fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" opacity={1 - ramp(frame, tSep + 10, 6)} />}
        </G>
        <G x={1000} y={780} s={pop(frame, fps, tRem, 10) * 0.9} r={-4}>
          <rect x={-250} y={-60} width={500} height={120} fill={C.yellow} {...ink} />
          <text y={16} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink}>REMEMBER THIS</text>
          <circle cy={-60} r={16} fill={C.red} {...ink} strokeWidth={5} />
        </G>
        <Sam seed={84} start={{mouth: 'smile'}} keys={[{f: tRem, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <Gerald seed={85} start={{mouth: 'flat'}} keys={[{f: tSep, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tSep + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="thud" at={tSep + 4} volume={0.35} />
      <Sfx name="pop" at={tRem} volume={0.3} />
    </AbsoluteFill>
  );
};

/* A checkout step on a phone; `total` shows the running price. */
const Step: React.FC<{x: number; n: number; total: string; red?: boolean; t: number}> = ({x, n, total, red, t}) => (
  <G x={x} y={560} s={t * 0.75}>
    <Phone>
      <text y={-210} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.grey}>STEP {n}</text>
      <rect x={-120} y={-170} width={240} height={150} rx={12} fill={C.paperDark} />
      <text y={60} textAnchor="middle" fontFamily={DISPLAY} fontSize={red ? 72 : 80} fill={red ? C.red : C.ink}>{total}</text>
      <Button text={n === 3 ? 'PAY' : 'NEXT'} color={n === 3 ? C.green : C.cyan} y={180} w={200} />
    </Phone>
  </G>
);

/* s52 — For years you couldn't see most charges until the very last screen. That's changed, sort of. */
export const S52: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tYears = at('for years');
  const tLast = at('very last screen');
  const tChanged = at('has changed');
  const tSort = at('sort of');
  return (
    <AbsoluteFill>
      <Headline text="Fees on the *last screen*" start={tLast - 6} y={TOP} size={80} stagger={2} hl={C.red} />
      <Stage>
        <Step x={700} n={1} total="$50" t={pop(frame, fps, tYears, 12)} />
        <Step x={1020} n={2} total="$50" t={pop(frame, fps, tYears + 8, 12)} />
        <Step x={1340} n={3} total="$70.70" red t={pop(frame, fps, tLast, 11)} />
        <G x={1020} y={890} s={pop(frame, fps, tChanged, 10) * 0.55} r={-4}><Stamp text="CHANGED" color={C.green} /></G>
        <Sam seed={86} start={{mouth: 'flat'}} keys={[{f: tLast, p: {mouth: 'o', brows: 'raised'}, d: 6}, {f: tSort, p: {...SHRUG, mouth: 'flat', brows: 'oneUp'}, d: 8}]} />
        <Gerald seed={87} start={{mouth: 'smirk'}} />
      </Stage>
      <Sfx name="error" at={tLast} volume={0.3} />
      <Sfx name="ding" at={tChanged} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s53 — A US federal rule now makes sellers show the full price, fees included, up front. */
export const S53: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tReg = at('regulators');
  const tRule = at('federal rule');
  const tFull = at('full price');
  const tUp = at('up front');
  return (
    <AbsoluteFill>
      <Headline text="Show the *full price* up front" start={tFull - 6} y={TOP} size={76} stagger={2} hl={C.green} />
      <Stage>
        <G x={760} y={600} s={pop(frame, fps, tRule, 13) * 0.85} r={-4} shadow><Contract title="ALL-IN PRICE RULE" sign={1} seal={pop(frame, fps, tRule + 10, 10)} /></G>
        <G x={1260} y={580} s={pop(frame, fps, tFull, 12) * 0.75}>
          <Phone>
            <text y={-210} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.grey}>STEP 1</text>
            <text y={-60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>Total, fees incl.</text>
            <text y={30} textAnchor="middle" fontFamily={DISPLAY} fontSize={72} fill={C.green}>$70.70</text>
            <Button text="NEXT" color={C.cyan} y={180} w={200} />
          </Phone>
        </G>
        <Actor who="judge" x={P.left} y={FLOOR} s={P.s} seed={88} enter={tReg - 4} start={{lookX: 1, mouth: 'smile'}}
          keys={[{f: tRule, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
        <SLabel text="REGULATORS" x={P.left} y={headTop() - 70} start={tReg} size={28} />
        <Gerald seed={89} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tUp, p: {mouth: 'frown', brows: 'sad'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tRule + 10} volume={0.35} />
      <Sfx name="ding" at={tUp} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s54 — Which is nice: you see the $70 on the first screen instead of the last. */
export const S54: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNice = at('which is nice');
  const t70 = at('$70');
  const tFirst = at('first screen');
  return (
    <AbsoluteFill>
      <Headline text="*$70* on the first screen" start={t70 - 4} y={TOP} size={80} hl={C.green} />
      <Stage>
        <Step x={760} n={1} total="$70.70" t={pop(frame, fps, tFirst - 4, 11)} />
        <G x={940} y={340} s={pop(frame, fps, tFirst + 4, 10) * 1.2}>
          <path d="M-30,0 L-8,22 L34,-24" fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <G x={1260} y={0} o={0.45}><Step x={0} n={3} total="$70.70" t={pop(frame, fps, 0, 12)} /></G>
        <Sam seed={90} start={{mouth: 'flat'}} keys={[{f: tNice, p: {mouth: 'smile', brows: 'raised', lShoulder: 140, lElbow: 30}, d: 7, ease: 'out'}]} emotes={[{f: tNice + 4, kind: 'sparkle', d: 40}]} />
      </Stage>
      <Sfx name="ding" at={tFirst} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s55 — TickPick (a no-buyer-fee reseller) estimates buyers still pay ~27% in effective fees. */
export const S55: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTp = at('tick pick');
  const tNo = at('without buyer fees');
  const tEst = at('estimates');
  const t27 = at('27%');
  return (
    <AbsoluteFill>
      <Headline text="Buyers still pay *~27%*" start={t27 - 8} y={TOP} size={80} hl={C.magenta} />
      <Stage>
        <G x={700} y={430} s={pop(frame, fps, tTp, 12) * 0.95}><Tag text="TICKPICK" color={C.cyan} w={tagW('TICKPICK')} /></G>
        <SLabel text="reseller with no buyer fees" x={700} y={500} start={tNo} size={32} />
        <G x={700} y={720} s={pop(frame, fps, tEst - 4, 11) * 0.9}>
          <rect x={-240} y={-70} width={480} height={140} rx={16} fill={C.white} {...ink} />
          <text y={-8} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink}>Its estimate:</text>
          <text y={42} textAnchor="middle" fontFamily={BODY} fontWeight={700} fontSize={30} fill={C.ink}>effective fees elsewhere</text>
        </G>
        <G x={1290} y={600} s={pop(frame, fps, t27 - 6, 12) * 0.95}><Donut pct={27} t={ramp(frame, t27 - 4, 16)} color={C.magenta} label="OF BASE PRICE" /></G>
        <Sam seed={91} start={{mouth: 'flat'}} keys={[{f: t27, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
        <Gerald seed={92} start={{mouth: 'smirk'}} />
      </Stage>
      <Sfx name="pop" at={tTp} volume={0.3} />
      <Sfx name="pop" at={t27} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s56 — And it isn't only an American problem. */
export const S56: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tAm = at('american');
  return (
    <AbsoluteFill>
      <Headline text="Not just an *American* problem" start={at('and it')} y={TOP} size={78} stagger={2} />
      <Stage>
        <G x={760} y={600} s={pop(frame, fps, 0, 12) * 1.1}><Badge icon="ticket" color={C.cyan} label="US" labelSize={44} /></G>
        <Arrow x1={880} y1={600} x2={1120} y2={600} t={ramp(frame, tAm, 10)} w={12} />
        <G x={1240} y={600} s={pop(frame, fps, tAm + 4, 11) * 1.1}><Badge icon="ticket" color={C.red} label="UK" labelSize={44} /></G>
        <Sam seed={93} start={{mouth: 'o', brows: 'raised'}} />
      </Stage>
      <Sfx name="whoosh" at={tAm} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s57 — A UK ticket: £10 service, £2.25 facility, £2.75 handling: just under 20% of face value. */
export const S57: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSvc = at('10 pound');
  const tFac = at('two pound 25');
  const tHand = at('two pound 75');
  const t20 = at('just under 20%');
  const lines: ReceiptLine[] = [
    {label: 'Service charge', amount: '£10.00', color: C.magenta, t: ramp(frame, tSvc - 2, 8)},
    {label: 'Facility charge', amount: '£2.25', color: C.yellow, t: ramp(frame, tFac - 2, 8)},
    {label: 'Handling fee', amount: '£2.75', color: C.green, t: ramp(frame, tHand - 2, 8)},
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <Receipt x={900} y={220} w={640} size={36} title="ONE UK TICKET" lines={lines} total={{label: 'FEES', amount: '£15.00', t: ramp(frame, tHand + 14, 8), color: C.magenta}} />
        <G x={1180} y={760} s={pop(frame, fps, t20, 10) * 0.75} r={-6}><Stamp text="~20% OF FACE" color={C.red} /></G>
        <Actor who="librarian" x={P.left} y={FLOOR} s={P.s} seed={94} start={{lookX: 1, mouth: 'smile'}} keys={[{f: tSvc, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
        <SLabel text="BRITISH WRITER" x={P.left} y={headTop() - 70} start={0} size={26} />
        <Gerald seed={95} start={{mouth: 'grin'}} />
      </Stage>
      {[tSvc, tFac, tHand].map((t, i) => (
        <Sfx key={i} name="pop" at={t} volume={0.28} />
      ))}
      <Sfx name="thud" at={t20} volume={0.35} />
    </AbsoluteFill>
  );
};

/* Podium block. */
const Block: React.FC<{x: number; h: number; place: string; label: string; color: string; t: number}> = ({x, h, place, label, color, t}) => (
  <g opacity={Math.min(1, t * 2)}>
    <rect x={x - 150} y={FLOOR - h * t} width={300} height={h * t} fill={color} {...ink} />
    <text x={x} y={FLOOR - h * t + 80} textAnchor="middle" fontFamily={DISPLAY} fontSize={70} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke">{place}</text>
    <text x={x} y={FLOOR + 50} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>{label}</text>
  </g>
);

/* s58 — iD Mobile survey: ticketing companies were the worst hidden-fee offenders. */
export const S58: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSurvey = at('a survey');
  const tTick = at('ticketing companies');
  const tWorst = at('worst offenders');
  const tEnergy = at('energy');
  const tIns = at('insurers');
  const hWin = 260;
  return (
    <AbsoluteFill>
      <Headline text="The *worst* offenders" start={tWorst} y={TOP} size={84} hl={C.red} />
      <Stage>
        <SLabel text="SURVEY · iD MOBILE · HIDDEN FEES" x={960} y={250} start={tSurvey} size={30} />
        <Block x={960} h={hWin} place="1" label="TICKETING" color={C.magenta} t={ramp(frame, tTick, 14)} />
        <Block x={640} h={180} place="2" label="ENERGY" color={C.yellow} t={ramp(frame, tEnergy - 4, 12)} />
        <Block x={1280} h={120} place="3" label="INSURERS" color={C.cyan} t={ramp(frame, tIns - 4, 12)} />
        <Gerald x={960} y={FLOOR - hWin} s={0.5} seed={96} enter={tWorst} start={{mouth: 'flat', brows: 'raised', lookX: 0}}
          keys={[{f: tWorst + 10, p: {...SHRUG, mouth: 'smirk', brows: 'smug'}, d: 8}]} />
        <Sam seed={97} start={{mouth: 'flat'}} keys={[{f: tWorst, p: {mouth: 'frown', brows: 'angry'}, d: 6}]} />
      </Stage>
      <Sfx name="ding" at={tWorst} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s59 — People estimate they lose ~£126 a year to hidden fees; ~£147 in Scotland. */
export const S59: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t126 = at('126');
  const tSurp = at('surprise charges');
  const tScot = at('scotland');
  const t147 = at('147');
  return (
    <AbsoluteFill>
      <Headline text="Lost to hidden fees, per year" start={t126 - 10} y={TOP} size={72} stagger={2} />
      <Stage>
        <G x={0} y={0} o={ramp(frame, t126 - 8, 8)}>
          <Count x={850} y={560} to={126} t={ramp(frame, t126 - 10, 14)} prefix="£" size={170} color={C.magenta} />
          <SLabel text="UK AVERAGE" x={850} y={620} start={t126} size={34} />
        </G>
        <G x={0} y={0} o={ramp(frame, tScot - 4, 8)}>
          <Count x={1380} y={560} to={147} t={ramp(frame, t147 - 10, 14)} prefix="£" size={170} color={C.red} />
          <SLabel text="SCOTLAND" x={1380} y={620} start={tScot} size={34} />
        </G>
        {[0, 1, 2, 3, 4].map((i) => (
          <G key={i} x={700 + i * 150} y={860} s={pop(frame, fps, tSurp + i * 3, 10) * 0.6} r={wobble(frame + i * 9, 10, 0.15)}><Coin /></G>
        ))}
        <Sam seed={98} start={{mouth: 'flat'}} keys={[{f: tSurp, p: {mouth: 'frown', brows: 'sad', ...SHRUG}, d: 8}]} />
      </Stage>
      <Sfx name="cash" at={t126} volume={0.35} />
      <Sfx name="cash" at={t147} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s60 — 72% say it's got worse in five years; 65% feel "mugged off by British business". */
export const S60: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t72 = at('72%');
  const t65 = at('65%');
  const tMug = at('mugged off');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={800} y={500} s={pop(frame, fps, t72 - 4, 12) * 0.95}><Donut pct={72} t={ramp(frame, t72 - 2, 16)} color={C.yellow} label="SAY IT GOT WORSE" /></G>
        <G x={1320} y={500} s={pop(frame, fps, t65 - 4, 12) * 0.95}><Donut pct={65} t={ramp(frame, t65 - 2, 16)} color={C.red} label="FEEL..." /></G>
        <G x={1320} y={810} s={pop(frame, fps, tMug, 9) * 0.8} r={-6}><Stamp text="“MUGGED OFF”" color={C.red} /></G>
        <Sam seed={99} start={{mouth: 'flat'}} keys={[{f: tMug, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7, ease: 'out'}]} emotes={[{f: tMug + 4, kind: 'anger'}]} />
      </Stage>
      <Sfx name="pop" at={t72} volume={0.3} />
      <Sfx name="pop" at={t65} volume={0.3} />
      <Sfx name="thud" at={tMug} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s61 — So what would it actually take to make a fee smaller? */
export const S61: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSmall = at('smaller');
  const shrink = 1.5 - 0.5 * ramp(frame, tSmall - 4, 14);
  return (
    <AbsoluteFill>
      <Headline text="What makes a fee *smaller?*" start={at('so what')} y={TOP} size={80} stagger={2} hl={C.green} />
      <Stage>
        <G x={1000} y={560} s={pop(frame, fps, 0, 12) * shrink} r={-5}><Tag text="$10" color={C.magenta} w={tagW('$10')} /></G>
        <Sam seed={100} start={{mouth: 'flat', brows: 'oneUp', headTilt: 8}} emotes={[{f: tSmall, kind: '?'}]} />
        <Gerald seed={101} start={{mouth: 'smirk'}} />
      </Stage>
    </AbsoluteFill>
  );
};

/* s62 — March 2026: the Justice Department settled with Live Nation mid-trial. */
export const S62: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMar = at('march');
  const tSettled = at('settled');
  const tMid = at('middle of the trial');
  const sign = (f0: number) => [{f: f0, p: {...POINT, mouth: 'smile' as const}, d: 7, ease: 'out' as const}];
  return (
    <AbsoluteFill>
      <Headline text="March 2026: a *settlement*" start={tMar} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={960} y={FLOOR} s={pop(frame, fps, tMar, 13) * 0.7}><Courthouse label="JUSTICE DEPT." color={C.cyan} /></G>
        <Actor who="exec" x={590} y={FLOOR} s={0.6} seed={102} start={{lookX: 1, mouth: 'flat'}} keys={sign(tSettled)} />
        <SLabel text="JUSTICE DEPT." x={590} y={headTop(0.6) - 66} start={tMar + 6} size={26} />
        <Gerald x={1330} s={0.6} seed={103} start={{mouth: 'smirk'}} keys={sign(tSettled)} />
        <SLabel text="LIVE NATION" x={1330} y={headTop(0.6) - 66} start={tMar + 8} size={26} />
        <G x={960} y={470} s={pop(frame, fps, tSettled - 6, 12) * 0.5} r={-4} shadow><Contract title="SETTLEMENT" sign={ramp(frame, tSettled, 14)} /></G>
        <G x={1500} y={330} s={pop(frame, fps, tMid, 9) * 0.6} r={8}><Stamp text="MID-TRIAL" color={C.red} /></G>
        <Sam seed={104} start={{mouth: 'flat'}} keys={[{f: tMid, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="click" at={tSettled} volume={0.3} />
      <Sfx name="thud" at={tMid} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s63 — The deal set up a $280 million fund for the states that signed on. */
export const S63: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t280 = at('280');
  const tStates = at('states that signed');
  return (
    <AbsoluteFill>
      <Stage>
        <Count x={1000} y={520} to={280} t={ramp(frame, t280 - 8, 14)} suffix="M" size={200} color={C.green} />
        <SLabel text="SETTLEMENT FUND" x={1000} y={560} start={t280} size={40} />
        <SLabel text="FOR THE STATES THAT SIGNED ON" x={1000} y={630} start={tStates} size={32} color={C.grey} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <G key={i} x={720 + i * 112} y={850 - (i % 2) * 20} s={pop(frame, fps, t280 + i * 2, 10) * 0.7}><Coin /></G>
        ))}
        <Gerald seed={105} start={{mouth: 'flat', ...CROSS}} />
      </Stage>
      <Sfx name="cash" at={t280} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s64 — It caps the service fee at 15% of face value, but only at Live Nation amphitheaters. */
export const S64: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCap = at('caps');
  const t15 = at('15%');
  const tOnly = at('but only');
  const tAmph = at('amphitheaters');
  const others = ['ARENA', 'STADIUM', 'THEATER'];
  return (
    <AbsoluteFill>
      <Headline text="Fee cap: *15%*... but only here" start={t15 - 6} y={TOP} size={76} stagger={2} hl={C.green} />
      <Stage>
        <G x={700} y={FLOOR} s={pop(frame, fps, tAmph, 12) * 0.62}><Venue name="AMPHITHEATER" color={C.green} frame={frame} /></G>
        <G x={700} y={500} s={pop(frame, fps, t15, 10) * 0.75} r={-6}><Stamp text="15% CAP" color={C.green} /></G>
        {others.map((n, i) => (
          <g key={n} opacity={ramp(frame, tOnly + i * 3, 8)}>
            <G x={1080 + i * 300} y={FLOOR} s={0.42}><Venue name={n} color={C.grey} frame={0} lights={0} /></G>
            <G x={1080 + i * 300} y={720} s={0.4} r={6}><Stamp text="NO CAP" color={C.red} /></G>
          </g>
        ))}
        <Sam seed={106} x={P.left - 40} start={{mouth: 'smile'}} keys={[{f: tCap, p: {mouth: 'smile', brows: 'raised'}, d: 6}, {f: tOnly, p: {mouth: 'flat', brows: 'oneUp'}, d: 6}]} />
      </Stage>
      <Sfx name="ding" at={t15} volume={0.3} />
      <Sfx name="error" at={tOnly} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s65 — The timing raised eyebrows. */
export const S65: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBrow = at('eyebrows');
  return (
    <AbsoluteFill>
      <Headline text="The timing raised *eyebrows*" start={0} y={TOP} size={80} stagger={2} />
      <Stage>
        <G x={1300} y={560} s={pop(frame, fps, 0, 12) * 0.9}><Timer text="DAY 6" t={0.6} /></G>
        <Sam x={760} s={0.8} seed={107} start={{mouth: 'flat'}} keys={[{f: tBrow - 4, p: {brows: 'oneUp', mouth: 'flat', headTilt: 10}, d: 5, ease: 'out'}]} emotes={[{f: tBrow, kind: '?'}]} />
      </Stage>
    </AbsoluteFill>
  );
};
