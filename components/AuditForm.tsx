"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { attributionPayload, trackEvent } from "@/lib/analytics";
import { newEventId, trackMeta } from "@/lib/meta-pixel";
import { SPEND_RANGES } from "@/lib/audit";

/*
  Free enquiry audit request.

  On success: GA4 audit_request, the Meta Lead with a fresh event_id (the
  server sends the same id to the Conversions API so Meta counts it once),
  then on to /audit/thanks. Both trackers are client-side navigations away
  from unloading, so neither is cut off by the redirect.

  Built for a phone first: one column, 16px inputs so iOS does not zoom,
  the right keyboard for each field, and autocomplete on everything.
*/

type Status = "idle" | "submitting" | "error";

const labelCls = "mono-label block text-ink-2";
const fieldCls =
  "mt-2 w-full border rule-med bg-sheet-2 px-4 py-3.5 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink-3 focus:border-[var(--signal)]";

export default function AuditForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(form).entries());
    const attribution = attributionPayload();
    const eventId = newEventId();

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...attribution,
          eventId,
          pageUrl: window.location.href,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      trackEvent("audit_request", {
        method: "audit_form",
        monthly_spend: String(data.monthlySpend ?? ""),
        currency: "NZD",
        ...attribution,
      });
      trackMeta("Lead", { content_name: "enquiry_audit" }, eventId);
      router.push("/audit/thanks");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form method="post" onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot. Not named "website", which is a real field here. */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label className={labelCls} htmlFor="a-name">
          Your name
        </label>
        <input id="a-name" name="name" required autoComplete="name" className={fieldCls} />
      </div>

      <div>
        <label className={labelCls} htmlFor="a-business">
          Business name
        </label>
        <input
          id="a-business"
          name="businessName"
          required
          autoComplete="organization"
          className={fieldCls}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="a-website">
          Website
        </label>
        <input
          id="a-website"
          name="website"
          type="text"
          inputMode="url"
          required
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="yourbusiness.co.nz"
          className={fieldCls}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="a-email">
          Email
        </label>
        <input
          id="a-email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          className={fieldCls}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="a-phone">
          Phone
        </label>
        <input
          id="a-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="021 123 4567"
          className={fieldCls}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="a-enquiry">
          What counts as an enquiry for you?{" "}
          <span className="normal-case tracking-normal text-ink-3">(optional)</span>
        </label>
        <textarea
          id="a-enquiry"
          name="enquiryDefinition"
          rows={3}
          placeholder="A quote request, a booked call, a walk-in. Whatever you would count."
          className={`${fieldCls} resize-y`}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="a-spend">
          Monthly marketing spend
        </label>
        <select id="a-spend" name="monthlySpend" required defaultValue="" className={fieldCls}>
          <option value="" disabled>
            Select a range
          </option>
          {SPEND_RANGES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p className="mono-label border rule-med px-4 py-3 text-ink-2" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="pill pill-solid mono-label inline-flex w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending" : "Request the free audit"}
      </button>
      <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-3">
        No cost and no obligation. We use your details to prepare the audit and contact you about
        it. See our{" "}
        <Link href="/privacy" className="text-ink-2 underline underline-offset-4 hover:text-ink">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
