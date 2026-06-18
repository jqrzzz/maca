import type { Metadata } from "next";
import { PreviewConsole } from "@/components/PreviewConsole";

export const metadata: Metadata = {
  title: "Internal preview",
  description: "A visual preview of PRASM's future internal team console.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <PreviewConsole />;
}
