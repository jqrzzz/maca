import type { Metadata } from "next";
import { StewardGuide } from "@/components/preview/StewardGuide";

export const metadata: Metadata = {
  title: "Curiosity Program steward guide",
  description:
    "An internal, printable orientation guide for the village steward.",
  robots: { index: false, follow: false },
};

export default function StewardGuidePage() {
  return <StewardGuide printable />;
}
