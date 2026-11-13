import type { Metadata, Viewport } from "next";
import { dictionaries, type Locale } from "./i18n";
import { site } from "./site";

export function buildMetadata(lang: Locale): Metadata {
  const t = dictionaries[lang].meta;
  const path = lang === "kk" ? "/" : "/ru";
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    applicationName: site.name,
    alternates: {
      canonical: path,
      languages: { kk: "/", ru: "/ru", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: t.title,
      description: t.description,
      locale: lang === "kk" ? "kk_KZ" : "ru_RU",
      alternateLocale: lang === "kk" ? ["ru_RU"] : ["kk_KZ"],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    formatDetection: { telephone: true, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#fff8ec",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
