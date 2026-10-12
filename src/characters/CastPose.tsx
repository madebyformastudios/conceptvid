import React from 'react';
import {BASE} from './Rig';
import {LOOKS, Toon} from './Toon';
import {POSES} from './poses';

// One lead in a named pose on a transparent 560x720 canvas (render as PNG for thumbnails).
export const CastPose: React.FC<{who: 'sam' | 'gerald'; pose: string}> = ({who, pose}) => (
  <svg width={560} height={720} viewBox="-280 -680 560 720" style={{position: 'absolute'}}>
    <Toon look={LOOKS[who]} pose={{...BASE, ...POSES[who][pose]}} />
  </svg>
);
