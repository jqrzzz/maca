import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/Figure";
import { Prose } from "@/components/ui/Prose";
import { Quote } from "@/components/Quote";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import { images } from "@/lib/images";
import { founderHero, founderApproach, founderCta } from "@/content/founder";
import { founderStory } from "@/content/about";
import { founderNote } from "@/content/home";

export const metadata: Metadata = buildMetadata({
  title: "The Founder",
  description:
    "PRASM was founded by a practicing physician who cares for Kayan refugee families and built the first records that let an undocumented child prove they exist.",
  path: "/founder",
});

export default function FounderPage() {
  return (
    <>
      <PageHero
        eyebrow={founderHero.eyebrow}
        title={founderHero.title}
        lede={founderHero.lede}
      />

      {/* Founder quote */}
      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <Quote attribution={founderNote.attribution}>
            {founderNote.quote}
          </Quote>
        </div>
      </Section>

      {/* The story */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Prose>
            {founderStory.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Prose>
          <div className="lg:pt-2">
            <Figure
              media={images.programsMedical}
              rounded="xl"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </Section>

      {/* How a doctor sees this */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={founderApproach.eyebrow}
          title={founderApproach.title}
          lede={founderApproach.lede}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {founderApproach.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 70}>
              <div className="h-full rounded-[20px] border border-line bg-cream p-6">
                <h3 className="font-display text-xl font-semibold text-forest-700">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title={founderCta.title}
        body={founderCta.body}
        actions={[
          { label: "Donate", href: "/give" },
          { label: "Read our full story", href: "/about" },
        ]}
      />
    </>
  );
}
