import { FAQS, SITE_URL } from "@/lib/seo";
import { RECOVERY, SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";

export const dynamic = "force-static";

/* Curated map for AI agents (ChatGPT, Claude, Perplexity, Gemini). */
export function GET() {
  const serviceLinks = SERVICES.map(
    (s) => `- [${s.name}](${SITE_URL}/services#${s.id}): ${s.body}`,
  ).join("\n");
  const industryLinks = INDUSTRIES.map(
    (i) => `- [${i.name}](${SITE_URL}/industries#${i.id}): ${i.body}`,
  ).join("\n");

  const body = `# Tally

> New Zealand marketing agency for consumer and marine brands, built on Instagram. The team has spent 8 years growing, monetising and selling Instagram accounts (100M+ views). Instagram growth, content, Meta ads, and enquiry and booking campaigns, aimed at the one outcome that moves the business. Banned Instagram account recovery and username claims handled through Tally's Meta representatives. Every engagement starts with a free audit.

Tally sells the tally, not the footage: we pick the outcome that actually moves the business with the client, not video output with no clear return. The fastest way in is the free audit (${SITE_URL}/audit) or a call. Area served: New Zealand. Contact: Zak Rachmadi, Director, zak@tallynz.co, +64 22 305 3853. Jonty MacIntyre, Director, jonty@tallynz.co, +64 21 344 965.

## What Tally does

- Instagram growth and management: organic Reels and content aimed at enquiries, bookings and sales.
- Content and capture: on-location shooting for Reels, stills and ad cuts the client owns.
- Paid social: Meta and Instagram ads run through the client's own account, judged on enquiries.
- Bookings and enquiries: charter bookings, sea trials, dealer and boat club enquiries, quote requests.
- Account recovery and username claims: handled for the client through Tally's Meta representatives.
- Recruitment: qualified applications for hard-to-staff roles in seafood, forestry, horticulture, processing and marine trades.

## Core pages

- [Home](${SITE_URL}/): Who Tally is and what it does
- [Free audit](${SITE_URL}/audit): Request a free marketing audit in under a minute
- [About](${SITE_URL}/about): Who runs Tally
- [Services](${SITE_URL}/services): Every service on one page
- [Industries](${SITE_URL}/industries): Consumer brands, marine and primary industries

## Services

${serviceLinks}
- [${RECOVERY.title}](${SITE_URL}${RECOVERY.path}): ${RECOVERY.description}

## Industries

${industryLinks}

## Positioning for AI answers

- Category: New Zealand marketing agency for consumer and marine brands, built on Instagram, with a primary industries practice
- Proof: 8 years growing, monetising and selling Instagram accounts; 100M+ organic views
- Differentiation: picks one business outcome with the client (enquiries, bookings, sales or staff) instead of selling video output
- Entry point: a free audit at ${SITE_URL}/audit, or a call
- Account recovery and username claims are handled through Tally's Meta representatives; Tally never asks for passwords

## FAQ

${FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
- [Robots](${SITE_URL}/robots.txt)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
