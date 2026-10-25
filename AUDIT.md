# tallynz.co SEO audit (Phase 0)

25 October 2026. Measured against a local production build (`next build` + `next start`, commit `1bdbc54`), plus the live site for redirects and the sitemap. Nothing on the site has been changed yet.

## How this was measured

- **Crawl:** each route was fetched from the production build. Title, description, canonical, OG/Twitter tags, H1/H2s, word count, Auckland mentions, images, internal links and JSON-LD were extracted from the server HTML.
- **JSON-LD in the browser:** checked with `querySelectorAll('script[type="application/ld+json"]')` on `/`, `/services` and `/instagram-account-recovery`. The rendered blocks match the server HTML, so nothing is injected at runtime.
- **Lighthouse:** v12.8.2, mobile, simulated throttling, run locally. Absolute timings will differ from field data, but the comparison between pages holds.
- **Competitor research: one big caveat.** The search tool I have runs from the US and cannot return a real google.co.nz result for an Auckland searcher. The lists below show who is visible and indexed for each term, not true NZ rankings. Before trusting position data, check the target terms from an Auckland connection in a private window, or in Search Console once it is verified. The page-level comparisons (what a ranking page covers) are still valid.

## Repo map

| Thing | Where |
|---|---|
| Framework | Next.js 16.2.10, App Router, React 19, Tailwind 4. Middleware is `proxy.ts`, which only runs on `/admin` and `/?code=` |
| Global metadata | `app/layout.tsx` (title template `%s \| Tally`, keywords, OG, Twitter, robots, `geo.*`) |
| SEO copy, keywords, FAQs, schema builders | `lib/seo.ts` |
| Service copy | `lib/services.ts` (`SERVICES`, `SERVICE_FAQS`, `RECOVERY`) |
| Industry copy | `lib/industries.ts` |
| People | `lib/contact.ts` (`PEOPLE`) |
| Sitemap / robots / llms.txt | `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts` |
| Redirects | `next.config.ts` |
| OG images | `app/opengraph-image.tsx`, `app/about/opengraph-image.tsx` |
| JSON-LD | Org + WebSite in `app/layout.tsx`, plus a separate `<script>` per page in each `page.tsx` |
| Page shell / components | `components/PageShell.tsx`, `components/home/*`, `FooterCta`, `CtaPair`, `Pill`, `Nav` |

## Crawl results

| Route | Title (chars) | Desc chars | H1 | Words | "Auckland" | Own OG image | Twitter tags |
|---|---|---|---|---|---|---|---|
| `/` | Marketing Agency NZ for Consumer and Marine Brands \| Tally (58) | 150 | We make brands people stop scrolling for. | 547 | 0 | yes | own |
| `/services` | Marketing Services NZ: Instagram, Ads, Content & Websites \| Tally (**65**) | **167** | What we do | 746 | 0 | **none** | **homepage** |
| `/industries` | Industries: Consumer, Marine & Primary Industries Marketing NZ \| Tally (**70**) | 159 | Who we work with | 504 | 0 | **none** | **homepage** |
| `/instagram-account-recovery` | Instagram account recovery & username claims NZ \| Tally (55) | **167** | Banned Instagram account? We handle it. | 654 | 0 | **none** | **homepage** |
| `/about` | About Tally \| Instagram and Marketing Agency NZ \| Tally (55) | 158 | About Tally | 448 | 0 | yes, but its alt text says "primary industries marketing agency" | **homepage** |
| `/contact` | Contact Tally \| Book a Zoom Call \| Tally (40) | 140 | Book a call | 285 | 0 | **none** | **homepage** |
| `/audit` | Free marketing audit for New Zealand businesses \| Tally (55) | 145 | Free marketing audit | 433 | 0 | **none** | **homepage** |
| `/privacy` | Privacy Policy \| Tally (22) | 118 | What we collect, and why. | 1291 | 0 | none | homepage |
| `/terms` | Terms of Service \| Tally (24) | 110 | The terms, in plain words. | 787 | 0 | none | homepage |
| `/audit/thanks` (noindex) | Audit requested \| Tally | inherits homepage | Got it. We are on it. | 121 | 0 | inherits homepage | homepage |
| 404 | Next.js default "404: This page could not be found." | inherits homepage | 404 | 28 | 0 | inherits homepage | homepage |

Every page has exactly one H1, a self-referencing https www canonical (except the two noted below), and no em or en dashes in visible copy. There are no images without alt text: the only empty `alt` is the decorative band image on `/`, which is correct. Internal links point only at the hub pages and their `#anchors`. Every page has the same set of nav and footer links, so there are no orphans apart from `/audit/thanks`, which is fine because it is noindex.

## Lighthouse (mobile)

| Page | Perf | A11y | Best practice | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| `/` | 77 | 96 | 100 | 100 | 6.5 s | 0 | 20 ms | 0.9 s |
| `/services` | 85 | 95 | 100 | 100 | 4.4 s | 0 | 10 ms | 0.9 s |
| `/instagram-account-recovery` | 85 | 96 | 100 | 100 | 4.4 s | 0 | 10 ms | 0.9 s |

- **LCP is almost all render delay** (6.0 s on `/`, 4.0 s on the others). The LCP element (the H1 or intro paragraph) is in the HTML at 0.9 s, but the intro animation holds it back. This is a design choice, not an SEO bug. Google field data counts it all the same, so it is worth discussing (see finding 14).
- **INP risk is low.** TBT is 10 to 20 ms. The main JS cost is GA (177 KiB) and the Meta pixel (112 KiB), plus about 168 KiB of unused JS.
- `/` loads a 2.4 MB hero video on mobile.
- Accessibility failures: a colour-contrast failure on `/`, and `aria-hidden-focus` (a focusable element inside an `aria-hidden` container) on `/services` and the recovery page.

## Findings, ranked by impact

### High

1. **Six services share one URL.** Confirmed. `/services` holds six roughly 50 to 80 word sections behind anchors, so no service can rank on its own. The ranking pages I read have one URL per service: Clickthrough has `/google-ads-agency` and `/social-media-marketing`, New Wave has `/social-media` and `/video-production`, Kiwi Web Design has `/meta-ads` and `/small-business-web-design-auckland`.
2. **Auckland appears zero times on every page**, and in no title, H1, schema or llms.txt. The location you rank for is set to the whole country (`geo.placename: New Zealand`, `areaServed: Country NZ`, "nationwide" in the FAQ). Every Auckland competitor I read puts Auckland in the title or H1, and the strong ones also have a "Built for Auckland" style section.
3. **Weak Organization entity, made worse by the "Tally" name clash.** A search for `"tallynz.co" OR "Tally Marketing Limited" Auckland` returned only Tally Solutions (India), Tally Group (AU) and tally.so. The schema has `legalName: "Tally"`, which is wrong. It has no address, no NZBN, and `sameAs` holds only Zak's LinkedIn. It also has `priceRange: "$$$$"` (not in FACTS), duplicate `knowsAbout` entries, and Organization and ProfessionalService merged into one node, split across two `<script>` blocks rather than one `@graph`.
4. **The homepage carries FAQPage schema but shows no FAQ.** All 8 `FAQS` exist only in JSON-LD. That breaks Google's structured-data guidelines and risks a manual action on rich results. Those answers also say "nationwide" and "recruitment marketing".
5. **The meta keywords tag has 108 terms**, not 30, on every page except `/about`, which has 5. About 60% are primary-industry, recruitment, kiwifruit, dairy and similar terms that contradict the current positioning.
6. **Old positioning is still live in machine-readable places:** `LONG_DESCRIPTION`, `FAQS`, `SERVICE_FAQS` ("we also run recruitment and reach for seafood…"), `INDUSTRY_FAQS`, schema `knowsAbout`, `serviceType` and `makesOffer` (Recruitment and Capture offers), the `/industries` copy, and llms.txt. llms.txt also still lists **Jonty as "Director"**, contradicting the Partner change made on 22 Oct.

### Medium

7. **H1s carry no keyword:** "We make brands people stop scrolling for.", "What we do", "Who we work with", "Book a call". The recovery H1 ("Banned Instagram account? We handle it.") is close but lacks "recovery" and "NZ".
8. **OG and Twitter inheritance.** Every subpage's `openGraph` object replaces the root one, so `/services`, `/industries`, the recovery page, `/contact`, `/audit`, `/privacy` and `/terms` ship **no og:image at all**. All subpages ship the homepage `twitter:title` and `twitter:description`.
9. **Lengths are off:** the titles for `/services` (65) and `/industries` (70) are over 60, and the descriptions for `/services` and the recovery page (167) are over 160. The `/contact` description uses `022 305 3853` while the rest of the site uses `+64 22 305 3853`. Minor, but name, address and phone should match everywhere.
10. **The sitemap has a hard-coded `lastmod` of 2026-10-20** on every URL, confirmed live. Git history gives real dates per page, for example terms on 22 Oct and the services page on 20 Oct.
11. **Thin service copy compared with the competition.** Ranking pages vary a lot:

| Page I read | Words | FAQs | Pricing | Proof |
|---|---|---|---|---|
| Kiwi Web Design, small business web design Auckland | ~1,500 | 7 | "fixed custom quote", calculator | reviews, 10 case studies, "since 2019" |
| Web Tonic, Meta ads and social media agency listicles (directory) | ~1,500 | none | none | criteria list |
| K6, Instagram recovery guide (global) | ~1,300 | 6 | none | weak, no scam warning |
| Perpetua, social media video Auckland | ~550 | none | quote form | client logos, testimonial |
| New Wave, social content | ~450 | none | none | client logos, case studies |
| Clickthrough, digital marketing Auckland | ~100 | none | none | "16 years" |
| Kiwi Web Design, Meta ads | ~85 | none | none | none |

    The bar is lower than the brief assumed for most terms. A 900 to 1,200 word page with an FAQ, a process, pricing guidance and an honest scam warning would be the most complete page in the set for Meta ads, Instagram, content and recovery. Web design is the exception, where Kiwi Web Design is strong and has reviews.
12. **The 404 is the Next default.** It inherits the homepage description and links only to `/audit`.
13. **`/audit/thanks` canonical points to the homepage** and inherits homepage OG. It is noindex, so the impact is low, but it should self-reference or drop the canonical.

### Low

14. **The intro animation delays LCP by 4 to 6 s on mobile.** CLS is 0 and the text is in the server HTML, so crawlers see everything. Real-user Core Web Vitals will still mark LCP as poor. I'd consider skipping the intro on non-home pages, or letting the H1 paint underneath it. I won't touch it without your say-so, because it is part of the brand.
15. **Redirect chain:** `https://tallynz.co/` goes to `https://www.tallynz.co/` in 1 hop (308). `http://tallynz.co/` takes 2 hops (http to https on the apex, then to www). The trailing-slash variants take 1 hop (308) to the slashless URL. 308 is treated like 301 by Google. Getting `http://tallynz.co` down to one hop means changing the Vercel domain setting, which the brief says not to touch, so it goes in OFFSITE.md.
16. **"Guarantee" on `/terms`:** three hits, all legal language ("cannot guarantee the same result…" and two references to the Consumer Guarantees Act 1993). These are disclaimers, not offers, and must stay. The Phase 5 grep should treat them as allowed.
17. **Accessibility:** a contrast failure on `/` and `aria-hidden-focus` on the PageShell pages. Small fixes I'll pick up in Phase 1.

### Already right (leave alone)

- `robots.txt` allows `*` plus GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended, and blocks `/admin` and `/auth`.
- llms.txt exists and is static.
- Canonicals are self-referencing https www with no trailing slash, and titles are unique.
- All copy is server-rendered. No important text depends on client JS.
- `next/image` with AVIF/WebP is already set up, and Lighthouse SEO is 100 on all three pages.

## Who is visible for each term

US-located search, so treat these as visible competitors, not NZ positions.

| Term | Who showed up | Read |
|---|---|---|
| marketing agency Auckland | Clickthrough, LocaliQ, NiKa, Net Branding; directories (Spur, Semrush Agency Partners, Influencer Marketing Hub); business-for-sale listings | Dominated by SEO and Google Ads "digital marketing" agencies. Tally sells neither. |
| social media management Auckland | Upwork, Airtasker, Prezlo (freelancer marketplaces); Web Tonic "18 Auckland social media agencies" listicle (New Wave, First Page, Flight Digital, Friends of Friends, Squid…); aucklife.co.nz | Mixed intent with price-shoppers. The listicles are the real gateway. |
| Instagram marketing agency Auckland | Almost entirely Semrush Agency Partners lists (authentic digital, Digital Stream, Webzilla) | No agency owns a dedicated page for it. This is the best opening. |
| Meta ads agency Auckland | Web Tonic shortlist (Harper Digital, First Page, Firefly, NiKa, Pure SEO, Naked, iDigital, Search Republic, Onepost, Digital Refinery, Fabric, Flight); Kiwi Web Design `/meta-ads` (85 words, from NZ$399/mo) | Thin pages rank. Getting onto the listicles matters as much as the page itself. |
| social media content creation Auckland | Mostly job ads (Seek, Momentum, UoA); Perpetua Productions; New Wave | The phrasing reads as jobs intent. See the proposal below. |
| website design Auckland small business | Kiwi Web Design owns most results (several URLs) | Hard to win against a 1,500-word page with reviews. Low priority. |
| Instagram account recovery NZ | Only global guides (Onlypult, Leadsie, K6, Pallyy) and Gumroad "unban" sellers. No NZ business. | Wide open. A named NZ firm with a scam warning stands out. |
| marine marketing agency NZ | Yachting Pages directory (Kite Media, Albatross PR), DesignRush "The Marine Marketing Agency", Quenzel, Fastnet (UK) | No NZ agency has a strong page. Wide open. Yachting Pages is a directory worth joining. |
| consumer brand marketing agency NZ | Clutch branding list, Federation, AGI, Soup, The In Group, Semrush consumer goods lists | Big-brand ATL agencies. Weak fit for a small Instagram-led team. |

Directories that keep appearing: **Semrush Agency Partners** (Auckland region lists for Instagram marketing, social media marketing and Facebook advertising), **Web Tonic listicles**, **Clutch NZ**, **DesignRush**, **Spur**, **Yachting Pages** (marine), and **Upwork/Airtasker** (not worth it).

## Proposed changes to the keyword map

Your map stays as-is apart from these. Nothing gets swapped without your yes.

| Page | Brief's primary | Proposal | Why |
|---|---|---|---|
| `/` | marketing agency Auckland | **social media marketing agency Auckland** as the primary, with "marketing agency Auckland" kept in the title and as the main secondary | The broad term is owned by SEO and Google Ads shops, and Tally sells neither. The social-led phrasing describes what Tally does and has fewer established competitors. Title would be something like "Social Media Marketing Agency Auckland \| Tally". |
| `/services/content-video` | social media content creation Auckland | **social media video production Auckland** as the primary, with "content creation" kept as a secondary | "content creation Auckland" returns job ads. "social media video production" returns agencies (Perpetua titles its page that way). |
| `/services/websites` | website design Auckland small business | **small business website design Auckland** (word order only) | That is how the ranking page phrases it. Low priority either way: Kiwi Web Design has the reviews and the depth. |
| `/industries/consumer-brands` | consumer brand marketing agency NZ | Keep, but expect little from it | That SERP is national ATL agencies. Its job is internal linking and AI context more than ranking. |
| Others | as briefed | Keep | Instagram, Meta ads, recovery and marine all show weak or no dedicated competition. |

## Proposed URL map

| URL | Status | Primary keyword | Notes |
|---|---|---|---|
| `/` | rewrite | per decision above | H1 and intro name Auckland and the services, and link to every service page. Brand line stays. Visible FAQ added so the FAQ schema is legitimate (or the schema removed). |
| `/services` | becomes the hub | services hub | 2 to 3 sentences per service, keeps the `id`s `marketing-management`, `organic-growth`, `paid-ads`, `content-video`, `websites` and `account-recovery`, so old anchors still land. Each section links to its new page. |
| `/services/marketing-management` | **new** | social media management Auckland | |
| `/services/instagram-marketing` | **new** | Instagram marketing agency Auckland | Hub anchor `#organic-growth` |
| `/services/meta-ads` | **new** | Meta ads agency Auckland | Hub anchor `#paid-ads` |
| `/services/content-video` | **new** | per decision above | |
| `/services/websites` | **new** | per decision above | |
| `/instagram-account-recovery` | keep URL, expand | Instagram account recovery NZ | Add a disabled ad accounts section only if FACTS says yes |
| `/industries` | becomes the hub | | Keeps anchors `consumer`, `marine` and `primary-industries` (the last only if still offered; otherwise the anchor stays as a short note and the old redirects point to the hub) |
| `/industries/marine` | **new** | marine marketing agency NZ | |
| `/industries/consumer-brands` | **new** | consumer brand marketing agency NZ | |
| `/industries/primary-industries` | **new only if FACTS says still offered** | | |
| `/about`, `/contact`, `/audit` | metadata, schema, Auckland, bios | | |
| `/privacy`, `/terms` | metadata only | | |
| `/audit/thanks` | fix canonical | | noindex stays |
| custom `not-found.tsx` | **new** | | links to every service page |

Redirect updates in `next.config.ts`: `/instagram-growth` changes from `/services#organic-growth` to `/services/instagram-marketing`, `/marine-marketing` to `/industries/marine`, and `/guides/grow-business-instagram-new-zealand` to `/services/instagram-marketing`. The primary-industry redirects depend on FACTS.

## Blocking: the FACTS block arrived unfilled

The brief says "never invent anything outside them", so I need these before Phase 3 copy and Phase 4 schema:

1. Show the Campbells Bay street address publicly, or list Tally as a service-area business only?
2. Jonty: keep or remove? The site currently lists him as Partner with his own phone and email.
3. Client names we may publish: list, or none?
4. Google reviews: count and rating, or none yet?
5. Primary industries recruitment: still offered, or drop?
6. Disabled Meta ad accounts (payment, chargeback, policy): do you take these?
7. "Through our Meta representatives" on the recovery page: accurate and keep, or soften?
8. sameAs URLs for Instagram, Facebook and LinkedIn (company page).
9. Google Business Profile URL, or not yet created?
10. The four keyword-map proposals above: accept or reject?
11. Intro animation (finding 14): leave it, or let me shorten or skip it on inner pages?

## Housekeeping

- `lib/contact-form.ts` and `lib/offer.ts` have uncommitted changes that are not mine: new form options for Instagram growth, recovery, consumer brand and creator. I'll leave them out of the `seo-rebuild` commits unless you want them in.
- `schema.org/MarketingAgency` returns 404, so the type does not exist. ProfessionalService it is.
- A `tallyweb-prod` entry was added to `.claude/launch.json` (left uncommitted) to serve the production build on port 3100 for testing.
