# YADD UI Foundation — Working Baseline

> **Status:** IN PROGRESS — VISUAL CONSISTENCY BASELINE APPROVED 2026-09-18
>
> This file governs reusable visual consistency across all YADD wireflows and high-fidelity screens. It does not create or modify Business Requirements.

## 1. Governing Principle

All current and future YADD wireflows/screens must use one shared design system.

A wireflow may differ in content, information hierarchy, or valid controls because its function differs, but it must **not** introduce a separate visual language.

The following are global unless this file is explicitly reopened:

- brand/color tokens;
- typography families and named text styles;
- button component sizing and states;
- input/control styling;
- spacing and radius scale;
- icon style;
- card/surface treatment;
- RTL/LTR behavior;
- navigation component styling;
- loading/empty/error state language.

Visual implementation must prefer shared Figma Variables, Styles, and Components over locally formatted copies.

## 2. Color Tokens — Current Shared Baseline

Current live/working semantic tokens:

| Semantic token | Value | Use |
|---|---:|---|
| Text / Primary | `#0F172A` | Primary text / Deep Navy |
| Text / Secondary | `#64748B` | Secondary text |
| Background / Page | `#F8FAFC` | Main page background |
| Background / Surface | `#FFFFFF` | Cards, fields, dialogs |
| Action / Primary | `#10B981` | Primary CTA / active brand action |
| Accent | `#FBBF24` | Limited accent/highlight use |
| Border / Default | `#F1F5F9` | Standard control/card border |
| Status / Danger | `#DC2626` | Destructive/error state where semantically appropriate |

### Usage rules

- Green is the primary action/active-state color.
- Yellow is a limited accent and must not become the dominant interface surface.
- Navy/neutral tones carry most text and structural UI.
- Large UI areas remain white/off-white for clarity.
- Do not create new wireflow-specific brand colors.
- Status colors must represent status semantics rather than decoration.

These tokens are the current UI baseline. Accessibility/contrast must still be validated before final production freeze.

## 3. Typography Baseline

- **Arabic UI:** Tajawal.
- **Latin UI:** Inter.
- Use the shared named Figma text styles rather than manually styling screen-by-screen.
- Arabic content is the primary product language and must visually lead the hierarchy.
- English/Latin strings are used only where terminology, identifiers, email/URL, or bilingual brand treatment requires them.

Current Figma text-style families include the shared Arabic hierarchy (Display / Heading / Title / Body / Caption) and Latin Body / Label styles.

Exact production metrics must be synchronized from the shared Figma styles; individual wireflows must not invent alternative font families, arbitrary weights, or private type scales.

## 4. Directionality — Mandatory RTL Rule

YADD is Arabic-first.

- Screen/page direction: **RTL**.
- Arabic headings, labels, body text, helper text, cards, and form copy: right-aligned according to the component pattern.
- Horizontal navigation/order must be authored for RTL, not merely visually mirrored after LTR design.
- Back/forward and directional icons must respect RTL meaning.
- Email addresses, URLs, Latin identifiers, and numeric strings may use LTR internally when required for readability.
- Mixed Arabic/Latin content must preserve the overall RTL information hierarchy.
- No wireflow may switch to an LTR layout merely because it contains English technical labels.

## 5. Buttons — Shared Component Contract

### Button content alignment — Approved 2026-09-18

Button content must be laid out as **one centered component group**, not as independently positioned text and icon layers.

- Current standard control height remains **52 px**.
- When an action icon is used, the icon and label use shared Auto Layout.
- Use the shared spacing token between icon and label (current baseline: `spacing/2`, approximately 8 px).
- In Arabic action buttons, the normal functional icon sits on the RTL-leading side of the label unless directional semantics require another treatment.
- The combined icon+label group is centered as a whole.
- Do not center the text independently while pinning the icon to an arbitrary edge.
- Do not use icon placement that makes two visually identical buttons appear to have different alignment rules.


The current Figma Button component baseline includes:

- Primary button.
- Secondary button.
- shared control height: **52 px** in the current component baseline.

Rules:

- Reuse the Button component/variants; do not redraw buttons per wireflow.
- Primary CTA uses the shared Primary variant.
- Secondary/back/cancel actions use the approved Secondary/appropriate shared variant.
- Destructive actions such as Block/Cancel/Delete-like operations must use semantic destructive styling only when the action is actually destructive.
- Button height, corner radius, typography, icon placement, horizontal padding, and state treatment must remain component-driven.
- Do not make a button visually larger/smaller simply because a later wireflow was designed separately.
- If a new button size is genuinely required for responsive/layout reasons, it must be added as a named global component variant, not as a local exception.

## 6. Inputs and Controls

Search fields, select fields, text inputs, OTP controls, checkboxes/radios, filters, and validation states must reuse shared control patterns.

The following must remain consistent across flows:

- control height family;
- label placement;
- helper/error text treatment;
- border and focus behavior;
- icon placement;
- disabled/read-only states;
- spacing between label/control/helper text.

Do not use one field visual style in Authentication and a different field visual style in Request/Provider flows unless the difference represents a documented component state.

## 7. Cards, Surfaces and Lists

Provider cards, Request cards, Response cards, Transaction cards, settings rows, and admin rows must derive from a shared surface system.

Consistency requirements:

- same radius family;
- same border/elevation logic;
- same title/body/caption hierarchy;
- same internal spacing scale;
- same selected/pressed/disabled patterns.

Functional information can differ; the visual grammar must not.

## 8. Spacing / Radius / Layout

Use the shared Figma layout variables/components wherever available.

Rules:

- do not introduce arbitrary one-off spacing values while building later wireflows;
- use a common page/container rhythm;
- use a common card/control gap rhythm;
- use the same radius scale for comparable component classes;
- responsive layouts may reflow, stack, or change column count without changing the component's visual identity.

## 9. Mobile App Bar / Header Alignment

Use defined header patterns rather than placing icons opportunistically.

### Top-level public/home screens

- Brand identity may occupy the RTL-leading/right area according to the shared Header component.
- Only approved global actions may occupy the opposite action area.
- Do not crowd the brand with unrelated contextual action icons.

### Detail screens

- Use the shared RTL Detail App Bar.
- Back/navigation control occupies the RTL-leading/right navigation slot and uses the correct RTL directional icon.
- Screen title uses the shared title alignment rule.
- Approved contextual actions, when they exist, occupy the opposite/left action slot.
- If no contextual action is approved, do not invent one merely to balance the header visually.
- Do not mix a logo, Share icon, and Back icon in ad-hoc positions.

## 10. Navigation Consistency

Approved navigation models remain function-specific but visually componentized:

- Public Mobile: `الرئيسية | البحث | تسجيل الدخول/الحساب | المزيد`.
- Beneficiary Mobile: `الرئيسية | البحث | طلباتي | الحساب`.
- Provider Mobile: `الرئيسية | الطلبات | معاملاتي | الحساب`.

These may use different labels because they serve different portals, but they must use the **same navigation component language**: icon family, label style, active/inactive treatment, sizing, spacing, and safe-area behavior.

Authentication/onboarding focused flows intentionally omit the public bottom navigation, but still use the same colors, type styles, buttons, fields, and surfaces.

### Administration desktop baseline

- `ADM-01..07` are **Desktop-only** in the current MVP design package.
- Admin uses a shared YADD desktop shell (e.g. sidebar/header) rather than Mobile Bottom Navigation.
- Desktop-only does **not** permit a separate visual identity: the same YADD tokens, Tajawal/Inter typography, RTL behavior, 52px shared Button baseline, inputs, cards, radius/spacing scale, icon family, and states remain mandatory.

## 11. Icons — Mandatory Shared Icon System

- Use **one coherent vector icon family/style** across YADD.
- Production UI must not use emoji as interface icons.
- Do not use arbitrary Unicode glyphs such as `✦`, `◇`, `◫`, `◉`, `★` as icon substitutes.
- Comparable actions reuse the same icon throughout all wireflows.
- Icon direction must respect RTL where directional meaning exists.
- Default functional icon optical size is kept within the shared 20–24 px family; component-specific sizes must be named variants.
- Icon-only interactive controls must provide a sufficiently large interaction target; current design target is at least 44×44 px where layout permits.
- Important or non-obvious actions use **icon + Arabic label**, not an unexplained icon alone.
- Category icons, if used, share the same stroke/fill language, optical size, container size, and color treatment.
- Do not introduce random per-category colors unless a future approved taxonomy/design rule defines them.
- Icons are semantic aids, not decoration.


## 12. States

Loading, empty, error, success, disabled, warning, pending, and destructive states must use shared visual patterns.

A business state may have different copy, but should not receive a completely new visual treatment in each wireflow.

## 13. Cross-Wireflow Consistency Gate

Before any wireflow is considered visually complete, check:

1. Colors come from shared tokens.
2. Text uses Tajawal/Inter shared styles.
3. Arabic layout is RTL.
4. Buttons are shared Button component variants; current standard height is 52 px.
5. Inputs/filters reuse shared controls.
6. Cards/surfaces use the common radius/spacing language.
7. Navigation uses the relevant approved model but shared visual component treatment.
8. Icons use the same vector family; no emoji/Unicode-icon substitutes are present.
9. Button icon+label groups use shared alignment rather than independent absolute positioning.
10. App-bar/navigation actions use the approved structural slots.
11. Static mockup data forms one coherent scenario and matches visible filters/context.
12. No new visual token/component was introduced locally without first updating the design system.
13. Functional differences come from the approved Screen Contract, not from designer improvisation.

A wireflow that fails this gate is **not design-consistent**, even if its individual screens look polished.

## 14. Governance

If a screen requires a new visual pattern:

`Need → Design-system proposal → review → shared component/token update → screen use`

Do not:

`Screen-specific improvisation → copy into one wireflow only`

If Figma and this baseline disagree, identify the mismatch as Synchronization / Design Decision before continuing.

## 15. Open Production Work

Still requiring final validation/freeze:

- exact full typography metrics exported/documented from Figma;
- complete spacing token table;
- complete radius token table;
- full component state matrix;
- accessibility/contrast validation;
- responsive breakpoint/layout specification;
- final production wordmark construction.

Until those are closed, existing shared Figma variables/styles/components remain the working implementation source; local deviations are not allowed.
