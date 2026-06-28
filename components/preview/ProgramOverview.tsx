"use client";

import Link from "next/link";
import {
  Sparkles,
  Mountain,
  BookOpen,
  ListChecks,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  Target,
  Printer,
  ArrowLeft,
  Sprout,
} from "lucide-react";
import { programOverview } from "@/content/overview";
import { card } from "./ui";

const SectionTitle = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <h2 className="flex items-center gap-2 font-display text-base font-semibold text-forest-700">
    <Icon className="h-4 w-4 text-clay-600" strokeWidth={1.75} aria-hidden />
    {children}
  </h2>
);

/**
 * A one-page program overview for foundation and donor conversations. Honest
 * about stage (a pilot in preparation, not a running service), dignity-first,
 * and safety as a precondition. With `printable` it shows a print toolbar and
 * prints as a clean single page; otherwise it renders as an embeddable card.
 */
export function ProgramOverview({
  printable = false,
}: {
  printable?: boolean;
}) {
  const o = programOverview;
  return (
    <div
      className={
        printable
          ? "min-h-screen bg-sand px-4 py-8 print:bg-white print:p-0"
          : ""
      }
    >
      {printable && (
        <div className="mx-auto mb-4 flex max-w-3xl items-center justify-between print:hidden">
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
      )}

      <article
        className={
          printable
            ? "mx-auto max-w-3xl rounded-[20px] border border-line bg-cream p-8 shadow-soft print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none"
            : `${card} p-6`
        }
      >
        {/* Header */}
        <header className="border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
              <Sparkles className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold text-forest-700">
                {o.title}
              </h1>
              <p className="mt-0.5 text-sm text-stone">A one-page overview</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink">{o.tagline}</p>
          <p className="mt-3 inline-flex items-start gap-2 rounded-full bg-gold-400/15 px-3 py-1.5 text-xs font-medium text-clay-700 ring-1 ring-gold-400/30 ring-inset">
            <Lightbulb className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {o.status}
          </p>
        </header>

        {/* Need + What */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <section className="rounded-[14px] bg-sand p-4">
            <SectionTitle icon={Mountain}>{o.need.heading}</SectionTitle>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">
              {o.need.body}
            </p>
          </section>
          <section className="rounded-[14px] bg-sand p-4">
            <SectionTitle icon={BookOpen}>{o.what.heading}</SectionTitle>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">
              {o.what.body}
            </p>
          </section>
        </div>

        {/* How it works */}
        <section className="mt-5">
          <SectionTitle icon={ListChecks}>{o.how.heading}</SectionTitle>
          <ol className="mt-2 grid gap-2 sm:grid-cols-2">
            {o.how.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-2.5 text-sm">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-600 text-xs font-semibold text-cream">
                  {i + 1}
                </span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Safety */}
        <section className="mt-5 rounded-[14px] bg-forest-500/10 p-4">
          <SectionTitle icon={ShieldCheck}>{o.safety.heading}</SectionTitle>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {o.safety.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink">
                <ShieldCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-700"
                  aria-hidden
                />
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Why now */}
        <section className="mt-5 flex items-start gap-3 rounded-[14px] border-l-4 border-clay-300 bg-sand p-4">
          <Lightbulb
            className="mt-0.5 h-5 w-5 shrink-0 text-clay-600"
            aria-hidden
          />
          <div>
            <SectionTitle icon={Lightbulb}>{o.whyNow.heading}</SectionTitle>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">
              {o.whyNow.body}
            </p>
          </div>
        </section>

        {/* Support */}
        <section className="mt-5">
          <SectionTitle icon={HeartHandshake}>{o.support.heading}</SectionTitle>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {o.support.items.map((item) => (
              <div
                key={item.label}
                className="rounded-[14px] border border-line p-3"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-forest-700">
                  <Sprout className="h-4 w-4 text-clay-600" aria-hidden />
                  {item.label}
                </div>
                <p className="mt-1 text-sm text-stone">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success */}
        <section className="mt-5">
          <SectionTitle icon={Target}>{o.success.heading}</SectionTitle>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {o.success.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink">
                <Target
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay-600"
                  aria-hidden
                />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-stone">
          {o.footer}
        </p>
      </article>
    </div>
  );
}
