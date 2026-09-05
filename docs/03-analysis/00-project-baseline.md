# خط أساس مشروع يَد | YADD

> **الحالة:** `DRAFT — CORE MODEL SYNCHRONIZED 2026-09-05 — TEAM REVIEW REQUIRED`
>
> **الغرض:** توحيد الحالة الحالية قبل تحويلها إلى متطلبات ونماذج. عند التعارض تكون الأولوية لـDecision Register ثم SRS ثم Business Rules.

## 1. تعريف المشروع

YADD منصة رقمية تستهدف تسهيل اكتشاف وطلب الخدمات المهنية والمنتجات المنزلية في أمانة العاصمة — صنعاء، مع تركيز على تنظيم التعاملات وبناء الثقة.

## 2. Problem Hypothesis

بحسب وثائق المشروع الحالية توجد فرضيات مشكلة تتمثل في:

- صعوبة الوصول إلى مقدم مناسب دون معرفة مسبقة في بعض الحالات.
- تشتت البحث والمقارنة والتواصل بين قنوات متعددة.
- صعوبة الاحتفاظ بسجل موحد للبنود والسعر النهائي في الممارسات غير المنظمة.
- الحاجة إلى مؤشرات سمعة مرتبطة بتعاملات موثقة.
- أهمية مراعاة نطاق خدمة المقدم جغرافيًا.

**الحالة:** `ASSUMPTION / PARTIALLY SUPPORTED` بحسب كل بند. مرجع الأدلة: `SUR-01` + Document Analysis + Similar Systems + Research في `02-data-gathering.md`. لا تعمم نتائج SUR-01 إحصائيًا على سكان أمانة العاصمة.

### Data-gathering clarification

- المشرف قبل الاكتفاء بالاستبيان كأداة جمع بيانات المستخدمين للمشروع وفق DEC-062.
- إجابات شخصين جُمعت شفهيًا باستخدام أسئلة الاستبيان نفسها وأدخلت في SUR-01؛ تعامل كـ`interviewer-administered questionnaire` ولا تضاعف كعينة مقابلات مستقلة.
- أي معلومات إضافية مسترجعة من الذاكرة لا تعامل كـFact أو مقابلة موثقة؛ يمكن تسجيلها فقط كـRetrospective Supplementary Evidence مع وسم واضح.

## 3. Scope — Stable High-Level Scope

- `APPROVED`: أمانة العاصمة — صنعاء.
- `APPROVED`: الخدمات المهنية والفنية.
- `APPROVED`: منتجات الأسر المنتجة/المشاريع المنزلية.
- `APPROVED`: مسارا الاكتشاف: Direct Search أو Create Request.
- `APPROVED`: Portfolio/Catalog داخل Provider Profile وفق DEC-064.
- `APPROVED`: كل حركة مالية بين Beneficiary وProvider خارج YADD؛ لا Payment/Escrow/Refund. Provider Response قد تحتوي فقط `RequiresDeposit = Yes/No` دون مبلغ أو حالة دفع.
- `OUT_OF_SCOPE`: المحافظات الأخرى في MVP.
- `OUT_OF_SCOPE`: بوابات Visa/MasterCard ومدفوعات معاملات المستخدمين داخل YADD.
- `OUT_OF_SCOPE`: إدارة النقل/التوصيل كخدمة من YADD، وصيانة السيارات/الورش الثقيلة.
- `OUT_OF_SCOPE`: الحسابات المؤسسية والمتاجر الكبرى.
- `OUT_OF_SCOPE`: Agreement entity مستقل في Core Transaction Model.
- `OUT_OF_SCOPE`: Financial/commercial arbitration أو إلزام Beneficiary/Provider بالدفع أو Refund أو Compensation بواسطة إدارة YADD.

## 4. Core Model — Approved for Modeling

```text
Discovery
  ├─ Direct Search
  │    → Provider Profile / Portfolio or Catalog
  │    → Private Chat
  │    → Either Party Requests Transaction Start
  │    → Other Party Confirms
  │
  └─ Create Request
       → Provider Responses
       → Compare / Chat
       → Beneficiary Selects One Provider

                         ↓
                  Active Transaction
                         ↓
             Fulfillment / Preparation
                         ↓
                   Final Invoice
                         ↓
          Approve / Request Revision / Dispute
             ↙                         ↘
        Completed                    Disputed
             ↓                    (unsuccessful terminal)
 Beneficiary Rates Provider — Required
             ↓
 Provider Rates Beneficiary — Optional
             ↓
      End of Post-Transaction Flow
```

### Core invariants

- Chat alone does not create Transaction.
- In Direct Search, explicit `Request Transaction Start` + other-party confirmation are required before Active Transaction.
- In Request route, selecting one Provider starts one Transaction and closes the Request to new responses.
- One active Provider Response per Provider per Request; edit/withdraw allowed while Request is Open and before selection.
- `RequiresDeposit` is a boolean on Provider Response only.
- Request Closure before selection is not Transaction Cancellation.
- Transaction Cancellation after start requires a recorded reason.
- Invoice approval sets Transaction to `Completed`.
- `Completed` is the successful terminal Transaction state; Ratings are Post-Transaction and do not create a `Closed` Transaction state.
- If a pre-approval invoice dispute remains unresolved, Transaction becomes `Disputed`, a terminal unsuccessful state — `DEC-073`.
- YADD Administration may review platform evidence and apply platform policy, but does not decide financial/commercial entitlement or order Payment/Refund/Compensation — `DEC-073`.
- Ratings open only after `Completed`; no Ratings for `Cancelled` or `Disputed` Transactions.

## 5. Actors — Main Modeling View

- `Beneficiary`.
- `Provider` as the general provider actor.
  - `Service Provider` specialization when useful.
  - `Product Provider` specialization when useful.
- `YADD Administrator` as the general administrative actor in the main diagram.

Detailed administrative roles may include:
- `Verification Reviewer`.
- `Content Moderator`.
- `Subscription Administrator`.

No independent `Guest` actor is approved for the current model.

## 6. Account / Provider Activity Model

- One `User` account per person.
- A User may have zero or one Provider Profile.
- Provider Profile may activate Service Activity, Product Activity, or both.
- Provider Verification is required before provider submission functions.
- Response submission also requires Active Subscription.

## 7. Technical Direction — Approved / Technology Details Partial

- YADD follows Client–Server Architecture.
- centralized Backend/API is authoritative for processing, authorization, Business Rules and database access.
- Web Interface is the primary current client direction.
- Flutter is a later Mobile client direction using the same Backend/API.
- exact Web/Backend frameworks and providers remain design/feasibility decisions; they do not affect current analysis diagrams.

## 8. Academic Delivery Direction

- report language: Arabic, with technical English terms as needed — DEC-061.
- all labels inside academic diagrams: English — DEC-072.
- Chapter Three uses DFD and UML together — DEC-060.
- ERD belongs in Chapter Three.
- Chapter Four contains Relation Schema, PK/FK/Constraints, Data Dictionary, Query Statements and interface design outputs — DEC-059.

## 9. Open Items — Non-Blocking for Core Diagrams

Open items remain documented in `docs/00-governance/03-open-questions.md`, including exact timings, thresholds, identity-document lists/retention, detailed AI provider/policy settings, geographic seed data and subscription packages.

These items must not be invented in diagrams. They **do not block** the current Main Use Case, DFD Context/Level 0, core Activity/Sequence diagrams, conceptual ERD, or core Class Diagram because their structural concepts are already approved.

## 10. Modeling Readiness

- SRS v0.9.5: `PARTIALLY ANALYZED — NOT BASELINED`, with core modeling requirements synchronized through 2026-09-04 including `DEC-073`.
- Business Rules, Lifecycles and Use Cases: synchronized with current Core Decisions through `DEC-073` in their applicable scope.
- DFD working model: synchronized to current Core Model; final standard visual export remains a delivery task.
- UML working Activity/Sequence model: synchronized including `Disputed`; final standard UML redraw/Class Diagram remains a delivery task.
- Conceptual ERD: core synchronized; physical schema remains Chapter Four work.
- Process/Data Specifications and Core Traceability: synchronized for diagram drafting; design traceability remains pending.

The fact that the SRS is not yet formally Baselined means later supervisor feedback may trigger controlled changes; it does not create a current blocker for the approved core diagram model.
