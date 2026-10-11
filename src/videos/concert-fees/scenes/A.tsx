import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../../../anim';
import {Headline, Stage, Sfx} from '../../../components/Frame';
import {G, Tag, Arrow, Stamp, Coin, Cursor} from '../../../components/Art';
import {Actor} from '../../../characters/Actor';
import {Magnifier} from '../../../characters/Props';
import {TOP, FLOOR} from '../../../components/layout';
import {ConcertTicket, Receipt, ReceiptLine, Courthouse, Email, Bill, Badge, Venue, TV, Pie, Browser, Contract, HeldPhone, Button, IconName} from '../kit';
import {SLabel, tagW, headTop, PEER, Sam, Gerald, P, SHOCK, POINT, SHRUG, CHEER, RAISE, HIPS, REST, Count} from './common';

/* s01 — You find the ticket, $50, not bad. */
export const S01: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTicket = at('ticket');
  const tFifty = at('$50');
  const tBad = at('not bad');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1180} y={540} s={pop(frame, fps, tTicket, 11) * 1.45} r={-4 + wobble(frame, 1.5, 0.07)} shadow>
          <ConcertTicket price={frame >= tFifty ? '$50' : ''} />
        </G>
        <G x={1500} y={330} s={pop(frame, fps, tBad, 10)} r={10}>
          <Tag text="NOT BAD" color={C.yellow} w={tagW('NOT BAD')} />
        </G>
        <Sam x={430} s={0.78} seed={1} enter={0}
          rHand={<HeldPhone><Button text="BUY" y={0} w={200} /></HeldPhone>}
          start={{mouth: 'smile', ...HOLD_PHONE}}
          keys={[{f: tBad, p: {mouth: 'grin', brows: 'raised', lShoulder: 140, lElbow: 30}, d: 7, ease: 'out'}]}
          emotes={[{f: tBad + 2, kind: 'sparkle', d: 40}]}
        />
      </Stage>
      <Sfx name="pop" at={tTicket} volume={0.45} />
      <Sfx name="ding" at={tBad} volume={0.35} />
    </AbsoluteFill>
  );
};

const HOLD_PHONE = {rShoulder: -55, rElbow: -70};

// The running example used in s02/s03 and s08.
const LINES = [
  {label: 'Ticket', amount: '$50.00', color: C.cyan, cue: ''},
  {label: 'Service fee', amount: '$10.00', color: C.magenta, cue: 'a service fee'},
  {label: 'Facility fee', amount: '$4.00', color: C.yellow, cue: 'a facility fee'},
  {label: 'Order processing', amount: '$3.00', color: C.green, cue: 'order processing'},
  {label: 'Tax', amount: '$3.70', color: C.grey, cue: 'tax'},
];

/* s02 — Then you click checkout: service fee, facility fee, order processing fee, tax. */
export const S02: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tClick = at('click checkout');
  const cues = LINES.map((l) => (l.cue ? at(l.cue) : -30));
  const tTax = at('tax');
  return (
    <AbsoluteFill>
      <Stage>
        <Receipt x={960} y={240} w={600} size={32} lines={LINES.map((l, i) => ({...l, t: ramp(frame, cues[i], 8)}))} />
        <G x={1240 + lerp(frame, [0, tClick], [120, 0])} y={330 + lerp(frame, [0, tClick], [200, 0])} s={0.8}>
          <Cursor press={frame >= tClick && frame < tClick + 6} />
        </G>
        <Sam seed={2}
          start={{mouth: 'smile'}}
          keys={[
            {f: cues[1], p: {mouth: 'flat', brows: 'raised'}, d: 6},
            {f: cues[3], p: {mouth: 'o', brows: 'raised'}, d: 6},
            {f: tTax, p: {...SHOCK}, d: 6, ease: 'out'},
          ]}
          emotes={[{f: tTax + 2, kind: 'sweat'}]}
        />
        <Gerald seed={3} enter={cues[1] - 4}
          keys={cues.slice(1).flatMap((c, i) => [
            {f: c, p: {...RAISE, mouth: 'grin' as const}, d: 5, ease: 'out' as const},
            {f: c + 9, p: {rShoulder: -40, rElbow: 100, mouth: i === 3 ? ('grin' as const) : ('smirk' as const)}, d: 6},
          ])}
        />
      </Stage>
      <Sfx name="click" at={tClick} volume={0.5} />
      {cues.slice(1).map((c, i) => (
        <Sfx key={i} name="pop" at={c} volume={0.3 + i * 0.05} />
      ))}
    </AbsoluteFill>
  );
};

/* s03 — Your $50 ticket now costs $70.70. */
export const S03: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCosts = at('now costs');
  const tTot = at('$70.70');
  const t = ramp(frame, tCosts, Math.max(8, tTot - tCosts + 4));
  return (
    <AbsoluteFill>
      <Headline text="Your *$50* ticket now costs..." start={at('your')} y={TOP - 20} size={72} stagger={2} />
      <Stage>
        <Receipt x={960} y={240} w={600} size={32} lines={LINES.map((l) => ({...l, t: 1}))}
          total={{label: 'TOTAL', amount: '$' + (50 + 20.7 * t).toFixed(2), t: ramp(frame, tCosts, 6)}} />
        <G x={1450} y={700} s={pop(frame, fps, tTot + 4, 9)} r={-12}>
          <Stamp text="+41%" color={C.red} />
        </G>
        <Sam seed={2} start={{...SHOCK}} keys={[{f: tTot, p: {y: -16}, d: 4, ease: 'out'}, {f: tTot + 5, p: {y: 0}, d: 6}]} emotes={[{f: tTot + 2, kind: '!'}]} />
        <Gerald seed={3} start={{mouth: 'grin'}} />
      </Stage>
      <Sfx name="cash" at={tTot} volume={0.45} />
      <Sfx name="thud" at={tTot + 4} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s04 — April 2026: a federal jury found the company had run an illegal monopoly. */
export const S04: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tApr = at('april');
  const tJury = at('jury');
  const tCo = at('the company');
  const tIll = at('illegal');
  return (
    <AbsoluteFill>
      <Headline text="April 2026: a *federal jury*" start={tApr} y={TOP} size={76} stagger={2} />
      <Stage>
        <G x={960} y={FLOOR} s={pop(frame, fps, tJury, 14) * 0.95}>
          <Courthouse label="FEDERAL COURT" />
        </G>
        <SLabel text="THE TICKET GIANT" x={P.right} y={headTop() - 70} start={tCo} size={30} />
        <G x={960} y={800} s={pop(frame, fps, tIll, 9) * 0.82} r={-6}>
          <Stamp text="ILLEGAL MONOPOLY" color={C.red} />
        </G>
        <Sam seed={4} start={{mouth: 'flat'}} keys={[{f: tIll, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
        <Gerald seed={5} enter={tCo}
          keys={[{f: tIll, p: {mouth: 'o', brows: 'raised', ...REST, lean: 4}, d: 6, ease: 'out'}]}
          emotes={[{f: tIll + 4, kind: 'sweat'}]}
        />
      </Stage>
      <Sfx name="pop" at={tCo} volume={0.35} />
      <Sfx name="thud" at={tIll} volume={0.55} />
    </AbsoluteFill>
  );
};

/* s05 — Internal emails: directors joked the company was "robbing them blind". Them = you. */
export const S05: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMail = at('internal emails');
  const tJoke = at('joked');
  const tRob = at('robbing');
  const tYou = at('them being you');
  const laugh = (f0: number) =>
    Array.from({length: 5}).flatMap((_, i) => [
      {f: f0 + i * 8, p: {y: -10, mouth: 'grin' as const}, d: 4},
      {f: f0 + i * 8 + 4, p: {y: 0}, d: 4},
    ]);
  return (
    <AbsoluteFill>
      <Stage>
        <G x={930} y={470} s={pop(frame, fps, tMail, 13) * 1.05} shadow>
          <Email from="INTERNAL · RE: FEES" text={'“robbing them blind”'} t={ramp(frame, tRob, 10)} />
        </G>
        <G x={1655} y={headTop(0.55) - 24} s={pop(frame, fps, tJoke, 10) * 0.7} r={4}>
          <text textAnchor="middle" fontFamily={DISPLAY} fontSize={64} fill={C.magenta} stroke={C.ink} strokeWidth={4} paintOrder="stroke">
            HA HA
          </text>
        </G>
        <Arrow x1={720} y1={720} x2={420} y2={760} t={ramp(frame, tYou, 10)} color={C.red} w={12} />
        <SLabel text="THEM = YOU" x={600} y={790} start={tYou + 4} color={C.red} size={40} />
        <Sam seed={6} start={{mouth: 'flat'}} keys={[{f: tYou, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tYou + 3, kind: '!'}]} />
        <Gerald x={1540} s={0.55} seed={7} enter={tJoke - 3} keys={laugh(tJoke)} />
        <Actor who="exec" x={1770} y={FLOOR} s={0.55} flip seed={8} enter={tJoke} start={{lookX: 1, mouth: 'grin', ...SHRUG}} keys={laugh(tJoke + 2)} />
      </Stage>
      <Sfx name="pop" at={tMail} volume={0.4} />
      <Sfx name="error" at={tYou} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s06 — Where do those $20 go? Why do they keep growing when everybody hates them? */
export const S06: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTwenty = at('$20');
  const tGo = at('actually go');
  const tGrow = at('keep growing');
  const tHate = at('hates');
  const spots = [
    [720, 400],
    [1500, 400],
    [1110, 860],
  ];
  const grow = 1.5 + lerp(frame, [tGrow, tGrow + 30], [0, 0.45]);
  return (
    <AbsoluteFill>
      <Headline text="Where do those *$20* go?" start={at('where')} y={TOP} size={80} stagger={2} />
      <Stage>
        {spots.map(([x, y], i) => (
          <g key={i}>
            <Arrow x1={1110 + (x - 1110) * 0.32} y1={600 + (y - 600) * 0.32} x2={x + (1110 - x) * 0.25} y2={y + (600 - y) * 0.25} t={ramp(frame, tGo + i * 3, 10)} w={8} />
            <G x={x} y={y} s={pop(frame, fps, tGo + 6 + i * 3)}><Badge icon="question" color={[C.cyan, C.yellow, C.magenta][i]} rad={56} /></G>
          </g>
        ))}
        <G x={1110} y={600} s={pop(frame, fps, tTwenty, 11) * grow} r={wobble(frame, 3, 0.1)} shadow>
          <Bill value="$20" />
        </G>
        <Sam seed={9} start={{mouth: 'flat', brows: 'oneUp'}} keys={[{f: tHate, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7, ease: 'out'}]} emotes={[{f: tHate + 2, kind: 'anger'}]} />
      </Stage>
      <Sfx name="cash" at={tTwenty} volume={0.4} />
      <Sfx name="pop" at={tGo + 6} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s07 — Follow the money one line at a time; the trail ends in a courtroom. */
export const S07: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFollow = at('follow');
  const tLine = at('one line');
  const tCourt = at('courtroom');
  return (
    <AbsoluteFill>
      <Headline text="Follow the *money.*" start={tFollow} y={TOP} size={84} stagger={3} />
      <Stage>
        <line x1={360} y1={FLOOR - 8} x2={1420} y2={FLOOR - 8} stroke={C.ink} strokeWidth={6} strokeDasharray="4 22" strokeLinecap="round" opacity={0.5 * ramp(frame, tFollow, 10)} />
        {Array.from({length: 7}).map((_, i) => {
          const at0 = tLine + i * ((tCourt - tLine) / 7);
          return (
            <G key={i} x={500 + i * 140} y={FLOOR - 22} s={pop(frame, fps, at0, 10) * 0.36}>
              <Coin />
            </G>
          );
        })}
        <G x={1600} y={FLOOR} s={pop(frame, fps, tCourt, 13) * 0.55}><Courthouse /></G>
        <Sam seed={10} rHand={<Magnifier r={30} />}
          start={{mouth: 'smile', ...PEER}}
          keys={[{f: tFollow, p: {x: 1250}, d: tCourt + 6 - tFollow}]}
        />
      </Stage>
      <Sfx name="thud" at={tCourt} volume={0.45} />
    </AbsoluteFill>
  );
};

// Receipt-line colours = who gets the money.
const WHO: {icon: IconName; label: string; color: string}[] = [
  {icon: 'star', label: 'ARTIST / PROMOTER', color: C.cyan},
  {icon: 'question', label: 'SHARED?', color: C.magenta},
  {icon: 'building', label: 'VENUE', color: C.yellow},
  {icon: 'ticket', label: 'TICKET CO. + VENUE', color: C.green},
  {icon: 'gov', label: 'GOVERNMENT', color: C.grey},
];

/* s08 — Start with the receipt: every line goes to someone different. */
export const S08: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tRec = at('receipt');
  const tLine = at('every line');
  const tDiff = at('someone different');
  const lh = 30 * 1.75;
  return (
    <AbsoluteFill>
      <Stage>
        <G s={pop(frame, fps, tRec - 6, 14)} x={0} y={0}>
          <Receipt x={800} y={230} w={560} size={30} lines={LINES.map((l, i) => ({...l, color: frame >= tLine + i * 3 ? l.color : undefined, t: 1}))} />
        </G>
        {WHO.map((w, i) => {
          const ly = 230 + 92 + i * lh + lh * 0.62 - 10;
          const by = 290 + i * 135;
          const t0 = tDiff + i * 3;
          return (
            <g key={i}>
              <Arrow x1={1090} y1={ly} x2={1290} y2={by} t={ramp(frame, t0, 9)} color={w.color} w={8} />
              <G x={1350} y={by} s={pop(frame, fps, t0 + 4) * 0.62}><Badge icon={w.icon} color={w.color} /></G>
              <text x={1410} y={by + 12} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink} opacity={ramp(frame, t0 + 6, 8)}>
                {w.label}
              </text>
            </g>
          );
        })}
        <Sam seed={11} rHand={<Magnifier r={30} />} start={{mouth: 'smile', ...PEER}} keys={[{f: tDiff, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tDiff} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s09 — Face value is set by the artist, promoter or team; Ticketmaster says it keeps none. */
export const S09: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFace = at('face value');
  const tTm = at('ticketmaster says');
  const tNone = at('none');
  const who: [IconName, string, string, number][] = [
    ['star', 'ARTIST', C.cyan, at('artist')],
    ['mega', 'PROMOTER', C.yellow, at('promoter')],
    ['jersey', 'TEAM', C.green, at('the team')],
  ];
  return (
    <AbsoluteFill>
      <Headline text="The *face value*" start={tFace} y={TOP} size={84} hl={C.cyan} />
      <Stage>
        <G x={960} y={470} s={pop(frame, fps, 0, 14) * 1.25} r={-3} shadow>
          <ConcertTicket price="$50" color={C.cyan} title="FACE VALUE" />
        </G>
        {who.map(([icon, label, color, t], i) => (
          <G key={label} x={720 + i * 240} y={770} s={pop(frame, fps, t, 11) * 0.7}>
            <Badge icon={icon} color={color} label={label} labelSize={36} />
          </G>
        ))}
        <G x={1450} y={330} s={pop(frame, fps, tNone, 10)} r={8}>
          <Tag text="KEEPS $0" color={C.white} w={tagW('KEEPS $0')} />
        </G>
        <Gerald seed={12} enter={tTm - 4} start={{mouth: 'smile', brows: 'raised', ...SHRUG}}
          keys={[{f: tNone, p: {lShoulder: 95, lElbow: -10, rShoulder: -95, rElbow: 10, mouth: 'smile', brows: 'raised'}, d: 8, ease: 'out'}]}
          emotes={[{f: tNone + 4, kind: 'sparkle', d: 30}]}
        />
      </Stage>
      {who.map(([, label, , t]) => (
        <Sfx key={label} name="pop" at={t} volume={0.3} />
      ))}
    </AbsoluteFill>
  );
};

/* s10 — The facility fee: set by the venue, kept by the venue. */
export const S10: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFac = at('facility fee');
  const tVen = at('the venue');
  const tKeep = at('keeps all');
  const fly = lerp(frame, [tKeep, tKeep + 14], [0, 1]);
  return (
    <AbsoluteFill>
      <Headline text="Facility fee: *100%* venue" start={tFac} y={TOP} size={80} hl={C.yellow} />
      <Stage>
        <G x={1180} y={FLOOR} s={pop(frame, fps, tVen, 13) * 1.05}><Venue name="THE VENUE" color={C.yellow} frame={frame} lights={1} /></G>
        {fly < 1 && (
          <G x={lerp(fly, [0, 1], [720, 1180])} y={lerp(fly, [0, 1], [430, 870])} s={pop(frame, fps, tFac, 11) * (1 - fly * 0.85)} r={-8 + fly * 30}>
            <Tag text="$4" color={C.yellow} w={tagW('$4')} />
          </G>
        )}
        <Sam seed={13} start={{mouth: 'smile'}} keys={[{f: tKeep, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      <Sfx name="pop" at={tFac} volume={0.35} />
      <Sfx name="cash" at={tKeep + 12} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s11 — Order processing fee: once per order, shared between Ticketmaster and the venue. */
export const S11: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tOrd = at('order processing');
  const tOnce = at('once per order');
  const tShare = at('shares it');
  const split = lerp(frame, [tShare, tShare + 18], [0, 1]);
  return (
    <AbsoluteFill>
      <Headline text="Order processing: *once per order*" start={tOrd} y={TOP} size={70} hl={C.green} stagger={2} />
      <Stage>
        <G x={760} y={FLOOR} s={pop(frame, fps, tShare - 4, 13) * 0.6}><Venue name="VENUE" color={C.yellow} frame={frame} /></G>
        {split < 0.05 ? (
          <G x={1000} y={480} s={pop(frame, fps, tOrd, 11) * 1.3} r={-6}><Tag text="$3" color={C.green} w={tagW('$3')} /></G>
        ) : (
          <>
            <G x={lerp(split, [0, 1], [1000, 780])} y={lerp(split, [0, 1], [480, 640])} s={1.1}><Coin /></G>
            <G x={lerp(split, [0, 1], [1000, 1420])} y={lerp(split, [0, 1], [480, 600])} s={1.1}><Coin /></G>
          </>
        )}
        <SLabel text="× 1 PER ORDER" x={1000} y={560} start={tOnce} size={34} />
        <Gerald seed={14} start={{mouth: 'smile'}} keys={[{f: tShare, p: {...POINT, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={tOrd} volume={0.35} />
      <Sfx name="cash" at={tShare + 10} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s12 — The big one: the service fee, $10 on every single ticket. */
export const S12: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tBig = at('big one');
  const tTen = at('$10');
  const tEvery = at('every single');
  const tExt = at('extreme');
  return (
    <AbsoluteFill>
      <Headline text="The big one: the *service fee*" start={tBig} y={TOP} size={76} hl={C.magenta} stagger={2} />
      <Stage>
        <G x={1000} y={430} s={pop(frame, fps, tTen, 10) * 1.5} r={-5 + wobble(frame, 2, 0.1)} shadow><Tag text="$10" color={C.magenta} w={tagW('$10')} /></G>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <G x={640 + i * 250} y={780} s={pop(frame, fps, tEvery + i * 4, 12) * 0.48}><ConcertTicket price="$50" color={C.cyan} /></G>
            <G x={640 + i * 250} y={665} s={pop(frame, fps, tEvery + 4 + i * 4, 10) * 0.42} r={-6}><Tag text="+$10" color={C.magenta} w={tagW('+$10')} /></G>
          </g>
        ))}
        <Sam seed={15} start={{mouth: 'flat'}} keys={[{f: tExt, p: {brows: 'oneUp', mouth: 'flat', headTilt: 8}, d: 8}]} emotes={[{f: tExt + 2, kind: '?'}]} />
        <Gerald seed={16} enter={tBig - 4} start={{mouth: 'grin'}} />
      </Stage>
      <Sfx name="thud" at={tTen} volume={0.4} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="pop" at={tEvery + 4 + i * 4} volume={0.25} />
      ))}
    </AbsoluteFill>
  );
};

/* s13 — A Tulsa TV station priced real orders: a $26.60 convenience fee alone. */
export const S13: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTv = at('tv station');
  const tOrders = at('real orders');
  const tConv = at('convenience fee');
  const tAmt = at('$26.60');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={830} y={560} s={pop(frame, fps, tTv - 4, 13) * 1.05}>
          <TV label="TULSA NEWS" color={C.cyan}>
            {[0, 1, 2].map((i) => (
              <G key={i} x={-90 + i * 90} y={10} s={pop(frame, fps, tOrders + i * 4, 11) * 0.3} r={-6 + i * 6}>
                <Receipt lines={[{label: '', amount: '', t: 1}, {label: '', amount: '', t: 1}]} w={220} />
              </G>
            ))}
          </TV>
        </G>
        <SLabel text="CONVENIENCE FEE ALONE" x={1380} y={330} start={tConv} size={34} color={C.magenta} />
        <G x={1380} y={500} s={pop(frame, fps, tAmt, 9) * 1.45} r={-4} shadow><Tag text="$26.60" color={C.magenta} w={tagW('$26.60')} /></G>
        <Sam seed={17} start={{mouth: 'smile'}} keys={[{f: tAmt, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: tAmt + 3, kind: '!'}]} />
      </Stage>
      <Sfx name="pop" at={tTv} volume={0.35} />
      <Sfx name="thud" at={tAmt} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s14 — Plus $4 facility and $3.75 processing: $34.35 in fees. */
export const S14: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const t4 = at('$4');
  const t375 = at('$3.75');
  const tTot = at('$34.35');
  const lines: ReceiptLine[] = [
    {label: 'Convenience fee', amount: '$26.60', color: C.magenta, t: 1},
    {label: 'Facility fee', amount: '$4.00', color: C.yellow, t: ramp(frame, t4, 8)},
    {label: 'Processing fee', amount: '$3.75', color: C.green, t: ramp(frame, t375, 8)},
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <Receipt x={960} y={220} w={640} size={36} title="ONE TULSA ORDER" lines={lines}
          total={{label: 'FEES', amount: '$' + (26.6 + 7.75 * ramp(frame, tTot - 8, 12)).toFixed(2), t: ramp(frame, tTot - 8, 6), color: C.magenta}} />
        <Sam seed={18} start={{mouth: 'o', brows: 'raised'}} keys={[{f: tTot, p: {mouth: 'frown', brows: 'sad'}, d: 6}]} emotes={[{f: tTot + 2, kind: 'sweat'}]} />
        <Gerald seed={19} start={{mouth: 'smirk'}} keys={[{f: tTot, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}]} />
      </Stage>
      <Sfx name="pop" at={t4} volume={0.3} />
      <Sfx name="pop" at={t375} volume={0.3} />
      <Sfx name="cash" at={tTot} volume={0.45} />
    </AbsoluteFill>
  );
};

/* Stacked bar: ticket price with the fees on top. */
const PX = 5.4;
const StackBar: React.FC<{x: number; base: number; fee: number; tb: number; tf: number; label: string; feeText: string; baseText: string}> = ({x, base, fee, tb, tf, label, feeText, baseText}) => {
  const hb = base * PX * tb;
  const hf = fee * PX * tf;
  const y0 = 850;
  const line = {stroke: C.ink, strokeWidth: 7, strokeLinejoin: 'round' as const};
  return (
    <g>
      {hb > 1 && <rect x={x - 110} y={y0 - hb} width={220} height={hb} fill={C.cyan} {...line} />}
      {hf > 1 && <rect x={x - 110} y={y0 - hb - hf} width={220} height={hf} fill={C.magenta} {...line} />}
      <text x={x} y={y0 - hb / 2 + 18} textAnchor="middle" fontFamily={DISPLAY} fontSize={48} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke" opacity={tb}>
        {baseText}
      </text>
      <text x={x} y={y0 - hb - hf - 22} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.magenta} stroke={C.ink} strokeWidth={4} paintOrder="stroke" opacity={tf}>
        {feeText}
      </text>
      <text x={x} y={y0 + 50} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>
        {label}
      </text>
    </g>
  );
};

/* s15 — Two hockey tickets $60, plus $16.75 in fees: more than a quarter extra. */
export const S15: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tHock = at('hockey');
  const t60 = at('$60');
  const tFee = at('$16.75');
  const tQ = at('quarter');
  return (
    <AbsoluteFill>
      <Headline text="More than a *quarter* extra" start={tQ - 6} y={TOP} size={78} stagger={2} />
      <Stage>
        <line x1={600} y1={850} x2={1500} y2={850} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <StackBar x={820} base={60} fee={16.75} tb={ramp(frame, t60 - 4, 14)} tf={ramp(frame, tFee - 4, 12)} label="HOCKEY ×2" baseText="$60" feeText="+$16.75" />
        <G x={1230} y={520} s={pop(frame, fps, tQ, 9)} r={-8}><Stamp text="+28%" color={C.red} /></G>
        <Sam seed={20} start={{mouth: 'smile'}} keys={[{f: tFee, p: {mouth: 'o', brows: 'raised'}, d: 6}, {f: tQ, p: {mouth: 'frown', brows: 'angry', ...HIPS}, d: 7}]} />
      </Stage>
      <Sfx name="pop" at={t60} volume={0.3} />
      <Sfx name="pop" at={tFee} volume={0.35} />
      <Sfx name="thud" at={tQ} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s16 — Two orchestra tickets $50, $7 in fees: same town, much smaller receipt. */
export const S16: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tOrch = at('orchestra');
  const t50 = at('$50');
  const t7 = at('$7');
  const tSame = at('same town');
  return (
    <AbsoluteFill>
      <Headline text="*Same town.* Smaller receipt." start={tSame} y={TOP} size={78} stagger={2} hl={C.cyan} />
      <Stage>
        <line x1={600} y1={850} x2={1500} y2={850} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <StackBar x={820} base={60} fee={16.75} tb={1} tf={1} label="HOCKEY ×2" baseText="$60" feeText="+$16.75" />
        <StackBar x={1280} base={50} fee={7} tb={ramp(frame, t50 - 4, 14)} tf={ramp(frame, t7 - 4, 12)} label="ORCHESTRA ×2" baseText="$50" feeText="+$7" />
        <G x={1280} y={300} s={pop(frame, fps, tSame + 8, 9) * 0.8} r={6}><Stamp text="+14%" color={C.green} /></G>
        <Sam seed={20} start={{mouth: 'frown', brows: 'angry'}} keys={[{f: t7, p: {mouth: 'o', brows: 'raised', ...REST}, d: 6}, {f: tSame, p: {...POINT, mouth: 'smile', brows: 'raised'}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={t50} volume={0.3} />
      <Sfx name="pop" at={t7} volume={0.3} />
      <Sfx name="ding" at={tSame + 8} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s17 — At the expensive end: a US concert ticket with a $206 face value. */
export const S17: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tExp = at('expensive');
  const tBig = at('bigger');
  const tWriter = at('one writer');
  const tPull = at('pulled up');
  const t206 = at('$206');
  const grow = lerp(frame, [tBig, tBig + 20], [0.75, 1.3]);
  return (
    <AbsoluteFill>
      <Headline text="The *expensive* end" start={tExp} y={TOP} size={84} />
      <Stage>
        <G x={960} y={560} s={pop(frame, fps, tPull, 13) * grow} r={-3} shadow>
          <ConcertTicket price={'$' + Math.round(lerp(frame, [t206 - 6, t206 + 6], [50, 206]))} color={C.gold} title="US CONCERT" />
        </G>
        <Actor who="librarian" x={1660} y={FLOOR} s={0.6} flip seed={21} enter={tWriter}
          start={{lookX: 1, mouth: 'smile', ...PEER}} rHand={<Magnifier r={30} />} />
        <Sam seed={22} start={{mouth: 'smile'}} keys={[{f: t206, p: {...SHOCK}, d: 6, ease: 'out'}]} emotes={[{f: t206 + 3, kind: '!'}]} />
      </Stage>
      <Sfx name="pop" at={tPull} volume={0.35} />
      <Sfx name="cash" at={t206} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s18 — On that ticket: a $37.55 service fee plus a $6 order processing fee. */
export const S18: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tSvc = at('$37.55');
  const t6 = at('$6');
  const lines: ReceiptLine[] = [
    {label: 'Face value', amount: '$206.00', color: C.cyan, t: 1},
    {label: 'Service fee', amount: '$37.55', color: C.magenta, t: ramp(frame, tSvc - 2, 8)},
    {label: 'Order processing', amount: '$6.00', color: C.green, t: ramp(frame, t6 - 2, 8)},
  ];
  return (
    <AbsoluteFill>
      <Stage>
        <Receipt x={960} y={230} w={640} size={36} title="ONE TICKET" lines={lines} total={{label: 'FEES', amount: '$43.55', t: ramp(frame, t6 + 14, 8), color: C.magenta}} />
        <Sam seed={23} start={{mouth: 'o', brows: 'raised'}} keys={[{f: t6 + 14, p: {mouth: 'frown', brows: 'sad'}, d: 6}]} />
        <Gerald seed={24} start={{mouth: 'smirk'}} keys={[{f: tSvc, p: {...RAISE, mouth: 'grin'}, d: 7, ease: 'out'}, {f: t6 + 10, p: {rShoulder: -40, rElbow: 100}, d: 8}]} />
      </Stage>
      <Sfx name="pop" at={tSvc} volume={0.35} />
      <Sfx name="pop" at={t6} volume={0.3} />
      <Sfx name="cash" at={t6 + 14} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s19 — Ticketmaster says the fees pay for real things. Those costs exist. */
export const S19: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tReal = at('real things');
  const tExist = at('those costs exist');
  const items: [IconName, string, string][] = [
    ['headset', 'Customer service', 'customer service'],
    ['shield', 'Site security', 'site security'],
    ['card', 'Payment costs', 'payment costs'],
    ['staff', 'Event staff', 'event staff'],
    ['booth', 'Box offices', 'box offices'],
  ];
  return (
    <AbsoluteFill>
      <Headline text="What the fees *pay for*" start={tReal - 4} y={TOP} size={78} stagger={2} hl={C.cyan} />
      <Stage>
        {items.map(([icon, label, cue], i) => {
          const t = at(cue);
          const y = 330 + i * 115;
          return (
            <g key={label}>
              <G x={640} y={y} s={pop(frame, fps, t, 11) * 0.48}><Badge icon={icon} color={[C.cyan, C.magenta, C.yellow, C.green, C.grey][i]} /></G>
              <text x={710} y={y + 16} fontFamily={BODY} fontWeight={800} fontSize={46} fill={C.ink} opacity={ramp(frame, t + 2, 8)}>
                {label}
              </text>
              <G x={1180} y={y} s={pop(frame, fps, tExist + i * 3, 10) * 0.9}>
                <path d="M-22,0 L-6,16 L24,-18" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
              </G>
            </g>
          );
        })}
        <Sam seed={25} start={{mouth: 'flat'}} keys={[{f: tExist, p: {mouth: 'smile', headTilt: 8}, d: 6}, {f: tExist + 8, p: {headTilt: -4}, d: 6}, {f: tExist + 16, p: {headTilt: 0}, d: 6}]} />
        <Gerald seed={26} start={{mouth: 'smile', brows: 'raised'}} keys={[{f: tReal, p: {...POINT, mouth: 'smile'}, d: 8, ease: 'out'}]} />
      </Stage>
      {items.map(([, , cue], i) => (
        <Sfx key={i} name="pop" at={at(cue)} volume={0.25} />
      ))}
      <Sfx name="ding" at={tExist} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s20 — But the service fee is shared. Shared with who? */
export const S20: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tShared = at('is shared');
  const tWho = at('with who');
  const split = ramp(frame, tShared, 14);
  return (
    <AbsoluteFill>
      <Headline text="Shared... *with who?*" start={tWho - 4} y={TOP} size={84} hl={C.magenta} />
      <Stage>
        {split < 0.02 ? (
          <G x={960} y={560} s={pop(frame, fps, 0, 14) * 1.4} r={-5}><Tag text="$10" color={C.magenta} w={tagW('$10')} /></G>
        ) : (
          <Pie x={960} y={580} rad={220} t={split} labelSize={60}
            slices={[{v: 45, color: C.magenta, label: '?', pop: split}, {v: 35, color: C.yellow, label: '?', pop: split}, {v: 20, color: C.cyan, label: '?', pop: split}]} />
        )}
        <Sam seed={27} start={{mouth: 'flat'}} keys={[{f: tWho, p: {brows: 'oneUp', headTilt: 10, mouth: 'flat'}, d: 6}]} emotes={[{f: tWho + 2, kind: '?'}]} />
        <Gerald seed={28} start={{mouth: 'smirk'}} keys={[{f: tWho, p: {mouth: 'flat', brows: 'raised', lookX: -1}, d: 6}]} emotes={[{f: tWho + 6, kind: 'sweat'}]} />
      </Stage>
      <Sfx name="pop" at={tShared} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s21 — The help page: venues and teams get a share of the fees, for the rights to sell. */
export const S21: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tHelp = at('help page');
  const tVen = at('venues and teams');
  const tRights = at('in exchange');
  return (
    <AbsoluteFill>
      <Stage>
        <G x={1000} y={450} s={pop(frame, fps, tHelp - 4, 14)}>
          <Browser url="ticket-site.com/help/fees" w={880} h={420}>
            <text x={-390} y={-90} fontFamily={DISPLAY} fontSize={40} fill={C.ink}>Where do fees go?</text>
            <rect x={-394} y={-48} width={790 * ramp(frame, tVen, 16)} height={56} fill={C.yellow} />
            <text x={-390} y={-8} fontFamily={BODY} fontWeight={800} fontSize={36} fill={C.ink}>Venues and teams get a share of the fees</text>
            <rect x={-394} y={18} width={600 * ramp(frame, tRights, 14)} height={56} fill={C.yellow} opacity={0.6} />
            <text x={-390} y={58} fontFamily={BODY} fontWeight={700} fontSize={34} fill={C.ink}>in exchange for the rights to sell</text>
            <text x={-390} y={108} fontFamily={BODY} fontWeight={700} fontSize={34} fill={C.ink}>their tickets.</text>
          </Browser>
        </G>
        <G x={560} y={820} s={pop(frame, fps, tRights, 12) * 0.5} r={-8}><Contract sign={ramp(frame, tRights + 10, 16)} /></G>
        <Gerald seed={29} start={{mouth: 'smile'}} keys={[{f: tVen, p: {...POINT, mouth: 'smile'}, d: 8, ease: 'out'}]} />
      </Stage>
      <Sfx name="click" at={tHelp} volume={0.4} />
      <Sfx name="pop" at={tRights} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s22 — The cut it keeps differs by event: the same $10 split differently per building. */
export const S22: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tEvery = at('every event');
  const tSame = at('same $10');
  const tSplit = at('split very');
  const tBuild = at('building');
  const splits = [70, 40, 55];
  return (
    <AbsoluteFill>
      <Headline text="Same *$10*, different split" start={tSame} y={TOP} size={78} hl={C.magenta} stagger={2} />
      <Stage>
        {splits.map((s, i) => (
          <g key={i}>
            <Pie x={700 + i * 400} y={500} rad={130} t={ramp(frame, tSplit + i * 5, 14)} labelSize={36}
              slices={[{v: s, color: C.magenta, label: `$${s / 10}`}, {v: 100 - s, color: C.yellow, label: `$${(100 - s) / 10}`}]} />
            <G x={700 + i * 400} y={FLOOR} s={pop(frame, fps, tBuild + i * 4, 12) * 0.55}><Venue name={['ARENA', 'STADIUM', 'THEATER'][i]} color={[C.cyan, C.green, C.yellow][i]} frame={frame} /></G>
          </g>
        ))}
        <G x={0} y={0} s={1}>
          <rect x={1660} y={430} width={34} height={34} fill={C.magenta} stroke={C.ink} strokeWidth={5} opacity={ramp(frame, tEvery, 8)} />
          <text x={1710} y={458} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink} opacity={ramp(frame, tEvery, 8)}>TICKET CO.</text>
          <rect x={1660} y={490} width={34} height={34} fill={C.yellow} stroke={C.ink} strokeWidth={5} opacity={ramp(frame, tEvery + 3, 8)} />
          <text x={1710} y={518} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink} opacity={ramp(frame, tEvery + 3, 8)}>VENUE</text>
        </G>
        <Sam s={0.55} x={330} seed={30} start={{mouth: 'flat', brows: 'oneUp'}} keys={[{f: tBuild, p: {mouth: 'o', brows: 'raised'}, d: 6}]} />
      </Stage>
      {splits.map((_, i) => (
        <Sfx key={i} name="pop" at={tSplit + i * 5} volume={0.28} />
      ))}
    </AbsoluteFill>
  );
};
