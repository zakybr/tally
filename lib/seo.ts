/* Shared SEO copy, keywords and structured-data builders. */

import { PEOPLE } from "@/lib/contact";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.tallynz.co";

export const SITE_NAME = "Tally";

export const DEFAULT_TITLE = "Marketing Agency NZ for Consumer and Marine Brands | Tally";

/* Kept to ~160 characters so Google shows it whole instead of truncating mid-claim. */
export const DEFAULT_DESCRIPTION =
  "NZ marketing agency for consumer and marine brands, built on Instagram. 100M+ organic views. Free audit, then we run the work that moves your numbers.";

/* The long form, for schema and llms.txt where length is not truncated. */
export const LONG_DESCRIPTION =
  "Tally is a New Zealand marketing agency for consumer and marine brands, built on Instagram. The team has grown accounts past 100 million organic views and now runs content, Instagram growth, paid social and booking campaigns for New Zealand businesses, starting from a free audit that picks the outcome worth moving. Tally also runs banned Instagram account recovery and username claims, and keeps a primary industries practice for seafood, forestry, horticulture and processing operators.";

/* Exhaustive keyword set for NZ primary-sector and agency queries. Meta keywords are a weak signal; these also seed on-page copy and FAQ answers. */
export const KEYWORDS = [
  // Consumer and Instagram-led positioning
  "marketing agency NZ",
  "consumer brand marketing agency New Zealand",
  "social media marketing agency NZ",
  "Instagram marketing agency New Zealand",
  "content marketing agency NZ",
  "marine marketing agency NZ",
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
  // Outcome and free audit intent
  "free marketing audit NZ",
  "free Instagram audit New Zealand",
  "outcome based marketing agency NZ",
  // Capture and production
  "video capture marketing New Zealand",
  "video production marketing agency NZ",
  "on location video capture NZ",
  "industrial video production New Zealand",
  "employer brand video NZ",
  "recruitment video production New Zealand",
  "commercial photography primary industries NZ",
  // Named people, for brand and person queries
  "Zak Rachmadi",
  "Jonty MacIntyre",
  "Zak Rachmadi Tally",
  "Jonty MacIntyre Tally",
  "Tally NZ marketing agency",
  "Tally marketing New Zealand",
  // Instagram services, open to any NZ business
  "Instagram growth agency NZ",
  "Instagram management New Zealand",
  "social media management NZ",
  "banned Instagram account recovery NZ",
  "Instagram account disabled New Zealand",
  "Instagram username claim NZ",
  // Service modifiers
  "lead generation agribusiness NZ",
  "enquiry campaigns agritech",
  "reach campaigns primary sector",
];

export type FaqItem = { question: string; answer: string };

/* Natural-language Q&A written for Google FAQ rich results and AI answer engines. */
export const FAQS: FaqItem[] = [
  {
    question: "What kind of marketing agency is Tally?",
    answer:
      "Tally is a New Zealand marketing agency for consumer and marine brands, built on Instagram. Our team has spent 8 years growing, monetising and selling Instagram accounts, with more than 100 million views. We run Instagram, content, Meta ads and enquiry campaigns, aimed at the one outcome that actually moves the business rather than video output with no clear return.",
  },
  {
    question: "Does Tally work with consumer brands, not just marine and primary industries?",
    answer:
      "Yes. Consumer brands and marine are where we do most of our work. We also run recruitment and reach campaigns for seafood, forestry, horticulture and processing operators.",
  },
  {
    question: "Can Tally get a banned Instagram business account back?",
    answer:
      "Tally handles banned account recovery and username claims for New Zealand businesses through our Meta representatives. You send us the notice and we take the case from there. A small deposit opens it and the rest is only payable if the account comes back.",
  },
  {
    question: "What is the free audit?",
    answer:
      "A free look at your Instagram, Meta ads and how customers find you, with the one outcome worth going after first and how we would get it. It takes under a minute to request at tallynz.co/audit, and one of us walks you through it on a call.",
  },
  {
    question: "How much does Tally cost?",
    answer:
      "It depends on the outcome and how much content needs making. We price it on the first call, after the free audit, so you are paying for something aimed at a result rather than a number of posts.",
  },
  {
    question: "Does Tally do recruitment marketing?",
    answer:
      "Yes, for hard-to-staff roles across seafood, forestry, horticulture, processing and marine trades, measured in qualified applications.",
  },
  {
    question: "Who runs Tally?",
    answer:
      "Tally is run by Zak Rachmadi, director, and Jonty MacIntyre, partner. Call Zak on +64 22 305 3853 or email zak@tallynz.co, or Jonty on +64 21 344 965 or jonty@tallynz.co.",
  },
  {
    question: "Where is Tally based?",
    answer:
      "Tally is a New Zealand agency working with businesses nationwide, and most first conversations happen on the phone.",
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
    description: LONG_DESCRIPTION,
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
      "Consumer brand marketing",
      "Social media marketing",
      "Instagram marketing",
      "Short-form video and Reels",
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
      "Instagram account recovery",
      "Instagram growth",
      "Instagram account recovery",
      "Instagram username claims",
      "Social media management",
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
      "Instagram growth and management",
      "Banned Instagram account recovery",
      "Instagram username claims",
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
            "Qualified enquiries and bookings for charter operators, boat dealers, clubs and marine businesses in New Zealand.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recruitment / Applications campaigns",
          description:
            "Qualified applications for hard-to-staff roles across seafood, forestry, horticulture and processing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Reach / Attention campaigns",
          description:
            "Reach with the people who actually buy, in New Zealand.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pipeline / Enquiry campaigns",
          description:
            "Enquiries and demo bookings for suppliers and B2B businesses.",
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

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
}) {
  const author = PEOPLE[0];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${article.path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${article.path}` },
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: "en-NZ",
    image: `${SITE_URL}/images/hero-boat.jpg`,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      ...(author.sameAs.length ? { sameAs: author.sameAs } : {}),
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
