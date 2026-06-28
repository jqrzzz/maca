"use client";

import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Mic,
  Volume2,
  NotebookPen,
  HeartHandshake,
  Lock,
  Sparkles,
  Sprout,
  Gift,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { stewardGuide } from "@/content/onboarding";
import { card } from "./ui";

const icons: Record<string, React.ElementType> = {
  users: Users,
  shield: ShieldCheck,
  speak: Mic,
  listen: Volume2,
  note: NotebookPen,
  consent: HeartHandshake,
  lock: Lock,
};

const Icon = ({ name }: { name: string }) => {
  const C = icons[name] ?? Sparkles;
  return <C className="h-5 w-5" strokeWidth={1.75} aria-hidden />;
};

/**
 * A simple, mostly-visual orientation for the village steward: what it is, why
 * it helps, the weekly routine, and the safety rules. Built to be shown and read
 * aloud. With `printable`, it shows a print toolbar and prints as a clean page.
 */
export function StewardGuide({ printable = false }: { printable?: boolean }) {
  const g = stewardGuide;
  return (
    <div
      className={
        printable
          ? "min-h-screen bg-sand px-4 py-8 print:bg-white print:p-0"
          : ""
      }
    >
      {printable && (
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
      )}

      <article
        className={
          printable
            ? "mx-auto max-w-2xl rounded-[20px] border border-line bg-cream p-8 shadow-soft print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none"
            : `${card} p-6`
        }
      >
        <header className="flex items-center gap-3 border-b border-line pb-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
            <Sparkles className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-forest-700">
              The steward&apos;s guide
            </h1>
            <p className="mt-0.5 text-sm text-stone">Curiosity Program</p>
          </div>
        </header>

        <p className="mt-4 text-sm leading-relaxed text-ink">{g.intro}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[14px] bg-sand p-4">
            <div className="flex items-center gap-2 text-forest-700">
              <Sparkles className="h-5 w-5 text-clay-600" aria-hidden />
              <h2 className="font-display text-base font-semibold">
                {g.whatItIs.heading}
              </h2>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">
              {g.whatItIs.body}
            </p>
          </div>
          <div className="rounded-[14px] bg-sand p-4">
            <div className="flex items-center gap-2 text-forest-700">
              <Sprout className="h-5 w-5 text-clay-600" aria-hidden />
              <h2 className="font-display text-base font-semibold">
                {g.whyItHelps.heading}
              </h2>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">
              {g.whyItHelps.body}
            </p>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="font-display text-lg font-semibold text-forest-700">
            {g.routineHeading}
          </h2>
          <ol className="mt-3 space-y-2.5">
            {g.routine.map((step, i) => (
              <li
                key={step.text}
                className="flex items-center gap-3 rounded-[14px] border border-line bg-cream p-3"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                  <Icon name={step.icon} />
                </span>
                <span className="text-sm text-ink">{step.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-lg font-semibold text-forest-700">
            {g.rulesHeading}
          </h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {g.rules.map((rule) => (
              <li
                key={rule.text}
                className="rounded-[14px] border border-clay-300/40 bg-clay-50 p-3"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-clay-600">
                  <Icon name={rule.icon} />
                </span>
                <p className="mt-2 text-sm text-clay-700">{rule.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 flex items-start gap-3 rounded-[14px] bg-forest-500/10 p-4">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-forest-700">
            <Gift className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold text-forest-700">
              {g.support.heading}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone">
              {g.support.body}
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
