# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-03  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `READY_FOR_REVIEW` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT THROUGH 2026-09-03` | سجل DEC-059..068 وإغلاق P0 الحالي |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — P0 CORE CLOSED` | GOV-Q01..04 وDEP-Q02 وRAT-CUST-Q01 مغلقة؛ بقية P1/P2 ظاهرة |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — SYNCHRONIZED 2026-09-03` | Core model/Actors/Architecture direction متزامنة؛ ما يزال يحتاج Team Review |
| Legacy PM Path (`docs/1-pm/`) | إدارة مشروع تاريخية قبل البنية الحالية | `LEGACY — NON-CANONICAL` | لا يستخدم كمصدر حقيقة ولا يحذف أثناء Stabilization |
| Legacy Project Baseline (`docs/2-analysis/00-project-baseline.md`) | نسخة تاريخية لخط الأساس | `LEGACY — NON-CANONICAL` | لا يستخدم كمصدر حقيقة ولا يحذف أثناء Stabilization |
| Legacy SRS Placeholder (`docs/2-analysis/01-SRS.md`) | Placeholder قديم | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا حذف دون Cleanup قرار واضح |
| Legacy Tech ERD Redirect (`docs/3-tech/01-ERD.md`) | Redirect تاريخي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | المرجع الحالي `docs/03-analysis/11-ERD.md` |
| Charter | تأسيس إداري | `SYNCHRONIZED — TEAM REVIEW STILL REQUIRED` | لا يعتمد التقنية أو المتطلبات بذاته |
| WBS | تجزئة العمل | `NEEDS ROADMAP v3 SYNC` | Work Plan انتقل إلى v3 وDiagram Gate 5 Sep |
| Risk Register | المخاطر والتغيير | `ACTIVE — NEEDS ROADMAP v3 CHECK` | يراجع مع ضغط موعد 5 Sep و11 Sep |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON` | لا إعلان Feasible قبل التحليل |
| Work Plan | Schedule/Gantt/PERT + Closure Tracker | `ACTIVE — PRELIMINARY DEFENSE ROADMAP v3` | 5 Sep Main Diagrams Gate؛ 11 Sep Freeze؛ 12 Sep defense window |
| Two-week Plan (`05-two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED` | لا تستخدم للتخطيط الحالي |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | Work Plan Closure Tracker هو لوحة المتابعة |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | مزامنة حِرفة وأشغال وبقية الأدلة قبل Chapter 2 النهائي |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE` | إدخال كل مصدر مستخدم |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | مزامنة الفجوة قبل الفصل الثاني النهائي |
| Stakeholders | تحديد الأطراف | `DRAFT / NEEDS SYNC WITH DEC-067` | Actors الرئيسية حسمت؛ ملف Stakeholders نفسه يحتاج مزامنة لاحقة |
| Data Gathering | أدوات وأدلة جمع البيانات | `SURVEY APPROVED — NEEDS TEXT SYNC` | GOV-Q04 مغلق؛ orally administered questionnaire لا يعد عينة مقابلة مستقلة |
| Interview Guide | دليل مقابلات سابق | `RETAINED FOR TRACEABILITY` | لا يحول الملاحظات المسترجعة إلى مقابلات موثقة |
| Interview Record Template | قالب مقابلات سابق | `RETAINED FOR TRACEABILITY` | يستخدم فقط إن نفذت مقابلة موثقة فعلًا لاحقًا |
| Current System Analysis | وصف الواقع والمشكلة | `DRAFT — SURVEY EVIDENCE AVAILABLE` | عدم التعميم |
| Proposed System | وصف النظام المقترح | `DRAFT / NEEDS SYNC WITH DEC-063..068` | لا يستخدم كTruth قبل المزامنة |
| SRS | User/FR/NFR | `v0.9.3 — PARTIALLY ANALYZED — NOT BASELINED — CURRENT` | Core P0 متزامنة؛ Baseline بعد traceability/review |
| Business Rules | قواعد النظام | `PARTIALLY ANALYZED — CURRENT` | العربون/التقييم/Portfolio/Core model متزامنة |
| Lifecycles | حالات الطلب/المعاملة/الفاتورة/التقييم | `PARTIALLY ANALYZED — CURRENT` | Rating directions مغلقة؛ القيم الزمنية المفتوحة غير مفترضة |
| Use Cases | سيناريوهات الاستخدام | `PARTIALLY ANALYZED — CURRENT` | Actor model وUC-07B/UC-10 متزامنة |
| In-App Communication Model | التواصل قبل/بعد المعاملة | `ANALYZED_APPROVED — CURRENT` | سياسة الاحتفاظ التفصيلية لاحقًا |
| Request Closure/Cancellation/Expiry | إغلاق الطلب والإلغاء والانتهاء | `ANALYZED_APPROVED / PARTIAL POLICY` | REQ-EXP-Q01 وSAFE-REQ-Q01 |
| Rating & Provider Reputation | التقييم وسمعة المقدم | `NEEDS SYNC WITH DEC-063` | النسخة القديمة أحادية الاتجاه لم تعد كافية |
| Location & Neighborhood Model | المطابقة والموقع | `ANALYZED_APPROVED / PARTIAL DATA` | LOC-DATA-Q01 وLOC-OPS-TIME-Q01 |
| AI Trust & Safety Model | التحقق والمراقبة المدعومة بالAI | `ANALYZED_APPROVED / PARTIAL POLICY` | السياسة/العتبات/المزود/الاحتفاظ مفتوحة |
| Chapter One v1 | الفصل الأول | `VERSION 1 — NEEDS SEP-03 SYNC` | لغة/منهج/جدول/Architecture direction تحتاج تحديثًا |
| Chapter Two v1 | الفصل الثاني | `VERSION 1 — NEEDS RESEARCH SYNC` | الأنظمة والفجوة والمراجع |
| Chapter Three v1 | الفصل الثالث | `VERSION 1 — STALE AFTER SEP-03 CLOSURE` | Reciprocal rating/DEP/Actors/DFD-UML/ERD تحتاج مزامنة |
| Academic Progress Report 2026-08-16 | لقطة مرحلية | `LEGACY SNAPSHOT` | لا يستخدم عند تعارضه مع الأحدث |
| DFD | تدفقات البيانات | `DRAFT — REBUILD REQUIRED BEFORE 5 SEP` | القديم يحتوي Agreement/stale actors؛ يبنى من SRS v0.9.3 |
| UML | Activity/Sequence/Class | `DRAFT — REBUILD REQUIRED BEFORE 5 SEP` | القديم يحتوي Agreement/rating debt |
| ERD | النموذج المفاهيمي | `DRAFT — MAJOR SYNC REQUIRED BEFORE 5 SEP` | إزالة Agreement/payment assumptions وإضافة current needs حسب traceability |
| Traceability Matrix | تتبع المتطلبات للمخططات | `SKELETON / REQUIRED FOR AUDIT` | مراجعة قبل 10 Sep |
| Database Design | Relation Schema | `DRAFT-BLOCKED BY ERD STABILITY` | Chapter 4 بعد ERD المستقر |
| Data Dictionary | الحقول والقيود | `DRAFT-BLOCKED BY DATABASE DESIGN` | Chapter 4 |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE` | يرتبط بالUse Cases الحالية؛ UX النهائي يحتاج اختبارًا |
| Queries & Reports | الاستعلامات والتقارير | `DRAFT-BLOCKED BY SRS/DESIGN` | يجهز بالقدر الأكاديمي المطلوب دون اختراع وظائف |

## Cleanup Policy — Stabilization

- لا يحذف أي `LEGACY` أثناء Stabilization لمجرد أنه يشبه ملفًا حاليًا؛ يجب التأكد أولًا من عدم وجود معلومات تاريخية أو روابط لازمة للتتبع.
- الملفات التي لا تحمل محتوى فريدًا تسجل `CLEANUP CANDIDATE AFTER STABILIZATION` ثم يحذفها الفريق في Cleanup منفصل بعد مراجعة الروابط والـGit history.
- لا يوجد في الشجرة الحالية Duplicate حرفي مؤكد بين ملفين مختلفين وفق آخر فحص مسجل.

`CURRENT` تعني أن الوثيقة مزامنة مع القرارات الحالية في نطاقها، ولا تعني أن المشروع أو SRS أصبح Baselined.  
`VERSION 1` تعني أول نسخة أكاديمية مجمعة للمراجعة، ولا تعني الاعتماد النهائي.  
`DRAFT FOR PRELIMINARY DEFENSE` يعني صالحًا للمراجعة/العرض الأولي فقط.  
إصدارات الفصول وثائق مشتقة ولا تتغلب على Sources of Truth الأعلى عند التعارض.