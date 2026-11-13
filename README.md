# KAISAR KK — сайт ясли-сада

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

- `/` — казахская версия (по умолчанию), `/ru` — русская.
- Мобильная и десктопная композиции — отдельные компоненты внутри каждой секции (`components/sections/*`), контент общий (`lib/i18n.ts`, `lib/site.ts`).

## Команды

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production-сборка
npm start
```

## Фотографии

1. Положите файлы в `public/images` (jpg, jpeg, png, webp, avif).
2. Главное фото: `main-page.jpg` или `main-page.png` — появится на первом экране вместо иллюстрации.
3. Галерея: добавьте файлы в список `content/gallery.ts` (подписи KZ/RU и форма плитки `tall` / `wide` / `square`).
   Фото из папки, не указанные в списке, тоже попадут в галерею (в конце).
4. Пересоберите проект (`npm run build`) или сделайте новый деплой на Vercel.

Несуществующие файлы на сайте не показываются.

## Документы

`content/documents.ts`: PDF из `public/docs`, внешние ссылки или общая папка (`documentsFolderUrl`).
Пока список пуст, в разделе показывается аккуратное сообщение и кнопка WhatsApp.

## Контакты

Все контакты, ссылки WhatsApp / Instagram / 2ГИС — в `lib/site.ts`.

## Деплой на Vercel

Импортируйте репозиторий в Vercel — настройки по умолчанию подходят.
Для собственного домена задайте переменную окружения `NEXT_PUBLIC_SITE_URL` (например, `https://kaisarkk.kz`) — она используется для Open Graph и sitemap.
