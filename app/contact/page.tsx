import type { Metadata } from "next";
import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { PEOPLE } from "@/lib/contact";
import { breadcrumbJsonLd } from "@/lib/seo";

/*
  Contact: book a Zoom call straight from the page (Calendly, inline), or call
  or email Zak or Jonty. The free audit form is one link away for anyone who
  would rather write.
*/

const DESCRIPTION =
  "Book a free Zoom call with Tally straight from this page, or call Zak on 022 305 3853. New Zealand marketing for consumer and marine brands.";

export const metadata: Metadata = {
  title: "Contact Tally | Book a Zoom Call",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Tally", description: DESCRIPTION, url: "/contact" },
};

const jsonLd = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]),
];

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <h1 className="display text-[3rem] text-ink md:text-[4.5rem]">
            Book a <span className="text-signal">call</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-[1.6] text-ink-2">
            Pick a time below for a free 30-minute Zoom call. We will look at what you need moved and
            tell you straight what we would do. Rather talk now? Just ring.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-14">
          <CalendlyEmbed />

          <aside className="space-y-8 lg:pt-2">
            {PEOPLE.map((p) => (
              <div key={p.email}>
                <p className="mono-label text-ink-3">{p.name}</p>
                <a
                  href={`tel:${p.phone}`}
                  className="mt-2 block text-[1.375rem] font-semibold tracking-[-0.02em] text-ink hover:text-signal"
                >
                  {p.phoneDisplay}
                </a>
                <a href={`mailto:${p.email}`} className="mt-1 block text-[0.9375rem] text-ink-2 hover:text-ink">
                  {p.email}
                </a>
              </div>
            ))}
            <div className="rounded-2xl border rule-med p-6">
              <p className="text-[0.9375rem] leading-[1.6] text-ink-2">
                Rather write? Send a few details through the free audit form and we will come back
                within one working day.
              </p>
              <a
                href="/audit"
                className="mt-4 inline-block text-[0.9375rem] font-semibold text-signal hover:text-ink"
              >
                Get a free audit
              </a>
            </div>
          </aside>
        </div>
      </article>
      <FooterCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
