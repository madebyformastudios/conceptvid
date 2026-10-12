import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Coin} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {Magnifier} from '../../../characters/Props';
import {TOP, FLOOR} from '../../../components/layout';
import {Phone, Bubble, Contract, Receipt, Donut, Capitol, Bar, Badge, HeldPhone} from '../../concert-fees/kit';
import {Badge2, Cart, Cereal, Pasta, PeanutButter, ShelfLabel, Sticker, Plane, TaxiMeter, FlipCoin, StoreFront, Icon2} from '../kit';
import {Sam, Gerald, Friend, SourceTag, SLabel, tagW, headTop, P, SHOCK, POINT, SHRUG, RAISE, HIPS, REST, CROSS, PEER, Stat} from './common';

const ink = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};

/* s49 — Patents and scenarios are possibilities. What happens when someone checks item by item? */
export const S49: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPoss = at('just possibilities');
  const tCheck = at('actually checks');
  const tItem = at('item by item');
  return (
    <AbsoluteFill>
      <Headline text="Checking *item by item*" start={tItem - 4} y={TOP} size={80} hl={C.cyan} />
      <Stage>
        <G x={1080} y={340} s={0.95}>
          <Receipt title="GROCERIES" w={560} size={30} lines={['Cereal', 'Pasta', 'Peanut butter', 'Milk', 'Bread'].map((l, i) => ({label: l, amount: '$?.??', t: ramp(frame, tCheck + i * 4, 8), color: [C.yellow, C.cyan, C.magenta, C.white, C.gold][i]}))} />
        </G>
        <SLabel text="PATENTS + SCENARIOS = MAYBE" x={1080} y={250} start={tPoss} size={30} color={C.grey} />
        <Sam x={P.left + 60} seed={60} rHand={<Magnifier r={30} />} start={{mouth: 'flat', ...PEER}} keys={[{f: tCheck, p: {mouth: 'smile', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tCheck} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s50 — End of 2025: Consumer Reports and the Groundwork Collaborative re-ran the test with groceries. */
export const S50: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t25 = at('end of 2025');
  const tCr = at('consumer reports');
  const tGc = at('groundwork collaborative');
  const tGro = at('with groceries');
  return (
    <AbsoluteFill>
      <Stage>
        <SLabel text="LATE 2025" x={960} y={150} start={t25} size={44} />
        <G x={620} y={420} s={pop(frame, fps, tCr - 4, 12) * 0.9}><Tag text="CONSUMER REPORTS" color={C.cyan} w={tagW('CONSUMER REPORTS')} /></G>
        <G x={1300} y={420} s={pop(frame, fps, tGc - 4, 12) * 0.75}><Tag text="GROUNDWORK COLLABORATIVE" color={C.yellow} w={tagW('GROUNDWORK COLLABORATIVE')} /></G>
        <G x={960} y={FLOOR} s={pop(frame, fps, tGro - 4, 12) * 0.8}>
          <Cart>
            <G x={-60} y={-80} s={0.7}><Cereal /></G>
            <G x={40} y={-80} s={0.7}><Pasta /></G>
            <G x={120} y={-80} s={0.7}><PeanutButter /></G>
          </Cart>
        </G>
        <SourceTag text="SOURCE: CONSUMER REPORTS + GROUNDWORK COLLABORATIVE" start={tCr} />
      </Stage>
      <Sfx name="pop" at={tCr} volume={0.28} />
      <Sfx name="pop" at={tGc} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s51 — Shoppers in four US cities filled the same cart, same store, same time. */
export const S51: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t4 = at('four us cities');
  const tCart = at('same instacart cart');
  return (
    <AbsoluteFill>
      <Headline text="4 cities. *The same cart.*" start={t4} y={TOP} size={80} stagger={3} hl={C.green} />
      <Stage>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <G x={420 + i * 360} y={520} s={pop(frame, fps, t4 + i * 3, 12) * 0.38}>
              <Phone>
                <G x={0} y={60} s={0.5}><Cart><G x={0} y={-80} s={0.7}><Cereal /></G></Cart></G>
                <text y={-150} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={44} fill={C.ink}>Cart</text>
              </Phone>
            </G>
            <G x={420 + i * 360} y={800} s={pop(frame, fps, tCart + i * 2, 11) * 0.5}><Badge2 icon="pin" color={[C.cyan, C.magenta, C.yellow, C.green][i]} label={['CITY 1', 'CITY 2', 'CITY 3', 'CITY 4'][i]} labelSize={40} /></G>
          </g>
        ))}
      </Stage>
      <Sfx name="pop" at={t4} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s52 — Nearly 3 of 4 items showed different prices; some had five different prices at once. */
export const S52: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t34 = at('three out of four');
  const t5 = at('five different prices');
  const items = [Cereal, Pasta, PeanutButter, Cereal];
  return (
    <AbsoluteFill>
      <Stage>
        {items.map((It, i) => (
          <g key={i}>
            <G x={460 + i * 330} y={620} s={pop(frame, fps, i * 3, 12) * 1.1}><It /></G>
            {i < 3 && (
              <G x={460 + i * 330} y={720} s={pop(frame, fps, t34 + i * 4, 10) * 0.65} r={-6}>
                <Tag text="VARIES" color={C.red} w={tagW('VARIES')} />
              </G>
            )}
            {i === 3 && (
              <G x={460 + i * 330} y={720} s={pop(frame, fps, t34 + 12, 10) * 0.65} r={-6}>
                <Tag text="SAME" color={C.green} w={tagW('SAME')} />
              </G>
            )}
          </g>
        ))}
        <SLabel text="NEARLY 3 IN 4 ITEMS: DIFFERENT PRICES" x={960} y={180} start={t34} size={40} />
        {['PRICE 1', 'PRICE 2', 'PRICE 3', 'PRICE 4', 'PRICE 5'].map((p, i) => (
          <G key={p} x={1120 + (i - 2) * 190} y={330 + (i % 2) * 50} s={pop(frame, fps, t5 + i * 3, 10) * 0.5} r={-8 + i * 4}>
            <Tag text={p} color={C.yellow} w={tagW(p)} />
          </G>
        ))}
        <Arrow x1={1120} y1={390} x2={790} y2={460} t={ramp(frame, t5 + 14, 8)} color={C.ink} w={6} />
      </Stage>
      {[0, 1, 2, 3, 4].map((i) => (
        <Sfx key={i} name="pop" at={t5 + i * 3} volume={0.22} />
      ))}
    </AbsoluteFill>
  );
};

/* s53 — On cereal, pasta and peanut butter the cheapest-to-priciest gap averaged 13%. */
export const S53: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const its: [React.FC, string][] = [
    [Cereal, 'cereal'],
    [Pasta, 'pasta'],
    [PeanutButter, 'peanut butter'],
  ];
  const t13 = at('averaged');
  return (
    <AbsoluteFill>
      <Stage>
        {its.map(([It, cue], i) => {
          const t = at(cue);
          return (
            <g key={cue}>
              <G x={520 + i * 300} y={760} s={pop(frame, fps, t, 12) * 0.95}><It /></G>
              <rect x={470 + i * 300} y={330} width={40} height={300} rx={8} fill={C.paperDark} {...ink} strokeWidth={4} opacity={ramp(frame, t, 6)} />
              <rect x={470 + i * 300} y={330 + 300 * (1 - 0.87)} width={40} height={300 * 0.87 * ramp(frame, t + 4, 10)} rx={8} fill={C.green} opacity={ramp(frame, t, 6)} />
              <rect x={518 + i * 300} y={330} width={40} height={300 * ramp(frame, t + 8, 10)} rx={8} fill={C.red} opacity={ramp(frame, t, 6)} />
            </g>
          );
        })}
        <Stat x={1280} y={560} text="13%" caption="AVERAGE GAP" color={C.red} t={pop(frame, fps, t13, 10)} />
        <Sam x={P.right} flip seed={61} start={{mouth: 'flat'}} keys={[{f: t13, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="thud" at={t13} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s54 — The whole cart came out about 7% different. */
export const S54: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCart = at('whole cart');
  const t7 = at('seven percent');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={720} y={FLOOR} s={pop(frame, fps, tCart - 4, 12)}>
          <Cart>
            <G x={-60} y={-80} s={0.7}><Cereal /></G>
            <G x={40} y={-80} s={0.7}><Pasta /></G>
            <G x={120} y={-80} s={0.7}><PeanutButter /></G>
          </Cart>
        </G>
        <G x={1300} y={520} s={pop(frame, fps, t7 - 4, 12)}><Donut pct={7} t={ramp(frame, t7 - 2, 14)} color={C.red} label="WHOLE CART" /></G>
      </Stage>
      <Sfx name="pop" at={t7} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s55 — Sometimes the sale price stayed the same while the "original" price above it changed. */
export const S55: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSale = at('sale price stayed');
  const tOrig = at('original price');
  const tBig = at('looked bigger');
  const orig = frame >= tOrig + 6 ? '$6.49' : '$5.99';
  const pct = frame >= tOrig + 6 ? 23 : 17;
  return (
    <AbsoluteFill>
      <Stage>
        <G x={900} y={560} s={pop(frame, fps, tSale - 6, 12) * 1.2}>
          <rect x={-230} y={-170} width={460} height={340} rx={16} fill={C.white} {...ink} />
          <text y={-80} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={46} fill={C.grey}>{orig}</text>
          <line x1={-90} y1={-94} x2={90} y2={-94} stroke={C.red} strokeWidth={6} />
          <text y={40} textAnchor="middle" fontFamily={DISPLAY} fontSize={110} fill={C.ink}>$4.99</text>
          <text y={120} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.green}>SALE · STAYS THE SAME</text>
        </G>
        <G x={1300} y={340} s={pop(frame, fps, tOrig + 6, 9) * (1 + 0.15 * ramp(frame, tBig, 8))} r={8}>
          <circle r={100} fill={C.red} {...ink} />
          <text y={20} textAnchor="middle" fontFamily={DISPLAY} fontSize={58} fill={C.white}>-{pct}%</text>
        </G>
        <Arrow x1={1160} y1={420} x2={1050} y2={460} t={ramp(frame, tOrig + 6, 8)} w={6} />
        <Gerald seed={62} start={{mouth: 'smirk'}} keys={[{f: tBig, p: {...SHRUG, mouth: 'grin'}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tOrig + 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s56 — 7% doesn't sound like much; for a family of four it's a swing of about $1,200 a year. */
export const S56: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMuch = at("doesn't sound like much");
  const tFam = at('family of four');
  const t1200 = at('twelve hundred');
  const fam = ['sam', 'friend', 'local', 'vendor'] as const;
  return (
    <AbsoluteFill>
      <Stage>
        <G x={520} y={330} s={pop(frame, fps, 0, 10) * (1 - 0.3 * ramp(frame, tMuch, 8))} r={-6}><Tag text="7%" color={C.yellow} w={tagW('7%')} /></G>
        {fam.map((w, i) => (
          <Actor key={w} who={w} x={420 + i * 170} y={FLOOR} s={i < 2 ? 0.55 : 0.4} seed={63 + i} enter={tFam + i * 3} start={{lookX: 1, mouth: 'smile'}} />
        ))}
        <Stat x={1360} y={560} text={'$' + Math.round(1200 * ramp(frame, t1200 - 8, 16)).toLocaleString('en-US')} caption="A YEAR" color={C.red} t={pop(frame, fps, t1200 - 10, 12)} size={170} />
      </Stage>
      <Sfx name="cash" at={t1200} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s57 — Instacart: random price tests, differences negligible; it doesn't say it prices on who you are. */
export const S57: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tAns = at("instacart's answer");
  const tRand = at('random price tests');
  const tNeg = at('negligible');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1240} y={headTop() - 150} s={pop(frame, fps, tRand - 4, 11)}><Bubble text={'Random price tests.\nNegligible differences.'} tail="right" size={38} /></G>
        <SLabel text="INSTACART SAYS" x={1240} y={headTop() - 300} start={tAns} size={28} color={C.grey} />
        <G x={760} y={600} s={pop(frame, fps, tRand, 12) * 0.8}><FlipCoin t={frame / 20} /></G>
        <Gerald seed={67} start={{mouth: 'smile', ...REST}} keys={[{f: tNeg, p: {...SHRUG, mouth: 'smile', brows: 'raised'}, d: 8}]} />
        <Sam seed={68} start={{mouth: 'flat', brows: 'oneUp', ...CROSS}} />
      </Stage>
      <Sfx name="pop" at={tRand} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s58 — Your data or a coin flip, somebody in that test is paying more for peanut butter. */
export const S58: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tData = at('your data');
  const tCoin = at('coin flip');
  const tPb = at('paying more');
  return (
    <AbsoluteFill>
      <Headline text="Data or coin flip: *someone pays more*" start={tPb - 6} y={TOP} size={68} stagger={2} />
      <Stage>
        <G x={600} y={520} s={pop(frame, fps, tData, 11) * 0.8}><Badge2 icon="eye" color={C.magenta} label="YOUR DATA" labelSize={34} /></G>
        <text x={830} y={540} textAnchor="middle" fontFamily={DISPLAY} fontSize={56} fill={C.ink} opacity={ramp(frame, tCoin - 4, 6)}>OR</text>
        <G x={1060} y={520} s={pop(frame, fps, tCoin, 11) * 0.9}><FlipCoin t={frame / 18} /></G>
        <G x={1450} y={640} s={pop(frame, fps, tPb, 11) * 1.1}><PeanutButter /></G>
        <G x={1560} y={460} s={pop(frame, fps, tPb + 6, 10) * 0.7} r={10}><Tag text="PAYS MORE" color={C.red} w={tagW('PAYS MORE')} /></G>
        <Friend x={P.left} seed={69} start={{mouth: 'smile'}} />
      </Stage>
      <Sfx name="cash" at={tPb + 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s59 — And they have no idea they're in a test. */
export const S59: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tIdea = at('no idea');
  return (
    <AbsoluteFill>
      <Stage>
        <Friend x={960} s={0.85} seed={69} start={{mouth: 'smile', rShoulder: -55, rElbow: -70}} rHand={<HeldPhone />} />
        <G x={1160} y={headTop(0.85) - 20} s={pop(frame, fps, tIdea, 10) * 0.75} r={10}><Tag text="TEST GROUP B" color={C.yellow} w={tagW('TEST GROUP B')} /></G>
        <Gerald x={1600} seed={70} start={{mouth: 'grin', brows: 'smug', rShoulder: -40, rElbow: -100}} rHand={<Magnifier r={30} />} />
      </Stage>
      <Sfx name="pop" at={tIdea} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s60 — How did we end up here? Prices used to be a number on a sticker. */
export const S60: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSt = at('sticker');
  return (
    <AbsoluteFill>
      <Headline text="Prices used to be a *sticker*" start={tSt - 8} y={TOP} size={80} stagger={2} hl={C.yellow} />
      <Stage>
        <G x={960} y={570} s={pop(frame, fps, tSt, 10) * 1.6} r={-8}><Sticker price="$3" /></G>
        <Sam seed={71} start={{mouth: 'smile'}} />
      </Stage>
      <Sfx name="pop" at={tSt} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s61 — Everyone saw the same number. That's changing, one screen at a time. */
export const S61: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSame = at('everyone saw the same number');
  const tScreen = at('one screen at a time');
  const who = ['sam', 'friend', 'local', 'vendor'] as const;
  return (
    <AbsoluteFill>
      <Stage>
        {who.map((w, i) => {
          const sw = ramp(frame, tScreen + i * 8, 6);
          return (
            <g key={w}>
              <Actor who={w} x={480 + i * 320} y={FLOOR} s={0.5} seed={72 + i} start={{lookX: 0, mouth: 'smile'}} />
              <G x={480 + i * 320} y={360} s={pop(frame, fps, tSame + i * 2, 11) * 0.55}>
                {sw < 0.5 ? <Sticker price="$3" /> : <ShelfLabel price={['$3.29', '$2.89', '$3.49', '$3.09'][i]} digital />}
              </G>
            </g>
          );
        })}
      </Stage>
      {who.map((w, i) => (
        <Sfx key={w} name="click" at={tScreen + i * 8} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s62 — Uber used a simple formula: base fare, per minute, per mile. Like a taxi meter. */
export const S62: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tF = at('simple formula');
  const parts: [string, number][] = [
    ['BASE FARE', at('base fare')],
    ['+ PER MINUTE', at('per minute')],
    ['+ PER MILE', at('per mile')],
  ];
  const tTaxi = at('taxi meter');
  return (
    <AbsoluteFill>
      <Headline text="A simple *formula*" start={tF} y={TOP} size={80} hl={C.green} />
      <Stage>
        {parts.map(([p, t], i) => (
          <G key={p} x={560 + i * 420} y={400} s={pop(frame, fps, t, 11) * 0.6}><Tag text={p} color={[C.cyan, C.yellow, C.green][i]} w={tagW(p)} /></G>
        ))}
        <G x={960} y={720} s={pop(frame, fps, tTaxi, 12)}>
          <TaxiMeter value={'$' + (4 + ((frame - tTaxi) > 0 ? (frame - tTaxi) * 0.05 : 0)).toFixed(2)} />
        </G>
        <Sam seed={76} start={{mouth: 'smile'}} keys={[{f: tTaxi, p: {mouth: 'smile', brows: 'raised'}, d: 6}]} />
      </Stage>
      {parts.map(([p, t]) => (
        <Sfx key={p} name="pop" at={t} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s63 — Then upfront pricing: just a number, and you don't get to see how it's calculated. */
export const S63: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tUp = at('upfront pricing');
  const tNum = at('shows you a number');
  const tCalc = at('calculated');
  return (
    <AbsoluteFill>
      <Headline text="*Upfront* pricing" start={tUp} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        <G x={760} y={570} s={pop(frame, fps, tNum - 4, 12) * 0.85}>
          <Phone>
            <text y={-60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink}>Your ride</text>
            <text y={60} textAnchor="middle" fontFamily={DISPLAY} fontSize={96} fill={C.ink}>$24</text>
          </Phone>
        </G>
        <G x={1260} y={570} s={pop(frame, fps, tCalc - 4, 12)}>
          <rect x={-200} y={-160} width={400} height={320} rx={24} fill={C.ink} {...ink} />
          <text y={50} textAnchor="middle" fontFamily={DISPLAY} fontSize={190} fill={C.yellow}>?</text>
          <text y={135} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.white}>HOW IT'S CALCULATED</text>
        </G>
        <Gerald seed={77} start={{mouth: 'smirk', ...CROSS}} />
      </Stage>
      <Sfx name="pop" at={tNum} volume={0.3} />
      <Sfx name="thud" at={tCalc} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s64 — From 2018 to 2022, average Uber fares rose 83% (data Business Insider found). */
export const S64: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t18 = at('2018');
  const t22 = at('2022');
  const t83 = at('eighty-three');
  const tBi = at('business insider');
  const base = 280;
  return (
    <AbsoluteFill>
      <Headline text="Average fares: *+83%*" start={t83 - 4} y={TOP} size={84} hl={C.red} />
      <Stage>
        <line x1={640} y1={860} x2={1340} y2={860} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <G x={780} y={860}><Bar h={base * ramp(frame, t18 - 4, 12)} w={200} color={C.cyan} label="2018" /></G>
        <G x={1180} y={860}><Bar h={base * 1.83 * ramp(frame, t22 - 4, 16)} w={200} color={C.red} label="2022" /></G>
        <G x={1180} y={860 - base * 1.83 - 70} s={pop(frame, fps, t83, 10) * 0.75} r={-6}><Stamp text="+83%" color={C.red} /></G>
        <Sam seed={78} start={{mouth: 'flat'}} keys={[{f: t83, p: {...SHOCK}, d: 6, ease: 'out'}]} />
        <SourceTag text="SOURCE: BUSINESS INSIDER" start={tBi} />
      </Stage>
      <Sfx name="thud" at={t83} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s65 — Uber points to inflation, insurance, driver shortage. In 2023 it posted its first yearly profit. */
export const S65: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number][] = [
    ['dollar', 'INFLATION', C.yellow, at('inflation')],
    ['clock', 'INSURANCE', C.cyan, at('insurance')],
    ['walk', 'FEWER DRIVERS', C.green, at('shortage of drivers')],
  ];
  const tProfit = at('first ever yearly profit');
  return (
    <AbsoluteFill>
      <Stage>
        {items.map(([ic, label, c, t], i) => (
          <G key={label} x={560 + i * 300} y={440} s={pop(frame, fps, t, 11) * 0.8}><Badge2 icon={ic} color={c} label={label} labelSize={32} /></G>
        ))}
        <G x={860} y={780} s={pop(frame, fps, tProfit, 9) * 0.75} r={-5}><Stamp text="2023: FIRST YEARLY PROFIT" color={C.green} /></G>
        <SLabel text="UBER SAYS" x={P.right} y={headTop() - 60} start={items[0][3] - 6} size={26} color={C.grey} />
        <Gerald seed={79} start={{mouth: 'smile', ...SHRUG}} keys={[{f: tProfit, p: {...{lShoulder: 155, lElbow: -25, rShoulder: -155, rElbow: 25}, mouth: 'grin'}, d: 8, ease: 'out'}]} emotes={[{f: tProfit + 4, kind: 'sparkle', d: 40}]} />
      </Stage>
      {items.map(([, label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.25} />
      ))}
      <Sfx name="cash" at={tProfit} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s66 — Airlines too: Delta uses an AI system from Fetcherr on part of its domestic flights. */
export const S66: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tAir = at('airlines');
  const tFetch = at('fetcherr');
  const tDom = at('domestic flights');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={lerp(frame, [tAir - 6, tDom + 20], [600, 900])} y={420} s={pop(frame, fps, tAir - 6, 12) * 1.05} r={-6}><Plane /></G>
        <G x={1400} y={720} s={pop(frame, fps, tFetch, 11) * 0.9}>
          <rect x={-170} y={-90} width={340} height={180} rx={20} fill={C.ink} {...ink} />
          <text y={-10} textAnchor="middle" fontFamily={DISPLAY} fontSize={56} fill={C.cyan}>AI</text>
          <text y={50} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.white}>FARE SETTER</text>
        </G>
        <SLabel text="DELTA · FETCHERR" x={1400} y={820} start={tFetch} size={30} />
        <Gerald x={P.left} flip={false} seed={80} start={{mouth: 'grin', lookX: 1}} keys={[{f: tFetch, p: {...POINT, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="whoosh" at={tAir} volume={0.3} />
      <Sfx name="pop" at={tFetch} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s67 — It started around 1%; Delta wanted 20% by the end of 2025. */
export const S67: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t1 = at('one percent');
  const t20 = at('twenty percent');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={700} y={540} s={pop(frame, fps, t1 - 4, 12) * 0.9}><Donut pct={1} t={ramp(frame, t1, 10)} color={C.cyan} label="AT THE START" /></G>
        <Arrow x1={900} y1={540} x2={1060} y2={540} t={ramp(frame, t20 - 6, 8)} w={12} />
        <G x={1260} y={540} s={pop(frame, fps, t20 - 4, 12) * 0.9}><Donut pct={20} t={ramp(frame, t20, 16)} color={C.magenta} label="GOAL: END 2025" /></G>
        <SLabel text="SHARE OF DELTA'S DOMESTIC FARES" x={980} y={170} start={t1} size={34} />
      </Stage>
      <Sfx name="pop" at={t20} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s68 — Delta says the system uses demand, dates and fuel prices, not your personal data. */
export const S68: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const items: [Icon2, string, string, number][] = [
    ['walk', 'DEMAND', C.green, at('demand')],
    ['clock', 'DATES', C.cyan, at('dates')],
    ['dollar', 'FUEL', C.yellow, at('fuel prices')],
  ];
  const tNot = at('not your personal data');
  return (
    <AbsoluteFill>
      <Stage>
        {items.map(([ic, l, c, t], i) => (
          <G key={l} x={520 + i * 260} y={480} s={pop(frame, fps, t, 11) * 0.75}><Badge2 icon={ic} color={c} label={l} labelSize={34} /></G>
        ))}
        <G x={1300} y={480} s={pop(frame, fps, tNot, 11) * 0.75}>
          <Badge2 icon="eye" color={C.magenta} label="YOUR DATA" labelSize={34} />
          <line x1={-90} y1={-90} x2={90} y2={90} stroke={C.red} strokeWidth={16} strokeLinecap="round" />
        </G>
        <SLabel text="DELTA SAYS" x={P.right} y={headTop() - 60} start={items[0][3] - 6} size={26} color={C.grey} />
        <Gerald seed={81} start={{mouth: 'smile'}} keys={[{f: tNot, p: {...SHRUG, mouth: 'smile', brows: 'raised'}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tNot} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s69 — Three US senators wrote to Delta: AI could push fares to your personal pain point, e.g. a funeral. */
export const S69: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSen = at('three us senators');
  const tPain = at('pain point');
  const tFun = at('funeral');
  const needle = lerp(frame, [tPain - 6, tPain + 20], [-70, 62]);
  return (
    <AbsoluteFill>
      <Stage>
        {[0, 1, 2].map((i) => (
          <Actor key={i} who="senator" x={300 + i * 150} y={FLOOR} s={0.5} seed={82 + i} enter={tSen + i * 3} start={{lookX: 1, mouth: 'flat', brows: 'angry', ...CROSS}} />
        ))}
        <G x={460} y={headTop(0.5) - 80} s={pop(frame, fps, tSen + 10, 11) * 0.5} r={-6}><Contract title="DEAR DELTA" sign={1} /></G>
        <G x={1120} y={700} s={pop(frame, fps, tPain - 8, 12)}>
          <path d="M-260,0 A260,260 0 0 1 260,0" fill="none" stroke={C.paperDark} strokeWidth={50} />
          <path d="M-260,0 A260,260 0 0 1 260,0" fill="none" stroke={C.red} strokeWidth={50} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - (needle + 90) / 180} />
          <g transform={`rotate(${needle})`}><line x1={0} y1={0} x2={0} y2={-230} stroke={C.ink} strokeWidth={14} strokeLinecap="round" /></g>
          <circle r={26} fill={C.yellow} {...ink} />
          <text y={80} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink}>YOUR PAIN POINT</text>
        </G>
        <G x={1560} y={300} s={pop(frame, fps, tFun, 11) * 0.7} r={6}><Tag text="FUNERAL FLIGHT" color={C.grey} w={tagW('FUNERAL FLIGHT')} /></G>
        <Sam x={P.right} flip seed={85} start={{mouth: 'flat'}} keys={[{f: tFun, p: {mouth: 'frown', brows: 'sad', headTilt: 8}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tSen} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s70 — In stores the paper price tag is disappearing: Walmart is putting digital labels on shelves. */
export const S70: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPaper = at('paper price tag');
  const tDig = at('digital labels');
  const sw = ramp(frame, tDig, 8);
  return (
    <AbsoluteFill>
      <Stage>
        <rect x={420} y={640} width={1080} height={24} fill="#B07A3E" {...ink} />
        {[0, 1, 2, 3].map((i) => (
          <G key={i} x={560 + i * 270} y={560} s={0.9 + wobble(frame + i * 8, 0.02, 0.3)}>{[Cereal, Pasta, PeanutButter, Cereal].map((It, k) => (k === i ? <It key={k} /> : null))}</G>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <G key={i} x={560 + i * 270} y={730} s={0.62} o={1}>
            {sw < 0.5 ? <ShelfLabel price={['$3.99', '$1.49', '$4.29', '$3.99'][i]} /> : <ShelfLabel price={['$3.99', '$1.49', '$4.29', '$3.99'][i]} digital />}
          </G>
        ))}
        <SLabel text="PAPER TAGS" x={960} y={850} start={tPaper} size={34} color={C.grey} />
        <SLabel text="NOW: DIGITAL LABELS" x={960} y={900} start={tDig} size={34} color={C.magenta} />
        <Gerald seed={86} start={{mouth: 'grin'}} />
      </Stage>
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="click" at={tDig + i * 2} volume={0.22} />
      ))}
    </AbsoluteFill>
  );
};

/* s71 — Already in about 2,300 stores; every US store planned by the end of 2026. */
export const S71: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t2300 = at('already in');
  const tEvery = at('every us store');
  const n = Math.round(lerp(frame, [t2300, t2300 + 24], [0, 40]));
  return (
    <AbsoluteFill>
      <Stage>
        <Stat x={700} y={560} text={(Math.round(2300 * ramp(frame, t2300, 24) / 10) * 10).toLocaleString('en-US')} caption="STORES ALREADY" color={C.magenta} size={170} t={pop(frame, fps, t2300 - 4, 12)} />
        {Array.from({length: n}).map((_, i) => (
          <G key={i} x={1120 + (i % 8) * 80} y={330 + Math.floor(i / 8) * 90} s={0.08}><StoreFront name="" color={C.cyan} /></G>
        ))}
        <G x={1400} y={860} s={pop(frame, fps, tEvery, 10) * 0.6} r={-5}><Stamp text="ALL US STORES BY 2026" color={C.red} /></G>
      </Stage>
      <Sfx name="pop" at={tEvery} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s72 — This year it was granted patents for systems that update prices automatically. */
export const S72: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPat = at('granted patents');
  const tAuto = at('automatically');
  const prices = ['$3.99', '$4.19', '$3.79', '$4.49', '$4.09'];
  const p = frame >= tAuto ? prices[Math.floor((frame - tAuto) / 6) % prices.length] : prices[0];
  return (
    <AbsoluteFill>
      <Stage>
        <G x={700} y={560} s={pop(frame, fps, tPat - 4, 12) * 0.85} r={-4} shadow><Contract title="PATENT GRANTED" sign={1} seal={pop(frame, fps, tPat + 8, 10)} /></G>
        <G x={1260} y={560} s={pop(frame, fps, tAuto - 6, 12) * 1.3}><ShelfLabel price={p} digital flicker={frame >= tAuto && (frame - tAuto) % 6 < 2 ? 1 : 0} /></G>
        <SLabel text="UPDATES ITSELF" x={1260} y={700} start={tAuto} size={34} />
      </Stage>
      <Sfx name="pop" at={tPat} volume={0.28} />
    </AbsoluteFill>
  );
};

/* s73 — Walmart says a human manager approves every change, and it won't personalize prices. */
export const S73: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMgr = at('human manager');
  const tApp = at('approve every price change');
  const tWont = at("won't personalize");
  return (
    <AbsoluteFill>
      <Stage>
        <G x={980} y={500} s={pop(frame, fps, tApp - 4, 12) * 1.2}><ShelfLabel price="$4.09" digital /></G>
        <G x={1120} y={420} s={pop(frame, fps, tApp + 6, 10)}>
          <circle r={36} fill={C.green} {...ink} strokeWidth={5} />
          <path d="M-16,0 L-4,12 L18,-12" fill="none" stroke={C.white} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <G x={1160} y={800} s={pop(frame, fps, tWont, 9) * 0.6} r={-5}><Stamp text="NO PERSONAL PRICES" color={C.grey} /></G>
        <Actor who="local" x={600} y={FLOOR} s={0.62} seed={87} enter={tMgr - 4} start={{lookX: 1, mouth: 'smile'}} keys={[{f: tApp, p: {...POINT, mouth: 'smile'}, d: 7, ease: 'out'}]} />
        <SLabel text="MANAGER" x={600} y={headTop() - 60} start={tMgr} size={28} />
        <SLabel text="WALMART SAYS" x={P.right} y={headTop() - 60} start={0} size={26} color={C.grey} />
        <Gerald seed={88} start={{mouth: 'smile', ...REST}} />
      </Stage>
      <Sfx name="ding" at={tApp + 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s74 — Nobody says they're doing it. But the screens are going up and the patents are filed. */
export const S74: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNo = at('nobody says');
  const tScr = at('screens are going up');
  const tPat = at('patents are filed');
  return (
    <AbsoluteFill>
      <Headline text="Nobody says they're *doing it.*" start={tNo} y={TOP} size={76} stagger={2} />
      <Stage>
        {[0, 1, 2, 3, 4].map((i) => (
          <G key={i} x={460 + i * 170} y={720 - i * 40} s={pop(frame, fps, tScr + i * 3, 11) * 0.5}><ShelfLabel price="$?.??" digital /></G>
        ))}
        {[0, 1, 2].map((i) => (
          <G key={i} x={1300 + i * 70} y={600 + i * 30} s={pop(frame, fps, tPat + i * 4, 11) * 0.5} r={-8 + i * 8}><Contract title="PATENT" sign={1} /></G>
        ))}
        <Gerald seed={89} start={{mouth: 'smirk', brows: 'smug', ...CROSS}} />
        <Sam seed={90} start={{mouth: 'flat', brows: 'oneUp'}} />
      </Stage>
      <Sfx name="click" at={tScr} volume={0.25} />
      <Sfx name="pop" at={tPat} volume={0.25} />
    </AbsoluteFill>
  );
};
