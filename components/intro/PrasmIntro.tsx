"use client";

// PRASM Foundation — a calm, caring animated introduction (~95s, 8 beats).
// Ported from the Claude Design handoff (project/scenes.jsx) into the site's
// current brand: Thai-tea-orange clay, forest/sand/cream, gold accent, and the
// site fonts (Fraunces / Inter / Montserrat via CSS variables).

import { Fragment, useMemo, type CSSProperties, type ReactNode } from "react";
import { Stage, useTime, Easing, clamp } from "./engine";

/* ── Brand tokens (current site palette) ─────────────────────────────────── */
const C = {
  cream: "#fffdf8",
  sand: "#f5efe6",
  ink: "#241f1a",
  stone: "#6b635a",
  line: "#e7dfd3",
  clay500: "#e78b2e",
  clay600: "#a8480a",
  clay700: "#853607",
  clay300: "#e89a4e",
  gold: "#e6a24a",
  goldHi: "#f0c878",
  forest500: "#1f3d2b",
  forest600: "#18301f",
  forest700: "#112417",
  forestLite: "#8fc5a3",
};
const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS = "var(--font-inter), system-ui, sans-serif";
// Brand logotype — Montserrat is the free, geometric Gotham substitute.
const GOTHAM = "var(--font-montserrat), var(--font-inter), system-ui, sans-serif";

const W = 1920;
const H = 1080;

type Pt = { x: number; y: number };
type Rise = { opacity: number; transform: string };

/* ── Motion helpers ──────────────────────────────────────────────────────── */
function envelope(local: number, dur: number, fin = 0.9, fout = 0.9) {
  const a = clamp(local / fin, 0, 1);
  const b = clamp((dur - local) / fout, 0, 1);
  return Math.min(Easing.easeOutCubic(a), Easing.easeOutCubic(b));
}
function rise(local: number, delay = 0, dur = 0.8, dist = 24): Rise {
  const t = clamp((local - delay) / dur, 0, 1);
  const e = Easing.easeOutCubic(t);
  return { opacity: e, transform: `translateY(${(1 - e) * dist}px)` };
}
function drift(local: number, amp = 8, period = 16, phase = 0) {
  return Math.sin((local / period + phase) * Math.PI * 2) * amp;
}
function bezier(u: number, p0: Pt, p1: Pt, p2: Pt): Pt {
  const m = 1 - u;
  return {
    x: m * m * p0.x + 2 * m * u * p1.x + u * u * p2.x,
    y: m * m * p0.y + 2 * m * u * p1.y + u * u * p2.y,
  };
}
function rand1(i: number, s: number) {
  const x = Math.sin((i + 1) * s) * 43758.5453;
  return x - Math.floor(x);
}

/* ── Reusable bits ───────────────────────────────────────────────────────── */
function Eyebrow({
  children,
  local,
  delay = 0,
  color = C.clay600,
  align = "left",
}: {
  children: ReactNode;
  local: number;
  delay?: number;
  color?: string;
  align?: CSSProperties["textAlign"];
}) {
  return (
    <div
      style={{
        fontFamily: SANS,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        textAlign: align,
        ...rise(local, delay, 0.8, 14),
      }}
    >
      {children}
    </div>
  );
}

// Hand-drawn underline that strokes on.
function Underline({
  local,
  delay = 0,
  x,
  y,
  width = 360,
  color = C.gold,
  strokeW = 6,
}: {
  local: number;
  delay?: number;
  x: number;
  y: number;
  width?: number;
  color?: string;
  strokeW?: number;
}) {
  const t = clamp((local - delay) / 1.1, 0, 1);
  const e = Easing.easeInOutSine(t);
  return (
    <svg
      width={width}
      height="28"
      viewBox={`0 0 ${width} 28`}
      fill="none"
      style={{ position: "absolute", left: x, top: y, overflow: "visible" }}
    >
      <path
        d={`M3 17 C ${width * 0.22} 7, ${width * 0.42} 23, ${width * 0.6} 13 S ${width * 0.86} 9, ${width - 3} 15`}
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1 - e,
          opacity: clamp(t * 4, 0, 1),
        }}
      />
    </svg>
  );
}

function CenterUnderline({
  local,
  delay,
  y,
  width,
  color,
  strokeW,
}: {
  local: number;
  delay: number;
  y: number;
  width: number;
  color: string;
  strokeW: number;
}) {
  return (
    <div style={{ position: "absolute", left: "50%", top: y, transform: "translateX(-50%)" }}>
      <Underline local={local} delay={delay} x={0} y={0} width={width} color={color} strokeW={strokeW} />
    </div>
  );
}

// Soft atmospheric horizon — a low sun glow + faint drifting hills.
function Atmosphere({ local, tone = "warm" }: { local: number; tone?: "warm" | "dark" }) {
  const dark = tone === "dark";
  const hill = dark ? "rgba(143,197,163,0.10)" : "rgba(31,61,43,0.07)";
  const hill2 = dark ? "rgba(143,197,163,0.07)" : "rgba(31,61,43,0.05)";
  const sun = dark ? "rgba(240,200,120,0.10)" : "rgba(224,164,88,0.16)";
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          right: 220 + drift(local, 10, 22),
          top: 120 + drift(local, 8, 18, 0.3),
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${sun} 0%, rgba(0,0,0,0) 68%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -120 + drift(local, 14, 26),
          bottom: -340,
          width: 1500,
          height: 620,
          borderRadius: "50%",
          background: hill2,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -160 - drift(local, 12, 30, 0.5),
          bottom: -380,
          width: 1400,
          height: 560,
          borderRadius: "50%",
          background: hill,
        }}
      />
    </div>
  );
}

function Dot({ size = 9, color = C.gold }: { size?: number; color?: string }) {
  return (
    <span
      style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color }}
    />
  );
}

/* ── Scene frame ─────────────────────────────────────────────────────────── */
function Scene({
  start,
  end,
  fin = 1.0,
  fout = 1.0,
  bg,
  zIndex = 0,
  children,
}: {
  start: number;
  end: number;
  fin?: number;
  fout?: number;
  bg?: string;
  zIndex?: number;
  children: ((local: number, dur: number) => ReactNode) | ReactNode;
}) {
  const time = useTime();
  if (time < start - 0.05 || time > end + 0.05) return null;
  const local = time - start;
  const dur = end - start;
  const op = envelope(local, dur, fin, fout);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex, background: bg || "transparent", opacity: op }}>
      {typeof children === "function" ? children(local, dur) : children}
    </div>
  );
}

const colWrap: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0 200px",
  boxSizing: "border-box",
};

/* ── SCENE 1 — Title ─────────────────────────────────────────────────────── */
function TitleScene({ local }: { local: number }) {
  const lt = Easing.easeOutCubic(clamp((local - 0.15) / 0.9, 0, 1));
  return (
    <div style={{ position: "absolute", inset: 0, background: C.cream }}>
      <Atmosphere local={local} tone="warm" />
      <div style={{ ...colWrap, alignItems: "center", textAlign: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size, animated brand mark inside the film canvas */}
        <img
          src="/logo.png"
          alt="PRASM"
          style={{
            width: 112,
            height: 112,
            display: "block",
            marginBottom: 34,
            borderRadius: 24,
            opacity: lt,
            transform: `translateY(${(1 - lt) * 12}px) scale(${0.86 + 0.14 * lt})`,
            boxShadow: "0 18px 48px -18px rgba(36,31,26,0.5)",
          }}
        />
        <div style={{ ...rise(local, 0.45, 0.9, 16) }}>
          <Eyebrow local={local} delay={0.45} align="center">
            Kayan refugees · Mae Hong Son, Thailand
          </Eyebrow>
        </div>

        <div style={{ position: "relative", marginTop: 40, ...rise(local, 0.8, 1.0, 20) }}>
          <div
            style={{
              fontFamily: GOTHAM,
              fontSize: 168,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "0.015em",
              color: C.forest700,
            }}
          >
            PRASM
          </div>
          <CenterUnderline local={local} delay={1.6} y={184} width={560} color={C.gold} strokeW={7} />
        </div>

        <div
          style={{
            fontFamily: SANS,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: C.clay600,
            marginTop: 56,
            ...rise(local, 1.3, 0.9, 14),
          }}
        >
          Foundation
        </div>

        <div
          style={{
            fontFamily: SERIF,
            fontSize: 44,
            fontWeight: 400,
            fontStyle: "italic",
            color: C.stone,
            marginTop: 40,
            ...rise(local, 1.9, 1.0, 16),
          }}
        >
          Dignity, identity, and care for the stateless.
        </div>
      </div>
    </div>
  );
}

/* ── SCENE 2 — Where this is happening (abstract migration map) ──────────── */
const MAP_STATS = [
  { v: "3.7M", l: "Displaced inside Myanmar", c: "UNHCR · 2026" },
  { v: "5 in 6", l: "of Kayah State uprooted", c: "≈ 250,000 of 300,000" },
  { v: "81,000", l: "sheltering at the Thai border", c: "nearly half born there" },
];
function MapScene({ local }: { local: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        off: i / 26,
        sy: rand1(i, 12.9) - 0.5,
        dy: rand1(i, 78.2) - 0.5,
        spd: 0.8 + rand1(i, 3.3) * 0.5,
        sz: 4 + rand1(i, 9.1) * 4,
        hue: rand1(i, 5.1),
      })),
    [],
  );
  const period = 11;
  const p1: Pt = { x: 980, y: 250 };
  const glowL = rise(local, 0.6, 1.2, 0).opacity;
  const glowR = rise(local, 0.9, 1.2, 0).opacity;
  const borderOp = rise(local, 0.4, 1.1, 0).opacity;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.sand, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 200, top: 116 }}>
        <Eyebrow local={local} delay={0.2}>
          Where this is happening
        </Eyebrow>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 64,
            fontWeight: 400,
            letterSpacing: "-0.015em",
            color: C.forest700,
            marginTop: 20,
            ...rise(local, 0.5, 0.9, 20),
          }}
        >
          A whole people, on the move.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 170,
          top: 300,
          width: 560,
          height: 380,
          borderRadius: "50%",
          opacity: glowL,
          background: "radial-gradient(circle, rgba(231,139,46,0.13) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 150,
          top: 320,
          width: 460,
          height: 360,
          borderRadius: "50%",
          opacity: glowR,
          background: "radial-gradient(circle, rgba(31,61,43,0.12) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, overflow: "visible", opacity: borderOp }}
        fill="none"
      >
        <path
          d="M 980 248 C 920 360, 1030 500, 980 648"
          stroke={C.clay300}
          strokeWidth="2.5"
          strokeDasharray="2 13"
          strokeLinecap="round"
        />
      </svg>

      {dots.map((d, i) => {
        const u = ((local * d.spd) / period + d.off) % 1;
        const p0: Pt = { x: 430, y: 445 + d.sy * 180 };
        const p2: Pt = { x: 1545, y: 470 + d.dy * 64 };
        const p = bezier(u, p0, p1, p2);
        const op =
          Math.min(clamp(u / 0.12, 0, 1), clamp((1 - u) / 0.18, 0, 1)) *
          0.82 *
          clamp(local / 1.4, 0, 1);
        const col = d.hue > 0.5 ? C.clay500 : C.gold;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: d.sz,
              height: d.sz,
              marginLeft: -d.sz / 2,
              marginTop: -d.sz / 2,
              borderRadius: "50%",
              background: col,
              opacity: op,
              willChange: "left, top, opacity",
            }}
          />
        );
      })}

      <div style={{ position: "absolute", left: 250, top: 432, ...rise(local, 1.0, 0.9, 14) }}>
        <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 600, letterSpacing: "0.18em", color: C.clay700 }}>
          MYANMAR
        </div>
        <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 400, color: C.stone, marginTop: 8 }}>
          Kayah State · Kayan homeland
        </div>
      </div>

      <div style={{ position: "absolute", left: 1545, top: 470, ...rise(local, 1.7, 0.9, 14) }}>
        <div
          style={{
            position: "absolute",
            left: -15,
            top: -15,
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: `3px solid ${C.forest500}`,
            background: C.sand,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -5,
            top: -5,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: C.forest500,
          }}
        />
      </div>
      <div style={{ position: "absolute", right: 200, top: 540, textAlign: "right", ...rise(local, 1.9, 0.9, 14) }}>
        <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 600, letterSpacing: "0.12em", color: C.forest700 }}>
          MAE HONG SON
        </div>
        <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 400, color: C.stone, marginTop: 8 }}>
          Thailand · where PRASM works
        </div>
      </div>

      <div style={{ position: "absolute", left: 200, right: 200, top: 748, display: "flex", gap: 60 }}>
        {MAP_STATS.map((s, i) => (
          <div
            key={s.l}
            style={{ flex: 1, borderTop: `2px solid ${C.line}`, paddingTop: 24, ...rise(local, 5.6 + i * 0.35, 0.85, 22) }}
          >
            <div style={{ fontFamily: SERIF, fontSize: 82, fontWeight: 500, letterSpacing: "-0.02em", color: C.clay600, lineHeight: 1 }}>
              {s.v}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 27, fontWeight: 500, color: C.ink, marginTop: 16 }}>{s.l}</div>
            <div style={{ fontFamily: SANS, fontSize: 21, fontWeight: 400, color: C.stone, marginTop: 6 }}>{s.c}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 200,
          right: 200,
          top: 980,
          fontFamily: SERIF,
          fontSize: 32,
          fontWeight: 300,
          fontStyle: "italic",
          color: C.forest600,
          ...rise(local, 7.4, 1.0, 18),
        }}
      >
        And among them, countless children — left fatherless, motherless, or born without papers.
      </div>
    </div>
  );
}

/* ── SCENE 3 — The people ────────────────────────────────────────────────── */
function PeopleScene({ local }: { local: number }) {
  const lines: ReactNode[] = [
    <span key="a">In the hills of northern Thailand —</span>,
    <span key="b">
      families who fled the war in <span style={{ color: C.clay600 }}>Myanmar</span>.
    </span>,
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: C.cream }}>
      <Atmosphere local={local} tone="warm" />
      <div style={{ ...colWrap, maxWidth: 1340 }}>
        <Eyebrow local={local} delay={0.2}>
          The people
        </Eyebrow>
        <div style={{ marginTop: 34 }}>
          {lines.map((ln, i) => (
            <div
              key={i}
              style={{
                fontFamily: SERIF,
                fontSize: 72,
                fontWeight: 400,
                lineHeight: 1.16,
                letterSpacing: "-0.015em",
                color: C.forest700,
                whiteSpace: "nowrap",
                ...rise(local, 0.5 + i * 0.45, 0.9, 22),
              }}
            >
              {ln}
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 40,
            fontWeight: 400,
            fontStyle: "italic",
            color: C.stone,
            marginTop: 48,
            maxWidth: 1000,
            lineHeight: 1.45,
            ...rise(local, 2.1, 1.0, 18),
          }}
        >
          Safe from the fighting — but invisible to the systems meant to help.
        </div>
      </div>
    </div>
  );
}

/* ── SCENE 4 — The problem ───────────────────────────────────────────────── */
const PROBLEM_POINTS = [
  { t: "Stateless", b: "No Thai ID — and often no document at all. Many children have no proof they exist." },
  { t: "Shut out of school", b: "Without papers, children are turned away from public classrooms." },
  { t: "Priced out of care", b: "Hospitals charge refugees full foreigner rates, with no insurance." },
];
function ProblemScene({ local }: { local: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: C.sand }}>
      <div style={{ ...colWrap }}>
        <Eyebrow local={local} delay={0.15}>
          Why it matters
        </Eyebrow>
        <div style={{ position: "relative", marginTop: 30, width: "fit-content", ...rise(local, 0.5, 0.9, 22) }}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 82,
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: C.forest700,
            }}
          >
            Without papers, every door is locked.
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 100 }}>
          {PROBLEM_POINTS.map((p, i) => {
            const d = 1.3 + i * 0.4;
            return (
              <div
                key={p.t}
                style={{ flex: 1, borderTop: `2px solid ${C.line}`, paddingTop: 30, ...rise(local, d, 0.85, 26) }}
              >
                <div style={{ position: "relative", paddingTop: 2 }}>
                  <div
                    style={{
                      position: "absolute",
                      top: -32,
                      left: 0,
                      width: 64,
                      height: 2,
                      background: C.clay500,
                      transform: `scaleX(${Easing.easeOutCubic(clamp((local - d) / 0.9, 0, 1))})`,
                      transformOrigin: "left",
                    }}
                  />
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 500, color: C.clay700 }}>{p.t}</div>
                <div style={{ fontFamily: SANS, fontSize: 27, fontWeight: 400, color: C.stone, marginTop: 16, lineHeight: 1.5 }}>
                  {p.b}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── SCENE 5 — The heart (founder) · forest dark ─────────────────────────── */
function HeartScene({ local }: { local: number }) {
  const lines: ReactNode[] = [
    <span key="a">The first thing I could give this family</span>,
    <span key="b">
      wasn’t money — it was <span style={{ color: C.goldHi, fontStyle: "italic" }}>a record</span>.
    </span>,
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: C.forest700, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: -60,
          fontFamily: SERIF,
          fontSize: 540,
          fontWeight: 500,
          color: "rgba(224,164,88,0.10)",
          lineHeight: 1,
          ...rise(local, 0.4, 1.4, 0),
        }}
      >
        “
      </div>

      <div style={{ ...colWrap, maxWidth: 1460 }}>
        <Eyebrow local={local} delay={0.3} color={C.gold}>
          It started with one sick child
        </Eyebrow>

        <div style={{ marginTop: 44 }}>
          {lines.map((ln, i) => (
            <div
              key={i}
              style={{
                fontFamily: SERIF,
                fontSize: 64,
                fontWeight: 400,
                lineHeight: 1.22,
                letterSpacing: "-0.01em",
                color: C.cream,
                whiteSpace: "nowrap",
                ...rise(local, 0.9 + i * 0.5, 0.95, 22),
              }}
            >
              {ln}
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: SERIF,
            fontSize: 40,
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(245,239,230,0.82)",
            marginTop: 62,
            maxWidth: 1120,
            lineHeight: 1.5,
            ...rise(local, 3.1, 1.1, 20),
          }}
        >
          For a child with no papers, a medical history became the first proof that he exists.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 64, ...rise(local, 4.3, 0.9, 16) }}>
          <span style={{ width: 56, height: 2, background: C.gold }} />
          <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 500, letterSpacing: "0.04em", color: C.forestLite }}>
            PRASM’s founding doctor
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── SCENE 6 — How we work ───────────────────────────────────────────────── */
const STEPS = [
  { t: "Care now", b: "Cover the hospital visit. Keep the family well." },
  { t: "Identity", b: "Help people prove who they are." },
  { t: "Records that last", b: "Histories that protect health — and existence." },
];
function HowScene({ local }: { local: number }) {
  const drawn = Easing.easeInOutSine(clamp((local - 1.4) / 1.6, 0, 1));
  return (
    <div style={{ position: "absolute", inset: 0, background: C.cream }}>
      <div style={{ ...colWrap }}>
        <Eyebrow local={local} delay={0.15}>
          How we work
        </Eyebrow>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 78,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            color: C.forest700,
            marginTop: 28,
            ...rise(local, 0.45, 0.9, 22),
          }}
        >
          Care now — and a path to being seen.
        </div>

        <div style={{ position: "relative", marginTop: 96, height: 200 }}>
          <div style={{ position: "absolute", left: 60, right: 60, top: 27, height: 3, background: C.line }} />
          <div
            style={{
              position: "absolute",
              left: 60,
              top: 27,
              height: 3,
              background: C.clay300,
              width: `calc((100% - 120px) * ${drawn})`,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {STEPS.map((s, i) => {
              const d = 1.0 + i * 0.55;
              return (
                <div key={s.t} style={{ width: 460, textAlign: "center", ...rise(local, d, 0.85, 18) }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      margin: "0 auto",
                      background: C.cream,
                      border: `3px solid ${C.clay500}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Dot size={16} color={C.clay500} />
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 500, color: C.clay700, marginTop: 26 }}>
                    {s.t}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 25, fontWeight: 400, color: C.stone, marginTop: 12, lineHeight: 1.45 }}>
                    {s.b}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 78, ...rise(local, 2.9, 0.9, 16) }}>
          {["Dignity", "Self-reliance", "Solidarity"].map((v) => (
            <span
              key={v}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                fontFamily: SANS,
                fontSize: 26,
                fontWeight: 500,
                color: C.forest600,
              }}
            >
              <Dot size={9} color={C.gold} />
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SCENE 7 — Life in the hills ─────────────────────────────────────────── */
const COMMUNITY = ["Powered by sun", "Made by hand", "Held by each other"];
function CommunityScene({ local }: { local: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: C.sand }}>
      <Atmosphere local={local} tone="warm" />
      <div style={{ ...colWrap, alignItems: "center", textAlign: "center" }}>
        <Eyebrow local={local} delay={0.2} align="center">
          Life in the hills
        </Eyebrow>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 76,
            fontWeight: 400,
            lineHeight: 1.12,
            letterSpacing: "-0.015em",
            color: C.forest700,
            marginTop: 30,
            maxWidth: 1200,
            ...rise(local, 0.5, 0.95, 22),
          }}
        >
          Off-grid by craft and necessity — a community living lightly.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 64 }}>
          {COMMUNITY.map((c, i) => (
            <Fragment key={c}>
              {i > 0 && (
                <span style={{ opacity: rise(local, 1.2 + i * 0.35, 0.6, 0).opacity }}>
                  <Dot size={10} color={C.clay300} />
                </span>
              )}
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 40,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: C.clay700,
                  whiteSpace: "nowrap",
                  ...rise(local, 1.1 + i * 0.35, 0.8, 16),
                }}
              >
                {c}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SCENE 8 — Close / invitation ────────────────────────────────────────── */
const HELP = ["Teach", "Volunteer", "Give", "Spread the word"];
function CloseScene({ local }: { local: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: C.forest700, overflow: "hidden" }}>
      <Atmosphere local={local} tone="dark" />
      <div style={{ ...colWrap, alignItems: "center", textAlign: "center" }}>
        <Eyebrow local={local} delay={0.3} color={C.gold} align="center">
          No one should be invisible
        </Eyebrow>

        <div style={{ position: "relative", marginTop: 36, ...rise(local, 0.7, 1.0, 22) }}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 110,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: C.cream,
              whiteSpace: "nowrap",
            }}
          >
            Come stand with us.
          </div>
          <CenterUnderline local={local} delay={1.6} y={126} width={560} color={C.gold} strokeW={7} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 78, ...rise(local, 1.9, 0.95, 18) }}>
          {HELP.map((h, i) => (
            <Fragment key={h}>
              {i > 0 && <Dot size={8} color={C.forestLite} />}
              <span style={{ fontFamily: SANS, fontSize: 30, fontWeight: 500, color: "rgba(245,239,230,0.92)" }}>{h}</span>
            </Fragment>
          ))}
        </div>

        <div style={{ marginTop: 104, display: "flex", flexDirection: "column", alignItems: "center", ...rise(local, 2.9, 1.0, 18) }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size brand mark inside the film canvas */}
          <img
            src="/logo.png"
            alt="PRASM"
            style={{ width: 78, height: 78, borderRadius: 17, marginBottom: 26, boxShadow: "0 16px 40px -18px rgba(0,0,0,0.6)" }}
          />
          <div>
            <span style={{ fontFamily: GOTHAM, fontSize: 44, fontWeight: 600, letterSpacing: "0.05em", color: C.cream }}>
              PRASM
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: C.gold,
                marginLeft: 22,
              }}
            >
              Foundation
            </span>
          </div>
          <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 400, color: C.forestLite, marginTop: 22 }}>
            Mae Hong Son, Thailand&nbsp;&nbsp;·&nbsp;&nbsp;hope@prasm.life
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Grain overlay ───────────────────────────────────────────────────────── */
function Grain() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.04,
        zIndex: 50,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* ── Root ────────────────────────────────────────────────────────────────── */
type SceneDef = {
  C: (props: { local: number }) => ReactNode;
  start: number;
  end: number;
  z: number;
};
const SCENES: SceneDef[] = [
  { C: TitleScene, start: 0.0, end: 8.4, z: 1 },
  { C: MapScene, start: 7.8, end: 23.2, z: 2 },
  { C: PeopleScene, start: 22.6, end: 34.0, z: 3 },
  { C: ProblemScene, start: 33.4, end: 46.0, z: 4 },
  { C: HeartScene, start: 45.4, end: 61.8, z: 5 },
  { C: HowScene, start: 61.2, end: 74.0, z: 6 },
  { C: CommunityScene, start: 73.4, end: 81.6, z: 7 },
  { C: CloseScene, start: 81.0, end: 95.5, z: 8 },
];
const DURATION = 95.5;

export function PrasmIntro() {
  return (
    <Stage width={W} height={H} duration={DURATION} background={C.cream}>
      {SCENES.map((s, i) => {
        const SceneComp = s.C;
        return (
          <Scene key={i} start={s.start} end={s.end} zIndex={s.z}>
            {(local) => <SceneComp local={local} />}
          </Scene>
        );
      })}
      <Grain />
    </Stage>
  );
}

export default PrasmIntro;
