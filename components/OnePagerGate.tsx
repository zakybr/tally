"use client";

import { useState } from "react";
import { attributionPayload, trackEvent } from "@/lib/analytics";

const labelCls = "mono-label block text-ink-2";
const fieldCls =
  "mt-2 w-full border border-hairline bg-bg px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-2/60 focus:border-amber";

type Status = "idle" | "submitting" | "ready" | "error";

/* Light gate: name + work email unlocks the guarantee one-pager and notifies the partners. */
export default function OnePagerGate() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("/docs/tally-guarantee-one-pager.pdf");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const attribution = attributionPayload();

    try {
      const res = await fetch("/api/one-pager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...attribution }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not unlock the one-pager.");
      const url = typeof json.url === "string" ? json.url : downloadUrl;
      setDownloadUrl(url);
      setStatus("ready");
      trackEvent("generate_lead", {
        method: "one_pager_gate",
        lead_type: "guarantee_one_pager",
        ...attribution,
      });
      trackEvent("file_download", {
        file_name: "tally-guarantee-one-pager.pdf",
        link_url: url,
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="border border-hairline bg-bg p-8 md:p-10">
      <div className="eyebrow mb-4">Procurement pack</div>
      <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
        Guarantee one-pager
      </h2>
      <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">
        One page on how the tally works, what we absorb, and what voids the guarantee. Leave a work
        email to unlock the PDF.
      </p>

      {status === "ready" ? (
        <div className="mt-8">
          <a
            href={downloadUrl}
            download
            className="mono-label inline-block border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
            onClick={() =>
              trackEvent("file_download", {
                file_name: "tally-guarantee-one-pager.pdf",
                link_url: downloadUrl,
                method: "repeat_click",
              })
            }
          >
            Download PDF
          </a>
          <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            Sent. A partner may follow up if the brief looks like a fit.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div>
            <label className={labelCls} htmlFor="op-name">
              Name <span className="text-amber">*</span>
            </label>
            <input id="op-name" name="name" required className={fieldCls} autoComplete="name" />
          </div>
          <div>
            <label className={labelCls} htmlFor="op-email">
              Work email <span className="text-amber">*</span>
            </label>
            <input
              id="op-email"
              name="email"
              type="email"
              required
              className={fieldCls}
              autoComplete="email"
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="op-company">
              Company
            </label>
            <input
              id="op-company"
              name="company"
              className={fieldCls}
              autoComplete="organization"
            />
          </div>
          {status === "error" && (
            <p className="mono-label border border-amber-dim px-4 py-3 text-amber" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Unlocking…" : "Unlock the one-pager"}
          </button>
        </form>
      )}
    </div>
  );
}
