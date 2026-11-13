import fs from "node:fs";
import path from "node:path";
import { galleryImages } from "@/content/gallery";
import { documents, documentsFolderUrl } from "@/content/documents";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const DOCS_DIR = path.join(process.cwd(), "public", "docs");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const HERO_CANDIDATES = ["main-page.png", "main-page.jpg", "main-page.jpeg", "main-page.webp"];

export type Photo = {
  src: string;
  alt: { kk: string; ru: string } | null;
  /** Ширина / высота исходного файла — плитки повторяют пропорции фото, без обрезки. */
  ratio: number;
};

export type HeroImage = { src: string; ratio: number };

export type DocItem = { title: { kk: string; ru: string }; href: string; isPdf: boolean };

function listDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

const toSrc = (folder: string, file: string) => `/${folder}/${file.split("/").map(encodeURIComponent).join("/")}`;

/* ---------- Размеры изображений (без сторонних библиотек) ---------- */

const FALLBACK_RATIO = 4 / 3;

/** Ориентация из EXIF (APP1) — фото с телефона часто «повёрнуты» только флагом. */
function exifOrientation(buf: Buffer, start: number, end: number): number {
  if (buf.toString("ascii", start, start + 4) !== "Exif") return 1;
  const tiff = start + 6;
  const le = buf.toString("ascii", tiff, tiff + 2) === "II";
  const u16 = (o: number) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o: number) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  const ifd = tiff + u32(tiff + 4);
  if (ifd + 2 > end) return 1;
  const count = u16(ifd);
  for (let i = 0; i < count; i++) {
    const entry = ifd + 2 + i * 12;
    if (entry + 12 > end) break;
    if (u16(entry) === 0x0112) return u16(entry + 8);
  }
  return 1;
}

function jpegSize(buf: Buffer): [number, number] | null {
  let o = 2;
  let orientation = 1;
  while (o + 9 < buf.length) {
    if (buf[o] !== 0xff) {
      o++;
      continue;
    }
    const marker = buf[o + 1];
    const len = buf.readUInt16BE(o + 2);
    if (marker === 0xe1) orientation = exifOrientation(buf, o + 4, o + 2 + len);
    // SOF0–SOF15, кроме DHT (C4), JPG (C8) и DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      const h = buf.readUInt16BE(o + 5);
      const w = buf.readUInt16BE(o + 7);
      return orientation >= 5 ? [h, w] : [w, h];
    }
    o += 2 + len;
  }
  return null;
}

function imageSize(file: string): [number, number] | null {
  try {
    const buf = fs.readFileSync(file);
    if (buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
    if (buf.toString("ascii", 1, 4) === "PNG") return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const chunk = buf.toString("ascii", 12, 16);
      if (chunk === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
      if (chunk === "VP8L") {
        const b = buf.readUInt32LE(21);
        return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
      }
      if (chunk === "VP8X") return [buf.readUIntLE(24, 3) + 1, buf.readUIntLE(27, 3) + 1];
    }
  } catch {
    /* файл не читается — используем запасные пропорции */
  }
  return null;
}

function ratioOf(dir: string, file: string): number {
  const size = imageSize(path.join(dir, file));
  return size && size[0] > 0 && size[1] > 0 ? size[0] / size[1] : FALLBACK_RATIO;
}

/** Главное фото: только если файл реально существует. */
export function getHeroImage(): HeroImage | null {
  const files = listDir(IMAGES_DIR);
  const found = HERO_CANDIDATES.find((f) => files.includes(f));
  return found ? { src: toSrc("images", found), ratio: ratioOf(IMAGES_DIR, found) } : null;
}

export function getGallery(): Photo[] {
  const files = listDir(IMAGES_DIR).filter((f) => IMAGE_EXT.test(f) && !/^main-page\./i.test(f));
  const listed = galleryImages.filter((g) => files.includes(g.file));
  const listedNames = new Set(listed.map((g) => g.file));
  const unlisted = files
    .filter((f) => !listedNames.has(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return [
    ...listed.map((g) => ({ file: g.file, alt: g.alt ?? null })),
    ...unlisted.map((file) => ({ file, alt: null })),
  ].map((p) => ({
    src: toSrc("images", p.file),
    alt: p.alt,
    ratio: ratioOf(IMAGES_DIR, p.file),
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
