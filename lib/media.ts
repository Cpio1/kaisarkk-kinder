import fs from "node:fs";
import path from "node:path";
import { galleryImages, type GalleryShape } from "@/content/gallery";
import { documents, documentsFolderUrl } from "@/content/documents";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const DOCS_DIR = path.join(process.cwd(), "public", "docs");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const HERO_CANDIDATES = ["main-page.png", "main-page.jpg", "main-page.jpeg", "main-page.webp"];

export type Photo = {
  src: string;
  alt: { kk: string; ru: string } | null;
  shape: GalleryShape;
};

export type DocItem = { title: { kk: string; ru: string }; href: string; isPdf: boolean };

function listDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

const toSrc = (folder: string, file: string) => `/${folder}/${file.split("/").map(encodeURIComponent).join("/")}`;

/** Главное фото: только если файл реально существует. */
export function getHeroImage(): string | null {
  const files = listDir(IMAGES_DIR);
  const found = HERO_CANDIDATES.find((f) => files.includes(f));
  return found ? toSrc("images", found) : null;
}

const AUTO_SHAPES: GalleryShape[] = ["tall", "square", "wide", "square", "square", "tall", "wide", "square"];

export function getGallery(): Photo[] {
  const files = listDir(IMAGES_DIR).filter((f) => IMAGE_EXT.test(f) && !/^main-page\./i.test(f));
  const listed = galleryImages.filter((g) => files.includes(g.file));
  const listedNames = new Set(listed.map((g) => g.file));
  const unlisted = files
    .filter((f) => !listedNames.has(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return [
    ...listed.map((g) => ({ file: g.file, alt: g.alt ?? null, shape: g.shape })),
    ...unlisted.map((file) => ({ file, alt: null, shape: undefined })),
  ].map((p, i) => ({
    src: toSrc("images", p.file),
    alt: p.alt,
    shape: p.shape ?? AUTO_SHAPES[i % AUTO_SHAPES.length],
  }));
}

export function getDocuments(): { items: DocItem[]; folderUrl: string | null } {
  const files = listDir(DOCS_DIR);
  const items: DocItem[] = [];
  for (const d of documents) {
    if (d.file && files.includes(d.file)) {
      items.push({ title: d.title, href: toSrc("docs", d.file), isPdf: /\.pdf$/i.test(d.file) });
    } else if (d.url && /^https?:\/\//.test(d.url)) {
      items.push({ title: d.title, href: d.url, isPdf: /\.pdf($|\?)/i.test(d.url) });
    }
  }
  return { items, folderUrl: /^https?:\/\//.test(documentsFolderUrl) ? documentsFolderUrl : null };
}
