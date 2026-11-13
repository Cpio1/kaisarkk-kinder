"use client";

import { motion } from "motion/react";
import { Bot, ChefHat, Gem } from "lucide-react";
import { useLang } from "@/components/Providers";
import { Cloud, Ring, Sparkle, Star } from "@/components/decor/Shapes";
import { CookingIllustration, RobotIllustration, SaltIllustration } from "@/components/decor/ClassIllustrations";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const looks = {
  robotics: {
    Icon: Bot,
    Art: RobotIllustration,
    card: "bg-[linear-gradient(160deg,#d3f2ee_0%,#a8e6dd_100%)] rounded-[36px_36px_36px_10px]",
    art: "bg-paper/70 rounded-[24px_24px_64px_24px] lg:rounded-[28px_28px_84px_28px]",
    badge: "bg-teal-deep text-white",
    tag: "bg-paper text-teal-deep",
    num: "text-teal-deep",
  },
  cooking: {
    Icon: ChefHat,
    Art: CookingIllustration,
    card: "bg-[linear-gradient(160deg,#ffe9a8_0%,#ffd38a_100%)] rounded-[80px_80px_32px_32px] lg:rounded-[120px_120px_40px_40px]",
    art: "bg-paper/70 rounded-[66px_66px_22px_22px] lg:rounded-[100px_100px_28px_28px]",
    badge: "bg-coral-deep text-white",
    tag: "bg-paper text-coral-deep",
    num: "text-coral-deep",
  },
  salt: {
    Icon: Gem,
    Art: SaltIllustration,
    card: "bg-[linear-gradient(160deg,#f6f2ff_0%,#e6ddfb_55%,#ffe6df_100%)] rounded-[10px_36px_36px_36px]",
    art: "bg-paper/70 rounded-[24px_64px_24px_24px] lg:rounded-[28px_84px_28px_28px]",
    badge: "bg-lilac-deep text-white",
    tag: "bg-paper text-lilac-deep",
    num: "text-lilac-deep",
  },
} as const;

type Item = { key: string; title: string; text: string; tags: string[] };

function ClassCard({ item, index, compact = false }: { item: Item; index: number; compact?: boolean }) {
  const look = looks[item.key as keyof typeof looks];
  const { Icon, Art } = look;
  return (
    <motion.article
      whileHover={compact ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative flex h-full flex-col border-2 border-ink p-3 shadow-[0_5px_0_0_rgb(42_44_51/0.9)] lg:p-4 ${look.card}`}
    >
      <div className={`relative overflow-hidden ${look.art} ${compact ? "aspect-[2/1]" : "aspect-[16/10]"}`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
        <Art className="absolute inset-0 m-auto h-[86%] w-[86%] transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col px-1.5 pt-3.5 pb-1.5 lg:px-2 lg:pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className={`grid size-10 place-items-center rounded-[14px] ${look.badge} transition-transform duration-300 group-hover:-rotate-12`}>
            <Icon size={20} aria-hidden="true" />
          </span>
          <span className={`font-display text-2xl lg:text-3xl font-extrabold opacity-30 ${look.num}`} aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        <h3 className="mt-3 text-[1.12rem] leading-tight font-bold lg:text-[1.25rem]">{item.title}</h3>
        <p className="mt-2 flex-1 text-[0.93rem] leading-relaxed text-ink/80">{item.text}</p>
        <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label={item.title}>
          {item.tags.map((tag) => (
            <li key={tag} className={`rounded-full border-2 border-ink/10 px-2.5 py-0.5 text-[0.8rem] font-bold ${look.tag}`}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Classes() {
  const { t } = useLang();
  const c = t.classes;
  return (
    <section id="classes" aria-labelledby="classes-title" className="relative bg-cream py-10 lg:py-16">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        {/* Декор заголовка */}
        <Star className="absolute -top-3 right-3 size-5 sm:right-6 sm:size-6 lg:top-0 lg:right-16 lg:size-8" float="wiggle" />
        <Cloud className="absolute top-16 left-16 hidden w-14 lg:block" float="slow" color="teal" />

        <SectionHeading id="classes-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" tone="teal" />

        {/* Десктоп: три карточки «лесенкой» */}
        <div className="relative mt-10 hidden grid-cols-3 items-start gap-6 lg:grid xl:gap-8">
          <Ring className="absolute -top-5 left-[32.5%] size-7" color="coral" float="slow" />
          <Sparkle className="absolute -bottom-3 left-[65.5%] size-6" color="lilac" float="spin" />
          {c.items.map((item, i) => (
            <Reveal key={item.key} delay={0.12 * i} y={60} className={i === 1 ? "lg:mt-8" : ""}>
              <ClassCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Мобильная версия: вертикальные карточки */}
        <div className="mt-7 flex flex-col gap-5 sm:mx-auto sm:max-w-xl lg:hidden">
          {c.items.map((item, i) => (
            <Reveal key={item.key} y={30} scale={0.97}>
              <ClassCard item={item} index={i} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
