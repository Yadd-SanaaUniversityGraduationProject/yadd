# Project Work Plan — Task Schedule, Gantt, PERT

> **الحالة:** `ACTIVE — PRELIMINARY DEFENSE ROADMAP v3`
>
> **آخر تحديث:** 2026-09-03
>
> تبدأ فترة المناقشات الأولية من **12 سبتمبر 2026**، لكن يوم مناقشة فريق YADD داخل هذه الفترة غير مثبت بعد. يعتمد الفريق **11 سبتمبر 2026 كموعد جاهزية داخلي نهائي** للفصول الأربعة الأولى والعرض التقديمي. أضيفت بوابة عاجلة: **5 سبتمبر 2026 — تسليم المخططات الرئيسية للمشرف الرئيسي**.

## 0. فريق المشروع والإشراف

### أعضاء الفريق

| الاسم | الصفة |
|---|---|
| عمرو ناجي | مسؤول الفريق |
| محمد عبدالرحمن | عضو فريق |
| محمد حميد | عضو فريق |

### الإشراف

| الاسم | الصفة |
|---|---|
| أ.د.م نبيل طاهر الصهيبي | المشرف الرئيسي |
| الآنسة شذى احمد جلاعم (بكالريوس) | المشرف المساعد |

## 0.1 توزيع المسؤوليات

> **الحالة:** `WORK ALLOCATION — ADOPTED 2026-09-01`

### عمرو ناجي — الإدارة والتوثيق وتجربة المنتج
- إدارة الفريق والاجتماعات ومتابعة التقدم.
- تنظيم GitHub والمستودع والنسخ المعتمدة.
- تنظيم وتجميع التوثيق الأكاديمي.
- إعداد العرض التقديمي للمناقشة.
- مراجعة مخرجات الفريق قبل اعتمادها.
- مراجعة واجهات Figma والمخرجات البصرية.
- تصميم الهوية البصرية والشعار.
- تنسيق القرارات والملاحظات مع المشرفين والفريق.

### محمد حميد — التحليل ومراجعة النمذجة
- مراجعة تحليل النظام والمتطلبات.
- مراجعة SRS وBusiness Rules وLifecycles.
- قيادة ومراجعة Use Cases وUML/DFD.
- التحقق من منطق المخططات واتساقها مع المتطلبات ودورة العمل.
- مراجعة ERD من زاوية اتساقه مع التحليل.

### محمد عبدالرحمن — قاعدة البيانات والتقنيات والتنفيذ
- تصميم قاعدة البيانات: ERD من الجانب التنفيذي، Relation Schema، PK/FK/Constraints، وData Dictionary.
- اختيار وتجهيز التقنيات المستخدمة.
- تهيئة بيئة التطوير.
- مراجعة Architecture التنفيذي بعد استقرار المتطلبات.
- Backend / API / Web/Mobile integration بحسب التقنية المعتمدة.
- تنفيذ النظام برمجيًا بعد استقرار Baseline.
- مراجعة قابلية تنفيذ المتطلبات والمخططات تقنيًا.

> المسؤولية تعني قيادة الإغلاق والمراجعة، ولا تمنع المساعدة المتبادلة بين أعضاء الفريق.

## 1. قاعدة التخطيط

- التخطيط بالمخرجات والتواريخ، لا بعدد ساعات يومي ثابت.
- من ينهي مخرجه ينتقل لدعم أكثر مسار متأخر.
- لا يملأ سؤال مفتوح بتخمين فقط لإظهار أنه مغلق.
- البنود التي لا تمنع المناقشة يمكن أن تبقى `Needs Verification` بشرط ظهورها بوضوح.
- **من 3 إلى 5 سبتمبر الأولوية للمخططات الرئيسية، وليس لتجميل الفصول أو إضافة Features جديدة.**
- لا تضاف Feature جديدة قبل بوابة 5 سبتمبر إلا إذا كانت Correction أو Decision مدعومًا بدليل/مشرف وتؤثر مباشرة على النمذجة.

## 2. بوابات التسليم

### Gate A — 5 September 2026: Main Diagrams Review
المطلوب تسليمه/عرضه على المشرف الرئيسي:
1. Use Case Diagram الرئيسي.
2. DFD Context Diagram.
3. DFD Level 0.
4. ERD تحليلي متسق مع SRS/Business Rules.
5. Activity Diagram لتدفق Core Flow.
6. Sequence Diagram لتدفق Core Flow.
7. Class Diagram إذا سمح الوقت بعد اكتمال الستة السابقة دون تناقضات.

### Gate B — 11 September 2026: Preliminary Defense Freeze
يجب أن تكون جاهزة:
- Chapter 1 كامل.
- Chapter 2 كامل.
- Chapter 3 كامل مع DFD + UML + ERD وفق قرار المشرف.
- Chapter 4 بمستوى تصميم كامل: Relation Schema، PK/FK/Constraints، Data Dictionary، Query Statements، Interface Hierarchy، الواجهات، Forms، Queries، Reports.
- PowerPoint للمناقشة.
- Word/PDF قابل للطباعة.
- تجهيز **3 نسخ مطبوعة** من الفصول الأربعة للجنة.
- مراجعة بشرية وتدريب على المناقشة.

### Gate C — From 12 September 2026
تبدأ فترة المناقشات الأولية رسميًا. يوم YADD الدقيق ما يزال `TBD`، لذلك لا يعتمد الفريق على وجود أيام إضافية بعد 11 سبتمبر.

## 3. Closure Tracker

| النقطة | المسؤول الأول | آخر موعد داخلي | الحالة الحالية | ملاحظة الإغلاق |
|---|---|---:|---|---|
| `GOV-Q01` نطاق Chapter Four | عمرو ناجي | 3 سبتمبر | `CLOSED` | تصميم كامل؛ ERD في Ch3 وتصميم DB التفصيلي في Ch4 |
| `GOV-Q02` DFD + UML والمنهج | عمرو ناجي + محمد حميد | 3 سبتمبر | `CLOSED` | قرار المشرف: استخدام DFD وUML معًا |
| `GOV-Q03` لغة التقرير | عمرو ناجي | 3 سبتمبر | `CLOSED` | العربية مع المصطلحات التقنية عند الحاجة |
| `GOV-Q04` Data Gathering | عمرو ناجي | 3 سبتمبر | `CLOSED` | المشرف قبل survey-only لبيانات المستخدمين |
| `PM-SCHED-Q01` | عمرو ناجي | 3 سبتمبر | `CLOSED FOR PLANNING` | 5 Sep diagram gate + 11 Sep freeze + 12 Sep window; exact YADD day TBD |
| `DEP-Q02` العربون | عمرو ناجي + الفريق | 3 سبتمبر | `CLOSED` | RequiresDeposit نعم/لا فقط؛ كل المال خارج YADD |
| `RAT-CUST-Q01` تقييم المستفيد | عمرو ناجي + الفريق | 3 سبتمبر | `CLOSED` | تقييم Provider→Beneficiary اختياري بمؤشرات سلوكية؛ لا عقوبة آلية |
| `PROP-003` Portfolio/Catalog | الفريق | 3 سبتمبر | `CLOSED` | مع علامة مائية تعريفية وإبلاغ عن الانتحال |
| Actors الأساسية | محمد حميد | 3 سبتمبر | `CLOSED` | Beneficiary / Provider / YADD Administrator للمخطط الرئيسي |
| Core Flow | محمد حميد + الفريق | 3 سبتمبر | `CLOSED` | Discovery→Transaction→Invoice→Ratings |
| Request/Response/Selection Model | محمد حميد | 3 سبتمبر | `CLOSED` | لا Agreement entity مستقل |
| Architecture Direction | محمد عبدالرحمن + الفريق | 3 سبتمبر | `CLOSED AS DIRECTION` | Web/Backend-first؛ Flutter client لاحق؛ frameworks التفصيلية ما تزال Feasibility |
| تحديث حِرفة وأشغال والدراسات السابقة | عمرو ناجي | 4 سبتمبر | `IN PROGRESS` | Source Register + Matrix + Evidence Map + Chapter 2 |
| SRS blockers الحرجة | محمد حميد | 4 سبتمبر | `IN PROGRESS` | P0 مغلقة؛ الباقي NV وغير مانع للنمذجة |
| Business Rules + Lifecycles | محمد حميد | 4 سبتمبر | `IN PROGRESS` | تمت مزامنة Core Flow؛ مراجعة نهائية قبل الرسم |
| Use Cases الأساسية | محمد حميد | 4 سبتمبر | `IN PROGRESS` | تمت المزامنة النصية؛ يلزم المخطط والمراجعة |
| Use Case Diagram | محمد حميد | 4 سبتمبر | `OPEN` | جاهز للطباعة والشرح ومتسق مع Actors/UC specs |
| DFD Context + Level 0 | محمد حميد | 4 سبتمبر | `OPEN` | بلا Agreement store وبأسماء البيانات الحالية |
| ERD التحليلي | محمد عبدالرحمن + مراجعة محمد حميد | 4 سبتمبر | `OPEN` | كل Entity لها Requirement/BR؛ بلا Payment/Agreement entities غير مبررة |
| Activity Diagram — Core Flow | محمد حميد | 4 سبتمبر | `OPEN` | يمثل المسار المعتمد والبدائل الأساسية |
| Sequence Diagram — Core Flow | محمد حميد + مراجعة محمد عبدالرحمن | 4 سبتمبر | `OPEN` | يظهر Client→Backend/API→DB عند الحاجة ولا يجعل Client مرجع الصلاحيات |
| Main Diagrams Review Package | الثلاثة | 5 سبتمبر | `OPEN` | نسخة موحدة تسلم للمشرف الرئيسي |
| Database Design | محمد عبدالرحمن | 8 سبتمبر | `OPEN` | Relation Schema + PK/FK/Constraints + Data Dictionary |
| Interface Design / Figma Review | عمرو ناجي | 8 سبتمبر | `OPEN` | التدفقات الأساسية ممثلة والواجهات مرتبطة بالUse Cases |
| Technical Feasibility | محمد عبدالرحمن | 8 سبتمبر | `OPEN` | التقنيات والاعتماديات والتكلفة/المخاطر دون ادعاء غير مثبت |
| Operational/UX Feasibility | عمرو ناجي + محمد حميد | 8 سبتمبر | `OPEN` | لا ادعاء نجاح UX قبل الاختبار |
| Chapter 1 | عمرو ناجي | 9 سبتمبر | `OPEN` | مشتق من Sources of Truth |
| Chapter 2 | عمرو ناجي | 9 سبتمبر | `OPEN` | الدراسات والمقارنة والفجوة متزامنة |
| Chapter 3 | محمد حميد | 9 سبتمبر | `OPEN` | المتطلبات والمخططات متسقة وقابلة للدفاع |
| Chapter 4 | محمد عبدالرحمن + عمرو ناجي | 9 سبتمبر | `OPEN` | التصميم الكامل وفق DEC-059 |
| Traceability/Consistency Audit | الثلاثة | 10 سبتمبر | `OPEN` | لا Feature بلا Requirement ولا Entity بلا حاجة ولا Lifecycle contradiction |
| References + Formatting + Print Check | عمرو ناجي | 11 سبتمبر | `OPEN` | الرسومات واضحة والمراجع والترقيم موحدة |
| PowerPoint + Defense Rehearsal | عمرو ناجي + الفريق | 11 سبتمبر | `OPEN` | العرض من الفصول نفسها والفريق قادر على شرح القرارات والمخططات |
| Preliminary Defense Snapshot | عمرو ناجي | 11 سبتمبر | `OPEN` | نسخة مستقرة محفوظة ولا يبدأ تحليل جديد إلا لتصحيح حرج |

## 4. خطة الضغط حتى تسليم 5 سبتمبر

### 3 September — Freeze the meaning
- مزامنة Decision Register / Open Questions / SRS / BR / Lifecycles / Use Cases.
- منع التوسع غير الضروري في Scope.
- تحديد كيانات/عمليات المخططات من المصادر المتزامنة.

### 4 September — Build and cross-review diagrams
- **محمد حميد:** Use Case + DFD Context/Level 0 + Activity + Sequence.
- **محمد عبدالرحمن:** ERD + مراجعة قابلية التحويل لاحقًا إلى Relation Schema.
- **عمرو:** تدقيق المصطلحات، تنظيم النسخ، قابلية الطباعة والشرح.
- **مراجعة مشتركة مساءً:** Decisions ↔ SRS ↔ BR ↔ Lifecycles ↔ Use Cases ↔ Models.

### 5 September — Supervisor package only
- لا يبدأ مخطط جديد صباحًا إلا إذا كان مفقودًا من الحزمة الضرورية.
- إصلاح الأخطاء والتعارضات فقط.
- Export واضح PDF/PNG.
- تحضير شرح شفهي مختصر لكل مخطط.
- تسجيل ملاحظات المشرف كـCorrection / Synchronization / Decision.

## 5. خطة 6–11 سبتمبر

- **6–8 Sep:** استكمال/تصحيح النمذجة بعد ملاحظات المشرف + Database Design + Interfaces + Feasibility.
- **9 Sep:** تجميع Chapters 1–4.
- **10 Sep:** Traceability and Consistency Audit.
- **11 Sep:** لا تحليل جديد؛ قراءة بشرية، تنسيق، مراجع، PowerPoint، تدريب، PDF/Print، 3 نسخ، Snapshot.

## 6. Gantt المختصر

```mermaid
gantt
    title YADD Preliminary Defense Readiness — September 2026
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b
    section Urgent Diagram Gate
    Governance/SRS/Core sync              :crit, p0, 2026-09-03, 1d
    Main diagrams build/review            :crit, p1, 2026-09-04, 1d
    Supervisor diagram package            :milestone, d0, 2026-09-05, 0d
    section Analysis & Design
    Diagram corrections / DB / UI         :crit, p2, 2026-09-06, 3d
    section Academic Draft
    Chapters 1-4 integration              :crit, p3, 2026-09-09, 1d
    Audit                                 :crit, p4, 2026-09-10, 1d
    Final freeze / PPT / print            :crit, p5, 2026-09-11, 1d
    section Defense Window
    Preliminary discussions begin         :milestone, d1, 2026-09-12, 0d
```

## 7. نقاط لا نُلزم أنفسنا بإغلاقها قبل المناقشة الأولية إذا لم تمنع التصميم

تبقى `Needs Verification` صريحة:
- `REQ-EXP-Q01` — مدة Expiry والتذكيرات الرقمية.
- `INV-PENDING-Q01` — تصعيد الفاتورة المعلقة.
- `TX-CONC-Q01` — الحد الأقصى للمعاملات المتوازية.
- `LOC-OPS-TIME-Q01` — توقيت توسيع النطاق.
- `SAFE-REQ-Q01` — Thresholds لسوء الاستخدام.
- `UX-VAL-Q01` — Usability/low-connectivity validation.
- `VER-DOC-Q01`, `VER-RET-Q01`, `VER-LIC-Q01`.
- `AI-MOD-Q01/02`, `AI-PROV-Q01`, `AI-RET-Q01`, `AI-APPEAL-Q01`.
- `SUB-PLAN-Q01`, `SUB-PAY-Q01`, `SUB-OPS-Q01`.

## 8. ما بعد المناقشة الأولية

1. تسجيل ملاحظات اللجنة وتصنيفها Correction / Change / Decision.
2. إغلاق البنود التي تمنع التنفيذ ثم Baseline للـSRS/BR/Models.
3. تنفيذ Backend/API والواجهة الأساسية وفق Architecture المعتمدة والتقنيات التي تثبتها Feasibility.
4. تطوير Flutter كعميل Mobile لاحق وفق الخطة المعتمدة آنذاك.
5. اختبارات وظيفية/أمنية/Usability وتتبعها للفصول النهائية.
