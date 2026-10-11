import React from 'react';
import {INKLINE} from './Rig';
import {BODY, DISPLAY, MONO} from '../theme';
import {Cartridge, Razor, Champagne, Blade, Tag} from '../components/Art';

// Small props drawn around their own origin (the grip point) so a Toon can hold them.
const ink = {stroke: INKLINE, strokeWidth: 5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const Ticket: React.FC<{r?: number}> = ({r = -8}) => (
  <g transform={`rotate(${r}) translate(-10 -90)`}>
    <rect x={-80} y={-40} width={160} height={80} rx={10} fill="#FFFFFF" {...ink} />
    <rect x={-80} y={-40} width={160} height={24} rx={10} fill="#12B5D9" {...ink} />
    <text x={-68} y={-23} fontFamily={MONO} fontWeight={700} fontSize={13} fill="#FFFFFF">BOARDING PASS</text>
    <text x={-68} y={12} fontFamily={DISPLAY} fontSize={20} fill={INKLINE}>AMS→JFK</text>
    {Array.from({length: 7}).map((_, i) => <rect key={i} x={44 + i * 4} y={-8} width={2} height={36} fill={INKLINE} />)}
  </g>
);

export const Doc: React.FC<{title?: string; r?: number; lines?: number}> = ({title, r = 6, lines = 4}) => (
  <g transform={`rotate(${r}) translate(0 -80)`}>
    <rect x={-60} y={-80} width={120} height={160} rx={6} fill="#FFFFFF" {...ink} />
    {title && <text x={-48} y={-52} fontFamily={DISPLAY} fontSize={16} fill={INKLINE}>{title}</text>}
    {Array.from({length: lines}).map((_, i) => <rect key={i} x={-46} y={-34 + i * 22} width={i % 2 ? 70 : 92} height={7} rx={3} fill="#CFC5B3" />)}
  </g>
);

export const HeldCartridge: React.FC<{color?: string; label?: string; s?: number; r?: number; cheap?: boolean}> = ({color = '#12B5D9', label = 'INK', s = 0.38, r = 0, cheap}) => (
  <g transform={`rotate(${r}) translate(0 -30) scale(${s})`}>
    <Cartridge color={color} label={label} cheap={cheap} />
  </g>
);

export const HeldRazor: React.FC = () => (
  <g transform="rotate(-8) scale(0.42) translate(0 -120)">
    <Razor />
  </g>
);

export const HeldBlade: React.FC = () => (
  <g transform="scale(0.35) translate(0 -60)">
    <Blade />
  </g>
);

export const Magnifier: React.FC<{r?: number}> = ({r = -30}) => (
  <g transform={`rotate(${r})`}>
    <rect x={-10} y={-10} width={20} height={90} rx={8} fill="#6E5233" {...ink} transform="rotate(180)" />
    <g transform="translate(0 -150)">
      <circle r={62} fill="#DFF4FB" fillOpacity={0.45} stroke={INKLINE} strokeWidth={12} />
      <path d="M-30,-26 Q-10,-44 14,-40" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" />
    </g>
  </g>
);

export const HeldGavel: React.FC<{r?: number}> = ({r = 0}) => (
  <g transform={`rotate(${r})`}>
    <rect x={-8} y={-110} width={16} height={120} rx={6} fill="#B07A3E" {...ink} />
    <rect x={-50} y={-150} width={100} height={46} rx={12} fill="#8A5A2B" {...ink} />
  </g>
);

export const Flute: React.FC<{liquid?: string}> = ({liquid = '#12B5D9'}) => (
  <g transform="scale(0.5) translate(0 -40)">
    <g style={{filter: 'none'}}>
      <Champagne fill={0.8} liquid={liquid} />
    </g>
  </g>
);

export const PrinterBox: React.FC<{price?: string}> = ({price = '$49'}) => (
  <g transform="translate(0 -40)">
    <rect x={-120} y={-150} width={240} height={190} rx={8} fill="#E8DFD0" {...ink} />
    <rect x={-120} y={-150} width={240} height={40} rx={8} fill="#12B5D9" {...ink} />
    <rect x={-70} y={-90} width={140} height={70} rx={10} fill="#FFFFFF" {...ink} />
    <rect x={-50} y={-70} width={100} height={12} rx={5} fill={INKLINE} />
    <g transform="translate(110 -150) rotate(18)">
      <Tag text={price} color="#FFC83D" w={170} />
    </g>
  </g>
);

export const Scroll: React.FC<{text: string; glow?: number}> = ({text, glow = 1}) => (
  <g transform="translate(0 -60)">
    <ellipse rx={260} ry={120} fill="#FFC83D" opacity={0.28 * glow} />
    <rect x={-180} y={-70} width={360} height={140} rx={10} fill="#F6E7B8" {...ink} />
    <rect x={-196} y={-82} width={24} height={164} rx={12} fill="#D9B86A" {...ink} />
    <rect x={172} y={-82} width={24} height={164} rx={12} fill="#D9B86A" {...ink} />
    <text y={10} textAnchor="middle" fontFamily={DISPLAY} fontSize={34} fill="#8A3A1F">{text}</text>
    <text y={44} textAnchor="middle" fontFamily={BODY} fontWeight={700} fontSize={16} fill="#8A3A1F" opacity={0.7}>terms &amp; conditions apply</text>
  </g>
);

export const Laptop: React.FC<{screen?: React.ReactNode}> = ({screen}) => (
  <g>
    <path d="M-170,0 L170,0 L190,26 L-190,26 Z" fill="#C9CCD2" {...ink} />
    <rect x={-150} y={-200} width={300} height={200} rx={12} fill="#3A3F4B" {...ink} />
    <rect x={-136} y={-186} width={272} height={172} rx={6} fill="#F4F7FA" />
    <g transform="translate(0 -100)">{screen}</g>
  </g>
);
