# YADD AI Task Router

> **Status:** `ACTIVE — NAVIGATION / CONTEXT ROUTING — NOT A SOURCE OF TRUTH`
>
> **Purpose:** توجيه أي AI Assistant إلى **أقل مجموعة مصادر لازمة للمهمة الحالية** بدل قراءة المستودع كاملًا.
>
> هذا الملف لا يعتمد Requirements أو Decisions ولا يعلو على Source of Truth. إذا تعارض Route هنا مع مصدر حاكم، يتبع المصدر الحاكم.

## 1. Core Rule

استخدم النمط التالي دائمًا:

```text
Task
  ↓
Identify task type + target artifact
  ↓
Load minimum authoritative context
  ↓
Extract referenced DEC / FR / BR / UC / model IDs
  ↓
Load only those referenced sections when needed
  ↓
Expand context only if a dependency, conflict, or verification gap appears
```

**ممنوع افتراضيًا:** قراءة المستودع كاملًا، قراءة كل ملفات مجلد ما، أو تحميل كل SRS / Decision Register / Business Rules لمجرد أن المهمة تخص المشروع.

## 2. Default Context Budget

ابدأ عادةً بـ **3–6 ملفات كحد افتراضي**.

- في الملفات الكبيرة، اقرأ القسم/المعرف المطلوب فقط إن كانت الأداة تسمح بذلك.
- استخدم البحث عن `DEC-*`, `FR-*`, `BR-*`, `UC-*` بدل القراءة الكاملة متى كان ذلك كافيًا.
- وسّع السياق فقط عند:
  1. وجود Reference مباشر لمصدر إضافي.
  2. ظهور تعارض.
  3. الحاجة للتحقق من Authority/Status.
  4. امتداد المهمة إلى Domain آخر.
  5. طلب المستخدم Audit شامل صراحةً.

## 3. Global Minimum — Read First

لكل مهمة داخل YADD:

1. `AI_CONTEXT.md`
2. هذا الملف: `docs/00-governance/00-ai-task-router.md`

ثم انتقل إلى Route المناسب أدناه.

لا تقرأ `docs/99-legacy/` إلا إذا كانت المهمة تاريخية/Traceability/Cleanup صراحةً.

---

## 4. Task Routes

### R1 — Requirement / Scope / Business Rule Change

**Use when:** إضافة/تعديل/حذف Feature، Requirement، Business Rule، Scope، Actor behavior، Lifecycle rule.

**MUST READ**
- `docs/00-governance/02-decision-register.md` — IDs ذات الصلة فقط.
- `docs/03-analysis/05-SRS.md` — المتطلبات ذات الصلة فقط.
- `docs/03-analysis/06-business-rules.md` — القواعد ذات الصلة فقط.

**READ IF NEEDED**
- `docs/03-analysis/07-lifecycles.md`
- `docs/03-analysis/08-use-cases.md`
- `docs/00-governance/03-open-questions.md`
- `docs/03-analysis/13-traceability-matrix.md`

**Rule:** لا تعتمد تغيير معنى المشروع مباشرة من Diagram أو Chapter Draft أو README.

---

### R2 — UML / Sequence / Activity / Use Case / Class

**Use when:** إنشاء/مراجعة/مزامنة UML.

**MUST READ**
- `diagrams/README.md`
- `docs/03-analysis/10-UML.md`
- Target diagram file only.

**THEN LOAD REFERENCES ONLY**
- Relevant `UC-*` section from `08-use-cases.md`.
- Relevant `BR-*` from `06-business-rules.md`.
- Relevant `DEC-*` from Decision Register.
- Relevant lifecycle/model only when the target uses states/timing/domain-specific rules.

**Do not read all diagrams by default.**

---

### R3 — DFD / Process / Data Flow

**MUST READ**
- `docs/03-analysis/09-DFD.md`
- `docs/03-analysis/12-process-data-specifications.md`

**READ IF NEEDED**
- Relevant SRS/BR/UC sections.
- `docs/03-analysis/13-traceability-matrix.md`.
- Relevant domain model from Section 5 below.

**Boundary:** DFD is logical analysis. Do not inject ASP.NET Core / EF Core / SQL Server / AI vendor as logical processes/stores unless a requirement specifically changes the logical model.

---

### R4 — ERD / Conceptual Data Model

**MUST READ**
- `docs/03-analysis/11-ERD.md`
- Relevant requirements/business rules for the entities being changed.

**READ IF NEEDED**
- `docs/03-analysis/13-traceability-matrix.md`
- Relevant Class view.
- Relevant domain model.

**Do not use Chapter Four physical schema to overwrite conceptual meaning silently.**

---

### R5 — Database Design / Data Dictionary / Physical Schema

**MUST READ**
- `docs/03-analysis/11-ERD.md`
- `docs/04-design/01-database-design.md`
- `docs/04-design/02-data-dictionary.md`
- Relevant DEC-091 section from Decision Register.

**READ IF NEEDED**
- Relevant SRS/BR/domain model.
- Relevant Class view.
- Interface/API contract if the change depends on it.

**Boundary:** exact SQL types, indexes, constraints, Identity/ApplicationUser mapping are Design decisions unless already fixed.

---

### R6 — UI/UX / Screen / User Flow

**MUST READ**
- Relevant Use Case from `docs/03-analysis/08-use-cases.md`
- `docs/04-design/03-interface-design.md`
- Target UI file under `docs/04-design/ui-ux/`

**READ IF NEEDED**
- `docs/04-design/ui-ux/03-user-flows.md`
- `docs/04-design/ui-ux/06-screen-specifications.md`
- Relevant lifecycle/business rule/domain model.

**Do not read Database Design unless the UI task truly depends on physical data details.**

---

### R7 — Research / Verification / Similar Systems

**MUST READ**
- `docs/02-research/02-source-register.md`
- Target research file.

**READ IF NEEDED**
- Evidence map / Similar Systems matrix.
- External primary/official/academic sources.

**Rule:** distinguish `RESEARCH_FINDING` from Team Decision. External research never becomes a YADD requirement automatically.

---

### R8 — Academic Chapter / Report Draft

**MUST READ**
- Original university requirement/source relevant to the requested chapter.
- Target chapter draft under `docs/05-report-drafts/`.
- Only canonical source documents needed by that chapter section.

**Typical mapping**
- Chapter 1 → project baseline + feasibility + scope/decisions.
- Chapter 2 → research sources + similar systems/evidence.
- Chapter 3 → SRS/BR/Lifecycles/Use Cases/DFD/UML/ERD as relevant to the requested section.
- Chapter 4 → database/interface/query/report design artifacts relevant to the requested section.

**Rule:** Chapter Draft is derived output, never Source of Truth.

---

### R9 — Project Management / Feasibility / Risk / Schedule

**MUST READ**
- Target PM document.
- `docs/01-pm/05-work-plan.md` when schedule/current execution state matters.
- `docs/00-governance/04-document-register.md` when artifact status matters.

**READ IF NEEDED**
- `docs/01-pm/04-feasibility-study.md`
- Risk Register / WBS / Charter as relevant.
- Decision Register only when scope/technology meaning is involved.

---

### R10 — Coding / Implementation

**Use when implementation starts or code is reviewed.**

**MUST READ**
- Relevant Requirement / Business Rule / Use Case for the feature.
- Relevant Chapter Four design artifact.
- DEC-091 for stack/auth/data-access direction.
- Target code/module only.

**READ IF NEEDED**
- ERD/Data Dictionary for persistence.
- UI contract for presentation/API behavior.
- Domain model for lifecycle/eligibility rules.

**Do not load unrelated product domains.**

---

### R11 — Cross-Model Synchronization / Consistency Audit

**Use when:** "مزامنة المخططات"، "راجع الاتساق"، "تأكد من جميع المخرجات المتأثرة".

Start from the **changed decision/requirement IDs**, not from all files.

**MUST READ**
- Relevant Decision(s).
- `docs/03-analysis/13-traceability-matrix.md`.
- `docs/00-governance/04-document-register.md`.

Then inspect only artifacts listed as affected by those IDs.

For a full-project audit explicitly requested by the user, expand in batches rather than loading the whole repository at once.

---

## 5. Domain Dependency Map

Use this table to add **one domain model** instead of reading all analysis files.

| Domain | Preferred focused model |
|---|---|
| Account / Authentication / Portal | `docs/03-analysis/14-account-portal-model.md` |
| Invoice / Approval / Dispute | `docs/03-analysis/15-invoice-approval-and-dispute.md` |
| In-App Communication / Transaction context | `docs/03-analysis/16-in-app-transaction-communication.md` |
| Request Closure / Cancellation / Expiry | `docs/03-analysis/17-request-cancellation-expiry.md` |
| Rating / Reputation | `docs/03-analysis/18-rating-reputation-model.md` |
| Provider Type / Activity / Eligibility | `docs/03-analysis/19-provider-activity-model.md` |
| Location / Neighborhood | `docs/03-analysis/20-location-and-neighborhood-model.md` |
| Provider Identity Verification | `docs/03-analysis/21-provider-verification-model.md` |
| AI Trust & Safety | `docs/03-analysis/22-ai-trust-safety-model.md` |
| Provider Subscription | `docs/03-analysis/23-provider-subscription-model.md` |

If a domain model references another domain, add the second model only when the task actually crosses that boundary.

---

## 6. Authority Escalation Rules

Regardless of Route:

- Academic requirement question → original university file has highest authority.
- Product meaning/scope decision → Decision Register.
- Requirement → SRS entry + its status.
- Business behavior → Business Rules.
- Research claim → Source Register + original source.
- Diagram/design/chapter → derived artifact; verify against higher source when meaning matters.
- Conflict → report it as `Synchronization`, `Decision`, or `Verification`; do not choose silently.

---

## 7. Stop Conditions — Do Not Expand Context Further When

Stop loading more files once:

- the governing Decision/Requirement/Business Rule is verified;
- the target artifact and its direct dependencies are understood;
- no unresolved conflict remains relevant to the task.

More context is **not** automatically better context.

---

## 8. Router Maintenance

This file is navigation metadata only.

Update it when:
- a canonical file is renamed/moved;
- a new focused domain model becomes the preferred route;
- a task category is repeatedly misrouted.

Do **not** copy project facts into this file merely to make AI answers faster. Keep facts in their canonical Sources of Truth.
