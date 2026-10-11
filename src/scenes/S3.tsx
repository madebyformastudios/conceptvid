import React from 'react';
import {AbsoluteFill, spring} from 'remotion';
import {C, DISPLAY, MONO, BODY} from '../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../anim';
import {Headline, Label, Stage, Sfx} from '../components/Frame';
import {G, Printer, Cartridge, Stamp, Dialog, Coin, Parcel, Tag, Cursor, Bottle, Arrow} from '../components/Art';
import {Actor} from '../characters/Actor';
import {Flute, Magnifier, Scroll} from '../characters/Props';
import {TOP, FLOOR, PRESENTER} from './layout';

const P = PRESENTER;

/* s21 — The all-in-one refuses to scan */
export const S21: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tScan = at('refusing to scan');
  const tLow = at('ink is low');
  const tZero = at('zero ink');
  const lid = ramp(frame, at('all-in-one'), 12);
  const scanY = lerp((frame % 36) / 36, [0, 0.5, 1], [-150, -70, -150]);
  const low = frame >= tLow;
  return (
    <AbsoluteFill>
      <Headline text="Refusing to *scan*" start={tScan} y={TOP} size={84} />
      <Stage>
        <G x={720} y={780} s={pop(frame, fps, at('all-in-one')) * 0.78} shadow>
          <g transform={`translate(0 -160) rotate(${-lid * 26} -250 0)`}>
            <rect x={-250} y={-26} width={500} height={26} rx={8} fill={C.paperDark} stroke={C.ink} strokeWidth={7} />
          </g>
          <Printer screen={low ? 'INK LOW' : 'SCAN'} screenColor={low ? C.red : C.cyan} blink={low} frame={frame} />
          {frame > tScan && !low && <rect x={-240} y={scanY} width={480} height={10} fill={C.cyan} opacity={0.85} />}
        </G>
        <G x={720} y={400} s={pop(frame, fps, tLow, 10) * 0.56} r={-3} shadow>
          <Dialog title="scanner" msg="Can't scan: ink low" color={C.red} w={680} />
        </G>
        <G x={1430} y={650} s={pop(frame, fps, tZero, 10) * 0.85}>
          <rect x={-230} y={-210} width={460} height={420} rx={30} fill={C.white} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(10px 10px 0 ${C.ink})`}} />
          <text y={-135} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.grey}>INK USED BY SCANNING</text>
          <text y={60} textAnchor="middle" fontFamily={DISPLAY} fontSize={200} fill={C.cyan} stroke={C.ink} strokeWidth={6}>0</text>
          <text y={150} textAnchor="middle" fontFamily={DISPLAY} fontSize={56} fill={C.ink}>mL</text>
        </G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={21}
          start={{lookX: 1}}
          keys={[
            {f: tScan, p: {rShoulder: -100, rElbow: 0, mouth: 'smile'}, d: 8},
            {f: tLow, p: {mouth: 'flat', brows: 'oneUp', rShoulder: -12, rElbow: 6}, d: 8},
            {f: tZero, p: {mouth: 'frown', brows: 'angry', lShoulder: 40, lElbow: -120, rShoulder: -40, rElbow: 120}, d: 8},
          ]}
          emotes={[{f: tLow + 4, kind: '?', d: 40}]}
        />
      </Stage>
      <Sfx name="error" at={tLow} volume={0.45} />
      <Sfx name="pop" at={tZero} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s22 — The car radio analogy */
export const S22: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tRadio = at('radio');
  const tFuel = at('fuel');
  const fuel = lerp(frame, [0, tFuel], [10, -52]);
  const no = frame >= tRadio;
  const blink = frame > at('low on') && Math.floor(frame / 8) % 2 === 0;
  return (
    <AbsoluteFill>
      <Headline text="Like a car that won't play the *radio*… because you're low on fuel." start={at("that's")} y={TOP} size={64} width={1500} stagger={2} />
      <Stage>
        <G x={860} y={700} s={pop(frame, fps, at("that's"), 16) * 0.95}>
          <path d="M-620,-200 Q0,-290 620,-200 L620,240 L-620,240 Z" fill={C.ink} />
          <G x={-330} y={40}>
            <circle r={160} fill={C.white} stroke={C.paperDark} strokeWidth={12} />
            <text x={-100} y={58} fontFamily={DISPLAY} fontSize={42} fill={C.red}>E</text>
            <text x={74} y={58} fontFamily={DISPLAY} fontSize={42} fill={C.ink}>F</text>
            <g transform={`rotate(${fuel})`}><line x1={0} y1={0} x2={0} y2={-120} stroke={C.red} strokeWidth={12} strokeLinecap="round" /></g>
            <circle r={20} fill={C.ink} />
            <rect x={-28} y={84} width={56} height={46} rx={8} fill={blink ? C.yellow : C.paperDark} />
          </G>
          <G x={250} y={40}>
            <rect x={-300} y={-140} width={600} height={280} rx={24} fill={C.paperDark} stroke={C.white} strokeWidth={6} />
            <rect x={-250} y={-100} width={500} height={110} rx={10} fill={C.ink} />
            <text y={-28} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={40} fill={no ? C.red : C.green}>{no ? 'LOW FUEL: NO RADIO' : '♪ FM 101.4'}</text>
            {[-150, 0, 150].map((x) => <circle key={x} cx={x} cy={80} r={32} fill={C.white} stroke={C.ink} strokeWidth={6} />)}
          </G>
        </G>
        <Actor who="sam" x={P.right} y={FLOOR} s={P.s} flip seed={22}
          start={{lookX: 1, mouth: 'flat'}}
          keys={[{f: tRadio, p: {lShoulder: 100, lElbow: 0, brows: 'oneUp'}, d: 8}, {f: tFuel, p: {lShoulder: 50, lElbow: -120, rShoulder: -50, rElbow: 120, mouth: 'flat'}, d: 8}]}
        />
      </Stage>
      <Sfx name="error" at={tRadio} volume={0.4} />
    </AbsoluteFill>
  );
};

const Factory: React.FC = () => (
  <G y={10} s={0.8}>
    <path d="M-130,90 V-20 L-60,-60 V-20 L10,-60 V-20 L80,-60 V-110 h40 V90 Z" fill={C.magenta} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-90, -20, 50].map((x) => <rect key={x} x={x} y={10} width={40} height={40} fill={C.yellow} stroke={C.ink} strokeWidth={5} />)}
  </G>
);

/* s23 — The final form: ink subscriptions */
export const S23: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tForm = at('final form');
  const tPay = at('pay monthly');
  const tConv = at('convenient');
  const cx = 800;
  const cy = 640;
  const R = 250;
  const nodes = [
    {a: -90, t: tPay, label: 'You pay monthly', el: <Coin s={1.3} />},
    {a: 0, t: at('tells the company'), label: 'Printer reports in', el: <Printer s={0.36} screen="LOW" screenColor={C.yellow} />},
    {a: 90, t: at('arrives'), label: 'Ink arrives by mail', el: <Parcel s={0.7} />},
    {a: 180, t: at('running low'), label: 'They ship more', el: <Factory />},
  ];
  const spin = ramp(frame, tPay, 60) * 360 + frame * 0.6;
  return (
    <AbsoluteFill>
      <Headline text="The final form: *ink subscriptions*" start={tForm} y={TOP} size={76} hl={C.cyan} />
      <Stage>
        <G x={cx} y={cy} r={spin} o={ramp(frame, tPay, 10)}>
          <circle r={R} fill="none" stroke={C.ink} strokeWidth={8} strokeDasharray="30 26" />
        </G>
        {nodes.map((n, i) => {
          const p = pop(frame, fps, n.t);
          const rad = (n.a * Math.PI) / 180;
          const x = cx + Math.cos(rad) * R;
          const y = cy + Math.sin(rad) * R;
          const right = n.a !== 180;
          return (
            <g key={i}>
              <G x={x} y={y} s={p}>
                <circle r={95} fill={C.white} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(8px 8px 0 ${C.ink})`}} />
                {n.el}
              </G>
              <text x={right ? x + 120 : x - 120} y={y + 12} textAnchor={right ? 'start' : 'end'} fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink} opacity={p}>{n.label}</text>
            </g>
          );
        })}
        <G x={cx} y={cy} s={pop(frame, fps, tConv, 8) * 0.5} r={-6}><Stamp text="CONVENIENT!" color={C.green} /></G>
        <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip seed={23}
          start={{lookX: 1, mouth: 'grin', brows: 'smug', lShoulder: 150, lElbow: 20}}
          keys={[{f: tPay, p: {lShoulder: 100, lElbow: 0, mouth: 'smirk'}, d: 10}]}
          lHand={frame < tPay ? <g transform="scale(0.5) translate(0 -60)"><Scroll text="SUBSCRIPTION" glow={0.7 + Math.sin(frame * 0.3) * 0.3} /></g> : undefined}
          talk={[[tPay, at('arrives') + 20]]}
        />
      </Stage>
      <Sfx name="thud" at={tForm} volume={0.55} />
      <Sfx name="ding" at={at('arrives')} volume={0.35} />
      <Sfx name="thud" at={tConv} volume={0.5} />
    </AbsoluteFill>
  );
};

/* s24 — Cancel, and the ink stops working */
export const S24: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCancel = at('cancel');
  const click = tCancel + 6;
  const pressed = frame >= click && frame < click + 6;
  const cancelled = frame >= click;
  const tStop = at('stop working');
  const grey = ramp(frame, tStop, 12);
  const tOwned = at('never owned');
  const tRent = at('renting');
  return (
    <AbsoluteFill>
      <Headline text="You never *owned* it." start={tOwned} y={TOP} size={84} />
      <Stage>
        <G x={760} y={420} s={pop(frame, fps, tCancel - 4) * (pressed ? 0.93 : 1) * 0.85} shadow>
          <rect x={-300} y={-70} width={600} height={140} rx={70} fill={cancelled ? C.grey : C.red} stroke={C.ink} strokeWidth={7} />
          <text textAnchor="middle" y={20} fontFamily={DISPLAY} fontSize={52} fill={C.white}>{cancelled ? 'CANCELLED' : 'CANCEL PLAN'}</text>
        </G>
        <Cursor x={lerp(frame, [tCancel - 4, click], [1000, 800])} y={lerp(frame, [tCancel - 4, click], [640, 430])} s={pop(frame, fps, tCancel - 4) * (1 - ramp(frame, click + 16, 8))} press={pressed} />
        <G x={1260} y={640} s={pop(frame, fps, tCancel) * 1.05}>
          <g style={{filter: `grayscale(${grey})`}}><Cartridge color={C.cyan} label="YOUR INK" xray={grey} level={0.8} /></g>
        </G>
        <G x={1260} y={640} s={pop(frame, fps, tStop, 9) * 0.85}>
          <path d="M-70,0 v-60 a70,70 0 0 1 140,0 v60" fill="none" stroke={C.ink} strokeWidth={22} />
          <rect x={-110} y={-10} width={220} height={170} rx={22} fill={C.yellow} stroke={C.ink} strokeWidth={8} />
          <circle cy={60} r={20} fill={C.ink} />
          <rect x={-8} y={60} width={16} height={50} fill={C.ink} />
        </G>
        <G x={1260} y={900} s={pop(frame, fps, tRent, 9) * 0.65} r={-6}><Stamp text="RENTED" color={C.red} /></G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={24}
          start={{lookX: 1, mouth: 'smile'}}
          keys={[
            {f: tStop, p: {mouth: 'o', brows: 'raised', lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80}, d: 6, ease: 'out'},
            {f: tRent, p: {mouth: 'frown', brows: 'sad', lShoulder: 12, lElbow: -6, rShoulder: -12, rElbow: 6, headTilt: 10}, d: 10},
          ]}
          emotes={[{f: tStop + 4, kind: '!', d: 30}]}
        />
        <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip seed={25} enter={tOwned}
          start={{lookX: 1, mouth: 'smirk', brows: 'smug', lShoulder: 40, lElbow: -100, rShoulder: -40, rElbow: 100}}
        />
      </Stage>
      <Sfx name="click" at={click} volume={0.7} />
      <Sfx name="thud" at={tRent} volume={0.6} />
    </AbsoluteFill>
  );
};

/* s25 — Price on the box vs. the next five years */
export const S25: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const water = 620;
  const ice = ramp(frame, at('because'), 18);
  const tBox = at('price on the box');
  const tYears = at('not the price');
  return (
    <AbsoluteFill>
      <Headline text="Why does this keep working?" start={at('so why')} y={TOP} size={76} />
      <Stage>
        <rect x={0} y={water} width={1920} height={560} fill={C.cyan} opacity={0.2} />
        <path d={`M0,${water} ${Array.from({length: 25}).map((_, i) => `Q${i * 80 + 40},${water + (i % 2 ? 12 : -12) + wobble(frame + i * 10, 4, 0.1)} ${(i + 1) * 80},${water}`).join(' ')}`} fill="none" stroke={C.ink} strokeWidth={6} />
        <G x={900} y={water} s={ice}>
          <path d="M-170,0 L-80,-180 L40,-210 L170,0 Z" fill={C.white} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
          <path d="M-170,0 L-420,180 L-360,380 L-60,440 L330,400 L440,200 L170,0 Z" fill="#CDEFF7" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
        </G>
        {Array.from({length: 10}).map((_, i) => (
          <G key={i} x={640 + (i % 5) * 130} y={water + 150 + Math.floor(i / 5) * 150} s={pop(frame, fps, tYears + i * 2, 14) * 0.4}>
            <Cartridge color={[C.cyan, C.magenta, C.yellow, C.ink][i % 4]} label="$$" />
          </G>
        ))}
        <G x={640} y={430} s={pop(frame, fps, tBox) * 0.9} r={-6} shadow><Tag text="$49" w={190} /></G>
        <Actor who="sam" x={890} y={water - 196} s={0.3} seed={26} enter={at('because')}
          start={{lookX: 1, lookY: 1, mouth: 'o', brows: 'raised'}}
        />
      </Stage>
      <Label text="the price on the box" x={1460} y={420} start={tBox} size={36} />
      <Label text="the next five years" x={1520} y={840} start={at('five years')} size={36} color={C.magenta} />
      <Sfx name="pop" at={tBox} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s26 — Switching effort, and the brilliant trap */
export const S26: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tNot = at("it's not");
  const tTrap = at('brilliant trap');
  const snap = frame >= tTrap + 4;
  const bars = [
    {label: 'Switch printers', h: 420, c: C.red, t: at('switching'), x: 820},
    {label: 'One more cartridge', h: 80, c: C.green, t: at('buying another'), x: 1240},
  ];
  const fade = 1 - ramp(frame, tNot - 4, 8);
  return (
    <AbsoluteFill>
      <Headline text="Not a bad product. A *brilliant trap.*" start={tNot} y={TOP} size={80} hl={C.magenta} />
      <Stage>
        <g opacity={fade}>
          <text x={1030} y={360} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.grey}>EFFORT</text>
          <line x1={620} y1={FLOOR - 40} x2={1440} y2={FLOOR - 40} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          {bars.map((b) => {
            const g = pop(frame, fps, b.t, 12);
            return (
              <g key={b.label}>
                <rect x={b.x - 110} y={FLOOR - 40 - b.h * g} width={220} height={b.h * g} rx={14} fill={b.c} stroke={C.ink} strokeWidth={7} />
                <text x={b.x} y={FLOOR + 14} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink} opacity={g}>{b.label}</text>
              </g>
            );
          })}
        </g>
        <G x={1180} y={760} s={pop(frame, fps, tNot)}>
          <rect x={-380} y={40} width={760} height={90} rx={14} fill={C.gold} stroke={C.ink} strokeWidth={7} />
          <G x={0} y={-20} s={0.55} r={snap ? 3 : 0}>
            <g transform={`scale(1 ${snap ? 0.82 : 1}) translate(0 ${snap ? 28 : 0})`}><Cartridge color={C.magenta} label="INK" /></g>
          </G>
          {snap ? (
            <path d="M-260,40 L-260,-60 L260,-60 L260,40" fill="none" stroke={C.ink} strokeWidth={16} strokeLinejoin="round" />
          ) : (
            <path d="M-260,40 L-260,30 Q-260,-260 -40,-280 L-30,-250" fill="none" stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
          )}
          <circle cx={-260} cy={40} r={16} fill={C.grey} stroke={C.ink} strokeWidth={6} />
          <circle cx={260} cy={40} r={16} fill={C.grey} stroke={C.ink} strokeWidth={6} />
        </G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={27}
          start={{lookX: 1}}
          keys={[
            {f: at('switching'), p: {rShoulder: -100, rElbow: 0, mouth: 'frown', brows: 'sad'}, d: 8},
            {f: at('buying another'), p: {mouth: 'smile', brows: 'neutral'}, d: 8},
            {f: tNot, p: {x: 350, mouth: 'smile', brows: 'raised', rShoulder: -60, rElbow: 90, lShoulder: 60, lElbow: -90, lean: 6}, d: Math.max(10, tTrap - tNot)},
            {f: tTrap + 4, p: {x: 180, mouth: 'o', lShoulder: 150, rShoulder: -150, lElbow: 30, rElbow: -30, lean: -8, y: -30}, d: 5, ease: 'out'},
            {f: tTrap + 12, p: {y: 0}, d: 8},
          ]}
          emotes={[{f: tTrap + 4, kind: '!'}]}
        />
      </Stage>
      <Sfx name="thud" at={tTrap + 4} volume={0.7} />
    </AbsoluteFill>
  );
};

const Library: React.FC = () => (
  <G y={20}>
    <path d="M-160,-60 L0,-140 L160,-60 Z" fill={C.magenta} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-150} y={-60} width={300} height={170} fill={C.white} stroke={C.ink} strokeWidth={7} />
    {[-110, -55, 0, 55, 110].map((x) => <rect key={x} x={x - 12} y={-45} width={24} height={140} fill={C.paperDark} stroke={C.ink} strokeWidth={4} />)}
    <rect x={-170} y={110} width={340} height={26} fill={C.ink} />
  </G>
);

/* s27 — The way out */
export const S27: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const cards = [
    {title: 'Ink tank', sub: 'Pricier up front. Bottles last ages.', t: at('ink tank'), el: <Bottle kind="ink" color={C.cyan} label="REFILL" s={0.8} />, tint: C.cyan},
    {title: 'Laser', sub: 'Toner: far cheaper per page.', t: at('laser'), el: <Cartridge color={C.ink} label="TONER" s={0.7} chip={false} />, tint: C.yellow},
    {title: 'The library', sub: 'Honestly? Often the best printer.', t: at('library'), el: <Library />, tint: C.magenta},
  ];
  const active = cards.reduce((a, c, i) => (frame >= c.t ? i : a), -1);
  return (
    <AbsoluteFill>
      <Headline text="There is *hope.*" start={at('there is hope')} y={TOP} size={88} hl={C.green} />
      {cards.map((c, i) => {
        const p = pop(frame, fps, c.t);
        return (
          <div key={c.title} style={{position: 'absolute', left: 470 + i * 470, top: 290, width: 420, height: 560, background: C.white, border: `7px solid ${C.ink}`, borderRadius: 28, boxShadow: `12px 12px 0 ${C.ink}`, opacity: p, transform: `translateY(${(1 - p) * 80}px) rotate(${(i - 1) * 1.5}deg) scale(${active === i ? 1.03 : 1})`, overflow: 'hidden'}}>
            <div style={{height: 280, background: c.tint, opacity: 0.25}} />
            <svg width={420} height={280} viewBox="-210 -150 420 280" style={{position: 'absolute', top: 0, left: 0}}>{c.el}</svg>
            <div style={{padding: '22px 30px'}}>
              <div style={{fontFamily: DISPLAY, fontSize: 52, color: C.ink}}>{c.title}</div>
              <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, color: C.ink, opacity: 0.75, marginTop: 10, lineHeight: 1.25}}>{c.sub}</div>
            </div>
          </div>
        );
      })}
      <Stage>
        <Actor who="sam" x={230} y={FLOOR} s={0.58} seed={28}
          start={{lookX: 1, mouth: 'smile'}}
          keys={[
            {f: at('there is hope'), p: {mouth: 'grin', brows: 'raised'}, d: 8},
            {f: cards[0].t, p: {rShoulder: -100, rElbow: 0}, d: 8},
            {f: cards[1].t, p: {rShoulder: -110}, d: 8},
            {f: cards[2].t, p: {rShoulder: -125, lShoulder: 150, lElbow: 20}, d: 8, ease: 'out'},
          ]}
          emotes={[{f: cards[2].t + 4, kind: 'sparkle'}]}
        />
      </Stage>
      {cards.map((c) => <Sfx key={c.title} name="pop" at={c.t} volume={0.4} />)}
    </AbsoluteFill>
  );
};

/* s28 — Follow the money */
export const S28: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCheap = at('suspiciously');
  const tAsk = at('ask');
  const tMoney = at('money');
  const fine = ramp(frame, tAsk, 12);
  return (
    <AbsoluteFill>
      <Headline text="Suspiciously *cheap?* Ask where the *money* comes from." start={at('when something')} y={TOP} size={66} width={1500} stagger={3} />
      <Stage>
        <G x={430} y={560} s={pop(frame, fps, tCheap) * 1.3} r={-6} shadow><Tag text="$49" w={230} /></G>
        <text x={430} y={720} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={lerp(fine, [0, 1], [12, 30])} fill={C.magenta} opacity={fine}>*ink sold separately. forever.</text>
        <Actor who="sam" x={820} y={FLOOR} s={0.66} flip seed={29}
          start={{lookX: 1, mouth: 'flat', brows: 'angry'}}
          keys={[{f: tAsk, p: {lShoulder: 95, lElbow: -10}, d: 8}, {f: tMoney, p: {lShoulder: 30, lElbow: -20, lookX: -1, mouth: 'o'}, d: 8}]}
          lHand={frame >= tAsk - 2 ? <Magnifier r={-80} /> : undefined}
        />
        <Arrow x1={980} y1={720} x2={1430} y2={720} t={ramp(frame, tMoney, 18)} color={C.green} w={14} />
        {frame > tMoney &&
          [0, 1, 2].map((i) => {
            const t = ((frame - tMoney) / 30 + i / 3) % 1;
            return <G key={i} x={lerp(t, [0, 1], [980, 1450])} y={640 - Math.sin(t * Math.PI) * 100} s={0.55}><Coin /></G>;
          })}
        <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip seed={30} enter={tMoney}
          start={{lookX: 1, mouth: 'grin', brows: 'smug', lShoulder: 60, lElbow: -110, rShoulder: -60, rElbow: 110}}
        />
      </Stage>
      <Sfx name="cash" at={tMoney} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s29 — Out of cyan again: working as intended */
export const S29: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBW = at('black and white');
  const tNot = at("it's not broken");
  const tInt = at('working exactly');
  return (
    <AbsoluteFill>
      <Headline text="It's not *broken.*" start={tNot} y={TOP} size={88} />
      <Stage>
        <G x={900} y={680} s={0.85} shadow>
          <Printer screen={frame >= tInt ? 'AS INTENDED' : 'NO CYAN'} screenColor={frame >= tInt ? C.green : C.red} blink={frame < tInt} frame={frame} paper={lerp(frame, [tBW, tBW + 40], [0, 0.45])} />
        </G>
        <G x={900} y={975} s={pop(frame, fps, tInt, 8) * 0.56} r={-4}><Stamp text="WORKING AS INTENDED" color={C.green} /></G>
        <Actor who="sam" x={P.left} y={FLOOR} s={P.s} seed={31}
          start={{lookX: 1, mouth: 'frown', brows: 'sad', headTilt: 12, lookY: 1, squash: 0.97}}
          keys={[{f: tNot, p: {lookY: 0, headTilt: 0, mouth: 'flat', brows: 'oneUp'}, d: 10}]}
          emotes={[{f: 6, kind: 'sweat', d: 60}]}
        />
        <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip seed={32} enter={tInt - 4}
          start={{lookX: 1, mouth: 'grin', brows: 'smug', lShoulder: 140, lElbow: 30}}
          lHand={<Flute liquid={C.cyan} />}
          emotes={[{f: tInt + 4, kind: 'sparkle'}]}
        />
      </Stage>
      <Sfx name="thud" at={tInt} volume={0.6} />
      <Sfx name="ding" at={tInt + 6} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s30 — Subscribe */
export const S30: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tYou = at('you');
  const click = at('subscribed') + 6;
  const pressed = frame >= click && frame < click + 6;
  const done = frame >= click;
  const ring = done ? Math.sin(frame * 0.8) * 18 * Math.max(0, 1 - (frame - click) / 40) : 0;
  return (
    <AbsoluteFill>
      <Headline text="Why is it that…" start={at('why')} y={TOP + 40} size={92} stagger={4} />
      <Headline text="you haven't *subscribed* yet?" start={tYou} y={TOP + 150} size={92} stagger={3} hl={C.magenta} />
      <Stage>
        <G x={1080} y={700} s={pop(frame, fps, tYou) * (pressed ? 0.93 : 1)} shadow>
          <rect x={-300} y={-80} width={600} height={160} rx={30} fill={done ? C.grey : C.red} stroke={C.ink} strokeWidth={7} />
          <text textAnchor="middle" y={22} fontFamily={DISPLAY} fontSize={60} fill={C.white}>{done ? 'SUBSCRIBED' : 'SUBSCRIBE'}</text>
        </G>
        <G x={1510} y={700} s={spring({frame: frame - click - 4, fps, config: {damping: 12}})} r={ring} shadow>
          <path d="M-60,40 C-60,-40 -50,-80 0,-80 C50,-80 60,-40 60,40 L80,60 L-80,60 Z" fill={C.yellow} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
          <circle cy={80} r={18} fill={C.ink} />
        </G>
        <Cursor x={lerp(frame, [click - 16, click], [1420, 1130])} y={lerp(frame, [click - 16, click], [950, 720])} s={pop(frame, fps, tYou)} press={pressed} />
        <Actor who="sam" x={420} y={FLOOR} s={0.72} seed={33} enter={tYou - 2}
          start={{lookX: 1, mouth: 'grin', brows: 'raised', rShoulder: -95, rElbow: 0}}
          keys={[{f: click, p: {lShoulder: 150, lElbow: 20}, d: 6, ease: 'out'}]}
          emotes={[{f: click + 4, kind: 'sparkle'}]}
        />
      </Stage>
      <Sfx name="click" at={click} volume={0.7} />
      <Sfx name="ding" at={click + 6} volume={0.45} />
    </AbsoluteFill>
  );
};
