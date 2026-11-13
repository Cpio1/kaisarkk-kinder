import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata("kk");

export default function KazakhLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="kk">{children}</RootDocument>;
}
