# سجل حالة وثائق المشروع

> **آخر مزامنة:** 2026-09-05  
> هذا السجل يصف الحالة الفعلية للوثائق، ولا يرفع حالة أي متطلب أو قرار بذاته.

| الوثيقة | الغرض | الحالة الحالية | شرط الإغلاق/الملاحظة |
|---|---|---|---|
| University Requirements Map | تحويل متطلبات الجامعة إلى مخرجات | `SOURCE_DERIVED — DECISION STATUS SYNCHRONIZED 2026-09-05` | ملفات الجامعة الأصلية أعلى سلطة أكاديمية |
| Decision Register | فصل القرار عن المقترح وحفظ superseded history | `ACTIVE — CURRENT THROUGH DEC-073 / 2026-09-04` | يبقى حيًا؛ لا تعدل القرارات دون Evidence/Decision process |
| Open Questions | منع الافتراضات الصامتة | `ACTIVE — P0 CORE CLOSED — P1/P2 VISIBLE` | GOV-Q01..04 وDEP-Q02 وRAT-CUST-Q01 وDISPUTE-AUTH-Q01 مغلقة؛ الباقي ظاهر |
| Project Baseline (`docs/03-analysis`) | تعريف المشكلة والنطاق الحالي | `DRAFT — CORE MODEL SYNCHRONIZED 2026-09-05 — TEAM REVIEW REQUIRED` | SRS v0.9.5/DEC-073 متزامنان؛ ما يزال Draft |
| Legacy PM Path (`docs/1-pm/`) | إدارة مشروع تاريخية قبل البنية الحالية | `LEGACY — NON-CANONICAL` | لا يستخدم كمصدر حقيقة ولا يحذف أثناء Stabilization |
| Legacy Project Baseline (`docs/2-analysis/00-project-baseline.md`) | نسخة تاريخية لخط الأساس | `LEGACY — NON-CANONICAL` | لا يستخدم كمصدر حقيقة ولا يحذف أثناء Stabilization |
| Legacy SRS Placeholder (`docs/2-analysis/01-SRS.md`) | Placeholder قديم | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | لا حذف دون Cleanup قرار واضح |
| Legacy Tech ERD Redirect (`docs/3-tech/01-ERD.md`) | Redirect تاريخي | `LEGACY — CLEANUP CANDIDATE AFTER STABILIZATION` | المرجع الحالي `docs/03-analysis/11-ERD.md` |
| Charter | تأسيس إداري | `SYNCHRONIZED — TEAM REVIEW STILL REQUIRED` | لا يعتمد التقنية أو المتطلبات بذاته |
| WBS | تجزئة العمل | `ALIGNED WITH ROADMAP v3 — SYNCHRONIZED 2026-09-05` | GOV-Q02 مغلق؛ DFD+UML معًا |
| Risk Register | المخاطر والتغيير | `ACTIVE — SYNCHRONIZED WITH ROADMAP v3 — 2026-09-05` | يراجع مع ضغط 5/11 Sep وأي تغيرات لاحقة |
| Feasibility Study | اقتصادي/تقني/تشغيلي | `SKELETON` | لا إعلان Feasible قبل التحليل |
| Work Plan | Schedule/Gantt/PERT + Closure Tracker | `ACTIVE — PRELIMINARY DEFENSE ROADMAP v3 — STATE SYNC 2026-09-05` | 5 Sep diagram gate؛ 11 Sep freeze؛ 12 Sep defense window |
| Two-week Plan (`05-two-week-plan.md`) | خطة تاريخية سابقة | `LEGACY / SUPERSEDED` | لا تستخدم للتخطيط الحالي |
| GitHub Issues #1..#10 | مهام خطة قديمة | `CLOSED — NOT PLANNED` | Work Plan Closure Tracker هو لوحة المتابعة |
| Research Plan | خطة الدراسات السابقة | `READY_FOR_USE` | — |
| Similar Systems Matrix | مقارنة الأنظمة | `ACTIVE — RESEARCH IN PROGRESS` | الإغلاق النهائي للمراجع/الفجوة قبل Chapter 2 final |
| Source Register | سجل المصادر IEEE والتحقق | `ACTIVE` | إدخال كل مصدر مستخدم والتحقق منه |
| Previous Studies Evidence Map | ربط الدراسات بالادعاءات | `ACTIVE / NEEDS_REVIEW` | مراجعة الفجوة/التتبع قبل الفصل الثاني النهائي |
| Stakeholders | تحديد الأطراف | `ANALYZED — SYNCHRONIZED 2026-09-04` | Actors الرئيسية متوافقة مع DEC-067 |
| Data Gathering | أدوات وأدلة جمع البيانات | `SURVEY ANALYZED — SURVEY-ONLY ACCEPTED — SYNCHRONIZED 2026-09-05` | DEC-062؛ لا Interviews/Observation غير منفذة؛ البحث/Current System integration ما يزال مطلوبًا |
| Interview Guide | دليل مقابلات سابق | `RETAINED FOR TRACEABILITY` | لا يحول القالب إلى Evidence أو مقابلة منفذة |
| Interview Record Template | قالب مقابلات سابق | `RETAINED FOR TRACEABILITY` | يستخدم فقط إن نفذت مقابلة موثقة فعلًا لاحقًا |
| Current System Analysis | وصف الواقع والمشكلة | `DRAFT — SURVEY EVIDENCE AVAILABLE` | لا تعميم؛ يراجع مع findings البحثية النهائية |
| Proposed System | وصف النظام المقترح | `ANALYZED — SYNCHRONIZED 2026-09-05` | يشمل current core flow وDEC-073؛ مشتق لا Source of Truth |
| SRS | User/FR/NFR | `v0.9.5 — PARTIALLY ANALYZED — NOT BASELINED — CURRENT` | Core P0 وDEC-073 متزامنة؛ Baseline بعد review/traceability |
| Business Rules | قواعد النظام | `PARTIALLY ANALYZED — CURRENT THROUGH DEC-073` | السياسات المفتوحة تبقى Needs Verification |
| Lifecycles | حالات الطلب/المعاملة/الفاتورة/التقييم | `PARTIALLY ANALYZED — CURRENT THROUGH DEC-073` | Completed/Disputed/rating semantics متزامنة |
| Use Cases | سيناريوهات الاستخدام | `PARTIALLY ANALYZED — CURRENT` | specs current؛ final standard visual review pending |
| In-App Communication Model | التواصل قبل/بعد المعاملة | `ANALYZED_APPROVED — CURRENT` | سياسة الاحتفاظ التفصيلية لاحقًا |
| Request Closure/Cancellation/Expiry | إغلاق الطلب والإلغاء والانتهاء | `ANALYZED_APPROVED / PARTIAL POLICY — SYNCHRONIZED 2026-09-04` | REQ-EXP-Q01 وSAFE-REQ-Q01 |
| Rating & Provider Reputation | التقييم وسمعة المقدم | `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-04` | Beneficiary→Provider mandatory؛ Provider→Beneficiary optional |
| Location & Neighborhood Model | المطابقة والموقع | `ANALYZED_APPROVED / PARTIAL DATA` | LOC-DATA-Q01 وLOC-OPS-TIME-Q01 |
| AI Trust & Safety Model | التحقق والمراقبة المدعومة بالAI | `ANALYZED_APPROVED / PARTIAL POLICY` | السياسة/العتبات/المزود/الاحتفاظ مفتوحة |
| Process/Data Specifications | مواصفات العمليات والتدفقات والمخازن | `ANALYZED — SYNCHRONIZED 2026-09-05` | DEC-073 reflected; open values not invented |
| Chapter One v1 | الفصل الأول | `v1.1 — TEXT SYNCHRONIZED — READY FOR PRELIMINARY DEFENSE REVIEW` | Derived Draft؛ final review/formatting pending |
| Chapter Two v1 | الفصل الثاني | `v1.1 — TEXT SYNCHRONIZED — CORE SOURCES VERIFIED — REVIEW OPEN` | final research/reference closure pending |
| Chapter Three v1 | الفصل الثالث | `v1.2 — CORE MODEL CURRENT — WORKING DIAGRAMS AVAILABLE` | final standard visual redraw/export + design traceability + review pending |
| Academic Progress Report 2026-08-16 | لقطة مرحلية | `LEGACY SNAPSHOT` | لا يستخدم عند تعارضه مع الأحدث |
| DFD | تدفقات البيانات | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-05` | semantic model current including DEC-073؛ standard visual redraw/export pending |
| UML | Use Case/Activity/Sequence/Class | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-05` | Section 5 Mermaid fixed; Activity/Sequence current; Class/final UML redraw pending |
| ERD | النموذج المفاهيمي | `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-05` | DEC-073 traceability current؛ final visual review + Chapter 4 derivation pending |
| Traceability Matrix | تتبع المتطلبات للمخططات | `CORE TRACEABILITY SYNCHRONIZED 2026-09-04 — DESIGN TRACEABILITY PENDING` | إكمال Design/final diagram traceability قبل freeze/baseline |
| Design Gate | ضبط مستوى اعتماد التصميم | `OPEN FOR PRELIMINARY DESIGN — FINAL BASELINE STILL BLOCKED` | Chapter 4 full preliminary design required؛ final baseline later |
| Database Design / Relation Schema | Relation Schema | `DRAFT FOR PRELIMINARY DEFENSE — DERIVED FROM CURRENT ERD` | physical types/constraints/normalization review pending |
| Data Dictionary | الحقول والقيود | `CURRENT-MODEL SKELETON — 2026-09-05` | SQL types/constraints/design details pending |
| Interface Design | hierarchy/wireframes/forms | `DRAFT FOR PRELIMINARY DEFENSE — CURRENT USE-CASE HIERARCHY` | Figma/UX validation/final screens pending |
| Queries & Reports | الاستعلامات والتقارير | `DRAFT FOR PRELIMINARY DEFENSE — REQUIREMENTS-ALIGNED` | report details/SQL pending; no invented KPIs |

## Cleanup Policy — Stabilization

- لا يحذف أي `LEGACY` أثناء Stabilization لمجرد أنه يشبه ملفًا حاليًا؛ يجب التأكد أولًا من عدم وجود معلومات تاريخية أو روابط لازمة للتتبع.
- الملفات التي لا تحمل محتوى فريدًا تسجل `CLEANUP CANDIDATE AFTER STABILIZATION` ثم يحذفها الفريق في Cleanup منفصل بعد مراجعة الروابط والـGit history.
- لا يوجد في الشجرة الحالية Duplicate حرفي مؤكد بين ملفين مختلفين وفق آخر فحص مسجل.

`CURRENT` تعني أن الوثيقة مزامنة مع القرارات الحالية في نطاقها، ولا تعني أن المشروع أو SRS أصبح Baselined.  
`VERSION/v1.x` تعني نسخة أكاديمية مجمعة للمراجعة، ولا تعني الاعتماد النهائي.  
`DRAFT FOR PRELIMINARY DEFENSE` يعني صالحًا للمراجعة/العرض الأولي فقط.  
إصدارات الفصول ووثائق التصميم المشتقة لا تتغلب على Sources of Truth الأعلى عند التعارض.
