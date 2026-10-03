/*
  Everything on /audit that is likely to be swapped lives here, so a headline
  test or a new floor number is a one-line change.
*/

/* The H1. Swap freely. */
export const AUDIT_HEADLINE = "Enquiries, guaranteed in writing";

/* PLACEHOLDER: the guarantee floor. Replace with the real figure before running ads. */
export const GUARANTEE_FLOOR = "00";
export const GUARANTEE_FLOOR_UNIT = "qualified enquiries a month";

/* PLACEHOLDER images. Set a path under /public (e.g. "/images/audit-sample.jpg") to replace the frame. */
export const SAMPLE_AUDIT_IMAGE: string | null = null;
export const FOUNDER_PHOTO: string | null = null;

export const AUDIT_CHECKS: { title: string; body: string }[] = [
  {
    title: "Google Business Profile and Maps",
    body: "Your listing set against three local competitors: categories, reviews, photos, and where each of you appears when a customer searches nearby.",
  },
  {
    title: "Whether the website can record an enquiry",
    body: "Forms, call buttons and booking links, tested end to end, and whether each one is tracked so a real enquiry can be counted at all.",
  },
  {
    title: "Where enquiries leak",
    body: "The points where a ready customer gives up: slow pages on a phone, dead links, unanswered calls, forms that ask too much.",
  },
  {
    title: "Three ranked fixes and one number",
    body: "The three changes most likely to lift enquiries, in order, and the single monthly figure Tally would put in writing and guarantee.",
  },
];

export const SPEND_RANGES = ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000+"] as const;
