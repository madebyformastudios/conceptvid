import React from 'react';
import {C, MONO, BODY, DISPLAY, STROKE} from '../theme';

// Flat-infographic illustration kit. Every piece is drawn around its own origin
// so scenes can place it with x/y/s/r and animate freely.

type Pos = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const G: React.FC<Pos & {shadow?: boolean}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, shadow, children}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
    opacity={o}
    style={shadow ? {filter: `drop-shadow(9px 9px 0 ${C.ink})`} : undefined}
  >
    {children}
  </g>
);

const line = {stroke: C.ink, strokeWidth: STROKE, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

/* ---------- Printer ---------- */
export const Printer: React.FC<
  Pos & {screen?: string; screenColor?: string; paper?: number; paperInk?: boolean; blink?: boolean; frame?: number; eyes?: number}
> = ({screen = 'READY', screenColor = C.green, paper = 0, paperInk = true, blink, frame = 0, eyes = 0, ...p}) => {
  const on = !blink || Math.floor(frame / 8) % 2 === 0;
  const out = paper * 230;
  return (
    <G {...p}>
      {/* rear paper tray */}
      <path d="M-170,-150 L-150,-250 L150,-250 L170,-150 Z" fill={C.white} {...line} />
      <line x1={-110} y1={-215} x2={110} y2={-215} stroke={C.soft} strokeWidth={6} strokeLinecap="round" />
      <line x1={-110} y1={-185} x2={60} y2={-185} stroke={C.soft} strokeWidth={6} strokeLinecap="round" />
      {/* body */}
      <rect x={-260} y={-160} width={520} height={250} rx={34} fill={C.white} {...line} />
      <rect x={-260} y={-160} width={520} height={70} rx={34} fill={C.paperDark} {...line} />
      {/* output slot + page */}
      <rect x={-190} y={40} width={380} height={22} rx={11} fill={C.ink} />
      {paper > 0 && (
        <g>
          <rect x={-160} y={50} width={320} height={out} fill={C.white} {...line} />
          {paperInk &&
            [0, 1, 2, 3, 4].map((i) =>
              60 + 40 + i * 34 < 50 + out ? (
                <rect key={i} x={-120} y={95 + i * 34} width={i === 0 ? 150 : 240 - (i % 2) * 60} height={12} rx={6} fill={i === 0 ? C.ink : C.grey} />
              ) : null,
            )}
        </g>
      )}
      {/* screen */}
      <rect x={30} y={-70} width={200} height={70} rx={12} fill={C.ink} />
      <text x={130} y={-25} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={screen.length > 9 ? 20 : 26} fill={on ? screenColor : C.ink}>
        {screen}
      </text>
      {/* buttons */}
      <circle cx={-200} cy={-35} r={16} fill={C.green} {...line} strokeWidth={5} />
      <circle cx={-150} cy={-35} r={16} fill={C.paperDark} {...line} strokeWidth={5} />
      {/* menacing eyes */}
      {eyes > 0 && (
        <g opacity={eyes}>
          <path d="M-120,-130 l60,18 l-60,10 z" fill={C.red} />
          <path d="M120,-130 l-60,18 l60,10 z" fill={C.red} />
        </g>
      )}
    </G>
  );
};

/* ---------- Cartridge ---------- */
export const Cartridge: React.FC<
  Pos & {color?: string; level?: number; xray?: number; label?: string; chip?: boolean; cheap?: boolean}
> = ({color = C.cyan, level = 1, xray = 0, label = 'INK', chip = true, cheap, ...p}) => {
  const h = 260;
  const fillH = (h - 40) * level;
  return (
    <G {...p}>
      <rect x={-90} y={-130} width={180} height={h} rx={20} fill={cheap ? C.paperDark : C.white} {...line} />
      <rect x={-90} y={-130} width={180} height={50} rx={20} fill={color} {...line} />
      {/* x-ray window */}
      <g opacity={xray}>
        <rect x={-62} y={-66} width={124} height={h - 40} rx={10} fill={C.paper} {...line} strokeWidth={4} />
        <rect x={-58} y={-66 + (h - 40) - fillH} width={116} height={Math.max(0, fillH - 4)} rx={8} fill={color} />
      </g>
      <g opacity={1 - xray}>
        <rect x={-60} y={-40} width={120} height={70} rx={8} fill={color} opacity={0.18} />
        <text x={0} y={8} textAnchor="middle" fontFamily={DISPLAY} fontSize={30} fill={C.ink}>
          {label}
        </text>
      </g>
      {chip && (
        <g>
          <rect x={-36} y={80} width={72} height={34} rx={4} fill={C.gold} {...line} strokeWidth={4} />
          {[-20, 0, 20].map((d) => (
            <line key={d} x1={d} y1={86} x2={d} y2={108} stroke={C.ink} strokeWidth={3} />
          ))}
        </g>
      )}
    </G>
  );
};

/* ---------- Drop ---------- */
export const Drop: React.FC<Pos & {color?: string; face?: boolean}> = ({color = C.cyan, face, ...p}) => (
  <G {...p}>
    <path d="M0,-120 C40,-60 85,-10 85,40 A85,85 0 0 1 -85,40 C-85,-10 -40,-60 0,-120 Z" fill={color} {...line} />
    <path d="M-45,30 A50,50 0 0 0 -20,75" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" opacity={0.7} />
    {face && (
      <g>
        <circle cx={-25} cy={30} r={8} fill={C.ink} />
        <circle cx={25} cy={30} r={8} fill={C.ink} />
        <path d="M-18,58 Q0,70 18,58" fill="none" {...line} strokeWidth={5} />
      </g>
    )}
  </G>
);

/* ---------- Page ---------- */
export const Page: React.FC<Pos & {title?: string; lines?: number; accent?: string; w?: number; h?: number}> = ({
  title,
  lines = 6,
  accent = C.ink,
  w = 300,
  h = 400,
  ...p
}) => (
  <G {...p}>
    <path d={`M${-w / 2},${-h / 2} h${w - 60} l60,60 v${h - 60} h${-w} z`} fill={C.white} {...line} />
    <path d={`M${w / 2 - 60},${-h / 2} v60 h60`} fill={C.paperDark} {...line} />
    {title && (
      <text x={-w / 2 + 30} y={-h / 2 + 50} fontFamily={DISPLAY} fontSize={28} fill={accent}>
        {title}
      </text>
    )}
    {Array.from({length: lines}).map((_, i) => (
      <rect key={i} x={-w / 2 + 30} y={-h / 2 + 90 + i * 40} width={(w - 60) * (i % 3 === 2 ? 0.6 : 0.9)} height={12} rx={6} fill={C.soft} />
    ))}
  </G>
);

/* ---------- Champagne glass + bottle ---------- */
export const Champagne: React.FC<Pos & {fill?: number; liquid?: string}> = ({fill = 1, liquid = C.yellow, ...p}) => (
  <G {...p}>
    <clipPath id="flute">
      <path d="M-55,-200 L55,-200 L45,-20 Q0,20 -45,-20 Z" />
    </clipPath>
    <path d="M-55,-200 L55,-200 L45,-20 Q0,20 -45,-20 Z" fill={C.white} />
    <rect x={-60} y={-20 - 180 * fill} width={120} height={200} fill={liquid} clipPath="url(#flute)" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={-15 + i * 15} cy={-60 - i * 35} r={6} fill={C.white} opacity={fill > 0.2 ? 0.9 : 0} />
    ))}
    <path d="M-55,-200 L55,-200 L45,-20 Q0,20 -45,-20 Z" fill="none" {...line} />
    <line x1={0} y1={5} x2={0} y2={120} {...line} />
    <path d="M-60,125 Q0,105 60,125" fill={C.white} {...line} />
  </G>
);

export const Bottle: React.FC<Pos & {color?: string; label?: string; kind?: 'wine' | 'perfume' | 'ink' | 'water' | 'gas'}> = ({
  color = C.green,
  label = '',
  kind = 'wine',
  ...p
}) => {
  if (kind === 'perfume')
    return (
      <G {...p}>
        <rect x={-25} y={-160} width={50} height={40} rx={6} fill={C.gold} {...line} />
        <rect x={-15} y={-125} width={30} height={30} fill={C.white} {...line} />
        <rect x={-90} y={-100} width={180} height={190} rx={40} fill={color} {...line} />
        <rect x={-55} y={-40} width={110} height={60} rx={8} fill={C.white} {...line} strokeWidth={4} />
        <text x={0} y={0} textAnchor="middle" fontFamily={DISPLAY} fontSize={22} fill={C.ink}>
          {label}
        </text>
      </G>
    );
  if (kind === 'ink')
    return (
      <G {...p}>
        <rect x={-35} y={-170} width={70} height={50} rx={8} fill={C.ink} />
        <path d="M-80,-120 h160 v200 a20,20 0 0 1 -20,20 h-120 a20,20 0 0 1 -20,-20 z" fill={color} {...line} />
        <rect x={-60} y={-60} width={120} height={70} rx={8} fill={C.white} {...line} strokeWidth={4} />
        <text x={0} y={-15} textAnchor="middle" fontFamily={DISPLAY} fontSize={24} fill={C.ink}>
          {label}
        </text>
      </G>
    );
  return (
    <G {...p}>
      <rect x={-22} y={-230} width={44} height={40} rx={6} fill={kind === 'wine' ? C.gold : C.grey} {...line} />
      <path d="M-22,-190 v40 q-50,30 -50,90 v190 a16,16 0 0 0 16,16 h112 a16,16 0 0 0 16,-16 v-190 q0,-60 -50,-90 v-40 z" fill={color} {...line} />
      <rect x={-55} y={0} width={110} height={80} rx={8} fill={C.white} {...line} strokeWidth={4} />
      <text x={0} y={48} textAnchor="middle" fontFamily={DISPLAY} fontSize={22} fill={C.ink}>
        {label}
      </text>
    </G>
  );
};

/* ---------- Razor & blade ---------- */
export const Razor: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-22} y={-40} width={44} height={330} rx={22} fill={C.cyan} {...line} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={-10} y1={60 + i * 30} x2={10} y2={60 + i * 30} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    ))}
    <rect x={-120} y={-110} width={240} height={80} rx={18} fill={C.white} {...line} />
    <line x1={-95} y1={-85} x2={95} y2={-85} stroke={C.grey} strokeWidth={6} />
    <line x1={-95} y1={-60} x2={95} y2={-60} stroke={C.grey} strokeWidth={6} />
  </G>
);

export const Blade: React.FC<Pos & {color?: string}> = ({color = C.white, ...p}) => (
  <G {...p}>
    <rect x={-110} y={-36} width={220} height={72} rx={16} fill={color} {...line} />
    <line x1={-85} y1={-12} x2={85} y2={-12} stroke={C.grey} strokeWidth={6} />
    <line x1={-85} y1={12} x2={85} y2={12} stroke={C.grey} strokeWidth={6} />
  </G>
);

/* ---------- Price tag ---------- */
export const Tag: React.FC<Pos & {text: string; color?: string; w?: number; strike?: number}> = ({text, color = C.yellow, w = 240, strike = 0, ...p}) => (
  <G {...p}>
    <path d={`M${-w / 2},-50 h${w - 50} l50,50 l-50,50 h${-(w - 50)} z`} fill={color} {...line} />
    <circle cx={w / 2 - 40} cy={0} r={10} fill={C.paper} {...line} strokeWidth={5} />
    <text x={-w / 2 + 25} y={16} fontFamily={DISPLAY} fontSize={46} fill={C.ink}>
      {text}
    </text>
    {strike > 0 && <line x1={-w / 2 + 10} y1={0} x2={-w / 2 + 10 + (w - 40) * strike} y2={0} stroke={C.red} strokeWidth={10} strokeLinecap="round" />}
  </G>
);

/* ---------- Dialog window ---------- */
export const Dialog: React.FC<Pos & {title: string; msg: string; color?: string; w?: number; icon?: string}> = ({
  title,
  msg,
  color = C.red,
  w = 620,
  icon = '!',
  ...p
}) => (
  <G {...p}>
    <rect x={-w / 2} y={-110} width={w} height={220} rx={18} fill={C.white} {...line} />
    <path d={`M${-w / 2 + 18},-110 h${w - 36} a18,18 0 0 1 18,18 v38 h${-w} v-38 a18,18 0 0 1 18,-18 z`} fill={color} {...line} />
    <text x={-w / 2 + 28} y={-70} fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.white}>
      {title}
    </text>
    <circle cx={w / 2 - 36} cy={-82} r={11} fill={C.white} />
    <circle cx={-w / 2 + 70} cy={25} r={38} fill={color} {...line} strokeWidth={5} />
    <text x={-w / 2 + 70} y={40} textAnchor="middle" fontFamily={DISPLAY} fontSize={44} fill={C.white}>
      {icon}
    </text>
    <text x={-w / 2 + 130} y={36} fontFamily={BODY} fontWeight={800} fontSize={34} fill={C.ink}>
      {msg}
    </text>
  </G>
);

/* ---------- Person ---------- */
export const Person: React.FC<Pos & {color?: string; mood?: 'happy' | 'angry' | 'flat'}> = ({color = C.magenta, mood = 'flat', ...p}) => (
  <G {...p}>
    <path d="M-110,190 v-50 a110,110 0 0 1 220,0 v50 z" fill={color} {...line} />
    <circle cx={0} cy={-40} r={85} fill={C.white} {...line} />
    {mood === 'angry' ? (
      <g>
        <path d="M-50,-75 l35,15 M50,-75 l-35,15" {...line} strokeWidth={6} />
        <circle cx={-30} cy={-40} r={8} fill={C.ink} />
        <circle cx={30} cy={-40} r={8} fill={C.ink} />
        <path d="M-28,10 Q0,-10 28,10" fill="none" {...line} strokeWidth={6} />
      </g>
    ) : (
      <g>
        <circle cx={-30} cy={-45} r={8} fill={C.ink} />
        <circle cx={30} cy={-45} r={8} fill={C.ink} />
        {mood === 'happy' ? (
          <path d="M-30,-5 Q0,25 30,-5" fill="none" {...line} strokeWidth={6} />
        ) : (
          <line x1={-22} y1={0} x2={22} y2={0} {...line} strokeWidth={6} />
        )}
      </g>
    )}
  </G>
);

/* ---------- Coin ---------- */
export const Coin: React.FC<Pos> = (p) => (
  <G {...p}>
    <circle r={46} fill={C.yellow} {...line} strokeWidth={6} />
    <circle r={30} fill="none" stroke={C.gold} strokeWidth={5} />
    <text y={17} textAnchor="middle" fontFamily={DISPLAY} fontSize={46} fill={C.ink}>
      $
    </text>
  </G>
);

/* ---------- Chip ---------- */
export const Chip: React.FC<Pos & {glow?: number}> = ({glow = 0, ...p}) => (
  <G {...p}>
    {glow > 0 && <rect x={-200} y={-200} width={400} height={400} rx={60} fill={C.cyan} opacity={0.25 * glow} />}
    {[-110, -55, 0, 55, 110].map((d) => (
      <g key={d}>
        <line x1={d} y1={-150} x2={d} y2={-200} {...line} />
        <line x1={d} y1={150} x2={d} y2={200} {...line} />
        <line x1={-150} y1={d} x2={-200} y2={d} {...line} />
        <line x1={150} y1={d} x2={200} y2={d} {...line} />
      </g>
    ))}
    <rect x={-150} y={-150} width={300} height={300} rx={28} fill={C.ink} />
    <rect x={-95} y={-95} width={190} height={190} rx={14} fill={C.gold} {...line} />
    <path d="M-60,-20 h40 v-40 M60,20 h-40 v40 M-60,40 h30 M60,-40 h-30" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  </G>
);

/* ---------- Box / parcel ---------- */
export const Parcel: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-110} y={-80} width={220} height={160} rx={10} fill={C.gold} {...line} />
    <rect x={-25} y={-80} width={50} height={160} fill={C.yellow} {...line} strokeWidth={5} />
    <path d="M-110,-80 l20,-35 h180 l20,35" fill={C.yellow} {...line} />
  </G>
);

/* ---------- Gavel ---------- */
export const Gavel: React.FC<Pos> = (p) => (
  <G {...p}>
    <rect x={-20} y={-20} width={40} height={260} rx={14} fill={C.gold} {...line} transform="rotate(-45)" />
    <g transform="rotate(-45)">
      <rect x={-95} y={-90} width={190} height={90} rx={18} fill={C.ink} />
      <rect x={-115} y={-100} width={30} height={110} rx={8} fill={C.gold} {...line} />
      <rect x={85} y={-100} width={30} height={110} rx={8} fill={C.gold} {...line} />
    </g>
  </G>
);

/* ---------- Grocery bag ---------- */
export const Groceries: React.FC<Pos> = (p) => (
  <G {...p}>
    <path d="M-40,-150 l-20,-60 M30,-150 l30,-70" {...line} />
    <circle cx={-70} cy={-210} r={34} fill={C.red} {...line} />
    <rect x={40} y={-270} width={44} height={120} rx={10} fill={C.white} {...line} />
    <path d="M-60,-240 q-20,-60 20,-80" fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" />
    <path d="M-130,-150 h260 l-25,250 h-210 z" fill={C.paperDark} {...line} />
    <path d="M-60,-150 q60,40 120,0" fill="none" {...line} strokeWidth={5} />
  </G>
);

/* ---------- Generic arrow ---------- */
export const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; t?: number; color?: string; w?: number}> = ({
  x1,
  y1,
  x2,
  y2,
  t = 1,
  color = C.ink,
  w = 10,
}) => {
  const ex = x1 + (x2 - x1) * t;
  const ey = y1 + (y2 - y1) * t;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 34;
  if (t <= 0.01) return null;
  return (
    <g>
      <line x1={x1} y1={y1} x2={ex - Math.cos(ang) * hl * 0.6} y2={ey - Math.sin(ang) * hl * 0.6} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path
        d={`M${ex},${ey} L${ex - Math.cos(ang - 0.45) * hl},${ey - Math.sin(ang - 0.45) * hl} L${ex - Math.cos(ang + 0.45) * hl},${ey - Math.sin(ang + 0.45) * hl} Z`}
        fill={color}
        stroke={color}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </g>
  );
};

/* ---------- Stamp ---------- */
export const Stamp: React.FC<Pos & {text: string; color?: string}> = ({text, color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-text.length * 22 - 40} y={-60} width={text.length * 44 + 80} height={120} rx={14} fill="none" stroke={color} strokeWidth={10} />
    <rect x={-text.length * 22 - 26} y={-46} width={text.length * 44 + 52} height={92} rx={8} fill="none" stroke={color} strokeWidth={4} />
    <text y={24} textAnchor="middle" fontFamily={DISPLAY} fontSize={66} fill={color} letterSpacing={4}>
      {text}
    </text>
  </G>
);

/* ---------- Mouse cursor ---------- */
export const Cursor: React.FC<Pos & {press?: boolean}> = ({press, ...p}) => (
  <G {...p}>
    <g transform={`scale(${press ? 0.85 : 1})`}>
      {press && <circle r={46} fill="none" stroke={C.ink} strokeWidth={5} opacity={0.5} />}
      <path d="M0,0 L0,84 L22,64 L38,100 L54,92 L38,58 L66,56 Z" fill={C.white} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    </g>
  </G>
);
