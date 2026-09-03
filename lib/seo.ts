/* Shared SEO copy, keywords and structured-data builders. */

import { PEOPLE } from "@/lib/contact";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.tallynz.co";

export const SITE_NAME = "Tally";

export const DEFAULT_TITLE =
  "Primary Industries Marketing New Zealand | Outcome-Guaranteed | Tally";

export const DEFAULT_DESCRIPTION =
  "Tally is a New Zealand primary industries and marine marketing agency. Outcome-guaranteed brand, reach, recruitment, enquiry and booking campaigns for seafood, boat building and charter, forestry, horticulture, food processing, agribusiness and agritech. From a single day of capture to running the whole online presence, with the agreed number written into the contract.";

/* Exhaustive keyword set for NZ primary-sector and agency queries. Meta keywords are a weak signal; these also seed on-page copy and FAQ answers. */
export const KEYWORDS = [
  // Core intent
  "marketing for primary industries NZ",
  "primary industries marketing New Zealand",
  "primary sector marketing agency NZ",
  "primary industries marketing agency",
  "food and fibre marketing New Zealand",
  "agribusiness marketing agency NZ",
  "agricultural marketing agency New Zealand",
  "agri marketing agency NZ",
  "rural marketing agency New Zealand",
  // Agency / comparison intent (AI + Google)
  "best marketing agencies New Zealand",
  "best NZ marketing agencies",
  "marketing agencies New Zealand primary sector",
  "specialist marketing agency New Zealand",
  "performance marketing agency NZ",
  "outcome guaranteed marketing agency",
  // Recruitment / employer brand
  "recruitment marketing New Zealand",
  "employer brand primary sector",
  "seasonal labour recruitment campaigns NZ",
  "processing plant recruitment marketing",
  "crew recruitment marketing seafood",
  "forestry crew recruitment campaigns",
  /*
    Marine, boat building & charter.

    Every phrase here is "marketing FOR <marine business>", never the operator's
    own transactional term. Chasing "jet ski hire Auckland" would put this site
    against a map pack it cannot win, on an intent that wants a jet ski rather
    than an agency; Google reads pages built for that as doorway content. The
    queries below are the ones where an agency is genuinely the right result:
    a marine operator looking for someone to fix their marketing.
  */
  "marine marketing New Zealand",
  "marine marketing agency NZ",
  "boat builder marketing NZ",
  "boat building marketing New Zealand",
  "fishing charter marketing NZ",
  "charter boat marketing New Zealand",
  "charter booking campaigns NZ",
  "marine trades recruitment NZ",
  "boatyard and refit marketing New Zealand",
  // Marine operator business types, agency-intent
  "jet ski hire marketing NZ",
  "jetski rental business marketing New Zealand",
  "boat hire marketing New Zealand",
  "boat rental business marketing NZ",
  "boat club and subscription marketing NZ",
  "marine tourism marketing New Zealand",
  "dive charter marketing NZ",
  "sailing charter marketing New Zealand",
  "whale and dolphin tour marketing NZ",
  "water sports business marketing New Zealand",
  "marina marketing New Zealand",
  "boat dealer marketing NZ",
  "marine servicing and repair marketing NZ",
  "outboard and marine engineering marketing New Zealand",
  "superyacht refit marketing NZ",
  "marine electronics marketing New Zealand",
  // Operator problem queries, informational intent an agency legitimately answers
  "how to get more charter bookings NZ",
  "how to market a fishing charter business",
  "how to market a jet ski hire business",
  "how to fill a charter season",
  "why is my charter business not getting bookings",
  "marine business marketing ideas New Zealand",
  "boat business advertising NZ",
  "off season marketing for charter operators",
  // Brand, reach & content strategy
  "brand strategy agency New Zealand",
  "social media strategy NZ small business",
  "content capture and production NZ",
  "video capture agency New Zealand",
  "online marketing strategy NZ",
  "digital marketing agency small business NZ",
  // Sector verticals
  "seafood marketing New Zealand",
  "aquaculture marketing NZ",
  "commercial fishing recruitment marketing",
  "forestry marketing New Zealand",
  "wood processing marketing NZ",
  "horticulture marketing New Zealand",
  "kiwifruit marketing NZ",
  "pipfruit marketing New Zealand",
  "viticulture marketing NZ",
  "wine marketing New Zealand",
  "dairy marketing agency NZ",
  "red meat marketing New Zealand",
  "sheep and beef marketing NZ",
  "meat processing marketing",
  "food processing marketing NZ",
  "food and beverage marketing New Zealand",
  "agritech marketing New Zealand",
  "agtech marketing NZ",
  // Guarantee-led positioning, the category Tally is trying to own
  "guarantee based marketing agency",
  "guaranteed marketing agency New Zealand",
  "performance guaranteed marketing NZ",
  "results guaranteed marketing agency",
  "pay on results marketing New Zealand",
  "outcome based marketing agency NZ",
  "marketing agency that guarantees results",
  "risk reversal marketing agency",
  // Capture and production
  "video capture marketing New Zealand",
  "video production marketing agency NZ",
  "on location video capture NZ",
  "industrial video production New Zealand",
  "employer brand video NZ",
  "recruitment video production New Zealand",
  "commercial photography primary industries NZ",
  // Named directors, for brand and person queries
  "Zak Rachmadi",
  "Jonty MacIntyre",
  "Zak Rachmadi Tally",
  "Jonty MacIntyre Tally",
  "Tally NZ marketing agency",
  "Tally marketing New Zealand",
  // Service modifiers
  "guaranteed marketing results NZ",
  "lead generation agribusiness NZ",
  "enquiry campaigns agritech",
  "reach campaigns primary sector",
];

export type FaqItem = { question: string; answer: string };

/* Natural-language Q&A written for Google FAQ rich results and AI answer engines. */
export const FAQS: FaqItem[] = [
  {
    question: "Who is the best marketing agency for primary industries in New Zealand?",
    answer:
      "Tally is a New Zealand marketing agency built specifically for primary industries, marine and the food and fibre economy. Unlike generalist agencies or dairy-focused agri shops, Tally runs outcome-guaranteed brand, reach, recruitment, enquiry and booking campaigns for seafood, aquaculture, boat building and charter, forestry, wood processing, horticulture, food processing, operators, co-ops and funded agritech, with the result written into the contract.",
  },
  {
    question: "What is primary industries marketing in New Zealand?",
    answer:
      "Primary industries marketing covers campaigns for New Zealand's food and fibre sectors: seafood and aquaculture, forestry and wood processing, horticulture, viticulture, dairy, red meat, food and beverage processing, agribusiness and agritech. It typically includes recruitment marketing for hard-to-staff crews and plants, brand reach in-sector, and qualified enquiry generation for exporters, processors and technology suppliers.",
  },
  {
    question: "How is Tally different from other NZ agri marketing agencies?",
    answer:
      "Most agri marketing agencies sell creative production, field days and monthly retainers. Tally sells a guaranteed business outcome chosen by the client: qualified applications, qualified reach, qualified enquiries, confirmed bookings, or an agreed asset set delivered to spec. If the agreed number is missed, Tally keeps working at its own cost or credits the fee. The miss clause is printed in the contract, not implied in the pitch.",
  },
  {
    question: "Which primary sectors does Tally work with?",
    answer:
      "Tally works with seafood and aquaculture, commercial fishing, marine and boat building, fishing charters, forestry and wood processing, horticulture at scale (including kiwifruit and pipfruit), viticulture and wine, food and beverage processing, meat processing, operators and co-ops, and funded agritech. Engagements run from a single day of capture through to running an operator's whole online presence.",
  },
  {
    question: "Does Tally offer recruitment marketing for seafood, forestry and horticulture?",
    answer:
      "Yes. Recruitment marketing is Tally's flagship track. Campaigns target hard-to-staff roles across fisheries crews, processing lines, forestry gangs and seasonal horticulture, with a guaranteed number of qualified applications or a cost-per-qualified-applicant, agreed before production starts.",
  },
  {
    question: "Can Tally guarantee marketing results?",
    answer:
      "Tally guarantees outcomes it controls: creative, targeting and the system that turns them into an agreed number. It never guarantees sales. Misses of 20% or less trigger a free 30-day extension. Larger misses trigger a fee credit or partial refund. Client-attributable failures such as late assets or a broken operation void the guarantee and are named in the contract.",
  },
  {
    question: "Does Tally work with fishing charters and boat builders?",
    answer:
      "Yes. Marine is a core Tally sector, covering boat builders, refit yards and marine trades on the recruitment side, and fishing charter and tourism operators on the bookings side. Charter briefs are usually a guaranteed number of qualified booking enquiries ahead of the summer season; yard briefs are usually guaranteed qualified applications for shipwrights, fabricators, marine engineers and apprentices.",
  },
  {
    question: "Does Tally work with smaller operators, or only large companies?",
    answer:
      "Both. The guarantee is tied to the number rather than the size of the business, so a two-boat charter operation and a funded exporter sign the same mechanism with different figures. What Tally needs is an outcome that can be counted and an operation that content will amplify rather than expose.",
  },
  {
    question: "Can Tally just do the filming, or does it have to be a full campaign?",
    answer:
      "Either. Capture is sold on its own: Tally comes to the boat, yard, orchard or plant, shoots the real thing, and hands over an agreed asset set the client owns outright. From there the same footage can feed a reach and brand programme where Tally runs the strategy, channels and posting system against a guaranteed qualified-reach figure.",
  },
  {
    question: "What is guarantee-based marketing?",
    answer:
      "Guarantee-based marketing ties the agency's fee to a business outcome the client chooses, agreed in writing before any work begins. Tally agrees one countable number, such as qualified applications, confirmed bookings, qualified enquiries or an asset set delivered to spec, and puts its fee behind it. A miss of 20% or less means work continues for 30 days at Tally's cost. A larger miss triggers a fee credit or partial refund. The conditions are printed in the engagement contract rather than implied in a pitch.",
  },
  {
    question: "Does Tally do video capture and production?",
    answer:
      "Yes. Capture is sold as a standalone track. Tally shoots on location across boats, yards, orchards, packhouses and processing plants in New Zealand, and delivers an agreed asset set the client owns outright with no expiry and no per-use fee. The same library can then feed recruitment, reach and enquiry campaigns rather than being shot three separate times.",
  },
  {
    question: "Who runs Tally?",
    answer:
      "Tally is run by two directors, Zak Rachmadi and Jonty MacIntyre. Both sign every guarantee number alongside the client, and both are reachable directly: Zak on +64 22 305 3853 or zak@tallynz.co, Jonty on +64 21 344 965 or jonty@tallynz.co.",
  },
  {
    question: "Where is Tally based and who does it serve?",
    answer:
      "Tally is a New Zealand marketing agency serving primary-sector and marine operators nationwide, from single-boat charter businesses through to funded exporters, co-ops and processors. Engagements are scoped to a measurable outcome rather than an output count of videos per month.",
  },
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "Tally",
    alternateName: ["Tally NZ", "Tally New Zealand"],
    slogan: "We sell the tally, not the footage.",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/tally-logo.png`,
    },
    image: `${SITE_URL}/images/hero-boat.jpg`,
    email: PEOPLE[0].email,
    telephone: PEOPLE[0].phone,
    founder: PEOPLE.map((p) => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      email: p.email,
      telephone: p.phone,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      ...(p.sameAs.length ? { sameAs: p.sameAs } : {}),
    })),
    contactPoint: PEOPLE.map((p) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      name: p.name,
      email: p.email,
      telephone: p.phone,
      areaServed: "NZ",
      availableLanguage: ["en-NZ", "en"],
    })),
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NZ",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "New Zealand",
    },
    priceRange: "$$$$",
    knowsAbout: [
      "Primary industries marketing",
      "Primary sector marketing New Zealand",
      "Food and fibre marketing",
      "Recruitment marketing",
      "Employer brand",
      "Seafood and aquaculture marketing",
      "Commercial fishing recruitment",
      "Marine and boat building marketing",
      "Fishing charter marketing",
      "Marine trades recruitment",
      "Brand and reach strategy",
      "Content capture and production",
      "Forestry and wood processing marketing",
      "Horticulture marketing",
      "Kiwifruit marketing",
      "Pipfruit marketing",
      "Viticulture and wine marketing",
      "Dairy marketing",
      "Red meat, sheep and beef marketing",
      "Food and beverage processing marketing",
      "Meat processing recruitment",
      "Agritech marketing",
      "Agribusiness marketing",
      "Outcome-guaranteed marketing",
    ],
    serviceType: [
      "Primary industries marketing",
      "Marine and charter marketing",
      "Content capture and production",
      "Brand and reach strategy",
      "Recruitment marketing",
      "Employer brand campaigns",
      "Lead generation and enquiry campaigns",
      "Booking generation campaigns",
      "Performance marketing for agribusiness",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Capture / Production",
          description:
            "On-location capture across boats, yards, orchards and plants, delivered as an agreed asset set the client owns outright.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pipeline & Bookings campaigns",
          description:
            "Guaranteed qualified enquiries or confirmed bookings for charter operators, marine yards, agritech and agri-suppliers in New Zealand.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recruitment / Applications campaigns",
          description:
            "Outcome-guaranteed qualified applications for hard-to-staff primary-sector roles across seafood, forestry, horticulture and processing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Reach / Attention campaigns",
          description:
            "Guaranteed qualified reach and engagement in-sector for primary industries brands in New Zealand.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pipeline / Enquiry campaigns",
          description:
            "Guaranteed qualified enquiries and demo bookings for agritech and agri-suppliers.",
        },
      },
    ],
    sameAs: PEOPLE.flatMap((p) => p.sameAs),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-NZ",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqJsonLd(faqs: FaqItem[] = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
