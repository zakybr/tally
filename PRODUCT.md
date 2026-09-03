# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners, founders and operators of New Zealand primary-industry and
marine businesses, a two-boat charter operation, a boat builder or refit yard,
a seafood or meat processor, a forestry contractor, a packhouse, a funded
agritech supplier. They are not marketers. They are evaluating the site
themselves, usually because something countable is going wrong: a roster that
will not fill, a charter season approaching with the calendar empty, a vacancy
whose cost they can name to the dollar.

They arrive sceptical. They have been sold monthly retainers and folders of
video by generalist agencies before, and they judge a supplier the way they
judge a piece of equipment: does it do the stated job, who carries the risk if
it does not, and does the operation behind it look like it can be relied on.

Secondary: consultants and in-house managers inside larger co-ops, exporters and
processors who specify or shortlist suppliers.

## Product Purpose

Tally runs marketing for NZ primary and marine operators against one business
outcome that the client chooses and both parties sign, with Tally's fee at risk
against it. Success is the client naming a number, that number being hit, and
the engagement moving from a fixed sprint to an ongoing retainer.

## Positioning

The mechanism competitors cannot truthfully copy: the outcome is agreed in
writing before anything is produced, and the miss clause is printed in the
contract rather than implied in the pitch. Misses of 20% or less trigger a free
30-day extension; larger misses trigger a fee credit or partial refund;
client-attributable failures are named as voiding conditions.

Tally guarantees only what it controls, creative, targeting and the system that
converts them. It never guarantees sales. It declines briefs it cannot see a way
to hit, before taking payment.

Market gap: NZ generalist agencies sell footage and retainers; agri specialists
cluster around dairy suppliers and field days. Primary and marine operators
outside dairy have no dedicated, accountable partner.

## Operating Context

Four delivery tracks, each with its own guaranteed number: Capture (an agreed
asset set delivered to spec), Reach & brand (an agreed qualified-reach figure),
Recruitment (qualified applications or cost per qualified applicant, the
flagship), Pipeline & bookings (qualified enquiries or confirmed bookings).

Three commercial steps: Proof (fixed-scope eight-week sprint, where everyone
starts), Engine (monthly retainer, six-month minimum), Playbook (licensed
method, opens later).

Engagement sequence: week 0 signature and baseline; weeks 1–3 capture on site;
week 4 live; week 8 the tally against the agreed number. Delivery is headless —
the client manages no creators and sits in no production calls, and receives one
plain-English figure-against-target update per week.

Seasonality is a real constraint on the marine side: the NZ charter window opens
in December, so campaigns must start in spring to land before it.

## Capabilities and Constraints

Next.js 16 App Router, React, TypeScript, Tailwind v4 with CSS custom properties,
Framer Motion, Lenis smooth scroll, Supabase (admin portal at /admin, separately
themed under a `.admin` scope and out of scope for marketing-site design work).

Lead capture must keep working without regression: the contact form, the
free-offer popup, the email wiring to zak@tallynz.co, UTM capture and analytics.

Sector pages (/marine-marketing, /seafood-aquaculture-marketing,
/forestry-marketing, /horticulture-marketing, /primary-industries-marketing)
are independent pages reached from a header dropdown, not sections of the
homepage. They carry their own metadata, FAQPage/Service/Breadcrumb schema and
keyword coverage, which must be preserved.

Contact is email-first (zak@tallynz.co) plus a booked 30-minute call. No phone
number, no physical address, no social accounts are published.

## Brand Commitments

- Name set in lowercase: "tally".
- The tally mark is locked and must not be redrawn. Every generated asset
  carries the mark plus "tally" in lowercase white.
- The accent colour is NOT locked. #D9711A was a prior spec value and the user
  has explicitly released it.
- Voice: plain, declarative, unhedged. Short sentences. Names risk and who
  carries it. Never hypes, never uses agency vocabulary.
- User-named quality references for the site's register: Anduril, Palantir, and
  Graymark (graymark.tech). Recorded as a binding reference, not expanded here.

## Evidence on Hand

**Tally is pre-first-client. There are no completed engagements.**

Future work must not fabricate: client names, logos, testimonials, case studies,
delivered results, win rates, or any metric presented as achieved. The hero
scoreboard is a FORMAT ILLUSTRATION of how an engagement is reported and must
stay explicitly labelled as such.

What is real and usable: the guarantee mechanism and miss-clause wording as
contracted; the eight-week engagement sequence; published NZ sector data
(seafood ~$650M exports to 81 countries); the four tracks and three commercial
steps; the sector coverage register.

All photography currently on the site is AI-generated placeholder imagery graded
to spec, marked as such in code comments, and awaiting real capture.

## Product Principles

1. **The number is the product.** Everything on the site exists to make one
   agreed, countable outcome feel inevitable and contractually binding.
2. **Risk transfer is the differentiator.** Where a competitor would show work,
   Tally shows who pays when the work misses.
3. **Never fabricate proof.** Pre-first-client credibility is earned through
   precision of mechanism, not borrowed through invented results. A labelled
   illustration beats an unlabelled implication.
4. **Operators, not marketers.** Written for someone who runs a boat, a yard or
   a plant, and who reads a supplier the way they read equipment.
5. **Say less.** The buyer is time-poor and sceptical; every sentence that is
   not load-bearing reduces trust rather than adding to it.

## Accessibility & Inclusion

WCAG AA contrast on all text. Real keyboard focus states. 44px minimum touch
targets. Motion honours prefers-reduced-motion. 16px form fields so iOS does not
zoom on focus.
