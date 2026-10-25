# SEO rebuild: what changed

Branch `seo-rebuild`, 25 October 2026. Not deployed, not pushed. Follows SEO_BRIEF.md, with the FACTS answers given on 25 Oct and the keyword changes accepted from AUDIT.md.

## Old to new URL map

| Old | New | How |
|---|---|---|
| `/services#marketing-management` | `/services/marketing-management` | Hub section kept under the same anchor and links to the new page |
| `/services#organic-growth` | `/services/instagram-marketing` | Same |
| `/services#paid-ads` | `/services/meta-ads` | Same |
| `/services#content-video` | `/services/content-video` | Same |
| `/services#websites` | `/services/websites` | Same |
| `/services#account-recovery` | `/instagram-account-recovery` | Same (URL unchanged) |
| `/industries#consumer` | `/industries/consumer-brands` | Same |
| `/industries#marine` | `/industries/marine` | Same |
| `/industries#primary-industries` | `/industries/primary-industries` | Same |
| `/instagram-growth`, `/guides/grow-business-instagram-new-zealand` | `/services/instagram-marketing` | 308, was the hub anchor |
| `/marine-marketing` | `/industries/marine` | 308, was the hub anchor |
| `/primary-industries-marketing`, `/seafood-aquaculture-marketing`, `/forestry-marketing`, `/horticulture-marketing` | `/industries/primary-industries` | 308, was the hub anchor |
| new guesses: `/services/instagram`, `/services/paid-ads`, `/services/facebook-ads`, `/services/account-recovery`, `/industries/consumer` | the matching page | 308 |

All other existing redirects are unchanged. Every redirect is a single hop.

## Sitewide

- **Meta keywords tag removed.** The 108-term `KEYWORDS` list is deleted.
- **Per-page metadata from one registry.** `lib/routes.ts` lists every indexable page with its title, description, social card text and content date. `routeMetadata(path)` gives each page its own title, description, canonical, og:title, og:description, og:image (with its own alt text), twitter:title, twitter:description and twitter:image. Nothing is inherited from the homepage any more; the root layout now carries only site-wide defaults.
- **Titles are 50 to 60 characters and descriptions 140 to 160 on all 17 indexable pages**, keyword first, then location, then "| Tally".
- **Social cards:** `app/og/[...path]` prerenders one 1200x630 card per page, showing that page's headline. The old root and about `opengraph-image.tsx` files are removed; the old root card still said "Primary Industries Marketing".
- **Structured data:** one server-rendered `@graph` per page (`components/JsonLd.tsx`):
  - **Organization on every page:** "Tally", legal name "Tally Marketing Limited", NZBN, logo, contact point, area served Auckland and New Zealand, and the Google Business Profile in `sameAs`.
  - **WebSite on every page.**
  - **ProfessionalService on the homepage and contact page**, service area only. There is no street address, per FACTS. MarketingAgency was considered and rejected because the schema.org URL returns 404.
  - **Per page:** a Service node on each service and industry page, a FAQPage wherever an FAQ is shown (questions and answers taken from the same data as the visible text), and a BreadcrumbList on every page except the homepage.
  - **Removed:** `priceRange "$$$$"` and the old duplicated `knowsAbout`, `makesOffer` and `serviceType` lists. There is no Review or AggregateRating markup.
- **Breadcrumbs:** a visible trail on every non-home page (`components/Breadcrumbs.tsx`), matching the URL path and the BreadcrumbList.
- **Sitemap:** built from the route registry. `lastmod` is each page's own content date (25 Oct for the rewritten pages, 22 Oct for terms, 12 Oct for privacy). Noindex pages are excluded.
- **404 page:** a custom `app/not-found.tsx` linking to every service and industry page.
- **Nav (menu sheet):** the Services list now holds the five service pages plus account recovery, and Industries holds the three industry pages. The sheet uses `inert` when closed, which fixes Lighthouse's `aria-hidden-focus` failure. The top bar is unchanged (wordmark, Free audit, Menu), because it was deliberately simplified on 20 Oct. The sheet acts as the Services dropdown rather than adding a new top-bar control.
- **Footer:** links every service page, every industry page and the company pages. The brand line names Auckland, and the copyright line reads "Tally Marketing Limited. NZBN 9429053993519. Auckland, New Zealand."
- **Sticky CTA bar:** uses `inert` when hidden, for the same accessibility fix.
- **llms.txt:** rewritten. It covers the Auckland base, legal name and NZBN, both people, every service and industry page by its own URL, a "no promised results" line, and the homepage FAQ. It no longer has anchors or "nationwide".

## Page by page

| Page | Title | H1 | Body words* | Notes |
|---|---|---|---|---|
| `/` | Social Media Marketing Agency in Auckland, NZ \| Tally | "Social media marketing agency in Auckland" + "We make brands people stop scrolling for." (one H1) | ~970 | Brand line and design kept. The keyword line sits in the H1 as a small label above the brand line. The intro names Auckland and the services. Cards link to each service and industry page with descriptive text. New visible "Common questions" band, so the FAQ markup now matches what is on the page. |
| `/services` | Social Media Marketing Services, Auckland and NZ \| Tally | Social media marketing services from Auckland | ~920 | Now a hub: 2 to 3 sentences per service, old anchors kept, each section linking to its page. ItemList in the structured data. |
| `/services/marketing-management` | Social Media Management Agency in Auckland, NZ \| Tally | Social media management in Auckland | ~1,500 | **New.** 7 FAQs. |
| `/services/instagram-marketing` | Instagram Marketing Agency in Auckland, NZ \| Tally | Instagram marketing agency in Auckland | ~1,450 | **New.** Sections on Reels and on what we will not do (no bought followers). 6 FAQs. |
| `/services/meta-ads` | Meta Ads Agency Auckland: Facebook and Instagram Ads \| Tally | Meta ads agency in Auckland | ~1,420 | **New.** Covers Facebook and Instagram ads run together, and restricted ad accounts. 6 FAQs. |
| `/services/content-video` | Social Media Video Production Auckland, NZ \| Tally | Social media video production in Auckland | ~1,240 | **New.** Compares hiring a videographer with a team that posts. 5 FAQs. |
| `/services/websites` | Small Business Website Design Auckland, NZ \| Tally | Small business website design in Auckland | ~1,290 | **New.** Section on landing pages. 5 FAQs. |
| `/instagram-account-recovery` | Instagram Account Recovery NZ: Banned and Disabled \| Tally | Instagram account recovery in New Zealand | ~1,210 | Expanded. New sections: how a case works, disabled or restricted Meta ad accounts ("depends on the cause"), and avoiding recovery scams, which names the company and its NZBN. "Through our Meta representatives" is kept. 7 FAQs. |
| `/industries` | Consumer, Marine and Primary Industry Marketing NZ \| Tally | Marketing for consumer, marine and primary industries | ~630 | Now a hub with the old anchors kept, each section linking to its page. New hub FAQ. |
| `/industries/consumer-brands` | Consumer Brand Marketing Agency NZ, Auckland \| Tally | Consumer brand marketing agency in New Zealand | ~950 | **New.** Retail and hospitality in Auckland. 5 FAQs. |
| `/industries/marine` | Marine Marketing Agency NZ: Dealers, Clubs, Charters \| Tally | Marine marketing agency for New Zealand | ~910 | **New.** Dealers, clubs, charters, hire and yards, plus marine trades recruitment. 5 FAQs. |
| `/industries/primary-industries` | Primary Industries Marketing and Recruitment NZ \| Tally | Primary industries marketing and recruitment | ~950 | **New** (still offered, per FACTS). Notes Meta's employment ad rules. 5 FAQs. |
| `/about` | About Us: Social Media Marketing Agency, Auckland \| Tally | About Tally | ~470 | Intro names Auckland. Bios unchanged (from the live site). Person and AboutPage nodes are in the page graph. The page-level keywords tag is removed. |
| `/contact` | Contact Us: Book a Call with an Auckland Agency \| Tally | Book a call | ~330 | Adds a line saying Tally is a service-area business in Auckland with no shopfront. Includes the ProfessionalService node. The phone number is written in the same format as the rest of the site. |
| `/audit` | Free Marketing Audit for Auckland and NZ Businesses \| Tally | Free marketing audit | ~460 | Intro names Auckland. Breadcrumb and page graph added. |
| `/audit/thanks` | Audit requested \| Tally | unchanged | | Still noindex. Now has its own canonical and description and uses the /audit social card. |
| `/privacy`, `/terms` | own titles and descriptions | unchanged | | Breadcrumbs and page graph only. The legal text is untouched, including the Consumer Guarantees Act references. |

\*Visible words including nav and footer, from the local crawl.

## QA results (Phase 5)

- **Build and checks:** `next build`, `eslint` and `tsc --noEmit` all pass.
- **Crawl:** every page in the sitemap returns 200 and has one H1, a unique title and description within length, a self-referencing https www canonical, a visible breadcrumb plus BreadcrumbList (except the homepage), and exactly one JSON-LD block. There are no broken internal links, no internal links that go through a redirect, and no orphan pages. Every image has alt text. There are no em or en dashes and no exclamation marks in visible copy. "Guarantee" appears only in the legal text on `/terms`. Every FAQ question and answer in the structured data appears word for word on its page.
- **Lighthouse (mobile, local production build), before → after:**

| Page | Performance | Accessibility | SEO | LCP |
|---|---|---|---|---|
| `/` | 77 → **80** | 96 → 96 | 100 → **100** | 6.5 s → 5.3 s |
| `/services/meta-ads` (vs `/services` before) | 85 → **85** | 95 → **100** | 100 → **100** | 4.4 s → 4.4 s |
| `/instagram-account-recovery` | 85 → **85** | 96 → **100** | 100 → **100** | 4.4 s → 4.4 s |

- **Robots and sitemap:** robots.txt is unchanged and still allows all the AI crawlers. sitemap.xml lists all 17 indexable pages with real dates.

## Claims I added that are not word for word in FACTS or the old site

Please check these:
- "Meta treats job ads as a special ad category, which limits targeting by age, gender and narrow location". This is Meta's published policy and is on the primary industries page.
- "much of New Zealand's marine industry sits in Auckland" (marine FAQ).
- "In our experience that turns into enquiries more cheaply than an advert made from scratch" (Meta ads proof section).
- "Zak runs strategy and delivery, Jonty runs the creative system", paraphrased from the existing About bios.
- General statements such as "most social media traffic arrives on a phone" and "Meta ads tire quickly".
- Recovery page: "Cases with a clear false positive tend to move faster". This is an inference, not a figure.

## Not done, or left for you

- **Socials:** Instagram, Facebook and LinkedIn are in `sameAs`, linked in the footer (`rel="me"`) and listed in llms.txt. The Facebook URL is the numeric `profile.php?id=` form until the Page has a username.
- **GBP link.** `share.google/…` is a share link. Swap it for the profile's `maps.google.com/?cid=` URL (see OFFSITE.md).
- **Case studies.** No client names are allowed yet, so each service and industry page has a TODO comment where one will go.
- **Intro animation.** Untouched, as instructed. It still accounts for most of the LCP time on every page.
- **Colour contrast on the homepage.** Small orange step numbers on light bands (#d93a10 on #e5e2dc) fail WCAG AA at 3.55:1. The fix is to darken the light-theme `--signal` to about #b8300d. I left it because it changes the brand colour.
- **`lib/offer.ts` and `lib/contact-form.ts`** have your own uncommitted changes. They are not in these commits. `lib/offer.ts` still uses "guarantees" field names, but nothing imports it, so it is not shown on any page.
