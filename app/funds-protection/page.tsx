import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { fundsProtection } from "@/content/legal/fundsProtection";

export const metadata: Metadata = buildMetadata({
  title: "Protecting your gift",
  description:
    "How PRASM safeguards donations and guards against fraud or diversion, including crypto, in-kind, and wire transfers to a remote border community.",
  path: "/funds-protection",
});

export default function FundsProtectionPage() {
  return (
    <>
      <PageHero eyebrow="Your gift, protected" title="Protecting your gift" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {fundsProtection.lastUpdated}
          </p>
          <p>{fundsProtection.intro}</p>
          {fundsProtection.sections.map((section) => (
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
