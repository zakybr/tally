import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import BookCall from "@/components/BookCall";
import OnePagerGate from "@/components/OnePagerGate";
import TallyMark from "@/components/TallyMark";

export const metadata: Metadata = {
  title: "Start the Proof | Outcome-Guaranteed Marketing",
  description:
    "Book a Proof sprint with Tally. Outcome-guaranteed recruitment, reach or enquiry campaigns for New Zealand primary industries. Miss clause in the contract.",
  alternates: { canonical: "/proof" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Start the Proof | Tally",
    description:
      "One agreed number. Fee at risk. Built for seafood, forestry, horticulture, processing and agritech.",
    url: "/proof",
  },
};

const points = [
  {
    k: "One number",
    body: "Qualified applications, reach or enquiries. Agreed before anything is made.",
  },
  {
    k: "Fee at risk",
    body: "Miss and we keep working at our cost, or the fee is credited. Printed in the contract.",
  },
  {
    k: "Headless delivery",
    body: "One update a week. No production calls. You hold us to the tally.",
  },
];

/*
  Conversion landing for paid search and LinkedIn.
  Short, keyword-clear, CTAs above the fold. No hero image budget.
*/
export default function ProofPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="eyebrow mb-6">Proof sprint · NZ primary industries</div>
            <h1 className="max-w-2xl font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Hold us to the number.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-[1.65] text-ink-2">
              Outcome-guaranteed marketing for seafood, forestry, horticulture, food processing and
              agritech. Content is the mechanism. The tally is the product.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
              >
                Start the Proof
              </Link>
              <BookCall
                source="proof_page"
                className="mono-label border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
                label="Book a call in Outlook"
              />
            </div>

            <div className="mt-16 divide-y divide-hairline border border-hairline">
              {points.map((p, i) => (
                <div key={p.k} className="grid gap-3 p-6 md:grid-cols-[160px_1fr] md:gap-8">
                  <div>
                    <div className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</div>
                    <div className="mono-label mt-2 text-ink">{p.k}</div>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-2">{p.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-xl text-sm leading-[1.7] text-ink-2">
              Best for funded exporters, processors, co-ops and large operators with a budgeted
              outcome. Not a fit for output-only retainers or briefs with no baseline.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border border-hairline bg-panel p-8 md:p-10">
              <div className="eyebrow mb-4">Fast path</div>
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
                Prefer a calendar invite?
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">
                Use Microsoft Bookings (free with Outlook / Microsoft 365) to pick a slot. Or submit
                the qualification brief and we reply within two working days.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookCall
                  source="proof_sidebar"
                  className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
                  label="Book via Outlook"
                />
                <Link
                  href="/contact"
                  className="mono-label border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
                >
                  Submit a brief
                </Link>
              </div>
            </div>
            <OnePagerGate />
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <TallyMark size={18} />
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <Link href="/" className="text-ink hover:text-amber">
              Tally
            </Link>
            . Outcome-guaranteed primary industries marketing, New Zealand. © 2026 Tally.
          </p>
        </div>
      </footer>
    </main>
  );
}
