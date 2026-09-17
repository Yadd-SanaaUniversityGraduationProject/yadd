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
- District + neighborhood location model.
- No corporate/large-store provider examples.
- No service-price search filter.
- No years-of-experience field.
- No public phone number or precise private address.
- No verification artifacts or other sensitive/private data in public profiles.

## Synchronization Rule

If Figma and repository specifications disagree, do not silently pick one. Identify whether the mismatch requires:

- Synchronization,
- Design Decision,
- Requirement/Business Rule verification,
- or rollback of an unsupported design assumption.

This update is a **Synchronization/Correction** of implementation status; it does not change project scope, requirements, or the approved Wireflow 01 logic.