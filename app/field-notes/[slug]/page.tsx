import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Figure } from "@/components/Figure";
import { Badge } from "@/components/ui/Badge";
import { FieldNoteBody } from "@/components/FieldNoteBody";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/metadata";
import { images } from "@/lib/images";
import {
  getAllFieldNotes,
  getFieldNote,
  getAdjacentFieldNotes,
} from "@/content/fieldNotes";

export function generateStaticParams() {
  return getAllFieldNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata(
  props: PageProps<"/field-notes/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getFieldNote(slug);
  if (!note) return {};
  return buildMetadata({
    title: note.title,
    description: note.excerpt,
    path: `/field-notes/${note.slug}`,
  });
}

export default async function FieldNotePage(
  props: PageProps<"/field-notes/[slug]">,
) {
  const { slug } = await props.params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  const { prev, next } = getAdjacentFieldNotes(slug);
  const media = images[note.heroImage];

  return (
    <>
      <article>
        {/* Header */}
        <Container size="prose" className="pt-16 md:pt-24">
          <Link
            href="/field-notes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-700 hover:text-clay-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All field notes
          </Link>
          <div className="mt-6 flex items-center gap-3">
            {note.tag && <Badge tone="clay">{note.tag}</Badge>}
            <time dateTime={note.date} className="text-sm text-stone">
              {note.displayDate}
            </time>
          </div>
          <h1 className="text-h1 mt-4">{note.title}</h1>
          <p className="text-lede mt-5 text-stone">{note.excerpt}</p>
        </Container>

        {/* Hero image */}
        <Container size="prose" className="mt-10">
          <Figure
            media={{ ...media, ratio: "16/9" }}
            rounded="xl"
            sizes="(min-width: 768px) 46rem, 100vw"
          />
        </Container>

        {/* Body */}
        <Container size="prose" className="mt-12 pb-8">
          <FieldNoteBody blocks={note.body} />
        </Container>

        {/* Prev / next */}
        {(prev || next) && (
          <Container size="prose" className="border-t border-line py-10">
            <div className="flex justify-between gap-4">
              {prev ? (
                <Link
                  href={`/field-notes/${prev.slug}`}
                  className="group max-w-[45%]"
                >
                  <span className="flex items-center gap-1.5 text-sm text-stone">
                    <ArrowLeft className="h-4 w-4" aria-hidden /> Previous
                  </span>
                  <span className="mt-1 block font-medium text-forest-700 group-hover:text-clay-700">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/field-notes/${next.slug}`}
                  className="group max-w-[45%] text-right"
                >
                  <span className="flex items-center justify-end gap-1.5 text-sm text-stone">
                    Next <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="mt-1 block font-medium text-forest-700 group-hover:text-clay-700">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </Container>
        )}
      </article>

      <CTASection
        title="Support the work behind these notes"
        body="Every story here is made possible by people who choose to give."
        actions={[
          { label: "Donate", href: "/give" },
          { label: "Get involved", href: "/get-involved" },
        ]}
      />
    </>
  );
}
