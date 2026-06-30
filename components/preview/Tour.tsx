"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
} from "react";
import { createPortal } from "react-dom";
import {
  DoorOpen,
  Compass,
  HeartHandshake,
  UserPlus,
  PartyPopper,
  KeyRound,
  Sparkles,
  Heart,
  ArrowRight,
  ArrowLeft,
  X,
  RotateCcw,
} from "lucide-react";
import { card } from "./ui";
import { useStudents } from "./demoStore";
import { useTour, setTourStep, markTourSeen, resetTour } from "./tourStore";
import { tourSteps } from "@/content/tour";

const icons: Record<string, ElementType> = {
  doorOpen: DoorOpen,
  compass: Compass,
  heartHandshake: HeartHandshake,
  userPlus: UserPlus,
  partyPopper: PartyPopper,
  keyRound: KeyRound,
  sparkles: Sparkles,
  heart: Heart,
};

type Rect = { top: number; left: number; width: number; height: number };

/** Card placement near a highlighted element, with a mobile bottom sheet. */
function cardStyle(rect: Rect): React.CSSProperties {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < 480) return { left: 12, right: 12, bottom: 96 };
  const W = 340;
  const left = Math.min(
    Math.max(rect.left + rect.width / 2 - W / 2, 12),
    vw - W - 12,
  );
  if (rect.top + rect.height / 2 < vh / 2) {
    return { top: rect.top + rect.height + 12, left, width: W };
  }
  return { bottom: vh - rect.top + 12, left, width: W };
}

/**
 * The first-run guided tour. A single portal overlay that walks a visitor
 * through the whole loop: welcome a child as the steward, sign out, then sign in
 * as that child and arrive in their learning space. The tour performs the safe
 * screen changes itself (switching roles, signing out) and hands control back at
 * the two moments only a person can do, watching the shared roster and the
 * current view to know when the visitor has finished each one.
 *
 * It mounts once a browser has not seen it, is replayable from the demo cockpit,
 * is SSR-safe (renders nothing until mounted), and honors reduced motion. It is
 * non-modal: the real controls underneath stay clickable so the visitor truly
 * drives the hand-off steps.
 */
export function Tour({
  view,
  switchTo,
  signOut,
}: {
  view: string;
  switchTo: (target: string) => void;
  signOut: () => void;
}) {
  const { seen, step } = useTour();
  const students = useStudents();
  const [rect, setRect] = useState<Rect | null>(null);
  const enteredRef = useRef(-1);
  const rosterBaseline = useRef(0);
  const maxStepRef = useRef(0);
  const studentsRef = useRef(students.length);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // SSR-safe mount flag: false on the server and the first hydration render,
  // then true, so the portal never renders without a document.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const open = mounted && !seen;
  const idx = Math.min(Math.max(step, 0), tourSteps.length - 1);

  // Keep the latest roster size in a ref so the open effect can read it without
  // re-running when students change (which would move the baseline).
  useEffect(() => {
    studentsRef.current = students.length;
  }, [students.length]);

  // Reset the per-run bookkeeping each time the tour opens or closes, so a
  // replay re-runs every step's entry. The roster baseline is captured once, at
  // the start of a run, so enrolling any child during the loop satisfies the
  // hand-off no matter when it happens.
  useEffect(() => {
    enteredRef.current = -1;
    maxStepRef.current = 0;
    if (open) rosterBaseline.current = studentsRef.current;
  }, [open]);

  // On entering a step, put the app on the screen the step expects, once. The
  // learner space is reached only by a real sign-in, so it is never forced here
  // (forcing it would drop the child the visitor just signed in as).
  useEffect(() => {
    if (!open) return;
    maxStepRef.current = Math.max(maxStepRef.current, idx);
    if (enteredRef.current === idx) return;
    enteredRef.current = idx;
    const s = tourSteps[idx];
    if (s.view === "steward") switchTo("steward");
    else if (s.view === "login") signOut();
  }, [open, idx, switchTo, signOut]);

  // Hand-off steps advance off real, shared truth: the roster growing, or the
  // visitor arriving in the learning space. Only when moving forward, so Back
  // never bounces the visitor straight out of the step they returned to.
  useEffect(() => {
    if (!open) return;
    if (idx < maxStepRef.current) return;
    const s = tourSteps[idx];
    if (s.gate === "roster" && students.length > rosterBaseline.current) {
      setTourStep(idx + 1);
    } else if (s.gate === "view-learner" && view === "learner") {
      setTourStep(idx + 1);
    }
  }, [open, idx, students.length, view]);

  // Find and measure the highlighted element. Re-runs on step and view change,
  // and watches the DOM for elements that appear after an interaction (a tab
  // opening, a student picker rendering).
  useEffect(() => {
    if (!open) return;
    const s = tourSteps[idx];
    const measure = () => {
      if (!s.spotlight || s.dim === false) {
        setRect((prev) => (prev === null ? prev : null));
        return;
      }
      const el = document.querySelector(`[data-tour-id="${s.spotlight}"]`);
      if (!el) {
        setRect((prev) => (prev === null ? prev : null));
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) {
        setRect((prev) => (prev === null ? prev : null));
        return;
      }
      const area =
        (r.width * r.height) / (window.innerWidth * window.innerHeight);
      if (area > 0.55) {
        setRect((prev) => (prev === null ? prev : null));
        return;
      }
      const next = {
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      };
      setRect((prev) =>
        prev &&
        Math.abs(prev.top - next.top) < 0.5 &&
        Math.abs(prev.left - next.left) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.height - next.height) < 0.5
          ? prev
          : next,
      );
    };
    measure();
    let rafId = 0;
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        measure();
      });
    };
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [open, idx, view]);

  // Escape leaves the tour.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") markTourSeen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus to the new step's heading, without trapping it.
  useEffect(() => {
    if (!open) return;
    titleRef.current?.focus();
  }, [open, idx]);

  if (!open) return null;

  const s = tourSteps[idx];
  const Icon = icons[s.icon] ?? Sparkles;
  const isFirst = idx === 0;
  const isDone = s.gate === "done";
  const isHandoff = s.gate === "roster" || s.gate === "view-learner";
  const mode = rect ? "anchored" : s.dim === false ? "docked" : "center";

  const next = () => setTourStep(idx + 1);
  const back = () => setTourStep(Math.max(0, idx - 1));
  const skipStep = () => {
    if (s.skip === "to-learner") switchTo("learner");
    setTourStep(idx + 1);
  };

  const cardPlacement =
    mode === "anchored"
      ? "fixed"
      : mode === "docked"
        ? "fixed bottom-24 left-1/2 w-[min(92vw,360px)] -translate-x-1/2"
        : "fixed top-1/2 left-1/2 w-[min(92vw,360px)] -translate-x-1/2 -translate-y-1/2";

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {/* Dim and highlight */}
      {mode === "center" && (
        <div
          className="fixed inset-0"
          style={{ backgroundColor: "rgba(31, 41, 37, 0.55)" }}
          aria-hidden
        />
      )}
      {mode === "anchored" && rect && (
        <>
          <div
            aria-hidden
            className="fixed rounded-[14px]"
            style={{
              top: rect.top - 8,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 16,
              boxShadow: "0 0 0 9999px rgba(31, 41, 37, 0.55)",
              transition:
                "top .2s ease, left .2s ease, width .2s ease, height .2s ease",
            }}
          />
          <div
            aria-hidden
            className="fixed animate-tour-ring rounded-[14px]"
            style={{
              top: rect.top - 8,
              left: rect.left - 8,
              width: rect.width + 16,
              height: rect.height + 16,
              outline: "2px solid var(--color-gold-400)",
              outlineOffset: "2px",
              transition:
                "top .2s ease, left .2s ease, width .2s ease, height .2s ease",
            }}
          />
        </>
      )}

      {/* Coach card */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Guided tour"
        className={`${card} pointer-events-auto z-[81] animate-tour-in p-5 ${cardPlacement}`}
        style={mode === "anchored" && rect ? cardStyle(rect) : undefined}
      >
        <button
          type="button"
          onClick={markTourSeen}
          aria-label="Close tour"
          className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-stone transition-colors hover:bg-sand hover:text-forest-700"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-clay-600">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-stone uppercase">
            Guided tour
          </span>
        </div>

        <h2
          ref={titleRef}
          tabIndex={-1}
          className="mt-3 font-display text-lg font-semibold text-forest-700 outline-none"
        >
          {s.title}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-stone">{s.body}</p>

        {isHandoff && s.hint && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1.5 text-xs font-medium text-forest-700">
            <ArrowRight className="h-3.5 w-3.5 text-clay-600" aria-hidden />
            {s.hint}
          </p>
        )}

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-clay-600 transition-all"
              style={{ width: `${((idx + 1) / tourSteps.length) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-[0.6875rem] font-medium text-stone">
            {idx + 1} / {tourSteps.length}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          {isFirst ? (
            <button
              type="button"
              onClick={markTourSeen}
              className="text-sm font-medium text-stone underline decoration-line underline-offset-4 hover:text-forest-700"
            >
              No thanks
            </button>
          ) : (
            <button
              type="button"
              onClick={back}
              className="inline-flex h-10 items-center gap-1.5 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
          )}

          {isDone ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetTour}
                className="inline-flex h-10 items-center gap-1.5 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Replay
              </button>
              <button
                type="button"
                onClick={markTourSeen}
                className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
              >
                Explore on your own
              </button>
            </div>
          ) : isHandoff ? (
            <button
              type="button"
              onClick={skipStep}
              className="text-sm font-medium text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
            >
              Skip this step
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
            >
              {isFirst ? "Start the tour" : "Next"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Announce each step for screen readers. */}
      <div aria-live="polite" className="sr-only">
        {s.title}. {s.body}
      </div>
    </div>,
    document.body,
  );
}
