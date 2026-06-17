import type { Metadata } from "next";
import {
  MessageSquare,
  Stethoscope,
  GraduationCap,
  Fingerprint,
  Check,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Quote } from "@/components/Quote";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import {
  aiIntro,
  aiThesis,
  aiAreasIntro,
  aiAreas,
  aiBuiltIntro,
  aiBuilt,
  aiCommitmentsIntro,
  aiCommitments,
  aiPartners,
  type AiAreaIcon,
} from "@/content/ai";

export const metadata: Metadata = buildMetadata({
  title: "Our approach to AI",
  description:
    "How PRASM uses AI: responsibly and people-first. A conscious foundation applying AI to education, health, and identity for stateless people, with humans deciding and the families always the face. Open to mission-aligned technology partners.",
  path: "/ai",
});

const areaIcons: Record<AiAreaIcon, React.ElementType> = {
  comms: MessageSquare,
  health: Stethoscope,
  education: GraduationCap,
  identity: Fingerprint,
};

export default function AiPage() {
  return (
    <>
      <PageHero
        eyebrow={aiIntro.eyebrow}
        title={aiIntro.title}
        lede={aiIntro.lede}
      />

      {/* Thesis */}
      <Section tone="cream">
        <div className="mx-auto max-w-3xl">
          <Quote attribution={aiThesis.attribution}>{aiThesis.quote}</Quote>
        </div>
      </Section>

      {/* Where AI helps */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={aiAreasIntro.eyebrow}
          title={aiAreasIntro.title}
          lede={aiAreasIntro.lede}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {aiAreas.map((area, i) => {
            const Icon = areaIcons[area.icon];
            return (
              <Reveal key={area.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-[20px] border border-line bg-cream p-7 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <Badge tone={area.status === "running" ? "gold" : "neutral"}>
                      {area.status === "running"
                        ? "Running today"
                        : "In development"}
                    </Badge>
                  </div>
                  <h3 className="text-h3 mt-5">{area.title}</h3>
                  <p className="mt-2 flex-1 text-stone">{area.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Already running, today */}
      <Section tone="cream">
        <SectionHeading
          eyebrow={aiBuiltIntro.eyebrow}
          title={aiBuiltIntro.title}
          lede={aiBuiltIntro.lede}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {aiBuilt.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="flex h-full gap-4 rounded-[20px] border border-line bg-cream p-6 shadow-soft">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                  <Check className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 text-clay-700">{item.title}</h3>
                  <p className="mt-1.5 text-stone">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Built responsibly: the conscious signal */}
      <Section tone="forest">
        <SectionHeading
          eyebrow={aiCommitmentsIntro.eyebrow}
          title={aiCommitmentsIntro.title}
          lede={aiCommitmentsIntro.lede}
          onDark
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {aiCommitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="flex gap-4">
                <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream">
                  <ShieldCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-cream">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-cream/75">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* For technology partners */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={aiPartners.eyebrow}
          title={aiPartners.title}
          lede={aiPartners.lede}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[aiPartners.offer, aiPartners.seek].map((col) => (
            <div
              key={col.title}
              className="rounded-[20px] border border-line bg-cream p-7 shadow-soft"
            >
              <h3 className="text-h3">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 text-stone">
                    <Check
                      className="mt-1 h-5 w-5 shrink-0 text-clay-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href={aiPartners.cta.href} variant="primary" size="lg">
            {aiPartners.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Section>

      <CTASection
        title="People first, always"
        body="AI is the engine room. The work, and the relationships that are the work, stay human."
        tone="forest"
        actions={[
          { label: "Meet the community", href: "/about" },
          { label: "See our governance", href: "/governance" },
        ]}
      />
    </>
  );
}
