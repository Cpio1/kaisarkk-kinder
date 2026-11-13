"use client";

import { motion } from "motion/react";

const stroke = { stroke: "#2a2c33", strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Gear({ cx, cy, r, teeth, fill, duration, reverse = false }: { cx: number; cy: number; r: number; teeth: number; fill: string; duration: number; reverse?: boolean }) {
  const tw = (Math.PI * 2 * r) / teeth / 2.2;
  return (
    <motion.g
      style={{ originX: `${cx}px`, originY: `${cy}px`, transformBox: "view-box" }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: teeth }).map((_, i) => (
        <rect
          key={i}
          x={cx - tw / 2}
          y={cy - r - 7}
          width={tw}
          height={12}
          rx={3}
          fill={fill}
          {...stroke}
          strokeWidth={3}
          transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={fill} {...stroke} />
      <circle cx={cx} cy={cy} r={r * 0.36} fill="#fffdf8" {...stroke} strokeWidth={3} />
    </motion.g>
  );
}

/** Робот с шестерёнками. */
export function RobotIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false">
      <Gear cx={44} cy={58} r={22} teeth={9} fill="#ffc93c" duration={9} />
      <Gear cx={78} cy={30} r={14} teeth={7} fill="#ff7a66" duration={6} reverse />
      <Gear cx={200} cy={150} r={18} teeth={8} fill="#c7b8f2" duration={8} reverse />

      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
        {/* Антенна */}
        <path d="M140 46V26" {...stroke} fill="none" />
        <motion.circle
          cx={140}
          cy={22}
          r={8}
          fill="#ff7a66"
          {...stroke}
          animate={{ fill: ["#ff7a66", "#ffc93c", "#ff7a66"] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        {/* Голова */}
        <rect x="98" y="46" width="84" height="62" rx="20" fill="#fffdf8" {...stroke} />
        <rect x="110" y="58" width="60" height="36" rx="14" fill="#2a2c33" />
        <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }} style={{ originY: "76px", transformBox: "view-box" }}>
          <circle cx="128" cy="76" r="7" fill="#4fc4b8" />
          <circle cx="152" cy="76" r="7" fill="#4fc4b8" />
        </motion.g>
        <rect x="90" y="66" width="8" height="20" rx="4" fill="#ffc93c" {...stroke} strokeWidth={3} />
        <rect x="182" y="66" width="8" height="20" rx="4" fill="#ffc93c" {...stroke} strokeWidth={3} />
        {/* Тело */}
        <rect x="104" y="112" width="72" height="56" rx="18" fill="#4fc4b8" {...stroke} />
        <circle cx="128" cy="138" r="8" fill="#ffc93c" {...stroke} strokeWidth={3} />
        <rect x="142" y="130" width="22" height="6" rx="3" fill="#fffdf8" />
        <rect x="142" y="142" width="16" height="6" rx="3" fill="#fffdf8" />
        {/* Руки */}
        <motion.path
          d="M104 124c-14 2-20 10-22 22"
          fill="none"
          {...stroke}
          strokeWidth={6}
          animate={{ rotate: [0, -14, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "104px", originY: "124px", transformBox: "view-box" }}
        />
        <path d="M176 124c14 2 20 10 22 22" fill="none" {...stroke} strokeWidth={6} />
        <circle cx="82" cy="148" r="7" fill="#ff7a66" {...stroke} strokeWidth={3} />
        <circle cx="198" cy="148" r="7" fill="#ff7a66" {...stroke} strokeWidth={3} />
        {/* Ноги */}
        <rect x="116" y="168" width="14" height="18" rx="5" fill="#2a2c33" />
        <rect x="150" y="168" width="14" height="18" rx="5" fill="#2a2c33" />
      </motion.g>
    </svg>
  );
}

/** Поварской колпак, венчик, ложка и продукты. */
export function CookingIllustration({ className = "" }: { className?: string }) {
  const bob = (d: number) => ({
    animate: { y: [0, -8, 0], rotate: [0, 6, 0] },
    transition: { duration: 3 + d, repeat: Infinity, ease: "easeInOut" as const, delay: d },
  });
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false">
      {/* Миска */}
      <path d="M58 128h124c0 34-28 56-62 56s-62-22-62-56Z" fill="#fffdf8" {...stroke} />
      <path d="M70 140h100" stroke="#ffc93c" strokeWidth={6} strokeLinecap="round" />
      {/* Колпак */}
      <motion.g {...bob(0)} style={{ originX: "120px", originY: "90px", transformBox: "view-box" }}>
        <path
          d="M88 98V78c-14-2-22-14-18-26 4-12 18-18 30-12 4-12 14-18 22-18s18 6 22 18c12-6 26 0 30 12 4 12-4 24-18 26v20Z"
          fill="#fffdf8"
          {...stroke}
        />
        <rect x="88" y="96" width="64" height="18" rx="6" fill="#ff7a66" {...stroke} />
        <path d="M108 80v14M132 80v14" {...stroke} strokeWidth={3} fill="none" />
      </motion.g>
      {/* Венчик */}
      <motion.g {...bob(0.6)} style={{ originX: "200px", originY: "80px", transformBox: "view-box" }}>
        <path d="M206 120 196 92" {...stroke} strokeWidth={6} fill="none" />
        <path d="M196 92c-14-8-16-34-4-40 12-6 26 14 20 32" fill="none" {...stroke} />
        <path d="M196 90c-6-10-4-32 4-34" fill="none" {...stroke} strokeWidth={3} />
      </motion.g>
      {/* Ложка */}
      <motion.g {...bob(1.1)} style={{ originX: "36px", originY: "80px", transformBox: "view-box" }}>
        <path d="M40 122 30 80" {...stroke} strokeWidth={6} fill="none" />
        <ellipse cx="28" cy="66" rx="12" ry="16" fill="#ffc93c" {...stroke} transform="rotate(-14 28 66)" />
      </motion.g>
      {/* Морковка */}
      <motion.g {...bob(0.3)} style={{ originX: "70px", originY: "40px", transformBox: "view-box" }}>
        <path d="M58 28l26 30c-14 6-30-8-26-30Z" fill="#ff9a3d" {...stroke} strokeWidth={3} />
        <path d="M58 28c-4-8 0-12 4-14M58 28c-8-2-12 2-12 6" fill="none" stroke="#3fb36f" strokeWidth={4} strokeLinecap="round" />
      </motion.g>
      {/* Яблоко */}
      <motion.g {...bob(0.9)} style={{ originX: "178px", originY: "30px", transformBox: "view-box" }}>
        <circle cx="176" cy="34" r="13" fill="#ff7a66" {...stroke} strokeWidth={3} />
        <path d="M176 21c0-6 3-9 7-10" fill="none" {...stroke} strokeWidth={3} />
        <path d="M180 18c6-4 10-2 12 0-4 4-8 4-12 0Z" fill="#3fb36f" />
      </motion.g>
      {/* Пар над миской */}
      {[96, 120, 144].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 122c-6-6 6-10 0-16`}
          fill="none"
          stroke="#4fc4b8"
          strokeWidth={4}
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0], y: [4, -4, -10] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

/** Нежные соляные кристаллы. */
export function SaltIllustration({ className = "" }: { className?: string }) {
  const crystal = (pts: string, fill: string, delay: number, key: string) => (
    <motion.polygon
      key={key}
      points={pts}
      fill={fill}
      stroke="#5d4aa8"
      strokeOpacity={0.55}
      strokeWidth={2.5}
      strokeLinejoin="round"
      animate={{ opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 3.5, repeat: Infinity, delay }}
    />
  );
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="salt-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffd9cf" />
        </linearGradient>
        <linearGradient id="salt-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d9cefa" />
        </linearGradient>
        <linearGradient id="salt-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff7e8" />
          <stop offset="100%" stopColor="#ffe3b8" />
        </linearGradient>
        <radialGradient id="salt-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.ellipse
        cx="120"
        cy="120"
        rx="100"
        ry="70"
        fill="url(#salt-glow)"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "120px", originY: "120px", transformBox: "view-box" }}
      />
      <path d="M24 178c30-10 60-12 96-12s68 4 96 12" fill="none" stroke="#5d4aa8" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      {crystal("120,24 146,70 138,170 102,170 94,70", "url(#salt-b)", 0, "c1")}
      <polygon points="120,24 120,170 102,170 94,70" fill="#fff" opacity=".45" />
      {crystal("70,72 90,104 86,172 56,172 50,104", "url(#salt-a)", 0.6, "c2")}
      {crystal("170,62 192,100 188,172 156,172 152,100", "url(#salt-c)", 1.2, "c3")}
      {crystal("36,128 48,146 46,174 28,174 24,146", "url(#salt-b)", 1.8, "c4")}
      {crystal("208,120 220,140 218,174 200,174 196,140", "url(#salt-a)", 2.4, "c5")}
      {[
        [64, 40],
        [190, 34],
        [214, 90],
        [30, 92],
        [150, 30],
      ].map(([x, y], i) => (
        <motion.path
          key={`${x}-${y}`}
          d={`M${x} ${y - 7}q1.5 5.5 7 7q-5.5 1.5-7 7q-1.5-5.5-7-7q5.5-1.5 7-7Z`}
          fill="#c7b8f2"
          animate={{ scale: [0.6, 1.15, 0.6], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.45 }}
          style={{ originX: `${x}px`, originY: `${y}px`, transformBox: "view-box" }}
        />
      ))}
    </svg>
  );
}
