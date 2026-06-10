import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "@/components/ui/Prose";
import { Figure } from "@/components/Figure";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import { images } from "@/lib/images";
import { needIntro, needSections, consequences } from "@/content/need";

export const metadata: Metadata = buildMetadata({
  title: "The Need",
  description:
    "The families PRASM supports fled war in Myanmar and now live without papers in Thailand, shut out of school and healthcare, unable to prove they exist.",
  path: "/the-need",
});

export default function TheNeedPage() {
  return (
    <>
      <PageHero
        eyebrow={needIntro.eyebrow}
        title={needIntro.title}
        lede={needIntro.lede}
      />

      {/* Fleeing war */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Prose>
            <h2>{needSections[0].title}</h2>
            {needSections[0].body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Prose>
          <Figure
            media={images.needWar}
            rounded="xl"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </Section>

      {/* Living as ghosts */}
      <Section tone="sand">
        <Prose>
          <h2>{needSections[1].title}</h2>
          {needSections[1].body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </Section>

      {/* Consequences grid */}
      <Section tone="cream">
        <SectionHeading eyebrow="The cost" title={needSections[2].title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {consequences.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="h-full rounded-[20px] border border-line bg-cream p-6 shadow-soft">
                <h3 className="text-h3 text-clay-700">{c.title}</h3>
                <p className="mt-2 text-stone">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Not helplessness */}
      <Section tone="forest">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="And yet"
            title={needSections[3].title}
            onDark
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-cream/85">
            {needSections[3].body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        tone="sand"
        title="Help open a locked door"
        body="Care, schooling, and a way to be seen: small things that change everything."
        actions={[
          { label: "Donate", href: "/give" },
          { label: "See what we do", href: "/programs" },
        ]}
      />
    </>
  );
}
