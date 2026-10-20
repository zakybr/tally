"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { trackMeta } from "@/lib/meta-pixel";
import { CALENDLY_URL } from "@/lib/contact-form";

/*
  Calendly booking, inline on the page so nobody leaves the site to book. The
  event already creates the Zoom link on Calendly's side. NEXT_PUBLIC_BOOKING_URL
  wins when set (production sets it to the same event), CALENDLY_URL otherwise.

  Calendly posts messages to the parent window; a booked call is reported as a
  GA4 book_call and a Meta Schedule so ads can optimise for booked calls.
*/
const BASE = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || CALENDLY_URL;

export default function CalendlyEmbed() {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const event = (e.data as { event?: string } | null)?.event;
      if (event === "calendly.event_scheduled") {
        trackEvent("book_call", { method: "calendly_inline", source: "contact" });
        trackMeta("Schedule", { content_name: "zoom_call" });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const src = `${BASE}?embed_type=Inline&embed_domain=tallynz.co&hide_gdpr_banner=1&hide_event_type_details=1&background_color=1f2226&text_color=f2f0ec&primary_color=ff4a1c`;

  return (
    <div className="overflow-hidden rounded-2xl bg-sheet-2">
      <iframe
        src={src}
        title="Book a Zoom call with Tally"
        className="block h-[760px] w-full border-0 md:h-[700px]"
        loading="lazy"
      />
      <p className="px-6 pb-5 pt-3 text-[0.9375rem] text-ink-3">
        Calendar not loading?{" "}
        <a href={BASE} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline underline-offset-4 hover:text-ink">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
