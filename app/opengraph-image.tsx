import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social-share card, generated at build time.
 * Uses system fonts + simple boxes only (Satori is strict about flex/SVG),
 * so it has no external dependencies and renders reliably.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1F3D2B 0%, #112417 100%)",
          padding: "80px",
          color: "#FFFDF8",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#B45309",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#E0A458",
              }}
            />
          </div>
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            {site.shortName}
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              marginTop: 24,
              color: "#E0A458",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {site.location.region}, {site.location.country}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
