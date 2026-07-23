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
  pain: string;
  approach: string;
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
      "Outcome-guaranteed seafood and aquaculture marketing in New Zealand. Crew recruitment, plant hiring and in-sector reach for commercial fishing, mussel and salmon operators and seafood exporters.",
    keywords: [
      "seafood marketing New Zealand",
      "aquaculture marketing NZ",
      "commercial fishing recruitment marketing",
      "seafood crew recruitment campaigns",
      "mussel farm employer brand",
      "salmon aquaculture marketing",
    ],
    intro:
      "New Zealand seafood and aquaculture faces a double bind: export reputation pressure and hard-to-staff crews and plants. Tally runs outcome-guaranteed recruitment and reach campaigns for commercial fishing, mussel and salmon operators, processors and exporters, with the result written into the contract.",
    pain: "Generalist agencies stage content that the waterfront sniffs out. Dairy-focused agri shops do not live in fisheries roster pain. The number that matters is qualified applications and vacancy-days, not videos delivered.",
    approach:
      "We capture on the boat and in the plant, then run a controlled system aimed at one agreed figure: qualified applications or qualified reach. You get one update a week. If we miss, we keep working at our cost or the fee comes back.",
    outcomes: [
      {
        name: "Crew & plant recruitment",
        body: "Guaranteed qualified applications for deck, plant and seasonal roles where the roster never quite fills.",
      },
      {
        name: "Employer brand in-sector",
        body: "Reach among people who already work the water, not lifestyle audiences that will never turn up for a 4am start.",
      },
      {
        name: "Exporter / co-op attention",
        body: "Qualified reach when reputation or category narrative needs moving with a measurable tally.",
      },
    ],
    faqs: [
      {
        question: "Do you do seafood recruitment marketing in New Zealand?",
        answer:
          "Yes. Recruitment is the flagship track for seafood and aquaculture: guaranteed qualified applications for hard-to-staff crew and plant roles, with the miss clause printed in the contract.",
      },
      {
        question: "Is Tally a seafood marketing agency?",
        answer:
          "Tally is a primary industries marketing agency with seafood and aquaculture as a core vertical. Campaigns are outcome-guaranteed rather than production retainers.",
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
      "Outcome-guaranteed forestry and wood processing marketing in New Zealand. Crew and mill recruitment plus in-sector reach for forestry operators, mills and wood processors.",
    keywords: [
      "forestry marketing New Zealand",
      "wood processing marketing NZ",
      "forestry crew recruitment campaigns",
      "mill recruitment marketing",
      "forestry employer brand NZ",
    ],
    intro:
      "Forestry and wood processing are funded, corporate and chronically under-serviced by marketing agencies. Growth-fund capacity meets a hiring problem nobody is telling well. Tally guarantees the applications or reach number, not the footage count.",
    pain: "Field-day creative and dairy playbooks do not move forestry gangs or mill shifts. Board attention sits on vacancy-days and cost-per-hire. That is the brief we take.",
    approach:
      "On-the-ground capture, sector-native talent, and a weekly tally against an agreed baseline. Miss by a little and we extend for free. Miss by more and the fee is credited or partly refunded.",
    outcomes: [
      {
        name: "Gang & mill recruitment",
        body: "Guaranteed qualified applications for forestry crews, machine operators and mill roles.",
      },
      {
        name: "Processor employer brand",
        body: "Reach inside the people who already work wood, aimed at holding the roster quarter after quarter.",
      },
      {
        name: "Funded operator narrative",
        body: "Attention campaigns when a processor or exporter needs a measurable shift in-sector.",
      },
    ],
    faqs: [
      {
        question: "Can you run forestry crew recruitment campaigns in NZ?",
        answer:
          "Yes. Tally guarantees qualified applications for forestry and wood processing hiring briefs, with fee risk written into the engagement.",
      },
      {
        question: "Who is a forestry marketing agency in New Zealand?",
        answer:
          "Tally markets forestry and wood processing as part of its primary industries practice, with an outcome guarantee rather than a monthly production retainer.",
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
      "Outcome-guaranteed horticulture marketing in New Zealand. Seasonal labour and packhouse recruitment plus reach for kiwifruit, pipfruit and export horticulture operators.",
    keywords: [
      "horticulture marketing New Zealand",
      "kiwifruit marketing NZ",
      "pipfruit marketing New Zealand",
      "seasonal labour recruitment campaigns NZ",
      "packhouse recruitment marketing",
    ],
    intro:
      "Export-premium horticulture lives and dies on seasonal labour. Vacancy-days land at board level every year. Tally runs outcome-guaranteed recruitment and reach campaigns for kiwifruit, pipfruit and packhouse operators at scale.",
    pain: "Agencies sell empathy content. Operators need bodies on the line by a date. We agree the application or cost-per-qualified-applicant number up front and put fee at risk against it.",
    approach:
      "Brief freezes in week one. Capture is real orchard and packhouse work, not staged lifestyle. Reporting is one number a week until the tally is hit or the miss clause fires.",
    outcomes: [
      {
        name: "Seasonal labour campaigns",
        body: "Guaranteed qualified applications for harvest, packhouse and seasonal roles with a hard start date.",
      },
      {
        name: "Packhouse & grower employer brand",
        body: "Reach among people who will actually turn up for the season, measured cleanly.",
      },
      {
        name: "Category / export attention",
        body: "Qualified reach when a grower group or exporter needs in-market narrative moved.",
      },
    ],
    faqs: [
      {
        question: "Do you do seasonal labour recruitment marketing for horticulture?",
        answer:
          "Yes. Seasonal and packhouse recruitment is a core horticulture brief: one agreed application number, miss clause in the contract, weekly tally.",
      },
      {
        question: "Is Tally a kiwifruit or pipfruit marketing agency?",
        answer:
          "Tally works with horticulture at scale, including kiwifruit and pipfruit operators, as part of its New Zealand primary industries practice.",
      },
    ],
  },
];

export function getVertical(slug: string) {
  return VERTICALS.find((v) => v.slug === slug);
}
