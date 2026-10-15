import Link from "next/link";
import Pill from "@/components/Pill";
import Nav from "@/components/Nav";
import BookCall from "@/components/BookCall";
import TallyMark from "@/components/TallyMark";
import OnePagerGate from "@/components/OnePagerGate";
import type { Vertical } from "@/lib/verticals";
import { VERTICALS } from "@/lib/verticals";
import type { Service } from "@/lib/services";
import { SERVICES } from "@/lib/services";
import { guidesForService } from "@/lib/guides";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/*
  One layout for two kinds of page. A sector page sits under primary industries
  and links across the sectors; a service page (the Instagram work) sits at the
  root, links across the services, leads with its own CTA and drops the
  guarantee one-pager, which is written for primary-sector procurement.
*/
export default function VerticalPage({ vertical }: { vertical: Vertical | Service }) {
  const service = "cta" in vertical ? vertical : null;
  const others = service
    ? SERVICES.filter((s) => s.slug !== vertical.slug)
    : VERTICALS.filter((v) => v.slug !== vertical.slug);
  const guides = service ? guidesForService(service.slug) : [];
  const cta = service?.cta ?? { label: "Start the Proof", href: "/contact" };
  const jsonLd = [
    faqJsonLd(vertical.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      ...(service
        ? []
        : [{ name: "Primary industries marketing", path: "/primary-industries-marketing" }]),
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
      <article className="mx-auto max-w-[1440px] px-6 pb-32 pt-36 md:px-12 md:pt-44 lg:px-20">
        <header className="max-w-3xl">
          <h1 className="display max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
            {vertical.title}
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-[1.55] text-ink-2">{vertical.intro}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Pill href={cta.href}>{cta.label}</Pill>
            <BookCall source={vertical.slug} />
          </div>
        </header>

        <section className="mt-24 grid gap-12 border-t rule-hair pt-16 lg:grid-cols-2 lg:gap-20">
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

        <section className="mt-24 border-t rule-hair pt-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink">
            {service?.outcomesHeading ?? "Outcomes we guarantee"}
          </h2>
          <div className="mt-12 divide-y divide-[var(--w-hair)]">
            {vertical.outcomes.map((o) => (
              <div key={o.name} className="grid gap-4 py-8 md:grid-cols-[260px_1fr] md:gap-12">
                <div>
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.02em] text-ink">
                    {o.name}
                  </h3>
                </div>
                <p className="text-[0.9375rem] leading-[1.7] text-ink-2">{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t rule-hair pt-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
          <div className="mt-12 divide-y divide-[var(--w-hair)]">
            {vertical.faqs.map((f) => (
              <details key={f.question} className="group py-7">
                <summary className="cursor-pointer list-none font-sans text-lg font-semibold tracking-tight text-ink">
                  <span className="flex items-start justify-between gap-6">
                    {f.question}
                    <span className="mono-label shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-12 border-t rule-hair pt-16 lg:grid-cols-2 lg:gap-20">
          <div className="bg-sheet-2 p-8 md:p-10">
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
              {service
                ? "Tell us what happened to the account."
                : `Tell us the number for ${vertical.shortName.toLowerCase()}.`}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">
              {service
                ? "Call or text Zak on 022 305 3853, or book a 30-minute Zoom call via Calendly. The first read is free."
                : "Qualify in a few minutes, or book a 30-minute Zoom call via Calendly."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Pill href={cta.href}>{cta.label}</Pill>
              <BookCall source={`${vertical.slug}_cta`} />
            </div>
          </div>
          {service ? null : <OnePagerGate />}
        </section>

        {guides.length ? (
          <nav className="mt-24 border-t rule-hair pt-10" aria-label="Guides">
            <div className="mono-label mb-4 text-ink-2">Guides</div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={g.path}
                  className="mono-label link-wipe text-ink-2 transition-colors hover:text-ink"
                >
                  {g.shortName}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}

        <nav
          className="mt-24 border-t rule-hair pt-10"
          aria-label={service ? "Related services" : "Related sectors"}
        >
          <div className="mono-label mb-4 text-ink-2">
            {service ? "Related services" : "Related sectors"}
          </div>
          <div className="flex flex-wrap gap-4">
            {others.map((v) => (
              <Link
                key={v.slug}
                href={v.path}
                className="mono-label link-wipe text-ink-2 transition-colors hover:text-ink"
              >
                {v.shortName}
              </Link>
            ))}
            <Link
              href="/primary-industries-marketing"
              className="mono-label link-wipe text-ink-3 transition-colors hover:text-ink"
            >
              {service ? "Primary industries marketing" : "All primary industries"}
            </Link>
          </div>
        </nav>
      </article>

      <footer className="border-t rule-hair py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <TallyMark size={18} />
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <Link href="/" className="text-ink hover:text-ink-2">
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
