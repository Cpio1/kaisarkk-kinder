"use client";

import { motion } from "motion/react";
import { ArrowUp, Clock, MapPin, Phone } from "lucide-react";
import type { MouseEvent } from "react";
import { useLang } from "@/components/Providers";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { WaveDivider } from "@/components/decor/Shapes";
import { scrollToSection } from "@/components/layout/Header";
import { localePath, sectionIds, type SectionId } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();
  const onNav = (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    scrollToSection(id);
  };
  const toTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", localePath(lang));
  };

  return (
    <footer className="relative bg-cream">
      <WaveDivider fill="#2a2c33" />
      <div className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1160px] gap-6 px-4 pt-6 pb-6 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10 lg:pt-8 lg:pb-8 xl:px-10">
          <div>
            <p className="font-display text-xl font-extrabold">
              KAISAR<span className="text-sun"> KK</span>
            </p>
            <p className="mt-2 text-white/75">{site.legalName}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={whatsappLink(t.wa.message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${t.contacts.newTab}`}
                className="grid size-11 place-items-center rounded-full bg-[#2fbf71] text-white transition-transform hover:-translate-y-1"
              >
                <WhatsAppIcon size={22} />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagramHandle} ${t.contacts.newTab}`}
                className="grid size-11 place-items-center rounded-full bg-[linear-gradient(120deg,#7a3fd6,#c2337a,#c9402b)] text-white transition-transform hover:-translate-y-1"
              >
                <InstagramIcon size={22} />
              </a>
            </div>
          </div>

          <nav aria-label={t.header.menuTitle}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => onNav(e, id)} className="inline-block py-1 font-bold text-white/85 transition-colors hover:text-sun">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col gap-3 text-white/85">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
              <span>{t.contacts.addressValue}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="shrink-0 text-teal" aria-hidden="true" />
              <a href={site.phoneHref} className="font-bold hover:text-sun">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={20} className="shrink-0 text-sun" aria-hidden="true" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1160px] flex-col items-start justify-between gap-3 px-4 py-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:px-6 xl:px-10">
            <p className="text-sm text-white/60">
              © {year} {site.name}. {t.footer.rights}
            </p>
            <motion.a
              href={localePath(lang)}
              onClick={toTop}
              whileHover={{ y: -3 }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-bold"
            >
              <ArrowUp size={16} aria-hidden="true" /> {t.footer.up}
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
