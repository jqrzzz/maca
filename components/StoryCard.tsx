import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Figure } from "@/components/Figure";
import { Badge } from "@/components/ui/Badge";
import { images } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { FieldNote } from "@/content/fieldNotes";

export function StoryCard({
  note,
  featured = false,
}: {
  note: FieldNote;
  featured?: boolean;
}) {
  const media = images[note.heroImage];
  const href = `/field-notes/${note.slug}`;

  return (
    <article
      className={cn(
        "group",
        featured && "grid items-center gap-8 lg:grid-cols-2",
      )}
    >
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <Figure
          media={{ ...media, ratio: featured ? "16/10" : "16/11" }}
          rounded="lg"
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </Link>
      <div className={cn(featured && "lg:pr-6")}>
        <div className="mt-5 flex items-center gap-3 lg:mt-0">
          {note.tag && <Badge tone="clay">{note.tag}</Badge>}
          <time dateTime={note.date} className="text-sm text-stone">
            {note.displayDate}
          </time>
        </div>
        <h3 className={cn("mt-3", featured ? "text-h2" : "text-h3")}>
          <Link
            href={href}
            className="transition-colors hover:text-clay-700"
          >
            {note.title}
          </Link>
        </h3>
        <p className="mt-3 text-stone">{note.excerpt}</p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 font-medium text-clay-700"
        >
          Read field note
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
