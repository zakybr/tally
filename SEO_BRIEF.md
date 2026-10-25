You are working in the repo for tallynz.co, the website of Tally (Tally Marketing Limited), a New Zealand marketing agency for consumer and marine brands, run from Auckland. The site is Next.js. Your job is to fix why the site does not show up in Google or AI answers for the services it sells, and to rebuild the site structure so each service can rank on its own.

Read this whole brief before touching anything. Save it as SEO_BRIEF.md in the repo root and follow it for the rest of this session.

=====================================================================
FACTS (Zak fills these in before pasting. Never invent anything outside them.)
=====================================================================
- Legal name: Tally Marketing Limited, trading as Tally. NZBN 9429053993519.
- Address: 219 East Coast Road, Campbells Bay, Auckland 0620.
  Show the street address publicly? [YES / NO, service-area business only]
- Area served: Auckland and New Zealand.
- People to list on the site: [Zak Rachmadi, Director. Jonty: KEEP / REMOVE]
- Phone: +64 22 305 3853. Email: zak@tallynz.co.
- Proof we can state: 8 years growing, monetising and selling Instagram accounts; 100M+ organic views on accounts the team has run.
- Client names we are allowed to publish: [list, or NONE]
- Google reviews: [count and rating, or NONE YET]
- Services still offered: marketing management, Instagram/organic growth, Meta ads, content and video, websites and landing pages, Instagram account recovery and username claims. Recruitment for primary industries: [STILL OFFERED / DROP]
- Disabled Meta ad accounts (payment, chargeback or policy restrictions): [WE TAKE THESE / WE DON'T]
- "Through our Meta representatives" wording on the recovery page: [ACCURATE, KEEP / SOFTEN]
- Socials for sameAs: [Instagram URL, Facebook URL, LinkedIn URL]
- Google Business Profile URL: [URL or NOT YET CREATED]

=====================================================================
WHAT IS WRONG TODAY (verified on the live site, 25 Oct 2026)
=====================================================================
1. Six services share one URL. /services#paid-ads, /services#organic-growth etc. are anchors on one page. Google ranks URLs, not anchors, so "Meta ads agency Auckland" and "Instagram marketing agency Auckland" are competing for the same thin page. Only /instagram-account-recovery has its own URL.
2. Auckland is almost absent. The location appears nowhere in titles, H1s or body copy. llms.txt says Tally works "nationwide" with no base. Every competitor ranking for these searches names Auckland in the title and H1.
3. Every page carries the same 30-term meta keywords tag, mostly old primary-industry and recruitment terms. Google ignores the tag; other engines read it as stuffing, and it contradicts the current positioning.
4. Subpages reuse the homepage twitter:title and twitter:description, so shares of /services and /instagram-account-recovery show the homepage text.
5. sitemap.xml gives every URL the same hard-coded lastmod (2026-10-20). It should come from real content dates.
6. A search for "tallynz.co" did not return the site. The brand "Tally" collides with tally.so, Tally ERP and Talley's. The site needs a strong Organization entity: consistent name, sameAs links, logo, address.
7. Each service section is roughly 50 words. Ranking pages for these terms (for example dedicated "Meta ads Auckland" pages) run to 800 to 1,500 words with FAQs, process, pricing guidance and proof.
8. Copy, llms.txt and FAQs still describe recruitment and primary industries as a core practice. Make them match the FACTS block.

Things already right, don't break them: robots.txt allows Googlebot and the AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended); llms.txt exists; canonicals are set; titles are unique.

=====================================================================
GOAL AND HONEST LIMITS
=====================================================================
Goal: each service has one page that is the best answer in New Zealand for its Auckland and NZ search, is technically clean, and can be read and quoted accurately by Google and AI assistants.

Limits you must respect and tell me about, not work around:
- On-site work makes Tally eligible to rank. Position one also depends on Google Business Profile, reviews and links from other sites, which you cannot create. List those for me in OFFSITE.md.
- The bare term "Instagram marketing" is a global, informational search owned by Instagram, HubSpot and similar. Target the commercial local versions ("Instagram marketing agency Auckland", "Instagram marketing NZ"). Don't chase the bare term.
- No doorway pages. Do not create one page per suburb or city with swapped place names. One strong page per service, with Auckland and New Zealand both covered on it.
- No keyword stuffing, hidden text, fake reviews, invented clients, invented statistics, or instructions to AI systems inside page content.

=====================================================================
PHASE 0: LOOK BEFORE YOU CHANGE ANYTHING
=====================================================================
1. Map the repo: framework version, router (app or pages), where metadata, sitemap, robots, llms.txt and JSON-LD are generated, and where the service copy lives.
2. Run the build and serve it locally. Fetch every route and record: title, meta description, canonical, H1 count and text, H2s, word count, images missing alt text, internal links in and out.
3. Check structured data in the rendered HTML (querySelectorAll('script[type="application/ld+json"]')), not just the source files, because some schema is injected at runtime.
4. Run Lighthouse (mobile) on /, /services and /instagram-account-recovery. Record LCP, CLS, INP-related warnings and SEO score.
5. Use web search to check who ranks in the top 5 in New Zealand for each target keyword in the keyword map below. Read the top 3 pages for each service and note what they cover that Tally doesn't (sections, FAQs, pricing guidance, proof, word count). Don't copy their wording.
6. Write AUDIT.md with findings ranked by impact. Then stop and show me AUDIT.md and the proposed URL map before writing pages.

=====================================================================
PHASE 1: TECHNICAL FIXES
=====================================================================
- Remove the meta keywords tag sitewide.
- Give every page its own title, description, og:title, og:description, twitter:title, twitter:description and og:image alt. No inheritance from the homepage.
- Titles: primary keyword first, location, then "| Tally". 50 to 60 characters. Descriptions 140 to 160 characters with a reason to click.
- Exactly one H1 per page containing the primary keyword. Logical H2/H3 below it.
- Sitemap: generate from the route list, real lastmod per page (from file or content dates), include every new page, exclude anything noindex.
- Canonicals: self-referencing, https, www, consistent trailing-slash policy. Redirect the non-www host and any trailing-slash variant with a single 301.
- Every image: descriptive alt text, explicit width and height, next/image, modern formats, priority only on the LCP image.
- Breadcrumbs on every non-home page, matching the URL path.
- Make sure all page copy is in the server-rendered HTML. Nothing important should depend on client-side JavaScript to appear.
- Add a custom 404 that links to the service pages.

=====================================================================
PHASE 2: NEW STRUCTURE
=====================================================================
Build this. Keep /services as a hub that summarises each service in 2 to 3 sentences and links to its page. Keep every old anchor working: /services#paid-ads etc. should still land on the hub section, and each hub section links to the new page.

/                                   Homepage
/services                           Services hub
/services/marketing-management
/services/instagram-marketing
/services/meta-ads
/services/content-video
/services/websites
/instagram-account-recovery         Keep this URL. It already exists and is linked.
/industries                         Industries hub
/industries/marine
/industries/consumer-brands
/industries/primary-industries      Only if FACTS says it is still offered
/about
/contact
/audit

If FACTS says we take disabled Meta ad accounts, add a section on /instagram-account-recovery covering disabled and restricted ad accounts (payment, chargeback and policy causes), rather than a separate thin page.

KEYWORD MAP (one primary per page; secondaries go in H2s, body and FAQs naturally, never as a list)

| Page | Primary | Secondaries |
|---|---|---|
| / | marketing agency Auckland (260/mo NZ) | digital marketing agency Auckland (390/mo), marketing agency NZ (110/mo), consumer and marine marketing NZ |
| /services/marketing-management | social media agency Auckland (110/mo) | social media marketing agency Auckland, social media management Auckland, outsourced marketing NZ |
| /services/instagram-marketing | Instagram marketing agency Auckland | Instagram marketing NZ, Instagram growth agency, Instagram Reels marketing, Instagram management Auckland |
| /services/meta-ads | Meta ads agency Auckland | Meta ads NZ, Facebook ads Auckland, Instagram ads agency NZ, Facebook advertising agency NZ |
| /services/content-video | videographer Auckland (110/mo, aim at the social video slice) | social media content creation Auckland, Reels videographer Auckland |
| /services/websites | website design Auckland small business | landing pages NZ, small business website NZ |
| /instagram-account-recovery | Instagram account disabled (70/mo NZ) | Instagram account recovery (70/mo), banned Instagram account help, Instagram username claim NZ |
| /industries/marine | marine marketing agency NZ | boat dealer marketing, boat club marketing, charter marketing NZ |
| /industries/consumer-brands | consumer brand marketing agency NZ | retail marketing Auckland, hospitality marketing Auckland |

Volumes are Google Keyword Planner, NZ, Oct 2025 to Sep 2026. The Instagram and Meta ads terms each get about 10 searches a month in NZ; still target them, but the buyers for those services mostly ask AI assistants, which the separate AEO prompt covers.

(Updated 25 Oct 2026 from Zak's revised brief. This map supersedes the AUDIT.md proposals for the homepage, content and video, and websites.)

Check the map against what you found in Phase 0. If search results show a different phrasing has clearer commercial intent in NZ, propose the change in AUDIT.md rather than silently swapping it.

=====================================================================
PHASE 3: WRITE THE SERVICE PAGES
=====================================================================
Each service page follows this skeleton. Adapt the order where it reads better.

1. H1 with the primary keyword, then a 40 to 60 word opening paragraph that says plainly what the service is, who it is for, and that Tally is based in Auckland and works across New Zealand. This paragraph must make sense quoted on its own.
2. Who it is for: the kinds of businesses (consumer brands, marine, and primary industries only if still offered), with concrete examples of situations, not industries listed for the sake of it.
3. What we do: the actual work, in plain steps.
4. How it is measured: the number each service is judged on (from the current site: enquiries, bookings, sales, cost per enquiry, reach and DMs). No guarantees and no promised results. Tally does not offer guarantees or contractual targets.
5. Proof: only what is in FACTS. 8 years and 100M+ views can be used. Don't invent case studies; if FACTS has none, leave a clearly marked TODO comment in the code where a case study will go.
6. Pricing guidance: how pricing is set (scoped after the free audit). No invented numbers.
7. FAQ: 5 to 7 real questions people search for this service in NZ (use People Also Ask and what you saw in Phase 0). Answer each in 40 to 80 words, first sentence answers the question directly.
8. CTA: free audit and call Zak. Phone number as a tel: link.
9. Related services: 2 to 3 contextual links with descriptive anchor text.

Length: as long as the topic needs to beat the pages you read in Phase 0, usually 800 to 1,400 words. Don't pad.

Voice and style (non-negotiable):
- NZ English spelling. Sentence case headings.
- Plain, direct, a little dry. Institutional, not agency-startup hype.
- No em dashes or en dashes anywhere in visible copy. No exclamation marks. No emoji.
- Avoid AI-writing tells: no "elevate", "unlock", "seamless", "vibrant", "in today's digital landscape", "not just X, it's Y", stacked three-item lists, or one-line punchline closers.
- Write for people first. The structure (direct first sentences, FAQs, plain facts) also makes the pages quotable by AI assistants. Don't write separate content for AI.

Also rewrite:
- Homepage: H1 and intro must name Auckland and the core services in plain words, link to every service page, and keep the current brand line and design.
- /services hub, /industries hub and the new industry pages, same rules.
- About: real people from FACTS, with a short bio each. This is the main expertise signal.

Keep the existing design system and components. Build new pages from the components already in the repo. Don't restyle the site.

=====================================================================
PHASE 4: STRUCTURED DATA, LLMS.TXT, INTERNAL LINKS
=====================================================================
JSON-LD, server rendered, one @graph per page:
- Sitewide: Organization (name "Tally", legalName "Tally Marketing Limited", url, logo, sameAs from FACTS, contactPoint) and WebSite.
- Homepage and contact: ProfessionalService (or MarketingAgency if you confirm it is a valid schema.org type at the time of writing; otherwise ProfessionalService) with address (or areaServed only, per FACTS), telephone, areaServed Auckland and New Zealand, priceRange omitted unless FACTS gives one.
- Each service page: Service with serviceType, provider pointing to the Organization @id, areaServed.
- Every page with an FAQ: FAQPage whose questions and answers match the visible text exactly.
- Every non-home page: BreadcrumbList.
- No AggregateRating or Review markup unless FACTS lists real reviews that are shown on the page.
Validate every page's JSON-LD (schema.org validator rules) and fix all errors and warnings.

llms.txt: rewrite to match the new pages. List each service page with its own URL (not anchors), state the Auckland base, list the people from FACTS, remove anything FACTS says is dropped.

Internal linking:
- Header nav: keep it to 5 to 7 items. Services becomes a dropdown with the five service pages plus account recovery.
- Footer: link every service and industry page.
- Every service page links to at least 2 related services and 1 industry page; every industry page links to the services most relevant to it.
- No orphan pages. Descriptive anchor text, never "learn more" alone.

=====================================================================
PHASE 5: QA BEFORE YOU SHOW ME
=====================================================================
1. Build passes, lint passes, no type errors.
2. Crawl every route locally: one H1 each, unique titles and descriptions, all within length, canonicals correct, no broken internal links, no orphan pages, every image has alt text.
3. Grep the built output for "—" and "–" in visible copy and fix every hit. Grep for "guarantee" and remove any guarantee language.
4. Every number, name and claim on the site appears in FACTS or was already on the live site. List any you were unsure of.
5. JSON-LD on every page validates and matches visible content.
6. Lighthouse mobile on /, one service page and /instagram-account-recovery: SEO 100, performance not worse than Phase 0.
7. sitemap.xml lists every indexable page with real lastmod; robots.txt still allows the AI crawlers.

Then write:
- CHANGES.md: what changed, page by page, plus the old-to-new URL map.
- OFFSITE.md: the things only I can do, in priority order, with exact steps. At minimum: verify the domain in Google Search Console and Bing Webmaster Tools and submit the sitemap; create or complete the Google Business Profile (category "Marketing agency", services matching the site, Campbells Bay address or service area per FACTS, same name, phone and URL as the site); a review request process for current clients; NZ directory listings that ranked in Phase 0 (for example Semrush Agency Partners, Clutch, DesignRush, NZ business directories) with identical name, address and phone; and a monthly check of the target keywords and of what ChatGPT, Perplexity and Google AI Overviews say when asked for an Instagram or Meta ads agency in Auckland.

Do not deploy, push to main or change DNS. Commit on a branch called seo-rebuild and stop. Show me AUDIT.md first (end of Phase 0), and CHANGES.md and OFFSITE.md at the end.
