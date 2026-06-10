import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { buildMetadata } from "@/lib/metadata";
import { donationPolicy } from "@/content/legal/donationPolicy";

export const metadata: Metadata = buildMetadata({
  title: "Donation & Refund Policy",
  description:
    "What your gift supports, our current tax status, and how refunds and recurring gifts work.",
  path: "/donation-policy",
});

export default function DonationPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Donation & Refund Policy" />

      <Section tone="cream">
        <Prose>
          <p className="text-sm text-stone">
            Last updated: {donationPolicy.lastUpdated}
          </p>
          <p>{donationPolicy.intro}</p>
          {donationPolicy.sections.map((section) => (
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
