import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import AccountabilityGap from "@/components/AccountabilityGap";
import Guarantee from "@/components/Guarantee";
import Method from "@/components/Method";
import WorkTriptych from "@/components/WorkTriptych";
import MissClause from "@/components/MissClause";
import Gate from "@/components/Gate";
import FooterCta from "@/components/FooterCta";
import BookCall from "@/components/BookCall";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Guarantee | Outcome-Guaranteed Marketing NZ",
  description:
    "How Tally's marketing guarantee works: one outcome agreed with you in writing, our fee at risk against it, and the miss clause printed in the contract. Applications, reach, enquiries or bookings.",
  keywords: [
    "guaranteed marketing results NZ",
    "outcome guaranteed marketing agency",
    "marketing guarantee New Zealand",
    "performance marketing guarantee NZ",
    "agency miss clause",
  ],
  alternates: { canonical: "/guarantee" },
  openGraph: {
    title: "The Guarantee | Tally",
    description:
      "One outcome, agreed with you before anything is made, with our fee at risk against it.",
    url: "/guarantee",
  },
};

const faqs: FaqItem[] = [
  {
    question: "What exactly does Tally guarantee?",
    answer:
      "One business outcome, chosen with you and written into the contract before anything is made. That can be qualified applications, qualified reach, qualified enquiries, confirmed bookings, or an agreed asset set delivered to spec. Tally never guarantees sales, because sales depend on things Tally does not control.",
  },
  {
    question: "What happens if Tally misses the number?",
    answer:
      "A miss of 20% or less triggers a free 30-day extension, with Tally absorbing the delivery cost. A miss of more than 20% triggers a 50% fee credit toward the next engagement, or a partial refund within 14 days. Both outcomes are printed in the standard engagement contract.",
  },
  {
    question: "Do smaller operators get the same guarantee?",
    answer:
      "Yes. The guarantee is tied to the number, not the size of the business. A two-boat charter operation and a funded exporter sign the same mechanism; what differs is which number gets agreed and how big it is. If there is something countable to move, there is something to guarantee.",
  },
  {
    question: "What voids the guarantee?",
    answer:
      "Client-attributable failures, named explicitly in the contract: assets not delivered by the end of week two, tracking not live by the agreed date, structural product or workplace problems that content would amplify, and mid-sprint changes to the audience, channel or role. The brief freezes at the end of week one because the guarantee is built on a specific hypothesis.",
  },
  {
    question: "Who pays for the media spend?",
    answer:
      "You do, and it runs through your own account, kept separate from Tally's fee and transparent to the dollar. Tally's fee is what sits at risk against the agreed number.",
  },
];

export default function GuaranteePage() {
  const jsonLd = [
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "The guarantee", path: "/guarantee" },
    ]),
  ];

  return (
    <main>
      <Nav />

      <header className="mx-auto max-w-[1440px] px-6 pb-4 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="max-w-3xl">
          <div className="eyebrow mb-6">The guarantee</div>
          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Our fee sits behind your number.
          </h1>
          <p className="mt-7 text-lg leading-[1.65] text-ink-2">
            Every other agency in this category sells you production and hands you the risk. We do
            the opposite: you choose the outcome, we agree it in writing, and if we miss it we keep
            working at our own cost or the fee comes back. This page is the whole mechanism, terms
            included.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
            >
              Start the Proof
            </Link>
            <BookCall source="guarantee_hero" />
          </div>
        </div>
      </header>

      <AccountabilityGap />
      <Guarantee />
      <Method />
      <WorkTriptych />
      <MissClause />
      <Gate />

      <section className="pb-28 md:pb-36">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Questions people ask before signing
          </h2>
          <div className="mt-10 divide-y divide-hairline border border-hairline">
            {faqs.map((f) => (
              <details key={f.question} className="group bg-bg p-6 open:bg-panel md:p-8">
                <summary className="cursor-pointer list-none font-sans text-lg font-semibold tracking-tight text-ink">
                  <span className="flex items-start justify-between gap-6">
                    {f.question}
                    <span className="mono-label shrink-0 text-amber transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-[0.9375rem] leading-[1.7] text-ink-2">
            Still unsure whether your number is one we can carry?{" "}
            <Link href="/contact" className="text-amber underline-offset-4 hover:underline">
              Send it to us
            </Link>{" "}
            and we will tell you straight, before you pay anything.
          </p>
        </div>
      </section>

      <FooterCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
