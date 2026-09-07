# مواصفات العمليات وتدفقات البيانات ومخازن البيانات — Process, Data Flow & Data Store Specifications

> **الحالة:** `ANALYZED — SYNCHRONIZED 2026-09-05`
>
> هذه الوثيقة مشتقة من `05-SRS.md`, `06-business-rules.md`, `07-lifecycles.md`, `08-use-cases.md`, و`09-DFD.md`. جميع التسميات داخل المخططات النهائية باللغة الإنجليزية وفق `DEC-072`.

## 1. العمليات — DFD Level 0

| ID | Process | Main Inputs | Main Outputs | Logical Stores | Basis |
|---|---|---|---|---|---|
| 1.0 | Manage Accounts & Provider Profiles | account data, provider profile data, service areas, portfolio/catalog data | account/profile information, portal information | D1, D2, D7 | DEC-008..011/029..036/064 |
| 2.0 | Manage Discovery & Requests | search criteria, request data, request closure | search results, matching requests, request status | D1, D2, D3 | DEC-012..014/031..033/045/048/049 |
| 3.0 | Manage Provider Responses & Communication | provider response data, response edit/withdrawal, messages, provider selection, transaction-start request/confirmation | responses, messages, selection/start result | D3, D4 | DEC-023/046/047/066/069/070 |
| 4.0 | Manage Transactions & Invoices | selected provider, confirmed direct start, cancellation data, invoice/revision data, invoice approval, complaint data | transaction status, invoice status, completed transaction reference, complaint reference | D4, D5 | DEC-015/025/048/050/055/066/069/071/073 |
| 5.0 | Manage Ratings & Reputation | provider rating, beneficiary behavioral rating | provider reputation, beneficiary interaction record | D4, D6 | DEC-051/052/063/071/073 |
| 6.0 | Manage Administration, Verification & Safety | verification submission/decision, subscription updates, reports, complaint reference/evidence, moderation actions | verification/subscription/report/complaint status, flags, audit information | D1, D7, D8 | DEC-034..043/053/054/064/073 |

## 2. مخازن البيانات المنطقية — Logical Data Stores

| ID | Store | الغرض |
|---|---|---|
| D1 | Users & Provider Profiles | حساب `User` و`Provider Profile` والحالة الأساسية للملف |
| D2 | Categories & Areas | التصنيفات، المديريات/الأحياء، وبيانات مرجعية لمناطق الخدمة |
| D3 | Requests & Provider Responses | `Requests` و`Provider Responses` بما فيها حالة الاستجابة و`RequiresDeposit` كقيمة Boolean |
| D4 | Conversations & Transactions | المحادثات/الرسائل الخاصة وسجلات/حالات `Transaction` |
| D5 | Invoices | نسخ الفاتورة النهائية/المعدلة وبنود الفاتورة |
| D6 | Ratings & Interaction Records | تقييم `Beneficiary→Provider` وسجل تقييم التفاعل الاختياري `Provider→Beneficiary` |
| D7 | Portfolio / Catalog | بيانات `Showcase/Portfolio/Catalog` الوصفية ومراجع وسائط العرض |
| D8 | Verification / Subscription / Reports & Admin Audit | حالات التحقق، سجلات الاشتراك، البلاغات/الشكاوى/Flags ومعلومات التدقيق الإداري |

## 3. قيود العمليات ذات الصلة بالمخططات

### 1.0 Manage Accounts & Provider Profiles
- يوجد حساب `User` واحد لكل شخص.
- يمكن لـ`User` امتلاك صفر أو `Provider Profile` واحد.
- يمكن لـ`Provider Profile` تفعيل `Service Activity` أو `Product Activity` أو كليهما.
- تتطلب وظائف التقديم الخاصة بالمقدم التحقق المطلوب؛ كما يتطلب إرسال الاستجابات `Active Subscription`.

### 2.0 Manage Discovery & Requests
- يوجد مساران للاكتشاف: `Direct Search` و`Create Request`.
- يستخدم موقع `Request` الـ`District + Neighborhood`؛ ولا يكون العنوان الدقيق/GPS عامًا.
- يوجد `Request expiry` من حيث المبدأ؛ لكن توقيت عدم النشاط/التذكير الدقيق يبقى `REQ-EXP-Q01` ولا يجوز اختلاقه داخل مخطط.

### 3.0 Manage Provider Responses & Communication
- المصطلح القياسي هو `Provider Response` وليس `Offer`.
- يسمح باستجابة `Provider Response` فعالة واحدة لكل `Provider` لكل `Request`.
- يمكن للـ`Provider` تعديل الاستجابة أو سحبها ما دام `Request` بحالة `Open` ولم يتم اختيار مقدم.
- `RequiresDeposit` هي `Yes/No` فقط؛ ولا توجد قيمة عربون أو حالة دفع داخل YADD.
- المحادثة وحدها لا تنشئ `Transaction`.
- في مسار `Request`: يبدأ اختيار `Beneficiary` للـ`Provider` الـ`Transaction`.
- في مسار `Direct Search`: يرسل أي من الطرفين `Request Transaction Start`، ويجب أن يؤكد الطرف الآخر قبل إنشاء `Active Transaction`.

### 4.0 Manage Transactions & Invoices
- لا توجد عملية أو Data Store مستقلة باسم `Agreement`.
- يمكن أن تبدأ `Transaction` من اختيار مقدم داخل `Request` أو من بدء مؤكد في `Direct Search`.
- يمكن أن تكون الفاتورة `Approved` أو `Revision Requested`؛ ولا يوجد `Auto-Approval`.
- يؤدي اعتماد الفاتورة إلى جعل `Transaction = Completed`.
- `Completed` هي الحالة النهائية الناجحة للـ`Transaction`. تحدث `Ratings` بعدها ولا تنشئ حالة `Transaction` باسم `Closed`.
- إذا استمر نزاع الفاتورة قبل الاعتماد دون حل، تصبح `Transaction = Disputed`، وهي حالة نهائية غير ناجحة — `DEC-073`.
- يمكن مراجعة أدلة الشكوى إداريًا، لكن YADD لا يقرر الاستحقاق المالي/التجاري ولا يأمر بـ`Payment/Refund/Compensation`.
- `Payment/Refund/Escrow/Settlement` خارج YADD.

### 5.0 Manage Ratings & Reputation
- تقييم `Beneficiary→Provider` مطلوب بعد `Completed`: من 1–5 نجوم مع تعليق اختياري.
- تقييم `Provider→Beneficiary` اختياري بعد `Completed`: ثلاثة مؤشرات سلوكية من 1–5 مع تعليق اختياري.
- `Ratings` عمليات Post-Transaction ولا تعيد فتح `Transaction` ولا تغلقها.
- لا توجد `Ratings` للـ`Cancelled` أو `Disputed Transactions`.

### 6.0 Manage Administration, Verification & Safety
- القرار النهائي في `Verification` بشري.
- يمكن للـAI المساعدة وإنتاج `Flags` لكنه لا يصدر قرارات نهائية عالية الأثر وحده.
- تحصيل `Subscription` خارجي؛ بينما يسجل YADD حالة الاشتراك ويؤكدها إداريًا.
- مراجعة شكوى `Transaction` تطبق سياسة YADD/الإجراء الإداري فقط، ولا تمنح سلطة تحكيم مالي/تجاري.

## 4. قاعدة تسمية تدفقات البيانات — Data Flow Naming Rule

يجب تسمية Data Flows في DFD بصيغة **بيانات/عبارات اسمية** لا بصيغة أفعال. أمثلة:

- `Request Data` وليس `Create Request`.
- `Provider Response Data` وليس `Submit Response`.
- `Transaction Start Request` / `Start Confirmation` وليس `Start Transaction` كتسمية Data Flow.
- `Invoice Approval`, `Revision Request`, `Complaint Data`, `Transaction Status`, `Rating Data`.

## 5. عناصر مفتوحة لا تعيق Core Diagrams

يجب حذف العناصر التالية من المخططات أو إظهارها بصورة عامة فقط، دون اختلاق قيم رقمية:

- `REQ-EXP-Q01`: توقيت expiry/reminders.
- `INV-PENDING-Q01`: تصعيد الفاتورة التي تبقى Pending مدة طويلة.
- `SAFE-REQ-Q01`: عتبات إساءة الاستخدام.
- `LOC-DATA-Q01`: القائمة الجغرافية النهائية، و`LOC-OPS-TIME-Q01`: التوقيت.
- أنواع وثائق التحقق الدقيقة/الاحتفاظ/التراخيص.
- تفاصيل سياسة/مزود/threshold/retention الخاصة بالـAI.
- باقات الاشتراك/الأسعار/طريقة إثبات الدفع/الآثار التشغيلية لانتهاء الاشتراك.

هذه العناصر **لا تغير** الـActors الحاليين، أو عمليات/مخازن Core DFD، أو Core Transaction lifecycle، أو علاقات Core ERD.