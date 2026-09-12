# نموذج الحساب والبوابات — Account & Portal Model

> **الحالة:** `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-12`
>
> **أساس القرارات:** DEC-008..011, DEC-030, DEC-034/035, DEC-074/076.

## 1. القرار الأساسي للحساب

يعتمد YADD **حساب `User` واحدًا لكل شخص**. لا يمثل `Beneficiary` و`Provider` نوعين منفصلين من الحسابات.

عند الاستخدام الأول، يمكن للشخص اختيار البوابة التي يبدأ منها:

1. `Beneficiary Portal`
2. `Provider Portal`

هذا الاختيار يتحكم فقط في تجربة البداية/التهيئة (`onboarding/start experience`) ولا ينشئ نوع حساب دائمًا.

## 2. بوابة المستفيد — Beneficiary Portal

يمكن لـ`User` استخدام إمكانات `Beneficiary` دون امتلاك `Provider Profile`.

تشمل إمكانات المستفيد الأساسية: الاكتشاف، إنشاء `Request`، التواصل، اختيار `Provider`/بدء `Transaction`، مراجعة الفاتورة، تقييم المقدم، و`Block/Report`، مع الخضوع لقواعد العمل ذات الصلة.

## 3. بوابة المقدم — Provider Portal

تستخدم إمكانات `Provider` ملف `Provider Profile` مرتبطًا بحساب `User` نفسه.

القواعد الحالية:
- يمكن لـ`User` امتلاك صفر أو `Provider Profile` واحد؛
- في MVP يكون `Provider Profile` من نوع واحد فقط: `SERVICE` أو `PRODUCT`، ولا يمكن تفعيل النوعين معًا على الملف نفسه — DEC-074؛
- داخل النوع المختار يمكن للمقدم اختيار تصنيف واحد أو أكثر عبر `ProviderActivity`، مع السماح مؤقتًا بصفر تصنيفات أثناء Draft، واشتراط تصنيف واحد على الأقل قبل أهلية وظائف التقديم — DEC-076؛
- يجب أن يجتاز `Provider Profile` عملية `Provider Verification` قبل وظائف التقديم الخاصة بالمقدم؛
- يتطلب إرسال `Provider Responses` جديدة بالإضافة إلى ذلك اشتراكًا `Active`.

> **Open:** سياسة تغيير `ProviderProfile.providerType` بعد الاختيار/التفعيل لم تعتمد بعد، ولا يجوز استنتاج السماح بالتبديل من هذا النموذج.

## 4. التبديل بين البوابات — Portal Switching

- يمكن لـ`Beneficiary` إنشاء/استكمال `Provider Profile` من الحساب نفسه؛
- بعد استيفاء شروط بوابة المقدم، يمكن لـ`User` التبديل بين `Beneficiary Portal` و`Provider Portal`؛
- يمكن لـ`User` الذي بدأ كمقدم استخدام إمكانات `Beneficiary` دون إنشاء حساب آخر.

## 5. النموذج المفاهيمي

```mermaid
flowchart TD
    START([First Use]) --> CHOOSE{Start As}
    CHOOSE -->|Beneficiary| U[Create or Use User Account]
    CHOOSE -->|Provider| U
    U --> B[Beneficiary Portal]
    U --> HAS{Provider Profile Eligible?}
    HAS -->|No| CREATE[Create or Complete Provider Profile]
    CREATE --> TYPE[Select Provider Type and Categories]
    TYPE --> VERIFY[Provider Verification]
    VERIFY -->|Approved and Other Conditions Met| P[Provider Portal]
    HAS -->|Yes| P
    B <-->|Switch Portal| P
```

يجب أن تكون جميع التسميات داخل المخطط الأكاديمي النهائي باللغة الإنجليزية وفق `DEC-072`.

## 6. القواعد المعتمدة

| ID | القاعدة | الحالة |
|---|---|---|
| ACC-BR-01 | حساب `User` واحد لكل شخص. | `ANALYZED_APPROVED` |
| ACC-BR-02 | اختيار الاستخدام الأول يحدد بوابة البداية، وليس نوع حساب دائمًا. | `ANALYZED_APPROVED` |
| ACC-BR-03 | يرتبط `Provider Profile` بـ`User` ولا يمثل حسابًا منفصلًا. | `ANALYZED_APPROVED` |
| ACC-BR-04 | التبديل إلى `Beneficiary Portal` لا يحتاج أبدًا إلى حساب آخر. | `ANALYZED_APPROVED` |
| ACC-BR-05 | يمكن لـ`Beneficiary` بدء إنشاء `Provider Profile` من الحساب نفسه. | `ANALYZED_APPROVED` |
| ACC-BR-06 | تتطلب وظائف التقديم الخاصة بالمقدم `Provider Profile` متحققًا ومستوفيًا شروط الأهلية ذات الصلة. | `ANALYZED_APPROVED` |
| ACC-BR-07 | في MVP يختار `Provider Profile` نوعًا واحدًا فقط: `SERVICE` أو `PRODUCT`، ولا يجمع النوعين معًا. | `ANALYZED_APPROVED` |
| ACC-BR-08 | يمكن اختيار تصنيف واحد أو أكثر داخل نوع Provider نفسه؛ Draft قد يحتوي صفرًا مؤقتًا، لكن الأهلية تتطلب تصنيفًا صالحًا واحدًا على الأقل. | `ANALYZED_APPROVED` |

## 7. حدود تفاصيل التحقق — Verification Detail Boundary

عملية `Provider Verification` نفسها معتمدة، وتتضمن كحد أدنى وثيقة هوية رسمية إضافة إلى صورة شخصية مع الوثيقة ومراجعة بشرية نهائية.

ما يزال مفتوحًا و**لا يجوز اختلاقه داخل المخططات**:
- أنواع/جوانب وثائق الهوية المقبولة بدقة؛
- مدة الاحتفاظ ببيانات الهوية/التحقق؛
- فئات الأنشطة التي تتطلب ترخيصًا مهنيًا إضافيًا.

هذه التفاصيل لا تغير بنية الحساب/البوابات.

## 8. الأثر على المخططات — Diagram Impact

بالنسبة للمخططات الحالية:
- لا تنشئ كيانين منفصلين باسم `Customer Account` و`Provider Account`؛
- مثّل `Beneficiary` و`Provider` كـActors سلوكيين يستخدمان هوية `User` نفسها؛
- استخدم مفاهيميًا `USER 1 → 0..1 PROVIDER_PROFILE`؛
- لا تمثل Service وProduct كنوعين فعالين معًا على Provider Profile نفسه؛
- مثّل تعدد التصنيفات داخل النوع عبر `ProviderActivity`/`Category`؛
- يمكن إظهار `Service Provider` و`Product Provider` كتخصصين (`specializations`) للـ`Provider` العام عندما يضيف ذلك وضوحًا؛
- لا يوجد `Guest` actor معتمد.
