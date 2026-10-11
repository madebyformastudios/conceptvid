import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DISPLAY, MONO, BODY} from '../theme';
import {useBeat, pop, ramp, lerp, wobble} from '../anim';
import {Headline, Label, Sfx} from '../components/Frame';
import {G, Printer, Cartridge, Stamp, Arrow, Razor, Tag} from '../components/Art';
import {Actor, Backdrop, Behind, Cam, Layer} from '../characters/Actor';
import {HeldCartridge, Magnifier, PrinterBox, HeldGavel} from '../characters/Props';
import {DESK} from './T1';
import * as B from '../scenes/B';

/* s11 — Boardroom: Gerald unveils the printer */
export const S11: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tTook = at('took');
  const tPerf = at('perfected');
  const cloth = ramp(frame, tTook, 12);
  const sketch = ramp(frame, at('idea'), 18);
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.05, x: 960, y: 520}, {f: tPerf, z: 1.15, x: 1000, y: 520, d: 30}]}>
        <Backdrop name="boardroom" />
        <Layer>
          {/* whiteboard sketch: razor -> printer */}
          <g transform="translate(330 330)" opacity={sketch}>
            <G x={-150} y={-10} s={0.3} r={-20}><Razor /></G>
            <Arrow x1={-60} y1={0} x2={60} y2={0} t={sketch} color={C.red} w={8} />
            <G x={160} y={10} s={0.28}><Printer /></G>
          </g>
          <Behind y={655} id="board1">
            <Actor who="exec" x={560} y={940} s={0.8} seed={21} flip start={{lookX: 1}}
              keys={[{f: tPerf - 4, p: {lShoulder: 70, lElbow: 70, rShoulder: -70, rElbow: -70, mouth: 'grin'}, d: 6}]} />
            <Actor who="exec" x={1640} y={940} s={0.8} seed={22} start={{lookX: -1}}
              keys={[{f: tPerf - 2, p: {lShoulder: 70, lElbow: 70, rShoulder: -70, rElbow: -70, mouth: 'grin'}, d: 6}]} />
            <Actor who="gerald" x={1260} y={950} s={0.95} seed={23}
              start={{mouth: 'smirk', brows: 'smug', lookX: -1}}
              keys={[
                {f: tTook - 6, p: {rShoulder: -70, rElbow: -20}, d: 6},
                {f: tTook + 6, p: {rShoulder: -150, rElbow: -10, mouth: 'grin'}, d: 8, ease: 'out'},
                {f: tPerf, p: {rShoulder: -40, rElbow: -90, lShoulder: 40, lElbow: 90, brows: 'smug', mouth: 'smirk'}, d: 10},
              ]}
              talk={[[2, tTook - 4]]}
              emotes={[{f: tPerf, kind: 'sparkle'}]}
            />
          </Behind>
          <G x={960} y={690} s={0.62}>
            <Printer screen="$$$" frame={frame} />
            {cloth < 1 && (
              <path d={`M-300,100 Q-320,-170 -60,-290 Q80,-320 300,-180 Q330,0 300,100 Z`} fill="#B5302E" stroke={C.ink} strokeWidth={8}
                transform={`translate(${cloth * 700} ${-cloth * 160}) rotate(${cloth * 40})`} opacity={1 - cloth} />
            )}
          </G>
        </Layer>
      </Cam>
      <Headline text="…and *perfected* it." start={tPerf} y={120} size={70} card width={1100} hl={C.magenta} />
      <Sfx name="whoosh" at={tTook} volume={0.25} />
      <Sfx name="ding" at={tPerf} volume={0.2} />
    </AbsoluteFill>
  );
};

/* Profit gauge reused from the infographic cut. */
const Gauge: React.FC<{needle: number; x: number; y: number; s: number}> = ({needle, x, y, s}) => (
  <G x={x} y={y} s={s}>
    <path d="M-300,0 A300,300 0 0 1 300,0 Z" fill={C.paper} opacity={0.92} />
    <path d="M-300,0 A300,300 0 0 1 0,-300" fill="none" stroke={C.red} strokeWidth={60} />
    <path d="M0,-300 A300,300 0 0 1 300,0" fill="none" stroke={C.green} strokeWidth={60} />
    <path d="M-330,0 A330,330 0 0 1 330,0" fill="none" stroke={C.ink} strokeWidth={7} />
    <path d="M-270,0 A270,270 0 0 1 270,0" fill="none" stroke={C.ink} strokeWidth={7} />
    <text x={-300} y={60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.red}>LOSS</text>
    <text x={300} y={60} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.green}>PROFIT</text>
    <g transform={`rotate(${-needle})`}><line x1={0} y1={0} x2={0} y2={-250} stroke={C.ink} strokeWidth={14} strokeLinecap="round" /></g>
    <circle r={30} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
  </G>
);

/* s12 — $49 printer in the shop, then Gerald shrugs at the profit gauge */
export const S12: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFifty = at('fifty');
  const tManu = at('manufacturer');
  const tEven = at('break even');
  const tLose = at('lose money');
  const tCare = at("don't care");
  const second = frame >= tManu - 2;
  const needle = frame < tEven ? lerp(frame, [tManu, tEven], [70, 20]) : frame < tLose ? lerp(frame, [tEven, tEven + 12], [20, 0]) : lerp(frame, [tLose, tLose + 14], [0, -55]) + wobble(frame, 2, 0.5);
  return (
    <AbsoluteFill>
      {!second ? (
        <Cam keys={[{f: 0, z: 1.05, x: 960, y: 560}, {f: tFifty, z: 1.2, x: 900, y: 560, d: 30}]}>
          <Backdrop name="store" />
          <Layer>
            <Actor who="sam" x={760} y={1010} s={1.0} seed={24}
              start={{x: -500}}
              keys={[
                {f: 0, p: {x: 0}, d: Math.max(15, tFifty - 10)},
                {f: tFifty - 6, p: {lShoulder: 55, lElbow: -40, rShoulder: -55, rElbow: 40, mouth: 'grin', brows: 'raised'}, d: 8, ease: 'out'},
              ]}
              emotes={[{f: tFifty, kind: 'sparkle', d: 30}]}
            />
            <G x={760} y={lerp(frame, [tFifty - 6, tFifty + 4], [1300, 905])} s={0.72}>
              <PrinterBox price="$49" />
            </G>
          </Layer>
        </Cam>
      ) : (
        <Cam keys={[{f: tManu, z: 1.0, x: 960, y: 540}, {f: tCare, z: 1.08, x: 1100, y: 560, d: 30}]}>
          <Backdrop name="penthouse" />
          <Layer>
            <Gauge needle={needle} x={620} y={760} s={0.85 * pop(frame, fps, tManu, 14)} />
            <text x={620} y={860} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.ink} opacity={ramp(frame, tManu, 10)}>PROFIT ON THE PRINTER</text>
            <Actor who="gerald" x={1420} y={1010} s={1.0} seed={25} flip
              start={{lookX: 1, mouth: 'smirk', brows: 'smug'}}
              keys={[
                {f: tLose, p: {mouth: 'flat', brows: 'raised'}, d: 6},
                {f: tCare - 4, p: {lShoulder: 60, lElbow: -120, rShoulder: -60, rElbow: 120, headTilt: -10, mouth: 'smirk', brows: 'smug'}, d: 8, ease: 'out'},
              ]}
            />
          </Layer>
        </Cam>
      )}
      {second && <Headline text="They don't *care.*" start={tCare} y={130} x={1400} size={70} card width={800} />}
      <Sfx name="cash" at={tFifty} volume={0.22} />
      <Sfx name="whoosh" at={tManu - 2} volume={0.2} />
    </AbsoluteFill>
  );
};

/* s13 — You are the product */
export const S13: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tYou = at('you are');
  const spot = ramp(frame, 0, 10);
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.1, x: 960, y: 560}, {f: tYou, z: 1.3, x: 860, y: 520, d: 20}]}>
        <Backdrop name="penthouse" dim={0.55} />
        <AbsoluteFill style={{background: `radial-gradient(circle at 46% 58%, rgba(255,240,200,${0.35 * spot}) 0%, rgba(0,0,0,0) 26%, rgba(10,10,20,${0.45 * spot}) 50%)`}} />
        <Layer>
          <G x={880} y={1010} s={1}>
            <ellipse rx={260} ry={46} fill="#FFF2C8" opacity={0.5 * spot} />
          </G>
          <Actor who="sam" x={880} y={1010} s={1.05} seed={26}
            start={{mouth: 'flat', brows: 'sad', lookX: 1}}
            keys={[{f: tYou, p: {mouth: 'o', brows: 'raised', lookX: 0}, d: 6, ease: 'out'}]}
            emotes={[{f: tYou + 4, kind: 'sweat'}]}
          />
          <G x={880} y={700} s={pop(frame, fps, tYou, 10) * 0.85} r={-6}>
            <line x1={-40} y1={-120} x2={-10} y2={-40} stroke={C.ink} strokeWidth={5} />
            <line x1={40} y1={-120} x2={-10} y2={-40} stroke={C.ink} strokeWidth={5} />
            <Tag text="YOU" color={C.magenta} w={200} />
          </G>
          <Actor who="gerald" x={1500} y={1010} s={1.0} seed={27} flip
            start={{x: -400, lookX: 1, mouth: 'grin', brows: 'smug'}}
            keys={[{f: at('product'), p: {x: 0, lShoulder: 70, lElbow: 10}, d: 18}]}
            lHand={<Magnifier r={-60} />}
          />
        </Layer>
      </Cam>
      <Headline text="The printer isn't the product. *You are.*" start={at('the printer')} y={110} size={66} card width={1400} hl={C.magenta} />
      <Sfx name="pop" at={tYou} volume={0.35} />
    </AbsoluteFill>
  );
};

/* s14 — Unboxing the starter cartridge, then the x-ray truth */
export const S14: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tStarter = at('starter');
  const tLook = at('look exactly');
  if (frame >= tLook - 2) return <B.S14 />;
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.05, x: 900, y: 560}, {f: tStarter, z: 1.25, x: 820, y: 560, d: 24}]}>
        <Backdrop name="livingroom" />
        <Layer>
          <G x={1080} y={960} s={0.9}>
            <rect x={-150} y={-140} width={300} height={150} rx={8} fill="#D9B77F" stroke={C.ink} strokeWidth={7} />
            <path d="M-150,-140 L-200,-210 L-60,-200 Z M150,-140 L200,-210 L60,-200 Z" fill="#E6C892" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
          </G>
          <Actor who="sam" x={760} y={1010} s={1.0} seed={28}
            start={{mouth: 'grin', brows: 'raised', lookX: 1, rShoulder: -40, rElbow: -40}}
            keys={[{f: tStarter - 4, p: {rShoulder: -150, rElbow: -20, lookX: 1, lookY: -1}, d: 8, ease: 'out'}]}
            rHand={frame >= tStarter - 6 ? <HeldCartridge color={C.magenta} label="STARTER" s={0.42} /> : undefined}
            emotes={[{f: tStarter, kind: 'sparkle', d: 26}]}
          />
        </Layer>
      </Cam>
      <Headline text="So-called *starter* cartridges" start={at('so-called')} y={120} size={68} card width={1300} />
      <Sfx name="pop" at={tStarter} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s15 — graph + Gerald's wink */
export const S15: React.FC = () => {
  const {at} = useBeat();
  return (
    <AbsoluteFill>
      <B.S15 />
      <Layer>
        <Actor who="gerald" x={1730} y={1050} s={0.62} flip seed={29} enter={at('coincidentally') - 4}
          start={{lookX: 1, mouth: 'smirk', brows: 'smug', lShoulder: 40, lElbow: -100, rShoulder: -40, rElbow: 100}}
          keys={[{f: at('coincidentally') + 8, p: {blink: 1, headTilt: -8}, d: 4}, {f: at('coincidentally') + 20, p: {blink: 0, headTilt: 0}, d: 6}]}
          emotes={[{f: at('pure'), kind: 'sparkle'}]}
        />
      </Layer>
    </AbsoluteFill>
  );
};

/* s16 — The cheap-ink aisle, with Gerald lurking */
export const S16: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tCheap = at('cheaper');
  const tThought = at('thought of that');
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.1, x: 860, y: 560}, {f: tThought, z: 1.05, x: 1000, y: 560, d: 24}]}>
        <Backdrop name="store" />
        <Layer>
          <Actor who="gerald" x={1560} y={1010} s={1.0} flip seed={30}
            start={{x: 500, lookX: 1, mouth: 'smirk', brows: 'angry'}}
            keys={[{f: tThought - 8, p: {x: 0}, d: 14}, {f: tThought + 8, p: {brows: 'smug', mouth: 'grin'}, d: 6}]}
          />
          <Actor who="sam" x={760} y={1010} s={1.0} seed={31}
            start={{mouth: 'smile', lookX: 1}}
            keys={[
              {f: tCheap - 6, p: {rShoulder: -100, rElbow: -10, brows: 'raised', mouth: 'grin'}, d: 8},
              {f: tThought + 4, p: {lookX: 1, mouth: 'o'}, d: 6},
            ]}
            rHand={frame >= tCheap - 6 ? <HeldCartridge color={C.cyan} label="OTHER" cheap s={0.42} /> : undefined}
            emotes={[{f: tThought + 6, kind: '!'}]}
          />
          <G x={980} y={380} s={pop(frame, fps, tCheap, 10) * 0.9} r={6}>
            <Tag text="$" color={C.green} w={130} />
          </G>
        </Layer>
      </Cam>
      <Headline text="“I'll just buy *cheaper* ink.”" start={at('fine')} y={120} size={66} card width={1300} />
      <Sfx name="thud" at={tThought} volume={0.3} />
    </AbsoluteFill>
  );
};

/* s19 — Firmware update: the printer turns on the cheap cartridge */
export const S19: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tFine = at('perfectly fine');
  const tStop = at('stopped');
  const tFw = at('firmware update');
  const tWorse = at('worse');
  const tPurpose = at('on purpose');
  const prog = lerp(frame, [tStop - 4, tFw + 6], [0, 1]);
  const ejected = frame >= tFw + 8;
  const ej = ramp(frame, tFw + 8, 16);
  const bad = ejected;
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.25, x: 1100, y: 560}, {f: tFw + 8, z: 1.12, x: 1000, y: 560, d: 20}]}>
        <Backdrop name="office" />
        <Layer>
          <G x={DESK.printerX + (bad ? Math.sin(frame * 2) * lerp(frame, [tFw + 8, tFw + 20], [10, 0]) : 0)} y={DESK.printerY} s={DESK.printerS}>
            <Printer screen={bad ? 'REJECTED' : 'READY'} screenColor={bad ? C.red : C.green} blink={bad} frame={frame} paper={!bad ? lerp(frame, [tFine - 10, tFine + 20], [0, 0.6]) : 0} />
          </G>
          {ejected && ej < 1 && (
            <G x={lerp(ej, [0, 1], [1360, 900])} y={lerp(ej, [0, 1], [520, 980]) - Math.sin(ej * Math.PI) * 260} s={0.32} r={ej * 540}>
              <Cartridge color={C.cyan} label="OTHER" cheap />
            </G>
          )}
          {ej >= 1 && <G x={900} y={980} s={0.32} r={160}><Cartridge color={C.cyan} label="OTHER" cheap /></G>}
          <Actor who="sam" x={1000} y={1010} s={1.0} seed={32}
            start={{mouth: 'smile', lookX: 1}}
            keys={[
              {f: tFine, p: {mouth: 'grin', rShoulder: -60, rElbow: -60}, d: 8},
              {f: tFw + 8, p: {mouth: 'o', brows: 'raised', lShoulder: 150, rShoulder: -150, lElbow: 30, rElbow: -30, y: -18}, d: 5, ease: 'out'},
              {f: tFw + 16, p: {y: 0}, d: 8},
              {f: tWorse, p: {mouth: 'frown', brows: 'angry', lShoulder: 12, rShoulder: -12, lElbow: -6, rElbow: 6}, d: 10},
            ]}
            emotes={[{f: tFw + 8, kind: '!', d: 24}, {f: tWorse + 4, kind: 'anger'}]}
          />
          {/* update window */}
          <G x={1250} y={300} s={pop(frame, fps, tStop - 6, 12) * (1 - ramp(frame, tFw + 10, 8)) * 0.8}>
            <rect x={-380} y={-110} width={760} height={220} rx={18} fill={C.white} stroke={C.ink} strokeWidth={7} />
            <text x={-340} y={-40} fontFamily={MONO} fontWeight={700} fontSize={32} fill={C.ink}>Installing firmware update…</text>
            <rect x={-340} y={10} width={680} height={50} rx={25} fill={C.paperDark} stroke={C.ink} strokeWidth={6} />
            <rect x={-334} y={16} width={668 * prog} height={38} rx={19} fill={C.cyan} />
          </G>
          <G x={1300} y={300} s={pop(frame, fps, tPurpose, 9) * 0.85} r={-7}>
            <Stamp text="ON PURPOSE" color={C.magenta} />
          </G>
        </Layer>
      </Cam>
      <Sfx name="error" at={tFw + 8} volume={0.25} />
      <Sfx name="whoosh" at={tFw + 8} volume={0.25} />
      <Sfx name="thud" at={tPurpose} volume={0.4} />
    </AbsoluteFill>
  );
};

/* s20 — Courtroom, then the angry internet */
export const S20: React.FC = () => {
  const {frame, fps, at} = useBeat();
  const tLaw = at('lawsuits');
  const tSettle = at('settlements');
  const tAngry = at('angry');
  const slam = frame >= tLaw && frame < tLaw + 6;
  const crowd: [string, number, string][] = [['angry1', 360, '#@%!'], ['angry2', 640, 'SCAM!'], ['angry3', 1560, '>:('], ['sam', 1830, '!!!']];
  return (
    <AbsoluteFill>
      <Cam keys={[{f: 0, z: 1.05, x: 960, y: 520}, {f: tAngry, z: 1.0, x: 960, y: 540, d: 20}]}>
        <Backdrop name="courtroom" />
        <Layer>
          <Behind y={600} id="judgeBench">
            <Actor who="judge" x={960} y={820} s={0.78} seed={33}
              start={{mouth: 'frown', brows: 'angry', rShoulder: -150, rElbow: -20}}
              keys={[{f: tLaw - 2, p: {rShoulder: -60, rElbow: -30}, d: 3, ease: 'snap'}, {f: tLaw + 8, p: {rShoulder: -150, rElbow: -20}, d: 10}, {f: tSettle - 2, p: {rShoulder: -60, rElbow: -30}, d: 3, ease: 'snap'}]}
              rHand={<HeldGavel r={-80} />}
            />
          </Behind>
          <Behind y={790} id="defTable">
            <Actor who="gerald" x={1380} y={1100} s={0.95} seed={34} flip
              start={{lookX: 1, mouth: 'flat', brows: 'sad', lShoulder: 50, lElbow: -130}}
              keys={[{f: tLaw, p: {mouth: 'o', y: -10}, d: 4}, {f: tLaw + 6, p: {y: 0, mouth: 'frown'}, d: 6}]}
              emotes={[{f: tLaw + 2, kind: 'sweat'}]}
            />
          </Behind>
          {slam && <G x={1100} y={540} s={lerp(frame, [tLaw, tLaw + 6], [0.4, 1.3])}><circle r={90} fill="none" stroke={C.ink} strokeWidth={8} opacity={0.6} /></G>}
          <G x={560} y={700} s={pop(frame, fps, tSettle, 12) * 0.55} r={-6} shadow>
            <rect x={-150} y={-200} width={300} height={400} rx={8} fill={C.white} stroke={C.ink} strokeWidth={7} />
            <text x={-120} y={-140} fontFamily={DISPLAY} fontSize={36} fill={C.ink}>SETTLEMENT</text>
            {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-120} y={-100 + i * 50} width={i % 2 ? 180 : 240} height={14} rx={7} fill={C.soft} />)}
          </G>
          {crowd.map(([who, x, say], i) => (
            <g key={i}>
              <Actor who={who as 'angry1'} x={x} y={1110} s={0.7} seed={40 + i} enter={tAngry + i * 4}
                start={{mouth: 'open', brows: 'angry', lShoulder: 140, lElbow: 40, rShoulder: -140, rElbow: -40}}
                talk={[[tAngry, tAngry + 200]]}
                emotes={[{f: tAngry + 6 + i * 4, kind: 'anger'}]}
              />
              <G x={x + 60} y={560 + (i % 2) * 40} s={pop(frame, fps, tAngry + 8 + i * 4, 10) * 0.8} r={i % 2 ? 6 : -6}>
                <rect x={-20} y={-60} width={say.length * 34 + 50} height={90} rx={24} fill={C.white} stroke={C.ink} strokeWidth={6} />
                <text x={5} y={8} fontFamily={DISPLAY} fontSize={50} fill={C.red}>{say}</text>
              </G>
            </g>
          ))}
        </Layer>
      </Cam>
      <Headline text="Lawsuits. Settlements. *Angry* internet." start={tLaw} y={120} size={60} stagger={6} card width={1400} />
      <Label text="(its natural state)" x={960} y={1000} start={at('natural')} color={C.white} size={34} />
      <Sfx name="thud" at={tLaw} volume={0.5} />
      <Sfx name="thud" at={tSettle} volume={0.35} />
    </AbsoluteFill>
  );
};

