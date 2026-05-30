import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProgramCard } from "@/components/ProgramCard";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import {
  programsIntro,
  activePrograms,
  roadmap,
} from "@/content/programs";

export const metadata: Metadata = buildMetadata({
  title: "What We Do",
  description:
    "MACA covers urgent medical care and builds records, supports education and off-grid living — and is building toward identity, digital records, and AI-assisted care.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow={programsIntro.eyebrow}
        title={programsIntro.title}
        lede={programsIntro.lede}
      />

      {/* Active programs — detailed */}
      <Section tone="cream">
        <div className="space-y-16">
          {activePrograms.map((program, i) => (
            <Reveal key={program.slug}>
              <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
                <div>
                  <ProgramCard
                    icon={program.icon}
                    title={program.title}
                    summary={program.summary}
                  />
                </div>
                <div className="lg:pt-2">
                  <div className="space-y-4 text-lg leading-relaxed text-ink">
                    {program.body.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Roadmap */}
      <Section tone="sand" id="roadmap">
        <SectionHeading
          eyebrow={roadmap.eyebrow}
          title={roadmap.title}
          lede={roadmap.lede}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roadmap.items.map((item, i) => (
            <Reveal key={item.slug} delay={i * 80}>
              <ProgramCard
                icon={item.icon}
                title={item.title}
                summary={item.summary}
                status="planned"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Fund the work — and what comes next"
        body="Today it's care, records, and education. Tomorrow it's identity for people the world can't see. Your gift builds both."
        actions={[
          { label: "Donate", href: "/give" },
          { label: "Get involved", href: "/get-involved" },
        ]}
      />
    </>
  );
}
