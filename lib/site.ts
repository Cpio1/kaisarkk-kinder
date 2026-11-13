/**
 * Единые данные детского сада. Меняйте контакты только здесь.
 */
export const site = {
  name: "KAISAR KK",
  legalName: "ТОО ясли-сад «Kaisar kk»",
  phoneDisplay: "+7 702 274 78 77",
  phoneHref: "tel:+77022747877",
  whatsapp: "https://wa.me/77022747877",
  instagramHandle: "@_altyn_uya",
  instagram: "https://www.instagram.com/_altyn_uya/",
  hours: "07:30–18:00",
  groups: 13,
  ages: "2–5",
  meals: 4,
  /** Поиск адреса в 2ГИС (без выдуманных координат). */
  twoGis: `https://2gis.kz/search/${encodeURIComponent("Жаркент, улица Ш. Омаров, 19")}`,
  /**
   * Адрес сайта для SEO/Open Graph. На Vercel определяется автоматически;
   * для собственного домена задайте переменную NEXT_PUBLIC_SITE_URL.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export function whatsappLink(message?: string) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;
}
