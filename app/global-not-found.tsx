import type { Metadata } from "next";
import { display, nunito } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — KAISAR KK",
};

export default function GlobalNotFound() {
  return (
    <html lang="kk" className={`${display.variable} ${nunito.variable}`}>
      <body className="grid min-h-dvh place-items-center bg-cream px-4 font-sans text-ink">
        <main className="flex max-w-md flex-col items-center text-center">
          <p className="font-display text-7xl font-extrabold text-coral-deep">404</p>
          <h1 className="mt-4 text-2xl font-bold">Бет табылмады</h1>
          <p lang="ru" className="mt-1 text-ink-soft">
            Страница не найдена
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/" className="inline-flex min-h-12 items-center rounded-full bg-coral-deep px-6 font-extrabold text-white shadow-[0_5px_0_0_rgb(42_44_51/0.85)]">
              Басты бетке
            </a>
            <a href="/ru" lang="ru" className="inline-flex min-h-12 items-center rounded-full border-2 border-ink/10 bg-paper px-6 font-extrabold">
              На главную
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
