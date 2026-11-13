"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "left" | "center";
  tone?: "coral" | "teal" | "sun" | "lilac";
  aside?: ReactNode;
};

const toneDot = {
  coral: "bg-coral",
  teal: "bg-teal",
  sun: "bg-sun",
  lilac: "bg-lilac",
};

export function SectionHeading({ eyebrow, title, subtitle, id, align = "left", tone = "coral", aside }: Props) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-3.5 py-1.5 text-xs font-extrabold tracking-[0.12em] text-ink uppercase shadow-soft sm:text-sm"
      >
        <span className={`size-2.5 rounded-full ${toneDot[tone]}`} aria-hidden="true" />
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={`max-w-3xl text-[1.6rem] leading-[1.15] font-bold tracking-[-0.01em] text-ink sm:text-4xl lg:text-[2.75rem] ${center ? "mx-auto" : ""}`}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={`max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg ${center ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      ) : null}
      {aside}
    </div>
  );
}
