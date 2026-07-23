import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";

const TO = (process.env.CONTACT_TO ?? "zak@tallynz.co,jonty@tallynz.co")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM = process.env.CONTACT_FROM ?? "Tally <onboarding@resend.dev>";
const PDF_PATH = "/docs/tally-guarantee-one-pager.pdf";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_page?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true, url: PDF_PATH });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  if (!name || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter your name and a valid work email." },
      { status: 422 },
    );
  }

  const attribution: [string, string][] = [
    ["UTM source", clean(body.utm_source, 120)],
    ["UTM medium", clean(body.utm_medium, 120)],
    ["UTM campaign", clean(body.utm_campaign, 160)],
    ["UTM term", clean(body.utm_term, 160)],
    ["UTM content", clean(body.utm_content, 160)],
    ["Google click id", clean(body.gclid, 120)],
    ["Microsoft click id", clean(body.msclkid, 120)],
    ["Referrer", clean(body.referrer, 500)],
    ["Landing page", clean(body.landing_page, 300)],
  ];

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Asset", "Guarantee one-pager"],
    ...attribution,
  ];

  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `Tally one-pager download: ${company || name}`,
        text: `${text}\n\nPDF: ${SITE_URL}${PDF_PATH}`,
      });
    } catch (err) {
      console.error("[one-pager] email failed:", err);
    }
  } else {
    console.error("[one-pager] lead (no RESEND_API_KEY):\n" + text);
  }

  return NextResponse.json({ ok: true, url: PDF_PATH });
}
