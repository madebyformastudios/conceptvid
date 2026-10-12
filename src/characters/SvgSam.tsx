import React, {createContext} from 'react';
import {staticFile} from 'remotion';
import {Pose} from './Rig';

// Experimental: Sam drawn from the user's turnaround sheet (public/svg-test/sam-turnaround.svg)
// instead of the code-drawn Toon. The sheet is one traced picture (front, side and back view),
// so the front view is cut into puppet pieces with clip paths: legs, torso, two arms, head.
// Arms pivot at the shoulders, the head at the neck; the printed face is painted over and
// redrawn so it can blink, talk and emote. Walking swaps to the side view.
//
// Coordinates below are in sheet units (382 x 512). Accepts the same Pose as Toon and is drawn
// in Toon space (feet at 0,0; ~600 units tall) so scenes, props and emotes line up unchanged.

export const CastStyle = createContext<{samSvg: boolean}>({samSvg: false});

const SHEET = 'svg-test/sam-turnaround.svg';
const INK = '#080508';
const FACE = '#fefdfe';
const BROW = '#392e32';
const FEET = {x: 73, y: 437}; // front view, between the feet
const K = 600 / (FEET.y - 93); // sheet units -> Toon units (Toon is ~600 tall)
const NECK = {x: 73, y: 196};
const L_SHOULDER = {x: 42, y: 210};
const R_SHOULDER = {x: 104, y: 210};
const L_HAND = {x: 33, y: 315};
const R_HAND = {x: 113.75, y: 315};
const SIDE_HAND = {x: 205, y: 318};

// Sleeve seams (where an arm piece meets the torso), top to bottom.
const L_SEAM: [number, number][] = [[44, 196], [47.5, 218], [44, 272], [42.5, 300], [44, 312]];
const R_SEAM: [number, number][] = [[97.5, 196], [98.75, 225], [103.75, 257.5], [106, 300], [104, 312]];
const pts = (p: [number, number][]) => p.map(([x, y]) => `${x},${y}`).join(' ');

const CLIPS = {
  head: '5,80 140,80 140,197 5,197',
  torso: pts([...L_SEAM.slice(0, 4), [42.5, 306], [106, 306], ...R_SEAM.slice(0, 4).reverse()]),
  legs: '38,298 110,298 110,445 38,445',
  lArm: pts([[5, 196], ...L_SEAM, [46, 335], [5, 335]]),
  rArm: pts([...R_SEAM, [104, 335], [140, 335], [140, 196]]),
  side: '138,80 252,80 252,445 138,445',
};

const rot = (p: {x: number; y: number}, c: {x: number; y: number}, deg: number) => {
  const r = (deg * Math.PI) / 180;
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return {x: c.x + dx * Math.cos(r) - dy * Math.sin(r), y: c.y + dx * Math.sin(r) + dy * Math.cos(r)};
};
const toToon = (p: {x: number; y: number}) => ({x: (p.x - FEET.x) * K, y: (p.y - FEET.y) * K});

// The Toon rig bends elbows; a cut-out arm is one rigid piece, so fold the elbow in partly.
const armAngle = (shoulder: number, elbow: number, side: 1 | -1) =>
  Math.max(-170, Math.min(170, side === 1 ? shoulder - 12 + 0.4 * (elbow + 6) : shoulder + 12 + 0.4 * (elbow - 6)));

const Piece: React.FC<{id: string; clip: string; transform?: string; seam?: [number, number][]}> = ({id, clip, transform, seam}) => (
  <g transform={transform}>
    <clipPath id={id}>
      <polygon points={clip} />
    </clipPath>
    <image href={staticFile(SHEET)} x={0} y={0} width={382} height={512} clipPath={`url(#${id})`} />
    {seam && <polyline points={pts(seam)} fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />}
  </g>
);

const Brows: React.FC<{kind: Pose['brows']; lift: number}> = ({kind, lift}) => {
  // [left inner/outer, right inner/outer] heights relative to neutral
  const d = {
    neutral: [0, 0, 0, 0],
    raised: [-3, -3, -3, -3],
    angry: [2.5, -1.5, 2.5, -1.5],
    sad: [-2.5, 1.5, -2.5, 1.5],
    smug: [1.5, 1.5, -2, -3],
    oneUp: [0, 0, -3.5, -4],
  }[kind] ?? [0, 0, 0, 0];
  const y = 138.5 - lift;
  return (
    <g stroke={BROW} strokeWidth={3.4} strokeLinecap="round" fill="none">
      <path d={`M49,${y + 1 + d[1]} Q56,${y - 3 + (d[0] + d[1]) / 2} 63.5,${y + d[0]}`} />
      <path d={`M82.5,${y + d[2]} Q90,${y - 3.5 + (d[2] + d[3]) / 2} 96,${y + 0.5 + d[3]}`} />
    </g>
  );
};

const Mouth: React.FC<{kind: Pose['mouth']; talk: number}> = ({kind, talk}) => {
  const st = {stroke: INK, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  if (talk > 0.15 && (kind === 'smile' || kind === 'flat' || kind === 'smirk'))
    return <ellipse cx={74.5} cy={171} rx={5 + talk * 1.5} ry={1.5 + talk * 4} fill="#3a1f24" {...st} />;
  switch (kind) {
    case 'grin':
      return <path d="M64.5,167.5 Q74.5,169 85,166.5 Q81,178 74,178 Q67,178 64.5,167.5 Z" fill="#3a1f24" {...st} />;
    case 'open':
      return <ellipse cx={74.5} cy={171.5} rx={6} ry={5} fill="#3a1f24" {...st} />;
    case 'o':
      return <ellipse cx={74.5} cy={172} rx={3.5} ry={4.5} fill="#3a1f24" {...st} />;
    case 'flat':
      return <path d="M66,171 L83,171" fill="none" {...st} />;
    case 'frown':
      return <path d="M66,174.5 Q74.5,166.5 83,174" fill="none" {...st} />;
    case 'smirk':
      return <path d="M67,171.5 Q77,173.5 84.5,166" fill="none" {...st} />;
    default:
      return <path d="M65.5,170 Q74.5,176 84,168.5" fill="none" {...st} />;
  }
};

const Face: React.FC<{pose: Pose}> = ({pose}) => {
  const lx = pose.lookX * 2.2;
  const ly = pose.lookY * 2;
  const ry = 3.8 * (1 - pose.blink * 0.9);
  const lift = pose.brows === 'raised' ? 0 : 0;
  return (
    <g>
      {/* paint over the printed eyes, brows and mouth */}
      <rect x={45} y={133.5} width={56} height={45} rx={14} fill={FACE} />
      <Brows kind={pose.brows} lift={lift} />
      <ellipse cx={58 + lx} cy={152 + ly} rx={2.3} ry={ry} fill={INK} />
      <ellipse cx={87.5 + lx} cy={152 + ly} rx={2.3} ry={ry} fill={INK} />
      <Mouth kind={pose.mouth} talk={pose.talk} />
    </g>
  );
};

/* Sam from the turnaround sheet, posed like a Toon. `walking` shows the side view facing `dir`. */
export const SvgSam: React.FC<{pose: Pose; uid: string; walking?: boolean; dir?: 1 | -1; rHand?: React.ReactNode; lHand?: React.ReactNode}> = ({
  pose,
  uid,
  walking,
  dir = 1,
  rHand,
  lHand,
}) => {
  const body = `translate(${pose.x} ${pose.y}) rotate(${pose.lean}) scale(1 ${pose.squash})`;
  if (walking) {
    // side view: centred on its own feet (x ~200), facing right in the sheet
    return (
      <g transform={body}>
        <ellipse cx={0} cy={6} rx={90} ry={14} fill="#2B2A30" opacity={0.16} />
        <g transform={`scale(${K * dir} ${K}) translate(-200 ${-FEET.y})`}>
          <Piece id={`${uid}-side`} clip={CLIPS.side} />
        </g>
        {/* the side view shows one hand; whatever is held goes there */}
        {(rHand || lHand) && <g transform={`translate(${(SIDE_HAND.x - 200) * K * dir} ${(SIDE_HAND.y - FEET.y) * K})`}>{rHand ?? lHand}</g>}
      </g>
    );
  }
  const la = armAngle(pose.lShoulder, pose.lElbow, 1);
  const ra = armAngle(pose.rShoulder, pose.rElbow, -1);
  const lh = toToon(rot(L_HAND, L_SHOULDER, la));
  const rh = toToon(rot(R_HAND, R_SHOULDER, ra));
  const tilt = `rotate(${pose.headTilt} ${NECK.x} ${NECK.y})`;
  return (
    <g transform={body}>
      <ellipse cx={0} cy={6} rx={90} ry={14} fill="#2B2A30" opacity={0.16} />
      <g transform={`scale(${K}) translate(${-FEET.x} ${-FEET.y})`}>
        <Piece id={`${uid}-legs`} clip={CLIPS.legs} />
        <Piece id={`${uid}-torso`} clip={CLIPS.torso} seam={[...L_SEAM.slice(0, 4)]} />
        <polyline points={pts(R_SEAM.slice(0, 4))} fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
        <Piece id={`${uid}-larm`} clip={CLIPS.lArm} transform={`rotate(${la} ${L_SHOULDER.x} ${L_SHOULDER.y})`} seam={L_SEAM.slice(0, 4)} />
        <Piece id={`${uid}-rarm`} clip={CLIPS.rArm} transform={`rotate(${ra} ${R_SHOULDER.x} ${R_SHOULDER.y})`} seam={R_SEAM.slice(0, 4)} />
        <g transform={tilt}>
          <Piece id={`${uid}-head`} clip={CLIPS.head} />
          <Face pose={pose} />
        </g>
      </g>
      {lHand && <g transform={`translate(${lh.x} ${lh.y})`}>{lHand}</g>}
      {rHand && <g transform={`translate(${rh.x} ${rh.y})`}>{rHand}</g>}
    </g>
  );
};
