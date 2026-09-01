# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-01  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `READY_FOR_REVIEW` | تبقى ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT` | يبقى حيًا طوال المشروع؛ لا يضاف إليه قرار محمي دون موافقة صريحة |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — CURRENT` | إغلاق P0 حسب Closure Tracker؛ GOV-Q04 وPM-SCHED-Q01 يعكسان إعادة ضبط المنهج والجدول |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — TEAM REVIEW REQUIRED` | دعم Problem Hypothesis بالأدلة الفعلية ومراجعة الفريق |
| Legacy PM Path (`docs/1-pm/`) | إدارة مشروع تاريخية قبل البنية الحالية | `LEGACY — NON-CANONICAL` | محتواه يختلف تاريخيًا عن `docs/01-pm/`؛ لا يستخدم كمصدر حقيقة ولا يحذف أثناء Stabilization |
| Legacy Project Baseline (`docs/2-analysis/00-project-baseline.md`) | نسخة تاريخية لخط الأساس | `LEGACY — NON-CANONICAL` | يحتوي تاريخًا/صياغات قديمة مختلفة؛ لا يستخدم كمصدر حقيقة ولا يحذف أثناء Stabilization |
| Legacy SRS Placeholder (`docs/2-analysis/01-SRS.md`) | Placeholder قديم قبل إنشاء SRS الحالي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا يحتوي متطلبات فعلية ولا توجد إحالات حالية معروفة إليه؛ مرشح للحذف بعد Stabilization ضمن Cleanup قرار واضح |
| Legacy Tech ERD Redirect (`docs/3-tech/01-ERD.md`) | Redirect تاريخي إلى ERD الحالي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا يحتوي نموذجًا مستقلًا؛ المرجع الحالي `docs/03-analysis/11-ERD.md`; يحذف فقط بعد Stabilization وفحص الروابط |
| Charter | تأسيس إداري | `SYNCHRONIZED — TEAM REVIEW STILL REQUIRED` | مزامن مع نموذج التقييم الحالي والخارطة الزمنية؛ لا يعتمد التقنية أو المتطلبات بذاته |
| WBS | تجزئة العمل | `ALIGNED WITH PRELIMINARY DEFENSE ROADMAP v2` | بنية العمل متوافقة مع Governance → Research → SRS → Modeling → Design → Audit |
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
| Chapter One v1 (`docs/05-report-drafts/01-chapter-one-v1.md`) | الإصدار الأول من الفصل الأول للمراجعة | `VERSION 1 — NOT BASELINED` | تم مزامنته مع قرار عدم تنفيذ المقابلات والخطة الزمنية الحالية؛ ما تزال GOV-Q01/Q02/Q04 والجدوى وبعض المصادر مفتوحة |
| Chapter Two v1 (`docs/05-report-drafts/02-chapter-two-v1.md`) | الإصدار الأول من الفصل الثاني للمراجعة | `VERSION 1 — NEEDS RESEARCH SYNC` | يحتاج إدخال/مزامنة حِرفة وتحديث أشغال وGap والمراجع قبل النسخة النهائية |
| Chapter Three v1 (`docs/05-report-drafts/03-chapter-three-v1.md`) | الإصدار الأول من فصل التحليل والنمذجة | `VERSION 1 — NOT BASELINED` | مشتق من التحليل الحالي؛ GOV-Q02/GOV-Q04/DEP-Q02 والمخططات/ERD تحتاج إغلاق أو تحديث قبل النسخة النهائية |
| Academic Progress Report 2026-08-16 | لقطة مرحلية مؤرخة | `LEGACY SNAPSHOT` | لا يستخدم للحالة الحالية عند تعارضه مع القرارات الأحدث |
| DFD | تدفقات البيانات | `DRAFT FOR PRELIMINARY DEFENSE` | GOV-Q02 + SRS sufficiently stable؛ لا يعد Baseline نهائيًا |
| UML | Activity/Sequence/Class | `DRAFT FOR PRELIMINARY DEFENSE` | GOV-Q02 + SRS sufficiently stable؛ لا يعد Baseline نهائيًا |
| ERD | النموذج المفاهيمي | `DRAFT FOR PRELIMINARY DEFENSE` | يبنى على SRS/Business Rules المستقرة بما يكفي ثم يراجع بعد المناقشة |
| Traceability Matrix | تتبع المتطلبات للمخططات | `SKELETON / REQUIRED FOR AUDIT` | IDs مستقرة ومراجعة SRS قبل 10 سبتمبر |
| Database Design | Relation Schema | `DRAFT-BLOCKED BY ERD STABILITY` | يسمح بمسودة للمناقشة بعد ERD، ولا يعتمد نهائيًا قبل Baseline |
| Data Dictionary | الحقول والقيود | `DRAFT-BLOCKED BY DATABASE DESIGN` | مسودة للمناقشة فقط حتى اعتماد التصميم لاحقًا |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE` | يرتبط بالUse Cases الحالية؛ اعتماد UX النهائي يحتاج اختبارًا لاحقًا |
| Queries & Reports | متطلبات الاستعلام والتقارير | `DRAFT-BLOCKED BY SRS/DESIGN` | يجهز بالقدر الأكاديمي المطلوب دون اختراع وظائف جديدة |

## Cleanup Policy — Stabilization

- لا يحذف أي `LEGACY` أثناء Stabilization لمجرد أنه يشبه ملفًا حاليًا؛ يجب التأكد أولًا من عدم وجود معلومات تاريخية أو روابط لازمة للتتبع.
- الملفات التي لا تحمل محتوى فريدًا تسجل `CLEANUP CANDIDATE AFTER STABILIZATION` ثم يحذفها الفريق في Cleanup منفصل بعد مراجعة الروابط والـGit history.
- لا يوجد في الشجرة الحالية Duplicate حرفي مؤكد (نفس Blob/SHA) بين ملفين مختلفين.

`CURRENT` تعني أن الوثيقة مزامنة مع القرارات الحالية في نطاقها، ولا تعني أن المشروع أو SRS أصبح Baselined.  
`VERSION 1` تعني أول نسخة أكاديمية مجمعة للمراجعة، ولا تعني الاعتماد النهائي أو Baseline.  
`DRAFT FOR PRELIMINARY DEFENSE` يعني صالحًا للمراجعة/العرض الأولي فقط، وليس تصميمًا نهائيًا أو التزام تنفيذ.  
`READY` لا تعني جاهزًا للفصل الأكاديمي إلا بعد اجتياز Readiness Checklist.  
إصدارات الفصول في `docs/05-report-drafts/` وثائق مشتقة للعرض والمراجعة فقط، ولا تتغلب على Sources of Truth الأعلى عند أي تعارض.