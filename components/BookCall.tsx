"use client";

import { trackEvent } from "@/lib/analytics";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "";

type Props = {
  className?: string;
  label?: string;
  source?: string;
};

/*
  Free Outlook booking via Microsoft Bookings / Bookings with me.
  Set NEXT_PUBLIC_BOOKING_URL to your personal Bookings page, e.g.
  https://outlook.office.com/bookwithme/... or your Bookings calendar URL.
  Falls back to a mailto that opens Outlook compose if unset.
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
        onClick={() => trackEvent("book_call_click", { source, method: "microsoft_bookings" })}
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
      onClick={() => trackEvent("book_call_click", { source, method: "mailto_outlook" })}
    >
      {label}
    </a>
  );
}
