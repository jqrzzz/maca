"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Volume2,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Languages,
  MessageCircle,
  HandHeart,
  Stethoscope,
  RotateCcw,
} from "lucide-react";
import { card } from "./ui";
import { useLocale, setLocale } from "./localeStore";
import { localeLabel, locales, type Locale } from "@/content/i18n";
import { phraseSets, type PhraseSet } from "@/content/languageCenter";

const setIcons: Record<string, React.ElementType> = {
  greet: MessageCircle,
  help: HandHeart,
  clinic: Stethoscope,
};

// Read an English phrase aloud, with an English voice.
function speakEnglish(text: string) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  synth.speak(u);
}

const phraseKey = (setId: string, english: string) => `${setId}|${english}`;

/**
 * The Language Center: an AI-teacher skin that meets the learner in their own
 * language and teaches English. In this demo the lessons are a fixed, safe set
 * of useful phrases the device reads aloud; the real teacher speaks the
 * learner's language and adapts. English-first and honest: no fabricated Kayan
 * or Thai, and nothing is saved.
 */
export function LanguageCenter() {
  const locale = useLocale();
  const [active, setActive] = useState<PhraseSet | null>(null);
  const [i, setI] = useState(0);
  const [known, setKnown] = useState<string[]>([]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const openSet = (s: PhraseSet) => {
    setActive(s);
    setI(0);
  };
  const exitSet = () => {
    window.speechSynthesis?.cancel();
    setActive(null);
    setI(0);
  };

  const toggleKnown = (key: string) =>
    setKnown((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <div className="space-y-4">
      {/* Teacher header */}
      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
            <GraduationCap className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold text-forest-700">
              Language center
            </h3>
            <p className="text-sm text-stone">Learn English, at your pace</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone">
          <Languages className="h-3.5 w-3.5 text-clay-600" aria-hidden />
          <label htmlFor="lang-center-lang">Your teacher speaks:</label>
          <select
            id="lang-center-lang"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="rounded-full border border-line bg-cream px-2.5 py-1 text-xs font-medium text-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          >
            {locales.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {locale === "en"
            ? "Pick a set and practice. Tap Say it to hear each phrase."
            : `Your teacher explains in ${localeLabel(locale)}. The phrases are in English to learn. Tap Say it to hear each one.`}
        </p>
      </div>

      {!active ? (
        /* Set picker */
        <div className="grid gap-3 sm:grid-cols-3">
          {phraseSets.map((s) => {
            const Icon = setIcons[s.icon] ?? Sparkles;
            const done = s.phrases.filter((p) =>
              known.includes(phraseKey(s.id, p.english)),
            ).length;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => openSet(s)}
                className={`flex flex-col items-start gap-3 ${card} p-5 text-left transition-colors hover:bg-sand/60`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <span className="block font-medium text-forest-700">
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-stone">
                    {s.phrases.length} phrases
                    {done > 0 ? ` · ${done} known` : ""}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Phrase deck */
        <div className={`${card} p-6`}>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={exitSet}
              className="hover:text-clay-800 inline-flex items-center gap-1.5 text-sm font-medium text-clay-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All sets
            </button>
            <span className="text-xs font-medium text-stone">
              {i + 1} of {active.phrases.length}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-clay-600 transition-all"
              style={{ width: `${((i + 1) / active.phrases.length) * 100}%` }}
            />
          </div>

          {(() => {
            const p = active.phrases[i];
            const key = phraseKey(active.id, p.english);
            const isKnown = known.includes(key);
            const last = i === active.phrases.length - 1;
            return (
              <>
                <div className="mt-6 text-center">
                  <p className="font-display text-3xl leading-tight text-forest-700">
                    {p.english}
                  </p>
                  <p className="mt-2 text-sm text-stone">{p.meaning}</p>
                </div>

                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => speakEnglish(p.english)}
                    className="inline-flex h-12 items-center gap-2 rounded-[14px] bg-clay-600 px-6 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
                  >
                    <Volume2 className="h-5 w-5" aria-hidden />
                    Say it
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setI((n) => Math.max(0, n - 1))}
                    disabled={i === 0}
                    className="inline-flex h-10 items-center gap-1.5 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleKnown(key)}
                    aria-pressed={isKnown}
                    className={`inline-flex h-10 items-center gap-1.5 rounded-[14px] px-4 text-sm font-medium ring-1 transition-colors ring-inset ${
                      isKnown
                        ? "bg-forest-500/10 text-forest-700 ring-forest-500/20"
                        : "bg-cream text-stone ring-line hover:bg-sand"
                    }`}
                  >
                    <Check className="h-4 w-4" aria-hidden />
                    {isKnown ? "Known" : "I know this"}
                  </button>
                  {last ? (
                    <button
                      type="button"
                      onClick={exitSet}
                      className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                    >
                      Finish
                      <Check className="h-4 w-4" aria-hidden />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setI((n) => n + 1)}
                      className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {known.length > 0 && !active && (
        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-forest-500/10 px-4 py-3 text-sm text-forest-700">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-clay-600" aria-hidden />
            You marked {known.length}{" "}
            {known.length === 1 ? "phrase" : "phrases"} as known. Keep going.
          </span>
          <button
            type="button"
            onClick={() => setKnown([])}
            aria-label="Reset known phrases"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone transition-colors hover:bg-cream hover:text-clay-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-[14px] bg-clay-50 px-4 py-3 text-xs text-clay-700 ring-1 ring-clay-100 ring-inset">
        <span aria-hidden>•</span>
        <p>
          A friendly demo with a fixed set of phrases, read aloud by your
          device. The real teacher speaks your language and adapts to you.
          Nothing here is saved or sent.
        </p>
      </div>
    </div>
  );
}
