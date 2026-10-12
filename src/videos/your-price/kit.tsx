import React from 'react';
import {C, MONO, BODY, DISPLAY, STROKE} from '../../theme';
import {G} from '../../components/Art';
import {Button} from '../concert-fees/kit';

// Illustration kit for the "your price" (surveillance pricing) video. Same rules as the other kits:
// drawn around its own origin, flat colour, thick ink outlines.

const line = {stroke: C.ink, strokeWidth: STROKE, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type Pos = {x?: number; y?: number; s?: number; r?: number; o?: number};

/* ---------- Ride-hailing quote, drawn for the inside of a <Phone> (screen ~308x628) ---------- */
export const RideQuote: React.FC<{price: string; color?: string; t?: number; note?: string}> = ({price, color = C.ink, t = 1, note}) => (
  <g>
    {/* map */}
    <rect x={-138} y={-270} width={276} height={230} rx={14} fill="#E3EEF2" />
    <path d="M-120,-80 L-60,-150 L10,-120 L80,-230 L120,-200" fill="none" stroke="#FFFFFF" strokeWidth={16} strokeLinecap="round" />
    <path d="M-100,-95 Q-40,-170 20,-130 T100,-215" fill="none" stroke={C.cyan} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />
    <circle cx={-100} cy={-95} r={11} fill={C.ink} />
    <path d="M100,-245 a16,16 0 0 1 16,16 c0,14 -16,30 -16,30 c0,0 -16,-16 -16,-30 a16,16 0 0 1 16,-16 z" fill={C.red} stroke={C.ink} strokeWidth={4} />
    {/* fare */}
    <text x={-120} y={10} fontFamily={BODY} fontWeight={800} fontSize={30} fill={C.ink}>Ride home</text>
    <text x={-120} y={44} fontFamily={MONO} fontWeight={700} fontSize={20} fill={C.grey}>4 seats · 12 min</text>
    <text x={-124} y={128} fontFamily={DISPLAY} fontSize={price.length > 6 ? 60 : 70} fill={color} opacity={t}>{price}</text>
    {note && (
      <text x={-120} y={170} fontFamily={MONO} fontWeight={700} fontSize={18} fill={C.grey}>
        {note}
      </text>
    )}
    <Button text="REQUEST" color={C.ink} y={240} w={250} />
  </g>
);

/* ---------- Couch ---------- */
export const Couch: React.FC<Pos & {w?: number; color?: string}> = ({w = 640, color = '#7C8FB0', ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-250} width={w} height={150} rx={40} fill={color} {...line} />
    <rect x={-w / 2 - 30} y={-170} width={w + 60} height={110} rx={34} fill={color} {...line} />
    <line x1={0} y1={-170} x2={0} y2={-70} {...line} strokeWidth={5} />
    <rect x={-w / 2 - 60} y={-200} width={80} height={150} rx={30} fill={color} {...line} />
    <rect x={w / 2 - 20} y={-200} width={80} height={150} rx={30} fill={color} {...line} />
    <rect x={-w / 2 - 20} y={-55} width={24} height={55} fill={C.ink} />
    <rect x={w / 2 - 4} y={-55} width={24} height={55} fill={C.ink} />
  </G>
);

/* ---------- Car (side view, facing right) ---------- */
export const Car: React.FC<Pos & {color?: string; label?: string}> = ({color = C.ink, label, ...p}) => (
  <G {...p}>
    <path d="M-200,-40 L-190,-95 Q-180,-110 -150,-112 L-90,-115 L-40,-170 Q-30,-180 -10,-180 L90,-180 Q110,-180 125,-165 L175,-115 L205,-110 Q225,-105 225,-80 L225,-40 Z" fill={color} {...line} />
    <path d="M-30,-160 L-75,-118 L40,-118 L40,-165 Z M55,-165 L55,-118 L150,-118 L110,-162 Z" fill="#CFE6F2" {...line} strokeWidth={5} />
    {[-120, 140].map((x) => (
      <g key={x}>
        <circle cx={x} cy={-40} r={44} fill={C.ink} />
        <circle cx={x} cy={-40} r={18} fill={C.soft} />
      </g>
    ))}
    {label && (
      <g transform="translate(20 -200)">
        <rect x={-60} y={-24} width={120} height={36} rx={8} fill={C.white} {...line} strokeWidth={4} />
        <text y={2} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={22} fill={C.ink}>{label}</text>
      </g>
    )}
  </G>
);

/* ---------- Market stall ---------- */
export const Stall: React.FC<Pos & {color?: string}> = ({color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-310} y={-470} width={18} height={470} fill="#8A5A2B" {...line} strokeWidth={4} />
    <rect x={292} y={-470} width={18} height={470} fill="#8A5A2B" {...line} strokeWidth={4} />
    {Array.from({length: 8}).map((_, i) => (
      <path key={i} d={`M${-330 + i * 82.5},-500 h82.5 v58 a41,41 0 0 1 -82.5,0 z`} fill={i % 2 ? C.white : color} {...line} strokeWidth={5} />
    ))}
    <rect x={-340} y={-520} width={680} height={30} rx={6} fill={color} {...line} strokeWidth={5} />
    {/* table */}
    <rect x={-300} y={-200} width={600} height={40} rx={6} fill="#B07A3E" {...line} />
    <rect x={-290} y={-160} width={580} height={160} fill="#8A5A2B" {...line} />
  </G>
);

/* ---------- Handbag ---------- */
export const Handbag: React.FC<Pos & {color?: string}> = ({color = C.magenta, ...p}) => (
  <G {...p}>
    <path d="M-40,-80 Q-40,-130 0,-130 Q40,-130 40,-80" fill="none" {...line} strokeWidth={8} />
    <path d="M-80,-80 L80,-80 L95,0 L-95,0 Z" fill={color} {...line} />
    <rect x={-20} y={-60} width={40} height={20} rx={6} fill={C.yellow} {...line} strokeWidth={4} />
  </G>
);

/* ---------- Camera (held prop, grip at origin) ---------- */
export const HeldCamera: React.FC = () => (
  <g transform="translate(0 -40) scale(0.5)">
    <rect x={-90} y={-60} width={180} height={120} rx={18} fill={C.ink} {...line} />
    <rect x={-40} y={-80} width={60} height={26} rx={6} fill={C.ink} />
    <circle r={42} fill="#3A3F4B" stroke={C.white} strokeWidth={6} />
    <circle r={20} fill="#6FA8C9" />
  </g>
);

/* ---------- Icons for data badges ---------- */
export type Icon2 = 'pin' | 'device' | 'cart' | 'mouse' | 'scroll' | 'eye' | 'clock' | 'baby' | 'walk' | 'type' | 'school' | 'dollar' | 'student' | 'kid' | 'bird';
const ICON2: Record<Icon2, React.ReactNode> = (() => {
  const st = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
  return {
    pin: <path d="M0,-44 a28,28 0 0 1 28,28 c0,24 -28,52 -28,52 c0,0 -28,-28 -28,-52 a28,28 0 0 1 28,-28 z M0,-26 a10,10 0 1 0 0.1,0" fill={C.white} {...st} fillRule="evenodd" />,
    device: (
      <g>
        <rect x={-24} y={-42} width={48} height={84} rx={9} fill={C.white} {...st} />
        <circle cy={30} r={4} fill={C.ink} />
      </g>
    ),
    cart: (
      <g>
        <path d="M-44,-30 L-30,-30 L-18,18 L32,18 L42,-16 L-24,-16" fill="none" {...st} />
        <circle cx={-12} cy={32} r={6} fill={C.white} {...st} />
        <circle cx={26} cy={32} r={6} fill={C.white} {...st} />
      </g>
    ),
    mouse: (
      <g>
        <rect x={-24} y={-36} width={48} height={72} rx={24} fill={C.white} {...st} />
        <line x1={0} y1={-36} x2={0} y2={-10} {...st} />
      </g>
    ),
    scroll: (
      <g>
        <rect x={-30} y={-40} width={60} height={80} rx={8} fill={C.white} {...st} />
        <path d="M0,-22 L0,22 M-12,10 L0,22 L12,10" fill="none" {...st} />
      </g>
    ),
    eye: (
      <g>
        <path d="M-44,0 Q0,-40 44,0 Q0,40 -44,0 Z" fill={C.white} {...st} />
        <circle r={13} fill={C.ink} />
      </g>
    ),
    clock: (
      <g>
        <circle r={38} fill={C.white} {...st} />
        <path d="M0,-22 L0,0 L16,10" fill="none" {...st} />
      </g>
    ),
    baby: (
      <g>
        <circle cy={-8} r={28} fill={C.white} {...st} />
        <path d="M-10,-40 q10,-12 20,0" fill="none" {...st} />
        <circle cx={-9} cy={-10} r={3.5} fill={C.ink} />
        <circle cx={9} cy={-10} r={3.5} fill={C.ink} />
        <path d="M-30,40 Q0,14 30,40" fill={C.white} {...st} />
      </g>
    ),
    walk: (
      <g>
        <circle cx={6} cy={-34} r={9} fill={C.white} {...st} />
        <path d="M4,-22 L-2,8 L-16,36 M-2,8 L16,34 M0,-14 L-20,0 M2,-14 L22,-2" fill="none" {...st} />
      </g>
    ),
    type: (
      <g>
        <rect x={-44} y={-24} width={88} height={48} rx={8} fill={C.white} {...st} />
        {[-28, -10, 8, 26].map((x) => (
          <rect key={x} x={x - 6} y={-12} width={12} height={10} rx={2} fill={C.ink} />
        ))}
        <rect x={-22} y={6} width={44} height={8} rx={3} fill={C.ink} />
      </g>
    ),
    school: (
      <g>
        <path d="M-40,-6 L0,-36 L40,-6 Z" fill={C.white} {...st} />
        <rect x={-32} y={-6} width={64} height={42} fill={C.white} {...st} />
        <rect x={-9} y={12} width={18} height={24} fill={C.ink} />
      </g>
    ),
    dollar: (
      <text y={26} textAnchor="middle" fontFamily={DISPLAY} fontSize={72} fill={C.white} stroke={C.ink} strokeWidth={4} paintOrder="stroke">
        $
      </text>
    ),
    student: (
      <g>
        <path d="M-44,-14 L0,-34 L44,-14 L0,6 Z" fill={C.white} {...st} />
        <path d="M-24,-4 L-24,22 Q0,36 24,22 L24,-4" fill={C.white} {...st} />
      </g>
    ),
    kid: (
      <g>
        <circle cy={-18} r={18} fill={C.white} {...st} />
        <path d="M-26,40 Q-26,8 0,8 Q26,8 26,40 Z" fill={C.white} {...st} />
      </g>
    ),
    bird: (
      <g>
        <path d="M-36,10 Q-30,-30 6,-26 Q30,-24 36,-4 L48,0 L36,6 Q24,30 -6,28 Q-26,26 -36,10 Z" fill={C.white} {...st} />
        <circle cx={18} cy={-10} r={4} fill={C.ink} />
      </g>
    ),
  };
})();

export const Badge2: React.FC<Pos & {icon: Icon2; color?: string; label?: string; rad?: number; labelSize?: number}> = ({icon, color = C.cyan, label, rad = 80, labelSize = 28, ...p}) => (
  <G {...p}>
    <circle r={rad} fill={color} {...line} />
    <g transform={`scale(${rad / 80})`}>{ICON2[icon]}</g>
    {label && (
      <text y={rad + labelSize + 12} textAnchor="middle" fontFamily={BODY} fontWeight={800} fontSize={labelSize} fill={C.ink}>
        {label}
      </text>
    )}
  </G>
);

/* ---------- Flat-screen TV with a price ---------- */
export const FlatTV: React.FC<Pos & {screen?: string}> = ({screen = '#2F3A57', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-330} width={520} height={310} rx={14} fill={C.ink} {...line} />
    <rect x={-240} y={-310} width={480} height={270} rx={6} fill={screen} />
    <path d="M-200,-80 Q-80,-260 60,-160 T220,-260" fill="none" stroke="#6FA8C9" strokeWidth={10} opacity={0.6} />
    <path d="M-40,-20 L-70,0 L70,0 L40,-20 Z" fill={C.ink} {...line} strokeWidth={5} />
  </G>
);

/* ---------- Big-box store front ---------- */
export const StoreFront: React.FC<Pos & {name?: string; color?: string}> = ({name = 'STORE', color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-420} y={-360} width={840} height={360} fill={C.paperDark} {...line} />
    <rect x={-440} y={-400} width={880} height={60} fill={color} {...line} />
    <text y={-354} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.white} letterSpacing={6}>
      {name}
    </text>
    <rect x={-120} y={-220} width={240} height={220} fill="#DFF4FB" {...line} />
    <line x1={0} y1={-220} x2={0} y2={0} {...line} strokeWidth={5} />
    {[-320, 220].map((x) => (
      <rect key={x} x={x} y={-260} width={100} height={130} fill="#DFF4FB" {...line} strokeWidth={5} />
    ))}
  </G>
);

/* ---------- Parking lot lines ---------- */
export const ParkingLines: React.FC<Pos & {n?: number; gap?: number}> = ({n = 5, gap = 220, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => (
      <path key={i} d={`M${(i - (n - 1) / 2) * gap},0 l-40,60`} stroke={C.white} strokeWidth={10} strokeLinecap="round" />
    ))}
  </G>
);

/* ---------- Laptop with a label on the lid (back view) ---------- */
export const LaptopLid: React.FC<Pos & {label: string; color?: string}> = ({label, color = '#C9CCD2', ...p}) => (
  <G {...p}>
    <rect x={-170} y={-230} width={340} height={220} rx={16} fill={color} {...line} />
    <path d="M-200,-10 L200,-10 L220,14 L-220,14 Z" fill={color} {...line} />
    <text y={-100} textAnchor="middle" fontFamily={DISPLAY} fontSize={46} fill={C.ink}>
      {label}
    </text>
  </G>
);

const STAR = 'M0,-46 L13,-15 L46,-14 L20,7 L29,40 L0,21 L-29,40 L-20,7 L-46,-14 L-13,-15 Z';

/* ---------- Hotel result row (for a Browser) ---------- */
export const HotelRow: React.FC<{y: number; name: string; price: string; stars: number; fancy?: boolean; t?: number}> = ({y, name, price, stars, fancy, t = 1}) => (
  <g transform={`translate(0 ${y + (1 - t) * 20})`} opacity={t}>
    <rect x={-390} y={-38} width={780} height={76} rx={10} fill={fancy ? '#FFF4D6' : C.white} stroke={C.ink} strokeWidth={3} />
    <rect x={-376} y={-26} width={70} height={52} rx={6} fill={fancy ? C.gold : C.soft} />
    <text x={-290} y={-4} fontFamily={BODY} fontWeight={800} fontSize={26} fill={C.ink}>
      {name}
    </text>
    {Array.from({length: 5}).map((_, i) => (
      <path key={i} transform={`translate(${-280 + i * 22} 18) scale(0.22)`} d={STAR} fill={i < stars ? C.gold : C.soft} />
    ))}
    <text x={370} y={12} textAnchor="end" fontFamily={DISPLAY} fontSize={34} fill={fancy ? C.red : C.ink}>
      {price}
    </text>
  </g>
);

/* ---------- Groceries ---------- */
export const Cereal: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-60} y={-180} width={120} height={180} rx={6} fill={C.yellow} {...line} />
    <circle cy={-100} r={34} fill={C.white} {...line} strokeWidth={4} />
    <text y={-145} textAnchor="middle" fontFamily={DISPLAY} fontSize={24} fill={C.ink}>FLAKES</text>
  </G>
);
export const Pasta: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-45} y={-170} width={90} height={170} rx={8} fill={C.cyan} {...line} />
    <rect x={-28} y={-130} width={56} height={70} rx={6} fill="#F6E7B8" {...line} strokeWidth={4} />
    {[-14, 0, 14].map((x) => (
      <line key={x} x1={x} y1={-124} x2={x} y2={-66} stroke="#D9B86A" strokeWidth={5} />
    ))}
  </G>
);
export const PeanutButter: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-55} y={-150} width={110} height={30} rx={6} fill={C.red} {...line} />
    <rect x={-60} y={-122} width={120} height={122} rx={16} fill="#C08A4A" {...line} />
    <rect x={-46} y={-96} width={92} height={60} rx={6} fill={C.white} {...line} strokeWidth={4} />
    <text y={-58} textAnchor="middle" fontFamily={DISPLAY} fontSize={22} fill={C.ink}>PB</text>
  </G>
);
export const Thermometer: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-22} y={-200} width={44} height={170} rx={22} fill={C.white} {...line} />
    <rect x={-8} y={-110} width={16} height={90} rx={8} fill={C.red} />
    <circle cy={-20} r={36} fill={C.red} {...line} />
    {[-180, -160, -140].map((y) => (
      <line key={y} x1={4} y1={y} x2={18} y2={y} stroke={C.ink} strokeWidth={4} />
    ))}
  </G>
);
export const Moon: React.FC<Pos> = (p) => (
  <G {...p}>
    <path d="M20,-60 A62,62 0 1 0 60,40 A50,50 0 1 1 20,-60 Z" fill={C.yellow} {...line} />
  </G>
);

/* ---------- Shopping cart ---------- */
export const Cart: React.FC<Pos & {children?: React.ReactNode}> = ({children, ...p}) => (
  <G {...p}>
    <g>{children}</g>
    <path d="M-240,-260 L-200,-260 L-160,-40 L200,-40 L230,-200 L-180,-200" fill="none" {...line} strokeWidth={10} />
    <path d="M-176,-200 L-150,-60 L194,-60 L218,-200" fill="#FFFFFF" fillOpacity={0.5} stroke={C.ink} strokeWidth={4} />
    {[-80, 0, 80, 160].map((x) => (
      <line key={x} x1={x} y1={-200} x2={x - 6} y2={-60} stroke={C.ink} strokeWidth={4} />
    ))}
    <circle cx={-120} cy={0} r={24} fill={C.ink} />
    <circle cx={170} cy={0} r={24} fill={C.ink} />
  </G>
);

/* ---------- Shelf price label: paper or digital ---------- */
export const ShelfLabel: React.FC<Pos & {price: string; digital?: boolean; flicker?: number}> = ({price, digital, flicker = 0, ...p}) => (
  <G {...p}>
    <rect x={-120} y={-70} width={240} height={140} rx={10} fill={digital ? '#1E2433' : C.white} {...line} />
    {digital ? (
      <>
        <rect x={-104} y={-54} width={208} height={108} rx={6} fill="#E8F0E8" />
        <text y={24} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={52} fill={C.ink} opacity={1 - flicker * 0.7}>
          {price}
        </text>
        <circle cx={92} cy={-44} r={6} fill={C.green} />
      </>
    ) : (
      <text y={24} textAnchor="middle" fontFamily={DISPLAY} fontSize={58} fill={C.ink}>
        {price}
      </text>
    )}
  </G>
);

/* ---------- Round price sticker ---------- */
export const Sticker: React.FC<Pos & {price: string; color?: string}> = ({price, color = C.yellow, ...p}) => (
  <G {...p}>
    <circle r={90} fill={color} {...line} />
    <circle r={74} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="6 8" />
    <text y={20} textAnchor="middle" fontFamily={DISPLAY} fontSize={price.length > 4 ? 44 : 56} fill={C.ink}>
      {price}
    </text>
  </G>
);

/* ---------- Airplane (side, facing right) ---------- */
export const Plane: React.FC<Pos & {color?: string}> = ({color = C.white, ...p}) => (
  <G {...p}>
    <path d="M-260,-10 Q-250,-50 -200,-50 L180,-50 Q260,-45 280,0 Q260,30 180,30 L-200,30 Q-250,30 -260,-10 Z" fill={color} {...line} />
    <path d="M-40,-10 L-120,120 L-60,120 L60,-10 Z" fill={C.cyan} {...line} />
    <path d="M-220,-50 L-270,-140 L-220,-140 L-150,-50 Z" fill={C.cyan} {...line} />
    {[-140, -90, -40, 10, 60, 110].map((x) => (
      <circle key={x} cx={x} cy={-18} r={11} fill="#CFE6F2" stroke={C.ink} strokeWidth={4} />
    ))}
  </G>
);

/* ---------- Taxi meter ---------- */
export const TaxiMeter: React.FC<Pos & {value: string}> = ({value, ...p}) => (
  <G {...p}>
    <rect x={-200} y={-110} width={400} height={220} rx={20} fill={C.ink} {...line} />
    <rect x={-170} y={-80} width={340} height={100} rx={10} fill="#1B2A1B" />
    <text y={0} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={64} fill="#7CFF7C">
      {value}
    </text>
    <text x={-150} y={70} fontFamily={MONO} fontWeight={700} fontSize={22} fill={C.white}>
      BASE · /MIN · /MILE
    </text>
  </G>
);

/* ---------- Coin seen edge-on as it flips (`t` = flip phase) ---------- */
export const FlipCoin: React.FC<Pos & {t: number}> = ({t, ...p}) => {
  const sx = Math.cos(t * Math.PI * 2);
  return (
    <G {...p}>
      <g transform={`scale(${Math.max(0.08, Math.abs(sx))} 1)`}>
        <circle r={70} fill={sx > 0 ? C.gold : C.yellow} {...line} />
        <text y={24} textAnchor="middle" fontFamily={DISPLAY} fontSize={66} fill={C.ink}>
          $
        </text>
      </g>
    </G>
  );
};
