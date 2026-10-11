import React from 'react';
import {AbsoluteFill, Img, interpolate, Easing, staticFile, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {BASE, BoilFilter, Pose, mix} from './Rig';
import {Sam} from './Sam';
import {LOOKS, Toon} from './Toon';
import {BODY, DISPLAY} from '../theme';

const POSES: {label: string; pose: Pose}[] = [
  {label: 'neutral', pose: {...BASE}},
  {label: 'deadpan', pose: {...BASE, mouth: 'flat', brows: 'oneUp', lookX: 0, headTilt: -4, lShoulder: 8, rShoulder: -8}},
  {label: 'shocked', pose: {...BASE, mouth: 'o', brows: 'raised', lShoulder: 150, lElbow: 30, rShoulder: -150, rElbow: -30, lean: -3, lHip: 10, rHip: -10}},
  {label: 'defeated', pose: {...BASE, mouth: 'frown', brows: 'sad', headTilt: 14, lookY: 1, lShoulder: 4, rShoulder: -4, lean: 3, squash: 0.97}},
  {label: 'pointing', pose: {...BASE, mouth: 'grin', brows: 'raised', rShoulder: -95, rElbow: 0, lShoulder: 20, lElbow: -40, lookX: 1}},
];

/* Still: Flow reference portrait beside the code-drawn puppet in five poses. */
export const SamSheet: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#EDE6DA'}}>
      <div style={{position: 'absolute', left: 50, top: 40, fontFamily: DISPLAY, fontSize: 40, color: '#2B2A30'}}>Sam — puppet test</div>
      <div style={{position: 'absolute', left: 50, top: 150, width: 380}}>
        <Img src={staticFile('ref/sam-flow.jpeg')} style={{width: 380, borderRadius: 14, border: '4px solid #2B2A30'}} />
        <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 24, marginTop: 12, color: '#2B2A30'}}>Flow reference (static image)</div>
      </div>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs><BoilFilter id="boil" frame={frame} /></defs>
        {POSES.map((p, i) => (
          <g key={p.label} transform={`translate(${620 + i * 270} 900) scale(0.78)`}>
            <Sam pose={p.pose} boil="boil" />
            <text y={90} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={34} fill="#2B2A30">{p.label}</text>
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};

const e = Easing.inOut(Easing.cubic);
const k = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});

/* Motion test on a Flow background: walk in, wave and talk, double-take, slump. */
export const SamDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const walkEnd = 75;
  const walking = frame < walkEnd;
  const cyc = frame * 0.32;
  const swing = walking ? Math.sin(cyc) * 26 : 0;
  const bob = walking ? Math.abs(Math.cos(cyc)) * -10 : 0;
  const breathe = Math.sin(frame * 0.12) * 0.006;
  const blinkF = frame % 70;
  const blink = blinkF < 3 ? 1 - Math.abs(blinkF - 1.5) / 1.5 : 0;

  let pose: Pose = {
    ...BASE,
    x: interpolate(frame, [0, walkEnd], [-620, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)}),
    y: bob,
    lHip: swing, rHip: -swing, lKnee: walking ? Math.max(0, -Math.sin(cyc)) * 30 : 0, rKnee: walking ? Math.max(0, Math.sin(cyc)) * 30 : 0,
    lShoulder: 12 - swing * 0.8, rShoulder: -12 - swing * 0.8,
    squash: 1 + breathe, blink, lookX: walking ? 1 : 0,
  };
  // wave + talk
  const waveIn = k(frame, 80, 92) * (1 - k(frame, 140, 150));
  const wave = Math.sin(frame * 0.5) * 18;
  pose = mix(pose, {...pose, rShoulder: -150 + wave, rElbow: -25, mouth: 'smile', brows: 'raised'}, waveIn);
  if (frame > 85 && frame < 145) pose.talk = Math.max(0, Math.sin(frame * 0.9) * 0.5 + Math.sin(frame * 0.37) * 0.4);
  // double take at 160
  const take = spring({frame: frame - 160, fps, config: {damping: 9, stiffness: 180}});
  if (frame >= 155) {
    pose = mix(pose, {...pose, mouth: 'o', brows: 'raised', lShoulder: 150, lElbow: 30, rShoulder: -150, rElbow: -30, lookX: -1, y: -24, talk: 0}, Math.min(1, take));
    if (frame < 160) pose.headTilt = 18 * k(frame, 152, 158);
  }
  // slump
  const sl = k(frame, 215, 240);
  pose = mix(pose, {...pose, y: 0, mouth: 'frown', brows: 'sad', headTilt: 14, lookY: 1, lShoulder: 4, lElbow: 0, rShoulder: -4, rElbow: 0, lean: 3, squash: 0.96, lookX: 0}, sl);

  const camZoom = 1 + frame * 0.0006;
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${camZoom * 1.05})`}}>
        <Img src={staticFile('ref/desk-empty.jpeg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs><BoilFilter id="boil2" frame={frame} /></defs>
        <g transform={`translate(${760 * camZoom - (camZoom - 1) * 960} ${1000 * camZoom - (camZoom - 1) * 540}) scale(${1.05 * camZoom})`} style={{filter: 'brightness(0.86) sepia(0.12)'}}>
          <Sam pose={pose} boil="boil2" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/* Still: the whole cast lined up. */
export const CastSheet: React.FC = () => {
  const frame = useCurrentFrame();
  const who = ['sam', 'gerald', 'sommelier', 'salesman', 'scientist', 'cashier', 'judge', 'bouncer', 'worker', 'mail', 'librarian', 'exec'] as const;
  return (
    <AbsoluteFill style={{background: '#EDE6DA'}}>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs><BoilFilter id="cb" frame={frame} /></defs>
        {who.map((w, i) => (
          <g key={w} transform={`translate(${130 + (i % 6) * 330} ${i < 6 ? 500 : 1020}) scale(0.62)`}>
            <Toon look={LOOKS[w]} pose={{...BASE, mouth: i % 2 ? 'smirk' : 'smile'}} boil="cb" />
            <text y={70} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={44} fill="#2B2A30">{w}</text>
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
