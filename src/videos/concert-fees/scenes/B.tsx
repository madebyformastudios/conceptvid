import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Coin} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {TOP, FLOOR} from '../../../components/layout';
import {ConcertTicket, Courthouse, Bill, Badge, Venue, Pie, Contract, Door, Shop, Donut, Bubble, Scale, Seat, IconName} from '../kit';
import {SLabel, tagW, headTop, Sam, Gerald, P, SHOCK, POINT, SHRUG, CHEER, RAISE, HIPS, REST, CROSS} from './common';

const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};

/* s23 — A venue picks one official ticket seller. */
export const S23: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tVen = at('a venue');
  const tOne = at('one official');
  return (
    <AbsoluteFill>
      <Headline text="One *official* seller" start={tOne} y={TOP} size={84} hl={C.cyan} />
      <Stage>
        <G x={1000} y={FLOOR} s={pop(frame, fps, tVen, 13) * 1.0}><Venue name="THE VENUE" color={C.cyan} frame={frame} /></G>
        <G x={1000} y={470} s={pop(frame, fps, tOne + 4, 10) * 0.75} r={-6}><Stamp text="EXCLUSIVE" color={C.magenta} /></G>
        <Sam seed={31} start={{mouth: 'flat', brows: 'oneUp'}} />
        <Gerald seed={32} enter={tOne} start={{mouth: 'grin'}} />
      </Stage>
      <Sfx name="thud" at={tOne + 4} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s24 — Two companies want the deal: lower fees for fans vs. a bigger slice for the venue. */
export const S24: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTwo = at('two companies');
  const tLow = at('lower fees');
  const tOther = at('the other offers');
  const tSlice = at('bigger slice');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={960} y={FLOOR} s={pop(frame, fps, 0, 13) * 0.7}><Venue name="VENUE" color={C.cyan} frame={frame} /></G>
        <G x={640} y={headTop(0.62) - 120} s={pop(frame, fps, tLow, 11)}><Bubble text={'Lower fees\nfor the fans!'} tail="left" size={36} /></G>
        <G x={1300} y={headTop(0.62) - 120} s={pop(frame, fps, tSlice, 11)}><Bubble text={'A bigger slice\nof every fee!'} tail="right" color={C.yellow} size={36} /></G>
        <G x={1300} y={720} s={pop(frame, fps, tSlice + 6, 11) * 0.45}>
          <Pie slices={[{v: 70, color: C.paperDark}, {v: 30, color: C.magenta, pop: 1}]} rad={150} />
        </G>
        <Actor who="exec" x={P.left + 40} y={FLOOR} s={P.s} seed={33} enter={tTwo} start={{lookX: 1, mouth: 'smile'}}
          keys={[{f: tLow, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <Gerald seed={34} enter={tTwo + 4} start={{mouth: 'smirk'}} keys={[{f: tOther, p: {...POINT, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tLow} volume={0.35} />
      <Sfx name="pop" at={tSlice} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s25 — Which one do you think the venue picks? */
export const S25: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWhich = at('which one');
  return (
    <AbsoluteFill>
      <Headline text="Which one does the venue *pick?*" start={tWhich} y={TOP} size={76} stagger={2} />
      <Stage>
        <G x={960} y={FLOOR} s={0.7}><Venue name="VENUE" color={C.cyan} frame={frame} /></G>
        <G x={960} y={560} s={pop(frame, fps, tWhich + 6, 9) * 0.9} r={wobble(frame, 8, 0.2)}><Badge icon="question" color={C.magenta} /></G>
        <G x={600} y={520} s={0.8}><Tag text="LOWER FEES" color={C.green} w={tagW('LOWER FEES')} /></G>
        <G x={1320} y={520} s={0.8}><Tag text="BIGGER SLICE" color={C.yellow} w={tagW('BIGGER SLICE')} /></G>
        <Actor who="exec" x={P.left + 40} y={FLOOR} s={P.s} seed={33} start={{lookX: 1, mouth: 'smile', ...REST}} />
        <Gerald seed={34} start={{mouth: 'grin', ...HIPS}} />
      </Stage>
    </AbsoluteFill>
  );
};

/* s26 — Ticket companies compete for the venue's signature; you don't get a vote. */
export const S26: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tComp = at('competing');
  const tSig = at('signature');
  const tVote = at("you don't");
  return (
    <AbsoluteFill>
      <Headline text="You don't get a *vote.*" start={tVote} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <G x={1000} y={560} s={pop(frame, fps, tComp - 4, 13) * 0.95} r={-3} shadow><Contract sign={ramp(frame, tSig, 14)} seal={pop(frame, fps, tSig + 14, 10)} /></G>
        <Sam seed={35} start={{mouth: 'smile'}} keys={[{f: tVote - 6, p: {...RAISE, mouth: 'o', brows: 'raised'}, d: 6, ease: 'out'}, {f: tVote + 8, p: {...REST, mouth: 'frown', brows: 'sad'}, d: 10}]} />
        <G x={P.left + 30} y={headTop() - 95} s={pop(frame, fps, tVote + 6, 10) * 0.55} r={-8}><Stamp text="NO VOTE" color={C.red} /></G>
        <Gerald seed={36} start={{mouth: 'grin'}} />
      </Stage>
      <Sfx name="click" at={tSig} volume={0.35} />
      <Sfx name="thud" at={tVote + 6} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s27 — The offer that shares more with the building wins, and that money comes from somewhere. */
export const S27: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tShare = at('shares more');
  const tWin = at('tends to win');
  const tSome = at('come from somewhere');
  const tilt = lerp(frame, [tWin, tWin + 14], [0, 16]);
  const fly = lerp(frame, [tSome, tSome + 22], [0, 1]);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1000} y={FLOOR} s={pop(frame, fps, 0, 14) * 1.15}>
          <Scale tilt={tilt}
            left={<g transform="translate(0 -40) scale(0.55)"><Tag text="FANS" color={C.green} w={tagW('FANS')} /></g>}
            right={<g transform="translate(0 -60) scale(0.55)"><Pie slices={[{v: 50, color: C.yellow}, {v: 50, color: C.magenta}]} rad={110} /></g>} />
        </G>
        <SLabel text="BIGGER SLICE WINS" x={1290} y={480} start={tWin} color={C.magenta} size={38} />
        {fly > 0 && fly < 1 && (
          <G x={lerp(fly, [0, 1], [380, 1270])} y={lerp(fly, [0, 1], [700, 640]) - Math.sin(fly * Math.PI) * 220} s={0.6} r={fly * 360}><Bill value="$" /></G>
        )}
        <Sam seed={37} start={{mouth: 'flat'}} keys={[{f: tSome, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tSome + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="thud" at={tWin + 10} volume={0.35} />
      <Sfx name="whoosh" at={tSome} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s28 — Contracts at 26 public venues: when Ticketmaster gave up revenue, it raised service charges. */
export const S28: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t26 = at('26');
  const tGave = at('gave up revenue');
  const tRaise = at('raised its own');
  const tBack = at('win it back');
  return (
    <AbsoluteFill>
      <Headline text="26 public venues, *one pattern*" start={t26} y={TOP} size={72} stagger={2} />
      <Stage>
        {Array.from({length: 26}).map((_, i) => (
          <G key={i} x={580 + (i % 7) * 82} y={380 + Math.floor(i / 7) * 92} s={pop(frame, fps, t26 + i * 0.8, 12) * 0.42}>
            <Badge icon="building" color={[C.cyan, C.yellow, C.magenta, C.green][i % 4]} />
          </G>
        ))}
        {/* revenue given up vs. fees raised */}
        <line x1={1170} y1={760} x2={1560} y2={760} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <rect x={1200} y={760} width={140} height={150 * ramp(frame, tGave, 14)} fill={C.yellow} {...ink} opacity={ramp(frame, tGave, 3)} />
        <text x={1270} y={740} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink} opacity={ramp(frame, tGave + 6, 8)}>▼</text>
        <rect x={1390} y={760 - 300 * ramp(frame, tRaise, 16)} width={140} height={300 * ramp(frame, tRaise, 16)} fill={C.magenta} {...ink} opacity={ramp(frame, tRaise, 3)} />
        <text x={1460} y={420} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink} opacity={ramp(frame, tBack, 8)}>▲</text>
        <SLabel text="DEAL CUT" x={1270} y={930} start={tGave} size={26} />
        <SLabel text="SERVICE FEE" x={1460} y={800} start={tRaise} size={26} />
        <Gerald seed={38} start={{mouth: 'smirk'}} keys={[{f: tGave, p: {mouth: 'frown', brows: 'sad'}, d: 6}, {f: tRaise, p: {...RAISE, mouth: 'grin', brows: 'smug'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={t26} volume={0.3} />
      <Sfx name="cash" at={tBack} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s29 — The facility charge: extra revenue for the venue, because the venue can demand it. */
export const S29: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFac = at('facility charge');
  const tWriter = at('one ticketing writer');
  const tExtra = at('extra revenue');
  const tDem = at('can demand');
  return (
    <AbsoluteFill>
      <Headline text="The *facility* charge" start={tFac} y={TOP} size={80} hl={C.yellow} />
      <Stage>
        <G x={1000} y={480} s={pop(frame, fps, tExtra - 2, 12)}>
          <rect x={-470} y={-120} width={940} height={240} rx={20} fill={C.white} {...ink} />
          <text x={-430} y={-30} fontFamily={DISPLAY} fontSize={110} fill={C.yellow} stroke={C.ink} strokeWidth={4} paintOrder="stroke">“</text>
          <text x={-330} y={-20} fontFamily={BODY} fontWeight={800} fontSize={44} fill={C.ink}>Extra revenue for the venue,</text>
          <rect x={-334} y={30} width={680 * ramp(frame, tDem, 12)} height={58} fill={C.yellow} />
          <text x={-330} y={74} fontFamily={BODY} fontWeight={800} fontSize={44} fill={C.ink}>because the venue can demand it.</text>
        </G>
        <G x={1250} y={FLOOR} s={pop(frame, fps, tDem, 13) * 0.5}><Venue name="VENUE" color={C.yellow} frame={frame} /></G>
        <Actor who="librarian" x={P.left} y={FLOOR} s={P.s} seed={39} enter={tWriter} start={{lookX: 1, mouth: 'smile'}}
          keys={[{f: tExtra, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
        <Gerald seed={40} start={{mouth: 'smirk'}} keys={[{f: tDem, p: {...SHRUG, mouth: 'smirk'}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tExtra} volume={0.3} />
    </AbsoluteFill>
  );
};

/* Two-panel comparison card. */
const Panel: React.FC<{x: number; title: string; color: string; t: number; up: boolean; label: string; at0: number}> = ({x, title, color, t, up, label, at0}) => {
  const frame = useBeat().frame;
  return (
    <g>
      <rect x={x - 270} y={300} width={540} height={560} rx={22} fill={C.white} {...ink} />
      <rect x={x - 270} y={300} width={540} height={84} rx={22} fill={color} {...ink} />
      <text x={x} y={358} textAnchor="middle" fontFamily={DISPLAY} fontSize={38} fill={C.ink}>{title}</text>
      <text x={x} y={460} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink} opacity={ramp(frame, at0 - 8, 8)}>Competition</text>
      <G x={x} y={640} s={t} r={up ? 0 : 180}>
        <path d="M0,-130 L90,-20 L36,-20 L36,110 L-36,110 L-36,-20 L-90,-20 Z" fill={up ? C.red : C.green} {...ink} />
      </G>
      <text x={x} y={820} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={up ? C.red : C.green} opacity={t}>{label}</text>
    </g>
  );
};

/* s30 — In most markets competition pushes prices down; in ticketing it can push fees up. */
export const S30: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMost = at('most markets');
  const tDown = at('pushes prices down');
  const tTick = at('in ticketing');
  const tUp = at('push fees up');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={0} y={0} s={1} o={ramp(frame, tMost - 6, 8)}><Panel x={830} title="MOST MARKETS" color={C.green} t={pop(frame, fps, tDown, 11)} up={false} label="PRICES DOWN" at0={tMost} /></G>
        <G x={0} y={0} s={1} o={ramp(frame, tTick - 6, 8)}><Panel x={1430} title="TICKETING" color={C.magenta} t={pop(frame, fps, tUp, 11)} up label="FEES UP" at0={tTick} /></G>
        <Sam seed={41} start={{mouth: 'smile'}} keys={[{f: tUp, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7, ease: 'out'}]} emotes={[{f: tUp + 4, kind: 'anger'}]} />
      </Stage>
      <Sfx name="ding" at={tDown} volume={0.3} />
      <Sfx name="error" at={tUp} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s31 — Once the contract is signed you've got one door: the official seller, or resale. */
export const S31: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSigned = at('contract is signed');
  const tDoor = at('one door');
  const tResale = at('resale market');
  const tHigher = at('often higher');
  const tFees = at('fees look');
  return (
    <AbsoluteFill>
      <Headline text="You've got *one door*" start={tDoor} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <G x={640} y={560} s={pop(frame, fps, tSigned - 4, 12) * 0.5 * (1 - ramp(frame, tDoor, 8))} r={-6}><Contract sign={ramp(frame, tSigned, 12)} /></G>
        <G x={900} y={FLOOR} s={pop(frame, fps, tDoor, 12) * 1.0}><Door label="OFFICIAL SELLER" color={C.magenta} /></G>
        <G x={1400} y={FLOOR} s={pop(frame, fps, tResale, 12) * 0.9}><Door label="RESALE" color={C.grey} /></G>
        <G x={1610} y={500} s={pop(frame, fps, tHigher, 10) * 0.75} r={8}><Tag text="$$$" color={C.red} w={tagW('$$$')} /></G>
        {[900, 1400].map((x, i) => (
          <G key={x} x={x + 150} y={720} s={pop(frame, fps, tFees + i * 4, 10) * 0.6} r={-10}><Tag text="+FEES" color={C.magenta} w={tagW('+FEES')} /></G>
        ))}
        <Sam seed={42} start={{mouth: 'flat'}} keys={[{f: tDoor, p: {lookX: 1, mouth: 'flat', brows: 'oneUp'}, d: 6}, {f: tFees, p: {mouth: 'frown', brows: 'sad'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tDoor} volume={0.35} />
      <Sfx name="pop" at={tResale} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s32 — Normally you'd walk to the shop next door. Here, next door doesn't sell this concert. */
export const S32: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tStores = at('most stores');
  const tWalk = at('walk to the shop');
  const tHere = at('here,');
  const tNot = at("doesn't sell");
  return (
    <AbsoluteFill>
      <Stage>
        <G x={800} y={FLOOR} s={pop(frame, fps, tStores - 4, 13) * 0.95}><Shop label="STORE" color={C.cyan} /></G>
        <G x={1350} y={FLOOR} s={pop(frame, fps, tStores, 13) * 0.95}><Shop label="NEXT DOOR" color={C.yellow} sign="NOT HERE" signT={pop(frame, fps, tNot, 10)} /></G>
        <Sam seed={43} start={{mouth: 'smile'}}
          keys={[
            {f: tWalk, p: {x: 1290}, d: Math.max(20, tHere - tWalk)},
            {f: tNot, p: {mouth: 'frown', brows: 'sad', ...SHRUG}, d: 7},
          ]}
          emotes={[{f: tNot + 4, kind: '?'}]}
        />
      </Stage>
      <Sfx name="error" at={tNot} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s33 — How much of the market sits behind Ticketmaster's door? */
export const S33: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tHow = at('how much');
  const tDoor = at("ticketmaster's door");
  return (
    <AbsoluteFill>
      <Headline text="How much sits behind *this door?*" start={tHow} y={TOP} size={76} stagger={2} hl={C.magenta} />
      <Stage>
        <G x={960} y={FLOOR} s={pop(frame, fps, tHow, 13) * 1.05}><Door label="TICKETMASTER" color={C.magenta} open={ramp(frame, tDoor, 12) * 0.5} /></G>
        <Gerald x={1250} seed={44} start={{mouth: 'smirk', ...CROSS}} />
        <Sam seed={45} start={{mouth: 'flat', brows: 'oneUp'}} emotes={[{f: tDoor, kind: '?'}]} />
      </Stage>
    </AbsoluteFill>
  );
};

/* s34 — The states' lawyer: 86% of primary concert ticketing; 73% with sports. */
export const S34: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLaw = at("state's lawyer");
  const t86 = at('86%');
  const tSport = at('count sports');
  const t73 = at('73%');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={860} y={540} s={pop(frame, fps, t86 - 6, 13) * 0.95}><Donut pct={86} t={ramp(frame, t86 - 4, 18)} color={C.magenta} label="CONCERTS" /></G>
        <G x={1400} y={540} s={pop(frame, fps, tSport, 13) * 0.95}><Donut pct={73} t={ramp(frame, t73 - 4, 18)} color={C.cyan} label="+ SPORTS" /></G>
        <SLabel text="OF PRIMARY TICKETING (US)" x={1130} y={820} start={t86 + 6} size={32} />
        <Actor who="exec" x={P.left} y={FLOOR} s={P.s} seed={46} enter={tLaw - 4} start={{lookX: 1, mouth: 'smile'}}
          keys={[{f: t86, p: {...POINT, mouth: 'open', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <SLabel text="STATES' LAWYER" x={P.left} y={headTop() - 70} start={tLaw} size={26} />
        <Gerald x={1740} s={0.5} seed={47} start={{mouth: 'smirk'}} keys={[{f: t86, p: {mouth: 'flat', brows: 'raised'}, d: 6}]} emotes={[{f: t86 + 6, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="pop" at={t86} volume={0.35} />
      <Sfx name="pop" at={t73} volume={0.35} />
    </AbsoluteFill>
  );
};

/* Org-chart box. */
const OrgBox: React.FC<{x: number; y: number; text: string; color: string; s: number; w?: number}> = ({x, y, text, color, s, w = 300}) => (
  <G x={x} y={y} s={s}>
    <rect x={-w / 2} y={-44} width={w} height={88} rx={14} fill={color} {...ink} />
    <text y={14} textAnchor="middle" fontFamily={DISPLAY} fontSize={Math.min(36, (w - 40) / (text.length * 0.72))} fill={C.ink}>{text}</text>
  </G>
);

/* s35 — Ticketmaster's parent, Live Nation, also promotes tours and runs venues. */
export const S35: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tStr = at('stranger');
  const tLN = at('live nation');
  const tTours = at('promotes tours');
  const tVen = at('runs venues');
  const kids: [string, string, number, number][] = [
    ['TICKETMASTER', C.magenta, 620, tLN + 6],
    ['TOURS', C.yellow, 1000, tTours],
    ['VENUES', C.cyan, 1380, tVen],
  ];
  return (
    <AbsoluteFill>
      <Headline text="And it gets *stranger*" start={tStr} y={TOP} size={80} />
      <Stage>
        <OrgBox x={1000} y={400} text="LIVE NATION" color={C.white} s={pop(frame, fps, tLN, 12)} w={380} />
        {kids.map(([t, c, x, f]) => (
          <g key={t}>
            <path d={`M1000,444 V520 H${x} V600`} fill="none" stroke={C.ink} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(frame, f - 4, 8)} />
            <OrgBox x={x} y={650} text={t} color={c} s={pop(frame, fps, f, 12)} />
          </g>
        ))}
        <Gerald seed={48} start={{mouth: 'grin', ...CROSS}} keys={[{f: tVen, p: {...CHEER, mouth: 'grin'}, d: 8, ease: 'out'}]} emotes={[{f: tVen + 4, kind: 'sparkle', d: 40}]} />
        <Sam seed={49} start={{mouth: 'flat'}} keys={[{f: tStr, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      {kids.map(([t, , , f]) => (
        <Sfx key={t} name="pop" at={f} volume={0.3} />
      ))}
    </AbsoluteFill>
  );
};

/* s36 — The DOJ and dozens of states sued in 2024: one company controlling everything. */
export const S36: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tDoj = at('justice department');
  const tStates = at('dozens of states');
  const t24 = at('2024');
  const tOne = at('one company');
  const parts: [IconName, string, string, string][] = [
    ['ticket', 'TICKETING', C.magenta, 'the ticketing'],
    ['star', 'BOOKING', C.yellow, 'concert booking'],
    ['building', 'VENUES', C.cyan, 'the venues'],
    ['mega', 'PROMOTION', C.green, 'the promotion'],
  ];
  const cx = 1280;
  const cy = 600;
  const pos = [
    [cx - 330, cy - 170],
    [cx + 330, cy - 170],
    [cx - 330, cy + 150],
    [cx + 330, cy + 150],
  ];
  const fade = 1 - ramp(frame, tOne - 6, 10);
  return (
    <AbsoluteFill>
      <Headline text="Sued in *2024*" start={t24} y={TOP} size={80} />
      <Stage>
        <G x={0} y={0} o={fade}>
          <G x={760} y={FLOOR} s={pop(frame, fps, tDoj, 13) * 0.85}><Courthouse label="JUSTICE DEPT." color={C.cyan} /></G>
          {Array.from({length: 12}).map((_, i) => (
            <G key={i} x={1180 + (i % 4) * 130} y={420 + Math.floor(i / 4) * 150} s={pop(frame, fps, tStates + i * 1.5, 12) * 0.45}><Badge icon="gov" color={C.yellow} /></G>
          ))}
          <SLabel text="+ DOZENS OF STATES" x={1375} y={830} start={tStates + 8} size={32} />
        </G>
        {frame >= tOne - 6 && (
          <g opacity={ramp(frame, tOne - 6, 8)}>
            {parts.map(([icon, label, color, cue], i) => {
              const t = at(cue);
              return (
                <g key={label}>
                  <Arrow x1={pos[i][0]} y1={pos[i][1]} x2={cx + (pos[i][0] - cx) * 0.3} y2={cy - 120 + (pos[i][1] - cy) * 0.2} t={ramp(frame, t, 8)} color={color} w={8} />
                  <G x={pos[i][0]} y={pos[i][1]} s={pop(frame, fps, t, 11) * 0.62}><Badge icon={icon} color={color} label={label} labelSize={40} /></G>
                </g>
              );
            })}
            <Gerald x={cx} s={0.68} seed={50} enter={tOne} start={{mouth: 'grin', brows: 'smug', ...CROSS}} />
          </g>
        )}
        <Sam seed={51} start={{mouth: 'flat'}} keys={[{f: tOne, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tDoj} volume={0.35} />
      {parts.map(([, label, , cue]) => (
        <Sfx key={label} name="pop" at={at(cue)} volume={0.28} />
      ))}
    </AbsoluteFill>
  );
};

/* s37 — Promoter, building and ticket seller splitting your fees can all be the same company. */
export const S37: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const roles: [string, string, number][] = [
    ['PROMOTER', C.yellow, at('the promoter')],
    ['VENUE', C.cyan, at('the building')],
    ['TICKETS', C.magenta, at('the ticket seller')],
  ];
  const tSame = at('same company');
  const merge = lerp(frame, [tSame, tSame + 14], [0, 1]);
  const xs = [760, 1180, 1600];
  return (
    <AbsoluteFill>
      <Headline text="All the *same company*" start={tSame} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        {roles.map(([label, color, t], i) => (
          <g key={label} opacity={i === 1 ? 1 : 1 - ramp(frame, tSame + 10, 6)}>
            <Gerald x={xs[i] + (1180 - xs[i]) * merge} flip={false} s={0.58} seed={52 + i} enter={t}
              start={{lookX: 0, mouth: 'grin', brows: 'smug', rShoulder: -150, rElbow: -10}}
              rHand={<g transform="scale(0.9)"><HeldSignBig text={label} color={color} /></g>} />
          </g>
        ))}
        <Sam seed={55} start={{mouth: 'flat'}} keys={[{f: tSame, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tSame + 4, kind: '!'}]} />
      </Stage>
      {roles.map(([label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.3} />
      ))}
      <Sfx name="thud" at={tSame + 12} volume={0.4} />
    </AbsoluteFill>
  );
};

const HeldSignBig: React.FC<{text: string; color: string}> = ({text, color}) => {
  const w = text.length * 34 + 60;
  return (
    <g>
      <rect x={-6} y={-150} width={12} height={160} fill="#B07A3E" {...ink} strokeWidth={4} />
      <rect x={-w / 2} y={-250} width={w} height={104} rx={10} fill={color} {...ink} strokeWidth={6} />
      <text y={-182} textAnchor="middle" fontFamily={DISPLAY} fontSize={46} fill={C.ink}>{text}</text>
    </g>
  );
};

/* s38 — Fees are only half the bill: one more layer changes the ticket price itself. */
export const S38: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tHalf = at('half the bill');
  const tLayer = at('one more layer');
  const tPrice = at('price of the ticket');
  const spin = frame >= tPrice ? [50, 72, 64, 95, 81, 120, 88, 140][Math.floor((frame - tPrice) / 3) % 8] : 50;
  return (
    <AbsoluteFill>
      <Headline text="Fees are only *half* the bill" start={tHalf - 4} y={TOP} size={76} stagger={2} />
      <Stage>
        <G x={1000} y={560} s={pop(frame, fps, 0, 14) * 1.35} r={-3 + (frame >= tPrice ? wobble(frame, 2, 0.6) : 0)} shadow>
          <ConcertTicket price={`$${spin}`} color={C.magenta} />
        </G>
        <G x={1000} y={830} s={pop(frame, fps, tLayer, 10) * 0.7}><Tag text="LAYER 2: THE PRICE" color={C.yellow} w={tagW('LAYER 2: THE PRICE')} /></G>
        <Sam seed={56} start={{mouth: 'flat'}} keys={[{f: tPrice, p: {mouth: 'o', brows: 'raised'}, d: 6}]} emotes={[{f: tPrice + 4, kind: '?'}]} />
        <Gerald seed={57} start={{mouth: 'grin'}} />
      </Stage>
      <Sfx name="pop" at={tLayer} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s39 — Dynamic pricing: the face value changes based on demand. */
export const S39: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tDyn = at('dynamic pricing');
  const tDem = at('demand');
  const d = lerp(frame, [tDem - 4, tDem + 26], [0.2, 0.95]) + (frame > tDem + 26 ? wobble(frame, 0.04, 0.3) : 0);
  const price = Math.round(50 + d * 100);
  return (
    <AbsoluteFill>
      <Headline text="*Dynamic* pricing" start={tDyn} y={TOP} size={88} hl={C.cyan} />
      <Stage>
        {/* demand meter */}
        <G x={700} y={0}>
          <rect x={-55} y={330} width={110} height={520} rx={55} fill={C.white} {...ink} />
          <rect x={-40} y={835 - 490 * d} width={80} height={490 * d} rx={40} fill={d > 0.7 ? C.red : C.yellow} />
          <text y={900} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>DEMAND</text>
        </G>
        <Arrow x1={800} y1={590} x2={960} y2={590} t={ramp(frame, tDem, 8)} w={10} />
        <G x={1270} y={590} s={pop(frame, fps, tDyn, 13) * 1.2} r={-3} shadow>
          <ConcertTicket price={`$${price}`} color={C.cyan} title="FACE VALUE" />
        </G>
        <Gerald seed={58} start={{mouth: 'smirk'}} keys={[{f: tDem, p: {...RAISE, mouth: 'grin'}, d: 8, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tDyn} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s40 — Top 100 tours in North America: average price up more than 17% from 2019 to 2022 (Pollstar). */
export const S40: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tClimb = at('climbing');
  const tTop = at('top 100');
  const t17 = at('17%');
  const t19 = at('2019');
  const t22 = at('2022');
  const tSrc = at('polestar');
  const base = 330;
  return (
    <AbsoluteFill>
      <Headline text="Prices have been *climbing*" start={tClimb} y={TOP} size={78} stagger={2} />
      <Stage>
        <line x1={760} y1={860} x2={1440} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <rect x={840} y={860 - base * ramp(frame, t19 - 4, 14)} width={200} height={base * ramp(frame, t19 - 4, 14)} fill={C.cyan} {...ink} />
        <rect x={1160} y={860 - base * 1.17 * ramp(frame, t22 - 4, 14)} width={200} height={base * 1.17 * ramp(frame, t22 - 4, 14)} fill={C.magenta} {...ink} />
        <text x={940} y={910} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.ink} opacity={ramp(frame, t19, 8)}>2019</text>
        <text x={1260} y={910} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.ink} opacity={ramp(frame, t22, 8)}>2022</text>
        <G x={1260} y={410} s={pop(frame, fps, t17, 10) * 0.8} r={-6}><Stamp text="+17%" color={C.red} /></G>
        <SLabel text="AVG. TICKET · TOP 100 TOURS · N. AMERICA" x={1100} y={250} start={tTop} size={28} />
        <SLabel text="SOURCE: POLLSTAR" x={1660} y={990} start={tSrc} size={22} color={C.grey} />
        <Sam seed={59} start={{mouth: 'flat'}} keys={[{f: t17, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={t19} volume={0.3} />
      <Sfx name="thud" at={t17} volume={0.35} />
    </AbsoluteFill>
  );
};

/* Ticket price bar with its fee stacked on top (same scale in s41-s43). */
const PX = 3.2;
const PriceFee: React.FC<{x: number; price: number; fee: number; tp: number; tf: number; w?: number}> = ({x, price, fee, tp, tf, w = 170}) => {
  const hp = price * PX * tp;
  const hf = fee * PX * tf;
  const y0 = 860;
  return (
    <g>
      {hp > 1 && <rect x={x - w / 2} y={y0 - hp} width={w} height={hp} fill={C.cyan} {...ink} />}
      {hf > 1 && <rect x={x - w / 2} y={y0 - hp - hf} width={w} height={hf} fill={C.magenta} {...ink} />}
      <text x={x} y={y0 - hp / 2 + 16} textAnchor="middle" fontFamily={DISPLAY} fontSize={42} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke" opacity={tp}>${price}</text>
      <text x={x} y={y0 - hp - hf - 18} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.magenta} stroke={C.ink} strokeWidth={4} paintOrder="stroke" opacity={tf}>+${fee}</text>
    </g>
  );
};

/* s41 — The service fee scales with the price: higher ticket, higher fee. */
export const S41: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWorks = at('service fee works');
  const tScale = at('scales with');
  const tHigh = at('the higher the ticket');
  const tFee = at('higher the fee');
  const ps = [50, 100, 150];
  return (
    <AbsoluteFill>
      <Headline text="Higher ticket, *higher fee*" start={tHigh} y={TOP} size={80} hl={C.magenta} stagger={2} />
      <Stage>
        <line x1={640} y1={860} x2={1460} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        {ps.map((p, i) => (
          <PriceFee key={p} x={760 + i * 290} price={p} fee={p / 5} tp={ramp(frame, tScale + i * 6, 12)} tf={ramp(frame, (i === 0 ? tScale : i === 1 ? tHigh : tFee) + 4, 10)} />
        ))}
        <Gerald seed={60} start={{mouth: 'smile'}} keys={[{f: tWorks, p: {...POINT, mouth: 'smile'}, d: 8, ease: 'out'}, {f: tFee, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      {ps.map((p, i) => (
        <Sfx key={p} name="pop" at={tScale + i * 6} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s42 — Say the fee is 20%: a $50 ticket carries a $10 fee. */
export const S42: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSimple = at('simple');
  const t20 = at('20%');
  const t50 = at('$50 ticket');
  const t10 = at('$10 fee');
  return (
    <AbsoluteFill>
      <Headline text="Say the fee is *20%*" start={t20 - 6} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <line x1={640} y1={860} x2={1460} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <PriceFee x={850} price={50} fee={10} tp={ramp(frame, t50, 12)} tf={ramp(frame, t10, 10)} />
        <G x={850} y={980} s={pop(frame, fps, tSimple, 12) * 0.5}><Seat color={C.yellow} /></G>
        <G x={1250} y={500} s={pop(frame, fps, t20, 10)} r={-8}><Stamp text="20%" color={C.magenta} /></G>
        <Sam seed={61} start={{mouth: 'smile'}} keys={[{f: t10, p: {mouth: 'flat', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={t20} volume={0.35} />
      <Sfx name="pop" at={t10} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s43 — Demand spikes, same seat jumps to $100, fee is now $20: it just doubled. */
export const S43: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSpike = at('demand spikes');
  const t100 = at('$100');
  const t20 = at('fee is 20');
  const tSame = at('same seat');
  const tDbl = at('doubled');
  return (
    <AbsoluteFill>
      <Headline text="Same seat. Fee *doubled.*" start={tSame} y={TOP} size={80} hl={C.magenta} stagger={2} />
      <Stage>
        <line x1={640} y1={860} x2={1460} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <PriceFee x={850} price={50} fee={10} tp={1} tf={1} />
        <PriceFee x={1250} price={100} fee={20} tp={ramp(frame, t100 - 4, 14)} tf={ramp(frame, t20, 10)} />
        <Arrow x1={960} y1={600} x2={1130} y2={480} t={ramp(frame, tSpike, 10)} color={C.red} w={10} />
        {[850, 1250].map((x, i) => (
          <G key={x} x={x} y={980} s={pop(frame, fps, i === 0 ? 0 : tSame, 12) * 0.5}><Seat color={C.yellow} /></G>
        ))}
        <G x={1250} y={330} s={pop(frame, fps, tDbl, 9) * 0.8} r={-8}><Stamp text="×2 FEE" color={C.red} /></G>
        <Sam seed={62} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tDbl, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tDbl + 3, kind: '!'}]} />
        <Gerald seed={63} enter={tSpike} start={{mouth: 'grin'}} />
      </Stage>
      <Sfx name="pop" at={t100} volume={0.3} />
      <Sfx name="pop" at={t20} volume={0.3} />
      <Sfx name="thud" at={tDbl} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s44 — Everyone sharing the fee gets a raise; nobody touched a single fee. */
export const S44: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tUp = at('pushes the price up');
  const tRaise = at('gets a raise');
  const tNobody = at('nobody');
  const grow = lerp(frame, [tRaise - 4, tRaise + 16], [0.6, 1]);
  return (
    <AbsoluteFill>
      <Headline text="Everyone gets a *raise*" start={tRaise - 6} y={TOP} size={80} hl={C.green} stagger={2} />
      <Stage>
        <G x={980} y={560} s={pop(frame, fps, tUp, 12) * grow}>
          <Pie rad={230} labelSize={30} slices={[{v: 45, color: C.magenta, label: 'TICKET CO.'}, {v: 35, color: C.yellow, label: 'VENUE'}, {v: 20, color: C.cyan, label: 'PROMO'}]} />
        </G>
        <SLabel text="FEE RATE: STILL 20%" x={980} y={830} start={tNobody} size={38} color={C.ink} />
        <Gerald seed={64} start={{mouth: 'smile'}} keys={[{f: tRaise, p: {...CHEER, mouth: 'grin'}, d: 8, ease: 'out'}]} emotes={[{f: tRaise + 4, kind: 'sparkle', d: 50}]} />
        <Sam seed={65} start={{mouth: 'flat'}} keys={[{f: tNobody, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7}]} />
      </Stage>
      <Sfx name="cash" at={tRaise} volume={0.4} />
    </AbsoluteFill>
  );
};
