import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import CtaPair from "@/components/CtaPair";
import { PEOPLE } from "@/lib/contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { routeMetadata } from "@/lib/routes";
import { breadcrumbNode, personNodes, webPageNode } from "@/lib/seo";
import jontyImg from "@/public/images/jonty.png";
import zakImg from "@/public/images/zak.png";

/*
  About, kept short: who we are, how we work in three lines, the team,
  and the two actions. The person entities stay, because they are what lets a
  search for either person's name land here.
*/

export const metadata: Metadata = routeMetadata("/about");

const PRINCIPLES = [
  {
    k: "Outcome first",
    body: "We pick the one outcome that moves your business, enquiries, bookings, sales or staff, before anything is made.",
  },
  {
    k: "Built on Instagram",
    body: "8 years of growing, monetising and selling accounts, and more than 100 million views, behind every brief.",
  },
  {
    k: "Straight answers",
    body: "One plain update a week, media spend in your own account, and one of us on the phone when you need one.",
  },
];

const directors = [
  {
    img: jontyImg,
    alt: "Jonty MacIntyre standing outside an industrial building in New Zealand, wearing a navy suit and light blue tie",
    name: "Jonty MacIntyre",
    role: "Partner",
    bio: "Came out of paid social and direct-to-consumer, where the only metric that counted was a purchase. Inside Tally he runs the creative system: the content, the test cadence and the call to drop what is not working.",
  },
  {
    img: zakImg,
    alt: "Zak Rachmadi standing outside an industrial building in New Zealand, wearing a navy suit and striped tie",
    name: "Zak Rachmadi",
    role: "Director",
    bio: "Previously at D2C growth agency Hurdler. Inside Tally he runs strategy and delivery: the free audit, the outcome we go after, and the weekly update clients rely on.",
  },
];

/* Person entities for Zak and Jonty, each with a stable @id, tied to the organisation, inside an AboutPage. */
const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const people = personNodes();

const nodes = [
  {
    ...webPageNode({ path: "/about", name: "About Tally", description: String(metadata.description ?? "") }),
    "@type": "AboutPage",
    mainEntity: people.map((p) => ({ "@id": p["@id"] })),
  },
  ...people,
  breadcrumbNode("/about", crumbs),
];

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          <h1 className="display text-[3rem] text-ink md:text-[4.5rem]">
            About <span className="text-signal">Tally</span>
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg leading-[1.6] text-ink-2">
            Tally is a marketing agency based in Auckland, working with consumer and
            marine brands across New Zealand. Our team has spent 8 years growing Instagram accounts,
            monetising them and selling them. Now we run that system for New Zealand businesses,
            aimed at the outcome that actually moves the business rather than video output with no
            clear return. We also run recruitment and reach for primary industries operators.
          </p>
          <CtaPair source="about_hero" className="mt-9" />
        </header>

        <section className="mt-24 border-t rule-hair pt-16">
          <h2 className="display text-[2.25rem] text-ink md:text-[3rem]">How we work</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.k} className="rounded-2xl bg-sheet-2 p-8">
                <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{p.k}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t rule-hair pt-16">
          <h2 className="display text-[2.25rem] text-ink md:text-[3rem]">The team</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {directors.map((d) => {
              const person = PEOPLE.find((p) => p.name === d.name);
              return (
                <div key={d.name}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sheet-2">
                    <Image
                      src={d.img}
                      alt={d.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <h3 className="mt-6 text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
                    {d.name}
                  </h3>
                  <p className="mono-label mt-1 text-ink-3">{d.role}</p>
                  <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-[1.65] text-ink-2">{d.bio}</p>
                  {person ? (
                    <p className="mt-4 text-[0.9375rem]">
                      <a href={`tel:${person.phone}`} className="font-semibold text-signal hover:text-ink">
                        {person.phoneDisplay}
                      </a>
                      <span className="text-ink-3"> · </span>
                      <a href={`mailto:${person.email}`} className="text-ink-2 hover:text-ink">
                        {person.email}
                      </a>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </article>
      <FooterCta />
      <JsonLd nodes={nodes} />
    </main>
  );
}
