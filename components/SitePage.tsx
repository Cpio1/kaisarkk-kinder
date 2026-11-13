import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Classes } from "@/components/sections/Classes";
import { Nutrition } from "@/components/sections/Nutrition";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";
import { WaveDivider } from "@/components/decor/Shapes";
import { dictionaries, type Locale } from "@/lib/i18n";
import { getDocuments, getGallery, getHeroImage } from "@/lib/media";
import { site } from "@/lib/site";

export function SitePage({ lang }: { lang: Locale }) {
  // Файлы читаются при сборке: на сайте нет ссылок на несуществующие изображения
  const heroImage = getHeroImage();
  const photos = getGallery();
  const docs = getDocuments();
  const t = dictionaries[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: site.name,
    legalName: site.legalName,
    description: t.meta.description,
    telephone: "+77022747877",
    url: site.url + (lang === "kk" ? "/" : "/ru"),
    sameAs: [site.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: lang === "kk" ? "Ш. Омаров көшесі, 19" : "ул. Ш. Омаров, 19",
      addressLocality: "Жаркент",
      addressRegion: lang === "kk" ? "Жетісу облысы" : "Область Жетісу",
      addressCountry: "KZ",
    },
  };

  return (
    <Providers lang={lang}>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero heroImage={heroImage} />
        <WaveDivider fill="var(--color-paper)" />
        <About photos={photos.slice(0, 2)} />
        <WaveDivider fill="var(--color-cream)" className="-mt-px bg-paper" />
        <Classes />
        <WaveDivider fill="var(--color-paper)" className="-mt-px bg-cream" />
        <Nutrition />
        <WaveDivider fill="var(--color-cream)" className="-mt-px bg-paper" />
        <Gallery photos={photos} />
        <WaveDivider fill="var(--color-paper)" className="-mt-px bg-cream" />
        <Documents items={docs.items} folderUrl={docs.folderUrl} />
        <WaveDivider fill="var(--color-cream)" className="-mt-px bg-paper" />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Providers>
  );
}
