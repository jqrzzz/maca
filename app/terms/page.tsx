import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { terms } from "@/content/legal/terms";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The plain-language terms that govern use of the PRASM website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">Last updated: {terms.lastUpdated}</p>
          <p>{terms.intro}</p>
          {terms.sections.map((section) => (
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
