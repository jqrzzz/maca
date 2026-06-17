import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { responsibleAi } from "@/content/legal/responsibleAi";

export const metadata: Metadata = buildMetadata({
  title: "Responsible AI Policy",
  description:
    "How PRASM uses AI responsibly: human oversight, data protection, fairness, transparency, and clear red lines. Aligned with the OECD AI Principles, the NIST AI Risk Management Framework, and the UNESCO Recommendation on the Ethics of AI.",
  path: "/responsible-ai",
});

export default function ResponsibleAiPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Responsible AI Policy"
        lede="The principles and limits that govern every way we use AI. People first, humans deciding, sensitive data protected."
      />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {responsibleAi.lastUpdated}
          </p>
          <p>{responsibleAi.intro}</p>
          {responsibleAi.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}
          <p className="text-sm text-stone">
            See also our{" "}
            <Link href="/ai">approach to AI</Link>, our{" "}
            <Link href="/privacy">Privacy policy</Link>, and our{" "}
            <Link href="/safeguarding">Safeguarding policy</Link>.
          </p>
        </Prose>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/ai" variant="outline">
            Our approach to AI
          </Button>
          <Button href="/governance" variant="outline">
            Governance &amp; policies
          </Button>
        </div>
      </Section>
    </>
  );
}
