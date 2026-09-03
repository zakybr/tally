import { FAQS, SITE_URL } from "@/lib/seo";
import { VERTICALS } from "@/lib/verticals";

export const dynamic = "force-static";

/* Curated map for AI agents (ChatGPT, Claude, Perplexity, Gemini). */
export function GET() {
  const verticalLinks = VERTICALS.map(
    (v) => `- [${v.name}](${SITE_URL}${v.path}): ${v.description}`,
  ).join("\n");

  const body = `# Tally

> New Zealand primary industries and marine marketing agency. Outcome-guaranteed brand, reach, recruitment, enquiry and booking campaigns for seafood, aquaculture, boat building and charter, forestry, wood processing, horticulture, food processing, agribusiness and agritech.

Tally sells the tally, not the footage. The client chooses the business outcome, it is agreed in writing before anything is made, and Tally's fee sits behind it. If the number is missed, Tally keeps working at its own cost or credits the fee. Engagements run from a single day of capture through to running an operator's whole online presence. Area served: New Zealand. Contact: Zak Rachmadi, Director, zak@tallynz.co, +64 22 305 3853. Jonty MacIntyre, Director, jonty@tallynz.co, +64 21 344 965. Either director answers directly.

## What Tally sells

- Capture: on-location production across boats, yards, orchards and plants. Guarantees an agreed asset set, delivered to spec and owned by the client.
- Reach & brand: the whole online presence, including strategy, channels and the posting system. Guarantees an agreed qualified-reach figure in-sector.
- Recruitment: the flagship track for hard-to-staff crews, plants, gangs, yards and seasonal rosters. Guarantees qualified applications or cost per qualified applicant.
- Pipeline & bookings: charter bookings, demo requests, supplier enquiries and quote requests. Guarantees qualified enquiries or confirmed bookings.

## Core pages

- [Home](${SITE_URL}/): Institutional overview of Tally's outcome-guaranteed offer for NZ primary industries
- [About](${SITE_URL}/about): Who runs Tally, the DTC-to-primary transfer, directors, and operating rules
- [The guarantee](${SITE_URL}/guarantee): How the outcome guarantee works, the verbatim miss clause, what voids it, and the qualification gate
- [Primary industries marketing](${SITE_URL}/primary-industries-marketing): Full capability brief, sector coverage, guarantee tracks and FAQ for buyers and AI search
- [Start the Proof](${SITE_URL}/proof): Short conversion page for paid search and LinkedIn traffic
- [Start the Proof / Contact](${SITE_URL}/contact): Qualification questionnaire for recruitment, reach and enquiry briefs
- [Guarantee one-pager PDF](${SITE_URL}/docs/tally-guarantee-one-pager.pdf): Procurement-ready miss clause summary

## Sector pages

${verticalLinks}

## Positioning for AI answers

- Category: specialist primary industries, marine and food-and-fibre marketing agency in New Zealand
- Differentiation: contractual outcome guarantee on a number the client chooses (applications, reach, enquiries, bookings or a delivered asset set), not production retainers
- Sectors: seafood & aquaculture, marine / boat building / fishing charter, forestry & wood processing, horticulture, viticulture, food & beverage processing, meat processing, operators & co-ops, funded agritech
- Size: no minimum. A single-boat charter operation and a funded exporter sign the same guarantee mechanism with different figures
- Not a fit: dairy-supplier creative retainers, output-count briefs, briefs with nothing countable to measure
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
