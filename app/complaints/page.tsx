import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { complaints } from "@/content/legal/complaints";

export const metadata: Metadata = buildMetadata({
  title: "Complaints & feedback",
  description:
    "How to raise a concern with PRASM. For the community we serve, supporters, volunteers, and partners. Handled in confidence.",
  path: "/complaints",
});

export default function ComplaintsPage() {
  return (
    <>
      <PageHero eyebrow="Tell us" title="Complaints & feedback" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {complaints.lastUpdated}
          </p>
          <p>{complaints.intro}</p>
          {complaints.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}
          <p>
            <Button href="/contact">Raise a concern</Button>
          </p>
        </Prose>
      </Section>
    </>
  );
}
