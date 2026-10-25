# Off-site work: what only you can do

On-site work makes Tally eligible to rank. Getting to the top of local results for "Instagram marketing agency Auckland" or "Meta ads agency Auckland" also depends on three things the website cannot provide: a complete Google Business Profile, real reviews, and other sites linking to and mentioning Tally. This list is in priority order.

Use the same details everywhere (NAP). Any difference in name, phone or website weakens the entity Google is trying to build:

- **Name:** Tally (legal name Tally Marketing Limited where a form asks for it)
- **Phone:** +64 22 305 3853
- **Website:** https://www.tallynz.co
- **Location:** Auckland, service area Auckland and New Zealand. The street address is not shown, per your FACTS answer.

---

## 1. Deploy, then verify the domain in Google Search Console (this week)

1. Merge `seo-rebuild` and deploy when you are happy with it.
2. Go to https://search.google.com/search-console and click **Add property**, then **Domain**, and enter `tallynz.co`.
3. Copy the TXT record and add it in Vercel: **Project, Settings, Domains** (or wherever the DNS for tallynz.co is managed). Then click **Verify**.
4. Under **Sitemaps**, submit `https://www.tallynz.co/sitemap.xml`.
5. In **URL Inspection**, request indexing for these pages one at a time:
   - `/services/instagram-marketing`
   - `/services/meta-ads`
   - `/services/marketing-management`
   - `/services/content-video`
   - `/services/websites`
   - `/instagram-account-recovery`
   - `/industries/marine`
   - `/`
6. In about a week, check **Pages** for "Discovered, not indexed" and **Enhancements** for FAQ and Breadcrumb errors.

## 2. Bing Webmaster Tools (same day; this also feeds ChatGPT search and Copilot)

1. Go to https://www.bing.com/webmasters and choose **Import from Google Search Console**.
2. Submit the sitemap if it was not imported.
3. Use **URL Submission** for the same pages as above.

## 3. Complete the Google Business Profile

Open your profile at https://share.google/DFyJrJpXeKvjiLh3f, while signed in as the owner.

1. **Business name:** exactly `Tally`. Do not add keywords such as "Tally Social Media Marketing Auckland": Google suspends profiles for that.
2. **Primary category:** `Marketing agency`. Additional categories, only where you actually sell the service: `Social media agency`, `Advertising agency`, `Video production service`, `Website designer`.
3. **Location:** turn off "Show business address to customers". Add service areas: Auckland first, then the regions you want work from (for example Northland, Waikato, Bay of Plenty, Wellington, Canterbury), up to 20.
4. **Phone:** +64 22 305 3853. **Website:** https://www.tallynz.co
5. **Services:** add one per service page, using the same names and a sentence from each page's intro:
   - Social media management
   - Instagram marketing
   - Meta ads (Facebook and Instagram ads)
   - Social media video production
   - Small business website design
   - Instagram account recovery
   - Primary industries recruitment marketing
6. **Description (750 characters max):** adapt the homepage intro. Use no phone numbers or URLs in it.
7. **Photos:** logo, cover image, Zak and Jonty, and real shoot stills. Aim for 10 or more.
8. **Posts:** one a week. A Reel still, a short note and a link to a service page is enough.
9. **Copy the profile's long URL** (Share, then open it in a browser, then copy the `maps.google.com/?cid=…` address from the address bar) and send it to me. It replaces the share link in the site's `sameAs`.

## 4. Make the social profiles point back to the site (this week)

AI search tools pair "tallynz.co" with other businesses' Instagram accounts. That happens because nothing ties Tally's profiles and Tally's website together, so they guess by name. "Tally" and "tallynz" are close to many other handles, and a Facebook Page with only a numeric `profile.php?id=` address carries no name at all.

The site now does its half. The Organization schema lists all three profiles in `sameAs`, the footer links them with `rel="me"`, and llms.txt has an "Official profiles" section saying these are the only accounts. The profiles need to do the other half:

1. **Facebook: give the Page a username.** In the Page settings, under Username, choose `tallynz` or `tallynz.co` if it is free. That replaces `profile.php?id=61595118560822` with `facebook.com/tallynz`. Send me the new URL and I'll swap it into `lib/seo.ts`. Also check this is a business Page and not a personal profile. Then set:
   - Page name: `Tally`
   - Category: Marketing agency
   - Website: `https://www.tallynz.co`
   - Phone: +64 22 305 3853
   - Location: Auckland (service area)
2. **Instagram (@tallynz.co):** switch to a Business account if it is not one already. Then set:
   - Name field: `Tally | Social media marketing, Auckland`
   - Category: Marketing agency
   - Website link: `https://www.tallynz.co`
   - Bio: name Auckland and New Zealand
   - Link the account to the Facebook Page in Meta Business Suite, so Meta treats them as one business.
3. **LinkedIn (company/tallynz):**
   - Website: `https://www.tallynz.co`
   - Industry: Marketing services
   - Headquarters: Auckland, New Zealand
   - Ask Zak and Jonty to set Tally as their current employer, so the people and the company connect.
4. **Use the same one-line description everywhere.** Use the same sentence on all three profiles and the Google Business Profile, for example "Social media marketing agency in Auckland for consumer and marine brands across New Zealand." Repeating the same description is what helps assistants match the profiles to each other.
5. **Two weeks after deploying, ask again.** Ask ChatGPT, Perplexity and Google: "What is Tally at tallynz.co, and what are its Instagram and Facebook accounts?" Record the answers in the monthly check sheet. If a wrong account still appears, look at which source it cites. That source is usually a directory listing with old or wrong details, so correct it there.

## 5. A review process for current clients

Google reviews are the biggest local ranking factor you control, and none exist yet.

1. Get the review link: in the GBP dashboard, go to **Ask for reviews** and copy the link.
2. Ask at a moment of proof: the week a client sees a good number in the weekly update, or the day an account recovery comes through.
3. Ask personally, by text or email from Zak or Jonty, with the link and one line: "Would you mind leaving a quick Google review about working with us? It helps other NZ businesses find us." Name the service, so the review text mentions it naturally (for example "Meta ads" or "got our Instagram back").
4. Never offer discounts or gifts for reviews, never write them yourselves, and never review-gate (only asking happy clients through a filter). All of these breach Google's policy.
5. Reply to every review within a few days.
6. Keep a simple log: client, date asked, date reviewed.
7. When there are real reviews, tell me. Review markup can be added then, but only for reviews that are shown on the page.

## 6. Directory listings (identical name, phone and website)

These surfaced in Phase 0 for the target terms, or are standard NZ citations. Do the first four first.

| Directory | Why | Notes |
|---|---|---|
| **Semrush Agency Partners** (agencies.semrush.com) | Holds most of the "Instagram marketing agency Auckland" results | Choose Instagram marketing, SMM and Facebook advertising, region Auckland. |
| **Clutch** (clutch.co/nz) | Ranks for NZ agency lists, and AI assistants cite it | Clutch reviews are verified by phone. Ask one or two clients. |
| **DesignRush** | Ranks for marine and agency queries | Free profile. |
| **Yachting Pages: Marine marketing services** | The only marine marketing directory that appeared | Directly relevant to `/industries/marine`. |
| **Web Tonic Auckland listicles** (webtonic.io/blog/best-meta-ads-fb-ig-agencies-auckland and the social media management list) | They list 12 to 19 Auckland agencies for exactly these terms | Email them asking to be assessed. Their stated criteria want case studies and independent reviews, so do this after steps 5 and 9. |
| **Bing Places for Business** | Feeds Bing, Copilot and ChatGPT local answers | Import from GBP. |
| **Apple Business Connect** | Apple Maps and Siri | Service-area business, no address shown. |
| **NZBN register** (nzbn.govt.nz) | The government record behind your NZBN | Add the website, phone and trading name "Tally" to the public NZBN details. |
| **Finda, Yellow NZ, Hotfrog NZ** | Standard NZ citations | Low effort; keep the details identical. |
| **NZ Marine Industry Association** member directory, if you join | Marine authority and a relevant link | Only if membership makes sense for the business. |

## 7. Earn links and mentions (ongoing)

On-page copy cannot replace other sites saying Tally is good at this. Realistic sources:
- Clients' websites: a "Marketing by Tally" credit in the footer, with permission.
- Marine and hospitality trade press: a short piece on a real result once a client agrees to be named.
- A podcast or local business media interview about growing and selling Instagram accounts. That 8-year story is unusual and quotable.
- Partners such as web developers, photographers and boat show organisers who refer work.

## 8. Case studies

Each service and industry page has a marked TODO where a case study goes. One named client with a real number (for example cost per enquiry before and after) will do more for rankings, AI answers and conversion than any amount of extra copy. Ask your best current client for permission.

## 9. Redirect chain (low priority)

`http://tallynz.co` takes two hops to `https://www.tallynz.co` (http to https on the bare domain, then to www). Google handles this fine. To make it one hop, check in Vercel **Domains** that `tallynz.co` is set to **Redirect to www.tallynz.co** (308). If it already is, the extra hop is Vercel's automatic HTTPS upgrade and cannot be removed. This is a DNS and domain setting, so I have not touched it.

## 10. Monthly check (first Monday of each month, about 20 minutes)

**Rankings.** In Search Console, go to **Performance** and filter by page. Record impressions, clicks and average position for each target query:

| Page | Query |
|---|---|
| / | social media marketing agency auckland |
| /services/marketing-management | social media management auckland |
| /services/instagram-marketing | instagram marketing agency auckland, instagram marketing nz |
| /services/meta-ads | meta ads agency auckland, facebook ads auckland |
| /services/content-video | social media video production auckland |
| /services/websites | small business website design auckland |
| /instagram-account-recovery | instagram account recovery nz, banned instagram account help |
| /industries/marine | marine marketing agency nz |
| /industries/consumer-brands | consumer brand marketing agency nz |

Also search each one in a private window from Auckland and note the top 5 and whether Tally is in the map pack.

**AI answers.** Ask each of ChatGPT (with search on), Perplexity, Google (check the AI Overview) and Claude these prompts:
1. "Who is a good Instagram marketing agency in Auckland?"
2. "Recommend a Meta ads agency in Auckland for a small business."
3. "Can anyone in New Zealand help get a banned Instagram business account back?"
4. "Marketing agency for boat dealers in New Zealand"
5. "What is Tally at tallynz.co?"

For each, record whether Tally is mentioned, what is said, and which sources are cited. Sources that keep being cited (Clutch, Semrush, listicles) are where to get listed next. If an answer gets a fact wrong, find the page it cites and fix the fact at the source.

Keep it in one spreadsheet, so the trend is visible after three months.
