import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, MONO} from '../theme';
import {useBeat, pop, ramp, lerp} from '../anim';
import {Headline, Sfx} from '../components/Frame';
import {G, Printer, Dialog, Stamp} from '../components/Art';
import {Actor, Backdrop, Behind, Cam, Layer} from '../characters/Actor';
import {Doc, Flute, Scroll} from '../characters/Props';
import {DESK} from './T1';
import * as Cc from '../scenes/C';

/* s21 — The all-in-one refuses to scan */
export const S21: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tScan = at('refusing to scan');
  const tLow = at('ink is low');
  const tZero = at('zero ink');
  const lid = ramp(frame, 0, 12);
  const scanY = lerp((frame % 36) / 36, [0, 0.5, 1], [-150, -70, -150]);
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.3, x: 1150, y: 560}, {f: tZero, z: 1.0, x: 960, y: 540, d: 20}]}>
        <Backdrop name="office" />
        <Layer>
          <G x={DESK.printerX} y={DESK.printerY} s={DESK.printerS}>
            <g transform={`translate(0 -160) rotate(${-lid * 28} -250 0)`}>
              <rect x={-250} y={-26} width={500} height={26} rx={8} fill={C.paperDark} stroke={C.ink} strokeWidth={7} />
            </g>
            <Printer screen={frame >= tLow ? 'INK LOW' : 'SCAN'} screenColor={frame >= tLow ? C.red : C.cyan} blink={frame >= tLow} frame={frame} />
            {frame > tScan && frame < tLow && <rect x={-240} y={scanY} width={480} height={10} fill={C.cyan} opacity={0.85} />}
          </G>
          <Actor who="sam" x={1020} y={1010} s={1.0} seed={50}
            start={{lookX: 1, rShoulder: -80, rElbow: -30}}
            keys={[
              {f: tLow, p: {mouth: 'flat', brows: 'oneUp', rShoulder: -12, rElbow: 6}, d: 8},
              {f: tZero, p: {lookX: -1, mouth: 'frown', brows: 'angry', lShoulder: 40, lElbow: -120, rShoulder: -40, rElbow: 120}, d: 10},
            ]}
            rHand={frame < tLow ? <Doc r={-30} /> : undefined}
            emotes={[{f: tLow + 4, kind: '?'}]}
          />
          <G x={1300} y={330} s={pop(frame, fps, tLow, 10) * 0.58} r={-3} shadow>
            <Dialog title="scanner" msg="Can't scan: ink low" color={C.red} w={680} />
          </G>
          <G x={560} y={560} s={pop(frame, fps, tZero, 10) * 0.85}>
            <rect x={-230} y={-210} width={460} height={420} rx={30} fill={C.white} stroke={C.ink} strokeWidth={7} style={{filter: `drop-shadow(10px 10px 0 ${C.ink})`}} />
            <text y={-135} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.grey}>INK USED BY SCANNING</text>
            <text y={60} textAnchor="middle" fontFamily={DISPLAY} fontSize={200} fill={C.cyan} stroke={C.ink} strokeWidth={6}>0</text>
            <text y={150} textAnchor="middle" fontFamily={DISPLAY} fontSize={56} fill={C.ink}>mL</text>
          </G>
        </Layer>
      </Cam>
      <Sfx name="error" at={tLow} volume={0.25} />
      <Sfx name="pop" at={tZero} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s22 — Car analogy: no radio on low fuel */
export const S22: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tRadio = at('radio');
  const tLow = at('low on');
  const fuel = lerp(frame, [0, at('fuel')], [10, -52]);
  const no = frame >= tRadio;
  const blink = frame > tLow && Math.floor(frame / 8) % 2 === 0;
  const bump = Math.sin(frame * 0.5) * 2;
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.04, x: 960, y: 540 + bump}, {f: 40, z: 1.08, x: 960, y: 560, d: 80}]}>
        <Backdrop name="road" />
        <Layer>
          <G x={960} y={900 + bump} s={1}>
            <path d="M-980,-60 Q0,-140 980,-60 L980,240 L-980,240 Z" fill="#3A3F4B" stroke={C.ink} strokeWidth={8} />
            <G x={-450} y={40}>
              <circle r={150} fill={C.white} stroke={C.paperDark} strokeWidth={12} />
              <text x={-95} y={55} fontFamily={DISPLAY} fontSize={40} fill={C.red}>E</text>
              <text x={70} y={55} fontFamily={DISPLAY} fontSize={40} fill={C.ink}>F</text>
              <g transform={`rotate(${fuel})`}><line x1={0} y1={0} x2={0} y2={-115} stroke={C.red} strokeWidth={11} strokeLinecap="round" /></g>
              <circle r={18} fill={C.ink} />
              <rect x={-26} y={80} width={52} height={44} rx={8} fill={blink ? C.yellow : C.paperDark} />
            </G>
            <G x={330} y={40}>
              <rect x={-300} y={-120} width={600} height={240} rx={24} fill={C.paperDark} stroke={C.white} strokeWidth={6} />
              <rect x={-250} y={-90} width={500} height={100} rx={10} fill={C.ink} />
              <text y={-24} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={40} fill={no ? C.red : C.green}>
                {no ? 'LOW FUEL: NO RADIO' : '♪ FM 101.4'}
              </text>
              {[-150, 0, 150].map((x) => <circle key={x} cx={x} cy={70} r={30} fill={C.white} stroke={C.ink} strokeWidth={6} />)}
            </G>
          </G>
          <G x={1400} y={300} s={pop(frame, fps, tRadio, 9) * 0.8} r={8}>
            <text textAnchor="middle" fontFamily={DISPLAY} fontSize={150} fill={C.red} stroke={C.ink} strokeWidth={6}>?!</text>
          </G>
        </Layer>
      </Cam>
      <Headline text="Like a car that won't play the *radio*… because you're low on fuel." start={at("that's")} y={110} size={56} width={1500} stagger={2} card />
      <Sfx name="error" at={tRadio} volume={0.22} />
    </AbsoluteFill>
  );
};

/* s23 — Final form: Gerald unveils the subscription, then the loop */
export const S23: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tForm = at('final form');
  const tPay = at('pay monthly');
  if (frame >= tPay - 2) return <Cc.S23 />;
  const flash = frame % 22 < 2 ? 0.4 : 0;
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.0, x: 960, y: 560}, {f: tForm, z: 1.25, x: 960, y: 500, d: 30}]}>
        <Backdrop name="penthouse" dim={0.35} />
        <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, rgba(255,210,90,0.35) 0%, rgba(150,40,110,0.22) 40%, rgba(30,10,50,0.35) 75%)`}} />
        <AbsoluteFill style={{background: '#FFFFFF', opacity: flash}} />
        <Layer>
          <Actor who="gerald" x={960} y={1060} s={1.1} seed={51}
            start={{y: 260, mouth: 'smirk', brows: 'smug', lShoulder: 140, lElbow: 30, rShoulder: -140, rElbow: -30}}
            keys={[{f: 0, p: {y: 0}, d: Math.max(10, tForm - 4)}, {f: tForm, p: {mouth: 'grin'}, d: 6}]}
          />
          <G x={960} y={330} s={pop(frame, fps, tForm, 12) * 0.95}>
            <Scroll text="INK SUBSCRIPTION" glow={0.7 + Math.sin(frame * 0.3) * 0.3} />
          </G>
        </Layer>
      </Cam>
      <Sfx name="thud" at={tForm} volume={0.45} />
    </AbsoluteFill>
  );
};

/* s26 — effort bars, then Sam tiptoes toward the trap */
export const S26: React.FC = () => {
  const {at} = useBeat();
  const tNot = at("it's not");
  const tTrap = at('brilliant trap');
  return (
    <AbsoluteFill>
      <Cc.S26 />
      <Layer>
        <Actor who="sam" x={480} y={1000} s={0.72} seed={52} enter={tNot}
          start={{x: -300, lookX: 1, mouth: 'smile', brows: 'raised', lShoulder: 60, lElbow: -90, rShoulder: -60, rElbow: 90, lean: 6}}
          keys={[
            {f: tNot, p: {x: 0}, d: Math.max(12, tTrap - tNot)},
            {f: tTrap + 6, p: {x: -120, mouth: 'o', lShoulder: 150, rShoulder: -150, lElbow: 30, rElbow: -30, lean: -8, y: -30}, d: 6, ease: 'out'},
            {f: tTrap + 14, p: {y: 0}, d: 8},
          ]}
          emotes={[{f: tTrap + 6, kind: '!'}]}
        />
      </Layer>
    </AbsoluteFill>
  );
};

/* s27 — the way out, ending in the library */
export const S27: React.FC = () => {
  const {frame, at} = useBeat();
  const tLib = at('library');
  if (frame < tLib - 2) return <Cc.S27 />;
  return (
    <AbsoluteFill>
      <Cam keys={[{f: tLib, z: 1.0, x: 960, y: 540}, {f: tLib + 10, z: 1.12, x: 900, y: 560, d: 80}]}>
        <Backdrop name="library" />
        <Layer>
          <Actor who="librarian" x={1460} y={1010} s={0.95} flip seed={53}
            start={{lookX: 1, mouth: 'smile', rShoulder: -150, rElbow: -20}}
            keys={[{f: tLib, p: {rShoulder: -130}, d: 6}, {f: tLib + 8, p: {rShoulder: -160}, d: 6}, {f: tLib + 16, p: {rShoulder: -130}, d: 6}, {f: tLib + 24, p: {rShoulder: -160}, d: 6}]}
          />
          <Actor who="sam" x={760} y={1010} s={1.0} seed={54}
            start={{mouth: 'grin', brows: 'raised', rShoulder: -140, rElbow: -20, lookX: 1}}
            rHand={<Doc title="PRINTED!" r={-6} />}
            emotes={[{f: tLib + 4, kind: 'sparkle'}]}
          />
        </Layer>
      </Cam>
      <Headline text="…the one at the *library.*" start={tLib} y={120} size={68} card width={1200} hl={C.green} />
      <Sfx name="ding" at={tLib + 4} volume={0.25} />
    </AbsoluteFill>
  );
};

/* s29 — Callback: out of cyan again… working as intended */
export const S29: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tRemember = at('remember');
  const tIntended = at('working exactly');
  const second = frame >= tIntended - 4;
  if (!second)
    return (
      <AbsoluteFill>
        <Cam keys={[{f: 0, z: 1.2, x: 1150, y: 560}, {f: tRemember, z: 1.35, x: 1180, y: 540, d: 40}]}>
          <Backdrop name="office" />
          <Layer>
            <G x={DESK.printerX} y={DESK.printerY} s={DESK.printerS}>
              <Printer screen="NO CYAN" screenColor={C.red} blink frame={frame} paper={lerp(frame, [at('black and white'), at('black and white') + 40], [0, 0.45])} />
            </G>
            <Actor who="sam" x={1020} y={1010} s={1.0} seed={55}
              start={{lookX: 1, mouth: 'frown', brows: 'sad', headTilt: 14, lookY: 1, lean: 4, squash: 0.97}}
              keys={[{f: at("it's not broken"), p: {lookX: 0, lookY: 0, headTilt: 0, mouth: 'flat', brows: 'oneUp'}, d: 10}]}
              emotes={[{f: 6, kind: 'sweat'}]}
            />
          </Layer>
        </Cam>
        <Headline text="It's not *broken.*" start={at("it's not broken")} y={120} size={72} card width={1000} />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill>
      <Cam keys={[{f: tIntended, z: 1.05, x: 960, y: 560}, {f: tIntended + 6, z: 1.18, x: 1100, y: 520, d: 60}]}>
        <Backdrop name="penthouse" />
        <Layer>
          <Behind y={760} id="geraldDesk">
            <Actor who="gerald" x={1200} y={1010} s={1.05} seed={56}
              start={{mouth: 'grin', brows: 'smug', lookX: -1, rShoulder: -130, rElbow: -40}}
              rHand={<Flute liquid={C.cyan} />}
              emotes={[{f: tIntended + 6, kind: 'sparkle'}]}
            />
          </Behind>
          <G x={820} y={930} s={pop(frame, fps, tIntended + 4, 8) * 0.72} r={-5}>
            <Stamp text="WORKING AS INTENDED" color={C.green} />
          </G>
        </Layer>
      </Cam>
      <Sfx name="thud" at={tIntended + 4} volume={0.4} />
      <Sfx name="ding" at={tIntended + 10} volume={0.2} />
    </AbsoluteFill>
  );
};

/* s30 — Subscribe, with Sam pointing at the button */
export const S30: React.FC = () => {
  const {at} = useBeat();
  const tSub = at('subscribed');
  return (
    <AbsoluteFill>
      <Cc.S30 />
      <Layer>
        <Actor who="sam" x={380} y={1040} s={0.8} seed={57} enter={at('you')}
          start={{lookX: 1, mouth: 'grin', brows: 'raised', rShoulder: -95, rElbow: 0}}
          keys={[{f: tSub + 6, p: {lShoulder: 150, lElbow: 20, mouth: 'grin'}, d: 6, ease: 'out'}]}
          emotes={[{f: tSub + 10, kind: 'sparkle'}]}
        />
      </Layer>
    </AbsoluteFill>
  );
};

