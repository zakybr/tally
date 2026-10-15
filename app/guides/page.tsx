import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import TallyMark from "@/components/TallyMark";
import { GUIDES } from "@/lib/guides";
import { getService } from "@/lib/services";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

const title = "Instagram guides for New Zealand businesses";
const description =
  "Plain-English guides for New Zealand businesses: disabled and banned Instagram accounts, appeals, recovery scams, username claims and organic growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: `${title} | Tally`,
    description,
    url: "/guides",
  },
};

export default function Page() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `${SITE_URL}/guides`,
      inLanguage: "en-NZ",
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: GUIDES.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${g.path}`,
          name: g.title,
        })),
      },
    },
  ];

  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-32 pt-36 md:px-12 md:pt-44 lg:px-20">
        <header className="max-w-3xl">
          <h1 className="display max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-[1.55] text-ink-2">
            What to do when Instagram goes wrong for a business, and how to grow it when it is
            working. Written by the team that runs Tally&apos;s account recovery, username claims
            and Instagram growth services.
          </p>
        </header>

        <section className="mt-24 border-t rule-hair pt-4">
          <div className="divide-y divide-[var(--w-hair)]">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={g.path}
                className="group grid gap-4 py-10 md:grid-cols-[260px_1fr] md:gap-12"
              >
                <div className="mono-label text-ink-3">{getService(g.service)?.shortName}</div>
                <div>
                  <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-ink-2">
                    {g.title}
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-[1.7] text-ink-2">
                    {g.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
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
