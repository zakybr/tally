"use client";

import { trackEvent } from "@/lib/analytics";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "";

type Props = {
  className?: string;
  label?: string;
  source?: string;
};

/*
  Calendly booking CTA. Set NEXT_PUBLIC_BOOKING_URL to the event link
  (e.g. https://calendly.com/you/30min). Calendly syncs to Outlook and
  can create the Zoom meeting. Falls back to mailto if unset.
*/
export default function BookCall({
  className = "mono-label border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink",
  label = "Book a call",
  source = "site",
}: Props) {
  if (BOOKING_URL) {
    return (
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => trackEvent("book_call_click", { source, method: "calendly" })}
      >
        {label}
      </a>
    );
  }

  const subject = encodeURIComponent("Tally · Book a Proof conversation");
  const body = encodeURIComponent(
    "Hi Zak / Jonty,\n\nI'd like to book a short call about an outcome-guaranteed Proof sprint.\n\nCompany:\nSector:\nOutcome we need moved:\nAvailability (NZ time):\n\nThanks,",
  );

  return (
    <a
      href={`mailto:zak@tallynz.co?subject=${subject}&body=${body}`}
      className={className}
      onClick={() => trackEvent("book_call_click", { source, method: "mailto" })}
    >
      {label}
    </a>
  );
}
