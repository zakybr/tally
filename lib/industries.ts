import type { FaqItem } from "@/lib/seo";

/*
  Who Tally works with, on one page. /industries renders each as a short
  section with its own anchor; the old sector pages redirect to these anchors.
*/

export type Industry = {
  id: string;
  name: string;
  short: string;
  body: string;
  /* The outcomes we usually go after for this industry. */
  outcomes: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "consumer",
    name: "Consumer brands",
    short: "Products and places worth watching.",
    body: "Shops, products, venues and services that sell to the public. Reels-first content, Instagram growth and Meta ads, aimed at sales and bookings rather than likes.",
    outcomes: ["Sales and bookings", "Instagram growth", "Enquiries from ads"],
  },
  {
    id: "marine",
    name: "Marine",
    short: "Dealers, clubs, charters and yards.",
    body: "Boat dealers, boat clubs, charters, hire and yards all live on a season. We shoot on the water, run the Instagram and ads, and aim it all at bookings, sea trials and enquiries before summer.",
    outcomes: ["Charter bookings", "Sea trials and dealer enquiries", "Marine trades recruitment"],
  },
  {
    id: "primary-industries",
    name: "Primary industries",
    short: "Seafood, forestry, horticulture and processing.",
    body: "Seafood and aquaculture, forestry and wood processing, horticulture and food processing operators rarely need more video. They need crews and seasonal roles filled, or the right buyers paying attention. We run recruitment and reach campaigns measured in applications and enquiries.",
    outcomes: ["Crew, plant and seasonal recruitment", "Reach with buyers and partners", "Supplier enquiries"],
  },
];

export const INDUSTRY_FAQS: FaqItem[] = [
  {
    question: "Do you do marketing for fishing charters and boat dealers in New Zealand?",
    answer:
      "Yes. Charter bookings, dealer enquiries, sea trials and boat club sign-ups, run mostly through Instagram and Meta ads, starting well before summer.",
  },
  {
    question: "Do you do recruitment marketing for seafood, forestry and horticulture?",
    answer:
      "Yes. Recruitment is the most common primary industries brief we take: crews, plants, gangs, packhouses and seasonal rosters, measured in qualified applications.",
  },
  {
    question: "When should a seasonal business start marketing?",
    answer:
      "Two to three months before you need the bookings or the people, so the campaign is already working when the season opens.",
  },
];
