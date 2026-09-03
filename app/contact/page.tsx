import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import BookCall from "@/components/BookCall";
import TallyMark from "@/components/TallyMark";

export const metadata: Metadata = {
  title: "Contact | Primary Industries Marketing NZ",
  description:
    "Qualify for Tally's outcome-guaranteed primary industries marketing in New Zealand. Recruitment, reach and enquiry campaigns for seafood, forestry, horticulture, processing and agritech.",
  keywords: [
    "contact primary industries marketing NZ",
    "recruitment marketing agency New Zealand",
    "agribusiness marketing enquiry",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Tally | Primary Industries Marketing NZ",
    description:
      "Qualification brief for outcome-guaranteed marketing across New Zealand's primary sector.",
    url: "/contact",
  },
};

const qualify = [
  "A real outcome to move: vacancies, reach, enquiries or bookings",
  "A baseline that exists, or one we set together in discovery",
  "Someone who can decide and come back to us inside 48 hours",
  "An operation that is sound, so content amplifies it rather than its flaws",
];

export default function ContactPage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Intro + qualification criteria */}
          <div>
            <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Tell us the number.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.6] text-ink-2">
              One conversation, whatever the size of the operation. We only take briefs we can
              guarantee, so this is where we work out whether yours is one of them. Answer honestly;
              it saves us both time.
            </p>

            <div className="mt-12 border-t rule-hair pt-8">
              <div className="mono-label mb-6 text-ink-3">You&apos;ll qualify if:</div>
              <ul className="space-y-5">
                {qualify.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[0.9375rem] leading-[1.7] text-ink-2"
                  >
                    <span className="mt-0.5 font-mono text-ink-3" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-md text-sm leading-[1.7] text-ink-2">
                Prefer a calendar slot?{" "}
                <BookCall
                  source="contact_intro"
                  className="text-ink-3 underline-offset-4 hover:underline"
                  label="Book a call"
                />
                . Or email{" "}
                <a
                  href="mailto:zak@tallynz.co"
                  className="text-ink-3 underline-offset-4 hover:underline"
                >
                  zak@tallynz.co
                </a>
                .
              </p>
            </div>
          </div>

          {/* The questionnaire */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t rule-hair py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <Link href="/" aria-label="Tally home">
            <TallyMark size={18} />
          </Link>
          <p className="max-w-2xl font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <b className="text-ink">Tally</b>. Primary industries and marine marketing, New Zealand.
            We guarantee what we control; we never guarantee sales. © 2026 Tally.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2 md:ml-auto">
            <Link
              href="/privacy"
              className="mono-label text-ink-2 transition-colors duration-300 hover:text-ink"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="mono-label text-ink-2 transition-colors duration-300 hover:text-ink"
            >
              Terms of service
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
