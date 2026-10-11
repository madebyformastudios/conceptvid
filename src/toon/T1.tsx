import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY} from '../theme';
import {useBeat, pop, wobble, lerp} from '../anim';
import {Headline, Label, Sfx} from '../components/Frame';
import {G, Printer, Dialog, Groceries, Tag, Blade, Coin} from '../components/Art';
import {Actor, Backdrop, Behind, Cam, Layer} from '../characters/Actor';
import {Ticket, Doc, HeldCartridge, HeldRazor} from '../characters/Props';
import * as A from '../scenes/A';

// Shared office geometry (sets/office.jpeg): desk top along the right, open floor on the left.
export const DESK = {printerX: 1420, printerY: 548, printerS: 0.56};

/* s02 — Sam walks in: one page, a boarding pass, a contract */
export const S02: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tOne = at('One.');
  const tPass = at('boarding');
  const tContract = at('contract');
  const tNever = at('never read');
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1, x: 960, y: 540}, {f: tOne, z: 1.12, x: 820, y: 560, d: 60}]}>
        <Backdrop name="office" />
        <Layer>
          <G x={DESK.printerX} y={DESK.printerY} s={DESK.printerS}>
            <Printer frame={frame} />
          </G>
          <Actor
            who="sam" x={640} y={1000} s={1.02} seed={1}
            start={{x: -760}}
            keys={[
              {f: 0, p: {x: 0}, d: Math.max(20, tOne - 10)},
              {f: tOne, p: {rShoulder: -165, rElbow: -10, mouth: 'smile', brows: 'raised'}, d: 7, ease: 'out'},
              {f: tPass - 4, p: {rShoulder: -12, rElbow: 6, lShoulder: 135, lElbow: 20, lookX: -1}, d: 8},
              {f: tContract - 4, p: {rShoulder: -120, rElbow: -20, lookX: 1}, d: 8},
              {f: tNever, p: {blink: 1, mouth: 'smirk', headTilt: -8, brows: 'neutral'}, d: 6},
            ]}
            lHand={frame >= tPass - 2 ? <Ticket /> : undefined}
            rHand={frame >= tContract - 2 ? <Doc title="CONTRACT" /> : undefined}
          />
          <G x={420} y={330} s={pop(frame, fps, tOne, 9) * (1 - lerp(frame, [tPass - 6, tPass], [0, 1]))} r={-10}>
            <text textAnchor="middle" fontFamily={DISPLAY} fontSize={260} fill={C.magenta} stroke={C.ink} strokeWidth={8}>1</text>
          </G>
        </Layer>
      </Cam>
      <Headline text="You need to print *one* page." start={at('you need')} y={120} size={70} card width={1300} />
      <Sfx name="thud" at={tOne} volume={0.35} />
      <Sfx name="pop" at={tPass} volume={0.22} />
      <Sfx name="pop" at={tContract} volume={0.22} />
    </AbsoluteFill>
  );
};

/* s03 — Press print. OUT OF CYAN. */
export const S03: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tPress = at('press print');
  const tTells = at('tells you');
  const tCyan = at('out of cyan');
  const err = frame >= tTells;
  const shake = err ? Math.sin(frame * 2.3) * lerp(frame, [tTells, tTells + 16], [12, 0]) : 0;
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.45, x: 1180, y: 560}, {f: tTells, z: 1.6, x: 1230, y: 540, d: 30}]}>
        <Backdrop name="office" />
        <Layer>
          <G x={DESK.printerX + shake} y={DESK.printerY} s={DESK.printerS}>
            <Printer screen={err ? 'ERROR' : frame > tPress + 8 ? 'PRINTING' : 'READY'} screenColor={err ? C.red : C.green} blink={err} frame={frame} paper={frame > tPress + 8 && !err ? lerp(frame, [tPress + 8, tTells], [0, 0.3]) : 0} />
          </G>
          <Actor
            who="sam" x={1010} y={1000} s={1.02} seed={2}
            keys={[
              {f: tPress - 6, p: {rShoulder: -96, rElbow: -18, lookX: 1, mouth: 'smile'}, d: 8},
              {f: tPress + 10, p: {rShoulder: -20, rElbow: 0}, d: 8},
              {f: tTells, p: {mouth: 'o', brows: 'raised', lShoulder: 60, lElbow: 70, y: -16, lookX: 1}, d: 5, ease: 'out'},
              {f: tTells + 6, p: {y: 0}, d: 8},
            ]}
            emotes={[{f: tTells, kind: '!'}]}
          />
          <G x={1260} y={330} s={pop(frame, fps, tCyan, 10) * 0.62} r={-3} shadow>
            <Dialog title="printer.exe" msg="OUT OF CYAN" w={640} />
          </G>
        </Layer>
      </Cam>
      <Sfx name="click" at={tPress + 6} volume={0.5} />
      <Sfx name="error" at={tCyan} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s04 — Deadpan close-up: printing in black and white */
export const S04: React.FC = () => {
  const {at} = useBeat();
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 2.0, x: 640, y: 560}, {f: 4, z: 2.25, x: 640, y: 540, d: 50}]}>
        <Backdrop name="office" />
        <Layer>
          <Actor
            who="sam" x={640} y={1000} s={1.02} seed={3}
            start={{mouth: 'flat', brows: 'oneUp', headTilt: -4, rShoulder: -40, rElbow: -70}}
            keys={[{f: at('black'), p: {headTilt: 4}, d: 12}]}
            rHand={<Doc title="B&W" r={-4} />}
          />
        </Layer>
      </Cam>
      <Headline text="…in *black & white.*" start={at('black')} y={850} size={78} card width={1300} />
    </AbsoluteFill>
  );
};

/* s05 — chart, with Sam presenting */
export const S05: React.FC = () => {
  const {at} = useBeat();
  return (
    <AbsoluteFill>
      <A.S05 />
      <Layer>
        <Actor
          who="sam" x={190} y={1040} s={0.62} seed={4}
          keys={[
            {f: at('numbers'), p: {rShoulder: -100, rElbow: 0, mouth: 'smile', lookX: 1}, d: 8},
            {f: at('costs more'), p: {mouth: 'o', brows: 'raised', rShoulder: -150, lShoulder: 150, lElbow: 30, rElbow: -30}, d: 6, ease: 'out'},
            {f: at('luxury'), p: {mouth: 'open', rShoulder: -100, lShoulder: 12, lElbow: -6, rElbow: 0}, d: 8},
          ]}
          emotes={[{f: at('costs more'), kind: '!', d: 30}]}
        />
      </Layer>
    </AbsoluteFill>
  );
};

/* s06 — podium, with a stunned Sam */
export const S06: React.FC = () => {
  const {at} = useBeat();
  return (
    <AbsoluteFill>
      <A.S06 />
      <Layer>
        <Actor
          who="sam" x={1730} y={1040} s={0.58} flip seed={5}
          start={{lookX: 1}}
          keys={[{f: at('legally'), p: {mouth: 'o', brows: 'raised', lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80}, d: 6, ease: 'out'}]}
          emotes={[{f: at('legally'), kind: 'sweat'}]}
        />
      </Layer>
    </AbsoluteFill>
  );
};

/* s08 — Supermarket: one cartridge vs a week of groceries */
export const S08: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tMore = at('cost more');
  const tWeek = at('weekly');
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.08, x: 900, y: 560}, {f: tMore, z: 1.2, x: 1000, y: 520, d: 40}]}>
        <Backdrop name="checkout" />
        <Layer>
          <Behind y={452} id="cashierClip">
            <Actor
              who="cashier" x={1500} y={760} s={0.8} flip seed={6}
              start={{lookX: 1}}
              keys={[{f: tMore, p: {mouth: 'o', brows: 'raised', y: -20, lShoulder: 140, rShoulder: -140, lElbow: 20, rElbow: -20}, d: 5, ease: 'out'}, {f: tMore + 6, p: {y: 0}, d: 8}]}
              emotes={[{f: tMore, kind: '!'}]}
            />
          </Behind>
          <G x={1020} y={505} s={pop(frame, fps, at('milliliters'), 12) * 0.34}>
            <HeldCartridge color={C.magenta} label="INK" s={1} />
          </G>
          <G x={420} y={900} s={pop(frame, fps, tWeek - 6, 12) * 1.0}>
            <Groceries />
          </G>
          <Actor
            who="sam" x={720} y={1010} s={1.0} seed={7}
            keys={[
              {f: 0, p: {rShoulder: -70, rElbow: -10, lookX: 1}, d: 1},
              {f: at('milliliters'), p: {rShoulder: -12, rElbow: 6}, d: 10},
              {f: tWeek, p: {lShoulder: 70, lElbow: 10, lookX: -1}, d: 10},
              {f: tMore + 4, p: {lookX: 1, mouth: 'flat', brows: 'sad'}, d: 10},
            ]}
          />
          <G x={1020} y={330} s={pop(frame, fps, tMore, 10) * 0.9} r={8}>
            <Tag text="$$$" color={C.red} w={190} />
          </G>
          <G x={420} y={540} s={pop(frame, fps, tWeek, 10) * 0.9} r={-6}>
            <Tag text="$" color={C.green} w={130} />
          </G>
        </Layer>
      </Cam>
      <Headline text="Coloured water vs. a week of *groceries*" start={at('so why')} y={120} size={64} width={1500} card />
      <Sfx name="cash" at={tMore} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s09 — 1900s street: the razor salesman */
export const S09: React.FC = () => {
  const {frame, at} = useBeat();
  const tRaz = at('razors');
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1, x: 960, y: 540}, {f: 4, z: 1.12, x: 900, y: 560, d: 120}]}>
        <Backdrop name="oldstreet" />
        <Layer>
          <Actor
            who="salesman" x={820} y={1010} s={1.0} seed={8}
            start={{x: 900, lookX: -1}}
            keys={[
              {f: 0, p: {x: 0}, d: Math.max(20, tRaz - 14)},
              {f: tRaz - 4, p: {rShoulder: -128, rElbow: -30, mouth: 'grin', brows: 'raised', lookX: 0}, d: 8, ease: 'out'},
              {f: at('model'), p: {talk: 0}, d: 4},
            ]}
            talk={[[tRaz + 6, at('model') + 10]]}
            rHand={frame >= tRaz - 6 ? <HeldRazor /> : undefined}
            emotes={[{f: tRaz + 2, kind: 'sparkle', d: 40}]}
          />
        </Layer>
      </Cam>
      <Headline text="The *razor-and-blades* model" start={at('called')} y={120} size={72} hl={C.cyan} card width={1400} />
    </AbsoluteFill>
  );
};

/* s10 — free razor, then blades forever */
export const S10: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCheap = at('cheap');
  const tLoss = at('loss');
  const tBlades = at('blades');
  const tForever = at('forever');
  const n = Math.max(0, Math.min(16, Math.floor((frame - tBlades) / 5)));
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.05, x: 900, y: 560}, {f: tBlades, z: 1.0, x: 960, y: 540, d: 30}]}>
        <Backdrop name="oldstreet" />
        <Layer>
          <Actor
            who="salesman" x={1300} y={1010} s={1.0} flip seed={9}
            start={{lookX: 1}}
            keys={[
              {f: 0, p: {rShoulder: -95, rElbow: 0, mouth: 'grin'}, d: 1},
              {f: tBlades - 6, p: {rShoulder: -12, rElbow: 6, lShoulder: 40, lElbow: -110, mouth: 'smile'}, d: 10},
            ]}
            rHand={frame < tCheap + 6 ? <HeldRazor /> : undefined}
            lHand={frame >= tBlades ? <g transform="translate(0 -20)"><Coin s={0.7} /></g> : undefined}
          />
          <Actor
            who="angry1" x={560} y={1010} s={1.0} seed={10}
            start={{mouth: 'smile', lookX: 1}}
            keys={[
              {f: tCheap, p: {rShoulder: -90, rElbow: -10, brows: 'raised'}, d: 8},
              {f: tBlades, p: {rShoulder: -12, rElbow: 6, mouth: 'flat'}, d: 10},
              {f: tForever, p: {mouth: 'frown', brows: 'sad', headTilt: 10}, d: 10},
            ]}
            emotes={[{f: tForever, kind: 'sweat'}]}
            rHand={frame >= tCheap + 6 ? <HeldRazor /> : undefined}
          />
          <G x={560} y={420} s={pop(frame, fps, tCheap, 10) * 0.9} r={-6}>
            <Tag text={frame >= tLoss ? '−$' : 'FREE'} color={frame >= tLoss ? C.red : C.yellow} w={frame >= tLoss ? 150 : 200} />
          </G>
          {Array.from({length: n}).map((_, i) => {
            const d = pop(frame, fps, tBlades + i * 5, 14);
            return (
              <G key={i} x={300 + (i % 4) * 80 - Math.floor(i / 4) * 14} y={lerp(d, [0, 1], [-100, 1000 - Math.floor(i / 4) * 34])} s={0.5} r={(i % 3) * 4 - 4} shadow>
                <Blade color={[C.white, C.cyan, C.yellow][i % 3]} />
              </G>
            );
          })}
          <G x={1300} y={300} s={pop(frame, fps, tForever, 8)} r={wobble(frame, 4)}>
            <text textAnchor="middle" y={60} fontFamily={DISPLAY} fontSize={220} fill={C.magenta} stroke={C.ink} strokeWidth={6}>∞</text>
          </G>
        </Layer>
      </Cam>
      <Label text="sell the razor cheap…" x={560} y={140} start={tCheap} size={40} />
      <Label text="…sell the blades forever" x={1300} y={140} start={tBlades} size={40} />
      <Sfx name="cash" at={tBlades + 6} volume={0.22} />
      <Sfx name="cash" at={tForever} volume={0.25} />
    </AbsoluteFill>
  );
};

