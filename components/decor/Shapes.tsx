"use client";

import { useId, type CSSProperties } from "react";

/**
 * Мягкие «объёмные» декоративные фигурки (SVG).
 * Все фигурки декоративные (aria-hidden) и не перехватывают клики.
 * Размер задаётся через className (w-*, h-*), позиция — родителем.
 */
type ShapeProps = {
  className?: string;
  color?: Tone;
  float?: "none" | "float" | "slow" | "spin" | "wiggle";
  delay?: number;
  style?: CSSProperties;
};

export type Tone = "sun" | "teal" | "coral" | "lilac" | "cream";

const TONES: Record<Tone, [string, string, string]> = {
  // [highlight, base, shade]
  sun: ["#fff1b8", "#ffc93c", "#f0a81a"],
  teal: ["#c9f3ee", "#4fc4b8", "#2f9d92"],
  coral: ["#ffd5cc", "#ff7a66", "#e85a45"],
  lilac: ["#f1ecff", "#c7b8f2", "#a08ce0"],
  cream: ["#ffffff", "#fff3dc", "#f3dcb4"],
};

const anim: Record<NonNullable<ShapeProps["float"]>, string> = {
  none: "",
  float: "animate-float",
  slow: "animate-float-slow",
  spin: "animate-spin-slow",
  wiggle: "animate-wiggle",
};

function wrap({ className = "", float = "float", delay = 0, style }: ShapeProps) {
  return {
    className: `pointer-events-none select-none ${anim[float]} ${className}`,
    style: { animationDelay: `${delay}s`, ...style },
    "aria-hidden": true as const,
    focusable: "false" as const,
  };
}

function Grad({ id, tone }: { id: string; tone: Tone }) {
  const [hi, base, shade] = TONES[tone];
  return (
    <radialGradient id={id} cx="35%" cy="30%" r="75%">
      <stop offset="0%" stopColor={hi} />
      <stop offset="45%" stopColor={base} />
      <stop offset="100%" stopColor={shade} />
    </radialGradient>
  );
}

export function Star(p: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <defs>
        <Grad id={id} tone={p.color ?? "sun"} />
      </defs>
      <path
        d="M50 6c3.6 0 6 9.5 9.6 19.4 2 5.3 3.6 6.6 9.3 6.9 10.4.6 21.6 1.2 22.7 4.6 1.1 3.4-7.6 10.4-15.7 17-4.4 3.6-5 5.6-3.5 11 2.7 10.1 5.6 20.9 2.7 23-2.9 2.1-12.3-4-21-9.8-4.7-3.1-6.8-3.1-11.5 0-8.7 5.8-18.1 11.9-21 9.8-2.9-2.1 0-12.9 2.7-23 1.5-5.4.9-7.4-3.5-11C13.7 47.3 5 40.3 6.1 36.9c1.1-3.4 12.3-4 22.7-4.6 5.7-.3 7.3-1.6 9.3-6.9C41.6 15.5 46.4 6 50 6Z"
        fill={`url(#${id})`}
      />
      <ellipse cx="38" cy="34" rx="7" ry="4" fill="#fff" opacity=".55" transform="rotate(-30 38 34)" />
    </svg>
  );
}

export function Sparkle(p: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <defs>
        <Grad id={id} tone={p.color ?? "teal"} />
      </defs>
      <path d="M50 4c4 26 20 42 46 46-26 4-42 20-46 46-4-26-20-42-46-46C30 46 46 30 50 4Z" fill={`url(#${id})`} />
    </svg>
  );
}

export function Cloud(p: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 72" {...wrap(p)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={p.color ? TONES[p.color][0] : "#e9f6f4"} />
        </linearGradient>
      </defs>
      <path
        d="M30 68C14 68 4 59 4 47c0-11 8-19 19-20 2-14 14-23 27-23 11 0 21 6 25 16 3-1 6-2 9-2 14 0 24 10 24 22v1c7 2 12 8 12 15 0 7-6 12-14 12H30Z"
        fill={`url(#${id})`}
        stroke="#2a2c33"
        strokeOpacity=".08"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Flower(p: ShapeProps) {
  const id = useId();
  const tone = p.color ?? "coral";
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <defs>
        <Grad id={id} tone={tone} />
      </defs>
      <g fill={`url(#${id})`}>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="50" cy="26" rx="17" ry="22" transform={`rotate(${r} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="13" fill="#ffc93c" />
      <circle cx="46" cy="46" r="4" fill="#fff" opacity=".6" />
    </svg>
  );
}

export function Ball(p: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <defs>
        <Grad id={id} tone={p.color ?? "teal"} />
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${id})`} />
      <ellipse cx="36" cy="30" rx="12" ry="7" fill="#fff" opacity=".5" transform="rotate(-25 36 30)" />
    </svg>
  );
}

export function Ring(p: ShapeProps) {
  const [, base] = TONES[p.color ?? "coral"];
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <circle cx="50" cy="50" r="36" fill="none" stroke={base} strokeWidth="16" />
      <path d="M26 30a34 34 0 0 1 20-14" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Squiggle(p: ShapeProps) {
  const [, base] = TONES[p.color ?? "teal"];
  return (
    <svg viewBox="0 0 140 40" {...wrap(p)}>
      <path
        d="M6 22c10-14 20-14 30 0s20 14 30 0 20-14 30 0 20 14 30 0"
        fill="none"
        stroke={base}
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arch(p: ShapeProps) {
  return (
    <svg viewBox="0 0 120 64" {...wrap(p)}>
      <path d="M8 60a52 52 0 0 1 104 0" fill="none" stroke="#ff7a66" strokeWidth="12" strokeLinecap="round" />
      <path d="M24 60a36 36 0 0 1 72 0" fill="none" stroke="#ffc93c" strokeWidth="12" strokeLinecap="round" />
      <path d="M40 60a20 20 0 0 1 40 0" fill="none" stroke="#4fc4b8" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

export function Triangle(p: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <defs>
        <Grad id={id} tone={p.color ?? "lilac"} />
      </defs>
      <path
        d="M43 12c3.4-5.6 10.6-5.6 14 0l34.6 58c3.4 5.7-.4 12-7 12H15.4c-6.6 0-10.4-6.3-7-12L43 12Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

export function Heart(p: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" {...wrap(p)}>
      <defs>
        <Grad id={id} tone={p.color ?? "coral"} />
      </defs>
      <path
        d="M50 88S8 62 8 34c0-13 10-24 23-24 8 0 15 4 19 11 4-7 11-11 19-11 13 0 23 11 23 24 0 28-42 54-42 54Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

/** Мягкая волна-разделитель между секциями. */
export function WaveDivider({ className = "", fill = "var(--color-paper)", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-6 w-full lg:h-10 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 40c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v40H0Z" fill={fill} />
    </svg>
  );
}
