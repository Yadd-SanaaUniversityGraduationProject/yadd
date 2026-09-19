# الفصل الثالث — تحليل المتطلبات ونمذجة النظام

> **الإصدار:** `v1.3`
>
> **الحالة:** `WORKING DRAFT — TEXT SYNCHRONIZED THROUGH DEC-090 — FINAL VISUAL REVIEW PENDING`
>
> هذه النسخة مشتقة من Decision Register وSRS v0.9.10 وBusiness Rules وLifecycles وUse Cases وDFD/UML/ERD الحالية حتى `DEC-090`. لا تتغلب على Sources of Truth ولا تجعل SRS Baselined. Working diagrams موجودة في وثائق التحليل، بينما الرسم/التصدير النهائي بالترميز القياسي والمراجعة البشرية ما يزال مطلوبًا قبل Freeze.

---

## 3.1 مقدمة

يعرض هذا الفصل تحليل متطلبات نظام **يَد | YADD** والنموذج التشغيلي المقترح، بدءًا من تقنيات جمع البيانات، مرورًا بأصحاب المصلحة والمتطلبات الوظيفية وغير الوظيفية وقواعد العمل ودورات الحالة وحالات الاستخدام، وصولًا إلى مواصفات العمليات والبيانات والتتبع والمخططات التحليلية.

---

## 3.2 تقنيات جمع البيانات — Data Gathering Techniques

### 3.2.1 تحليل الوثائق — Document Analysis

تم تحليل ملفات الجامعة الأصلية، ووثائق الحوكمة الداخلية، وDecision Register، وSRS، وقواعد العمل، ووثائق البحث ذات الصلة. الهدف هو ضبط المتطلبات الأكاديمية ومنع تحويل Proposal أو Inference إلى Requirement معتمد دون مصدر.

### 3.2.2 الاستبيان — Survey `SUR-01`

استخدم الفريق استبيانًا استكشافيًا كأداة جمع بيانات المستخدمين. بلغ عدد المشاركين 29:

| الفئة | العدد |
|---|---:|
| Beneficiaries | 7 |
| Service Providers | 8 |
| Product/Home-business Providers | 14 |
| **الإجمالي** | **29** |

العينة استكشافية وغير احتمالية، ولذلك لا تستخدم النتائج للتعميم الإحصائي على سكان أمانة العاصمة.

من النتائج القابلة للاستخدام تحليليًا:

- انتشار التوصيات وواتساب والشبكات الاجتماعية والعملاء السابقين كقنوات وصول.
- وجود صعوبة نسبية لدى عينة المستفيدين في العثور على مقدم مناسب دون معرفة مسبقة.
- مقارنة الأسعار قد تتطلب تواصلًا منفصلًا مع عدة أطراف.
- المقدم يحتاج معلومات كافية عن الطلب قبل التسعير.
- منتجات المشاريع المنزلية تعتمد بدرجة كبيرة على التجهيز حسب الطلب والتواصل عبر الرسائل.
- تلقى مفهوم Provider Verification قبولًا أوليًا داخل العينة دون إثبات آلية تقنية محددة.

### 3.2.3 المقابلات والملاحظة

قرر المشرف قبول **Survey-only** كأداة جمع بيانات المستخدمين الرسمية للمشروع وفق `DEC-062`. الإجابات التي جُمعت شفهيًا باستخدام أسئلة الاستبيان نفسها وأدخلت في `SUR-01` تعامل كـInterviewer-administered questionnaire، وليست مقابلات مستقلة.

لا ينسب المشروع لنفسه Interviews أو User Field Observation لم تُنفذ فعليًا. أي ملاحظات مسترجعة لاحقًا من الذاكرة تستخدم فقط كـRetrospective Supplementary Evidence مع فصل ما شوهد فعلًا عن Inference.

### 3.2.4 الأنظمة المشابهة — Similar Systems

تم تحليل منصات تشغيلية ومصادر أكاديمية مع الفصل بين:

- `Evidence`
- `Inference`
- `Design Inspiration`
- `Team Decision`

ولا تنسخ خصائص الأنظمة المنافسة إلى YADD تلقائيًا كمتطلبات.

---

## 3.3 أصحاب المصلحة والأطراف — Stakeholders & Actors

### 3.3.1 أصحاب المصلحة

الأطراف الأساسية:

- Guest / الزائر غير المسجل.
- Beneficiary.
- Service Provider.
- Product Provider / Home-business Provider.
- YADD Administration and authorized staff.
- Project Team.
- Supervisor / Academic Department.

### 3.3.2 نموذج الزائر والحساب والبوابات

قبل Authentication يستطيع الشخص استخدام YADD بصفة `Guest` ضمن حدود التصفح العام فقط وفق `DEC-077`:

- Browse public content.
- Search Providers.
- View Public Provider Profile.
- View Portfolio / Catalog display content and approved public indicators.

لا يستطيع Guest تنفيذ `Create Request`, Private Chat/Inquiry, Transaction, Rating, Block أو Report قبل Authentication. قد تبقى الأزرار المحمية ظاهرة، لكن الضغط عليها يوجه إلى `Log In` أو `Create Account`. كما يجب أن يفرض Backend/API Authentication/Authorization فعليًا؛ لا يعتمد الأمان على الواجهة وحدها.

لا يعرض Public Provider Profile رقم الهاتف أو direct private-contact data أو Verification/Subscription/Transaction/Report data أو غيرها من البيانات الحساسة/الخاصة.

بعد Authentication يعتمد YADD حساب `User` واحدًا للشخص:

- اختيار Beneficiary أو Provider عند البداية يحدد الـOnboarding والبوابة الابتدائية، وليس نوع حساب دائمًا.
- يمكن استخدام Beneficiary Portal مباشرة.
- يمكن إنشاء `Provider Profile` داخل الحساب نفسه.
- Provider Portal يحتاج Provider Profile مستوفيًا شروط النوع: Service Provider يحتاج Identity Verification؛ Product Provider لا يحتاج Government ID، وكلاهما يحتاج شروط الأهلية والاشتراك.
- يمكن الانتقال بين Beneficiary Portal وProvider Portal بالحساب نفسه عند استيفاء الشروط.

`Guest` Actor خارجي غير authenticated، وليس Entity/Class مستقلة في Domain Model لمجرد التصفح العام.

### 3.3.3 نموذج Provider

- يمكن لـUser امتلاك صفر أو Provider Profile واحد.
- في MVP يكون Provider Profile من نوع واحد فقط: `SERVICE` أو `PRODUCT`، ولا يمكن تفعيل النوعين معًا على الملف نفسه — `DEC-074`.
- داخل النوع المختار يمكن ربط تصنيف واحد أو أكثر عبر `ProviderActivity` و`Category` — `DEC-076`.
- يسمح Draft Provider Profile مؤقتًا بصفر تصنيفات، لكن أهلية وظائف التقديم تتطلب تصنيفًا صالحًا واحدًا على الأقل.
- أهلية وظائف التقديم تعتمد نوع Provider: Service Provider يحتاج Identity Verification، بينما Product Provider لا يحتاج Government ID؛ وكلاهما يحتاج Active Subscription لبدء تعاملات جديدة.
- سياسة تغيير Provider Type بعد اختياره لم تعتمد بعد.

### 3.3.4 نموذج Actors الرئيسي

Actors الرئيسية في المخطط العام وفق `DEC-067` كما عدله `DEC-077`:

- `Guest`
- `Beneficiary`
- `Provider`
- `YADD Administrator`

يمكن تخصص Provider إلى Service Provider وProduct Provider عند الحاجة. وتبقى الأدوار الإدارية المتخصصة مثل Verification Reviewer وContent Moderator وSubscription Administrator ضمن التفاصيل والصلاحيات، لا كActors إلزامية في المخطط الرئيسي.

---

## 3.4 وصف النظام المقترح — Proposed System

### 3.4.1 Public Discovery / Guest Boundary

المسار العام قبل Authentication:

`Browse / Search Providers → Public Provider Profile / Portfolio or Catalog`

إذا حاول Guest تنفيذ Protected Action مثل `Create Request` أو `Communicate / Inquire`:

`Protected CTA → Log In / Create Account → Authenticated User Context`

Authentication هنا شرط للوصول إلى الوظائف المحمية، وليس معنى ذلك أن كل Use Case محمية يجب أن تحتوي `Log In` بعلاقة `<<include>>`.

### 3.4.2 Direct Search Route

بعد Authentication، المسار التفاعلي:

`Search Providers → View Provider Profile / Portfolio or Catalog → Private Inquiry / Chat → Request Transaction Start → Other Party Confirmation → Active Transaction`

القواعد:

- Chat وحدها لا تنشئ Transaction.
- Private Chat تتطلب Authentication.
- يمكن لأي طرف إرسال Request Transaction Start.
- لا تصبح Transaction `Active` إلا بعد تأكيد الطرف الآخر.
- عدم التأكيد أو الرفض يبقي المحادثة دون Transaction.
- بين نفس Beneficiary ونفس Provider توجد Conversation واحدة مستمرة يمكن أن تضم صفرًا أو عدة Transactions عبر الزمن — `DEC-075`.
- تظهر System Events/Separators واضحة عند بدء وانتهاء كل Transaction داخل Conversation المستمرة.

### 3.4.3 Create Request Route

`Create Request → Matching Providers → Provider Responses → Compare / Chat → Select Provider → Active Transaction`

القواعد:

- `Create Request` يتطلب Authentication.
- Request قد يكون Service أو Product.
- السعر الاسترشادي اختياري وغير ملزم.
- لكل Provider استجابة فعالة واحدة فقط لكل Request.
- يمكن تعديل/سحب Provider Response ما دام Request في حالة Open ولم يتم الاختيار.
- Beneficiary يختار مقدمًا واحدًا.
- عند الاختيار يغلق Request أمام الاستجابات الجديدة وتصبح البقية `NotSelected`.
- يبدأ Active Transaction مع Provider المختار.
- إذا كانت Conversation موجودة مسبقًا بين الطرفين يعاد استخدامها ولا تنشأ Conversation جديدة لمجرد بدء Transaction أخرى.
- لا يوجد `Agreement` entity مستقل في MVP.

### 3.4.4 Common Transaction Flow

المسار المشترك:

`Active Transaction → Fulfillment / Preparation → Final Invoice → Approve / Request Revision / Dispute`

- Provider ينشئ Final Invoice بعد التنفيذ/التجهيز.
- Beneficiary يختار Approve أو Request Revision، ويمكن رفع Complaint إذا استمر الخلاف.
- لا يوجد Auto-Approval.
- عند اعتماد الفاتورة تصبح Transaction `Completed`.
- `Completed` هي الحالة النهائية الناجحة للTransaction.
- إذا استمر الخلاف قبل الاعتماد ولم يتوصل الطرفان لاتفاق تصبح Transaction `Disputed`، وهي نهاية غير ناجحة وفق `DEC-073`.
- YADD Administration تراجع أدلة المنصة وتطبق سياستها فقط؛ لا تحكم الحقوق المالية/التجارية ولا تأمر Payment/Refund/Compensation.
- لا توجد Transaction state باسم `Closed`.
- Ratings تحدث فقط بعد `Completed` كعمليات Post-Transaction؛ لا Ratings لـCancelled/Disputed.

---

## 3.5 متطلبات المستخدم — User Requirements

أهم متطلبات المستخدم المحللة حاليًا:

1. Guest يستطيع تصفح المحتوى العام والبحث عن Providers واستعراض Public Provider Profile وPortfolio/Catalog.
2. Protected actions للGuest تتطلب `Log In` أو `Create Account` قبل المتابعة.
3. Public Provider Profile لا يكشف رقم الهاتف/direct private-contact data أو البيانات الحساسة.
4. استخدام حساب User واحد للاستفادة والتقديم بعد Authentication.
5. الانتقال بين Beneficiary Portal وProvider Portal وفق الصلاحيات.
6. إنشاء Provider Profile من نوع واحد فقط: Service أو Product في MVP.
7. اختيار تصنيف واحد أو أكثر داخل نوع Provider نفسه، مع اشتراط تصنيف صالح واحد على الأقل قبل أهلية وظائف التقديم.
8. التحقق من Provider قبل وظائف التقديم.
9. البحث المباشر حسب الفئة والمنطقة.
10. إنشاء Request لخدمة أو منتج للمستخدم authenticated.
11. تمكين Provider المؤهل من إرسال Provider Response واقتراح سعر مختلف عند الحاجة.
12. تعديل/سحب Provider Response قبل الاختيار وفق القواعد الحالية.
13. مقارنة الاستجابات واختيار مقدم واحد.
14. التواصل الخاص قبل Transaction دون اعتبار Chat معاملة، بعد Authentication.
15. بدء Direct Search Transaction بعد طلب صريح وتأكيد الطرف الآخر.
16. الاحتفاظ بـConversation واحدة مستمرة لكل زوج Beneficiary–Provider مع إمكان ارتباطها بعدة Transactions.
17. إلغاء Transaction بعد البداية مع سبب مسجل وفق القواعد الحالية.
18. إنشاء Final Invoice ومراجعتها واعتمادها أو طلب تعديلها.
19. اعتبار Transaction `Completed` بعد اعتماد الفاتورة.
20. إنهاء Transaction في `Disputed` إذا بقي خلاف الفاتورة غير محلول قبل الاعتماد، مع Complaint/Admin review بلا تحكيم مالي.
21. تقييم Provider إلزاميًا من Beneficiary بعد Completed.
22. إتاحة تقييم Beneficiary اختياريًا من Provider بعد Completed.
23. Block + Report للمستخدم authenticated مع مراجعة إدارية.
24. إدارة Portfolio/Catalog داخل Provider Profile.
25. إدارة Provider Verification وSubscription records ضمن النظام.

السياسات الرقمية الثانوية غير المحسومة تبقى Needs Verification ولا تمنع Core Flow.

---

## 3.6 المتطلبات الوظيفية — Functional Requirements Overview

### 3.6.1 Guest / Public Access

- Public Browse/Search متاح دون Authentication.
- Guest يمكنه View Public Provider Profile وPortfolio/Catalog.
- protected CTAs قد تظهر للGuest، لكن تنفيذ Create Request/Chat/Transaction/Rating/Block/Report يحتاج Authentication.
- Backend/API يفرض Authentication/Authorization للوظائف المحمية.
- Public Provider Profile لا يعرض رقم الهاتف أو direct private-contact data أو البيانات الحساسة/الخاصة.

### 3.6.2 Account and Provider Profile

- User Account واحد بعد Create Account/Auth.
- Provider Profile داخل الحساب نفسه.
- وظائف التقديم لا تعمل قبل Verification.
- Provider Profile من نوع واحد فقط `SERVICE` أو `PRODUCT`.
- يمكن اختيار تصنيف واحد أو أكثر داخل النوع المختار؛ Draft قد يبدأ بصفر، لكن أهلية التقديم تحتاج تصنيفًا صالحًا واحدًا على الأقل.

### 3.6.3 Provider Verification

- تقديم Verification Request.
- الحد الأدنى الحالي يتضمن وثيقة هوية وصورة شخصية مع الوثيقة.
- القرار النهائي للمراجعة البشرية المخولة.
- AI مساعد فقط ولا يصدر قرار Verified/Rejected نهائيًا منفردًا.

**Needs Verification:** مدة الاحتفاظ ببيانات التحقق وأي تراخيص مهنية خاصة. الوثائق المقبولة في MVP لمقدم الخدمة حُسمت إلى National ID أو Passport مع صورة الوثيقة وصورة شخصية مع الوثيقة.

### 3.6.4 Discovery and Location

- البحث حسب الفئة والمديرية/الحي، ويمكن للGuest استخدام النسخة العامة منه.
- Provider يحدد Service Areas.
- الموقع الدقيق غير ظاهر للعامة.
- التوسع للأحياء المجاورة يحتاج موافقة Beneficiary.

### 3.6.5 Requests and Provider Responses

- إنشاء Service/Product Request يتطلب Authentication.
- الصور والمعلومات الإضافية اختيارية.
- السعر الاسترشادي اختياري.
- Provider يمكنه اقتراح سعر آخر.
- Provider Response قد تحدد `RequiresDeposit = Yes/No` فقط.
- استجابة فعالة واحدة لكل Provider/Request.
- يمكن Edit/Withdraw قبل الاختيار ما دام Request Open.
- Beneficiary يقارن الاستجابات ويختار Provider واحدًا.

### 3.6.6 Communication and Transaction Start

- Private Chat قبل Transaction مسموحة للمستخدمين authenticated.
- Chat وحدها لا تنشئ Transaction.
- لا يتطلب التواصل الأساسي داخل YADD كشف رقم الهاتف.
- Conversation واحدة مستمرة لكل Beneficiary–Provider pair ويمكن أن تضم عدة Transactions مع System Events واضحة للحدود.
- Request Route: Selection يبدأ Transaction مع Provider المختار.
- Direct Search Route: أحد الطرفين يرسل Request Transaction Start، والطرف الآخر يؤكد قبل Active Transaction.

### 3.6.7 Transaction and Cancellation

- Transaction لها Beneficiary واحد وProvider واحد.
- يمكن إلغاء Transaction بعد بدئها وفق القواعد الحالية مع سبب مسجل.
- Request Closure قبل Selection مختلف عن Transaction Cancellation.
- عدة Transactions متوازية مسموحة حاليًا دون حد رقمي معتمد.

### 3.6.8 Invoice and Dispute

- Provider ينشئ Final Invoice بعد التنفيذ/التجهيز.
- تحتوي على البنود والأسعار والإجمالي ويمكن أن تحتوي صورًا اختيارية.
- Beneficiary يختار Approve أو Request Revision مع ملاحظة.
- عدم الرد يبقيها Pending Customer Approval.
- لا يوجد Auto-Approval.
- اعتماد الفاتورة يؤدي إلى Transaction Completed.
- عند استمرار الخلاف قبل الاعتماد يمكن رفع Complaint؛ إذا لم يتوصل الطرفان لاتفاق تنتهي Transaction في `Disputed`.
- Admin review يطبق YADD policy/admin action ولا يحسم Payment/Refund/Compensation أو الحقوق المالية/التجارية.

### 3.6.9 Ratings and Reputation

**Beneficiary → Provider**
- بعد Transaction Completed فقط.
- 1–5 Stars إلزامية.
- Comment اختياري.

**Provider → Beneficiary**
- بعد Transaction Completed فقط.
- اختياري مع Prompt بارز.
- ثلاثة مؤشرات 1–5:
  - Request and communication clarity.
  - Commitment to agreement.
  - Cooperation and conduct.
- Comment اختياري.
- لا ينتج عنه منع/عقوبة آلية في MVP.

لا Ratings بعد Cancelled أو Disputed، ولا ينشئ Guest Ratings.

### 3.6.10 Portfolio / Catalog

- Service Provider يستخدم Portfolio.
- Product Provider يستخدم Product Catalog.
- يمكن توحيدهما تقنيًا في Showcase Item.
- تحفظ نسخة الأصل بصورة غير عامة.
- نسخة العرض تحمل Watermark تعريفية مرتبطة بـYADD/Provider.
- Watermark لا تثبت الملكية القانونية.
- Guest يمكنه استعراض نسخة العرض العامة، لا الأصل أو البيانات الخاصة.

### 3.6.11 Trust & Safety

- Block يوقف التواصل المباشر.
- Report يرسل الحالة للمراجعة الإدارية.
- Block/Report يتطلبان User authenticated وفق DEC-077.
- البلاغ أو AI Flag لا يساوي إدانة أو عقوبة تلقائية.
- Transaction Complaint تحت DEC-073 يستخدم نفس مبدأ المراجعة الإدارية المحدودة بسياسة المنصة.

### 3.6.12 Subscription

- النموذج التجاري الحالي اشتراك دوري من Providers دون عمولة معاملات.
- YADD يدير Subscription record.
- التحصيل خارجي ويؤكده موظف مخول.
- تقديم Provider Responses جديدة يتطلب Active Subscription وأهلية النوع: Service Provider = Identity Verified، وProduct Provider = Account/Profile eligible دون Government ID.

### 3.6.13 Financial Boundary

YADD لا يدير أي حركة مالية بين Beneficiary وProvider.

لا يوجد داخل MVP:

- Payment.
- Wallet.
- Escrow.
- Refund.
- Compensation/Settlement authority by YADD Administration.
- Deposit amount/percentage/status.

يجوز فقط أن تحدد Provider Response `RequiresDeposit = Yes/No`; كل تفاصيل الدفع والتسوية خارج YADD.

---

## 3.7 المتطلبات غير الوظيفية — Non-Functional Requirements

### 3.7.1 Security and Privacy

- حماية الحسابات والمحادثات والمرفقات وبيانات Verification.
- تقييد الوصول إلى بيانات الهوية الحساسة.
- Backend/API هو المرجع النهائي لـAuthentication/Authorization ولا يعتمد على إخفاء الأزرار في الواجهة.
- تسجيل الوصول/الإجراءات الإدارية المناسبة وفق التصميم النهائي.
- عدم نشر الموقع الدقيق للعامة.
- عدم عرض رقم الهاتف/direct private-contact data في Public Provider Profile.
- تقليل جمع وإظهار البيانات الشخصية إلى ما يلزم الوظيفة.

### 3.7.2 Usability

- خطوات ومصطلحات بسيطة وواضحة للمستخدم.
- إخفاء الحالات الداخلية التقنية غير اللازمة للمستخدم.
- يمكن إظهار protected CTAs للGuest مع Authentication Gate واضح، دون إعطائه صلاحية العملية قبل المصادقة.

`UX-VAL-Q01`: ملاءمة التدفق للمستخدم المستهدف والاتصال الضعيف تحتاج Usability Validation فعلية.

### 3.7.3 Reliability and Data Integrity

- عدم الرد على الفاتورة لا يعد موافقة.
- لا تتحول Transaction إلى Completed بدون Invoice Approval.
- Final Invoice المعتمدة هي السجل الرسمي النهائي للبنود والأسعار داخل YADD.
- لا يتم الكتابة فوق تاريخ الفاتورة بما يفقد النسخ السابقة.
- `Disputed` لا يعامل كCompleted ولا يفتح Ratings.

### 3.7.4 Performance and Availability

لا توجد أهداف كمية معتمدة بعد لزمن الاستجابة أو التوفر أو تحمل الاتصال المتقطع. تحدد بعد Prototype وTechnical Validation؛ لا يتم اختلاق أرقام.

---

## 3.8 قواعد العمل الأساسية — Business Rules

1. Guest يستطيع Public Browse/Search/View فقط قبل Authentication.
2. protected actions تتطلب Authentication، ويطبق Backend/API الحماية فعليًا.
3. Public Provider Profile لا يعرض phone/direct private-contact data أو البيانات الحساسة.
4. يوجد Direct Search وCreate Request.
5. السعر في Request اختياري واسترشادي.
6. Provider يمكنه اقتراح سعر مختلف.
7. لكل Provider استجابة فعالة واحدة لكل Request؛ يمكن تعديلها أو سحبها قبل Selection.
8. Beneficiary يختار Provider واحدًا.
9. Chat قبل Transaction مسموحة للمستخدم authenticated لكنها ليست Transaction.
10. Direct Search Transaction تحتاج Request Start + confirmation من الطرف الآخر.
11. Selection من Request يغلق الطلب أمام استجابات جديدة ويبدأ Transaction.
12. Conversation واحدة مستمرة بين نفس Beneficiary وProvider ويمكن أن تضم عدة Transactions عبر الزمن.
13. لا يوجد Agreement entity مستقل.
14. `RequiresDeposit` Boolean فقط، والدفع الخارجي خارج YADD.
15. Final Invoice هي السجل النهائي للبنود والأسعار داخل YADD.
16. لا يوجد Auto-Approval.
17. Request Closure قبل Selection مختلف عن Transaction Cancellation.
18. `Completed` هي الحالة النهائية الناجحة للTransaction.
19. unresolved pre-approval dispute يؤدي إلى `Disputed` كحالة نهائية غير ناجحة.
20. YADD Administration لا تحكم Payment/Refund/Compensation في النزاع.
21. Beneficiary Rating للمقدم إلزامي بعد Completed.
22. Provider Rating للمستفيد اختياري بعد Completed.
23. Ratings لا تنقل Transaction إلى Closed ولا تفتح لـCancelled/Disputed.
24. عدة Transactions متوازية مسموحة دون حد رقمي معتمد.
25. التوصيل ليس عملية يديرها YADD.
26. Provider Responses جديدة تتطلب Verification + Active Subscription.
27. Provider Profile من نوع واحد فقط SERVICE أو PRODUCT، مع تصنيف واحد أو أكثر داخل النوع عند الأهلية.
28. AI يدعم Verification/Safety ولا يصدر وحده قرارًا نهائيًا عالي الأثر.

---

## 3.9 دورات الحالة — Lifecycles

إضافة Guest لا تنشئ Domain Lifecycle جديدًا؛ الانتقال من Guest إلى User context هو Authentication/Account interaction، وليس حالة لـRequest أو Transaction.

### 3.9.1 Request Lifecycle

`Draft → Open → Matched / ClosedByBeneficiary / Expired`

- `Matched`: تم اختيار Provider وبدأت Transaction.
- `ClosedByBeneficiary`: لم يعد Request مطلوبًا قبل Selection.
- `Expired`: بعد سياسة عدم نشاط لم تعتمد قيمها الرقمية بعد.

### 3.9.2 Provider Response Lifecycle

`Submitted → Selected / NotSelected / Withdrawn`

أثناء الحالة النشطة يمكن تعديل Provider Response بدل إنشاء استجابات مكررة، ما دام Request Open ولم يتم Selection.

### 3.9.3 Transaction Lifecycle

المسار الناجح:

`Active → AwaitingInvoice → RevisionRequested ↔ AwaitingInvoice → Completed`

مسارات نهائية بديلة:

- `Cancelled`
- `Disputed`

`Completed` terminal successful state. `Disputed` terminal unsuccessful state under DEC-073. لا توجد حالة Transaction باسم `Closed`.

### 3.9.4 Invoice Lifecycle

`Draft → PendingCustomerApproval → Approved / RevisionRequested / Disputed`

عدم الاستجابة يبقي الفاتورة Pending ولا يحولها تلقائيًا إلى Approved.

### 3.9.5 Rating Lifecycles

بعد Transaction Completed يبدأ تدفق Post-Transaction مستقل:

- Provider Rating by Beneficiary: `Required → Submitted`.
- Beneficiary Rating by Provider: `Offered → Submitted / Skipped`.

هذه الحالات ليست Transaction states، ولا تبدأ بعد Cancelled/Disputed.

---

## 3.10 حالات الاستخدام الأساسية — Use Cases

حالات الاستخدام الحالية:

- `UC-00` Browse Public Provider Information — Guest.
- `UC-01` Search and Inquire Directly — الجزء التفاعلي الخاص يتطلب Authentication.
- `UC-02` Create Request.
- `UC-03` Respond to Request.
- `UC-04` Select Provider from Request.
- `UC-05` Cancel Active Transaction.
- `UC-06` Create and Approve Invoice، ويشمل revision/complaint branch وفق المواصفات الحالية.
- `UC-07` Rate Provider.
- `UC-07B` Provider Rates Beneficiary.
- `UC-08` Block and Report User / Content.
- `UC-09` Service Provider Identity Verification / Provider Portal Eligibility.
- `UC-10` Manage Portfolio / Catalog.

الـMain Use Case Diagram يفكك هذه المواصفات إلى Actor goals أصغر عند الحاجة. `Log In` و`Create Account` لا يستخدمان كـ`<<include>>` ميكانيكي داخل كل protected Use Case؛ Authentication يمثل Precondition، بينما محاولة Guest لفعل محمي توجهه إلى Authentication Gate وفق DEC-077.

علاقات `<<include>>` و`<<extend>>` الحالية موثقة في `08-use-cases.md` و`13-traceability-matrix.md` ويجب أن تبقى مستندة إلى سلوك إلزامي/اختياري حقيقي، لا مجرد ترتيب زمني.

---

## 3.11 المخططات — Current Working State

وفق قرار المشرف وهيكل الجامعة، يستخدم Chapter Three **DFD + UML معًا**. المخرجات المطلوبة تشمل:

- DFD Context / Level 0 / levels as academically needed.
- Use Case Diagram + Specifications.
- Activity Diagrams.
- Sequence Diagrams.
- Class Diagram.
- ERD.

**الحالة الحالية:**

- `09-DFD.md`: Working Context + Level 0 semantics متزامنة حتى DEC-090 وتشمل Guest كExternal Entity؛ final standard redraw/export pending.
- `10-UML.md`: حزمة UML العاملة متزامنة حتى DEC-091: خمس Use Case views، وستة عشر Activity Diagram، وعشرون Sequence Diagram، إضافة إلى Class package؛ النسخة الأكاديمية النهائية تحتاج مراجعة/تصدير A4.
- Activity/Sequence sources تمثل Guest authentication gate والمسارات المحمية ودورات الطلب/المعاملة دون إنشاء Domain semantics جديدة.
- Class package: Detailed Analysis Class Model واحد مع Integrated Master + ثلاث Detailed Views؛ Guest لا يضيف Class.
- `11-ERD.md`: Core Conceptual ERD يبقى صحيحًا بنيويًا؛ Guest لا يضيف Entity لمجرد التصفح العام، ويلزم فقط إبقاء public/private visibility في التصميم.

جميع التسميات داخل الرسم النهائي باللغة الإنجليزية وفق DEC-072.

---

## 3.12 مواصفات العمليات والبيانات — Process & Data Specifications

المجالات المنطقية الحالية:

1. Accounts & Provider Profiles / Authentication boundary.
2. Discovery & Requests، بما فيها Public Guest Discovery.
3. Provider Responses & Communication.
4. Transactions & Invoices.
5. Ratings & Reputation.
6. Verification, Safety & Administration.

لا تستخدم مصطلحات `Offer` أو `Agreement` كمخزن/كيان قياسي؛ المصطلح الحالي هو `Provider Response` ولا يوجد Agreement entity مستقل.

مخازن البيانات المنطقية تتبع النموذج الحالي مثل Users/Profiles، Requests/Responses، Conversations/Transactions، Invoices، Ratings، Portfolio/Catalog، Verification/Subscriptions/Reports. Guest لا يحتاج Store مستقلًا لمجرد public browsing. Complaint/Dispute يستخدم Transaction + Report context ولا يضيف Settlement store.

---

## 3.13 التتبع — Traceability

تتبع المتطلبات يسير وفق:

`Evidence / Decision → Requirement → Business Rule → Use Case → Process / Diagram → Entity → Design`

وجود Requirement داخل SRS لا يعني تلقائيًا أنه Approved Requirement. البنود التي تعتمد على قيم تشغيلية غير محسومة تبقى Needs Verification حتى يتم إثباتها أو اعتمادها.

Core Traceability الحالية متزامنة حتى `DEC-090`، وتشمل UR-GST-* وربطها بـUC-00 وDFD/UI/public-private boundary. Design Traceability لChapter Four والمخططات النهائية ما يزال مطلوبًا قبل Freeze/Baseline.

---

## 3.14 النقاط المفتوحة غير المانعة للCore Analysis

تبقى البنود التالية Needs Verification / Design Detail ولا تعيد فتح Core Flow:

- `SAFE-REQ-Q01` — abuse thresholds.
- `TX-CONC-Q01` — numeric concurrent transaction limit if needed.
- `UX-VAL-Q01` — usability/low-connectivity validation.
- `LOC-DATA-Q01`, `LOC-OPS-TIME-Q01`.
- `VER-RET-Q01`, `VER-LIC-Q01`.
- `AI-MOD-Q01/02`, `AI-PROV-Q01`, `AI-RET-Q01`, `AI-APPEAL-Q01`.
- سعر الاشتراك النهائي (`SUB-PLAN-Q01`), `SUB-PAY-Q01`, وأثر Expired على الظهور العام فقط (`SUB-OPS-Q01`).
- Provider Type switching after initial selection.
- exact UX continuation after Guest authenticates from a protected CTA.

هذه لا تتحول إلى Facts أو Requirements رقمية نهائية دون Evidence.

---

## 3.15 خلاصة الفصل

أصبح Core Analysis متسقًا نصيًا مع القرارات الحالية حتى DEC-090:

- Guest يستطيع Public Browse/Search/View فقط قبل Authentication، والوظائف المحمية تتطلب Login/Create Account.
- Public Provider Profile لا يكشف phone/direct private-contact data أو البيانات الحساسة.
- User Account واحد بعد Authentication؛ Create Account يستخدم الاسم الرباعي بأربعة حقول + Mobile + Password + OTP، والبريد اختياري وموثق قبل استخدامه للدخول/الاستعادة.
- Provider Profile واحد اختياري لكل User ومن نوع واحد فقط SERVICE أو PRODUCT؛ Trade Name اختياري لمقدم المنتج.
- يمكن للمقدم امتلاك عدة تصنيفات داخل النوع، مع اشتراط واحد صالح على الأقل للأهلية.
- Direct Search وCreate Request مساران أساسيان.
- Conversation واحدة مستمرة لكل Beneficiary–Provider pair ويمكن أن تضم عدة Transactions.
- Provider Response واحدة فعالة قابلة للتعديل/السحب قبل Selection ودون مدة مستقلة؛ Request inactivity 24h/48h/72h.
- Direct Search Transaction تبدأ فقط بطلب + تأكيد الطرف الآخر.
- لا يوجد Agreement entity مستقل.
- العربون Yes/No فقط والدفع خارج YADD.
- Final Invoice approval يؤدي إلى `Completed`.
- `Completed` terminal successful Transaction state ولا توجد `Closed` state.
- unresolved pre-approval dispute يؤدي إلى `Disputed` terminal unsuccessful state، مع Admin review محدود بسياسة المنصة ودون تحكيم مالي.
- Beneficiary → Provider rating إلزامي بعد Completed.
- Provider → Beneficiary rating اختياري بعد Completed.
- لا Ratings لـCancelled/Disputed.
- Portfolio/Catalog وVerification وBlock/Report وSubscriptions جزء من النموذج الحالي.

**الحكم:** الجانب النصي وWorking Models متزامنة للمراجعة الأولية عبر DEC-077، لكن الفصل لا يصبح Baselined أو جاهزًا نهائيًا إلا بعد final diagram redraw/export، إكمال Design Traceability، ومراجعة الفريق/المشرف.
