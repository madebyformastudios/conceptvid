import React, {useContext} from 'react';
import {CastStyle, RigChar, RigWho, isRigged} from './RigChar';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {BASE, BoilFilter, INKLINE, Pose, mix} from './Rig';
import {LOOKS, Toon, Who} from './Toon';
import {DISPLAY} from '../theme';

/* A pose key: at frame `f`, blend to `p` over `d` frames (default 9). Keys apply in order and accumulate. */
export type Key = {f: number; p: Partial<Pose>; d?: number; ease?: 'inout' | 'out' | 'snap'};

const ease = {inout: Easing.inOut(Easing.cubic), out: Easing.out(Easing.back(1.6)), snap: Easing.out(Easing.cubic)};

export const poseAt = (keys: Key[], frame: number, start: Pose = BASE): Pose => {
  let cur = start;
  let target = start;
  for (const k of keys) {
    if (frame < k.f) break;
    const next = {...target, ...k.p};
    const t = interpolate(frame, [k.f, k.f + (k.d ?? 9)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease[k.ease ?? 'inout']});
    cur = mix(cur, next, t);
    target = next;
  }
  return cur;
};

export type Emote = {f: number; kind: '!' | '?' | 'sweat' | 'anger' | 'sparkle' | 'zzz'; d?: number};

export const EmoteMark: React.FC<{kind: Emote['kind']; p: number; frame: number}> = ({kind, p, frame}) => {
  const s = p;
  if (kind === '!' || kind === '?')
    return (
      <g transform={`translate(110 -600) scale(${s}) rotate(${kind === '?' ? 10 : -6})`}>
        <text textAnchor="middle" fontFamily={DISPLAY} fontSize={110} fill={kind === '!' ? '#E9473B' : '#3D7BB8'} stroke={INKLINE} strokeWidth={5}>
          {kind}
        </text>
      </g>
    );
  if (kind === 'sweat')
    return (
      <g transform={`translate(96 ${-560 + (frame % 30) * 0.8}) scale(${s})`}>
        <path d="M0,-26 C10,-10 16,0 16,8 A16,16 0 0 1 -16,8 C-16,0 -10,-10 0,-26 Z" fill="#9FD8F0" stroke={INKLINE} strokeWidth={4} />
      </g>
    );
  if (kind === 'anger')
    return (
      <g transform={`translate(80 -620) scale(${s * (1 + Math.sin(frame * 0.6) * 0.08)})`}>
        <path d="M-24,-8 Q-10,-10 -8,-24 M8,-24 Q10,-10 24,-8 M24,8 Q10,10 8,24 M-8,24 Q-10,10 -24,8" fill="none" stroke="#E9473B" strokeWidth={8} strokeLinecap="round" />
      </g>
    );
  if (kind === 'zzz')
    return (
      <g transform={`translate(110 -600) scale(${s})`}>
        <text fontFamily={DISPLAY} fontSize={48} fill="#3D7BB8">z</text>
        <text x={30} y={-36} fontFamily={DISPLAY} fontSize={62} fill="#3D7BB8">Z</text>
      </g>
    );
  return (
    <g>
      {[[-120, -560], [120, -600], [100, -470]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s * (0.8 + 0.3 * Math.sin(frame * 0.3 + i))}) rotate(${frame * 3})`}>
          <path d="M0,-24 L6,-6 L24,0 L6,6 L0,24 L-6,6 L-24,0 L-6,-6 Z" fill="#FFC83D" stroke={INKLINE} strokeWidth={4} />
        </g>
      ))}
    </g>
  );
};

/* A cast member placed on stage: keys drive the pose; blinking, breathing and walking are automatic. */
export const Actor: React.FC<{
  who: Who;
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  keys?: Key[];
  start?: Partial<Pose>;
  talk?: [number, number][];
  emotes?: Emote[];
  rHand?: React.ReactNode;
  lHand?: React.ReactNode;
  seed?: number;
  enter?: number; // frame to pop in (scale spring); undefined = present from start
  exit?: number;
  tint?: string; // CSS filter for scene lighting
}> = ({who, x, y, s = 1, flip, keys = [], start, talk = [], emotes = [], rHand, lHand, seed = 0, enter, exit, tint}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const base = {...BASE, ...start};
  const pose = poseAt(keys, frame, base);
  const prevX = poseAt(keys, frame - 1, base).x;
  const v = Math.abs(pose.x - prevX);
  // walk cycle locked to distance travelled, so feet don't slide
  if (v > 0.4) {
    const ph = pose.x * 0.045;
    const amp = Math.min(1, v / 6);
    const sw = Math.sin(ph) * 28 * amp;
    pose.lHip += sw;
    pose.rHip -= sw;
    pose.lKnee += Math.max(0, -Math.sin(ph)) * 34 * amp;
    pose.rKnee += Math.max(0, Math.sin(ph)) * 34 * amp;
    pose.lShoulder -= sw * 0.7;
    pose.rShoulder -= sw * 0.7;
    pose.y -= Math.abs(Math.cos(ph)) * 10 * amp;
  }
  // breathing + blinking
  pose.squash *= 1 + Math.sin((frame + seed * 13) * 0.11) * 0.006;
  const bf = (frame + seed * 37) % 84;
  if (bf < 4) pose.blink = Math.max(pose.blink, 1 - Math.abs(bf - 2) / 2);
  // lip flaps
  for (const [a, b] of talk) if (frame >= a && frame <= b) pose.talk = Math.max(0, Math.sin(frame * 0.95 + seed) * 0.5 + Math.sin(frame * 0.41) * 0.45);

  const inS = enter === undefined ? 1 : spring({frame: frame - enter, fps, config: {damping: 12, stiffness: 160}});
  const outS = exit === undefined ? 1 : 1 - interpolate(frame, [exit, exit + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (inS <= 0.001 || outS <= 0.001) return null;
  const id = `boil-${who}-${seed}`;
  const rigged = useContext(CastStyle).rigged && isRigged(who);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1) * inS} ${s * inS})`} opacity={outS} style={tint ? {filter: tint} : undefined}>
      <defs>
        <BoilFilter id={id} frame={frame + seed} />
      </defs>
      {rigged ? (
        <RigChar who={who as RigWho} uid={`${who}-${seed}`} pose={pose} boil={id} walking={v > 0.4} dir={pose.x >= prevX ? 1 : -1} rHand={rHand} lHand={lHand} />
      ) : (
        <Toon look={LOOKS[who]} pose={pose} boil={id} rHand={rHand} lHand={lHand} />
      )}
      {emotes.map((e, i) => {
        const p = spring({frame: frame - e.f, fps, config: {damping: 10, stiffness: 200}});
        const gone = e.d ? interpolate(frame, [e.f + e.d, e.f + e.d + 6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
        return frame >= e.f ? (
          <g key={i} transform={`translate(${pose.x} ${pose.y})${flip ? ' scale(-1 1)' : ''}`} opacity={gone}>
            <EmoteMark kind={e.kind} p={p} frame={frame} />
          </g>
        ) : null;
      })}
    </g>
  );
};

/* Camera keys: zoom `z` around the point (x, y) in 1920x1080 space. */
export type CamKey = {f: number; z: number; x: number; y: number; d?: number};

export const useCam = (keys: CamKey[]) => {
  const frame = useCurrentFrame();
  let cur = {z: keys[0].z, x: keys[0].x, y: keys[0].y};
  let target = cur;
  for (const k of keys.slice(1)) {
    if (frame < k.f) break;
    const t = interpolate(frame, [k.f, k.f + (k.d ?? 24)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
    const next = {z: k.z, x: k.x, y: k.y};
    cur = {z: cur.z + (next.z - cur.z) * t, x: cur.x + (next.x - cur.x) * t, y: cur.y + (next.y - cur.y) * t};
    target = next;
  }
  void target;
  // keep the frame covered: clamp focus so edges never show
  const z = Math.max(1, cur.z);
  const hx = 960 / z;
  const hy = 540 / z;
  const fx = Math.min(1920 - hx, Math.max(hx, cur.x));
  const fy = Math.min(1080 - hy, Math.max(hy, cur.y));
  return `translate(${960 - fx * z}px, ${540 - fy * z}px) scale(${z})`;
};

/* Camera rig: everything inside moves together (background + actors). */
export const Cam: React.FC<{keys: CamKey[]; children: React.ReactNode}> = ({keys, children}) => {
  const t = useCam(keys);
  return <AbsoluteFill style={{transform: t, transformOrigin: '0 0'}}>{children}</AbsoluteFill>;
};

/* Full-frame SVG layer for actors and props, in the same 1920x1080 space as the backdrop. */
export const Layer: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', overflow: 'visible'}}>
    {children}
  </svg>
);

/* Hide whatever is below scene-space line `y` (a character standing behind a counter or desk). */
export const Behind: React.FC<{y: number; id: string; children: React.ReactNode}> = ({y, id, children}) => (
  <g>
    <defs>
      <clipPath id={id} clipPathUnits="userSpaceOnUse">
        <rect x={-4000} y={-4000} width={10000} height={4000 + y} />
      </clipPath>
    </defs>
    <g clipPath={`url(#${id})`}>{children}</g>
  </g>
);
