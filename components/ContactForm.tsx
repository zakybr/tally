"use client";

import { useRef, useState } from "react";
import { attributionPayload, trackEvent } from "@/lib/analytics";
import { newEventId, trackMeta } from "@/lib/meta-pixel";
import { PEOPLE } from "@/lib/contact";
import {
  CALENDLY_URL,
  NEEDS,
  SECTORS,
  TIMINGS,
  parseContact,
  type Option,
} from "@/lib/contact-form";

/*
  The /contact form, built for volume on a phone.

  Step 1 is the only required part: a name and an email or NZ mobile. On a
  confirmed save it fires GA4 generate_lead and the Meta Lead once each (the
  server sends the same Lead to the Conversions API with this event_id), then
  swaps to a thank-you state. Step 2 there is optional: sector and timing,
  added to the same HubSpot contact.

  If the save fails, nothing is cleared and nothing is tracked; the visitor
  gets Zak's number and email instead.
*/

type Status = "idle" | "submitting" | "error";

const labelCls = "mono-label block text-ink-2";
/* text-base: 16px, so iOS Safari does not zoom into the field. */
const fieldCls =
  "mt-2 w-full border rule-hair bg-sheet px-4 py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink-2/60 focus:border-[var(--signal)]";

const zak = PEOPLE[0];

function Chips({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              /* Tapping the selected chip again clears it: every choice is optional. */
              onClick={() => onChange(on ? "" : o.value)}
              className={`min-h-[44px] border px-4 py-2 text-base leading-tight transition-colors duration-300 ${
                on
                  ? "border-[var(--w-heavy)] bg-sheet-3 text-ink"
                  : "rule-med text-ink-2 hover:border-[var(--w-heavy)] hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState(false);
  const [need, setNeed] = useState("");
  const [contactMode, setContactMode] = useState<"email" | "tel" | undefined>(undefined);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState<string | undefined>(undefined);

  const [sector, setSector] = useState("");
  const [timing, setTiming] = useState("");
  const [step2, setStep2] = useState<"idle" | "sending" | "done" | "error">("idle");

  const started = useRef(false);
  /* A ref, not state: two fast taps both see stale state and would post twice. */
  const inFlight = useRef(false);
  const leadFired = useRef(false);
  const step2Sent = useRef(false);
  const submitted = useRef({ name: "", contact: "", businessName: "" });
  const panelRef = useRef<HTMLDivElement>(null);

  function onFocus() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_name: "contact" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || leadFired.current) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const contactRaw = String(fd.get("contact") ?? "");
    const parsed = parseContact(contactRaw);

    if (!name || !parsed) {
      setInvalid(true);
      (form.elements.namedItem(!name ? "name" : "contact") as HTMLInputElement | null)?.focus();
      return;
    }
    setInvalid(false);
    inFlight.current = true;
    setStatus("submitting");

    const businessName = String(fd.get("businessName") ?? "").trim();
    const eventId = newEventId();
    const attribution = attributionPayload();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          name,
          contact: contactRaw,
          businessName,
          need,
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
          eventId,
          pageUrl: window.location.href,
          ...attribution,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json().catch(() => ({}))) as { ref?: string };

      if (!leadFired.current) {
        leadFired.current = true;
        trackEvent("generate_lead", {
          form_name: "contact",
          need: need || "none",
          contact_type: parsed.type,
        });
        trackMeta("Lead", { content_name: "Contact form" }, eventId);
      }

      submitted.current = { name, contact: contactRaw, businessName };
      setRef(json.ref);
      setDone(true);
      setStatus("idle");
      window.requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }),
      );
    } catch {
      /* Keep everything they typed; the form stays mounted and untouched. */
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  async function onStep2() {
    if (step2Sent.current || (!sector && !timing)) return;
    step2Sent.current = true;
    setStep2("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact-step2", ref, sector, timing, ...submitted.current }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent("form_step2_submit", {
        form_name: "contact",
        sector: sector || "none",
        timing: timing || "none",
      });
      setStep2("done");
    } catch {
      step2Sent.current = false;
      setStep2("error");
    }
  }

  if (done) {
    return (
      <div ref={panelRef} className="scroll-mt-24 border rule-med bg-sheet-2 p-6 md:p-12">
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Got it. We&apos;ll be in touch within two working days.
        </h2>
        <p className="mt-5 text-lg leading-[1.6] text-ink-2">Want to skip the wait? Pick a time.</p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("book_call_click", { source: "contact_success", method: "calendly" })}
          className="pill pill-solid mono-label mt-6 inline-flex min-h-[44px]"
        >
          Book a time
        </a>

        <div className="mt-10 border-t rule-hair pt-8">
          <h3 className="mono-label text-ink-3">Help us prepare (optional)</h3>
          {step2 === "done" ? (
            <p className="mt-4 text-[0.9375rem] leading-[1.6] text-ink-2" role="status">
              Added. Thanks, that helps.
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              <Chips legend="Sector" options={SECTORS} value={sector} onChange={setSector} />
              <Chips legend="Timing" options={TIMINGS} value={timing} onChange={setTiming} />
              <button
                type="button"
                onClick={onStep2}
                disabled={step2 === "sending" || (!sector && !timing)}
                className="pill pill-outline mono-label inline-flex min-h-[44px] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step2 === "sending" ? "Adding" : "Add this"}
              </button>
              {step2 === "error" && (
                <p className="text-[0.9375rem] leading-[1.6] text-ink-2" role="alert">
                  That did not go through, but your enquiry is already with us.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={onSubmit} onFocus={onFocus} noValidate className="max-w-2xl">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="space-y-6">
        <div>
          <label className={labelCls} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={invalid || undefined}
            className={fieldCls}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="contact">
            Email or mobile
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            inputMode={contactMode}
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? "contact-hint" : undefined}
            /* Switch the keyboard once the first character shows which it is. */
            onChange={(e) => {
              const first = e.currentTarget.value.trimStart()[0];
              setContactMode(first ? (/[0-9+]/.test(first) ? "tel" : "email") : undefined);
            }}
            className={fieldCls}
          />
          {invalid && (
            <p id="contact-hint" className="mt-2 text-[0.9375rem] leading-[1.5] text-ink-2" role="alert">
              Please add your name and an email address or NZ phone number.
            </p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor="businessName">
            Business name <span className="normal-case tracking-normal text-ink-3">(optional)</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            className={fieldCls}
          />
        </div>

        <Chips legend="What do you need more of?" options={NEEDS} value={need} onChange={setNeed} />

        <div>
          <label className={labelCls} htmlFor="message">
            Anything else? <span className="normal-case tracking-normal text-ink-3">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="The boat, the season, the problem. A line is plenty."
            className={`${fieldCls} resize-y`}
          />
        </div>
      </div>

      {status === "error" && (
        <div className="mt-6 border rule-med px-4 py-4 text-[0.9375rem] leading-[1.6] text-ink-2" role="alert">
          We could not send that. Everything you typed is still here, so try again, or reach Zak
          directly on{" "}
          <a href={`tel:${zak.phone}`} className="font-mono tnum text-ink underline underline-offset-4">
            {zak.phoneDisplay}
          </a>{" "}
          or{" "}
          <a href={`mailto:${zak.email}`} className="text-ink underline underline-offset-4">
            {zak.email}
          </a>
          .
        </div>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="pill pill-solid mono-label inline-flex min-h-[44px] w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending" : "Send it to Zak and Jonty"}
        </button>
        <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-ink-2">
          We reply within two working days. No mailing list.
        </p>
      </div>
    </form>
  );
}
