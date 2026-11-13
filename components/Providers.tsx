"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n";

type LangCtx = { lang: Locale; t: Dictionary };
const LangContext = createContext<LangCtx | null>(null);

export function Providers({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <LangContext.Provider value={{ lang, t: dictionaries[lang] }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <Providers>");
  return ctx;
}
