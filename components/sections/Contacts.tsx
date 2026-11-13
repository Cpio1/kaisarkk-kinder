"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { useLang } from "@/components/Providers";
import { Cloud, Flower, Star } from "@/components/decor/Shapes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { site, whatsappLink } from "@/lib/site";

/* ---------------- Кнопки-плитки действий ---------------- */

type TileProps = {
  href: string;
  label: string;
  sub: string;
  icon: ReactNode;
  className: string;
  iconClass: string;
  external?: boolean;
  ariaLabel?: string;
  stacked?: boolean;
};

function ActionTile({ href, label, sub, icon, className, iconClass, external = true, ariaLabel, stacked = false }: TileProps) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      initial="rest"
      animate="rest"
      variants={{ rest: { y: 0 }, hover: { y: -5 } }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`group relative flex border-2 border-ink shadow-[0_5px_0_0_rgb(42_44_51/0.9)] hover:shadow-[0_9px_0_0_rgb(42_44_51/0.9)] ${
        stacked ? "min-h-[150px] flex-col items-start justify-between gap-4 p-5" : "min-h-[84px] items-center gap-4 p-3.5 pr-14 sm:p-4 sm:pr-16"
      } ${className}`}
    >
      <span className="relative grid size-14 shrink-0 place-items-center">
        {/* «Пульсирующее» кольцо при наведении */}
        <motion.span
          className={`absolute inset-0 rounded-full ${iconClass}`}
          variants={{ rest: { scale: 1, opacity: 0 }, hover: { scale: [1, 1.45], opacity: [0.5, 0] } }}
          transition={{ duration: 0.9, repeat: Infinity }}
          aria-hidden="true"
        />
        <motion.span
          className={`relative grid size-14 place-items-center rounded-full ${iconClass}`}
          variants={{ rest: { rotate: 0 }, hover: { rotate: -12, scale: 1.06 } }}
        >
          {icon}
        </motion.span>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-display text-[1rem] leading-tight font-bold sm:text-[1.05rem]">{label}</span>
        <span className={`mt-1 text-sm font-semibold opacity-80 ${stacked ? "" : "truncate"}`}>{sub}</span>
      </span>
      <motion.span
        className={`absolute right-4 grid size-9 place-items-center rounded-full bg-paper text-ink ${stacked ? "top-4" : "top-1/2 -translate-y-1/2"}`}
        variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
        aria-hidden="true"
      >
        <ArrowUpRight size={18} />
      </motion.span>
    </motion.a>
  );
}

function useActions(stacked = false) {
  const { t } = useLang();
  const c = t.contacts;
  return {
    whatsapp: (
      <ActionTile
        stacked={stacked}
        href={whatsappLink(t.wa.message)}
        label={c.whatsapp}
        sub={site.phoneDisplay}
        ariaLabel={`${c.whatsapp}: ${site.phoneDisplay} ${c.newTab}`}
        icon={<WhatsAppIcon size={26} />}
        className="rounded-[28px_28px_28px_8px] bg-[linear-gradient(120deg,#2fbf71,#1f9d5c)] text-white"
        iconClass="bg-white/20 text-white"
      />
    ),
    instagram: (
      <ActionTile
        stacked={stacked}
        href={site.instagram}
        label={c.instagram}
        sub={site.instagramHandle}
        ariaLabel={`Instagram ${site.instagramHandle} ${c.newTab}`}
        icon={<InstagramIcon size={26} />}
        className="rounded-[8px_28px_28px_28px] bg-[linear-gradient(120deg,#7a3fd6_0%,#c2337a_55%,#c9402b_100%)] text-white"
        iconClass="bg-white/20 text-white"
      />
    ),
    route: (
      <ActionTile
        stacked={stacked}
        href={site.twoGis}
        label={c.route}
        sub={`2ГИС · ${c.addressShort}`}
        ariaLabel={`${c.route} — 2ГИС ${c.newTab}`}
        icon={<Navigation size={24} />}
        className="rounded-[28px_8px_28px_28px] bg-sun text-ink"
        iconClass="bg-paper text-ink"
      />
    ),
    call: (
      <ActionTile
        stacked={stacked}
        href={site.phoneHref}
        external={false}
        label={c.call}
        sub={site.phoneDisplay}
        icon={<Phone size={24} />}
        className="rounded-[28px_28px_8px_28px] bg-paper text-ink"
        iconClass="bg-teal-soft text-teal-deep"
      />
    ),
  };
}

/* ---------------- Информация ---------------- */

function InfoList() {
  const { t } = useLang();
  const c = t.contacts;
  const rows = [
    { icon: MapPin, label: c.address, value: c.addressValue, tone: "bg-coral-soft text-coral-deep" },
    { icon: Phone, label: c.phone, value: site.phoneDisplay, href: site.phoneHref, tone: "bg-teal-soft text-teal-deep" },
    { icon: Clock, label: c.hours, value: site.hours, tone: "bg-sun-soft text-sun-deep" },
  ];
  return (
    <dl className="flex flex-col gap-3">
      {rows.map((r) => (
        <div key={r.label} className="flex items-start gap-4 rounded-[24px] border-2 border-ink/10 bg-paper p-4">
          <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${r.tone}`}>
            <r.icon size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <dt className="text-sm font-bold text-ink-soft">{r.label}</dt>
            <dd className="mt-0.5 font-bold leading-snug text-ink">
              {r.href ? (
                <a href={r.href} className="underline decoration-teal decoration-2 underline-offset-4 hover:decoration-coral">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/* ---------------- Карточка карты 2ГИС ---------------- */

function MapCard({ tall = false }: { tall?: boolean }) {
  const { t } = useLang();
  const c = t.contacts;
  return (
    <motion.a
      href={site.twoGis}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${c.mapCta}: ${c.addressValue} ${c.newTab}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative block overflow-hidden rounded-[32px] border-2 border-ink bg-[#e8f6ee] lg:rounded-[40px_40px_40px_120px] shadow-[0_8px_0_0_rgb(42_44_51/0.9)] ${
        tall ? "h-full min-h-[460px]" : "aspect-[4/3.4]"
      }`}
    >
      {/* Стилизованная схема (декоративная, не реальные координаты) */}
      <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <rect width="400" height="340" fill="#e8f6ee" />
        <path d="M-10 250C80 220 120 280 210 250s150-70 220-40" fill="none" stroke="#bfe6f5" strokeWidth="26" strokeLinecap="round" />
        {[
          [30, 30, 90, 70],
          [140, 24, 80, 56],
          [250, 40, 110, 64],
          [24, 130, 70, 80],
          [250, 140, 120, 60],
          [120, 300, 90, 40],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="12" fill="#fffdf8" stroke="#2a2c33" strokeOpacity=".08" strokeWidth="2" />
        ))}
        <path d="M0 110h400M120 0v340M230 0v240" stroke="#fff" strokeWidth="16" />
        <path d="M0 110h400M120 0v340M230 0v240" stroke="#ffd56b" strokeWidth="3" strokeDasharray="10 10" />
        <circle cx="64" cy="210" r="16" fill="#52c08a" opacity=".6" />
        <circle cx="330" cy="290" r="20" fill="#52c08a" opacity=".6" />
        <circle cx="176" cy="160" r="40" fill="#ff7a66" opacity=".12" />
      </svg>

      {/* Метка */}
      <div className="absolute top-[47%] left-[44%] -translate-x-1/2 -translate-y-full">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid size-14 place-items-center rounded-[50%_50%_50%_6px] border-[3px] border-ink bg-coral-deep text-white shadow-lift [rotate:-45deg]"
        >
          <span className="[rotate:45deg]">
            <MapPin size={24} aria-hidden="true" />
          </span>
        </motion.div>
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 font-display text-sm font-bold">
        <span className="size-2.5 rounded-full bg-[#2fbf71]" aria-hidden="true" />
        {c.mapTitle}
      </div>

      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-[24px] border-2 border-ink bg-paper p-4 pl-5 sm:flex-row sm:items-center sm:justify-between lg:left-14">
        <p className="leading-snug font-bold">{c.addressShort}</p>
        <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-extrabold text-white">
          {c.mapCta}
          <motion.span variants={{ rest: { x: 0 }, hover: { x: 3, y: -3 } }}>
            <ArrowUpRight size={16} aria-hidden="true" />
          </motion.span>
        </span>
      </div>
    </motion.a>
  );
}

export function Contacts() {
  const { t } = useLang();
  const c = t.contacts;
  const a = useActions();
  const ad = useActions(true);
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative bg-cream py-16 lg:py-28">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        <Star className="absolute top-0 right-6 size-8 lg:right-16 lg:size-11" float="wiggle" color="sun" />
        <Cloud className="absolute top-28 right-[44%] hidden w-20 lg:block" float="slow" />

        {/* Десктоп */}
        <div className="hidden grid-cols-[1fr_1.05fr] gap-14 lg:grid xl:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} tone="coral" />
            <Reveal>
              <InfoList />
            </Reveal>
          </div>
          <div className="flex flex-col gap-5 pt-4">
            <Reveal className="grid grid-cols-2 gap-4">
              {ad.whatsapp}
              {ad.instagram}
              {ad.route}
              {ad.call}
            </Reveal>
            <Reveal delay={0.1} className="relative flex-1">
              <Flower className="absolute -top-5 -right-3 z-10 size-12" float="spin" color="teal" />
              <MapCard tall />
            </Reveal>
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="flex flex-col gap-7 lg:hidden">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} tone="coral" />
          <div className="flex flex-col gap-3.5 sm:grid sm:grid-cols-2">
            {[a.whatsapp, a.call, a.instagram, a.route].map((tile, i) => (
              <Reveal key={i} delay={0.05 * i} y={20}>
                {tile}
              </Reveal>
            ))}
          </div>
          <Reveal>
            <InfoList />
          </Reveal>
          <Reveal>
            <MapCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
