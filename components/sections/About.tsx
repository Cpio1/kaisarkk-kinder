"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Languages, MessageCircleQuestion, Puzzle, Sparkles, Utensils } from "lucide-react";
import { useLang } from "@/components/Providers";
import { Arch, Ball, Flower, Heart, Sparkle, Star, Triangle } from "@/components/decor/Shapes";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Buttons";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/site";
import type { Photo } from "@/lib/media";

const featureIcons = [Languages, Puzzle, Sparkles, Utensils];
const featureLook = [
  { card: "bg-paper rounded-[32px_32px_32px_10px]", icon: "bg-teal-soft text-teal-deep rounded-2xl" },
  { card: "bg-sun-soft rounded-[10px_32px_32px_32px]", icon: "bg-paper text-sun-deep rounded-full" },
  { card: "bg-coral-soft rounded-[32px_10px_32px_32px]", icon: "bg-paper text-coral-deep rounded-[14px_14px_14px_4px]" },
  { card: "bg-teal-soft rounded-[32px_32px_10px_32px]", icon: "bg-paper text-teal-deep rounded-full" },
];

function FeatureCard({ i, title, text, className = "" }: { i: number; title: string; text: string; className?: string }) {
  const Icon = featureIcons[i];
  const look = featureLook[i];
  return (
    <motion.div
      whileHover={{ y: -5, rotate: i % 2 ? 1 : -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex h-full gap-3.5 border-2 border-ink/10 p-4 shadow-soft lg:flex-col lg:gap-0 lg:p-5 ${look.card} ${className}`}
    >
      <span className={`grid size-10 shrink-0 place-items-center transition-transform duration-500 group-hover:rotate-[360deg] lg:size-11 ${look.icon}`}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <h3 className="text-[0.98rem] leading-snug font-bold lg:mt-3.5 lg:text-[1.02rem]">{title}</h3>
        <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft lg:mt-1.5 lg:text-[0.95rem]">{text}</p>
      </div>
    </motion.div>
  );
}

/** Фото в рамке с пропорциями файла — без обрезки. */
function PhotoFrame({ photo, alt, className, sizes }: { photo: Photo; alt: string; className: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden border-[3px] border-ink bg-teal-soft ${className}`} style={{ aspectRatio: photo.ratio }}>
      <Image src={photo.src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/* ---------------- Блок «Біз туралы» ---------------- */

function AboutBlock({ photos }: { photos: Photo[] }) {
  const { lang, t } = useLang();
  const a = t.about;
  const altOf = (p: Photo) => p.alt?.[lang] ?? t.hero.photoAlt;
  return (
    <div className="relative">
      {/* Десктоп: текст + фото + цитата слева, карточки справа */}
      <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-start gap-12 lg:grid xl:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} tone="coral" />
          <Reveal delay={0.1}>
            <p className="text-[1.02rem] leading-relaxed text-ink-soft">{a.lead}</p>
          </Reveal>
          {photos.length > 0 ? (
            <Reveal delay={0.15} className="relative grid grid-cols-2 items-start gap-4 pr-2">
              <PhotoFrame photo={photos[0]} alt={altOf(photos[0])} sizes="(min-width: 1024px) 300px, 1px" className="rounded-[22px_22px_22px_64px]" />
              {photos[1] ? (
                <PhotoFrame photo={photos[1]} alt={altOf(photos[1])} sizes="(min-width: 1024px) 300px, 1px" className="mt-8 rounded-[64px_22px_22px_22px]" />
              ) : null}
              <Star className="absolute -top-3 left-[47%] size-6" float="wiggle" />
            </Reveal>
          ) : null}
        </div>

        <div className="relative flex flex-col gap-4 pt-10">
          <Arch className="absolute -top-1 right-6 w-14" float="slow" />
          <ul className="grid grid-cols-2 gap-4">
            {a.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={0.08 * i} className={i % 2 === 1 ? "translate-y-5" : ""}>
                <FeatureCard i={i} title={f.title} text={f.text} />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-6">
            <figure className="relative rounded-[28px_28px_28px_8px] bg-ink p-6 pr-14 text-white shadow-lift">
              <Heart className="absolute top-5 right-5 size-6" float="float" />
              <blockquote className="font-display text-[1.05rem] leading-snug font-semibold">«{a.quote}»</blockquote>
              <figcaption className="mt-2 text-sm font-bold text-sun">KAISAR KK</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* Мобильная версия: вертикальная история */}
      <div className="flex flex-col gap-5 lg:hidden">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} tone="coral" />
        <Reveal>
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">{a.lead}</p>
        </Reveal>
        {photos.length > 0 ? (
          <Reveal className="relative mr-1">
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[22px_22px_22px_56px] bg-coral" aria-hidden="true" />
            <PhotoFrame photo={photos[0]} alt={altOf(photos[0])} sizes="(max-width: 1023px) 92vw, 1px" className="rounded-[22px_22px_22px_56px]" />
          </Reveal>
        ) : null}
        <ul className="grid gap-3 sm:grid-cols-2">
          {a.features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={0.05 * i} y={16}>
              <FeatureCard i={i} title={f.title} text={f.text} />
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <figure className="relative rounded-[24px_24px_24px_8px] bg-ink p-5 pr-12 text-white">
            <Heart className="absolute top-4 right-4 size-5" float="float" />
            <blockquote className="font-display text-[0.95rem] leading-snug font-semibold">«{a.quote}»</blockquote>
            <figcaption className="mt-2 text-sm font-bold text-sun">KAISAR KK</figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------------- Блок «Топтар» ---------------- */

const stageLook = [
  { bg: "bg-sun", size: "lg:size-[96px] xl:size-[104px]", shape: "rounded-full" },
  { bg: "bg-coral", size: "lg:size-[108px] xl:size-[118px]", shape: "rounded-[38%_62%_55%_45%/50%_42%_58%_50%]" },
  { bg: "bg-lilac", size: "lg:size-[120px] xl:size-[132px]", shape: "rounded-[24px]" },
];

function GroupsBlock() {
  const { t } = useLang();
  const g = t.about.groups;
  return (
    <div className="relative mt-12 lg:mt-16">
      <div className="relative rounded-[28px] border-2 border-ink/10 bg-teal-soft px-4 py-7 sm:px-7 lg:rounded-[44px_44px_44px_100px] lg:px-12 lg:py-11 xl:px-14">
        <div className="bg-dots pointer-events-none absolute inset-0 rounded-[inherit] opacity-70" aria-hidden="true" />
        <Flower className="absolute top-4 right-4 size-6 lg:top-6 lg:right-8 lg:size-9" float="spin" color="coral" />
        <Triangle className="absolute bottom-5 left-5 hidden size-7 lg:block" float="float" color="sun" />

        <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} tone="teal" />
            <Reveal>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft lg:text-[1.02rem]">{g.text}</p>
            </Reveal>
            <ul className="grid grid-cols-3 gap-2 sm:gap-3">
              {g.facts.map((f, i) => (
                <Reveal as="li" key={f.label} delay={0.08 * i} scale={0.9} y={10}>
                  <div
                    className={`flex h-full min-h-[72px] flex-col justify-center border-2 border-ink bg-paper px-1.5 py-2.5 text-center shadow-[0_3px_0_0_rgb(42_44_51/0.85)] sm:px-3 ${
                      ["rounded-[20px_20px_20px_6px]", "rounded-[20px]", "rounded-[6px_20px_20px_20px]"][i]
                    }`}
                  >
                    <span className="font-display text-[0.98rem] leading-none font-extrabold whitespace-nowrap min-[360px]:text-[1.08rem] sm:text-[1.35rem] xl:text-[1.6rem]">{f.value}</span>
                    <span className="mt-1 text-[0.7rem] leading-tight font-bold text-ink-soft sm:text-[0.8rem]">{f.label}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="flex flex-col items-start gap-3">
              <ButtonLink
                href={whatsappLink(g.askMessage)}
                external
                variant="teal"
                icon={<WhatsAppIcon size={20} />}
                className="w-full sm:w-auto"
              >
                {g.ask}
              </ButtonLink>
              <p className="flex items-start gap-2 text-sm font-semibold text-ink-soft">
                <MessageCircleQuestion size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-teal-deep" />
                {g.note}
              </p>
            </Reveal>
          </div>

          {/* Возрастные категории (визуально, без распределения групп) */}
          <div>
            <Reveal>
              <h3 className="mb-4 text-center text-base font-bold lg:mb-6 lg:text-lg">{g.stagesTitle}</h3>
            </Reveal>
            {/* Десктоп: «растущие» фигуры */}
            <ol className="hidden items-end justify-center gap-4 lg:flex xl:gap-6">
              {g.stages.map((s, i) => (
                <Reveal as="li" key={s.age} delay={0.12 * i} y={40} className="flex w-[33%] max-w-[180px] flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: i % 2 ? -4 : 4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className={`relative grid place-items-center border-[3px] border-ink shadow-[0_4px_0_0_rgb(42_44_51/0.85)] ${stageLook[i].bg} ${stageLook[i].size} ${stageLook[i].shape}`}
                  >
                    <span className="font-display text-[1.45rem] leading-none font-extrabold text-ink">{s.age}</span>
                    <Sparkle className="absolute -top-2 -right-1 size-4" color="cream" float="spin" />
                  </motion.div>
                  <p className="mt-3.5 font-display text-[0.92rem] font-bold">{s.title}</p>
                  <p className="mt-1 text-[0.88rem] leading-snug text-ink-soft">{s.text}</p>
                </Reveal>
              ))}
            </ol>
            {/* Мобильная версия: лесенка */}
            <ol className="flex flex-col gap-2.5 lg:hidden">
              {g.stages.map((s, i) => (
                <Reveal as="li" key={s.age} delay={0.08 * i} y={16}>
                  <div className="flex items-center gap-3 rounded-[20px] border-2 border-ink/10 bg-paper p-2.5 pr-3" style={{ marginLeft: `${i * 10}px` }}>
                    <span
                      className={`grid size-12 shrink-0 place-items-center border-[2.5px] border-ink font-display text-[0.92rem] font-extrabold ${stageLook[i].bg} ${stageLook[i].shape}`}
                    >
                      {s.age}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-[0.88rem] font-bold">{s.title}</span>
                      <span className="text-[0.84rem] leading-snug text-ink-soft">{s.text}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Ball className="absolute -top-3 left-8 size-6 lg:left-20 lg:size-8" color="sun" float="slow" />
    </div>
  );
}

export function About({ photos }: { photos: Photo[] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-paper py-10 lg:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        <AboutBlock photos={photos} />
        <div id="groups" data-anchor>
          <GroupsBlock />
        </div>
      </div>
    </section>
  );
}
