import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BASE, Pose} from './Rig';
import {RigChar} from './RigChar';
import {POSES} from './poses';

const WALK: Partial<Pose> = {lHip: 30, rHip: -22, rKnee: 30, lShoulder: -10, rShoulder: 10, lookX: 1};

/* Still: the rigged Sam (top) and Gerald (bottom) in every named pose plus a walking side view. */
export const RigSheet: React.FC = () => (
  <AbsoluteFill style={{background: '#F4EEE3'}}>
    <svg width={1920} height={1080}>
      {(['sam', 'gerald'] as const).map((who, row) =>
        [...Object.entries(POSES[who]), ['walking', WALK] as const].map(([name, p], i) => (
          <g key={`${who}${name}`} transform={`translate(${100 + i * 191} ${470 + row * 530}) scale(0.62)`}>
            <RigChar who={who} uid={`sheet-${who}-${i}`} pose={{...BASE, ...p}} walking={name === 'walking'} />
            <text y={64} textAnchor="middle" fontSize={44} fontFamily="sans-serif">{name}</text>
          </g>
        )),
      )}
    </svg>
  </AbsoluteFill>
);

/* Still: the recoloured extras next to the two leads. */
export const RigExtras: React.FC = () => (
  <AbsoluteFill style={{background: '#F4EEE3'}}>
    <svg width={1920} height={1080}>
      {(['sam', 'friend', 'vendor', 'local', 'gerald', 'professor', 'senator'] as const).map((who, i) => (
        <g key={who} transform={`translate(${170 + i * 265} 900) scale(0.85)`}>
          <RigChar who={who} uid={`x-${who}`} pose={{...BASE, ...(who === 'gerald' || who === 'professor' || who === 'senator' ? POSES.gerald.smug : POSES.sam.neutral)}} />
          <text y={70} textAnchor="middle" fontSize={44} fontFamily="sans-serif">{who}</text>
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);
