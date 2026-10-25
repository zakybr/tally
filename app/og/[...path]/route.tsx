import { ImageResponse } from "next/og";
import { ROUTES } from "@/lib/routes";

/*
  One social card per page, prerendered at build: /og/home for the homepage,
  /og/<path> for everything else. Each page's metadata points here with its
  own alt text, so shares of an inner page never show the homepage card.
*/

export const dynamic = "force-static";
export const dynamicParams = false;

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return ROUTES.map((r) => ({ path: r.path === "/" ? ["home"] : r.path.slice(1).split("/") }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const joined = path.join("/");
  const route = ROUTES.find((r) => (joined === "home" ? r.path === "/" : r.path === `/${joined}`));
  if (!route) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ff4a1c",
            fontFamily: "monospace",
          }}
        >
          {route.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: route.headline.length > 34 ? 76 : 92,
            lineHeight: 1.04,
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {route.headline}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 28, color: "#a8a49a" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div style={{ width: 6, height: 40, background: "#ffffff" }} />
            <div
              style={{
                width: 52,
                height: 6,
                background: "#ff4a1c",
                transform: "rotate(-32deg)",
                marginLeft: -46,
                marginBottom: 18,
              }}
            />
          </div>
          <span style={{ color: "#ffffff", fontWeight: 600 }}>tally</span>
          <span>tallynz.co · Auckland, New Zealand</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
