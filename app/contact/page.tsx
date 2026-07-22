import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import TallyMark from "@/components/TallyMark";

export const metadata: Metadata = {
  title: "Start the Proof",
  description:
    "Tell us the outcome you need moved and we'll tell you straight whether we can guarantee it. Qualification brief for recruitment, reach and enquiry campaigns across New Zealand's primary sector.",
  alternates: { canonical: "/contact" },
};

const qualify = [
  "A real, budgeted outcome to move: vacancies, reach, or enquiries",
  "A baseline that exists, or one we set together in discovery",
  "One decision-maker with budget authority and a 48-hour response SLA",
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
            <div className="eyebrow mb-6">Start the Proof · Qualification</div>
            <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Tell us the number.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.6] text-ink-2">
              One conversation. We only take briefs we can guarantee, so this is where we work out
              whether yours is one of them. Answer honestly; it saves us both time.
            </p>

            <div className="mt-12 border-t border-hairline pt-8">
              <div className="mono-label mb-6 text-amber">You&apos;ll qualify if:</div>
              <ul className="space-y-5">
                {qualify.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[0.9375rem] leading-[1.7] text-ink-2"
                  >
                    <span className="mt-0.5 font-mono text-amber" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-md text-sm leading-[1.7] text-ink-2">
                Prefer email? Reach the partners directly at{" "}
                <a
                  href="mailto:zak@tallynz.co"
                  className="text-amber underline-offset-4 hover:underline"
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

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <Link href="/" aria-label="Tally home">
            <TallyMark size={18} />
          </Link>
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <b className="text-ink">Tally</b>. The only primary-sector partner in NZ that guarantees
            the outcome. We guarantee what we control; we never guarantee sales. © 2026 Tally.
          </p>
        </div>
      </footer>
    </main>
  );
}
