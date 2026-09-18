# YADD Screen Specifications — Working Draft

> **Status:** IN PROGRESS — APPROVED UI CONTRACTS THROUGH PUB-03
>
> This document records detailed screen-level UI contracts derived from the current project requirements and explicitly reviewed UI decisions. It does not override the Decision Register, SRS, or Business Rules.
>
> **Important:** an `Approved UI Contract` means the screen content/actions/navigation are frozen for design work unless explicitly reopened. It does **not** turn a UX choice into a Business Rule or Decision Register entry.

## Governance

Use this file for detailed specifications after the screen inventory and user flows are reconciled.

Information classification used here:

- **Requirement-backed:** directly supported by current SRS / Business Rules / Decision Register.
- **Derived UI:** presentation/interaction behavior derived from approved requirements without changing business meaning.
- **Approved UI Decision:** explicitly approved during UI review; governs design consistency but is not automatically a Decision Register business decision.
- **Open / Needs Verification:** not yet stable enough to freeze.

## Per-Screen Template

- Screen ID.
- Screen name.
- Contract status.
- Goal.
- Primary actor.
- Related FR / Use Case / Decision / Business Rule.
- Entry conditions.
- Required data.
- Public/private visibility classification.
- Information hierarchy.
- Main actions.
- Secondary actions.
- Authentication/authorization requirement.
- Validation rules visible to the UI.
- Loading / empty / error / pending states.
- Navigation in/out.
- Responsive behavior.
- Accessibility / RTL notes.
- Explicit exclusions.
- Open policy dependencies.
- Figma frame/component mapping once stable.

---

# PUB-01 — Public Home / Discovery

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest; public discovery is also reusable for an authenticated User.
- **Related sources:** `FR-GST-01`; `DEC-012`; `DEC-077`; `BR-001`; `BR-044..046`; `UF-00`; Screen Inventory `PUB-01`.
- **Classification:** Requirement-backed core + approved UI decisions for category shortcut and mobile global navigation.

## Goal

Provide the public entry point to YADD and expose the two approved discovery paths:

1. direct provider search;
2. publish a request.

Guest browsing/search remains public. Publishing a request is a protected action and requires Authentication.

## Required content and hierarchy

### Header

- Approved YADD identity / logo.
- No unapproved slogan is required by this contract.
- Guest is not presented as a permanent account role.

### Discovery hero

Primary prompt:

`ما الذي تحتاجه؟`

Search field:

`ابحث عن خدمة أو منتج`

The search field starts the direct-search path.

### Primary discovery paths

#### `ابحث عن مقدم`

- Public action.
- Opens `PUB-02 Search / Filter`.

#### `انشر طلبًا`

- Protected action.
- May remain visible to Guest.
- Guest activation opens `PUB-06 Protected Action Authentication Gate`.
- No Request is created before successful Authentication.

### Browse categories

Section:

`تصفح الفئات`

This is an **Approved UI Decision**, not an independent Business Rule.

Current presentation examples must remain clearly examples rather than a frozen taxonomy. Repository-supported examples currently include:

- كهرباء
- تكييف
- صيانة منزلية
- حلويات
- مخبوزات
- هدايا يدوية

**Approved UI Decision:** selecting a displayed category goes directly to `PUB-03 Search Results` with that category selected. The user can then modify search/filter criteria.

## Actions and navigation

| UI element | Behavior |
|---|---|
| Search field | Open `PUB-02`; preserve entered search text when applicable |
| ابحث عن مقدم | Open `PUB-02` |
| انشر طلبًا | Guest → `PUB-06` |
| Category card | Open `PUB-03` with the selected category |

## Authentication / authorization

- Public browsing/search requires no Authentication.
- Create Request remains protected according to `DEC-077 / BR-045 / BR-046`.
- Backend/API remains the final authorization boundary; the UI redirect is not the security mechanism.

## Mobile global navigation — Approved UI Decision

On Mobile, Public Home includes the global bottom navigation:

`الرئيسية | البحث | تسجيل الدخول/الحساب | المزيد`

- `الرئيسية` is active on `PUB-01`.
- The authentication/account item reflects session state; this does not create a new account model.
- This navigation pattern must remain consistent on applicable public mobile screens unless explicitly reopened.

On larger responsive layouts, the same navigation functions may be represented in a header/sidebar rather than a literal bottom bar.

## Responsive behavior

- **Mobile:** primary actions remain prominent; category cards adapt to the available grid width.
- **Tablet/Desktop:** the layout may use more columns and wider containers.
- Responsive adaptation must not add or remove product functions.

## Explicit exclusions

Do not add to `PUB-01` without a new verified requirement/decision:

- service-price filter;
- years-of-experience display/filter;
- corporate/company account discovery;
- GPS/radius discovery;
- precise/private address;
- phone/private contact information;
- verification artifacts;
- subscription internals;
- advertising blocks;
- fabricated ratings/statistics;
- unapproved ranking such as `الأقرب لك`.

---

# PUB-02 — Search / Filter

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest / User.
- **Related sources:** `FR-GST-02`; `FR-003`; `DEC-031`; `DEC-074`; `DEC-076`; `DEC-077`; `BR-001`; `BR-041`; `BR-043`; `BR-044`; `UF-00`; Screen Inventory `PUB-02`.
- **Classification:** Requirement-backed search + derived UI filter controls.

## Goal

Allow the user to search for Providers using the project-supported public discovery criteria without introducing unapproved filters.

## Required fields

1. Search text: `ابحث عن خدمة أو منتج`.
2. Provider type: `خدمة` or `منتج`.
3. Category.
4. District.
5. Neighborhood.

The Provider Type control is a derived UI control based on the exclusive `SERVICE` / `PRODUCT` Provider Profile model.

Category options must be compatible with the selected Provider Type. A category from the opposite type must not be presented as a valid selection.

## Main actions

### `بحث` / `عرض النتائج`

- Opens `PUB-03 Search Results`.
- Preserves the selected search/filter criteria.

### `إعادة تعيين`

- Clears the current UI search/filter selections.
- Does not create or mutate a business entity.

### Back

- Returns to the previous screen.
- Does not create a Request, Conversation, or Transaction.

## Navigation rules

Two valid public discovery paths are intentionally supported:

`PUB-01 → PUB-02 → PUB-03`

and the approved category shortcut:

`PUB-01 → Category → PUB-03`

`PUB-02` is therefore not a mandatory intermediate screen for every discovery action.

## States

- **Default:** no filters selected.
- **Selected filters:** one or more criteria selected.
- **Loading:** filter options or search request in progress.
- **Error:** required search/filter data could not be loaded.
- **No Results:** belongs to `PUB-03`, not `PUB-02`.

## Mobile global navigation

Use the approved Public mobile global navigation:

`الرئيسية | البحث | تسجيل الدخول/الحساب | المزيد`

`البحث` is active.

## Responsive behavior

- **Mobile:** filters are vertically stacked.
- **Tablet/Desktop:** filters may use rows, columns, or a filter panel/sidebar.
- The available filters and actions remain functionally identical across breakpoints.

## Explicit exclusions

Do not add without a new verified requirement/decision:

- price filter;
- years of experience;
- GPS radius;
- `الأقرب لي` ranking;
- company/corporate filter;
- verification-level filter;
- subscription filter;
- completed-transaction-count filter;
- rating filter;
- recommendation/ranking algorithm controls.

---

# PUB-03 — Search Results

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest / User.
- **Related sources:** `FR-GST-02..04`; `FR-003`; `DEC-031`; `DEC-052`; `DEC-064`; `DEC-077`; `BR-017`; `BR-035`; `BR-044..047`; `UF-00`; Screen Inventory `PUB-03`.
- **Classification:** Requirement-backed result data + approved UI decision for whole-card navigation.

## Goal

Present public Providers matching the active discovery criteria so the user can inspect public information and open the selected Provider's public profile.

Search results are publicly browsable; Authentication is not required merely to view the list or open a public profile.

## Header / search context

The screen includes:

- title: `نتائج البحث`;
- active filter/search summary where useful;
- `تعديل البحث` action returning to `PUB-02` with current criteria retained.

Do not fabricate result counts for static design. A numeric result count may be shown only when it represents system-supplied runtime data.

## Provider result card — public data

A result card may display:

- public display name;
- profile image/logo when available;
- Provider Type: Service Provider or Product Provider;
- compatible category/categories;
- district + neighborhood / approved general service-area information;
- public rating indicator when actual data is available;
- completed YADD transaction count when actual public data is available;
- Portfolio/Catalog preview when available.

For a Product Provider, the public display name may use the optional Trade Name according to the current Product Provider rules.

### Placeholder rule

Static Figma/mockup data must not be presented as factual user data. Where a metric value is not grounded, use a visibly neutral placeholder such as `—` rather than inventing a rating or completed-transaction count.

## Primary interaction — Approved UI Decision

**The whole Provider Card is clickable/tappable.**

Activating the card opens:

`PUB-04 Public Provider Profile`

No separate `عرض الملف` button is required because it would duplicate the same action.

## Secondary action

### `تعديل البحث`

Returns to `PUB-02` with the current criteria retained.

## States

### Loading

Use an appropriate loading/skeleton state for the result list.

### Results

Display the matching Provider Cards.

### Empty

Show a clear no-results state, e.g.:

`لم نجد نتائج مطابقة لبحثك.`

with action:

`تعديل البحث`

### Error

Show a clear load/error state with action:

`إعادة المحاولة`

## Mobile global navigation

Use the same approved public Mobile navigation:

`الرئيسية | البحث | تسجيل الدخول/الحساب | المزيد`

`البحث` remains active.

## Responsive behavior

- **Mobile:** single-column Provider Card list.
- **Tablet:** wider list or multi-column layout when usable.
- **Desktop:** result grid/list with search/filter context or panel as appropriate.
- Provider Card functionality and public/private data boundaries do not change across breakpoints.

## Public-data exclusions

Provider Cards must not expose:

- phone number;
- WhatsApp/private direct-contact information;
- precise/private address or GPS;
- verification documents/artifacts;
- subscription internals;
- years of experience;
- service price as a search-result attribute;
- deposit/payment information;
- `number of customers`;
- fabricated rating/transaction statistics.

## Unapproved result controls

Do not add unless a later requirement/decision authorizes them:

- `الأقرب لك`;
- `الأعلى تقييمًا`;
- `الأكثر خبرة`;
- ranking/sort selector;
- sort by price;
- Favorite;
- Quick Call;
- Quick Chat;
- `اطلب الآن`.

---

## Rule

A screen specification may describe presentation and interaction details, but must not silently create a new business rule or requirement.

If an approved UI contract later conflicts with a higher-authority project source, the conflict must be identified and classified as Synchronization, Decision, or Verification before changing the design.
