import type { Metadata } from "next";
import {
  GraduationCap,
  HeartHandshake,
  Package,
  Share2,
} from "lucide-react";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import {
  getInvolvedIntro,
  ways,
  involveNote,
  type InvolveWay,
} from "@/content/getInvolved";

export const metadata: Metadata = buildMetadata({
  title: "Get Involved",
  description:
    "Teach, volunteer, donate supplies, or spread the word. Money is only one way to support the Karenni community MACA stands with.",
  path: "/get-involved",
});

const icons: Record<InvolveWay["icon"], React.ElementType> = {
  teach: GraduationCap,
  volunteer: HeartHandshake,
  goods: Package,
  share: Share2,
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow={getInvolvedIntro.eyebrow}
        title={getInvolvedIntro.title}
        lede={getInvolvedIntro.lede}
      />

      <Section tone="cream">
        <div className="grid gap-6 sm:grid-cols-2">
          {ways.map((way, i) => {
            const Icon = icons[way.icon];
            return (
              <Reveal key={way.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-[20px] border border-line bg-cream p-7 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="text-h3 mt-5">{way.title}</h3>
                  <p className="mt-2 flex-1 text-stone">{way.body}</p>
                  <Button
                    href={way.cta.href}
                    variant="outline"
                    className="mt-6 self-start"
                  >
                    {way.cta.label}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Coordinating note */}
      <Section tone="sand">
        <div className="mx-auto max-w-2xl rounded-[20px] border border-line bg-cream p-8 text-center">
          <h2 className="text-h3">{involveNote.title}</h2>
          <p className="mt-3 text-stone">{involveNote.body}</p>
        </div>
      </Section>

      <CTASection
        title="Prefer to give?"
        body="If supporting financially is easier, that helps just as much."
        tone="forest"
        actions={[{ label: "Ways to give", href: "/give" }]}
      />
    </>
  );
}
