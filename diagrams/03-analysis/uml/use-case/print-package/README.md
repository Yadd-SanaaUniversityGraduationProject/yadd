# YADD — حزمة الطباعة لمخططي حالات الاستخدام | Use Case Print Package

> **الحالة:** `PRINT PACKAGE — NOT BASELINED — SYNCHRONIZED THROUGH DEC-077`
>
> **الغرض:** نسختان نهائيتان قابلتان للطباعة من نفس نموذج حالات الاستخدام الواحد، مقسّمتان على ورقتين A4 توضعان **بجانب بعضهما** لتُقرأ الصورة كاملة، مع جعل **«تسجيل الدخول — Log In»** العملية الأساسية المشتركة في قلب المخططين.

## 1. الملفات

```text
print-package/
├── README.md                         ← هذا الملف
├── png/
│   ├── yadd-usecase-plan1-core-service-journey-A4.png    (2480×3508 · 300 DPI · A4)
│   ├── yadd-usecase-plan2-trust-admin-provider-A4.png    (2480×3508 · 300 DPI · A4)
│   └── yadd-usecase-spread-A3.png                        (4961×3508 · 300 DPI · A3)
├── pdf/
│   ├── yadd-usecase-plan1-core-service-journey-A4.pdf    (صفحة A4 واحدة · vector)
│   ├── yadd-usecase-plan2-trust-admin-provider-A4.pdf    (صفحة A4 واحدة · vector)
│   ├── yadd-usecase-A4-two-pages-side-by-side.pdf        (صفحتان: المخطط 2 ثم المخطط 1)
│   └── yadd-usecase-spread-A3.pdf                        (صفحة واحدة 420×297 mm)
├── svg/
│   ├── yadd-usecase-plan1-core-service-journey-A4.svg
│   ├── yadd-usecase-plan2-trust-admin-provider-A4.svg
│   └── yadd-usecase-spread-A3.svg
└── source/                           ← مولّد المخططات (نص قابلاً للتحرير، ليس Source of Truth)
```

## 2. كيف توضع الورقتان بجانب بعضهما

```text
┌───────────────────────────┬───────────────────────────┐
│  المخطط (2 من 2)          │  المخطط (1 من 2)          │
│  الثقة والإدارة            │  الرحلة الأساسية للخدمة    │
│  وإدارة المزوّد            │                           │
│  Trust, Administration    │  Core Service Journey     │
│  & Provider Management    │                           │
└───────────────────────────┴───────────────────────────┘
        الورقة اليسرى                 الورقة اليمنى
```

- **الترتيب الملائم:** الورقة 1 من 2 على اليمين والورقة 2 من 2 على اليسار (ترتيب القراءة العربية)، والترتيب معكوس في ملف الـPDF المدمج واللوحة A3 ليصبح الترتيب المنطقي من اليسار إلى اليمين؛ وكل ورقة تحمل في أسفلها سطرًا يوضح موضعها.
- بذلك يجتمع شريط **«precondition»** الرأسي للورقتين قرب خط المنتصف، فتبدأ رحلة الخدمة من ورقة المخطط 1 ثم تُستكمل بالثقة والإدارة في ورقة المخطط 2.
- كل ورقة تحتوي Legend كاملًا، لذا يمكن قراءة كل ورقة منفردة إن طُبعت وحدها.

### أوامر الطباعة

- **A4:** اطبع `pdf/yadd-usecase-plan1-...pdf` و`pdf/yadd-usecase-plan2-...pdf` بمقاس 100% (Actual size / Scale: 100%) دون «Fit to page» للحفاظ على مقاسات الخطوط.
- **صفحة واحدة على A3:** استخدم `pdf/yadd-usecase-spread-A3.pdf` — تكفي ورقة A3 واحدة لتُظهر المخططين بجانب بعضهما في ورقة واحدة، مفيدة للعرض أو التعليق.
- **استخدام مكتبي:** `pdf/yadd-usecase-A4-two-pages-side-by-side.pdf` ملف واحد بصفحتين A4، جاهز للطباعة على الوجهين/صفحتين متجاورتين.

## 3. بنية المخططين و«تسجيل الدخول» كنقطة التحام

| | المخطط (1 من 2) — Core Service Journey | المخطط (2 من 2) — Trust, Administration & Provider Management |
|---|---|---|
| المجموعات | A1 المصادقة والدخول · A2 الاستكشاف والاستفسار المباشر · A4 مسار الطلب المنشور · A5 المعاملة والفاتورة والشكوى | B1 الهوية والحساب · B2 ملف المزوّد ومعرض الأعمال · B3 التحقق والاشتراك · B4 الأمان والحجب والإبلاغ · B5 الشكاوى والمراجعة الإدارية · B6 السمعة والتقييم |
| الفاعلون | Guest · Beneficiary · Provider | Guest · Beneficiary · Provider · YADD Administrator + الأدوار الإدارية المتخصصة |
| عدد حالات الاستخدام | 25 | 20 |

- `Log In` هو **العملية الأساسية المشتركة**: يظهر في كلا المخططين داخل مجموعة «المصادقة والدخول / الهوية والحساب» بإطار أسمك ولون أغمق (Legend: نقطة الالتحام / Core entry point).
- جميع الوظائف المحمية ترتبط به عبر **شريط Precondition رأسي متقطّع** ينزل من `Log In` إلى رأس كل مجموعة لاحقة، لأن Authentication في النموذج المعتمد **شرط مسبق (Precondition)** وليس علاقة `<<include>>` — DEC-077.
- علاقات `<<include>>` و`<<extend>>` المعروضة هي فقط العلاقات المعتمدة في `docs/03-analysis/08-use-cases.md`، والباقي (Completed قبل التقييم، وجود استجابة قبل التعديل/السحب، وجود submission قبل المراجعة الإدارية…) يظهر كقيود وشروط مسبقة لا كأسهم UML مصطنعة.

## 4. قواعد النمذجة المحفوظة

- تسميات المخططات بالإنجليزية وفق **DEC-072**، مع سطر عربي توضيحي داخل كل شكل لتسهيل المراجعة الأكاديمية.
- الفاعلون الرئيسيون: `Guest`, `Beneficiary`, `Provider`, `YADD Administrator` — DEC-067/077.
- `Guest` غير مصادَق ولا يرتبط بأي Use Case محمي؛ والـCTA المحمي يوجّه إلى `Log In` أو `Create Account`.
- `Request → Provider Response → Selection → Transaction` محفوظ كما هو، والمحادثة وحدها لا تنشئ Transaction.
- التقييم متاح فقط بعد `Transaction = Completed`.
- `Block User` و`Report User / Content` مفهومان مستقلان.
- المراجعة الإدارية للشكوى لا تمنح صلاحية تسوية مالية.
- لا تُضاف أي سياسة عددية أو تفاصيل تنفيذية غير معتمدة داخل الأشكال.

## 5. المصدر والتبعية

- التقسيم والمحتوى مشتقّان من `docs/03-analysis/08-use-cases.md` و`docs/03-analysis/10-UML.md`، والوثائق الأعلى سلطة تبقى `02-decision-register.md` ثم `05-SRS.md` و`06-business-rules.md`.
- ملفات `svg/` و`pdf/` و`png/` هي **Generated Exports** ولا يجوز تعديلها يدويًا بما يخالف المصدر القابل للتعديل كما تنص قواعد `diagrams/README.md`.
- للتصدير من جديد أو تعديل التسميات: عدّل `source/yadd_panels.py` ثم شغّل `python3 source/yadd_package.py` (يتطلب Python مع fontTools/uharfbuzz/reportlab وNode مع @resvg/resvg-js)؛ النصوص تُحوَّل إلى مسارات Vector داخل الملفات، لذا لا تحتاج أي خطوط مثبتة عند الطباعة.
