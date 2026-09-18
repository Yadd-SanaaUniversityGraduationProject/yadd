# YADD Screen Specifications — Working Draft

> **Status:** IN PROGRESS — APPROVED UI CONTRACTS THROUGH BEN-07
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


## Approved Location UI Convention — 2026-09-18

- **Approved UI Decision:** user-facing discovery/request/provider-location interfaces expose **Neighborhood only** as the location selector/display level.
- A standalone District selector/display is not shown in those interfaces.
- The current underlying project model remains `District + Neighborhood`; District is derived internally from the selected Neighborhood and may remain stored/used by backend/data rules.
- This UI decision does not override `DEC-031`, `FR-003`, or `FR-005`.
- **Needs Verification — LOC-DATA-Q01:** the authoritative Neighborhood list and the mapping of each Neighborhood to its District must be verified before implementation.
- Precise/private address and GPS remain outside public display.

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
4. Neighborhood / `الحي`.

**Approved UI Decision:** no standalone District field is shown to the user. The system derives District internally from the selected Neighborhood while retaining the current underlying `District + Neighborhood` model.

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
- Neighborhood / approved general service-area information; District is not shown as a separate user-facing value;
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

# PUB-04 — Public Provider Profile

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest / User.
- **Related sources:** `FR-GST-03/04`; `DEC-031`; `DEC-052`; `DEC-064`; `DEC-077`; `BR-017`; `BR-035`; `BR-044..047`; `UF-00`; Screen Inventory `PUB-04`.
- **Classification:** Requirement-backed public profile + approved UI decisions for the primary CTA and navigation treatment.

## Goal

Allow the user to assess a Provider using public information only before deciding whether to communicate/inquire.

## Public information

The profile may display:

- profile image/logo when available;
- public display name;
- Provider Type: Service Provider or Product Provider;
- category/categories;
- approved general service-area information using Neighborhood / service areas; District is not shown as a separate user-facing value;
- provider bio/about text;
- completed YADD transaction count when actual public data exists;
- public rating indicator when actual rating data exists;
- Portfolio preview for Service Provider or Catalog preview for Product Provider.

For a Product Provider, the optional Trade Name may be used as the public display name according to the current Product Provider rules.

Static design must not fabricate ratings, transaction counts, users, or other factual-looking runtime data.

## Main action — `تواصل / استفسر`

- Authenticated User → opens the supported private conversation/inquiry path.
- Guest → opens `PUB-06 Protected Action Authentication Gate`.
- Opening Chat/Inquiry alone does not create a Transaction.

## Portfolio / Catalog action

- Service Provider → opens `PUB-05` as Portfolio / `معرض الأعمال`.
- Product Provider → opens `PUB-05` as Catalog / `الكتالوج`.

## Back navigation

Returns to `PUB-03 Search Results` when entered from search results.

## Approved UI decision — no direct Create Request CTA on this profile

Do not add a separate `إنشاء طلب لهذا المقدم` / `طلب خدمة` CTA to this public profile in the current UI baseline.

The direct-search route proceeds through communication/inquiry and then a separately confirmed Transaction Start. The platform-wide `Create Request` route remains the published-request discovery path.

This is a screen-level UI decision and does not remove the system's general Create Request capability.

## States

- Loading.
- Loaded.
- Portfolio/Catalog preview empty.
- Error.

## Mobile global navigation — Approved UI Decision

Keep the approved public Mobile global navigation on this detail screen for consistency:

`الرئيسية | البحث | تسجيل الدخول/الحساب | المزيد`

The screen also provides context-appropriate Back navigation.

## Responsive behavior

- **Mobile:** single-column detail hierarchy with prominent primary CTA.
- **Tablet/Desktop:** profile information and Portfolio/Catalog preview may use wider columns/sections.
- The public/private data boundary and actions remain unchanged across breakpoints.

## Explicit exclusions

Do not expose:

- phone number;
- WhatsApp/private direct-contact details;
- precise/private address or GPS;
- verification documents or identity artifacts;
- private identity photos;
- subscription internals;
- Transactions / Invoices / Reports;
- years of experience;
- unapproved fixed service-price fields;
- a verification claim that does not match the Provider Type and current verification policy.

---

# PUB-05 — Public Portfolio / Catalog

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest / User.
- **Related sources:** `FR-GST-03/04`; `DEC-064`; `DEC-077`; `BR-035`; `BR-036`; `BR-044..047`; `UF-00`; Screen Inventory `PUB-05`.
- **Classification:** Requirement-backed public portfolio/catalog + derived presentation behavior.

## Goal

Show the Provider's public work/product media in an expanded view without exposing private data or turning Portfolio/Catalog into an in-platform payment/store workflow.

## Provider-type presentation

- `SERVICE` Provider → title/presentation: `معرض الأعمال` / Portfolio.
- `PRODUCT` Provider → title/presentation: `الكتالوج` / Catalog.

The two are not combined on one Provider Profile in MVP because Provider Type is exclusive.

## Public item content

A public Portfolio/Catalog item may display, when present in the stored item data:

- display image;
- short title/name;
- short description.

Public display images follow the approved YADD watermark concept. The watermark is an identification/deterrence mechanism and is not a legal proof of ownership.

## Actions

### Open item

Allows the user to view the public item in a larger/detail presentation.

### Back

Returns to `PUB-04 Public Provider Profile`.

### `تواصل / استفسر`

When provided from the Portfolio/Catalog context:

- Guest → `PUB-06`.
- Authenticated User → supported private conversation/inquiry path.

## States

- Loading.
- Items available.
- Empty: no currently published Portfolio/Catalog items.
- Error.

## Responsive behavior

- **Mobile:** single-column or compact media grid suitable for touch.
- **Tablet/Desktop:** denser media grid/lightbox presentation is allowed.
- Data visibility and available actions remain functionally unchanged.

## Explicit exclusions

Do not turn this screen into an in-platform commerce/payment flow. Do not add as part of this contract:

- Buy Now;
- Cart;
- online payment;
- private phone/contact details;
- private delivery/precise-location data;
- claims that the watermark proves legal ownership.

---

# PUB-06 — Protected Action Authentication Gate

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest.
- **Related sources:** `FR-GST-05/06`; `DEC-077`; `BR-045`; `BR-046`; `UF-00`; Screen Inventory `PUB-06`.
- **Classification:** Requirement-backed authentication boundary + derived UI gate presentation.

## Goal

Stop only the protected action the Guest attempted while preserving unrestricted access to public browsing/search/profile content.

This screen is an Authentication Gate, not a Sign In form.

## Required content

- YADD identity/brand.
- Short authentication-required message, e.g. `سجّل الدخول للمتابعة`.
- Contextual explanation that the attempted action requires an authenticated account.

The gate may retain the attempted-action context, such as:

- Create Request;
- Communicate / Inquire;
- another supported protected action.

Retaining that context must not create the protected entity/action before Authentication succeeds.

## Actions

### `تسجيل الدخول`

Opens `AUTH-01 Sign In`.

### `إنشاء حساب جديد`

Opens `AUTH-02 Create Account`.

### `العودة إلى التصفح`

Returns to the prior public screen without performing the protected action.

## Explicit non-fields

Do not place authentication credentials directly in the Gate. It contains no:

- email field;
- password field;
- phone field;
- OTP field.

Those belong to dedicated Authentication screens.

## Return-to-intended-action policy

Exact automatic return/resume behavior after successful Authentication remains **Open / Needs UI Decision** in the current user-flow documentation.

Therefore this contract does not freeze an automatic resume mechanism yet.

## States

A simple transition/session-check state may be shown when needed. No complex business-state model is introduced by this Gate.

## Responsive behavior

- **Mobile:** may be presented as a full screen or equivalent focused blocking surface.
- **Desktop:** may be presented as a modal/dialog or focused screen.
- The required actions remain exactly `Log In / Create Account / Back to Browsing` regardless of presentation.

---

# AUTH-01 — Sign In

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest / returning User.
- **Related sources:** `FR-001C`; `FR-001D`; `FR-GST-05`; `DEC-077`; `DEC-078`; `BR-049`; `UF-01`; Screen Inventory `AUTH-01`.
- **Classification:** Requirement-backed authentication + approved focused-auth presentation.

## Goal

Authenticate an existing YADD User using an approved verified identifier and password.

## Required fields

1. `رقم الهاتف أو البريد الإلكتروني`
2. `كلمة المرور`

Login accepts:

- verified Mobile Number + Password; or
- verified Email + Password.

There is no independent Username in the current account model.

## Actions

### `تسجيل الدخول`

Submits the credentials for Authentication.

### `نسيت كلمة المرور؟`

Opens `AUTH-05 Forgot / Reset Password`.

### `إنشاء حساب جديد`

Opens `AUTH-02 Create Account + Phone OTP`.

### Back

Returns to the previous public/authentication context where applicable.

## States

- Default.
- Loading / submitting.
- Invalid credentials.
- General authentication error.

Do not expose internal security details in error messages.

## Navigation / presentation

Authentication screens use a focused layout and do **not** display the public Mobile Bottom Navigation during the credential flow.

## Explicit exclusions

Do not add without a new decision/requirement:

- independent Username;
- Beneficiary/Provider choice inside the login form;
- normal-login OTP field;
- Google/Apple/social sign-in;
- biometric login.

---

# AUTH-02 — Create Account + Phone OTP

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Guest.
- **Related sources:** `FR-001A`; `FR-001B`; `DEC-078`; `BR-048`; Account & Portal Model; `UF-01`; Screen Inventory `AUTH-02`.
- **Classification:** Requirement-backed registration + approved two-step UI presentation; password confirmation is derived UI validation.

## Goal

Create one YADD User account and verify the required Mobile Number before account creation is considered complete.

## Step 1 — Account data

Required fields:

1. First Name / `الاسم الأول`.
2. Father Name / `اسم الأب`.
3. Grandfather Name / `اسم الجد`.
4. Family Name / `اسم العائلة`.
5. Mobile Number / `رقم الهاتف`.
6. Password / `كلمة المرور`.
7. acceptance of Terms / Privacy.

Optional field:

- Email Address / `البريد الإلكتروني`.

### Derived UI validation — approved

A `تأكيد كلمة المرور` field may be used to reduce input mistakes. It is a UI validation field and does not represent an additional account-domain attribute.

### Main action

`إنشاء الحساب والمتابعة`

Continues to the mandatory phone-verification step.

## Step 2 — Phone OTP

Required UI:

- indication of the Mobile Number being verified;
- OTP input;
- `تحقق` action;
- `إعادة إرسال الرمز` action.

The account does not complete successfully until phone OTP verification succeeds.

## After successful verification

Continue to:

`AUTH-03 Initial Portal Selection`.

## States

- Form default.
- Validation errors.
- Submitting.
- OTP awaiting input.
- OTP verification error.
- Resend state.
- Verification success.

## Open / not frozen

Do not invent until separately verified/decided:

- OTP lifetime such as 30/60 seconds;
- resend cooldown value;
- maximum OTP attempts;
- account lockout thresholds;
- final password-complexity policy beyond the requirements already defined elsewhere.

## Explicit exclusions

Account creation must not ask for:

- permanent Beneficiary/Provider account type;
- Provider Type (`SERVICE` / `PRODUCT`);
- Provider Category;
- Government ID / provider verification artifacts.

Those belong to later portal/provider setup flows.

## Navigation / presentation

No Bottom Navigation during registration / OTP. Use the approved YADD identity and RTL-focused authentication layout.

---

# AUTH-03 — Initial Portal Selection

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User on initial use/onboarding.
- **Related sources:** `FR-001E`; `DEC-008..011`; `DEC-078`; Account & Portal Model; `UF-01`; Screen Inventory `AUTH-03`.
- **Classification:** Requirement-backed portal model + approved wording/presentation.

## Goal

Let the authenticated User choose the starting portal experience without creating a permanent account type.

## Required concept

The UI must communicate that this is a **starting portal choice**, not a permanent role/account classification.

Recommended approved wording:

`كيف تريد استخدام يَد الآن؟`

Do not use wording equivalent to `اختر نوع حسابك`.

## Options

### `مستفيد`

Supporting meaning:

`ابحث عن مقدمي الخدمات والمنتجات وانشر طلباتك.`

Behavior:

→ open Beneficiary Portal.

Beneficiary capabilities do not require a Provider Profile.

### `مقدم`

Supporting meaning:

`قدّم خدماتك أو منتجاتك عبر ملف مقدم.`

Behavior:

- if an eligible Provider Profile already exists, continue to the Provider experience as applicable;
- if Provider Profile is absent/incomplete, start or continue Create / Complete Provider Profile.

## Account-model rule

Selecting either option does not create two accounts and does not permanently lock the User to one role.

## Navigation / presentation

Use a focused onboarding layout. No public Bottom Navigation is required on this initial-choice screen.

---

# AUTH-04 — Portal Switch

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User.
- **Related sources:** `FR-001F`; `DEC-008..011`; `DEC-074/076`; Account & Portal Model; `UF-01`; Screen Inventory `AUTH-04`.
- **Classification:** Requirement-backed portal switching + derived UI control.

## Goal

Allow the same authenticated User account to switch between Beneficiary and Provider portals according to Provider Profile eligibility.

## Switch destinations

### Beneficiary Portal

Available to the authenticated User without requiring a Provider Profile.

### Provider Portal

If Provider Profile is eligible:

→ open Provider Portal.

If Provider Profile does not exist or is incomplete/ineligible for the requested provider experience:

→ start/continue the appropriate Provider Profile completion flow rather than creating another User account.

## Persistence rule

The system remembers the last Portal used and uses it as the default portal on later login, according to the current account model.

## Explicit exclusions

Do not model portal switching as:

- logout + login into another account;
- separate Beneficiary account;
- separate Provider account.

Provider Type change is a separate unresolved policy and must not be implied by Portal Switch.

---

# AUTH-05 — Forgot / Reset Password

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** User who cannot access the account with the current password.
- **Related sources:** `FR-001D`; `DEC-078`; `BR-049`; Account & Portal Model; Screen Inventory `AUTH-05`.
- **Classification:** Requirement-backed recovery + derived multi-step UI.

## Goal

Restore account access through an approved verified recovery channel, then set a new password.

## Primary recovery path — Phone OTP

1. User supplies the account Mobile Number.
2. System sends OTP through the approved phone-verification channel.
3. User enters OTP.
4. After successful verification, User sets a new password.

## Additional recovery option

A verified Email may be offered as an additional recovery option.

An unverified Email must not be treated as a valid login/recovery identifier.

## New-password UI

Use:

- `كلمة المرور الجديدة`;
- `تأكيد كلمة المرور الجديدة` as derived UI validation.

## Actions

- `إرسال رمز التحقق`.
- `تحقق`.
- `تعيين كلمة المرور`.
- `العودة لتسجيل الدخول` → `AUTH-01`.

## States

- recovery identifier input;
- sending code;
- awaiting verification;
- verification error;
- set-new-password;
- success;
- general error.

## Open / not frozen

Do not invent:

- OTP duration;
- resend cooldown;
- maximum attempts;
- lockout timing.

## Explicit exclusions

Do not add security questions or recovery-code mechanisms unless separately approved.

---

# AUTH-06 — Manage / Deactivate Account

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User.
- **Related sources:** `FR-001G`; current Account / Portal model; `DEC-079`; `BR-050`; Screen Inventory `AUTH-06`.
- **Classification:** Requirement-backed account management + derived confirmation UI.

## Goal

Allow the authenticated User to manage User-account data and deactivate/reactivate the account according to the current account policy.

This screen manages the User Account, not the Provider Profile.

## Manageable account data

- four-part name;
- Mobile Number;
- Email Address;
- Password;
- profile image.

## Verification-sensitive changes

### Mobile Number change

Requires new phone OTP verification.

### Email change

The new Email cannot be used for login/recovery until Verification succeeds.

### Real-name change for verified Service Provider

A real-name change requires re-review of the Service Provider identity-verification state according to the current verification policy.

The account-management UI must communicate this consequence before the change is finalized where applicable.

## Account deactivation

Provide:

`تعطيل الحساب`

with an explicit confirmation step before execution.

The MVP supports Deactivate / Reactivate.

## Explicit exclusion — no self-service hard delete

Do not provide a `حذف الحساب نهائيًا` self-service action in the MVP UI because direct self-service Hard Delete is not part of the current approved model.

## States

- loaded account data;
- editing;
- validation error;
- re-verification required;
- saving;
- save success/error;
- deactivation confirmation;
- deactivated/reactivation context as applicable.

## Responsive behavior

- **Mobile:** account settings as a clear single-column settings flow.
- **Tablet/Desktop:** grouped settings sections are allowed.
- Verification and account-policy rules do not change across breakpoints.

## Shared authentication UI rule — AUTH-01..06

- Arabic-first / RTL.
- Use the approved YADD identity.
- Authentication, registration, OTP, recovery, and initial onboarding screens are focused flows without the public Bottom Navigation.
- Do not introduce social login, biometric login, independent Username, unapproved OTP limits/timers, or permanent Beneficiary/Provider account types through visual design.


---

# BEN-01 — Beneficiary Home / Discovery State

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User using Beneficiary Portal.
- **Related sources:** Account & Portal Model; `UR-DIS-01`; `UR-REQ-01`; `FR-001E/F`; `DEC-008..012`; `UF-01..03`; Screen Inventory `BEN-01`.
- **Classification:** Requirement-backed portal capabilities + approved Beneficiary navigation.

## Goal

Provide the authenticated Beneficiary entry state without creating a separate Beneficiary account.

## Primary actions

### `ابحث عن مقدم`

Opens the public/direct discovery flow beginning at `PUB-02`.

### `انشر طلبًا`

Opens `BEN-03 Create Request`.

### `طلباتي`

Opens `BEN-02 My Requests`.

### Portal switch

Provide access to the approved Portal Switch behavior in `AUTH-04`.

## Beneficiary Mobile Navigation — Approved UI Decision

`الرئيسية | البحث | طلباتي | الحساب`

- `الرئيسية` is active on `BEN-01`.
- `البحث` opens/represents discovery.
- `طلباتي` opens `BEN-02`.
- `الحساب` provides account/settings context including access to Portal Switch.
- `إنشاء طلب` remains a prominent page CTA rather than a permanent bottom-navigation tab.

On Tablet/Desktop the same navigation functions may be represented in a header/sidebar.

## Explicit exclusions

Do not add without separate authorization:

- recommendation algorithm;
- `الأقرب إليك`;
- promotional/advertising modules;
- fabricated usage statistics;
- unapproved personalization features.

---

# BEN-02 — My Requests

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `UR-REQ-01..04`; `FR-005..005F`; `DEC-048`; `DEC-081`; `BR-018`; `BR-020`; `BR-052/053`; Screen Inventory `BEN-02`.
- **Classification:** Requirement-backed Request lifecycle + approved Neighborhood-only UI convention.

## Goal

Show the Beneficiary's current and historical Requests and allow entry to the appropriate Request Details state.

## Request card content

A Request Card may display:

- Request Type: Service / Product;
- Category;
- Neighborhood;
- short description;
- indicative price when present;
- actual Request status;
- creation date/time when provided by runtime data;
- actual Provider Response count when provided by runtime data.

District is not shown as a separate user-facing field; it remains internally derived from Neighborhood.

## Request statuses

Use the current Request lifecycle terminology:

- `Open`;
- `Matched`;
- `ClosedByBeneficiary`;
- `Expired`.

Do not use `Completed` as a Request status. Transaction completion is a separate lifecycle.

## Actions

### Open Request card

→ `BEN-04 Request Details`.

### Expired Request — `إعادة نشر الطلب`

Republish does not reopen the expired Request. It creates a **new Request** after the user reviews/edits the copied data; the old Request remains `Expired`.

### Empty state

`لا توجد لديك طلبات بعد`

Action:

`إنشاء طلب` → `BEN-03`.

## Mobile navigation

Use the approved Beneficiary navigation:

`الرئيسية | البحث | طلباتي | الحساب`

`طلباتي` is active.

---

# BEN-03 — Create Request

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated Beneficiary.
- **Related sources:** `UR-REQ-01/02`; `FR-005/005A/005B`; `DEC-012/013/031/081`; `BR-001/002/031/052/053`; Screen Inventory `BEN-03`.
- **Classification:** Requirement-backed Request creation + approved Neighborhood-only UI convention.

## Goal

Create and publish a Service or Product Request to suitable Providers.

## Required user-facing fields

1. Request Type: `خدمة` or `منتج`.
2. Category compatible with Request Type.
3. Neighborhood / `الحي`.
4. Request Description / `وصف الطلب`.

**Approved UI Decision:** no separate District field is shown. The system derives District internally from the selected Neighborhood, preserving the underlying location model.

## Optional fields

- images;
- additional information;
- indicative price.

The indicative price must be presented as **optional and non-binding**.

## Main action — `نشر الطلب`

On valid successful publication:

`Request.status = Open`

Then open `BEN-04 Request Details`.

## Secondary actions

- Back.
- Cancel/leave the form before publication.

## Neighborhood expansion

Expansion from the Request Neighborhood to adjacent neighborhoods requires Beneficiary approval under the current location rules.

The exact UI moment/mechanism for requesting that approval remains **Open / Needs UI Decision**; do not invent a toggle in this screen yet.

## States

- Default.
- Validation errors.
- Uploading optional images.
- Publishing.
- Publication success/error.

## Explicit exclusions

Do not add without a new verified requirement/decision:

- standalone District selector;
- public precise address;
- mandatory GPS;
- binding budget;
- deposit/payment field;
- payment method;
- user-selected Request expiry date;
- required number of Providers;
- invented image-count, file-size, or text-length limits.

## Mobile navigation

The Beneficiary global navigation may remain visible when consistent with the final form layout; it must not introduce additional functions.

---

# BEN-04 — Request Details

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `UR-REQ-01..04`; `FR-005C..005F`; `FR-009`; `DEC-048`; `DEC-081`; `BR-018/020/052/053`; Screen Inventory `BEN-04`.
- **Classification:** Requirement-backed Request lifecycle + approved Neighborhood-only UI convention.

## Goal

Show Request data, current state, and only the actions valid for that state.

## Request data

Display as applicable:

- Request Type;
- Category;
- Neighborhood;
- Description;
- optional images;
- optional additional information;
- optional indicative price;
- Request Status;
- actual Provider Response count when runtime data exists.

District is not displayed as a separate user-facing value.

## Open state

Available actions:

### `عرض الاستجابات`

→ `BEN-05 Provider Responses`.

### `إغلاق الطلب`

Allowed while Request is `Open` before Provider selection.

This is **Request Closure**, not Transaction Cancellation.

Use an explicit confirmation before closing.

## Inactivity policy

The UI must be able to communicate:

- first Reminder after 24h of Beneficiary inactivity;
- second Reminder after 48h;
- `Expired` after 72h.

A Reminder may provide:

`ما زلت أحتاج هذا الطلب`

as a clear Beneficiary activity confirming continued need and resetting the inactivity timer.

Provider Response arrival alone does not reset the inactivity timer.

### Editing an Open Request

`DEC-081` recognizes Request editing as Beneficiary activity, but the full edit policy—what fields may change and how existing Provider Responses are affected—is not sufficiently specified as an independent UI flow.

Therefore a general `تعديل الطلب` capability is **not frozen by this contract** and remains Needs Verification/Decision before final UI design.

## Expired state

Action:

`إعادة نشر الطلب`

Republish starts a reviewed/editable copy for a **new Request**. The old Request remains `Expired`, and its old Provider Responses do not become active again.

## Matched state

Show that a Provider was selected and the Request no longer accepts new Provider Responses.

Provide navigation to the linked active Transaction.

## Mobile navigation

Use the approved Beneficiary navigation where appropriate; `طلباتي` remains the relevant active section.

---

# BEN-05 — Provider Responses

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `UR-OFF-01..03`; `FR-007..007E`; `FR-008`; `DEC-013/041/046/070/082`; `BR-003/005/033/039/054`; Screen Inventory `BEN-05`.
- **Classification:** Requirement-backed Provider Response viewing.

## Goal

Show the active Provider Responses received for an Open Request so the Beneficiary can inspect, communicate, and compare.

## Provider Response card

May display:

- Provider public display name;
- profile image/logo when available;
- whether the Provider accepts the indicative price or proposes another price;
- proposed price when applicable;
- optional response note;
- `يتطلب عربونًا: نعم / لا`;
- actual public rating when available;
- actual completed YADD transaction count when available.

Do not fabricate runtime numbers in static designs.

## Deposit boundary

Only:

`RequiresDeposit = Yes / No`

Do not display/store through this response UI:

- deposit amount;
- deposit percentage;
- payment status;
- refund status/process.

## Actions

- Open Provider Profile → `PUB-04`.
- `تواصل / استفسر` → supported private Chat/Inquiry.
- `مقارنة الاستجابات` → `BEN-06`.

Chat before selection is allowed and does not create a Transaction.

## Empty state

`لم تصل استجابات إلى طلبك حتى الآن.`

Do not invent an expected waiting time.

## Mobile navigation

`طلباتي` remains the relevant Beneficiary navigation section.

---

# BEN-06 — Compare Provider Responses

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `UR-OFF-02`; `FR-007A/B`; `FR-009`; `DEC-014/041/047`; `BR-004/006/033/037`; Screen Inventory `BEN-06`.
- **Classification:** Requirement-backed comparison + approved neutral comparison presentation.

## Goal

Allow the Beneficiary to compare Provider Responses without YADD deciding which Provider is the “best”.

## Comparison content

For each response, present as applicable:

- Provider public display name;
- relevant Provider Type/Category;
- accepted indicative price or proposed price;
- response note;
- `RequiresDeposit = Yes/No`;
- actual public rating when available;
- actual completed YADD transaction count when available;
- link to public Provider Profile;
- access to the related private conversation.

## Neutrality rule

Do not add without a separate requirement/decision:

- `الأفضل لك`;
- winner badge;
- AI recommendation of a Provider;
- internal provider score;
- automatic cheapest-first decision logic.

The Beneficiary makes the selection.

## Action — `اختيار هذا المقدم`

→ `BEN-07 Confirm Provider Selection`.

## Mobile navigation

`طلباتي` remains the relevant Beneficiary navigation section.

---

# BEN-07 — Confirm Provider Selection

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `UR-OFF-02`; `UR-TX-01`; `FR-009/009B`; `DEC-014/047/066`; `BR-004/006/037`; Screen Inventory `BEN-07`.
- **Classification:** Requirement-backed selection transition + derived confirmation UI.

## Goal

Confirm the Beneficiary's selection before converting the published Request route into an Active Transaction.

## Confirmation summary

Show:

- selected Provider;
- selected Provider Response;
- accepted/proposed price;
- `RequiresDeposit = Yes/No`;
- relevant response note when present.

Display a clear consequence statement equivalent to:

`عند التأكيد سيُغلق الطلب أمام الاستجابات الجديدة وتبدأ معاملة رسمية مع المقدم المختار.`

## Actions

### `تأكيد اختيار المقدم`

On confirmation:

- Request → `Matched`;
- selected Provider Response → `Selected`;
- other Provider Responses → `NotSelected`;
- create `Active Transaction` directly.

Then:

→ `TRX-02 Transaction Details`.

### `العودة للمقارنة`

→ `BEN-06`.

## Explicit exclusions

- No standalone `Agreement` screen/entity between selection and Transaction.
- No second Provider confirmation is required in the **published Request route**.
- Other-party confirmation belongs to the **Direct Search Transaction Start** route, not this one.

## Mobile navigation

This is a focused confirmation within the `طلباتي` context; no additional navigation capability is introduced.

---

## Rule

A screen specification may describe presentation and interaction details, but must not silently create a new business rule or requirement.

If an approved UI contract later conflicts with a higher-authority project source, the conflict must be identified and classified as Synchronization, Decision, or Verification before changing the design.
