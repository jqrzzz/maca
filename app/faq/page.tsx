import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/seo";
import { generalFaqs, giveFaqs } from "@/content/faqs";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Honest answers about who PRASM is, the Kayan community we support, giving, and how to help.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd([...generalFaqs, ...giveFaqs])} />

      <PageHero
        eyebrow="Questions"
        title="Frequently asked questions"
        lede="Honest answers about who we are, the community we support, and how to help."
      />

      <Section tone="cream">
        <SectionHeading eyebrow="About PRASM" title="The basics" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQ items={generalFaqs} />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Giving" title="Questions about donating" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQ items={giveFaqs} />
          <div className="mt-8 text-center">
            <Button href="/give" variant="primary">
              Ways to give
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
