import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import {
  governanceIntro,
  howGoverned,
  policySuite,
} from "@/content/governance";

export const metadata: Metadata = buildMetadata({
  title: "Governance & policies",
  description:
    "How PRASM is run (founder-led, building toward a board) and the policy suite we hold ourselves to.",
  path: "/governance",
});

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow={governanceIntro.eyebrow}
        title={governanceIntro.title}
        lede={governanceIntro.lede}
      />

      {/* How we're governed */}
      <Section tone="cream">
        <SectionHeading eyebrow="How we're run" title="Governance" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howGoverned.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-[20px] border border-line bg-cream p-6 shadow-soft">
                <h3 className="text-h3 text-clay-700">{item.title}</h3>
                <p className="mt-2 text-stone">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The policy suite */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="What we hold ourselves to"
          title="Our policies"
          lede="The commitments behind the work. We're adding to these as we grow."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {policySuite.map((p, i) => (
            <Reveal key={p.href} delay={i * 60}>
              <Link
                href={p.href}
                className="group block h-full rounded-[20px] border border-line bg-cream p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-display text-lg font-semibold text-forest-700 transition-colors group-hover:text-clay-700">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-stone">{p.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone">
            For how we operate day to day and our current legal status, see our
            Transparency page.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button href="/transparency" variant="outline">
              Transparency &amp; status
            </Button>
            <Button href="/contact" variant="outline">
              Ask us anything
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
