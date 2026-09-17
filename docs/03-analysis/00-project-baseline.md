# خط أساس مشروع يَد | YADD

> **الحالة:** `DRAFT — CORE MODEL SYNCHRONIZED 2026-09-18 THROUGH DEC-090 — TEAM REVIEW REQUIRED`
>
> **الغرض:** توحيد الحالة الحالية قبل تحويلها إلى متطلبات ونماذج. عند التعارض تكون الأولوية لـDecision Register ثم SRS ثم Business Rules.

## 1. تعريف المشروع

YADD منصة رقمية تستهدف تسهيل اكتشاف وطلب الخدمات المهنية والمنتجات المنزلية في أمانة العاصمة — صنعاء، مع تركيز على تنظيم التعاملات وبناء الثقة.

يدعم النظام التصفح العام للزائر غير المسجل ضمن حدود البيانات العامة، بينما تتطلب الوظائف التفاعلية والمعاملاتية Authentication وفق DEC-077.

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
- `APPROVED`: Guest public browsing/search/Public Provider Profile access وفق DEC-077؛ الأفعال المحمية تتطلب Authentication.
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
Guest Public Access
  → Browse / Search Providers
  → Public Provider Profile / Portfolio or Catalog
  → Protected Action? → Log In / Create Account

Authenticated Discovery
  ├─ Direct Search
  │    → Provider Profile / Portfolio or Catalog
  │    → Persistent Private Conversation
  │    → Either Party Requests Transaction Start
  │    → Other Party Confirms within 12h
  │
  └─ Create Request
       → Provider Responses
       → Compare / Persistent Conversation
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

- Guest can Browse/Search/View public provider content only; protected actions require Authentication — DEC-077.
- Public Provider Profile does not expose phone/direct private-contact data or sensitive/private records.
- Guest does not create a `GUEST` domain entity/Class merely by browsing.
- Chat alone does not create Transaction.
- Between the same Beneficiary and Provider there is one persistent Conversation that can contain zero or multiple Transactions over time — DEC-075.
- Clear system separators/events indicate the start and end of each Transaction inside the persistent Conversation.
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

- `Guest` — unauthenticated public-browsing actor وفق DEC-077.
- `Beneficiary`.
- `Provider` as the general provider actor.
  - `Service Provider` specialization when useful.
  - `Product Provider` specialization when useful.
- `YADD Administrator` as the general administrative actor in the main diagram.

Detailed administrative roles may include:
- `Verification Reviewer`.
- `Content Moderator`.
- `Subscription Administrator`.

Guest does not have protected Beneficiary/Provider permissions before Authentication.

## 6. Account / Provider Activity Model

- Before Authentication, Guest has public browsing only.
- One `User` account per person after account creation/authentication.
- A User may have zero or one Provider Profile.
- In MVP, Provider Profile has exactly one provider type: `SERVICE` or `PRODUCT`; the two types cannot be active together on the same profile — DEC-074.
- A Provider Profile may choose one or more Categories inside its selected type through ProviderActivity; Draft may temporarily contain zero, but provider-function eligibility requires at least one valid Activity — DEC-076.
- Service Provider requires Identity Verification before provider submission functions; Product Provider does not require Government ID in MVP but needs Account/Profile eligibility.
- Both provider types require Active Subscription for new Provider Responses / new direct transactions.
- Provider Type switching after initial selection remains unresolved and must not be inferred.

## 7. Technical Direction — Approved / Technology Details Partial

- YADD follows Client–Server Architecture.
- centralized Backend/API is authoritative for processing, authentication/authorization, Business Rules and database access.
- Web Interface is the primary current client direction.
- Flutter is a later Mobile client direction using the same Backend/API.
- For Guest protected CTAs, client redirect to Log In/Create Account is UX behavior; Backend/API still enforces the protection independently — DEC-065/077.
- exact Web/Backend frameworks and providers remain design/feasibility decisions; they do not affect current analysis diagrams.

## 8. Academic Delivery Direction

- report language: Arabic, with technical English terms as needed — DEC-061.
- all labels inside academic diagrams: English — DEC-072.
- Chapter Three uses DFD and UML together — DEC-060.
- ERD belongs in Chapter Three.
- Chapter Four contains Relation Schema, PK/FK/Constraints, Data Dictionary, Query Statements and interface design outputs — DEC-059.

## 9. Open Items — Non-Blocking for Core Diagrams

Open items remain documented in `docs/00-governance/03-open-questions.md`, including abuse thresholds, verification-data retention/professional licensing, detailed AI provider/policy settings, geographic seed data, final subscription price/payment proof/public visibility when expired, and Provider Type switching policy. Request/invoice/direct-start/subscription durations and accepted Service Provider identity-document types are no longer open.

Exact UX continuation after Guest authenticates from a protected CTA remains a design detail; it does not change the approved authentication rule.

These items must not be invented in diagrams. They **do not block** the current Main Use Case, DFD Context/Level 0, core Activity/Sequence diagrams, conceptual ERD, or core Class Diagram because their structural concepts are already approved.

## 10. Modeling Readiness

- SRS remains `PARTIALLY ANALYZED — NOT BASELINED`; synchronized core requirements through DEC-090 require continued controlled review.
- Business Rules and Core Traceability are synchronized through DEC-090 in their applicable scope.
- Guest public browsing/authentication boundary is resolved through DEC-077; account/auth details are resolved through DEC-078/079.
- Provider Activity semantics are synchronized through DEC-076.
- Persistent Conversation semantics are resolved through DEC-075 at the analysis level; physical message/system-event linking remains Chapter Four work.
- DFD working model reflects Guest + authenticated Core Model; final standard visual export remains a delivery task.
- UML working Use Case model includes Guest and protected-action authentication boundary; final academic redraw/A4 review remains.
- Conceptual ERD remains structurally valid because Guest is not a stored domain entity solely by browsing; physical schema remains Chapter Four work.
- Detailed Analysis Class package remains structurally valid because Guest is an external Actor rather than a new Class; package is still `NOT BASELINED` and pending Visual/A4 finalization.

The fact that the SRS is not yet formally Baselined means later supervisor feedback may trigger controlled changes; it does not create a current blocker for the approved core diagram model.