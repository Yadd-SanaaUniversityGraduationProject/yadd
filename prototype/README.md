# YADD — نموذج الواجهات التفاعلي (P0)

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — P0`
> نموذج تفاعلي خفيف (Vite + React) مشتق من عقود الشاشات المعتمدة.
> لا ينشئ متطلبات جديدة — أي تعارض مع Decision Register / SRS يُصنف Synchronization أو Decision.

## التشغيل

```bash
cd prototype
npm install
npm run dev     # http://localhost:5173
```

- فهرس كل الشاشات: `/​_index`
- لقطات نظيفة بدون شارات: أضف `?clean=1` لأي رابط (مثال: `/b/requests/new?clean=1`)
- النموذج يقبل أي بيانات دخول / أي رمز OTP من ٤ أرقام.

## النطاق (P0 — ‏24 شاشة)

| الحزمة | الشاشات |
|---|---|
| زائر عام | PUB-01 → PUB-06 |
| الحساب | AUTH-01 → AUTH-06 |
| مستفيد | BEN-01 → BEN-07 |
| مقدم | PRO-01 → PRO-05 |
| مساندة | MORE · SOON (شاشات P1 الموضعية) · _INDEX |

## سيناريو العرض للمناقشة (٥ دقائق)

1. `/` — الرئيسية العامة: ابحث عن مقدم + انشر طلبًا (محمي).
2. `/search` → `/results` → `/provider/pr-1` — اكتشاف عام ببيانات عامة فقط.
3. اضغط «تواصل/استفسر» كزائر → `/gate` — البوابة تطلب الدخول.
4. `/signup` — الاسم الرباعي + OTP → `/portal` — اختيار البوابة.
5. `/b/requests/new` — انشر طلبًا → `/b/requests/rq-1/responses` — استجابات جاهزة.
6. `…/compare` → `…/confirm/rs-1` — مقارنة محايدة ثم تأكيد → Matched + معاملة.
7. `/switch` — بدّل لمقدم → `/p/requests/sq-1/respond` — أرسل استجابة ثم عدّلها/اسحبها.

## البنية

```text
prototype/
├── index.html          # RTL + Tajawal/Inter
├── src/
│   ├── theme.css       # tokens من UI Foundation (أخضر/كحلي/52px/OFF-white)
│   ├── App.jsx         # كل المسارات
│   ├── data/mock.js    # بيانات تجريبية (صنعاء — مستوى الحي)
│   ├── state/          # الجلسة + الطلبات + الاستجابات (ذاكرة فقط)
│   ├── components/     # Shell/BottomNav/Cards/Icons (SVG فقط — بلا إيموجي)
│   └── screens/        # pub/ auth/ ben/ pro/ + More/Soon/Index
└── CHAPTER4-ASSETS.md  # جدول التتبع + قائمة اللقطات للفصل الرابع
```

## القواعد المطبقة من المواصفات

- RTL عربي أولًا، Tajawal/Inter، أزرار 52px، أيقونات SVG فقط.
- الملف العام: لا هاتف، لا عنوان دقيق، لا وثائق تحقق.
- الحي فقط في واجهات الموقع — لا حقل مديرية مستقل.
- `RequiresDeposit` نعم/لا فقط — لا مبالغ ولا دفع.
- المقارنة محايدة — لا «الأفضل لك».
- الاختيار في مسار الطلب ينشئ معاملة مباشرة (لا Agreement).
- القيم غير المتوفرة تظهر `—` ولا تُخترع.
