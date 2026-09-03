# Stakeholder & Actor Analysis

> **الحالة:** `ANALYZED — SYNCHRONIZED 2026-09-04`
>
> هذه الوثيقة مشتقة من Decision Register وSRS الحاليين. تحديد Stakeholder أو Actor هنا لا ينشئ Requirement جديدًا بذاته.

## 1. Stakeholders

| ID | الطرف | الاهتمام داخل YADD | الحالة / المرجع |
|---|---|---|---|
| STK-01 | Beneficiary / المستخدم المستفيد | اكتشاف مقدمي الخدمات/المنتجات، إنشاء الطلبات، المقارنة والاختيار، التواصل، المعاملات، اعتماد الفاتورة، تقييم المقدم، الحظر/الإبلاغ | `ANALYZED_APPROVED` — DEC-008..014/046..053/066..071 |
| STK-02 | Service Provider / مقدم الخدمة | إدارة Provider Profile والنشاط ومناطق الخدمة، الاستجابة للطلبات، التواصل، بدء/تنفيذ المعاملات، الفاتورة، Portfolio، تقييم المستفيد | `ANALYZED_APPROVED` — DEC-029/030/034/043/046/063/064/066..070 |
| STK-03 | Product Provider / مقدم المنتج/المشروع المنزلي | إدارة Provider Profile والنشاط وCatalog، الاستجابة لطلبات المنتجات، التواصل، تجهيز المنتج، الفاتورة، تقييم المستفيد | `ANALYZED_APPROVED` — DEC-003/019/029/030/063/064/066..070 |
| STK-04 | YADD Administration / إدارة المنصة | Provider Verification، Trust & Safety، البلاغات، الاشتراكات، الإجراءات الإدارية والسجل المرتبط بها | `ANALYZED_APPROVED` في الوظائف الأساسية — DEC-035/036/039/042/053/067 |
| STK-05 | Project Team / فريق المشروع | تحليل وتصميم وتنفيذ وتوثيق MVP ضمن نطاق ووقت مشروع التخرج | `APPROVED` كصاحب مصلحة تشغيلي/أكاديمي |
| STK-06 | Supervisor / Department / المشرف والقسم | مراجعة الالتزام الأكاديمي والمنهجي ومخرجات المشروع | `APPROVED` كصاحب مصلحة أكاديمي |

## 2. Account & Portal Model

المفهوم الأساسي هو **User Account واحد للشخص**. لا يوجد Customer Account وProvider Account منفصلان.

- يستطيع الحساب استخدام Beneficiary Portal.
- يستطيع الشخص إنشاء Provider Profile داخل الحساب نفسه.
- لا تتاح وظائف التقديم قبل استكمال شروط Provider Verification والتفعيل.
- يمكن للحساب الانتقال بين Beneficiary Portal وProvider Portal عند استيفاء الشروط.
- اختيار البوابة عند البداية يحدد Onboarding فقط ولا يحول الحساب إلى نوع دائم.

```mermaid
flowchart TD
    U[User Account]
    U --> B[Beneficiary Portal]
    U --> PP{Provider Profile active?}
    PP -- No --> CP[Create / Complete Provider Profile]
    CP --> V[Provider Verification]
    V --> PP
    PP -- Yes --> P[Provider Portal]
    B <-->|Switch Portal| P
```

**المرجع:** DEC-008..011.

## 3. Provider Activity Model

`Provider` هو Actor العام في المخطط الرئيسي. عند الحاجة إلى التفصيل يتخصص إلى:

- `Service Provider`
- `Product Provider`

Provider Profile واحد يمكنه تفعيل:

- Service Activity فقط، أو
- Product Activity فقط، أو
- النشاطين معًا.

الهوية والتحقق مشتركان على مستوى Provider Profile، بينما بيانات النشاط والتصنيفات ذات الصلة قد تختلف.

**الحالة:** `ANALYZED_APPROVED` — DEC-029/030/067.

## 4. Main UML Actor Model

وفق DEC-067، Actors العامة في Main Use Case Diagram هي:

1. `Beneficiary`
2. `Provider`
3. `YADD Administrator`

وعند الحاجة إلى مخططات تفصيلية:

- `Provider` يمكن تخصصه إلى `Service Provider` و`Product Provider`.
- الصلاحيات الإدارية يمكن تفصيلها إلى `Verification Reviewer`, `Content Moderator`, `Subscription Administrator`.

لا يضاف `Guest` حاليًا لأن anonymous public browsing لم يعتمد.

لا تعد Web Interface أو Backend/API أو Database أو Flutter Actors؛ هي أجزاء من الحل التقني وليست جهات خارجية تتفاعل مع النظام في Main Use Case Diagram.

## 5. AI / External Service Boundary

وظائف AI المساعدة في Verification وTrust & Safety معتمدة، لكن مزود AI النهائي ما يزال `AI-PROV-Q01 — Needs Verification`.

لذلك:

- لا يظهر AI كActor في **Main Use Case Diagram**.
- إذا اعتمد لاحقًا مزود API خارجي، يمكن تمثيله كـExternal System في مخطط تكامل/معمارية تفصيلي عند الحاجة.
- القرار البشري النهائي يبقى مطلوبًا في Verification والعقوبات عالية الأثر وفق DEC-035/039.

## 6. Stakeholder-to-Capability Summary

| Actor / Stakeholder | Core Capabilities |
|---|---|
| Beneficiary | Search, View Provider Profile, Create Request, Compare Responses, Chat, Select Provider, Start Transaction, Review Invoice, Rate Provider, Block/Report |
| Provider | Manage Provider Profile, Manage Portfolio/Catalog, View Matching Requests, Respond/Edit/Withdraw Response, Chat, Start Transaction, Manage Transaction, Create/Revise Invoice, Rate Beneficiary, Block/Report |
| YADD Administrator | Review Verification, Review Reports/Flags, Manage Subscription Records, Authorized Administrative Actions |

## 7. ما يزال مفتوحًا ولا يغيّر Actor Model الأساسي

- تفاصيل أنواع وثائق الهوية: `VER-DOC-Q01`.
- مدة الاحتفاظ ببيانات التحقق: `VER-RET-Q01`.
- بعض الفئات التي قد تحتاج ترخيصًا إضافيًا: `VER-LIC-Q01`.
- مزود AI وسياساته التفصيلية: `AI-PROV-Q01` وما يرتبط به.
- تفاصيل الباقات/الدفع الخارجي للاشتراك: `SUB-PLAN-Q01` و`SUB-PAY-Q01`.

هذه النقاط لا تمنع اعتماد Actors الرئيسية للمخططات الحالية.
