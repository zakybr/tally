import Link from "next/link";
import Reveal from "@/components/Reveal";
import TallyMark from "@/components/TallyMark";
import BookCall from "@/components/BookCall";
import Arrow from "@/components/Arrow";

const sectorLinks = [
  { href: "/seafood-aquaculture-marketing", label: "Seafood & aquaculture" },
  { href: "/marine-marketing", label: "Marine & charter" },
  { href: "/forestry-marketing", label: "Forestry & wood" },
  { href: "/horticulture-marketing", label: "Horticulture" },
  { href: "/primary-industries-marketing", label: "All sectors" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/guarantee", label: "The guarantee" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/proof", label: "Proof" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
  { href: "/llms.txt", label: "llms.txt" },
];

const colHead = "mono-label mb-5 text-amber";
const colLink = "mono-label block py-1.5 text-ink-2 transition-colors duration-300 hover:text-ink";

/* Closing CTA aimed at the form, then a columned footer with legal on its own rule. */
export default function FooterCta() {
  return (
    <>
      <section id="contact" className="border-t border-hairline bg-panel py-28 md:py-40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="eyebrow mb-6">Start the Proof</div>
            <h2 className="max-w-4xl font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
              Hold us to the number.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-ink-2">
              Tell us what you need moved: applications, bookings, enquiries, or just being known
              in your patch before the season. We will tell you straight whether we can guarantee
              it, and exactly what it would take if we can. That answer costs you nothing.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="mono-label group inline-flex items-center gap-3 border border-amber bg-amber px-7 py-4 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
              >
                Start the Proof
                <Arrow
                  size={16}
                  className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Link>
              <BookCall source="footer_cta" label="Or book a 30-minute call" />
            </div>
            <p className="mono-label mt-8 text-ink-2">
              Prefer email?{" "}
              <a
                href="mailto:zak@tallynz.co"
                className="text-amber transition-colors hover:text-ink"
              >
                zak@tallynz.co
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-hairline pb-[84px] pt-16 lg:pb-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Link href="/" className="flex min-h-[44px] items-center gap-3" aria-label="Tally home">
                <TallyMark size={20} />
                <span className="font-sans text-lg font-semibold tracking-tight text-ink">
                  tally
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-[0.875rem] leading-[1.7] text-ink-2">
                Primary industries and marine marketing, New Zealand. Brand, reach, recruitment and
                bookings, with the agreed number written into the contract.
              </p>
              <a
                href="mailto:zak@tallynz.co"
                className="mono-label mt-6 inline-block border-b border-hairline pb-1 text-ink transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                zak@tallynz.co
              </a>
            </div>

            <nav aria-label="Sectors">
              <h2 className={colHead}>Sectors</h2>
              {sectorLinks.map((l) => (
                <Link key={l.href} href={l.href} className={colLink}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Company">
              <h2 className={colHead}>Company</h2>
              {companyLinks.map((l) => (
                <Link key={l.href} href={l.href} className={colLink}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal sits on its own rule so it is findable rather than buried in the link soup. */}
          <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[0.6875rem] text-ink-2">
              © 2026 Tally. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="mono-label text-ink-2 transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
