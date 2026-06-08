"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient, looping hero backdrop — a calm migration motif (warm dawn glow plus
 * soft particles drifting from Myanmar toward safety) distilled from the /intro
 * film. Autoplays and loops; for prefers-reduced-motion it renders a single
 * static frame. Sits behind the hero's forest scrim, so it stays subtle and the
 * headline stays legible. Decorative only (aria-hidden).
 */
export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const rand = (i: number, s: number) => {
      const x = Math.sin((i + 1) * s) * 43758.5453;
      return x - Math.floor(x);
    };
    const clamp = (v: number, a: number, b: number) =>
      Math.max(a, Math.min(b, v));

    const N = 26;
    const particles = Array.from({ length: N }, (_, i) => ({
      off: i / N,
      band: rand(i, 12.9),
      spd: 0.6 + rand(i, 3.3) * 0.5,
      sz: 1.4 + rand(i, 9.1) * 2.4,
      wob: 0.5 + rand(i, 5.1),
      gold: rand(i, 7.7) > 0.5,
    }));

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const period = 17;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      const time = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const u = reduce ? p.off : ((time * p.spd) / period + p.off) % 1;
        const x = (-0.06 + 1.12 * u) * w;
        const baseY = (0.22 + p.band * 0.42) * h;
        const y = baseY + Math.sin(u * Math.PI * 2 + p.off * 7) * h * 0.05 * p.wob;
        const fade = Math.min(clamp(u / 0.12, 0, 1), clamp((1 - u) / 0.16, 0, 1));
        const a = fade * 0.5;
        if (a <= 0.01) continue;
        ctx.beginPath();
        ctx.arc(x, y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(240,200,120,${a})`
          : `rgba(231,139,46,${a})`;
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(performance.now());
    });
    ro.observe(canvas);

    // Pause the loop while the hero is scrolled out of view (battery/CPU).
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (reduce) frame(performance.now());
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-700" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #0c1c11 0%, #14301e 55%, #1b3927 100%)",
        }}
      />
      <div
        className="prasm-hero-glow absolute"
        style={{
          right: "6%",
          top: "-14%",
          width: "62%",
          height: "78%",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(231,139,46,0.30) 0%, rgba(231,139,46,0.10) 38%, rgba(231,139,46,0) 70%)",
        }}
      />
      <div
        className="prasm-hero-glow-2 absolute"
        style={{
          left: "-8%",
          top: "6%",
          width: "48%",
          height: "62%",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(143,197,163,0.12) 0%, rgba(143,197,163,0) 68%)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "-10%",
          bottom: "-34%",
          width: "85%",
          height: "60%",
          borderRadius: "9999px",
          background: "rgba(143,197,163,0.06)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "-12%",
          bottom: "-38%",
          width: "82%",
          height: "56%",
          borderRadius: "9999px",
          background: "rgba(143,197,163,0.08)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span aria-hidden className="grain-overlay" />
    </div>
  );
}
