/*
  Sector pages. Kept short on purpose: what we move for this sector, a few
  real questions answered plainly (for search and AI answers), then the free
  audit or a call. The detail belongs on the call, not in the page.
*/
export type Vertical = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  outcomes: { name: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const VERTICALS: Vertical[] = [
  {
    slug: "seafood-aquaculture-marketing",
    path: "/seafood-aquaculture-marketing",
    name: "Seafood & aquaculture marketing",
    shortName: "Seafood & aquaculture",
    eyebrow: "Sector · Seafood & aquaculture",
    title: "Seafood and aquaculture marketing New Zealand",
    description:
      "Seafood and aquaculture marketing in New Zealand aimed at one outcome you can count: crew and plant applications, or reach with the buyers who decide. Free audit.",
    keywords: [
      "seafood marketing New Zealand",
      "aquaculture marketing NZ",
      "commercial fishing recruitment marketing",
      "seafood crew recruitment campaigns",
      "mussel farm employer brand",
      "salmon aquaculture marketing",
    ],
    intro:
      "Seafood and aquaculture operators rarely need more video. They need crews and plant roles filled, or the right buyers paying attention. We pick the one outcome that moves the needle for your business, then run the campaign that gets it.",
    outcomes: [
      {
        name: "Crew & plant recruitment",
        body: "Qualified applications for deck, plant and seasonal roles where the roster never quite fills.",
      },
      {
        name: "Employer brand in-sector",
        body: "A standing presence with people who already work the water, so you are not starting from zero every hiring round.",
      },
      {
        name: "Exporter & co-op attention",
        body: "Reach with the buyers, processors and partners who actually decide about your product.",
      },
    ],
    faqs: [
      {
        question: "Do you do seafood recruitment marketing in New Zealand?",
        answer:
          "Yes. Recruitment is the most common seafood and aquaculture brief we take: qualified applications for hard-to-staff crew and plant roles, measured in applications rather than videos delivered.",
      },
      {
        question: "Why is it so hard to recruit crew for fishing and aquaculture in New Zealand?",
        answer:
          "The work competes for the same people as construction and mining, it is misunderstood outside the sector, and most operators only advertise once a vacancy already hurts. The operators who fill crew reliably keep a presence in front of the right people before the roster breaks.",
      },
      {
        question: "How do you market a seafood business that sells business to business?",
        answer:
          "Most seafood revenue is contracted, so the marketing job is rarely direct sales. It is usually filling roles, being credible to the buyers and regulators already deciding about you, or defending reputation. We start with a free audit and pick whichever of those is worth the most to you.",
      },
      {
        question: "What does a seafood marketing campaign cost?",
        answer:
          "It depends on the outcome and how much capture is needed. The free audit and the first call are where we price it, once we know what the business actually needs moved.",
      },
    ],
  },
  {
    slug: "forestry-marketing",
    path: "/forestry-marketing",
    name: "Forestry & wood processing marketing",
    shortName: "Forestry & wood processing",
    eyebrow: "Sector · Forestry & wood processing",
    title: "Forestry marketing New Zealand",
    description:
      "Forestry and wood processing marketing in New Zealand: crew, machine operator and mill recruitment, and in-sector reach, aimed at an outcome you can count. Free audit.",
    keywords: [
      "forestry marketing New Zealand",
      "wood processing marketing NZ",
      "forestry crew recruitment campaigns",
      "mill recruitment marketing",
      "forestry employer brand NZ",
    ],
    intro:
      "Forestry and wood processing have a hiring problem that nobody is telling well. We pick the outcome that actually moves the business, usually qualified applications for crews and mill roles, and run the campaign that delivers it.",
    outcomes: [
      {
        name: "Crew & mill recruitment",
        body: "Qualified applications for forestry crews, machine operators and mill roles.",
      },
      {
        name: "Processor employer brand",
        body: "A presence with the people who already work wood, so the roster holds quarter after quarter.",
      },
      {
        name: "Funded operator reach",
        body: "Campaigns for processors and exporters who need a measurable shift in-sector.",
      },
    ],
    faqs: [
      {
        question: "Can you run forestry crew recruitment campaigns in NZ?",
        answer:
          "Yes. We run recruitment campaigns for forestry crews, machine operators and wood processing roles, measured in qualified applications.",
      },
      {
        question: "How do you recruit forestry crew in New Zealand?",
        answer:
          "Forestry competes with construction and civil for the same practical workforce. Campaigns that work show the real crew, machinery and conditions, address safety head on, and run before the gap opens rather than after.",
      },
      {
        question: "Can marketing help a mill with staffing rather than sales?",
        answer:
          "Yes, and for most processors it is the more valuable brief. Mills usually have contracted volume and a staffing problem, not a demand problem, and vacancy days on a line are countable in dollars.",
      },
      {
        question: "When should a forestry operation start a recruitment campaign?",
        answer:
          "Work backwards from when the crew has to be on the ground and start around two months before, so the campaign is already working when the gap opens.",
      },
    ],
  },
  {
    slug: "marine-marketing",
    path: "/marine-marketing",
    name: "Marine & charter marketing",
    shortName: "Marine & charter",
    eyebrow: "Sector · Marine, boat building & charter",
    title: "Marine marketing New Zealand",
    description:
      "Marine marketing in New Zealand: charter bookings, dealer and boat club enquiries, sea trials and marine trades recruitment. Built on Instagram. Free audit.",
    keywords: [
      "marine marketing New Zealand",
      "boat builder marketing NZ",
      "boat dealer marketing NZ",
      "fishing charter marketing New Zealand",
      "charter booking campaigns NZ",
      "marine trades recruitment marketing",
      "boat club marketing NZ",
    ],
    intro:
      "Dealers, boat clubs, charters and yards all live on a season. We pick the outcome that fills it, whether that is bookings, sea trials, enquiries or trades applications, and run the Instagram-led campaign that gets there before summer.",
    outcomes: [
      {
        name: "Bookings & enquiries",
        body: "Charter bookings, sea trials, dealer enquiries and boat club sign-ups ahead of the season.",
      },
      {
        name: "Marine trades recruitment",
        body: "Qualified applications for shipwrights, fabricators, marine engineers and apprentices.",
      },
      {
        name: "Instagram content that sells boats",
        body: "Reels shot on the water that make people want the day out, not just the spec sheet.",
      },
    ],
    faqs: [
      {
        question: "Do you do marketing for fishing charters and boat dealers in New Zealand?",
        answer:
          "Yes. Marine is a core focus: charter bookings, dealer enquiries, sea trials and boat club sign-ups, run mostly through Instagram and Meta ads.",
      },
      {
        question: "Why is my charter or boat business not getting bookings?",
        answer:
          "Usually the boat is fine and the visibility is not. Demand comes in a short window and the operators who take it are the ones people already knew about. The common faults are no presence outside the season, footage of the boat instead of the day out, and no easy way to enquire from a phone.",
      },
      {
        question: "When should a marine business start marketing for summer?",
        answer:
          "Early spring at the latest. Starting inside the season means paying for attention when everyone else is buying it.",
      },
      {
        question: "What does marine marketing cost in New Zealand?",
        answer:
          "It depends on the outcome and how much content needs shooting. We price it on the first call, after the free audit shows where the bookings are going.",
      },
    ],
  },
  {
    slug: "horticulture-marketing",
    path: "/horticulture-marketing",
    name: "Horticulture marketing",
    shortName: "Horticulture",
    eyebrow: "Sector · Horticulture",
    title: "Horticulture marketing New Zealand",
    description:
      "Horticulture marketing in New Zealand: seasonal labour and packhouse recruitment, and reach for kiwifruit, pipfruit and export operators. Free audit.",
    keywords: [
      "horticulture marketing New Zealand",
      "kiwifruit marketing NZ",
      "pipfruit marketing New Zealand",
      "seasonal labour recruitment campaigns NZ",
      "packhouse recruitment marketing",
    ],
    intro:
      "Horticulture lives and dies on seasonal labour with a hard start date. We pick the outcome that matters most to your season, usually qualified applications, and run the campaign that gets people on the line.",
    outcomes: [
      {
        name: "Seasonal labour campaigns",
        body: "Qualified applications for harvest, packhouse and seasonal roles with a hard start date.",
      },
      {
        name: "Grower employer brand",
        body: "Reach with people who will actually turn up for the season.",
      },
      {
        name: "Category & export attention",
        body: "Reach with the buyers and partners who decide about your product.",
      },
    ],
    faqs: [
      {
        question: "Do you do seasonal labour recruitment marketing for horticulture?",
        answer:
          "Yes. Seasonal and packhouse recruitment is the most common horticulture brief we take, measured in qualified applications.",
      },
      {
        question: "How do you recruit seasonal labour for a packhouse or orchard?",
        answer:
          "Start before the season, show the real site and shift, and be honest about the conditions. An applicant surprised on day one leaves in week two and you pay to recruit them twice.",
      },
      {
        question: "When should a horticulture operation start for the coming season?",
        answer:
          "Count back from your first pick or packhouse shift and start about three months out, so the campaign is building before the region competes for the same people.",
      },
    ],
  },
];

export function getVertical(slug: string) {
  return VERTICALS.find((v) => v.slug === slug);
}
