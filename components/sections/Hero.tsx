"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Clock } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { useLang } from "@/components/Providers";
import { scrollToSection } from "@/components/layout/Header";
import { Ball, Cloud, Flower, Ring, Sparkle, Squiggle, Star, Triangle } from "@/components/decor/Shapes";
import { KindergartenIllustration } from "@/components/decor/KindergartenIllustration";
import { ButtonLink } from "@/components/ui/Buttons";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { site, whatsappLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const HERO_SIZES = "(min-width: 1024px) 44vw, 92vw";

/** Фото или иллюстрация внутри фигурной рамки. */
function HeroPicture({ src, alt, illustrationAlt }: { src: string | null; alt: string; illustrationAlt: string }) {
  return src ? (
    <Image src={src} alt={alt} fill preload sizes={HERO_SIZES} quality={80} className="object-cover" />
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
          className="absolute -bottom-1 left-0 h-[0.28em] w-full lg:-bottom-2"
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
  { box: "rounded-[28px_28px_28px_8px] bg-sun", rotate: -3 },
  { box: "rounded-full bg-teal-soft border-2 border-teal/40", rotate: 2 },
  { box: "rounded-[8px_28px_28px_28px] bg-coral-soft", rotate: -2 },
];

function DesktopHero({ heroImage }: { heroImage: string | null }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const yShapes = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);

  const onMore = (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection("about");
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto hidden min-h-[calc(100svh-var(--header-h))] max-w-[1320px] grid-cols-[1.08fr_1fr] items-center gap-10 px-6 pt-4 pb-10 lg:grid xl:gap-16 xl:px-10 [@media(min-height:1000px)]:min-h-[860px]"
    >
      {/* Левая колонка: текст */}
      <div className="relative z-10 flex flex-col gap-6 xl:gap-7">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-4 py-2 text-sm font-extrabold text-ink shadow-soft"
        >
          <Sparkle className="size-4" float="spin" color="coral" />
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="text-[clamp(2.4rem,3.5vw+0.4rem,4.1rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
          <TitleWords />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-[34rem] text-[1.075rem] leading-relaxed text-ink-soft xl:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center gap-4"
        >
          <ButtonLink href={whatsappLink(t.wa.message)} external size="lg" icon={<WhatsAppIcon size={22} />}>
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

        <ul className="mt-1 flex flex-wrap gap-4" aria-label={`${site.groups} · ${site.ages} · ${site.meals}`}>
          {t.hero.stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: statStyles[i].rotate }}
              whileHover={{ rotate: 0, y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.55 + i * 0.1 }}
              className={`flex min-h-[86px] min-w-[132px] flex-col justify-center px-5 py-3 shadow-soft ${statStyles[i].box}`}
            >
              <span className="font-display text-[1.9rem] leading-none font-extrabold text-ink">{s.value}</span>
              <span className="mt-1 text-sm leading-tight font-bold text-ink/80">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Правая колонка: фото */}
      <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[min(560px,calc((100svh-var(--header-h))*0.78))]">
        <motion.div style={{ y: yShapes }} className="absolute inset-0">
          <Ring className="absolute -top-2 left-[6%] size-16" color="teal" float="slow" />
          <Star className="absolute top-[4%] right-[2%] size-14" float="wiggle" />
          <Flower className="absolute bottom-[10%] -left-1 size-14" float="spin" />
          <Triangle className="absolute right-0 bottom-[22%] size-11" float="float" delay={1} />
          <Cloud className="absolute top-[38%] -left-4 w-20" float="slow" delay={2} />
        </motion.div>

        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease }}
          className="absolute inset-[7%]"
        >
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[46%_54%_42%_58%/52%_44%_56%_48%] bg-teal" aria-hidden="true" />
          <div className="relative size-full overflow-hidden rounded-[46%_54%_42%_58%/52%_44%_56%_48%] border-4 border-ink bg-teal-soft">
            <HeroPicture src={heroImage} alt={t.hero.photoAlt} illustrationAlt={t.hero.illustrationAlt} />
          </div>
        </motion.div>

        {/* Стикер с режимом работы */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 6 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.9 }}
          className="absolute right-[1%] bottom-[3%] flex items-center gap-3 rounded-[22px] border-2 border-ink bg-paper px-4 py-3 shadow-[0_5px_0_0_rgb(42_44_51/0.85)]"
        >
          <span className="grid size-10 place-items-center rounded-full bg-sun">
            <Clock size={20} aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="text-xs font-bold text-ink-soft">{t.hero.hoursLabel}</span>
            <span className="font-display text-lg leading-tight font-bold">{site.hours}</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Мобильная версия                                                    */
/* ------------------------------------------------------------------ */

const mobileStat = [
  "bg-sun rounded-[22px_22px_22px_6px]",
  "bg-teal-soft border-2 border-teal/40 rounded-[22px]",
  "bg-coral-soft rounded-[6px_22px_22px_22px]",
];

function MobileHero({ heroImage }: { heroImage: string | null }) {
  const { t } = useLang();
  return (
    <div className="relative mx-auto flex max-w-xl flex-col px-4 pt-3 pb-8 sm:px-6 lg:hidden">
      {/* Мелкие фигурки — внутри безопасных отступов */}
      <Star className="absolute top-2 right-5 size-8" float="wiggle" />
      <Ball className="absolute top-[30%] right-3 size-5" color="coral" float="slow" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-3 py-1.5 text-[0.8rem] font-extrabold shadow-soft"
      >
        <Sparkle className="size-3.5" float="spin" color="coral" />
        {t.hero.eyebrow}
      </motion.p>

      <h1 className="mt-4 pr-6 text-[clamp(1.9rem,8.4vw,2.6rem)] leading-[1.12] font-extrabold tracking-[-0.015em]">
        <TitleWords />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-[1rem] leading-relaxed text-ink-soft"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-5"
      >
        <ButtonLink href={whatsappLink(t.wa.message)} external size="lg" className="w-full" icon={<WhatsAppIcon size={22} />}>
          {t.hero.cta}
        </ButtonLink>
      </motion.div>

      {/* Фото-карточка со стикерами */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease }}
        className="relative mt-8"
      >
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[36px_36px_36px_90px] bg-teal" aria-hidden="true" />
        <div className="relative aspect-[4/3.4] overflow-hidden rounded-[36px_36px_36px_90px] border-[3px] border-ink bg-teal-soft">
          <HeroPicture src={heroImage} alt={t.hero.photoAlt} illustrationAlt={t.hero.illustrationAlt} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.8 }}
          className="absolute top-3 left-3 flex items-center gap-2 rounded-full border-2 border-ink bg-paper py-1.5 pr-3.5 pl-1.5 shadow-[0_3px_0_0_rgb(42_44_51/0.85)]"
        >
          <span className="grid size-7 place-items-center rounded-full bg-sun">
            <Clock size={15} aria-hidden="true" />
          </span>
          <span className="font-display text-sm font-bold">{site.hours}</span>
        </motion.div>
        <Squiggle className="absolute -bottom-5 right-6 w-20" color="coral" float="slow" />
      </motion.div>

      <ul className="mt-9 grid grid-cols-3 gap-2.5">
        {t.hero.stats.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, type: "spring", stiffness: 220, damping: 20 }}
            className={`flex min-h-[88px] flex-col items-center justify-center px-1.5 py-3 text-center ${mobileStat[i]}`}
          >
            <span className="font-display text-[1.45rem] leading-none font-extrabold">{s.value}</span>
            <span className="mt-1.5 text-[0.78rem] leading-tight font-bold text-ink/80">{s.label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Hero({ heroImage }: { heroImage: string | null }) {
  return (
    <section aria-label="KAISAR KK" className="relative pt-(--header-h)">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <DesktopHero heroImage={heroImage} />
      <MobileHero heroImage={heroImage} />
    </section>
  );
}
