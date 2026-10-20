import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import CtaPair from "@/components/CtaPair";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import tileConsumer from "@/public/images/tile-consumer.jpg";
import tileMarine from "@/public/images/tile-marine.jpg";
import tilePrimary from "@/public/images/sector-seafood.jpg";
import bandInstagram from "@/public/images/band-instagram.jpg";

/*
  The homepage below the film, in reading order: what we believe, the proof,
  what we do, who we do it for, how it works, what we have written. Bands
  alternate charcoal and light so each section reads as its own page, and the
  orange carries the headline words and the numbers.
*/

const wrap = "mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20";

function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-[44px] items-center gap-3 text-[0.9375rem] font-semibold ${className}`}>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* 1. Statement band, orange ground. */
export function Statement() {
  return (
    <section className="bg-[#ff4a1c] py-24 md:py-32">
      <div className={wrap}>
        <p className="max-w-[30ch] text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em] text-[#17191c] md:text-[2.5rem]">
          We have spent 8 years growing Instagram accounts, monetising them and selling them. Now we
          run that system for New Zealand consumer and marine brands, aimed at the outcome that
          actually moves the business.
        </p>
        <TextLink href="/about" className="mt-10 text-[#17191c]">
          Our story
        </TextLink>
      </div>
    </section>
  );
}

/* 2. Proof numbers, charcoal over a dimmed still. */
const STATS = [
  { figure: "8 years", label: "growing, monetising and selling Instagram accounts" },
  { figure: "100M+", label: "organic views on accounts our team has run" },
  { figure: "1", label: "outcome picked with you, the one that moves the business" },
  { figure: "Free", label: "audit before you spend a dollar with us" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-sheet py-24 md:py-32">
      <Image src={bandInstagram} alt="" fill sizes="100vw" className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-sheet/60 to-sheet" />
      <div className={`${wrap} relative`}>
        <h2 className="display max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
          Built on Instagram, <span className="text-signal">aimed at results.</span>
        </h2>
        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.figure} className="border-t rule-med pt-6">
              <dt className="display text-[3.5rem] text-signal md:text-[4.5rem]">{s.figure}</dt>
              <dd className="mt-3 max-w-[26ch] text-[0.9375rem] leading-[1.55] text-ink-2">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 3. Services, light band, tinted cards, each linking to its section on /services. */
const CAPABILITIES = SERVICES.map((sv) => ({
  title: sv.name,
  body: sv.short,
  href: sv.id === "account-recovery" ? "/instagram-account-recovery" : `/services#${sv.id}`,
}));

export function Capabilities() {
  return (
    <section id="services" className="light scroll-mt-20 py-24 md:py-32">
      <div className={wrap}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-[14ch] text-[3rem] text-ink md:text-[4.5rem]">What we do</h2>
          <p className="max-w-[44ch] text-[1.0625rem] leading-[1.6] text-ink-2">
            Six services, one rule: we pick the outcome that actually moves your business, not a
            pile of video with no clear return.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex min-h-[15rem] flex-col rounded-2xl bg-sheet-2 p-8 transition-colors duration-300 hover:bg-sheet-3 md:p-10"
            >
              <span className="mono-label text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-6 text-[2rem] text-ink md:text-[2.375rem]">{c.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-2">{c.body}</p>
              <span className="mt-auto inline-flex items-center gap-3 pt-8 text-[0.9375rem] font-semibold text-ink">
                Learn more
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. Who it is for, three image tiles, each linking to its section on /industries. */
const TILE_IMAGES = {
  consumer: { img: tileConsumer, alt: "Orange and blue performance boat seating, shot close for Instagram" },
  marine: { img: tileMarine, alt: "White day boat at anchor in a New Zealand bay" },
  "primary-industries": { img: tilePrimary, alt: "Commercial fishing crew at work on deck" },
} as const;
const SECTORS = INDUSTRIES.map((ind) => ({
  title: ind.name,
  body: ind.short,
  href: `/industries#${ind.id}`,
  ...TILE_IMAGES[ind.id as keyof typeof TILE_IMAGES],
}));

export function Sectors() {
  return (
    <section className="bg-sheet py-24 md:py-32">
      <div className={wrap}>
        <h2 className="display max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
          Who we <span className="text-signal">work with</span>
        </h2>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {SECTORS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl p-8"
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sheet via-sheet/40 to-transparent" />
              <div className="relative">
                <h3 className="display text-[2.5rem] text-ink">{s.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.55] text-ink-2">{s.body}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-signal">
                  Explore
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. How it works, three steps. */
const STEPS = [
  {
    n: "01",
    title: "Free audit",
    body: "We look at where your enquiries, bookings or customers are coming from now, and where they are leaking.",
  },
  {
    n: "02",
    title: "Pick the outcome",
    body: "Together we pick the one outcome that would actually move the business: enquiries, bookings, sales or staff.",
  },
  {
    n: "03",
    title: "We run it",
    body: "Content, Instagram and ads aimed at that outcome, with one plain update a week on how it is tracking.",
  },
];

export function HowItWorks() {
  return (
    <section className="light py-24 md:py-32">
      <div className={wrap}>
        <h2 className="display max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
          How it <span className="text-signal">works</span>
        </h2>
        <ol className="mt-14 grid gap-10 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-[var(--signal)] pt-6">
              <span className="mono-label text-signal">{s.n}</span>
              <h3 className="display mt-4 text-[2rem] text-ink">{s.title}</h3>
              <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-[1.65] text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
        <CtaPair source="home_how" className="mt-14" />
      </div>
    </section>
  );
}
