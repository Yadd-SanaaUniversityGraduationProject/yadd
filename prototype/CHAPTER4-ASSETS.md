# YADD Prototype P0 — مخرجات الفصل الرابع (Chapter 4 Assets)

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — P0`
> هذا الملف **أداة توثيق مشتقة** من النموذج التفاعلي، وليس مصدر متطلبات.
> المرجع الأعلى: `docs/04-design/03-interface-design.md` ثم `docs/04-design/ui-ux/06-screen-specifications.md`.
> كل البيانات الظاهرة في اللقطات **تجريبية للعرض فقط** ويجب وسمها بذلك في التقرير.

## 1. جدول التتبع: UI Hierarchy ←→ النموذج ←→ المصادر

| UI ID (Ch4) | الواجهة | شاشات النموذج (P0) | المصدر |
|---|---|---|---|
| UI-G01 | Public Home / Discovery | `PUB-01` — `/` | FR-GST-01 / DEC-077 |
| UI-G02 | Public Search / Filter | `PUB-02` — `/search` | FR-GST-02 / FR-003 |
| UI-G03 | Public Provider Profile + Portfolio/Catalog | `PUB-04` — `/provider/pr-1` + `PUB-05` — `/provider/pr-1/works` | FR-GST-03/04 / DEC-064/077 |
| UI-G04 | Protected Action Authentication Gate | `PUB-06` — `/gate` | FR-GST-05/06 / DEC-077 |
| UI-01 | Sign In / Create Account / OTP / Forgot | `AUTH-01` `/signin` · `AUTH-02` `/signup` · `AUTH-05` `/forgot` | FR-GST-05 / FR-001A..D / DEC-078 |
| UI-02 | Portal Selection / Switch | `AUTH-03` `/portal` · `AUTH-04` `/switch` | FR-001E/001F |
| UI-03 | Home / Discovery (Beneficiary) | `BEN-01` — `/b` | UR-DIS-01 |
| UI-04 | Search / Filter (shared) | `PUB-02` + `PUB-03` — `/results` | FR-GST-02 / FR-003 |
| UI-05 | Provider Profile + Portfolio (shared) | `PUB-04` + `PUB-05` | FR-GST-03/04 / FR-PORT-* |
| UI-06 | Create Request | `BEN-03` — `/b/requests/new` | FR-005..005B |
| UI-07 | Request Details + Responses Comparison | `BEN-04` `/b/requests/rq-1` · `BEN-05` `…/responses` · `BEN-06` `…/compare` · `BEN-07` `…/confirm/rs-1` | FR-007..009 |
| UI-08 | Provider Response Create/Edit/Withdraw | `PRO-02` `/p/requests` · `PRO-03` `/p/requests/sq-1` · `PRO-04` `…/respond` · `PRO-05` `…/my-response` | FR-007/007A..007D |
| UI-09 | Private Inquiry / Chat | **P1** — stub في `/soon/SH-02` | FR-008..008E |
| UI-10 | Direct Transaction Start Confirmation | **P1** — stub في `/soon/TRX-01` | UR-TX-01 / DEC-069 |
| UI-11 | Transaction Details / Cancellation | **P1** — stub في `/soon/TRX-02` | Transaction UCs / DEC-048 |
| UI-12 | Create / Revise Final Invoice | **P1** — stub في `/soon/INV-01` | UR-INV-01 / UC-06 |
| UI-13 | Invoice Review | **P1** — stub في `/soon/INV-02` | UR-INV-01 / UR-DSP-01 |
| UI-14 | Rate Provider | **P1** — stub في `/soon/RAT-01` | UR-REV-01 / DEC-051 |
| UI-15 | Rate Beneficiary | **P1** — stub في `/soon/RAT-02` | UR-REV-02 / DEC-063 |
| UI-16 | Manage Provider Profile | **P1** — stub في `/soon/PRO-06` | FR-002/002B/002C/003C |
| UI-17 | Manage Portfolio / Catalog | **P1** — stubs `/soon/PRO-07` `/soon/PRO-08` | FR-PORT-* |
| UI-18 | Verification Submission / Status | **P1** — stubs `/soon/PRO-09` `/soon/PRO-10` | FR-VER-* / DEC-085 |
| UI-19 | Subscription Status / Renewal | **P1** — stub في `/soon/PRO-11` | FR-SUB-* / DEC-086 |
| UI-20 | Block / Report | **P1** — stubs `/soon/SAFE-01` `/soon/SAFE-02` | UR-SAFE-01 |
| UI-21 | Admin Review | **P1** — Desktop-only (لاحقًا) | FR-015/015A/015C |

شاشات إضافية في P0 خارج جدول UI-G الرئيسي (Derived navigation):
`AUTH-06` إدارة الحساب `/account` · `BEN-01/02` · `PRO-01` · `MORE` · `_INDEX` فهرس العرض.

## 2. قائمة اللقطات المقترحة للفصل الرابع (12 لقطة أساسية)

> أضف `?clean=1` لأي رابط لإخفاء شارات التتبع قبل اللقطة.
> العرض المقترح: Mobile ‏390×844. لشاشات BEN/PRO سجّل الدخول أولًا (النموذج يقبل أي بيانات).

| # | اللقطة | الرابط (نظيف) | ملاحظة |
|---|---|---|---|
| 1 | الرئيسية العامة | `/?clean=1` | يظهر مسارا الاكتشاف + الفئات |
| 2 | البحث / التصفية | `/search?clean=1` | الحي فقط — لا حقل مديرية |
| 3 | نتائج البحث | `/results?clean=1` | بطاقات عامة — لا هاتف |
| 4 | ملف المقدم العام | `/provider/pr-1?clean=1` | زر تواصل/استفسر |
| 5 | بوابة الدخول | `/gate?clean=1` | تظهر بعد ضغط إجراء محمي |
| 6 | إنشاء حساب | `/signup?clean=1` | الاسم الرباعي + OTP |
| 7 | اختيار البوابة | `/portal?clean=1` | بعد إنشاء الحساب |
| 8 | إنشاء طلب | `/b/requests/new?clean=1` | يتطلب دخولًا |
| 9 | تفاصيل الطلب | `/b/requests/rq-1?clean=1` | سياسة 24/48/72h |
| 10 | مقارنة الاستجابات | `/b/requests/rq-1/compare?clean=1` | RequiresDeposit نعم/لا فقط |
| 11 | تأكيد الاختيار | `/b/requests/rq-1/confirm/rs-1?clean=1` | Request→Matched + معاملة |
| 12 | إرسال استجابة (مقدم) | `/p/requests/sq-1/respond?clean=1` | بدّل للبوابة مقدم |

## 3. نص جاهز للصق في الفصل الرابع (مقترح، راجعه قبل الاعتماد)

> أُنشئ نموذج أولي تفاعلي للواجهات (P0) مشتق من عقود الشاشات المعتمدة في
> `06-screen-specifications.md` وهيكل الواجهات في `03-interface-design.md`،
> ويغطي: التصفح العام، الحساب والبوابات، إنشاء الطلب، ومقارنة الاستجابات واختيار المقدم.
> جميع البيانات الظاهرة تجريبية لأغراض العرض ولا تمثل بيانات حقيقية.
> النموذج بحالة `DRAFT FOR PRELIMINARY DEFENSE` ولم يخضع بعد لاختبار قابلية الاستخدام (`UX-VAL-Q01`).

## 4. حدود معلنة (تُذكر في المناقشة بصراحة)

- المحادثة والمعاملات والفواتير والتقييمات والتحقق والاشتراكات والإدارة: **P1** (تظهر كشاشات موضعية Stub).
- لا يوجد Backend حقيقي — البيانات في ذاكرة الجلسة فقط.
- لم يُنفذ أي تحقق من قابلية الاستخدام أو تباين الألوان النهائي.
