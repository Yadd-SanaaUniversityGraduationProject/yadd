# Software Requirements Specification — YADD MVP

> **الإصدار:** v0.9.3
>
> **الحالة:** `PARTIALLY ANALYZED — NOT BASELINED`
>
> هذه النسخة تزامن المتطلبات مع قرارات الإغلاق حتى 2026-09-03. البنود المفتوحة صريحة ولا تعتبر متطلبات نهائية.

## 1. Scope

مرجع النطاق: `00-project-baseline.md` و`docs/00-governance/02-decision-register.md`.

- YADD نظام Client–Server مركزي.
- الـBackend/API هو المرجع النهائي لمعالجة البيانات والصلاحيات وBusiness Rules والتعامل مع قاعدة البيانات.
- واجهة الويب هي واجهة الاستخدام الأساسية الحالية.
- Flutter اتجاه معتمد كعميل Mobile لاحق يتصل بالـAPI نفسه؛ لا يعد مرجعًا نهائيًا للصلاحيات أو قواعد العمل.
- لا يعتمد حاليًا Guest/Visitor Actor مستقل أو Web browsing anonymous policy؛ إن احتاج لاحقًا يفتح قرار منفصل.

## 2. Account / Portal Model — Approved

- حساب `User` واحد للشخص.
- اختيار «مستفيد» أو «مقدم» يحدد بوابة البداية لا نوع حساب دائمًا.
- استخدام بوابة المقدم يحتاج `Provider Profile` داخل الحساب نفسه.
- يمكن الانتقال بين البوابتين؛ وظائف التقديم لا تعمل قبل تحقق Provider.

## 3. Provider Activity Model — Approved

- Provider Profile واحد للحساب.
- يمكن تفعيل Service Activity أو Product Activity أو كليهما.
- الهوية والتحقق مشتركان على مستوى Provider Profile.

## 4. Location & Neighborhood Model — Approved

- موقع الطلب العام = المديرية + الحي.
- لا يظهر العنوان الدقيق/GPS للعامة.
- يمكن مشاركة موقع أدق في التواصل الخاص عند الحاجة.
- يحدد المقدم مناطق خدمته.
- التوسع إلى الأحياء المجاورة يحتاج موافقة المستفيد؛ بيانات الجوار والمدة التشغيلية ما تزال مفتوحة.

## 5. Provider Verification Model — Approved

- كل Provider Profile يحتاج تحققًا رسميًا قبل التقديم.
- الحد الأدنى: وثيقة هوية رسمية + صورة شخصية مع الوثيقة + بيانات الحساب اللازمة للمطابقة.
- القرار النهائي يدوي من موظف YADD مخول؛ AI مساعد فقط.
- بيانات التحقق حساسة وغير عامة.
- أنواع الوثائق ومدة الاحتفاظ والتراخيص الخاصة مفتوحة.

## 6. AI Trust & Safety Model — Approved / Partial Policy

- AI يدعم Provider Verification وTrust & Safety Moderation.
- AI Flags ليست إثباتًا قطعيًا ولا تصدر وحدها عقوبة نهائية عالية الأثر.
- يدعم النظام Block + Report، وتخضع البلاغات للمراجعة الإدارية.
- يمكن رصد أنماط إساءة استخدام الطلبات كـFlags دون عقوبة آلية لمجرد التكرار.
- السياسة التفصيلية والعتبات والمزود والاحتفاظ بالنتائج مفتوحة.

## 7. Provider Subscription Model — Approved

- نموذج الإيراد اشتراك دوري من المقدمين دون عمولة من المعاملات.
- يدير YADD حالة وفترة الاشتراك؛ التحصيل خارجي والتأكيد يدوي.
- إرسال استجابات جديدة للطلبات يحتاج Provider Verified واشتراك Active.

## 8. Actors

### Actors العامة للمخطط الرئيسي
- `Beneficiary` — `ANALYZED_APPROVED`.
- `Provider` — `ANALYZED_APPROVED` كActor عام.
  - `Service Provider` — تخصص من Provider عند الحاجة.
  - `Product Provider` — تخصص من Provider عند الحاجة.
- `YADD Administrator` — `ANALYZED_APPROVED_AS_MODELING_ACTOR` للمخطط الرئيسي.

### أدوار إدارية متخصصة للصلاحيات والتفاصيل
- `Verification Reviewer` — `ANALYZED_APPROVED` في أصل الدور.
- `Content Moderator` — `ANALYZED_APPROVED` في أصل الدور.
- `Subscription Administrator` — `ANALYZED_APPROVED` في أصل الدور.

> استخدام `YADD Administrator` في المخطط الرئيسي لا يعني أن موظفًا واحدًا يجب أن يمتلك كل الصلاحيات؛ التفصيل يبقى داخل Authorization/Administration model.

## 9. User Requirements

| ID | User Requirement | Status | Source/Reason |
|---|---|---|---|
| UR-ACC-01 | استخدام حساب واحد للاستفادة والتقديم. | `ANALYZED_APPROVED` | DEC-008 |
| UR-ACC-02 | اختيار بوابة البداية مع إمكانية الانتقال للبوابة الأخرى. | `ANALYZED_APPROVED` | DEC-009/011 |
| UR-PROV-01 | تفعيل نشاط خدمة أو منتج أو كليهما من Provider Profile نفسه. | `ANALYZED_APPROVED` | DEC-029/030 |
| UR-VER-01 | تقديم متطلبات تحقق وانتظار اعتماد YADD قبل العمل كمقدم. | `ANALYZED_APPROVED` | DEC-034/035 |
| UR-DIS-01 | البحث المباشر عن مقدم حسب التصنيف والمنطقة. | `ANALYZED_APPROVED` | DEC-012/031..033 |
| UR-PORT-01 | استعراض معرض أعمال/كتالوج المقدم داخل Provider Profile. | `ANALYZED_APPROVED` | DEC-064 |
| UR-REQ-01 | إنشاء طلب خدمة/منتج ونشره للمقدمين المناسبين. | `ANALYZED_APPROVED` | DEC-012 |
| UR-REQ-02 | إضافة وصف وصور اختيارية وسعر استرشادي اختياري. | `ANALYZED_APPROVED` | DEC-013 |
| UR-COM-01 | الاستفسار من مقدم قبل بدء المعاملة دون أن تعتبر المحادثة وحدها Transaction. | `ANALYZED_APPROVED` | DEC-046 |
| UR-OFF-01 | استجابة المقدم للطلب واقتراح سعر عند الحاجة وتحديد ما إذا كان يتطلب عربونًا. | `ANALYZED_APPROVED` | DEC-013/041 |
| UR-OFF-02 | مقارنة الاستجابات واختيار مقدم واحد. | `ANALYZED_APPROVED` | DEC-014/047 |
| UR-REQ-03 | إغلاق الطلب إذا لم يعد مطلوبًا دون اعتباره إلغاء معاملة. | `ANALYZED_APPROVED` | DEC-048 |
| UR-TX-01 | بدء المعاملة عند اختيار مقدم في مسار الطلب أو اتفاق الطرفين في البحث المباشر. | `ANALYZED_APPROVED` | DEC-046/047/066 |
| UR-TX-02 | امتلاك عدة معاملات جارية بالتوازي. | `ANALYZED_APPROVED` | DEC-056 |
| UR-INV-01 | فاتورة نهائية موثقة لإغلاق المعاملة. | `ANALYZED_APPROVED` | DEC-015/025/050 |
| UR-REV-01 | تقييم مقدم الخدمة/المنتج بعد اكتمال المعاملة بواسطة المستفيد. | `ANALYZED_APPROVED` | DEC-051 |
| UR-REV-02 | إمكانية تقييم المقدم للمستفيد اختياريًا بعد اكتمال المعاملة وفق مؤشرات سلوكية محددة. | `ANALYZED_APPROVED` | DEC-063 |
| UR-REP-01 | عرض سجل تعامل المستفيد للمقدمين فقط في سياق تعامل مشروع معه دون عقوبات آلية. | `ANALYZED_APPROVED` | DEC-063 |
| UR-SAFE-01 | حظر مستخدم مسيء والإبلاغ عنه ومراجعة البلاغ إداريًا. | `ANALYZED_APPROVED` | DEC-053 |
| UR-PAY-01 | لا ينفذ YADD أي دفع بين المستفيد والمقدم؛ يوضح فقط إذا كانت استجابة المقدم تتطلب عربونًا دون قيمة أو حالة دفع. | `ANALYZED_APPROVED` | DEC-018/041 |
| UR-SUB-01 | معرفة حالة اشتراك المقدم وفترة صلاحيته. | `ANALYZED_APPROVED` | DEC-042/043 |

## 10. Functional Requirements

### Account / Portal
- `FR-001` `ANALYZED_APPROVED`: يدير النظام حساب User واحدًا للشخص.
- `FR-001A` `ANALYZED_APPROVED`: يسمح باختيار بوابة البداية: مستفيد أو مقدم.
- `FR-001B` `ANALYZED_APPROVED`: يسمح بالانتقال بين البوابتين بالحساب نفسه عند استيفاء الشروط.
- `FR-002` `ANALYZED_APPROVED`: يسمح بإنشاء وإدارة Provider Profile.
- `FR-002A` `ANALYZED_APPROVED`: لا تتاح وظائف التقديم قبل Provider Verified.
- `FR-002B` `ANALYZED_APPROVED`: يسمح بتفعيل Service Activity أو Product Activity أو كليهما.

### Provider Portfolio / Catalog
- `FR-PORT-01` `ANALYZED_APPROVED`: يسمح للمقدم بإضافة عناصر صور لأعماله أو منتجاته داخل Provider Profile مع وصف اختياري.
- `FR-PORT-02` `ANALYZED_APPROVED`: ينشئ النظام نسخة عرض من الصورة بعلامة مائية تعريفية مرتبطة بـYADD وحساب المقدم، مع عدم جعل الأصل عامًا.
- `FR-PORT-03` `ANALYZED_APPROVED`: يتطلب رفع المحتوى إقرار المقدم بحقه في نشره.
- `FR-PORT-04` `ANALYZED_APPROVED`: يسمح بالإبلاغ عن صورة/عنصر يشتبه في انتحاله أو عدم أحقية نشره للمراجعة الإدارية.
- `FR-PORT-05` `ANALYZED_APPROVED`: لا تقدم العلامة المائية إثباتًا قانونيًا لملكية العمل؛ هي وسيلة تعريف وردع لإعادة الاستخدام المباشر.

### Provider Verification
- `FR-VER-01` `ANALYZED_APPROVED`: يسمح بإرسال طلب Provider Verification.
- `FR-VER-02` `ANALYZED_APPROVED`: يتطلب وثيقة هوية وصورة شخصية مع الوثيقة كحد أدنى.
- `FR-VER-03` `ANALYZED_APPROVED`: يدعم حالات Draft/Submitted/UnderReview/Verified/ResubmissionRequired/Rejected مفاهيميًا.
- `FR-VER-04` `ANALYZED_APPROVED`: القرار النهائي لموظف مخول.
- `FR-VER-05` `ANALYZED_APPROVED`: AI لا يقرر Verified/Rejected وحده.
- `FR-VER-06` `PROPOSED/BLOCKED BY VER-DOC-Q01`: أنواع الوثائق وتفاصيلها لاحقًا.

### Discovery / Location
- `FR-003` `ANALYZED_APPROVED`: يسمح بالبحث المباشر حسب التصنيف والمديرية/الحي.
- `FR-003A` `ANALYZED_APPROVED`: يبدأ توزيع الطلب في حي الطلب.
- `FR-003B` `ANALYZED_APPROVED`: التوسع إلى الأحياء المجاورة يحتاج موافقة المستفيد.
- `FR-003C` `ANALYZED_APPROVED`: يسمح للمقدم بتحديد مناطق خدمته.
- `FR-003D` `PROPOSED/BLOCKED BY LOC-DATA-Q01`: قائمة الأحياء والجوار تحتاج تحققًا.

### Request Creation / Closure / Expiry
- `FR-005` `ANALYZED_APPROVED`: يسمح بإنشاء طلب خدمة أو منتج مع الفئة والوصف والمديرية والحي.
- `FR-005A` `ANALYZED_APPROVED`: الصور والمعلومات الإضافية اختيارية.
- `FR-005B` `ANALYZED_APPROVED`: السعر الاسترشادي اختياري وغير ملزم.
- `FR-005C` `ANALYZED_APPROVED`: يسمح للمستفيد بإغلاق Request Open قبل اختيار مقدم دون إنشاء Transaction Cancellation.
- `FR-005D` `ANALYZED_APPROVED` في المبدأ: يذكّر النظام صاحب الطلب المفتوح لتأكيد استمرار الحاجة ويمكن أن يحوله إلى Expired بعد عدم النشاط.
- `FR-005E` `PROPOSED/BLOCKED BY REQ-EXP-Q01`: مدة عدم النشاط وعدد/توقيت التذكيرات لم تعتمد.
- `FR-006` `ANALYZED_APPROVED`: يعرض الطلب للمقدمين المؤهلين حسب النشاط والمنطقة.

### Provider Response / Selection / Communication
- `FR-007` `ANALYZED_APPROVED`: يسمح للمقدم المؤهل ذي الاشتراك Active بإرسال `Provider Response` لطلب Open.
- `FR-007A` `ANALYZED_APPROVED`: يسمح بقبول السعر الاسترشادي أو اقتراح سعر آخر.
- `FR-007B` `ANALYZED_APPROVED`: تسمح Provider Response بتحديد `RequiresDeposit = Yes/No` فقط؛ لا يسجل النظام قيمة العربون أو نسبته أو طريقة دفعه أو حالته.
- `FR-008` `ANALYZED_APPROVED`: يسمح بمحادثة/استفسار خاص قبل بدء المعاملة من البحث المباشر أو Provider Response.
- `FR-008A` `ANALYZED_APPROVED`: المحادثة وحدها لا تنشئ Transaction.
- `FR-008B` `ANALYZED_APPROVED`: يحتفظ النظام بسجل المحادثة وفق سياسة الخصوصية والاحتفاظ.
- `FR-008C` `ANALYZED_APPROVED`: يسمح بمشاركة موقع أدق في التواصل الخاص عند الحاجة دون عرضه للعامة.
- `FR-009` `ANALYZED_APPROVED`: عند اختيار المستفيد مقدمًا من Provider Responses يغلق النظام الطلب أمام استجابات جديدة، يجعل البقية NotSelected، ويبدأ Transaction مع المختار.
- `FR-009A` `ANALYZED_APPROVED`: في البحث المباشر لا تبدأ Transaction حتى يتفق الطرفان على بدء التعامل.
- `FR-009B` `ANALYZED_APPROVED`: لا يستخدم MVP كيان/نموذج `Agreement` مستقل؛ مصدر بدء Transaction هو Selection في مسار الطلب أو اتفاق الطرفين على بدء التعامل في البحث المباشر.

### Transaction / Cancellation
- `FR-TX-01` `ANALYZED_APPROVED`: يدعم النظام عدة معاملات Active للمستخدم بالتوازي.
- `FR-TX-02` `ANALYZED_APPROVED`: بعد بدء المعاملة يسمح بالإلغاء مع سبب إلزامي مسجل يظهر للطرف الآخر.
- `FR-TX-03` `ANALYZED_APPROVED`: يسجل النظام الطرف الملغي والتوقيت وسبب الإلغاء للمراجعة عند الحاجة.
- `FR-TX-04` `PROPOSED/BLOCKED BY TX-CONC-Q01`: لا يوجد حد أقصى رقمي معتمد للمعاملات المتوازية.

### External Payment / Fulfillment Boundaries
- `FR-EXT-01` `ANALYZED_APPROVED`: لا ينفذ النظام Payment Transaction بين المستفيد والمقدم.
- `FR-EXT-02` `ANALYZED_APPROVED`: يمكن عرض وسائل الدفع المقبولة كمعلومة عند الحاجة دون تنفيذ الدفع داخل YADD.
- `FR-EXT-03` `ANALYZED_APPROVED`: في المنتجات يسمح بالاستلام أو توصيل يرتبه المقدم خارج YADD.
- `FR-EXT-04` `ANALYZED_APPROVED`: يمكن إدراج تكلفة التوصيل في الفاتورة.
- `FR-EXT-05` `ANALYZED_APPROVED`: `RequiresDeposit` معلومة في Provider Response فقط؛ لا Deposit/Escrow/Refund lifecycle ولا DepositAmount داخل YADD.

### Invoice / Transaction Closure
- `FR-010` `ANALYZED_APPROVED`: يسمح للمقدم بإنشاء الفاتورة النهائية بعد التنفيذ/التجهيز واستقرار الاتفاق.
- `FR-010A` `ANALYZED_APPROVED`: تحتوي الفاتورة هوية الطرفين والبنود والأسعار والإجمالي، مع صور اختيارية.
- `FR-011` `ANALYZED_APPROVED`: يرسل النظام الفاتورة للمستفيد ويتيح Approve أو Request Revision مع ملاحظة.
- `FR-011A` `ANALYZED_APPROVED`: يحتفظ بتاريخ نسخ الفاتورة والتعديلات.
- `FR-011B` `ANALYZED_APPROVED`: الاعتماد نهائي داخل YADD بعد تحذير واضح.
- `FR-011C` `ANALYZED_APPROVED`: يمكن رفع شكوى عند استمرار الخلاف.
- `FR-011D` `ANALYZED_APPROVED`: الفاتورة غير المستجاب لها تبقى Pending Customer Approval؛ عدم الرد ليس موافقة وتصل تذكيرات للمستفيد.
- `FR-011E` `PROPOSED/BLOCKED BY INV-PENDING-Q01`: سياسة التصعيد بعد عدم الاستجابة الطويلة لم تعتمد.
- `FR-012` `ANALYZED_APPROVED`: عند اعتماد الفاتورة تحفظ في سجل الطرفين وتصبح Transaction Completed.

### Reviews / Reputation
- `FR-013` `ANALYZED_APPROVED`: لا يسمح بتقييم المستفيد للمقدم إلا إذا كان مرتبطًا بمعاملة Completed مع ذلك المقدم.
- `FR-014` `ANALYZED_APPROVED`: بعد اعتماد الفاتورة يصبح تقييم المقدم خطوة إلزامية على المستفيد.
- `FR-014A` `ANALYZED_APPROVED`: تقييم المستفيد للمقدم = 1–5 نجوم إلزامية والتعليق النصي اختياري.
- `FR-014B` `ANALYZED_APPROVED`: بعد Transaction Completed يعرض النظام للمقدم Prompt بارزًا لتقييم المستفيد، والتقييم اختياري ويمكن تخطيه.
- `FR-014C` `ANALYZED_APPROVED`: تقييم المقدم للمستفيد يتكون من ثلاثة مؤشرات 1–5: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون؛ التعليق النصي اختياري.
- `FR-014D` `ANALYZED_APPROVED`: يعرض ملف المقدم عدد المعاملات المكتملة داخل YADD كمؤشر «عدد الأعمال».
- `FR-014E` `ANALYZED_APPROVED`: تجمع تقييمات المستفيد في سجل تعامل/سمعة محدود يظهر لمقدمي الخدمات والمنتجات فقط في سياق تعامل مشروع مع المستفيد.
- `FR-014F` `ANALYZED_APPROVED`: لا ينتج عن انخفاض تقييم المستفيد في MVP منع أو تعليق أو تخفيض ظهور أو أي عقوبة آلية.

### Trust & Safety / Abuse
- `FR-SAFE-01` `ANALYZED_APPROVED`: يسمح للمستخدم بحظر مستخدم آخر لإيقاف التواصل المباشر.
- `FR-SAFE-02` `ANALYZED_APPROVED`: يسمح بالإبلاغ عن مستخدم/محادثة أو سلوك أو Portfolio/Catalog Item لإدارة YADD.
- `FR-SAFE-03` `ANALYZED_APPROVED`: البلاغ لا يؤدي وحده إلى عقوبة نهائية؛ يخضع للمراجعة.
- `FR-SAFE-04` `ANALYZED_APPROVED`: يمكن للنظام رفع Flag لأنماط إنشاء/إغلاق الطلبات غير الطبيعية للمراجعة دون عقوبة آلية لمجرد التكرار.
- `FR-SAFE-05` `PROPOSED/BLOCKED BY SAFE-REQ-Q01`: Thresholds الرصد لم تعتمد.

### AI Trust & Safety
- `FR-AI-01` `ANALYZED_APPROVED`: AI يساعد في Provider Verification دون قرار نهائي منفرد.
- `FR-AI-02` `ANALYZED_APPROVED`: يفحص النصوص/الصور/الأنشطة وفق السياسة ويولد Risk Flags.
- `FR-AI-03` `ANALYZED_APPROVED`: الحالات الحساسة والعقوبات النهائية عالية الأثر تحتاج مراجعة بشرية.
- `FR-AI-04` `PROPOSED/BLOCKED BY AI-MOD-Q01/02`: السياسة والعتبات التفصيلية لم تعتمد.

### Provider Subscription
- `FR-SUB-01` `APPROVED_AS_BUSINESS_MODEL`: اشتراك دوري دون عمولة معاملات.
- `FR-SUB-02` `ANALYZED_APPROVED`: يدير النظام Status/StartDate/EndDate للاشتراك.
- `FR-SUB-03` `ANALYZED_APPROVED`: التحصيل خارجي ولا Payment Gateway للاشتراك في MVP.
- `FR-SUB-04` `ANALYZED_APPROVED`: موظف مخول يؤكد التفعيل/التجديد يدويًا.
- `FR-SUB-05` `ANALYZED_APPROVED`: الاشتراك Expired يمنع استجابات جديدة حتى التجديد.

### Administration
- `FR-015` `PARTIALLY_ANALYZED`: يدير موظفو YADD الوظائف الإدارية وفق الصلاحيات.
- `FR-015A` `ANALYZED_APPROVED`: يسمح للمخول بمراجعة Verification وTrust & Safety Flags والبلاغات واتخاذ إجراء وفق السياسة.
- `FR-015B` `ANALYZED_APPROVED`: يحتفظ النظام بسجل مناسب للأحداث الإدارية الحساسة.

## 11. Non-Functional Requirements — Draft / Partial

- `NFR-SEC-01` `ANALYZED_APPROVED` في المبدأ: حماية الحساب والمحادثات والمرفقات وبيانات التحقق.
- `NFR-SEC-02` `ANALYZED_APPROVED`: وصول بيانات التحقق الحساسة مقيد ومسجل.
- `NFR-SEC-03` `ANALYZED_APPROVED_AS_ARCH_PRINCIPLE`: لا يعتمد Client/Browser/Mobile كمرجع نهائي للصلاحيات أو Business Rules؛ يطبق Backend/API التحقق النهائي من Authorization والمدخلات الحساسة.
- `NFR-PRV-01` `ANALYZED_APPROVED`: تقليل جمع/إظهار البيانات الشخصية وعدم جعل الموقع الدقيق عامًا.
- `NFR-AI-01` `ANALYZED_APPROVED`: AI Flags ليست إثباتًا قطعيًا.
- `NFR-USA-01` `ANALYZED_APPROVED` في المبدأ: يجب أن تعرض الواجهة خطوات ومصطلحات بسيطة للفئة المستهدفة، مع التحقق الميداني قبل الادعاء بالملاءمة.
- `NFR-USA-02` `NEEDS_EVIDENCE/BLOCKED BY UX-VAL-Q01`: معايير نجاح Usability/low-connectivity تحدد وتختبر على الفئة المستهدفة.
- `NFR-REL-01` `ANALYZED_APPROVED`: لا يعتبر عدم الرد على الفاتورة موافقة ولا تغلق Transaction تلقائيًا.
- `NFR-PER-01` `NEEDS_VERIFICATION`: أهداف الأداء بعد Prototype/Architecture.
- `NFR-AVL-01` `NEEDS_VERIFICATION`: متطلبات التوفر/التعامل مع الاتصال المتقطع تحتاج تحديدًا واقعيًا.
- `NFR-LEG-01` `NEEDS_LEGAL_VERIFICATION`: الاحتفاظ بوثائق الهوية/البيانات الحساسة يحتاج تحققًا قانونيًا.

## 12. Out of Scope — MVP / Current Boundary

- `OOS-01`: عمولة من معاملات المستخدمين.
- `OOS-02`: شبكة توصيل/سائقون/تتبع شحنات.
- `OOS-03`: التوسع خارج أمانة العاصمة.
- `OOS-04`: النقل وصيانة السيارات والورش الثقيلة.
- `OOS-05`: حسابات الشركات والمتاجر الكبرى.
- `OOS-06`: مكالمات صوتية/فيديو أو شبكة اجتماعية عامة.
- `OOS-07`: GPS Radius كأساس للأهلية الجغرافية.
- `OOS-08`: AI يصدر حظرًا نهائيًا عالي الأثر أو Verification نهائيًا دون إشراف بشري.
- `OOS-09`: Payment Gateway لتحصيل اشتراك المقدم في MVP.
- `OOS-10`: Change Order System مستقل.
- `OOS-11`: Payment/Wallet/Escrow/Refund أو تسجيل مبلغ العربون بين المستفيد والمقدم.
- `OOS-12`: Agreement entity مستقل في Core Transaction Model.

## 13. Open Decisions Before v1.0

`REQ-EXP-Q01`, `INV-PENDING-Q01`, `SAFE-REQ-Q01`, `TX-CONC-Q01`, `UX-VAL-Q01`, `LOC-DATA-Q01`, `LOC-OPS-TIME-Q01`, `VER-DOC-Q01`, `VER-RET-Q01`, `VER-LIC-Q01`, `AI-MOD-Q01`, `AI-MOD-Q02`, `AI-PROV-Q01`, `AI-RET-Q01`, `AI-APPEAL-Q01`, `SUB-PLAN-Q01`, `SUB-PAY-Q01`, `SUB-OPS-Q01`.

> **Baseline note:** إغلاق P0 الحالي يجعل Core Flow قابلًا للنمذجة، لكنه لا يحول هذه النسخة إلى Baselined SRS تلقائيًا؛ ما تزال مراجعة الاتساق والتتبع والاعتماد النهائي مطلوبة.