import Link from "next/link";
import Nav from "@/components/Nav";
import BookCall from "@/components/BookCall";
import TallyMark from "@/components/TallyMark";
import OnePagerGate from "@/components/OnePagerGate";
import type { Vertical } from "@/lib/verticals";
import { VERTICALS } from "@/lib/verticals";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export default function VerticalPage({ vertical }: { vertical: Vertical }) {
  const others = VERTICALS.filter((v) => v.slug !== vertical.slug);
  const jsonLd = [
    faqJsonLd(vertical.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Primary industries marketing", path: "/primary-industries-marketing" },
      { name: vertical.shortName, path: vertical.path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: vertical.name,
      description: vertical.description,
      url: `${SITE_URL}${vertical.path}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "New Zealand" },
    },
  ];

  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <div className="eyebrow mb-6">{vertical.eyebrow}</div>
          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {vertical.title}
          </h1>
          <p className="mt-7 text-lg leading-[1.65] text-ink-2">{vertical.intro}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
            >
              Start the Proof
            </Link>
            <BookCall source={vertical.slug} />
          </div>
        </header>

        <section className="mt-20 grid gap-10 border-t border-hairline pt-16 lg:grid-cols-2">
          <div>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">The gap</h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-ink-2">{vertical.pain}</p>
          </div>
          <div>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
              How Tally works it
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.75] text-ink-2">{vertical.approach}</p>
          </div>
        </section>

        <section className="mt-20 border-t border-hairline pt-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink">
            Outcomes we guarantee
          </h2>
          <div className="mt-10 divide-y divide-hairline border border-hairline">
            {vertical.outcomes.map((o, i) => (
              <div key={o.name} className="grid gap-4 p-8 md:grid-cols-[220px_1fr] md:gap-10">
                <div>
                  <div className="font-mono text-sm text-amber">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-ink">
                    {o.name}
                  </h3>
                </div>
                <p className="text-[0.9375rem] leading-[1.7] text-ink-2">{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-hairline pt-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
          <div className="mt-10 divide-y divide-hairline border border-hairline">
            {vertical.faqs.map((f) => (
              <details key={f.question} className="group bg-bg p-8 open:bg-panel">
                <summary className="cursor-pointer list-none font-sans text-lg font-semibold tracking-tight text-ink">
                  <span className="flex items-start justify-between gap-6">
                    {f.question}
                    <span className="mono-label shrink-0 text-amber transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-hairline pt-16 lg:grid-cols-2">
          <div className="border border-hairline bg-panel p-8 md:p-10">
            <div className="eyebrow mb-4">Next step</div>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
              Tell us the number for {vertical.shortName.toLowerCase()}.
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">
              Qualify in a few minutes, or book a short call in Outlook via Microsoft Bookings.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
              >
                Start the Proof
              </Link>
              <BookCall source={`${vertical.slug}_cta`} />
            </div>
          </div>
          <OnePagerGate />
        </section>

        <nav className="mt-16 border-t border-hairline pt-10" aria-label="Related sectors">
          <div className="mono-label mb-4 text-ink-2">Related sectors</div>
          <div className="flex flex-wrap gap-4">
            {others.map((v) => (
              <Link
                key={v.slug}
                href={v.path}
                className="mono-label text-amber transition-colors hover:text-ink"
              >
                {v.shortName}
              </Link>
            ))}
            <Link
              href="/primary-industries-marketing"
              className="mono-label text-ink-2 transition-colors hover:text-ink"
            >
              All primary industries
            </Link>
          </div>
        </nav>
      </article>

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <TallyMark size={18} />
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <Link href="/" className="text-ink hover:text-amber">
              Tally
            </Link>
            . {vertical.name}, New Zealand. © 2026 Tally.
          </p>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
