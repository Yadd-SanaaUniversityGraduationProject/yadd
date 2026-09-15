# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-15  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| Governance README | قواعد القراءة وSingle Source of Truth | `SYNCHRONIZED 2026-09-11` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية؛ بنية Legacy الحالية موثقة |
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `SOURCE_DERIVED — DECISION STATUS SYNCHRONIZED 2026-09-05` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT THROUGH DEC-077 / 2026-09-15` | DEC-077 اعتمد Guest public browsing + Authentication gate |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — P0 CORE CLOSED — P1/P2 VISIBLE — SYNCHRONIZED 2026-09-11` | BUS-Q02 وPROV-ACT-Q01 أُغلقا عبر DEC-074/076؛ الباقي ظاهر |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — CORE MODEL SYNCHRONIZED THROUGH DEC-077 — TEAM REVIEW REQUIRED` | Guest/public-auth boundary مدمجة؛ لا يزال Draft |
| Legacy Archive (`docs/99-legacy/`) | حفظ النسخ والمسارات التاريخية خارج الشجرة canonical | `LEGACY — NON-CANONICAL — ORGANIZED 2026-09-11` | لا يستخدم كمصدر حقيقة؛ لا حذف أثناء Stabilization دون قرار منفصل |
| Legacy PM (`docs/99-legacy/pm/`) | إدارة مشروع تاريخية قبل البنية الحالية | `LEGACY — NON-CANONICAL` | البديل الحالي `docs/01-pm/` |
| Legacy Project Baseline (`docs/99-legacy/analysis/00-project-baseline.md`) | نسخة تاريخية لخط الأساس | `LEGACY — NON-CANONICAL` | البديل الحالي `docs/03-analysis/00-project-baseline.md` |
| Legacy SRS Placeholder (`docs/99-legacy/analysis/01-SRS.md`) | Placeholder قديم | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا حذف دون Cleanup قرار واضح |
| Legacy Tech ERD Redirect (`docs/99-legacy/tech/01-ERD.md`) | Redirect تاريخي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | المرجع الحالي `docs/03-analysis/11-ERD.md` |
| Academic Progress Report 2026-08-16 (`docs/99-legacy/governance/`) | لقطة مرحلية مؤرخة | `LEGACY SNAPSHOT` | لا يستخدم عند تعارضه مع الأحدث |
| Two-week Plan (`docs/99-legacy/governance/two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED — ARCHIVED 2026-09-11` | لا تستخدم للتخطيط الحالي؛ البديل `docs/01-pm/05-work-plan.md` Roadmap v3 |
| Charter | تأسيس إداري | `SYNCHRONIZED — TEAM REVIEW STILL REQUIRED` | لا يعتمد التقنية أو المتطلبات بذاته |
| WBS | تجزئة العمل | `ALIGNED WITH ROADMAP v3 — SYNCHRONIZED 2026-09-05` | GOV-Q02 مغلق؛ DFD+UML معًا |
| Risk Register | المخاطر والتغيير | `ACTIVE — SYNCHRONIZED WITH ROADMAP v3 — 2026-09-05` | يراجع مع أي تغيرات لاحقة |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON` | لا إعلان Feasible قبل التحليل |
| Work Plan | Task Schedule + Gantt + Closure Tracker؛ PERT مفتوح | `ACTIVE — PRELIMINARY DEFENSE ROADMAP v3 — STATE SYNC 2026-09-05` | PERT غير مثبت فعليًا داخل الملف ويجب استكماله/مراجعته قبل إغلاق متطلب الجامعة |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | Work Plan Closure Tracker هو لوحة المتابعة |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | الإغلاق النهائي للمراجع/الفجوة قبل Chapter 2 final |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE` | إدخال كل مصدر مستخدم والتحقق منه |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | مراجعة الفجوة/التتبع قبل الفصل الثاني النهائي |
| Stakeholders | تحديد الأطراف | `ANALYZED — SYNCHRONIZED THROUGH DEC-077` | Guest + Beneficiary + Provider + YADD Administrator متسقة مع DEC-067/077 |
| Data Gathering | أدوات وأدلة جمع البيانات | `SURVEY ANALYZED — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | DEC-062؛ لا Interviews/Observation غير منفذة؛ research closure/traceability ما يزال مطلوبًا |
| Interview Guide | دليل مقابلات سابق | `RETAINED FOR TRACEABILITY` | لا يحول القالب إلى Evidence أو مقابلة منفذة |
| Interview Record Template | قالب مقابلات سابق | `RETAINED FOR TRACEABILITY` | يستخدم فقط إن نفذت مقابلة موثقة فعلًا لاحقًا |
| Current System Analysis | وصف الواقع والمشكلة | `DRAFT — SURVEY EVIDENCE AVAILABLE — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | لا تعميم؛ final research corroboration/prioritization ما يزال مطلوبًا |
| Proposed System | وصف النظام المقترح | `ANALYZED — SYNCHRONIZED THROUGH DEC-077` | Guest/public access integrated; مشتق لا Source of Truth |
| SRS | User/FR/NFR | `v0.9.9 — PARTIALLY ANALYZED — NOT BASELINED — SYNCHRONIZED THROUGH DEC-077` | Baseline بعد review/traceability؛ وجود بند لا يعني اعتماده تلقائيًا |
| Business Rules | قواعد النظام | `PARTIALLY ANALYZED — SYNCHRONIZED THROUGH DEC-077` | Guest public/private/auth rules BR-044..047 مضافة؛ السياسات المفتوحة تبقى Needs Verification |
| Lifecycles | حالات الطلب/المعاملة/الفاتورة/التقييم | `PARTIALLY ANALYZED — CURRENT THROUGH DEC-073` | DEC-077 لا يضيف Domain lifecycle جديدًا؛ Authentication boundary خارج lifecycle الكائنات الحالية |
| Use Cases | سيناريوهات الاستخدام | `ANALYZED — CORE SYNCHRONIZED THROUGH DEC-077` | UC-00 Guest browsing + protected-action auth boundary؛ final academic visual redraw pending |
| In-App Communication Model | التواصل قبل/بعد المعاملة | `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-12` | التواصل الأساسي لا يحتاج كشف رقم الهاتف؛ Guest لا يدخل Chat قبل Authentication وفق DEC-077/SRS |
| Account & Portal Model | الحساب والبوابات | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-077` | Guest pre-auth public access موثق؛ User واحد بعد Authentication |
| Provider Activity Model | نوع المقدم وتصنيفاته | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-074/076` | نوع حصري SERVICE/PRODUCT؛ تصنيف واحد أو أكثر داخل النوع؛ Draft قد يبدأ بصفر |
| Request Closure/Cancellation/Expiry | إغلاق الطلب والإلغاء والانتهاء | `ANALYZED_APPROVED / PARTIAL POLICY — SYNCHRONIZED 2026-09-04` | REQ-EXP-Q01 وSAFE-REQ-Q01 |
| Rating & Provider Reputation | التقييم وسمعة المقدم | `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-04` | Guest لا ينشئ Rating؛ الأهلية تبقى Completed Transaction |
| Location & Neighborhood Model | المطابقة والموقع | `ANALYZED_APPROVED / PARTIAL DATA` | LOC-DATA-Q01 وLOC-OPS-TIME-Q01 |
| Provider Verification Model | تحقق المقدم | `ANALYZED_APPROVED / PARTIAL POLICY` | أنواع الوثائق/الاحتفاظ/التراخيص ما تزال مفتوحة |
| AI Trust & Safety Model | التحقق والمراقبة المدعومة بالAI | `ANALYZED_APPROVED / PARTIAL POLICY` | السياسة/العتبات/المزود/الاحتفاظ مفتوحة |
| Provider Subscription Model | اشتراك المقدم | `ANALYZED_APPROVED / PARTIAL COMMERCIAL POLICY` | الباقات/الدفع الخارجي/أثر الانتهاء ما تزال مفتوحة |
| Process/Data Specifications | مواصفات العمليات والتدفقات والمخازن | `ANALYZED — CURRENT CORE SEMANTICS` | Guest لا ينشئ store/entity؛ راجع DEC-077 عند final freeze |
| Chapter One v1 | الفصل الأول | `v1.1 — TEXT SYNCHRONIZED — READY FOR PRELIMINARY DEFENSE REVIEW` | Derived Draft؛ final review/formatting pending |
| Chapter Two v1 | الفصل الثاني | `v1.1 — TEXT SYNCHRONIZED — CORE SOURCES VERIFIED — REVIEW OPEN` | final research/reference closure pending |
| Chapter Three v1 | الفصل الثالث | `v1.2 — WORKING DRAFT — RE-SYNC REQUIRED THROUGH DEC-077` | مشتق؛ يجب مزامنته مع Guest/Use Case/DFD changes قبل اعتباره current |
| DFD | تدفقات البيانات | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED THROUGH DEC-077` | Guest entity/flows added; standard visual redraw/export pending |
| UML | Use Case/Activity/Sequence/Class | `DRAFT FOR PRELIMINARY DEFENSE — USE CASE MODEL SYNCHRONIZED THROUGH DEC-077 — CLASS MODEL VALID` | final academic Use Case redraw + Activity/Sequence/Visual/A4 review ما يزال مفتوحًا |
| ERD | النموذج المفاهيمي | `DRAFT FOR PRELIMINARY DEFENSE — STRUCTURALLY VALID THROUGH DEC-077` | DEC-077 لا يضيف GUEST entity؛ final visual review + Chapter 4 derivation pending |
| Traceability Matrix | تتبع المتطلبات للمخططات | `CORE TRACEABILITY SYNCHRONIZED THROUGH DEC-077 — DESIGN TRACEABILITY PENDING` | Guest requirements traced to UC/DFD/UI boundary; إكمال Design/final diagram traceability قبل baseline |
| Class Diagram Package | النموذج الكائني التفصيلي | `SEMANTICALLY VERIFIED — TEAM APPROVED — SYNCHRONIZED THROUGH DEC-077 — NOT BASELINED` | DEC-077 لا يضيف Guest Class؛ Visual/A4 finalization pending |
| Design Gate | ضبط مستوى اعتماد التصميم | `OPEN FOR PRELIMINARY DESIGN — FINAL BASELINE STILL BLOCKED` | Chapter 4 full preliminary design required؛ final baseline later |
| Database Design / Relation Schema | Relation Schema | `DRAFT FOR PRELIMINARY DEFENSE — RE-SYNC REQUIRED AFTER DEC-074..076` | DEC-077 لا يفرض Guest table؛ auth/public projection design يجب مراعاته لاحقًا |
| Data Dictionary | الحقول والقيود | `CURRENT-MODEL SKELETON — RE-SYNC REQUIRED AFTER DEC-074..076` | public/private visibility ليست DB entity جديدة؛ SQL types/constraints/design details pending |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE — SYNCHRONIZED THROUGH DEC-077` | Guest public screens + auth gate مضافة؛ Figma/UX validation/final screens pending |
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