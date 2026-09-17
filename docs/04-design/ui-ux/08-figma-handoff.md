# YADD Figma Handoff — Working Draft

> **Status:** IN PROGRESS — SYNCHRONIZED 2026-09-17

This file tracks the handoff between repository documentation and Figma. Figma is the editable visual-design workspace, not the source of business requirements.

## Current Figma File

- File: `YADD — Visual Identity & Interface Design`
- URL: `https://www.figma.com/design/OVEqHoGvcMJZYgsIPa2MQu`
- Account/plan context: University/student Figma account.
- Current implementation basis: Web-first project direction; approved narrow wireflow frames are represented as responsive web at a 390px viewport, not as a claim that a native Flutter client is the current primary interface.

## Current Figma Pages

| Page | Purpose | Status | Notes |
|---|---|---|---|
| `00 — Cover` | Design file cover | IMPLEMENTED | Uses working YADD identity |
| `01 — Brand Foundations` | Working logo/icon, bilingual lockup, palette and typography | IMPLEMENTED / WORKING | Brand direction approved; hand geometry still requires refinement |
| `02 — UI Foundation` | Semantic colors, spacing, radius and typography hierarchy | IMPLEMENTED / WORKING | Values are working UI tokens pending formal repository freeze where applicable |
| `03 — Components` | Reusable components used by current approved flows | IN PROGRESS | Button, Search Field, Select Field, Provider Result Card currently available |
| `04 — Wireflow 01` | Public browsing and provider search flow | IMPLEMENTED / APPROVED WORKING WIREFLOW | Functional/content QA completed against current project scope |

## Working Foundations Implemented

### Color variables

Figma currently contains:

- `YADD / Primitives`
- `YADD / Semantic Colors`
- `YADD / Layout`

Working brand values currently represented in Figma:

- Primary Green `#10B981`
- Energetic Yellow `#FBBF24`
- Deep Navy `#0F172A`
- Off White `#F8FAFC`

These are represented as **working design tokens**. Their presence in Figma does not independently convert them into a higher-level approved requirement or override repository governance.

### Typography

- Arabic: `Tajawal`
- Latin: `Inter`

Local text styles have been created for current display, heading, title, body, caption and Latin supporting text needs.

### Brand asset status

The Figma file contains an editable **Working Vector Master** following the adopted logo direction:

- white open/spread hand with wrist;
- green rounded-square background;
- two yellow motion/accent marks;
- bilingual `يَد | YADD` lockup.

The symbol is not yet a production-final logo master because hand geometry refinement remains open in `01-brand-system.md`.

## Wireflow 01 — Public Browsing & Provider Search

### Flow

`Public Home → Search / Filter → Search Results → Public Provider Profile → Protected Action Authentication Gate`

### Figma implementation

The following screen frames are implemented on `04 — Wireflow 01`:

| Screen | Repository mapping | Figma status | Review status |
|---|---|---|---|
| Public Home | `PUB-01` | IMPLEMENTED | Approved working wireflow |
| Search / Filter | `PUB-02` | IMPLEMENTED | Approved working wireflow |
| Search Results | `PUB-03` | IMPLEMENTED | Approved working wireflow |
| Public Provider Profile | `PUB-04` / `PUB-05` presentation | IMPLEMENTED | Approved working wireflow |
| Protected Action Authentication Gate | `PUB-06` | IMPLEMENTED | Approved working wireflow |

### Scope/content QA applied

Wireflow 01 was checked to avoid unsupported assumptions that appeared in earlier generated visual drafts. Current Figma implementation follows these constraints:

- No corporate/large-store provider example is used.
- No location outside Amanat Al Asimah — Sana'a is introduced.
- Search/filter uses provider type, category, district and neighborhood concepts; there is no service-price filter.
- No years-of-experience field is shown.
- Search-result/provider-profile content is limited to approved public concepts such as provider name, type/category, general service-area information, public rating/indicators and completed YADD transaction count where applicable.
- No public phone number, precise private address, verification artifact, subscription internal, transaction/invoice/report data is exposed.
- `Contact / Inquire` and `Create Request` are protected actions for a Guest and lead to the authentication gate.

Mock names/numbers in the wireframe are presentation placeholders, not Evidence, Facts, real users, or project data.

## Reusable Components Currently Implemented

- `Button` — Primary / Secondary working variants.
- `Search Field`.
- `Select Field`.
- `Provider Result Card`.

Component coverage will expand only as approved/derived screens require additional patterns.

## Prototype Status

- Visual screen sequence: IMPLEMENTED.
- Formal clickable prototype/reaction wiring: NOT YET BASELINED.
- Subsequent flows will be added after review/approval using the same repository-first process.

## Handoff Rule

Only stable design decisions should be moved into Figma as reusable variables/components. Experimental AI-generated visual boards are references only unless explicitly adopted and reconstructed as controlled design assets.

## Synchronization Rule

If Figma and repository specifications disagree, do not silently pick one. Identify whether the mismatch requires:

- Synchronization,
- Design Decision,
- Requirement/Business Rule verification,
- or rollback of an unsupported design assumption.
