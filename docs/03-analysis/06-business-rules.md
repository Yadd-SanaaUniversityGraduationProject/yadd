# Business Rules — YADD Core Flow

> **الحالة:** `PARTIALLY ANALYZED`
>
> القواعد `ANALYZED_APPROVED` مستمدة من Decision Register. البنود الرقمية/السياسات المفتوحة لا تعتبر معتمدة.

## قواعد معتمدة

| ID | القاعدة | الحالة | المرجع |
|---|---|---|---|
| BR-001 | يوفر النظام مسارين للاكتشاف: البحث المباشر أو نشر طلب يصل للمقدمين المؤهلين حسب النشاط والمنطقة. | `ANALYZED_APPROVED` | DEC-012 |
| BR-002 | السعر في الطلب اختياري واسترشادي ولا يلزم المقدم. | `ANALYZED_APPROVED` | DEC-013 |
| BR-003 | يستطيع المقدم قبول السعر الاسترشادي أو اقتراح سعر مختلف. | `ANALYZED_APPROVED` | DEC-013 |
| BR-004 | يستطيع المستفيد مقارنة عدة Provider Responses واختيار مقدم واحد. | `ANALYZED_APPROVED` | DEC-014/066 |
| BR-005 | يسمح YADD بمحادثة/استفسار خاص قبل بدء المعاملة؛ المحادثة وحدها لا تنشئ Transaction. | `ANALYZED_APPROVED` | DEC-046 |
| BR-006 | في الطلب المنشور، اختيار مقدم يغلق الطلب أمام الاستجابات الجديدة ويجعل البقية NotSelected ويبدأ المعاملة الرسمية معه. | `ANALYZED_APPROVED` | DEC-047/066 |
| BR-007 | في البحث المباشر، يمكن لأي طرف طلب بدء المعاملة من المحادثة، ولا تصبح Transaction `Active` إلا بعد تأكيد الطرف الآخر. | `ANALYZED_APPROVED` | DEC-069 |
| BR-008 | المحادثة تسمح بالتفاوض والتفاصيل والمرفقات ويمكن الرجوع إليها عند الشكوى، لكنها لا تستبدل الفاتورة النهائية. | `ANALYZED_APPROVED` | DEC-023/055 |
| BR-009 | الفاتورة الرقمية النهائية ينشئها المقدم بعد التنفيذ/التجهيز وبعد استقرار الاتفاق النهائي. | `ANALYZED_APPROVED` | DEC-015/055 |
| BR-010 | تصبح Transaction `Completed` عند اعتماد المستفيد للفاتورة النهائية؛ `Completed` هي النهاية الناجحة للمعاملة ولا توجد حالة Transaction لاحقة باسم `Closed`. | `ANALYZED_APPROVED` | DEC-071 |
| BR-011 | الاتفاقات أو المبالغ غير الموجودة في الفاتورة المعتمدة لا تعد جزءًا من السجل الرسمي النهائي للمعاملة. | `ANALYZED_APPROVED` | DEC-016/024 |
| BR-012 | عند إرسال الفاتورة تبقى Pending Customer Approval؛ عدم الرد لا يعد موافقة ولا يوجد Auto-Approval، وتصل تذكيرات للمستفيد. | `ANALYZED_APPROVED` | DEC-050 |
| BR-013 | قبل الاعتماد يستطيع المستفيد طلب تعديل مع ملاحظة؛ وعند استمرار المشكلة يستطيع رفع شكوى للإدارة. | `ANALYZED_APPROVED` | DEC-025 |
| BR-014 | بعد اعتماد الفاتورة وإكمال المعاملة يجب على المستفيد تقييم المقدم 1–5 نجوم؛ التعليق اختياري. | `ANALYZED_APPROVED` | DEC-051 |
| BR-015 | بعد Transaction Completed يعرض النظام للمقدم تقييم المستفيد اختياريًا عبر ثلاثة مؤشرات 1–5: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون؛ التعليق اختياري. | `ANALYZED_APPROVED` | DEC-063 |
| BR-016 | لا يسمح بأي Rating إلا إذا كان مرتبطًا بمعاملة Completed بين الطرفين؛ Ratings عمليات Post-Transaction ولا تغير Transaction Status. | `ANALYZED_APPROVED` | DEC-051/063/071 |
| BR-017 | يعرض ملف المقدم عدد الأعمال/المعاملات المكتملة داخل YADD، ولا تحتسب العروض أو المحادثات أو الطلبات/المعاملات غير المكتملة. | `ANALYZED_APPROVED` | DEC-052 |
| BR-018 | إغلاق طلب مفتوح قبل اختيار مقدم هو Request Closure وليس Transaction Cancellation. | `ANALYZED_APPROVED` | DEC-048 |
| BR-019 | بعد بدء المعاملة، الإلغاء Transaction Cancellation ويتطلب سببًا مسجلًا يظهر للطرف الآخر ويمكن مراجعته إداريًا. | `ANALYZED_APPROVED` | DEC-048 |
| BR-020 | الطلب المفتوح يخضع لتذكير استمرار الحاجة ويمكن أن يصبح Expired بعد عدم النشاط؛ المدد والأعداد لم تعتمد بعد. | `ANALYZED_APPROVED` في المبدأ | DEC-049 / REQ-EXP-Q01 |
| BR-021 | يمكن رصد أنماط إنشاء/إغلاق الطلبات غير الطبيعية كـFlag للمراجعة دون عقوبة تلقائية لمجرد التكرار. | `ANALYZED_APPROVED` | DEC-054 |
| BR-022 | يدعم النظام Block لإيقاف التواصل المباشر وReport لإرسال بلاغ؛ البلاغ يخضع للمراجعة ولا يساوي إدانة تلقائية. | `ANALYZED_APPROVED` | DEC-053 |
| BR-023 | يمكن للمستخدم امتلاك عدة معاملات جارية بالتوازي؛ لا يوجد حد رقمي معتمد حاليًا. | `ANALYZED_APPROVED` | DEC-056 |
| BR-024 | YADD لا ينفذ أو يحتفظ أو يتحقق من أي دفع مالي بين المستفيد والمقدم. | `ANALYZED_APPROVED` | DEC-018/041 |
| BR-025 | التوصيل ليس عملية داخل YADD؛ يمكن الاتفاق على الاستلام أو توصيل يرتبه المقدم خارجيًا وإدراج تكلفته في الفاتورة. | `ANALYZED_APPROVED` | DEC-019 |
| BR-026 | اشتراك المقدم منفصل عن معاملات المستفيدين ولا تؤخذ عمولة من قيمة المعاملة. | `APPROVED_AS_BUSINESS_MODEL` | DEC-021 |
| BR-027 | لا يمارس Provider Profile وظائف التقديم قبل التحقق الرسمي والمراجعة البشرية النهائية. | `ANALYZED_APPROVED` | DEC-034/035 |
| BR-028 | AI يساعد في Verification وTrust & Safety ولا يصدر وحده عقوبة نهائية عالية الأثر. | `ANALYZED_APPROVED` | DEC-037..040 |
| BR-029 | يدير YADD حالة وفترة اشتراك Provider Profile بينما التحصيل خارجي ويؤكده موظف مخول. | `ANALYZED_APPROVED` | DEC-042 |
| BR-030 | إرسال Provider Responses جديدة يتطلب Provider Profile متحققًا واشتراكًا Active. | `ANALYZED_APPROVED` | DEC-043 |
| BR-031 | يبدأ توزيع الطلب في حي الطلب، والتوسع إلى الأحياء المجاورة يحتاج موافقة المستفيد. | `ANALYZED_APPROVED` | DEC-031..033/045 |
| BR-032 | واجهة المستخدم ينبغي أن تعرض أفعالًا بسيطة ومباشرة، بينما تبقى حالات النظام الداخلية تفاصيل تقنية. | `APPROVED_AS_UX_PRINCIPLE` | DEC-057 |
| BR-033 | Provider Response يمكن أن تحتوي فقط دلالة `RequiresDeposit` نعم/لا؛ لا DepositAmount أو نسبة أو حالة دفع أو Refund داخل YADD. | `ANALYZED_APPROVED` | DEC-041 |
| BR-034 | سجل تعامل المستفيد الناتج عن تقييمات المقدمين يظهر لمقدمي الخدمات/المنتجات فقط في سياق تعامل مشروع، ولا ينتج عنه عقوبة أو تقييد آلي في MVP. | `ANALYZED_APPROVED` | DEC-063 |
| BR-035 | يسمح Provider Profile بعرض Portfolio/Catalog؛ نسخة العرض للصور تحمل علامة مائية تعريفية، والأصل غير عام، والعلامة ليست إثبات ملكية قانونية. | `ANALYZED_APPROVED` | DEC-064 |
| BR-036 | يقر المقدم بحقه في نشر محتوى Portfolio/Catalog، ويمكن الإبلاغ عن الانتحال للمراجعة الإدارية. | `ANALYZED_APPROVED` | DEC-064 |
| BR-037 | Core Transaction Model لا يستخدم Agreement entity مستقل؛ `Request → Provider Response → Selection → Transaction` في مسار الطلب. | `ANALYZED_APPROVED` | DEC-066 |
| BR-038 | Backend/API هو المرجع النهائي للصلاحيات وقواعد العمل؛ لا يعتمد Web/Mobile Client كمرجع Authorization نهائي. | `APPROVED_AS_ARCH_PRINCIPLE` | DEC-065 |
| BR-039 | لكل Provider استجابة فعالة واحدة فقط لكل Request؛ يجوز تعديلها أو سحبها قبل الاختيار ما دام Request مفتوحًا. | `ANALYZED_APPROVED` | DEC-070 |
| BR-040 | عند استمرار الخلاف قبل اعتماد الفاتورة، تراجع إدارة YADD الشكوى والأدلة داخل المنصة لتطبيق سياسات YADD واتخاذ إجراء إداري عند وجود مخالفة، لكنها لا تفصل في الحقوق المالية/التجارية ولا تلزم دفعًا أو استردادًا أو تعويضًا. إذا بقي الخلاف دون اتفاق تصبح Transaction `Disputed` كحالة نهائية غير ناجحة ولا تفتح Ratings. | `ANALYZED_APPROVED` | DEC-073 |

## قواعد مفتوحة تحتاج قرارًا/تحققًا

| ID | الموضوع | الحالة | السؤال المرجعي |
|---|---|---|---|
| BR-OPEN-02 | مدة Expiry وتوقيت/عدد تذكيرات الطلب | `NEEDS_VERIFICATION` | REQ-EXP-Q01 |
| BR-OPEN-03 | التصعيد لفاتورة معلقة مدة طويلة | `NEEDS_VERIFICATION` | INV-PENDING-Q01 |
| BR-OPEN-04 | Thresholds إساءة استخدام الطلبات | `NEEDS_VERIFICATION` | SAFE-REQ-Q01 |
| BR-OPEN-05 | حد المعاملات المتوازية إن لزم | `NEEDS_VERIFICATION` | TX-CONC-Q01 |
| BR-OPEN-06 | تحقق Usability/low-connectivity مع الفئة المستهدفة | `NEEDS_EVIDENCE` | UX-VAL-Q01 |
| BR-OPEN-07 | القائمة النهائية للأحياء والجوار | `PROPOSED` | LOC-DATA-Q01 |
| BR-OPEN-08 | المدة قبل اقتراح التوسع الجغرافي | `PROPOSED` | LOC-OPS-TIME-Q01 |
| BR-OPEN-09 | أنواع وثائق الهوية | `PROPOSED` | VER-DOC-Q01 |
| BR-OPEN-10 | مدة الاحتفاظ ببيانات التحقق | `NEEDS_LEGAL_VERIFICATION` | VER-RET-Q01 |
| BR-OPEN-11 | التراخيص المهنية الإضافية | `NEEDS_VERIFICATION` | VER-LIC-Q01 |
| BR-OPEN-12 | سياسة المحتوى التفصيلية | `PROPOSED` | AI-MOD-Q01 |
| BR-OPEN-13 | عتبات AI | `PROPOSED` | AI-MOD-Q02 |
| BR-OPEN-14 | مزودو AI | `PROPOSED` | AI-PROV-Q01 |
| BR-OPEN-15 | الاحتفاظ بنتائج AI/Flags | `NEEDS_VERIFICATION` | AI-RET-Q01 |
| BR-OPEN-16 | مسار الاعتراض على moderation | `PROPOSED` | AI-APPEAL-Q01 |
| BR-OPEN-17 | الباقات والأسعار والمدد | `PROPOSED` | SUB-PLAN-Q01 |
| BR-OPEN-18 | دفع الاشتراك الخارجي وإثباته | `PROPOSED` | SUB-PAY-Q01 |
| BR-OPEN-19 | أثر انتهاء الاشتراك | `PROPOSED` | SUB-OPS-Q01 |

## ملاحظات نطاق

- لا تستخدم عبارة «YADD يضمن الحقوق» دون مراجعة قانونية.
- لا يوجد Auto-Approval للفاتورة.
- لا يوجد نظام Change Order مستقل في MVP.
- لا Payment/Escrow/Refund أو DepositAmount بين المستفيد والمقدم داخل YADD.
- الإدارة تطبق سياسات YADD على الشكاوى ولا تعمل كجهة تحكيم مالي/تجاري بين الطرفين.
- `Disputed` نهاية غير ناجحة للTransaction عند عدم التوصل لاتفاق، ولا تفتح Ratings.
- التذكيرات آلية مساندة، ولا ينبغي أن يعتمد فهم التدفق عليها وحدها.