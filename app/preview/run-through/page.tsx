import type { Metadata } from "next";
import { GuidedSession } from "@/components/preview/GuidedSession";

export const metadata: Metadata = {
  title: "Practice a first session",
  description:
    "An internal, step-by-step rehearsal of a first Curiosity Program visit for the village steward.",
  robots: { index: false, follow: false },
};

export default function RunThroughPage() {
  return <GuidedSession standalone />;
}
