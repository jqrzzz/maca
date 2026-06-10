import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { accessibility } from "@/content/legal/accessibility";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility",
  description:
    "Our commitment to an accessible site — what we do, the standard we aim for, and how to report a barrier.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {accessibility.lastUpdated}
          </p>
          <p>{accessibility.intro}</p>
          {accessibility.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}
        </Prose>
      </Section>
    </>
  );
}
