# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-01  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `READY_FOR_REVIEW` | تبقى ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT` | يبقى حيًا طوال المشروع؛ لا يضاف إليه قرار محمي دون موافقة صريحة |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — CURRENT` | إغلاق P0 حسب Closure Tracker؛ GOV-Q04 وPM-SCHED-Q01 يعكسان إعادة ضبط المنهج والجدول |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — TEAM REVIEW REQUIRED` | دعم Problem Hypothesis بالأدلة الفعلية ومراجعة الفريق |
| Legacy Project Baseline (`docs/2-analysis`) | نسخة تاريخية مكررة | `LEGACY — NON-CANONICAL` | لا تستخدم كمصدر حقيقة ولا تحذف أثناء Stabilization دون قرار |
| Charter | تأسيس إداري | `SYNCHRONIZED — TEAM REVIEW STILL REQUIRED` | مزامن مع نموذج التقييم الحالي والخارطة الزمنية؛ لا يعتمد التقنية أو المتطلبات بذاته |
| WBS | تجزئة العمل | `STRUCTURALLY ALIGNED / NEEDS SCHEDULE LABEL SYNC` | بنية العمل متوافقة مع Governance → Research → SRS → Modeling → Design → Audit؛ يحتاج فقط تحديث وصف الحالة عند المراجعة القادمة |
| Risk Register | المخاطر والتغيير | `ACTIVE — SYNCHRONIZED WITH ROADMAP v2` | مرجعه الزمني Work Plan الحالي؛ يراجع دوريًا مع تغير المخاطر |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON` | بيانات ومبررات موثقة؛ لا إعلان Feasible قبل التحليل |
| Work Plan | Schedule/Gantt/PERT + Closure Tracker | `ACTIVE — PRELIMINARY DEFENSE ROADMAP v2` | 11 سبتمبر موعد جاهزية داخلي؛ اليوم الفعلي للمناقشة النهائية ما يزال TBD |
| Two-week Plan (`05-two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED` | لا تستخدم للتخطيط الحالي ولا لتوزيع المهام |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | لا تستخدم كتقسيم عمل حالي؛ Closure Tracker في Work Plan هو لوحة المتابعة |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | استكمال/مزامنة حِرفة وأشغال وبقية الأدلة قبل Chapter 2 النهائي |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE` | إدخال كل مصدر مستخدم |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | مزامنة حِرفة/أشغال والفجوة قبل الفصل الثاني النهائي |
| Stakeholders | تحديد الأطراف | `DRAFT / NEEDS_SYNC` | مزامنة الأدوار الحالية ثم مراجعة الفريق |
| Data Gathering | أدوات وأدلة جمع البيانات | `SURVEY ANALYZED — INTERVIEWS NOT PLANNED` | يعتمد `SUR-01` كدليل المستخدمين؛ قبول عدم تنفيذ Interviews/Observation وفق هيكل 1447 يحتاج تثبيتًا عبر GOV-Q04 |
| Interview Guide | دليل مقابلات سابق | `NOT PLANNED / RETAINED FOR TRACEABILITY` | لا ينفذ ولا تنشأ سجلات INT-* |
| Interview Record Template | قالب مقابلات سابق | `NOT PLANNED / RETAINED FOR TRACEABILITY` | لا يستخدم |
| Current System Analysis | وصف الواقع والمشكلة | `DRAFT — SURVEY EVIDENCE AVAILABLE` | إسناد الادعاءات بـSUR-01 والبحث والأنظمة المشابهة وعدم التعميم |
| Proposed System | وصف النظام المقترح | `DRAFT / NEEDS_SYNC` | مزامنته مع القرارات الحالية قبل استخدامه أكاديميًا |
| SRS | User/FR/NFR | `PARTIALLY ANALYZED — NOT BASELINED` | مراجعة traceability والبنود المفتوحة قبل Baseline رسمي |
| Business Rules | قواعد النظام | `PARTIALLY ANALYZED — CURRENT` | القواعد الأساسية مزامنة؛ السياسات المفتوحة تبقى Needs Verification |
| Lifecycles | حالات الطلب/المعاملة/الفاتورة/التقييم | `PARTIALLY ANALYZED — CURRENT` | القيم الزمنية والسياسات المفتوحة غير مفترضة |
| Use Cases | سيناريوهات الاستخدام | `PARTIALLY ANALYZED — CURRENT` | استكمال السياسات المفتوحة وربطها بالـSRS |
| In-App Communication Model | التواصل قبل/بعد المعاملة | `ANALYZED_APPROVED — CURRENT` | سياسة الاحتفاظ التفصيلية لاحقًا |
| Request Closure/Cancellation/Expiry | إغلاق الطلب والإلغاء والانتهاء | `ANALYZED_APPROVED / PARTIAL POLICY` | REQ-EXP-Q01 وSAFE-REQ-Q01 |
| Rating & Provider Reputation | التقييم وسمعة المقدم | `ANALYZED_APPROVED — CURRENT` | التقييم الحالي أحادي من المستفيد للمقدم بعد Completed |
| Location & Neighborhood Model | المطابقة والموقع | `ANALYZED_APPROVED / PARTIAL DATA` | LOC-DATA-Q01 وLOC-OPS-TIME-Q01 |
| AI Trust & Safety Model | التحقق والمراقبة المدعومة بالAI | `ANALYZED_APPROVED / PARTIAL POLICY` | سياسة المحتوى/العتبات/المزود/الاحتفاظ مفتوحة |
| Chapter One Draft (`docs/05-report-drafts/01-chapter-one-draft.md`) | مسودة الفصل الأول للعرض والنقاش | `DRAFT v0.1 — NEEDS SYNCHRONIZATION` | ما زالت تحوي إشارات تاريخية للمقابلات/خطة الأسبوعين ويجب تنظيفها قبل النسخة الرسمية |
| Chapter Two Draft (`docs/05-report-drafts/02-chapter-two-draft.md`) | مسودة الخلفية والدراسات السابقة للعرض والنقاش | `DRAFT v0.1 — NEEDS RESEARCH SYNC` | يجب إدخال حِرفة وتحديث أشغال وGap والمراجع قبل النسخة الرسمية |
| Academic Progress Report 2026-08-16 | لقطة مرحلية مؤرخة | `LEGACY SNAPSHOT` | لا يستخدم للحالة الحالية عند تعارضه مع القرارات الأحدث |
| DFD | تدفقات البيانات | `DRAFT FOR PRELIMINARY DEFENSE` | GOV-Q02 + SRS sufficiently stable؛ لا يعد Baseline نهائيًا |
| UML | Activity/Sequence/Class | `DRAFT FOR PRELIMINARY DEFENSE` | GOV-Q02 + SRS sufficiently stable؛ لا يعد Baseline نهائيًا |
| ERD | النموذج المفاهيمي | `DRAFT FOR PRELIMINARY DEFENSE` | يبنى على SRS/Business Rules المستقرة بما يكفي ثم يراجع بعد المناقشة |
| Traceability Matrix | تتبع المتطلبات للمخططات | `SKELETON / REQUIRED FOR AUDIT` | IDs مستقرة ومراجعة SRS قبل 10 سبتمبر |
| Database Design | Relation Schema | `DRAFT-BLOCKED BY ERD STABILITY` | يسمح بمسودة للمناقشة بعد ERD، ولا يعتمد نهائيًا قبل Baseline |
| Data Dictionary | الحقول والقيود | `DRAFT-BLOCKED BY DATABASE DESIGN` | مسودة للمناقشة فقط حتى اعتماد التصميم لاحقًا |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE` | يرتبط بالUse Cases الحالية؛ اعتماد UX النهائي يحتاج اختبارًا لاحقًا |
| Queries & Reports | متطلبات الاستعلام والتقارير | `DRAFT-BLOCKED BY SRS/DESIGN` | يجهز بالقدر الأكاديمي المطلوب دون اختراع وظائف جديدة |

`CURRENT` تعني أن الوثيقة مزامنة مع القرارات الحالية في نطاقها، ولا تعني أن المشروع أو SRS أصبح Baselined.  
`DRAFT FOR PRELIMINARY DEFENSE` يعني صالحًا للمراجعة/العرض الأولي فقط، وليس تصميمًا نهائيًا أو التزام تنفيذ.  
`READY` لا تعني جاهزًا للفصل الأكاديمي إلا بعد اجتياز Readiness Checklist.  
مسودات الفصول في `docs/05-report-drafts/` وثائق مشتقة للعرض والمراجعة فقط، ولا تتغلب على Sources of Truth الأعلى عند أي تعارض.