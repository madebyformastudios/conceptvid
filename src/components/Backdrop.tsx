import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, W, H} from '../theme';
import {FLOOR} from './layout';

/* A halftone gradient: a grid of dots that shrink with distance from (cx, cy), like a print screen. */
const Halftone: React.FC<{cx: number; cy: number; reach: number; color: string; step?: number; max?: number; opacity?: number; drift?: number}> = ({
  cx,
  cy,
  reach,
  color,
  step = 34,
  max = 15,
  opacity = 0.22,
  drift = 0,
}) => {
  const dots: React.ReactNode[] = [];
  const n = Math.ceil(reach / step);
  for (let i = -n; i <= n; i++)
    for (let j = -n; j <= n; j++) {
      // offset every other row for a classic 45° screen
      const x = cx + i * step + (j % 2 ? step / 2 : 0);
      const y = cy + j * step * 0.87;
      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;
      const d = Math.hypot(x - cx, y - cy) / reach;
      const r = max * (1 - d) * (0.92 + 0.08 * Math.sin(drift + i * 0.7 + j * 0.5));
      if (r > 0.8) dots.push(<circle key={`${i}_${j}`} cx={x} cy={y} r={r} />);
    }
  return (
    <g fill={color} opacity={opacity}>
      {dots}
    </g>
  );
};

/* Backdrop for the newer videos: plain paper, a ground band the cast stands on, and two
   halftone washes in the chapter's accent colour. No registration marks or colour bars. */
export const Backdrop: React.FC<{accent: string; second: string}> = ({accent, second}) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.03;
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <svg width={W} height={H} style={{position: 'absolute'}}>
        <defs>
          <pattern id="grain" width={6} height={6} patternUnits="userSpaceOnUse">
            <circle cx={3} cy={3} r={0.7} fill={C.ink} opacity={0.05} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grain)" />
        <Halftone cx={W + 60} cy={-60} reach={620} color={accent} drift={drift} />
        <Halftone cx={-80} cy={FLOOR - 40} reach={420} color={second} max={12} opacity={0.18} drift={-drift} />
        {/* ground the cast stands on */}
        <rect x={0} y={FLOOR + 8} width={W} height={H - FLOOR} fill={C.paperDark} />
        <line x1={0} y1={FLOOR + 8} x2={W} y2={FLOOR + 8} stroke={C.ink} strokeWidth={4} opacity={0.18} />
      </svg>
    </AbsoluteFill>
  );
};

// Accent pairs cycle by chapter so each chapter has its own colour.
export const ACCENTS: [string, string][] = [
  [C.magenta, C.cyan],
  [C.cyan, C.yellow],
  [C.yellow, C.magenta],
  [C.green, C.cyan],
];
