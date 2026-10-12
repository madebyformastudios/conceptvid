import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {Magnifier} from '../../../characters/Props';
import {TOP, FLOOR} from '../../../components/layout';
import {Phone, Bubble, Contract, Capitol, Courthouse, TV, HeldPhone, Badge} from '../../concert-fees/kit';
import {RideQuote, Couch, Car, Stall, Handbag, HeldCamera, Badge2, FlatTV, StoreFront, ParkingLines, Icon2} from '../kit';
import {Sam, Gerald, Friend, SourceTag, SLabel, tagW, headTop, P, SHOCK, POINT, SHRUG, RAISE, HIPS, REST, CROSS} from './common';

const HOLD_PHONE = {rShoulder: -55, rElbow: -70};
const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};

/* s01 — You and your friend, same couch, same app, same ride; you both hit request. */
export const S01: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCouch = at('same couch');
  const tApp = at('same app');
  const tRide = at('same ride');
  const tReq = at('hit request');
  const press = (f: number) => [
    {f, p: {rElbow: -84, squash: 0.97}, d: 3, ease: 'snap' as const},
    {f: f + 4, p: {rElbow: -70, squash: 1}, d: 5},
  ];
  return (
    <AbsoluteFill>
      <Headline text="Same couch. Same app. Same ride." start={tCouch} y={TOP} size={76} stagger={Math.max(3, Math.round((tRide - tCouch) / 4))} hl={C.cyan} />
      <Stage>
        <G x={960} y={FLOOR} s={pop(frame, fps, 0, 14) * 1.05}><Couch /></G>
        <Friend x={790} seed={1} start={{mouth: 'smile', ...HOLD_PHONE}} rHand={frame >= tApp ? <HeldPhone><RideQuote price="" /></HeldPhone> : undefined} keys={press(tReq)} />
        <Sam x={1130} flip={false} seed={2} start={{mouth: 'smile', ...HOLD_PHONE}} rHand={frame >= tApp ? <HeldPhone><RideQuote price="" /></HeldPhone> : undefined} keys={press(tReq)} />
      </Stage>
      <Sfx name="pop" at={tApp} volume={0.3} />
      <Sfx name="click" at={tReq} volume={0.45} />
      <Sfx name="click" at={tReq + 2} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s02 — Your friend gets $54.95. You get $66.27. */
export const S02: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tF = at('your friend gets');
  const tF2 = at('fifty-four');
  const tY = at('you get');
  const tY2 = at('sixty-six');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={760} y={540} s={pop(frame, fps, tF - 4, 13) * 0.95}><Phone><RideQuote price="$54.95" color={C.green} t={ramp(frame, tF2, 6)} note="FRIEND'S PHONE" /></Phone></G>
        <G x={1180} y={540} s={pop(frame, fps, tY - 4, 13) * 0.95}><Phone><RideQuote price="$66.27" color={C.red} t={ramp(frame, tY2, 6)} note="YOUR PHONE" /></Phone></G>
        <Friend x={P.left} seed={1} start={{mouth: 'smile'}} keys={[{f: tF2, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
        <Sam x={P.right} flip seed={2} start={{mouth: 'smile'}} keys={[{f: tY2, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tY2 + 3, kind: '!'}]} />
      </Stage>
      <Sfx name="ding" at={tF2} volume={0.3} />
      <Sfx name="error" at={tY2} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s03 — Same car, same street, same moment: eleven dollars apart. */
export const S03: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const cues: [string, string, number][] = [
    ['SAME CAR', C.cyan, at('same car')],
    ['SAME STREET', C.yellow, at('same street')],
    ['SAME MOMENT', C.green, at('same moment')],
  ];
  const t11 = at('eleven');
  const drive = lerp(frame, [0, cues[2][2]], [-80, 0]);
  return (
    <AbsoluteFill>
      <Stage>
        {cues.map(([t, c, f], i) => (
          <G key={t} x={520 + i * 440} y={300} s={pop(frame, fps, f, 11) * 0.8} r={-4 + i * 4}><Tag text={t} color={c} w={tagW(t)} /></G>
        ))}
        <G x={960 + drive} y={FLOOR} s={pop(frame, fps, cues[0][2] - 4, 13) * 1.15}><Car color={C.ink} label="RIDE" /></G>
        <G x={960} y={560} s={pop(frame, fps, t11, 9)} r={-6}><Stamp text="$11 APART" color={C.red} /></G>
        <Friend x={P.left} seed={1} start={{mouth: 'smile'}} />
        <Sam x={P.right} flip seed={2} start={{mouth: 'frown', brows: 'angry', ...HIPS}} />
      </Stage>
      {cues.map(([t, , f]) => (
        <Sfx key={t} name="pop" at={f} volume={0.25} />
      ))}
      <Sfx name="thud" at={t11} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s04 — Not made up: Business Insider had 11 coworkers request the same Uber at the same time. */
export const S04: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBi = at('business insider');
  const tEleven = at('eleven coworkers');
  const tBack = at("that's what came back");
  const widths = [0.62, 0.8, 0.7, 0.95, 0.66, 0.88, 0.74, 0.9, 0.6, 0.83, 0.72];
  return (
    <AbsoluteFill>
      <Headline text="11 coworkers. *11 prices.*" start={tEleven} y={TOP} size={80} hl={C.magenta} />
      <Stage>
        {widths.map((w, i) => (
          <G key={i} x={330 + (i % 6) * 250 + (i >= 6 ? 125 : 0)} y={460 + Math.floor(i / 6) * 330} s={pop(frame, fps, tEleven + i * 2, 12) * 0.36}>
            <Phone>
              <circle cy={-150} r={60} fill={C.paperDark} stroke={C.ink} strokeWidth={6} />
              <text y={20} textAnchor="middle" fontFamily={DISPLAY} fontSize={70} fill={C.ink}>$</text>
              <rect x={-110} y={80} width={220} height={40} rx={20} fill={C.paperDark} />
              <rect x={-110} y={80} width={220 * w * ramp(frame, tBack, 12)} height={40} rx={20} fill={w > 0.85 ? C.red : w < 0.65 ? C.green : C.yellow} />
            </Phone>
          </G>
        ))}
        <SourceTag text="SOURCE: BUSINESS INSIDER" start={tBi} />
      </Stage>
      {[0, 3, 6, 9].map((i) => (
        <Sfx key={i} name="pop" at={tEleven + i * 2} volume={0.22} />
      ))}
    </AbsoluteFill>
  );
};

/* s05 — One of them said what you're thinking: "What did I do wrong?" */
export const S05: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tQ = at('what did i do wrong');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1220} y={headTop(0.9) - 130} s={pop(frame, fps, tQ - 4, 11)}><Bubble text="What did I do wrong?" tail="left" size={48} /></G>
        <Sam x={900} s={0.9} flip={false} seed={3} start={{mouth: 'flat', brows: 'sad'}}
          keys={[{f: tQ, p: {...SHRUG, mouth: 'frown', brows: 'sad', headTilt: 6}, d: 8}]} emotes={[{f: tQ + 6, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="pop" at={tQ - 4} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s06 — Uber says it doesn't price on who you are; blamed slightly different pickup spots. */
export const S06: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSays = at('uber says');
  const tWho = at('who you are');
  const tPick = at('pickup spots');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1260} y={headTop() - 120} s={pop(frame, fps, tWho - 6, 11)}><Bubble text={'Not based on\nwho you are.'} tail="right" size={38} /></G>
        <SLabel text="UBER SAYS" x={1260} y={headTop() - 240} start={tSays} size={28} color={C.grey} />
        {/* two pickup pins a few metres apart */}
        <G x={620} y={600} s={pop(frame, fps, tPick - 6, 12)}>
          <rect x={-260} y={-190} width={520} height={380} rx={20} fill="#E3EEF2" {...ink} />
          <path d="M-260,40 L260,-20 M-60,-190 L20,190" stroke={C.white} strokeWidth={36} />
          <G x={-40} y={10} s={0.7}><Badge2 icon="pin" color={C.green} /></G>
          <G x={50} y={-20} s={0.7}><Badge2 icon="pin" color={C.red} /></G>
          <text y={160} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={24} fill={C.ink}>PICKUP SPOTS</text>
        </G>
        <Gerald seed={4} start={{mouth: 'smile', ...REST}} keys={[{f: tWho, p: {...SHRUG, mouth: 'smile', brows: 'raised'}, d: 8}, {f: tPick, p: {...POINT, mouth: 'smile'}, d: 8, ease: 'out'}]} />
        <Sam seed={5} start={{mouth: 'flat', brows: 'oneUp'}} />
      </Stage>
      <Sfx name="pop" at={tWho - 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s07 — The idea that the price on your screen is built just for you is everywhere. */
export const S07: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tScreen = at('price on your screen');
  const tYou = at('just for you');
  return (
    <AbsoluteFill>
      <Headline text="A price built *just for you?*" start={tYou - 6} y={TOP} size={80} hl={C.magenta} stagger={2} />
      <Stage>
        <G x={1000} y={570} s={pop(frame, fps, tScreen - 4, 13) * 0.95}>
          <Phone>
            <text y={-60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={36} fill={C.ink}>Your price</text>
            <text y={40} textAnchor="middle" fontFamily={DISPLAY} fontSize={84} fill={C.magenta}>$??</text>
          </Phone>
        </G>
        <G x={1250} y={380} s={pop(frame, fps, tYou, 10) * 0.85} r={12}><Tag text="FOR: YOU" color={C.yellow} w={tagW('FOR: YOU')} /></G>
        <Sam seed={6} start={{mouth: 'flat'}} keys={[{f: tYou, p: {...POINT, mouth: 'o', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <Gerald seed={7} start={{mouth: 'smirk'}} />
      </Stage>
      <Sfx name="ding" at={tYou} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s08 — Walmart publicly denies building it; lawmakers are writing bans. */
export const S08: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWal = at('walmart');
  const tDeny = at('denying');
  const tLaw = at('lawmakers');
  const tBan = at('writing bans');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={560} y={FLOOR} s={pop(frame, fps, tWal - 4, 13) * 0.62}><StoreFront name="WALMART" color={C.cyan} /></G>
        <G x={560} y={560} s={pop(frame, fps, tDeny, 9) * 0.7} r={-8}><Stamp text="DENIED" color={C.red} /></G>
        <G x={1250} y={FLOOR} s={pop(frame, fps, tLaw - 4, 13) * 0.75}><Capitol /></G>
        <G x={1250} y={500} s={pop(frame, fps, tBan, 11) * 0.55} r={-5} shadow><Contract title="PRICING BAN" sign={ramp(frame, tBan + 6, 16)} /></G>
        <Actor who="senator" x={1640} y={FLOOR} s={0.62} flip seed={8} enter={tLaw} start={{lookX: 1, mouth: 'flat', brows: 'angry', ...POINT}} />
      </Stage>
      <Sfx name="thud" at={tDeny} volume={0.35} />
      <Sfx name="pop" at={tBan} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s09 — So is the internet quietly charging you more than your friend? */
export const S09: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tQuiet = at('quietly');
  const tMore = at('more than');
  return (
    <AbsoluteFill>
      <Headline text="Are you paying *more* than your friend?" start={at('so is')} y={TOP} size={70} stagger={2} hl={C.magenta} />
      <Stage>
        <G x={760} y={520} s={pop(frame, fps, tQuiet, 11) * 0.9} r={-6}><Tag text="$54.95" color={C.green} w={tagW('$54.95')} /></G>
        <G x={1160} y={520} s={pop(frame, fps, tMore, 11) * 1.1} r={6}><Tag text="$66.27" color={C.red} w={tagW('$66.27')} /></G>
        <Friend x={760} s={0.58} seed={1} start={{mouth: 'smile'}} />
        <Sam x={1160} s={0.58} flip seed={2} start={{mouth: 'flat', brows: 'oneUp'}} emotes={[{f: tMore + 4, kind: '?'}]} />
      </Stage>
    </AbsoluteFill>
  );
};

/* s10 — By the end: what your phone tells stores, the times companies got caught, three things to do. */
export const S10: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number][] = [
    ['device', 'What your phone tells stores', C.cyan, at('what your phone')],
    ['eye', 'The times they got caught', C.magenta, at('got caught')],
    ['dollar', '3 things to do before you buy', C.green, at('three things')],
  ];
  return (
    <AbsoluteFill>
      <Headline text="By the end of this video" start={at('by the end')} y={TOP} size={76} stagger={2} />
      <Stage>
        {items.map(([icon, label, color, t], i) => (
          <g key={label} transform={`translate(0 ${(1 - pop(frame, fps, t, 12)) * 30})`} opacity={ramp(frame, t, 6)}>
            <rect x={600} y={310 + i * 170} width={1000} height={130} rx={20} fill={C.white} {...ink} />
            <G x={680} y={375 + i * 170} s={0.55}><Badge2 icon={icon} color={color} /></G>
            <text x={760} y={392 + i * 170} fontFamily={BODY} fontWeight={800} fontSize={46} fill={C.ink}>{label}</text>
          </g>
        ))}
        <Sam seed={9} start={{mouth: 'smile'}} keys={[{f: items[0][3], p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      {items.map(([, label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.3} />
      ))}
    </AbsoluteFill>
  );
};

/* s11 — Charging different people different prices is old. Really old. */
export const S11: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tOld = at('really old');
  return (
    <AbsoluteFill>
      <Headline text="Different people, *different prices*" start={0} y={TOP} size={74} stagger={2} />
      <Stage>
        <G x={960} y={560} s={pop(frame, fps, 4, 13)} r={-3}>
          <rect x={-300} y={-170} width={600} height={340} rx={10} fill="#F6E7B8" {...ink} />
          <text y={-100} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill="#8A3A1F">PRICE LIST</text>
          {[['Traveller', '20 coins'], ['Neighbour', '10 coins'], ['Friend', '8 coins']].map(([a, b], i) => (
            <g key={a}>
              <text x={-240} y={-20 + i * 60} fontFamily={BODY} fontWeight={800} fontSize={36} fill="#8A3A1F">{a}</text>
              <text x={240} y={-20 + i * 60} textAnchor="end" fontFamily={BODY} fontWeight={800} fontSize={36} fill="#8A3A1F">{b}</text>
            </g>
          ))}
        </G>
        <G x={1300} y={780} s={pop(frame, fps, tOld, 9) * 0.75} r={-10}><Stamp text="REALLY OLD" color={C.red} /></G>
        <Sam seed={10} start={{mouth: 'smile'}} keys={[{f: tOld, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tOld} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s12 — A market stall on holiday. You ask how much the bag is. */
export const S12: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tStall = at('market stall');
  const tHow = at('how much');
  return (
    <AbsoluteFill>
      <Stage>
        <Actor who="vendor" x={1220} y={FLOOR} s={0.62} flip seed={11} enter={tStall} start={{lookX: 1, mouth: 'smile'}} />
        <G x={1220} y={FLOOR} s={pop(frame, fps, tStall - 6, 14) * 0.9}><Stall color={C.red} /></G>
        <G x={1150} y={FLOOR - 200 * 0.9} s={0.6}><Handbag color={C.magenta} /></G>
        <G x={700} y={headTop() - 110} s={pop(frame, fps, tHow, 11)}><Bubble text="How much is the bag?" tail="left" size={36} /></G>
        <Sam x={520} flip={false} seed={12} lHand={<HeldCamera />} start={{mouth: 'smile', lShoulder: 30, lElbow: -60}}
          keys={[{f: tHow, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tHow} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s13 — He reads your sunburn, new sneakers and big camera. Then he names a price. */
export const S13: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLooks = at('looks at');
  const cues: [string, number, number, number][] = [
    // label, cue, target x, target y (on Sam at x=640, s=0.85)
    ['SUNBURN', at('sunburn'), 640, 480],
    ['NEW SNEAKERS', at('sneakers'), 660, 920],
    ['BIG CAMERA', at('big camera'), 560, 720],
  ];
  const tPrice = at('names a price');
  return (
    <AbsoluteFill>
      <Stage>
        {cues.map(([label, t, x, y], i) => (
          <g key={label} opacity={ramp(frame, t, 6)}>
            <Arrow x1={900} y1={360 + i * 170} x2={x + 70} y2={y} t={ramp(frame, t, 8)} color={C.red} w={7} />
            <text x={920} y={370 + i * 170} fontFamily={DISPLAY} fontSize={44} fill={C.red}>{label}</text>
          </g>
        ))}
        <ellipse cx={600} cy={455} rx={20} ry={11} fill={C.red} opacity={0.35 * ramp(frame, cues[0][1], 8)} />
        <ellipse cx={690} cy={455} rx={20} ry={11} fill={C.red} opacity={0.35 * ramp(frame, cues[0][1], 8)} />
        <Sam x={640} s={0.85} flip={false} seed={13} lHand={<HeldCamera />} start={{mouth: 'smile', lShoulder: 30, lElbow: -60}} />
        <Actor who="vendor" x={1700} y={FLOOR} s={0.7} flip seed={14} start={{lookX: 1, mouth: 'flat', brows: 'oneUp'}}
          keys={[{f: tLooks, p: {...{rShoulder: -40, rElbow: -100}, mouth: 'smirk', brows: 'smug'}, d: 8}, {f: tPrice, p: {mouth: 'grin', brows: 'smug'}, d: 6}]}
          rHand={<Magnifier r={30} />} />
        <G x={1500} y={headTop(0.7) - 70} s={pop(frame, fps, tPrice, 10) * 0.9} r={-8}><Tag text="$80" color={C.yellow} w={tagW('$80')} /></G>
      </Stage>
      {cues.map(([label, t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.25} />
      ))}
      <Sfx name="cash" at={tPrice} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s14 — The local next to you pays half. */
export const S14: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tHalf = at('half');
  return (
    <AbsoluteFill>
      <Stage>
        <Sam x={620} seed={13} lHand={<HeldCamera />} start={{mouth: 'smile', lShoulder: 30, lElbow: -60}} keys={[{f: tHalf, p: {mouth: 'o', brows: 'raised'}, d: 6}]} emotes={[{f: tHalf + 3, kind: '!'}]} />
        <G x={620} y={headTop() - 60} s={0.8} r={-6}><Tag text="$80" color={C.yellow} w={tagW('$80')} /></G>
        <Actor who="local" x={1000} y={FLOOR} s={0.62} seed={15} enter={0} start={{lookX: -1, mouth: 'smile'}} />
        <G x={1000} y={headTop() - 60} s={pop(frame, fps, tHalf, 10) * 0.8} r={6}><Tag text="$40" color={C.green} w={tagW('$40')} /></G>
        <Actor who="vendor" x={1580} y={FLOOR} s={0.62} flip seed={14} start={{lookX: 1, mouth: 'smirk', brows: 'smug', ...CROSS}} />
      </Stage>
      <Sfx name="ding" at={tHalf} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s15 — Economists have a name for it: price discrimination. */
export const S15: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tEcon = at('economists');
  const tPd = at('price discrimination');
  return (
    <AbsoluteFill>
      <Headline text="*Price discrimination*" start={tPd - 2} y={400} size={92} card hl={C.yellow} stagger={4} />
      <Stage>
        <Actor who="professor" x={P.right} y={FLOOR} s={0.62} flip seed={16} enter={tEcon} start={{lookX: 1, mouth: 'smile'}}
          keys={[{f: tPd, p: {...POINT, mouth: 'open', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <SLabel text="ECONOMISTS" x={P.right} y={headTop() - 60} start={tEcon} size={26} />
        <Sam seed={17} start={{mouth: 'flat', brows: 'raised'}} />
      </Stage>
      <Sfx name="thud" at={tPd} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s16 — A lot of it we're fine with: student discounts, kids' tickets, the early bird special. */
export const S16: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number][] = [
    ['student', 'STUDENT DISCOUNT', C.cyan, at('student')],
    ['kid', "KIDS' TICKETS", C.yellow, at('cheaper tickets')],
    ['bird', 'EARLY BIRD', C.green, at('early bird')],
  ];
  const tFine = at("we're fine");
  return (
    <AbsoluteFill>
      <Headline text="Some of it we're *fine* with" start={tFine - 4} y={TOP} size={76} stagger={2} hl={C.green} />
      <Stage>
        {items.map(([icon, label, color, t], i) => (
          <g key={label}>
            <G x={680 + i * 330} y={530} s={pop(frame, fps, t, 11) * 1.05}><Badge2 icon={icon} color={color} label={label} labelSize={30} /></G>
            <G x={760 + i * 330} y={450} s={pop(frame, fps, t + 6, 10)}>
              <circle r={30} fill={C.green} {...ink} strokeWidth={5} />
              <path d="M-13,0 L-3,10 L14,-10" fill="none" stroke={C.white} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
            </G>
          </g>
        ))}
        <Sam seed={18} start={{mouth: 'smile'}} keys={[{f: items[2][3], p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      {items.map(([, label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.28} />
      ))}
    </AbsoluteFill>
  );
};

/* s17 — The stall guy only sees your sneakers. Your phone sees a lot more. */
export const S17: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tChanged = at("here's what changed");
  const tSneak = at('only see');
  const tPhone = at('your phone');
  const tMore = at('a lot more');
  const cone = (x: number, y: number, w: number, color: string, t: number) => (
    <path d={`M${x},${y} L${x - w},${y + 260} L${x + w},${y + 260} Z`} fill={color} opacity={0.22 * t} />
  );
  return (
    <AbsoluteFill>
      <Headline text="Here's what *changed*" start={tChanged} y={TOP} size={80} hl={C.magenta} />
      <Stage>
        <g opacity={ramp(frame, tSneak - 4, 8)}>
          {cone(560, 520, 70, C.yellow, ramp(frame, tSneak, 10))}
          <G x={560} y={500} s={0.7}><Badge2 icon="eye" color={C.yellow} /></G>
          <SLabel text="THE STALL GUY" x={560} y={820} start={tSneak} size={30} />
        </g>
        <g opacity={ramp(frame, tPhone - 4, 8)}>
          {cone(1260, 520, 380 * ramp(frame, tMore, 16) + 70, C.magenta, 1)}
          <G x={1260} y={460} s={pop(frame, fps, tPhone, 12) * 0.45}><Phone><G x={0} y={0} s={1.6}><Badge2 icon="eye" color={C.magenta} /></G></Phone></G>
          <SLabel text="YOUR PHONE" x={1260} y={820} start={tPhone} size={30} />
        </g>
        <Sam seed={19} start={{mouth: 'flat'}} keys={[{f: tMore, p: {...SHOCK}, d: 6, ease: 'out'}]} />
      </Stage>
      <Sfx name="whoosh" at={tMore} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s18 — The FTC looked at companies selling pricing tools and listed the data they can use. */
export const S18: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFtc = at('federal trade commission');
  const tTools = at('pricing tools');
  const tData = at('kind of data');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={560} y={FLOOR} s={pop(frame, fps, tFtc - 4, 13) * 0.75}><Courthouse label="FTC" color={C.cyan} /></G>
        <G x={1040} y={560} s={pop(frame, fps, tTools, 12) * 0.9} r={-4}>
          <rect x={-150} y={-110} width={300} height={220} rx={16} fill={C.magenta} {...ink} />
          <text y={-20} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.white}>PRICING</text>
          <text y={30} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.white}>TOOL</text>
          <text y={80} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill={C.white}>for retailers</text>
        </G>
        <G x={1380} y={520} s={pop(frame, fps, tData, 12) * 0.55} r={4} shadow><Contract title="FTC STUDY" sign={1} /></G>
        <Gerald seed={20} start={{mouth: 'grin'}} keys={[{f: tTools, p: {...POINT, mouth: 'grin'}, d: 7, ease: 'out'}]} />
        <SourceTag text="SOURCE: US FEDERAL TRADE COMMISSION" start={tFtc} />
      </Stage>
      <Sfx name="pop" at={tTools} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s19 — Where you are, your device, what you bought, mouse moves, how far you scroll. */
export const S19: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number][] = [
    ['pin', 'WHERE YOU ARE', C.red, at('where you are')],
    ['device', 'YOUR DEVICE', C.cyan, at('what device')],
    ['cart', 'WHAT YOU BOUGHT', C.yellow, at('what you bought')],
    ['mouse', 'MOUSE MOVES', C.green, at('mouse moves')],
    ['scroll', 'HOW FAR YOU SCROLL', C.magenta, at('how far you scroll')],
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <G x={620} y={560} s={pop(frame, fps, 0, 12) * 0.7}><Phone><G x={0} y={0} s={1.4}><Badge2 icon="eye" color={C.magenta} /></G></Phone></G>
        {items.map(([icon, label, color, t], i) => {
          const y = 250 + i * 150;
          return (
            <g key={label}>
              <Arrow x1={760} y1={560} x2={1010} y2={y} t={ramp(frame, t, 8)} color={color} w={6} />
              <G x={1080} y={y} s={pop(frame, fps, t, 11) * 0.62}><Badge2 icon={icon} color={color} /></G>
              <text x={1150} y={y + 14} fontFamily={BODY} fontWeight={800} fontSize={40} fill={C.ink} opacity={ramp(frame, t + 2, 6)}>{label}</text>
            </g>
          );
        })}
        <Sam x={P.left - 40} seed={21} start={{mouth: 'flat'}} keys={[{f: items[4][3], p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      {items.map(([, label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s20 — The stall guy now lives in your pocket, and he's very good at reading sneakers. */
export const S20: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPocket = at('your pocket');
  const tRead = at('reading sneakers');
  return (
    <AbsoluteFill>
      <Headline text="He lives in your *pocket* now" start={tPocket - 6} y={TOP} size={78} stagger={2} />
      <Stage>
        <G x={1040} y={590} s={pop(frame, fps, 0, 12) * 0.95}>
          <Phone>
            <Actor who="vendor" x={0} y={230} s={0.62} seed={22} enter={tPocket - 4} start={{lookX: -1, mouth: 'smirk', brows: 'smug', rShoulder: -40, rElbow: -100}}
              rHand={<Magnifier r={-30} />} />
          </Phone>
        </G>
        <G x={1430} y={720} s={pop(frame, fps, tRead, 11) * 0.7}><Tag text="SNEAKERS: NEW" color={C.yellow} w={tagW('SNEAKERS: NEW')} /></G>
        <Sam seed={23} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tRead, p: {mouth: 'o', brows: 'raised'}, d: 6}]} emotes={[{f: tRead + 4, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="pop" at={tRead} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s21 — Sounds paranoid? Let's go to a parking lot in Minnesota. */
export const S21: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPara = at('paranoid');
  const tLot = at('parking lot');
  const tMn = at('minnesota');
  return (
    <AbsoluteFill>
      <Headline text="A parking lot in *Minnesota*" start={tLot - 4} y={TOP} size={80} hl={C.cyan} stagger={2} />
      <Stage>
        <G x={1150} y={FLOOR - 120} s={pop(frame, fps, tLot - 6, 13) * 0.8}><StoreFront name="STORE" color={C.red} /></G>
        <rect x={500} y={FLOOR - 120} width={1300} height={128} fill="#8E8F96" opacity={ramp(frame, tLot - 6, 8)} />
        <G x={1150} y={FLOOR - 100} s={ramp(frame, tLot - 6, 8)}><ParkingLines n={6} gap={200} /></G>
        <G x={lerp(frame, [tLot, tMn + 20], [600, 900])} y={FLOOR - 10} s={pop(frame, fps, tLot, 12) * 0.7}><Car color={C.cyan} /></G>
        <G x={1620} y={330} s={pop(frame, fps, tMn, 11) * 0.7} r={6}><Tag text="MINNESOTA" color={C.yellow} w={tagW('MINNESOTA')} /></G>
        <Sam seed={24} start={{mouth: 'flat', brows: 'oneUp'}} emotes={[{f: tPara, kind: '?', d: 30}]} />
      </Stage>
      <Sfx name="whoosh" at={tLot} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s22 — 2019: a viewer tipped off KARE 11 about the Target app, so the station tested it. */
export const S22: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t19 = at('2019');
  const tTip = at('sent a tip');
  const tKare = at('kare 11');
  const tOff = at('something was off');
  const tTest = at('tested it');
  const fly = lerp(frame, [tTip, tTip + 18], [0, 1]);
  return (
    <AbsoluteFill>
      <Stage>
        <SLabel text="2019 · MINNEAPOLIS" x={960} y={140} start={t19} size={40} />
        <G x={1240} y={560} s={pop(frame, fps, tKare - 6, 13) * 1.05}>
          <TV label="KARE 11" color={C.cyan}>
            <G x={0} y={0} s={0.36}><Phone><text y={-40} textAnchor="middle" fontFamily={DISPLAY} fontSize={56} fill={C.red}>STORE</text><text y={40} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={40} fill={C.ink}>app</text></Phone></G>
          </TV>
        </G>
        {fly < 1 && fly > 0 && (
          <G x={lerp(fly, [0, 1], [500, 1150])} y={lerp(fly, [0, 1], [560, 520]) - Math.sin(fly * Math.PI) * 160} s={0.55} r={-10 + fly * 20}>
            <rect x={-80} y={-50} width={160} height={100} rx={8} fill={C.white} {...ink} />
            <path d="M-80,-50 L0,10 L80,-50" fill="none" {...ink} strokeWidth={5} />
          </G>
        )}
        <G x={1580} y={320} s={pop(frame, fps, tOff, 10) * 0.8}><Badge2 icon="eye" color={C.yellow} /></G>
        <G x={1240} y={860} s={pop(frame, fps, tTest, 9) * 0.6} r={-6}><Stamp text="TESTING IT" color={C.magenta} /></G>
        <Sam seed={25} lHand={<HeldPhone><RideQuote price="" /></HeldPhone>} start={{mouth: 'smile', lShoulder: 30, lElbow: -60}} keys={[{f: tTip, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="whoosh" at={tTip} volume={0.3} />
      <Sfx name="thud" at={tTest} volume={0.35} />
    </AbsoluteFill>
  );
};

/* Phone showing the TV listing with a price (used in s23-s25). */
export const TvListing: React.FC<{price: string; color?: string; flash?: number}> = ({price, color = C.ink, flash = 0}) => (
  <Phone>
    <text y={-240} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={24} fill={C.grey}>STORE APP</text>
    <G x={0} y={-30} s={0.48}><FlatTV /></G>
    <text y={40} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink}>Samsung TV</text>
    <rect x={-130} y={70} width={260} height={90} rx={12} fill={color === C.red ? '#FDE3E1' : C.paperDark} opacity={0.6 + flash * 0.4} />
    <text y={136} textAnchor="middle" fontFamily={DISPLAY} fontSize={64} fill={color}>{price}</text>
  </Phone>
);

/* s23 — They looked up a Samsung TV in the app: $499.99. */
export const S23: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLook = at('looked up');
  const tPrice = at('four hundred');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1040} y={560} s={pop(frame, fps, tLook - 4, 13)}><TvListing price={frame >= tPrice ? '$499.99' : '...'} /></G>
        <SLabel text="AT HOME" x={1040} y={180} start={tLook} size={36} color={C.grey} />
        <Sam seed={26} start={{mouth: 'smile'}} keys={[{f: tPrice, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="ding" at={tPrice} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s24 — Then they drove to a Target store, pulled into the lot and checked again. */
export const S24: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tDrove = at('drove');
  const tPull = at('pulled into');
  const tCheck = at('checked again');
  const x = lerp(frame, [tDrove, tPull + 10], [-200, 760], undefined);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1250} y={FLOOR - 120} s={pop(frame, fps, 0, 13) * 0.8}><StoreFront name="TARGET" color={C.red} /></G>
        <rect x={0} y={FLOOR - 120} width={1920} height={128} fill="#8E8F96" />
        <G x={1100} y={FLOOR - 100} s={1}><ParkingLines n={7} gap={220} /></G>
        <G x={x} y={FLOOR - 10} s={0.8}><Car color={C.cyan} /></G>
        <G x={760} y={420} s={pop(frame, fps, tCheck, 11) * 0.5}><TvListing price="?" /></G>
      </Stage>
      <Sfx name="whoosh" at={tDrove} volume={0.3} />
      <Sfx name="pop" at={tCheck} volume={0.3} />
    </AbsoluteFill>
  );
};
