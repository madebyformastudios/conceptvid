import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BASE, BoilFilter} from './Rig';
import {LOOKS, Toon} from './Toon';
import {BODY} from '../theme';

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
