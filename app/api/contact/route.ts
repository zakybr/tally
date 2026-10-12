import { NextResponse, after } from "next/server";
import { NEEDS, SECTORS, TIMINGS, isOption, labelFor, parseContact } from "@/lib/contact-form";
import {
  hubspotConfigured,
  readContactRef,
  signContactRef,
  updateContact,
  upsertContact,
} from "@/lib/hubspot";
import { clean, escapeHtml as esc, isEmail, sendLeadEmail, type LeadRow } from "@/lib/lead-email";
import { requestMatchData, sendMetaEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";

/*
  Lead handler for the site's forms, separated by `formType`:

    "contact"        the /contact form. Creates or updates a HubSpot contact,
                     emails the partners as a backup, and sends the Meta Lead
                     server side with the browser's event_id.
    "contact-step2"  the optional follow-up on /contact. Adds sector and
                     timing to the same HubSpot contact.
    anything else    the free offer popup, emailed to the partners.

  The contact form succeeds if either HubSpot or the email lands, so a lead is
  never turned away because one of them is down. Each failure is logged.
  Resend env vars are documented in lib/lead-email.ts, HubSpot's in lib/hubspot.ts.
*/

type Payload = {
  formType?: string;
  contact?: string;
  businessName?: string;
  need?: string;
  sector?: string;
  timing?: string;
  ref?: string;
  eventId?: string;
  pageUrl?: string;
  fbclid?: string;
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

  const kind = clean(body.formType, 40);
  if (kind === "contact") return handleContact(body, request);
  if (kind === "contact-step2") return handleStep2(body);

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

const attributionRows = (body: Payload): LeadRow[] => [
  ["UTM source", clean(body.utm_source, 120)],
  ["UTM medium", clean(body.utm_medium, 120)],
  ["UTM campaign", clean(body.utm_campaign, 160)],
  ["UTM content", clean(body.utm_content, 160)],
  ["Meta click id", clean(body.fbclid, 500)],
  ["Google click id", clean(body.gclid, 120)],
  ["Page", clean(body.pageUrl, 500)],
  ["Referrer", clean(body.referrer, 500)],
];

async function handleContact(body: Payload, request: Request) {
  const name = clean(body.name, 120);
  const contact = parseContact(clean(body.contact, 200));
  if (!name || !contact) {
    return NextResponse.json(
      { error: "Please add your name and a valid email or NZ phone number." },
      { status: 422 },
    );
  }

  const businessName = clean(body.businessName, 160);
  const needRaw = clean(body.need, 40);
  const need = isOption(NEEDS, needRaw) ? needRaw : "";
  const message = clean(body.message, 4000);
  const fbclid = clean(body.fbclid, 500);
  const pageUrl = clean(body.pageUrl, 500);

  /* Split on the first space: "Mary Jane Smith" is Mary / Jane Smith. */
  const space = name.indexOf(" ");
  const firstname = space === -1 ? name : name.slice(0, space);
  const lastname = space === -1 ? "" : name.slice(space + 1).trim();

  let ref: string | undefined;
  if (hubspotConfigured()) {
    try {
      const id = await upsertContact(contact.type, contact.value, {
        firstname,
        lastname,
        company: businessName,
        message,
        tally_need: need,
        utm_source: clean(body.utm_source, 120),
        utm_medium: clean(body.utm_medium, 120),
        utm_campaign: clean(body.utm_campaign, 160),
        utm_content: clean(body.utm_content, 160),
        fbclid,
        gclid: clean(body.gclid, 120),
        page_url: pageUrl,
        referrer: clean(body.referrer, 500),
      });
      ref = signContactRef(id);
    } catch (err) {
      console.error("[contact] HubSpot write failed:", err);
    }
  } else {
    console.error("[contact] HUBSPOT_ACCESS_TOKEN not set, lead not sent to HubSpot");
  }

  const mail = await sendLeadEmail({
    tag: "contact",
    eyebrow: `Website enquiry${need ? ` &middot; ${esc(labelFor(NEEDS, need))}` : ""}`,
    subject: `Tally enquiry: ${businessName || name}${need ? ` (${labelFor(NEEDS, need)})` : ""}`,
    replyTo: contact.type === "email" ? contact.value : "",
    rows: [
      ["Name", name],
      [contact.type === "email" ? "Email" : "Phone", contact.value],
      ["Business", businessName],
      ["Needs more", labelFor(NEEDS, need)],
      ["Anything else", message],
      ["In HubSpot", ref ? "Yes" : "No, add by hand"],
      ...attributionRows(body),
    ],
  });

  if (!ref && !mail.ok) {
    return NextResponse.json({ error: "We could not save your details." }, { status: 502 });
  }

  const eventId = clean(body.eventId, 100);
  if (eventId) {
    const match = requestMatchData(request, fbclid || undefined);
    const referer = request.headers.get("referer");
    after(() =>
      sendMetaEvent({
        eventName: "Lead",
        eventId,
        eventSourceUrl: pageUrl || referer || "https://tallynz.co/contact",
        email: contact.type === "email" ? contact.value : undefined,
        phone: contact.type === "phone" ? contact.value : undefined,
        ...match,
        customData: { content_name: "Contact form" },
      }),
    );
  }

  return NextResponse.json({ ok: true, ref });
}

/*
  Optional. Whatever happens here, step 1 has already been saved, so a failure
  is reported to the browser but never undoes anything.
*/
async function handleStep2(body: Payload) {
  const sectorRaw = clean(body.sector, 40);
  const timingRaw = clean(body.timing, 40);
  const sector = isOption(SECTORS, sectorRaw) ? sectorRaw : "";
  const timing = isOption(TIMINGS, timingRaw) ? timingRaw : "";
  if (!sector && !timing) return NextResponse.json({ ok: true });

  const id = readContactRef(clean(body.ref, 120));
  if (id && hubspotConfigured()) {
    try {
      await updateContact(id, { tally_sector: sector, tally_timing: timing });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact-step2] HubSpot update failed:", err);
    }
  }

  /* No HubSpot record to update: send the extra detail by email instead. */
  const mail = await sendLeadEmail({
    tag: "contact-step2",
    eyebrow: "Website enquiry &middot; extra detail",
    subject: `Tally enquiry detail: ${clean(body.businessName, 160) || clean(body.name, 120)}`,
    replyTo: "",
    rows: [
      ["Name", clean(body.name, 120)],
      ["Contact", clean(body.contact, 200)],
      ["Sector", labelFor(SECTORS, sector)],
      ["Timing", labelFor(TIMINGS, timing)],
    ],
  });
  if (!mail.ok) {
    return NextResponse.json({ error: "Could not add that." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
