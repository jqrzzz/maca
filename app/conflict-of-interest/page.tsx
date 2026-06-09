import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { conflictOfInterest } from "@/content/legal/conflictOfInterest";

export const metadata: Metadata = buildMetadata({
  title: "Conflict of interest",
  description:
    "How PRASM keeps decisions free of improper personal, family, or financial influence.",
  path: "/conflict-of-interest",
});

export default function ConflictOfInterestPage() {
  return (
    <>
      <PageHero eyebrow="Clean decisions" title="Conflict of interest" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {conflictOfInterest.lastUpdated}
          </p>
          <p>{conflictOfInterest.intro}</p>
          {conflictOfInterest.sections.map((section) => (
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
