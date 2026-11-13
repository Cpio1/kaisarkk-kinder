"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, ImagePlus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/components/Providers";
import { Ball, Cloud, Sparkle, Star } from "@/components/decor/Shapes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Buttons";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import type { Photo } from "@/lib/media";

const DESKTOP_STEP = 8;
const MOBILE_STEP = 6;

const radii = [
  "rounded-[28px]",
  "rounded-[28px_28px_80px_28px]",
  "rounded-[80px_28px_28px_28px]",
  "rounded-[28px]",
  "rounded-[28px_80px_28px_28px]",
  "rounded-[28px_28px_28px_80px]",
];

function useAlt() {
  const { lang, t } = useLang();
  return (p: Photo, i: number) => p.alt?.[lang] ?? `${t.gallery.photo} ${i + 1} — KAISAR KK`;
}

/* ---------------- Плитка ---------------- */

function Tile({ photo, index, onOpen, sizes, className }: { photo: Photo; index: number; onOpen: (i: number) => void; sizes: string; className: string }) {
  const { t } = useLang();
  const alt = useAlt();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      className={className}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`${t.gallery.open}: ${alt(photo, index)}`}
        className={`group relative block size-full overflow-hidden border-[3px] border-ink bg-teal-soft ${radii[index % radii.length]}`}
      >
        <Image
          src={photo.src}
          alt={alt(photo, index)}
          fill
          loading="lazy"
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <Expand size={18} aria-hidden="true" />
        </span>
      </button>
    </motion.li>
  );
}

function MoreButton({ onClick, shown, total }: { onClick: () => void; shown: number; total: number }) {
  const { t } = useLang();
  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        className="group inline-flex min-h-14 items-center gap-3 rounded-full border-2 border-ink bg-sun px-6 font-extrabold shadow-[0_5px_0_0_rgb(42_44_51/0.85)]"
      >
        <span className="grid size-8 place-items-center rounded-full bg-paper transition-transform duration-300 group-hover:rotate-90">
          <Plus size={18} aria-hidden="true" />
        </span>
        {t.gallery.more}
      </motion.button>
      <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
        {t.gallery.shown(shown, total)}
      </p>
    </div>
  );
}

/* ---------------- Десктоп: мозаика ---------------- */

const deskSpan = { tall: "row-span-2", wide: "col-span-2", square: "" } as const;

function DesktopGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  const [count, setCount] = useState(DESKTOP_STEP);
  const shown = photos.slice(0, count);
  return (
    <div className="hidden lg:block">
      <ul className="grid grid-flow-dense auto-rows-[190px] grid-cols-4 gap-5 xl:auto-rows-[210px]">
        {shown.map((p, i) => (
          <Tile
            key={p.src}
            photo={p}
            index={i}
            onOpen={onOpen}
            sizes={p.shape === "wide" ? "(min-width: 1240px) 600px, 50vw" : "(min-width: 1240px) 300px, 25vw"}
            className={deskSpan[p.shape]}
          />
        ))}
      </ul>
      {count < photos.length ? <MoreButton onClick={() => setCount((c) => c + DESKTOP_STEP)} shown={shown.length} total={photos.length} /> : null}
    </div>
  );
}

/* ---------------- Мобильная версия ---------------- */

function MobileGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  const [count, setCount] = useState(MOBILE_STEP);
  const shown = photos.slice(0, count);
  return (
    <div className="lg:hidden">
      <ul className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px]">
        {shown.map((p, i) => {
          // Каждое третье фото — широкое, высокие остаются высокими
          const span = i % 3 === 0 ? "col-span-2" : p.shape === "tall" ? "row-span-2" : "";
          return <Tile key={p.src} photo={p} index={i} onOpen={onOpen} sizes={span === "col-span-2" ? "100vw" : "50vw"} className={span} />;
        })}
      </ul>
      {count < photos.length ? <MoreButton onClick={() => setCount((c) => c + MOBILE_STEP)} shown={shown.length} total={photos.length} /> : null}
    </div>
  );
}

/* ---------------- Полноэкранный просмотр ---------------- */

function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useLang();
  const alt = useAlt();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(0);
  const total = photos.length;

  const go = useCallback(
    (d: number) => {
      setDir(d);
      onIndex((index + d + total) % total);
    },
    [index, onIndex, total],
  );

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const photo = photos[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt(photo, index)}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2 lg:px-8 lg:pt-6" onClick={(e) => e.stopPropagation()}>
        <span className="rounded-full bg-white/10 px-4 py-2 font-display text-sm font-bold text-white" aria-live="polite">
          {index + 1} / {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="grid size-12 place-items-center rounded-full bg-paper text-ink transition-transform hover:rotate-90"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={photo.src}
            custom={dir}
            className="absolute inset-0 mx-auto max-w-6xl px-3 py-2 lg:px-24 lg:py-4"
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            <div className="relative size-full" onClick={(e) => e.stopPropagation()}>
              <Image src={photo.src} alt={alt(photo, index)} fill sizes="100vw" quality={90} className="object-contain" draggable={false} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 ? (
        <div
          className="flex shrink-0 items-center justify-center gap-4 px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:justify-between lg:p-0 lg:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.gallery.prev}
            className="pointer-events-auto grid size-14 place-items-center rounded-full bg-sun text-ink shadow-[0_4px_0_0_rgb(0_0_0/0.4)] transition-transform hover:-translate-x-1"
          >
            <ChevronLeft size={28} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.gallery.next}
            className="pointer-events-auto grid size-14 place-items-center rounded-full bg-sun text-ink shadow-[0_4px_0_0_rgb(0_0_0/0.4)] transition-transform hover:translate-x-1"
          >
            <ChevronRight size={28} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}

/* ---------------- Пустое состояние (без чужих фото) ---------------- */

function EmptyGallery() {
  const { t } = useLang();
  const frames = [
    "rotate-[-6deg] bg-sun-soft rounded-[26px_26px_26px_70px]",
    "rotate-[4deg] bg-teal-soft rounded-[70px_26px_26px_26px] lg:-translate-y-4",
    "rotate-[-3deg] bg-coral-soft rounded-[26px_70px_26px_26px]",
  ];
  return (
    <div className="relative mx-auto mt-12 max-w-3xl rounded-[40px] border-2 border-dashed border-ink/25 bg-paper px-5 py-10 text-center sm:px-10 lg:mt-16 lg:py-14">
      <div className="mx-auto flex max-w-md items-end justify-center gap-3 sm:gap-5" aria-hidden="true">
        {frames.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 18 }}
            className={`grid aspect-[4/5] w-[30%] place-items-center border-[3px] border-ink ${f}`}
          >
            <ImagePlus className="size-8 text-ink/50 sm:size-10" />
          </motion.div>
        ))}
      </div>
      <h3 className="mt-8 text-xl font-bold sm:text-2xl">{t.gallery.emptyTitle}</h3>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">{t.gallery.emptyText}</p>
      <ButtonLink href={site.instagram} external variant="insta" className="mt-6" icon={<InstagramIcon size={20} />} ariaLabel={`Instagram ${site.instagramHandle} ${t.contacts.newTab}`}>
        {site.instagramHandle}
      </ButtonLink>
    </div>
  );
}

export function Gallery({ photos }: { photos: Photo[] }) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-cream py-16 lg:py-28">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        <Cloud className="absolute top-2 left-4 w-16 lg:left-12 lg:w-24" float="slow" color="lilac" />
        <Star className="absolute top-0 right-6 size-8 lg:right-16 lg:size-11" float="wiggle" color="coral" />
        <Ball className="absolute top-40 right-2 hidden size-6 lg:block" float="float" color="teal" />
        <SectionHeading
          id="gallery-title"
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          align="center"
          tone="lilac"
        />
        {photos.length === 0 ? (
          <EmptyGallery />
        ) : (
          <div className="relative mt-12 lg:mt-16">
            <Sparkle className="absolute -top-6 left-[45%] size-8" float="spin" color="sun" />
            <DesktopGrid photos={photos} onOpen={setOpen} />
            <MobileGrid photos={photos} onOpen={setOpen} />
          </div>
        )}
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>{open !== null ? <Lightbox key="lightbox" photos={photos} index={open} onClose={close} onIndex={setOpen} /> : null}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
