import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, BODY, MONO} from '../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../anim';
import {Headline, Label, Stage, Sfx} from '../components/Frame';
import {G, Printer, Cartridge, Person, Arrow, Stamp, Dialog, Gavel, Page, Parcel, Coin, Cursor, Tag, Bottle} from '../components/Art';

/* s19 — Firmware update */
export const S19: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pr = pop(frame, fps, 0);
  const ok = pop(frame, fps, at('perfectly fine'), 9);
  const upd = pop(frame, fps, at('suddenly'));
  const prog = lerp(frame, [at('suddenly') + 6, at('firmware update')], [0, 1]);
  const bad = frame >= at('stopped') + 4 && prog >= 0.99;
  const worse = ramp(frame, at('worse'), 16);
  const stamp = pop(frame, fps, at('on purpose'), 9);
  return (
    <AbsoluteFill>
      <Sfx name="error" at={at('firmware update')} volume={0.25} />
      <Sfx name="thud" at={at('on purpose')} volume={0.4} />
      <Stage>
        <G x={560} y={680} s={pr} shadow>
          <Printer screen={bad ? 'REJECTED' : 'READY'} screenColor={bad ? C.red : C.green} blink={bad} frame={frame} />
        </G>
        <G x={560} y={320} s={bad ? 0 : ok}>
          <circle r={60} fill={C.green} stroke={C.ink} strokeWidth={7} />
          <path d="M-25,0 l18,20 l32,-38" fill="none" stroke={C.white} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <G x={560} y={320} s={bad ? pop(frame, fps, at('firmware update'), 9) : 0}>
          <circle r={60} fill={C.red} stroke={C.ink} strokeWidth={7} />
          <path d="M-22,-22 L22,22 M22,-22 L-22,22" stroke={C.white} strokeWidth={14} strokeLinecap="round" />
        </G>
        <Label text="cheaper cartridge" x={560} y={890} start={at('cheaper')} color={C.grey} size={32} />
        {/* update window */}
        <G x={1350} y={370} s={upd} shadow>
          <rect x={-380} y={-120} width={760} height={240} rx={18} fill={C.white} stroke={C.ink} strokeWidth={7} />
          <text x={-340} y={-50} fontFamily={MONO} fontWeight={700} fontSize={32} fill={C.ink}>
            Installing firmware update…
          </text>
          <rect x={-340} y={10} width={680} height={50} rx={25} fill={C.paperDark} stroke={C.ink} strokeWidth={6} />
          <rect x={-334} y={16} width={668 * prog} height={38} rx={19} fill={C.cyan} />
          <text x={340} y={-50} textAnchor="end" fontFamily={MONO} fontWeight={700} fontSize={32} fill={C.cyan}>
            {Math.round(prog * 100)}%
          </text>
        </G>
        {/* quality chart */}
        <G x={1350} y={800} o={ramp(frame, at('worse'), 8)}>
          <line x1={-300} y1={120} x2={300} y2={120} stroke={C.ink} strokeWidth={6} />
          <line x1={-300} y1={120} x2={-300} y2={-120} stroke={C.ink} strokeWidth={6} />
          <text x={-280} y={-100} fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink}>
            YOUR PRINTER
          </text>
          <Arrow x1={-240} y1={-50} x2={-240 + 500 * 0.95} y2={-50 + 150 * 0.95} t={worse} color={C.red} w={14} />
        </G>
        <G x={1350} y={590} s={stamp * 0.8} r={-5}>
          <Stamp text="ON PURPOSE" color={C.magenta} />
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s20 — Lawsuits and angry internet */
export const S20: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSlam = at('lawsuits');
  const swing = frame < tSlam ? -40 : lerp(frame, [tSlam, tSlam + 6], [-40, 0]);
  const g = pop(frame, fps, tSlam - 8);
  const doc = pop(frame, fps, at('settlements'));
  const people = [
    [1080, 560, C.cyan, '#@%!'],
    [1360, 480, C.magenta, '!!!'],
    [1620, 580, C.yellow, 'SCAM'],
    [1200, 820, C.green, 'BOYCOTT'],
    [1500, 840, C.red, '>:('],
  ] as const;
  const tAngry = at('angry');
  return (
    <AbsoluteFill>
      <Sfx name="thud" at={at('lawsuits')} volume={0.5} />
      <Stage>
        <G x={300} y={680} s={g * 0.9}>
          <rect x={-120} y={120} width={240} height={50} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={7} />
          <G x={60} y={60} r={swing}>
            <Gavel />
          </G>
        </G>
        {frame >= tSlam && frame < tSlam + 10 && (
          <G x={300} y={800} s={lerp(frame, [tSlam, tSlam + 10], [0.5, 1.6])} o={1 - ramp(frame, tSlam, 10)}>
            <circle r={110} fill="none" stroke={C.ink} strokeWidth={8} />
          </G>
        )}
        <G x={690} y={620} s={doc} r={-5} shadow>
          <Page title="SETTLEMENT" lines={6} />
        </G>
        {people.map(([x, y, c, say], i) => {
          const p = pop(frame, fps, tAngry + i * 4);
          return (
            <G key={i} x={x} y={y + wobble(frame + i * 9, 6, 0.4)} s={p * 0.6}>
              <Person color={c} mood="angry" />
              <G x={110} y={-200} r={8}>
                <rect x={-20} y={-60} width={say.length * 34 + 50} height={90} rx={24} fill={C.white} stroke={C.ink} strokeWidth={6} />
                <text x={5} y={8} fontFamily={DISPLAY} fontSize={50} fill={C.red}>
                  {say}
                </text>
              </G>
            </G>
          );
        })}
      </Stage>
      <Headline text="Lawsuits. Settlements. *Angry* internet." start={tSlam} y={150} size={78} stagger={6} />
      <Label text="(its natural state)" x={1360} y={985} start={at('natural')} color={C.grey} size={32} />
    </AbsoluteFill>
  );
};

/* s21 — Refusing to scan */
export const S21: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pr = pop(frame, fps, at('all-in-one'));
  const scanT = at('refusing to scan');
  const scanY = lerp((frame - scanT) % 40, [0, 20, 40], [-150, -60, -150]);
  const refuse = pop(frame, fps, at('ink is low'), 10);
  const zero = pop(frame, fps, at('zero ink'), 9);
  return (
    <AbsoluteFill>
      <Sfx name="error" at={at('ink is low')} volume={0.25} />
      <Sfx name="pop" at={at('zero ink')} volume={0.3} />
      <Stage>
        <G x={620} y={700} s={pr * 1.15} shadow>
          <Printer screen={refuse > 0.5 ? 'INK LOW' : 'SCAN'} screenColor={refuse > 0.5 ? C.red : C.cyan} blink={refuse > 0.5} frame={frame} />
          {frame > scanT && refuse < 0.5 && <rect x={-240} y={scanY} width={480} height={10} fill={C.cyan} opacity={0.8} />}
        </G>
        <G x={620} y={330} s={refuse} r={-2} shadow>
          <Dialog title="scanner" msg="Can't scan: ink low" color={C.red} w={680} />
        </G>
        <G x={1420} y={600} s={zero}>
          <rect x={-260} y={-230} width={520} height={460} rx={30} fill={C.white} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(10px 10px 0 ${C.ink})`}} />
          <text y={-150} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.grey}>
            INK USED BY SCANNING
          </text>
          <text y={60} textAnchor="middle" fontFamily={DISPLAY} fontSize={220} fill={C.cyan} stroke={C.ink} strokeWidth={6}>
            0
          </text>
          <text y={160} textAnchor="middle" fontFamily={DISPLAY} fontSize={60} fill={C.ink}>
            mL
          </text>
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s22 — Car radio analogy */
export const S22: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const dash = pop(frame, fps, 0);
  const fuel = lerp(frame, [0, at('fuel')], [20, -50]);
  const no = pop(frame, fps, at('radio'), 9);
  const lowOn = frame > at('low on') && Math.floor(frame / 8) % 2 === 0;
  return (
    <AbsoluteFill>
      <Headline text="Like your car refusing to play the *radio*… because you're low on fuel." start={at("that's")} y={130} size={68} width={1500} stagger={2} />
      <Stage>
        <G x={960} y={680} s={dash}>
          <path d="M-760,-200 Q0,-330 760,-200 L760,260 L-760,260 Z" fill={C.ink} />
          {/* fuel gauge */}
          <G x={-420} y={40}>
            <circle r={170} fill={C.white} stroke={C.paperDark} strokeWidth={12} />
            <text x={-110} y={60} fontFamily={DISPLAY} fontSize={44} fill={C.red}>
              E
            </text>
            <text x={80} y={60} fontFamily={DISPLAY} fontSize={44} fill={C.ink}>
              F
            </text>
            <g transform={`rotate(${fuel})`}>
              <line x1={0} y1={0} x2={0} y2={-130} stroke={C.red} strokeWidth={12} strokeLinecap="round" />
            </g>
            <circle r={20} fill={C.ink} />
            <rect x={-30} y={90} width={60} height={50} rx={8} fill={lowOn ? C.yellow : C.paperDark} />
          </G>
          {/* radio */}
          <G x={260} y={40}>
            <rect x={-300} y={-140} width={600} height={280} rx={24} fill={C.paperDark} stroke={C.white} strokeWidth={6} />
            <rect x={-250} y={-100} width={500} height={110} rx={10} fill={C.ink} />
            <text y={-28} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={44} fill={no > 0.5 ? C.red : C.green}>
              {no > 0.5 ? 'LOW FUEL: NO RADIO' : 'FM 101.4'}
            </text>
            {[-150, 0, 150].map((x) => (
              <circle key={x} cx={x} cy={80} r={34} fill={C.white} stroke={C.ink} strokeWidth={6} />
            ))}
          </G>
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s23 — Subscription loop */
export const S23: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const cx = 960;
  const cy = 690;
  const R = 270;
  const nodes = [
    {a: -90, t: at('pay monthly'), label: 'You pay monthly', el: <Coin s={1.4} />},
    {a: 0, t: at('tells the company'), label: 'Printer reports in', el: <Printer s={0.42} screen="LOW" screenColor={C.yellow} />},
    {a: 90, t: at('arrives'), label: 'Ink arrives by mail', el: <Parcel s={0.8} />},
    {a: 180, t: at('running low'), label: 'The company ships', el: <Factory />},
  ];
  const spin = ramp(frame, at('pay monthly'), 60) * 360 + frame * 0.6;
  const conv = pop(frame, fps, at('convenient'), 8);
  return (
    <AbsoluteFill>
      <Sfx name="ding" at={at('arrives')} volume={0.2} />
      <Sfx name="thud" at={at('convenient')} volume={0.35} />
      <Headline text="The final form: *ink subscriptions*" start={at('final form')} y={130} size={76} hl={C.cyan} />
      <Stage>
        <G x={cx} y={cy} r={spin} o={ramp(frame, at('pay monthly'), 10)}>
          <circle r={R} fill="none" stroke={C.ink} strokeWidth={8} strokeDasharray="30 26" />
          {[45, 135, 225, 315].map((a) => (
            <G key={a} r={a}>
              <path d={`M${R},-22 l22,30 l22,-30`} fill={C.ink} transform="rotate(90 322 0)" />
            </G>
          ))}
        </G>
        {nodes.map((n, i) => {
          const p = pop(frame, fps, n.t);
          const rad = (n.a * Math.PI) / 180;
          const x = cx + Math.cos(rad) * R * 1.05;
          const y = cy + Math.sin(rad) * R * 1.05;
          return (
            <g key={i}>
              <G x={x} y={y} s={p}>
                <circle r={110} fill={C.white} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(8px 8px 0 ${C.ink})`}} />
                {n.el}
              </G>
              <text
                x={n.a === 0 ? x + 140 : n.a === 180 ? x - 140 : x + 140}
                y={n.a === 90 ? y + 20 : y + 12}
                textAnchor={n.a === 180 ? 'end' : 'start'}
                fontFamily={BODY}
                fontWeight={800}
                fontSize={36}
                fill={C.ink}
                opacity={p}
              >
                {n.label}
              </text>
            </g>
          );
        })}
        <G x={960} y={690} s={conv * 0.58} r={-6}>
          <Stamp text="CONVENIENT!" color={C.green} />
        </G>
      </Stage>
    </AbsoluteFill>
  );
};

/* s24 — Cancel and lose your ink */
export const S24: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCancel = at('until you cancel');
  const btn = pop(frame, fps, tCancel - 4);
  const click = tCancel + 12;
  const pressed = frame >= click && frame < click + 6;
  const cancelled = frame >= click;
  const lock = pop(frame, fps, at('stop working'), 9);
  const grey = ramp(frame, at('stop working'), 12);
  const rent = pop(frame, fps, at('renting'), 9);
  return (
    <AbsoluteFill>
      <Sfx name="click" at={at('until you cancel') + 12} volume={0.5} />
      <Sfx name="thud" at={at('renting')} volume={0.4} />
      <Stage>
        <G x={560} y={420} s={btn * (pressed ? 0.93 : 1)} shadow>
          <rect x={-300} y={-70} width={600} height={140} rx={70} fill={cancelled ? C.grey : C.red} stroke={C.ink} strokeWidth={7} />
          <text textAnchor="middle" y={20} fontFamily={DISPLAY} fontSize={52} fill={C.white}>
            {cancelled ? 'CANCELLED' : 'CANCEL PLAN'}
          </text>
        </G>
        <Cursor x={lerp(frame, [tCancel - 4, click], [900, 600])} y={lerp(frame, [tCancel - 4, click], [700, 440])} s={btn * (1 - ramp(frame, click + 20, 8))} press={pressed} />
        <G x={1300} y={600} s={1.3} r={0}>
          <g style={{filter: `grayscale(${grey})`}}>
            <Cartridge color={C.cyan} label="YOUR INK" xray={grey} level={0.8} />
          </g>
        </G>
        <G x={1300} y={600} s={lock}>
          <path d="M-70,0 v-60 a70,70 0 0 1 140,0 v60" fill="none" stroke={C.ink} strokeWidth={22} />
          <rect x={-110} y={-10} width={220} height={170} rx={22} fill={C.yellow} stroke={C.ink} strokeWidth={8} />
          <circle cy={60} r={20} fill={C.ink} />
          <rect x={-8} y={60} width={16} height={50} fill={C.ink} />
        </G>
        <G x={1300} y={900} s={rent} r={-8}>
          <Stamp text="RENTED" color={C.red} />
        </G>
      </Stage>
      <Headline text="You never *owned* it." start={at('never owned')} x={600} y={680} size={86} width={1100} />
    </AbsoluteFill>
  );
};

/* s25 — Iceberg of cost */
export const S25: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const ice = ramp(frame, at('because'), 20);
  const box = pop(frame, fps, at('price on the box'));
  const below = at('not the price');
  const water = 560;
  return (
    <AbsoluteFill>
      <Headline text="Why does this keep working?" start={at('so why')} y={130} size={74} />
      <Stage>
        <rect x={0} y={water} width={1920} height={600} fill={C.cyan} opacity={0.22} />
        <path d={`M0,${water} ${Array.from({length: 25}).map((_, i) => `Q${i * 80 + 40},${water + (i % 2 ? 14 : -14) + wobble(frame + i * 10, 4, 0.1)} ${(i + 1) * 80},${water}`).join(' ')}`} fill="none" stroke={C.ink} strokeWidth={6} />
        <G x={960} y={water} s={ice}>
          <path d="M-170,0 L-80,-180 L40,-210 L170,0 Z" fill={C.white} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
          <path d="M-170,0 L-420,200 L-360,420 L-60,480 L330,430 L440,210 L170,0 Z" fill="#CDEFF7" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
        </G>
        <G x={960} y={water - 230} s={box} r={-4} shadow>
          <Tag text="$50" color={C.yellow} w={210} />
        </G>
        {Array.from({length: 10}).map((_, i) => {
          const p = pop(frame, fps, below + i * 2, 14);
          return (
            <G key={i} x={700 + (i % 5) * 130} y={water + 160 + Math.floor(i / 5) * 160} s={p * 0.42}>
              <Cartridge color={[C.cyan, C.magenta, C.yellow, C.ink][i % 4]} label="$$" />
            </G>
          );
        })}
      </Stage>
      <Label text="the price on the box" x={1560} y={380} start={at('price on the box')} size={36} />
      <Label text="the next five years" x={1600} y={840} start={at('five years')} size={36} color={C.magenta} />
    </AbsoluteFill>
  );
};

/* s26 — Switching effort, brilliant trap */
export const S26: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTrap = at('brilliant trap');
  const effort = [
    {label: 'Switch printers', h: 440, c: C.red, t: at('switching')},
    {label: 'One more cartridge', h: 90, c: C.green, t: at('buying another')},
  ];
  const fade = 1 - ramp(frame, at("it's not"), 10);
  const trap = pop(frame, fps, at("it's not"));
  const snap = frame >= tTrap + 6;
  return (
    <AbsoluteFill>
      <Sfx name="thud" at={at('brilliant trap') + 6} volume={0.5} />
      <div style={{opacity: fade, position: 'absolute', inset: 0}}>
        <Label text="EFFORT" x={960} y={170} start={0} color={C.grey} size={32} />
        <Stage>
          <line x1={500} y1={880} x2={1420} y2={880} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          {effort.map((e, i) => {
            const g = pop(frame, fps, e.t, 12);
            return (
              <g key={e.label}>
                <rect x={680 + i * 380 - 110} y={880 - e.h * g} width={220} height={e.h * g} rx={14} fill={e.c} stroke={C.ink} strokeWidth={7} />
                <text x={680 + i * 380} y={940} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink} opacity={g}>
                  {e.label}
                </text>
              </g>
            );
          })}
        </Stage>
      </div>
      <Stage>
        <G x={960} y={720} s={trap}>
          <rect x={-380} y={40} width={760} height={90} rx={14} fill={C.gold} stroke={C.ink} strokeWidth={7} />
          <line x1={-340} y1={85} x2={340} y2={85} stroke={C.ink} strokeWidth={4} opacity={0.4} />
          <G x={0} y={-20} s={0.55} r={snap ? 3 : 0}>
            <g transform={`scale(1 ${snap ? 0.82 : 1}) translate(0 ${snap ? 28 : 0})`}>
              <Cartridge color={C.magenta} label="INK" />
            </g>
          </G>
          {snap ? (
            <path d="M-260,40 L-260,-60 L260,-60 L260,40" fill="none" stroke={C.ink} strokeWidth={16} strokeLinejoin="round" />
          ) : (
            <path d="M-260,40 L-260,30 Q-260,-260 -40,-280 L-30,-250" fill="none" stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
          )}
          <circle cx={-260} cy={40} r={16} fill={C.grey} stroke={C.ink} strokeWidth={6} />
          <circle cx={260} cy={40} r={16} fill={C.grey} stroke={C.ink} strokeWidth={6} />
        </G>
        {snap && frame < tTrap + 14 && (
          <G x={960} y={790} o={1 - ramp(frame, tTrap + 6, 8)} s={lerp(frame, [tTrap + 6, tTrap + 14], [0.6, 1.5])}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line key={a} x1={0} y1={-180} x2={0} y2={-240} stroke={C.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${a})`} />
            ))}
          </G>
        )}
      </Stage>
      <Headline text="Not a bad product. A *brilliant trap.*" start={at("it's not")} y={200} size={88} hl={C.magenta} />
    </AbsoluteFill>
  );
};

/* s27 — The way out */
export const S27: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const cards = [
    {title: 'Ink tank', sub: 'Pricier up front. Bottles last ages.', t: at('ink tank'), el: <Bottle kind="ink" color={C.cyan} label="REFILL" s={0.8} />},
    {title: 'Laser', sub: 'Toner: far cheaper per page.', t: at('laser'), el: <Cartridge color={C.ink} label="TONER" s={0.7} chip={false} />},
    {title: 'The library', sub: 'Honestly? Often the best printer.', t: at('library'), el: <Library />},
  ];
  return (
    <AbsoluteFill>
      <Headline text="There is *hope.*" start={at('there is hope')} y={130} size={92} hl={C.green} />
      {cards.map((c, i) => {
        const p = pop(frame, fps, c.t);
        return (
          <div
            key={c.title}
            style={{
              position: 'absolute',
              left: 150 + i * 560,
              top: 300,
              width: 500,
              height: 620,
              background: C.white,
              border: `7px solid ${C.ink}`,
              borderRadius: 30,
              boxShadow: `12px 12px 0 ${C.ink}`,
              opacity: p,
              transform: `translateY(${(1 - p) * 80}px) rotate(${(i - 1) * 1.5}deg)`,
              overflow: 'hidden',
            }}
          >
            <div style={{height: 320, background: [C.cyan, C.yellow, C.magenta][i], opacity: 0.25}} />
            <svg width={500} height={320} viewBox="-250 -170 500 320" style={{position: 'absolute', top: 0, left: 0}}>
              {c.el}
            </svg>
            <div style={{padding: '24px 34px'}}>
              <div style={{fontFamily: DISPLAY, fontSize: 58, color: C.ink}}>{c.title}</div>
              <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, color: C.ink, opacity: 0.75, marginTop: 10, lineHeight: 1.25}}>{c.sub}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Factory: React.FC = () => (
  <G y={10} s={0.8}>
    <path d="M-130,90 V-20 L-60,-60 V-20 L10,-60 V-20 L80,-60 V-110 h40 V90 Z" fill={C.magenta} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-90, -20, 50].map((x) => (
      <rect key={x} x={x} y={10} width={40} height={40} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
    ))}
  </G>
);

const Library: React.FC = () => (
  <G y={20}>
    <path d="M-160,-60 L0,-140 L160,-60 Z" fill={C.magenta} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-150} y={-60} width={300} height={170} fill={C.white} stroke={C.ink} strokeWidth={7} />
    {[-110, -55, 0, 55, 110].map((x) => (
      <rect key={x} x={x - 12} y={-45} width={24} height={140} fill={C.paperDark} stroke={C.ink} strokeWidth={4} />
    ))}
    <rect x={-170} y={110} width={340} height={26} fill={C.ink} />
  </G>
);

/* s28 — Follow the money */
export const S28: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tag = pop(frame, fps, at('suspiciously'));
  const lens = lerp(frame, [at('ask'), at('ask') + 20], [0, 1]);
  const flow = ramp(frame, at('money'), 20);
  return (
    <AbsoluteFill>
      <Sfx name="cash" at={at('money')} volume={0.2} />
      <Headline text="Suspiciously *cheap?* Ask where the *money* comes from." start={at('when something')} y={130} size={72} width={1500} stagger={3} />
      <Stage>
        <G x={560} y={560} s={tag * 1.5} r={-6} shadow>
          <Tag text="$49" color={C.yellow} w={230} />
        </G>
        <text x={560} y={745} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={lerp(lens, [0, 1], [14, 34])} fill={C.magenta}>
          *ink sold separately. forever.
        </text>
        <G x={lerp(lens, [0, 1], [900, 560])} y={lerp(lens, [0, 1], [900, 735])} s={tag} r={-20}>
          <circle r={190} fill={C.white} opacity={0.3} stroke={C.ink} strokeWidth={12} />
          <rect x={-20} y={190} width={40} height={180} rx={14} fill={C.ink} />
        </G>
        <G x={1080} y={760} s={pop(frame, fps, at('money')) * 0.7}>
          <Person color={C.cyan} mood="flat" />
        </G>
        <G x={1640} y={720} s={pop(frame, fps, at('money', 0, 6)) * 0.75} shadow>
          <Printer screen="$$$" />
        </G>
        <Arrow x1={1200} y1={640} x2={1430} y2={640} t={flow} color={C.green} w={14} />
        {[0, 1, 2].map((i) => {
          const t = ((frame - at('money')) / 30 + i / 3) % 1;
          return frame > at('money') ? (
            <G key={i} x={lerp(t, [0, 1], [1180, 1460])} y={560 - Math.sin(t * Math.PI) * 90} s={0.6}>
              <Coin />
            </G>
          ) : null;
        })}
      </Stage>
    </AbsoluteFill>
  );
};

/* s29 — Working as intended */
export const S29: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const pr = pop(frame, fps, 0);
  const paper = ramp(frame, at('black and white'), 40);
  const stamp = pop(frame, fps, at('exactly as intended'), 8);
  return (
    <AbsoluteFill>
      <Sfx name="thud" at={at('exactly as intended')} volume={0.4} />
      <Stage>
        <G x={960} y={560} s={pr * 1.25} shadow>
          <Printer screen={stamp > 0.5 ? 'AS INTENDED' : 'NO CYAN'} screenColor={stamp > 0.5 ? C.green : C.red} blink={stamp < 0.5} frame={frame} paper={paper} />
        </G>
        <G x={960} y={975} s={stamp * 0.85} r={-4}>
          <Stamp text="WORKING AS INTENDED" color={C.green} />
        </G>
      </Stage>
      <Headline text="It's not *broken.*" start={at("it's not broken")} x={960} y={110} size={92} />
    </AbsoluteFill>
  );
};

/* s30 — Subscribe */
export const S30: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const btn = pop(frame, fps, at('you'));
  const click = at('subscribed') + 6;
  const pressed = frame >= click && frame < click + 6;
  const done = frame >= click;
  const bell = pop(frame, fps, click + 6);
  return (
    <AbsoluteFill>
      <Sfx name="click" at={at('subscribed') + 6} volume={0.5} />
      <Sfx name="ding" at={at('subscribed') + 12} volume={0.3} />
      <Headline text="Why is it that…" start={at('why')} y={200} size={96} stagger={4} />
      <Headline text="you haven't *subscribed* yet?" start={at('you')} y={320} size={96} stagger={3} hl={C.magenta} />
      <Stage>
        <G x={900} y={700} s={btn * (pressed ? 0.93 : 1)} shadow>
          <rect x={-300} y={-80} width={600} height={160} rx={30} fill={done ? C.grey : C.red} stroke={C.ink} strokeWidth={7} />
          <text textAnchor="middle" y={22} fontFamily={DISPLAY} fontSize={60} fill={C.white}>
            {done ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </text>
        </G>
        <G x={1320} y={700} s={bell} r={done ? Math.sin(frame * 0.8) * 18 * Math.max(0, 1 - (frame - click) / 40) : 0} shadow>
          <path d="M-60,40 C-60,-40 -50,-80 0,-80 C50,-80 60,-40 60,40 L80,60 L-80,60 Z" fill={C.yellow} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
          <circle cy={80} r={18} fill={C.ink} />
        </G>
        <Cursor x={lerp(frame, [click - 18, click], [1300, 960])} y={lerp(frame, [click - 18, click], [950, 720])} s={btn} press={pressed} />
      </Stage>
    </AbsoluteFill>
  );
};
