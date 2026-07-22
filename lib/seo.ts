/* Shared SEO copy, keywords and structured-data builders. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.tallynz.co";

export const SITE_NAME = "Tally";

export const DEFAULT_TITLE =
  "Primary Industries Marketing New Zealand | Outcome-Guaranteed | Tally";

export const DEFAULT_DESCRIPTION =
  "Tally is a New Zealand primary industries marketing agency. Outcome-guaranteed recruitment, reach and enquiry campaigns for seafood, aquaculture, forestry, wood processing, horticulture, food processing, agribusiness and agritech. The result is written into the contract.";

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
      "Tally is a New Zealand marketing agency built specifically for primary industries and the food and fibre economy. Unlike generalist agencies or dairy-focused agri shops, Tally runs outcome-guaranteed recruitment, reach and enquiry campaigns for seafood, aquaculture, forestry, wood processing, horticulture, food processing, operators, co-ops and funded agritech, with the result written into the contract.",
  },
  {
    question: "What is primary industries marketing in New Zealand?",
    answer:
      "Primary industries marketing covers campaigns for New Zealand's food and fibre sectors: seafood and aquaculture, forestry and wood processing, horticulture, viticulture, dairy, red meat, food and beverage processing, agribusiness and agritech. It typically includes recruitment marketing for hard-to-staff crews and plants, brand reach in-sector, and qualified enquiry generation for exporters, processors and technology suppliers.",
  },
  {
    question: "How is Tally different from other NZ agri marketing agencies?",
    answer:
      "Most agri marketing agencies sell creative production, field days and monthly retainers. Tally sells a guaranteed business outcome: qualified applications, qualified reach, or qualified enquiries. If the agreed number is missed, Tally keeps working at its own cost or credits the fee. The miss clause is printed in the contract, not implied in the pitch.",
  },
  {
    question: "Which primary sectors does Tally work with?",
    answer:
      "Tally works with seafood and aquaculture, commercial fishing, forestry and wood processing, horticulture at scale (including kiwifruit and pipfruit), viticulture and wine, food and beverage processing, meat processing, operators and co-ops, and funded agritech. The focus is funded exporters, processors and large operators rather than small family farms or dairy-supplier rosters.",
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
    question: "Where is Tally based and who does it serve?",
    answer:
      "Tally is a New Zealand marketing agency serving primary-sector operators nationwide. Engagements are scoped for funded exporters, co-ops, processors and large operators that need a measurable outcome moved, not an output count of videos per month.",
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
    email: "zak@tallynz.co",
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
      "Recruitment marketing",
      "Employer brand campaigns",
      "Reach and awareness campaigns",
      "Lead generation and enquiry campaigns",
      "Performance marketing for agribusiness",
    ],
    makesOffer: [
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
    sameAs: [],
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
