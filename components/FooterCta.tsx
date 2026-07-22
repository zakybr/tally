import Link from "next/link";
import Reveal from "@/components/Reveal";
import TallyMark from "@/components/TallyMark";

/* Spare institutional footer: single CTA, one-line positioning statement. */
export default function FooterCta() {
  return (
    <>
      <section id="contact" className="border-t border-hairline bg-panel py-32 md:py-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="eyebrow mb-6">Start the Proof</div>
            <h2 className="max-w-4xl font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
              Hold us to the number.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-ink-2">
              One conversation. We&apos;ll tell you straight if we can&apos;t guarantee your
              outcome, and exactly what it would take if we can.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
              >
                Start the Proof
              </Link>
              <a
                href="#guarantee"
                className="mono-label border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
              >
                Re-read the guarantee
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-4 px-6 md:px-12 lg:px-20">
          <TallyMark size={18} />
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <b className="text-ink">Tally</b>. Primary industries marketing agency, New Zealand.
            Outcome-guaranteed campaigns for seafood, forestry, horticulture, processing and
            agritech. © 2026 Tally.
          </p>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-5 gap-y-2 md:ml-auto"
          >
            <Link
              href="/primary-industries-marketing"
              className="mono-label text-ink-2 transition-colors hover:text-ink"
            >
              Primary industries marketing
            </Link>
            <Link
              href="/contact"
              className="mono-label text-ink-2 transition-colors hover:text-ink"
            >
              Contact
            </Link>
            <Link
              href="/llms.txt"
              className="mono-label text-ink-2 transition-colors hover:text-ink"
            >
              llms.txt
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
