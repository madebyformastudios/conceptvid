import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BASE} from './Rig';
import {SvgSam} from './SvgSam';
import {POSES} from './poses';
import {Magnifier} from './Props';

/* Still: the rigged-SVG Sam in every named pose, for checking the cut-out joints. */
export const SvgSamSheet: React.FC = () => (
  <AbsoluteFill style={{background: '#F4EEE3'}}>
    <svg width={1920} height={1080}>
      {[...Object.entries(POSES.sam), ['walking', {lHip: 30, rHip: -22, rKnee: 30, lShoulder: -10, rShoulder: 10, lookX: 1}] as const].map(([name, p], i) => (
        <g key={name} transform={`translate(${110 + (i % 5) * 420} ${470 + Math.floor(i / 5) * 520}) scale(0.7)`}>
          <SvgSam pose={{...BASE, ...p}} walking={name === 'walking'} rHand={name === 'neutral' ? <Magnifier r={30} /> : undefined} />
          <text y={60} textAnchor="middle" fontSize={40} fontFamily="sans-serif">{name}</text>
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);
