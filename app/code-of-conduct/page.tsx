import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { codeOfConduct } from "@/content/legal/codeOfConduct";

export const metadata: Metadata = buildMetadata({
  title: "Code of conduct",
  description:
    "How everyone acting in PRASM's name is expected to behave: respect, safety, honesty, and accountability.",
  path: "/code-of-conduct",
});

export default function CodeOfConductPage() {
  return (
    <>
      <PageHero eyebrow="How we act" title="Code of conduct" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {codeOfConduct.lastUpdated}
          </p>
          <p>{codeOfConduct.intro}</p>
          {codeOfConduct.sections.map((section) => (
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
