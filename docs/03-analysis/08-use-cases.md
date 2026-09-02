# Use Cases & Specifications

> **الحالة:** `PARTIALLY ANALYZED`
>
> يعكس السيناريوهات المعتمدة حاليًا، مع إبقاء السياسات المفتوحة خارج الافتراض.

## Actor Model

- `Beneficiary`
- `Service Provider`
- `Product Provider`
- `Platform/Content Administrator`
- `Verification Reviewer`

الشخص يستخدم حساب User واحدًا وقد يستخدم بوابة المستفيد وبوابة المقدم حسب صلاحيات Provider Profile.

## UC-01 — Search and Inquire Directly

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Main flow:**
  1. يحدد التصنيف والمنطقة/الفلاتر المتاحة.
  2. يعرض النظام المقدمين المؤهلين.
  3. يفتح المستفيد ملف مقدم.
  4. يستطيع بدء محادثة استفسار خاصة.
  5. المحادثة لا تنشئ Transaction.
  6. إذا اتفق الطرفان على بدء العمل تنشأ Active Transaction.
- **Related:** DEC-012/046/047.

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
  2. يرسل استجابة/عرضًا.
  3. يمكن اقتراح سعر مختلف وإضافة ملاحظة.
  4. يمكن للمستفيد والمقدم الاستفسار عبر المحادثة قبل الاختيار.

## UC-04 — Select Provider from Request

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** Beneficiary.
- **Main flow:**
  1. يقارن المستفيد الاستجابات والمحادثات ذات الصلة.
  2. يختار مقدمًا واحدًا.
  3. يغلق النظام الطلب أمام الاستجابات الجديدة.
  4. تصبح بقية الاستجابات NotSelected.
  5. تبدأ Active Transaction مع المختار.
- لا يتطلب المسار نموذج اتفاق/سعر إضافيًا عند الاختيار.

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
- **Note:** إغلاق Request قبل اختيار مقدم ليس هذا Use Case.

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

- **Status:** `OPEN / BLOCKED BY RAT-CUST-Q01`.
- لم يعتمد بعد وجود هذا Use Case أو عدمه.
- إذا اعتمد، يجب تحديد:
  - التوقيت بالنسبة لإكمال المعاملة وتقييم المستفيد للمقدم.
  - هل هو إلزامي أم اختياري.
  - النجوم/المؤشرات/التعليق.
  - من يرى النتيجة.
  - أثرها على سمعة/صلاحيات المستفيد.
- لا يعاد نموذج Double-Blind أو 14-day تلقائيًا من القرارات القديمة.

## UC-08 — Block and Report User

- **Status:** `ANALYZED_APPROVED`.
- **Actor:** User.
- **Main flow:**
  1. يحظر المستخدم الطرف الآخر لإيقاف التواصل المباشر.
  2. يستطيع تقديم بلاغ مرتبط بالمستخدم/المحادثة/السلوك.
  3. يذهب البلاغ للمراجعة الإدارية.
  4. يقرر الموظف المخول الإجراء وفق السياسة والأدلة.
- البلاغ وحده لا يساوي إدانة أو حظرًا نهائيًا.

## UC-09 — Provider Verification / Portal Activation

- **Status:** `ANALYZED_APPROVED` في الجوهر.
- المستخدم الذي يبدأ كمستفيد يستطيع لاحقًا إنشاء Provider Profile بالحساب نفسه.
- يستكمل نوع النشاط والمجال ومناطق الخدمة ومتطلبات التحقق.
- يرفع وثيقة الهوية والصورة المطلوبة وفق السياسة التي ستحدد أنواعها تفصيليًا.
- ينتظر المراجعة اليدوية النهائية قبل صلاحيات التقديم.

## Open Use-Case Policies

- `RAT-CUST-Q01`: تقييم مقدم الخدمة/المنتج للمستفيد.
- `DEP-Q02`: العربون/الدفع المقدم.
- `REQ-EXP-Q01`: Expiry/reminders.
- `INV-PENDING-Q01`: فاتورة معلقة مدة طويلة.
- `SAFE-REQ-Q01`: Thresholds إساءة استخدام الطلبات.
- `TX-CONC-Q01`: حد المعاملات المتوازية إن لزم.
- `UX-VAL-Q01`: التحقق الميداني من قابلية الاستخدام والاتصال.
