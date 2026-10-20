import { NextResponse, after } from "next/server";
import { AUDIT_GOALS, SPEND_RANGES } from "@/lib/audit";
import { parseContact } from "@/lib/contact-form";
import { hubspotConfigured, upsertContact } from "@/lib/hubspot";
import { clean, escapeHtml as esc, isEmail, sendLeadEmail, type LeadRow } from "@/lib/lead-email";
import { requestMatchData, sendMetaEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";

/*
  Free audit request, from /audit: the one form behind every "free" offer.

  1. Needs only a name and a mobile or email (NZ numbers come back in E.164).
  2. Creates or updates the HubSpot contact and emails the partners as a
     backup; the request succeeds if either lands.
  3. After the response is sent, reports the same Lead to the Meta Conversions
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
  contact?: string;
  goal?: string;
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
  const contact = parseContact(clean(body.contact, 200));
  const goalRaw = clean(body.goal, 60);
  const goal = (AUDIT_GOALS as readonly string[]).includes(goalRaw) ? goalRaw : "";
  const spendRaw = clean(body.monthlySpend, 40);
  const monthlySpend = (SPEND_RANGES as readonly string[]).includes(spendRaw) ? spendRaw : "";

  if (!name || !contact) {
    return NextResponse.json(
      { error: "Please add your name and a valid mobile number or email." },
      { status: 422 },
    );
  }
  const email = contact.type === "email" && isEmail(contact.value) ? contact.value : "";
  const phone = contact.type === "phone" ? contact.value : "";

  const utm = {
    source: clean(body.utm_source, 120),
    medium: clean(body.utm_medium, 120),
    campaign: clean(body.utm_campaign, 160),
    term: clean(body.utm_term, 160),
    content: clean(body.utm_content, 160),
  };
  const fbclid = clean(body.fbclid, 500);

  const rows: LeadRow[] = [
    ["Enquiry type", "Free audit request (/audit)"],
    ["Name", name],
    [contact.type === "email" ? "Email" : "Phone", contact.value],
    ["Business", businessName],
    ["Website or Instagram", website],
    ["Wants more of", goal],
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

  /* HubSpot first: the CRM is where the call gets booked from. */
  let crmOk = false;
  if (hubspotConfigured()) {
    const space = name.indexOf(" ");
    try {
      await upsertContact(contact.type, contact.value, {
        firstname: space === -1 ? name : name.slice(0, space),
        lastname: space === -1 ? "" : name.slice(space + 1).trim(),
        company: businessName,
        website,
        message: [
          "Free audit request.",
          goal && `Wants: ${goal}.`,
          monthlySpend && `Spend: ${monthlySpend}.`,
          website && `Website/Instagram: ${website}.`,
        ]
          .filter(Boolean)
          .join(" "),
        utm_source: utm.source,
        utm_medium: utm.medium,
        utm_campaign: utm.campaign,
        utm_content: utm.content,
        fbclid,
        gclid: clean(body.gclid, 120),
        page_url: clean(body.pageUrl, 500),
        referrer: clean(body.referrer, 500),
      });
      crmOk = true;
    } catch (err) {
      console.error("[audit] HubSpot write failed:", err);
    }
  } else {
    console.error("[audit] HUBSPOT_ACCESS_TOKEN not set, lead not sent to HubSpot");
  }

  const result = await sendLeadEmail({
    tag: "audit",
    eyebrow: `Free audit${goal ? ` &middot; ${esc(goal)}` : ""}`,
    subject: `Tally · FREE AUDIT: ${businessName || name}${goal ? ` (${goal})` : ""}`,
    replyTo: email,
    rows,
  });
  if (!result.ok && !crmOk) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const eventId = clean(body.eventId, 100);
  if (eventId) {
    const match = requestMatchData(request, fbclid || undefined);
    const referer = request.headers.get("referer");
    after(() =>
      sendMetaEvent({
        eventName: "Lead",
        eventId,
        eventSourceUrl: clean(body.pageUrl, 500) || referer || "https://tallynz.co/audit",
        email,
        phone,
        ...match,
        customData: { content_name: "free_audit", goal, monthly_spend: monthlySpend },
      }),
    );
  }

  return NextResponse.json({ ok: true });
}
