import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { IntroFilmPage } from "@/components/intro/IntroFilmPage";

export const metadata: Metadata = buildMetadata({
  title: "A Warm Introduction",
  description:
    "A short, calm film introducing PRASM — where the Kayan come from, why papers and care matter, and how to stand with them.",
  path: "/intro",
});

export default function IntroPage() {
  return (
    <>
      {/* The film is full-screen visual; give SRs and the outline a heading. */}
      <h1 className="sr-only">A warm introduction to PRASM</h1>
      <IntroFilmPage />
    </>
  );
}
