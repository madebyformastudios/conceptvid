import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Cursor} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {TOP, FLOOR} from '../../../components/layout';
import {Phone, Bubble, Contract, Browser, Button, Shop} from '../../concert-fees/kit';
import {Badge2, StoreFront, ParkingLines, Car, LaptopLid, HotelRow, Thermometer, Moon, FlatTV, Icon2} from '../kit';
import {TvListing} from './A';
import {Sam, Gerald, Friend, SourceTag, SLabel, tagW, headTop, P, SHOCK, POINT, SHRUG, RAISE, HIPS, REST, CROSS, Toggle} from './common';

const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};

/* s25 — $599.99: a hundred dollars more, because the phone was next to the store. */
export const S25: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t599 = at('five hundred');
  const t100 = at('a hundred dollars more');
  const tNext = at('next to the store');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1240} y={FLOOR - 120} s={0.62}><StoreFront name="TARGET" color={C.red} /></G>
        <rect x={0} y={FLOOR - 120} width={1920} height={128} fill="#8E8F96" />
        <G x={1100} y={FLOOR - 100}><ParkingLines n={7} gap={220} /></G>
        <G x={760} y={FLOOR - 10} s={0.8}><Car color={C.cyan} /></G>
        <G x={760} y={420} s={0.62} r={wobble(frame, 1.5, 0.3) * ramp(frame, t599, 4)}>
          <TvListing price={frame >= t599 ? '$599.99' : '$499.99'} color={frame >= t599 ? C.red : C.ink} flash={ramp(frame, t599, 4) * (1 - ramp(frame, t599 + 8, 10))} />
        </G>
        <G x={1080} y={300} s={pop(frame, fps, t100, 9) * 0.8} r={-8}><Stamp text="+$100" color={C.red} /></G>
        {/* distance ring around the store */}
        <circle cx={1240} cy={FLOOR - 200} r={420 * ramp(frame, tNext, 18)} fill={C.red} opacity={0.08} stroke={C.red} strokeWidth={4} strokeDasharray="14 12" />
        <Sam seed={30} start={{mouth: 'smile'}} keys={[{f: t599, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: t599 + 3, kind: '!'}]} />
      </Stage>
      <Sfx name="error" at={t599} volume={0.35} />
      <Sfx name="thud" at={t100} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s26 — Ten random products: the same list was $262 cheaper in the parking lot than in the store. */
export const S26: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTen = at('ten random');
  const t262 = at('two hundred');
  const tLot = at('cheaper in the parking lot');
  const col = (x: number, label: string, color: string, t0: number) => (
    <g>
      <rect x={x - 230} y={250} width={460} height={560} rx={22} fill={C.white} {...ink} />
      <rect x={x - 230} y={250} width={460} height={84} rx={22} fill={color} {...ink} />
      <text x={x} y={307} textAnchor="middle" fontFamily={DISPLAY} fontSize={36} fill={C.ink}>{label}</text>
      {Array.from({length: 10}).map((_, i) => (
        <rect key={i} x={x - 190 + (i % 5) * 78} y={370 + Math.floor(i / 5) * 90} width={60} height={60} rx={10} fill={[C.cyan, C.yellow, C.magenta, C.green, C.soft][i % 5]} stroke={C.ink} strokeWidth={4} opacity={ramp(frame, t0 + i * 1.5, 6)} />
      ))}
    </g>
  );
  return (
    <AbsoluteFill>
      <Stage>
        {col(760, 'PARKING LOT', C.green, tTen)}
        {col(1300, 'IN THE STORE', C.red, tTen + 6)}
        <G x={760} y={700} s={pop(frame, fps, tLot, 10) * 0.85} r={-6}><Stamp text="-$262" color={C.green} /></G>
        <SLabel text="SAME 10 ITEMS" x={1030} y={150} start={tTen} size={40} />
        <Sam seed={31} start={{mouth: 'flat'}} keys={[{f: t262, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tTen} volume={0.3} />
      <Sfx name="cash" at={tLot} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s27 — Target: inside a store the app shows the store price; outside, the online price. */
export const S27: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tExp = at("target's explanation");
  const tIn = at('inside a store');
  const tOut = at('outside');
  return (
    <AbsoluteFill>
      <Headline text="Target's explanation" start={tExp} y={TOP} size={76} stagger={2} />
      <Stage>
        <G x={700} y={580} s={pop(frame, fps, tIn - 4, 12) * 0.62}><Phone><text y={-60} textAnchor="middle" fontFamily={DISPLAY} fontSize={50} fill={C.ink}>INSIDE</text><text y={30} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={44} fill={C.red}>store price</text></Phone></G>
        <G x={1180} y={580} s={pop(frame, fps, tOut - 4, 12) * 0.62}><Phone><text y={-60} textAnchor="middle" fontFamily={DISPLAY} fontSize={50} fill={C.ink}>OUTSIDE</text><text y={30} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={44} fill={C.green}>online price</text></Phone></G>
        <Gerald seed={32} start={{mouth: 'smile', ...REST}} keys={[{f: tIn, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <SLabel text="TARGET SAYS" x={P.right} y={headTop() - 60} start={tExp} size={26} color={C.grey} />
        <Sam seed={33} start={{mouth: 'flat', brows: 'oneUp'}} />
      </Stage>
      <Sfx name="pop" at={tIn} volume={0.28} />
      <Sfx name="pop" at={tOut} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s28 — And it said it would match any lower price a customer found. */
export const S28: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMatch = at('match');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={960} y={520} s={pop(frame, fps, tMatch - 4, 10) * 1.1} r={-6}><Stamp text="PRICE MATCH" color={C.green} /></G>
        <SLabel text="if you find a lower price" x={960} y={640} start={tMatch + 4} size={40} />
        <Gerald seed={32} start={{mouth: 'smile', ...SHRUG}} />
        <Sam seed={33} start={{mouth: 'smile', brows: 'raised'}} />
      </Stage>
      <Sfx name="ding" at={tMatch} volume={0.3} />
    </AbsoluteFill>
  );
};

/* Store aisle shelving. */
const Shelves: React.FC<{x: number}> = ({x}) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-360} y={330} width={720} height={FLOOR - 330} fill={C.paperDark} {...ink} />
    {[480, 640, 800].map((y) => (
      <rect key={y} x={-360} y={y} width={720} height={18} fill="#B07A3E" {...ink} strokeWidth={4} />
    ))}
    {Array.from({length: 12}).map((_, i) => (
      <rect key={i} x={-330 + (i % 6) * 112} y={(i < 6 ? 400 : 560)} width={80} height={80} rx={6} fill={[C.cyan, C.magenta, C.yellow][i % 3]} stroke={C.ink} strokeWidth={4} />
    ))}
  </g>
);

/* s29 — Which is fair. But in the aisle, holding the thing you came for, the price goes up. */
export const S29: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFair = at('which is fair');
  const tAisle = at('standing in the aisle');
  const tUp = at('price goes up');
  const box = (
    <g transform="translate(0 -60) scale(0.38)">
      <rect x={-200} y={-140} width={400} height={260} rx={10} fill={C.paperDark} {...ink} />
      <FlatTV s={0.6} y={60} />
    </g>
  );
  return (
    <AbsoluteFill>
      <Stage>
        <Shelves x={1150} />
        <Sam x={760} seed={34} rHand={frame >= tAisle - 6 ? box : undefined} start={{mouth: 'smile'}}
          keys={[{f: tAisle - 6, p: {rShoulder: -40, rElbow: -90, lShoulder: 40, lElbow: 90, mouth: 'grin'}, d: 8}, {f: tUp, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
        <G x={1160} y={300} s={pop(frame, fps, tUp, 10)}>
          <rect x={-130} y={-60} width={260} height={120} rx={12} fill={C.white} {...ink} />
          <text y={22} textAnchor="middle" fontFamily={DISPLAY} fontSize={60} fill={C.red}>$599.99</text>
        </G>
        <Arrow x1={1340} y1={380} x2={1340} y2={220} t={ramp(frame, tUp + 4, 10)} color={C.red} w={14} />
        <G x={480} y={300} s={pop(frame, fps, tFair, 10) * 0.65} r={-6}><Stamp text="FAIR..." color={C.grey} /></G>
      </Stage>
      <Sfx name="error" at={tUp} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s30 — A University of Minnesota business professor: an algorithm charging more to shoppers close to the store. */
export const S30: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tProf = at('business professor');
  const tAlgo = at('algorithm');
  const tClose = at('already close');
  const rings = [360, 250, 140];
  return (
    <AbsoluteFill>
      <Stage>
        <G x={960} y={560} s={pop(frame, fps, tAlgo - 4, 12)}>
          {rings.map((r, i) => (
            <circle key={r} r={r} fill={[C.green, C.yellow, C.red][i]} opacity={0.18 + 0.12 * i * ramp(frame, tClose, 12)} stroke={C.ink} strokeWidth={4} strokeDasharray="10 10" />
          ))}
          <G x={0} y={60} s={0.3}><StoreFront name="STORE" color={C.red} /></G>
          {rings.map((r, i) => (
            <text key={r} x={0} y={-r + 44} textAnchor="middle" fontFamily={DISPLAY} fontSize={34} fill={C.ink} opacity={ramp(frame, tClose + i * 4, 6)}>{['$', '$$', '$$$'][i]}</text>
          ))}
        </G>
        <Actor who="professor" x={P.right} y={FLOOR} s={0.62} flip seed={35} enter={tProf - 4} start={{lookX: 1, mouth: 'smile'}}
          keys={[{f: tAlgo, p: {...POINT, mouth: 'open', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <SLabel text="U. OF MINNESOTA PROFESSOR" x={P.right - 60} y={headTop() - 60} start={tProf} size={24} />
        <Sam seed={36} start={{mouth: 'flat'}} keys={[{f: tClose, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tAlgo} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s31 — Once you're in the store, you're not driving home to save a few bucks. */
export const S31: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tIn = at('standing in the store');
  const tDrive = at('driving home');
  const tBucks = at('few bucks');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={560} y={FLOOR} s={0.62}><StoreFront name="STORE" color={C.red} /></G>
        <path d="M820,820 Q1150,600 1520,760" fill="none" stroke={C.ink} strokeWidth={6} strokeDasharray="4 20" strokeLinecap="round" opacity={ramp(frame, tDrive, 10)} />
        <G x={1600} y={FLOOR} s={pop(frame, fps, tDrive, 12) * 0.5}>
          <path d="M-160,-200 L0,-330 L160,-200 Z" fill={C.red} {...ink} />
          <rect x={-130} y={-200} width={260} height={200} fill={C.white} {...ink} />
          <rect x={-35} y={-110} width={70} height={110} fill={C.cyan} {...ink} />
        </G>
        <SLabel text="HOME · 20 MIN AWAY" x={1600} y={560} start={tDrive} size={30} />
        <G x={1180} y={560} s={pop(frame, fps, tBucks, 10) * 0.7} r={-8}><Tag text="SAVE $5?" color={C.yellow} w={tagW('SAVE $5?')} /></G>
        <Sam x={900} flip={false} seed={37} start={{mouth: 'flat'}} keys={[{f: tIn, p: {mouth: 'flat', brows: 'oneUp'}, d: 6}, {f: tBucks, p: {...SHRUG, mouth: 'smirk'}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tBucks} volume={0.28} />
    </AbsoluteFill>
  );
};

/* Subscribe button with a cursor click (mid-video and end card). */
export const SubscribeClick: React.FC<{x: number; y: number; t0: number; s?: number}> = ({x, y, t0, s = 1}) => {
  const {frame, fps} = useBeat();
  const press = frame >= t0 + 10 && frame < t0 + 18;
  const done = frame >= t0 + 14;
  return (
    <g>
      <G x={x} y={y} s={pop(frame, fps, t0 - 6, 11) * s}>
        <Button text={done ? 'SUBSCRIBED' : 'SUBSCRIBE'} color={done ? C.grey : C.red} w={330} press={press ? 1 : 0} />
      </G>
      <G x={lerp(frame, [t0, t0 + 10], [x + 260 * s, x + 50 * s])} y={lerp(frame, [t0, t0 + 10], [y + 200 * s, y + 20 * s])} s={0.8 * s} o={ramp(frame, t0, 4)}>
        <Cursor press={press} />
      </G>
    </g>
  );
};

/* s32 — If you thought about checking which apps know where you are: good instinct. Subscribe. */
export const S32: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCheck = at('checking which');
  const tGood = at('good instinct');
  const tSub = at('subscribe');
  const apps: [string, number][] = [
    ['Shopping', tCheck + 6],
    ['Rides', tCheck + 14],
    ['Groceries', tCheck + 22],
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <G x={900} y={560} s={pop(frame, fps, tCheck - 4, 12) * 0.85}>
          <Phone>
            <text y={-230} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink}>Location access</text>
            {apps.map(([a, t], i) => (
              <g key={a}>
                <text x={-120} y={-130 + i * 110} fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink}>{a}</text>
                <Toggle x={80} y={-140 + i * 110} on={1 - ramp(frame, t, 6)} s={0.7} />
              </g>
            ))}
          </Phone>
        </G>
        <G x={1300} y={360} s={pop(frame, fps, tGood, 10) * 0.75} r={6}><Stamp text="GOOD INSTINCT" color={C.green} /></G>
        <SubscribeClick x={1450} y={820} t0={tSub} s={0.9} />
        <Sam seed={38} start={{mouth: 'smile', rShoulder: -55, rElbow: -70}} keys={[{f: tGood, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="ding" at={tGood} volume={0.3} />
      <Sfx name="click" at={tSub + 10} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s33 — That's where you are. But what about who you are? */
export const S33: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWhere = at("that's where you are");
  const tWho = at('who you are');
  return (
    <AbsoluteFill>
      <Headline text="Not where you are. *Who you are.*" start={tWho - 4} y={TOP} size={80} stagger={2} hl={C.magenta} />
      <Stage>
        <G x={760} y={540} s={pop(frame, fps, tWhere, 11) * (1 - 0.3 * ramp(frame, tWho, 8))}><Badge2 icon="pin" color={C.red} /></G>
        <Arrow x1={880} y1={540} x2={1060} y2={540} t={ramp(frame, tWho - 2, 8)} w={12} />
        <G x={1200} y={540} s={pop(frame, fps, tWho, 11) * 1.2}><Badge2 icon="kid" color={C.magenta} /></G>
        <Sam seed={39} start={{mouth: 'flat'}} emotes={[{f: tWho + 4, kind: '?'}]} />
      </Stage>
      <Sfx name="pop" at={tWho} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s34 — 2012: the Wall Street Journal found Orbitz had noticed something about its customers. */
export const S34: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t12 = at('2012');
  const tWsj = at('wall street journal');
  const tOrb = at('orbitz');
  const tNot = at('noticed something');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={600} y={540} s={pop(frame, fps, tWsj - 4, 12) * 0.95} r={-4}>
          <rect x={-230} y={-280} width={460} height={560} fill={C.white} {...ink} />
          <text y={-210} textAnchor="middle" fontFamily={DISPLAY} fontSize={34} fill={C.ink}>THE NEWSPAPER</text>
          <line x1={-200} y1={-185} x2={200} y2={-185} stroke={C.ink} strokeWidth={4} />
          <text y={-130} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.ink}>Mac users</text>
          <text y={-80} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.ink}>see pricier</text>
          <text y={-30} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.ink}>hotels</text>
          {Array.from({length: 7}).map((_, i) => (
            <rect key={i} x={-200} y={20 + i * 34} width={i % 3 === 2 ? 260 : 400} height={12} rx={6} fill={C.soft} />
          ))}
        </G>
        <SLabel text="2012" x={600} y={180} start={t12} size={44} />
        <G x={1200} y={560} s={pop(frame, fps, tOrb - 4, 12) * 0.7}>
          <Browser url="orbitz.com" w={780} h={420}>
            <HotelRow y={-90} name="Hotel" price="$" stars={3} />
            <HotelRow y={0} name="Hotel" price="$$" stars={4} />
            <HotelRow y={90} name="Hotel" price="$$$" stars={5} fancy />
          </Browser>
        </G>
        <G x={1500} y={330} s={pop(frame, fps, tNot, 10) * 0.75}><Badge2 icon="eye" color={C.yellow} /></G>
        <SourceTag text="SOURCE: THE WALL STREET JOURNAL" start={tWsj} />
      </Stage>
      <Sfx name="pop" at={tOrb} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s35 — People booking on a Mac spent $20-30 more per night on hotels. */
export const S35: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMac = at('on a mac');
  const t2030 = at('twenty to thirty');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={760} y={700} s={pop(frame, fps, 0, 12) * 1.1}><LaptopLid label="WINDOWS" color="#C9D4E6" /></G>
        <G x={1260} y={700} s={pop(frame, fps, tMac, 12) * 1.1}><LaptopLid label="MAC" /></G>
        <G x={1260} y={360} s={pop(frame, fps, t2030, 10) * 0.85} r={-6}><Tag text="+$20-30/NIGHT" color={C.magenta} w={tagW('+$20-30/NIGHT')} /></G>
        <Sam x={P.right} flip seed={40} start={{mouth: 'flat'}} keys={[{f: t2030, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="cash" at={t2030} volume={0.35} />
    </AbsoluteFill>
  );
};

const HOTELS: [string, string, number, boolean][] = [
  ['Budget Inn', '$89', 3, false],
  ['City Stay', '$119', 3, false],
  ['The Grand', '$389', 5, true],
  ['Royal Suites', '$420', 5, true],
];

/* s36 — So Orbitz started showing Mac users the more expensive hotels first. */
export const S36: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFirst = at('more expensive hotels first');
  const sort = ramp(frame, tFirst - 4, 14);
  // fancy rows slide to the top
  const order = [2, 3, 0, 1];
  return (
    <AbsoluteFill>
      <Headline text="Mac users: *fancy hotels first*" start={tFirst - 6} y={TOP} size={76} stagger={2} hl={C.magenta} />
      <Stage>
        <G x={980} y={600} s={pop(frame, fps, 0, 12) * 0.95}>
          <Browser url="orbitz.com · on a MAC" w={880} h={520}>
            {HOTELS.map(([n, p, st, f], i) => (
              <HotelRow key={n} y={-170 + lerp(sort, [0, 1], [i, order.indexOf(i)]) * 100} name={n} price={p} stars={st} fancy={f} />
            ))}
          </Browser>
        </G>
        <Gerald seed={41} start={{mouth: 'smirk'}} keys={[{f: tFirst, p: {...POINT, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="whoosh" at={tFirst} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s37 — The prices themselves didn't change. The order did. */
export const S37: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPrices = at("prices themselves didn't change");
  const tOrder = at('the order did');
  return (
    <AbsoluteFill>
      <Stage>
        {[0, 1].map((k) => (
          <G key={k} x={640 + k * 640} y={520} s={0.62}>
            <Browser url={k ? 'on a MAC' : 'on WINDOWS'} w={880} h={520}>
              {(k ? [2, 3, 0, 1] : [0, 1, 2, 3]).map((h, i) => (
                <HotelRow key={h} y={-170 + i * 100} name={HOTELS[h][0]} price={HOTELS[h][1]} stars={HOTELS[h][2]} fancy={HOTELS[h][3]} />
              ))}
            </Browser>
          </G>
        ))}
        <SLabel text="SAME PRICES" x={960} y={760} start={tPrices} size={44} color={C.green} />
        <SLabel text="DIFFERENT ORDER" x={960} y={830} start={tOrder} size={44} color={C.red} />
      </Stage>
      <Sfx name="ding" at={tPrices + 4} volume={0.25} />
      <Sfx name="error" at={tOrder} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s38 — Mac and Windows users could book the same room; the Mac user just scrolled past fancier hotels. */
export const S38: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWin = at('windows user');
  const tSame = at('same room');
  const tScroll = at('scroll past');
  const scroll = ramp(frame, tScroll, 30);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={960} y={520} s={0.7}>
          <Browser url="orbitz.com · on a MAC" w={880} h={520}>
            <defs>
              <clipPath id="s38clip"><rect x={-440} y={-232} width={880} height={430} /></clipPath>
            </defs>
            <g clipPath="url(#s38clip)">
              {[2, 3, 0, 1].map((h, i) => (
                <HotelRow key={h} y={-170 + i * 100 - scroll * 120} name={HOTELS[h][0]} price={HOTELS[h][1]} stars={HOTELS[h][2]} fancy={HOTELS[h][3]} />
              ))}
            </g>
          </Browser>
        </G>
        <G x={960} y={850} s={pop(frame, fps, tSame, 10) * 0.6}><Tag text="SAME ROOM, SAME $" color={C.green} w={tagW('SAME ROOM, SAME $')} /></G>
        <Sam x={P.left} seed={42} start={{mouth: 'flat', rShoulder: -55, rElbow: -70}} keys={[{f: tScroll, p: {mouth: 'flat', brows: 'oneUp'}, d: 6}]} />
        <SLabel text="MAC" x={P.left} y={headTop() - 60} start={0} size={30} />
        <Friend x={P.right} flip seed={43} enter={tWin - 4} start={{mouth: 'smile', rShoulder: -55, rElbow: -70}} />
        <SLabel text="WINDOWS" x={P.right} y={headTop() - 60} start={tWin} size={30} />
      </Stage>
      <Sfx name="whoosh" at={tScroll} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s39 — Same shop. Different shop window. Chosen by the logo on your laptop. */
export const S39: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tShop = at('same shop');
  const tWin = at('different shop window');
  const tLogo = at('logo on your laptop');
  return (
    <AbsoluteFill>
      <Headline text="Same shop. *Different window.*" start={tShop} y={TOP} size={78} stagger={3} hl={C.yellow} />
      <Stage>
        <G x={700} y={760} s={pop(frame, fps, tShop, 12) * 0.9}><Shop label="HOTELS" color={C.cyan} /></G>
        <G x={1240} y={760} s={pop(frame, fps, tWin, 12) * 0.9}><Shop label="HOTELS" color={C.magenta} sign="LUXURY" signT={pop(frame, fps, tWin + 4, 10)} /></G>
        <G x={700} y={940} s={pop(frame, fps, tLogo, 11) * 0.4}><LaptopLid label="WINDOWS" color="#C9D4E6" /></G>
        <G x={1240} y={940} s={pop(frame, fps, tLogo + 3, 11) * 0.4}><LaptopLid label="MAC" /></G>
      </Stage>
      <Sfx name="pop" at={tWin} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s40 — Give that idea fourteen more years of data. One FTC scenario goes like this. */
export const S40: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t14 = at('fourteen more years');
  const tFtc = at("ftc's study");
  const year = Math.round(lerp(frame, [t14, t14 + 30], [2012, 2026]));
  return (
    <AbsoluteFill>
      <Stage>
        <text x={760} y={600} textAnchor="middle" fontFamily={DISPLAY} fontSize={200} fill={C.ink} opacity={ramp(frame, t14 - 6, 6)}>{year}</text>
        <SLabel text="+14 YEARS OF DATA" x={760} y={640} start={t14 + 20} size={40} color={C.magenta} />
        <G x={1320} y={560} s={pop(frame, fps, tFtc - 4, 12) * 0.8} r={4} shadow><Contract title="FTC: A SCENARIO" sign={1} /></G>
        <SourceTag text="SOURCE: US FEDERAL TRADE COMMISSION" start={tFtc} />
        <Gerald seed={44} start={{mouth: 'grin', brows: 'smug'}} />
      </Stage>
      <Sfx name="whoosh" at={t14} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s41 — A store figures out you're a new parent; recent searches suggest your baby is sick. */
export const S41: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tParent = at('new parent');
  const tSearch = at('recent searches');
  const tSick = at('baby is sick');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={700} y={500} s={pop(frame, fps, tParent - 6, 12) * 0.9}><Badge2 icon="cart" color={C.yellow} label="WHAT YOU BUY" labelSize={30} /></G>
        <G x={700} y={760} s={pop(frame, fps, tParent, 10) * 0.7} r={-6}><Tag text="NEW PARENT" color={C.cyan} w={tagW('NEW PARENT')} /></G>
        <G x={1260} y={460} s={pop(frame, fps, tSearch - 4, 12)}>
          <rect x={-300} y={-50} width={600} height={100} rx={50} fill={C.white} {...ink} />
          <text x={-250} y={14} fontFamily={BODY} fontWeight={800} fontSize={36} fill={C.ink}>
            {'baby fever at night'.slice(0, Math.max(0, Math.floor((frame - tSearch) / 1.5)))}
          </text>
        </G>
        <G x={1260} y={680} s={pop(frame, fps, tSick, 10)}><Badge2 icon="baby" color={C.red} label="BABY IS SICK?" labelSize={30} /></G>
        <Gerald seed={45} start={{mouth: 'smirk'}} keys={[{f: tSick, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tParent} volume={0.28} />
      <Sfx name="pop" at={tSick} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s42 — So it shows you a baby thermometer, fast delivery, at a premium price. */
export const S42: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTherm = at('baby thermometer');
  const tFast = at('fast delivery');
  const tPrem = at('premium price');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={980} y={570} s={pop(frame, fps, tTherm - 6, 12) * 0.95}>
          <Phone>
            <text y={-240} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill={C.grey}>JUST FOR YOU</text>
            <G x={0} y={-20} s={0.9}><Thermometer /></G>
            <rect x={-120} y={20} width={240} height={50} rx={25} fill={C.green} opacity={ramp(frame, tFast, 6)} />
            <text y={54} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={26} fill={C.white} opacity={ramp(frame, tFast, 6)}>FAST DELIVERY</text>
            <text y={150} textAnchor="middle" fontFamily={DISPLAY} fontSize={72} fill={C.red} opacity={ramp(frame, tPrem, 6)}>$$$</text>
          </Phone>
        </G>
        <G x={1320} y={360} s={pop(frame, fps, tPrem, 10) * 0.75} r={8}><Stamp text="PREMIUM" color={C.red} /></G>
        <Gerald seed={46} start={{mouth: 'grin', brows: 'smug'}} />
      </Stage>
      <Sfx name="cash" at={tPrem} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s43 — It's late, you're exhausted, your kid has a fever. You are not comparing prices. */
export const S43: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLate = at("it's late");
  const tTired = at('exhausted');
  const tFever = at('fever');
  const tNot = at('not comparing');
  return (
    <AbsoluteFill style={{background: `rgba(28,31,58,${0.12 * ramp(frame, tLate, 10)})`}}>
      <Stage>
        <G x={1500} y={300} s={pop(frame, fps, tLate, 12)}><Moon /></G>
        <G x={1180} y={360} s={pop(frame, fps, tLate + 4, 12) * 0.7}><Badge2 icon="clock" color={C.cyan} label="2:13 AM" labelSize={36} /></G>
        <G x={1380} y={780} s={pop(frame, fps, tFever, 11) * 0.8}><Badge2 icon="baby" color={C.red} label="FEVER" labelSize={32} /></G>
        <G x={1000} y={560} s={pop(frame, fps, tNot, 9) * 0.6} r={-8}><Stamp text="NOT COMPARING PRICES" color={C.magenta} /></G>
        <Sam x={640} seed={47} start={{mouth: 'flat', brows: 'sad', rShoulder: -55, rElbow: -70}}
          keys={[{f: tTired, p: {mouth: 'frown', brows: 'sad', headTilt: 10, blink: 0.45}, d: 10}]} emotes={[{f: tTired + 6, kind: 'zzz'}]} />
      </Stage>
      <Sfx name="thud" at={tNot} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s44 — The data gets personal: Business Insider dug into patents filed by Uber. */
export const S44: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPers = at('very personal');
  const tBi = at('business insider');
  const tPat = at('patents filed');
  return (
    <AbsoluteFill>
      <Headline text="It gets *very personal*" start={tPers - 4} y={TOP} size={80} hl={C.magenta} />
      <Stage>
        {[0, 1].map((i) => (
          <G key={i} x={840 + i * 340} y={580} s={pop(frame, fps, tPat + i * 5, 12) * 0.75} r={-6 + i * 10} shadow>
            <Contract title={`PATENT #${i + 1}`} sign={1} />
          </G>
        ))}
        <Gerald seed={48} start={{mouth: 'smirk', ...CROSS}} />
        <Sam seed={49} start={{mouth: 'flat'}} keys={[{f: tPat, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
        <SourceTag text="SOURCE: BUSINESS INSIDER" start={tBi} />
      </Stage>
      <Sfx name="pop" at={tPat} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s45 — One tracks how fast you type, the angle you hold your phone, how fast you walk. */
export const S45: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number, number, number][] = [
    ['type', 'HOW FAST YOU TYPE', C.cyan, at('how fast you type'), 1120, 330],
    ['device', 'PHONE ANGLE', C.yellow, at('angle you hold'), 1360, 560],
    ['walk', 'HOW FAST YOU WALK', C.green, at('how fast you walk'), 1120, 790],
  ];
  const tilt = 20 * ramp(frame, items[1][3], 10);
  return (
    <AbsoluteFill>
      <Stage>
        {items.map(([icon, label, color, t, x, y]) => (
          <g key={label}>
            <G x={x} y={y} s={pop(frame, fps, t, 11) * 0.7}><Badge2 icon={icon} color={color} label={label} labelSize={34} /></G>
          </g>
        ))}
        <Sam x={680} s={0.8} flip={false} seed={50} start={{mouth: 'flat', rShoulder: -55, rElbow: -70}}
          rHand={<g transform={`rotate(${tilt})`}><g transform="translate(0 -70) scale(0.3)"><Phone /></g></g>}
          keys={[{f: items[2][3], p: {x: 30}, d: 30}]} />
      </Stage>
      {items.map(([, label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.28} />
      ))}
    </AbsoluteFill>
  );
};

/* s46 — Another: stopping near a daycare or school before work can flag a single working parent. */
export const S46: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tStop = at('daycare or school');
  const tOffice = at('going to an office');
  const tSingle = at('single working parent');
  const route = 'M520,820 C700,820 760,520 960,520 C1160,520 1180,360 1420,340';
  return (
    <AbsoluteFill>
      <Stage>
        <path d={route} fill="none" stroke={C.cyan} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(frame, tStop - 10, 40)} />
        <G x={520} y={820} s={0.55}><Badge2 icon="pin" color={C.green} label="HOME" labelSize={36} /></G>
        <G x={960} y={520} s={pop(frame, fps, tStop, 11) * 0.6}><Badge2 icon="school" color={C.yellow} label="SCHOOL STOP" labelSize={34} /></G>
        <G x={1420} y={340} s={pop(frame, fps, tOffice, 11) * 0.6}><Badge2 icon="device" color={C.cyan} label="OFFICE" labelSize={34} /></G>
        <G x={1080} y={820} s={pop(frame, fps, tSingle, 9) * 0.6} r={-6}><Stamp text="SINGLE WORKING PARENT" color={C.magenta} /></G>
        <Gerald seed={51} start={{mouth: 'smirk'}} keys={[{f: tSingle, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tStop} volume={0.28} />
      <Sfx name="thud" at={tSingle} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s47 — Uber says those patents aren't in use, and neither is about pricing. */
export const S47: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tUse = at("patents aren't in use");
  const tNeither = at('neither one');
  return (
    <AbsoluteFill>
      <Stage>
        {[0, 1].map((i) => (
          <G key={i} x={840 + i * 340} y={580} s={0.75} r={-6 + i * 10}><Contract title={`PATENT #${i + 1}`} sign={1} /></G>
        ))}
        <G x={1010} y={560} s={pop(frame, fps, tUse, 9) * 0.75} r={-8}><Stamp text="NOT IN USE" color={C.grey} /></G>
        <G x={1010} y={840} s={pop(frame, fps, tNeither, 9) * 0.6} r={4}><Stamp text="NOT ABOUT PRICING" color={C.grey} /></G>
        <SLabel text="UBER SAYS" x={P.right} y={headTop() - 60} start={0} size={26} color={C.grey} />
        <Gerald seed={52} start={{mouth: 'smile', ...SHRUG}} />
      </Stage>
      <Sfx name="thud" at={tUse} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s48 — But they show how much a phone gives away without you typing a single word. */
export const S48: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tGive = at('give away');
  const tType = at('without you typing');
  const icons: [Icon2, string][] = [['pin', C.red], ['walk', C.green], ['device', C.cyan], ['clock', C.yellow], ['school', C.magenta], ['cart', C.yellow]];
  return (
    <AbsoluteFill>
      <Headline text="Without typing *a single word*" start={tType} y={TOP} size={76} stagger={2} />
      <Stage>
        <G x={960} y={600} s={0.6}><Phone /></G>
        {icons.map(([ic, c], i) => {
          const a = (i / icons.length) * Math.PI * 2 - Math.PI / 2;
          const t = ramp(frame, tGive + i * 3, 16);
          return (
            <G key={ic + i} x={960 + Math.cos(a) * 340 * t} y={600 + Math.sin(a) * 260 * t} s={0.5 * Math.min(1, t * 2)}>
              <Badge2 icon={ic} color={c} />
            </G>
          );
        })}
        <G x={960} y={880} s={pop(frame, fps, tType, 10) * 0.55}>
          <Badge2 icon="type" color={C.white} />
          <line x1={-90} y1={-90} x2={90} y2={90} stroke={C.red} strokeWidth={16} strokeLinecap="round" />
        </G>
        <Sam seed={53} start={{mouth: 'flat'}} keys={[{f: tGive, p: {...SHOCK}, d: 6, ease: 'out'}]} />
      </Stage>
      <Sfx name="whoosh" at={tGive} volume={0.3} />
    </AbsoluteFill>
  );
};
