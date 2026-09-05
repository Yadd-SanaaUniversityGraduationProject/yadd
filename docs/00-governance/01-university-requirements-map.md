# خريطة متطلبات الجامعة إلى وثائق المشروع

> **الحالة:** `SOURCE_DERIVED — DECISION STATUS SYNCHRONIZED 2026-09-05`
>
> **المصادر المدققة:** ملف `هيكل المشروع1447.pdf` + `دليل المشاريع.pdf` المرفقان بالمشروع. هذه الوثيقة لا تعيد كتابة الفصول؛ بل تحول متطلبات الجامعة إلى مخرجات عمل. ملفات الجامعة الأصلية تبقى أعلى سلطة أكاديمية.

## 1. الفصل الأول — Introduction

هيكل 1447 يطلب: Current System، Problem Statement، Opportunities، Objectives، Significance، Scope and Constraints، Methodology، Requirements، Work Plan (Task Schedule/Gantt/PERT)، Feasibility (Economic/Technical/Operational)، Risk Analysis، Previous Projects، Theoretical Background، Report Organization.

### الوثائق التي تسبق الفصل الأول

| المتطلب | مصدره داخل المستودع |
|---|---|
| Current System / Problem / Opportunities | `docs/03-analysis/03-current-system-analysis.md` |
| Objectives / Scope / Constraints | `docs/03-analysis/00-project-baseline.md` + Decision Register |
| Methodology | `docs/01-pm/02-WBS.md` + `DEC-060 / GOV-Q02` |
| Project Requirements | `docs/03-analysis/05-SRS.md` |
| Task Schedule / Gantt / PERT | `docs/01-pm/05-work-plan.md` |
| Feasibility | `docs/01-pm/04-feasibility-study.md` |
| Risk Analysis | `docs/01-pm/03-Risks.md` |
| Previous Projects / Theoretical Background | `docs/02-research/*` |

## 2. الفصل الثاني — Background and Literature Review

هيكل 1447 يطلب Background، Literature Review، دراسة ثلاثة أنظمة على الأقل (الأهداف، التقنية، الميزات، المزايا، العيوب، الاستنتاج)، ثم Comparison Table.

### الوثائق السابقة له

- `docs/02-research/00-research-plan.md`
- `docs/02-research/01-similar-systems-matrix.md`
- `docs/02-research/02-source-register.md`
- `docs/02-research/03-theoretical-background.md`

لا يجوز ملء أسماء الأنظمة أو نتائج المقارنة دون بحث ومراجع مسجلة.

## 3. الفصل الثالث — Requirements Analysis and Modeling

هيكل 1447 يطلب Data Gathering (Document Analysis, Interviews, Observation, Similar Systems)، Proposed System Description، User/System Requirements، FR/NFR، DFD، ERD، Process Specification، Data Flow Description، Data Stores Description، وUML (Use Case + Specification + Activity + Sequence + Class).

### الوثائق السابقة له

- `01-stakeholders.md`
- `02-data-gathering.md`
- `03-current-system-analysis.md`
- `04-proposed-system.md`
- `05-SRS.md`
- `06-business-rules.md`
- `07-lifecycles.md`
- `08-use-cases.md`
- `09-DFD.md`
- `10-UML.md`
- `11-ERD.md`
- `12-process-data-specifications.md`
- `13-traceability-matrix.md`

> **حالة التنفيذ الحالية:** الفريق نفذ وحلل `SUR-01`. حُسم `GOV-Q04` في 2026-09-03 وفق `DEC-062`: قبل المشرف الاستبيان كأداة جمع بيانات المستخدمين للمشروع، وتعد الإجابات الشفهية باستخدام الاستبيان نفسه interviewer-administered questionnaire وليست مقابلات مستقلة. لا يغير ذلك نص هيكل 1447 الأصلي ولا يسمح بادعاء تنفيذ Interviews/Observation لم تنفذ فعليًا.

## 4. الفصل الرابع — Design

هيكل 1447 يطلب Database Design (Relation Schema, Data Dictionary, Query Statement) وSystem Interface Design (Hierarchy, Main/Transitional Interfaces, Forms, Query, Reports).

### الوثائق السابقة له

- `docs/04-design/01-database-design.md`
- `docs/04-design/02-data-dictionary.md`
- `docs/04-design/03-interface-design.md`
- `docs/04-design/04-queries-and-reports.md`

## 5. قرارات أكاديمية/تشغيلية حُسمت ومعلومة ما تزال مفتوحة

- `GOV-Q01` — `CLOSED` عبر `DEC-059`: Chapter Four مطلوب بمستوى تصميم كامل للمناقشة الأولية؛ ERD في Chapter Three، وRelation Schema/Data Dictionary/Query Statements والواجهات في Chapter Four.
- `GOV-Q02` — `CLOSED` عبر `DEC-060`: يستخدم المشروع DFD وUML معًا في Chapter Three وفق قرار المشرف.
- `GOV-Q03` — `CLOSED` عبر `DEC-061`: لغة التقرير العربية مع المصطلحات التقنية الإنجليزية عند الحاجة.
- `GOV-Q04` — `CLOSED` عبر `DEC-062`: الاستبيان معتمد كأداة جمع بيانات المستخدمين؛ لا تنسب مقابلات أو ملاحظة مستخدمين غير منفذة.
- `PM-SCHED-Q01` — `CLOSED FOR PLANNING`: بوابة المخططات 5 سبتمبر، Freeze داخلي 11 سبتمبر، وتبدأ فترة المناقشات من 12 سبتمبر 2026.
- **Needs Verification:** اليوم الدقيق لمناقشة فريق YADD داخل فترة المناقشات ما يزال غير مثبت، ولا يحول الموعد الداخلي إلى موعد رسمي من الجامعة.

## 6. أخطاء ترقيم في قالب 1447

القالب نفسه يحتوي تكرار أرقام في الفصلين الأول والثالث/الرابع. يجب الحفاظ على محتوى البنود، لكن لا يعتمد الترقيم المكرر كمرجع هندسي حتى يثبت القالب النهائي من القسم.
