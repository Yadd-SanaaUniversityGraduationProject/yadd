# YADD Screen Specifications — Working Draft

> **Status:** FUNCTIONAL SCREEN CONTRACTS COMPLETE — APPROVED THROUGH ADM-07 — 48/48 INVENTORY ENTRIES COVERED
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

# PRO-01 — Provider Home / Work State

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User using Provider Portal.
- **Related sources:** `FR-001F`; `FR-002..002F`; `FR-006/007`; `FR-SUB-01..06`; `DEC-074/076/080/085/086`; Account & Portal Model; Screen Inventory `PRO-01`.
- **Classification:** Requirement-backed provider entry state + approved Provider mobile navigation.

## Goal

Provide the Provider Portal entry state for the same User account and clearly show what provider functions are currently available based on profile, verification, and subscription eligibility.

## Required entry points

The screen provides access, as applicable, to:

- `الطلبات المناسبة` → `PRO-02`;
- `إدارة ملف المقدم` → `PRO-06`;
- Service Provider: `معرض الأعمال` → `PRO-07`;
- Product Provider: `الكتالوج` → `PRO-08`;
- Service Provider only: `حالة التحقق` → `PRO-09`;
- `الاشتراك` → `PRO-11`;
- `معاملاتي` → `TRX-03`;
- Portal Switch → `AUTH-04`.

## Eligibility-aware CTAs

- Incomplete Provider Profile → show a clear `استكمال ملف المقدم` action.
- Service Provider not Identity Verified → show `استكمال التحقق من الهوية` / verification status entry.
- Expired Subscription → show `تجديد الاشتراك` and do not imply that new Provider Responses or Direct Transactions can be started.
- Product Provider must not be routed to Government-ID verification.

## Provider Mobile Navigation — Approved UI Decision

`الرئيسية | الطلبات | معاملاتي | الحساب`

- `الرئيسية` is active on `PRO-01`.
- `الطلبات` opens/represents suitable Request discovery.
- `معاملاتي` opens `TRX-03`.
- `الحساب` provides account/provider settings context including Portal Switch.
- Profile, Portfolio/Catalog, Verification, and Subscription remain accessible from the Provider home/account contexts rather than becoming additional permanent tabs.

On Tablet/Desktop the same navigation functions may be represented in a header/sidebar.

## Explicit exclusions

Do not fabricate earnings, completed-work statistics, profile views, request counts, or other runtime metrics in static design.

---

# PRO-02 — Suitable Requests

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Provider.
- **Related sources:** `FR-006`; `FR-007`; `DEC-031..033/043/074/076/085/086`; `BR-030/031/041/043`; Screen Inventory `PRO-02`.
- **Classification:** Requirement-backed matching request list + approved Neighborhood-only UI convention.

## Goal

Show Open Requests suitable for the Provider according to Provider Type, compatible Category, service area, and the current eligibility rules.

## Request card content

A suitable Request Card may display:

- Request Type: Service / Product;
- Category;
- Neighborhood;
- short description;
- indicative price when present;
- optional image preview when present.

District is not shown as a separate user-facing value; it remains internally derived from Neighborhood under the approved location UI convention.

## Primary interaction

Selecting a Request Card opens:

`PRO-03 Published Request Details`.

## Eligibility / visibility behavior

- Requests that are `Expired`, `ClosedByBeneficiary`, or `Matched` are not presented as Open opportunities for a new Provider Response.
- Sending a new Provider Response requires Active Subscription and type-specific eligibility:
  - Service Provider → Identity Verified + other profile eligibility;
  - Product Provider → Account/Profile eligible; no Government-ID verification requirement.
- When an action is unavailable because of eligibility/subscription state, the UI should explain the applicable reason rather than presenting a misleading enabled Submit action.

## Explicit exclusions

Do not introduce unapproved ranking such as `الأقرب`, `الأفضل`, or a hidden recommendation score as a user-facing business rule.

## Mobile navigation

Use the approved Provider navigation:

`الرئيسية | الطلبات | معاملاتي | الحساب`

`الطلبات` is active.

---

# PRO-03 — Published Request Details

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Provider.
- **Related sources:** `FR-005..006`; `FR-007..007E`; `FR-008`; `DEC-031/041/043/046/070/082/085/086`; Screen Inventory `PRO-03`.
- **Classification:** Requirement-backed Request details + eligibility-aware actions.

## Goal

Allow the Provider to review an Open published Request before deciding whether to submit/manage a Provider Response or communicate.

## Request data

Display as applicable:

- Request Type;
- Category;
- Neighborhood;
- Description;
- optional images;
- optional additional information;
- optional indicative price;
- Request Status.

District is not shown as a separate user-facing value.

Do not expose private Beneficiary contact details, precise address, or GPS.

## Actions

### No active response + eligible Provider + Open Request

`إرسال استجابة` → `PRO-04`.

### Existing active Provider Response

`عرض / إدارة استجابتي` → `PRO-05`.

### Communication

Where the supported conversation context exists:

`تواصل / استفسر` → shared private Chat/Inquiry.

Chat alone does not create a Transaction.

## Ineligible state

If a new response cannot be sent, the screen may explain the specific applicable blocker, such as:

- Provider Profile incomplete;
- Service Provider Identity Verification required;
- Subscription not Active;
- Request no longer Open.

Product Provider must not be told that Government-ID Identity Verification is required.

---

# PRO-04 — Create Provider Response

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** eligible Provider.
- **Related sources:** `FR-007/007A/007B/007D`; `DEC-013/041/043/070/085/086`; `BR-003/030/033/039`; Screen Inventory `PRO-04`.
- **Classification:** Requirement-backed Provider Response creation.

## Goal

Submit one active Provider Response for an Open Request.

## Preconditions

Before submission, the system enforces:

- Request is `Open`;
- no other active Provider Response exists from the same Provider for this Request;
- Subscription is `Active`;
- type-specific provider eligibility:
  - Service Provider → Identity Verified + profile eligibility;
  - Product Provider → Account/Profile eligible without Government-ID verification.

## Response fields / controls

### Indicative price handling

If the Request includes an indicative price, allow the Provider to:

- accept the indicative price; or
- propose a different price.

### Proposed price

Optional when a separate proposed price is applicable.

### Note

Optional Provider note.

### `RequiresDeposit`

Required Boolean presentation:

`نعم / لا`

## Main action

`إرسال الاستجابة`

On success, continue to `PRO-05 Edit / Withdraw Response` or the equivalent submitted-response state.

## Deposit boundary

YADD records only `RequiresDeposit = Yes/No`.

Do not add:

- deposit amount;
- percentage;
- payment method;
- paid/unpaid status;
- refund data/process.

## States

- Default.
- Validation error.
- Eligibility blocked.
- Submitting.
- Success/error.

---

# PRO-05 — Edit / Withdraw Response

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Provider with an active Provider Response.
- **Related sources:** `FR-007C/007D/007E`; `FR-008`; `DEC-046/070/082`; `BR-005/039/054`; Screen Inventory `PRO-05`.
- **Classification:** Requirement-backed response management.

## Goal

Allow the Provider to manage the single active Provider Response while the Request remains Open and before selection.

## Display

Show the current response information:

- accepted/proposed price;
- optional note;
- `RequiresDeposit = Yes/No`;
- response status;
- related Request context.

## Actions while editable

### `تعديل الاستجابة`

Allows changing the response fields permitted by the current response model and saving the same active response rather than creating a duplicate response.

### `سحب الاستجابة`

Requires an explicit confirmation before withdrawal.

### `تواصل / استفسر`

Opens the supported private conversation context. Chat does not create a Transaction.

## Availability rule

Edit/Withdraw is available only while:

- Request = `Open`; and
- no Provider has been selected for that Request.

After Withdraw, Selection, Request Closure, or Request Expiry, the response is no longer an active editable response.

Provider Response has no independent expiry timer.

---

# PRO-06 — Manage Provider Profile

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Provider.
- **Related sources:** `FR-002..002F`; `FR-003C`; `DEC-074/076/080/085`; `BR-041/043/051`; Screen Inventory `PRO-06`.
- **Classification:** Requirement-backed Provider Profile management + approved Neighborhood-only UI convention.

## Goal

Create and maintain the Provider Profile and the profile data required for provider-function eligibility.

## Provider Profile fields

### Provider Type

Exactly one:

- `SERVICE`; or
- `PRODUCT`.

The MVP does not activate both types on one Provider Profile.

### Categories

One or more compatible Categories may be selected within the chosen Provider Type.

A Draft Provider Profile may temporarily contain zero Categories, but provider-function eligibility requires at least one valid Category.

### Service Areas

The user selects **Neighborhoods only** in the UI.

District is derived internally from the selected Neighborhoods and is not shown as an independent selector.

### About / Description

Required before provider-function eligibility.

### Profile image / Logo

Optional.

### Product Provider only — Trade Name

Optional `Trade Name`.

When provided, it may become the public display name for the Product Provider while the real User identity remains in the User Account.

## Draft and eligibility

Provider Profile may be saved as Draft before completion.

Before provider-function eligibility, the profile requires the current required profile data including:

- Provider Type;
- at least one valid Category;
- Service Areas;
- About/Description;
- applicable type-specific verification/account eligibility;
- applicable Active Subscription for functions that require it.

Portfolio/Catalog and profile image/logo are optional and must not be presented as mandatory eligibility fields.

## Open policy — Provider Type change

Changing `ProviderProfile.providerType` after initial selection/activation remains **Needs Verification**.

Do not add a final `تغيير نوع المقدم` flow unless that policy is separately decided.

---

# PRO-07 — Manage Portfolio

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Service Provider.
- **Related sources:** `FR-PORT-01..05`; `DEC-064`; `BR-035/036`; UC-10; Screen Inventory `PRO-07`.
- **Classification:** Requirement-backed Portfolio addition/display; item edit/delete policy remains open.

## Goal

Allow a Service Provider to add public work images to the Provider Profile under the current rights and watermark rules.

## Add item

The approved addition flow contains:

- work image;
- optional description;
- Provider declaration that they have the right to publish the content.

## Media handling

- YADD keeps the original media non-public.
- YADD generates a public display copy with the approved identifying watermark.
- The public display copy may appear in the Provider Profile / public Portfolio.
- The watermark is not legal proof of ownership.

## Existing items

The screen may list the Provider's existing Portfolio items and their public display copies.

## Open / Needs Verification

The current approved requirements do not sufficiently define the final **Edit/Delete policy for Portfolio items**.

Therefore this contract does not freeze final Edit/Delete buttons, deletion semantics, retention behavior, or their effect on reported content.

---

# PRO-08 — Manage Catalog

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Product Provider.
- **Related sources:** `FR-PORT-01..05`; `DEC-064`; `BR-035/036`; UC-10; Screen Inventory `PRO-08`.
- **Classification:** Requirement-backed Catalog addition/display; item edit/delete policy remains open.

## Goal

Allow a Product Provider to add public product images to the Provider Profile Catalog under the current rights and watermark rules.

## Add item

The approved addition flow contains:

- product image;
- optional description;
- Provider declaration that they have the right to publish the content.

## Media handling

- original media remains non-public;
- YADD creates a public watermarked display copy;
- the watermark is an identification/deterrence measure, not proof of legal ownership.

## Explicit commerce boundary

This Catalog is not an in-platform checkout store.

Do not add as part of this contract:

- Cart;
- Buy Now;
- in-platform payment.

## Open / Needs Verification

The final Edit/Delete policy for Catalog items is not sufficiently defined by the current approved requirements and is not frozen by this contract.

---

# PRO-09 — Identity Verification Status

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Service Provider only.
- **Related sources:** `FR-VER-01..06`; `DEC-035/085`; `BR-027/060/061`; Provider Verification Model; Screen Inventory `PRO-09`.
- **Classification:** Requirement-backed Service Provider identity-verification status.

## Goal

Show the Service Provider's Government-ID Identity Verification status and the valid next action.

## Supported conceptual states

- `Draft`;
- `Submitted`;
- `UnderReview`;
- `Verified`;
- `ResubmissionRequired`;
- `Rejected`.

## State behavior

### Draft

`بدء التحقق` → `PRO-10`.

### Submitted / UnderReview

Show that verification is awaiting/under authorized human review. Do not promise an unapproved completion time.

### Verified

Show the verified status.

### ResubmissionRequired

Show the available reviewer reason/note and:

`إعادة التقديم` → `PRO-10`.

### Rejected

Show the available decision/reviewer note. Do not imply an automatic right to resubmit after Rejected unless that policy is separately supported.

## Product Provider boundary

Product Provider:

- does not use this Government-ID verification flow in MVP;
- must not receive an Identity Verified badge merely from Account/Profile eligibility.

## Human-decision rule

AI/automated checks may assist and create review flags. Final `Verified/Rejected` decision remains human.

---

# PRO-10 — Identity Verification Submission

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Service Provider only.
- **Related sources:** `FR-VER-01..05`; `DEC-085`; Provider Verification Model; Screen Inventory `PRO-10`.
- **Classification:** Requirement-backed sensitive verification submission.

## Goal

Collect the approved minimum evidence for Service Provider Identity Verification and submit it for authorized human review.

## Required verification basis

The flow requires:

- verified phone from the User Account;
- real name from the User Account;
- document type: `National ID` or `Passport`;
- image of the identity document;
- personal photo with the document.

Account name/phone may be displayed from the existing account context; the user must not be encouraged to create a different public/legal identity within this verification screen.

## Main action

`إرسال طلب التحقق`

After successful submission, move to the submitted/review state represented through `PRO-09`.

## Sensitive-data boundary

Verification documents, identity photos, and related artifacts are private and must not be exposed in Public Provider Profile or public discovery.

## Human / AI boundary

AI may perform assistive checks and produce flags, but cannot independently issue the final high-impact verification decision.

## Open / Needs Verification

The final retention period and deletion/legal policy for sensitive verification artifacts remains `VER-RET-Q01` / Needs Verification.

Do not display an invented retention promise.

---

# PRO-11 — Subscription Status / Renewal

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Service Provider / Product Provider.
- **Related sources:** `FR-SUB-01..06`; `DEC-042/043/086`; `BR-026/029/030`; Provider Subscription Model; Screen Inventory `PRO-11`.
- **Classification:** Requirement-backed subscription state; price/payment procedure remains partially open.

## Goal

Show the Provider's subscription eligibility and support the current external/manual renewal process without implying an in-platform Payment Gateway.

## Subscription information

Display, when available:

- Subscription Status;
- StartDate;
- EndDate;
- current MVP duration: **30 days**.

Conceptual states include:

- `PendingConfirmation`;
- `Active`;
- `Expired`.

## Activation / renewal model

- subscription payment/collection occurs outside YADD;
- an authorized YADD staff member manually confirms activation/renewal;
- confirmation activates the subscription period.

## Reminder policy

The system sends:

- reminder 3 days before EndDate;
- reminder 24 hours before EndDate.

## Expired behavior

When `Expired`:

Provider may still:

- log in;
- access the Provider account/profile;
- continue existing Active Transactions;
- start the renewal process.

Provider may not:

- submit new Provider Responses;
- start a new Direct Search Transaction;

until the subscription is renewed and Active again.

## Main action

`تجديد الاشتراك`

This opens the supported external/manual renewal process once operational payment instructions are defined.

## Open / Needs Verification

Do not invent in Figma or implementation:

- final subscription price;
- specific external payment method/account;
- evidence-of-payment procedure;
- unapproved plan names/count;
- search-visibility behavior solely from subscription expiry unless separately decided.

## Mobile navigation

Subscription is reached from the Provider home/account context; the approved global Provider navigation remains:

`الرئيسية | الطلبات | معاملاتي | الحساب`

---

## Provider-package shared constraints — PRO-01..11

- Service Provider Government-ID verification and Product Provider account/profile eligibility are distinct; never represent Product Provider as Government-ID Identity Verified without that process.
- New Provider Responses require Active Subscription plus type-specific eligibility.
- Neighborhood is the only user-facing location selector/display level in provider-location UI; District remains internal/derived.
- Provider Response exposes only `RequiresDeposit Yes/No`, not a deposit/payment lifecycle.
- Portfolio/Catalog public images use display copies; originals remain non-public.
- Do not convert unresolved Portfolio/Catalog Edit/Delete behavior or subscription payment details into implicit requirements through visual design.


---

# SH-01 — Conversations List

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User.
- **Related sources:** `FR-008..008E`; `DEC-046/075`; `BR-005/042`; Screen Inventory `SH-01`.
- **Classification:** Derived navigation over approved private-conversation capability.

## Goal

Provide access to the User's existing private conversations without creating a separate conversation per Transaction.

## Conversation list item

A row/card may display, when available:

- the other party's permitted display identity;
- profile image/logo when applicable;
- latest message preview or a short neutral conversation preview;
- last activity time when supplied by runtime data;
- unread indication when the messaging implementation supplies it.

Do not fabricate presence information such as `Online` or `Last Seen`.

## Conversation invariant

Between the same Beneficiary and Provider there is one continuing Conversation that may span zero or multiple Transactions over time.

Selecting a conversation opens:

`SH-02 Private Chat`.

## Navigation — Approved UI Decision

Do not add a fifth permanent Mobile Bottom Navigation tab solely for Conversations.

Conversation access must remain consistently reachable from the authenticated shell/home/account context and from relevant Request/Provider/Transaction contexts.

---

# SH-02 — Private Chat

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actors:** Beneficiary / Provider.
- **Related sources:** `FR-008..008E`; `DEC-046/069/075`; `BR-005/007/008/042`; Screen Inventory `SH-02`.
- **Classification:** Requirement-backed private communication + approved continuous-conversation presentation.

## Goal

Allow authenticated Beneficiary and Provider to communicate privately before and during formal Transactions without making Chat itself create a Transaction.

## Core communication behavior

- Messages are exchanged inside YADD.
- Chat/Inquiry may occur before Transaction start.
- Chat alone does not create a Transaction.
- More precise location information may be shared privately when needed; it remains non-public.

## Continuous Conversation / Transaction separators

The same Beneficiary–Provider pair reuses one continuing Conversation over time.

The UI must display clear **system events / separators** for the start and end of each Transaction so multiple Transactions do not visually merge into one undifferentiated conversation.

## Direct Search action

In the Direct Search route, an eligible party may use:

`بدء معاملة`

to create a pending `Request Transaction Start`.

This does not create an Active Transaction until the other party confirms through `TRX-01`.

## Published Request route boundary

Chat may occur before Provider selection, but the published Request route starts the Transaction through Provider Selection, not through an ordinary Chat message.

## Privacy / explicit exclusions

- Do not expose the other party's phone number automatically.
- Do not redirect the core communication model to WhatsApp as the default YADD flow.
- General Chat image/file attachments are **not frozen by this contract** because the current reviewed requirement set does not sufficiently define that capability.

---

# TRX-01 — Direct Transaction Start Confirmation

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** the other authenticated party receiving a Direct Search transaction-start request.
- **Related sources:** `FR-009A..009D`; `DEC-069/082`; `BR-007/055`; Screen Inventory `TRX-01`.
- **Classification:** Requirement-backed Direct Search confirmation.

## Goal

Require explicit confirmation from the other party before a Direct Search conversation becomes an Active Transaction.

## Required information

Show:

- identity/display information of the requesting party;
- the conversation/context from which the start request originated;
- the pending state and its validity.

## Actions

### `تأكيد بدء المعاملة`

Creates one `Active Transaction`.

### `رفض`

Rejects the pending transaction-start request.

The Conversation remains available.

## Timing / concurrency

- Pending Transaction Start is valid for **12 hours**.
- Expiry cancels only the pending start request; it does not close the Conversation.
- Only one pending Transaction Start request may exist between the pair at a time.
- A new request may be created later after rejection/expiry when otherwise eligible.

## Explicit exclusion

No standalone `Agreement` screen/entity exists between confirmation and Transaction creation.

---

# TRX-02 — Transaction Details

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actors:** Beneficiary / Provider.
- **Related sources:** Transaction lifecycle; `UR-TX-01..04`; `FR-009..012A`; `DEC-047/048/050/071/073/083/084`; `BR-006/007/009..013/019/040/056..059`; Screen Inventory `TRX-02`.
- **Classification:** Requirement-backed central Transaction state.

## Goal

Provide the shared authoritative UI view of an existing Transaction and expose only the actions valid for its current lifecycle state and actor.

## Core information

Display as applicable:

- the two parties;
- Transaction status;
- origin context: Published Request Route or Direct Search when useful for understanding the transaction;
- selected Provider Response when the Transaction originated from a published Request;
- related Conversation access;
- current Final Invoice / Invoice status when one exists;
- cancellation/dispute information when applicable.

## Supported lifecycle presentation

The UI must support the current conceptual Transaction states:

- `Active`;
- `AwaitingInvoice`;
- `RevisionRequested`;
- `Completed`;
- `Cancelled`;
- `Disputed`.

Invoice `Overdue` is presented as the pending-invoice review condition and must not be misrepresented as automatic Transaction completion.

## Active Transaction actions

### Conversation

Open the continuing `SH-02` conversation.

### Provider — create final invoice

When the work/product preparation is complete and terms are stable:

→ `INV-01 Create / Revise Final Invoice`.

### Cancel Transaction

Either party may cancel from Active Transaction creation until before Final Invoice approval / `Completed`.

Cancellation requires:

- mandatory reason;
- confirmation before execution.

The system records the cancelling party, reason, and time, and makes the recorded reason visible to the other party according to the approved rules.

## Invoice-related states

- Submitted Final Invoice → `AwaitingInvoice`.
- Beneficiary revision request → `RevisionRequested`.
- Approved Final Invoice → Transaction `Completed`.
- unresolved complaint/dispute may end in `Disputed`.

## Completed

The approved Final Invoice is the final YADD record of the successful Transaction. Ratings are Post-Transaction actions and do not change `Completed`.

## Financial boundary

Do not present YADD as processing, holding, verifying, refunding, or settling payment between Beneficiary and Provider.

Do not add a YADD payment-status field to Transaction Details.

---

# TRX-03 — My Transactions

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User.
- **Related sources:** `UR-TX-01..04`; Transaction lifecycle; current Query specification `QRY-06`; Screen Inventory `TRX-03`.
- **Classification:** Derived navigation/history over approved Transaction records.

## Goal

Allow the User to access current and historical Transactions within their authorized role/context.

## Transaction list item

May display:

- other party;
- Transaction status;
- relevant origin/context;
- creation or last-status time when supplied by runtime data.

The UI may visually group current and historical states, but grouping must not create new lifecycle statuses.

## Navigation

Selecting a Transaction opens:

`TRX-02 Transaction Details`.

## Status boundary

`Completed`, `Cancelled`, and `Disputed` are Transaction states and must not be presented as Request statuses.

## Explicit exclusions

Do not fabricate:

- earnings dashboard;
- spending dashboard;
- payment ledger;
- payment completion totals.

YADD is not the Beneficiary↔Provider payment processor.

---

# INV-01 — Create / Revise Final Invoice

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Provider.
- **Related sources:** `FR-010/010A`; `FR-011/011A/011E`; `DEC-015/025/050/055/083`; UC-06; Screen Inventory `INV-01`.
- **Classification:** Requirement-backed Final Invoice creation/revision.

## Goal

Create the final YADD record of agreed items/prices after execution/preparation and, when requested, submit a revised Invoice version.

## Invoice content

The Final Invoice contains:

- identities of the parties in the authorized transaction context;
- at least one Invoice Item;
- final total;
- optional images according to the current requirements.

Each Invoice Item includes the current modeled fields:

- Description;
- Quantity;
- Unit Price;
- calculated Line Total.

## Main action

`إرسال الفاتورة للمراجعة`

After successful submission:

- invoice becomes `Pending Customer Approval`;
- Transaction moves into the corresponding `AwaitingInvoice` state.

## Revision mode

When the Beneficiary requests a revision:

- Provider edits the Invoice as required;
- submits a new Invoice version;
- YADD preserves Version History.

There is no fixed maximum number of revisions in the current policy.

## Explicit financial exclusions

Do not add to the Final Invoice workflow:

- YADD payment method;
- paid/unpaid verification by YADD;
- escrow;
- refund/settlement workflow.

---

# INV-02 — Invoice Review

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `FR-011..011G`; `FR-012/012A`; `DEC-025/050/071/073/083/084`; `BR-012/013/040/057..059`; Screen Inventory `INV-02`.
- **Classification:** Requirement-backed Invoice review/approval/revision/complaint.

## Goal

Allow the Beneficiary to review the current Final Invoice version and choose an approved outcome without automatic approval.

## Review information

Show:

- current Invoice version;
- Invoice Items;
- prices and total;
- optional Invoice images when present;
- relevant version history/revision context when needed.

## Actions

### `اعتماد الفاتورة`

Before final confirmation, show a clear warning that approval is final inside YADD.

On approval:

- current Final Invoice is approved;
- Transaction becomes `Completed`.

### `طلب تعديل`

Requires a **mandatory note** describing the requested revision.

The workflow returns to Provider revision through `INV-01`.

### `رفع شكوى`

Available for continuing disagreement before Invoice approval according to the current Transaction Complaint rules.

After the second consecutive Revision, the UI shows a visible Complaint option/prompt, but does not force the Beneficiary to complain.

## No-response policy

- 24h → first Reminder.
- 48h → second Reminder.
- 72h → `Pending Customer Approval — Overdue`.
- No response never becomes Auto-Approval.

## Administrative/financial boundary

A Transaction Complaint may be reviewed for YADD policy enforcement, but YADD administration does not issue a financial/commercial judgment requiring payment, refund, or compensation between the parties.

---

# RAT-01 — Rate Provider

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Beneficiary.
- **Related sources:** `FR-013`; `FR-014/014A/014D/014G`; `DEC-051/087`; `BR-014/063/064`; Rating & Reputation Model; Screen Inventory `RAT-01`.
- **Classification:** Requirement-backed required post-Completed Provider rating.

## Goal

Collect the required Beneficiary→Provider review for a Completed Transaction using the approved Hybrid Rating model.

## Preconditions

- Transaction = `Completed`.
- Rating belongs to that Transaction and Provider.
- No rating is available for `Cancelled` or `Disputed` Transactions.

## Rating model

Required:

- Overall Stars: **1–5**;
- five Structured Criteria appropriate to Provider Type.

Optional:

- text Comment.

### Service Provider criteria

1. جودة الخدمة.
2. الالتزام بالموعد.
3. الالتزام بالاتفاق.
4. التواصل والاستجابة.
5. التعامل والاحترافية.

### Product Provider criteria

1. مطابقة المنتج للوصف.
2. جودة المنتج.
3. الالتزام بالتجهيز/الموعد.
4. التواصل والاستجابة.
5. الالتزام بالاتفاق.

## Actions

### `إرسال التقييم`

Submits the required Provider Rating.

### `لاحقًا`

Defers submission without changing Transaction status.

If deferred:

- Reminder after 24h;
- before starting a new Transaction, the Beneficiary must complete any previous required Provider Rating that remains outstanding.

## Public reviewer projection

When the review is shown publicly, expose only:

- reviewer's **First Name**;
- a `Verified Transaction Review` / completed-transaction indication;
- permitted rating/review content.

Do not expose additional personal identity data.

---

# RAT-02 — Rate Beneficiary

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Provider.
- **Related sources:** `FR-014B/014C/014E..014G`; `DEC-063/087`; Rating & Reputation Model; Screen Inventory `RAT-02`.
- **Classification:** Requirement-backed optional post-Completed Beneficiary rating.

## Goal

Allow the Provider, optionally, to record transaction-specific interaction feedback about the Beneficiary after a Completed Transaction.

## Behavior

After `Completed`, show a prominent rating prompt.

Provider may:

- complete the rating; or
- skip it.

Skipping does not change Transaction status.

## Rating criteria

Each criterion is rated **1–5**:

1. وضوح الطلب والتواصل.
2. الالتزام بالاتفاق.
3. حسن التعامل والتعاون.

Optional:

- text Comment.

## Reputation boundary

The UI must describe transaction behavior, not absolute personal character. Do not use an official field such as `محترم / غير محترم`.

Low Beneficiary rating does not automatically cause suspension, blocking, visibility reduction, or another automated punishment in MVP.

---

# SAFE-01 — Block / Unblock User

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User.
- **Related sources:** `FR-SAFE-01`; `DEC-053/088`; `BR-021/065`; Screen Inventory `SAFE-01`.
- **Classification:** Requirement-backed Block/Unblock behavior.

## Goal

Allow a User to stop new direct interaction with another User while preserving required Transaction/history access.

## Actions

### `حظر المستخدم`

Use an explicit confirmation before applying Block.

### `إلغاء الحظر`

Available after Block to restore future interaction where otherwise allowed.

## Relationship to Report

Block and Report are independent.

Blocking a User must not automatically create a Report.

## Active Transaction exception

If an Active Transaction already exists, Block:

- does not hide or terminate that Transaction;
- does not disable its essential Invoice / Cancel / Complaint actions;
- does not suppress required Transaction system notifications.

Previous Conversations and records remain retained according to the current model.

## Unblock behavior

Unblock restores future interaction only.

It does not:

- reopen an ended Request;
- reopen an ended Transaction;
- cancel or erase an existing Report.

---

# SAFE-02 — Report User / Content / Transaction Complaint

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** authenticated User.
- **Related sources:** `FR-SAFE-02..04`; `DEC-053/054/073/084/089`; `BR-022/040/059/066`; Trust & Safety Model; Screen Inventory `SAFE-02`.
- **Classification:** Requirement-backed reporting/complaint entry; generic reason taxonomy remains open.

## Goal

Submit a Report or Transaction Complaint for authorized administrative review without treating submission itself as proof of a violation.

The UI may be implemented as a dedicated screen, modal, dialog, or sheet while preserving the same fields and behavior.

## Supported contexts

Current reporting scope includes, as applicable:

- User;
- Conversation / behavior;
- Portfolio/Catalog Item;
- Transaction Complaint.

## Generic Report

Required:

- Reason.

Generic report Description requirement remains **policy-dependent / not fully frozen**. Do not silently require it for every generic Report unless the relevant policy is closed.

The final Reason-category taxonomy/thresholds are not frozen; do not invent a definitive list.

## Transaction Complaint

Required:

- Reason;
- Description.

Optional:

- Attachments.

A Transaction Complaint is available during the approved pre-Invoice-approval disagreement flow.

## Review boundary

- Report/Complaint submission does not prove a violation.
- AI/automated Flags may support review but do not independently impose a final high-impact punishment.
- Authorized human review determines applicable YADD administrative outcomes.

## Transaction Complaint outcome boundary

While the complaint is unresolved, the Transaction is not `Completed`.

If resolved, the workflow may return to Revision/Review as appropriate.

If unresolved, the Transaction may end as `Disputed` and no Ratings are opened.

YADD administration does not decide financial entitlement or compel Payment, Refund, or Compensation between the parties.

---

## Shared-package constraints — SH / TRX / INV / RAT / SAFE

- One continuing Conversation per Beneficiary–Provider pair; clear Transaction separators/events are required.
- Chat alone never creates a Transaction.
- Direct Search Transaction Start requires other-party confirmation and expires after 12h if unconfirmed.
- Transaction Cancellation requires a recorded mandatory reason and is allowed only before Final Invoice approval / Completed.
- Final Invoice approval is required for successful `Completed`; no Auto-Approval.
- Beneficiary→Provider rating is required after Completed but may be deferred under DEC-087.
- Provider→Beneficiary rating remains optional.
- Block/Report are independent; Block does not break an already Active Transaction.
- No YADD Beneficiary↔Provider Payment/Escrow/Refund/Settlement workflow is introduced by these screens.


---

# ADM-01 — Admin Work Queue / Entry

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Admin / authorized specialized administrative staff.
- **Related sources:** `FR-015..015C`; administrative actor model; `DEC-085/086/089`; Screen Inventory `ADM-01`.
- **Classification:** Derived administrative navigation over approved administrative functions.
- **Platform presentation:** **Desktop-only UI baseline for the current MVP design package.**

## Goal

Provide one desktop entry/work-queue surface for the administrative functions the current authorized staff member is permitted to access, without inventing an analytics product.

## Authorized work areas

Show only work areas permitted to the current administrative role/context, including as applicable:

- `طلبات التحقق` → `ADM-02`;
- `البلاغات والتنبيهات` → `ADM-04`;
- `سجلات الاشتراكات` → `ADM-06`.

Conceptual specialized roles include:

- Verification Reviewer;
- Content Moderator;
- Subscription Administrator.

Using a unified Admin entry screen does not imply that every administrative user has every permission.

## Queue counts

A pending-item count may be displayed only when provided by actual runtime data.

Do not fabricate counts in static design.

## Desktop layout — Approved UI Decision

- Administration screens are designed for **Desktop**, not Mobile, in the current MVP UI package.
- Use an RTL desktop shell with shared YADD header/sidebar patterns as appropriate.
- Do not create an Admin mobile bottom navigation.
- Desktop presentation must still use the same YADD design tokens, typography, controls, surfaces, icon family, and state patterns as the rest of the product.

## Explicit exclusions

Do not add unsupported administrative analytics such as:

- revenue charts;
- fabricated user totals;
- KPI dashboard;
- AI-performance dashboard;
- unsupported business-intelligence metrics.

---

# ADM-02 — Verification Requests

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Verification Reviewer / authorized Admin.
- **Related sources:** `FR-VER-01..06`; `FR-015/015A/015B`; `DEC-085`; Provider Verification Model; Screen Inventory `ADM-02`.
- **Classification:** Requirement-backed Service Provider verification review queue.
- **Platform presentation:** Desktop-only.

## Goal

Show Service Provider Government-ID verification submissions that require or previously received authorized review.

Product Provider does not enter the Government-ID verification queue in MVP.

## Queue item

A verification row/card may display, as permitted and available:

- real account name;
- Verification status;
- document type: `National ID` or `Passport`;
- submission date/time when supplied by runtime data;
- concise review context needed to identify the case.

## Supported verification states

The administrative UI must be able to represent:

- `Submitted`;
- `UnderReview`;
- `ResubmissionRequired`;
- `Verified`;
- `Rejected`.

Organization into UI tabs/filters such as pending/history is permitted as Derived UI, but must not create new Verification lifecycle states.

## Primary interaction

Selecting a Verification Request opens:

`ADM-03 Verification Review`.

## Sensitive-data boundary

Do not expose large identity-document previews or sensitive evidence directly in a general queue when not needed.

Detailed sensitive artifacts belong inside the authorized case review context.

## Desktop layout

Use a desktop table/list/queue pattern consistent with the shared YADD UI Foundation.

---

# ADM-03 — Verification Review

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Verification Reviewer / authorized Admin.
- **Related sources:** `FR-VER-02..06`; `FR-015A/015B`; `DEC-085`; Provider Verification Model; AI Trust & Safety Model; Screen Inventory `ADM-03`.
- **Classification:** Requirement-backed sensitive human-review interface.
- **Platform presentation:** Desktop-only.

## Goal

Allow an authorized human reviewer to examine a Service Provider verification case and issue the approved final human decision.

## Review information

Show only to authorized staff:

- real name from User Account;
- verified phone context;
- document type;
- identity-document image;
- personal photo with the document;
- current Verification state;
- relevant previous review note(s);
- AI/automated assistance flags when they exist and are permitted for reviewer use.

## Human decisions

### `اعتماد`

→ Verification status becomes `Verified`.

### `طلب إعادة تقديم`

→ Verification status becomes `ResubmissionRequired`.

A review note/reason must be recorded.

### `رفض`

→ Verification status becomes `Rejected`.

A review note/reason must be recorded.

## Human / AI boundary

AI may provide assistive checks, flags, or risk signals.

AI must not autonomously issue the final `Verified` / `Rejected` high-impact decision.

The final decision is made by an authorized human reviewer.

## Audit / sensitivity

Sensitive administrative review and decision events must remain traceable according to the current audit model.

Verification artifacts remain private and must not appear in public Provider UI.

## Explicit exclusions / open policy

Do not introduce:

- Auto Verify;
- Auto Reject;
- Product Provider Government-ID review;
- an AI score that forces the human outcome;
- an invented retention period for verification artifacts.

Retention remains Needs Verification.

---

# ADM-04 — Reports / Flags Queue

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Content Moderator / authorized Admin.
- **Related sources:** `FR-SAFE-02..04`; `FR-AI-02..03A`; `FR-015A/015B`; `DEC-053/054/084/089`; `BR-022/059/066`; AI Trust & Safety Model; Screen Inventory `ADM-04`.
- **Classification:** Requirement-backed human-review queue; taxonomy/thresholds remain partially open.
- **Platform presentation:** Desktop-only.

## Goal

Provide one review queue for Reports, Transaction Complaints, and Safety/AI Flags that require authorized human assessment.

## Supported queue sources

As applicable:

- User Report;
- Conversation / behavior Report;
- Portfolio/Catalog Item Report;
- Transaction Complaint;
- AI / behavioral Safety Flag.

## Queue item

Display, when available and authorized:

- source type: `Report / Flag / Complaint`;
- target/context reference;
- supplied reason or reason category;
- creation date/time;
- current review state when provided by the administrative workflow.

Selecting an item opens:

`ADM-05 Report / Complaint Review`.

## Neutral review language

A Report or Flag is an input to review, not proof of a violation.

Do not label an unreviewed subject as a confirmed violator.

Use neutral states such as `بانتظار المراجعة` where appropriate.

## AI Flag boundary

When an AI/automated Flag exists, expose enough reason/category information for a human reviewer to understand why it was raised.

Do not freeze or invent:

- numeric risk thresholds;
- mandatory risk score values;
- final exhaustive moderation category taxonomy.

Those remain Needs Verification.

---

# ADM-05 — Report / Complaint Review

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Content Moderator / authorized Admin.
- **Related sources:** `FR-SAFE-02..04`; `FR-015A..015C`; `DEC-053/054/073/084/089`; `BR-022/040/059/066`; AI Trust & Safety Model; Screen Inventory `ADM-05`.
- **Classification:** Requirement-backed human moderation / complaint review.
- **Platform presentation:** Desktop-only.

## Goal

Allow an authorized human reviewer to examine relevant YADD evidence and record an approved administrative outcome without treating Reports/Flags as automatic proof or turning YADD into a financial arbitration authority.

## Review information

Show, according to case type, permissions, and available records:

- Reporter / target context;
- Report reason;
- Description when supplied/required;
- optional attachments;
- relevant Conversation/message context;
- related Portfolio/Catalog item;
- Transaction / Invoice history relevant to a Transaction Complaint;
- related AI / Safety Flags;
- relevant administrative audit/history needed for the decision.

## Approved administrative outcomes

The administrative outcome must be one of the approved MVP values:

1. `No Violation`;
2. `Warning`;
3. `Content Removal`;
4. `Temporary Restriction`;
5. `Account Suspension`;
6. `Permanent Ban`.

A human decision is required for high-impact outcomes.

## Decision record

The administrative decision records the applicable:

- outcome;
- reason;
- authorized staff member;
- date/time;
- linked report/evidence/context.

## Temporary Restriction

When `Temporary Restriction` is selected, the duration is determined according to the applicable approved operational policy.

Do not hard-code an invented universal duration such as 7/14/30 days.

## Transaction Complaint boundary

For a Transaction Complaint, administration may:

- review YADD records/evidence;
- apply YADD platform policy;
- take an appropriate administrative action when a violation is found.

Administration must not:

- decide payment entitlement;
- compel payment;
- compel refund;
- compel compensation.

If the underlying Invoice disagreement is resolved, the transaction flow may return to Revision/Review as appropriate.

If it remains unresolved under the current dispute flow, Transaction may end as `Disputed`, and Ratings do not open.

## Open / Needs Verification

The detailed user appeal path for high-impact moderation outcomes remains open (`AI-APPEAL-Q01`).

Do not invent an Appeal screen/flow in this contract.

---

# ADM-06 — Subscription Records

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Subscription Administrator / authorized Admin.
- **Related sources:** `FR-SUB-01..06`; `FR-015`; `DEC-042/043/086`; Provider Subscription Model; Screen Inventory `ADM-06`.
- **Classification:** Requirement-backed administrative subscription records.
- **Platform presentation:** Desktop-only.

## Goal

Show Provider subscription records for both Service Provider and Product Provider and provide access to the authorized manual activation/renewal confirmation flow.

## Subscription record

May display:

- Provider;
- Provider Type;
- Subscription Status;
- StartDate;
- EndDate.

Supported conceptual status values include:

- `PendingConfirmation`;
- `Active`;
- `Expired`.

## Primary interaction

A record requiring authorized activation/renewal confirmation opens:

`ADM-07 Subscription Confirmation`.

The screen may also expose current/history record context according to authorized access.

## Open commercial/operational details

Do not present as finalized facts:

- final monthly price;
- specific bank/wallet/account;
- final payment-proof procedure;
- multiple plan names or plan tiers.

`SUB-PLAN-Q01` and `SUB-PAY-Q01` remain open.

---

# ADM-07 — Subscription Confirmation

- **Contract status:** `APPROVED UI CONTRACT — 2026-09-18`
- **Primary actor:** Authorized Subscription Administrator / authorized Admin.
- **Related sources:** `FR-SUB-02..06`; `FR-015`; `DEC-042/043/086`; Provider Subscription Model; Screen Inventory `ADM-07`.
- **Classification:** Requirement-backed manual/external subscription confirmation; payment-proof procedure remains open.
- **Platform presentation:** Desktop-only.

## Goal

Allow an authorized staff member to confirm Provider subscription activation or renewal after operational verification of external payment.

## Required context

Show:

- Provider;
- Provider Type;
- current Subscription Status;
- previous/current StartDate and EndDate when applicable;
- external-payment verification context only to the extent supported by the final operational procedure.

## Main action

According to context:

- `تأكيد التفعيل`; or
- `تأكيد التجديد`.

After authorized confirmation:

- Subscription becomes `Active`;
- the current MVP subscription period is **30 days** from the activation/renewal start date under the approved model.

## Manual/external payment boundary

- YADD has no subscription Payment Gateway in MVP.
- activation/renewal is not triggered automatically by an in-platform payment event;
- confirmation is a human administrative action after external payment verification.

## No invented rejection state

Do not add a formal `RejectedPayment` / `PaymentRejected` Subscription lifecycle state because it is not part of the current approved lifecycle.

If external payment verification fails, the operational handling must follow the later approved payment-confirmation procedure rather than inventing a new Subscription state.

## Open / Needs Verification

Do not freeze fields for:

- receipt upload;
- transfer reference;
- bank/wallet account;
- payment method;
- payment-proof format;

until `SUB-PAY-Q01` is resolved.

---

## Administration-package shared constraints — ADM-01..07

- **Desktop-only presentation baseline:** Administration UI is designed for Desktop in the current MVP design package; no Admin mobile wireframes or Mobile Bottom Navigation are required.
- Administration still uses the same shared YADD visual system: RTL, Tajawal/Inter, shared color tokens, shared 52px Button component baseline, shared inputs/cards/radius/spacing/icon family, and shared UI states.
- Specialized administrative roles/permissions remain authorization-sensitive; a unified shell must not imply universal access.
- Government-ID Verification administration applies to Service Provider only in MVP.
- Sensitive Verification, Report, Flag, Audit, Subscription, Transaction, and Invoice administrative data is not public Guest data.
- AI/automated checks support human review; high-impact final decisions remain human.
- Report/Flag does not itself prove a violation.
- Administrative complaint review is not financial/commercial arbitration.
- Subscription collection remains external/manual in MVP.
- Do not invent analytics, moderation thresholds, appeal flow, verification-retention period, subscription price, payment method, or payment-proof procedure.

---

## Rule

A screen specification may describe presentation and interaction details, but must not silently create a new business rule or requirement.

If an approved UI contract later conflicts with a higher-authority project source, the conflict must be identified and classified as Synchronization, Decision, or Verification before changing the design.
