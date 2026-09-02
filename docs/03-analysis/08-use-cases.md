# Use Cases & Specifications

> **الحالة:** `PARTIALLY ANALYZED`
>
> يعكس السيناريوهات المعتمدة حاليًا، مع إبقاء السياسات المفتوحة خارج الافتراض.

## Actor Model

### Main diagram actors
- `Beneficiary`
- `Provider`
  - `Service Provider`
  - `Product Provider`
- `YADD Administrator`

### Specialized administrative roles
- `Verification Reviewer`
- `Content Moderator`
- `Subscription Administrator`

الشخص يستخدم حساب User واحدًا وقد يستخدم بوابة المستفيد وبوابة المقدم حسب صلاحيات Provider Profile. استخدام YADD Administrator في المخطط الرئيسي تبسيط نمذجي ولا يلغي فصل الصلاحيات الإدارية داخليًا.

## UC-01 — Search and Inquire Directly

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Main flow:**
  1. يحدد التصنيف والمنطقة/الفلاتر المتاحة.
  2. يعرض النظام المقدمين المؤهلين.
  3. يفتح المستفيد ملف مقدم ويستعرض Portfolio/Catalog.
  4. يستطيع بدء محادثة استفسار خاصة.
  5. المحادثة لا تنشئ Transaction.
  6. إذا اتفق الطرفان على بدء العمل تنشأ Active Transaction.
- **Related:** DEC-012/046/047/064/066.

## UC-02 — Create Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Main flow:**
  1. يحدد خدمة أو منتج والفئة.
  2. يحدد المديرية والحي.
  3. يضيف وصفًا حرًا.
  4. يضيف صورًا ومعلومات إضافية اختيارية.
  5. يمكن إضافة سعر استرشادي اختياري.
  6. ينشر الطلب ويصبح Open.
- **Alternative:** يغلقه قبل اختيار مقدم إذا لم يعد يحتاجه.
- **Open:** Expiry/reminder timing في REQ-EXP-Q01.

## UC-03 — Respond to Request

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Eligible Provider.
- **Preconditions:** Provider Verified + subscription Active + request Open.
- **Main flow:**
  1. يراجع الطلب.
  2. يرسل `Provider Response`.
  3. يمكن قبول السعر الاسترشادي أو اقتراح سعر مختلف وإضافة ملاحظة.
  4. يحدد هل الاستجابة `RequiresDeposit = Yes/No`.
  5. لا يطلب YADD مبلغ العربون أو نسبته أو طريقة دفعه.
  6. يمكن للمستفيد والمقدم الاستفسار عبر المحادثة قبل الاختيار.

## UC-04 — Select Provider from Request

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Beneficiary.
- **Main flow:**
  1. يقارن المستفيد Provider Responses والمحادثات ذات الصلة، بما في ذلك دلالة RequiresDeposit إن وجدت.
  2. يختار مقدمًا واحدًا.
  3. يغلق النظام الطلب أمام الاستجابات الجديدة.
  4. تصبح بقية الاستجابات NotSelected.
  5. تبدأ Active Transaction مع المختار.
- لا يتطلب المسار نموذج/كيان Agreement مستقل.

## UC-05 — Cancel Active Transaction

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Beneficiary or Provider.
- **Precondition:** Transaction Active ولم تدخل مسار الفاتورة النهائي.
- **Main flow:**
  1. يختار الطرف إلغاء المعاملة.
  2. يدخل سببًا إلزاميًا.
  3. يسجل النظام السبب والطرف والتوقيت.
  4. يظهر السبب للطرف الآخر.
  5. يمكن للإدارة مراجعة النمط عند الحاجة.
- **Note:** إغلاق Request قبل اختيار مقدم ليس هذا Use Case، وأي عربون/دفع أو Refund خارج YADD.

## UC-06 — Create and Approve Invoice

- **Status:** `ANALYZED_APPROVED`.
- **Primary actors:** Provider, Beneficiary.
- **Main flow:**
  1. بعد التنفيذ/التجهيز واستقرار الاتفاق ينشئ المقدم الفاتورة النهائية.
  2. يضيف البنود والأسعار والإجمالي وصورًا اختيارية.
  3. يرسل الفاتورة.
  4. تصبح Pending Customer Approval.
  5. يختار المستفيد Approve أو Request Revision مع ملاحظة.
  6. عند Approve تصبح Transaction Completed وتحفظ الفاتورة.
- **Alternative:** تعديل وإعادة إرسال؛ شكوى إذا استمرت المشكلة.
- **No response:** تبقى Pending وتصل تذكيرات؛ لا Auto-Approval.
- **Open:** التصعيد الطويل INV-PENDING-Q01.

## UC-07 — Rate Provider

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Beneficiary.
- **Precondition:** Transaction Completed بفاتورة معتمدة.
- **Main flow:**
  1. يطلب النظام تقييم المقدم.
  2. يختار المستفيد 1–5 نجوم إلزاميًا.
  3. يمكن إضافة تعليق اختياري.
  4. يرسل التقييم.
- **Related:** DEC-051.

## UC-07B — Provider Rates Beneficiary

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Provider.
- **Precondition:** Transaction Completed مع المستفيد نفسه.
- **Main flow:**
  1. يعرض النظام Prompt بارزًا للتقييم.
  2. يستطيع المقدم تخطي التقييم لأنه اختياري.
  3. إذا اختار التقييم، يقيّم كل مؤشر من 1 إلى 5: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون.
  4. يمكنه إضافة تعليق نصي اختياري.
  5. يحفظ النظام التقييم ضمن سجل تعامل المستفيد.
- **Visibility:** يظهر سجل التعامل لمقدمي الخدمات/المنتجات فقط عندما يوجد سياق تعامل مشروع مع المستفيد.
- **No automatic consequence:** لا يؤدي التقييم إلى منع أو تعليق أو عقوبة آلية في MVP.
- **Related:** DEC-063.

## UC-08 — Block and Report User / Content

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** User.
- **Main flow:**
  1. يحظر المستخدم الطرف الآخر لإيقاف التواصل المباشر.
  2. يستطيع تقديم بلاغ مرتبط بالمستخدم/المحادثة/السلوك أو Portfolio/Catalog Item.
  3. يذهب البلاغ للمراجعة الإدارية.
  4. يقرر الموظف المخول الإجراء وفق السياسة والأدلة.
- البلاغ وحده لا يساوي إدانة أو حظرًا نهائيًا.

## UC-09 — Provider Verification / Portal Activation

- **Status:** `ANALYZED_APPROVED` في الجوهر.
- المستخدم الذي يبدأ كمستفيد يستطيع لاحقًا إنشاء Provider Profile بالحساب نفسه.
- يستكمل نوع النشاط والمجال ومناطق الخدمة ومتطلبات التحقق.
- يرفع وثيقة الهوية والصورة المطلوبة وفق السياسة التي ستحدد أنواعها تفصيليًا.
- ينتظر المراجعة اليدوية النهائية قبل صلاحيات التقديم.

## UC-10 — Manage Portfolio / Catalog

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Provider.
- **Main flow:**
  1. يضيف المقدم صورة لعمل/منتج مع وصف اختياري.
  2. يقر بحقه في نشر المحتوى.
  3. يحفظ النظام الأصل بصورة غير عامة.
  4. ينشئ نسخة عرض بعلامة مائية تعريفية مرتبطة بـYADD وحساب المقدم.
  5. تظهر النسخة في Provider Profile.
- **Alternative:** يمكن الإبلاغ عن المحتوى المشتبه في انتحاله للمراجعة الإدارية.
- العلامة المائية ليست إثبات ملكية قانونية.

## Open Use-Case Policies

- `REQ-EXP-Q01`: Expiry/reminders.
- `INV-PENDING-Q01`: فاتورة معلقة مدة طويلة.
- `SAFE-REQ-Q01`: Thresholds إساءة استخدام الطلبات.
- `TX-CONC-Q01`: حد المعاملات المتوازية إن لزم.
- `UX-VAL-Q01`: التحقق الميداني من قابلية الاستخدام والاتصال.
