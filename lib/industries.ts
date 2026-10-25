import type { FaqItem } from "@/lib/seo";
import type { Block, Card } from "@/lib/services";

/*
  Who Tally works with. Each industry has its own page at /industries/<slug>,
  built by app/industries/[slug]. The /industries hub keeps one short section
  per industry under its old anchor (/industries#marine still lands), each
  linking to the full page. Consumer and marine lead; primary industries is
  still offered and keeps its recruitment and reach practice.
*/

export type IndustryPage = {
  slug: string;
  /* The section id on the /industries hub, kept from the one-page site. */
  anchor: string;
  name: string;
  short: string;
  hub: string;
  linkText: string;
  /* The outcomes we usually go after for this industry. */
  outcomes: string[];
  updated: string;
  title: string;
  description: string;
  ogAlt: string;
  h1: string;
  h1Accent: string;
  intro: string;
  who: { heading: string; cases: Card[] };
  sections: Block[];
  measured: Block;
  faqs: FaqItem[];
  /* Service slugs most relevant to this industry. */
  services: string[];
};

const UPDATED = "2026-10-25";

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: "consumer-brands",
    anchor: "consumer",
    name: "Consumer brands",
    short: "Retail, hospitality and products worth watching.",
    hub: "Shops, venues, products and services that sell to the public. Reels-first content, Instagram growth and Meta ads, aimed at sales and bookings rather than likes.",
    linkText: "Consumer brand marketing in New Zealand",
    outcomes: ["Sales and bookings", "Instagram growth", "Enquiries from ads"],
    updated: UPDATED,
    title: "Consumer Brand Marketing Agency NZ, Auckland | Tally",
    description:
      "Consumer brand marketing from Auckland for NZ retail, hospitality and product brands. Reels-first Instagram, Meta ads and content aimed at sales and bookings.",
    ogAlt: "Tally consumer brand marketing agency, New Zealand",
    h1: "Consumer brand marketing agency",
    h1Accent: "in New Zealand",
    intro:
      "Tally is a consumer brand marketing agency based in Auckland, working with retail, hospitality and product brands across New Zealand. We run Reels-first Instagram, Meta ads and content shot on location, aimed at sales and bookings rather than likes, for brands whose customers decide partly on what they see on their phone.",
    who: {
      heading: "Who we work with",
      cases: [
        {
          title: "Retail and ecommerce",
          body: "Shops and online stores that need people through the door or to the checkout, with ads tracked all the way to the sale.",
        },
        {
          title: "Hospitality and venues",
          body: "Restaurants, bars, cafés and venues, where Instagram is often the first place a customer looks before booking a table.",
        },
        {
          title: "Product brands",
          body: "New Zealand products that need to be seen in use, in short video that works as content and as ads.",
        },
        {
          title: "Experiences sold to the public",
          body: "Gyms, studios, tourism and experiences, where bookings come from people who have already watched what it is like.",
        },
      ],
    },
    sections: [
      {
        heading: "What consumer brands need from social media",
        body: [
          "A consumer brand is competing for attention with everything else on a customer's phone. The brands that do well on Instagram post often, show the product honestly and give people a reason to watch to the end.",
          "We build the content and the ads around that, and judge them on sales and bookings, which are the numbers a consumer brand can actually bank.",
        ],
      },
      {
        heading: "Retail and hospitality marketing in Auckland",
        body: [
          "Auckland retail and hospitality businesses can have us on site quickly for shoots around opening hours, menu changes and launches. For consumer brands elsewhere in New Zealand, we plan shoots around travel and run the rest remotely, with the same weekly update.",
        ],
      },
    ],
    measured: {
      heading: "How it is measured",
      body: [
        "Sales, bookings and the cost of each one where ads are involved, with reach, follows and messages as the early signs. We agree the number at the start and report on it every week. We do not promise results or set contractual targets.",
      ],
    },
    faqs: [
      {
        question: "What does a consumer brand marketing agency do?",
        answer:
          "It helps a business that sells to the public get attention and turn it into sales or bookings. At Tally that means Instagram content, mostly Reels, Meta ads, on-location video and the landing pages they send people to, run together and judged on sales and bookings rather than likes or follower counts.",
      },
      {
        question: "How do you market a restaurant or venue in Auckland on Instagram?",
        answer:
          "Show what it is like to be there: food leaving the kitchen, the room filling up, the view from the table. Post on a steady rhythm, use Reels to reach people who do not follow you yet, and make booking from Instagram easy. Meta ads can then put the best pieces in front of local people likely to book.",
      },
      {
        question: "Do you work with ecommerce brands?",
        answer:
          "Yes. For online stores we run Meta ads and Instagram content tracked through to the sale, and we check that the pixel and checkout events are recorded properly before spending anything. Product video that already works organically is usually the starting point for the ads.",
      },
      {
        question: "Do you only work with Auckland consumer brands?",
        answer:
          "No. We are based in Auckland and work with consumer brands across New Zealand. Auckland businesses can have us on site at short notice. Elsewhere, we plan shoots around travel and run the rest over calls and the weekly update, so location makes little difference to the work.",
      },
      {
        question: "How much does consumer brand marketing cost?",
        answer:
          "We quote after a free audit, because the cost depends on how much content needs making and whether ads are included. Ad spend is separate and paid from your own Meta ad account. Most brands start with one service, usually Instagram or Meta ads, and add more once it is working.",
      },
    ],
    services: ["instagram-marketing", "meta-ads", "content-video", "websites"],
  },
  {
    slug: "marine",
    anchor: "marine",
    name: "Marine",
    short: "Dealers, clubs, charters, hire and yards.",
    hub: "Boat dealers, boat clubs, charters, hire and yards all live on a season. We shoot on the water, run the Instagram and ads, and aim it all at bookings, sea trials and enquiries before summer.",
    linkText: "Marine marketing in New Zealand",
    outcomes: ["Charter bookings", "Sea trials and dealer enquiries", "Marine trades recruitment"],
    updated: UPDATED,
    title: "Marine Marketing Agency NZ: Dealers, Clubs, Charters | Tally",
    description:
      "Marine marketing agency in Auckland for NZ boat dealers, boat clubs, charters, hire and yards. Instagram, Meta ads and on-water video aimed at bookings.",
    ogAlt: "Tally marine marketing agency for New Zealand boat dealers, clubs and charters",
    h1: "Marine marketing agency",
    h1Accent: "for New Zealand",
    intro:
      "Tally is a marine marketing agency based in Auckland, working with boat dealers, boat clubs, charter and hire operators and yards across New Zealand. We shoot on the water, run Instagram and Meta ads, and aim the work at bookings, sea trials and enquiries, timed to start well before summer.",
    who: {
      heading: "Who we work with on the water",
      cases: [
        {
          title: "Boat dealers and brokers",
          body: "Sea trials and enquiries for new and used boats, with video that shows the boat doing what buyers picture it doing.",
        },
        {
          title: "Boat clubs and shared ownership",
          body: "Membership enquiries from people who want time on the water without owning a boat outright.",
        },
        {
          title: "Fishing and sailing charters",
          body: "Bookings for the season, filled early, with content that shows the trip rather than a list of inclusions.",
        },
        {
          title: "Hire, yards and marine services",
          body: "Jet ski and boat hire, refits and servicing, where enquiries depend on being found at the right moment.",
        },
      ],
    },
    sections: [
      {
        heading: "Why marine marketing is different",
        body: [
          "Marine businesses live on a season. Most buying and booking decisions are made in the months before summer, and a campaign that starts in December is already late. Buyers also want to see the boat moving, which is why on-water video does more than brochure photos.",
          "We plan the year around that: content shot when the light and the weather allow, ads warmed up before demand peaks, and enquiries answered quickly when they arrive.",
        ],
      },
      {
        heading: "Marine trades recruitment",
        body: [
          "Yards and marine engineering firms also use us to recruit for hard-to-staff trades roles, with campaigns measured in qualified applications rather than views.",
        ],
      },
    ],
    measured: {
      heading: "How it is measured",
      body: [
        "Bookings, sea trials, dealer enquiries and membership sign-ups, and what each one cost where ads are involved. We agree the number at the start and report on it every week. We do not promise results or set contractual targets.",
      ],
    },
    faqs: [
      {
        question: "Do you do marketing for boat dealers in New Zealand?",
        answer:
          "Yes. For dealers we run Instagram, Meta ads and on-water video aimed at sea trials and qualified enquiries for new and used boats. Most of the work is planned around the boat show calendar and the run into summer, so the content and ads are ready when buyers start looking.",
      },
      {
        question: "When should a charter business start marketing for summer?",
        answer:
          "Two to three months before you need the bookings, so the campaign is already working when the season opens. That gives time to shoot fresh content, warm up the ads and fill the early weekends. Starting in December usually means competing for the last bookings at a higher cost.",
      },
      {
        question: "How do you market a boat club?",
        answer:
          "By showing the life of a member rather than the boat specifications: days out, how booking works, and what it costs compared with owning. We run that through Instagram and Meta ads aimed at membership enquiries, and make sure the enquiry form or landing page answers the questions people ask before they call.",
      },
      {
        question: "Do you only work with marine businesses in Auckland?",
        answer:
          "No. We are based in Auckland, where much of New Zealand's marine industry sits, and work with dealers, clubs and charters around the country. Shoots outside Auckland are planned around the weather and the boats, and the rest of the work runs over calls and the weekly update.",
      },
      {
        question: "What does marine marketing cost?",
        answer:
          "We quote after a free audit, based on the outcome, the amount of content needed and whether ads are part of it. Ad spend is separate and paid from your own Meta ad account. Seasonal businesses often run harder in the months before summer and lighter in winter, and the quote can reflect that.",
      },
    ],
    services: ["instagram-marketing", "meta-ads", "content-video"],
  },
  {
    slug: "primary-industries",
    anchor: "primary-industries",
    name: "Primary industries",
    short: "Seafood, forestry, horticulture and processing.",
    hub: "Seafood and aquaculture, forestry and wood processing, horticulture and food processing operators rarely need more video. They need crews and seasonal roles filled, or the right buyers paying attention. We run recruitment and reach campaigns measured in applications and enquiries.",
    linkText: "Primary industries recruitment marketing",
    outcomes: ["Crew, plant and seasonal recruitment", "Reach with buyers and partners", "Supplier enquiries"],
    updated: UPDATED,
    title: "Primary Industries Marketing and Recruitment NZ | Tally",
    description:
      "Recruitment and reach campaigns for NZ seafood, forestry, horticulture and processing operators, measured in qualified applications and enquiries. Free audit.",
    ogAlt: "Tally primary industries marketing and recruitment, New Zealand",
    h1: "Primary industries marketing",
    h1Accent: "and recruitment",
    intro:
      "Tally runs recruitment and reach campaigns for New Zealand primary industries operators from our base in Auckland. Seafood and aquaculture, forestry and wood processing, horticulture and food processing businesses use us to fill crews, plant roles and seasonal rosters, and to reach buyers and partners, measured in qualified applications and enquiries.",
    who: {
      heading: "Who we work with",
      cases: [
        {
          title: "Seafood and aquaculture",
          body: "Crew for vessels and farms, and staff for processing, where the roles are hard to explain in a job ad and harder to fill.",
        },
        {
          title: "Forestry and wood processing",
          body: "Crews and mill roles in regions where the right people are not scrolling job boards.",
        },
        {
          title: "Horticulture",
          body: "Packhouse and seasonal rosters that have to be filled by a fixed date each year.",
        },
        {
          title: "Food and meat processing",
          body: "Plant roles and shifts, with campaigns that show the work honestly so the people who apply are more likely to suit the job.",
        },
      ],
    },
    sections: [
      {
        heading: "Recruitment campaigns, not job ads",
        body: [
          "Many of the people who would suit a crew or plant role are not looking at job boards. They are on Facebook and Instagram most days. We make short video that shows the real work, the place and the people, run it as Meta ads under Meta's employment ad rules to the regions you hire from, and send applicants to a short form they can finish on a phone.",
          "Every campaign is measured in qualified applications, not views.",
        ],
      },
      {
        heading: "Reach with buyers and partners",
        body: [
          "Some operators do not need staff. They need the right buyers, partners or communities paying attention. For those we run reach and enquiry campaigns built on the same honest content.",
        ],
      },
    ],
    measured: {
      heading: "How it is measured",
      body: [
        "Qualified applications and the cost of each one for recruitment, and enquiries for reach and supplier campaigns. We agree the number at the start and report on it every week. We do not promise results or set contractual targets.",
      ],
    },
    faqs: [
      {
        question: "Do you do recruitment marketing for seafood, forestry and horticulture?",
        answer:
          "Yes. Recruitment is the most common primary industries brief we take: crews, plants, gangs, packhouses and seasonal rosters, measured in qualified applications. We make short video of the real work, run it as Meta ads to the regions you hire from, and send applicants to a form short enough to finish on a phone.",
      },
      {
        question: "Why use social media ads for recruitment instead of job boards?",
        answer:
          "Because many of the people who would suit hands-on roles are not browsing job boards, but they are on Facebook and Instagram most days. Ads reach them where they already are, with video that shows the job honestly. Job boards still have a place, and social ads add the people who were never going to search.",
      },
      {
        question: "Are there rules for running job ads on Facebook and Instagram?",
        answer:
          "Yes. Meta treats job ads as a special ad category, which limits targeting by age, gender and narrow location to prevent discrimination. Campaigns have to be built within those rules from the start, which changes how the creative and the audience are planned. We set recruitment campaigns up under the employment category as standard.",
      },
      {
        question: "When should a seasonal employer start recruiting?",
        answer:
          "Two to three months before you need the people, so the campaign is already working when the season opens. That leaves time to shoot content, test the ads and screen applicants without rushing. Starting a fortnight out usually means fewer good applicants to choose from.",
      },
      {
        question: "How much does a recruitment campaign cost?",
        answer:
          "We quote after a free audit, based on the number of roles, the regions, the content needed and how long the campaign runs. Ad spend is separate and paid from your own Meta ad account. The campaign is judged on cost per qualified application, so you can compare it with what the roles currently cost to fill.",
      },
    ],
    services: ["meta-ads", "content-video", "websites"],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRY_PAGES.find((i) => i.slug === slug);
}

export const INDUSTRY_FAQS: FaqItem[] = [
  {
    question: "Which industries does Tally work with?",
    answer:
      "Mostly consumer brands and marine businesses, with a recruitment and reach practice for primary industries operators. Consumer brands include retail, hospitality, products and experiences. Marine covers dealers, clubs, charters, hire and yards. Primary industries covers seafood, forestry, horticulture and processing. Instagram account recovery is open to any New Zealand business.",
  },
  {
    question: "Do you work with businesses outside Auckland?",
    answer:
      "Yes. Tally is based in Auckland and works with businesses across New Zealand. Auckland clients can have us on site for shoots and meetings at short notice. Elsewhere, shoots are planned around travel, and the rest of the work runs over calls, shared folders and a weekly update.",
  },
  {
    question: "When should a seasonal business start marketing?",
    answer:
      "Two to three months before you need the bookings or the people, so the campaign is already working when the season opens. That leaves time to shoot content, test ads and fix the enquiry process before demand peaks, instead of competing for the last customers or applicants at a higher cost.",
  },
];
