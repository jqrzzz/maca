import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PrasmIntro } from "@/components/intro/PrasmIntro";

export const metadata: Metadata = buildMetadata({
  title: "A Warm Introduction",
  description:
    "A short, calm film introducing PRASM — where the Kayan come from, why papers and care matter, and how to stand with them.",
  path: "/intro",
});

export default function IntroPage() {
  return <PrasmIntro />;
}
