import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import {
  transparencyIntro,
  howWeOperate,
  whereSupportGoes,
  statusStatement,
} from "@/content/transparency";

export const metadata: Metadata = buildMetadata({
  title: "Transparency",
  description:
    "How PRASM operates today — founder-led, direct to the community — and an honest note on our current legal status.",
  path: "/transparency",
});

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow={transparencyIntro.eyebrow}
        title={transparencyIntro.title}
        lede={transparencyIntro.lede}
      />

      {/* How we operate */}
      <Section tone="cream">
        <SectionHeading eyebrow="How it works" title="How we operate" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howWeOperate.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-[20px] border border-line bg-cream p-6 shadow-soft">
                <h3 className="text-h3 text-clay-700">{item.title}</h3>
                <p className="mt-2 text-stone">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Where support goes */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Your gift at work"
          title="Where support goes"
          lede="A plain breakdown of what donations make possible."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whereSupportGoes.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <div className="h-full rounded-[20px] bg-cream p-6">
                <h3 className="font-display text-lg font-semibold text-forest-700">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-stone">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honest status statement */}
      <Section tone="cream">
        <div className="mx-auto max-w-2xl rounded-[20px] border-l-4 border-gold-400 bg-sand p-8">
          <h2 className="text-h3">{statusStatement.title}</h2>
          <div className="mt-4 space-y-4 text-stone">
            {statusStatement.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Button href="/contact" variant="outline" className="mt-6">
            Ask us anything
          </Button>
        </div>
      </Section>
    </>
  );
}
