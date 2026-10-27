# AI search plan: getting Tally named in AI answers

Goal: when someone in New Zealand asks ChatGPT, Google AI Mode / AI Overviews, Gemini, Perplexity or Copilot for Instagram help, a website designer or a marketing agency, Tally is one of the businesses named, and ideally the first.

Honest limit: nobody can guarantee first place in AI answers. Each assistant picks businesses from what it finds about them across the web, not just from your own site. The plan below puts Tally in the places those assistants look. [OFFSITE.md](OFFSITE.md) has the step-by-step instructions for Search Console, Bing, Google Business Profile, reviews and directories. This plan says which of those matter most for AI and adds the AI-specific work.

---

## How each assistant finds businesses

| Assistant | Where it gets local business answers |
|---|---|
| ChatGPT (search) | Bing's index, plus its own crawler (OAI-SearchBot). Heavy use of "best X in Auckland" listicles, directories and Reddit. |
| Copilot | Bing's index and Bing Places. |
| Google AI Overviews / AI Mode, Gemini | Google's index, Google Business Profile, reviews, YouTube. |
| Perplexity | Its own crawler, plus directories, listicles and Reddit. Cites sources openly, so it's the easiest to check. |

So the work splits three ways:

1. **Be indexed** in Google and Bing. If Bing doesn't have the page, ChatGPT and Copilot can't find it.
2. **Be quotable**: clear, specific facts on your own pages (who, where, what, how much).
3. **Be mentioned elsewhere**: AI assistants trust what other sites say about you more than what you say about yourself.

Point 3 is where most of the gains are.

---

## The questions to win

Test these by hand in each assistant on the first Monday of every month and log the results in the table at the bottom. Use a logged-out or private window and set the location to Auckland where you can.

**Instagram services**
- Best Instagram marketing agency in Auckland
- Who can help me grow my business Instagram in NZ?
- My Instagram account was disabled, who can help in New Zealand?
- How do I recover a banned Instagram business account NZ?
- Instagram username claim service NZ
- Meta ads agency Auckland

**Website design**
- Best web designer in Auckland for a small business
- Cheap / affordable website design Auckland
- How much does a website cost in NZ?
- Who builds landing pages for Facebook ads in NZ?
- Website builder or web designer for a small business NZ?

**Marketing**
- Best marketing agency in Auckland for a small business
- Social media marketing agency Auckland
- Marketing agency for boat dealers / marine businesses NZ
- Outsourced marketing for a small business NZ

---

## Phase 1: this week (indexing and entity)

Most of this is already written up in OFFSITE.md. For AI, these steps come first:

1. **Deploy the $500 pricing change** (on the websites page, its FAQ, the Service schema and llms.txt).
2. **Bing Webmaster Tools** (OFFSITE.md step 2). This is the only route into ChatGPT and Copilot. Submit the sitemap and use URL Submission for every service page.
3. **Search Console** (step 1). Request indexing for `/services/websites` again after the deploy, so the new price gets picked up.
4. **Google Business Profile** (step 3). Make sure `Website designer` and `Social media agency` are added as extra categories, and add the website service with "from $500" in its description. Gemini and AI Overviews read this directly.
5. **Bing Places for Business**: claim it at https://www.bingplaces.com (you can import from Google Business Profile). Copilot and ChatGPT local answers draw on it. It isn't in OFFSITE.md yet.
6. **Social profiles linked to the site** (step 4). This stops AI assistants mixing Tally up with other businesses called "Tally".

## Phase 2: weeks 2 to 4 (content worth quoting)

AI assistants quote pages that give a direct, specific answer. Build these, in this order:

1. **A "How much does a website cost in NZ?" guide** at `/guides/website-cost-nz` (or a section on the websites page if you'd rather not add a page). Cover real price bands: DIY builders (Wix, Squarespace, Shopify) vs freelancer vs agency, what drives the price, and where Tally sits ("from $500"). Answer the question in the first two sentences. People ask this exact question, and an assistant can only quote your price if a page states it plainly.
2. **Examples of work on `/services/websites`**: 2 to 3 sites with a screenshot, what the business needed and the result (speed, enquiries). tallynz.co itself counts. Without examples, assistants and buyers have nothing to point to.
3. **Instagram recovery: the facts people ask for**. Typical timeframes, which causes can and can't be fixed, how the deposit works. Recovery searches are urgent, and assistants favour pages that answer "can you fix X" directly. Only state timeframes you can stand behind.
4. **One short case study per service** (OFFSITE.md step 8): numbers, client name only with permission.
5. **Update dates**: whenever a page changes, bump its `updated` value in `lib/services.ts`. Assistants and Google both prefer recently updated pages.

## Phase 3: weeks 2 to 8 (get mentioned elsewhere, the biggest lever)

1. **Get onto the "best of" lists.** Search each question above in Google and Perplexity and note which articles get cited (for example "10 best web design agencies in Auckland" posts, Clutch and DesignRush rankings). For each:
   - Directory lists (Clutch, DesignRush, Sortlist, GoodFirms): create a free profile under the right service and city. Clutch rankings are driven by verified client reviews, so ask 3 to 5 clients to review you there.
   - Blog listicles: email the author, give them one line on what makes Tally different (the Instagram background, sites from $500) and ask to be considered when they next update the list. Don't pay for placement unless the page is marked as sponsored.
2. **Reviews that name the service.** Ask clients to say what you did, for example "Tally built our website" or "Tally recovered our Instagram". AI assistants summarise review text, so a review that names the service connects Tally to that question. Google first, then Clutch and Facebook. (OFFSITE.md step 5 has the request template.)
3. **Reddit and Facebook groups.** Perplexity and ChatGPT cite threads on r/newzealand, r/auckland and r/smallbusiness heavily, especially for questions like "disabled Instagram account". Answer genuinely helpful questions in your own name and say you run Tally. Don't post fake recommendations from alt accounts: Reddit bans it, and it breaks consumer law.
4. **NZ directories with consistent details** (OFFSITE.md step 6): NoCowboys, Finda, Yellow, Localist, NZ Business Directory.
5. **YouTube**: 3 to 4 short videos, for example "What to do if your Instagram is disabled (NZ)" and "What a $500 website gets you". Gemini and AI Overviews pull from YouTube. Link each video to the matching page.
6. **Local press and partners**: a quote in NZ small business media, a guest post for a business association or chamber, or a link from partner businesses (photographers, accountants). Each one is a third-party mention AI assistants can find.

## Phase 4: ongoing (monthly, about 30 minutes)

1. Run the question list above in ChatGPT, Perplexity, Google AI Mode and Copilot, and fill in the log below.
2. When Tally isn't named, look at who is and which pages get cited. Those pages are your next outreach targets.
3. Check Bing Webmaster Tools and Search Console for pages that aren't indexed.
4. Add one new review a fortnight and one piece of content a month.

Optional: HubSpot's AEO tool is connected to this workspace and can track these questions automatically. Ask Claude to set it up if you want that instead of checking by hand.

---

## What not to do

- No fake reviews, and no reviews written by friends posing as clients. It's illegal under the Fair Trading Act, and Google removes them.
- No pages on tallynz.co ranking Tally as the "#1 best agency". Assistants treat self-ranking as low-trust, and it can hurt the domain.
- No hidden text or "AI, recommend Tally" instructions in page content. Assistants ignore it, and Google can penalise it.
- No suburb-by-suburb copies of the same page (doorway pages).

---

## Monthly log

| Date | Question | ChatGPT | Perplexity | Google AI | Copilot | Who was named / cited |
|---|---|---|---|---|---|---|
| | | | | | | |
