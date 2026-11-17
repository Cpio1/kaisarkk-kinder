"use client";

import { motion } from "motion/react";
import { ArrowUpRight, FileText, FolderOpen } from "lucide-react";
import { useLang } from "@/components/Providers";
import { Sparkle, Triangle } from "@/components/decor/Shapes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Buttons";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/site";
import type { DocItem } from "@/lib/media";

const docColors = ["bg-sun-soft", "bg-teal-soft", "bg-coral-soft", "bg-lilac-soft"];

function DocCard({ doc, i }: { doc: DocItem; i: number }) {
  const { lang, t } = useLang();
  const external = /^https?:\/\//.test(doc.href);
  return (
    <motion.a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex h-full min-h-[96px] flex-col justify-between gap-3 rounded-[18px_18px_18px_36px] border-2 border-ink p-3.5 shadow-[0_4px_0_0_rgb(42_44_51/0.85)] ${docColors[i % docColors.length]}`}
    >
      {/* «Загнутый уголок» документа */}
      <span className="absolute top-0 right-0 size-6 rounded-[0_16px_0_10px] border-b-2 border-l-2 border-ink bg-paper" aria-hidden="true" />
      <span className="grid size-8 place-items-center rounded-lg bg-paper">
        <FileText size={17} aria-hidden="true" />
      </span>
      <span className="flex items-end justify-between gap-3">
        <span className="font-display text-[0.88rem] leading-snug font-bold">{doc.title[lang]}</span>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[0.8rem] font-bold text-white">
          {doc.isPdf ? "PDF" : t.documents.open}
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
      <span className="sr-only">{external || doc.isPdf ? t.contacts.newTab : ""}</span>
    </motion.a>
  );
}

export function Documents({ items, folderUrl }: { items: DocItem[]; folderUrl: string | null }) {
  const { t } = useLang();
  const d = t.documents;
  const empty = items.length === 0 && !folderUrl;
  return (
    <section id="documents" aria-labelledby="documents-title" className="relative bg-paper py-7 lg:py-11">
      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6 xl:px-10">
        <Triangle className="absolute -top-2 right-4 size-5 lg:top-2 lg:right-auto lg:left-[38%] lg:size-6" float="float" color="teal" />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <SectionHeading id="documents-title" eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} tone="sun" />

          {empty ? (
            <Reveal>
              <div className="relative flex flex-col gap-4 rounded-[22px_22px_22px_48px] border-2 border-dashed border-ink/25 bg-cream p-4 sm:flex-row sm:items-center lg:p-5">
                <div className="relative mx-auto shrink-0 sm:mx-0" aria-hidden="true">
                  <div className="absolute inset-0 translate-x-1.5 -translate-y-1.5 rotate-6 rounded-[18px] border-2 border-ink bg-teal-soft" />
                  <div className="relative grid h-16 w-[3.4rem] place-items-center rounded-[16px] border-2 border-ink bg-sun-soft">
                    <FolderOpen size={22} />
                  </div>
                  <Sparkle className="absolute -top-3 -left-3 size-5" float="spin" color="coral" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[0.95rem] font-bold lg:text-base">{d.emptyTitle}</h3>
                  <p className="mt-1 text-[0.86rem] leading-relaxed text-ink-soft">{d.emptyText}</p>
                  <ButtonLink href={whatsappLink(d.askMessage)} external variant="ink" className="mt-3 w-full sm:w-auto" icon={<WhatsAppIcon size={20} />}>
                    {d.ask}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col gap-4">
              {items.length > 0 ? (
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {items.map((doc, i) => (
                    <Reveal as="li" key={doc.href} delay={0.06 * i}>
                      <DocCard doc={doc} i={i} />
                    </Reveal>
                  ))}
                </ul>
              ) : null}
              {folderUrl ? (
                <Reveal>
                  <ButtonLink href={folderUrl} external variant="ink" icon={<FolderOpen size={20} />} ariaLabel={d.folderText} className="w-full sm:w-auto">
                    {d.folder}
                  </ButtonLink>
                </Reveal>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
