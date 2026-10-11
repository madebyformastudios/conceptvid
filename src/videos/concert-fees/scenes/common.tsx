import React from 'react';
import {Actor} from '../../../characters/Actor';
import {Pose} from '../../../characters/Rig';
import {FLOOR, PRESENTER} from '../../../components/layout';
import {DISPLAY, BODY, C} from '../../../theme';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

// The two leads. Sam is the fan ("you"); Gerald is the ticket giant collecting the fees.
export const P = PRESENTER;

type ActorProps = React.ComponentProps<typeof Actor>;
type LeadProps = Omit<ActorProps, 'who' | 'x' | 'y'> & {x?: number; y?: number};

export const Sam: React.FC<LeadProps> = ({start, ...p}) => (
  <Actor who="sam" x={P.left} y={FLOOR} s={P.s} {...p} start={{lookX: 1, ...start}} />
);

export const Gerald: React.FC<LeadProps> = ({start, ...p}) => (
  <Actor who="gerald" x={P.right} y={FLOOR} s={P.s} flip {...p} start={{lookX: 1, mouth: 'smirk', brows: 'smug', ...CROSS, ...start}} />
);

// Pose presets. "Point" aims at the content side for a lead standing in his usual column.
export const REST: Partial<Pose> = {lShoulder: 12, lElbow: -6, rShoulder: -12, rElbow: 6};
export const SHOCK: Partial<Pose> = {mouth: 'o', brows: 'raised', lShoulder: 60, lElbow: 80, rShoulder: -60, rElbow: -80};
export const POINT: Partial<Pose> = {rShoulder: -100, rElbow: 0};
export const CROSS: Partial<Pose> = {lShoulder: 40, lElbow: -100, rShoulder: -40, rElbow: 100};
export const SHRUG: Partial<Pose> = {lShoulder: 60, lElbow: -120, rShoulder: -60, rElbow: 120, headTilt: -10};
export const CHEER: Partial<Pose> = {lShoulder: 150, lElbow: 30, rShoulder: -150, rElbow: -30};
export const HIPS: Partial<Pose> = {lShoulder: 50, lElbow: -120, rShoulder: -50, rElbow: 120};
export const RAISE: Partial<Pose> = {rShoulder: -165, rElbow: -10};
export const HOLD: Partial<Pose> = {rShoulder: -60, rElbow: -60};

/* Big SVG number that counts from `from` to `to` as t goes 0..1. */
export const Count: React.FC<{x: number; y: number; from?: number; to: number; t: number; dec?: number; prefix?: string; suffix?: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'}> = ({
  x,
  y,
  from = 0,
  to,
  t,
  dec = 0,
  prefix = '$',
  suffix = '',
  size = 120,
  color = C.ink,
  anchor = 'middle',
}) => {
  const v = from + (to - from) * Math.max(0, Math.min(1, t));
  const txt = prefix + v.toLocaleString('en-US', {minimumFractionDigits: dec, maximumFractionDigits: dec}) + suffix;
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={DISPLAY} fontSize={size} fill={color} stroke={C.ink} strokeWidth={color === C.ink ? 0 : 5} paintOrder="stroke">
      {txt}
    </text>
  );
};

/* Label for use inside a <Stage> (SVG): pops up from below at `start`. */
export const SLabel: React.FC<{text: string; x: number; y: number; start: number; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'}> = ({text, x, y, start, color = C.ink, size = 34, anchor = 'middle'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - start, fps, config: {damping: 14, stiffness: 170, mass: 0.7}});
  return (
    <text x={x} y={y + size + (1 - p) * 20} textAnchor={anchor} fontFamily={BODY} fontWeight={800} fontSize={size} fill={color} opacity={Math.min(1, p)} letterSpacing={1}>
      {text}
    </text>
  );
};

/* Tag width that fits its text (Archivo Black at the Tag's 46px). */
export const tagW = (text: string) => Math.round(text.length * 36 + 110);

/* Screen y of the top of a cast member's head (standing on FLOOR at scale s): put their text just above it. */
export const headTop = (s: number = P.s, y: number = FLOOR) => y - 590 * s;

/* Holding a magnifying glass up in front of the face, glass toward the content (use with rHand={<Magnifier r={30} />}). */
export const PEER: Partial<Pose> = {rShoulder: -40, rElbow: -100};
