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
      className={`group relative flex h-full min-h-[150px] flex-col justify-between gap-6 rounded-[24px_24px_24px_56px] border-2 border-ink p-5 shadow-[0_5px_0_0_rgb(42_44_51/0.85)] ${docColors[i % docColors.length]}`}
    >
      {/* «Загнутый уголок» документа */}
      <span className="absolute top-0 right-0 size-9 rounded-[0_22px_0_16px] border-b-2 border-l-2 border-ink bg-paper" aria-hidden="true" />
      <span className="grid size-12 place-items-center rounded-2xl bg-paper">
        <FileText size={24} aria-hidden="true" />
      </span>
      <span className="flex items-end justify-between gap-3">
        <span className="font-display text-[1.02rem] leading-snug font-bold">{doc.title[lang]}</span>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-white">
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
    <section id="documents" aria-labelledby="documents-title" className="relative bg-paper py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 xl:px-10">
        <Triangle className="absolute top-0 right-6 size-9 lg:right-16 lg:size-11" float="float" color="teal" />
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading id="documents-title" eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} tone="sun" />

          {empty ? (
            <Reveal>
              <div className="relative flex flex-col gap-6 rounded-[36px_36px_36px_90px] border-2 border-dashed border-ink/25 bg-cream p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="relative mx-auto shrink-0 sm:mx-0" aria-hidden="true">
                  <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-6 rounded-[22px] border-2 border-ink bg-teal-soft" />
                  <div className="relative grid h-28 w-24 place-items-center rounded-[22px] border-2 border-ink bg-sun-soft">
                    <FolderOpen size={36} />
                  </div>
                  <Sparkle className="absolute -top-4 -left-4 size-7" float="spin" color="coral" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold sm:text-xl">{d.emptyTitle}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{d.emptyText}</p>
                  <ButtonLink href={whatsappLink(d.askMessage)} external variant="ink" className="mt-5 w-full sm:w-auto" icon={<WhatsAppIcon size={20} />}>
                    {d.ask}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col gap-5">
              {items.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
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
