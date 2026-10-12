import React from 'react';
import {useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {Actor} from '../../../characters/Actor';
import {C, MONO, BODY, DISPLAY} from '../../../theme';
import {FLOOR} from '../../../components/layout';

// Shared bits for the "your price" scenes. The two leads, poses and labels come from the
// concert-fees helpers so every video uses the same vocabulary.
export {Sam, Gerald, P, SHOCK, POINT, SHRUG, CHEER, RAISE, HIPS, REST, CROSS, HOLD, PEER, SLabel, tagW, headTop, Count} from '../../concert-fees/scenes/common';

type ActorProps = React.ComponentProps<typeof Actor>;
type ExtraProps = Omit<ActorProps, 'who' | 'y'> & {y?: number};

/* Your friend from the couch (Sam's rig in teal). */
export const Friend: React.FC<ExtraProps> = ({start, ...p}) => <Actor who="friend" y={FLOOR} s={0.62} {...p} start={{lookX: 1, ...start}} />;

/* Small grey source tag, bottom-right. Shown only when the narration names the source. */
export const SourceTag: React.FC<{text: string; start: number}> = ({text, start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - start, fps, config: {damping: 16}});
  const w = text.length * 13.5 + 40;
  return (
    <g transform={`translate(${1860 - w} ${1010 + (1 - p) * 30})`} opacity={p}>
      <rect width={w} height={40} rx={8} fill={C.white} stroke={C.grey} strokeWidth={3} />
      <text x={20} y={27} fontFamily={MONO} fontWeight={700} fontSize={20} fill={C.grey}>
        {text}
      </text>
    </g>
  );
};

/* On/off toggle switch. */
export const Toggle: React.FC<{x: number; y: number; on: number; label?: string; s?: number}> = ({x, y, on, label, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-32} width={120} height={64} rx={32} fill={on > 0.5 ? C.green : C.soft} stroke={C.ink} strokeWidth={5} />
    <circle cx={-28 + 56 * on} cy={0} r={24} fill={C.white} stroke={C.ink} strokeWidth={5} />
    {label && (
      <text x={-90} y={11} textAnchor="end" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>
        {label}
      </text>
    )}
  </g>
);

/* A big number with a caption under it (for stats). */
export const Stat: React.FC<{x: number; y: number; text: string; caption?: string; color?: string; size?: number; t?: number}> = ({x, y, text, caption, color = C.ink, size = 140, t = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * t})`} opacity={Math.min(1, t * 1.5)}>
    <text textAnchor="middle" fontFamily={DISPLAY} fontSize={size} fill={color} stroke={C.ink} strokeWidth={color === C.ink ? 0 : 5} paintOrder="stroke">
      {text}
    </text>
    {caption && (
      <text y={size * 0.45} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={32} fill={C.ink}>
        {caption}
      </text>
    )}
  </g>
);
