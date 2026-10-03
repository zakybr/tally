import { createHash } from "node:crypto";

/*
  Server side of the Meta pixel: the Conversions API.

  Sends the same event the browser pixel sends, with the same event_id, so Meta
  counts it once. The server copy still lands when the pixel was blocked or the
  visitor declined cookies, which is the whole point of sending both.

  Env:
    META_PIXEL_ID          the dataset / pixel ID (same value as NEXT_PUBLIC_META_PIXEL_ID)
    META_CAPI_TOKEN        Conversions API access token from Events Manager
    META_TEST_EVENT_CODE   optional; only sent when set, for Events Manager > Test events

  Missing ID or token means the call is skipped with a log line, never an error
  surfaced to the visitor.
*/

const GRAPH_VERSION = "v23.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

/*
  Meta wants digits only, with the country code. Most enquiries here are typed
  the local way ("021 123 4567"), so a leading 0 is read as a New Zealand number.
*/
export function normalisePhone(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `64${d.slice(1)}`;
  return d;
}

export type MetaLeadInput = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  ip?: string;
  userAgent?: string;
  /* _fbp cookie, present only when the visitor accepted cookies. */
  fbp?: string;
  /* _fbc cookie, or built from an fbclid captured on landing. */
  fbc?: string;
  customData?: Record<string, unknown>;
};

export async function sendMetaEvent(input: MetaLeadInput): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID?.trim();
  const token = process.env.META_CAPI_TOKEN?.trim();
  if (!pixelId || !token) {
    console.warn("[meta-capi] META_PIXEL_ID or META_CAPI_TOKEN not set, skipping", input.eventName);
    return;
  }

  const user_data: Record<string, unknown> = {};
  if (input.email) user_data.em = [sha256(normaliseEmail(input.email))];
  const phone = input.phone ? normalisePhone(input.phone) : "";
  if (phone) user_data.ph = [sha256(phone)];
  if (input.ip) user_data.client_ip_address = input.ip;
  if (input.userAgent) user_data.client_user_agent = input.userAgent;
  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data,
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
  };
  const testCode = process.env.META_TEST_EVENT_CODE?.trim();
  if (testCode) body.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) {
      console.error("[meta-capi]", input.eventName, res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("[meta-capi] request failed:", err);
  }
}
