import React, {createContext} from 'react';
import {Pose} from './Rig';
import samFront from './rig/sam-front.json';
import samSide from './rig/sam-side.json';
import geraldFront from './rig/gerald-front.json';
import geraldSide from './rig/gerald-side.json';

// The user's rigged character SVGs (public/svg-test/<who>-front.svg / -side.svg, converted to JSON
// by tools/rig2json.py). Every limb is its own group with a data-pivot, so a Toon Pose drives them
// joint by joint: shoulders, elbows, hips, knees, head tilt, eye look/blink. Brows and mouths are
// redrawn per expression in each character's own line style; walking switches to the side view.
// Drawn in Toon space (feet at 0,0) so scenes, props and emotes line up with the code-drawn cast.

/* Turn on with <CastStyle.Provider value={{rigged: true}}> (VideoDef.rigged does this per video). */
export const CastStyle = createContext<{rigged: boolean}>({rigged: false});

type Node = {t: string; a: Record<string, string>; p?: number[]; c?: Node[]};
type Ctx = {rot: Record<string, number>; extra: Record<string, string>; replace: Record<string, React.ReactNode>; uid: string; recolor?: Record<string, string>};
type Pt = number[];

type Brow = {outer: Pt; inner: Pt; arch: number};
type Spec = {
  front: Node;
  side: Node;
  height: number; // on-screen height in Toon units
  top: number; // rig y of the top of the hair
  sideFaces: 1 | -1; // which way the side view looks in the file
  ink: string;
  browWidth: number;
  brows: [Brow, Brow]; // front: viewer-left, viewer-right
  sideBrow: Brow;
  mouth: {m: Pt; w: number};
  sideMouth: {m: Pt; w: number};
  smile: string; // the file's own resting smile (front)
};

const SPECS: Record<'sam' | 'gerald', Spec> = {
  sam: {
    front: samFront as unknown as Node,
    side: samSide as unknown as Node,
    height: 600,
    top: 92,
    sideFaces: 1,
    ink: '#231c1a',
    browWidth: 2.4,
    brows: [
      {outer: [50, 141], inner: [64, 140], arch: -5},
      {outer: [97, 141], inner: [83, 140], arch: -5},
    ],
    sideBrow: {outer: [215, 139], inner: [227, 138], arch: -4},
    mouth: {m: [74, 170], w: 10},
    sideMouth: {m: [224, 169], w: 6},
    smile: 'M64 168.5 Q74 175.5 84 167.5',
  },
  gerald: {
    front: geraldFront as unknown as Node,
    side: geraldSide as unknown as Node,
    height: 560, // a touch shorter than Sam, as drawn
    top: 132,
    sideFaces: -1,
    ink: '#1d1b1f',
    browWidth: 2.6,
    // his resting brows are already low and slanted (smug)
    brows: [
      {outer: [41, 175], inner: [56, 178.5], arch: -2.5},
      {outer: [79, 172], inner: [65, 176], arch: -4},
    ],
    sideBrow: {outer: [138, 169], inner: [124, 170.5], arch: -4},
    mouth: {m: [60, 196], w: 11},
    sideMouth: {m: [128, 196], w: 7},
    smile: 'M49 196 Q59 201.5 71 193',
  },
};

// Extras are recoloured copies of the two leads, so the whole cast shares one drawing style.
const SAM_HOODIE = (main: string, shade: string, hair: string, legs: [string, string]) => ({
  '#d9a443': main, '#b98a33': shade, '#4b3326': hair, '#33231a': hair, '#3e5677': legs[0], '#2f4361': legs[1],
});
const GERALD_SUIT = (suit: string, stripe: string, dark: string, darkStripe: string, tie: string, hair: string) => ({
  '#3b4159': suit, '#8088a4': stripe, '#2a2e42': dark, '#5c637d': darkStripe, '#8e2a33': tie, '#bdbdc2': hair,
});
export const VARIANTS = {
  sam: {base: 'sam', recolor: {}},
  gerald: {base: 'gerald', recolor: {}},
  friend: {base: 'sam', recolor: SAM_HOODIE('#3f9e96', '#2f7a73', '#1f1a18', ['#4a4a52', '#383840'])},
  vendor: {base: 'sam', recolor: SAM_HOODIE('#c8553d', '#9c3f2c', '#2b2320', ['#8a7a5a', '#6e6046'])},
  local: {base: 'sam', recolor: SAM_HOODIE('#6f9e4e', '#557c3a', '#7a4a2a', ['#3e5677', '#2f4361'])},
  professor: {base: 'gerald', recolor: GERALD_SUIT('#6b4f36', '#8d7357', '#50392a', '#6e5844', '#3d6b4f', '#e8e6e1')},
  senator: {base: 'gerald', recolor: GERALD_SUIT('#5a5f6e', '#7a8090', '#464a57', '#666b7a', '#2f5f9e', '#d9d4cc')},
} as const satisfies Record<string, {base: 'sam' | 'gerald'; recolor: Record<string, string>}>;
export type RigWho = keyof typeof VARIANTS;
export const isRigged = (who: string): who is RigWho => who in VARIANTS;

const find = (n: Node, id: string): Node | undefined => {
  if (n.a.id === id) return n;
  for (const c of n.c ?? []) {
    const f = find(c, id);
    if (f) return f;
  }
  return undefined;
};
const pv = (n: Node, id: string): Pt => find(n, id)?.p ?? [0, 0];
const rootOffset = (n: Node): Pt => {
  const g = n.c?.find((c) => c.t === 'g' && c.a.transform);
  const m = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(g?.a.transform ?? '');
  return m ? [-Number(m[1]), -Number(m[2])] : [0, 0];
};

const SKIP_ROOT = new Set(['id', 'transform', 'xmlns', 'viewBox', 'width', 'height']);
const SKIP = new Set(['id', 'transform']);

const draw = (n: Node, ctx: Ctx, key: React.Key): React.ReactNode => {
  const id = n.a.id;
  if (id && id in ctx.replace) return <React.Fragment key={key}>{ctx.replace[id]}</React.Fragment>;
  const attrs: Record<string, string> = {};
  for (const [k, v] of Object.entries(n.a)) {
    if ((n.t === 'svg' ? SKIP_ROOT : SKIP).has(k)) continue;
    // pattern fills (Gerald's pinstripes) get a per-instance id so several copies can coexist
    const c = ctx.recolor?.[v.toLowerCase()];
    attrs[k] = c ?? (v.includes('url(#') ? v.replace(/url\(#([^)]+)\)/g, `url(#$1-${ctx.uid})`) : v);
  }
  if (n.t === 'pattern' && id) attrs.id = `${id}-${ctx.uid}`;
  let tf = n.a.transform ?? '';
  if (id && n.p && ctx.rot[id]) tf += ` rotate(${ctx.rot[id]} ${n.p[0]} ${n.p[1]})`;
  if (id && ctx.extra[id]) tf += ` ${ctx.extra[id]}`;
  const tag = n.t === 'svg' ? 'g' : n.t;
  return React.createElement(tag, {key, ...attrs, transform: tf.trim() || undefined}, n.c?.map((c, i) => draw(c, ctx, i)));
};

const rotAbout = (p: Pt, c: Pt, deg: number) => {
  const r = (deg * Math.PI) / 180;
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(r) - dy * Math.sin(r), c[1] + dx * Math.sin(r) + dy * Math.cos(r)];
};

// Brow offsets [outer end, inner end] per expression, in rig units (negative = up).
const BROW: Record<Pose['brows'], [number, number]> = {
  neutral: [0, 0],
  raised: [-3, -3],
  angry: [-1.5, 3],
  sad: [1.5, -3],
  smug: [1.5, 1.5],
  oneUp: [0, 0],
};

const BrowLine: React.FC<{b: Brow; d: [number, number]; ink: string; w: number}> = ({b, d, ink, w}) => {
  const [ox, oy0] = b.outer;
  const [ix, iy0] = b.inner;
  const oy = oy0 + d[0];
  const iy = iy0 + d[1];
  return <path d={`M${ox} ${oy} Q${(ox + ix) / 2} ${(oy + iy) / 2 + b.arch} ${ix} ${iy}`} fill="none" stroke={ink} strokeWidth={w} strokeLinecap="round" />;
};

const Mouth: React.FC<{kind: Pose['mouth']; talk: number; m: Pt; w: number; ink: string; smile?: string}> = ({kind, talk, m, w, ink, smile}) => {
  const [x, y] = m;
  const st = {stroke: ink, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const open = (h: number, wide = 1) => (
    <path
      d={`M${x - w * wide} ${y - 1} Q${x} ${y - 2} ${x + w * wide} ${y - 1.5} Q${x + w * wide * 0.75} ${y + h} ${x} ${y + h} Q${x - w * wide * 0.75} ${y + h} ${x - w * wide} ${y - 1} Z`}
      fill="#7a3b33"
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
      return <ellipse cx={x} cy={y + 2} rx={3.4} ry={4.4} fill="#7a3b33" {...st} strokeWidth={1.8} />;
    case 'flat':
      return <path d={`M${x - w * 0.8} ${y + 1} L${x + w * 0.8} ${y + 1}`} fill="none" {...st} />;
    case 'frown':
      return <path d={`M${x - w * 0.8} ${y + 4} Q${x} ${y - 3} ${x + w * 0.8} ${y + 4}`} fill="none" {...st} />;
    case 'smirk':
      return <path d={`M${x - w * 0.7} ${y + 1} Q${x + 2} ${y + 3.5} ${x + w} ${y - 3}`} fill="none" {...st} />;
    default:
      return smile ? <path d={smile} fill="none" {...st} /> : <path d={`M${x - w} ${y - 1.5} Q${x} ${y + 5.5} ${x + w} ${y - 2.5}`} fill="none" {...st} />;
  }
};

const blink = (p: Pt, b: number) => `translate(${p[0]} ${p[1]}) scale(1 ${Math.max(0.1, 1 - b)}) translate(${-p[0]} ${-p[1]})`;

// Front-view joint angles from a Toon pose (Toon's rest pose = the file's rest pose).
const frontRot = (pose: Pose) => ({
  'f-arm-l': pose.lShoulder - 12,
  'f-forearm-l': pose.lElbow + 6,
  'f-arm-r': pose.rShoulder + 12,
  'f-forearm-r': pose.rElbow - 6,
  'f-thigh-l': pose.lHip - 4,
  'f-shin-l': pose.lKnee,
  'f-thigh-r': pose.rHip + 4,
  'f-shin-r': pose.rKnee,
  'f-head': pose.headTilt,
});

// Side view: elbows only bend forward and knees only backward, whichever way the file faces.
const sideElbow = (e: number, faces: number) => (-8 - Math.min(40, Math.abs(e) * 0.4)) * faces;
const sideRot = (pose: Pose, faces: number) => ({
  's-arm-near': pose.lShoulder - 12,
  's-forearm-near': sideElbow(pose.lElbow + 6, faces),
  's-arm-far': -(pose.rShoulder + 12),
  's-forearm-far': sideElbow(pose.rElbow - 6, faces),
  's-thigh-near': pose.lHip - 4,
  's-shin-near': pose.lKnee * faces,
  's-thigh-far': pose.rHip + 4,
  's-shin-far': pose.rKnee * faces,
  's-head': pose.headTilt,
});

/* A rigged character posed like a Toon. `walking` shows the side view heading `dir` (1 = right). */
export const RigChar: React.FC<{
  who: RigWho;
  pose: Pose;
  uid: string;
  walking?: boolean;
  dir?: 1 | -1;
  boil?: string;
  rHand?: React.ReactNode;
  lHand?: React.ReactNode;
}> = ({who, pose, uid, walking, dir = 1, boil, rHand, lHand}) => {
  const sp = SPECS[VARIANTS[who].base];
  const recolor: Record<string, string> = VARIANTS[who].recolor;
  const body = `translate(${pose.x} ${pose.y}) rotate(${pose.lean}) scale(1 ${pose.squash})`;
  const tree = walking ? sp.side : sp.front;
  const feet = pv(tree, walking ? 's-root' : 'f-root');
  const off = rootOffset(tree);
  const K = sp.height / (pv(sp.front, 'f-root')[1] - sp.top);
  const toToon = (p: Pt, sx = 1) => `translate(${(p[0] - feet[0]) * K * sx} ${(p[1] - feet[1]) * K})`;
  const shadow = <ellipse cx={0} cy={6} rx={90} ry={14} fill="#2B2A30" opacity={0.16} />;

  if (walking) {
    const sx = dir * sp.sideFaces;
    const rot = sideRot(pose, sp.sideFaces);
    const eye = pv(tree, 's-eye');
    const ctx: Ctx = {
      uid,
      recolor,
      rot,
      extra: {'s-eye': `translate(${Math.abs(pose.lookX) * 1.5 * sp.sideFaces} ${pose.lookY * 2}) ${blink(eye, pose.blink)}`},
      replace: {
        's-brows': <BrowLine b={sp.sideBrow} d={BROW[pose.brows]} ink={sp.ink} w={sp.browWidth} />,
        's-mouth': <Mouth kind={pose.mouth} talk={pose.talk} m={sp.sideMouth.m} w={sp.sideMouth.w} ink={sp.ink} />,
      },
    };
    const hand = rotAbout(rotAbout(pv(tree, 's-hand-near'), pv(tree, 's-forearm-near'), rot['s-forearm-near']), pv(tree, 's-arm-near'), rot['s-arm-near']);
    return (
      <g transform={body} filter={boil ? `url(#${boil})` : undefined}>
        {shadow}
        <g transform={`scale(${K * sx} ${K}) translate(${-feet[0]} ${-feet[1]}) translate(${off[0]} ${off[1]})`}>{draw(tree, ctx, 'side')}</g>
        {(rHand || lHand) && <g transform={toToon(hand, sx)}>{rHand ?? lHand}</g>}
      </g>
    );
  }

  const rot = frontRot(pose);
  const right: [number, number] = pose.brows === 'oneUp' ? [-4, -3.5] : pose.brows === 'smug' ? [-2.5, -2] : BROW[pose.brows];
  const ctx: Ctx = {
    uid,
    recolor,
    rot,
    extra: {
      'f-eyes': `translate(${pose.lookX * 2.2} ${pose.lookY * 2})`,
      'f-eye-l': blink(pv(tree, 'f-eye-l'), pose.blink),
      'f-eye-r': blink(pv(tree, 'f-eye-r'), pose.blink),
    },
    replace: {
      'f-brows': (
        <g>
          <BrowLine b={sp.brows[0]} d={BROW[pose.brows]} ink={sp.ink} w={sp.browWidth} />
          <BrowLine b={sp.brows[1]} d={right} ink={sp.ink} w={sp.browWidth} />
        </g>
      ),
      'f-mouth': <Mouth kind={pose.mouth} talk={pose.talk} m={sp.mouth.m} w={sp.mouth.w} ink={sp.ink} smile={sp.smile} />,
    },
  };
  const hand = (s: 'l' | 'r') => rotAbout(rotAbout(pv(tree, `f-hand-${s}`), pv(tree, `f-forearm-${s}`), rot[`f-forearm-${s}`]), pv(tree, `f-arm-${s}`), rot[`f-arm-${s}`]);
  return (
    <g transform={body} filter={boil ? `url(#${boil})` : undefined}>
      {shadow}
      <g transform={`scale(${K}) translate(${-feet[0]} ${-feet[1]}) translate(${off[0]} ${off[1]})`}>{draw(tree, ctx, 'front')}</g>
      {lHand && <g transform={toToon(hand('l'))}>{lHand}</g>}
      {rHand && <g transform={toToon(hand('r'))}>{rHand}</g>}
    </g>
  );
};
