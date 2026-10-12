import { createHmac } from "node:crypto";

/*
  HubSpot CRM, server side only.

  The contact form writes leads straight into HubSpot contacts through the CRM
  API with a private app token. The Forms API was the alternative, but it keys
  everything on email, and a large share of these buyers leave only a mobile.

  Env:
    HUBSPOT_ACCESS_TOKEN   private app token with crm.objects.contacts.read
                           and crm.objects.contacts.write

  The custom contact properties this writes (tally_need, tally_sector,
  tally_timing, utm_*, fbclid, gclid, page_url, referrer) were created in the
  portal on 12 October 2026. A property that does not exist makes HubSpot
  reject the whole write, so add new ones there before sending them here.
*/

const API = "https://api.hubapi.com/crm/v3/objects/contacts";

export const hubspotConfigured = () => Boolean(process.env.HUBSPOT_ACCESS_TOKEN?.trim());

type Props = Record<string, string | undefined>;

async function hs(path: string, init: { method: string; body?: unknown }) {
  const res = await fetch(`${API}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN?.trim()}`,
      "Content-Type": "application/json",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`HubSpot ${init.method} ${path} ${res.status}: ${await res.text().catch(() => "")}`);
  }
  return res.json() as Promise<{ id?: string; results?: { id: string }[] }>;
}

/* Only non-empty values, so an update never blanks something HubSpot already holds. */
function filled(props: Props) {
  return Object.fromEntries(Object.entries(props).filter(([, v]) => v)) as Record<string, string>;
}

async function findContact(key: "email" | "phone", value: string) {
  const json = await hs("/search", {
    method: "POST",
    body: {
      filterGroups: [{ filters: [{ propertyName: key, operator: "EQ", value }] }],
      properties: ["email"],
      limit: 1,
    },
  });
  return json.results?.[0]?.id;
}

/*
  Create the contact, or update the one that already has this email or phone.
  Search can lag a few seconds behind a create, so two submissions in quick
  succession may still make a duplicate; HubSpot can merge those.
*/
export async function upsertContact(
  key: "email" | "phone",
  value: string,
  props: Props,
): Promise<string> {
  const properties = filled({ ...props, [key]: value });
  const existing = await findContact(key, value);
  if (existing) {
    await hs(`/${existing}`, { method: "PATCH", body: { properties } });
    return existing;
  }
  const created = await hs("", {
    method: "POST",
    body: { properties: { ...properties, lifecyclestage: "lead" } },
  });
  if (!created.id) throw new Error("HubSpot create returned no id");
  return created.id;
}

export async function updateContact(id: string, props: Props) {
  const properties = filled(props);
  if (Object.keys(properties).length === 0) return;
  await hs(`/${encodeURIComponent(id)}`, { method: "PATCH", body: { properties } });
}

/*
  Step 2 of the form updates the contact step 1 created. The browser carries
  the contact id back, signed, so nobody can post a made-up id and edit some
  other contact. The key is derived from the access token, so there is no
  second secret to manage.
*/
const signer = () =>
  createHmac("sha256", `tally-contact-ref:${process.env.HUBSPOT_ACCESS_TOKEN?.trim() ?? ""}`);

export function signContactRef(id: string) {
  return `${id}.${signer().update(id).digest("hex").slice(0, 32)}`;
}

export function readContactRef(ref: string): string | null {
  const [id, sig] = ref.split(".");
  if (!id || !sig || !/^\d+$/.test(id)) return null;
  return signContactRef(id) === `${id}.${sig}` ? id : null;
}
