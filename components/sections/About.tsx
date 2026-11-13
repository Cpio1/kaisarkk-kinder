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
      whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative h-full border-2 border-ink/10 p-6 shadow-soft ${look.card} ${className}`}
    >
      <span className={`grid size-12 place-items-center transition-transform duration-500 group-hover:rotate-[360deg] ${look.icon}`}>
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-[1.05rem] leading-snug font-bold">{title}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
    </motion.div>
  );
}

function PhotoFrame({ photo, alt, className, sizes }: { photo: Photo; alt: string; className: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden border-4 border-ink bg-teal-soft ${className}`}>
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
      {/* Десктоп: текст + коллаж/цитата слева, карточки справа */}
      <div className="hidden grid-cols-[1fr_1.1fr] items-start gap-14 lg:grid xl:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} tone="coral" />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink-soft">{a.lead}</p>
          </Reveal>
          {photos.length > 0 ? (
            <Reveal delay={0.15} className="relative h-[300px]">
              <PhotoFrame
                photo={photos[0]}
                alt={altOf(photos[0])}
                sizes="300px"
                className="absolute top-0 left-0 h-[270px] w-[56%] rounded-[140px_140px_28px_28px]"
              />
              {photos[1] ? (
                <PhotoFrame
                  photo={photos[1]}
                  alt={altOf(photos[1])}
                  sizes="260px"
                  className="absolute right-0 bottom-0 h-[220px] w-[46%] rotate-3 rounded-[28px_110px_28px_110px]"
                />
              ) : null}
              <Star className="absolute top-2 right-[38%] size-10" float="wiggle" />
            </Reveal>
          ) : null}
          <Reveal delay={0.2}>
            <figure className="relative rounded-[36px_36px_36px_8px] bg-ink p-7 pr-16 text-white shadow-lift">
              <Heart className="absolute top-5 right-5 size-9" float="float" />
              <blockquote className="font-display text-xl leading-snug font-semibold">«{a.quote}»</blockquote>
              <figcaption className="mt-3 text-sm font-bold text-sun">KAISAR KK</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-2 gap-5 pt-14">
          <Arch className="absolute -top-2 right-8 w-24" float="slow" />
          {a.features.map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i} className={i % 2 === 1 ? "translate-y-10" : ""}>
              <FeatureCard i={i} title={f.title} text={f.text} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Мобильная версия: вертикальная история */}
      <div className="flex flex-col gap-6 lg:hidden">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} tone="coral" />
        <Reveal>
          <p className="text-[1.02rem] leading-relaxed text-ink-soft">{a.lead}</p>
        </Reveal>
        {photos.length > 0 ? (
          <Reveal className="grid grid-cols-[1.2fr_1fr] gap-3">
            <PhotoFrame photo={photos[0]} alt={altOf(photos[0])} sizes="55vw" className="aspect-[3/4] rounded-[120px_120px_24px_24px] border-[3px]" />
            {photos[1] ? (
              <PhotoFrame photo={photos[1]} alt={altOf(photos[1])} sizes="45vw" className="mt-10 aspect-square rounded-[24px_80px_24px_80px] border-[3px]" />
            ) : null}
          </Reveal>
        ) : null}
        <ul className="grid gap-4 sm:grid-cols-2">
          {a.features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={0.05 * i} y={20}>
              <FeatureCard i={i} title={f.title} text={f.text} />
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <figure className="relative rounded-[30px_30px_30px_8px] bg-ink p-6 pr-14 text-white">
            <Heart className="absolute top-4 right-4 size-7" float="float" />
            <blockquote className="font-display text-[1.05rem] leading-snug font-semibold">«{a.quote}»</blockquote>
            <figcaption className="mt-2 text-sm font-bold text-sun">KAISAR KK</figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------------- Блок «Топтар» ---------------- */

const stageLook = [
  { bg: "bg-sun", size: "lg:size-[150px]", shape: "rounded-full" },
  { bg: "bg-coral", size: "lg:size-[170px]", shape: "rounded-[38%_62%_55%_45%/50%_42%_58%_50%]" },
  { bg: "bg-lilac", size: "lg:size-[190px]", shape: "rounded-[30px]" },
];

function GroupsBlock() {
  const { t } = useLang();
  const g = t.about.groups;
  return (
    <div className="relative mt-20 lg:mt-32">
      <div className="relative rounded-[40px] border-2 border-ink/10 bg-teal-soft px-5 py-10 sm:px-8 lg:rounded-[56px_56px_56px_140px] lg:px-14 lg:py-16 xl:px-20">
        <div className="bg-dots pointer-events-none absolute inset-0 rounded-[inherit] opacity-70" aria-hidden="true" />
        <Flower className="absolute top-5 right-5 size-10 lg:top-8 lg:right-10 lg:size-14" float="spin" color="coral" />
        <Triangle className="absolute bottom-6 left-6 hidden size-10 lg:block" float="float" color="sun" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
          <div className="flex flex-col gap-6">
            <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} tone="teal" />
            <Reveal>
              <p className="text-[1.02rem] leading-relaxed text-ink-soft lg:text-lg">{g.text}</p>
            </Reveal>
            <ul className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {g.facts.map((f, i) => (
                <Reveal as="li" key={f.label} delay={0.08 * i} scale={0.9} y={10}>
                  <div
                    className={`flex h-full min-h-[96px] flex-col justify-center border-2 border-ink bg-paper px-2.5 py-3 text-center shadow-[0_4px_0_0_rgb(42_44_51/0.85)] sm:px-4 ${
                      ["rounded-[24px_24px_24px_6px]", "rounded-[24px]", "rounded-[6px_24px_24px_24px]"][i]
                    }`}
                  >
                    <span className="font-display text-[1.05rem] leading-none font-extrabold whitespace-nowrap min-[400px]:text-[1.2rem] sm:text-[1.6rem] xl:text-3xl">{f.value}</span>
                    <span className="mt-1.5 text-[0.75rem] leading-tight font-bold text-ink-soft sm:text-sm">{f.label}</span>
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
              <h3 className="mb-6 text-center text-lg font-bold lg:mb-8 lg:text-xl">{g.stagesTitle}</h3>
            </Reveal>
            {/* Десктоп: «растущие» фигуры */}
            <ol className="hidden items-end justify-center gap-5 lg:flex xl:gap-7">
              {g.stages.map((s, i) => (
                <Reveal as="li" key={s.age} delay={0.12 * i} y={40} className="flex w-[33%] max-w-[200px] flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: i % 2 ? -4 : 4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className={`relative grid place-items-center border-[3px] border-ink shadow-[0_6px_0_0_rgb(42_44_51/0.85)] ${stageLook[i].bg} ${stageLook[i].size} ${stageLook[i].shape}`}
                  >
                    <span className="font-display text-[2rem] leading-none font-extrabold text-ink">{s.age}</span>
                    <Sparkle className="absolute -top-2 -right-1 size-6" color="cream" float="spin" />
                  </motion.div>
                  <p className="mt-5 font-display text-base font-bold">{s.title}</p>
                  <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-soft">{s.text}</p>
                </Reveal>
              ))}
            </ol>
            {/* Мобильная версия: лесенка */}
            <ol className="flex flex-col gap-3 lg:hidden">
              {g.stages.map((s, i) => (
                <Reveal as="li" key={s.age} delay={0.08 * i} y={20}>
                  <div className="flex items-center gap-4 rounded-[26px] border-2 border-ink/10 bg-paper p-3 pr-4" style={{ marginLeft: `${i * 14}px` }}>
                    <span
                      className={`grid size-16 shrink-0 place-items-center border-[3px] border-ink font-display text-lg font-extrabold ${stageLook[i].bg} ${stageLook[i].shape}`}
                    >
                      {s.age}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-[0.95rem] font-bold">{s.title}</span>
                      <span className="text-sm leading-snug text-ink-soft">{s.text}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Ball className="absolute -top-5 left-10 size-10 lg:left-24 lg:size-12" color="sun" float="slow" />
    </div>
  );
}

export function About({ photos }: { photos: Photo[] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-paper py-16 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        <AboutBlock photos={photos} />
        <div id="groups" className="scroll-mt-28">
          <GroupsBlock />
        </div>
      </div>
    </section>
  );
}
