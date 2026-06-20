import type { Metadata } from "next";
import { ConsentCard } from "@/components/preview/ConsentCard";

export const metadata: Metadata = {
  title: "Curiosity Program consent card",
  description:
    "An internal, printable guardian consent card for the Curiosity Program.",
  robots: { index: false, follow: false },
};

export default function ConsentCardPage() {
  return <ConsentCard />;
}
