import { Nunito, Unbounded } from "next/font/google";

// Обе гарнитуры поддерживают кириллицу, включая казахские буквы (ә, ғ, қ, ң, ө, ұ, ү, һ, і).
export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});
