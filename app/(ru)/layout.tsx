import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata("ru");

export default function RussianLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="ru">{children}</RootDocument>;
}
