import { Nunito, Rubik } from "next/font/google";

/*
 * Обе гарнитуры содержат ВСЕ казахские буквы (ә, ғ, қ, ң, ө, ұ, ү, һ, і и заглавные).
 * Важно: шрифт без этих букв (например, Unbounded) заставляет браузер подставлять
 * их из другого шрифта — буквы выглядят крупнее и «заглавными» внутри слова.
 * Подмножество "cyrillic-ext" обязательно: в нём находятся казахские буквы.
 */
export const display = Rubik({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});
