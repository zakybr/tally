import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import BookCall from "@/components/BookCall";
import { PEOPLE } from "@/lib/contact";

/*
  Where /audit sends a successful request. Offers the call straight away:
  Calendly through BookCall, or Zak's number. Kept out of search results.
*/

export const metadata: Metadata = {
  title: "Audit requested",
  robots: { index: false, follow: false },
};

export default function AuditThanksPage() {
  const zak = PEOPLE[0];
  return (
    <main className="flex min-h-[100svh] flex-col">
      <Nav />
      <section className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-24 pt-36 md:px-12 md:pt-44 lg:px-20">
        <h1 className="display max-w-[14ch] text-[3rem] text-ink md:text-[4.5rem]">
          Got it. <span className="text-signal">We are on it.</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-lg leading-[1.55] text-ink-2">
          We will be in touch within one working day to go through what we find. Want to lock in a
          time now, or talk today?
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <BookCall
            source="audit_thanks"
            label="Book a time"
            className="pill pill-solid mono-label inline-flex"
          />
          <a href={`tel:${zak.phone}`} className="pill pill-outline mono-label inline-flex">
            Call {zak.phoneDisplay}
          </a>
          <Link
            href="/"
            className="mono-label inline-flex min-h-[44px] items-center px-2 text-ink-2 hover:text-ink"
          >
            Back to the site
          </Link>
        </div>
      </section>
    </main>
  );
}
