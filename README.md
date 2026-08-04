# Southern Summit Outdoor

Marketing site for a remote 3D landscape-architecture studio — **"The Drafted
Estate"**. Homeowners get an immersive photorealistic 3D master plan; builders
get contractor-ready CAD packages, all delivered remotely.

## Stack

React 18, Vite 5, TypeScript (strict), Tailwind CSS 3, lucide-react. Typefaces
(Cormorant Garamond + Plus Jakarta Sans) are self-hosted in `public/fonts/`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build + inline critical CSS (`scripts/critical-css.mjs`) |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | `tsc --noEmit` (zero errors is the baseline) |
| `npm run lint` | ESLint (flat config, warnings allowed) |
| `npm run test` | Vitest (jsdom) — watch mode |
| `npm run test:run` | Vitest (jsdom) — one-shot |

## Project layout

```
src/
  components/  hero/  sections/  layout/  modals/  common/
  styles/      index.css (design tokens, @tailwind, component classes)
  App.tsx      page composition (Header → sections → Footer → modal)
public/        images (optimized), fonts (woff2), logo, favicons
scripts/       critical-css.mjs (build), optimize-images.mjs, fetch-fonts.mjs
```

## Design system

The visual language is defined in [`DESIGN.md`](./DESIGN.md) (north star
"The Drafted Estate"). Read it before any styling change. Key inviolable
rules: serif-only headings (Cormorant Garamond), uppercase tracked labels
≤12px, ember bronze only at points of conversion (≤5% of screen), one bone
section per page beat, lift-on-interaction not rest-time shadows.

## Product intent

Product decisions, evidence rules, and the real vs. illustrative contact facts
live in [`PRODUCT.md`](./PRODUCT.md).

## Working with agents

Agent-affecting conventions and constraints live in
[`AGENTS.md`](./AGENTS.md). Read it alongside this file.
