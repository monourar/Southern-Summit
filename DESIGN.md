---
name: Southern Summit Outdoor
description: Architectural drafting-room luxury for remote 3D estate design.
colors:
  ember-bronze: "#B5652E"
  ember-bronze-hover: "#D87838"
  ember-bronze-light: "#D8A370"
  ember-bronze-solid: "#A05A28"
  ember-bronze-deep: "#8F4D22"
  blueprint-cyan: "#38BDF8"
  draft-ink: "#1C1A17"
  surface: "#24211D"
  surface-elevated: "#2E2924"
  footer-ink: "#141210"
  bone: "#F5F1EA"
  bone-muted: "#EAE4D9"
  text-muted: "#A39E93"
  text-muted-dark: "#666055"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.85rem, 5vw, 4.2rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    letterSpacing: "0.2em"
  label-large:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  gutter: "24px"
  gap-sm: "8px"
  gap-md: "16px"
  gap-lg: "24px"
  section-sm: "72px"
  section-lg: "100px"
components:
  button-primary:
    backgroundColor: "{colors.ember-bronze-solid}"
    textColor: "{colors.bone}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
    typography: "{typography.label}"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ember-bronze-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
    typography: "{typography.label}"
    height: "48px"
  input-field:
    backgroundColor: "{colors.draft-ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  card-elevated:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.bone}"
    rounded: "{rounded.lg}"
    padding: "28px"
  nav-link:
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
  tag-badge:
    backgroundColor: "{colors.draft-ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
    typography: "{typography.label}"
---

# Design System: Southern Summit Outdoor

## Overview

**Creative North Star: "The Drafted Estate"**

Architectural drafting-room luxury. The system reads like a senior landscape architect's specification binder rendered as a website: blueprint cyan linework, warm ember bronze fittings, and deep charcoal drafting boards, overlaid on a bone-white paper section for contrast. Precision is the personality — every label is uppercase and letterspaced, every headline is a serif cut with drafting-pen confidence, and the copy constantly references CAD, GIS data, and digital twins.

The density is editorial and cinematic. The page is divided into full-viewport "beats" that snap into place on desktop, alternating between dark drafting-board surfaces and a single light bone counterpoint. Surfaces stay flat at rest and respond to interaction with a lift-and-glow gesture: the interface feels engineered to be touched, not merely viewed. The whole system runs on two typefaces and one warm accent, kept scarce enough that every appearance is a conversion moment.

**Key Characteristics:**
- Drafting-room rigor: uppercase tracked labels, hairline borders, technical numerals.
- Dark-dominant: charcoal surfaces with one bone section as the light beat.
- Ember scarcity: the bronze accent appears only at the points of action and proof.
- Lift-and-glow motion grammar: flat at rest, translateY + shadow glow on interaction.
- Full-viewport snap sections on desktop; natural momentum scroll on mobile.

## Colors

A warm-and-cool drafting palette: deep charcoal neutrals carry the composition, ember bronze provides warmth and action, blueprint cyan adds technical linework precision and is reserved for decorative/glow use.

### Primary
- **Ember Bronze** (#B5652E): the brand accent — numerals, splitter lines, hover states, focus rings, timeline rules, carousel dots. Never used as body text on dark.
- **Ember Bronze Hover** (#D87838): warmer lift for hovered bronze elements (button glows, logo hover).
- **Ember Bronze Light** (#D8A370): the accessible bronze text on dark surfaces (≥4.5:1) — microcopy accents, footer headings, spec eyebrows, required-field asterisks.
- **Ember Bronze Solid** (#A05A28): the AA-compliant fill behind light text (4.68:1) — primary button background, accessible badge fill.
- **Ember Bronze Deep** (#8F4D22): primary button hover fill (5.73:1) and accessible link hover text.

### Secondary
- **Blueprint Cyan** (#38BDF8): the technical accent — blueprint glows, the hero's CAD-inspired light, architectural linework. Decorative and luminous; near-black text only when used as a fill (8.10:1).

### Neutral
- **Draft Ink** (#1C1A17): the primary dark surface, body text on light sections, near-black scrims.
- **Surface** (#24211D): elevated dark cards, modal, header/menu surfaces.
- **Surface Elevated** (#2E2924): hover-raised dark surfaces.
- **Footer Ink** (#141210): deepest background, the footer's closing beat.
- **Bone** (#F5F1EA): light-section background and light text on dark.
- **Bone Muted** (#EAE4D9): secondary light surface.
- **Text Muted** (#A39E93): secondary text on dark — body copy, nav links.
- **Text Muted Dark** (#666055): secondary text on bone — eyebrow-light, FAQ answers.

### Named Rules
**The Ember Scarcity Rule.** Ember bronze is used on ≤5% of any given screen. Its rarity is the point — it marks only the moments that convert: the CTA, the hover state, the numeral, the focus ring.

**The Two-Atmosphere Rule.** Every scroll beat alternates a dark drafting-board section with the single bone section. Two atmospheres, one system — a third light surface is never introduced mid-page.

## Typography

**Display Font:** Cormorant Garamond (with Georgia serif fallback)
**Body Font:** Plus Jakarta Sans (with system-ui / sans-serif fallback)
**Label Font:** Plus Jakarta Sans, uppercase (shared with body)

**Character:** The pairing is drafting-meets-estate. Cormorant Garamond's high-contrast, low-x-height elegance carries editorial authority; Plus Jakarta Sans supplies clean, geometric-humanist precision for interfaces and labels. The serif is the voice; the sans is the machine.

### Hierarchy
- **Display** (500, `clamp(1.85rem, 5vw, 4.2rem)`, 1.12): section titles. Mobile min 1.85rem keeps headlines visually dominant.
- **Headline** (500, 2rem, 1.12): card and modal titles, hero caption.
- **Title** (500, 1.5rem, 1.15): process step titles, project titles.
- **Body** (400, 16px, 1.6): primary copy, always in Text Muted; 14px allowed only for genuinely secondary text.
- **Label** (600, 10–12px, 0.2em uppercase): eyebrows, nav, buttons, badges, section meta. The drafting-room signature.

### Named Rules
**The Eyebrow Rule.** Section labels are always uppercase sans at ≤12px with ≥0.2em letter-spacing. A lowercase, un-tracked eyebrow is a contradiction in this system.

**The Serif-Only-Headings Rule.** Headings are Cormorant Garamond, always. Plus Jakarta Sans is never used as a heading face; if a headline must be sans, it is not a headline — it is a label, and it must be uppercase and tracked.

## Layout

Container is 1380px max, centered, with 2rem side padding on desktop and a 24px `--page-gutter` on mobile. The vertical rhythm is full-viewport beats: `.snap-section-*` sections are 100dvh on desktop with `scroll-snap-align: start` and mandatory snap (`y mandatory`, `scroll-snap-stop: always`); at ≤768px they drop to auto-height with 72px padding and proximity snap for natural thumb momentum. A fixed header (80px, measured at runtime into `--header-height`) anchors every section with matching `scroll-margin-top`. Content grids: 4-column process timeline on desktop collapsing to a vertical rail on mobile; 3-column portfolio collapsing to an 88vw snap carousel; 12-column footer (4/2/2/4). The mobile portfolio carousel bleeds edge-to-edge via negative margins and hides its scrollbar.

## Elevation & Depth

A hybrid system: **tonal layering** on dark surfaces (elevated surface cards, gradient scrims over photography, backdrop blur) plus **ambient glow shadows** reserved for action. Depth is not decorative — it signals what can be touched. The system's signature move is the *lift-on-interaction*: flat at rest, then a translateY rise with an ember glow on hover.

### Shadow Vocabulary
- **Ambient glow** (`0 4px 20px rgba(181, 101, 46, 0.25)`): primary buttons at rest — a quiet warmth.
- **Hover glow** (`0 8px 30px rgba(216, 120, 56, 0.4)`): primary button hover — the conversion moment.
- **Elevated card** (`0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`): portfolio cards at rest.
- **Deep float** (`0 25px 50px -12px rgba(0,0,0,0.25)`): the consultation modal and hero images — the "you can step into this" layer.
- **Header drop** (`0 10px 30px rgba(0,0,0,0.5)`): the header after scroll, with an 85% ink blur behind it.

### Named Rules
**The Lift-on-Interaction Rule.** No surface is lifted at rest except where depth is literal (modal, hero image). Every lift — `translateY(-2px)` on buttons, `translateY(-8px)` on cards — is a response to hover or active state, and it is always accompanied by an ember glow or border.

## Shapes

Architectural radius logic: the sharper the corner, the more technical the action. Buttons are **near-square** (4px) — a drafting stamp, not a pill. Inputs take a slightly friendlier 8px. Process cards sit at 12px; the modal and mobile process cards at 16px; badge pills, timeline nodes, and the FAQ toggle are fully round. Borders are 1px hairlines: `rgba(245,241,234,0.10–0.20)` on dark surfaces, `rgba(28,26,23,0.10–0.20)` on bone. Photography is always `overflow-hidden` with a rounded-xl clip; the before/after comparison uses a `clip-path` polygon split with a 2px ember line and a circular 48px drag handle.

## Components

### Buttons
- **Shape:** near-square (4px radius); uppercase tracked label type; 48px min-height; icon optional.
- **Primary:** Ember Bronze Solid fill, Bone text, ambient glow. Hover: Ember Bronze Deep fill, `translateY(-2px)`, hover glow.
- **Outline:** transparent fill, 1px `rgba(245,241,234,0.2)` border, Bone text. Hover: ember border + ember text, `translateY(-2px)`.
- **Focus:** `focus-visible` 2px ember ring.

### Chips / Tag Badges
- **Style:** Draft Ink at 85% with backdrop blur, 1px bone hairline, Bone or Text Muted uppercase tracked 10px text, 4px radius.
- **Use:** portfolio category/location tags, before/after labels, step "Specification" footers.

### Cards / Containers
- **Process card:** Surface bg, 12px radius desktop / 16px mobile, hairline bone border, 28px padding. Hover: `translateY(-8px)`, ember border, oversized serif numeral in Ember Bronze.
- **Portfolio card:** full-bleed photography, rounded-xl clip, bottom gradient scrim from Draft Ink, hairline border, elevated shadow. Hover: image `scale(1.04)`, `shadow-2xl`, ember border.

### Inputs / Fields
- **Style:** Draft Ink fill, 1px bone hairline, 8px radius, 12×16px padding, 14px text.
- **Focus:** ember border + 1px ember ring; never loses visible focus.
- **Validation:** native `required`/`type=email`; required asterisk in Ember Bronze Light; 44px+ touch targets throughout.

### Navigation
- Fixed header: logo + wordmark left, uppercase tracked 12px links (Text Muted → Bone on hover) right, primary button far right. At rest a top gradient scrim; after 30px scroll it becomes an 85% Draft Ink blur with a bone hairline underline and header drop shadow. Mobile: 44px toggle → full-width ink drawer with stacked tracked links.

### Dialog / Modal
- Surface bg, 16px radius, Deep Float shadow, 85% ink backdrop with 12px blur. Close button is a 44px round target with ember focus ring. Form uses the Inputs pattern; success state swaps to an ember check seal with a summary card.

### Signature Component — Image Comparison Slider
The brand's proof device: a draggable before/after comparison (`role="slider"`, arrow-key/Home/End accessible) with a 2px ember splitter line, circular 44–48px drag handle, and accessible badge fills (cyan fill + near-black text, or Ember Bronze Solid + Bone text). Labels hide on mobile; the handle stays prominent.

### Signature Component — Process Timeline
Numbered stages as oversized serif numerals (up to 3.75rem) in Ember Bronze over a horizontal 1px ember rule on desktop, or a vertical ember rail with `scaleY` reveal on mobile. The numeral is the anchor; the serif title and muted body follow beneath.

## Do's and Don'ts

### Do:
- **Do** alternate dark and bone section beats — one bone section per scroll rhythm is the norm.
- **Do** render every heading in Cormorant Garamond with tight `-0.02em` tracking.
- **Do** keep labels uppercase, tracked ≥0.2em, ≤12px.
- **Do** reserve ember bronze for CTAs, numerals, hover/focus, and proof elements only.
- **Do** keep all interactive targets ≥44px (buttons 48px min-height, FAQ rows 52px, slider handle 48px on mobile).
- **Do** use the AA fills — Ember Bronze Solid behind light text, Ember Bronze Light for bronze text on dark.
- **Do** respond to hover with a translateY lift plus glow or ember border.

### Don't:
- **Don't** use Blueprint Cyan for body or label text — it is decorative linework and glow only.
- **Don't** set a headline in Plus Jakarta Sans; if type must be sans, make it an uppercase label.
- **Don't** place Ember Bronze text directly on Draft Ink (falls below 4.5:1); use Ember Bronze Light.
- **Don't** introduce a second light surface color mid-page; the system has exactly one bone beat.
- **Don't** use shadows as rest-time decoration; depth means "interactive."
- **Don't** let the italic serif appear below weight 400; it exists only as a static 400.
- **Don't** render content with horizontal overflow; use negative-margin carousels and hide scrollbars instead.
