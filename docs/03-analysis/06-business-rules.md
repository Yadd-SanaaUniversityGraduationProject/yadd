# Business Rules — YADD Core Flow

> **الحالة:** `PARTIALLY ANALYZED — SYNCHRONIZED 2026-09-18 THROUGH DEC-090`
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
| BR-041 | كل Provider Profile في MVP يعمل تحت نوع واحد فقط: `SERVICE` أو `PRODUCT`، ولا يجوز تفعيل النوعين معًا على الملف نفسه. | `ANALYZED_APPROVED` | DEC-074 |
| BR-042 | بين نفس Beneficiary ونفس Provider تبقى محادثة واحدة مستمرة، ويمكن أن ترتبط بعدة Transactions عبر الزمن؛ يجب إظهار فواصل/أحداث نظام واضحة لبدء وانتهاء كل Transaction داخل المحادثة. | `ANALYZED_APPROVED` | DEC-075 |
| BR-043 | يمكن للمقدم اختيار تصنيف واحد أو أكثر داخل نوع Provider Profile نفسه. يسمح Draft Provider Profile مؤقتًا بصفر تصنيفات، لكن أهلية وظائف التقديم تتطلب تصنيفًا واحدًا على الأقل، ولا يجوز ربط تصنيف من النوع الآخر. | `ANALYZED_APPROVED` | DEC-076 |
| BR-044 | يسمح YADD للـGuest غير المسجل بتصفح المحتوى العام والبحث عن Providers وفتح Public Provider Profile واستعراض Portfolio/Catalog والمعلومات العامة المسموح بها. | `ANALYZED_APPROVED` | DEC-077 |
| BR-045 | لا يستطيع Guest تنفيذ وظيفة تفاعلية أو معاملاتیة تتطلب هوية User، بما في ذلك Create Request وChat/Inquiry وTransaction وRating وBlock وReport، قبل Authentication. | `ANALYZED_APPROVED` | DEC-077 |
| BR-046 | قد تظهر أزرار الوظائف المحمية للـGuest، لكن استخدامها يوجّه إلى `Log In` أو `Create Account`؛ ويجب على Backend/API فرض Authentication/Authorization، فلا يعد إخفاء الزر أو إعادة التوجيه في الواجهة حماية كافية. | `ANALYZED_APPROVED` | DEC-065/077 |
| BR-047 | لا يعرض Public Provider Profile رقم الهاتف أو وسيلة اتصال مباشرة خاصة؛ التواصل الأساسي يتم داخل YADD بعد Authentication، وتبقى البيانات الحساسة والخاصة غير عامة. | `ANALYZED_APPROVED` | DEC-036/046/077 |

| BR-048 | Create Account يتطلب الاسم الرباعي بأربعة حقول + رقم هاتف + كلمة مرور + قبول الشروط/الخصوصية؛ البريد اختياري، والحساب لا يكتمل قبل OTP ناجح على الهاتف. | `ANALYZED_APPROVED` | DEC-078 |
| BR-049 | Log In يقبل الهاتف الموثق أو البريد الموثق مع كلمة المرور؛ Forgot Password يستخدم OTP للهاتف والبريد الموثق خيارًا إضافيًا. | `ANALYZED_APPROVED` | DEC-078 |
| BR-050 | تغيير الهاتف يحتاج OTP جديدًا؛ البريد الجديد لا يستخدم للدخول/الاستعادة قبل Verification؛ Deactivate/Reactivate مدعوم ولا يوجد Hard Delete ذاتي مباشر. | `ANALYZED_APPROVED` | DEC-079 |
| BR-051 | Product Provider قد يستخدم Trade Name اختياريًا كاسم عرض عام؛ الاسم الحقيقي يبقى في User Account/التحقق ولا يستبدل قانونيًا. | `ANALYZED_APPROVED` | DEC-080 |
| BR-052 | Request Open: Reminder بعد 24h و48h وExpiry بعد 72h من عدم نشاط Beneficiary؛ نشاط Beneficiary الدال على استمرار الحاجة يعيد العداد، وProvider Response وحدها لا تعيده. | `ANALYZED_APPROVED` | DEC-081 |
| BR-053 | Request Expired لا يعاد فتحه؛ Republish ينشئ Request جديدًا بعد مراجعة البيانات، وتظل الاستجابات القديمة غير فعالة. | `ANALYZED_APPROVED` | DEC-081 |
| BR-054 | Provider Response لا تملك expiry مستقلًا؛ تنتهي فعاليتها مع Withdraw/Selection/Request Close/Expiry. | `ANALYZED_APPROVED` | DEC-082 |
| BR-055 | Request Transaction Start في Direct Search صالح 12h، ورفضه/انتهاءه لا يغلق Conversation؛ Pending واحد فقط بين الطرفين. | `ANALYZED_APPROVED` | DEC-082 |
| BR-056 | Transaction Cancellation مسموح حتى ما قبل Invoice Approval/Completed، مع سبب إلزامي مسجل. | `ANALYZED_APPROVED` | DEC-083 |
| BR-057 | Final Invoice: Reminder 24h ثم 48h ثم Overdue عند 72h دون Auto-Approval. | `ANALYZED_APPROVED` | DEC-083 |
| BR-058 | Invoice Revisions بلا حد عددي صلب؛ كل طلب يحتاج ملاحظة ويحفظ تاريخ النسخ؛ بعد ثاني Revision متتالٍ يظهر تنبيه Complaint دون إجبار. | `ANALYZED_APPROVED` | DEC-083 |
| BR-059 | Complaint يتطلب سببًا ووصفًا، والمرفقات اختيارية؛ الحل يعيد المسار للمراجعة/التعديل، وعدم الحل ينتهي Disputed ولا يفتح Ratings. | `ANALYZED_APPROVED` | DEC-084 |
| BR-060 | Identity Verification الحكومية إلزامية لـService Provider فقط: National ID أو Passport + صورة الوثيقة + صورة شخصية مع الوثيقة + مراجعة بشرية؛ Product Provider لا يحتاج Government ID في MVP. | `ANALYZED_APPROVED` | DEC-085 |
| BR-061 | يجب التمييز بين Account Verified وIdentity Verified؛ Product Provider لا يعرض Identity Verified badge دون إجراء الهوية. | `ANALYZED_APPROVED` | DEC-085 |
| BR-062 | الاشتراك إلزامي لكلا نوعي Provider ومدته 30 يومًا؛ Reminder قبل 3 أيام وقبل 24h، وExpired يمنع تعاملات جديدة ولا يوقف الجارية. | `ANALYZED_APPROVED` | DEC-086 |
| BR-063 | Beneficiary→Provider rating إلزامي بعد Completed لكن يمكن Later؛ Reminder بعد 24h، ويجب استكمال التقييم السابق قبل Transaction جديدة. | `ANALYZED_APPROVED` | DEC-087 |
| BR-064 | تقييم المقدم Hybrid: Overall 1–5 + Structured Textual Criteria حسب نوع Provider + تعليق اختياري؛ يظهر اسم المقيّم الأول فقط مع دلالة Verified/Completed Transaction Review. | `ANALYZED_APPROVED` | DEC-087 |
| BR-065 | Block لا يكسر Active Transaction؛ يمنع التفاعل الجديد فقط، وتستمر إجراءات/إشعارات المعاملة، وUnblock لا يعيد كيانات منتهية ولا يلغي Report. | `ANALYZED_APPROVED` | DEC-088 |
| BR-066 | نتائج المراجعة الإدارية المسموحة: No Violation/Warning/Content Removal/Temporary Restriction/Account Suspension/Permanent Ban، والقرار عالي الأثر بشري ومسجل. | `ANALYZED_APPROVED` | DEC-089 |
| BR-067 | In-App هو الافتراضي؛ SMS للـOTP والأمان/الحساب الحرِج؛ البريد الموثق اختياري؛ Push خارج Web MVP الحالي. | `ANALYZED_APPROVED` | DEC-090 |

## قواعد مفتوحة تحتاج قرارًا/تحققًا

| ID | الموضوع | الحالة | السؤال المرجعي |
|---|---|---|---|
| BR-OPEN-04 | Thresholds إساءة استخدام الطلبات | `NEEDS_VERIFICATION` | SAFE-REQ-Q01 |
| BR-OPEN-05 | حد المعاملات المتوازية إن لزم | `NEEDS_VERIFICATION` | TX-CONC-Q01 |
| BR-OPEN-06 | تحقق Usability/low-connectivity مع الفئة المستهدفة | `NEEDS_EVIDENCE` | UX-VAL-Q01 |
| BR-OPEN-07 | القائمة النهائية للأحياء والجوار | `PROPOSED` | LOC-DATA-Q01 |
| BR-OPEN-08 | المدة قبل اقتراح التوسع الجغرافي | `PROPOSED` | LOC-OPS-TIME-Q01 |
| BR-OPEN-10 | مدة الاحتفاظ ببيانات التحقق | `NEEDS_LEGAL_VERIFICATION` | VER-RET-Q01 |
| BR-OPEN-11 | التراخيص المهنية الإضافية | `NEEDS_VERIFICATION` | VER-LIC-Q01 |
| BR-OPEN-12 | سياسة المحتوى التفصيلية | `PROPOSED` | AI-MOD-Q01 |
| BR-OPEN-13 | عتبات AI | `PROPOSED` | AI-MOD-Q02 |
| BR-OPEN-14 | مزودو AI | `PROPOSED` | AI-PROV-Q01 |
| BR-OPEN-15 | الاحتفاظ بنتائج AI/Flags | `NEEDS_VERIFICATION` | AI-RET-Q01 |
| BR-OPEN-16 | مسار الاعتراض على moderation | `PROPOSED` | AI-APPEAL-Q01 |
| BR-OPEN-17 | سعر الاشتراك الشهري النهائي | `PROPOSED` | SUB-PLAN-Q01 |
| BR-OPEN-18 | دفع الاشتراك الخارجي وإثباته | `PROPOSED` | SUB-PAY-Q01 |
| BR-OPEN-19 | أثر انتهاء الاشتراك على الظهور العام في البحث فقط | `PROPOSED` | SUB-OPS-Q01 |

## ملاحظات نطاق

- لا تستخدم عبارة «YADD يضمن الحقوق» دون مراجعة قانونية.
- لا يوجد Auto-Approval للفاتورة.
- لا يوجد نظام Change Order مستقل في MVP.
- لا Payment/Escrow/Refund أو DepositAmount بين المستفيد والمقدم داخل YADD.
- الإدارة تطبق سياسات YADD على الشكاوى ولا تعمل كجهة تحكيم مالي/تجاري بين الطرفين.
- `Disputed` نهاية غير ناجحة للTransaction عند عدم التوصل لاتفاق، ولا تفتح Ratings.
- التذكيرات آلية مساندة، ولا ينبغي أن يعتمد فهم التدفق عليها وحدها.
- في MVP نوع المقدم حصري وفق DEC-074، لكن يمكنه امتلاك عدة تصنيفات داخل ذلك النوع وفق DEC-076.
- Guest هو Actor خارجي غير authenticated ولا يخلق `GUEST` entity/Class؛ أي بيانات User شخصية أو تفاعلية لا تنشأ إلا بعد Authentication/Account creation وفق DEC-077.