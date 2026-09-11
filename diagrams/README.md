# YADD Diagrams — Working Sources and Governance

> **Diagram drafting status:** `UML WORKING PACKAGE ORGANIZED — 2026-09-11`
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
        │   └── activity-*.md
        ├── sequence/
        │   └── uc-*-sequence.md
        └── class/
            ├── README.md
            ├── 01-account-provider-discovery.md
            ├── 02-transaction-invoice-ratings.md
            └── 03-verification-subscription-trust.md
```

القواعد الحالية:

- `docs/` يحكم معنى المشروع والتحليل والمتطلبات.
- `diagrams/03-analysis/uml/` يحتوي Working Diagram Sources المشتقة من تلك الوثائق.
- قاعدة التنظيم الحالية: **one rendered diagram = one working source file**، مع README/index للحزمة عندما توجد عدة Views لنموذج واحد.
- لا ننشئ نسخًا مكررة من DFD/ERD/Use Case فقط لأجل التنظيم؛ تبقى مصادرها الحالية في وثائق التحليل إلى أن يتم إعداد editable visual source نهائي.
- عند إنشاء ملفات `.puml` أو `.drawio` أو ما يعادلها لاحقًا، توضع تحت نوع المخطط المناسب داخل `diagrams/` مع الحفاظ على التتبع إلى الوثيقة الحاكمة.
- Generated exports مثل SVG/PNG/PDF لا تصبح Source of Truth، ولا يجوز تعديلها يدويًا بما يجعلها تختلف عن المصدر القابل للتعديل.

## 3. Current UML Working Packages

### Activity

- `03-analysis/uml/activity/activity-published-request-route.md`
- `03-analysis/uml/activity/activity-direct-search-route.md`
- `03-analysis/uml/activity/activity-final-invoice-dispute.md`
- `03-analysis/uml/activity/activity-provider-verification.md`
- `03-analysis/uml/activity/activity-report-administrative-review.md`

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

### Class

- `03-analysis/uml/class/README.md`
- `03-analysis/uml/class/01-account-provider-discovery.md`
- `03-analysis/uml/class/02-transaction-invoice-ratings.md`
- `03-analysis/uml/class/03-verification-subscription-trust.md`

الـClass files الثلاثة هي Views لنفس Conceptual Domain Model وليست ثلاثة نماذج مستقلة.

كل الملفات أعلاه حاليًا `REVIEW DRAFT — NOT BASELINED` ما لم يذكر خلاف ذلك داخل الملف نفسه.

## 4. Do Not Use as Current Diagram Authority

The following are Legacy/derived/stale paths and must **not** be used as the source for current diagrams:

- `docs/2-analysis/`
- `docs/3-tech/`
- `docs/1-pm/`
- old report-draft text when it conflicts with the sources above
- old screenshots/exported diagram images

Legacy material is retained for history during stabilization; it is not the current modeling source.

## 5. Current Diagram Invariants

Every current diagram must preserve these rules:

- Diagram labels are **English only** — DEC-072.
- Main actors: `Beneficiary`, `Provider`, `YADD Administrator`.
- `Service Provider` and `Product Provider` are Provider specializations when useful.
- No current `Guest` actor.
- One User account; optional single Provider Profile; Service Activity/Product Activity/both.
- Request route: `Request → Provider Response → Selection → Transaction`.
- No standalone `Agreement` entity/process/store.
- One active Provider Response per Provider per Request; edit/withdraw before selection while Request is Open.
- Direct Search: `Request Transaction Start → Other Party Confirmation → Active Transaction`.
- Chat alone never creates Transaction.
- `RequiresDeposit` is Yes/No data inside Provider Response only; no deposit amount/payment/refund state.
- Invoice approval makes Transaction `Completed`.
- `Completed` is the successful terminal Transaction state; there is no Transaction state named `Closed`.
- Unresolved pre-approval invoice dispute ends the Transaction as `Disputed`, a terminal unsuccessful state.
- Administration reviews YADD evidence and applies platform policy; it does **not** decide financial/commercial entitlement and must not be modeled as ordering Payment, Refund or Compensation.
- Ratings happen only after `Completed`; no Ratings for `Cancelled` or `Disputed` Transactions.
- Beneficiary→Provider rating is mandatory; Provider→Beneficiary rating is optional.
- Block and Report are separate concepts; neither implies the other.
- Neighborhood adjacency is managed data, not GPS-radius logic.
- Transaction cancellation records actor, reason and time.
- No Beneficiary↔Provider Payment/Escrow/Refund/Settlement process/entity inside YADD.

## 6. Open Items That Must Not Be Invented

Open policy/detail questions do not block the core diagrams, but their unresolved values must not be invented. Examples:

- exact Request expiry/reminder timing;
- long-pending invoice escalation timing;
- abuse/AI thresholds;
- final district/neighborhood seed list and expansion timing;
- exact accepted identity-document types and retention periods;
- AI provider/retention/appeal details;
- subscription packages/prices/payment-proof procedure and some expiry effects;
- any numeric cap on concurrent Transactions;
- whether a single Conversation may later link to more than one Transaction;
- minimum ProviderActivity cardinality during ProviderProfile onboarding/draft state.

Represent the approved concept generically or omit the unresolved numeric/policy detail.

## 7. Editable and Exported Sources

During analysis, Markdown/Mermaid files under the organized package remain working visual/modeling sources derived from the authoritative documents above. Final academic diagrams may be redrawn in PlantUML, draw.io, or another approved diagram tool for standard notation and print quality.

When exporting later:
- keep the editable source (`.puml`, `.drawio`, or equivalent);
- export SVG/PDF for report/print where appropriate;
- export high-resolution PNG when needed for PowerPoint;
- keep generated exports separate from editable sources;
- never let an exported image diverge semantically from the authoritative model.
