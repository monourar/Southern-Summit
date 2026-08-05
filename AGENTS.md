# AGENTS.md — operating contract for agent sessions on this repo

## What this repo is

Marketing site for Southern Summit Outdoor ("The Drafted Estate"). See
[`README.md`](./README.md) for orientation and [`PRODUCT.md`](./PRODUCT.md) for
product intent and the real-vs-illustrative evidence rules.

## Verification gates (always run before considering work done)

- `npm run typecheck` → exit 0
- `npm run build` → exit 0 — the critical-css step **must** print
  `critical-css: index.html updated`
- `npm run lint` → exit 0 (warnings allowed; the ESLint config intentionally
  tolerates `no-undef` DOM globals)
- `npm run test:run` → all tests pass

## Conventions

- Named exports typed `React.FC<Props>`; the props interface sits above the
  component. Component dirs: `hero/ sections/ layout/ modals/ common/`.
- 2-space indent, single quotes, trailing semicolons. No throwaway comments —
  recent cleanups removed legacy "Fix N" comments; do not reintroduce them.
- Design tokens are CSS vars in `src/styles/index.css:45-85` (`:root`); prefer
  them over raw hex. When a hex is unavoidable in JSX (e.g. Tailwind arbitrary
  values), reuse a documented color from `DESIGN.md`.
- Icons: `lucide-react`, one import per icon, `className` for sizing
  (`w-4 h-4` patterns).
- Reveal-on-scroll: reuse `src/components/common/Reveal.tsx`
  (IntersectionObserver + CSS transition). Do not add framer-motion.
- Exemplar clean component to imitate: `src/components/common/Reveal.tsx`.

## Design-system invariants (from `DESIGN.md`)

- **Serif-only headings** — Cormorant Garamond always; sans in a heading slot
  is a label, uppercase and tracked.
- **Eyebrow rule** — uppercase tracked labels ≤12px with ≥0.2em tracking.
- **Ember scarcity** — ember bronze ≤5% of any screen; conversion points only.
- **Two-atmosphere rule** — one bone section per page beat; never a second
  light surface color mid-page.
- **Lift-on-interaction** — no rest-time elevation except the modal/hero; every
  lift pairs with an ember glow or border.

## Out of bounds for agents

- No Tailwind v3→v4 migration (postcss config and `@tailwind` directives stay v3).
- No backend, form service, or `fetch` in the consultation modal without a
  dedicated plan (see `plans/005-mailto-failure-path.md` for the current
  static mailto handoff).
- Do not reintroduce the deleted `script.js`, `styles.css`, or raw `images/`
  originals (removed in plan 002).
- Do not flag the `index.html` `@impeccable-live` start/end marker pair as a
  defect. The live tooling inserts/removes it per session;
  `.impeccable/live/config.json` is the contract. Flagging it on fresh audits
  only re-runs plan 013's reconciliation cost.

## Plans index

Open and pending improvement work is tracked in [`plans/README.md`](./plans/README.md).
Read it before adding new plans so new work reuses the established plan
format, execution order, and dependency notes.
