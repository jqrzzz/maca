import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/metadata";
import { getAllFieldNotes, getFeaturedFieldNote } from "@/content/fieldNotes";
import { newsletter } from "@/content/home";

export const metadata: Metadata = buildMetadata({
  title: "Field Notes",
  description:
    "Honest dispatches from a Kayan refugee village in Mae Hong Son — on identity, medical care, and off-grid life.",
  path: "/field-notes",
});

export default function FieldNotesPage() {
  const featured = getFeaturedFieldNote();
  const rest = getAllFieldNotes().filter((n) => n.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Field notes"
        title="Dispatches from the village"
        lede="First-hand notes on the people PRASM stands with — written with care, and with their dignity in mind."
      />

      {/* Featured */}
      <Section tone="cream">
        <StoryCard note={featured} featured />
      </Section>

      {/* Grid */}
      <Section tone="sand">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((note, i) => (
            <Reveal key={note.slug} delay={i * 70}>
              <StoryCard note={note} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
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
