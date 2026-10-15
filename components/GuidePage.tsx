import Link from "next/link";
import Pill from "@/components/Pill";
import Nav from "@/components/Nav";
import BookCall from "@/components/BookCall";
import TallyMark from "@/components/TallyMark";
import type { Guide } from "@/lib/guides";
import { GUIDES } from "@/lib/guides";
import { getService } from "@/lib/services";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/*
  One article in /guides. Same grid, type scale and hairlines as VerticalPage,
  so a reader arriving from search lands on something that already looks like
  the service page it hands them to. The direct answer sits above the fold for
  skimmers and answer engines; the service hand-off appears twice, once after
  the answer and once at the end.
*/
export default function GuidePage({ guide }: { guide: Guide }) {
  const service = getService(guide.service)!;
  const others = GUIDES.filter((g) => g.slug !== guide.slug);
  const jsonLd = [
    articleJsonLd(guide),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.shortName, path: guide.path },
    ]),
    faqJsonLd(guide.faqs),
  ];

  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-32 pt-36 md:px-12 md:pt-44 lg:px-20">
        <header className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mono-label mb-6 text-ink-3">
            <Link href="/guides" className="link-wipe transition-colors hover:text-ink">
              Guides
            </Link>
            <span aria-hidden> · </span>
            <Link href={service.path} className="link-wipe transition-colors hover:text-ink">
              {service.shortName}
            </Link>
          </nav>
          <h1 className="display max-w-[20ch] text-[2.75rem] text-ink md:text-[4rem]">
            {guide.title}
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-[1.55] text-ink-2">{guide.intro}</p>
          <p className="mono-label mt-6 text-ink-3">
            By Zak Rachmadi, Director ·{" "}
            <time dateTime={guide.updated}>
              Updated{" "}
              {new Date(guide.updated).toLocaleDateString("en-NZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </header>

        <section className="mt-16 max-w-3xl bg-sheet-2 p-8 md:p-10">
          <h2 className="mono-label text-ink-2">The short answer</h2>
          <p className="mt-4 text-lg leading-[1.6] text-ink">{guide.answer}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Pill href={service.path}>{service.name}</Pill>
          </div>
        </section>

        <div className="mt-8 max-w-3xl">
          {guide.sections.map((s) => (
            <section key={s.heading} className="mt-16 border-t rule-hair pt-12">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p key={p} className="mt-5 text-[0.9375rem] leading-[1.75] text-ink-2">
                  {p}
                </p>
              ))}
              {s.steps ? (
                <ol className="mt-6 divide-y divide-[var(--w-hair)] border-y rule-hair">
                  {s.steps.map((step, i) => (
                    <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                      <span className="mono-label pt-1 text-ink-3">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] leading-[1.7] text-ink-2">{step}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-24 border-t rule-hair pt-16">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
          <div className="mt-12 divide-y divide-[var(--w-hair)]">
            {guide.faqs.map((f) => (
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

        <section className="mt-24 border-t rule-hair pt-16">
          <div className="max-w-3xl bg-sheet-2 p-8 md:p-10">
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
              Want Tally to handle it?
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">{service.description}</p>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">
              Call or text Zak on 022 305 3853, or book a 30-minute Zoom call via Calendly. The
              first read is free.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Pill href={service.path}>See {service.shortName.toLowerCase()}</Pill>
              <BookCall source={`guide_${guide.slug}`} />
            </div>
          </div>
        </section>

        <nav className="mt-24 border-t rule-hair pt-10" aria-label="More guides">
          <div className="mono-label mb-4 text-ink-2">More guides</div>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={g.path}
                className="mono-label link-wipe text-ink-2 transition-colors hover:text-ink"
              >
                {g.shortName}
              </Link>
            ))}
            <Link
              href="/guides"
              className="mono-label link-wipe text-ink-3 transition-colors hover:text-ink"
            >
              All guides
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
            . Instagram guides for New Zealand businesses. © 2026 Tally.
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
