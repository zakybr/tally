import { NextResponse, after } from "next/server";
import { SPEND_RANGES } from "@/lib/audit";
import { clean, escapeHtml as esc, isEmail, sendLeadEmail, type LeadRow } from "@/lib/lead-email";
import { sendMetaEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";

/*
  Free enquiry audit request, from /audit.

  1. Validates and emails the lead to the partners, exactly like /api/contact.
  2. After the response is sent, reports the same Lead to the Meta Conversions
     API with the event_id the browser pixel used, so Meta deduplicates them.

  The CAPI call lives here rather than in its own public endpoint on purpose: a
  standalone route would let anyone post fake Leads into the ad account. Here a
  Lead only reaches Meta once a real submission has passed validation and been
  delivered.
*/

type Payload = {
  name?: string;
  businessName?: string;
  website?: string;
  email?: string;
  phone?: string;
  enquiryDefinition?: string;
  monthlySpend?: string;
  hp?: string; // honeypot
  eventId?: string;
  pageUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  msclkid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
};

function readCookie(header: string | null, name: string) {
  if (!header) return "";
  const m = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without sending.
  if (clean(body.hp)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const businessName = clean(body.businessName, 160);
  const website = clean(body.website, 300);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const enquiryDefinition = clean(body.enquiryDefinition, 2000);
  const spendRaw = clean(body.monthlySpend, 40);
  const monthlySpend = (SPEND_RANGES as readonly string[]).includes(spendRaw) ? spendRaw : "";

  if (!name || !businessName || !website || !email || !isEmail(email) || !phone || !monthlySpend) {
    return NextResponse.json(
      { error: "Please complete the required fields with a valid email." },
      { status: 422 },
    );
  }

  const utm = {
    source: clean(body.utm_source, 120),
    medium: clean(body.utm_medium, 120),
    campaign: clean(body.utm_campaign, 160),
    term: clean(body.utm_term, 160),
    content: clean(body.utm_content, 160),
  };
  const fbclid = clean(body.fbclid, 500);

  const rows: LeadRow[] = [
    ["Enquiry type", "Free enquiry audit request (/audit)"],
    ["Name", name],
    ["Business", businessName],
    ["Website", website],
    ["Email", email],
    ["Phone", phone],
    ["What counts as an enquiry", enquiryDefinition],
    ["Monthly marketing spend", monthlySpend],
    ["UTM source", utm.source],
    ["UTM medium", utm.medium],
    ["UTM campaign", utm.campaign],
    ["UTM term", utm.term],
    ["UTM content", utm.content],
    ["Google click id", clean(body.gclid, 120)],
    ["Microsoft click id", clean(body.msclkid, 120)],
    ["Meta click id", fbclid],
    ["Referrer", clean(body.referrer, 500)],
    ["Landing page", clean(body.landing_page, 300)],
  ];

  const result = await sendLeadEmail({
    tag: "audit",
    eyebrow: `Free enquiry audit &middot; ${esc(monthlySpend)}`,
    subject: `Tally · AUDIT REQUEST: ${businessName} (${monthlySpend})`,
    replyTo: email,
    rows,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const eventId = clean(body.eventId, 100);
  if (eventId) {
    const headers = request.headers;
    const cookie = headers.get("cookie");
    const fbcCookie = readCookie(cookie, "_fbc");
    after(() =>
      sendMetaEvent({
        eventName: "Lead",
        eventId,
        eventSourceUrl:
          clean(body.pageUrl, 500) || headers.get("referer") || "https://tallynz.co/audit",
        email,
        phone,
        ip: headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
        userAgent: headers.get("user-agent") || undefined,
        fbp: readCookie(cookie, "_fbp") || undefined,
        fbc: fbcCookie || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
        customData: { content_name: "enquiry_audit", monthly_spend: monthlySpend },
      }),
    );
  }

  return NextResponse.json({ ok: true });
}
