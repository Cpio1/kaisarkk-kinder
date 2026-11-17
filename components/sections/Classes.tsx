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
    card: "bg-[linear-gradient(160deg,#d3f2ee_0%,#a8e6dd_100%)] rounded-[28px_28px_28px_8px]",
    art: "bg-paper/70 rounded-[18px_18px_48px_18px] lg:rounded-[20px_20px_56px_20px]",
    badge: "bg-teal-deep text-white",
    tag: "bg-paper text-teal-deep",
    num: "text-teal-deep",
  },
  cooking: {
    Icon: ChefHat,
    Art: CookingIllustration,
    card: "bg-[linear-gradient(160deg,#ffe9a8_0%,#ffd38a_100%)] rounded-[56px_56px_26px_26px] lg:rounded-[80px_80px_28px_28px]",
    art: "bg-paper/70 rounded-[46px_46px_18px_18px] lg:rounded-[68px_68px_20px_20px]",
    badge: "bg-coral-deep text-white",
    tag: "bg-paper text-coral-deep",
    num: "text-coral-deep",
  },
  salt: {
    Icon: Gem,
    Art: SaltIllustration,
    card: "bg-[linear-gradient(160deg,#f6f2ff_0%,#e6ddfb_55%,#ffe6df_100%)] rounded-[8px_28px_28px_28px]",
    art: "bg-paper/70 rounded-[18px_48px_18px_18px] lg:rounded-[20px_56px_20px_20px]",
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
      whileHover={compact ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative flex h-full flex-col border-2 border-ink p-2.5 shadow-[0_4px_0_0_rgb(42_44_51/0.9)] lg:p-3 ${look.card}`}
    >
      <div className={`relative overflow-hidden ${look.art} ${compact ? "aspect-[3/1]" : "aspect-[2/1]"}`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
        <Art className="absolute inset-0 m-auto h-[84%] w-[84%] transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col px-1.5 pt-2.5 pb-1 lg:px-2 lg:pt-3">
        {/* Мобильная карточка: значок, заголовок и номер в одну строку */}
        <div className="flex items-center gap-2.5">
          <span className={`grid size-8 shrink-0 place-items-center rounded-[11px] ${look.badge} transition-transform duration-300 group-hover:-rotate-12`}>
            <Icon size={16} aria-hidden="true" />
          </span>
          {compact ? <h3 className="min-w-0 flex-1 text-[1rem] leading-tight font-bold">{item.title}</h3> : <span className="flex-1" />}
          <span className={`font-display text-xl lg:text-2xl font-extrabold opacity-30 ${look.num}`} aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        {compact ? null : <h3 className="mt-2 text-[1.08rem] leading-tight font-bold">{item.title}</h3>}
        <p className="mt-1.5 flex-1 text-[0.85rem] leading-snug text-ink/80 lg:text-[0.87rem]">{item.text}</p>
        <ul className="mt-2.5 flex flex-wrap gap-1" aria-label={item.title}>
          {item.tags.map((tag) => (
            <li key={tag} className={`rounded-full border-2 border-ink/10 px-2 py-px text-[0.72rem] font-bold ${look.tag}`}>
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
    <section id="classes" aria-labelledby="classes-title" className="relative bg-cream py-7 lg:py-10">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6 xl:px-10">
        {/* Декор заголовка */}
        <Star className="absolute -top-3 right-3 size-4 sm:right-6 sm:size-5 lg:top-0 lg:right-16 lg:size-6" float="wiggle" />
        <Cloud className="absolute top-12 left-16 hidden w-11 lg:block" float="slow" color="teal" />

        <SectionHeading id="classes-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" tone="teal" />

        {/* Десктоп: три карточки «лесенкой» */}
        <div className="relative mx-auto mt-6 hidden max-w-[1040px] grid-cols-3 items-start gap-5 lg:grid xl:gap-6">
          <Ring className="absolute -top-4 left-[32.5%] size-5" color="coral" float="slow" />
          <Sparkle className="absolute -bottom-3 left-[65.5%] size-5" color="lilac" float="spin" />
          {c.items.map((item, i) => (
            <Reveal key={item.key} delay={0.12 * i} y={60} className={i === 1 ? "lg:mt-4" : ""}>
              <ClassCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Мобильная версия: вертикальные карточки */}
        <div className="mt-5 flex flex-col gap-3.5 sm:mx-auto sm:max-w-xl lg:hidden">
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
