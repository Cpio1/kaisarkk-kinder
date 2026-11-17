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

/**
 * Формат рамки главного фото.
 * Горизонтальное фото и иллюстрация показываются в своих пропорциях.
 * Вертикальное фото (телефонный кадр 9:16) было бы слишком длинным, поэтому
 * кладём его в более широкую рамку: квадрат на десктопе, 4:3 на мобильном.
 * Ширина кадра сохраняется целиком, срезаются только края неба и площадки.
 * HERO_FOCUS — какая часть фото по вертикали остаётся в кадре (здание с вывеской).
 */
const HERO_FRAME = { desktop: 1, mobile: 4 / 3 };
const HERO_FOCUS = "50% 48%";

function frameOf(image: HeroImage | null, target: number) {
  if (!image) return { ratio: 1, cropped: false };
  return image.ratio < 1 ? { ratio: target, cropped: true } : { ratio: image.ratio, cropped: false };
}

/** Фото или иллюстрация. */
function HeroPicture({
  image,
  alt,
  illustrationAlt,
  sizes,
  cropped,
}: {
  image: HeroImage | null;
  alt: string;
  illustrationAlt: string;
  sizes: string;
  cropped: boolean;
}) {
  return image ? (
    <Image
      src={image.src}
      alt={alt}
      fill
      preload
      sizes={sizes}
      quality={80}
      className="object-cover"
      style={cropped ? { objectPosition: HERO_FOCUS } : undefined}
    />
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

function DesktopHero({ heroImage }: { heroImage: HeroImage | null }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const yShapes = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const { ratio, cropped } = frameOf(heroImage, HERO_FRAME.desktop);
  // Обрезанное фото — компактная арка; иллюстрация и горизонтальное фото — «листик».
  const shape = cropped ? "rounded-[120px_120px_28px_28px]" : "rounded-[32px_32px_32px_96px]";

  const onMore = (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection("about");
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto hidden min-h-[min(calc(100svh-var(--header-h)),640px)] max-w-[1160px] grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] items-center gap-8 px-6 py-5 lg:grid xl:gap-10 xl:px-10"
    >
      {/* Левая колонка: текст */}
      <div className="relative z-10 flex flex-col gap-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink/10 bg-paper px-3 py-1 text-[0.76rem] font-extrabold text-ink shadow-soft"
        >
          <Sparkle className="size-3.5" float="spin" color="coral" />
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="text-[clamp(1.75rem,1.7vw+0.8rem,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
          <TitleWords />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-[30rem] text-[0.94rem] leading-relaxed text-ink-soft xl:text-[0.98rem]"
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
              className={`flex min-h-[54px] min-w-[88px] flex-col justify-center px-3.5 py-2 shadow-soft ${statStyles[i].box}`}
            >
              <span className="font-display text-[1.15rem] leading-none font-extrabold text-ink">{s.value}</span>
              <span className="mt-1 text-[0.72rem] leading-tight font-bold text-ink/80">{s.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Правая колонка: фото */}
      <div className="relative flex items-center justify-center">
        <motion.div
          style={{ y: yPhoto, aspectRatio: ratio }}
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease }}
          className="relative w-[min(80%,calc(100svh-var(--header-h)-130px))] max-w-[400px]"
        >
          {/* Декор вокруг рамки, а не поверх фото */}
          <motion.div style={{ y: yShapes }} className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Ring className="absolute -top-3 -left-4 size-7" color="teal" float="slow" />
            <Star className="absolute -top-4 -right-4 size-7" float="wiggle" />
            <Triangle className="absolute top-[42%] -right-6 size-5" float="float" delay={1} />
            <Flower className="absolute -bottom-3 -left-3 size-6" float="spin" />
          </motion.div>

          <div className={`absolute inset-0 translate-x-2.5 translate-y-2.5 bg-teal ${shape}`} aria-hidden="true" />
          <div className={`relative size-full overflow-hidden border-[3px] border-ink bg-teal-soft ${shape}`}>
            <HeroPicture
              image={heroImage}
              alt={t.hero.photoAlt}
              illustrationAlt={t.hero.illustrationAlt}
              sizes="(min-width: 1024px) 400px, 1px"
              cropped={cropped}
            />
          </div>

          {/* Стикер с режимом работы — рядом с фото */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.9 }}
            className="absolute -bottom-5 -left-8 flex flex-col items-start gap-1 rounded-[18px] border-2 border-ink bg-paper px-3 py-2.5 shadow-[0_4px_0_0_rgb(42_44_51/0.85)]"
          >
            <span className="grid size-7 place-items-center rounded-full bg-sun">
              <Clock size={14} aria-hidden="true" />
            </span>
            <span className="text-[0.72rem] leading-tight font-bold text-ink-soft">{t.hero.hoursLabel}</span>
            <span className="font-display text-[0.86rem] leading-tight font-bold whitespace-nowrap">{site.hours}</span>
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
  const { ratio, cropped } = frameOf(heroImage, HERO_FRAME.mobile);

  const stats = (
    <ul className="grid grid-cols-3 gap-2" aria-label={`${site.groups} · ${site.ages} · ${site.meals}`}>
      {t.hero.stats.map((s, i) => (
        <motion.li
          key={s.label}
          initial={{ opacity: 0, x: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + 0.1 * i, type: "spring", stiffness: 220, damping: 20 }}
          className={`flex min-h-[54px] flex-col items-center justify-center px-2 py-2 text-center ${mobileStat[i]}`}
        >
          <span className="font-display text-[1.05rem] leading-none font-extrabold">{s.value}</span>
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
    <div className="relative mx-auto flex max-w-xl flex-col px-4 pt-2 pb-5 sm:px-6 lg:hidden">
      <Star className="absolute top-2 right-4 size-5" float="wiggle" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink/10 bg-paper px-3 py-1 text-[0.74rem] font-extrabold shadow-soft"
      >
        <Sparkle className="size-3" float="spin" color="coral" />
        {t.hero.eyebrow}
      </motion.p>

      <h1 className="mt-2.5 pr-6 text-[clamp(1.4rem,6.4vw,1.95rem)] leading-[1.12] font-extrabold tracking-[-0.015em]">
        <TitleWords />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-soft"
      >
        {t.hero.subtitle}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-3.5">
        <ButtonLink href={whatsappLink(t.wa.message)} external className="w-full" icon={<WhatsAppIcon size={20} />}>
          {t.hero.cta}
        </ButtonLink>
      </motion.div>

      {/* Широкое фото с мягкими углами, факты — строкой под ним */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease }}
        className="relative mt-5 mr-1.5"
      >
        <Ball className="absolute -top-2.5 -left-1.5 z-10 size-4" color="coral" float="slow" />
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[26px_26px_26px_70px] bg-teal" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[26px_26px_26px_70px] border-[3px] border-ink bg-teal-soft" style={{ aspectRatio: ratio }}>
          <HeroPicture
            image={heroImage}
            alt={t.hero.photoAlt}
            illustrationAlt={t.hero.illustrationAlt}
            sizes="(max-width: 1023px) 92vw, 1px"
            cropped={cropped}
          />
        </div>
        <Squiggle className="absolute right-5 -bottom-3 w-12" color="coral" float="slow" />
      </motion.div>
      <div className="mt-4 flex flex-col gap-2">
        {stats}
        {hours}
      </div>
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
