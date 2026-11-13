"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useLang } from "@/components/Providers";
import { Flower, Heart, Sparkle, Star } from "@/components/decor/Shapes";
import { mealIcons } from "@/components/decor/MealIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const stopLook = [
  { bg: "bg-sun-soft", ring: "bg-sun", shape: "rounded-full" },
  { bg: "bg-teal-soft", ring: "bg-teal", shape: "rounded-[38%_62%_55%_45%/50%_42%_58%_50%]" },
  { bg: "bg-coral-soft", ring: "bg-coral", shape: "rounded-[34px]" },
  { bg: "bg-lilac-soft", ring: "bg-lilac", shape: "rounded-[50%_50%_50%_12px]" },
];

function useDrawProgress<T extends HTMLElement>(offset: ["start end" | "start 80%", "end 60%" | "end end" | "center center"]) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return { ref, progress };
}

function DesktopTimeline() {
  const { lang, t } = useLang();
  const n = t.nutrition;
  const { ref, progress } = useDrawProgress<HTMLDivElement>(["start 80%", "center center"]);
  const dash = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative mt-16 hidden lg:block">
      {/* Волнистая «дорожка дня» */}
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-0 top-[64px] h-[120px] w-full" aria-hidden="true">
        <path d="M30 60C180 -10 300 130 450 60S750 -10 900 60s220 70 270 0" fill="none" stroke="#2a2c33" strokeOpacity=".1" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          d="M30 60C180 -10 300 130 450 60S750 -10 900 60s220 70 270 0"
          fill="none"
          stroke="#ffc93c"
          strokeWidth="10"
          strokeLinecap="round"
          style={{ pathLength: dash }}
        />
      </svg>
      <ol className="relative grid grid-cols-4 gap-6 xl:gap-8">
        {n.steps.map((step, i) => {
          const Icon = mealIcons[i];
          const look = stopLook[i];
          return (
            <Reveal as="li" key={step.name} delay={0.12 * i} y={40} className={`flex flex-col items-center text-center ${i % 2 ? "pt-10" : ""}`}>
              <motion.div
                whileHover={{ scale: 1.08, rotate: i % 2 ? 6 : -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`relative grid size-[150px] place-items-center border-[3px] border-ink shadow-[0_6px_0_0_rgb(42_44_51/0.85)] ${look.bg} ${look.shape}`}
              >
                <Icon className="size-[92px]" />
                <span className={`absolute -top-3 -right-2 grid size-11 place-items-center rounded-full border-[3px] border-ink font-display text-base font-extrabold ${look.ring}`}>
                  {i + 1}
                </span>
              </motion.div>
              <h3 className="mt-7 text-xl leading-tight font-bold">{step.name}</h3>
              {lang === "ru" ? (
                <p lang="kk" className="mt-1 text-sm font-bold text-teal-deep">
                  {step.alt}
                </p>
              ) : null}
              <p className="mt-2 max-w-[16rem] leading-snug text-ink-soft">{step.text}</p>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

function MobileTimeline() {
  const { lang, t } = useLang();
  const n = t.nutrition;
  const { ref, progress } = useDrawProgress<HTMLOListElement>(["start 80%", "end 60%"]);
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <ol ref={ref} className="relative mt-10 flex flex-col gap-5 lg:hidden">
      {/* Вертикальная линия, «рисуется» при прокрутке */}
      <span className="absolute top-6 bottom-6 left-[38px] w-1.5 rounded-full bg-ink/10" aria-hidden="true" />
      <motion.span style={{ scaleY }} className="absolute top-6 bottom-6 left-[38px] w-1.5 origin-top rounded-full bg-sun" aria-hidden="true" />
      {n.steps.map((step, i) => {
        const Icon = mealIcons[i];
        const look = stopLook[i];
        return (
          <Reveal as="li" key={step.name} y={24} delay={0.05}>
            <div className="relative flex items-center gap-4">
              <span className={`relative z-10 grid size-[82px] shrink-0 place-items-center border-[3px] border-ink ${look.bg} ${look.shape}`}>
                <Icon className="size-[54px]" />
                <span className={`absolute -top-2 -right-2 grid size-8 place-items-center rounded-full border-[2.5px] border-ink font-display text-sm font-extrabold ${look.ring}`}>
                  {i + 1}
                </span>
              </span>
              <div className={`flex-1 rounded-[24px] border-2 border-ink/10 p-4 ${i % 2 ? "bg-paper" : "bg-cream"}`}>
                <h3 className="text-[1.05rem] leading-tight font-bold">{step.name}</h3>
                {lang === "ru" ? (
                  <p lang="kk" className="mt-0.5 text-[0.8rem] font-bold text-teal-deep">
                    {step.alt}
                  </p>
                ) : null}
                <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-soft">{step.text}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

export function Nutrition() {
  const { t } = useLang();
  const n = t.nutrition;
  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="relative bg-paper py-16 lg:py-28">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        <Flower className="absolute top-0 left-4 size-9 lg:left-10 lg:size-12" float="spin" color="teal" />
        <Heart className="absolute top-2 right-6 size-8 lg:right-14 lg:size-10" float="float" />
        <SectionHeading id="nutrition-title" eyebrow={n.eyebrow} title={n.title} subtitle={n.subtitle} align="center" tone="sun" />

        <div className="relative mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border-2 border-ink bg-sun px-5 py-2.5 shadow-[0_4px_0_0_rgb(42_44_51/0.85)]">
          <Star className="size-6" float="spin" color="coral" />
          <span className="font-display text-xl font-extrabold">4</span>
          <span className="font-bold">{n.stepLabel}</span>
          <Sparkle className="size-5" float="wiggle" color="teal" />
        </div>

        <DesktopTimeline />
        <MobileTimeline />
      </div>
    </section>
  );
}
