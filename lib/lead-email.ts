import { Resend } from "resend";

/*
  Where every website lead lands: an email to the partners, sent through Resend.

  Shared by /api/contact and /api/audit so both forms reach the same inboxes
  with the same layout.
  Env (Vercel > Project > Settings > Environment Variables):
    RESEND_API_KEY   API key from resend.com
    CONTACT_FROM     verified sender, e.g. "Tally <noreply@tallynz.co>" (optional; falls back to Resend's onboarding sender)
    CONTACT_TO       comma-separated recipients (optional; defaults to the two partner inboxes)
*/

const TO = (process.env.CONTACT_TO ?? "zak@tallynz.co,jonty@tallynz.co")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM = process.env.CONTACT_FROM ?? "Tally <onboarding@resend.dev>";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export type LeadRow = [string, string];

export type SendResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function sendLeadEmail({
  tag,
  eyebrow,
  subject,
  replyTo,
  rows,
}: {
  /* Log prefix, e.g. "contact" or "audit". */
  tag: string;
  /* Already-escaped HTML for the orange line above the table. */
  eyebrow: string;
  subject: string;
  replyTo: string;
  rows: LeadRow[];
}): Promise<SendResult> {
  const filled = rows.filter(([, v]) => v);
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#08090b;color:#e8eaed;padding:32px">
      <p style="font-family:ui-monospace,monospace;letter-spacing:0.1em;text-transform:uppercase;color:#ff4a1c;font-size:12px;margin:0 0 16px">
        ${eyebrow}
      </p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${filled
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
    console.error(`[${tag}] RESEND_API_KEY not set. Enquiry received:\n` + text);
    return {
      ok: false,
      status: 503,
      error: "Email delivery is not configured yet. Please email zak@tallynz.co directly.",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: FROM, to: TO, replyTo, subject, text, html });
    if (error) {
      console.error(`[${tag}] Resend error:`, error);
      return { ok: false, status: 502, error: "Could not send your enquiry. Please try again." };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[${tag}] send failed:`, err);
    return { ok: false, status: 500, error: "Could not send your enquiry. Please try again." };
  }
}

export { esc as escapeHtml };
