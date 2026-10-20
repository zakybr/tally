/*
  The free audit: the one form every "free" offer on the site leads to.
  Copy and options live here so the page, the form and /api/audit agree.
*/

export const AUDIT_HEADLINE = "Free marketing audit";

export const AUDIT_CHECKS: { title: string; body: string }[] = [
  {
    title: "Instagram and Meta ads",
    body: "What your account and ads are doing now, what is wasted, and what would bring in enquiries or sales.",
  },
  {
    title: "How people find you",
    body: "Google, Maps and social, set against a couple of local competitors.",
  },
  {
    title: "Where enquiries leak",
    body: "Slow pages on a phone, forms that ask too much, calls and DMs that go unanswered.",
  },
  {
    title: "The outcome worth going after",
    body: "The one thing that would actually move the business, and how we would get it. Not a pile of video with no clear return.",
  },
];

/* What the visitor wants more of. Stored as text in the lead, not a HubSpot enum. */
export const AUDIT_GOALS = [
  "More enquiries",
  "More bookings",
  "More sales",
  "More staff",
  "Grow our Instagram",
  "Banned account or username",
  "Not sure yet",
] as const;

export const SPEND_RANGES = ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000+"] as const;
