import React from 'react';
import {Face, INKLINE, Limb, Pose, limbEnd} from './Rig';

// One configurable round-headed character. Every cast member is a Look.

export type Look = {
  top: 'hoodie' | 'suit' | 'shirt' | 'labcoat' | 'robe' | 'waistcoat' | 'tee';
  topColor: string;
  topShade: string;
  tie?: string;
  bowtie?: string;
  pinstripe?: boolean;
  legs: string;
  shoes: string;
  hair: 'messy' | 'slick' | 'short' | 'bald' | 'bun' | 'none';
  hairColor: string;
  hat?: 'boater' | 'cap' | 'hardhat' | 'detective' | 'none';
  hatColor?: string;
  glasses?: boolean;
  moustache?: boolean;
};

const HIP_Y = -200;
const SHOULDER_Y = -352;
const NECK_Y = -382;
const HEAD_R = 94;
const HEAD_Y = NECK_Y - HEAD_R + 14;
const ARM = {l1: 80, l2: 76};
const LEG = {l1: 98, l2: 96};

const Shoe: React.FC<{x: number; y: number; dir: 1 | -1; color: string}> = ({x, y, dir, color}) => (
  <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
    <path d="M-20,-14 Q-22,10 0,12 L34,12 Q46,10 44,0 Q40,-10 22,-12 L6,-20 Z" fill={color} stroke={INKLINE} strokeWidth={5.5} strokeLinejoin="round" />
    {color === '#FFFFFF' && <line x1={-18} y1={6} x2={42} y2={6} stroke="#C9C4BA" strokeWidth={4} />}
  </g>
);

const Hair: React.FC<{look: Look}> = ({look}) => {
  const c = look.hairColor;
  const ink = {stroke: INKLINE, strokeWidth: 6, strokeLinejoin: 'round' as const};
  switch (look.hair) {
    case 'messy':
      return (
        <g>
          <path d="M-98,-4 Q-114,-18 -101,-34 Q-112,-72 -78,-92 Q-70,-120 -40,-113 Q-20,-134 6,-117 Q34,-132 53,-109 Q86,-113 91,-82 Q114,-62 101,-34 Q114,-18 98,-5 Q88,-28 78,-29 Q74,-50 55,-45 Q45,-27 29,-37 Q20,-58 1,-47 Q-11,-28 -27,-41 Q-41,-60 -57,-43 Q-67,-30 -81,-33 Q-91,-24 -98,-4 Z" fill={c} {...ink} />
          <path d="M-58,-88 q16,-14 34,-12 M10,-98 q20,-8 38,6 M-80,-60 q4,-14 16,-20 M62,-74 q14,4 20,18" fill="none" stroke="#FFFFFF" strokeOpacity={0.18} strokeWidth={5} strokeLinecap="round" />
        </g>
      );
    case 'slick':
      return (
        <g>
          <path d="M-94,-14 Q-100,-78 -42,-104 Q18,-122 72,-94 Q104,-68 95,-16 Q84,-46 52,-56 Q6,-68 -36,-60 Q-78,-50 -94,-14 Z" fill={c} {...ink} />
          <path d="M-60,-76 Q0,-100 60,-80 M-50,-62 Q0,-84 66,-64 M-30,-96 Q20,-108 60,-92" fill="none" stroke={INKLINE} strokeOpacity={0.35} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      );
    case 'short':
      return <path d="M-92,-24 Q-88,-100 0,-106 Q88,-100 92,-24 Q66,-58 0,-60 Q-66,-58 -92,-24 Z" fill={c} {...ink} />;
    case 'bun':
      return (
        <g>
          <circle cx={0} cy={-108} r={30} fill={c} {...ink} />
          <path d="M-92,-24 Q-88,-100 0,-106 Q88,-100 92,-24 Q66,-58 0,-60 Q-66,-58 -92,-24 Z" fill={c} {...ink} />
        </g>
      );
    case 'bald':
      return (
        <g>
          <path d="M-94,-6 Q-100,-36 -84,-48 Q-78,-24 -88,-4 Z" fill={c} {...ink} strokeWidth={4} />
          <path d="M94,-6 Q100,-36 84,-48 Q78,-24 88,-4 Z" fill={c} {...ink} strokeWidth={4} />
        </g>
      );
    default:
      return null;
  }
};

const Hat: React.FC<{look: Look}> = ({look}) => {
  const c = look.hatColor ?? '#C9A15A';
  const ink = {stroke: INKLINE, strokeWidth: 6, strokeLinejoin: 'round' as const};
  switch (look.hat) {
    case 'boater':
      return (
        <g>
          <ellipse cx={0} cy={-78} rx={128} ry={22} fill={c} {...ink} />
          <path d="M-74,-82 L-70,-136 Q0,-150 70,-136 L74,-82 Z" fill={c} {...ink} />
          <path d="M-73,-96 Q0,-108 73,-96 L72,-112 Q0,-124 -72,-112 Z" fill="#B5302E" stroke={INKLINE} strokeWidth={4} />
        </g>
      );
    case 'cap':
      return (
        <g>
          <path d="M-90,-40 Q-88,-112 0,-114 Q88,-112 90,-40 Z" fill={c} {...ink} />
          <path d="M60,-48 Q140,-50 150,-30 Q110,-24 66,-34 Z" fill={c} {...ink} />
        </g>
      );
    case 'hardhat':
      return (
        <g>
          <path d="M-94,-46 Q-92,-128 0,-130 Q92,-128 94,-46 Z" fill="#F2C230" {...ink} />
          <rect x={-112} y={-54} width={224} height={18} rx={9} fill="#F2C230" {...ink} />
          <path d="M-10,-128 L-10,-56 M10,-128 L10,-56" stroke={INKLINE} strokeWidth={4} />
        </g>
      );
    case 'detective':
      return (
        <g>
          <path d="M-96,-40 Q-94,-122 0,-124 Q94,-122 96,-40 Z" fill="#8A6A45" {...ink} />
          <path d="M-96,-44 L-120,-30 L-92,-24 Z M96,-44 L120,-30 L92,-24 Z" fill="#8A6A45" {...ink} />
          <path d="M-60,-112 L60,-60 M60,-112 L-60,-60" stroke="#6E5233" strokeWidth={4} />
        </g>
      );
    default:
      return null;
  }
};

/* Torso: silhouette depends on the outfit. */
const Torso: React.FC<{look: Look}> = ({look}) => {
  const {topColor: c, topShade: sh} = look;
  const long = look.top === 'labcoat' ? 110 : look.top === 'robe' ? 170 : look.top === 'suit' ? 22 : 4;
  const hem = HIP_Y + long;
  const ink = {stroke: INKLINE, strokeWidth: 7, strokeLinejoin: 'round' as const};
  const body = `M-64,${SHOULDER_Y - 18} Q-82,${SHOULDER_Y} -84,${SHOULDER_Y + 40} L-${88 + long * 0.12},${hem} Q0,${hem + 16} ${88 + long * 0.12},${hem} L84,${SHOULDER_Y + 40} Q82,${SHOULDER_Y} 64,${SHOULDER_Y - 18} Z`;
  return (
    <g>
      <path d={body} fill={c} {...ink} />
      <path d={`M38,${SHOULDER_Y - 16} Q78,${SHOULDER_Y} 80,${SHOULDER_Y + 40} L${84 + long * 0.12},${hem - 2} Q62,${hem + 10} 46,${hem + 11} Q58,${SHOULDER_Y + 70} 38,${SHOULDER_Y - 16} Z`} fill={sh} opacity={0.5} />
      {look.pinstripe &&
        [-60, -36, -12, 12, 36, 60].map((x) => <line key={x} x1={x} y1={SHOULDER_Y - 4} x2={x * 1.06} y2={hem - 6} stroke="#FFFFFF" strokeOpacity={0.16} strokeWidth={2.5} />)}
      {look.top === 'hoodie' && (
        <g>
          <path d={`M-86,${HIP_Y - 12} Q0,${HIP_Y + 6} 86,${HIP_Y - 12}`} fill="none" stroke={sh} strokeWidth={8} />
          <path d={`M-50,${HIP_Y - 20} L-40,${HIP_Y - 70} L40,${HIP_Y - 70} L50,${HIP_Y - 20}`} fill={sh} opacity={0.55} stroke={INKLINE} strokeWidth={5} strokeLinejoin="round" />
          <path d={`M-66,${NECK_Y + 4} Q0,${NECK_Y + 58} 66,${NECK_Y + 4} Q40,${NECK_Y + 30} 0,${NECK_Y + 32} Q-40,${NECK_Y + 30} -66,${NECK_Y + 4} Z`} fill={sh} stroke={INKLINE} strokeWidth={6} strokeLinejoin="round" />
          <path d={`M-16,${NECK_Y + 34} q-4,30 -2,52 M16,${NECK_Y + 34} q4,30 2,52`} fill="none" stroke={INKLINE} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {(look.top === 'suit' || look.top === 'labcoat' || look.top === 'waistcoat' || look.top === 'robe') && (
        <g>
          {/* shirt V and lapels */}
          <path d={`M-34,${NECK_Y + 6} L0,${SHOULDER_Y + 90} L34,${NECK_Y + 6} Z`} fill="#FFFFFF" stroke={INKLINE} strokeWidth={5} strokeLinejoin="round" />
          {look.tie && <path d={`M-9,${NECK_Y + 14} L9,${NECK_Y + 14} L13,${SHOULDER_Y + 70} L0,${SHOULDER_Y + 86} L-13,${SHOULDER_Y + 70} Z`} fill={look.tie} stroke={INKLINE} strokeWidth={4} strokeLinejoin="round" />}
          <path d={`M-36,${NECK_Y + 4} L-8,${SHOULDER_Y + 96} L-50,${SHOULDER_Y + 40} Z M36,${NECK_Y + 4} L8,${SHOULDER_Y + 96} L50,${SHOULDER_Y + 40} Z`} fill={sh} stroke={INKLINE} strokeWidth={5} strokeLinejoin="round" />
          {look.top === 'suit' && [0, 1].map((i) => <circle key={i} cx={4} cy={SHOULDER_Y + 116 + i * 34} r={5} fill={INKLINE} />)}
          {look.top === 'labcoat' && <path d={`M0,${SHOULDER_Y + 96} L0,${hem}`} stroke={INKLINE} strokeWidth={4} />}
        </g>
      )}
      {(look.top === 'shirt' || look.top === 'tee') && (
        <path d={`M-30,${NECK_Y + 8} Q0,${NECK_Y + 40} 30,${NECK_Y + 8}`} fill="none" stroke={INKLINE} strokeWidth={5} strokeLinecap="round" />
      )}
      {look.bowtie && (
        <path d={`M0,${NECK_Y + 16} L-24,${NECK_Y + 4} L-24,${NECK_Y + 30} Z M0,${NECK_Y + 16} L24,${NECK_Y + 4} L24,${NECK_Y + 30} Z`} fill={look.bowtie} stroke={INKLINE} strokeWidth={4} strokeLinejoin="round" />
      )}
    </g>
  );
};

/* A cartoon character. `rHand` / `lHand` render a held prop at that hand (prop drawn around its own origin). */
export const Toon: React.FC<{look: Look; pose: Pose; boil?: string; rHand?: React.ReactNode; lHand?: React.ReactNode; lHandBehind?: boolean}> = ({
  look,
  pose,
  boil,
  rHand,
  lHand,
}) => {
  const leg = (side: -1 | 1, hip: number, knee: number) => {
    const hx = side * 26;
    const [fx, fy] = limbEnd(hx, HIP_Y, hip, knee, LEG.l1, LEG.l2);
    return {hx, fx, fy};
  };
  const L = leg(-1, pose.lHip, pose.lKnee);
  const R = leg(1, pose.rHip, pose.rKnee);
  const [lhx, lhy] = limbEnd(-70, SHOULDER_Y, pose.lShoulder, pose.lElbow, ARM.l1, ARM.l2);
  const [rhx, rhy] = limbEnd(70, SHOULDER_Y, pose.rShoulder, pose.rElbow, ARM.l1, ARM.l2);
  const sleeve = look.top === 'robe' ? look.topColor : look.top === 'waistcoat' ? '#FFFFFF' : look.topColor;
  return (
    <g transform={`translate(${pose.x} ${pose.y}) rotate(${pose.lean}) scale(1 ${pose.squash})`} filter={boil ? `url(#${boil})` : undefined}>
      <ellipse cx={0} cy={6} rx={90} ry={14} fill={INKLINE} opacity={0.16} />
      {look.top !== 'robe' && (
        <g>
          <Limb x={L.hx} y={HIP_Y} a1={pose.lHip} a2={pose.lKnee} l1={LEG.l1} l2={LEG.l2} width={38} fill={look.legs} />
          <Limb x={R.hx} y={HIP_Y} a1={pose.rHip} a2={pose.rKnee} l1={LEG.l1} l2={LEG.l2} width={38} fill={look.legs} />
        </g>
      )}
      <Shoe x={L.fx} y={L.fy} dir={-1} color={look.shoes} />
      <Shoe x={R.fx} y={R.fy} dir={1} color={look.shoes} />
      <Torso look={look} />
      <Limb x={-70} y={SHOULDER_Y} a1={pose.lShoulder} a2={pose.lElbow} l1={ARM.l1} l2={ARM.l2} width={34} fill={sleeve} end="hand" />
      {lHand && <g transform={`translate(${lhx} ${lhy})`}>{lHand}</g>}
      <Limb x={70} y={SHOULDER_Y} a1={pose.rShoulder} a2={pose.rElbow} l1={ARM.l1} l2={ARM.l2} width={34} fill={sleeve} end="hand" />
      {rHand && <g transform={`translate(${rhx} ${rhy})`}>{rHand}</g>}
      <g transform={`rotate(${pose.headTilt} 0 ${NECK_Y}) translate(0 ${HEAD_Y})`}>
        <clipPath id="toonHead"><circle r={HEAD_R} /></clipPath>
        <circle r={HEAD_R} fill="#DCD8D0" />
        <circle r={HEAD_R} cx={-14} cy={-12} fill="#FFFFFF" clipPath="url(#toonHead)" />
        <circle r={HEAD_R} fill="none" stroke={INKLINE} strokeWidth={7} />
        <Face r={HEAD_R} pose={pose} glasses={look.glasses} />
        {look.moustache && (
          <path d="M0,22 Q-20,14 -38,24 Q-30,38 -12,32 Q-4,30 0,26 Q4,30 12,32 Q30,38 38,24 Q20,14 0,22 Z" fill={look.hairColor === '#E8E6E1' ? '#BDB8AE' : look.hairColor} stroke={INKLINE} strokeWidth={4} strokeLinejoin="round" />
        )}
        {(!look.hat || look.hat === 'none' || look.hat === 'boater') && <Hair look={look} />}
        <Hat look={look} />
      </g>
    </g>
  );
};

/* ---------- The cast ---------- */
export const LOOKS = {
  sam: {top: 'hoodie', topColor: '#D6A645', topShade: '#B3842D', legs: '#3F5574', shoes: '#FFFFFF', hair: 'messy', hairColor: '#4A3326'},
  gerald: {
    top: 'suit', topColor: '#2E3A5C', topShade: '#1F2840', tie: '#B3263A', pinstripe: true, legs: '#2E3A5C', shoes: '#1E1E22',
    hair: 'slick', hairColor: '#C9CCD2', glasses: true,
  },
  sommelier: {top: 'waistcoat', topColor: '#26262B', topShade: '#141417', bowtie: '#26262B', legs: '#26262B', shoes: '#1E1E22', hair: 'slick', hairColor: '#2B2320', moustache: true},
  salesman: {top: 'suit', topColor: '#C79A5B', topShade: '#A57A3E', bowtie: '#B5302E', legs: '#7A5A3A', shoes: '#4A3426', hair: 'short', hairColor: '#4A3326', hat: 'boater', hatColor: '#E3C27A', moustache: true},
  scientist: {top: 'labcoat', topColor: '#F7F7F4', topShade: '#D8D8D2', tie: '#3D7BB8', legs: '#4C5466', shoes: '#2A2A2E', hair: 'bun', hairColor: '#6B4A2E', glasses: true},
  cashier: {top: 'tee', topColor: '#E25D4F', topShade: '#B9443A', legs: '#3F5574', shoes: '#2A2A2E', hair: 'bun', hairColor: '#2B2320', hat: 'cap', hatColor: '#E25D4F'},
  judge: {top: 'robe', topColor: '#1F1F24', topShade: '#0F0F12', legs: '#1F1F24', shoes: '#1E1E22', hair: 'bald', hairColor: '#E8E6E1', glasses: true},
  bouncer: {top: 'tee', topColor: '#1F1F24', topShade: '#0F0F12', legs: '#2A2A2E', shoes: '#1E1E22', hair: 'bald', hairColor: '#2B2320'},
  worker: {top: 'shirt', topColor: '#4C8BC4', topShade: '#356A9C', legs: '#3F5574', shoes: '#4A3426', hair: 'short', hairColor: '#2B2320', hat: 'hardhat'},
  mail: {top: 'shirt', topColor: '#5E86C2', topShade: '#466A9E', legs: '#2F3D59', shoes: '#1E1E22', hair: 'short', hairColor: '#4A3326', hat: 'cap', hatColor: '#2F4A80'},
  librarian: {top: 'shirt', topColor: '#7FA86B', topShade: '#5E8750', legs: '#6B5A4A', shoes: '#4A3426', hair: 'bun', hairColor: '#9A9A9A', glasses: true},
  exec: {top: 'suit', topColor: '#4A4F5C', topShade: '#353944', tie: '#3D7BB8', legs: '#4A4F5C', shoes: '#1E1E22', hair: 'short', hairColor: '#2B2320'},
  angry1: {top: 'tee', topColor: '#7FA86B', topShade: '#5E8750', legs: '#3F5574', shoes: '#FFFFFF', hair: 'short', hairColor: '#8A5A2B'},
  angry2: {top: 'hoodie', topColor: '#C46A9A', topShade: '#9E4F7B', legs: '#2F3D59', shoes: '#FFFFFF', hair: 'bun', hairColor: '#2B2320'},
  angry3: {top: 'shirt', topColor: '#E2A33F', topShade: '#B8822C', legs: '#4C5466', shoes: '#2A2A2E', hair: 'bald', hairColor: '#4A3326', glasses: true},
} satisfies Record<string, Look>;

export type Who = keyof typeof LOOKS;
