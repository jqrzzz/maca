import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { privacy } from "@/content/legal/privacy";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description:
    "How PRASM handles the small amount of data this website involves.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {privacy.lastUpdated}
          </p>
          <p>{privacy.intro}</p>
          {privacy.sections.map((section) => (
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
