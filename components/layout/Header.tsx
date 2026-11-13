"use client";

import { AnimatePresence, motion } from "motion/react";
import { Clock, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/components/Providers";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { localePath, sectionIds, type Locale, type SectionId } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Общие хуки                                                          */
/* ------------------------------------------------------------------ */

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: SectionId | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id as SectionId;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

/** Плавная прокрутка к разделу с учётом фиксированной шапки (scroll-margin-top). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function Logo({ lang, label }: { lang: Locale; label: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === localePath(lang)) {
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", localePath(lang));
    }
  };
  return (
    <a href={localePath(lang)} onClick={onClick} aria-label={label} className="group flex shrink-0 items-center gap-2">
      <span className="relative grid size-9 place-items-center rounded-[12px] bg-sun shadow-[0_3px_0_0_rgb(42_44_51/0.85)] transition-transform duration-300 group-hover:-rotate-6 lg:size-10">
        <svg viewBox="0 0 32 32" className="size-5.5" aria-hidden="true">
          <path d="M5 23 7 10l5.5 6L16 7l3.5 9L25 10l2 13Z" fill="#2a2c33" strokeLinejoin="round" stroke="#2a2c33" strokeWidth="1.6" />
          <circle cx="16" cy="19" r="2" fill="#ffc93c" />
        </svg>
        <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-cream bg-coral" />
      </span>
      <span className="font-display text-[0.95rem] leading-none font-extrabold tracking-tight text-ink lg:text-[1.1rem]">
        KAISAR<span className="text-coral-deep"> KK</span>
      </span>
    </a>
  );
}

function LangSwitch({ active, compact = false }: { active: SectionId | null; compact?: boolean }) {
  const { lang, t } = useLang();
  const go = (e: MouseEvent<HTMLAnchorElement>, to: Locale) => {
    if (to === lang) {
      e.preventDefault();
      return;
    }
    // Сохраняем раздел, который пользователь сейчас читает
    e.currentTarget.href = `${localePath(to)}${active ? `#${active}` : ""}`;
  };
  return (
    <div
      role="group"
      aria-label={t.header.langLabel}
      className={`relative flex items-center rounded-full border-2 border-ink/10 bg-paper p-0.5 ${compact ? "" : "shadow-soft"}`}
    >
      {(["kk", "ru"] as const).map((l) => {
        const current = l === lang;
        return (
          <a
            key={l}
            href={localePath(l)}
            hrefLang={l}
            lang={l}
            onClick={(e) => go(e, l)}
            aria-current={current ? "true" : undefined}
            className={`relative z-10 grid h-8 min-w-10 place-items-center rounded-full px-2 text-[0.76rem] font-extrabold tracking-wide transition-colors ${
              current ? "text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {current ? (
              <motion.span
                layoutId={compact ? "lang-pill-m" : "lang-pill-d"}
                className="absolute inset-0 -z-10 rounded-full bg-teal-deep"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            ) : null}
            {l === "kk" ? "KZ" : "RU"}
          </a>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Десктопная шапка                                                    */
/* ------------------------------------------------------------------ */

function DesktopHeader({ active, scrolled }: { active: SectionId | null; scrolled: boolean }) {
  const { lang, t } = useLang();
  const onNav = (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return (
    <div className="mx-auto hidden h-(--header-h) max-w-[1320px] items-center justify-between gap-4 px-6 lg:flex xl:px-10">
      <Logo lang={lang} label={t.header.home} />
      <nav aria-label={t.header.menuTitle}>
        <ul
          className={`flex items-center gap-0.5 rounded-full border-2 p-1 transition-colors duration-300 ${
            scrolled ? "border-ink/10 bg-paper" : "border-ink/5 bg-paper/80"
          }`}
        >
          {sectionIds.map((id) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => onNav(e, id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block rounded-full px-2.5 py-1.5 text-[0.86rem] font-bold whitespace-nowrap transition-colors xl:px-3 xl:text-[0.9rem] ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-bubble"
                      className="absolute inset-0 -z-0 rounded-full bg-sun-soft"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{t.nav[id]}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex shrink-0 items-center gap-3">
        <LangSwitch active={active} />
        <motion.a
          href={whatsappLink(t.wa.message)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          aria-label={`${t.header.whatsapp} ${t.contacts.newTab}`}
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-coral-deep px-3.5 font-extrabold text-white shadow-[0_4px_0_0_rgb(42_44_51/0.85)] xl:px-5"
        >
          <WhatsAppIcon size={20} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden xl:inline">{t.header.whatsapp}</span>
        </motion.a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Мобильная шапка и меню                                              */
/* ------------------------------------------------------------------ */

const dotColors = ["bg-coral", "bg-teal", "bg-sun", "bg-lilac", "bg-coral", "bg-teal", "bg-sun"];

function MobileHeader({ active }: { active: SectionId | null }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pending = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden"; // блокируем прокрутку фона, пока меню открыто
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 250);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Закрылись на десктопной ширине — сбрасываем состояние
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const onNav = (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    pending.current = id;
    setOpen(false);
  };

  const onExitComplete = () => {
    // Прокручиваем только после того, как меню закрылось и прокрутка фона разблокирована
    if (pending.current) {
      const id = pending.current;
      pending.current = null;
      requestAnimationFrame(() => scrollToSection(id));
    } else {
      burgerRef.current?.focus();
    }
  };

  return (
    <div className="lg:hidden">
      <div className="mx-auto flex h-(--header-h) max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <Logo lang={lang} label={t.header.home} />
        <div className="flex items-center gap-2">
          <LangSwitch active={active} compact />
          <a
            href={whatsappLink(t.wa.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.header.whatsapp} ${t.contacts.newTab}`}
            className="hidden size-10 place-items-center rounded-full bg-coral-deep text-white shadow-[0_3px_0_0_rgb(42_44_51/0.85)] min-[400px]:grid"
          >
            <WhatsAppIcon size={20} />
          </a>
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.header.menuOpen}
            className="grid size-10 place-items-center rounded-full bg-ink text-white shadow-[0_3px_0_0_rgb(42_44_51/0.35)]"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Портал: меню не зависит от backdrop-filter шапки */}
      {mounted && createPortal(
      <AnimatePresence onExitComplete={onExitComplete}>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.header.menuTitle}
            className="fixed inset-0 z-[60] flex flex-col bg-cream"
            initial={{ clipPath: "circle(0px at calc(100% - 36px) 30px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 30px)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 36px) 30px)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto flex h-(--header-h) w-full max-w-3xl shrink-0 items-center justify-between px-4 sm:px-6">
              <Logo lang={lang} label={t.header.home} />
              <button
                type="button"
                onClick={close}
                aria-label={t.header.menuClose}
                className="grid size-10 place-items-center rounded-full bg-ink text-white"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label={t.header.menuTitle} className="relative mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-4 pt-2 pb-[max(20px,env(safe-area-inset-bottom))] sm:px-6">
              <ul className="flex flex-col gap-1.5">
                {sectionIds.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.12 + i * 0.05, type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${id}`}
                      onClick={(e) => onNav(e, id)}
                      aria-current={active === id ? "location" : undefined}
                      className={`flex min-h-12 items-center gap-3 rounded-[18px] border-2 px-3.5 py-2 transition-colors active:scale-[0.99] ${
                        active === id ? "border-ink bg-sun-soft" : "border-ink/10 bg-paper"
                      }`}
                    >
                      <span className={`grid size-8 shrink-0 place-items-center rounded-full font-display text-[0.7rem] font-bold text-ink ${dotColors[i]}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base font-bold text-ink">{t.nav[id]}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-4 grid grid-cols-2 gap-2.5"
              >
                <a
                  href={whatsappLink(t.wa.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-[18px] bg-coral-deep px-3 font-extrabold text-white shadow-[0_4px_0_0_rgb(42_44_51/0.85)]"
                >
                  <WhatsAppIcon size={20} /> WhatsApp
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-[18px] bg-[linear-gradient(120deg,#7a3fd6_0%,#c2337a_55%,#c9402b_100%)] px-3 font-extrabold text-white shadow-[0_4px_0_0_rgb(42_44_51/0.85)]"
                >
                  <InstagramIcon size={20} /> Instagram
                </a>
                <a
                  href={site.phoneHref}
                  className="col-span-2 flex min-h-12 items-center justify-between gap-3 rounded-[18px] border-2 border-ink/10 bg-paper px-4 font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Phone size={18} aria-hidden="true" className="text-teal-deep" /> {site.phoneDisplay}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                    <Clock size={16} aria-hidden="true" /> {site.hours}
                  </span>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
      )}
    </div>
  );
}

export function Header() {
  const active = useActiveSection();
  const scrolled = useScrolled();
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-cream/85 shadow-[0_8px_24px_-18px_rgb(42_44_51/0.5)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <DesktopHeader active={active} scrolled={scrolled} />
      <MobileHeader active={active} />
    </header>
  );
}
