# Use Cases & Specifications

> **الحالة:** `ANALYZED — CORE SYNCHRONIZED 2026-09-18 THROUGH DEC-090`
>
> تعكس هذه الوثيقة السيناريوهات المعتمدة حاليًا في Decision Register وSRS وBusiness Rules، مع إبقاء السياسات المفتوحة خارج الافتراض. جميع التسميات داخل المخططات النهائية تكون باللغة الإنجليزية وفق DEC-072.

## 1. Actor Model

### Main diagram actors
- `Guest`
- `Beneficiary`
- `Provider`
  - `Service Provider`
  - `Product Provider`
- `YADD Administrator`

### Specialized administrative roles
- `Verification Reviewer`
- `Content Moderator`
- `Subscription Administrator`

`Guest` هو Actor غير authenticated للتصفح العام فقط. الشخص بعد Log In/Create Account يستخدم حساب `User` واحدًا وقد يستخدم Beneficiary Portal وProvider Portal حسب حالة Provider Profile. استخدام `YADD Administrator` في المخطط الرئيسي تبسيط نمذجي ولا يلغي فصل الصلاحيات الإدارية داخليًا.

**Related:** DEC-008..011/030/067/074/076/077.

---

## UC-00 — Browse Public Provider Information

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Guest.
- **Precondition:** لا تتطلب Authentication.
- **Main flow:**
  1. يدخل Guest إلى الواجهة العامة.
  2. يحدد التصنيف والمنطقة/الفلاتر العامة المتاحة.
  3. يعرض YADD نتائج Providers العامة.
  4. يفتح Guest Public Provider Profile.
  5. يستعرض البيانات العامة المسموح بها وPortfolio/Catalog ومؤشرات الملف العامة المعتمدة.
- **Protected-action alternative:** إذا ضغط Guest إجراءً محميًا مثل `Create Request` أو `Communicate / Inquire`، يوجّهه YADD إلى `Log In` أو `Create Account` قبل متابعة الإجراء.
- **Privacy rule:** لا يعرض Public Provider Profile رقم الهاتف أو بيانات Verification/Subscription/Transactions/Reports أو أي بيانات حساسة/خاصة.
- **Rule:** Guest لا ينشئ Request/Conversation/Transaction/Rating/Block/Report قبل Authentication.
- **Related:** DEC-036/046/064/065/077.

---

## UC-01 — Search and Inquire Directly

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Supporting actor:** Provider.
- **Preconditions:** Beneficiary authenticated؛ Provider Profile المطلوب ظاهر ومؤهل وفق قواعد النظام الحالية.
- **Main flow:**
  1. يحدد Beneficiary التصنيف والمنطقة/الفلاتر المتاحة.
  2. يعرض YADD المقدمين المؤهلين.
  3. يفتح Beneficiary ملف Provider ويستعرض Portfolio/Catalog.
  4. يبدأ Beneficiary أو Provider تواصلًا خاصًا في سياق Inquiry/Chat حسب الواجهة المتاحة.
  5. يستمر الطرفان في مناقشة التفاصيل داخل المحادثة.
  6. إذا أراد أحد الطرفين بدء التعامل الرسمي، يرسل `Request Transaction Start`.
  7. يعرض YADD للطرف الآخر `Request Start Confirmation` صالحًا لمدة 12 ساعة.
  8. إذا أكد الطرف الآخر خلال المهلة، ينشئ YADD `Active Transaction` بين الطرفين.
- **Alternative — No confirmation / rejection:** الرفض أو انتهاء 12 ساعة يلغي طلب البدء فقط؛ تبقى المحادثة دون Transaction ويمكن إرسال طلب جديد لاحقًا. Pending واحد فقط بين الطرفين.
- **Rule:** Chat وحدها لا تنشئ Transaction.
- **Related:** DEC-012/031..033/046/047/064/066/069/077.

---

## UC-02 — Create Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Precondition:** Beneficiary authenticated.
- **Main flow:**
  1. يحدد Service أو Product والفئة.
  2. يحدد المديرية والحي.
  3. يضيف وصفًا حرًا.
  4. يضيف صورًا ومعلومات إضافية اختيارية.
  5. يمكن إضافة سعر استرشادي اختياري.
  6. ينشر الطلب ويصبح `Open`.
- **Alternative:** يغلقه Beneficiary قبل اختيار Provider إذا لم يعد يحتاجه؛ هذا `Request Closure` وليس Transaction Cancellation.
- **Guest boundary:** CTA إنشاء الطلب قد يظهر للGuest، لكن لا ينفذ UC-02 قبل Log In/Create Account.
- **Expiry policy:** Reminder 24h و48h، وExpired عند 72h من عدم نشاط Beneficiary؛ Republish ينشئ Request جديدًا — DEC-081.
- **Related:** DEC-012/013/048/049/077.

---

## UC-03 — Respond to Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Eligible Provider.
- **Preconditions:** Provider authenticated + eligible بحسب النوع (Service Provider: Identity Verified؛ Product Provider: Account/Profile eligible) + subscription Active + Request `Open`.
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
- **Validity:** لا مدة مستقلة للاستجابة؛ تنتهي فعاليتها مع Withdraw/Selection/Request Close/Expiry — DEC-082.
- **Related:** DEC-013/041/043/047/066/070/077.

---

## UC-04 — Select Provider from Request

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Precondition:** Beneficiary authenticated؛ Request `Open` ويحتوي على Provider Response واحدة أو أكثر قابلة للاختيار.
- **Main flow:**
  1. يقارن Beneficiary Provider Responses والمحادثات ذات الصلة، بما في ذلك `RequiresDeposit` إن وجدت.
  2. يختار Provider واحدًا.
  3. يغلق YADD الطلب أمام الاستجابات الجديدة.
  4. تصبح بقية الاستجابات `NotSelected`.
  5. تصبح الاستجابة المختارة `Selected`.
  6. ينشئ YADD `Active Transaction` مع Provider المختار.
- **Rule:** لا يوجد `Agreement` entity أو form مستقل في MVP.
- **Related:** DEC-014/047/066/070/077.

---

## UC-05 — Cancel Active Transaction

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary or Provider.
- **Precondition:** Actor authenticated؛ Transaction Active ولم تصل إلى Final Invoice Approved/Completed.
- **Main flow:**
  1. يختار الطرف إلغاء المعاملة.
  2. يدخل سببًا إلزاميًا.
  3. يسجل YADD السبب والطرف والتوقيت.
  4. يظهر السبب للطرف الآخر.
  5. يمكن للإدارة مراجعة النمط عند الحاجة.
- **Postcondition:** تصبح Transaction `Cancelled`.
- **Note:** إغلاق Request قبل اختيار Provider ليس هذا Use Case، وأي Deposit/Payment/Refund خارج YADD.
- **Related:** DEC-048/054/077.

---

## UC-06 — Create, Revise and Approve Final Invoice

- **Status:** `ANALYZED_APPROVED`.
- **Primary actors:** Provider, Beneficiary.
- **Precondition:** Actors authenticated؛ Transaction قائمة ووصلت إلى مرحلة التنفيذ/التجهيز المناسبة.
- **Main flow:**
  1. بعد التنفيذ/التجهيز واستقرار البنود ينشئ Provider الفاتورة النهائية.
  2. يضيف البنود والأسعار والإجمالي وصورًا اختيارية.
  3. يرسل الفاتورة.
  4. تصبح `Pending Customer Approval`.
  5. يراجع Beneficiary الفاتورة.
  6. يختار `Approve` أو `Request Revision` مع ملاحظة.
  7. عند `Approve` تصبح Transaction `Completed` وتحفظ النسخة المعتمدة كسجل نهائي داخل YADD.
- **Alternative — Revision requested:** كل طلب تعديل يحتاج ملاحظة، يعدل Provider الفاتورة ويرسل Version جديدة مع الاحتفاظ بتاريخ النسخ؛ لا حد عددي صلب، وبعد ثاني Revision متتالٍ يظهر Complaint prompt.
- **Alternative — Dispute:** Complaint تحتاج سببًا ووصفًا إلزاميين ومرفقات اختيارية؛ إذا حُل الخلاف يعود المسار للمراجعة/التعديل، وإلا تنتهي Transaction = Disputed.
- **No response:** Reminder بعد 24h و48h، وعند 72h تصبح Pending Customer Approval — Overdue؛ لا Auto-Approval.
- **Terminal rule:** `Completed` هي النهاية الناجحة للTransaction؛ لا توجد حالة Transaction باسم `Closed`.
- **Related:** DEC-015/016/025/050/055/071/077.

---

## UC-07 — Rate Provider

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Beneficiary.
- **Precondition:** Beneficiary authenticated؛ Transaction `Completed` مع Provider نفسه وبفاتورة معتمدة.
- **Main flow:**
  1. يطلب YADD من Beneficiary تقييم Provider بعد Completed.
  2. يمكنه التقييم الآن أو اختيار Later؛ عند Later يرسل Reminder بعد 24h ويطلب الإكمال قبل Transaction جديدة.
  3. يحدد Overall Rating من 1 إلى 5 ويكمل Structured Textual Criteria المناسبة لنوع Provider.
  4. يمكن إضافة تعليق اختياري.
  5. يرسل التقييم، ويظهر للعامة First Name فقط مع Verified Transaction Review indicator.
- **Rule:** التقييم إلزامي بعد Completed وفق تجربة النظام الحالية، لكنه **Post-Transaction operation** ولا يغير Transaction status.
- **Related:** DEC-051/071/077.

---

## UC-07B — Provider Rates Beneficiary

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Provider.
- **Precondition:** Provider authenticated؛ Transaction `Completed` مع Beneficiary نفسه.
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
- **Related:** DEC-063/071/077.

---

## UC-08 — Block and Report User / Content

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** User.
- **Supporting actor:** YADD Administrator.
- **Precondition:** User authenticated؛ Guest لا ينفذ Block/Report قبل Authentication.
- **Main flow:**
  1. يحظر User الطرف الآخر لإيقاف التواصل/التعاملات الجديدة، مع بقاء Active Transaction وإجراءاتها وإشعاراتها إن وجدت.
  2. يستطيع تقديم Report مرتبطًا بمستخدم/محادثة/سلوك أو Portfolio/Catalog Item.
  3. يذهب Report للمراجعة الإدارية.
  4. يقرر الموظف المخول نتيجة بشرية مسجلة من No Violation/Warning/Content Removal/Temporary Restriction/Account Suspension/Permanent Ban وفق السياسة والأدلة.
- **Rule:** Report وحده لا يساوي إدانة أو حظرًا نهائيًا؛ Block وReport مستقلان، وUnblock لا يلغي Report سابقًا.
- **Related:** DEC-053/054/077.

---

## UC-09 — Service Provider Identity Verification / Provider Portal Eligibility

- **Status:** `ANALYZED_APPROVED` في الجوهر.
- **Primary actor:** User / prospective Service Provider.
- **Supporting actor:** YADD Administrator / Verification Reviewer.
- **Precondition:** User authenticated.
- **Main flow:**
  1. ينشئ User أو يكمل Provider Profile داخل الحساب نفسه.
  2. يحدد النشاط والمجال ومناطق الخدمة المطلوبة.
  3. إذا كان النوع SERVICE يرفع National ID أو Passport وصورة الوثيقة وصورة شخصية مع الوثيقة؛ إذا كان PRODUCT فلا يطلب Government ID في MVP.
  4. يمكن لـAI توليد مؤشرات مساعدة وفق حدود السياسة الحالية.
  5. يراجع موظف مخول حالة التحقق.
  6. القرار النهائي في Service Identity Verification بشري؛ عند Verified تتاح صلاحيات Service Provider حسب بقية الشروط. Product Provider يعتمد Account/Profile eligibility والاشتراك دون Identity Verified badge.
- **Open:** مدة الاحتفاظ والتراخيص الخاصة في `VER-RET-Q01 / VER-LIC-Q01`.
- **Related:** DEC-010/035..040/077/085.

---

## UC-10 — Manage Portfolio / Catalog

- **Status:** `ANALYZED_APPROVED`.
- **Primary actor:** Provider.
- **Precondition:** Provider authenticated.
- **Main flow:**
  1. يضيف Provider صورة لعمل/منتج مع وصف اختياري.
  2. يقر بحقه في نشر المحتوى.
  3. يحفظ YADD الأصل بصورة غير عامة.
  4. ينشئ نسخة عرض بعلامة مائية تعريفية مرتبطة بـYADD وحساب Provider.
  5. تظهر نسخة العرض في Provider Profile ويمكن عرض النسخة العامة للGuest وفق DEC-077.
- **Alternative:** يمكن لمستخدم authenticated الإبلاغ عن المحتوى المشتبه في انتحاله للمراجعة الإدارية.
- **Rule:** العلامة المائية ليست إثبات ملكية قانونية.
- **Related:** DEC-064/077.

---

## 2. Main Diagram Decomposition & UML Relationship Rules

> **Modeling correction / synchronization:** مواصفات `UC-00..UC-10` أعلاه تبقى مرجع السيناريوهات والتتبع، لكنها ليست خريطة 1:1 للأشكال البيضاوية في Main Use Case Diagram. بعض المواصفات تجمع أكثر من هدف Actor أو أكثر من مرحلة زمنية/Actor واحد، لذلك يفكك الرسم النهائي السيناريو إلى Use Cases أصغر دون تغيير المتطلبات أو القرارات.

### قاعدة اختيار العلاقة

- `<<include>>`: يستخدم فقط عندما يكون السلوك المضمّن جزءًا مطلوبًا من تنفيذ الـBase Use Case أو وظيفة مشتركة يجب تنفيذها داخلها.
- `<<extend>>`: يستخدم عندما يكون السلوك الإضافي شرطيًا/اختياريًا ويمكن للـBase Use Case أن يكتمل بدونه عند Extension Point مناسب.
- **Precondition / Postcondition / Constraint**: تستخدم للتبعيات الزمنية أو المعتمدة على حالة الكيان، ومنها Authentication للوظائف المحمية؛ ولا تحول تلقائيًا إلى `include` أو `extend`.
- **Actor Generalization**: `Service Provider` و`Product Provider` تخصصان من `Provider` عند الحاجة، ولا يلزم تكرارهما في Main Diagram وفق DEC-067/074.
- ظهور زر محمي للGuest هو UI behavior؛ لا يربط Guest مباشرة بالـprotected Use Case كأنه يملك صلاحية تنفيذها.

### Decomposed Use Cases for the Main Diagram

#### Guest
- `Browse Public Content`
- `Search Providers`
- `View Provider Profile`
- `View Portfolio / Catalog`
- `Log In`
- `Create Account`

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
- `Submit Service Provider Verification`
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
- `Review Service Provider Verification`
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
| `View Provider Profile → Search Providers` | `<<extend>>` | فتح ملف نتيجة بحث اختياري بعد ظهور النتائج | UC-00/01 / DEC-012/064/077 |
| `View Portfolio / Catalog → View Provider Profile` | `<<extend>>` | استعراض المعرض/الكتالوج جزء اختياري من استعراض الملف العام | UC-00/10 / DEC-064/077 |
| `Communicate / Inquire → View Provider Profile` | `<<extend>>` | الاستفسار في Direct Search اختياري بعد استعراض الملف، لكنه يتطلب Authentication | UC-01 / DEC-046/077 |
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

> `Log In` و`Create Account` لا يضافان كـ`<<include>>` إلى كل protected Use Case. Authentication يمثل Precondition للـauthenticated actor goals؛ أما عند Guest attempting protected CTA فالواجهة توجهه إلى Authentication وفق DEC-077.

### Dependencies that are **not** `include` / `extend`

| Use Case | Dependency | Modeling |
|---|---|---|
| Protected Beneficiary/Provider actions | User must be authenticated | Authentication Precondition; Guest CTA redirects to Log In/Create Account |
| `Rate Provider` | Transaction must already be `Completed`; rating then becomes required | `Precondition: Transaction = Completed` + Post-Transaction workflow |
| `Rate Beneficiary` | Transaction must already be `Completed`; Provider may skip | `Precondition: Transaction = Completed` |
| `Cancel Transaction` | Transaction must exist and be in a cancellable active state | Precondition / lifecycle rule |
| `Close Open Request` | Request is Open and no Provider has been selected | Precondition; not Transaction cancellation |
| `Edit Provider Response` / `Withdraw Provider Response` | Active response exists; Request Open; before selection | Precondition from DEC-070 |
| `Review Final Invoice` | Final Invoice is `Pending Customer Approval` | Precondition from DEC-050 |
| `Revise Final Invoice` | Beneficiary previously requested revision | Precondition / previous-event dependency |
| `Review Service Provider Verification` | Service Provider verification submission exists | Precondition; separate Admin goal, not included inside Provider submission |
| `Review Transaction Complaint` | Complaint exists | Precondition; asynchronous Admin goal |
| `Submit Provider Response` | Type-specific provider eligibility + Subscription Active | SERVICE requires Identity Verified; PRODUCT requires Account/Profile eligibility; enforced by `Validate Response Eligibility` |

> **Important:** وجود `Rate Provider` أو `Rate Beneficiary` كـUse Case مستقلة لا يعني أنهما متاحتان في أي وقت. استقلال الـActor goal عن الرسم الزمني شيء مختلف عن Lifecycle dependency؛ لذلك تمثل تبعية `Completed` كـPrecondition صريحة بدل استخدام `include/extend` بصورة غير صحيحة.

## 3. Open Use-Case Policies — Non-blocking for Core Diagrams

- `SAFE-REQ-Q01`: abuse thresholds.
- `TX-CONC-Q01`: concurrent transaction numerical limit if needed.
- `UX-VAL-Q01`: usability/low-connectivity validation.
- `VER-DOC-Q01 / VER-RET-Q01 / VER-LIC-Q01`: verification detail policies.
- `AI-*`: detailed moderation/provider/retention thresholds and appeal policy.
- `SUB-*`: subscription package/payment-proof/expiry behavior details.

هذه النقاط لا تمنع رسم Main Use Case Diagram وCore Activity/Sequence بالمنطق المعتمد الحالي.