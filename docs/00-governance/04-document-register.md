# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-19  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| Governance README | قواعد القراءة وSingle Source of Truth | `SYNCHRONIZED 2026-09-11` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية؛ بنية Legacy الحالية موثقة |
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `SOURCE_DERIVED — DECISION STATUS SYNCHRONIZED 2026-09-05` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT THROUGH DEC-091 / 2026-09-19` | DEC-078..090 توثق Requirements Closure؛ DEC-091 يثبت Technology Stack التنفيذي |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — RESOLVED ITEMS MOVED TO CLOSED — SYNCHRONIZED 2026-09-18` | REQ-EXP-Q01 وINV-PENDING-Q01 وVER-DOC-Q01 أُغلقت؛ بقيت السياسات المفتوحة ظاهرة |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — CORE MODEL + TECH STACK SYNCHRONIZED THROUGH DEC-091 — TEAM REVIEW REQUIRED` | Guest/public-auth boundary + implementation stack مدمجان؛ لا يزال Draft |
| Legacy Archive (`docs/99-legacy/`) | حفظ النسخ والمسارات التاريخية خارج الشجرة canonical | `LEGACY — NON-CANONICAL — ORGANIZED 2026-09-11` | لا يستخدم كمصدر حقيقة؛ لا حذف أثناء Stabilization دون قرار منفصل |
| Legacy PM (`docs/99-legacy/pm/`) | إدارة مشروع تاريخية قبل البنية الحالية | `LEGACY — NON-CANONICAL` | البديل الحالي `docs/01-pm/` |
| Legacy Project Baseline (`docs/99-legacy/analysis/00-project-baseline.md`) | نسخة تاريخية لخط الأساس | `LEGACY — NON-CANONICAL` | البديل الحالي `docs/03-analysis/00-project-baseline.md` |
| Legacy SRS Placeholder (`docs/99-legacy/analysis/01-SRS.md`) | Placeholder قديم | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا حذف دون Cleanup قرار واضح |
| Legacy Tech ERD Redirect (`docs/99-legacy/tech/01-ERD.md`) | Redirect تاريخي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | المرجع الحالي `docs/03-analysis/11-ERD.md` |
| Academic Progress Report 2026-08-16 (`docs/99-legacy/governance/`) | لقطة مرحلية مؤرخة | `LEGACY SNAPSHOT` | لا يستخدم عند تعارضه مع الأحدث |
| Two-week Plan (`docs/99-legacy/governance/two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED — ARCHIVED 2026-09-11` | لا تستخدم للتخطيط الحالي؛ البديل `docs/01-pm/05-work-plan.md` Roadmap v3 |
| Charter | تأسيس إداري | `SYNCHRONIZED THROUGH DEC-091 — TEAM REVIEW STILL REQUIRED` | يعكس Technology Stack المعتمد من Decision Register ولا يعتمد التقنية بذاته |
| WBS | تجزئة العمل | `ALIGNED WITH ROADMAP v3 — SYNCHRONIZED 2026-09-05` | GOV-Q02 مغلق؛ DFD+UML معًا |
| Risk Register | المخاطر والتغيير | `ACTIVE — SYNCHRONIZED WITH ROADMAP v3 — 2026-09-05` | يراجع مع أي تغيرات لاحقة |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON — TECH STACK SYNCHRONIZED THROUGH DEC-091` | Stack مغلق؛ لا إعلان Feasible قبل استكمال الاستضافة/التراخيص/التكاليف/providers/dependencies |
| Work Plan | Task Schedule + Gantt + Closure Tracker؛ PERT مفتوح | `ACTIVE — PRELIMINARY DEFENSE ROADMAP v3 — STATE SYNC 2026-09-05` | PERT غير مثبت فعليًا داخل الملف ويجب استكماله/مراجعته قبل إغلاق متطلب الجامعة |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | Work Plan Closure Tracker هو لوحة المتابعة |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | الإغلاق النهائي للمراجع/الفجوة قبل Chapter 2 final |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE — TECH SOURCES ADDED 2026-09-19` | TECH-MS-01..03 تساند قرار التكامل التقني؛ يستمر إدخال كل مصدر مستخدم والتحقق منه |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | مراجعة الفجوة/التتبع قبل الفصل الثاني النهائي |
| Stakeholders | تحديد الأطراف | `ANALYZED — SYNCHRONIZED THROUGH DEC-090` | Service/Product verification distinction and current account model synchronized |
| Data Gathering | أدوات وأدلة جمع البيانات | `SURVEY ANALYZED — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | DEC-062؛ لا Interviews/Observation غير منفذة؛ research closure/traceability ما يزال مطلوبًا |
| Interview Guide | دليل مقابلات سابق | `RETAINED FOR TRACEABILITY` | لا يحول القالب إلى Evidence أو مقابلة منفذة |
| Interview Record Template | قالب مقابلات سابق | `RETAINED FOR TRACEABILITY` | يستخدم فقط إن نفذت مقابلة موثقة فعلًا لاحقًا |
| Current System Analysis | وصف الواقع والمشكلة | `DRAFT — SURVEY EVIDENCE AVAILABLE — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | لا تعميم؛ final research corroboration/prioritization ما يزال مطلوبًا |
| Proposed System | وصف النظام المقترح | `ANALYZED — SYNCHRONIZED THROUGH DEC-091` | Account/Auth, timing, verification split, subscription/rating/safety + implementation stack synchronized |
| SRS | User/FR/NFR | `v0.9.10 — PARTIALLY ANALYZED — NOT BASELINED — SYNCHRONIZED THROUGH DEC-090` | Baseline بعد review/traceability؛ وجود بند لا يعني اعتماده تلقائيًا |
| Business Rules | قواعد النظام | `PARTIALLY ANALYZED — SYNCHRONIZED THROUGH DEC-090` | BR-048..067 تزامنت مع Requirements Closure؛ السياسات المفتوحة الباقية ظاهرة |
| Lifecycles | حالات الطلب/المعاملة/الفاتورة/التقييم | `PARTIALLY ANALYZED — SYNCHRONIZED THROUGH DEC-087` | 24/48/72 request/invoice timing، 12h direct start، rating deferral synchronized |
| Use Cases | سيناريوهات الاستخدام | `ANALYZED — CORE SYNCHRONIZED THROUGH DEC-090` | Current account/provider/timing/verification/rating/safety semantics synchronized; final academic visual redraw pending |
| In-App Communication Model | التواصل قبل/بعد المعاملة | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-090` | 12h direct-start expiry + Block/active-transaction + notification semantics synchronized |
| Account & Portal Model | الحساب والبوابات | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-090` | Create Account/Auth/Portal switch/Manage Account/deactivation synchronized |
| Provider Activity Model | نوع المقدم وتصنيفاته | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-086` | نوع حصري SERVICE/PRODUCT؛ Trade Name للPRODUCT؛ verification split والاشتراك 30d متزامنة |
| Request Closure/Cancellation/Expiry | إغلاق الطلب والإلغاء والانتهاء | `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-18 THROUGH DEC-083` | 24h/48h/72h policy closed; SAFE-REQ-Q01 remains open |
| Rating & Provider Reputation | التقييم وسمعة المقدم | `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-18 THROUGH DEC-087` | Hybrid rating + Later/24h reminder/public reviewer projection |
| Location & Neighborhood Model | المطابقة والموقع | `ANALYZED_APPROVED / PARTIAL DATA` | LOC-DATA-Q01 وLOC-OPS-TIME-Q01 |
| Provider Verification Model | تحقق المقدم | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-085 / PARTIAL RETENTION-LICENSING POLICY` | Government-ID verification = SERVICE only; National ID/Passport closed; retention/licensing remain open |
| AI Trust & Safety Model | التحقق والمراقبة المدعومة بالAI | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-089 / PARTIAL POLICY` | human outcomes fixed; categories/thresholds/provider/retention remain open |
| Provider Subscription Model | اشتراك المقدم | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-086 / PARTIAL COMMERCIAL POLICY` | 30-day lifecycle/expiry behavior closed; price/payment proof/public visibility remain open |
| Process/Data Specifications | مواصفات العمليات والتدفقات والمخازن | `ANALYZED — SYNCHRONIZED THROUGH DEC-091` | Logical DFD/process semantics synchronized; DEC-091 implementation boundary documented |
| Chapter One v1 | الفصل الأول | `v1.1 — TEXT SYNCHRONIZED THROUGH DEC-091 — READY FOR PRELIMINARY DEFENSE REVIEW` | Derived Draft؛ technical stack updated; final feasibility/formatting review pending |
| Chapter Two v1 | الفصل الثاني | `v1.1 — TEXT SYNCHRONIZED — CORE SOURCES VERIFIED — REVIEW OPEN` | final research/reference closure pending؛ DEC-077 قرار منتج ولا يغير الأدلة البحثية التاريخية |
| Chapter Three v1 | الفصل الثالث | `v1.3 — WORKING DRAFT — TEXT SYNCHRONIZED THROUGH DEC-090` | Requirements Closure integrated; final diagrams/export pending |
| DFD | تدفقات البيانات | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED THROUGH DEC-091` | Logical AI/stack boundary + current eligibility flows synchronized; standard visual redraw/export pending |
| UML | Use Case/Activity/Sequence/Class | `DRAFT FOR PRELIMINARY DEFENSE — SEMANTICS SYNCHRONIZED THROUGH DEC-091` | affected use-case/activity/sequence/class sources updated; final academic redraw/Visual/A4 review remains open |
| ERD | النموذج المفاهيمي | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED THROUGH DEC-091` | Conceptual model unchanged by stack; eligibility boundary synchronized; final visual review pending |
| Traceability Matrix | تتبع المتطلبات للمخططات | `CORE TRACEABILITY SYNCHRONIZED THROUGH DEC-091 — DESIGN TRACEABILITY PARTIAL` | new account/profile/request/notification and changed verification/rating rules traced; final design closure before baseline |
| Class Diagram Package | النموذج الكائني التفصيلي | `SEMANTICALLY VERIFIED — TEAM APPROVED — SYNCHRONIZED THROUGH DEC-091 — NOT BASELINED` | User fields/TradeName/hybrid rating/service verification/unblock/notifications updated; Visual/A4 finalization pending |
| Design Gate | ضبط مستوى اعتماد التصميم | `OPEN FOR PRELIMINARY DESIGN — FINAL BASELINE STILL BLOCKED` | Chapter 4 full preliminary design required؛ final baseline later |
| Database Design / Relation Schema | Relation Schema | `DRAFT FOR PRELIMINARY DEFENSE — RE-SYNCHRONIZED THROUGH DEC-091 — NOT BASELINED` | SQL Server + EF Core fixed; Identity/ApplicationUser physical mapping, exact types/constraints/indexes still open |
| Data Dictionary | الحقول والقيود | `DRAFT FOR PRELIMINARY DEFENSE — CURRENT MODEL SKELETON — SYNCHRONIZED THROUGH DEC-091` | SQL Server fixed; exact SQL Server types/constraints and Identity physical mapping still TBD |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE — SYNCHRONIZED THROUGH DEC-090` | account/auth/provider/rating/timing/safety UI requirements synchronized; Figma/UX validation pending |
| Queries & Reports | الاستعلامات والتقارير | `DRAFT FOR PRELIMINARY DEFENSE — REQUIREMENTS-ALIGNED` | report details/SQL pending; no invented KPIs |

## Cleanup Policy — Stabilization

- لا يحذف أي `LEGACY` أثناء Stabilization لمجرد أنه يشبه ملفًا حاليًا؛ يجب التأكد أولًا من عدم وجود معلومات تاريخية أو روابط لازمة للتتبع.
- نقل Legacy إلى `docs/99-legacy/` هو تنظيم للمستودع وليس حذفًا للتاريخ أو اعتمادًا لمحتواه.
- الملفات التي لا تحمل محتوى فريدًا تسجل `CLEANUP CANDIDATE AFTER STABILIZATION` ثم يحذفها الفريق في Cleanup منفصل بعد مراجعة الروابط والـGit history.
- لا يوجد Duplicate حرفي مؤكد بين ملفين مختلفين وفق آخر فحص مسجل؛ أي Cleanup لاحق يحتاج مراجعة مستقلة.

`CURRENT` تعني أن الوثيقة مزامنة مع القرارات الحالية في نطاقها، ولا تعني أن المشروع أو SRS أصبح Baselined.  
`VERSION/v1.x` تعني نسخة أكاديمية مجمعة للمراجعة، ولا تعني الاعتماد النهائي.  
`DRAFT FOR PRELIMINARY DEFENSE` يعني صالحًا للمراجعة/العرض الأولي فقط.  
إصدارات الفصول ووثائق التصميم المشتقة لا تتغلب على Sources of Truth الأعلى عند التعارض.