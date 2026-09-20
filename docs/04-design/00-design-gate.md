# Design Gate

> **الحالة:** `OPEN FOR PRELIMINARY DESIGN — FINAL BASELINE STILL BLOCKED`
>
> **آخر مزامنة:** 2026-09-20

وفق `DEC-059`، Chapter Four مطلوب بمستوى تصميم كامل للمناقشة الأولية، بينما يبقى SRS الحالي `PARTIALLY ANALYZED — NOT BASELINED`. لذلك يجوز إعداد ومراجعة تصميمات كاملة للمناقشة، لكن لا تعامل كالتزام تنفيذ نهائي أو Database Baseline قبل المراجعة النهائية.

قبل اعتماد أي تصميم نهائي:

- مراجعة SRS core requirements وTraceability النهائية.
- بقاء Business Rules/Lifecycles الحرجة متسقة مع القرارات الحالية، بما فيها `DEC-073`.
- مراجعة ERD وربط كل Entity/Table بحاجة موثقة؛ Working Physical Model الحالي متزامن على 32 جدولًا مع ApplicationUser mapping.
- تم تثبيت مجموعة الـ32 Table وأسماء الحقول وأنواع SQL Server وIdentity/ApplicationUser mapping كWorking Physical Model؛ تبقى nullability/constraint names/indexes/cascade/retention/migrations مصنفة بوضوح كمراجعة نهائية بدل تخمينها.
- اجتياز `docs/00-governance/06-readiness-checklist.md` للمستوى المطلوب.

مخرجات Chapter Four الحالية تصنف `DRAFT FOR PRELIMINARY DEFENSE` حتى Baseline رسمي لاحق.
