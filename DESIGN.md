---
name: Tally
description: Cold, ruled, document-grade marketing site for a New Zealand primary and marine marketing firm that puts one number in the contract.
colors:
  sheet: "#08090b"
  sheet-2: "#0d0f13"
  sheet-3: "#12151a"
  ink: "#e8eaed"
  ink-2: "#a3abb5"
  ink-3: "#7a828c"
  signal: "#ff4a1c"
  signal-dim: "#5c2410"
  line-hair: "rgba(232, 234, 237, 0.08)"
  line-med: "rgba(232, 234, 237, 0.14)"
  line-heavy: "rgba(232, 234, 237, 0.3)"
typography:
  display:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.25rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-lead:
    fontFamily: "General Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Alliance No.1, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  readout:
    fontFamily: "Alliance No.1, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter-sm: "1.5rem"
  gutter-md: "3rem"
  gutter-lg: "5rem"
  band-sm: "6rem"
  band-md: "8rem"
  band-lg: "10rem"
  block: "1.5rem"
  block-lg: "4rem"
components:
  pill-solid:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.pill}"
    padding: "0.8125rem 1.5rem"
    typography: "{typography.label}"
  pill-solid-hover:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.signal}"
  pill-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8125rem 1.5rem"
    typography: "{typography.label}"
  pill-outline-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.sheet}"
  pill-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.8125rem 1.5rem"
    typography: "{typography.label}"
  pill-sm:
    padding: "0.5625rem 1.125rem"
    rounded: "{rounded.pill}"
  section-band:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    padding: "6rem 1.5rem"
  well:
    backgroundColor: "{colors.sheet-2}"
    rounded: "{rounded.none}"
    padding: "1rem 1.25rem"
  input-text:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem"
    typography: "{typography.body}"
  register-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 0"
  register-row-hover:
    backgroundColor: "{colors.sheet-2}"
---

# Design System: Tally

## Overview

**Creative North Star: "The General Arrangement Sheet, stripped of its furniture"**

Tally started as a literal naval-architecture drawing sheet. The decorative furniture that made it literal (the construction-grid overlay, the arrowed dimension lines, the revision triangles, the docked title block) was removed during the build because it read as costume: decoration pretending to be structure. What shipped keeps the discipline and drops the props. Cold blue-black grounds that recede in three steps instead of inverting, cool ink that is never warm, hierarchy carried by three line weights rather than by colour, binding conditions set as numbered NOTES, and figures set in tabular numerals so columns of numbers line up.

The site is a document an operator can audit, not a pitch. It is dense where it states terms and empty where it makes a claim: a full-viewport hero with one sentence and a lot of air, then ruled bands where every row carries an index, a scope, and a number. Nothing floats. There are no shadows, no cards with lifted corners, no gradients other than the one that seats the hero photograph on its ground. Separation is a rule, not a drop shadow.

Colour is rationed to the point of severity. One accent exists and it marks money: a guaranteed figure, or the single control that starts the engagement. Everything else, including every label, arrow, divider and hover state, is ink. The site is legible in greyscale with three exceptions, and that is the intended test.

**Key Characteristics:**
- Cold blue-black grounds in three depths; the ground recedes, it never inverts.
- Hierarchy is line weight (hairline, medium, heavy), not colour and not elevation.
- One accent, spent only on guaranteed figures and the primary action.
- Zero radius everywhere except the pill button, which is the one deliberate exception.
- Hover-only interaction language: a sweep left to right, a hairline that thickens.
- Tabular numerals wherever figures are compared.
- Two self-hosted faces, no third face, no system display face.

## Colors

A cold, near-monochrome document palette: blue-black grounds, cool grey ink, one hot orange that is spent, not applied.

### Primary
- **Signal Orange** (`{colors.signal}`): The only accent in the system. It marks a guaranteed figure (the per-track guarantee in the offer register, the per-sector number in the coverage register, the over-delivery count in the scoreboard), it fills the solid pill that is the single primary action, and it carries the system affordances that are the browser's but the design owns: the focus-visible ring, the text selection ground, and the focus border on form fields. It appears nowhere else. Contrast on the base ground is 5.93:1.
- **Signal Dim** (`{colors.signal-dim}`): The muted companion, held for accent-adjacent chrome. Used sparingly; it is a token, not a surface strategy.

### Neutral
- **Sheet** (`{colors.sheet}`): The base ground. Body background, nav bar, footer, default section band, the ground the solid pill's text is knocked out in. Also the browser theme colour.
- **Sheet Well** (`{colors.sheet-2}`): One step recessed. Used for banded sections (`tone="well"`), for data wells that hold a figure inside a row, for the ticker strip, and as the hover ground of a register row.
- **Sheet Raised** (`{colors.sheet-3}`): Two steps recessed. Used for the pricing band. Despite the name, it reads as deeper, not lifted: there is no elevation in this system.
- **Line White** (`{colors.ink}`): Headings, figures, active states, the ink of the brand mark's four strokes. 16.53:1 on the base ground.
- **Cool Grey** (`{colors.ink-2}`): Body copy, section notes, secondary links, the default state of every nav label. 8.58:1 on the base ground.
- **Deep Grey** (`{colors.ink-3}`): Field labels, column heads, note numerals, the NOTES counter column, muted captions. 5.12:1 on the base ground and 4.70:1 on the deepest ground, so it clears AA for normal text on every ground in the system. This is a floor, not a preference: an earlier value at 2.60:1 carried text in 125 places and was replaced.
- **Hairline / Medium / Heavy** (`{colors.line-hair}`, `{colors.line-med}`, `{colors.line-heavy}`): The three line weights. See Shapes.

### Named Rules
**The Spent Signal Rule.** Signal orange is spent, not applied. It is legitimate on exactly three classes of thing: a figure the contract binds, the one control that starts the engagement, and the focus or selection affordance the browser would otherwise draw badly. A label, an arrow, a divider, a hover state, an icon or a decorative flourish in signal is wrong. If you cannot name the contract clause or the primary action behind a use of it, remove it.

**The Receding Ground Rule.** Sections change depth, never hue and never polarity. There is no light section, no inverted band, no cream ground. Three depths of the same blue-black, separated by a rule.

**The Greyscale Audit.** Render a screen in greyscale. If more than the guaranteed figures and the one primary control lose meaning, the palette is being used as decoration.

## Typography

**Display Font:** General Sans, self-hosted at 400/500/600/700 (fallback system-ui, sans-serif), exposed as `--font-grotesk` and used through Tailwind's `font-sans`.
**Body Font:** General Sans. Display and body are the same face; the ramp separates them, not the family.
**Label / Readout Font:** Alliance No.1, self-hosted at 400/500/600/700 (fallback system-ui, sans-serif), exposed as `--font-alliance` and used through Tailwind's `font-mono`.

**Character:** A tight, slightly condensed geometric grotesk set at negative tracking for anything large, paired with a technical face that only ever appears small, uppercase and widely tracked. The pairing reads as a drawing sheet: the statement is set in the drawing's own hand, the annotations are set in the stencil. There is no third face and no serif anywhere in the system.

### Hierarchy
- **Display** (600, `3rem` to `5.25rem`, leading `0.95`, tracking `-0.045em`): The hero claim and the closing CTA heading only. Capped at roughly 13 to 14 characters per line so it breaks into a stack of short lines.
- **Headline** (600, `2rem` to `2.75rem`, leading `1.02`, tracking `-0.035em`): Section headings. Line length capped at 16 to 20ch with `text-balance`.
- **Page Title** (600, `2.5rem` to `3.5rem`, leading `1.0`, tracking `-0.04em`): Sector page and subpage H1. Deliberately smaller than the homepage display so the homepage keeps the loudest voice.
- **Title** (600, `1.25rem` to `1.5rem`, tracking `-0.02em`): Row titles in the offer register, tier names in pricing, subheads on sector pages.
- **Body Lead** (400, `1.0625rem`, leading `1.55`): The single supporting paragraph under a display or headline. Capped at 42 to 58ch.
- **Body** (400, `0.9375rem`, leading `1.6` to `1.75`): Running copy in rows, cards and answers. Capped at 52 to 70ch.
- **Fine** (400, `0.8125rem` to `0.875rem`, leading `1.6` to `1.65`): Notes, disclaimers, footer copy.
- **Label** (Alliance No.1, 500, `0.6875rem`, tracking `0.1em`, uppercase; `0.75rem` at tracking `0.08em` below 768px): Every eyebrow-position label, nav item, column head, field label, ticker item and small link. This is the `.mono-label` treatment and it is the only uppercase in the system.
- **Column Head** (Alliance No.1, `0.625rem`, tracking `0.12em` to `0.14em`, uppercase): Footer column heads, the "Guaranteed" label above a figure, pricing step labels.
- **Readout** (Alliance No.1, 500, up to `3rem`, tabular numerals): The scoreboard count and any large figure.

### Named Rules
**The Tabular Figure Rule.** Any number that could be compared to another number is set in tabular numerals (`.tnum` or `tabular-nums`). Scoreboard counts, week numbers, note numerals. Numbers that shift column width as they animate are a defect.

**The No Kicker Rule.** Section headings do not carry an eyebrow. The eyebrow above every heading restated the heading in smaller caps and was removed from `SectionHeader`; the heading carries itself. The `.mono-label` face exists for column heads, nav items and field labels, not for announcing what the next heading is about to say.

**The One Note Rule.** A heading gets at most one supporting paragraph. Pull-quote and closing-footnote layers do not bracket a section; detail lives on its own page.

## Layout

**Container.** One container everywhere: `max-w-[1440px]`, centred, with a stepped gutter of `1.5rem` under 768px, `3rem` from 768px, `5rem` from 1024px. Nav, hero, every section band, the footer and every subpage `article` use the same container and the same gutters, so the left edge of the site is a single unbroken line down the page.

**Section rhythm.** Vertical band spacing lives in one place, `Section`: `6rem` under 768px, `8rem` from 768px, `10rem` from 1024px. Neighbouring bands are separated by a hairline top rule, on by default. Inside a band the beat is `4rem` from heading block to content, `5rem` to `6rem` before a terminal block, and `1.5rem` to `2.5rem` between stacked text elements.

**Grids.** Content grids are asymmetric and content-led, not a fixed column count. The recurring shapes are: heading left with a supporting paragraph right-aligned to the container edge (`md:flex-row md:items-end md:justify-between`); a `16rem` label rail beside a fluid body column for NOTES-style blocks; a three-column offer row of `16rem / fluid / 20rem`; a four-column register row of roughly `3.4fr / 5.1fr / 1.9fr / 16px`. Every one of those collapses to a single stacked column below `lg`, with the column heads hidden rather than restacked.

**Breakpoints.** Tailwind defaults, used at four points: `sm` 640px (button rows go horizontal), `md` 768px (gutters and type step up, two-column grids appear), `lg` 1024px (the desktop nav, the full register columns, the widest gutter), and a `max-width: 767px` block that steps the label face up and forces 16px form fields so iOS does not zoom on focus.

**Density.** The site is deliberately airy at the claim and dense at the terms. Full-bleed rules and grid gaps of `1px` filled with hairline colour do the work that borders and cards would do elsewhere: the pricing grid is a `gap-px` grid on a hairline ground with each cell painted in sheet, so the seams are the grid, not three bordered boxes.

**Sticky and fixed layers.** The nav is fixed at `4rem` tall, `z-50`, translucent with a backdrop blur at rest and opaque when a menu is open. A mobile-only contact rail is fixed to the bottom edge at `z-40`, revealed past 640px of scroll and suppressed on the contact and legal pages. Page tops therefore carry `pt-28` to `pt-44` to clear the bar.

### Named Rules
**The Single Gutter Rule.** Never introduce a second container width or a second gutter scale. If a block needs to feel wider, remove its internal max-width; do not widen the container.

**The Rhythm Lives in Section Rule.** Band padding is set by `Section` and nowhere else. A one-off `py-` on a band is drift; if a band genuinely needs different spacing, it needs a tone, not a padding override.

## Elevation & Depth

This system has no elevation. There are no box shadows anywhere on the marketing site, no lifted cards, no glow, no border radius doing the work of a shadow. Depth is tonal and linear only: a surface recedes by stepping to a darker ground (`sheet` to `sheet-2` to `sheet-3`) and it separates by carrying a rule. A "well" that holds a guaranteed figure is a darker rectangle with no border; a section is a darker band with a hairline seam.

The only depth-adjacent effects in the build are two backdrop blurs used for legibility rather than for lift: the nav bar over scrolling content, and the outline pill when it sits on the hero photograph. Both are transparency management, not elevation.

### Named Rules
**The No Shadow Rule.** A box shadow is never correct on this site. If an element needs to separate from what is behind it, give it a rule, a darker ground, or space. Hard offset shadows in particular are foreign to this world; nothing here is neobrutalist.

**The Photograph Sits Down Rule.** Photography never floats above the sheet. Hero imagery runs at `0.28` opacity under a grayscale, contrast and brightness grade, with a bottom-up gradient from the ground colour to `55%` opacity so the image is seated in the sheet rather than laid on it. All other imagery carries the standard grade (`grayscale(20%) contrast(1.1) brightness(0.9)`). Every image currently in the build is an AI-generated placeholder standing in for real on-site capture and is labelled as such in the source; it must not be presented as documentation of a client engagement.

## Shapes

**Zero radius is the default and Tailwind's `--radius` is set to `0px` globally.** Every rectangle in the system is a true rectangle: wells, form fields, image frames, cards, panels, the scoreboard, the pricing cells. The house arrow is drawn with square caps and no radius so it matches the mark rather than a rounded icon glyph.

**The one exception is the button.** Pills are fully rounded at `999px`. This is a deliberate, pinned exception, held because the user chose it: a fully rounded control is unmistakably a control in a world made entirely of rectangles, so the one shape that is not square is the one thing you are meant to click. It is the only rounded element in the system and it stays that way. Do not extend the pill radius to cards, wells, inputs, badges or images, and do not add an intermediate radius scale to "harmonise" with it.

**Line weight is the shape language.** Three weights, no more:
- **Hairline** (`{colors.line-hair}`, 8% ink): construction. Section seams, list dividers, grid seams, field borders, the panel underline. The default weight; if you are unsure which weight a rule is, it is this one.
- **Medium** (`{colors.line-med}`, 14% ink): module edges. The outline pill's border at rest, the footer's top rule, an underlined inline link.
- **Heavy** (`{colors.line-heavy}`, 30% ink): what is cut or load-bearing. The rule above the closing CTA band, the rule that prints across a register row on hover, the outline pill's edge when it sits on a photograph.

Applied as `.rule-hair`, `.rule-med`, `.rule-heavy` alongside a Tailwind border-side utility.

**Other recurring geometry:** a diagonal hatch at 45 degrees (5% ink, 1px on a 10px pitch) marks a reserved or locked slot; the tally mark itself is a 3 by 16px vertical stroke, white below the guaranteed count and signal orange above it.

### Named Rules
**The Three Weights Rule.** There are exactly three line weights. A fourth weight, a dashed rule, a double rule or a coloured rule is not in the system.

**The Pill Is The Exception Rule.** Round the button. Round nothing else.

## Components

### Buttons (Pill)
The site's only button. Confident but quiet: it is a stadium-shaped label with a house arrow, and it moves in one direction.

- **Shape:** Fully rounded (`{rounded.pill}`), 1px border, label typography, `0.8125rem 1.5rem` padding at default size and `0.5625rem 1.125rem` at `sm`.
- **Solid (primary):** Signal ground, sheet-coloured label. This is the primary action and is the only signal-filled control on a screen.
- **Outline (secondary):** Transparent with a medium rule and line-white label.
- **Ghost (tertiary):** No chrome at rest, cool grey label. Used for low-priority links that still want a target.
- **On photo:** The outline variant sitting over imagery swaps to the heavy rule and adds a 6px backdrop blur, because the hairline token has no contrast floor over a photograph.
- **Hover and focus-visible (identical states):** A `::before` layer scales from `scaleX(0)` to `scaleX(1)` from the left edge over 460ms on a `cubic-bezier(0.16, 1, 0.3, 1)`, and the arrow travels 4px right on the same curve. Solid inverts to an outline; outline fills with signal; ghost picks up an 8% ink wash. The fill is never a background-colour swap: the sweep must have a direction.
- **Structural constraint:** `.pill` deliberately does not declare `display`; the component supplies `inline-flex` as a Tailwind utility and steps aside when the caller passes its own display class. The CSS block is unlayered, so a `display` declaration there would beat every Tailwind display utility including `hidden`.

### Section
The band primitive. Owns tone (`sheet`, `well`, `raised`), the vertical rhythm, the container, the gutters, the optional hairline seam, and the `aria-labelledby` wiring. A page is a stack of Sections; a band that sets its own padding or its own container is drift.

### SectionHeader
Heading plus at most one note paragraph, left aligned by default with an optional centred variant. Heading capped by `text-balance` and a `max-w-3xl` block; note capped at `58ch`. No kicker.

### Wells
A recessed rectangle (`{colors.sheet-2}`, no border, no radius, `1rem 1.25rem` padding) holding one labelled figure: a `0.625rem` uppercase deep-grey label, the figure in signal, and an optional label-sized action link beneath. This is the only place a figure and its accent live together.

### Registers (Offer rows, SectorRegister)
The signature component: a full-width ruled ledger rather than a grid of cards. A hairline column head states the contract once at `lg` and is hidden below it. Each row is a hairline-divided grid carrying a name, a scope, a guaranteed number in signal, and a house arrow. Rows are whole-row links with an `aria-label` that concatenates name and brief.

- **Hover and focus-within:** the row ground shifts to the well colour, a heavy rule prints across the bottom of the row from the left over 600ms, and the arrow travels right. The generic `.row-sweep` utility does the same job with a 4% ink wash bled `-1.5rem` past the container padding (`-2rem` at `lg`) so the wash reads as a band across the sheet, not as a card.

### Scoreboard
A labelled instrument readout: hairline border, well ground at 80% opacity, a large tabular figure counting up to an illustrative target, and a strip of 3px tally strokes where marks past the guaranteed count turn signal orange. It is exposed as `role="img"` with a full text alternative, and it is labelled "Illustrative" in the corner and again in the caption underneath. That labelling is load-bearing: Tally is pre-first-client and this readout is a format demonstration, never a result.

### Inputs
Full-width, zero radius, sheet ground, hairline border, `0.75rem 1rem` padding, placeholder in cool grey at 60% opacity, and a 300ms border-colour transition. Focus moves the border to signal. Field labels use the label treatment. Below 768px all inputs are forced to `16px` to stop iOS zooming on focus.

### Navigation
A `4rem` fixed bar: mark plus lowercase "tally" wordmark on the left, and on the right two label-sized menu buttons (Sectors, About) and one small solid pill. Nothing else.

- **Desktop (`lg` and up):** either button opens one full-width panel below the bar. The panel animates `max-height` and `opacity` over 420ms on the house curve, is fixed-position scrimmed at 80% sheet so it is the only live layer, and carries a blurb and contact address on the left with the link list right-aligned on the right at `1.5rem`. It opens on hover, click and keyboard; it closes on Escape, on outside mousedown, on mouse leave, and on navigation. The bar drops its blur and goes opaque while open. Sector pages are independent routes reached from this menu; they are not homepage anchors.
- **Below `lg`:** the menus collapse into an outline-pill toggle that opens a full-height scrollable drawer with body scroll locked, links stacked and hairline-divided, and the primary pill at full width.
- **Link state:** cool grey at rest, line-white on hover, with `.link-wipe` printing a 1px currentColor rule from the left under the label over 420ms. The same class carries `[data-active="true"]` for a persistent underline.

### Footer
A heavy-ruled closing CTA band on the well ground carrying display-scale copy and the primary pill, then a medium-ruled columned footer: brand block plus two label-headed link columns, with legal links isolated below their own hairline rule. Bottom padding is `84px` below `lg` to clear the mobile contact rail.

### Motion and interaction
The whole site moves one way: something travels left to right and a hairline thickens. Nothing scales, nothing bounces, nothing fades in on scroll.

- **The house curve** is `cubic-bezier(0.16, 1, 0.3, 1)`. Durations by role: colour and border 280 to 320ms, underline wipe 420ms, pill fill and arrow 460ms, row arrow 520ms, row wash 560ms, printed rule 600ms, nav panel 420ms, mobile rail 500ms. Longer durations belong to larger travel.
- **Three interaction classes carry it:** `.pill` (fill sweeps from the left, arrow travels 4px), `.link-wipe` (1px currentColor rule wipes in under a label from the left), `.row-sweep` (4% ink wash sweeps across a full-width row, the row rule goes heavy, the row arrow travels 8px and the row title goes line-white). Each responds to `:hover` and to `:focus-visible` or `:focus-within` identically.
- **Scroll behaviour** is a damped Lenis smooth scroll (lerp `0.07`, wheel `0.9`, touch `1.2`) mounted for the marketing site only. Native `scroll-behavior` is left at `auto` because Lenis owns scroll.
- **The one ambient animation** is the sector ticker: a 42s linear infinite translate of a duplicated track, `aria-hidden`, stopped entirely under reduced motion.
- **Scroll-position animation is not part of the language.** Entrance reveals were removed from the shipped surfaces; the counting scoreboard readout is the single sanctioned scroll-triggered behaviour, because the count is the content.

### Accessibility floors actually met
- **Contrast:** every ink token clears AA for normal text on every ground it is used on. Worst case in the system is deep grey on the deepest ground at 4.70:1; signal on the base ground is 5.93:1 and is never used for long-form copy.
- **Focus:** `:focus-visible` draws a 2px signal outline at 3px offset globally, and every hover treatment is duplicated on focus so keyboard users see the same state changes as pointer users.
- **Targets:** label-sized links and buttons take a 44px minimum height under `pointer: coarse`; brand lockups and the mobile rail pill declare the same floor explicitly. The global coarse-pointer block sets `min-height` only, deliberately, because it is unlayered and any other property there would beat Tailwind utilities including `hidden`.
- **Reduced motion:** honoured twice, in CSS (all interaction transitions collapse to `0.01ms`, the ticker animation stops) and in JS (`MotionConfig reducedMotion="user"`), so server and client render identically.
- **Form zoom:** inputs, textareas and selects are forced to `16px` below 768px so iOS does not zoom the page on focus.
- **Semantics:** sections carry `aria-labelledby`, decorative strips and arrows are `aria-hidden`, the nav panel exposes `aria-haspopup` and `aria-expanded`, and the scoreboard is `role="img"` with a sentence-length accessible name.

### Admin portal (out of scope)
An operate-mode product surface exists under `app/admin/**` and `components/admin/**` with its own token scope under `.admin`: warmer accent, denser fixed type steps, a semantic status vocabulary and its own form primitives. It is a different surface with different rules and is not documented here. Do not import its tokens into a marketing surface, and do not apply this document's tokens to it.

## Do's and Don'ts

### Do:
- **Do** spend signal orange only on a guaranteed figure, the single primary action, or a focus and selection affordance. Everything else is ink.
- **Do** change section ground by depth (`sheet`, `well`, `raised`) and separate bands with a hairline seam.
- **Do** carry hierarchy on the three line weights: hairline for construction, medium for module edges, heavy for what is load-bearing.
- **Do** set every comparable number in tabular numerals.
- **Do** use `Section` for band rhythm and the single `max-w-[1440px]` container with the `1.5 / 3 / 5rem` gutter ramp.
- **Do** make interaction a left-to-right sweep on `cubic-bezier(0.16, 1, 0.3, 1)`: a fill that scales from the left, a rule that wipes in, an arrow that travels. Give `:focus-visible` the same treatment as `:hover`, always.
- **Do** keep tap targets at 44px minimum under a coarse pointer, and declare the growth in the element's own className rather than in the unlayered global block.
- **Do** label any illustrative figure as illustrative, in the visible copy and in the accessible name.
- **Do** keep the pill at `999px` and everything else at `0px`.

### Don't:
- **Don't** add a box shadow, a lifted card, a glow, or any elevation. Depth is tonal and linear only.
- **Don't** invert a section to a light or warm ground, or reintroduce the cream and terracotta palette. The ground recedes, it never flips.
- **Don't** put an eyebrow or kicker above a section heading. The five section kickers that were shipped in an earlier pass were removed for restating the heading; do not bring them back, and do not treat the `.mono-label` face as licence to reintroduce them.
- **Don't** use signal orange for labels, arrows, rules, dividers, hover states or decoration, and don't use it on a figure that is not contractually guaranteed.
- **Don't** add a third typeface, a serif, or a system display face. General Sans and Alliance No.1 are the whole set.
- **Don't** use a glyph or an emoji as an icon. Icons are drawn SVG with square caps at `1.25` stroke width.
- **Don't** add scroll-triggered entrance animation to new surfaces. The interaction language is hover-only.
- **Don't** add a fourth line weight, a dashed rule or a coloured rule.
- **Don't** round anything except the pill, and don't introduce an intermediate radius scale.
- **Don't** write an em dash or an en dash anywhere: not in copy, headings, metadata, alt text, JSON-LD or code comments. Use a comma, a colon, or a second sentence. The build currently contains zero of either character outside the admin surface, and that is the state to hold.
- **Don't** write copy that implies a client, a case study, a result, a logo or a testimonial. Tally is pre-first-client. Numbers on the site are guarantees offered or illustrative formats, and both must read as such. Photography is AI-generated placeholder and must never be captioned as documentation of real work.
- **Don't** import or mirror the `.admin` token scope into a marketing surface.
