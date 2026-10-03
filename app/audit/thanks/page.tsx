import type { Metadata } from "next";
import Link from "next/link";
import BookCall from "@/components/BookCall";
import { AuditFooter, AuditHeader } from "@/components/AuditChrome";

/*
  Where /audit sends a successful request. Offers the walkthrough call straight
  away through the site's Calendly link (NEXT_PUBLIC_BOOKING_URL, via BookCall,
  which falls back to email when it is unset). Kept out of search results.
*/

export const metadata: Metadata = {
  title: "Audit requested",
  robots: { index: false, follow: false },
};

export default function AuditThanksPage() {
  return (
    <main className="flex min-h-[100svh] flex-col">
      <AuditHeader />

      <section className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
        <span className="mono-label text-ink-3">Request received</span>
        <h1 className="audit-serif mt-6 max-w-[18ch] text-[2.25rem] leading-[1.08] text-ink sm:text-6xl">
          Your audit is in the queue.
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-2">
          We will start on it now and be in touch within two working days. If you would rather lock
          in the walkthrough call today, pick a time below and we will bring the finished audit to
          it.
        </p>

        <div className="mt-10 border-t rule-med pt-8">
          <span className="mono-label text-ink-3">Walkthrough call</span>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.6] text-ink-2">
            Thirty minutes on Zoom. We go through the three fixes and the number, and you decide
            what happens next.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCall
              source="audit_thanks"
              label="Book the walkthrough call"
              className="pill pill-solid mono-label inline-flex w-full sm:w-auto"
            />
            <Link
              href="/"
              className="mono-label inline-flex min-h-[44px] items-center justify-center text-ink-2 hover:text-ink"
            >
              Back to tallynz.co
            </Link>
          </div>
        </div>
      </section>

      <AuditFooter />
    </main>
  );
}
