import Link from "next/link";
import TallyMark from "@/components/TallyMark";
import BookCall from "@/components/BookCall";
import Pill from "@/components/Pill";
import { PEOPLE } from "@/lib/contact";

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

const colHead = "font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3 mb-4";
/* `block w-fit`, not `inline-block`: the column needs one link per line, and the
   wipe rule has to span the label rather than the whole column. */
const colLink = "mono-label link-wipe block w-fit py-1.5 text-ink-2 hover:text-ink";

/* Closing CTA aimed at the form, then a columned footer with legal on its own rule. */
export default function FooterCta() {
  return (
    <div>
      <section id="contact" className="border-t rule-heavy bg-sheet-2 py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div>
            <h2 className="max-w-[14ch] font-sans text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] text-ink md:text-[4.5rem]">
              Hold us to the number.
            </h2>
            <p className="mt-7 max-w-[46ch] text-lg leading-[1.6] text-ink-2">
              Tell us what you need moved. We will tell you straight whether we can guarantee it,
              and what it would take. That answer costs you nothing.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Pill href="/contact">Start the Proof</Pill>
              <BookCall source="footer_cta" label="Or book a 30-minute call" />
            </div>
            <div className="mt-10 flex flex-col gap-2 border-t rule-hair pt-6 sm:flex-row sm:flex-wrap sm:gap-x-10">
              {PEOPLE.map((p) => (
                <p key={p.email} className="mono-label text-ink-2">
                  {p.name.split(" ")[0]}{" "}
                  <a
                    href={`tel:${p.phone}`}
                    className="font-mono tnum text-ink transition-colors hover:text-signal"
                  >
                    {p.phoneDisplay}
                  </a>{" "}
                  <a href={`mailto:${p.email}`} className="link-wipe text-ink-2 hover:text-ink">
                    {p.email}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t rule-med bg-sheet pb-[84px] pt-14 lg:pb-24">
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
                className="mono-label link-wipe mt-6 inline-block text-ink hover:text-ink-2"
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
          <div className="mt-12 flex flex-col gap-4 border-t rule-hair pt-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[0.6875rem] text-ink-2">
              © 2026 Tally. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="mono-label link-wipe text-ink-2 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
