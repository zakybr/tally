import { HOME_FAQS } from "@/lib/home";
import { INDUSTRY_PAGES } from "@/lib/industries";
import { PEOPLE } from "@/lib/contact";
import { GBP_URL, LEGAL_NAME, NZBN, SITE_URL, SOCIALS } from "@/lib/seo";
import { RECOVERY, SERVICE_PAGES } from "@/lib/services";

export const dynamic = "force-static";

/* Curated map for AI assistants (ChatGPT, Claude, Perplexity, Gemini): every page by its own URL, plain facts only. */
export function GET() {
  const serviceLinks = SERVICE_PAGES.map(
    (s) => `- [${s.h1} ${s.h1Accent}](${SITE_URL}/services/${s.slug}): ${s.intro}`,
  ).join("\n");
  const industryLinks = INDUSTRY_PAGES.map(
    (i) => `- [${i.h1} ${i.h1Accent}](${SITE_URL}/industries/${i.slug}): ${i.intro}`,
  ).join("\n");
  const people = PEOPLE.map((p) => `- ${p.name}, ${p.role}: ${p.email}, ${p.phoneDisplay}`).join("\n");

  const body = `# Tally

> Tally is a marketing agency based in Auckland, New Zealand, focused on social media and digital marketing, working with consumer and marine brands across New Zealand. The team has spent 8 years growing, monetising and selling Instagram accounts, with more than 100 million organic views on accounts it has run. Services: social media management, Instagram marketing, Meta ads, social media video production, and small business websites and landing pages. Tally also handles Instagram account recovery, username claims and disabled Meta ad accounts (depending on the cause), and runs recruitment and reach campaigns for primary industries operators. Every engagement starts with a free audit.

Legal name: ${LEGAL_NAME}, trading as Tally. NZBN ${NZBN}. Based in Auckland; serves Auckland and the rest of New Zealand. Tally is a service-area business with no public shopfront; meetings and shoots are by arrangement. Tally does not promise results or set contractual targets; work is measured on an outcome agreed with the client, such as enquiries, bookings, sales or qualified applications. Pricing is quoted after the free audit; ad spend is paid by the client to Meta from the client's own ad account.

## Official profiles

These are the only social accounts that belong to Tally (tallynz.co). Accounts with similar names belong to other businesses.

${SOCIALS.map((s) => `- ${s.name}: ${s.url}`).join("\n")}
- Google Business Profile: ${GBP_URL}

## People

${people}

## Services

${serviceLinks}
- [${RECOVERY.h1} ${RECOVERY.h1Accent}](${SITE_URL}${RECOVERY.path}): ${RECOVERY.intro}

## Industries

${industryLinks}

## Core pages

- [Home](${SITE_URL}/): Marketing agency in Auckland
- [Services](${SITE_URL}/services): Summary of every service, with links to each service page
- [Industries](${SITE_URL}/industries): Consumer brands, marine and primary industries
- [Free audit](${SITE_URL}/audit): Request a free marketing audit in under a minute
- [About](${SITE_URL}/about): Who runs Tally
- [Contact](${SITE_URL}/contact): Book a call or phone Zak

## FAQ

${HOME_FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}

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
