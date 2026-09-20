# YADD Diagrams — Working Sources and Governance

> **Diagram drafting status:** `WORKING PACKAGE SYNCHRONIZED 2026-09-20 THROUGH DEC-091`
>
> هذه الصفحة تحدد مصادر السلطة، بنية ملفات الرسم، وقواعد التصدير حتى لا تختلط Semantic Models مع Editable Diagram Sources أو Generated Exports.

## 1. Source Priority for Diagram Drafting

إذا وجد اختلاف في الصياغة، اتبع هذا الترتيب:

1. `docs/00-governance/02-decision-register.md` — Team Decisions.
2. `docs/03-analysis/05-SRS.md` — current requirements and explicit open items.
3. `docs/03-analysis/06-business-rules.md` — current business rules.
4. `docs/03-analysis/07-lifecycles.md` — current state/lifecycle semantics.
5. `docs/03-analysis/08-use-cases.md` — current use-case behavior.
6. `docs/03-analysis/09-DFD.md` — working DFD model.
7. `docs/03-analysis/10-UML.md` — working UML index, semantics and relationship rules.
8. `docs/03-analysis/11-ERD.md` — current conceptual ERD.
9. `docs/03-analysis/12-process-data-specifications.md` — current process/data-flow/store semantics.
10. `docs/03-analysis/13-traceability-matrix.md` — core cross-model consistency check.

Supporting current models may be consulted only when needed:
- `14-account-portal-model.md`
- `15-invoice-approval-and-dispute.md`
- `16-in-app-transaction-communication.md`
- `17-request-cancellation-expiry.md`
- `18-rating-reputation-model.md`
- `19-provider-activity-model.md`
- `20-location-and-neighborhood-model.md`
- `21-provider-verification-model.md`
- `22-ai-trust-safety-model.md`
- `23-provider-subscription-model.md`

## 2. Current Repository Structure for Diagrams

```text
diagrams/
├── README.md
└── 03-analysis/
    └── uml/
        ├── activity/
        │   └── NN-activity-name.md
        ├── sequence/
        │   ├── uc-*-sequence.md
        │   └── seq-*-sequence.md
        └── class/
            ├── README.md
            ├── 00-integrated-master.md
            ├── 01-account-provider-discovery.md
            ├── 02-transaction-invoice-ratings.md
            └── 03-verification-subscription-trust.md
```

القواعد الحالية:

- `docs/` يحكم معنى المشروع والتحليل والمتطلبات.
- `diagrams/03-analysis/uml/` يحتوي Working Diagram Sources المشتقة من تلك الوثائق.
- قاعدة التنظيم الحالية: **one coherent diagram/scenario source per working file**. بعض ملفات Sequence التاريخية تحتوي أكثر من Scenario/Diagram مترابط داخل الملف نفسه لتحسين التتبع والقراءة؛ لذلك عدد ملفات Sequence لا يساوي بالضرورة عدد الرسومات rendered.
- لا ننشئ نسخًا مكررة من DFD/ERD/Use Case فقط لأجل التنظيم؛ تبقى مصادرها الحالية في وثائق التحليل إلى أن يتم إعداد editable visual source نهائي. إعادة تنظيم `diagrams/` لتجميع DFD/ERD/Use Case مستقبلًا تحتاج Repository Structure approval منفصل.
- عند إنشاء ملفات `.puml` أو `.drawio` أو ما يعادلها لاحقًا، توضع تحت نوع المخطط المناسب داخل `diagrams/` مع الحفاظ على التتبع إلى الوثيقة الحاكمة.
- Generated exports مثل SVG/PNG/PDF لا تصبح Source of Truth، ولا يجوز تعديلها يدويًا بما يجعلها تختلف عن المصدر القابل للتعديل.

## 3. Current UML Working Packages

### Activity

- `03-analysis/uml/activity/01-account-registration-initial-portal.md`
- `03-analysis/uml/activity/02-direct-search-inquiry.md`
- `03-analysis/uml/activity/03-create-request.md`
- `03-analysis/uml/activity/04-provider-response-to-request.md`
- `03-analysis/uml/activity/05-select-provider-from-request.md`
- `03-analysis/uml/activity/06-direct-transaction-start.md`
- `03-analysis/uml/activity/07-cancel-transaction.md`
- `03-analysis/uml/activity/08-final-invoice-revision-approval.md`
- `03-analysis/uml/activity/09-transaction-complaint.md`
- `03-analysis/uml/activity/10-post-transaction-ratings.md`
- `03-analysis/uml/activity/11-provider-onboarding-eligibility.md`
- `03-analysis/uml/activity/12-service-provider-identity-verification.md`
- `03-analysis/uml/activity/13-manage-portfolio-catalog.md`
- `03-analysis/uml/activity/14-block-unblock-report.md`
- `03-analysis/uml/activity/15-administrative-report-review.md`
- `03-analysis/uml/activity/16-provider-subscription-renewal.md`
- `03-analysis/uml/activity/17-guest-public-browsing-protected-action-gate.md`
- `03-analysis/uml/activity/18-authentication-portal-access.md`
- `03-analysis/uml/activity/19-manage-account-deactivation-reactivation.md`
- `03-analysis/uml/activity/20-open-request-closure-inactivity-expiry-republish.md`

The Activity package contains 20 numbered standalone diagrams. They replace the older five bundled route-level files and preserve the same approved semantics at a reviewable, scenario-focused granularity.

### Sequence

- `03-analysis/uml/sequence/uc-01-search-inquire-directly-sequence.md`
- `03-analysis/uml/sequence/uc-02-create-request-sequence.md`
- `03-analysis/uml/sequence/uc-03-respond-to-request-sequence.md`
- `03-analysis/uml/sequence/uc-04-select-provider-sequence.md`
- `03-analysis/uml/sequence/uc-05-cancel-active-transaction-sequence.md`
- `03-analysis/uml/sequence/uc-06-final-invoice-sequence.md`
- `03-analysis/uml/sequence/uc-06-dispute-complaint-sequence.md`
- `03-analysis/uml/sequence/uc-07-rate-provider-sequence.md`
- `03-analysis/uml/sequence/uc-07b-rate-beneficiary-sequence.md`
- `03-analysis/uml/sequence/uc-08-block-report-sequence.md`
- `03-analysis/uml/sequence/uc-09-provider-verification-sequence.md`
- `03-analysis/uml/sequence/uc-10-manage-portfolio-catalog-sequence.md`
- `03-analysis/uml/sequence/seq-17-guest-public-browsing-sequence.md`
- `03-analysis/uml/sequence/seq-18-authentication-portal-access-sequence.md`
- `03-analysis/uml/sequence/seq-19-manage-account-deactivation-reactivation-sequence.md`
- `03-analysis/uml/sequence/seq-20-open-request-lifecycle-sequence.md`

`UC-00` Guest browsing/auth-gating now has a standalone Sequence source. Authentication/portal access, account management/deactivation/reactivation, and the Open Request inactivity/expiry/republish lifecycle also have standalone Sequence sources. These are interaction decompositions of approved behavior, not new domain scope.

### Class

- `03-analysis/uml/class/README.md`
- `03-analysis/uml/class/00-integrated-master.md`
- `03-analysis/uml/class/01-account-provider-discovery.md`
- `03-analysis/uml/class/02-transaction-invoice-ratings.md`
- `03-analysis/uml/class/03-verification-subscription-trust.md`

هذه الملفات تمثل **Detailed Analysis Class Model واحدًا**: Integrated Master View + ثلاث Detailed Subject-Area Views. الـMaster ليس نموذجًا رابعًا مستقلًا.

كل ملف يحتفظ بحالته داخل الملف نفسه؛ لا تعتبر الحزمة Baselined لمجرد وجود Working Source.

## 4. Do Not Use as Current Diagram Authority

The following are Legacy/derived/stale paths and must **not** be used as the source for current diagrams:

- `docs/2-analysis/`
- `docs/3-tech/`
- `docs/1-pm/`
- old report-draft text when it conflicts with the sources above
- old screenshots/exported diagram images

Legacy material is retained for history during stabilization; it is not the current modeling source.

## 5. Current Diagram Invariants

> **DEC-091 technical-stack boundary:** DEC-091 fixes the implementation stack (ASP.NET Core / EF Core / SQL Server / Identity / Cookie + JWT direction / external AI APIs), but it does not turn analysis-level `*UI`, `*Controller`, scheduler, or assistant roles into approved implementation classes. Diagram semantics remain governed by the analysis decisions and requirements.

Every current diagram must preserve these rules:

- Diagram labels are **English only** — DEC-072.
- Main actors: `Guest`, `Beneficiary`, `Provider`, `YADD Administrator` — DEC-067/077.
- `Guest` is unauthenticated and may Browse/Search/View public provider content only; protected actions require Authentication — DEC-077.
- Guest does **not** create a `GUEST` entity/Class solely because it is an Actor.
- Public Provider Profile does not expose phone/direct private-contact data or sensitive/private records — DEC-036/046/077.
- `Service Provider` and `Product Provider` are Provider specializations when useful.
- One User account; optional single Provider Profile.
- In MVP, each Provider Profile is exactly one provider type: `SERVICE` or `PRODUCT`; both cannot be active on the same profile — DEC-074.
- A Provider may select one or more categories within that single Provider Type; Draft may temporarily have zero, but provider-function eligibility requires at least one valid Category — DEC-076.
- Request route: `Request → Provider Response → Selection → Transaction`.
- No standalone `Agreement` entity/process/store.
- One active Provider Response per Provider per Request; edit/withdraw before selection while Request is Open.
- Direct Search: `Request Transaction Start → Other Party Confirmation → Active Transaction`.
- Chat alone never creates Transaction.
- Between the same Beneficiary and Provider, one continuing Conversation may contain multiple Transactions over time — DEC-075.
- Transaction boundaries inside that Conversation must be represented by clear system events/separators; physical message-to-transaction linking is a Chapter Four decision.
- `RequiresDeposit` is Yes/No data inside Provider Response only; no deposit amount/payment/refund state.
- Invoice approval makes Transaction `Completed`.
- `Completed` is the successful terminal Transaction state; there is no Transaction state named `Closed`.
- Unresolved pre-approval invoice dispute ends the Transaction as `Disputed`, a terminal unsuccessful state.
- Administration reviews YADD evidence and applies platform policy; it does **not** decide financial/commercial entitlement and must not be modeled as ordering Payment, Refund or Compensation.
- Ratings happen only after `Completed`; no Ratings for `Cancelled` or `Disputed` Transactions.
- Beneficiary→Provider rating is mandatory but may be deferred with Later; it is Hybrid (Overall Stars 1–5 + five type-specific Structured Criteria + optional Comment), with 24h reminder and completion before a new Transaction. Provider→Beneficiary rating is optional.
- Block and Report are separate concepts; neither implies the other. Generic Report requires Reason; Description is not universally mandatory, while Transaction Complaint requires Reason + Description.
- Neighborhood adjacency is managed data, not GPS-radius logic.
- User-facing discovery/request/provider-location/service-area UI exposes Neighborhood only; District remains internal/derived while the underlying data model stays District + Neighborhood.
- Request inactivity uses 24h/48h reminders and 72h Expired; meaningful Beneficiary activity resets the clock, Provider Response arrival alone does not; Republish creates a new Request.
- Returning-user login uses verified phone or verified email + password; Forgot Password uses verified recovery channels; Portal switching uses the same User account and remembers lastPortal.
- Deactivate/Reactivate exists; no self-service Hard Delete in MVP.
- Provider Portal access is distinct from new-interaction eligibility: Expired Subscription allows login/profile/ongoing Transaction/renewal, but blocks new Provider Responses and new Direct Search Transactions.
- Transaction cancellation records actor, reason and time.
- No Beneficiary↔Provider Payment/Escrow/Refund/Settlement process/entity inside YADD.

## 6. Open Items That Must Not Be Invented

Open policy/detail questions do not block the core diagrams, but their unresolved values must not be invented. Examples:

- abuse/AI thresholds;
- final district/neighborhood seed list and expansion timing;
- verification-data retention and profession-specific licensing requirements;
- AI provider/retention/appeal details;
- final subscription price/payment-proof procedure and public-search visibility when Expired;
- any numeric cap on concurrent Transactions;
- Provider Type switching after initial selection;
- physical linking of Message/System Event records to specific Transactions within the continuing Conversation;
- exact UI continuation behavior after Guest authenticates from a protected CTA.

Represent the approved concept generically or omit the unresolved numeric/policy detail.

## 7. Editable and Exported Sources

During analysis, Markdown/Mermaid files under the organized package remain working visual/modeling sources derived from the authoritative documents above. Final academic diagrams may be redrawn in PlantUML, draw.io, or another approved diagram tool for standard notation and print quality.

For Use Case Diagrams, the final visual package must preserve the approved DEC-077 Guest boundary and the `include/extend` semantics documented in `08-use-cases.md`/`10-UML.md`; the visual reference supplied by the team controls presentation style, not project semantics.

When exporting later:
- keep the editable source (`.puml`, `.drawio`, or equivalent);
- export SVG/PDF for report/print where appropriate;
- export high-resolution PNG when needed for PowerPoint;
- keep generated exports separate from editable sources;
- never let an exported image diverge semantically from the authoritative model.
