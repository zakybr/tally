"use client";

import { useState } from "react";
import Link from "next/link";

const industries = [
  "Seafood & aquaculture",
  "Forestry & wood processing",
  "Horticulture",
  "Viticulture & wine",
  "Food & beverage processing",
  "Meat processing",
  "Dairy processing",
  "Operators & co-ops",
  "Funded agritech",
  "Other primary sector",
];

const companySizes = ["1–20", "21–50", "51–200", "201–500", "500+"];

const outcomes = [
  "Recruitment / applications",
  "Reach / attention",
  "Pipeline / enquiries",
  "Not sure yet",
];

const authorities = ["Yes, I hold it", "Shared", "No"];
const budgetStatuses = ["Budget allocated", "Budget being scoped", "Exploring"];
const timelines = ["Immediate", "This quarter", "This half", "Exploring"];

type Status = "idle" | "submitting" | "success" | "error";

const labelCls = "mono-label block text-ink-2";
const fieldCls =
  "mt-2 w-full border border-hairline bg-bg px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-2/60 focus:border-amber";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-amber-dim bg-panel p-8 md:p-12">
        <div className="eyebrow mb-5">Received</div>
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          We have your brief.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-[1.6] text-ink-2">
          One of the partners will read it personally and reply within two working days. If we
          can&apos;t guarantee your outcome, we&apos;ll tell you straight, and exactly what it would
          take if we can.
        </p>
        <Link
          href="/"
          className="mono-label mt-8 inline-block border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl">
      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Name <span className="text-amber">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Work email <span className="text-amber">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="company">
            Company / organisation <span className="text-amber">*</span>
          </label>
          <input id="company" name="company" required autoComplete="organization" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="role">
            Your role
          </label>
          <input id="role" name="role" autoComplete="organization-title" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="industry">
            Industry / sector <span className="text-amber">*</span>
          </label>
          <select id="industry" name="industry" required defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Select a sector
            </option>
            {industries.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="companySize">
            Company size (staff)
          </label>
          <select id="companySize" name="companySize" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Select a range
            </option>
            {companySizes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="outcome">
            Primary outcome
          </label>
          <select id="outcome" name="outcome" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              What should the number move?
            </option>
            {outcomes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="timeline">
            Timeline
          </label>
          <select id="timeline" name="timeline" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              When would you start?
            </option>
            {timelines.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="budgetAuthority">
            Budget authority
          </label>
          <select id="budgetAuthority" name="budgetAuthority" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Do you hold budget?
            </option>
            {authorities.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="budgetStatus">
            Budget status
          </label>
          <select id="budgetStatus" name="budgetStatus" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Is spend allocated?
            </option>
            {budgetStatuses.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className={labelCls} htmlFor="message">
          The outcome, in your words
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="The role you can't fill, the reach you need, or the enquiries you're chasing. Include a baseline number if you have one."
          className={`${fieldCls} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="mono-label mt-6 border border-amber-dim px-4 py-3 text-amber" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit the brief"}
        </button>
        <span className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
          Required fields marked <span className="text-amber">*</span>. We reply within two working
          days.
        </span>
      </div>
    </form>
  );
}
