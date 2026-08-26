# Software Requirements Specification — YADD MVP

> **الإصدار:** v0.9.1
>
> **الحالة:** `PARTIALLY ANALYZED — NOT BASELINED`
>
> هذه النسخة تزامن المتطلبات مع قرارات الفريق حتى 2026-08-26. البنود المفتوحة صريحة ولا تعتبر متطلبات نهائية.

## 1. Scope

مرجع النطاق: `00-project-baseline.md` و`docs/00-governance/02-decision-register.md`.

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
- إرسال عروض جديدة يحتاج Provider Verified واشتراك Active.

## 8. Actors

- `Beneficiary` — `ANALYZED_APPROVED`.
- `Service Provider` — `ANALYZED_APPROVED`.
- `Product Provider` — `ANALYZED_APPROVED`.
- `Verification Reviewer` — `ANALYZED_APPROVED` في أصل الدور.
- `Content Moderator` — `ANALYZED_APPROVED` في أصل الدور.
- `Subscription Administrator` — `ANALYZED_APPROVED` في أصل الدور.
- `Platform Administrator` — `PARTIALLY_ANALYZED`.

## 9. User Requirements

| ID | User Requirement | Status | Source/Reason |
|---|---|---|---|
| UR-ACC-01 | استخدام حساب واحد للاستفادة والتقديم. | `ANALYZED_APPROVED` | DEC-008 |
| UR-ACC-02 | اختيار بوابة البداية مع إمكانية الانتقال للبوابة الأخرى. | `ANALYZED_APPROVED` | DEC-009/011 |
| UR-PROV-01 | تفعيل نشاط خدمة أو منتج أو كليهما من Provider Profile نفسه. | `ANALYZED_APPROVED` | DEC-029/030 |
| UR-VER-01 | تقديم متطلبات تحقق وانتظار اعتماد YADD قبل العمل كمقدم. | `ANALYZED_APPROVED` | DEC-034/035 |
| UR-DIS-01 | البحث المباشر عن مقدم حسب التصنيف والمنطقة. | `ANALYZED_APPROVED` | DEC-012/031..033 |
| UR-REQ-01 | إنشاء طلب خدمة/منتج ونشره للمقدمين المناسبين. | `ANALYZED_APPROVED` | DEC-012 |
| UR-REQ-02 | إضافة وصف وصور اختيارية وسعر استرشادي اختياري. | `ANALYZED_APPROVED` | DEC-013 |
| UR-COM-01 | الاستفسار من مقدم قبل بدء المعاملة دون أن تعتبر المحادثة وحدها Transaction. | `ANALYZED_APPROVED` | DEC-046 |
| UR-OFF-01 | استجابة المقدم للطلب واقتراح سعر عند الحاجة. | `ANALYZED_APPROVED` | DEC-013 |
| UR-OFF-02 | مقارنة الاستجابات واختيار مقدم واحد. | `ANALYZED_APPROVED` | DEC-014/047 |
| UR-REQ-03 | إغلاق الطلب إذا لم يعد مطلوبًا دون اعتباره إلغاء معاملة. | `ANALYZED_APPROVED` | DEC-048 |
| UR-TX-01 | بدء المعاملة عند اختيار مقدم في مسار الطلب أو اتفاق الطرفين في البحث المباشر. | `ANALYZED_APPROVED` | DEC-046/047 |
| UR-TX-02 | امتلاك عدة معاملات جارية بالتوازي. | `ANALYZED_APPROVED` | DEC-056 |
| UR-INV-01 | فاتورة نهائية موثقة لإغلاق المعاملة. | `ANALYZED_APPROVED` | DEC-015/025/050 |
| UR-REV-01 | تقييم مقدم الخدمة/المنتج بعد اكتمال المعاملة. | `ANALYZED_APPROVED` | DEC-051 |
| UR-SAFE-01 | حظر مستخدم مسيء والإبلاغ عنه ومراجعة البلاغ إداريًا. | `ANALYZED_APPROVED` | DEC-053 |
| UR-PAY-01 | معرفة وسائل الدفع المقبولة دون تنفيذ YADD للدفع وفق baseline الحالي. | `ANALYZED_APPROVED_PENDING_DEP_Q02` | DEC-018/041 |
| UR-SUB-01 | معرفة حالة اشتراك المقدم وفترة صلاحيته. | `ANALYZED_APPROVED` | DEC-042/043 |

## 10. Functional Requirements

### Account / Portal
- `FR-001` `ANALYZED_APPROVED`: يدير النظام حساب User واحدًا للشخص.
- `FR-001A` `ANALYZED_APPROVED`: يسمح باختيار بوابة البداية: مستفيد أو مقدم.
- `FR-001B` `ANALYZED_APPROVED`: يسمح بالانتقال بين البوابتين بالحساب نفسه عند استيفاء الشروط.
- `FR-002` `ANALYZED_APPROVED`: يسمح بإنشاء وإدارة Provider Profile.
- `FR-002A` `ANALYZED_APPROVED`: لا تتاح وظائف التقديم قبل Provider Verified.
- `FR-002B` `ANALYZED_APPROVED`: يسمح بتفعيل Service Activity أو Product Activity أو كليهما.

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
- `FR-005C` `ANALYZED_APPROVED`: يسمح للمستفيد بإغلاق طلب Open قبل اختيار مقدم دون إنشاء Transaction Cancellation.
- `FR-005D` `ANALYZED_APPROVED` في المبدأ: يذكّر النظام صاحب الطلب المفتوح لتأكيد استمرار الحاجة ويمكن أن يحوله إلى Expired بعد عدم النشاط.
- `FR-005E` `PROPOSED/BLOCKED BY REQ-EXP-Q01`: مدة عدم النشاط وعدد/توقيت التذكيرات لم تعتمد.
- `FR-006` `ANALYZED_APPROVED`: يعرض الطلب للمقدمين المؤهلين حسب النشاط والمنطقة.

### Provider Response / Selection / Communication
- `FR-007` `ANALYZED_APPROVED`: يسمح للمقدم المؤهل ذي الاشتراك Active بالاستجابة لطلب Open.
- `FR-007A` `ANALYZED_APPROVED`: يسمح بقبول السعر الاسترشادي أو اقتراح سعر آخر.
- `FR-008` `ANALYZED_APPROVED`: يسمح بمحادثة/استفسار خاص قبل بدء المعاملة من البحث المباشر أو استجابة الطلب.
- `FR-008A` `ANALYZED_APPROVED`: المحادثة وحدها لا تنشئ Transaction.
- `FR-008B` `ANALYZED_APPROVED`: يحتفظ النظام بسجل المحادثة وفق سياسة الخصوصية والاحتفاظ.
- `FR-008C` `ANALYZED_APPROVED`: يسمح بمشاركة موقع أدق في التواصل الخاص عند الحاجة دون عرضه للعامة.
- `FR-009` `ANALYZED_APPROVED`: عند اختيار المستفيد مقدمًا من استجابات الطلب يغلق النظام الطلب أمام استجابات جديدة، يجعل البقية NotSelected، ويبدأ Transaction مع المختار.
- `FR-009A` `ANALYZED_APPROVED`: في البحث المباشر لا تبدأ Transaction حتى يتفق الطرفان على بدء التعامل.

### Transaction / Cancellation
- `FR-TX-01` `ANALYZED_APPROVED`: يدعم النظام عدة معاملات Active للمستخدم بالتوازي.
- `FR-TX-02` `ANALYZED_APPROVED`: بعد بدء المعاملة يسمح بالإلغاء مع سبب إلزامي مسجل يظهر للطرف الآخر.
- `FR-TX-03` `ANALYZED_APPROVED`: يسجل النظام الطرف الملغي والتوقيت وسبب الإلغاء للمراجعة عند الحاجة.
- `FR-TX-04` `PROPOSED/BLOCKED BY TX-CONC-Q01`: لا يوجد حد أقصى رقمي معتمد للمعاملات المتوازية.

### External Payment / Fulfillment Boundaries
- `FR-EXT-01` `ANALYZED_APPROVED_PENDING_DEP_Q02`: لا ينفذ النظام Payment Transaction بين المستفيد والمقدم وفق baseline الحالي.
- `FR-EXT-02` `ANALYZED_APPROVED`: يسمح بعرض وسائل الدفع المقبولة كمعلومة.
- `FR-EXT-03` `ANALYZED_APPROVED`: في المنتجات يسمح بالاستلام أو توصيل يرتبه المقدم خارج YADD.
- `FR-EXT-04` `ANALYZED_APPROVED`: يمكن إدراج تكلفة التوصيل في الفاتورة.
- `FR-EXT-05` `BLOCKED BY DEP-Q02`: دور YADD النهائي في العربون/الدفعة المقدمة لم يحسم بعد؛ لا يضاف Deposit/Escrow lifecycle حتى قرار المشرف.

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

### Reviews / Provider Reputation
- `FR-013` `ANALYZED_APPROVED`: لا يسمح بالتقييم إلا للمستفيد المرتبط بمعاملة Completed مع ذلك المقدم.
- `FR-014` `ANALYZED_APPROVED`: بعد اعتماد الفاتورة يصبح تقييم المقدم خطوة إلزامية على المستفيد.
- `FR-014A` `ANALYZED_APPROVED`: التقييم 1–5 نجوم إلزامي والتعليق النصي اختياري.
- `FR-014B` `ANALYZED_APPROVED`: لا يوجد تقييم للمستفيد من المقدم في النموذج الحالي.
- `FR-014C` `ANALYZED_APPROVED`: لا Double-Blind ولا مهلة 14 يومًا في النموذج الحالي.
- `FR-014D` `ANALYZED_APPROVED`: يعرض ملف المقدم عدد المعاملات المكتملة داخل YADD كمؤشر «عدد الأعمال».

### Trust & Safety / Abuse
- `FR-SAFE-01` `ANALYZED_APPROVED`: يسمح للمستخدم بحظر مستخدم آخر لإيقاف التواصل المباشر.
- `FR-SAFE-02` `ANALYZED_APPROVED`: يسمح بالإبلاغ عن مستخدم/محادثة أو سلوك لإدارة YADD.
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
- `FR-SUB-05` `ANALYZED_APPROVED`: الاشتراك Expired يمنع عروضًا جديدة حتى التجديد.

### Administration
- `FR-015` `PARTIALLY_ANALYZED`: يدير موظفو YADD الوظائف الإدارية وفق الصلاحيات.
- `FR-015A` `ANALYZED_APPROVED`: يسمح للمخول بمراجعة Verification وTrust & Safety Flags والبلاغات واتخاذ إجراء وفق السياسة.
- `FR-015B` `ANALYZED_APPROVED`: يحتفظ النظام بسجل مناسب للأحداث الإدارية الحساسة.

## 11. Non-Functional Requirements — Draft / Partial

- `NFR-SEC-01` `ANALYZED_APPROVED` في المبدأ: حماية الحساب والمحادثات والمرفقات وبيانات التحقق.
- `NFR-SEC-02` `ANALYZED_APPROVED`: وصول بيانات التحقق الحساسة مقيد ومسجل.
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
- `OOS-11`: تقييم مقدم الخدمة/المنتج للمستفيد في النموذج الحالي.

> **ملاحظة:** معالجة العربون/Deposit ليست مثبتة Out of Scope نهائيًا الآن؛ هي `BLOCKED BY DEP-Q02` حتى قرار المشرف.

## 13. Open Decisions Before v1.0

`DEP-Q02`, `REQ-EXP-Q01`, `INV-PENDING-Q01`, `SAFE-REQ-Q01`, `TX-CONC-Q01`, `UX-VAL-Q01`, `LOC-DATA-Q01`, `LOC-OPS-TIME-Q01`, `VER-DOC-Q01`, `VER-RET-Q01`, `VER-LIC-Q01`, `AI-MOD-Q01`, `AI-MOD-Q02`, `AI-PROV-Q01`, `AI-RET-Q01`, `AI-APPEAL-Q01`, `SUB-PLAN-Q01`, `SUB-PAY-Q01`, `SUB-OPS-Q01`.
