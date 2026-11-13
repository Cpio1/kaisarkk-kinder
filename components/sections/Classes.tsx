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
    card: "bg-[linear-gradient(160deg,#d3f2ee_0%,#a8e6dd_100%)] rounded-[48px_48px_48px_12px]",
    art: "bg-paper/70 rounded-[32px_32px_90px_32px] lg:rounded-[36px_36px_120px_36px]",
    badge: "bg-teal-deep text-white",
    tag: "bg-paper text-teal-deep",
    num: "text-teal-deep",
  },
  cooking: {
    Icon: ChefHat,
    Art: CookingIllustration,
    card: "bg-[linear-gradient(160deg,#ffe9a8_0%,#ffd38a_100%)] rounded-[100px_100px_40px_40px] lg:rounded-[160px_160px_48px_48px]",
    art: "bg-paper/70 rounded-[84px_84px_28px_28px] lg:rounded-[130px_130px_32px_32px]",
    badge: "bg-coral-deep text-white",
    tag: "bg-paper text-coral-deep",
    num: "text-coral-deep",
  },
  salt: {
    Icon: Gem,
    Art: SaltIllustration,
    card: "bg-[linear-gradient(160deg,#f6f2ff_0%,#e6ddfb_55%,#ffe6df_100%)] rounded-[12px_48px_48px_48px]",
    art: "bg-paper/70 rounded-[32px_90px_32px_32px] lg:rounded-[36px_120px_36px_36px]",
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
      whileHover={compact ? undefined : { y: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative flex h-full flex-col border-2 border-ink p-4 shadow-[0_8px_0_0_rgb(42_44_51/0.9)] sm:p-5 ${look.card}`}
    >
      <div className={`relative overflow-hidden ${look.art} ${compact ? "aspect-[16/10]" : "aspect-[6/5]"}`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
        <Art className="absolute inset-0 m-auto h-[88%] w-[88%] transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <div className="flex items-center justify-between gap-3">
          <span className={`grid size-12 place-items-center rounded-2xl ${look.badge} transition-transform duration-300 group-hover:-rotate-12`}>
            <Icon size={24} aria-hidden="true" />
          </span>
          <span className={`font-display text-4xl font-extrabold opacity-30 ${look.num}`} aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        <h3 className="mt-4 text-[1.35rem] leading-tight font-bold lg:text-2xl">{item.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink/80">{item.text}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={item.title}>
          {item.tags.map((tag) => (
            <li key={tag} className={`rounded-full border-2 border-ink/10 px-3 py-1 text-sm font-bold ${look.tag}`}>
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
    <section id="classes" aria-labelledby="classes-title" className="relative bg-cream py-16 lg:py-28">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        {/* Декор заголовка */}
        <Star className="absolute top-[-18px] right-1 size-7 sm:top-0 sm:right-6 sm:size-9 lg:right-16 lg:size-12" float="wiggle" />
        <Cloud className="absolute top-24 right-24 hidden w-24 lg:block" float="slow" color="teal" />

        <SectionHeading id="classes-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} align="center" tone="teal" />

        {/* Десктоп: три карточки «лесенкой» */}
        <div className="relative mt-16 hidden grid-cols-3 items-start gap-7 lg:grid xl:gap-9">
          <Ring className="absolute -top-8 left-[31%] size-12" color="coral" float="slow" />
          <Sparkle className="absolute -bottom-6 left-[64%] size-10" color="lilac" float="spin" />
          {c.items.map((item, i) => (
            <Reveal key={item.key} delay={0.12 * i} y={60} className={i === 1 ? "lg:mt-14" : ""}>
              <ClassCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Мобильная версия: вертикальные карточки */}
        <div className="mt-10 flex flex-col gap-8 sm:mx-auto sm:max-w-xl lg:hidden">
          {c.items.map((item, i) => (
            <Reveal key={item.key} y={50} scale={0.96}>
              <ClassCard item={item} index={i} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
