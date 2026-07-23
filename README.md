# Tally marketing site

Outcome-guaranteed marketing for NZ's primary sector. Dark, institutional visual system referenced on anduril.com: sharp corners, hairline dividers, monospace instrument labels, full-bleed graded photography.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (tokens defined in `app/globals.css` via `@theme`)
- Framer Motion for scroll reveals (`components/Reveal.tsx`)
- Lenis for heavy, damped smooth scroll (`components/SmoothScroll.tsx`). Installed as `lenis` (the current name of `@studio-freight/lenis`).
- `next/image` with static imports for automatic sharp blur placeholders

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploy target: Vercel, with no config needed beyond the repo.

## Design tokens

Defined once in `app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg-primary` | `#0b0b0a` | page background |
| `--bg-secondary` | `#16191d` | lifted panels (pricing, gate, footer CTA) |
| `--text-primary` | `#ffffff` | headlines, key copy |
| `--text-secondary` | `#a8a49a` | body copy |
| `--accent-amber` | `#d9711a` | the only CTA/accent colour on screen |
| `--accent-amber-dim` | `#6b4a1f` | amber rules/borders |
| `--border-hairline` | `rgba(245,242,234,0.08)` | all dividers |

Fonts: General Sans (self-hosted, `app/fonts/`, Fontshare Free Font License) for headlines/body; Alliance No.1 (self-hosted, Degarism Studio) for every eyebrow, tag, stat and label (`.eyebrow` / `.mono-label`).

## Core component

`components/CapabilityCard.tsx` is the Anduril-style card: full-bleed image, bottom gradient for label legibility only, mono tag top-left, large name bottom-left, one-line subhead revealed on hover (600ms ease-out, image scales 1.00 to 1.03). Cards butt together with hairline dividers, so parent grids use `gap-px bg-hairline`. A `reserved` variant (diagonal hatch plus RESERVED tag) is used for the unpublished case slots in The Record.

## Imagery

**All photography in `public/images/` is AI-generated placeholder material**, graded to the target treatment (backlit silhouettes, industrial close-ups, desaturated/near-black). Each usage site is flagged with a `PLACEHOLDER IMAGERY` comment, so swap files 1:1 as real sprint capture lands. A global `.img-grade` filter (`grayscale(20%) contrast(1.1) brightness(0.9)`) keeps mixed sources on the same grade.

## Page structure

Home (`app/page.tsx`): Hero → sector ticker → SEO overview → accountability gap → work triptych → guarantee → tracks → miss clause → sectors → method → pricing → gate → footer CTA. Pillar page at `/primary-industries-marketing` for search/AI intent. Contact (`/contact`): qualification questionnaire.

## Contact form (email delivery)

The questionnaire at `/contact` posts to `app/api/contact/route.ts`, which emails each submission to the partners via [Resend](https://resend.com). Set these environment variables in Vercel (Project → Settings → Environment Variables), then redeploy:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from resend.com. Without it the form returns a "not configured" message and the lead is logged server-side. |
| `CONTACT_FROM` | Recommended | Verified sender, e.g. `Tally <noreply@tallynz.co>`. Requires verifying `tallynz.co` in Resend (add the DNS records they provide). Falls back to Resend's shared `onboarding@resend.dev`. |
| `CONTACT_TO` | Optional | Comma-separated recipients. Defaults to `zak@tallynz.co,jonty@tallynz.co`. |

Submissions set `reply-to` to the enquirer's email, so replying goes straight back to them.

## SEO & AI discoverability

- Canonical host defaults to `https://www.tallynz.co` (`lib/seo.ts`). Override with `NEXT_PUBLIC_SITE_URL` if needed.
- Titles, descriptions and keywords target queries like "marketing for primary industries NZ", "primary industries marketing New Zealand", and "best NZ marketing agencies".
- Structured data: Organization + ProfessionalService, WebSite, FAQPage, BreadcrumbList, Service.
- Pillar: `/primary-industries-marketing`. Verticals: `/seafood-aquaculture-marketing`, `/forestry-marketing`, `/horticulture-marketing`.
- Ads / LinkedIn landing: `/proof`. Gated guarantee PDF: `/docs/tally-guarantee-one-pager.pdf`.
- `/llms.txt` for AI agents. `robots.txt` allows major AI crawlers; `sitemap.xml` lists all indexable routes.
- UTMs / gclid / msclkid are captured for the session and attached to contact and one-pager leads. GA4 events fire into your existing tag: `generate_lead`, `file_download`, `book_call_click`.
- After deploy: submit the sitemap in [Google Search Console](https://search.google.com/search-console) for `www.tallynz.co`.

## Outlook booking (free)

Uses **Microsoft Bookings** / **Bookings with me** (included with Outlook / Microsoft 365, syncs to your calendar). No Calendly fee.

1. In Outlook on the web, open Bookings or create a "Bookings with me" page.
2. Copy the public booking URL.
3. In Vercel → Environment Variables set `NEXT_PUBLIC_BOOKING_URL` to that URL (Production + Preview).
4. Redeploy. "Book a call" CTAs open your Outlook page.

Until that env var is set, booking CTAs fall back to a pre-filled mailto to `zak@tallynz.co`.

## Performance

Static prerendering, `next/image` with AVIF/WebP and blur placeholders, `next/font` (self-hosted + swap), and Framer Motion loaded through `LazyMotion` (the lightweight `m` component) to keep the client bundle small.
