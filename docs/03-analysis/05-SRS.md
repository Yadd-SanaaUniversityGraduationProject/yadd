# Software Requirements Specification — YADD MVP

> **الإصدار:** v0.4
>
> **الحالة:** `PARTIALLY ANALYZED — NOT BASELINED`
>
> تم اعتماد نموذج الحساب، نموذج نشاط المقدم، وجزء جوهري من تدفق المعاملات. البنود المفتوحة موضحة صراحة ولا تعتبر متطلبات نهائية.

## 1. Scope

مرجع النطاق: `00-project-baseline.md` وDecision Register.

## 2. Account / Portal Model — Approved

مرجع القرار: `DEC-008..DEC-011` و`14-account-portal-model.md`.

- يوجد حساب `User` واحد للشخص.
- اختيار «مستفيد» أو «مقدم» يحدد بوابة البداية وليس نوع الحساب الدائم.
- يحتاج استخدام بوابة المقدم إلى `Provider Profile` مفعل داخل الحساب نفسه.
- يمكن الانتقال بين البوابتين بالحساب نفسه.

## 3. Provider Activity Model — Approved

مرجع القرار: `DEC-029/030` و`19-provider-activity-model.md`.

- يمتلك الحساب Provider Profile واحدًا كحد أقصى.
- يمكن تفعيل `Service Activity` أو `Product Activity` أو كليهما.
- لا يؤدي تفعيل النشاط الثاني إلى إنشاء حساب أو Provider Profile جديد.
- الهوية وحالة Provider Verification مشتركتان على مستوى Provider Profile.
- بيانات ومسارات الخدمات والمنتجات يمكن أن تختلف حسب طبيعة النشاط.
- تفاصيل Provider Verification نفسها لم تعتمد بعد وتنتظر `VER-Q01`.

## 4. Actors

- `Beneficiary`: المستخدم عند البحث أو إنشاء طلب أو اختيار مقدم أو اعتماد الفاتورة أو التقييم — `ANALYZED_APPROVED`.
- `Service Provider`: Provider Profile مفعّل له Service Activity — `ANALYZED_APPROVED` في أصل الدور.
- `Product Provider`: Provider Profile مفعّل له Product Activity — `ANALYZED_APPROVED` في أصل الدور.
- قد يحمل Provider Profile النشاطين معًا — `ANALYZED_APPROVED`.
- `Platform Administrator`: `PROPOSED` حتى تحليل مسؤوليات الإدارة.

## 5. User Requirements

| ID | User Requirement | Status | Source/Reason |
|---|---|---|---|
| UR-ACC-01 | يحتاج الشخص إلى استخدام YADD من حساب واحد للاستفادة والتقديم. | `ANALYZED_APPROVED` | DEC-008 |
| UR-ACC-02 | يحتاج المستخدم إلى اختيار بوابة البداية دون فقد إمكانية الانتقال للبوابة الأخرى لاحقًا. | `ANALYZED_APPROVED` | DEC-009/011 |
| UR-ACC-03 | يحتاج المستفيد إلى إنشاء Provider Profile من الحساب نفسه إذا أراد التقديم لاحقًا. | `ANALYZED_APPROVED` | DEC-010/011 |
| UR-PROV-01 | يحتاج المقدم إلى تفعيل نشاط خدمات أو منتجات أو كليهما من Provider Profile نفسه دون إنشاء حسابات متعددة. | `ANALYZED_APPROVED` | DEC-029/030 |
| UR-DIS-01 | يحتاج المستفيد إلى البحث المباشر عن مقدمي خدمات/منتجات حسب التصنيف والمنطقة. | `ANALYZED_APPROVED` | DEC-012 |
| UR-REQ-01 | يحتاج المستفيد إلى إنشاء طلب ونشره إلى المقدمين المناسبين لنوع الطلب والمنطقة. | `ANALYZED_APPROVED` | DEC-012 |
| UR-REQ-02 | يحتاج المستفيد إلى إرفاق وصف وصور اختيارية وسعر استرشادي اختياري بالطلب. | `ANALYZED_APPROVED` في الجوهر | DEC-012/013 |
| UR-OFF-01 | يحتاج المقدم إلى الاستجابة للطلب واقتراح سعر عند الحاجة. | `ANALYZED_APPROVED` | DEC-013 |
| UR-OFF-02 | يحتاج المستفيد إلى مقارنة عدة استجابات واختيار مقدم واحد. | `ANALYZED_APPROVED` | DEC-014 |
| UR-INV-01 | يحتاج الطرفان إلى فاتورة نهائية موثقة داخل YADD لإغلاق المعاملة. | `ANALYZED_APPROVED` | DEC-015/016/025 |
| UR-REV-01 | يحتاج الطرفان إلى إمكانية تقييم بعضهما بعد إغلاق معاملة موثقة. | `ANALYZED_APPROVED` | DEC-017/027/028 |
| UR-PAY-01 | يحتاج المستخدم إلى معرفة وسائل الدفع التي يقبلها المقدم دون أن ينفذ YADD الدفع. | `ANALYZED_APPROVED` | DEC-018 |
| UR-PROD-01 | في معاملات المنتجات يحتاج الطرفان إلى توثيق طريقة الاستلام، ويمكن للمقدم اشتراط عربون قبل البدء. | `ANALYZED_APPROVED` في أصل السلوك | DEC-019/020 |

## 6. Functional Requirements

### Account / Portal
- `FR-001` `ANALYZED_APPROVED`: يدير النظام حساب User واحدًا للشخص.
- `FR-001A` `ANALYZED_APPROVED`: يسمح باختيار بوابة البداية: مستفيد أو مقدم دون تثبيت نوع الحساب.
- `FR-001B` `ANALYZED_APPROVED`: يسمح بالانتقال بين البوابتين بالحساب نفسه عند استيفاء شروط البوابة.
- `FR-002` `ANALYZED_APPROVED`: يسمح بإنشاء وإدارة Provider Profile مرتبط بالحساب.
- `FR-002A` `PROPOSED/BLOCKED BY VER-Q01`: لا تتاح وظائف التقديم الكاملة قبل تحقق Provider المعتمد.
- `FR-002B` `ANALYZED_APPROVED`: يسمح Provider Profile بتفعيل Service Activity أو Product Activity أو كليهما.
- `FR-002C` `ANALYZED_APPROVED`: لا ينشئ تفعيل النشاط الثاني حسابًا أو Provider Profile جديدًا.

### Discovery
- `FR-003` `ANALYZED_APPROVED`: يسمح النظام بالبحث المباشر عن مقدمي النشاط باستخدام التصنيف والمنطقة الجغرافية.
- `FR-003A` `PROPOSED/BLOCKED BY LOC-Q01`: يوسع النظام النتائج/الطلبات إلى الأحياء المجاورة وفق نموذج جغرافي معتمد.

### Request Creation / Expiry
- `FR-005` `ANALYZED_APPROVED`: يسمح للمستفيد بإنشاء طلب خدمة أو منتج مع فئة ووصف ومنطقة.
- `FR-005A` `ANALYZED_APPROVED`: يسمح بإضافة صور ومعلومات توضيحية للطلب بصورة اختيارية.
- `FR-005B` `ANALYZED_APPROVED`: يسمح بإضافة سعر استرشادي اختياري للطلب، ولا يعتبر السعر ملزمًا للمقدم.
- `FR-005C` `ANALYZED_APPROVED`: يحدد صاحب الطلب مدة صلاحيته عند النشر، ويصبح Expired عند انتهائها دون اختيار مقدم.
- `FR-005D` `ANALYZED_APPROVED`: يسمح بإلغاء الطلب/المعاملة قبل إرسال الفاتورة دون سبب إلزامي، مع سبب اختياري.
- `FR-006` `ANALYZED_APPROVED` في الجوهر: يعرض/يوصل الطلب للمقدمين الذين لديهم النشاط المناسب والمنطقة المؤهلة، مع التفاصيل الجغرافية محجوبة بـLOC-Q01.

### Provider Response / Selection / Communication
- `FR-007` `ANALYZED_APPROVED`: يسمح للمقدم المؤهل بالاستجابة لطلب مفتوح.
- `FR-007A` `ANALYZED_APPROVED`: يسمح للمقدم بقبول السعر الاسترشادي أو إدخال سعر مقترح مختلف.
- `FR-007B` `ANALYZED_APPROVED`: في طلب المنتج يستطيع المقدم تحديد أن العربون مطلوب قبل بدء التنفيذ/التجهيز.
- `FR-008` `ANALYZED_APPROVED`: بعد اختيار المقدم يوفر النظام Transaction Chat مرتبطًا بالمعاملة لمناقشة السعر والتفاصيل وتبادل النصوص والصور/المرفقات اللازمة.
- `FR-008A` `ANALYZED_APPROVED`: يحتفظ النظام بسجل المحادثة المرتبط بالمعاملة للرجوع إليه عند النزاع وفق سياسة الخصوصية والاحتفاظ.
- `FR-009` `ANALYZED_APPROVED`: يسمح للمستفيد باختيار استجابة مقدم واحدة للمتابعة.

### External Payment / Fulfillment Boundaries
- `FR-EXT-01` `ANALYZED_APPROVED`: لا ينشئ النظام Payment Transaction ولا ينفذ تحويلًا ماليًا بين المستفيد والمقدم.
- `FR-EXT-02` `ANALYZED_APPROVED`: يسمح للمقدم بعرض وسائل الدفع التي يقبلها كمعلومات فقط.
- `FR-EXT-03` `ANALYZED_APPROVED`: في معاملات المنتجات يسمح بتحديد الاستلام من المقدم أو توصيل يرتبه المقدم خارج YADD.
- `FR-EXT-04` `ANALYZED_APPROVED`: يسمح بإدراج تكلفة التوصيل التي رتبها المقدم كبند في الفاتورة.
- `FR-EXT-05` `PROPOSED/BLOCKED BY DEP-Q01`: تحديد ما إذا كان النظام يسجل قيمة العربون المتفق عليها أم مجرد كونه مطلوبًا.

### Invoice / Transaction Closure
- `FR-010` `ANALYZED_APPROVED`: يسمح للمقدم بإنشاء فاتورة رقمية مرتبطة بالمعاملة بعد التنفيذ/التجهيز.
- `FR-010A` `ANALYZED_APPROVED`: تملأ هوية طرفي المعاملة في الفاتورة من الحسابات المرتبطة ولا تعتمد على إدخال اسم حر لكل مرة.
- `FR-010B` `ANALYZED_APPROVED`: تحتوي الفاتورة على بنود وأسعار وإجمالي، ويمكن أن تحتوي على صور/إثباتات اختيارية.
- `FR-011` `ANALYZED_APPROVED`: يرسل النظام الفاتورة للمستفيد للمراجعة، ويسمح له بالاعتماد أو طلب تعديل مع ملاحظة.
- `FR-011A` `ANALYZED_APPROVED`: يحتفظ النظام بتاريخ نسخ الفاتورة والتعديلات.
- `FR-011B` `ANALYZED_APPROVED`: يعرض النظام تحذيرًا صريحًا قبل اعتماد الفاتورة بأن الاعتماد نهائي داخل YADD وغير قابل للتراجع أو التعديل.
- `FR-011C` `ANALYZED_APPROVED`: عند استمرار الخلاف قبل الاعتماد يمكن رفع شكوى مرتبطة بالمعاملة إلى إدارة YADD.
- `FR-012` `ANALYZED_APPROVED`: عند الاعتماد النهائي تحفظ الفاتورة في سجل كل طرف وتغلق المعاملة داخل YADD.
- `FR-012A` `ANALYZED_APPROVED`: لا يعتبر النظام اتفاقات أو مبالغ غير موجودة في الفاتورة المعتمدة جزءًا من السجل الرسمي للمعاملة.

### Reviews / Reputation
- `FR-013` `ANALYZED_APPROVED`: لا يسمح بالتقييم إلا لطرف شارك في معاملة مغلقة بفاتورة معتمدة.
- `FR-014` `ANALYZED_APPROVED`: التقييم اختياري ومتبادل ومتاح لمدة 14 يومًا بعد إغلاق المعاملة.
- `FR-014A` `ANALYZED_APPROVED`: يعمل التقييم بنظام Double-Blind حتى يرسل الطرفان تقييميهما أو تنتهي المهلة.
- `FR-014B` `ANALYZED_APPROVED`: يتكون التقييم من 1–5 نجوم مع ملاحظة نصية اختيارية.
- `FR-014C` `ANALYZED_APPROVED`: يمكن تعديل التقييم قبل نشره فقط، وبعد نشره يصبح نهائيًا.
- `FR-014D` `ANALYZED_APPROVED`: يظهر تقييم المستفيد للمقدمين المؤهلين لرؤية طلبه كمتوسط نجوم وعدد مقيمين، ولا يعرض المستفيد غير المقيم كـ0/5.
- `FR-014E` `PROPOSED/BLOCKED BY RAT-VIS-Q01`: عرض التعليقات النصية السابقة عن المستفيد للمقدمين لم يعتمد بعد.

### Provider Subscription
- `FR-SUB-01` `APPROVED_AS_BUSINESS_MODEL`: يعتمد نموذج YADD التجاري على اشتراك دوري من مقدمي الخدمات/المنتجات دون عمولة من قيمة معاملات المستخدمين.
- `FR-SUB-02` `PROPOSED/BLOCKED BY SUB-Q02`: تنفيذ تحصيل الاشتراك نفسه داخل MVP لم يحسم.

### Administration
- `FR-015` `PROPOSED`: إدارة التصنيفات/المناطق والحالات الإدارية.
- `FR-016` `PROPOSED`: إدارة البلاغات والمحتوى المخالف بعد تحليل السياسات.

### AI/Verification
- `FR-AI-01` `PROPOSED/BLOCKED`: OCR/Face Matching/AI Verification لا يدخل baseline حتى VER-Q01 وAI-Q01 ودراسة الخصوصية والجدوى.

## 7. Non-Functional Requirements — Draft

- `NFR-SEC-01` `PROPOSED`: حماية بيانات الحساب والمحادثات والمرفقات والهوية وفق تصميم أمني موثق.
- `NFR-PRV-01` `PROPOSED`: تقليل جمع وإظهار البيانات الشخصية إلى الحد اللازم، وعدم جعل سمعة المستفيد ملفًا عامًا.
- `NFR-USA-01` `PROPOSED`: واجهات واضحة للفئات المستهدفة، ويحدد معيار اختبار القبول لاحقًا.
- `NFR-REL-01` `ANALYZED_APPROVED` في المبدأ: يمنع النظام إغلاق المعاملة أو فتح التقييم قبل اكتمال شروط الفاتورة المعتمدة.
- `NFR-PER-01` `NEEDS_VERIFICATION`: هدف الأداء يحدد بعد Prototype/Architecture.
- `NFR-AVL-01` `NEEDS_VERIFICATION`: متطلبات التوفر تحدد وفق البنية ونطاق مشروع التخرج.

## 8. Out of Scope — MVP

- `OOS-01`: تنفيذ/معالجة المدفوعات بين المستفيد والمقدم، المحافظ المتكاملة، Escrow، أو أخذ عمولة من المعاملة.
- `OOS-02`: إدارة شبكة توصيل، سائقين، تتبع شحنات أو تحصيل أجور توصيل.
- `OOS-03`: التوسع خارج أمانة العاصمة في MVP.
- `OOS-04`: النقل وصيانة السيارات والورش الثقيلة.
- `OOS-05`: حسابات الشركات والمتاجر الكبرى.
- `OOS-06`: مكالمات صوتية/فيديو أو خصائص شبكة اجتماعية عامة داخل Transaction Chat.

## 9. Open Decisions Before v1.0

`VER-Q01`, `AI-Q01`, `LOC-Q01`, `DEP-Q01`, `SUB-Q02`, `RAT-VIS-Q01`.
