import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ProgramCard } from "@/components/ProgramCard";
import { StatGrid } from "@/components/StatCard";
import { StoryCard } from "@/components/StoryCard";
import { PhotoStrip } from "@/components/PhotoStrip";
import { Quote } from "@/components/Quote";
import { Figure } from "@/components/Figure";
import { CTASection } from "@/components/CTASection";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SupporterAvatar } from "@/components/SupporterAvatar";
import { images } from "@/lib/images";
import {
  hero,
  mission,
  crisisTeaser,
  programsTeaser,
  founderNote,
  waysToHelp,
  donateCtaBand,
  newsletter,
} from "@/content/home";
import { activePrograms } from "@/content/programs";
import { stats } from "@/content/stats";
import { getFeaturedFieldNote } from "@/content/fieldNotes";
import { supporterTiers } from "@/content/supporters";

export default function HomePage() {
  const featured = getFeaturedFieldNote();
  const featuredSupporters = supporterTiers
    .flatMap((t) => t.supporters)
    .slice(0, 8);

  return (
    <>
      {/* 1+2. Hero */}
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        actions={[
          { label: "Donate", href: "/give" },
          { label: "Our Story", href: "/about" },
        ]}
      />

      {/* 3. Mission band */}
      <Section tone="cream">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl leading-snug text-forest-700 md:text-3xl">
            {mission.statement}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {mission.values.map((v) => (
              <Badge key={v} tone="gold" className="px-4 py-1.5 text-sm">
                {v}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. The crisis / why */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={crisisTeaser.eyebrow}
          title={crisisTeaser.title}
          lede={crisisTeaser.lede}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {crisisTeaser.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 80}>
              <div className="h-full rounded-[20px] border border-line bg-cream p-6">
                <h3 className="text-h3 text-clay-700">{point.title}</h3>
                <p className="mt-2 text-stone">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/the-need" variant="outline">
            Understand the need
          </Button>
        </div>
      </Section>

      {/* 5. Programs */}
      <Section tone="cream">
        <SectionHeading
          eyebrow={programsTeaser.eyebrow}
          title={programsTeaser.title}
          lede={programsTeaser.lede}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activePrograms.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProgramCard icon={p.icon} title={p.title} summary={p.summary} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-stone">
          Looking further ahead, we&apos;re building toward{" "}
          <Link
            href="/programs#roadmap"
            className="font-medium text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
          >
            identity, digital records, and AI-assisted care
          </Link>
          : the reason PRASM exists as a foundation.
        </p>
      </Section>

      {/* 6. Impact stats */}
      <Section tone="forest">
        <SectionHeading
          eyebrow="Together so far"
          title="What this community is building"
          lede="Every figure is something held up by supporters like you."
          onDark
        />
        <div className="mt-12">
          <StatGrid stats={stats} />
        </div>
      </Section>

      {/* 7. Featured field note */}
      <Section tone="cream">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Field notes"
            title="Stories from the village"
          />
          <Button
            href="/field-notes"
            variant="ghost"
            className="hidden shrink-0 sm:inline-flex"
          >
            All field notes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <StoryCard note={featured} featured />
      </Section>

      {/* 8. Photo strip */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Life in the hills"
          title="Off-grid, by craft and by necessity"
          lede="Dirt roads and bamboo homes, gardens and free-roaming chickens, firewood for the cooking fire: a community living lightly off the grid."
        />
        <div className="mt-10">
          <PhotoStrip
            keys={[
              "villageStreet",
              "villageGarden",
              "villageWoodfire",
              "villageHomes",
              "villageAnimals",
              "villageLife",
            ]}
          />
        </div>
      </Section>

      {/* 9. Founder note */}
      <Section tone="cream">
        <div className="grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Figure
            media={images.founderPortrait}
            rounded="xl"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mx-auto max-w-sm"
          />
          <div>
            <p className="mb-5 text-[0.8125rem] font-semibold tracking-[0.12em] text-clay-600 uppercase">
              {founderNote.eyebrow}
            </p>
            <Quote attribution={founderNote.attribution}>
              {founderNote.quote}
            </Quote>
            <Button href="/about" variant="outline" className="mt-7">
              Read our story
            </Button>
          </div>
        </div>
      </Section>

      {/* 10. Ways to help */}
      <Section tone="sand">
        <SectionHeading
          eyebrow={waysToHelp.eyebrow}
          title={waysToHelp.title}
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {[waysToHelp.give, waysToHelp.involved].map((card, i) => (
            <Reveal key={card.href} delay={i * 90}>
              <div className="flex h-full flex-col rounded-[20px] border border-line bg-cream p-8">
                <h3 className="text-h3">{card.title}</h3>
                <p className="mt-3 flex-1 text-stone">{card.body}</p>
                <Button
                  href={card.href}
                  variant={i === 0 ? "primary" : "outline"}
                  className="mt-6 self-start"
                >
                  {card.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10b. Our supporters */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="With gratitude"
          title="Our supporters"
          lede="PRASM runs on the generosity of a small circle of people. With thanks to the ones making this work possible."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {featuredSupporters.map((s, i) => (
            <div
              key={s.name + i}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-sand py-1.5 pr-4 pl-1.5"
            >
              <SupporterAvatar name={s.name} size="sm" />
              <span className="text-sm font-medium text-forest-700">
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/supporters" variant="outline">
            See our supporters
          </Button>
        </div>
      </Section>

      {/* 11. Donate CTA band */}
      <CTASection
        title={donateCtaBand.title}
        body={donateCtaBand.body}
        actions={[
          { label: donateCtaBand.cta, href: "/give" },
          { label: "Other ways to help", href: "/get-involved" },
        ]}
      />

      {/* 12. Newsletter */}
      <Section tone="cream">
        <div className="mx-auto max-w-xl text-center">
          <SectionHeading
            title={newsletter.title}
            lede={newsletter.body}
            align="center"
            className="mx-auto"
          />
          <NewsletterForm className="mt-8" />
        </div>
      </Section>
    </>
  );
}
