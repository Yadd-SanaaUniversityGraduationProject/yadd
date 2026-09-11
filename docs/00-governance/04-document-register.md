# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-11  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| Governance README | قواعد القراءة وSingle Source of Truth | `SYNCHRONIZED 2026-09-11` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية؛ بنية Legacy الحالية موثقة |
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `SOURCE_DERIVED — DECISION STATUS SYNCHRONIZED 2026-09-05` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT THROUGH DEC-076 / 2026-09-11` | يبقى حيًا؛ لا تعدل القرارات دون Evidence/Decision process |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — P0 CORE CLOSED — P1/P2 VISIBLE — SYNCHRONIZED 2026-09-11` | BUS-Q02 وPROV-ACT-Q01 أُغلقا عبر DEC-074/076؛ الباقي ظاهر |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — CORE MODEL SYNCHRONIZED 2026-09-05 — TEAM REVIEW REQUIRED` | لا يزال Draft؛ القرارات الأحدث تحكم عند أي تعارض |
| Legacy Archive (`docs/99-legacy/`) | حفظ النسخ والمسارات التاريخية خارج الشجرة canonical | `LEGACY — NON-CANONICAL — ORGANIZED 2026-09-11` | لا يستخدم كمصدر حقيقة؛ لا حذف أثناء Stabilization دون قرار منفصل |
| Legacy PM (`docs/99-legacy/pm/`) | إدارة مشروع تاريخية قبل البنية الحالية | `LEGACY — NON-CANONICAL` | البديل الحالي `docs/01-pm/` |
| Legacy Project Baseline (`docs/99-legacy/analysis/00-project-baseline.md`) | نسخة تاريخية لخط الأساس | `LEGACY — NON-CANONICAL` | البديل الحالي `docs/03-analysis/00-project-baseline.md` |
| Legacy SRS Placeholder (`docs/99-legacy/analysis/01-SRS.md`) | Placeholder قديم | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا حذف دون Cleanup قرار واضح |
| Legacy Tech ERD Redirect (`docs/99-legacy/tech/01-ERD.md`) | Redirect تاريخي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | المرجع الحالي `docs/03-analysis/11-ERD.md` |
| Academic Progress Report 2026-08-16 (`docs/99-legacy/governance/`) | لقطة مرحلية مؤرخة | `LEGACY SNAPSHOT` | لا يستخدم عند تعارضه مع الأحدث |
| Charter | تأسيس إداري | `SYNCHRONIZED — TEAM REVIEW STILL REQUIRED` | لا يعتمد التقنية أو المتطلبات بذاته |
| WBS | تجزئة العمل | `ALIGNED WITH ROADMAP v3 — SYNCHRONIZED 2026-09-05` | GOV-Q02 مغلق؛ DFD+UML معًا |
| Risk Register | المخاطر والتغيير | `ACTIVE — SYNCHRONIZED WITH ROADMAP v3 — 2026-09-05` | يراجع مع أي تغيرات لاحقة |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON` | لا إعلان Feasible قبل التحليل |
| Work Plan | Schedule/Gantt/PERT + Closure Tracker | `ACTIVE — PRELIMINARY DEFENSE ROADMAP v3 — STATE SYNC 2026-09-05` | PERT ما يزال يحتاج تحققًا فعليًا داخل الملف قبل اعتبار البند مغلقًا |
| Two-week Plan (`05-two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED` | لا تستخدم للتخطيط الحالي؛ بقيت في Governance للتتبع الصريح |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | Work Plan Closure Tracker هو لوحة المتابعة |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | الإغلاق النهائي للمراجع/الفجوة قبل Chapter 2 final |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE` | إدخال كل مصدر مستخدم والتحقق منه |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | مراجعة الفجوة/التتبع قبل الفصل الثاني النهائي |
| Stakeholders | تحديد الأطراف | `ANALYZED — SYNCHRONIZED 2026-09-04` | Actors الرئيسية متوافقة مع DEC-067 |
| Data Gathering | أدوات وأدلة جمع البيانات | `SURVEY ANALYZED — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | DEC-062؛ لا Interviews/Observation غير منفذة؛ research closure/traceability ما يزال مطلوبًا |
| Interview Guide | دليل مقابلات سابق | `RETAINED FOR TRACEABILITY` | لا يحول القالب إلى Evidence أو مقابلة منفذة |
| Interview Record Template | قالب مقابلات سابق | `RETAINED FOR TRACEABILITY` | يستخدم فقط إن نفذت مقابلة موثقة فعلًا لاحقًا |
| Current System Analysis | وصف الواقع والمشكلة | `DRAFT — SURVEY EVIDENCE AVAILABLE — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | لا تعميم؛ final research corroboration/prioritization ما يزال مطلوبًا |
| Proposed System | وصف النظام المقترح | `ANALYZED — SYNCHRONIZED 2026-09-05` | مشتق لا Source of Truth؛ يراجع مقابل القرارات الأحدث عند الحاجة |
| SRS | User/FR/NFR | `v0.9.6 — PARTIALLY ANALYZED — NOT BASELINED — SYNCHRONIZED THROUGH DEC-076` | Baseline بعد review/traceability؛ وجود بند لا يعني اعتماده تلقائيًا |
| Business Rules | قواعد النظام | `PARTIALLY ANALYZED — SYNCHRONIZED THROUGH DEC-076` | السياسات المفتوحة تبقى Needs Verification |
| Lifecycles | حالات الطلب/المعاملة/الفاتورة/التقييم | `PARTIALLY ANALYZED — CURRENT THROUGH DEC-073` | قرارات 074/076 تخص Provider model أكثر من lifecycle؛ أي أثر لاحق يحتاج مزامنة صريحة |
| Use Cases | سيناريوهات الاستخدام | `PARTIALLY ANALYZED — CURRENT` | specs current؛ final standard visual review pending |
| In-App Communication Model | التواصل قبل/بعد المعاملة | `ANALYZED_APPROVED — NEEDS DEC-075 DOCUMENT SYNC CHECK` | Decision Register/ERD/Class تحسم إعادة استخدام Conversation؛ تحقق من النص التفصيلي قبل إغلاق المزامنة |
| Provider Activity Model | نوع المقدم وتصنيفاته | `ANALYZED_APPROVED — SYNCHRONIZED THROUGH DEC-074/076` | نوع حصري SERVICE/PRODUCT؛ تصنيف واحد أو أكثر داخل النوع؛ Draft قد يبدأ بصفر |
| Request Closure/Cancellation/Expiry | إغلاق الطلب والإلغاء والانتهاء | `ANALYZED_APPROVED / PARTIAL POLICY — SYNCHRONIZED 2026-09-04` | REQ-EXP-Q01 وSAFE-REQ-Q01 |
| Rating & Provider Reputation | التقييم وسمعة المقدم | `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-04` | Beneficiary→Provider mandatory؛ Provider→Beneficiary optional |
| Location & Neighborhood Model | المطابقة والموقع | `ANALYZED_APPROVED / PARTIAL DATA` | LOC-DATA-Q01 وLOC-OPS-TIME-Q01 |
| Provider Verification Model | تحقق المقدم | `ANALYZED_APPROVED / PARTIAL POLICY` | أنواع الوثائق/الاحتفاظ/التراخيص ما تزال مفتوحة |
| AI Trust & Safety Model | التحقق والمراقبة المدعومة بالAI | `ANALYZED_APPROVED / PARTIAL POLICY` | السياسة/العتبات/المزود/الاحتفاظ مفتوحة |
| Provider Subscription Model | اشتراك المقدم | `ANALYZED_APPROVED / PARTIAL COMMERCIAL POLICY` | الباقات/الدفع الخارجي/أثر الانتهاء ما تزال مفتوحة |
| Process/Data Specifications | مواصفات العمليات والتدفقات والمخازن | `ANALYZED — SYNCHRONIZED 2026-09-05` | راجع القرارات الأحدث قبل final freeze؛ open values لا تُختلق |
| Chapter One v1 | الفصل الأول | `v1.1 — TEXT SYNCHRONIZED — READY FOR PRELIMINARY DEFENSE REVIEW` | Derived Draft؛ final review/formatting pending |
| Chapter Two v1 | الفصل الثاني | `v1.1 — TEXT SYNCHRONIZED — CORE SOURCES VERIFIED — REVIEW OPEN` | final research/reference closure pending |
| Chapter Three v1 | الفصل الثالث | `v1.2 — WORKING DRAFT — RE-SYNC REQUIRED AFTER DEC-074..076` | مشتق؛ يجب مزامنته قبل اعتباره current بعد القرارات الأخيرة |
| DFD | تدفقات البيانات | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-05` | standard visual redraw/export pending؛ أثر DEC-074..076 يحتاج consistency check لا افتراضًا |
| UML | Use Case/Activity/Sequence/Class | `DRAFT FOR PRELIMINARY DEFENSE — CLASS MODEL SYNCHRONIZED THROUGH DEC-076` | Activity/Sequence/final standard UML visual review ما يزال مفتوحًا |
| ERD | النموذج المفاهيمي | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED THROUGH DEC-076` | final visual review + Chapter 4 derivation pending |
| Traceability Matrix | تتبع المتطلبات للمخططات | `CORE TRACEABILITY SYNCHRONIZED THROUGH DEC-076 — DESIGN TRACEABILITY PENDING` | إكمال Design/final diagram traceability قبل baseline |
| Design Gate | ضبط مستوى اعتماد التصميم | `OPEN FOR PRELIMINARY DESIGN — FINAL BASELINE STILL BLOCKED` | Chapter 4 full preliminary design required؛ final baseline later |
| Database Design / Relation Schema | Relation Schema | `DRAFT FOR PRELIMINARY DEFENSE — RE-SYNC REQUIRED AFTER DEC-074..076` | يجب إعادة اشتقاق القيود المرتبطة ProviderActivity/Conversation قبل اعتماد التصميم |
| Data Dictionary | الحقول والقيود | `CURRENT-MODEL SKELETON — RE-SYNC REQUIRED AFTER DEC-074..076` | SQL types/constraints/design details pending |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE — CURRENT USE-CASE HIERARCHY` | Figma/UX validation/final screens pending؛ راجع أثر النوع الحصري والتصنيفات المتعددة |
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
