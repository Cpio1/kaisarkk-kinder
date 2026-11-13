/**
 * ЕДИНЫЙ СПИСОК ФОТОГРАФИЙ ГАЛЕРЕИ
 * ---------------------------------
 * 1. Положите фото в папку `public/images` (jpg, jpeg, png, webp, avif).
 * 2. Добавьте строку в список ниже: имя файла, подписи и (по желанию) форму.
 *
 * Форма плитки (`shape`): "tall" — вертикальная, "wide" — широкая, "square" — квадрат.
 * Если форму не указать, она подберётся автоматически.
 *
 * Файлы, которых нет в папке, на сайте не показываются — битых ссылок не будет.
 * Фото, лежащие в `public/images`, но не указанные здесь, тоже попадут в галерею
 * (в конце списка), чтобы ничего не потерялось. Файлы `main-page.*` используются
 * только на главном экране.
 *
 * Пример:
 *   { file: "group-1.jpg", alt: { kk: "Топтағы ойын", ru: "Игра в группе" }, shape: "wide" },
 */
export type GalleryShape = "tall" | "wide" | "square";

export type GalleryEntry = {
  file: string;
  alt?: { kk: string; ru: string };
  shape?: GalleryShape;
};

export const galleryImages: GalleryEntry[] = [
  // { file: "group-1.jpg", alt: { kk: "Топтағы ойын", ru: "Игра в группе" }, shape: "wide" },
];
