# Spike: Authenticated Proposal Intake

Decision-ready design spike for collecting real project inputs (property
boundaries, site photos, drone video) and producing a durable project record,
replacing the current mailto handoff — **without** implying durable receipt
today.

- **Scope**: design only. No backend, credentials, storage, routes, or UI.
- **Planned against**: commit `555faf5` (working tree carried uncommitted
  polish at planning time); verified against live source on 2026-08-04.
- **Related**: `plans/009-proposal-intake-spike.md`, `plans/010-builder-portal-spike.md`,
  `plans/005-mailto-failure-path.md`.

---

## 1. Binding constraints and open decisions (Step 1)

### Binding (from repo evidence)

| Constraint | Evidence |
|---|---|
| Remote-first; the whole journey is imagery/video/digital-twin, never in-person | `PRODUCT.md:53` |
| Homeowners submit boundaries, site photos, drone video before receiving a design | `PRODUCT.md:11`, `PRODUCT.md:25` |
| Deliverables include dimensioned layouts, pool profiles, material callouts, lighting line diagrams | `PRODUCT.md:26` |
| Four-stage pipeline is the core promise and must stay legible | `PRODUCT.md:56` |
| Testimonials/names/figures must be real; never fabricate proof | `PRODUCT.md:55` |
| Budget tiers (`$40k–$75k`, `$75k–$150k`, `$150k+`) are illustrative, not quotes | `PRODUCT.md:33`, `PRODUCT.md:48` |
| Real contact + domain exist; `(555)` placeholders are illustrative | `PRODUCT.md:34`, `PRODUCT.md:48` |
| Keyboard support, AA contrast, reduced-motion handling are baseline | `PRODUCT.md:57`, `PRODUCT.md:61` |
| Current intake is six React-state fields + a `mailto:` URL; no server call | `ConsultationModal.tsx:10-19`, `:80-97` |
| The modal renders `null` when closed; no router/session/API/data layer exists | `App.tsx:24-33`, `App.tsx:69-74` |
| No server/runtime or storage SDK in the dependency set | `package.json:15-41` |
| A mailto failure path already exists and must stay until a service is proven | `ConsultationModal.tsx:156-179`; plan 005 |

### Undecided (owner must decide; marked `To decide`)

- Provider, auth model, retention period, data residency, file limits, who may
  view requests, notification channel, accessibility target beyond current
  WCAG-AA, incident/deletion process. Collected in §5.

---

## 2. Architecture comparison (Step 2)

Two options were scoped, as required by the plan. Pricing, security, and
provider-specific claims that cannot be verified from this repo are labeled
`To verify with provider`. No vendor is chosen here.

### Option A — Managed form/intake provider

Browser submits to a provider (or a thin serverless adapter); the provider
owns storage and notification.

| Dimension | Assessment |
|---|---|
| Time to first usable intake | Fast — provider SDK/embed, no infra. `To verify with provider` for the exact setup effort. |
| Monthly cost | Unknown here; depends on form submissions, file storage, seats. `To verify with provider`. |
| Vendor lock-in | Medium — form schema, submission events, and stored files live on the provider; migration requires an export job and new schema. |
| PII exposure | Provider stores name/email/phone + uploaded files; DPA and subprocessors must be reviewed. `To verify with provider`. |
| File-upload support | Strong — most such providers handle upload + virus/type checks. Size caps and formats `To verify with provider`. |
| Authentication complexity | Low — can start anonymous/magic-link; provider hosts session. |
| Observability | Provider dashboards + webhook receipts; export and query limits `To verify with provider`. |
| Failure recovery | Webhook verification and idempotent delivery are the key controls; provider SLA `To verify with provider`. |
| Migration path | Export submissions + files, then re-map to first-party schema; feasibility `To verify with provider`. |

### Option B — Small first-party serverless intake

One POST endpoint + object storage + a minimal project record (e.g. function +
bucket + table). Auth, validation, upload, notification, retention all ours.

| Dimension | Assessment |
|---|---|
| Time to first usable intake | Slowest of the two — build auth, upload, validation, notification ourselves. |
| Monthly cost | Low at this traffic; dominated by function invocations + storage + email. Estimate `To verify with provider` for a live bill. |
| Vendor lock-in | Lowest — schema, storage, and logic are portable (standard object storage + table). |
| PII exposure | Fully ours; must implement DPA, retention, deletion, and audit ourselves. |
| File-upload support | Requires signed upload URLs + MIME/size validation + malware-scan responsibility (see §3 threat model). |
| Authentication complexity | Medium — magic link or provider-hosted auth for homeowners; a separate builder identity later (plan 010). |
| Observability | Ours to build (structured logs, alerting); must scrub PII from logs (§3). |
| Failure recovery | Ours to design — idempotent create, retry notification, mailto fallback on outage. |
| Migration path | Easiest long-term — no provider schema to escape; but builds on raw infra. |

### Recommendation signal

The spike deliberately does **not** pick one. The deciding factor is the
owner's answer to **who owns the PII and files** (privacy posture) versus
**time-to-first-useful-intake**. Both options share the same provider-neutral
contract in §3, so a later choice does not invalidate this design.

---

## 3. Provider-neutral domain and security contract (Step 3)

> **Explicit statement**: the current static site has **no server-side receipt
> guarantee**. `window.open(mailtoUrl, '_self')` (`ConsultationModal.tsx:82`)
> hands off to a mail client; the "Request Is Ready" state (`:137-142`) means
> the client was opened, not that anything was delivered. Nothing in this
> artifact claims durable receipt until a server returns a persisted request ID.

### 3.1 `ProposalRequest` (domain object)

| Field | Type | Notes |
|---|---|---|
| `id` | string | server-generated opaque ID |
| `actor` | enum | `anonymous` \| `magic_link_homeowner` \| `builder` (see §3.4) |
| `name` | string | required |
| `email` | string | required, validated server-side |
| `phone` | string optional | |
| `project_focus` | enum | master-plan, pool-spa, outdoor-kitchen, builder-track (mirrors `ConsultationModal.tsx:265-269`) |
| `budget_tier` | enum | `$40k-$75k`, `$75k-$150k`, `$150k+` — **illustrative only**, never a quote (`PRODUCT.md:33`) |
| `notes` | text optional | |
| `assets` | array of `AssetMetadata` | see §3.3 |
| `consent_timestamp` | ISO-8601 | recorded when user accepts intake terms |
| `status` | enum | see §3.2 |
| `created_at`, `updated_at` | ISO-8601 | server set |

### 3.2 Status model

`draft → submitted → under_review ⇄ needs_information → closed`

| Transition | Who may perform |
|---|---|
| `draft → submitted` | client (submit completes) |
| `submitted → under_review` | staff (automated or manual accept) |
| `under_review ⇄ needs_information` | staff; client may add information while open |
| `→ closed` | staff (won / lost / withdrawn) |

Only `draft → submitted` is client-initiated. Everything else is staff-gated;
no transition is client-triggered past submission. (Exact staff roles are an
owner decision — §5.)

### 3.3 File constraints (placeholders — owner decides real limits)

| Constraint | Placeholder |
|---|---|
| Accepted categories | property boundary document, photograph, drone video |
| Max files / request | `To decide` (suggest ≤ 20) |
| Max size / file | `To decide` (suggest ≤ 100 MB photo/doc; video capped by duration/size) |
| Allowed MIME families | `image/*`, `application/pdf`, `video/*` — **server-side**, never trust client header |
| Storage lifetime | `To decide` (suggest tied to status + retention window, §5) |
| Deletion request | Must be honored; owner defines SLA and process |
| Malware scanning | Required for Option B; provider-dependent for Option A (`To verify with provider`) |
| Server-side validation | MIME sniff + size check at upload; re-validate at processing |

### 3.4 Identity model

- Homeowners **may submit anonymously** (magic-link optional) for a first
  intake; richer interactions (revisions, plan 010 builder portal) require a
  verifiable identity.
- Magic-link verification (email single-use token, short expiry) is **sufficient**
  for homeowner identity at intake scale; no passwords.
- Builders differ from homeowners by **role**: plan 010 reuses this identity
  model and adds a builder role with its own scoped permissions.
- **Client-only authorization is explicitly rejected** — every read/mutate is
  authorized server-side (see IDOR control, §3.5).

### 3.5 Threat model

| Threat | Required control |
|---|---|
| Spam / abuse | Rate limit per email/IP at intake endpoint; honeypot or proof-of-work `To decide` |
| Oversized files | Enforce size/MIME caps at signed-URL issuance and again at processing |
| Malicious files | Malware scan before any storage-policy that makes content active; reject + log |
| PII leakage | Data classification; PII only in secure fields; **no PII in logs or URLs**; redact in notifications |
| IDOR across proposal IDs | Every read/write authorized server-side against the actor's own records (no client trust) |
| Replayed upload URLs | Signed URLs bound to request ID + short TTL; single-use where provider allows |
| Notification spoofing | Verify outbound channel (webhook signature / DMARC + verified sender); never accept inbound notification as proof of receipt |
| Accidental exposure through logs | Structured logging with PII scrubbing; separate audit log for delete ops |

### 3.6 Failure behavior

- Existing mailto path (`ConsultationModal.tsx:82`, `:156-179`) **remains the
  fallback** whenever the intake service is unavailable or times out.
- No success UI may appear until the server returns a persisted request ID;
  anything short of that renders the mailto fallback, not a "received" state.
- Retry is idempotent (client may re-submit; duplicate detection by an
  idempotency key or email+timestamp).

### 3.7 Accessibility

- Keyboard-first form; all uploads reachable by keyboard (no drag-only).
- Clear per-field errors, announced via `aria-live`.
- Upload progress and status announced; failed uploads have an accessible
  retry + mailto fallback.
- Preserve current AA contrast and `prefers-reduced-motion` handling
  (`PRODUCT.md:57`, `CustomCursor.tsx`).

---

## 4. Staged rollout (Step 4)

No step requires production code or real customer data beyond what the current
site already exposes.

1. **Observe current mailto conversion** — instrument click/abandonment
   without collecting new PII (client-side event, no new fields).
2. **Prototype non-production intake** — synthetic data only; same contract
   as §3, behind a dev flag or owner-only link.
3. **Harden** — server-side validation, persistence, upload controls,
   notification verification, retention/deletion.
4. **Gate** — small traffic share or owner-only link; mailto remains default.
5. **Promote only after observed success** — demote/remove mailto only after
   sustained successful receipt and recovery tests.

---

## 5. Open owner decisions (each has an owner)

| # | Decision | Options to consider | Owner |
|---|---|---|---|
| 1 | Provider | Option A (managed) vs Option B (first-party) | Studio owner |
| 2 | Auth model | Anonymous-only, magic-link, or both at launch | Studio owner |
| 3 | Retention period | e.g. 90 days post-`closed`, or project lifetime | Studio owner |
| 4 | Data residency | US-region storage requirement? | Studio owner |
| 5 | File limits | Count, per-file size, video cap (§3.3) | Studio owner |
| 6 | Viewers | Who may view requests / files (studio staff roles) | Studio owner |
| 7 | Notification channel | Email, SMS, dashboard, or combo | Studio owner |
| 8 | Accessibility target | WCAG-AA today; AAA later? | Studio owner |
| 9 | Incident/deletion process | Breach + deletion SLA, audit log retention | Studio owner |

---

## 6. Future verification checklist (for the implementation plan)

- Schema contract tests (field validation, status transitions).
- Upload validation tests (MIME/size, oversize, wrong type).
- Authorization/IDOR tests (cross-request access attempts rejected).
- Notification idempotency tests (no duplicate receipts).
- Retention/deletion tests (files purged on schedule + on request).
- Playwright coverage for keyboard-first form, error states, and mailto
  fallback under service outage.
- Baseline must stay green: `npm run typecheck`, `npm run build`,
  `npm run test:run`.

---

## Notes

- This spike intentionally does not choose a vendor; the implementation plan
  must convert §5 decisions into explicit acceptance criteria.
- Plan 010 (builder portal) reuses the identity, storage, retention, and
  authorization decisions here rather than creating a second intake system.
- Budget values remain illustrative (`PRODUCT.md:33`); never store or display
  them as confirmed quotes without owner approval.
- No credentials, tokens, or customer data appear in this artifact.
