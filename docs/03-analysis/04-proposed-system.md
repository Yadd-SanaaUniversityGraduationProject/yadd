# وصف النظام المقترح — Proposed System Working Model

> **الحالة:** `ANALYZED — SYNCHRONIZED 2026-09-18 THROUGH DEC-090`
>
> هذه الوثيقة وصف تحليلي مشتق من Decision Register وSRS وBusiness Rules الحالية. لا تتغلب على مصادر الحقيقة الأعلى ولا تجعل SRS Baselined.

## 1. Purpose and Scope

YADD منصة رقمية محلية ضمن نطاق MVP في أمانة العاصمة — صنعاء، تهدف إلى تنظيم اكتشاف وطلب الخدمات المهنية/الفنية ومنتجات الأسر المنتجة/المشاريع المنزلية، وربط المستفيدين بالمقدمين ضمن دورة تعامل موثقة داخل النظام.

يدعم النظام مسارين أساسيين للوصول إلى المقدم:

1. `Direct Search`
2. `Create Request`

كما يدعم `Guest` غير مسجل الدخول لتصفح المحتوى العام والبحث عن Providers وفتح Public Provider Profile واستعراض Portfolio/Catalog. الوظائف المحمية مثل Create Request وPrivate Chat وTransaction actions تتطلب Authentication — DEC-077.

ولا يدير YADD أي حركة مالية بين Beneficiary وProvider.

## 2. Core Account, Guest and Provider Model

- قبل Authentication يمكن استخدام المنصة بصفة `Guest` للتصفح العام فقط.
- Guest ليس حسابًا ولا Domain Entity مستقلًا؛ عند محاولة protected action يطلب YADD `Log In` أو `Create Account`.
- يوجد `User Account` واحد للشخص بعد Authentication.
- يمكن استخدام Beneficiary Portal مباشرة.
- يمكن إنشاء `Provider Profile` واحد كحد أقصى داخل الحساب نفسه.
- في MVP يكون Provider Profile من نوع واحد فقط: `SERVICE` أو `PRODUCT` — DEC-074.
- يمكن للمقدم اختيار تصنيف واحد أو أكثر داخل نوعه فقط عبر `ProviderActivity`; Draft قد يحتوي صفرًا مؤقتًا، لكن أهلية وظائف التقديم تتطلب تصنيفًا صالحًا واحدًا على الأقل — DEC-076.
- Service Provider يحتاج Identity Verification قبل وظائف التقديم؛ Product Provider لا يحتاج Government ID في MVP لكنه يحتاج Account/Profile eligibility.
- كلا النوعين يحتاجان Active Subscription لبدء تعاملات جديدة.
- سياسة تغيير Provider Type بعد الاختيار لم تعتمد بعد.

**المرجع:** DEC-008..011/030/074/076/077/078/079/080/085/086.

## 2.1 Account and Authentication Detail

Create Account: First/Father/Grandfather/Family Name + Mobile + Password + Terms/Privacy، والبريد اختياري. OTP للهاتف إلزامي قبل اكتمال الحساب. Log In بالهاتف الموثق أو البريد الموثق + Password؛ Forgot Password عبر OTP للهاتف والبريد الموثق خيار إضافي. يدعم Manage Account التغيير الموثق وDeactivate/Reactivate دون Hard Delete ذاتي.

## 3. Discovery Route A — Direct Search

التدفق المفاهيمي العام يبدأ من:

`Browse/Search Providers → View Public Provider Profile / Portfolio or Catalog`

وهذه المرحلة متاحة للGuest وللمستخدم authenticated ضمن البيانات العامة المسموح بها.

إذا أراد Guest بدء تفاعل محمي، ينتقل أولًا إلى:

`Log In / Create Account`

بعد Authentication يستكمل المسار الخاص بالمستفيد:

`Private Inquiry / Chat → Request Transaction Start → Other Party Confirmation → Active Transaction`

قواعد المسار:

- البحث يعتمد على التصنيف والمنطقة وفق النموذج الجغرافي الحالي.
- يمكن للGuest والمستفيد استعراض Public Provider Profile وPortfolio/Catalog.
- Public Provider Profile لا يعرض رقم الهاتف أو direct private-contact data أو بيانات Verification/Subscription/Transactions/Reports/بيانات حساسة.
- المحادثة قبل Transaction مسموحة للمستخدمين authenticated فقط.
- Chat وحدها لا تنشئ Transaction.
- بين نفس Beneficiary ونفس Provider توجد Conversation مستمرة واحدة يمكن أن تضم عدة Transactions عبر الزمن — DEC-075.
- يمكن لأي من Beneficiary أو Provider إرسال `Request Transaction Start`.
- لا ينشئ النظام Active Transaction إلا بعد تأكيد الطرف الآخر.
- إذا لم يوجد تأكيد، تبقى المحادثة دون Transaction.
- عند بدء/انتهاء أي Transaction داخل Conversation المستمرة تظهر System Event/Separator واضحة لحدود التعامل.

**المرجع:** DEC-012/031..033/046/064/066/069/075/077.

## 4. Discovery Route B — Create Request

التدفق المفاهيمي:

`Create Request → Matching Providers → Provider Responses → Compare / Chat → Select Provider → Active Transaction`

قواعد المسار:

- `Create Request` وظيفة محمية تتطلب Authentication؛ يمكن أن يظهر CTA للGuest لكنه يوجه إلى Log In/Create Account قبل تنفيذ العملية — DEC-077.
- Request قد يكون Service أو Product.
- يحتوي على الفئة والمنطقة والوصف، مع صور/معلومات إضافية اختيارية وسعر استرشادي اختياري.
- المقدم المؤهل يجب أن يطابق نوع Request وتصنيفه داخل Provider Activities، إضافة إلى بقية شروط الأهلية.
- المقدم المؤهل يمكنه إرسال `Provider Response` واقتراح سعر آخر عند الحاجة.
- Provider Response قد تحتوي `RequiresDeposit = Yes/No` فقط.
- لكل Provider استجابة فعالة واحدة لكل Request.
- يمكن للمقدم تعديل أو سحب استجابته ما دام Request في حالة Open ولم يتم اختياره.
- يختار Beneficiary مقدمًا واحدًا.
- عند الاختيار يغلق Request أمام استجابات جديدة وتصبح بقية الاستجابات `NotSelected`.
- يبدأ Transaction مع المقدم المختار.
- إذا كانت Conversation بين الطرفين موجودة مسبقًا، تستخدم نفس Conversation المستمرة ولا تنشئ Conversation جديدة لمجرد بدء Transaction جديدة.
- لا يوجد `Agreement` entity مستقل في MVP.

**المرجع:** DEC-012..014/041/047/066/070/074/075/076/077.

## 5. Common Transaction Flow

بعد بدء Transaction في أي من المسارين، يستخدم YADD تدفقًا موحدًا للخدمة والمنتج:

`Active Transaction → Fulfillment / Preparation → Final Invoice → Approve / Request Revision / Dispute`

النهايات:

- `Approve → Completed` — النهاية الناجحة للTransaction.
- إذا استمر الخلاف قبل اعتماد الفاتورة ولم يتوصل الطرفان إلى اتفاق → `Disputed` — نهاية غير ناجحة.
- يمكن إلغاء Transaction قبل ذلك وفق قواعد الإلغاء الحالية مع سبب مسجل → `Cancelled`.

قواعد أساسية:

- جميع إجراءات Transaction محمية وتتطلب User identity/authentication؛ Guest لا ينفذها.
- Provider ينفذ الخدمة أو يجهز المنتج خارج منطق الدفع داخل YADD.
- بعد التنفيذ/التجهيز واستقرار البنود ينشئ Provider الفاتورة النهائية.
- Beneficiary يختار `Approve` أو `Request Revision` مع ملاحظة، ويمكن رفع Complaint عند استمرار الخلاف.
- عدم الرد لا يعد موافقة ولا يوجد Auto-Approval.
- عند اعتماد الفاتورة تصبح Transaction `Completed`.
- `Completed` هي النهاية الناجحة للTransaction؛ لا توجد حالة Transaction مستقلة باسم `Closed`.
- إذا لم يحل الخلاف قبل اعتماد الفاتورة تصبح Transaction `Disputed` وفق `DEC-073` ولا تفتح Ratings.
- إدارة YADD تراجع السجلات لتطبيق سياسة المنصة واتخاذ إجراء إداري عند وجود مخالفة، لكنها لا تفصل ماليًا/تجاريًا ولا تأمر Payment/Refund/Compensation.
- Conversation نفسها قد تحتوي عدة Transactions عبر الزمن، مع فواصل/أحداث نظام واضحة لحدود كل Transaction.

**المرجع:** DEC-015/025/048/050/055/068/071/073/075/077.

## 6. Post-Transaction Ratings

بعد `Transaction Completed` فقط:

- تقييم Beneficiary للمقدم إلزامي كـHybrid Model: Overall Stars 1–5 + Structured Textual Criteria + Optional Comment، مع Later/Reminder 24h وإكماله قبل Transaction جديدة.
- يعرض النظام للمقدم Prompt بارزًا لتقييم Beneficiary اختياريًا.
- تقييم Beneficiary من Provider يتكون من ثلاثة مؤشرات 1–5: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون، مع تعليق اختياري.
- التقييمات مرتبطة بمعاملة Completed ولا تغير Transaction إلى حالة أخرى.
- لا تنتج عقوبات آلية على Beneficiary من انخفاض التقييم في MVP.
- لا Ratings لمعاملة `Cancelled` أو `Disputed`.
- Guest لا ينشئ Ratings؛ التقييم يتطلب هوية مرتبطة بالTransaction.

**المرجع:** DEC-051/063/071/073/077.

## 7. Provider Profile, Portfolio and Catalog

يدعم Provider Profile:

- بيانات المقدم ونوعه الواحد في MVP.
- عدة Provider Activities/تصنيفات داخل ذلك النوع.
- مناطق الخدمة ونبذة.
- صورة/شعار اختياري.
- Product Provider يمكنه Trade Name اختياريًا كاسم عرض عام.
- Portfolio لمقدم الخدمة.
- Product Catalog لمقدم المنتج.

يمكن توحيد عناصر Portfolio/Catalog تقنيًا في مفهوم عرض واحد. نسخة العرض للصورة تحمل علامة مائية تعريفية مرتبطة بـYADD/الحساب، بينما الأصل غير عام. العلامة المائية ليست إثبات ملكية قانونية.

للGuest يعرض فقط **Public Provider Profile projection**: البيانات العامة المعتمدة ونسخة العرض من Portfolio/Catalog. لا يعرض رقم الهاتف أو direct private-contact data أو بيانات Verification/Subscription/Transactions/Reports أو أي بيانات حساسة/خاصة.

**المرجع:** DEC-036/046/064/074/076/077.

## 8. Verification, Safety and Administration

يدعم النظام:

- Provider Verification قبل صلاحيات التقديم.
- مراجعة بشرية نهائية لقرار Verification.
- AI كمساعد في Verification وTrust & Safety، دون قرار نهائي منفرد عالي الأثر.
- Safety Flags تحتوي ما يكفي ليفهم الموظف سبب/فئة الاشتباه، بينما قائمة الفئات والـthresholds ما تزال مفتوحة.
- Block + Report للمستخدم authenticated؛ Guest لا ينفذهما قبل Authentication.
- مراجعة البلاغات/Flags إداريًا.
- إدارة سجل اشتراك Provider Profile، مع تحصيل خارجي وتأكيد من موظف مخول.
- مراجعة Complaint المرتبطة بمعاملة وفق حدود `DEC-073`: تطبيق سياسة المنصة وإجراءاتها الإدارية فقط، دون تحكيم مالي/تجاري.

**المرجع:** DEC-034..043/053/054/073/077.

## 9. Financial and Fulfillment Boundaries

خارج نطاق YADD بين Beneficiary وProvider:

- Payment execution.
- Wallet.
- Escrow.
- Refund processing.
- Financial/commercial settlement or compensation decisions by YADD Administration.
- Deposit amount / percentage / payment status.
- Delivery network / drivers / shipment tracking.

يمكن لـProvider Response فقط تحديد أن التنفيذ `RequiresDeposit`, بينما تفاصيل العربون والدفع والتسوية الخارجية مسؤولية الطرفين.

في المنتجات يمكن الاتفاق على الاستلام أو توصيل يرتبه Provider خارجيًا، ويمكن إدراج تكلفته في الفاتورة.

**المرجع:** DEC-018/019/041/073.

## 10. Current Technical Direction

الاتجاه المعماري الحالي:

`Web Interface → YADD Backend/API → PostgreSQL`

والـBackend/API المركزي هو المرجع النهائي للمعالجة والصلاحيات وBusiness Rules والوصول إلى قاعدة البيانات. Flutter عميل Mobile لاحق يتصل بالAPI نفسه.

بالنسبة لـGuest، يمكن للواجهة إظهار protected CTA وتوجيهه إلى Authentication، لكن Backend/API يجب أن يفرض Authentication/Authorization فعليًا لكل protected operation — DEC-065/077.

هذا اتجاه تقني معتمد، لكنه لا يحسم Framework الويب أو Backend النهائي.

**المرجع:** DEC-065/077.

## 11. Main Capabilities Derived for Analysis

1. Guest Public Browse / Search / Public Provider Profile access.
2. Log In / Create Account and Manage Account / Portal Access.
3. Manage Provider Profile and Activities.
4. Manage Categories, Areas and Service Areas.
5. Search and View Providers.
6. Manage Portfolio / Catalog.
7. Create and Manage Requests.
8. Submit, Edit and Withdraw Provider Responses.
9. Private Communication / Inquiry with one persistent Conversation per Beneficiary–Provider pair.
10. Select Provider or Confirm Direct Transaction Start.
11. Manage Transaction and Cancellation.
12. Create, Revise and Approve Final Invoice.
13. Raise Complaint / Administrative Review for unresolved pre-approval disputes.
14. Rate Provider and optionally Rate Beneficiary after Completed.
15. Provider Verification.
16. Block, Report and Administrative Review.
17. Manage Provider Subscription Records.

هذه القائمة وصف تحليلي للCapabilities وليست بديلًا عن FR IDs في SRS.

## 12. Open / Needs Verification

النقاط التالية لا تُملأ بتخمين ولا تمنع Core Flow الحالي:

- Request expiry/reminder timing.
- Pending invoice escalation timing/policy.
- Abuse detection thresholds.
- Usability and low-connectivity validation.
- Official district/neighborhood seed data.
- Accepted identity document types and retention periods.
- Detailed AI provider/threshold/retention policy.
- Subscription package prices/payment-proof details and exact expiry effects.
- Provider Type switching policy after initial selection.
- Exact UX continuation after Guest authenticates from a protected CTA; this does not change the authorization rule.