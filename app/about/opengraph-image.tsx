import { ImageResponse } from "next/og";

export const alt = "About Tally: New Zealand primary industries marketing agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          About Tally · New Zealand
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.02,
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span>The outcome</span>
          <span>is contractual.</span>
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
          <span>tallynz.co/about</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
