"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Clock } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { useLang } from "@/components/Providers";
import { scrollToSection } from "@/components/layout/Header";
import { Ball, Flower, Ring, Sparkle, Squiggle, Star, Triangle } from "@/components/decor/Shapes";
import { KindergartenIllustration } from "@/components/decor/KindergartenIllustration";
import { ButtonLink } from "@/components/ui/Buttons";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { site, whatsappLink } from "@/lib/site";
import type { HeroImage } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

/** Фото или иллюстрация. Рамка повторяет пропорции файла, поэтому фото не обрезается. */
function HeroPicture({ image, alt, illustrationAlt, sizes }: { image: HeroImage | null; alt: string; illustrationAlt: string; sizes: string }) {
  return image ? (
    <Image src={image.src} alt={alt} fill preload sizes={sizes} quality={80} className="object-cover" />
  ) : (
    <KindergartenIllustration title={illustrationAlt} className="absolute inset-0 size-full" />
  );
}

function TitleWords() {
  const { t } = useLang();
  return (
    <>
      <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
        {t.hero.titleA}
      </motion.span>
      <motion.span
        className="relative inline-block text-coral-deep"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      >
        {t.hero.titleB}
        <motion.svg
          viewBox="0 0 300 20"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-[0.26em] w-full"
        >
          <motion.path
            d="M4 14C60 4 120 4 160 10s100 8 136-4"
            fill="none"
            stroke="#ffc93c"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.span>
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        {t.hero.titleC}
      </motion.span>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Десктоп                                                             */
/* ------------------------------------------------------------------ */

const statStyles = [
  { box: "rounded-[22px_22px_22px_6px] bg-sun", rotate: -3 },
  { box: "rounded-full bg-teal-soft border-2 border-teal/40", rotate: 2 },
  { box: "rounded-[6px_22px_22px_22px] bg-coral-soft", rotate: -2 },
];

/** Пропорции рамки: фото — как у файла, иллюстрация — квадрат. */
const ratioOf = (image: HeroImage | null) => image?.ratio ?? 1;

function DesktopHero({ heroImage }: { heroImage: HeroImage | null }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const yShapes = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const ratio = ratioOf(heroImage);
  const portrait = ratio < 1;

  const onMore = (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection("about");
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto hidden min-h-[min(calc(100svh-var(--header-h)),800px)] max-w-[1240px] grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] items-center gap-10 px-6 py-6 lg:grid xl:gap-14 xl:px-10"
    >
      {/* Левая колонка: текст */}
      <div className="relative z-10 flex flex-col gap-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-3.5 py-1.5 text-[0.82rem] font-extrabold text-ink shadow-soft"
        >
          <Sparkle className="size-3.5" float="spin" color="coral" />
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="text-[clamp(2.1rem,2.3vw+0.85rem,3rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
          <TitleWords />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-[32rem] text-base leading-relaxed text-ink-soft xl:text-[1.05rem]"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center gap-3"
        >
          <ButtonLink href={whatsappLink(t.wa.message)} external icon={<WhatsAppIcon size={20} />}>
            {t.hero.cta}
          </ButtonLink>
          <a
            href="#about"
            onClick={onMore}
            className="group inline-flex min-h-12 items-center gap-2 rounded-full px-3 font-extrabold text-ink underline decoration-sun decoration-[3px] underline-offset-[6px] hover:decoration-coral"
          >
            {t.hero.more}
            <ArrowDown size={18} aria-hidden="true" className="transition-transform group-hover:translate-y-1" />
          </a>
        </motion.div>

        <ul className="mt-1 flex flex-wrap gap-3" aria-label={`${site.groups} · ${site.ages} · ${site.meals}`}>
          {t.hero.stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: statStyles[i].rotate }}
              whileHover={{ rotate: 0, y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.55 + i * 0.1 }}
              className={`flex min-h-[68px] min-w-[108px] flex-col justify-center px-4 py-2.5 shadow-soft ${statStyles[i].box}`}
            >
              <span className="font-display text-[1.45rem] leading-none font-extrabold text-ink">{s.value}</span>
              <span className="mt-1 text-[0.8rem] leading-tight font-bold text-ink/80">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Правая колонка: фото в пропорциях файла */}
      <div className={`relative flex items-center ${portrait ? "justify-end pr-4 xl:justify-center xl:pl-28" : "justify-center"}`}>
        <motion.div
          style={{ y: yPhoto, aspectRatio: ratio }}
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease }}
          className={`relative ${portrait ? "h-[min(580px,calc(100svh-var(--header-h)-84px))] max-w-full" : "w-[92%]"}`}
        >
          {/* Декор вокруг рамки, а не поверх фото */}
          <motion.div style={{ y: yShapes }} className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Ring className="absolute -top-4 -left-5 size-9" color="teal" float="slow" />
            <Star className="absolute -top-5 -right-5 size-9" float="wiggle" />
            <Triangle className="absolute top-[42%] -right-7 size-6" float="float" delay={1} />
            <Flower className="absolute -bottom-4 -left-4 size-8" float="spin" />
          </motion.div>

          <div
            className={`absolute inset-0 translate-x-2.5 translate-y-2.5 bg-teal ${portrait ? "rounded-[999px_999px_32px_32px]" : "rounded-[32px_32px_32px_96px]"}`}
            aria-hidden="true"
          />
          <div
            className={`relative size-full overflow-hidden border-[3px] border-ink bg-teal-soft ${portrait ? "rounded-[999px_999px_32px_32px]" : "rounded-[32px_32px_32px_96px]"}`}
          >
            <HeroPicture image={heroImage} alt={t.hero.photoAlt} illustrationAlt={t.hero.illustrationAlt} sizes="(min-width: 1024px) 360px, 1px" />
          </div>

          {/* Стикер с режимом работы — рядом с фото */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.9 }}
            className={`absolute flex flex-col items-start gap-1.5 rounded-[20px] border-2 border-ink bg-paper px-3.5 py-3 shadow-[0_4px_0_0_rgb(42_44_51/0.85)] ${
              portrait ? "right-[calc(100%+18px)] bottom-[16%]" : "-bottom-5 -left-4"
            }`}
          >
            <span className="grid size-8 place-items-center rounded-full bg-sun">
              <Clock size={16} aria-hidden="true" />
            </span>
            <span className="text-[0.72rem] leading-tight font-bold text-ink-soft">{t.hero.hoursLabel}</span>
            <span className="font-display text-[0.95rem] leading-tight font-bold whitespace-nowrap">{site.hours}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Мобильная версия (своя композиция: фото + колонка фактов)           */
/* ------------------------------------------------------------------ */

const mobileStat = [
  "bg-sun rounded-[18px_18px_18px_6px]",
  "bg-teal-soft border-2 border-teal/40 rounded-[18px]",
  "bg-coral-soft rounded-[6px_18px_18px_18px]",
];

function MobileHero({ heroImage }: { heroImage: HeroImage | null }) {
  const { t } = useLang();
  const ratio = ratioOf(heroImage);
  const portrait = ratio < 1;

  const stats = (
    <ul className={portrait ? "flex flex-col gap-2" : "grid grid-cols-3 gap-2"} aria-label={`${site.groups} · ${site.ages} · ${site.meals}`}>
      {t.hero.stats.map((s, i) => (
        <motion.li
          key={s.label}
          initial={{ opacity: 0, x: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + 0.1 * i, type: "spring", stiffness: 220, damping: 20 }}
          className={`flex flex-col justify-center px-3 py-2 ${portrait ? "min-h-[58px]" : "min-h-[64px] items-center text-center"} ${mobileStat[i]}`}
        >
          <span className="font-display text-[1.2rem] leading-none font-extrabold">{s.value}</span>
          <span className="mt-1 text-[0.72rem] leading-tight font-bold text-ink/80">{s.label}</span>
        </motion.li>
      ))}
    </ul>
  );

  const hours = (
    <div className="flex items-center gap-2 rounded-[18px] border-2 border-ink bg-paper px-2.5 py-2 shadow-[0_3px_0_0_rgb(42_44_51/0.85)] max-[379px]:flex-col max-[379px]:items-start max-[379px]:gap-1">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun">
        <Clock size={14} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[0.66rem] leading-tight font-bold text-ink-soft">{t.hero.hoursLabel}</span>
        <span className="font-display text-[0.78rem] leading-tight font-bold whitespace-nowrap">{site.hours}</span>
      </span>
    </div>
  );

  return (
    <div className="relative mx-auto flex max-w-xl flex-col px-4 pt-3 pb-6 sm:px-6 lg:hidden">
      <Star className="absolute top-2 right-4 size-6" float="wiggle" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink/10 bg-paper px-3 py-1 text-[0.74rem] font-extrabold shadow-soft"
      >
        <Sparkle className="size-3" float="spin" color="coral" />
        {t.hero.eyebrow}
      </motion.p>

      <h1 className="mt-3 pr-7 text-[clamp(1.6rem,7.4vw,2.3rem)] leading-[1.12] font-extrabold tracking-[-0.015em]">
        <TitleWords />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-4">
        <ButtonLink href={whatsappLink(t.wa.message)} external className="w-full" icon={<WhatsAppIcon size={20} />}>
          {t.hero.cta}
        </ButtonLink>
      </motion.div>

      {portrait ? (
        /* Вертикальное фото слева, факты — колонкой справа */
        <div className="mt-6 grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-end gap-3">
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="relative mr-1.5 mb-1.5"
            style={{ aspectRatio: ratio }}
          >
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[999px_999px_22px_22px] bg-teal" aria-hidden="true" />
            <div className="relative size-full overflow-hidden rounded-[999px_999px_22px_22px] border-[3px] border-ink bg-teal-soft">
              <HeroPicture image={heroImage} alt={t.hero.photoAlt} illustrationAlt={t.hero.illustrationAlt} sizes="(max-width: 1023px) 55vw, 1px" />
            </div>
          </motion.div>
          <div className="relative flex flex-col gap-2 pb-1.5">
            <Ball className="mb-1 ml-2 size-4" color="coral" float="slow" />
            {stats}
            {hours}
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="relative mt-6 mr-1.5"
          >
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[26px_26px_26px_70px] bg-teal" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[26px_26px_26px_70px] border-[3px] border-ink bg-teal-soft" style={{ aspectRatio: ratio }}>
              <HeroPicture image={heroImage} alt={t.hero.photoAlt} illustrationAlt={t.hero.illustrationAlt} sizes="(max-width: 1023px) 92vw, 1px" />
            </div>
            <Squiggle className="absolute -bottom-3 right-5 w-12" color="coral" float="slow" />
          </motion.div>
          <div className="mt-5 flex flex-col gap-2">
            {stats}
            {hours}
          </div>
        </>
      )}
    </div>
  );
}

export function Hero({ heroImage }: { heroImage: HeroImage | null }) {
  return (
    <section aria-label="KAISAR KK" className="relative pt-(--header-h)">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <DesktopHero heroImage={heroImage} />
      <MobileHero heroImage={heroImage} />
    </section>
  );
}
