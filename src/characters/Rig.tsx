import React from 'react';

// Shared puppet rig for the round-headed cast. Origin = between the feet; +y is down.
// Angles are degrees, 0 = hanging straight down, positive = swinging toward screen-right.

export const INKLINE = '#2B2A30';

export type Mouth = 'smile' | 'flat' | 'o' | 'open' | 'frown' | 'smirk' | 'grin';
export type Brows = 'neutral' | 'raised' | 'oneUp' | 'angry' | 'sad' | 'smug';

export type Pose = {
  x: number; // body offset
  y: number;
  lean: number; // whole-body rotation
  headTilt: number;
  lookX: number; // pupil offset -1..1
  lookY: number;
  blink: number; // 0 open .. 1 closed
  mouth: Mouth;
  talk: number; // 0..1 mouth openness added on top
  brows: Brows;
  // arms: shoulder angle and elbow bend
  lShoulder: number;
  lElbow: number;
  rShoulder: number;
  rElbow: number;
  // legs: hip angle and knee bend
  lHip: number;
  lKnee: number;
  rHip: number;
  rKnee: number;
  squash: number; // 1 = normal, <1 squashed
};

export const BASE: Pose = {
  x: 0, y: 0, lean: 0, headTilt: 0, lookX: 0, lookY: 0, blink: 0, mouth: 'smile', talk: 0, brows: 'neutral',
  lShoulder: 12, lElbow: -6, rShoulder: -12, rElbow: 6, lHip: 4, lKnee: 0, rHip: -4, rKnee: 0, squash: 1,
};

const rad = (d: number) => (d * Math.PI) / 180;
// Point at distance `len` along angle `a` (0 = down).
const along = (x: number, y: number, a: number, len: number): [number, number] => [x - Math.sin(rad(a)) * len, y + Math.cos(rad(a)) * len];

/* A limb drawn the cartoon way: thick fill stroke over a slightly thicker ink stroke. */
export const Limb: React.FC<{
  x: number; y: number; a1: number; a2: number; l1: number; l2: number; width: number; fill: string; end?: 'hand' | 'none';
  handFill?: string;
}> = ({x, y, a1, a2, l1, l2, width, fill, end = 'none', handFill = '#FFFFFF'}) => {
  const [ex, ey] = along(x, y, a1, l1);
  const [hx, hy] = along(ex, ey, a1 + a2, l2);
  const d = `M${x},${y} L${ex},${ey} L${hx},${hy}`;
  return (
    <g>
      <path d={d} fill="none" stroke={INKLINE} strokeWidth={width + 9} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={fill} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
      {end === 'hand' && <circle cx={hx} cy={hy} r={width * 0.62} fill={handFill} stroke={INKLINE} strokeWidth={5} />}
    </g>
  );
};

export const limbEnd = (x: number, y: number, a1: number, a2: number, l1: number, l2: number) => along(...along(x, y, a1, l1), a1 + a2, l2);

/* Face parts shared by every character. (cx, cy) is the head centre, r the head radius. */
export const Face: React.FC<{r: number; pose: Pose; glasses?: boolean}> = ({r, pose, glasses}) => {
  const ex = r * 0.32;
  const ey = r * 0.02;
  const px = pose.lookX * r * 0.08;
  const py = pose.lookY * r * 0.06;
  const eyeR = r * 0.1;
  const openY = Math.max(0.08, 1 - pose.blink);
  const browY = -r * 0.24;
  const browW = r * 0.18;
  const brow = (side: -1 | 1) => {
    const bx = side * ex;
    let lift = 0;
    let tilt = 0;
    switch (pose.brows) {
      case 'raised': lift = -r * 0.1; break;
      case 'oneUp': lift = side === 1 ? -r * 0.13 : r * 0.02; tilt = side === 1 ? -6 : 4; break;
      case 'angry': lift = r * 0.03; tilt = side * 18; break;
      case 'sad': lift = -r * 0.02; tilt = side * -16; break;
      case 'smug': lift = side === -1 ? r * 0.02 : -r * 0.04; tilt = side * 8; break;
    }
    return (
      <path
        d={`M${bx - browW / 2},${browY + lift} Q${bx},${browY + lift - r * 0.05} ${bx + browW / 2},${browY + lift}`}
        transform={`rotate(${tilt} ${bx} ${browY + lift})`}
        fill="none" stroke={INKLINE} strokeWidth={r * 0.055} strokeLinecap="round"
      />
    );
  };
  const my = r * 0.38;
  const mw = r * 0.2;
  const open = Math.min(1, pose.talk);
  let mouth: React.ReactNode;
  if (open > 0.05 || pose.mouth === 'o' || pose.mouth === 'open') {
    const h = pose.mouth === 'o' ? r * 0.16 : r * (0.04 + 0.16 * Math.max(open, pose.mouth === 'open' ? 0.8 : 0));
    const w = pose.mouth === 'o' ? r * 0.1 : mw * 0.8;
    mouth = <ellipse cx={0} cy={my} rx={w} ry={h / 2} fill="#5A2630" stroke={INKLINE} strokeWidth={r * 0.04} />;
  } else if (pose.mouth === 'flat') {
    mouth = <line x1={-mw * 0.6} y1={my} x2={mw * 0.6} y2={my} stroke={INKLINE} strokeWidth={r * 0.05} strokeLinecap="round" />;
  } else if (pose.mouth === 'frown') {
    mouth = <path d={`M${-mw * 0.7},${my + r * 0.04} Q0,${my - r * 0.07} ${mw * 0.7},${my + r * 0.04}`} fill="none" stroke={INKLINE} strokeWidth={r * 0.05} strokeLinecap="round" />;
  } else if (pose.mouth === 'smirk') {
    mouth = <path d={`M${-mw * 0.6},${my} Q${mw * 0.2},${my + r * 0.04} ${mw * 0.8},${my - r * 0.07}`} fill="none" stroke={INKLINE} strokeWidth={r * 0.05} strokeLinecap="round" />;
  } else if (pose.mouth === 'grin') {
    mouth = <path d={`M${-mw},${my - r * 0.03} Q0,${my + r * 0.2} ${mw},${my - r * 0.03} Z`} fill="#5A2630" stroke={INKLINE} strokeWidth={r * 0.045} strokeLinejoin="round" />;
  } else {
    mouth = <path d={`M${-mw * 0.7},${my - r * 0.03} Q0,${my + r * 0.09} ${mw * 0.7},${my - r * 0.03}`} fill="none" stroke={INKLINE} strokeWidth={r * 0.05} strokeLinecap="round" />;
  }
  return (
    <g>
      {[-1, 1].map((s) => (
        <ellipse key={s} cx={s * ex + px} cy={ey + py} rx={eyeR * 0.78} ry={eyeR * openY} fill={INKLINE} />
      ))}
      {glasses && (
        <g fill="none" stroke={INKLINE} strokeWidth={r * 0.045}>
          <rect x={-ex - r * 0.17} y={ey - r * 0.12} width={r * 0.34} height={r * 0.22} rx={r * 0.04} />
          <rect x={ex - r * 0.17} y={ey - r * 0.12} width={r * 0.34} height={r * 0.22} rx={r * 0.04} />
          <line x1={-ex + r * 0.17} y1={ey - r * 0.04} x2={ex - r * 0.17} y2={ey - r * 0.04} />
        </g>
      )}
      {brow(-1)}
      {brow(1)}
      {mouth}
    </g>
  );
};

/* Hand-drawn line boil: re-seeds a gentle displacement every few frames. */
export const BoilFilter: React.FC<{id: string; frame: number; scale?: number; every?: number}> = ({id, frame, scale = 2.4, every = 4}) => (
  <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={2} seed={Math.floor(frame / every) % 50} result="n" />
    <feDisplacementMap in="SourceGraphic" in2="n" scale={scale} xChannelSelector="R" yChannelSelector="G" />
  </filter>
);

const lerpN = (a: number, b: number, t: number) => a + (b - a) * t;
const NUMERIC: (keyof Pose)[] = [
  'x', 'y', 'lean', 'headTilt', 'lookX', 'lookY', 'blink', 'talk', 'lShoulder', 'lElbow', 'rShoulder', 'rElbow',
  'lHip', 'lKnee', 'rHip', 'rKnee', 'squash',
];

/* Blend two poses; discrete features (mouth, brows) switch at the midpoint. */
export const mix = (a: Pose, b: Pose, t: number): Pose => {
  const out = {...(t < 0.5 ? a : b)};
  for (const k of NUMERIC) (out as unknown as Record<string, number>)[k] = lerpN(a[k] as number, b[k] as number, t);
  return out;
};
