# YADD Figma Handoff — Working Draft

> **Status:** IN PROGRESS — LIVE VERIFIED 2026-09-17

This file tracks the handoff between repository documentation and Figma. Figma is the editable visual-design workspace, not the source of business requirements.

## Current Figma File

- File: `YADD — Visual Identity & Interface Design`
- URL: `https://www.figma.com/design/OVEqHoGvcMJZYgsIPa2MQu`
- Account/plan context: University/student Figma account.

## Live-Verified Figma Pages

A live Figma metadata check on 2026-09-17 showed that the file initially exposed only `00 — Cover`. Therefore earlier handoff claims that `02 — UI Foundation`, `03 — Components`, and `04 — Wireflow 01` were already present in this specific file were incorrect and have been rolled back here rather than preserved as assumptions.

After restoring write access, the following pages are currently verified:

| Page | Purpose | Status | Notes |
|---|---|---|---|
| `00 — Cover` | Design file cover | VERIFIED | Existing page |
| `01 — Brand Foundations` | Approved symbol master, variants, size tests, working bilingual lockup | VERIFIED / IMPLEMENTED | Created after live verification |

The following planned pages are **not currently verified as present in Figma** and must be recreated/synchronized before being marked implemented:

- `02 — UI Foundation`
- `03 — Components`
- `04 — Wireflow 01`

Their repository specifications and prior design approvals remain valid working inputs; only the Figma implementation status was corrected.

## Brand Asset Status

The approved **Refined Vector Candidate v3** is now present in Figma as an editable vector on `01 — Brand Foundations` and is treated as the current approved symbol master.

The page contains:

- `YADD / Symbol / Master v3`.
- Primary symbol treatment.
- Light treatment.
- Dark treatment.
- Monochrome treatment.
- Small-size visual tests at `48 px`, `32 px`, and `24 px`.
- A separate working bilingual `يَد | YADD` lockup.

The symbol master is approved. The exact production construction of the bilingual wordmark, clear-space rule, minimum-size specification, and final export package remain open production tasks.

## Working Brand Values Used in Figma

- Primary Green: `#10B981`
- Energetic Yellow: `#FBBF24`
- Deep Navy: `#0F172A`
- Off White: `#F8FAFC`

These remain working design tokens until accessibility/production freeze is synchronized in `05-ui-foundation.md`.

## Wireflow 01 — Repository Approval vs Figma Status

Approved working flow:

`Public Home → Search / Filter → Search Results → Public Provider Profile → Protected Action Authentication Gate`

The flow and its content constraints remain approved in the repository working package. However, as of this live verification, its Figma page is **NOT CURRENTLY VERIFIED / NEEDS RECREATION**.

When recreated, it must preserve the approved constraints:

- Sana'a / Amanat Al Asimah scope only.
- User-facing location uses Neighborhood only; District remains internal/derived under the existing location model.
- No corporate/large-store provider examples.
- No service-price search filter.
- No years-of-experience field.
- No public phone number or precise private address.
- No verification artifacts or other sensitive/private data in public profiles.

## Requirements Closure Constraints — 2026-09-18

Any recreated/account/provider/transaction screens must now preserve DEC-078..090:

- Create Account uses four name fields + mobile + password + optional email + phone OTP.
- Login accepts verified phone or verified email; portal switch remembers last portal.
- Product Provider may show an optional Trade Name; Service Provider alone has Government-ID Identity Verification UI.
- Requests expose 24h/48h reminders and 72h expiry with Republish as new.
- Direct Transaction Start confirmation expires after 12h.
- Invoice review exposes 24h/48h reminders and Overdue at 72h without Auto-Approval.
- Provider rating is Hybrid, not stars-only.
- Subscription is 30 days for both provider types with -3 day/-24h reminders.
- Block must not hide/break an Active Transaction; moderation outcomes are human-authorized.

## Cross-Wireflow Visual Consistency Rule — Approved 2026-09-18

All Figma wireflows and final screens must derive from the shared UI Foundation rather than being styled independently.

Mandatory consistency includes:

- shared semantic colors / Figma variables;
- Tajawal for Arabic and Inter for Latin;
- Arabic-first RTL layout and alignment;
- shared Button component variants, with the current standard Button component height of 52 px;
- shared input/select/search components;
- shared spacing/radius/surface language;
- shared icon family;
- shared navigation visual treatment;
- shared loading/empty/error/status patterns.

Different wireflows may contain different functions, fields, and navigation labels only when their approved Screen Contracts require those differences. Visual styling alone must not create a new function, remove a function, or create a wireflow-specific design system.

Before a Figma wireflow is marked complete, it must pass the consistency gate defined in `05-ui-foundation.md`.

### Administration presentation

- `ADM-01..07` are designed as **Desktop-only** interfaces in the current MVP Figma package.
- Do not create Admin Mobile frames or Admin Mobile Bottom Navigation.
- Admin desktop layouts must still reuse the same shared YADD design system and components; Desktop is a layout/presentation decision, not a second product style.

### Location UI synchronization

For user-facing location UI, the approved convention is now **Neighborhood only**. District remains internal/derived from the selected Neighborhood under the existing data/business model and must not reappear as an independent UI selector unless the decision is reopened.


## Wireflow 01 — Approved Visual Baseline v4 — 2026-09-18

The user explicitly approved the synchronized public-browse/search baseline in Figma.

- Figma root: `40:55`
- Figma name: `Wireflow 01 — APPROVED Visual Baseline v4`
- Scope: `PUB-01 → PUB-02 → PUB-03 → PUB-04 → PUB-06`
- Classification: **Approved Visual Baseline**.
- This approval freezes the visual-language direction for subsequent wireflows unless explicitly reopened.
- Subsequent wireflows must derive from the same shared design system and may differ only where their approved Functional Screen Contracts require different content/actions.

### Synchronized corrections included in v4

- District removed from user-facing Search UI; Neighborhood remains the visible location level.
- Public guest navigation corrected to use Sign In/Account semantics rather than Beneficiary-only navigation.
- Unsupported `الأقرب لك` ranking removed.
- Fabricated numeric search-result count removed.
- Public Provider location changed to Neighborhood-only presentation.
- Unsupported profile quick-feature cards removed.
- Protected Authentication Gate includes an explicit return-to-browse action.
- Unapproved slogan-like header copy replaced with contract/scope-oriented copy.


## Visual QA Corrections from Wireflow 01 Review — Approved 2026-09-18

The previously approved `Wireflow 01 — APPROVED Visual Baseline v4` is **reopened for visual correction** after explicit user review. Its approved Functional Screen Contracts remain unchanged.

The following rules are now mandatory before v4 can again serve as the visual reference for later wireflows:

1. **No emoji / arbitrary glyph icons.** Replace emoji and Unicode-symbol placeholders with one coherent vector icon family and semantic icons.
2. **Standard component alignment.** Button icon + label must use shared Auto Layout and be centered as one group. App-bar icons/actions use defined RTL slots.
3. **Coherent search scenario.** A static Search Results frame must visibly correspond to its active search/filter context. Do not show unrelated Service/Product categories as though they came from one narrow search.
4. **Provider Profile header correction.** `PUB-04` does not currently approve a Share action. The existing Share icon in the visual baseline is therefore an unsupported design addition and must be removed rather than merely repositioned.
5. **Low-digital-familiarity UX direction.** Use restrained, semantically clear icons to reinforce important navigation/actions. Important or unfamiliar actions should normally pair the icon with a clear Arabic label.
6. **No generic AI-mockup visual language.** Avoid decorative sparkles, arbitrary category colors, emoji-like symbols, and repeated floating-icon tiles that do not communicate a documented function.

### Approval-state effect

Until these corrections are applied and visually checked, `40:55` remains the latest approved-content baseline but is **not the final visual template to copy forward**.

Do not propagate its known visual defects into AUTH/BEN/PRO/Admin wireflows.

## Synchronization Rule

If Figma and repository specifications disagree, do not silently pick one. Identify whether the mismatch requires:

- Synchronization,
- Design Decision,
- Requirement/Business Rule verification,
- or rollback of an unsupported design assumption.

This update is a **Synchronization/Correction** of implementation status; it does not change project scope, requirements, or the approved Wireflow 01 logic.