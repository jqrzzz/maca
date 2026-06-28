import type { Metadata } from "next";
import { ProgramOverview } from "@/components/preview/ProgramOverview";

export const metadata: Metadata = {
  title: "Curiosity Program one-page overview",
  description:
    "An internal, printable one-page overview of the Curiosity Program for foundation and donor conversations.",
  robots: { index: false, follow: false },
};

export default function OverviewPage() {
  return <ProgramOverview printable />;
}
