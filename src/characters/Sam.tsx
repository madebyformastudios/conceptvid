import React from 'react';
import {Face, INKLINE, Limb, Pose, limbEnd} from './Rig';

const HOODIE = '#D6A645';
const HOODIE_DARK = '#B3842D';
const JEANS = '#3F5574';
const HAIR = '#4A3326';

const HIP_Y = -200;
const SHOULDER_Y = -352;
const NECK_Y = -382;
const HEAD_R = 94;
const HEAD_Y = NECK_Y - HEAD_R + 14;

const Shoe: React.FC<{x: number; y: number; dir: 1 | -1}> = ({x, y, dir}) => (
  <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
    <path d="M-20,-14 Q-22,10 0,12 L34,12 Q46,10 44,0 Q40,-10 22,-12 L6,-20 Z" fill="#FFFFFF" stroke={INKLINE} strokeWidth={5.5} strokeLinejoin="round" />
    <line x1={-18} y1={6} x2={42} y2={6} stroke="#C9C4BA" strokeWidth={4} />
  </g>
);

/* Sam: our everyman. Mustard hoodie, jeans, messy brown hair. */
export const Sam: React.FC<{pose: Pose; boil?: string}> = ({pose, boil}) => {
  const leg = (side: -1 | 1, hip: number, knee: number) => {
    const hx = side * 26;
    const [fx, fy] = limbEnd(hx, HIP_Y, hip, knee, 98, 96);
    return {hx, fx, fy};
  };
  const L = leg(-1, pose.lHip, pose.lKnee);
  const R = leg(1, pose.rHip, pose.rKnee);
  return (
    <g transform={`translate(${pose.x} ${pose.y}) rotate(${pose.lean}) scale(1 ${pose.squash})`} filter={boil ? `url(#${boil})` : undefined}>
      {/* soft ground shadow */}
      <ellipse cx={0} cy={6} rx={90} ry={14} fill={INKLINE} opacity={0.18} />
      {/* legs */}
      <Limb x={L.hx} y={HIP_Y} a1={pose.lHip} a2={pose.lKnee} l1={98} l2={96} width={38} fill={JEANS} />
      <Limb x={R.hx} y={HIP_Y} a1={pose.rHip} a2={pose.rKnee} l1={98} l2={96} width={38} fill={JEANS} />
      <Shoe x={L.fx} y={L.fy} dir={-1} />
      <Shoe x={R.fx} y={R.fy} dir={1} />
      {/* hoodie body */}
      <path
        d={`M-64,${SHOULDER_Y - 18} Q-82,${SHOULDER_Y} -84,${SHOULDER_Y + 40} L-86,${HIP_Y + 4} Q0,${HIP_Y + 22} 86,${HIP_Y + 4} L84,${SHOULDER_Y + 40} Q82,${SHOULDER_Y} 64,${SHOULDER_Y - 18} Z`}
        fill={HOODIE} stroke={INKLINE} strokeWidth={7} strokeLinejoin="round"
      />
      <path d={`M38,${SHOULDER_Y - 16} Q78,${SHOULDER_Y} 80,${SHOULDER_Y + 40} L82,${HIP_Y + 2} Q62,${HIP_Y + 12} 46,${HIP_Y + 13} Q58,${SHOULDER_Y + 70} 38,${SHOULDER_Y - 16} Z`} fill={HOODIE_DARK} opacity={0.45} />
      <path d={`M-60,${SHOULDER_Y + 60} q8,30 2,60 M64,${SHOULDER_Y + 50} q-6,24 0,46`} fill="none" stroke={HOODIE_DARK} strokeWidth={5} strokeLinecap="round" />
      <path d={`M-86,${HIP_Y - 12} Q0,${HIP_Y + 6} 86,${HIP_Y - 12}`} fill="none" stroke={HOODIE_DARK} strokeWidth={8} />
      {/* kangaroo pocket */}
      <path d={`M-50,${HIP_Y - 20} L-40,${HIP_Y - 70} L40,${HIP_Y - 70} L50,${HIP_Y - 20}`} fill={HOODIE_DARK} opacity={0.55} stroke={INKLINE} strokeWidth={5} strokeLinejoin="round" />
      {/* hood collar + drawstrings */}
      <path d={`M-66,${NECK_Y + 4} Q0,${NECK_Y + 58} 66,${NECK_Y + 4} Q40,${NECK_Y + 30} 0,${NECK_Y + 32} Q-40,${NECK_Y + 30} -66,${NECK_Y + 4} Z`} fill={HOODIE_DARK} stroke={INKLINE} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M-16,${NECK_Y + 34} q-4,30 -2,52 M16,${NECK_Y + 34} q4,30 2,52`} fill="none" stroke={INKLINE} strokeWidth={4} strokeLinecap="round" />
      {/* arms */}
      <Limb x={-70} y={SHOULDER_Y} a1={pose.lShoulder} a2={pose.lElbow} l1={80} l2={76} width={34} fill={HOODIE} end="hand" />
      <Limb x={70} y={SHOULDER_Y} a1={pose.rShoulder} a2={pose.rElbow} l1={80} l2={76} width={34} fill={HOODIE} end="hand" />
      {/* head */}
      <g transform={`rotate(${pose.headTilt} 0 ${NECK_Y}) translate(0 ${HEAD_Y})`}>
        <clipPath id="samHead"><circle r={HEAD_R} /></clipPath>
        <circle r={HEAD_R} fill="#DCD8D0" />
        <circle r={HEAD_R} cx={-14} cy={-12} fill="#FFFFFF" clipPath="url(#samHead)" />
        <circle r={HEAD_R} fill="none" stroke={INKLINE} strokeWidth={7} />
        <Face r={HEAD_R} pose={pose} />
        {/* fluffy messy hair: bumpy crown, side flicks, four chunky fringe locks */}
        <path
          d="M-98,-4 Q-114,-18 -101,-34 Q-112,-72 -78,-92 Q-70,-120 -40,-113 Q-20,-134 6,-117 Q34,-132 53,-109 Q86,-113 91,-82 Q114,-62 101,-34 Q114,-18 98,-5 Q88,-28 78,-29 Q74,-50 55,-45 Q45,-27 29,-37 Q20,-58 1,-47 Q-11,-28 -27,-41 Q-41,-60 -57,-43 Q-67,-30 -81,-33 Q-91,-24 -98,-4 Z"
          fill={HAIR} stroke={INKLINE} strokeWidth={6} strokeLinejoin="round"
        />
        <path d="M-58,-88 q16,-14 34,-12 M10,-98 q20,-8 38,6 M-80,-60 q4,-14 16,-20 M62,-74 q14,4 20,18" fill="none" stroke="#6B4C39" strokeWidth={5} strokeLinecap="round" />
        <path d="M-22,-116 q4,-16 16,-20 M30,-120 q10,-12 22,-10" fill="none" stroke={INKLINE} strokeWidth={5} strokeLinecap="round" />
      </g>
    </g>
  );
};
