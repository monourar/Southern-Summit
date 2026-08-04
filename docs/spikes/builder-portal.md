# Spike: Protected Builder Specification Portal

Decision-ready design spike for delivering contractor-ready CAD/spec packages
to assigned builders through a protected portal — reusing plan 009's identity,
storage, retention, and authorization boundary rather than inventing a second
system.

- **Scope**: design only. No routes, auth code, storage adapters, CAD files,
  or UI.
- **Planned against**: commit `555faf5` (working tree carried uncommitted
  polish at planning time); verified against live source on 2026-08-04.
- **Related**: `plans/010-builder-portal-spike.md`, `plans/009-proposal-intake-spike.md`,
  `docs/spikes/proposal-intake.md`.

---

## 1. Audience, deliverables, and current absence of a portal

### Marketing claims (current site)

| Claim | Evidence |
|---|---|
| Builders need dimensioned hardscape layouts, pool depth profiles, material callouts, lighting line diagrams | `PRODUCT.md:12`, `PRODUCT.md:26` |
| Deliverables are contractor-ready; presentation guidance + quote evaluation offered | `PRODUCT.md:27` |
| Builder track: white-label CAD renderings, dimensional drawings, material quantity sheets, 5-business-day turnaround | `BuilderPartnership.tsx:35-44` |
| "Request Builder Presentation Deck" CTA | `BuilderPartnership.tsx:47-50` |

### Actual delivery (repo reality)

| Fact | Evidence |
|---|---|
| The builder CTA opens the **same consultation modal** as homeowners | `BuilderPartnership.tsx:47-50` → `onOpenConsultation` → `ConsultationModal` |
| No router, session, API, database, or authorization helper anywhere | `App.tsx:24-33`, `App.tsx:69-74`, `package.json:15-41` |
| No auth, storage, PDF/CAD viewer, or server runtime dependency | `package.json:15-41` |
| No CAD files, project IDs, or builder accounts in the repo | repo grep (marketing copy + DOM `document` only) |

**Gap**: the site *describes* builder-ready packages but does not *deliver*
files through the web app. Delivery today is the same mailto handoff as the
homeowner flow.

---

## 2. Portal scope and roles (Step 2)

### MVP (smallest viable portal)

An authenticated builder sees **only projects explicitly assigned to that
builder**. Each project shows: status, latest package metadata, a controlled
download/view action, a revision label, and a contact/support path.

- No editing.
- No online CAD authoring.
- No quoting.
- No homeowner self-service.

### Deferred (intentionally out of MVP scope)

Multi-party comments, in-browser CAD editing, quote comparison, builder
analytics, bulk export, native mobile app, public share links.

### Roles and server-side permissions

| Role | List projects | View metadata | Download package | Upload revision | Invite user | Revoke access |
|---|---|---|---|---|---|---|
| Platform admin | yes (all) | yes | yes | yes | yes | yes |
| Southern Summit designer | assigned only | yes | yes | yes | no | no |
| Assigned builder | assigned only | yes | yes | no | no | no |
| Homeowner observer (optional) | own project only | yes | no | no | no | no |

- **Object-level authorization is required** on every project/document
  operation; a client-side hidden link is **not** authorization.
- Every MVP action has exactly one role allowed to perform it (or is marked
  intentionally public, e.g. the marketing CTA).

---

## 3. Document and access contracts (Step 3)

Synthetic examples only — no credentials or real files.

### 3.1 `BuilderAccount`

| Field | Type | Notes |
|---|---|---|
| `id` | string | stable server-generated ID |
| `email` | string | verified at invite |
| `domain_verified` | boolean | optional firm-domain verification (`To decide`) |
| `role` | enum | `admin`, `designer`, `builder`, `homeowner_observer` |
| `state` | enum | `active`, `revoked` |
| `created_at`, `last_login_at` | ISO-8601 | server set |

### 3.2 `Project`

| Field | Type | Notes |
|---|---|---|
| `id` | string | stable server-generated ID |
| `display_name` | string | homeowner-safe display name (no PII where avoidable) |
| `assigned_builder_ids` | string[] | server-managed assignments |
| `status` | enum | see §3.4 lifecycle |
| `revision` | int | latest revision number |
| `created_at`, `updated_at` | ISO-8601 | server set |

### 3.3 `SpecificationPackage`

| Field | Type | Notes |
|---|---|---|
| `id` | string | stable server-generated ID |
| `project_id` | string | FK to `Project` |
| `revision` | int | 1, 2, ... |
| `document_type` | enum | layout, depth_profile, material_schedule, lighting_diagram |
| `storage_key` | string | provider-neutral object key |
| `byte_size` | int | |
| `checksum` | string | for integrity verification |
| `mime_type` | string | server-validated |
| `created_by` | string | actor ID |
| `published_at` | ISO-8601 optional | |
| `revoked_at` | ISO-8601 optional | |

### 3.4 Lifecycle

`draft → internal_review → published → superseded → revoked`

| State | What a builder sees |
|---|---|
| `draft` | nothing (never exposed) |
| `internal_review` | nothing yet |
| `published` | metadata + download/view action |
| `superseded` | previous revision, marked superseded; latest shown first |
| `revoked` | link/URL returns 410 Gone; no content, no partial access |

A revoked URL must behave as revoked (410/403), not 404-obscured-but-cached.

### 3.5 Authorization and delivery rules

- A builder may access a package **only through a server-generated
  authorization decision** checking both account state (`active`) and project
  assignment. Never authorize by an unguessable URL alone.
- Downloads use **short-lived signed URLs** or a streaming endpoint; logs
  record package ID and actor ID, never document contents or sensitive
  homeowner details.
- Content-disposition set to `attachment` where download is intended; MIME
  sniffing prevented via explicit `Content-Type` + `X-Content-Type-Options`.

### 3.6 Security controls

| Control | Requirement |
|---|---|
| Session cookies | HttpOnly, Secure, SameSite; rotation on privilege change |
| CSRF / request authenticity | Fresh, unguessable token on every state-changing request |
| Rate limits | Per account/IP on login, list, and download endpoints |
| Audit events | Login, assignment, publish, download, revoke, delete — immutable append-only |
| Malware scanning | Required if uploads are ever allowed (`To decide` when scoped) |
| Content-disposition + MIME sniffing | As §3.5 |
| Retention/deletion | Owner decision (§5); delete cascade verified by tests |
| Incident response | Owner decision (§5) |

Production limits are not chosen here without evidence — anything numeric is
marked `To decide` or `To verify`.

---

## 4. Implementation boundaries and rollout (Step 4)

### Boundary A — Protected route in the existing React app

Small serverless API + object storage behind a `/builder` route in the same
app.

| Dimension | Notes |
|---|---|
| Auth/session integration | Same origin; session cookie reuse with plan 009 identity |
| Deployment coupling | One deploy surface; any marketing outage touches the portal |
| Document viewer | Need a viewer for layout/lighting diagrams (`To decide`) |
| Authorization testing | Same test harness as marketing app (Vitest + Playwright) |
| Auditability | Same logging pipeline as intake |
| Support burden | One app to maintain |
| Cost | Marginal — no second host |
| Migration/reversal | Remove route; CTA falls back to mailto |

### Boundary B — Separate hosted portal

A distinct app linked from the marketing CTA; marketing retains only the
public CTA.

| Dimension | Notes |
|---|---|
| Auth/session integration | Cross-origin — separate identity/session concerns; shared plan 009 backend |
| Deployment coupling | Independent deploys; marketing outage does not hide packages |
| Document viewer | Same `To decide` viewer requirement |
| Authorization testing | Same object-level rules; separate test run |
| Auditability | Same audit event contract, separate surface |
| Support burden | Second surface to maintain |
| Cost | Second host/build |
| Migration/reversal | Point CTA back to mailto; no code in marketing app |

**Vendor**: `provider selection required` — neither boundary picks a vendor;
both consume plan 009's selected provider decisions.

### Staged rollout (reversible, synthetic data only)

1. Domain/identity decision (from plan 009 §5 + §5 below).
2. Authorization model + object-level tests.
3. Admin-only project assignment.
4. One package type (layout) with audit logging.
5. Revoked-access tests (account revoke + URL revoke).
6. Pilot with **one controlled builder**.
7. Wider availability — **only after** a verified support path exists.

The existing builder CTA (`BuilderPartnership.tsx:47-50`) and mailto fallback
stay in place until the portal is proven.

---

## 5. Owner decisions

| # | Decision | Options to consider | Owner |
|---|---|---|---|
| 1 | Builder identity proof | Verified email, firm-domain verification, or manual approval | Studio owner |
| 2 | Who assigns projects | Admin only, or designers too | Studio owner |
| 3 | Document retention | e.g. tied to project lifetime, or fixed window after `revoked` | Studio owner |
| 4 | Data residency | Match intake decision (plan 009 §5) | Studio owner |
| 5 | Package size/viewer support | Max size; native PDF viewer vs diagram viewer | Studio owner |
| 6 | Revocation SLA | Time to make a revoked package unavailable | Studio owner |
| 7 | Audit-log retention | e.g. 12 months, 24 months, indefinite | Studio owner |
| 8 | Support escalation | Who fields builder issues; fallback process | Studio owner |
| 9 | Homeowner portal access | Never, or read-only observer in future | Studio owner |

---

## 6. Future verification checklist (for the implementation plan)

- Role/permission matrix tests (every action × every role).
- Project-assignment IDOR tests (builder A cannot read builder B's package).
- Revoked-account tests (no session survives revoke).
- Expired/replayed signed-URL tests.
- Document MIME and size tests (server-side validation).
- Audit-event tests (every protected action records actor + package, no PII).
- Playwright keyboard/focus/error coverage for the portal.
- Baseline stays green: `npm run typecheck`, `npm run build`, `npm run test:run`.

---

## Notes

- This spike does not build a viewer or auth flow; it is a decision artifact
  for a later implementation plan.
- Plan 009 owns intake/project creation; this spike consumes the resulting
  project and assignment model rather than duplicating it.
- Object-level authorization, revocation behavior, audit logs, and the
  marketing-claims-vs-actual-access boundary are the review focus.
- No credentials, tokens, CAD files, or real customer data appear in this
  artifact.
