"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Star,
  ShieldCheck,
  Users,
  WifiOff,
  Sprout,
  PartyPopper,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  kidStarters,
  kidReplies,
  kidFallback,
  ageBandLabel,
  type Learner,
} from "@/content/curiosityDemo";
import { Avatar, card } from "./ui";
import { CuriositySwitcher, type Perspective } from "./CuriositySwitcher";
import { SessionNotes } from "./SessionNotes";
import { useCuriosityLive, earnSticker, noticeSpark } from "./curiosityStore";

type Msg = { id: string; from: "kid" | "guide"; text: string };

/** Match a child's message to a safe, canned reply (demo only, no model call). */
function answer(input: string) {
  const text = input.toLowerCase();
  const hit = kidReplies.find((r) => r.keywords.some((k) => text.includes(k)));
  return hit ?? { reply: kidFallback };
}

export function LearnerApp({
  learner,
  onSignOut,
  onSwitch,
}: {
  learner: Learner;
  onSignOut: () => void;
  onSwitch?: (p: Perspective) => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      from: "guide",
      text: `Hi ${learner.explorerName}! I am your curiosity guide. Ask me anything you wonder about.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const live = useCuriosityLive();
  const stickers = useMemo(
    () => Array.from(new Set([...learner.stickers, ...live.stickers])),
    [learner.stickers, live.stickers],
  );
  const [noticed, setNoticed] = useState<string | null>(null);
  const [justEarned, setJustEarned] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const earnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (earnTimer.current) clearTimeout(earnTimer.current);
    },
    [],
  );

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `k-${Date.now()}`, from: "kid", text },
    ]);
    setThinking(true);
    const res = answer(text);
    timer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `g-${Date.now()}`, from: "guide", text: res.reply },
      ]);
      if ("sticker" in res && res.sticker) {
        const earned = res.sticker;
        if (!stickers.includes(earned)) {
          earnSticker(earned);
          setJustEarned(earned);
          if (earnTimer.current) clearTimeout(earnTimer.current);
          earnTimer.current = setTimeout(() => setJustEarned(null), 3500);
        }
      }
      if ("spark" in res && res.spark) {
        setNoticed(res.spark);
        noticeSpark(learner.explorerName, res.spark);
      }
      setThinking(false);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] bg-sand">
      {/* Bar */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium text-forest-700">
                Curiosity
              </div>
              <div className="text-xs text-stone">Kid mode</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden text-sm text-stone hover:text-forest-700 sm:inline"
            >
              Back to site
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              aria-label="Leave"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
            >
              <LogOut className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {onSwitch && (
          <CuriositySwitcher current="learner" onSwitch={onSwitch} />
        )}

        {/* Explorer card */}
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-4">
            <Avatar
              name={learner.explorerName}
              className="h-14 w-14 text-base"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-xl font-semibold text-forest-700">
                  {learner.explorerName}
                </h1>
                <Badge tone="forest">Explorer</Badge>
              </div>
              <p className="mt-0.5 text-sm text-stone">
                {ageBandLabel(learner.ageBand)} · {stickers.length}{" "}
                {stickers.length === 1 ? "sticker" : "stickers"}
              </p>
            </div>
          </div>

          {/* Safety + offline cues */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-500/10 px-3 py-1 text-xs font-medium text-forest-700 ring-1 ring-forest-500/20 ring-inset">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Kid mode
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-medium text-stone ring-1 ring-line ring-inset">
              <Users className="h-3.5 w-3.5" aria-hidden /> A grown-up is with
              you
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-medium text-stone ring-1 ring-line ring-inset">
              <WifiOff className="h-3.5 w-3.5" aria-hidden /> Works offline
            </span>
          </div>

          {/* Stickers */}
          {stickers.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {stickers.map((s) => (
                <span
                  key={s}
                  className="inline-flex animate-reveal items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold text-clay-700 ring-1 ring-gold-400/30 ring-inset"
                >
                  <Star className="h-3.5 w-3.5" aria-hidden /> {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sticker just earned */}
        {justEarned && (
          <div className="mt-4 flex animate-reveal items-center gap-3 rounded-[16px] border border-gold-400/40 bg-gold-400/10 p-3">
            <PartyPopper
              className="h-5 w-5 shrink-0 text-clay-600"
              aria-hidden
            />
            <p className="text-sm font-medium text-forest-700">
              New sticker earned: {justEarned}!
            </p>
          </div>
        )}

        {/* Spark noticed, openly */}
        {noticed && (
          <div className="mt-4 flex items-start gap-3 rounded-[16px] border border-clay-300/40 bg-clay-50 p-4">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-clay-600">
              <Sprout className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm text-clay-700">
              We noticed you love <strong>{noticed.toLowerCase()}</strong>. We
              will tell the grown-up who helps you, so we can bring you
              something fun to explore it more.
            </p>
          </div>
        )}

        {/* Chat */}
        <div className={`mt-4 ${card} flex flex-col overflow-hidden`}>
          <div
            ref={scrollRef}
            className="max-h-[42vh] min-h-[220px] space-y-3 overflow-y-auto p-4"
          >
            {messages.map((m) =>
              m.from === "guide" ? (
                <div key={m.id} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="max-w-[85%] rounded-[16px] rounded-tl-sm bg-sand px-4 py-2.5 text-sm leading-relaxed text-ink">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-[16px] rounded-tr-sm bg-clay-600 px-4 py-2.5 text-sm leading-relaxed text-cream">
                    {m.text}
                  </p>
                </div>
              ),
            )}
            {thinking && (
              <div
                className="flex items-center gap-2.5 text-stone"
                aria-live="polite"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <span className="inline-flex gap-1 rounded-[16px] rounded-tl-sm bg-sand px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone [animation-delay:300ms]" />
                </span>
              </div>
            )}
          </div>

          {/* Starters */}
          <div className="flex flex-wrap gap-2 border-t border-line px-4 pt-3">
            {kidStarters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-medium text-forest-700 transition-colors hover:bg-sand"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Composer */}
          <form
            className="flex items-center gap-2 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything you wonder about…"
              aria-label="Ask a question"
              className="min-w-0 flex-1 rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim() || thinking}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-clay-600 text-cream transition-colors hover:bg-clay-700 disabled:opacity-40"
            >
              <Send className="h-5 w-5" aria-hidden />
            </button>
          </form>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-[14px] bg-clay-50 px-4 py-2.5 text-xs text-clay-700 ring-1 ring-clay-100 ring-inset">
          <span aria-hidden>•</span>
          <p>
            Preview: this is a friendly demo with safe, ready-made answers. It
            is not connected to a live model, and nothing here is saved or sent.
          </p>
        </div>

        <SessionNotes context="Learner (kid mode)" />
      </div>
    </div>
  );
}
