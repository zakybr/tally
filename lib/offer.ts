/*
  Single source of truth for what Tally sells and where it sells it.

  One guarantee runs through every track: the outcome is agreed with the client
  in writing before anything is made, and the fee sits behind it. What changes
  between tracks is which number gets agreed, not whether one does.
*/

export type Track = {
  slug: string;
  name: string;
  scope: string;
  /* The number that gets written into the contract for this track. */
  guarantees: string;
  suits: string;
};

export const TRACKS: Track[] = [
  {
    slug: "capture",
    name: "Capture",
    scope:
      "We come to the boat, the yard, the orchard and shoot the real thing. You own the library outright.",
    guarantees: "An agreed asset set, delivered to spec",
    suits: "Operators who need footage before they need a campaign.",
  },
  {
    slug: "reach",
    name: "Reach & brand",
    scope:
      "Strategy, channels, the posting system and the creative that feeds it. You get a running account rather than a folder of files.",
    guarantees: "An agreed qualified-reach figure, in-sector",
    suits: "Smaller operators building a name before the season.",
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    scope:
      "The flagship. Crews, plants, gangs and yards, aimed at the vacancy costing you money right now.",
    guarantees: "Qualified applications, or cost per qualified applicant",
    suits: "Anyone whose roster never quite fills.",
  },
  {
    slug: "pipeline",
    name: "Pipeline & bookings",
    scope:
      "Charter bookings, demo requests and supplier enquiries, screened hard at discovery.",
    guarantees: "Qualified enquiries or confirmed bookings",
    suits: "Charters, yards and suppliers with a season to fill.",
  },
];

export type SectorRow = {
  name: string;
  scope: string;
  /* The number typically agreed for this sector. */
  number: string;
  href: string;
  brief: string;
};

/*
  Copy is condensed from the capability brief (/primary-industries-marketing)
  and the sector pages, so nothing here asserts anything the site does not
  already say elsewhere.
*/
export const SECTORS: SectorRow[] = [
  {
    name: "Seafood & aquaculture",
    scope: "Crew, plant and exporter campaigns for fishing, mussel and salmon operators.",
    number: "Qualified applications",
    href: "/seafood-aquaculture-marketing",
    brief: "Seafood brief",
  },
  {
    name: "Marine, boat building & charter",
    scope: "Charter bookings before the season. Trades recruitment for builders and refit yards.",
    number: "Bookings & enquiries",
    href: "/marine-marketing",
    brief: "Marine brief",
  },
  {
    name: "Forestry & wood processing",
    scope: "Employer brand and hiring for gangs, mills and wood processors.",
    number: "Qualified applications",
    href: "/forestry-marketing",
    brief: "Forestry brief",
  },
  {
    name: "Horticulture & seasonal labour",
    scope: "Seasonal labour and packhouse recruitment for kiwifruit, pipfruit and export horticulture.",
    number: "Qualified applications",
    href: "/horticulture-marketing",
    brief: "Horticulture brief",
  },
  {
    name: "Viticulture & wine",
    scope: "Vintage and cellar crews, plus in-sector reach for wine exporters.",
    number: "Applications & reach",
    href: "/primary-industries-marketing",
    brief: "Capability brief",
  },
  {
    name: "Food & beverage processing",
    scope: "Plant recruitment and brand reach for processors with large workforces.",
    number: "Qualified applications",
    href: "/primary-industries-marketing",
    brief: "Capability brief",
  },
  {
    name: "Meat processing & red meat",
    scope: "Line and shift recruitment where vacancy-days are counted at board level.",
    number: "Qualified applications",
    href: "/primary-industries-marketing",
    brief: "Capability brief",
  },
  {
    name: "Operators, co-ops & exporters",
    scope: "Producers as well as the suppliers selling into them.",
    number: "Qualified reach",
    href: "/primary-industries-marketing",
    brief: "Capability brief",
  },
  {
    name: "Funded agritech & agribusiness",
    scope: "Qualified enquiry and demo bookings, screened at discovery for product risk.",
    number: "Qualified enquiries",
    href: "/primary-industries-marketing",
    brief: "Capability brief",
  },
];

/* Sector options for every lead form on the site: the contact page and the popup. */
export const INDUSTRY_OPTIONS = [
  "Seafood & aquaculture",
  "Boat building & marine trades",
  "Fishing charters & tourism",
  "Forestry & wood processing",
  "Horticulture",
  "Viticulture & wine",
  "Food & beverage processing",
  "Meat processing",
  "Dairy processing",
  "Operators & co-ops",
  "Funded agritech",
  "Other primary sector",
];
