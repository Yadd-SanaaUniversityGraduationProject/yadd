# WBS ومنهج إدارة مشروع يَد | YADD

> **الحالة:** `UPDATED_FOR_ANALYSIS_DEADLINE`

## فصل إدارة المشروع عن منهج تحليل النظام

- **إدارة العمل:** GitHub + Markdown + مراجعات قصيرة + تخطيط تكراري.
- **منهج تحليل/نمذجة النظام:** `NEEDS_VERIFICATION` عبر GOV-Q02 بسبب تعارض ظاهر بين دليل المشاريع وهيكل 1447.

لا تستخدم عبارة Hybrid Agile-PMP لحل تعارض مخططات التحليل؛ إدارة المشروع ومنهج نمذجة النظام مستويان مختلفان.

## WBS حتى جاهزية الفصول

```text
0.0 YADD Analysis & Design Baseline
├── 1.0 Governance
│   ├── 1.1 University requirements mapping
│   ├── 1.2 Decision register
│   └── 1.3 Open questions / status register
├── 2.0 Project Management
│   ├── 2.1 Charter / Scope
│   ├── 2.2 Work plan, Gantt, PERT
│   ├── 2.3 Feasibility
│   └── 2.4 Risks and change control
├── 3.0 Research & Discovery
│   ├── 3.1 Data gathering
│   ├── 3.2 Current system / problem analysis
│   ├── 3.3 Literature & similar systems
│   └── 3.4 Research source register
├── 4.0 Requirements Engineering
│   ├── 4.1 Stakeholders / actors
│   ├── 4.2 User requirements
│   ├── 4.3 Functional requirements
│   ├── 4.4 Non-functional requirements
│   ├── 4.5 Business rules
│   └── 4.6 Lifecycles / exceptions
├── 5.0 Analysis Modeling
│   ├── 5.1 Use cases + specifications
│   ├── 5.2 DFD (subject to GOV-Q02)
│   ├── 5.3 UML activity/sequence/class
│   ├── 5.4 ERD
│   └── 5.5 Process/data specifications
├── 6.0 Design
│   ├── 6.1 Relation schema
│   ├── 6.2 Data dictionary
│   ├── 6.3 Interface hierarchy/wireframes
│   └── 6.4 Queries/reports
└── 7.0 Readiness Audit
    ├── 7.1 Traceability
    ├── 7.2 Consistency review
    └── 7.3 Baseline tag for chapter extraction
```

## Definition of Done

أي عنصر لا يعد منجزًا لمجرد وجود ملف باسمه. يعتبر منجزًا عندما:

1. يحتوي محتوى قابلًا للمراجعة.
2. لا يعتمد على سؤال P0 مفتوح دون تمييز.
3. حالته واضحة.
4. روابطه بالمتطلبات/القرارات موثقة.
5. تمت مراجعته من عضو آخر على الأقل قبل `APPROVED`.
