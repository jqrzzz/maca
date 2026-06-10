import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { safeguarding } from "@/content/legal/safeguarding";

export const metadata: Metadata = buildMetadata({
  title: "Safeguarding",
  description:
    "How PRASM protects the children and vulnerable people it works with — our commitment, conduct, and how to raise a concern.",
  path: "/safeguarding",
});

export default function SafeguardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Our commitment"
        title="Child safeguarding & protection"
      />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {safeguarding.lastUpdated}
          </p>
          <p>{safeguarding.intro}</p>
          {safeguarding.sections.map((section) => (
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
