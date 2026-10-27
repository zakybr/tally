import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { FaqList } from "@/components/PageShell";
import { SERVICE_FAQS, SERVICE_LINKS } from "@/lib/services";
import { routeMetadata } from "@/lib/routes";
import { SITE_URL, breadcrumbNode, faqNode, webPageNode } from "@/lib/seo";

/*
  The services hub: a short section per service, each linking to its own page.
  Section ids keep the old one-page anchors (/services#paid-ads and so on), so
  inbound links and the redirects that point at them still land in the right place.
*/

const PATH = "/services";

export const metadata: Metadata = routeMetadata(PATH);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

const nodes = [
  webPageNode({ path: PATH, name: "Social media marketing services", description: metadata.description ?? "" }),
  {
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#list`,
    itemListElement: SERVICE_LINKS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE_URL}${s.href}`,
    })),
  },
  breadcrumbNode(PATH, crumbs),
  faqNode(PATH, SERVICE_FAQS),
];

export default function ServicesPage() {
  return (
    <PageShell
      title="Social media marketing services"
      accent="that move the business"
      intro="Five services, plus Instagram account recovery, each aimed at an outcome your business can count: enquiries, bookings, sales or staff. Not sure which you need? Start with the free audit."
      source="services_hero"
      crumbs={crumbs}
      nodes={nodes}
    >
      <div className="mt-20 divide-y divide-[var(--w-hair)] border-y rule-hair">
        {SERVICE_LINKS.map((s, i) => (
          <section
            key={s.anchor}
            id={s.anchor}
            className="grid scroll-mt-24 gap-4 py-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16"
          >
            <div>
              <span className="mono-label text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="display mt-3 text-[2rem] text-ink md:text-[2.5rem]">{s.name}</h2>
            </div>
            <div>
              <p className="max-w-[60ch] text-[1.0625rem] leading-[1.65] text-ink-2">{s.hub}</p>
              <p className="mono-label mt-5 text-ink-3">Measured in: {s.measuredIn}</p>
              <Link
                href={s.href}
                className="mt-5 inline-block text-[0.9375rem] font-semibold text-signal hover:text-ink"
              >
                {s.linkText}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <FaqList faqs={SERVICE_FAQS} heading="Services FAQ" />
    </PageShell>
  );
}
