import { NextResponse } from "next/server";
import { clean, escapeHtml as esc, isEmail, sendLeadEmail } from "@/lib/lead-email";

export const runtime = "nodejs";

/*
  Qualification enquiry handler.

  Serves both lead forms: the full qualification brief on /contact and the free
  offer popup. They share one endpoint, one recipient list and one Resend send;
  `formType` is what separates them in the inbox.

  Sends each submission to the Tally partners through lib/lead-email.ts, which
  also documents the Resend env vars.
*/

type Payload = {
  /* "free-offer" from the site popup, anything else is the full qualification brief. */
  formType?: string;
  offer?: string;
  source?: string;
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
  const formType = clean(body.formType, 40);
  const offer = clean(body.offer, 80);
  const source = clean(body.source, 60);
  const isFreeOffer = formType === "free-offer";

  if (!name || !email || !isEmail(email) || !company || !industry) {
    return NextResponse.json(
      { error: "Please complete the required fields with a valid email." },
      { status: 422 },
    );
  }

  const rows: [string, string][] = [
    ["Enquiry type", isFreeOffer ? "Free offer request (site popup)" : "Full qualification brief"],
    ["Free offer requested", isFreeOffer ? offer : ""],
    ["Opened from", isFreeOffer ? source : ""],
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

  const result = await sendLeadEmail({
    tag: "contact",
    eyebrow: isFreeOffer
      ? `Free offer request &middot; ${esc(offer || "unspecified")}`
      : "New qualification enquiry",
    subject: isFreeOffer
      ? `Tally · FREE ${(offer || "request").toUpperCase()}: ${company} (${industry})`
      : `Tally enquiry: ${company} (${industry})`,
    replyTo: email,
    rows,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
