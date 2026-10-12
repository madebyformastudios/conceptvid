import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Gavel} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {TOP, FLOOR} from '../../../components/layout';
import {Phone, Contract, Capitol, Donut, Bar, BoxOffice, HeldPhone} from '../../concert-fees/kit';
import {RideQuote, Couch, Badge2, StoreFront, FlatTV, FlipCoin, Icon2} from '../kit';
import {SubscribeClick} from './B';
import {Sam, Gerald, Friend, SourceTag, SLabel, tagW, headTop, P, SHOCK, POINT, SHRUG, CHEER, RAISE, HIPS, REST, CROSS, Toggle, Stat} from './common';

const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};
const HOLD_PHONE = {rShoulder: -55, rElbow: -70};

/* Big step number for the tips. */
const TipNo: React.FC<{n: number; t: number; x?: number; y?: number}> = ({n, t, x = 620, y = 360}) => (
  <G x={x} y={y} s={t}>
    <circle r={70} fill={C.yellow} {...ink} />
    <text y={30} textAnchor="middle" fontFamily={DISPLAY} fontSize={84} fill={C.ink}>{n}</text>
  </G>
);

/* s75 — Is anyone stopping this? Yes. And it's happening fast. */
export const S75: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tYes = at('yes');
  const tFast = at('happening fast');
  return (
    <AbsoluteFill>
      <Headline text="Is anyone *stopping this?*" start={0} y={TOP} size={80} stagger={2} hl={C.green} />
      <Stage>
        <G x={1040} y={FLOOR} s={pop(frame, fps, tYes - 4, 13) * 0.95}><Capitol /></G>
        <G x={1040} y={420} s={pop(frame, fps, tYes, 9) * 0.9} r={-6}><Stamp text="YES" color={C.green} /></G>
        <G x={1500} y={640} s={pop(frame, fps, tFast, 10) * 0.8} r={-20}><Gavel /></G>
        <Sam seed={100} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tYes, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tFast} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s76 — New York: companies must tell you when your personal data helped set your price. */
export const S76: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNy = at('new york');
  const tTell = at('tell you');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={900} y={560} s={pop(frame, fps, tNy - 4, 12) * 0.95} r={-3} shadow><Contract title="NEW YORK LAW" sign={ramp(frame, tTell, 16)} seal={pop(frame, fps, tTell + 16, 10)} /></G>
        <SLabel text="MUST TELL YOU WHEN YOUR DATA SET YOUR PRICE" x={960} y={850} start={tTell} size={34} />
        <Actor who="senator" x={P.right} y={FLOOR} s={0.62} flip seed={101} enter={tNy} start={{lookX: 1, mouth: 'smile'}} keys={[{f: tTell, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
        <Sam seed={102} start={{mouth: 'smile'}} />
      </Stage>
      <Sfx name="pop" at={tNy} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s77 — Scroll to the very bottom of an Uber quote there: "This price was set by an algorithm using your personal data." */
export const S77: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tScroll = at('scroll to the very bottom');
  const tLine = at('this line');
  const tAlgo = at('set by an algorithm');
  const sc = ramp(frame, tScroll, 26);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={760} y={560} s={pop(frame, fps, 0, 12) * 0.95}>
          <Phone>
            <defs>
              <clipPath id="s77clip"><rect x={-154} y={-310} width={308} height={620} rx={30} /></clipPath>
            </defs>
            <g clipPath="url(#s77clip)">
              <g transform={`translate(0 ${-sc * 330})`}>
                <RideQuote price="$66.27" />
                <rect x={-130} y={300} width={260} height={150} rx={10} fill={C.yellow} opacity={ramp(frame, tAlgo, 8)} />
                {['This price was set', 'by an algorithm using', 'your personal data.'].map((l, i) => (
                  <text key={l} x={-118} y={340 + i * 40} fontFamily={BODY} fontWeight={800} fontSize={22} fill={C.ink}>{l}</text>
                ))}
              </g>
            </g>
          </Phone>
        </G>
        <G x={1360} y={520} s={pop(frame, fps, tLine, 11)}>
          <rect x={-330} y={-110} width={660} height={220} rx={18} fill={C.white} {...ink} />
          <text x={-300} y={-36} fontFamily={DISPLAY} fontSize={38} fill={C.ink}>“This price was set</text>
          <text x={-300} y={16} fontFamily={DISPLAY} fontSize={38} fill={C.ink}>by an algorithm using</text>
          <text x={-300} y={68} fontFamily={DISPLAY} fontSize={38} fill={C.magenta}>your personal data.”</text>
        </G>
        <Sam x={P.left - 30} seed={103} start={{mouth: 'flat'}} keys={[{f: tAlgo, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="whoosh" at={tScroll} volume={0.25} />
      <Sfx name="pop" at={tLine} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s78 — Uber told Business Insider the only personal data used there is your location. */
export const S78: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBi = at('business insider');
  const tLoc = at('your location');
  const tNow = at('on the screen now');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={900} y={500} s={pop(frame, fps, tLoc - 4, 12) * 1.3}><Badge2 icon="pin" color={C.red} label="ONLY: YOUR LOCATION" labelSize={30} /></G>
        <G x={1050} y={800} s={pop(frame, fps, tNow, 10) * 0.65} r={-5}><Stamp text="BUT IT'S ON SCREEN" color={C.magenta} /></G>
        <SLabel text="UBER SAYS" x={P.right} y={headTop() - 60} start={0} size={26} color={C.grey} />
        <Gerald seed={104} start={{mouth: 'smile', ...SHRUG}} />
        <SourceTag text="SOURCE: BUSINESS INSIDER" start={tBi} />
      </Stage>
      <Sfx name="pop" at={tLoc} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s79 — Maryland went further: April 2026, first state to ban surveillance pricing at big grocers and delivery apps. */
export const S79: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMd = at('maryland');
  const tApr = at('april 2026');
  const tBan = at('first state to ban');
  const tApps = at('delivery apps');
  return (
    <AbsoluteFill>
      <Headline text="Maryland: *banned*" start={tMd} y={TOP} size={84} hl={C.red} />
      <Stage>
        <SLabel text="APRIL 2026 · FIRST STATE" x={960} y={250} start={tApr} size={36} />
        <G x={760} y={FLOOR} s={pop(frame, fps, tBan - 4, 12) * 0.55}><StoreFront name="GROCERY" color={C.green} /></G>
        <G x={1230} y={600} s={pop(frame, fps, tApps - 4, 12) * 0.5}><Phone><text textAnchor="middle" y={10} fontFamily={DISPLAY} fontSize={50} fill={C.ink}>DELIVERY</text></Phone></G>
        <G x={990} y={560} s={pop(frame, fps, tBan + 6, 9) * 0.8} r={-8}><Stamp text="NO SURVEILLANCE PRICING" color={C.red} /></G>
        <Sam seed={105} start={{mouth: 'smile'}} keys={[{f: tBan + 6, p: {...CHEER, mouth: 'grin'}, d: 8, ease: 'out'}]} />
      </Stage>
      <Sfx name="thud" at={tBan + 6} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s80 — The law took effect October 1st. Colorado and Connecticut passed bills a few weeks later. */
export const S80: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tOct = at('october first');
  const tCo = at('colorado');
  const tCt = at('connecticut');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={640} y={540} s={pop(frame, fps, tOct - 4, 12)}>
          <rect x={-150} y={-150} width={300} height={300} rx={18} fill={C.white} {...ink} />
          <rect x={-150} y={-150} width={300} height={80} rx={18} fill={C.red} {...ink} />
          <text y={-95} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.white}>OCTOBER</text>
          <text y={90} textAnchor="middle" fontFamily={DISPLAY} fontSize={150} fill={C.ink}>1</text>
        </G>
        <SLabel text="MARYLAND LAW IN EFFECT" x={640} y={730} start={tOct} size={30} />
        <G x={1150} y={500} s={pop(frame, fps, tCo, 11) * 0.8}><Tag text="COLORADO" color={C.cyan} w={tagW('COLORADO')} /></G>
        <G x={1250} y={650} s={pop(frame, fps, tCt, 11) * 0.8}><Tag text="CONNECTICUT" color={C.yellow} w={tagW('CONNECTICUT')} /></G>
        <SLabel text="BILLS PASSED" x={1200} y={760} start={tCt + 6} size={30} />
        <Actor who="senator" x={P.right} y={FLOOR} s={0.62} flip seed={106} start={{lookX: 1, mouth: 'smile'}} keys={[{f: tCo, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tCo} volume={0.28} />
      <Sfx name="pop" at={tCt} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s81 — In a poll for a grocery workers' union, 68% worry it will raise prices; only 5% think it lowers them. */
export const S81: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPoll = at('in a poll');
  const t68 = at('sixty-eight');
  const t5 = at('only five');
  return (
    <AbsoluteFill>
      <Stage>
        <SLabel text="POLL FOR A GROCERY WORKERS' UNION" x={960} y={170} start={tPoll} size={34} />
        <G x={700} y={540} s={pop(frame, fps, t68 - 4, 12)}><Donut pct={68} t={ramp(frame, t68, 18)} color={C.red} label="PRICES WILL RISE" /></G>
        <G x={1220} y={540} s={pop(frame, fps, t5 - 4, 12)}><Donut pct={5} t={ramp(frame, t5, 12)} color={C.green} label="PRICES WILL FALL" /></G>
        <Sam x={P.right} flip seed={107} start={{mouth: 'flat'}} keys={[{f: t68, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7}]} />
      </Stage>
      <Sfx name="pop" at={t68} volume={0.3} />
      <Sfx name="pop" at={t5} volume={0.3} />
    </AbsoluteFill>
  );
};

/* Stacked price block (cost + profit, or "you"). */
const Block: React.FC<{x: number; parts: [string, string, number][]; t: number}> = ({x, parts, t}) => {
  let y = 860;
  return (
    <g>
      {parts.map(([label, color, h], i) => {
        const hh = h * t;
        y -= hh;
        return (
          <g key={label}>
            {hh > 1 && <rect x={x - 170} y={y} width={340} height={hh} fill={color} {...ink} />}
            {hh > 40 && <text x={x} y={y + hh / 2 + 14} textAnchor="middle" fontFamily={DISPLAY} fontSize={38} fill={C.ink}>{label}</text>}
          </g>
        );
      })}
    </g>
  );
};

/* s82 — A price used to be about the product: what it cost to make, plus a profit. */
export const S82: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLoud = at('nobody says out loud');
  const tCost = at('cost to make');
  const tProfit = at('plus a profit');
  return (
    <AbsoluteFill>
      <Headline text="A price used to be about the *product*" start={at('a price used')} y={TOP} size={70} stagger={2} hl={C.cyan} />
      <Stage>
        <line x1={760} y1={860} x2={1260} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <Block x={1010} t={1} parts={[['COST', C.cyan, 300 * ramp(frame, tCost, 12)], ['PROFIT', C.green, 120 * ramp(frame, tProfit, 10)]]} />
        <G x={1010} y={940} s={0.45}><FlatTV /></G>
        <Sam seed={108} start={{mouth: 'smile'}} keys={[{f: tLoud, p: {mouth: 'flat', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tCost} volume={0.28} />
      <Sfx name="pop" at={tProfit} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s83 — Personalized pricing flips it: the price is about you, the most you'd pay, guessed from your phone. */
export const S83: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFlip = at('flips that around');
  const tYou = at('about you');
  const tWill = at('willing to pay');
  const tGive = at('gives away');
  const flip = ramp(frame, tFlip, 14);
  return (
    <AbsoluteFill>
      <Headline text="Now it's about *you*" start={tYou - 4} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <line x1={600} y1={860} x2={1100} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <g transform={`translate(850 860) scale(1 ${1 - 2 * Math.min(flip, 0.5) + Math.max(0, flip - 0.5) * 2}) translate(-850 -860)`}>
          {flip < 0.5 ? (
            <Block x={850} t={1} parts={[['COST', C.cyan, 300], ['PROFIT', C.green, 120]]} />
          ) : (
            <Block x={850} t={1} parts={[['MAX YOU\'D PAY', C.magenta, 520 * ramp(frame, tWill, 14) + 60]]} />
          )}
        </g>
        <G x={1350} y={560} s={pop(frame, fps, tGive, 11) * 0.65}><Phone><G x={0} y={0} s={1.4}><Badge2 icon="eye" color={C.magenta} /></G></Phone></G>
        <Arrow x1={1240} y1={560} x2={1050} y2={500} t={ramp(frame, tGive + 4, 8)} color={C.magenta} w={8} />
        <Sam x={P.left - 40} seed={109} start={{mouth: 'flat'}} keys={[{f: tYou, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="whoosh" at={tFlip} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s84 — That's the part Gerald loves: not what the TV is worth, but what you're worth. */
export const S84: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLoves = at('gerald loves');
  const tTv = at('tv is worth');
  const tYou = at("what you're worth");
  return (
    <AbsoluteFill>
      <Stage>
        <G x={780} y={560} s={pop(frame, fps, tTv - 4, 12) * 0.6} o={1 - 0.6 * ramp(frame, tYou, 8)}><FlatTV /></G>
        <G x={780} y={360} s={pop(frame, fps, tTv, 10) * 0.75} r={-6}><Tag text="WORTH: ?" color={C.white} w={tagW('WORTH: ?')} /></G>
        <G x={P.left + 40} y={headTop() - 80} s={pop(frame, fps, tYou, 9) * 0.85} r={6}><Tag text="YOUR WORTH: $$$" color={C.magenta} w={tagW('YOUR WORTH: $$$')} /></G>
        <Sam x={P.left + 40} seed={110} start={{mouth: 'flat'}} keys={[{f: tYou, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tYou + 4, kind: 'sweat'}]} />
        <Gerald x={1500} s={0.75} seed={111} start={{mouth: 'grin', brows: 'smug'}} keys={[{f: tLoves, p: {...CHEER, mouth: 'grin', brows: 'smug'}, d: 8, ease: 'out'}, {f: tYou, p: {...POINT, mouth: 'grin'}, d: 7, ease: 'out'}]} emotes={[{f: tLoves + 4, kind: 'sparkle', d: 40}]} />
      </Stage>
      <Sfx name="ding" at={tLoves} volume={0.3} />
      <Sfx name="cash" at={tYou} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s85 — Back to you and your friend on that couch: how to stop being the one who pays more. */
export const S85: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBack = at('back to you');
  const tStop = at('stop being');
  return (
    <AbsoluteFill>
      <Headline text="Stop being the one who *pays more*" start={tStop} y={TOP} size={74} stagger={2} hl={C.green} />
      <Stage>
        <G x={960} y={FLOOR} s={pop(frame, fps, tBack - 4, 14)}><Couch /></G>
        <Friend x={790} seed={1} start={{mouth: 'smile', ...HOLD_PHONE}} rHand={<HeldPhone />} />
        <Sam x={1130} flip={false} seed={2} start={{mouth: 'flat', ...HOLD_PHONE}} rHand={<HeldPhone />} keys={[{f: tStop, p: {mouth: 'smile', brows: 'raised'}, d: 6}]} />
      </Stage>
    </AbsoluteFill>
  );
};

/* s86 — Three things. None take more than a minute. */
export const S86: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t3 = at('three things');
  const tMin = at('more than a minute');
  return (
    <AbsoluteFill>
      <Stage>
        {[1, 2, 3].map((n, i) => (
          <TipNo key={n} n={n} t={pop(frame, fps, t3 + i * 4, 10) * 1.3} x={700 + i * 260} y={480} />
        ))}
        <SLabel text="UNDER A MINUTE EACH" x={960} y={640} start={tMin} size={44} />
        <Sam seed={112} start={{mouth: 'smile'}} keys={[{f: t3, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={t3 + i * 4} volume={0.28} />
      ))}
    </AbsoluteFill>
  );
};

/* s87 — First: before a big purchase, ask a friend to check the same price on their phone. */
export const S87: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFirst = at('first');
  const tAsk = at('ask a friend');
  return (
    <AbsoluteFill>
      <Headline text="Ask a friend to *check*" start={tAsk - 4} y={TOP} size={80} hl={C.cyan} />
      <Stage>
        <TipNo n={1} t={pop(frame, fps, tFirst, 10)} x={240} y={300} />
        <G x={820} y={560} s={pop(frame, fps, tAsk, 12) * 0.62}><Phone><RideQuote price="$54.95" color={C.green} /></Phone></G>
        <G x={1100} y={560} s={pop(frame, fps, tAsk + 4, 12) * 0.62}><Phone><RideQuote price="$66.27" color={C.red} /></Phone></G>
        <Friend x={P.right} flip seed={1} enter={tAsk - 4} start={{mouth: 'smile'}} keys={[{f: tAsk + 6, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
        <Sam x={P.left + 60} seed={113} start={{mouth: 'smile'}} keys={[{f: tAsk, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tAsk} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s88 — Or check on two of your own devices, one logged in and one not. Different numbers = lesson learned. */
export const S88: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTwo = at('two of your own devices');
  const tIn = at('logged in');
  const tNot = at('one not');
  const tLearn = at('learned something');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={760} y={540} s={pop(frame, fps, tTwo, 12) * 0.62}>
          <Phone>
            <text y={-200} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.grey}>LOGGED IN</text>
            <circle cy={-110} r={50} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <text y={60} textAnchor="middle" fontFamily={DISPLAY} fontSize={84} fill={C.red} opacity={ramp(frame, tIn, 6)}>$89</text>
          </Phone>
        </G>
        <G x={1160} y={560} s={pop(frame, fps, tNot - 4, 12)}>
          <rect x={-240} y={-160} width={480} height={300} rx={20} fill={C.ink} {...ink} />
          <rect x={-220} y={-140} width={440} height={260} rx={10} fill={C.white} />
          <text y={-80} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.grey}>LOGGED OUT</text>
          <text y={40} textAnchor="middle" fontFamily={DISPLAY} fontSize={84} fill={C.green} opacity={ramp(frame, tNot, 6)}>$79</text>
          <rect x={-280} y={140} width={560} height={24} rx={8} fill={C.soft} {...ink} strokeWidth={5} />
        </G>
        <G x={960} y={850} s={pop(frame, fps, tLearn, 10) * 0.6} r={-4}><Stamp text="LESSON LEARNED" color={C.magenta} /></G>
        <Sam seed={114} start={{mouth: 'smile'}} keys={[{f: tLearn, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="ding" at={tLearn} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s89 — Second: turn off location access for shopping apps. Never, or ask every time. */
export const S89: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSecond = at('second');
  const tLoc = at('location access');
  const tNever = at('never');
  return (
    <AbsoluteFill>
      <Headline text="Turn off *location*" start={tLoc - 4} y={TOP} size={84} hl={C.red} />
      <Stage>
        <TipNo n={2} t={pop(frame, fps, tSecond, 10)} x={240} y={300} />
        <G x={960} y={580} s={pop(frame, fps, tLoc - 4, 12) * 0.85}>
          <Phone>
            <text y={-230} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink}>Shopping app</text>
            <text x={-120} y={-130} fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink}>Location</text>
            <Toggle x={80} y={-140} on={1 - ramp(frame, tNever, 6)} s={0.7} />
            {['Never', 'Ask every time', 'While using'].map((o, i) => (
              <g key={o}>
                <rect x={-130} y={-60 + i * 80} width={260} height={60} rx={12} fill={i < 2 && frame >= tNever ? '#E3F6EA' : C.paperDark} stroke={C.ink} strokeWidth={3} />
                <text x={-110} y={-20 + i * 80} fontFamily={BODY} fontWeight={800} fontSize={26} fill={C.ink}>{o}</text>
              </g>
            ))}
          </Phone>
        </G>
        <Sam seed={115} start={{mouth: 'smile', ...HOLD_PHONE}} rHand={<HeldPhone />} />
      </Stage>
      <Sfx name="click" at={tNever} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s90 — KARE 11's exact fix for the Target app: the app can't tell you're standing in the store. */
export const S90: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tKare = at('kare 11');
  const tCant = at("can't tell");
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1250} y={FLOOR} s={0.62}><StoreFront name="STORE" color={C.red} /></G>
        <G x={1250} y={420} s={pop(frame, fps, tCant, 11) * 0.8}>
          <Badge2 icon="pin" color={C.grey} />
          <line x1={-90} y1={-90} x2={90} y2={90} stroke={C.red} strokeWidth={16} strokeLinecap="round" />
        </G>
        <SLabel text="KARE 11'S FIX" x={700} y={260} start={tKare} size={40} />
        <G x={700} y={560} s={pop(frame, fps, tKare, 12) * 0.55}>
          <Phone>
            <text x={-120} y={-130} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink}>Location</text>
            <Toggle x={80} y={-140} on={0} s={0.7} />
            <text y={40} textAnchor="middle" fontFamily={DISPLAY} fontSize={60} fill={C.green}>$499.99</text>
          </Phone>
        </G>
        <Sam x={1000} seed={116} start={{mouth: 'smile', ...HOLD_PHONE}} rHand={<HeldPhone />} keys={[{f: tCant, p: {mouth: 'grin', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tCant} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s91 — Third: use price matching. Target and plenty of other stores match a lower price. */
export const S91: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tThird = at('third');
  const tMatch = at('price matching');
  const tOther = at('other stores');
  return (
    <AbsoluteFill>
      <Headline text="Use *price matching*" start={tMatch - 4} y={TOP} size={84} hl={C.green} />
      <Stage>
        <TipNo n={3} t={pop(frame, fps, tThird, 10)} x={240} y={300} />
        <G x={960} y={480} s={pop(frame, fps, tMatch, 10) * 1.0} r={-5}><Stamp text="PRICE MATCH" color={C.green} /></G>
        {[0, 1, 2, 3].map((i) => (
          <G key={i} x={600 + i * 240} y={FLOOR} s={pop(frame, fps, tOther + i * 3, 12) * 0.28}><StoreFront name="" color={[C.red, C.cyan, C.yellow, C.green][i]} /></G>
        ))}
        <Sam seed={117} start={{mouth: 'smile'}} keys={[{f: tMatch, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="ding" at={tMatch} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s92 — If the app is cheaper than the shelf, show it at the register. */
export const S92: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tShelf = at('cheaper than the shelf');
  const tReg = at('register');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1240} y={FLOOR} s={pop(frame, fps, 0, 12) * 0.75}><BoxOffice /></G>
        <G x={1240} y={430} s={pop(frame, fps, tReg, 10) * 0.7} r={4}><Tag text="REGISTER" color={C.yellow} w={tagW('REGISTER')} /></G>
        <Sam x={760} seed={118} start={{mouth: 'smile', ...HOLD_PHONE}}
          rHand={<g transform="translate(0 -70) scale(0.4)"><Phone><text y={20} textAnchor="middle" fontFamily={DISPLAY} fontSize={80} fill={C.green}>$499</text></Phone></g>}
          keys={[{f: tReg, p: {rShoulder: -95, rElbow: -20, mouth: 'grin', brows: 'raised'}, d: 7, ease: 'out'}]} />
        <SLabel text="APP: $499  ·  SHELF: $599" x={760} y={240} start={tShelf} size={36} />
      </Stage>
      <Sfx name="cash" at={tReg + 6} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s93 — None of this beats the algorithm; it just makes it harder to guess what you're worth. */
export const S93: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBeat = at('beats the algorithm');
  const tHard = at('a lot harder');
  return (
    <AbsoluteFill>
      <Headline text="Harder to guess *what you're worth*" start={tHard - 4} y={TOP} size={72} stagger={2} hl={C.magenta} />
      <Stage>
        <G x={P.right - 220} y={headTop() - 120} s={pop(frame, fps, tHard, 11) * 0.8}><Badge2 icon="eye" color={C.magenta} label="???" labelSize={50} /></G>
        <Gerald seed={119} start={{mouth: 'smirk'}} keys={[{f: tHard, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 8}]} emotes={[{f: tHard + 6, kind: '?'}]} />
        <Sam seed={120} start={{mouth: 'flat'}} keys={[{f: tBeat, p: {mouth: 'flat', brows: 'oneUp'}, d: 6}, {f: tHard, p: {mouth: 'smirk', ...CROSS}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tHard} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s94 — So, you and your friend: same couch, same ride, eleven dollars apart. */
export const S94: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t11 = at('eleven dollars');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={960} y={FLOOR} s={1}><Couch /></G>
        <Friend x={790} seed={1} start={{mouth: 'smile', ...HOLD_PHONE}} rHand={<HeldPhone />} />
        <Sam x={1130} flip={false} seed={2} start={{mouth: 'flat', ...HOLD_PHONE}} rHand={<HeldPhone />} />
        <G x={790} y={headTop() - 60} s={pop(frame, fps, t11 - 6, 10) * 0.75} r={-6}><Tag text="$54.95" color={C.green} w={tagW('$54.95')} /></G>
        <G x={1130} y={headTop() - 60} s={pop(frame, fps, t11, 10) * 0.75} r={6}><Tag text="$66.27" color={C.red} w={tagW('$66.27')} /></G>
      </Stage>
      <Sfx name="pop" at={t11} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s95 — It might not be you: where you stood, the phone in your hand, last month's buys, or your test group. */
export const S95: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number][] = [
    ['pin', 'WHERE YOU STOOD', C.red, at('where you were standing')],
    ['device', 'YOUR PHONE', C.cyan, at('phone in your hand')],
    ['cart', 'LAST MONTH', C.yellow, at('bought last month')],
    ['dollar', 'TEST GROUP', C.green, at('test group')],
  ];
  return (
    <AbsoluteFill>
      <Headline text="It might not be *anything you did*" start={at('anything you did') - 6} y={TOP} size={72} stagger={2} />
      <Stage>
        {items.map(([ic, l, c, t], i) => (
          <G key={l} x={620 + i * 300} y={520} s={pop(frame, fps, t, 11) * 0.85}><Badge2 icon={ic} color={c} label={l} labelSize={32} /></G>
        ))}
        <Sam seed={121} start={{mouth: 'flat'}} keys={[{f: items[3][3], p: {...SHRUG, mouth: 'smirk'}, d: 8}]} />
      </Stage>
      {items.map(([, l, , t]) => (
        <Sfx key={l} name="pop" at={t} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s96 — It's not broken. It's working as intended. */
export const S96: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNot = at('not broken');
  const tWork = at('working as intended');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={900} y={430} s={pop(frame, fps, tNot, 10) * 0.75} r={-4} o={1 - ramp(frame, tWork, 6) * 0.6}><Stamp text="NOT BROKEN" color={C.grey} /></G>
        <G x={900} y={640} s={pop(frame, fps, tWork, 9) * 0.85} r={-6}><Stamp text="WORKING AS INTENDED" color={C.red} /></G>
        <Gerald seed={122} start={{mouth: 'smirk'}} keys={[{f: tWork, p: {...CHEER, mouth: 'grin', brows: 'smug'}, d: 8, ease: 'out'}]} emotes={[{f: tWork + 4, kind: 'sparkle', d: 40}]} />
        <Sam seed={123} start={{mouth: 'flat', ...CROSS}} keys={[{f: tWork, p: {mouth: 'frown', brows: 'angry'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={tNot} volume={0.3} />
      <Sfx name="thud" at={tWork} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s97 — Who's pricing everything else? Hit subscribe. It costs exactly the same for everyone. For now. */
export const S97: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tWho = at('pricing everything');
  const tSub = at('hit subscribe');
  const tSame = at('exactly the same');
  const tNow = at('for now');
  return (
    <AbsoluteFill>
      <Headline text="Who's pricing *everything else?*" start={tWho - 4} y={TOP} size={76} stagger={2} hl={C.magenta} />
      <Stage>
        <SubscribeClick x={960} y={480} t0={tSub} s={1.5} />
        <G x={960} y={700} s={pop(frame, fps, tSame, 10) * 0.85} r={-4}><Tag text="$0 FOR EVERYONE" color={C.green} w={tagW('$0 FOR EVERYONE')} /></G>
        <G x={1260} y={800} s={pop(frame, fps, tNow, 9) * 0.6} r={8}><Stamp text="FOR NOW" color={C.red} /></G>
        <Sam seed={124} start={{mouth: 'smile'}} keys={[{f: tSub - 4, p: {...POINT, mouth: 'grin', brows: 'raised'}, d: 7, ease: 'out'}]} emotes={[{f: tSub + 16, kind: 'sparkle', d: 40}]} />
        <Gerald seed={125} start={{mouth: 'flat', brows: 'raised'}} keys={[{f: tNow, p: {mouth: 'smirk', brows: 'smug', ...RAISE}, d: 8, ease: 'out'}]} />
      </Stage>
      <Sfx name="click" at={tSub + 10} volume={0.5} />
      <Sfx name="ding" at={tSub + 14} volume={0.35} />
      <Sfx name="thud" at={tNow} volume={0.35} />
    </AbsoluteFill>
  );
};
