import React, {createContext} from 'react';
import {Pose} from './Rig';
import front from './rig/sam-front.json';
import side from './rig/sam-side.json';

// Experimental: Sam drawn from the user's rigged SVGs (public/svg-test/sam-front.svg, sam-side.svg,
// converted to JSON by tools/rig2json.py). Every limb is its own group with a pivot, so the Toon
// Pose drives it joint by joint: shoulders, elbows, hips, knees, head tilt, eyes (look + blink).
// Brows and mouth are redrawn per expression in the same line style. Walking uses the side view.
// Drawn in Toon space (feet at 0,0, ~600 units tall) so scenes, props and emotes line up unchanged.

export const CastStyle = createContext<{samSvg: boolean}>({samSvg: false});

type Node = {t: string; a: Record<string, string>; p?: number[]; c?: Node[]};
type Ctx = {rot: Record<string, number>; extra: Record<string, string>; replace: Record<string, React.ReactNode>};

const INK = '#231c1a';
const MOUTH_DARK = '#7a3b33';
const K = 600 / (436 - 92); // rig units -> Toon units

const SKIP = new Set(['id', 'transform', 'xmlns', 'viewBox', 'width', 'height']);

const draw = (n: Node, ctx: Ctx, key: React.Key): React.ReactNode => {
  const id = n.a.id;
  if (id && id in ctx.replace) return <React.Fragment key={key}>{ctx.replace[id]}</React.Fragment>;
  // ids are dropped so several Sams on screen never share one
  const attrs = Object.fromEntries(Object.entries(n.a).filter(([k]) => !SKIP.has(k)));
  let tf = n.a.transform ?? '';
  if (id && n.p && ctx.rot[id]) tf += ` rotate(${ctx.rot[id]} ${n.p[0]} ${n.p[1]})`;
  if (id && ctx.extra[id]) tf += ` ${ctx.extra[id]}`;
  const tag = n.t === 'svg' ? 'g' : n.t;
  return React.createElement(tag, {key, ...attrs, transform: tf.trim() || undefined}, n.c?.map((c, i) => draw(c, ctx, i)));
};

const rotAbout = (p: number[], c: number[], deg: number) => {
  const r = (deg * Math.PI) / 180;
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(r) - dy * Math.sin(r), c[1] + dx * Math.sin(r) + dy * Math.cos(r)];
};

// Hand position after elbow + shoulder rotation, in rig units.
const handAt = (hand: number[], elbow: number[], shoulder: number[], fore: number, upper: number) => rotAbout(rotAbout(hand, elbow, fore), shoulder, upper);

// Brow offsets [outer end, inner end] in rig units per expression (negative = up).
const BROW: Record<Pose['brows'], [number, number]> = {
  neutral: [0, 0],
  raised: [-3, -3],
  angry: [-1.5, 3],
  sad: [1.5, -3],
  smug: [1.5, 1.5],
  oneUp: [0, 0],
};

const Brow: React.FC<{outer: number[]; inner: number[]; d: [number, number]; arch?: number}> = ({outer, inner, d, arch = -5}) => {
  const [ox, oy0] = outer;
  const [ix, iy0] = inner;
  const oy = oy0 + d[0];
  const iy = iy0 + d[1];
  return <path d={`M${ox} ${oy} Q${(ox + ix) / 2} ${(oy + iy) / 2 + arch} ${ix} ${iy}`} fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />;
};

/* Mouth shapes around the rig's own smile (`m` = centre of the mouth, `w` = half width). */
const Mouth: React.FC<{kind: Pose['mouth']; talk: number; m: number[]; w: number}> = ({kind, talk, m, w}) => {
  const [x, y] = m;
  const st = {stroke: INK, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const open = (h: number, wide = 1) => (
    <path
      d={`M${x - w * wide} ${y - 1} Q${x} ${y - 2} ${x + w * wide} ${y - 1.5} Q${x + w * wide * 0.75} ${y + h} ${x} ${y + h} Q${x - w * wide * 0.75} ${y + h} ${x - w * wide} ${y - 1} Z`}
      fill={MOUTH_DARK}
      {...st}
      strokeWidth={1.8}
    />
  );
  if (talk > 0.15 && kind !== 'grin' && kind !== 'open' && kind !== 'o') return open(2 + talk * 6, 0.8);
  switch (kind) {
    case 'grin':
      return open(9);
    case 'open':
      return open(7, 0.75);
    case 'o':
      return <ellipse cx={x} cy={y + 2} rx={3.4} ry={4.4} fill={MOUTH_DARK} {...st} strokeWidth={1.8} />;
    case 'flat':
      return <path d={`M${x - w * 0.8} ${y + 1} L${x + w * 0.8} ${y + 1}`} fill="none" {...st} />;
    case 'frown':
      return <path d={`M${x - w * 0.8} ${y + 4} Q${x} ${y - 3} ${x + w * 0.8} ${y + 4}`} fill="none" {...st} />;
    case 'smirk':
      return <path d={`M${x - w * 0.7} ${y + 1} Q${x + 2} ${y + 3.5} ${x + w} ${y - 3}`} fill="none" {...st} />;
    default:
      return <path d={`M${x - w} ${y - 1.5} Q${x} ${y + 5.5} ${x + w} ${y - 2.5}`} fill="none" {...st} />;
  }
};

const blink = (pivot: number[], b: number) => `translate(${pivot[0]} ${pivot[1]}) scale(1 ${Math.max(0.1, 1 - b)}) translate(${-pivot[0]} ${-pivot[1]})`;

const FrontRig: React.FC<{pose: Pose}> = ({pose}) => {
  const rightBrow: [number, number] = pose.brows === 'oneUp' ? [-4, -3.5] : pose.brows === 'smug' ? [-2.5, -2] : BROW[pose.brows];
  const ctx: Ctx = {
    rot: {
      'f-arm-l': pose.lShoulder - 12,
      'f-forearm-l': pose.lElbow + 6,
      'f-arm-r': pose.rShoulder + 12,
      'f-forearm-r': pose.rElbow - 6,
      'f-thigh-l': pose.lHip - 4,
      'f-shin-l': pose.lKnee,
      'f-thigh-r': pose.rHip + 4,
      'f-shin-r': pose.rKnee,
      'f-head': pose.headTilt,
    },
    extra: {
      'f-eyes': `translate(${pose.lookX * 2.2} ${pose.lookY * 2})`,
      'f-eye-l': blink([58, 152.5], pose.blink),
      'f-eye-r': blink([87, 152.5], pose.blink),
    },
    replace: {
      'f-brows': (
        <g>
          <Brow outer={[50, 141]} inner={[64, 140]} d={BROW[pose.brows]} />
          <Brow outer={[97, 141]} inner={[83, 140]} d={rightBrow} />
        </g>
      ),
      'f-mouth': <Mouth kind={pose.mouth} talk={pose.talk} m={[74, 170]} w={10} />,
    },
  };
  return <>{draw(front as unknown as Node, ctx, 'front')}</>;
};

// Side view: elbows only bend forward, so fold any Toon elbow into a gentle forward bend.
const sideElbow = (e: number) => -8 - Math.min(40, Math.abs(e) * 0.4);

const SideRig: React.FC<{pose: Pose}> = ({pose}) => {
  const ctx: Ctx = {
    rot: {
      's-arm-near': pose.lShoulder - 12,
      's-forearm-near': sideElbow(pose.lElbow + 6),
      's-arm-far': -(pose.rShoulder + 12),
      's-forearm-far': sideElbow(pose.rElbow - 6),
      's-thigh-near': pose.lHip - 4,
      's-shin-near': pose.lKnee,
      's-thigh-far': pose.rHip + 4,
      's-shin-far': pose.rKnee,
      's-head': pose.headTilt,
    },
    extra: {
      's-eye': `translate(${Math.max(0, pose.lookX) * 1.5} ${pose.lookY * 2}) ${blink([224, 151], pose.blink)}`,
    },
    replace: {
      's-brows': <Brow outer={[215, 139]} inner={[227, 138]} d={BROW[pose.brows]} arch={-4} />,
      's-mouth': <Mouth kind={pose.mouth} talk={pose.talk} m={[224, 169]} w={6} />,
    },
  };
  return <>{draw(side as unknown as Node, ctx, 'side')}</>;
};

/* Sam from the rigged SVGs, posed like a Toon. `walking` shows the side view facing `dir`. */
export const SvgSam: React.FC<{pose: Pose; walking?: boolean; dir?: 1 | -1; boil?: string; rHand?: React.ReactNode; lHand?: React.ReactNode}> = ({
  pose,
  walking,
  dir = 1,
  boil,
  rHand,
  lHand,
}) => {
  const body = `translate(${pose.x} ${pose.y}) rotate(${pose.lean}) scale(1 ${pose.squash})`;
  // Each file's root group is translated so the art fits its viewBox; undo that so rig
  // coordinates are used as-is, then put the feet (root pivot) at the origin.
  if (walking) {
    const hand = handAt([196, 308], [197, 258], [197, 210], sideElbow(pose.lElbow + 6), pose.lShoulder - 12);
    return (
      <g transform={body} filter={boil ? `url(#${boil})` : undefined}>
        <ellipse cx={0} cy={6} rx={90} ry={14} fill="#2B2A30" opacity={0.16} />
        <g transform={`scale(${K * dir} ${K}) translate(-200 -436) translate(139 88)`}>
          <SideRig pose={pose} />
        </g>
        {(rHand || lHand) && <g transform={`translate(${(hand[0] - 200) * K * dir} ${(hand[1] - 436) * K})`}>{rHand ?? lHand}</g>}
      </g>
    );
  }
  const lh = handAt([34, 308], [37, 258], [46, 206], pose.lElbow + 6, pose.lShoulder - 12);
  const rh = handAt([116, 308], [113, 258], [104, 206], pose.rElbow - 6, pose.rShoulder + 12);
  const toToon = (p: number[]) => `translate(${(p[0] - 75) * K} ${(p[1] - 436) * K})`;
  return (
    <g transform={body} filter={boil ? `url(#${boil})` : undefined}>
      <ellipse cx={0} cy={6} rx={90} ry={14} fill="#2B2A30" opacity={0.16} />
      <g transform={`scale(${K}) translate(-75 -436) translate(18 88)`}>
        <FrontRig pose={pose} />
      </g>
      {lHand && <g transform={toToon(lh)}>{lHand}</g>}
      {rHand && <g transform={toToon(rh)}>{rHand}</g>}
    </g>
  );
};
