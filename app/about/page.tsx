import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/Figure";
import { Prose } from "@/components/ui/Prose";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import { images } from "@/lib/images";
import {
  aboutIntro,
  founderStory,
  missionVision,
  village,
  values,
} from "@/content/about";

export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "How PRASM grew out of a doctor's visits to a Kayan refugee village, and the realization that medicine alone wasn't enough.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.title}
        lede={aboutIntro.lede}
      />

      {/* Founder story */}
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

      {/* Mission & vision */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={missionVision.eyebrow}
          title={missionVision.title}
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {[missionVision.mission, missionVision.vision].map((m) => (
            <div
              key={m.label}
              className="rounded-[20px] border border-line bg-cream p-8 shadow-soft"
            >
              <p className="text-[0.8125rem] font-semibold tracking-[0.12em] text-clay-600 uppercase">
                {m.label}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The village */}
      <Section tone="cream">
        <SectionHeading
          eyebrow={village.eyebrow}
          title={village.title}
          lede={village.lede}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {village.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 70}>
              <div className="h-full rounded-[20px] border border-line bg-sand p-6">
                <h3 className="text-h3 text-clay-700">{point.title}</h3>
                <p className="mt-2 text-stone">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={values.eyebrow}
          title={values.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.items.map((value, i) => (
            <Reveal key={value.title} delay={i * 70}>
              <div className="h-full rounded-[20px] bg-cream p-6">
                <h3 className="font-display text-xl font-semibold text-forest-700">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Stand with this community"
        body="Your support keeps people well, in school, and visible to a world that overlooked them."
        actions={[
          { label: "Donate", href: "/give" },
          { label: "Get involved", href: "/get-involved" },
        ]}
      />
    </>
  );
}
