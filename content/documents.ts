/**
 * ДОКУМЕНТЫ ДЕТСКОГО САДА
 * -----------------------
 * Вариант 1 — PDF-файлы: положите файл в `public/docs` и добавьте строку в `documents`.
 *   { file: "ustav.pdf", title: { kk: "Жарғы", ru: "Устав" } },
 *
 * Вариант 2 — внешняя ссылка (например, папка Google Drive):
 *   { url: "https://drive.google.com/...", title: { kk: "...", ru: "..." } },
 *
 * Вариант 3 — общая папка со всеми документами: укажите ссылку в `documentsFolderUrl`.
 *
 * PDF-файлы, которых нет в `public/docs`, на сайте не показываются.
 */
export type DocumentEntry = {
  title: { kk: string; ru: string };
  file?: string;
  url?: string;
};

export const documents: DocumentEntry[] = [];

export const documentsFolderUrl = "";
