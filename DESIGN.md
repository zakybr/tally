---
name: Tally
description: Charcoal-and-orange marketing site for a New Zealand agency that grows consumer and marine brands on Instagram and puts one number in the contract.
colors:
  sheet: "#17191c"
  sheet-2: "#1f2226"
  sheet-3: "#282b30"
  ink: "#f2f0ec"
  ink-2: "#b9bcc1"
  ink-3: "#8d9299"
  signal: "#ff4a1c"
  signal-on-light: "#d93a10"
  signal-dim: "#5c2410"
  light-sheet: "#efede9"
  light-sheet-2: "#e5e2dc"
  light-sheet-3: "#dad6cf"
  light-ink: "#17191c"
  light-ink-2: "#474b51"
  light-ink-3: "#5c6168"
  line-hair: "rgba(242, 240, 236, 0.1)"
  line-med: "rgba(242, 240, 236, 0.16)"
  line-heavy: "rgba(242, 240, 236, 0.32)"
typography:
  hero:
    fontFamily: "Barlow Condensed, General Sans, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, min(10vw, 11.5vh), 8.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  display:
    fontFamily: "Barlow Condensed, General Sans, system-ui, sans-serif"
    fontSize: "3rem to 6rem (steps 3rem, 3.5rem, 4.5rem, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  card-title:
    fontFamily: "Barlow Condensed, General Sans, system-ui, sans-serif"
    fontSize: "2rem to 2.5rem (steps 2rem, 2.375rem, 2.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    textTransform: "uppercase"
  statement:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "1.75rem to 2.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  menu:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "2.25rem to 3.5rem (steps 2.25rem, 3rem, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "1.25rem to 1.375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body-lead:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "1.0625rem to 1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Alliance No.1, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  card: "16px"
  pill: "999px"
spacing:
  gutter-sm: "1.5rem"
  gutter-md: "3rem"
  gutter-lg: "5rem"
  band-sm: "6rem"
  band-md: "8rem"
---

# Design System: Tally

## Overview

**North star: a proper marketing page, simple to read and simple to move around.** Modelled on the clarity of tracta.co.nz: a full-bleed film hero with one big condensed headline and two text links, then one argument per band, alternating charcoal and light, with a full-screen menu as the single door to everything.

Tally's colour is the orange. A dark charcoal ground carries it, warm off-white ink sits on top, and light bands break the page into readable sections. Orange leads: the second half of every headline, the statement band, the primary action, and the numbers we put in a contract.

The positioning the design serves: a New Zealand marketing agency for consumer and marine brands, built on Instagram (100M+ organic views), with primary industries as the third pillar.

## Colors

- **Charcoal** (`sheet`, `sheet-2`, `sheet-3`): page ground, then card and well, then hover. Never pure black.
- **Ink** (`ink`, `ink-2`, `ink-3`): headings, body, labels. All clear WCAG AA on charcoal.
- **Orange** (`signal` `#FF4A1C`): the brand. On light bands it steps to `#D93A10` so orange text still clears AA.
- **Light bands** (`.light`): a scope class that re-points the same tokens (including the legacy `--text-primary` style aliases, which resolve at `:root` and must be redeclared). Any component inside a `.light` section flips without knowing about it.
- **Statement band:** solid `#FF4A1C` with charcoal text (5.6:1). Never put a solid orange pill on it; use a text link.

## Typography

- **Display: Barlow Condensed 700, uppercase**, via `next/font/google` as `--font-condensed` and the `.display` class. Hero, section headings, page H1s, card titles and big figures. Colour the payoff words orange with a `span.text-signal`.
- **Body: General Sans** (self-hosted). Statement copy at 500, body at 400, card titles in guides at 600.
- **Label: Alliance No.1** (`.mono-label`), small uppercase, for eyebrows, column heads and numbering only.
- Sizes are the steps in the frontmatter. The hero clamps on both viewport axes so the claim never runs past the fold.

## Layout

- One container: `max-w-[1440px]`, gutters `1.5rem` / `3rem` / `5rem`.
- Bands: `py-24 md:py-32`. Homepage order: film hero, orange statement, what we do (light), proof numbers, who we work with (image tiles), how it works (light), pricing, guides, footer CTA.
- Cards are 16px radius, tinted (`sheet-2`) with a hover step to `sheet-3`. Image tiles are 4:5 with a bottom gradient.

## Components

- **Nav:** wordmark, "Let's talk" pill and a Menu button. Transparent over the hero, charcoal with blur after 24px of scroll.
- **Menu sheet:** full-screen charcoal dialog. Primary pages as large General Sans words, staggered in (120ms + 55ms each). Right column: mark, one-line pitch, CTA, Instagram help / Sectors / Working with us lists, directors' numbers. Escape and route change close it; body scroll locks while open.
- **Pill:** unchanged primitive (`components/Pill.tsx`); the solid variant is orange.
- **Text link with arrow:** semibold, arrow nudges right on hover. The default secondary action.
- **Hero film:** `public/video/hero.mp4`, 18s seamless loop rendered from the HyperFrames project `tally-promo/videos/12-hero-broll`. No baked-in text. Poster first; no autoplay under reduced motion.

## Do's and Don'ts

**Do:** lead with orange; keep one argument per band; use real footage; keep headlines short enough to stack in three to five lines.

**Don't:** use pure black or pure white; add a second accent colour; use gradient text; put text into the hero video; claim results the team has not had.
