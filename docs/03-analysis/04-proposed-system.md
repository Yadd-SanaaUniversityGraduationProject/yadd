# وصف النظام المقترح — Proposed System Working Model

> **الحالة:** `ANALYZED — SYNCHRONIZED 2026-09-04`
>
> هذه الوثيقة وصف تحليلي مشتق من Decision Register وSRS وBusiness Rules الحالية. لا تتغلب على مصادر الحقيقة الأعلى ولا تجعل SRS Baselined.

## 1. Purpose and Scope

YADD منصة رقمية محلية ضمن نطاق MVP في أمانة العاصمة — صنعاء، تهدف إلى تنظيم اكتشاف وطلب الخدمات المهنية/الفنية ومنتجات الأسر المنتجة/المشاريع المنزلية، وربط المستفيدين بالمقدمين ضمن دورة تعامل موثقة داخل النظام.

يدعم النظام مسارين أساسيين للوصول إلى المقدم:

1. `Direct Search`
2. `Create Request`

ولا يدير YADD أي حركة مالية بين Beneficiary وProvider.

## 2. Core Account and Provider Model

- يوجد `User Account` واحد للشخص.
- يمكن استخدام Beneficiary Portal مباشرة.
- يمكن إنشاء `Provider Profile` داخل الحساب نفسه.
- Provider Profile يحتاج Verification قبل وظائف التقديم.
- يمكن تفعيل Service Activity أو Product Activity أو كليهما.

**المرجع:** DEC-008..011/029/030/034/035.

## 3. Discovery Route A — Direct Search

التدفق المفاهيمي:

`Search Providers → View Provider Profile / Portfolio or Catalog → Private Inquiry / Chat → Request Transaction Start → Other Party Confirmation → Active Transaction`

قواعد المسار:

- البحث يعتمد على التصنيف والمنطقة وفق النموذج الجغرافي الحالي.
- يمكن للمستفيد استعراض Provider Profile وPortfolio/Catalog.
- المحادثة قبل Transaction مسموحة.
- Chat وحدها لا تنشئ Transaction.
- يمكن لأي من Beneficiary أو Provider إرسال `Request Transaction Start`.
- لا ينشئ النظام Active Transaction إلا بعد تأكيد الطرف الآخر.
- إذا لم يوجد تأكيد، تبقى المحادثة دون Transaction.

**المرجع:** DEC-012/031..033/046/064/066/069.

## 4. Discovery Route B — Create Request

التدفق المفاهيمي:

`Create Request → Matching Providers → Provider Responses → Compare / Chat → Select Provider → Active Transaction`

قواعد المسار:

- Request قد يكون Service أو Product.
- يحتوي على الفئة والمنطقة والوصف، مع صور/معلومات إضافية اختيارية وسعر استرشادي اختياري.
- المقدم المؤهل يمكنه إرسال `Provider Response` واقتراح سعر آخر عند الحاجة.
- Provider Response قد تحتوي `RequiresDeposit = Yes/No` فقط.
- لكل Provider استجابة فعالة واحدة لكل Request.
- يمكن للمقدم تعديل أو سحب استجابته ما دام Request في حالة Open ولم يتم اختياره.
- يختار Beneficiary مقدمًا واحدًا.
- عند الاختيار يغلق Request أمام استجابات جديدة وتصبح بقية الاستجابات `NotSelected`.
- يبدأ Transaction مع المقدم المختار.
- لا يوجد `Agreement` entity مستقل في MVP.

**المرجع:** DEC-012..014/041/047/066/070.

## 5. Common Transaction Flow

بعد بدء Transaction في أي من المسارين، يستخدم YADD تدفقًا موحدًا للخدمة والمنتج:

`Active Transaction → Fulfillment / Preparation → Final Invoice → Approve or Request Revision → Completed`

قواعد أساسية:

- Provider ينفذ الخدمة أو يجهز المنتج خارج منطق الدفع داخل YADD.
- بعد التنفيذ/التجهيز واستقرار البنود ينشئ Provider الفاتورة النهائية.
- Beneficiary يختار `Approve` أو `Request Revision` مع ملاحظة.
- عدم الرد لا يعد موافقة ولا يوجد Auto-Approval.
- عند اعتماد الفاتورة تصبح Transaction `Completed`.
- `Completed` هي النهاية الناجحة للTransaction؛ لا توجد حالة Transaction مستقلة باسم `Closed`.
- يمكن إلغاء Transaction بعد بدئها وفق القواعد الحالية مع سبب مسجل.

**المرجع:** DEC-015/025/048/050/055/068/071.

## 6. Post-Transaction Ratings

بعد `Transaction Completed`:

- تقييم Beneficiary للمقدم إلزامي: 1–5 نجوم، والتعليق اختياري.
- يعرض النظام للمقدم Prompt بارزًا لتقييم Beneficiary اختياريًا.
- تقييم Beneficiary من Provider يتكون من ثلاثة مؤشرات 1–5: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون، مع تعليق اختياري.
- التقييمات مرتبطة بمعاملة Completed ولا تغير Transaction إلى حالة أخرى.
- لا تنتج عقوبات آلية على Beneficiary من انخفاض التقييم في MVP.

**المرجع:** DEC-051/063/071.

## 7. Provider Profile, Portfolio and Catalog

يدعم Provider Profile:

- بيانات المقدم والنشاط.
- مناطق الخدمة.
- Portfolio لمقدم الخدمة.
- Product Catalog لمقدم المنتج.

يمكن توحيد عناصر Portfolio/Catalog تقنيًا في مفهوم عرض واحد. نسخة العرض للصورة تحمل علامة مائية تعريفية مرتبطة بـYADD/الحساب، بينما الأصل غير عام. العلامة المائية ليست إثبات ملكية قانونية.

**المرجع:** DEC-064.

## 8. Verification, Safety and Administration

يدعم النظام:

- Provider Verification قبل صلاحيات التقديم.
- مراجعة بشرية نهائية لقرار Verification.
- AI كمساعد في Verification وTrust & Safety، دون قرار نهائي منفرد عالي الأثر.
- Block + Report.
- مراجعة البلاغات/Flags إداريًا.
- إدارة سجل اشتراك Provider Profile، مع تحصيل خارجي وتأكيد من موظف مخول.

**المرجع:** DEC-034..043/053/054.

## 9. Financial and Fulfillment Boundaries

خارج نطاق YADD بين Beneficiary وProvider:

- Payment execution.
- Wallet.
- Escrow.
- Refund processing.
- Deposit amount / percentage / payment status.
- Delivery network / drivers / shipment tracking.

يمكن لـProvider Response فقط تحديد أن التنفيذ `RequiresDeposit`, بينما تفاصيل العربون والدفع والتسوية الخارجية مسؤولية الطرفين.

في المنتجات يمكن الاتفاق على الاستلام أو توصيل يرتبه Provider خارجيًا، ويمكن إدراج تكلفته في الفاتورة.

**المرجع:** DEC-018/019/041.

## 10. Current Technical Direction

الاتجاه المعماري الحالي:

`Web Interface → YADD Backend/API → PostgreSQL`

والـBackend/API المركزي هو المرجع النهائي للمعالجة والصلاحيات وBusiness Rules والوصول إلى قاعدة البيانات. Flutter عميل Mobile لاحق يتصل بالAPI نفسه.

هذا اتجاه تقني معتمد، لكنه لا يحسم Framework الويب أو Backend النهائي.

**المرجع:** DEC-065.

## 11. Main Capabilities Derived for Analysis

1. Manage Account and Portal Access.
2. Manage Provider Profile and Activities.
3. Manage Categories, Areas and Service Areas.
4. Search and View Providers.
5. Manage Portfolio / Catalog.
6. Create and Manage Requests.
7. Submit, Edit and Withdraw Provider Responses.
8. Private Communication / Inquiry.
9. Select Provider or Confirm Direct Transaction Start.
10. Manage Transaction and Cancellation.
11. Create, Revise and Approve Final Invoice.
12. Rate Provider and optionally Rate Beneficiary.
13. Provider Verification.
14. Block, Report and Administrative Review.
15. Manage Provider Subscription Records.

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
