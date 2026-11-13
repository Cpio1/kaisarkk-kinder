"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "coral" | "teal" | "sun" | "ink" | "paper" | "insta";

const variants: Record<Variant, string> = {
  coral: "bg-coral-deep text-white",
  teal: "bg-teal-deep text-white",
  sun: "bg-sun text-ink",
  ink: "bg-ink text-white",
  paper: "bg-paper text-ink border-2 border-ink/10",
  insta: "text-white bg-[linear-gradient(120deg,#7a3fd6_0%,#c2337a_55%,#c9402b_100%)]",
};

type Props = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
  ariaLabel?: string;
  onClick?: () => void;
};

/** Кнопка-ссылка с «пружинным» hover-эффектом и анимированной иконкой. */
export function ButtonLink({
  href,
  children,
  icon,
  variant = "coral",
  external,
  className = "",
  size = "md",
  ariaLabel,
  onClick,
}: Props) {
  const sizing = size === "lg" ? "min-h-14 px-6 text-base sm:text-[1.05rem]" : "min-h-12 px-5 text-[0.95rem]";
  return (
    <motion.a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold shadow-[0_5px_0_0_rgb(42_44_51/0.85)] transition-shadow hover:shadow-[0_8px_0_0_rgb(42_44_51/0.85)] active:shadow-[0_2px_0_0_rgb(42_44_51/0.85)] ${sizing} ${variants[variant]} ${className}`}
    >
      {icon ? (
        <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </motion.a>
  );
}
