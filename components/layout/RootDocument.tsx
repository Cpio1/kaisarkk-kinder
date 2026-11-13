import type { ReactNode } from "react";
import { nunito, unbounded } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
import "@/app/globals.css";

export function RootDocument({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <html lang={lang} className={`${unbounded.variable} ${nunito.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-dvh bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
