"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Languages } from "lucide-react";

/**
 * A print-friendly guardian consent card for the Curiosity Program, drawn from
 * the script in docs/governance/curiosity-program-rollout.md. The steward reads
 * it to the family in their language, then fills the record by hand. The toolbar
 * hides when printing. This is an internal tool (noindex); it does not imply the
 * program is running.
 */
export function ConsentCard() {
  return (
    <div className="min-h-screen bg-sand px-4 py-8 print:bg-white print:p-0">
      {/* Toolbar (hidden when printing) */}
      <div className="mx-auto mb-4 flex max-w-2xl items-center justify-between print:hidden">
        <Link
          href="/preview"
          className="inline-flex items-center gap-1.5 text-sm text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to preview
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
        >
          <Printer className="h-4 w-4" aria-hidden />
          Print
        </button>
      </div>

      <article className="mx-auto max-w-2xl rounded-[20px] border border-line bg-cream p-8 shadow-soft print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
        <header className="flex items-start justify-between gap-3 border-b border-line pb-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-forest-700">
              Curiosity Program
            </h1>
            <p className="mt-0.5 text-sm text-stone">
              A learning club for the village. Consent card.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-medium text-stone print:hidden">
            <Languages className="h-3.5 w-3.5" aria-hidden />
            Read in their language
          </span>
        </header>

        <section className="mt-5 space-y-3 text-sm leading-relaxed text-ink">
          <p>
            Hello. Thank you for your time. I would like to invite your child to
            a small learning club, and you are free to say no. Saying no changes
            nothing else between your family and us.
          </p>
          <ul className="space-y-2">
            <li>
              <strong>What it is.</strong> Your child can sit with a friendly,
              safe helper and ask about anything they wonder about. A grown-up
              is always there. It is for learning and curiosity.
            </li>
            <li>
              <strong>What we keep.</strong> To begin, only a name or nickname
              and an age group. Nothing more without your agreement.
            </li>
            <li>
              <strong>A gift.</strong> If you like, we can print and frame a
              photo of your child for you to keep. We only keep a copy if you
              say it is alright.
            </li>
            <li>
              <strong>What we notice.</strong> When your child keeps getting
              excited about something, we notice it openly and tell you, so we
              can bring something helpful.
            </li>
            <li>
              <strong>It is free and voluntary.</strong> There is no payment for
              taking part, and nothing your child receives depends on sharing
              anything private. You can stop, or ask us to remove their record,
              at any time.
            </li>
            <li>
              <strong>A worry?</strong> Tell the steward, or contact PRASM
              directly, at any time.
            </li>
          </ul>
        </section>

        <section className="mt-6 border-t border-line pt-4">
          <h2 className="text-sm font-semibold text-forest-700">
            For the steward to complete with the family
          </h2>
          <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              "Child's name or nickname",
              "Age group",
              "Parent or guardian name",
              "Relationship to the child",
              "Language this was read in",
              "Date",
            ].map((label) => (
              <div key={label}>
                <div className="text-xs font-medium text-stone">{label}</div>
                <div className="mt-6 border-b border-ink/40" />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-ink">
            <span className="font-medium">Printed photo gift?</span>
            <span className="inline-flex items-center gap-2">
              Yes <span className="inline-block h-4 w-4 border border-ink/50" />
            </span>
            <span className="inline-flex items-center gap-2">
              No <span className="inline-block h-4 w-4 border border-ink/50" />
            </span>
          </div>

          <div className="mt-8">
            <div className="text-xs font-medium text-stone">
              Parent or guardian signature or mark
            </div>
            <div className="mt-8 border-b border-ink/40" />
          </div>
        </section>

        <p className="mt-6 text-xs text-stone">
          Consent is voluntary and can be withdrawn at any time. If it is
          withdrawn, the record is removed.
        </p>
      </article>
    </div>
  );
}
