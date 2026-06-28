"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  UserPlus,
  Mic,
  Sprout,
  NotebookPen,
  ShieldCheck,
  Users,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  MessageSquareQuote,
  CircleCheck,
  Sparkles,
} from "lucide-react";
import { firstSession } from "@/content/onboarding";
import { card } from "./ui";

const icons: Record<string, React.ElementType> = {
  consent: HeartHandshake,
  welcome: UserPlus,
  speak: Mic,
  sprout: Sprout,
  note: NotebookPen,
  shield: ShieldCheck,
  users: Users,
  listen: Volume2,
};

const StepIcon = ({ name }: { name: string }) => {
  const C = icons[name] ?? Sparkles;
  return <C className="h-6 w-6" strokeWidth={1.75} aria-hidden />;
};

// Read a step aloud, for a steward who may not read fluently.
function speak(text: string) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  if (!synth) return;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  synth.speak(utterance);
}

/**
 * A calm, step-by-step rehearsal of one visit. The steward can practice it as
 * many times as they like before doing it for real. It mirrors the live demo
 * flow and can be read aloud. With `standalone`, it renders as its own page with
 * a back link; otherwise it renders as a card to embed.
 */
export function GuidedSession({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { intro, steps, done } = firstSession;
  const [i, setI] = useState(0);
  const [finished, setFinished] = useState(false);
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    if (!readAloud || finished) return;
    const s = steps[i];
    speak([s.title, s.you, s.say].filter(Boolean).join(". "));
  }, [i, readAloud, finished, steps]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const last = i === steps.length - 1;
  const next = () => (last ? setFinished(true) : setI((n) => n + 1));
  const back = () => setI((n) => Math.max(0, n - 1));
  const restart = () => {
    setI(0);
    setFinished(false);
  };
  const toggleAloud = () =>
    setReadAloud((v) => {
      if (v) window.speechSynthesis?.cancel();
      return !v;
    });

  const step = steps[i];

  const body = (
    <div className={`${card} p-6`}>
      {!finished ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-stone">
              Step {i + 1} of {steps.length}
            </span>
            <button
              type="button"
              onClick={toggleAloud}
              aria-pressed={readAloud}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 transition-colors ring-inset ${
                readAloud
                  ? "bg-clay-600 text-cream ring-clay-600"
                  : "bg-sand text-stone ring-line hover:bg-cream"
              }`}
            >
              {readAloud ? (
                <Volume2 className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <VolumeX className="h-3.5 w-3.5" aria-hidden />
              )}
              Read aloud
            </button>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-clay-600 transition-all"
              style={{ width: `${((i + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Step */}
          <div className="mt-5 flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
              <StepIcon name={step.icon} />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold text-forest-700">
                {step.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">
                {step.you}
              </p>
            </div>
          </div>

          {step.say && (
            <div className="mt-4 rounded-[14px] border-l-4 border-clay-300 bg-sand p-4">
              <div className="flex items-center gap-1.5 text-xs font-medium text-stone">
                <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden />
                What you can say
              </div>
              <p className="mt-1 text-sm leading-relaxed text-forest-700 italic">
                &ldquo;{step.say}&rdquo;
              </p>
            </div>
          )}

          {step.safety && (
            <div className="mt-3 inline-flex items-start gap-2 rounded-full bg-forest-500/10 px-3 py-1.5 text-xs font-medium text-forest-700 ring-1 ring-forest-500/20 ring-inset">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {step.safety}
            </div>
          )}

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={i === 0}
              className="inline-flex h-10 items-center gap-1.5 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
            >
              {last ? "Finish" : "Next"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest-500/10 text-forest-700">
            <CircleCheck className="h-7 w-7" aria-hidden />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold text-forest-700">
            {done.heading}
          </h2>
          <p className="mt-1.5 text-sm text-stone">{done.body}</p>

          <div className="mx-auto mt-5 max-w-md rounded-[16px] bg-sand p-4 text-left">
            <p className="text-xs font-semibold tracking-wide text-stone uppercase">
              What happens next
            </p>
            <ul className="mt-2 space-y-2">
              {done.next.map((n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-ink">
                  <Sprout
                    className="mt-0.5 h-4 w-4 shrink-0 text-clay-600"
                    aria-hidden
                  />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={restart}
              className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Practice again
            </button>
            <Link
              href="/preview"
              className="inline-flex h-10 items-center gap-1.5 rounded-[14px] border border-line px-5 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Open the demo
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  if (!standalone) return body;

  return (
    <div className="min-h-screen bg-sand px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/preview"
            className="inline-flex items-center gap-1.5 text-sm text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to preview
          </Link>
        </div>
        <header className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
            <Sparkles className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-forest-700">
              Practice a first session
            </h1>
            <p className="mt-0.5 text-sm text-stone">{intro}</p>
          </div>
        </header>
        {body}
      </div>
    </div>
  );
}
