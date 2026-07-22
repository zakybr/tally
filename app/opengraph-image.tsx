import { ImageResponse } from "next/og";

export const alt = "Tally — Outcome-guaranteed marketing for NZ's primary sector";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Branded social card, generated at the edge. Dark theme, amber eyebrow, headline. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0a",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#d9711a",
            fontFamily: "monospace",
          }}
        >
          NZ Primary Sector · Outcome-Guaranteed
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            lineHeight: 1.02,
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span>We sell the tally,</span>
          <span>not the footage.</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 28,
            color: "#a8a49a",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div
              style={{
                width: 52,
                height: 6,
                background: "#d9711a",
                transform: "rotate(-32deg)",
                marginLeft: -46,
                marginBottom: 18,
              }}
            />
          </div>
          <span style={{ color: "#ffffff", fontWeight: 600 }}>tally</span>
          <span>tallynz.co</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
