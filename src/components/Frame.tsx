import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, DISPLAY, BODY, MONO, W, H} from '../theme';
import {lerp, pop, ramp} from '../anim';

/* Paper backdrop with halftone dots and printer's registration marks. */
export const Paper: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.15) % 28;
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <svg width={W} height={H} style={{position: 'absolute'}}>
        <defs>
          <pattern id="dots" width={28} height={28} patternUnits="userSpaceOnUse" patternTransform={`translate(${drift} ${drift}) rotate(15)`}>
            <circle cx={14} cy={14} r={2.2} fill={C.ink} opacity={0.07} />
          </pattern>
          <radialGradient id="vig" cx="50%" cy="50%" r="75%">
            <stop offset="60%" stopColor={C.paper} stopOpacity={0} />
            <stop offset="100%" stopColor={C.paperDark} stopOpacity={0.9} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#dots)" />
        <rect width={W} height={H} fill="url(#vig)" />
        {[
          [60, 60],
          [W - 60, 60],
          [60, H - 60],
          [W - 60, H - 60],
        ].map(([x, y], i) => (
          <g key={i} opacity={0.35}>
            <circle cx={x} cy={y} r={14} fill="none" stroke={C.ink} strokeWidth={2} />
            <line x1={x - 24} y1={y} x2={x + 24} y2={y} stroke={C.ink} strokeWidth={2} />
            <line x1={x} y1={y - 24} x2={x} y2={y + 24} stroke={C.ink} strokeWidth={2} />
          </g>
        ))}
        {/* CMYK colour bar */}
        {[C.cyan, C.magenta, C.yellow, C.key].map((c, i) => (
          <rect key={c} x={W - 330 + i * 52} y={H - 72} width={44} height={22} fill={c} opacity={0.85} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

/* Chapter badge in the top-left corner. */
export const ChapterBadge: React.FC<{n: number; name: string; start: number}> = ({n, name, start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps, start + 6, 16);
  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        top: 62,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transform: `translateX(${(1 - p) * -60}px)`,
        opacity: p,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 24,
        color: C.ink,
        letterSpacing: 3,
      }}
    >
      <span style={{background: C.ink, color: C.paper, padding: '6px 12px', borderRadius: 6}}>{String(n).padStart(2, '0')}</span>
      <span>{name.toUpperCase()}</span>
    </div>
  );
};

/* Words that pop in one by one. Wrap a word in *stars* to highlight it. */
export const Headline: React.FC<{
  text: string;
  start: number;
  x?: number;
  y?: number;
  size?: number;
  align?: 'left' | 'center' | 'right';
  width?: number;
  stagger?: number;
  color?: string;
  hl?: string;
}> = ({text, start, x = W / 2, y = 160, size = 84, align = 'center', width = 1600, stagger = 3, color = C.ink, hl = C.yellow}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  const left = align === 'center' ? x - width / 2 : align === 'right' ? x - width : x;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: y,
        width,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        columnGap: size * 0.28,
        rowGap: size * 0.05,
        fontFamily: DISPLAY,
        fontSize: size,
        lineHeight: 1.08,
        color,
      }}
    >
      {words.map((w, i) => {
        const p = pop(frame, fps, start + i * stagger, 13);
        // A *highlight* may span several words.
        const before = words.slice(0, i).join(' ').split('*').length - 1;
        const star = w.startsWith('*') || before % 2 === 1;
        const clean = w.replace(/\*/g, '');
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + p * 0.3})`,
              opacity: Math.min(1, p * 1.5),
              position: 'relative',
              whiteSpace: 'nowrap',
            }}
          >
            {star && (
              <span
                style={{
                  position: 'absolute',
                  left: -10,
                  right: -10,
                  bottom: size * 0.08,
                  height: size * 0.42,
                  background: hl,
                  zIndex: -1,
                  transformOrigin: 'left',
                  transform: `scaleX(${ramp(frame, start + i * stagger + 6, 10)}) skewX(-8deg)`,
                }}
              />
            )}
            {clean}
          </span>
        );
      })}
    </div>
  );
};

/* Small uppercase label. */
export const Label: React.FC<{text: string; x: number; y: number; start: number; color?: string; size?: number; anchor?: 'center' | 'left'}> = ({
  text,
  x,
  y,
  start,
  color = C.ink,
  size = 34,
  anchor = 'center',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps, start, 14);
  return (
    <div
      style={{
        position: 'absolute',
        left: anchor === 'center' ? x - 400 : x,
        top: y,
        width: anchor === 'center' ? 800 : undefined,
        textAlign: anchor,
        fontFamily: BODY,
        fontWeight: 800,
        fontSize: size,
        color,
        letterSpacing: 1,
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px)`,
      }}
    >
      {text}
    </div>
  );
};

/* Full-frame SVG stage for illustrations. */
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', overflow: 'visible'}}>
    {children}
  </svg>
);

/* Print-head swipe: CMYK bands sweep across at chapter changes. */
export const PrintSwipe: React.FC<{len: number}> = ({len}) => {
  const frame = useCurrentFrame();
  const cols = [C.cyan, C.magenta, C.yellow, C.key];
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {cols.map((c, i) => {
        const t = lerp(frame, [i * 2, len * 0.55 + i * 2, len], [-1, 0, 1]);
        const pos = t <= 0 ? lerp(t, [-1, 0], [-W * 1.3, 0]) : lerp(t, [0, 1], [0, W * 1.3]);
        return (
          <div
            key={c}
            style={{
              position: 'absolute',
              top: (H / 4) * i - 2,
              height: H / 4 + 4,
              width: W * 1.2,
              left: -W * 0.1,
              background: c,
              transform: `translateX(${pos}px) skewX(-14deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* Fades a scene in/out and gives it a gentle push-in. */
export const SceneShell: React.FC<{duration: number; last?: boolean; children: React.ReactNode}> = ({duration, last, children}) => {
  const frame = useCurrentFrame();
  const inP = ramp(frame, 0, 8);
  const outP = last ? 1 : 1 - ramp(frame, duration - 6, 6);
  const zoom = 1 + frame * 0.00012;
  return <AbsoluteFill style={{opacity: Math.min(inP, outP), transform: `scale(${zoom})`}}>{children}</AbsoluteFill>;
};

/* One-shot sound effect from public/sfx, started at frame `at` of the current sequence. */
export const Sfx: React.FC<{name: 'whoosh' | 'pop' | 'click' | 'thud' | 'error' | 'ding' | 'cash'; at: number; volume?: number}> = ({name, at, volume = 0.35}) => (
  <Sequence from={Math.round(at)} durationInFrames={45} layout="none" name={`sfx ${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);
