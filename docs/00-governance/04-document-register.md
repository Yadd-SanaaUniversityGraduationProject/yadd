# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-01  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `READY_FOR_REVIEW` | تبقى ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT` | يبقى حيًا طوال المشروع |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — CURRENT` | إغلاق P0 والمتطلبات المفتوحة حسب الأولوية؛ GOV-Q04 وPM-SCHED-Q01 أضيفا بعد إعادة الضبط |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — TEAM REVIEW REQUIRED` | دعم Problem Hypothesis بالأدلة الفعلية ومراجعة الفريق |
| Legacy Project Baseline (`docs/2-analysis`) | نسخة تاريخية مكررة | `LEGACY — NON-CANONICAL` | لا تستخدم كمصدر حقيقة ولا تحذف أثناء Stabilization دون قرار |
| Charter | تأسيس إداري | `EXISTING_NEEDS_ALIGNMENT` | إزالة ادعاءات غير مثبتة/توحيد الاسم |
| WBS | تجزئة العمل | `EXISTING_NEEDS_ALIGNMENT` | إعادة مطابقته للخطة الجديدة بعد تثبيت الجدول |
| Risk Register | المخاطر والتغيير | `ACTIVE — SCHEDULE RESET` | لا يحتوي على نافذة زمنية قديمة؛ يحدث بعد تثبيت الخارطة الجديدة |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON` | بيانات ومبررات موثقة |
| Work Plan | Schedule/Gantt/PERT | `RESET — AWAITING REAL DEADLINES AND TEAM CAPACITY` | بناء جدول جديد بعد تثبيت المواعيد الرسمية وتوفر الأعضاء |
| Two-week Plan (`05-two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED` | لا تستخدم للتخطيط الحالي ولا لتوزيع المهام |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | لا تستخدم كتقسيم عمل حالي؛ يبنى توزيع جديد بعد الخارطة الزمنية |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | مراجعة/استكمال التوثيق الأكاديمي والمنصات التشغيلية |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE` | إدخال كل مصدر مستخدم |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | استكمال الدراسات والملاحظات قبل الفصل الثاني النهائي |
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
| Chapter One Draft (`docs/05-report-drafts/01-chapter-one-draft.md`) | مسودة الفصل الأول للعرض والنقاش | `DRAFT v0.1 — ASSISTANT SUPERVISOR REVIEW ONLY` | تحتاج مزامنة منهج جمع البيانات والجدول الزمني قبل النسخة الرسمية |
| Chapter Two Draft (`docs/05-report-drafts/02-chapter-two-draft.md`) | مسودة الخلفية والدراسات السابقة للعرض والنقاش | `DRAFT v0.1 — ASSISTANT SUPERVISOR REVIEW ONLY` | Gap والمراجع والدراسات تحتاج استكمال تحقق قبل النسخة الرسمية |
| Academic Progress Report 2026-08-16 | لقطة مرحلية مؤرخة | `LEGACY SNAPSHOT` | لا يستخدم للحالة الحالية عند تعارضه مع القرارات الأحدث |
| DFD | تدفقات البيانات | `DRAFT` | GOV-Q02 + SRS baseline |
| UML | Activity/Sequence/Class | `DRAFT` | GOV-Q02 + SRS baseline |
| ERD | النموذج المفاهيمي | `DRAFT` | SRS + Business Rules مستقرة بما يكفي |
| Traceability Matrix | تتبع المتطلبات للمخططات | `SKELETON` | IDs مستقرة ومراجعة SRS |
| Database Design | Relation Schema | `BLOCKED` | ERD معتمد |
| Data Dictionary | الحقول والقيود | `BLOCKED` | Database Design |
| Interface Design | hierarchy/wireframes/forms | `DRAFT_BLOCKED` | Use Cases مستقرة + UX validation plan |
| Queries & Reports | متطلبات الاستعلام والتقارير | `BLOCKED` | SRS + Design |

`CURRENT` تعني أن الوثيقة مزامنة مع القرارات الحالية في نطاقها، ولا تعني أن المشروع أو SRS أصبح Baselined.  
`READY` لا تعني جاهزًا للفصل الأكاديمي إلا بعد اجتياز Readiness Checklist.  
مسودات الفصول في `docs/05-report-drafts/` وثائق مشتقة للعرض والمراجعة فقط، ولا تتغلب على Sources of Truth الأعلى عند أي تعارض.
