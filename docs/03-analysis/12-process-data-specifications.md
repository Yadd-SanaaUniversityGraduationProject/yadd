# مواصفات العمليات وتدفقات البيانات ومخازن البيانات — Process, Data Flow & Data Store Specifications

> **الحالة:** `ANALYZED — SYNCHRONIZED 2026-09-15 THROUGH DEC-077`
>
> هذه الوثيقة مشتقة من `05-SRS.md`, `06-business-rules.md`, `07-lifecycles.md`, `08-use-cases.md`, و`09-DFD.md`. جميع التسميات داخل المخططات النهائية باللغة الإنجليزية وفق `DEC-072`.

## 1. العمليات — DFD Level 0

| ID | Process | Main Inputs | Main Outputs | Logical Stores | Basis |
|---|---|---|---|---|---|
| 1.0 | Manage Accounts & Provider Profiles | Log In/Create Account data when Guest authenticates; account data; provider profile data; service areas; portfolio/catalog data | authentication/account result; account/profile information; portal information | D1, D2, D7 | DEC-008..011/030/034..036/064/074/076/077 |
| 2.0 | Manage Discovery & Requests | Guest/public search criteria and browse requests; authenticated search criteria; request data; request closure | public search results/public provider profile references; authenticated search results; matching requests; request status | D1, D2, D3, D7 | DEC-012..014/031..033/045/048/049/064/074/076/077 |
| 3.0 | Manage Provider Responses & Communication | provider response data, response edit/withdrawal, messages, provider selection, transaction-start request/confirmation | responses, messages, selection/start result | D3, D4 | DEC-023/046/047/066/069/070/075/077 |
| 4.0 | Manage Transactions & Invoices | selected provider, confirmed direct start, cancellation data, invoice/revision data, invoice approval, complaint data | transaction status, invoice status, completed transaction reference, complaint reference | D4, D5 | DEC-015/025/048/050/055/066/069/071/073/075/077 |
| 5.0 | Manage Ratings & Reputation | hybrid provider rating, beneficiary behavioral rating | provider reputation, beneficiary interaction record | D4, D6 | DEC-051/052/063/071/073/077 |
| 6.0 | Manage Administration, Verification & Safety | service-provider identity verification submission/decision, subscription updates, reports, complaint reference/evidence, moderation actions | verification/subscription/report/complaint status, flags, audit information | D1, D7, D8 | DEC-034..043/053/054/064/073/077 |

## 2. مخازن البيانات المنطقية — Logical Data Stores

| ID | Store | الغرض |
|---|---|---|
| D1 | Users & Provider Profiles | حساب `User` و`Provider Profile` والحالة الأساسية للملف؛ لا ينشئ Guest سجل User لمجرد التصفح العام |
| D2 | Categories & Areas | التصنيفات، المديريات/الأحياء، وبيانات مرجعية لمناطق الخدمة |
| D3 | Requests & Provider Responses | `Requests` و`Provider Responses` بما فيها حالة الاستجابة و`RequiresDeposit` كقيمة Boolean |
| D4 | Conversations & Transactions | Conversation مستمرة بين نفس Beneficiary/Provider، الرسائل/الأحداث، وسجلات/حالات `Transaction` |
| D5 | Invoices | نسخ الفاتورة النهائية/المعدلة وبنود الفاتورة |
| D6 | Ratings & Interaction Records | تقييم `Beneficiary→Provider` وسجل تقييم التفاعل الاختياري `Provider→Beneficiary` |
| D7 | Portfolio / Catalog | بيانات `Showcase/Portfolio/Catalog` الوصفية ومراجع وسائط العرض؛ يمكن إخراج نسخة العرض العامة للGuest وفق سياسة public/private الحالية |
| D8 | Verification / Subscription / Reports & Admin Audit | حالات التحقق، سجلات الاشتراك، البلاغات/الشكاوى/Flags ومعلومات التدقيق الإداري؛ ليست بيانات عامة للGuest |

## 3. قيود العمليات ذات الصلة بالمخططات

### 1.0 Manage Accounts & Provider Profiles
- قبل Authentication، `Guest` Actor خارجي ولا يمثل User Account مخزنًا.
- إذا اختار Guest وظيفة محمية أو قرر الدخول، تتم `Log In` أو `Create Account` قبل متابعة protected action — DEC-077.
- يوجد حساب `User` واحد لكل شخص بعد إنشاء/استخدام الحساب.
- يمكن لـ`User` امتلاك صفر أو `Provider Profile` واحد.
- في MVP يختار `Provider Profile` نوعًا واحدًا فقط: `SERVICE` أو `PRODUCT`، ولا يجمع النوعين معًا — DEC-074.
- يمكن اختيار تصنيف واحد أو أكثر داخل النوع المختار؛ Draft قد يحتوي صفرًا مؤقتًا، لكن أهلية وظائف التقديم تتطلب تصنيفًا صالحًا واحدًا على الأقل — DEC-076.
- تتطلب وظائف التقديم الخاصة بالمقدم التحقق المطلوب؛ كما يتطلب إرسال الاستجابات `Active Subscription`.
- سياسة تغيير Provider Type بعد الاختيار لم تعتمد بعد.
- الـBackend/API يفرض Authentication/Authorization للوظائف المحمية؛ Redirect في الواجهة ليس آلية الحماية الوحيدة — DEC-065/077.

### 2.0 Manage Discovery & Requests
- يوجد مساران للاكتشاف: `Direct Search` و`Create Request`.
- يستطيع Guest استخدام البحث/التصفح العام وفتح Public Provider Profile وPortfolio/Catalog دون Authentication — DEC-077.
- البيانات العامة للGuest لا تشمل رقم الهاتف أو direct private-contact data أو Verification/Subscription/Transaction/Report/Audit data أو أي بيانات حساسة/خاصة.
- `Create Request` وRequest Closure وظائف authenticated Beneficiary وليست صلاحيات Guest؛ قد يظهر CTA للGuest لكن التنفيذ يتطلب Log In/Create Account أولًا.
- يستخدم موقع `Request` الـ`District + Neighborhood`؛ ولا يكون العنوان الدقيق/GPS عامًا.
- أهلية Provider للطلب تتطلب توافق `ProviderProfile.providerType` وCategory/ProviderActivity مع نوع وتصنيف Request.
- Request expiry policy معتمدة: Reminder 24h/48h وExpired 72h من عدم نشاط Beneficiary؛ Republish ينشئ Request جديدًا.

### 3.0 Manage Provider Responses & Communication
- المصطلح القياسي هو `Provider Response` وليس `Offer`.
- يسمح باستجابة `Provider Response` فعالة واحدة لكل `Provider` لكل `Request`.
- يمكن للـ`Provider` تعديل الاستجابة أو سحبها ما دام `Request` بحالة `Open` ولم يتم اختيار مقدم.
- `RequiresDeposit` هي `Yes/No` فقط؛ ولا توجد قيمة عربون أو حالة دفع داخل YADD.
- Private Inquiry/Chat تتطلب Authentication؛ Guest لا ينشئ أو يشارك في Conversation خاصة قبل المصادقة — DEC-077.
- التواصل الأساسي داخل YADD لا يتطلب كشف رقم الهاتف للطرف الآخر — DEC-046.
- المحادثة وحدها لا تنشئ `Transaction`.
- بين نفس Beneficiary ونفس Provider توجد Conversation مستمرة واحدة يمكن أن ترتبط بصفر أو عدة Transactions عبر الزمن — DEC-075.
- يجب إظهار فواصل/أحداث نظام واضحة عند بدء وانتهاء Transactions داخل Conversation المستمرة.
- في مسار `Request`: يبدأ اختيار `Beneficiary` للـ`Provider` الـ`Transaction`.
- في مسار `Direct Search`: يرسل أي من الطرفين `Request Transaction Start`، ويجب أن يؤكد الطرف الآخر قبل إنشاء `Active Transaction`.

### 4.0 Manage Transactions & Invoices
- جميع Transaction/Invoice actions تتطلب Actor authenticated وله الصلاحية المناسبة؛ Guest لا ينفذها — DEC-077.
- لا توجد عملية أو Data Store مستقلة باسم `Agreement`.
- يمكن أن تبدأ `Transaction` من اختيار مقدم داخل `Request` أو من بدء مؤكد في `Direct Search`.
- كل Transaction ترتبط بالمحادثة المستمرة بين الطرفين؛ الربط الفيزيائي للرسائل/الأحداث بمعاملة محددة يؤجل إلى Chapter Four.
- يمكن أن تكون الفاتورة `Approved` أو `Revision Requested`؛ ولا يوجد `Auto-Approval`.
- يؤدي اعتماد الفاتورة إلى جعل `Transaction = Completed`.
- `Completed` هي الحالة النهائية الناجحة للـ`Transaction`. تحدث `Ratings` بعدها ولا تنشئ حالة `Transaction` باسم `Closed`.
- إذا استمر نزاع الفاتورة قبل الاعتماد دون حل، تصبح `Transaction = Disputed`، وهي حالة نهائية غير ناجحة — `DEC-073`.
- يمكن مراجعة أدلة الشكوى إداريًا، لكن YADD لا يقرر الاستحقاق المالي/التجاري ولا يأمر بـ`Payment/Refund/Compensation`.
- `Payment/Refund/Escrow/Settlement` خارج YADD.

### 5.0 Manage Ratings & Reputation
- Ratings تتطلب User authenticated ومعاملة مؤهلة؛ Guest لا ينشئ Rating — DEC-077.
- تقييم `Beneficiary→Provider` مطلوب بعد `Completed`: من 1–5 نجوم مع تعليق اختياري.
- تقييم `Provider→Beneficiary` اختياري بعد `Completed`: ثلاثة مؤشرات سلوكية من 1–5 مع تعليق اختياري.
- `Ratings` عمليات Post-Transaction ولا تعيد فتح `Transaction` ولا تغلقها.
- لا توجد `Ratings` للـ`Cancelled` أو `Disputed Transactions`.
- سجل تعامل Beneficiary الخاص لا يصبح Public Guest data؛ ظهوره يبقى للمقدمين في سياق تعامل مشروع وفق DEC-063.

### 6.0 Manage Administration, Verification & Safety
- الوظائف الإدارية وVerification/Subscription/Report processing ليست بيانات أو صلاحيات عامة للGuest.
- القرار النهائي في `Verification` بشري.
- يمكن للـAI المساعدة وإنتاج `Flags` لكنه لا يصدر قرارات نهائية عالية الأثر وحده.
- يجب أن يكون سبب/فئة الاشتباه في الـFlag قابلًا للفهم من الموظف المخول؛ القيم التفصيلية والـthresholds ما تزال مفتوحة.
- تحصيل `Subscription` خارجي؛ بينما يسجل YADD حالة الاشتراك ويؤكدها إداريًا.
- مراجعة شكوى `Transaction` تطبق سياسة YADD/الإجراء الإداري فقط، ولا تمنح سلطة تحكيم مالي/تجاري.

## 4. قاعدة تسمية تدفقات البيانات — Data Flow Naming Rule

يجب تسمية Data Flows في DFD بصيغة **بيانات/عبارات اسمية** لا بصيغة أفعال. أمثلة:

- `Public Search Criteria` / `Public Provider Information` للGuest.
- `Authentication Data` / `Authentication Result` عند الانتقال من Guest إلى User context.
- `Request Data` وليس `Create Request`.
- `Provider Response Data` وليس `Submit Response`.
- `Transaction Start Request` / `Start Confirmation` وليس `Start Transaction` كتسمية Data Flow.
- `Invoice Approval`, `Revision Request`, `Complaint Data`, `Transaction Status`, `Rating Data`.

## 5. عناصر مفتوحة لا تعيق Core Diagrams

يجب حذف العناصر التالية من المخططات أو إظهارها بصورة عامة فقط، دون اختلاق قيم رقمية:

- `SAFE-REQ-Q01`: عتبات إساءة الاستخدام.
- `LOC-DATA-Q01`: القائمة الجغرافية النهائية، و`LOC-OPS-TIME-Q01`: التوقيت.
- أنواع وثائق التحقق الدقيقة/الاحتفاظ/التراخيص.
- تفاصيل سياسة/مزود/threshold/retention الخاصة بالـAI.
- باقات الاشتراك/الأسعار/طريقة إثبات الدفع/الآثار التشغيلية لانتهاء الاشتراك.
- سياسة تغيير Provider Type بعد اختياره.
- آلية UX الدقيقة للعودة إلى protected action بعد نجاح Authentication؛ هذه Design detail وليست Business Rule جديدة.

هذه العناصر **لا تغير** عمليات/مخازن Core DFD أو Core Transaction lifecycle أو علاقات Core ERD. Actor Model الحالي يتضمن Guest وفق DEC-077، مع بقائه خارج نموذج التخزين ما لم ينشئ/يستخدم User Account.