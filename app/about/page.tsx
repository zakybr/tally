import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import Arrow from "@/components/Arrow";
import SectionHeader from "@/components/SectionHeader";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import jontyImg from "@/public/images/jonty.png";
import zakImg from "@/public/images/zak.png";

export const metadata: Metadata = {
  title: "About Tally | Primary Industries Marketing NZ",
  description:
    "Tally is a New Zealand primary industries marketing agency. Founded by operators from paid social and DTC, built for outcome-guaranteed recruitment, reach and enquiry campaigns across seafood, forestry, horticulture and processing.",
  keywords: [
    "about Tally NZ",
    "primary industries marketing agency New Zealand",
    "outcome guaranteed marketing New Zealand",
    "recruitment marketing agency NZ",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Tally | Primary Industries Marketing NZ",
    description:
      "Who runs Tally, where the method comes from, and why the outcome is written into the contract.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tally | Primary Industries Marketing NZ",
    description:
      "Who runs Tally, where the method comes from, and why the outcome is written into the contract.",
  },
};

const capabilities = [
  {
    k: "Paid social creative testing",
    body: "Variant volume, kill losers fast, shift spend to what converts.",
  },
  {
    k: "Attribution and measurement",
    body: "One agreed figure. A weekly read against baseline. No vanity dashboards.",
  },
  {
    k: "Creator and talent direction",
    body: "On-boat, in-plant, on-farm capture with sector-native talent. No staged sets.",
  },
  {
    k: "Headless delivery",
    body: "You hold us to the number, not the production calendar. One update a week.",
  },
];

const howWeWork = [
  {
    k: "Headless delivery",
    body: "No production calls. No raw-footage approval loops. You see the tally, not the workflow.",
  },
  {
    k: "One number a week",
    body: "A figure against target, in plain English. What is driving it. What we cut.",
  },
  {
    k: "We turn briefs down",
    body: "If we cannot guarantee the outcome, we say so before the fee. Most briefs do not pass the gate.",
  },
  {
    k: "Media spend stays yours",
    body: "Where paid media runs, it runs through your account. Transparent to the dollar. Separate from our fee.",
  },
  {
    k: "Miss clause in writing",
    body: "If the number is missed, we keep working at our cost, or the fee is credited. Printed in the contract.",
  },
];

const directors = [
  {
    img: jontyImg,
    caption: "Co-Founder · JONTY",
    alt: "Jonty MacIntyre standing outside an industrial building in New Zealand, wearing a navy suit and light blue tie",
    name: "Jonty MacIntyre",
    role: "Director",
    bio: "Came out of paid social and direct-to-consumer, where the only metric that cleared was a purchase. Inside Tally he owns the workflows and storyboards: the creative system, the test cadence, and the call to kill underperformers. Experienced with organic growth through @theanalystagenda (35k Following on Instagram). He signs every guarantee number with Zak.",
  },
  {
    img: zakImg,
    caption: "Co-Founder · ZAK",
    alt: "Zak Rachmadi standing outside an industrial building in New Zealand, wearing a navy suit and striped tie",
    name: "Zak Rachmadi",
    role: "Director",
    bio: "Same funnel discipline, different seat. Inside Tally he owns the strategy and delivery: qualification, the weekly readout, and the miss-clause mechanics clients actually hold us to. Previously at D2C growth agency Hurdler. No guarantee number ships without both directors signed off.",
  },
];

const jsonLd = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Tally",
    description:
      "About Tally, a New Zealand primary industries marketing agency with outcome-guaranteed campaigns.",
    url: `${SITE_URL}/about`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-NZ",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <article className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-12 md:pt-40 lg:px-20">
        {/* Section 1, Hero */}
        <header className="max-w-3xl">
          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            The outcome is contractual.
          </h1>
          <p className="mt-7 text-lg leading-[1.65] text-ink-2">
            Tally is a New Zealand primary industries marketing agency. We run recruitment, reach
            and enquiry campaigns for crews, plants, boats and forests. The difference is simple: the
            agreed number is written into the contract, with our fee at risk against it.
          </p>
        </header>

        {/* Section 2, The transfer */}
        <section
          className="mt-24 border-t rule-hair pt-16"
          aria-label="The transfer"
        >
          <SectionHeader
            title="Job applications are conversion events, operators miss this key."
            note="It has a funnel, a cost per acquisition, creative that stops the scroll or does not, and a landing step where people drop off. Structurally, it is a checkout."
          />

          <div>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <p className="text-[0.9375rem] leading-[1.75] text-ink-2">
                Tally&apos;s founders came out of direct-to-consumer and paid social. Nobody got paid
                for reach. The metric was always a purchase. Attribution discipline, creative testing
                at volume, killing losers fast, and moving budget to what converts are native habits.
                Not a service line bolted on after the pitch.
              </p>
              <p className="text-[0.9375rem] leading-[1.75] text-ink-2">
                Primary-sector recruitment is that same funnel with a job as the product. Aimed at an
                audience that is harder to reach and far less contested. Fewer people are bidding for
                a forestry crew member&apos;s attention than for a skincare customer&apos;s.
              </p>
            </div>
          </div>

          <div>
            <p className="mt-10 max-w-[62ch] border-l rule-med pl-6 text-[0.9375rem] leading-[1.75] text-ink-2">
              We did not grow up on a mussel barge or in a sawmill. Sector empathy is table stakes in
              this category; every agency claims it. Accountability for the number is what nobody
              offers. That is the gap we sit in.
            </p>
          </div>

          <div>
            <div className="mt-14 divide-y divide-[var(--w-hair)] border rule-hair">
              {capabilities.map((c, i) => (
                <div
                  key={c.k}
                  className="grid gap-4 p-8 md:grid-cols-[220px_1fr] md:gap-10"
                >
                  <div>
                    <div className="font-mono text-sm text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-ink">
                      {c.k}
                    </h3>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-2">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3, The directors */}
        <section
          className="mt-24 border-t rule-hair pt-16"
          aria-label="The directors"
        >
          <SectionHeader
            title="Two signatures on every number."
          />

          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
            {directors.map((d, i) => (
              <div key={d.alt}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-sheet">
                    <Image
                      src={d.img}
                      alt={d.alt}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="img-grade object-cover object-[50%_0%]"
                      priority={i === 0}
                    />
                    {/* Dissolve chest cut into page background, not a hard crop edge */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 55%, var(--bg-primary) 100%)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <figcaption className="mono-label mt-4 text-ink-2">{d.caption}</figcaption>
                </figure>
                <h3 className="mt-6 font-sans text-2xl font-semibold tracking-tight text-ink">
                  {d.name}
                </h3>
                <p className="mono-label mt-2 text-ink-3">{d.role}</p>
                <p className="mt-5 text-[0.9375rem] leading-[1.75] text-ink-2">{d.bio}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mt-14 max-w-2xl border-t rule-hair pt-8 text-[0.9375rem] leading-[1.7] text-ink-2">
              No guarantee number is ever committed by one director alone. Both sign off.
            </p>
          </div>
        </section>

        {/* Section 4, How we work */}
        <section
          className="mt-24 border-t rule-hair pt-16"
          aria-label="How we work"
        >
          <SectionHeader
            title="Sparse contact. Hard accountability."
            note="A short read of the operating rules. Full mechanism on the guarantee."
          />

          <div>
            <div className="mt-12 divide-y divide-[var(--w-hair)] border rule-hair">
              {howWeWork.map((item, i) => (
                <div
                  key={item.k}
                  className="grid gap-3 p-6 md:grid-cols-[200px_1fr] md:gap-8 md:p-8"
                >
                  <div>
                    <div className="font-mono text-xs text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mono-label mt-2 text-ink">{item.k}</div>
                  </div>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mt-8">
              <Link
                href="/guarantee"
                className="mono-label group inline-flex items-center gap-2 text-ink-3 transition-colors hover:text-ink"
              >
                How the guarantee works
                <Arrow
                  size={14}
                  className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Link>
            </p>
          </div>
        </section>

        {/* Section 5, Where we sit */}
        <section
          className="mt-24 border-t rule-hair pt-16"
          aria-label="Where we sit"
        >
          <SectionHeader title="New Zealand primary industries." />
          <div>
            <p className="mt-8 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">
              We work across New Zealand&apos;s food and fibre economy:{" "}
              <Link
                href="/seafood-aquaculture-marketing"
                className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                seafood and aquaculture
              </Link>
              ,{" "}
              <Link
                href="/forestry-marketing"
                className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                forestry and wood processing
              </Link>
              ,{" "}
              <Link
                href="/horticulture-marketing"
                className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                horticulture at scale
              </Link>
              , food processing, operators and funded agritech. Recruitment is the wedge where the
              outcome is cleanest to guarantee. Reach and enquiry follow when the funnel can be
              measured the same way.
            </p>
          </div>
        </section>

        {/*
          Section 6, the positioning prose that used to sit at the bottom of the
          homepage. It was ~350 words of keyword-bearing copy in the one place a
          buyer was least likely to read it. Here it is on the page someone lands
          on when they are researching the agency, so it does the same crawl work
          in front of a reader who actually wants it.
        */}
        <section
          className="border-t rule-hair pt-20 md:pt-28"
          >
          <SectionHeader title="Where Tally sits in the New Zealand market." />
          <div>
            <div className="mt-8 grid max-w-none gap-x-16 gap-y-6 text-[0.9375rem] leading-[1.75] text-ink-2 lg:grid-cols-2">
              <p>
                Tally is a New Zealand primary industries and marine marketing agency working with
                exporters, processors, co-ops, operators and owner-run businesses across the food
                and fibre economy. We run brand and reach strategy, recruitment marketing, enquiry
                generation and booking campaigns for seafood and aquaculture, boat building and
                fishing charter, forestry and wood processing, horticulture, viticulture, food and
                beverage processing, meat processing, agribusiness and agritech.
              </p>
              <p>
                Most marketing agencies in New Zealand sell footage and monthly retainers. Agri
                specialists cluster around dairy suppliers and field days. Tally sits in the gap:
                outcome-guaranteed campaigns pointed at the primary and marine sectors that still
                lack a dedicated partner, with the miss clause printed in the contract. The
                engagement can be a single day of capture or the whole online presence run for you;
                either way it opens with an agreed number.
              </p>
              <p className="lg:col-span-2 lg:max-w-[80ch]">
                If you are searching for marketing for primary industries in NZ, a marine or
                fishing charter marketing agency, a specialist agribusiness marketing agency, or
                the best NZ marketing agencies for hard-to-staff crews, yards and plants, start
                with the number you need moved. Size is not the test; a countable outcome is. We
                only take briefs we can guarantee.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Section 7, CTA */}
      <FooterCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
