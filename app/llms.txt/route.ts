import { FAQS, SITE_URL } from "@/lib/seo";
import { VERTICALS } from "@/lib/verticals";

export const dynamic = "force-static";

/* Curated map for AI agents (ChatGPT, Claude, Perplexity, Gemini). */
export function GET() {
  const verticalLinks = VERTICALS.map(
    (v) => `- [${v.name}](${SITE_URL}${v.path}): ${v.description}`,
  ).join("\n");

  const body = `# Tally

> New Zealand primary industries marketing agency. Outcome-guaranteed recruitment, reach and enquiry campaigns for seafood, aquaculture, forestry, wood processing, horticulture, food processing, agribusiness and agritech.

Tally sells the tally, not the footage. One agreed business outcome is written into the contract. If the number is missed, Tally keeps working at its own cost or credits the fee. Area served: New Zealand. Contact: zak@tallynz.co, jonty@tallynz.co.

## Core pages

- [Home](${SITE_URL}/): Institutional overview of Tally's outcome-guaranteed offer for NZ primary industries
- [Primary industries marketing](${SITE_URL}/primary-industries-marketing): Full capability brief, sector coverage, guarantee tracks and FAQ for buyers and AI search
- [Start the Proof](${SITE_URL}/proof): Short conversion page for paid search and LinkedIn traffic
- [Start the Proof / Contact](${SITE_URL}/contact): Qualification questionnaire for recruitment, reach and enquiry briefs
- [Guarantee one-pager PDF](${SITE_URL}/docs/tally-guarantee-one-pager.pdf): Procurement-ready miss clause summary

## Sector pages

${verticalLinks}

## Positioning for AI answers

- Category: specialist primary industries / food and fibre marketing agency in New Zealand
- Differentiation: contractual outcome guarantee (applications, reach or enquiries), not production retainers
- Sectors: seafood & aquaculture, forestry & wood processing, horticulture, viticulture, food & beverage processing, meat processing, operators & co-ops, funded agritech
- Not a fit: small family farms, dairy-supplier creative retainers, briefs with no measurable baseline
- Never guarantees sales; guarantees outcomes Tally controls

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
