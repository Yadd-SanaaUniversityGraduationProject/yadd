# System Queries & Reports

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — REQUIREMENTS-ALIGNED 2026-09-05`
>
> هيكل 1447 يطلب System Query وSystem Reports. هذه الوثيقة تحدد احتياجات استعلام قابلة للتتبع إلى المتطلبات الحالية؛ لا تنشئ Dashboard/KPI أو Report جديدًا دون حاجة موثقة.

## Candidate Queries — Current Model

| ID | Query | Actor | Related Requirement | Status |
|---|---|---|---|---|
| QRY-01 | البحث عن Providers حسب التصنيف والمديرية/الحي | Beneficiary | FR-003 | DERIVED / DRAFT |
| QRY-02 | عرض Requests المفتوحة المناسبة لمقدم مؤهل حسب النشاط والمنطقة | Provider | FR-006/007 | DERIVED / DRAFT |
| QRY-03 | عرض Provider Responses الخاصة بطلب للمقارنة والاختيار | Beneficiary | FR-007/009 | DERIVED / DRAFT |
| QRY-04 | عرض حالة/تفاصيل Provider Response للمقدم وتمكين Edit/Withdraw قبل Selection | Provider | FR-007C/007D | DERIVED / DRAFT |
| QRY-05 | عرض المحادثات الخاصة المرتبطة بـRequest/Transaction | Beneficiary / Provider | FR-008..008C | DERIVED / DRAFT |
| QRY-06 | عرض سجل Transactions وحالاتها للمستخدم ضمن صلاحياته | User | UR-TX-01..04 | DERIVED / DRAFT |
| QRY-07 | عرض Invoice versions / current invoice للTransaction | Beneficiary / Provider | UR-INV-01 / DEC-025/050 | DERIVED / DRAFT |
| QRY-08 | عرض Provider rating indicators وعدد الأعمال المكتملة | Beneficiary | UR-REV-01 / Rating Model | DERIVED / DRAFT |
| QRY-09 | عرض Beneficiary interaction record في سياق تعامل مشروع فقط | Eligible Provider | UR-REP-01 / DEC-063 | DERIVED / ACCESS-CONTROL REQUIRED |
| QRY-10 | عرض Provider Portfolio/Catalog العام | Beneficiary | UR-PORT-01 / FR-PORT-* | DERIVED / DRAFT |
| QRY-11 | عرض Verification/Subscription status للمقدم | Provider | UR-VER-01 / UR-SUB-01 | DERIVED / DRAFT |
| QRY-12 | عرض Verification cases / Reports / Transaction Complaints للمخول إداريًا | Authorized Admin | FR-015A/015C | DERIVED / AUTHORIZATION DETAIL PARTIAL |

## Query Boundaries

- لا يوجد Query لـ`Agreement` لأن Agreement entity غير موجودة.
- المصطلح الحالي `Provider Response` وليس Offer.
- لا يوجد Query لحالة Payment/Escrow/Refund/DepositAmount بين Beneficiary وProvider.
- Transaction successful terminal state هي `Completed`; `Disputed` حالة نهائية غير ناجحة.
- Queries الخاصة بالتقييمات تستخدم فقط Transactions `Completed`.
- Complaint query الإداري لا يمنح YADD سلطة مالية/تجارية وفق DEC-073.

## Candidate Reports

تقارير الإدارة التفصيلية **لم تعتمد بعد كمتطلبات مستقلة**. لذلك لا تفترض هذه الوثيقة Dashboard أو KPIs تشغيلية غير موجودة في SRS.

| ID | Report | Purpose | Basis | Status |
|---|---|---|---|---|
| RPT-01 | Preliminary Verification/Report Case Listing | تمكين الموظف المخول من مراجعة الحالات التي تقع أصلًا ضمن الوظائف الإدارية الحالية | FR-015/015A | DERIVED DRAFT — format TBD |
| RPT-02 | TBD | أي تقرير إضافي يحتاج Stakeholder/Requirement واضح قبل اعتماده | — | NEEDS_ANALYSIS |

## Before SQL / Final Report Design

1. تثبيت Relation Schema وData Dictionary.
2. تحديد Authorization لكل Query حساس.
3. عدم إضافة Query/Report بلا Requirement أو Admin need موثق.
4. تحديد SQL الفعلي فقط بعد تثبيت أسماء العلاقات والأنواع الفيزيائية.
5. مراجعة متطلبات Chapter Four مع المشرف في النسخة المقدمة.
