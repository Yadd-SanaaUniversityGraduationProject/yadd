# Use Cases & Specifications

> **الحالة:** `ANALYZED — CORE SYNCHRONIZED 2026-09-04`
>
> تعكس هذه الوثيقة السيناريوهات المعتمدة حاليًا في Decision Register وSRS وBusiness Rules، مع إبقاء السياسات المفتوحة خارج الافتراض. جميع التسميات داخل المخططات النهائية تكون باللغة الإنجليزية وفق DEC-072.

## 1. Actor Model

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

الشخص يستخدم حساب `User` واحدًا وقد يستخدم Beneficiary Portal وProvider Portal حسب حالة Provider Profile. استخدام `YADD Administrator` في المخطط الرئيسي تبسيط نمذجي ولا يلغي فصل الصلاحيات الإدارية داخليًا.

**Related:** DEC-008..011/029/030/067.

---

## UC-01 — Search and Inquire Directly

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Supporting actor:** Provider.
- **Preconditions:** Provider Profile المطلوب ظاهر ومؤهل وفق قواعد النظام الحالية.
- **Main flow:**
  1. يحدد Beneficiary التصنيف والمنطقة/الفلاتر المتاحة.
  2. يعرض YADD المقدمين المؤهلين.
  3. يفتح Beneficiary ملف Provider ويستعرض Portfolio/Catalog.
  4. يبدأ Beneficiary أو Provider تواصلًا خاصًا في سياق Inquiry/Chat حسب الواجهة المتاحة.
  5. يستمر الطرفان في مناقشة التفاصيل داخل المحادثة.
  6. إذا أراد أحد الطرفين بدء التعامل الرسمي، يرسل `Request Transaction Start`.
  7. يعرض YADD للطرف الآخر `Request Start Confirmation`.
  8. إذا أكد الطرف الآخر، ينشئ YADD `Active Transaction` بين الطرفين.
- **Alternative — No confirmation / rejection:** تبقى المحادثة دون Transaction ويمكن أن تستمر أو تنتهي.
- **Rule:** Chat وحدها لا تنشئ Transaction.
- **Related:** DEC-012/031..033/046/047/064/066/069.

---

## UC-02 — Create Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Main flow:**
  1. يحدد Service أو Product والفئة.
  2. يحدد المديرية والحي.
  3. يضيف وصفًا حرًا.
  4. يضيف صورًا ومعلومات إضافية اختيارية.
  5. يمكن إضافة سعر استرشادي اختياري.
  6. ينشر الطلب ويصبح `Open`.
- **Alternative:** يغلقه Beneficiary قبل اختيار Provider إذا لم يعد يحتاجه؛ هذا `Request Closure` وليس Transaction Cancellation.
- **Open policy:** Expiry/reminder timing في `REQ-EXP-Q01`.
- **Related:** DEC-012/013/048/049.

---

## UC-03 — Respond to Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Eligible Provider.
- **Preconditions:** Provider Verified + subscription Active + Request `Open`.
- **Main flow:**
  1. يراجع Provider الطلب.
  2. يرسل `Provider Response`.
  3. يمكنه قبول السعر الاسترشادي أو اقتراح سعر مختلف وإضافة ملاحظة.
  4. يحدد `RequiresDeposit = Yes/No` فقط.
  5. لا يطلب YADD مبلغ العربون أو نسبته أو طريقة دفعه أو حالته.
  6. يمكن للطرفين الاستفسار عبر Chat قبل الاختيار.
- **Business constraint:** يوجد **Provider Response فعالة واحدة فقط لكل Provider لكل Request**.
- **Alternative — Edit response:** ما دام Request `Open` ولم يتم اختيار Provider، يستطيع Provider تعديل استجابته الفعالة بدل إنشاء استجابة مكررة.
- **Alternative — Withdraw response:** ما دام Request `Open` ولم يتم اختيار Provider، يستطيع Provider سحب استجابته.
- **After selection:** لا تعد الاستجابة قابلة للتعديل/السحب كاستجابة مفتوحة بعد اختيار Provider وبدء Transaction.
- **Related:** DEC-013/041/043/047/066/070.

---

## UC-04 — Select Provider from Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Precondition:** Request `Open` ويحتوي على Provider Response واحدة أو أكثر قابلة للاختيار.
- **Main flow:**
  1. يقارن Beneficiary Provider Responses والمحادثات ذات الصلة، بما في ذلك `RequiresDeposit` إن وجدت.
  2. يختار Provider واحدًا.
  3. يغلق YADD الطلب أمام الاستجابات الجديدة.
  4. تصبح بقية الاستجابات `NotSelected`.
  5. تصبح الاستجابة المختارة `Selected`.
  6. ينشئ YADD `Active Transaction` مع Provider المختار.
- **Rule:** لا يوجد `Agreement` entity أو form مستقل في MVP.
- **Related:** DEC-014/047/066/070.

---

## UC-05 — Cancel Active Transaction

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary or Provider.
- **Precondition:** Transaction في حالة تسمح بالإلغاء وفق lifecycle الحالي.
- **Main flow:**
  1. يختار الطرف إلغاء المعاملة.
  2. يدخل سببًا إلزاميًا.
  3. يسجل YADD السبب والطرف والتوقيت.
  4. يظهر السبب للطرف الآخر.
  5. يمكن للإدارة مراجعة النمط عند الحاجة.
- **Postcondition:** تصبح Transaction `Cancelled`.
- **Note:** إغلاق Request قبل اختيار Provider ليس هذا Use Case، وأي Deposit/Payment/Refund خارج YADD.
- **Related:** DEC-048/054.

---

## UC-06 — Create, Revise and Approve Final Invoice

- **Status:** `ANALYZED_APPROVED`.
- **Primary actors:** Provider, Beneficiary.
- **Precondition:** Transaction قائمة ووصلت إلى مرحلة التنفيذ/التجهيز المناسبة.
- **Main flow:**
  1. بعد التنفيذ/التجهيز واستقرار البنود ينشئ Provider الفاتورة النهائية.
  2. يضيف البنود والأسعار والإجمالي وصورًا اختيارية.
  3. يرسل الفاتورة.
  4. تصبح `Pending Customer Approval`.
  5. يراجع Beneficiary الفاتورة.
  6. يختار `Approve` أو `Request Revision` مع ملاحظة.
  7. عند `Approve` تصبح Transaction `Completed` وتحفظ النسخة المعتمدة كسجل نهائي داخل YADD.
- **Alternative — Revision requested:** يعدل Provider الفاتورة ويرسل نسخة جديدة مع الاحتفاظ بتاريخ النسخ.
- **Alternative — Dispute:** يمكن رفع شكوى إذا استمرت المشكلة.
- **No response:** تبقى الفاتورة Pending وتصل تذكيرات؛ لا Auto-Approval.
- **Terminal rule:** `Completed` هي النهاية الناجحة للTransaction؛ لا توجد حالة Transaction باسم `Closed`.
- **Open policy:** التصعيد الطويل `INV-PENDING-Q01`.
- **Related:** DEC-015/016/025/050/055/071.

---

## UC-07 — Rate Provider

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Precondition:** Transaction `Completed` مع Provider نفسه وبفاتورة معتمدة.
- **Main flow:**
  1. يطلب YADD من Beneficiary تقييم Provider.
  2. يختار Beneficiary تقييمًا من 1 إلى 5 نجوم.
  3. يمكن إضافة تعليق اختياري.
  4. يرسل التقييم.
- **Rule:** التقييم إلزامي بعد Completed وفق تجربة النظام الحالية، لكنه **Post-Transaction operation** ولا يغير Transaction status.
- **Related:** DEC-051/071.

---

## UC-07B — Provider Rates Beneficiary

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Provider.
- **Precondition:** Transaction `Completed` مع Beneficiary نفسه.
- **Main flow:**
  1. يعرض YADD Prompt بارزًا للتقييم.
  2. يستطيع Provider تخطي التقييم لأنه اختياري.
  3. إذا اختار التقييم، يقيّم كل مؤشر من 1 إلى 5:
     - Request clarity and communication.
     - Commitment to agreement.
     - Cooperation and conduct.
  4. يمكنه إضافة تعليق نصي اختياري.
  5. يحفظ YADD التقييم ضمن سجل تعامل Beneficiary.
- **Visibility:** يظهر سجل التعامل لمقدمي الخدمات/المنتجات فقط عندما يوجد سياق تعامل مشروع مع Beneficiary.
- **No automatic consequence:** لا يؤدي التقييم إلى منع أو تعليق أو عقوبة آلية في MVP.
- **Rule:** هذا Post-Transaction operation ولا يغير Transaction status.
- **Related:** DEC-063/071.

---

## UC-08 — Block and Report User / Content

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** User.
- **Supporting actor:** YADD Administrator.
- **Main flow:**
  1. يحظر User الطرف الآخر لإيقاف التواصل المباشر.
  2. يستطيع تقديم Report مرتبطًا بمستخدم/محادثة/سلوك أو Portfolio/Catalog Item.
  3. يذهب Report للمراجعة الإدارية.
  4. يقرر الموظف المخول الإجراء وفق السياسة والأدلة.
- **Rule:** Report وحده لا يساوي إدانة أو حظرًا نهائيًا.
- **Related:** DEC-053/054.

---

## UC-09 — Provider Verification / Portal Activation

- **Status:** `ANALYZED_APPROVED` في الجوهر.
- **Primary actor:** User / prospective Provider.
- **Supporting actor:** YADD Administrator / Verification Reviewer.
- **Main flow:**
  1. ينشئ User أو يكمل Provider Profile داخل الحساب نفسه.
  2. يحدد النشاط والمجال ومناطق الخدمة المطلوبة.
  3. يرفع بيانات/Artifacts التحقق المطلوبة وفق السياسة المعتمدة جزئيًا.
  4. يمكن لـAI توليد مؤشرات مساعدة وفق حدود السياسة الحالية.
  5. يراجع موظف مخول حالة التحقق.
  6. القرار النهائي بشري؛ عند Verified تتاح صلاحيات Provider المناسبة حسب بقية الشروط.
- **Open:** أنواع الوثائق الدقيقة والاحتفاظ والتراخيص الخاصة في `VER-DOC-Q01 / VER-RET-Q01 / VER-LIC-Q01`.
- **Related:** DEC-010/034..040.

---

## UC-10 — Manage Portfolio / Catalog

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Provider.
- **Main flow:**
  1. يضيف Provider صورة لعمل/منتج مع وصف اختياري.
  2. يقر بحقه في نشر المحتوى.
  3. يحفظ YADD الأصل بصورة غير عامة.
  4. ينشئ نسخة عرض بعلامة مائية تعريفية مرتبطة بـYADD وحساب Provider.
  5. تظهر نسخة العرض في Provider Profile.
- **Alternative:** يمكن الإبلاغ عن المحتوى المشتبه في انتحاله للمراجعة الإدارية.
- **Rule:** العلامة المائية ليست إثبات ملكية قانونية.
- **Related:** DEC-064.

---

## 2. Main Diagram Decomposition & UML Relationship Rules

> **Modeling correction / synchronization:** مواصفات `UC-01..UC-10` أعلاه تبقى مرجع السيناريوهات والتتبع، لكنها ليست خريطة 1:1 للأشكال البيضاوية في Main Use Case Diagram. بعض المواصفات تجمع أكثر من هدف Actor أو أكثر من مرحلة زمنية/Actor واحد، لذلك يفكك الرسم النهائي السيناريو إلى Use Cases أصغر دون تغيير المتطلبات أو القرارات.

### قاعدة اختيار العلاقة

- `<<include>>`: يستخدم فقط عندما يكون السلوك المضمّن جزءًا مطلوبًا من تنفيذ الـBase Use Case أو وظيفة مشتركة يجب تنفيذها داخلها.
- `<<extend>>`: يستخدم عندما يكون السلوك الإضافي شرطيًا/اختياريًا ويمكن للـBase Use Case أن يكتمل بدونه عند Extension Point مناسب.
- **Precondition / Postcondition / Constraint**: تستخدم للتبعيات الزمنية أو المعتمدة على حالة الكيان، ولا تحول تلقائيًا إلى `include` أو `extend`.
- **Actor Generalization**: `Service Provider` و`Product Provider` تخصصان من `Provider` عند الحاجة، ولا يلزم تكرارهما في Main Diagram وفق DEC-067.

### Decomposed Use Cases for the Main Diagram

#### Beneficiary
- `Manage Account`
- `Search Providers`
- `View Provider Profile`
- `Create Request`
- `Close Open Request`
- `Compare Provider Responses`
- `Communicate / Inquire`
- `Select Provider`
- `Request Transaction Start`
- `Confirm Transaction Start`
- `Cancel Transaction`
- `Review Final Invoice`
- `Approve Final Invoice`
- `Request Invoice Revision`
- `Raise Transaction Complaint`
- `Rate Provider`
- `Block User`
- `Report User / Content`

#### Provider
- `Manage Account`
- `Manage Provider Profile`
- `Manage Portfolio / Catalog`
- `Manage Service Areas`
- `Submit Verification`
- `View Matching Requests`
- `Submit Provider Response`
- `Edit Provider Response`
- `Withdraw Provider Response`
- `Communicate / Inquire`
- `Request Transaction Start`
- `Confirm Transaction Start`
- `Cancel Transaction`
- `Create Final Invoice`
- `Revise Final Invoice`
- `Rate Beneficiary`
- `Block User`
- `Report User / Content`

#### YADD Administrator
- `Review Provider Verification`
- `Review Reports / Flags`
- `Review Transaction Complaint`
- `Manage Provider Subscription`

#### Included system behavior (not independent actor goals)
- `Validate Response Eligibility`
- `Create Active Transaction`
- `Complete Transaction`

### Approved/Derived Diagram Relationships

| Relationship | UML Type | Why | Basis |
|---|---|---|---|
| `View Provider Profile → Search Providers` | `<<extend>>` | فتح ملف نتيجة بحث اختياري بعد ظهور النتائج | UC-01 / DEC-012/064 |
| `Communicate / Inquire → View Provider Profile` | `<<extend>>` | الاستفسار في Direct Search اختياري بعد استعراض الملف | UC-01 / DEC-046 |
| `Communicate / Inquire → Compare Provider Responses` | `<<extend>>` | الاستفسار قبل اختيار مقدم من الطلب اختياري | UC-03/04 / DEC-046 |
| `Select Provider → Compare Provider Responses` | `<<extend>>` | المقارنة يمكن أن تنتهي دون اختيار؛ الاختيار يحدث عند قرار Beneficiary | UC-04 / DEC-014/047 |
| `Submit Provider Response → View Matching Requests` | `<<extend>>` | مشاهدة Request لا تلزم Provider بإرسال استجابة | UC-03 / DEC-043/070 |
| `Request Transaction Start → Communicate / Inquire` | `<<extend>>` | في Direct Search يمكن أن تستمر المحادثة دون طلب بدء Transaction | UC-01 / DEC-046/069 |
| `Submit Provider Response → Validate Response Eligibility` | `<<include>>` | إرسال استجابة جديدة يتطلب دائمًا Verified Provider + Active Subscription + Open Request | UC-03 / DEC-043 / BR-030 |
| `Select Provider → Create Active Transaction` | `<<include>>` | اختيار مقدم في Request Route يبدأ Transaction واحدة دائمًا | UC-04 / DEC-047/066 |
| `Confirm Transaction Start → Create Active Transaction` | `<<include>>` | التأكيد الإيجابي في Direct Search ينشئ Active Transaction | UC-01 / DEC-069 |
| `Approve Final Invoice → Review Final Invoice` | `<<extend>>` | الاعتماد قرار من قرارات مراجعة الفاتورة وليس كل Review ينتهي فورًا بالاعتماد | UC-06 / DEC-050/071 |
| `Request Invoice Revision → Review Final Invoice` | `<<extend>>` | طلب التعديل فرع شرطي من مراجعة الفاتورة | UC-06 / DEC-025/050 |
| `Raise Transaction Complaint → Review Final Invoice` | `<<extend>>` | الشكوى تحدث عند استمرار الخلاف قبل الاعتماد | UC-06 / DEC-025/073 |
| `Approve Final Invoice → Complete Transaction` | `<<include>>` | اعتماد الفاتورة يجعل Transaction = Completed إلزاميًا | DEC-071 / BR-010 |

### Dependencies that are **not** `include` / `extend`

| Use Case | Dependency | Modeling |
|---|---|---|
| `Rate Provider` | Transaction must already be `Completed`; rating then becomes required | `Precondition: Transaction = Completed` + Post-Transaction workflow |
| `Rate Beneficiary` | Transaction must already be `Completed`; Provider may skip | `Precondition: Transaction = Completed` |
| `Cancel Transaction` | Transaction must exist and be in a cancellable active state | Precondition / lifecycle rule |
| `Close Open Request` | Request is Open and no Provider has been selected | Precondition; not Transaction cancellation |
| `Edit Provider Response` / `Withdraw Provider Response` | Active response exists; Request Open; before selection | Precondition from DEC-070 |
| `Review Final Invoice` | Final Invoice is `Pending Customer Approval` | Precondition from DEC-050 |
| `Revise Final Invoice` | Beneficiary previously requested revision | Precondition / previous-event dependency |
| `Review Provider Verification` | Verification submission exists | Precondition; separate Admin goal, not included inside Provider submission |
| `Review Transaction Complaint` | Complaint exists | Precondition; asynchronous Admin goal |
| `Submit Provider Response` | Provider Verified + Subscription Active | enforced by included `Validate Response Eligibility` and business rules |

> **Important:** وجود `Rate Provider` أو `Rate Beneficiary` كـUse Case مستقلة لا يعني أنهما متاحتان في أي وقت. استقلال الـActor goal عن الرسم الزمني شيء مختلف عن Lifecycle dependency؛ لذلك تمثل تبعية `Completed` كـPrecondition صريحة بدل استخدام `include/extend` بصورة غير صحيحة.

## 3. Open Use-Case Policies — Non-blocking for Core Diagrams

- `REQ-EXP-Q01`: Expiry/reminders.
- `INV-PENDING-Q01`: pending invoice escalation.
- `SAFE-REQ-Q01`: abuse thresholds.
- `TX-CONC-Q01`: concurrent transaction numerical limit if needed.
- `UX-VAL-Q01`: usability/low-connectivity validation.
- `VER-DOC-Q01 / VER-RET-Q01 / VER-LIC-Q01`: verification detail policies.
- `AI-*`: detailed moderation/provider/retention thresholds and appeal policy.
- `SUB-*`: subscription package/payment-proof/expiry behavior details.

هذه النقاط لا تمنع رسم Main Use Case Diagram وCore Activity/Sequence بالمنطق المعتمد الحالي.
