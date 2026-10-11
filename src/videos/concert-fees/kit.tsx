import React from 'react';
import {C, MONO, BODY, DISPLAY, STROKE} from '../../theme';
import {G} from '../../components/Art';

// Illustration kit for the concert-fees video. Same rules as components/Art.tsx:
// every piece is drawn around its own origin, flat colours, thick ink outlines.

const line = {stroke: C.ink, strokeWidth: STROKE, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type Pos = {x?: number; y?: number; s?: number; r?: number; o?: number};

export const money = (v: number, dec = 2) => '$' + v.toLocaleString('en-US', {minimumFractionDigits: dec, maximumFractionDigits: dec});

/* ---------- Concert ticket (main body + tear-off stub) ---------- */
export const ConcertTicket: React.FC<
  Pos & {price?: string; title?: string; color?: string; w?: number; strike?: number; priceColor?: string; sub?: string; shadow?: boolean}
> = ({price = '$50', title = 'LIVE TONIGHT', color = C.magenta, w = 440, strike = 0, priceColor = C.white, sub = 'SEC 104 · ROW F · SEAT 12', shadow, ...p}) => {
  const h = w * 0.46;
  const stub = w * 0.26;
  const x0 = -w / 2;
  const y0 = -h / 2;
  const sx = w / 2 - stub;
  return (
    <G {...p} shadow={shadow}>
      <path
        d={`M${x0 + 16},${y0} H${sx - 16} A16,16 0 0 0 ${sx + 16},${y0} H${w / 2 - 16} Q${w / 2},${y0} ${w / 2},${y0 + 16} V${h / 2 - 16} Q${w / 2},${h / 2} ${w / 2 - 16},${h / 2} H${sx + 16} A16,16 0 0 0 ${sx - 16},${h / 2} H${x0 + 16} Q${x0},${h / 2} ${x0},${h / 2 - 16} V${y0 + 16} Q${x0},${y0} ${x0 + 16},${y0} Z`}
        fill={color}
        {...line}
      />
      <path d={`M${sx + 16},${y0} H${w / 2 - 16} Q${w / 2},${y0} ${w / 2},${y0 + 16} V${h / 2 - 16} Q${w / 2},${h / 2} ${w / 2 - 16},${h / 2} H${sx + 16} A16,16 0 0 0 ${sx},${h / 2 - 16} V${y0 + 16} A16,16 0 0 0 ${sx + 16},${y0} Z`} fill={C.white} opacity={0.9} />
      <line x1={sx} y1={y0 + 22} x2={sx} y2={h / 2 - 22} stroke={C.ink} strokeWidth={4} strokeDasharray="8 9" />
      <text x={x0 + 28} y={y0 + 44} fontFamily={MONO} fontWeight={700} fontSize={w * 0.05} fill={C.white} letterSpacing={2}>
        {title}
      </text>
      <text x={x0 + 26} y={y0 + h * 0.66} fontFamily={DISPLAY} fontSize={w * 0.19} fill={priceColor} stroke={C.ink} strokeWidth={3} paintOrder="stroke">
        {price}
      </text>
      <text x={x0 + 28} y={h / 2 - 20} fontFamily={MONO} fontWeight={700} fontSize={w * 0.033} fill={C.white} opacity={0.9}>
        {sub}
      </text>
      {Array.from({length: 9}).map((_, i) => (
        <rect key={i} x={sx + 22 + i * (stub - 44) / 9} y={y0 + 30} width={i % 3 === 0 ? 6 : 3} height={h - 60} fill={C.ink} />
      ))}
      {strike > 0 && (
        <line x1={x0 + 20} y1={y0 + h * 0.55} x2={x0 + 20 + (sx - x0 - 40) * strike} y2={y0 + h * 0.48} stroke={C.red} strokeWidth={12} strokeLinecap="round" />
      )}
    </G>
  );
};

/* ---------- Checkout receipt; each line reveals with its own progress 0..1 ---------- */
export type ReceiptLine = {label: string; amount: string; t: number; color?: string; bold?: boolean; strike?: number};
export const Receipt: React.FC<Pos & {lines: ReceiptLine[]; title?: string; total?: {label: string; amount: string; t: number; color?: string}; w?: number; size?: number}> = ({
  lines,
  title = 'CHECKOUT',
  total,
  w = 560,
  size = 30,
  ...p
}) => {
  const lh = size * 1.75;
  const top = 92;
  const h = top + lines.length * lh + (total ? lh * 1.6 : 0) + 40;
  const n = Math.round(w / 28);
  const step = w / n;
  const zig = Array.from({length: n})
    .map((_, k) => {
      const i = n - 1 - k;
      return `L${-w / 2 + (i + 0.5) * step},${h + 14} L${-w / 2 + i * step},${h}`;
    })
    .join(' ');
  return (
    <G {...p}>
      <path d={`M${-w / 2},0 H${w / 2} V${h} ${zig} Z`} fill={C.white} {...line} />
      <text x={0} y={56} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={size * 0.95} letterSpacing={6} fill={C.ink}>
        {title}
      </text>
      <line x1={-w / 2 + 30} y1={76} x2={w / 2 - 30} y2={76} stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" />
      {lines.map((l, i) => {
        const y = top + i * lh + lh * 0.62;
        return (
          <g key={i} opacity={Math.min(1, l.t * 1.4)} transform={`translate(${(1 - l.t) * -30} 0)`}>
            {l.color && <rect x={-w / 2 + 22} y={y - size * 0.82} width={12} height={size} rx={4} fill={l.color} />}
            <text x={-w / 2 + 46} y={y} fontFamily={BODY} fontWeight={l.bold ? 800 : 700} fontSize={size} fill={C.ink}>
              {l.label}
            </text>
            <text x={w / 2 - 30} y={y} textAnchor="end" fontFamily={MONO} fontWeight={700} fontSize={size} fill={C.ink}>
              {l.amount}
            </text>
            {(l.strike ?? 0) > 0 && <line x1={-w / 2 + 40} y1={y - size * 0.32} x2={-w / 2 + 40 + (w - 70) * (l.strike ?? 0)} y2={y - size * 0.32} stroke={C.red} strokeWidth={6} strokeLinecap="round" />}
          </g>
        );
      })}
      {total && (
        <g opacity={Math.min(1, total.t * 1.4)} transform={`translate(0 ${(1 - total.t) * 16})`}>
          <line x1={-w / 2 + 30} y1={top + lines.length * lh + 12} x2={w / 2 - 30} y2={top + lines.length * lh + 12} stroke={C.ink} strokeWidth={4} />
          <line x1={-w / 2 + 30} y1={top + lines.length * lh + 20} x2={w / 2 - 30} y2={top + lines.length * lh + 20} stroke={C.ink} strokeWidth={4} />
          <text x={-w / 2 + 46} y={top + lines.length * lh + lh * 1.25} fontFamily={DISPLAY} fontSize={size * 1.25} fill={C.ink}>
            {total.label}
          </text>
          <text x={w / 2 - 30} y={top + lines.length * lh + lh * 1.25} textAnchor="end" fontFamily={DISPLAY} fontSize={size * 1.35} fill={total.color ?? C.red}>
            {total.amount}
          </text>
        </g>
      )}
    </G>
  );
};

/* ---------- Smartphone; children render in screen space, origin at screen centre ---------- */
export const Phone: React.FC<Pos & {w?: number; h?: number; children?: React.ReactNode; screen?: string}> = ({w = 340, h = 660, children, screen = C.white, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={46} fill={C.ink} {...line} />
    <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 32} rx={32} fill={screen} />
    <rect x={-44} y={-h / 2 + 26} width={88} height={20} rx={10} fill={C.ink} />
    <g>{children}</g>
  </G>
);

/* ---------- Big button (e.g. BUY NOW / CHECKOUT) ---------- */
export const Button: React.FC<Pos & {text: string; color?: string; w?: number; press?: number}> = ({text, color = C.green, w = 260, press = 0, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-34 + press * 6} width={w} height={68} rx={34} fill={color} {...line} strokeWidth={5} />
    <text y={12 + press * 6} textAnchor="middle" fontFamily={DISPLAY} fontSize={30} fill={C.white}>
      {text}
    </text>
  </G>
);

/* ---------- Arena / venue building ---------- */
export const Venue: React.FC<Pos & {name?: string; color?: string; lights?: number; frame?: number}> = ({name = 'ARENA', color = C.cyan, lights = 1, frame = 0, ...p}) => (
  <G {...p}>
    <path d="M-300,0 V-170 Q0,-330 300,-170 V0 Z" fill={color} {...line} />
    <path d="M-300,-170 Q0,-300 300,-170" fill="none" stroke={C.ink} strokeWidth={5} opacity={0.5} />
    {Array.from({length: 7}).map((_, i) => (
      <line key={i} x1={-240 + i * 80} y1={-150 - Math.sin(((i + 0.5) / 7) * Math.PI) * 90} x2={-240 + i * 80} y2={-110} stroke={C.ink} strokeWidth={5} opacity={0.35} />
    ))}
    <rect x={-210} y={-120} width={420} height={70} rx={10} fill={C.ink} {...line} strokeWidth={5} />
    <text y={-72} textAnchor="middle" fontFamily={DISPLAY} fontSize={42} fill={C.yellow} letterSpacing={3}>
      {name}
    </text>
    {Array.from({length: 14}).map((_, i) => (
      <circle key={i} cx={-196 + i * 30} cy={-128} r={5} fill={C.yellow} opacity={lights * (0.4 + 0.6 * ((Math.floor(frame / 5) + i) % 2))} />
    ))}
    {[-120, 0, 120].map((x) => (
      <rect key={x} x={x - 40} y={-40} width={80} height={40} fill={C.white} {...line} strokeWidth={5} />
    ))}
  </G>
);

/* ---------- Pie chart with slices revealed by t ---------- */
export type Slice = {v: number; color: string; label?: string; pop?: number};
export const Pie: React.FC<Pos & {slices: Slice[]; t?: number; rad?: number; labelSize?: number}> = ({slices, t = 1, rad = 200, labelSize = 30, ...p}) => {
  const tot = slices.reduce((a, b) => a + b.v, 0);
  let a0 = -Math.PI / 2;
  return (
    <G {...p}>
      <circle r={rad} fill={C.paperDark} {...line} />
      {slices.map((sl, i) => {
        const a1 = a0 + (sl.v / tot) * Math.PI * 2 * t;
        const mid = (a0 + a1) / 2;
        const off = (sl.pop ?? 0) * 26;
        const ox = Math.cos(mid) * off;
        const oy = Math.sin(mid) * off;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M${ox},${oy} L${ox + Math.cos(a0) * rad},${oy + Math.sin(a0) * rad} A${rad},${rad} 0 ${large} 1 ${ox + Math.cos(a1) * rad},${oy + Math.sin(a1) * rad} Z`;
        const lab = sl.label ? (
          <text x={ox + Math.cos(mid) * rad * 0.6} y={oy + Math.sin(mid) * rad * 0.6 + labelSize * 0.35} textAnchor="middle" fontFamily={DISPLAY} fontSize={labelSize} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke">
            {sl.label}
          </text>
        ) : null;
        a0 = a1;
        return t > 0.001 ? (
          <g key={i}>
            <path d={d} fill={sl.color} {...line} />
            {t > 0.95 && lab}
          </g>
        ) : null;
      })}
    </G>
  );
};

/* ---------- Donut with a percentage ---------- */
export const Donut: React.FC<Pos & {pct: number; t?: number; color?: string; rad?: number; label?: string}> = ({pct, t = 1, color = C.magenta, rad = 170, label, ...p}) => {
  const a = (pct / 100) * t * Math.PI * 2;
  const large = a > Math.PI ? 1 : 0;
  const ex = Math.sin(a) * rad;
  const ey = -Math.cos(a) * rad;
  return (
    <G {...p}>
      <circle r={rad} fill="none" stroke={C.paperDark} strokeWidth={70} />
      {a > 0.01 && <path d={`M0,${-rad} A${rad},${rad} 0 ${large} 1 ${ex},${ey}`} fill="none" stroke={color} strokeWidth={70} />}
      <circle r={rad + 35} fill="none" stroke={C.ink} strokeWidth={6} />
      <circle r={rad - 35} fill="none" stroke={C.ink} strokeWidth={6} />
      <text y={label ? 18 : 30} textAnchor="middle" fontFamily={DISPLAY} fontSize={rad * 0.55} fill={C.ink}>
        {Math.round(pct * t)}%
      </text>
      {label && (
        <text y={62} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={24} fill={C.ink}>
          {label}
        </text>
      )}
    </G>
  );
};

/* ---------- Contract with a signature drawn by `sign` 0..1 ---------- */
export const Contract: React.FC<Pos & {title?: string; sign?: number; seal?: number}> = ({title = 'EXCLUSIVE DEAL', sign = 0, seal = 0, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-220} width={340} height={440} rx={8} fill={C.white} {...line} />
    <text y={-160} textAnchor="middle" fontFamily={DISPLAY} fontSize={30} fill={C.ink}>
      {title}
    </text>
    {Array.from({length: 7}).map((_, i) => (
      <rect key={i} x={-130} y={-120 + i * 32} width={i % 3 === 2 ? 170 : 260} height={10} rx={5} fill={C.soft} />
    ))}
    <line x1={-130} y1={150} x2={60} y2={150} stroke={C.ink} strokeWidth={4} />
    <path
      d="M-120,140 C-100,90 -90,160 -70,120 C-55,90 -40,150 -20,125 C0,100 10,145 40,118"
      fill="none"
      stroke={C.cyan}
      strokeWidth={6}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - sign}
    />
    {seal > 0 && (
      <g transform={`translate(110 160) scale(${seal}) rotate(-12)`}>
        <circle r={44} fill={C.red} {...line} strokeWidth={5} />
        <path d="M-18,0 L-5,14 L20,-14" fill="none" stroke={C.white} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
  </G>
);

/* ---------- Door with a sign ---------- */
export const Door: React.FC<Pos & {label?: string; open?: number; color?: string}> = ({label, open = 0, color = C.magenta, ...p}) => (
  <G {...p}>
    <rect x={-120} y={-330} width={240} height={330} fill={C.ink} {...line} />
    <path d={`M-110,-320 L${-110 + 220 * (1 - open * 0.6)},${-320 + open * 30} L${-110 + 220 * (1 - open * 0.6)},${-10 - open * 30} L-110,-10 Z`} fill={color} {...line} strokeWidth={5} />
    <circle cx={-110 + 220 * (1 - open * 0.6) - 26} cy={-165} r={10} fill={C.yellow} {...line} strokeWidth={4} />
    {label && (
      <g transform="translate(0 -380)">
        <rect x={-150} y={-36} width={300} height={64} rx={10} fill={C.yellow} {...line} strokeWidth={5} />
        <text y={10} textAnchor="middle" fontFamily={DISPLAY} fontSize={30} fill={C.ink}>
          {label}
        </text>
      </g>
    )}
  </G>
);

/* ---------- Storefront with striped awning ---------- */
export const Shop: React.FC<Pos & {label?: string; color?: string; sign?: string; signT?: number}> = ({label = 'SHOP', color = C.cyan, sign, signT = 1, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-300} width={340} height={300} fill={C.paper} {...line} />
    <rect x={-190} y={-370} width={380} height={64} rx={8} fill={C.white} {...line} />
    <text y={-326} textAnchor="middle" fontFamily={DISPLAY} fontSize={34} fill={C.ink}>
      {label}
    </text>
    {Array.from({length: 6}).map((_, i) => (
      <path key={i} d={`M${-190 + i * 63.3},-306 h63.3 v40 a31.6,31.6 0 0 1 -63.3,0 z`} fill={i % 2 ? C.white : color} {...line} strokeWidth={5} />
    ))}
    <rect x={-140} y={-220} width={150} height={130} fill="#DFF4FB" {...line} strokeWidth={5} />
    <rect x={40} y={-200} width={100} height={200} fill={color} {...line} strokeWidth={5} />
    {sign && (
      <g transform={`translate(-65 -160) rotate(-6) scale(${signT})`}>
        <rect x={-80} y={-28} width={160} height={56} rx={6} fill={C.red} {...line} strokeWidth={4} />
        <text y={10} textAnchor="middle" fontFamily={DISPLAY} fontSize={26} fill={C.white}>
          {sign}
        </text>
      </g>
    )}
  </G>
);

/* ---------- Scalper bot ---------- */
export const Bot: React.FC<Pos & {color?: string; frame?: number}> = ({color = C.grey, frame = 0, ...p}) => (
  <G {...p}>
    <line x1={0} y1={-230} x2={0} y2={-270} stroke={C.ink} strokeWidth={6} />
    <circle cy={-276} r={12} fill={C.red} {...line} strokeWidth={4} opacity={0.6 + 0.4 * Math.sin(frame * 0.4)} />
    <rect x={-70} y={-230} width={140} height={110} rx={22} fill={color} {...line} />
    <rect x={-48} y={-205} width={96} height={52} rx={12} fill={C.ink} />
    <circle cx={-22} cy={-179} r={10} fill={C.red} />
    <circle cx={22} cy={-179} r={10} fill={C.red} />
    <rect x={-56} y={-112} width={112} height={112} rx={16} fill={color} {...line} />
    <text y={-42} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.ink}>
      BOT
    </text>
  </G>
);

/* ---------- Courthouse: pediment with scales, name on the frieze, columns, doorway, steps ---------- */
// Base sits on y=0; about 600 wide and 470 tall at s=1. `label` is sized to fit the frieze.
export const Courthouse: React.FC<Pos & {label?: string; color?: string}> = ({label = 'COURT', color = C.cyan, ...p}) => {
  const fs = Math.min(40, 470 / Math.max(6, label.length * 0.78));
  return (
    <G {...p}>
      {/* back wall + doorway */}
      <rect x={-250} y={-300} width={500} height={240} fill={C.paperDark} {...line} />
      <path d="M-46,-60 V-170 A46,46 0 0 1 46,-170 V-60 Z" fill={C.ink} />
      {/* columns with capitals and bases */}
      {[-210, -130, 130, 210].map((x) => (
        <g key={x}>
          <rect x={x - 24} y={-290} width={48} height={225} fill={C.white} {...line} strokeWidth={6} />
          <line x1={x - 8} y1={-280} x2={x - 8} y2={-75} stroke={C.ink} strokeWidth={3} opacity={0.25} />
          <line x1={x + 8} y1={-280} x2={x + 8} y2={-75} stroke={C.ink} strokeWidth={3} opacity={0.25} />
          <rect x={x - 34} y={-306} width={68} height={20} rx={4} fill={C.white} {...line} strokeWidth={5} />
          <rect x={x - 32} y={-80} width={64} height={18} rx={3} fill={C.white} {...line} strokeWidth={5} />
        </g>
      ))}
      {/* frieze with the name */}
      <rect x={-290} y={-370} width={580} height={66} fill={C.white} {...line} />
      <text y={-337 + fs * 0.36} textAnchor="middle" fontFamily={DISPLAY} fontSize={fs} fill={C.ink} letterSpacing={3}>
        {label}
      </text>
      {/* pediment with scales of justice */}
      <path d="M-310,-370 L0,-480 L310,-370 Z" fill={color} {...line} />
      <g transform="translate(0 -405)" stroke={C.ink} strokeWidth={4} strokeLinecap="round" fill="none">
        <line x1={0} y1={-46} x2={0} y2={18} />
        <line x1={-46} y1={-34} x2={46} y2={-34} />
        <path d="M-46,-34 L-62,-6 H-30 Z M46,-34 L30,-6 H62 Z" fill={C.yellow} strokeLinejoin="round" />
        <line x1={-16} y1={18} x2={16} y2={18} />
      </g>
      {/* steps */}
      <rect x={-300} y={-62} width={600} height={22} fill={C.white} {...line} strokeWidth={6} />
      <rect x={-325} y={-40} width={650} height={20} fill={C.white} {...line} strokeWidth={6} />
      <rect x={-350} y={-20} width={700} height={20} fill={C.white} {...line} strokeWidth={6} />
    </G>
  );
};

/* ---------- Capitol dome (Washington) ---------- */
export const Capitol: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-300} y={-140} width={600} height={140} fill={C.white} {...line} />
    {[-240, -180, -120, -60, 0, 60, 120, 180, 240].map((x) => (
      <line key={x} x1={x} y1={-120} x2={x} y2={-20} stroke={C.ink} strokeWidth={5} />
    ))}
    <rect x={-130} y={-200} width={260} height={60} fill={C.white} {...line} />
    <path d="M-120,-200 A120,120 0 0 1 120,-200 Z" fill={C.white} {...line} />
    <rect x={-14} y={-350} width={28} height={30} fill={C.white} {...line} strokeWidth={5} />
    <circle cy={-360} r={12} fill={C.white} {...line} strokeWidth={5} />
  </G>
);

/* ---------- Line chart drawn left to right by t ---------- */
export const LineChart: React.FC<Pos & {pts: number[]; t?: number; w?: number; h?: number; color?: string; max?: number; labels?: string[]}> = ({
  pts,
  t = 1,
  w = 700,
  h = 380,
  color = C.magenta,
  max,
  labels,
  ...p
}) => {
  const m = max ?? Math.max(...pts) * 1.1;
  const xy = pts.map((v, i) => [-w / 2 + (i / (pts.length - 1)) * w, -(v / m) * h] as const);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const end = Math.floor(t * (pts.length - 1));
  return (
    <G {...p}>
      <line x1={-w / 2 - 20} y1={0} x2={w / 2 + 30} y2={0} {...line} />
      <line x1={-w / 2 - 20} y1={0} x2={-w / 2 - 20} y2={-h - 30} {...line} />
      <path d={d} fill="none" stroke={color} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
      {xy.slice(0, end + 1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={12} fill={C.white} {...line} strokeWidth={5} />
      ))}
      {labels?.map((l, i) => (
        <text key={i} x={xy[i][0]} y={44} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.ink}>
          {l}
        </text>
      ))}
    </G>
  );
};

/* ---------- Vertical bar ---------- */
export const Bar: React.FC<Pos & {h: number; w?: number; color?: string; label?: string; value?: string}> = ({h, w = 140, color = C.cyan, label, value, ...p}) => (
  <G {...p}>
    {h > 1 && <rect x={-w / 2} y={-h} width={w} height={h} fill={color} {...line} />}
    {value && (
      <text y={-h - 22} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.ink}>
        {value}
      </text>
    )}
    {label && (
      <text y={46} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={28} fill={C.ink}>
        {label}
      </text>
    )}
  </G>
);

/* ---------- Countdown clock ---------- */
export const Timer: React.FC<Pos & {text: string; t?: number; color?: string}> = ({text, t = 1, color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-22} y={-150} width={44} height={30} rx={6} fill={C.ink} />
    <circle r={120} fill={C.white} {...line} />
    <path d={`M0,0 L0,-100 A100,100 0 ${t > 0.5 ? 1 : 0} 1 ${Math.sin(t * Math.PI * 2) * 100},${-Math.cos(t * Math.PI * 2) * 100} Z`} fill={color} opacity={0.85} />
    <circle r={120} fill="none" {...line} />
    <text y={190} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={54} fill={C.ink}>
      {text}
    </text>
  </G>
);

/* ---------- Box office booth ---------- */
export const BoxOffice: React.FC<Pos & {open?: boolean}> = ({open = true, ...p}) => (
  <G {...p}>
    <rect x={-200} y={-320} width={400} height={320} fill={C.yellow} {...line} />
    <rect x={-220} y={-390} width={440} height={76} rx={10} fill={C.red} {...line} />
    <text y={-338} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.white} letterSpacing={3}>
      BOX OFFICE
    </text>
    <rect x={-130} y={-270} width={260} height={150} rx={70} fill={open ? '#DFF4FB' : C.ink} {...line} />
    <rect x={-150} y={-120} width={300} height={24} fill={C.white} {...line} strokeWidth={5} />
  </G>
);

/* ---------- Banknote ---------- */
export const Bill: React.FC<Pos & {value?: string; color?: string}> = ({value = '$', color = C.green, ...p}) => (
  <G {...p}>
    <rect x={-110} y={-55} width={220} height={110} rx={10} fill={color} {...line} strokeWidth={6} />
    <circle r={34} fill={C.white} opacity={0.35} />
    <text y={16} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.white} stroke={C.ink} strokeWidth={3} paintOrder="stroke">
      {value}
    </text>
  </G>
);

/* ---------- Stock ticker card ---------- */
export const Stock: React.FC<Pos & {name: string; change: string; t?: number; color?: string}> = ({name, change, t = 1, color = C.green, ...p}) => (
  <G {...p}>
    <rect x={-200} y={-130} width={400} height={260} rx={18} fill={C.white} {...line} />
    <text x={-170} y={-80} fontFamily={DISPLAY} fontSize={Math.min(34, 190 / (name.length * 0.66))} fill={C.ink}>
      {name}
    </text>
    <path
      d="M-170,80 L-110,50 L-60,70 L0,20 L50,35 L110,-20 L170,-50"
      fill="none"
      stroke={color}
      strokeWidth={10}
      strokeLinejoin="round"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - t}
    />
    <text x={170} y={-80} textAnchor="end" fontFamily={MONO} fontWeight={700} fontSize={34} fill={color} opacity={t}>
      ▲{change}
    </text>
  </G>
);

/* ---------- Speech bubble ---------- */
export const Bubble: React.FC<Pos & {text: string; w?: number; size?: number; tail?: 'left' | 'right'; color?: string}> = ({text, w: wIn, size = 34, tail = 'left', color = C.white, ...p}) => {
  const lines = text.split('\n');
  // auto width: fits the longest line (Inter 800 is ~0.6em per char)
  const w = wIn ?? Math.max(...lines.map((l) => l.length)) * size * 0.6 + 70;
  const h = lines.length * size * 1.25 + 40;
  const tx = tail === 'left' ? -w / 2 + 50 : w / 2 - 50;
  return (
    <G {...p}>
      <path
        d={`M${-w / 2 + 24},${-h / 2} H${w / 2 - 24} Q${w / 2},${-h / 2} ${w / 2},${-h / 2 + 24} V${h / 2 - 24} Q${w / 2},${h / 2} ${w / 2 - 24},${h / 2} H${tx + 20} L${tx - (tail === 'left' ? 30 : -30)},${h / 2 + 50} L${tx - 20},${h / 2} H${-w / 2 + 24} Q${-w / 2},${h / 2} ${-w / 2},${h / 2 - 24} V${-h / 2 + 24} Q${-w / 2},${-h / 2} ${-w / 2 + 24},${-h / 2} Z`}
        fill={color}
        {...line}
        strokeWidth={6}
      />
      {lines.map((l, i) => (
        <text key={i} y={-h / 2 + 20 + size + i * size * 1.25 - size * 0.15} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={size} fill={C.ink}>
          {l}
        </text>
      ))}
    </G>
  );
};

/* ---------- Email window ---------- */
export const Email: React.FC<Pos & {from?: string; text: string; t?: number}> = ({from = 'INTERNAL', text, t = 1, ...p}) => (
  <G {...p}>
    <rect x={-330} y={-170} width={660} height={340} rx={16} fill={C.white} {...line} />
    <rect x={-330} y={-170} width={660} height={60} rx={16} fill={C.cyan} {...line} />
    <text x={-300} y={-128} fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.white}>
      ✉ {from}
    </text>
    {[0, 1, 2].map((i) => (
      <rect key={i} x={-290} y={-80 + i * 28} width={[480, 380, 430][i]} height={10} rx={5} fill={C.soft} />
    ))}
    <text x={0} y={90} textAnchor="middle" fontFamily={DISPLAY} fontSize={42} fill={C.ink} opacity={t}>
      {text}
    </text>
    <rect x={-270} y={60} width={540 * t} height={42} fill={C.yellow} opacity={0.6} style={{mixBlendMode: 'multiply'}} />
  </G>
);

/* ---------- Seat (stadium seat icon) ---------- */
export const Seat: React.FC<Pos & {color?: string}> = ({color = C.magenta, ...p}) => (
  <G {...p}>
    <rect x={-60} y={-140} width={120} height={110} rx={20} fill={color} {...line} />
    <rect x={-70} y={-40} width={140} height={40} rx={14} fill={color} {...line} />
    <line x1={-50} y1={0} x2={-50} y2={60} {...line} />
    <line x1={50} y1={0} x2={50} y2={60} {...line} />
  </G>
);

/* ---------- Simple scale (balance) ---------- */
export const Scale: React.FC<Pos & {tilt?: number; left?: React.ReactNode; right?: React.ReactNode}> = ({tilt = 0, left, right, ...p}) => (
  <G {...p}>
    <rect x={-80} y={-14} width={160} height={28} rx={8} fill={C.gold} {...line} />
    <line x1={0} y1={-14} x2={0} y2={-330} {...line} strokeWidth={12} />
    <g transform={`translate(0 -330) rotate(${tilt})`}>
      <line x1={-240} y1={0} x2={240} y2={0} {...line} strokeWidth={12} />
      <g transform={`translate(-240 0) rotate(${-tilt})`}>
        <line x1={0} y1={0} x2={-70} y2={120} {...line} strokeWidth={4} />
        <line x1={0} y1={0} x2={70} y2={120} {...line} strokeWidth={4} />
        <path d="M-100,120 Q0,170 100,120 Z" fill={C.gold} {...line} />
        <g transform="translate(0 110)">{left}</g>
      </g>
      <g transform={`translate(240 0) rotate(${-tilt})`}>
        <line x1={0} y1={0} x2={-70} y2={120} {...line} strokeWidth={4} />
        <line x1={0} y1={0} x2={70} y2={120} {...line} strokeWidth={4} />
        <path d="M-100,120 Q0,170 100,120 Z" fill={C.gold} {...line} />
        <g transform="translate(0 110)">{right}</g>
      </g>
    </g>
    <circle cy={-330} r={18} fill={C.gold} {...line} strokeWidth={5} />
  </G>
);

/* ---------- Held props (grip point at origin) ---------- */
export const HeldTicket: React.FC<{price?: string; r?: number; color?: string}> = ({price = '$50', r = -10, color = C.magenta}) => (
  <g transform={`rotate(${r}) translate(10 -70) scale(0.42)`}>
    <ConcertTicket price={price} color={color} />
  </g>
);

export const HeldPhone: React.FC<{r?: number; children?: React.ReactNode}> = ({r = -6, children}) => (
  <g transform={`rotate(${r}) translate(0 -70) scale(0.3)`}>
    <Phone>{children}</Phone>
  </g>
);

export const HeldSign: React.FC<{text: string; color?: string; r?: number}> = ({text, color = C.yellow, r = 0}) => (
  <g transform={`rotate(${r})`}>
    <rect x={-6} y={-200} width={12} height={210} fill="#B07A3E" {...line} strokeWidth={4} />
    <rect x={-120} y={-290} width={240} height={110} rx={10} fill={color} {...line} strokeWidth={5} />
    <text y={-222} textAnchor="middle" fontFamily={DISPLAY} fontSize={40} fill={C.ink}>
      {text}
    </text>
  </g>
);

/* ---------- Old-school TV set ---------- */
export const TV: React.FC<Pos & {label?: string; color?: string; children?: React.ReactNode}> = ({label = 'NEWS', color = C.cyan, children, ...p}) => (
  <G {...p}>
    <line x1={-60} y1={-200} x2={-110} y2={-270} {...line} />
    <line x1={60} y1={-200} x2={110} y2={-270} {...line} />
    <rect x={-230} y={-200} width={460} height={320} rx={30} fill={C.paperDark} {...line} />
    <rect x={-200} y={-170} width={330} height={260} rx={22} fill={color} {...line} />
    <circle cx={175} cy={-120} r={18} fill={C.white} {...line} strokeWidth={5} />
    <circle cx={175} cy={-60} r={18} fill={C.white} {...line} strokeWidth={5} />
    <rect x={-200} y={40} width={330} height={50} fill={C.red} {...line} strokeWidth={5} />
    <text x={-35} y={76} textAnchor="middle" fontFamily={DISPLAY} fontSize={30} fill={C.white}>
      {label}
    </text>
    <g transform="translate(-35 -65)">{children}</g>
    <rect x={-150} y={120} width={30} height={40} fill={C.ink} />
    <rect x={120} y={120} width={30} height={40} fill={C.ink} />
  </G>
);

/* ---------- Round badge with an icon and a caption ---------- */
export type IconName = 'star' | 'mega' | 'jersey' | 'building' | 'ticket' | 'gov' | 'headset' | 'shield' | 'card' | 'staff' | 'booth' | 'question';
export const Icon: React.FC<{name: IconName}> = ({name}) => {
  const st = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
  switch (name) {
    case 'star':
      return <path d="M0,-46 L13,-15 L46,-14 L20,7 L29,40 L0,21 L-29,40 L-20,7 L-46,-14 L-13,-15 Z" fill={C.white} {...st} />;
    case 'mega':
      return (
        <g>
          <path d="M-40,-14 L10,-38 L10,38 L-40,14 Z" fill={C.white} {...st} />
          <rect x={-52} y={-16} width={14} height={32} rx={4} fill={C.white} {...st} />
          <path d="M22,-20 Q36,0 22,20 M32,-32 Q54,0 32,32" fill="none" {...st} />
        </g>
      );
    case 'jersey':
      return (
        <g>
          <path d="M-20,-40 L-46,-26 L-38,0 L-28,-6 L-28,40 L28,40 L28,-6 L38,0 L46,-26 L20,-40 Q0,-26 -20,-40 Z" fill={C.white} {...st} />
          <text y={26} textAnchor="middle" fontFamily={DISPLAY} fontSize={34} fill={C.ink}>
            9
          </text>
        </g>
      );
    case 'building':
      return (
        <g>
          <path d="M-46,30 V-6 Q0,-50 46,-6 V30 Z" fill={C.white} {...st} />
          <rect x={-14} y={6} width={28} height={24} fill={C.ink} />
        </g>
      );
    case 'ticket':
      return (
        <g transform="rotate(-12)">
          <rect x={-46} y={-26} width={92} height={52} rx={8} fill={C.white} {...st} />
          <line x1={16} y1={-20} x2={16} y2={20} stroke={C.ink} strokeWidth={4} strokeDasharray="5 5" />
        </g>
      );
    case 'gov':
      return (
        <g>
          <path d="M-46,-14 L0,-42 L46,-14 Z" fill={C.white} {...st} />
          {[-30, -10, 10, 30].map((x) => (
            <line key={x} x1={x} y1={-8} x2={x} y2={26} {...st} />
          ))}
          <line x1={-48} y1={34} x2={48} y2={34} {...st} />
        </g>
      );
    case 'headset':
      return (
        <g>
          <path d="M-34,10 V-6 A34,34 0 0 1 34,-6 V10" fill="none" {...st} />
          <rect x={-46} y={-4} width={20} height={34} rx={8} fill={C.white} {...st} />
          <rect x={26} y={-4} width={20} height={34} rx={8} fill={C.white} {...st} />
          <path d="M36,30 Q30,44 8,44" fill="none" {...st} />
        </g>
      );
    case 'shield':
      return <path d="M0,-44 L38,-30 Q38,24 0,44 Q-38,24 -38,-30 Z" fill={C.white} {...st} />;
    case 'card':
      return (
        <g>
          <rect x={-46} y={-30} width={92} height={60} rx={8} fill={C.white} {...st} />
          <rect x={-46} y={-16} width={92} height={12} fill={C.ink} />
        </g>
      );
    case 'staff':
      return (
        <g>
          <circle cy={-20} r={18} fill={C.white} {...st} />
          <path d="M-34,40 Q-34,4 0,4 Q34,4 34,40 Z" fill={C.white} {...st} />
        </g>
      );
    case 'booth':
      return (
        <g>
          <rect x={-40} y={-30} width={80} height={66} fill={C.white} {...st} />
          <rect x={-46} y={-44} width={92} height={18} fill={C.white} {...st} />
          <rect x={-22} y={-14} width={44} height={28} rx={12} fill={C.ink} />
        </g>
      );
    default:
      return (
        <text y={22} textAnchor="middle" fontFamily={DISPLAY} fontSize={64} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke">
          ?
        </text>
      );
  }
};

export const Badge: React.FC<Pos & {icon: IconName; color?: string; label?: string; rad?: number; labelSize?: number}> = ({icon, color = C.cyan, label, rad = 80, labelSize = 28, ...p}) => (
  <G {...p}>
    <circle r={rad} fill={color} {...line} />
    <g transform={`scale(${rad / 80})`}>
      <Icon name={icon} />
    </g>
    {label && (
      <text y={rad + labelSize + 12} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={labelSize} fill={C.ink}>
        {label}
      </text>
    )}
  </G>
);

/* ---------- Browser window ---------- */
export const Browser: React.FC<Pos & {url?: string; w?: number; h?: number; children?: React.ReactNode}> = ({url = 'help', w = 760, h = 440, children, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill={C.white} {...line} />
    <path d={`M${-w / 2 + 16},${-h / 2} h${w - 32} a16,16 0 0 1 16,16 v40 h${-w} v-40 a16,16 0 0 1 16,-16 z`} fill={C.paperDark} {...line} />
    {[C.red, C.yellow, C.green].map((c, i) => (
      <circle key={c} cx={-w / 2 + 34 + i * 30} cy={-h / 2 + 28} r={9} fill={c} />
    ))}
    <rect x={-w / 2 + 140} y={-h / 2 + 12} width={w - 180} height={32} rx={16} fill={C.white} stroke={C.ink} strokeWidth={3} />
    <text x={-w / 2 + 160} y={-h / 2 + 36} fontFamily={MONO} fontWeight={500} fontSize={20} fill={C.ink}>
      {url}
    </text>
    <g transform={`translate(0 ${28})`}>{children}</g>
  </G>
);
