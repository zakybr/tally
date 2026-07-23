import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/*
  Qualification enquiry handler.

  Sends each submission to the Tally partners. Delivery uses Resend.
  Required env (set in Vercel > Project > Settings > Environment Variables):
    RESEND_API_KEY   API key from resend.com
    CONTACT_FROM     verified sender, e.g. "Tally <noreply@tallynz.co>" (optional; falls back to Resend's onboarding sender)
    CONTACT_TO       comma-separated recipients (optional; defaults to the two partner inboxes)
*/

const TO = (process.env.CONTACT_TO ?? "zak@tallynz.co,jonty@tallynz.co")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM = process.env.CONTACT_FROM ?? "Tally <onboarding@resend.dev>";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  industry?: string;
  companySize?: string;
  outcome?: string;
  budgetAuthority?: string;
  budgetStatus?: string;
  timeline?: string;
  message?: string;
  website?: string; // honeypot
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
const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without sending.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const role = clean(body.role, 120);
  const industry = clean(body.industry, 120);
  const companySize = clean(body.companySize, 60);
  const outcome = clean(body.outcome, 120);
  const budgetAuthority = clean(body.budgetAuthority, 60);
  const budgetStatus = clean(body.budgetStatus, 60);
  const timeline = clean(body.timeline, 60);
  const message = clean(body.message, 4000);

  if (!name || !email || !isEmail(email) || !company || !industry) {
    return NextResponse.json(
      { error: "Please complete the required fields with a valid email." },
      { status: 422 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Role", role],
    ["Industry / sector", industry],
    ["Company size", companySize],
    ["Primary outcome", outcome],
    ["Budget authority", budgetAuthority],
    ["Budget status", budgetStatus],
    ["Timeline", timeline],
    ["Outcome detail", message],
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

  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#0b0b0a;color:#f5f2ea;padding:32px">
      <p style="font-family:ui-monospace,monospace;letter-spacing:0.1em;text-transform:uppercase;color:#d9711a;font-size:12px;margin:0 0 16px">
        New qualification enquiry
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:10px 16px 10px 0;border-bottom:1px solid rgba(245,242,234,0.12);color:#a8a49a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top;white-space:nowrap">${esc(k)}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(245,242,234,0.12);color:#f5f2ea;font-size:14px">${esc(v).replace(/\n/g, "<br>")}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  if (!process.env.RESEND_API_KEY) {
    // Log the lead so it is not lost if email is not configured yet.
    console.error("[contact] RESEND_API_KEY not set. Enquiry received:\n" + text);
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please email zak@tallynz.co directly." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Tally enquiry: ${company} (${industry})`,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Could not send your enquiry. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "Could not send your enquiry. Please try again." }, { status: 500 });
  }
}
