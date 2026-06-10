import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import {
  pressIntro,
  fastFacts,
  approvedDescriptions,
  mediaGuidelines,
  whatWeOffer,
  assets,
} from "@/content/press";

export const metadata: Metadata = buildMetadata({
  title: "Press & media kit",
  description:
    "Facts, approved descriptions, logo, and the ground rules for covering PRASM and the community it serves — safely and accurately.",
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow={pressIntro.eyebrow}
        title={pressIntro.title}
        lede={pressIntro.lede}
      />

      {/* Fast facts */}
      <Section tone="cream">
        <SectionHeading eyebrow="The basics" title="Fast facts" />
        <div className="mx-auto mt-10 max-w-3xl rounded-[20px] border border-line bg-cream p-8">
          <dl className="divide-y divide-line text-sm">
            {fastFacts.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="shrink-0 font-medium text-forest-700 sm:w-40">
                  {row.label}
                </dt>
                <dd className="text-stone">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Approved descriptions */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Copy-paste safe"
          title="Approved descriptions"
          lede="Use these verbatim — they're accurate at every length."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {approvedDescriptions.map((d, i) => (
            <Reveal key={d.label} delay={i * 70}>
              <figure className="rounded-[20px] border-l-4 border-gold-400 bg-cream p-6">
                <figcaption className="text-xs font-semibold tracking-wide text-clay-700 uppercase">
                  {d.label}
                </figcaption>
                <blockquote className="mt-2 text-stone">{d.text}</blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Ground rules */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="The lines we hold"
          title={mediaGuidelines.title}
          lede={mediaGuidelines.intro}
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <ul className="space-y-4">
            {mediaGuidelines.rules.map((rule, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className="rounded-[20px] border border-line bg-cream p-5 text-stone shadow-soft">
                  {rule}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* What we offer + assets */}
      <Section tone="sand">
        <SectionHeading eyebrow="Working with us" title="What we can offer" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whatWeOffer.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-[20px] bg-cream p-6">
                <h3 className="font-display text-lg font-semibold text-forest-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-stone">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[20px] border border-line bg-cream p-8 text-center">
          <h3 className="text-h3 text-clay-700">{assets.title}</h3>
          <p className="mt-2 text-stone">{assets.body}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {assets.files.map((f) => (
              <Button key={f.href} href={f.href} variant="outline">
                {f.label}
              </Button>
            ))}
            <Button href="/contact">Contact us</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
