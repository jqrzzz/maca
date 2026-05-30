"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  as?: React.ElementType;
};

/**
 * Fades + lifts children into view once on scroll.
 * Uses IntersectionObserver (no animation library). Respects
 * prefers-reduced-motion via the CSS .animate-reveal guard in globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Comp = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is requested, show immediately without observing.
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      className={cn(
        "motion-safe:opacity-0",
        shown && "motion-safe:animate-reveal",
        className,
      )}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
