# Conceptual ERD — YADD Preliminary Defense

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-12`
>
> هذا ERD **مفاهيمي للفصل الثالث** وليس Relation Schema أو Database Design نهائيًا. الأنواع الفيزيائية، PK/FK التفصيلية، الفهارس، القيود التنفيذية وأسماء الجداول النهائية تنتقل إلى Chapter Four.
>
> **المراجع الحاكمة:** DEC-008..016/018/019/021/023..025/030..043/046..056/063..076 + `05-SRS.md` + `06-business-rules.md` + `07-lifecycles.md` + `08-use-cases.md`.
>
> جميع التسميات داخل الرسم النهائي تكون باللغة الإنجليزية وفق DEC-072.

---

## 1. مبادئ النمذجة الحالية

1. يوجد `USER` واحد للشخص؛ Beneficiary وProvider ليسا حسابين منفصلين.
2. يصبح المستخدم Provider عندما يمتلك `PROVIDER_PROFILE` مستوفيًا شروط التفعيل.
3. في MVP يكون كل Provider Profile من نوع واحد فقط: `SERVICE` أو `PRODUCT`، ولا يجمع النوعين معًا — DEC-074.
4. يمكن لـProvider Profile اختيار تصنيف واحد أو أكثر داخل نوعه عبر `PROVIDER_ACTIVITY`; يسمح Draft مؤقتًا بصفر Activities، لكن أهلية وظائف التقديم تتطلب Activity واحدة على الأقل، وكل Category يجب أن تتوافق مع Provider Type — DEC-076.
5. يستخدم مسار الطلب النموذج `REQUEST → PROVIDER_RESPONSE → SELECTION → TRANSACTION` ولا يوجد `AGREEMENT` مستقل.
6. البحث المباشر يمكن أن ينشئ `TRANSACTION` دون `REQUEST` أو `PROVIDER_RESPONSE`، لكن فقط بعد `Request Transaction Start` وتأكيد الطرف الآخر.
7. الخدمة والمنتج يستخدمان Core Transaction واحدًا؛ الاختلاف يمثل عبر نوع المقدم/الطلب والبيانات المرتبطة به.
8. العربون لا يمثل كيانًا ماليًا؛ يوجد فقط `requires_deposit` ضمن Provider Response.
9. تقييم Beneficiary للمقدم وتقييم Provider للمستفيد نموذجان مختلفان في الحقول والقواعد، لذلك يمثَّلان ككيانين منفصلين مفاهيميًا.
10. Portfolio/Catalog يمثلان مفهوم عرض موحدًا عبر `SHOWCASE_ITEM` مع اختلاف العرض حسب Provider Type.
11. `Completed` هي النهاية الناجحة للTransaction ولا توجد حالة Transaction باسم `Closed`.
12. `Disputed` نهاية غير ناجحة للTransaction عند استمرار خلاف الفاتورة قبل الاعتماد دون اتفاق؛ لا تفتح Ratings — DEC-073.
13. لكل Provider استجابة فعالة واحدة فقط لكل Request؛ يمكن تعديلها أو سحبها قبل الاختيار وفق DEC-070.
14. Request واحد يمكن أن ينتج **صفر أو Transaction واحدة فقط**؛ لأن اختيار Provider واحد يغلق Request أمام الاستجابات الجديدة.
15. بين نفس Beneficiary ونفس Provider توجد Conversation واحدة مستمرة يمكن أن ترتبط بعدة Transactions عبر الزمن، مع فواصل/أحداث واضحة داخل المحادثة — DEC-075.
16. مراجعة النزاع إداريًا تستخدم `REPORT`/complaint context ولا تنشئ كيان Payment/Refund/Compensation أو سلطة تسوية مالية داخل YADD.
17. علاقات الأحياء المجاورة مفهوم معتمد ومُدار داخل YADD؛ يمثلها `AREA_ADJACENCY` دون افتراض GPS Radius.
18. `Block User` و`Report` مفهومان مستقلان؛ يمثل `USER_BLOCK` علاقة الحظر المباشر ولا يعني إنشاء Report أو إدانة الطرف الآخر.
19. عند Transaction Cancellation يجب الاحتفاظ بالطرف الذي ألغى والسبب والتوقيت؛ تبقى طريقة التخزين الفيزيائية قرار تصميم لاحق.
20. `SAFETY_FLAG` و`ADMIN_AUDIT_RECORD` مفهومان داعمان معتمدان من Trust & Safety / D8؛ تمثيلهما هنا مفاهيمي فقط، بينما schema التخزين والاحتفاظ والـthresholds تبقى قرارات تصميم/سياسة مفتوحة.
21. يجب أن يحفظ `SAFETY_FLAG` سبب/فئة الاشتباه بما يكفي للمراجعة البشرية؛ قائمة الفئات وقيم المخاطر والعتبات التفصيلية لا تزال مفتوحة.

---

## 2. Core Conceptual ERD

```mermaid
erDiagram
    USER ||--o| PROVIDER_PROFILE : may_have

    PROVIDER_PROFILE ||--o{ PROVIDER_ACTIVITY : defines
    CATEGORY ||--o{ PROVIDER_ACTIVITY : classifies

    PROVIDER_PROFILE ||--o{ PROVIDER_SERVICE_AREA : serves
    AREA ||--o{ PROVIDER_SERVICE_AREA : covered_by
    AREA ||--o{ AREA_ADJACENCY : source_area
    AREA ||--o{ AREA_ADJACENCY : adjacent_area

    PROVIDER_PROFILE ||--o{ SHOWCASE_ITEM : publishes

    USER ||--o{ REQUEST : creates
    CATEGORY ||--o{ REQUEST : classifies
    AREA ||--o{ REQUEST : locates

    REQUEST ||--o{ PROVIDER_RESPONSE : receives
    PROVIDER_PROFILE ||--o{ PROVIDER_RESPONSE : submits

    USER ||--o{ CONVERSATION : beneficiary_party
    PROVIDER_PROFILE ||--o{ CONVERSATION : provider_party
    CONVERSATION ||--o{ MESSAGE : contains
    USER ||--o{ MESSAGE : sends

    USER ||--o{ TRANSACTION : beneficiary_party
    PROVIDER_PROFILE ||--o{ TRANSACTION : provider_party
    REQUEST o|--o| TRANSACTION : may_origin
    PROVIDER_RESPONSE o|--o| TRANSACTION : may_start
    CONVERSATION ||--o{ TRANSACTION : groups

    TRANSACTION ||--o{ INVOICE_VERSION : has
    INVOICE_VERSION ||--|{ INVOICE_ITEM : contains

    TRANSACTION ||--o| PROVIDER_RATING : provider_rating
    USER ||--o{ PROVIDER_RATING : writes
    PROVIDER_PROFILE ||--o{ PROVIDER_RATING : receives

    TRANSACTION ||--o| BENEFICIARY_RATING : beneficiary_rating
    PROVIDER_PROFILE ||--o{ BENEFICIARY_RATING : writes
    USER ||--o{ BENEFICIARY_RATING : receives

    USER {
      identifier user_id PK
      string account_status
      string full_name
      string phone
    }

    PROVIDER_PROFILE {
      identifier provider_profile_id PK
      identifier user_id FK
      string provider_type
      string verification_status
      string profile_status
    }

    PROVIDER_ACTIVITY {
      identifier provider_activity_id PK
      identifier provider_profile_id FK
      identifier category_id FK
      string status
    }

    CATEGORY {
      identifier category_id PK
      string name
      string category_type
    }

    AREA {
      identifier area_id PK
      identifier parent_area_id FK
      string name
      string area_type
    }

    PROVIDER_SERVICE_AREA {
      identifier provider_profile_id FK
      identifier area_id FK
    }

    AREA_ADJACENCY {
      identifier source_area_id FK
      identifier adjacent_area_id FK
    }

    SHOWCASE_ITEM {
      identifier showcase_item_id PK
      identifier provider_profile_id FK
      string item_type
      string description
      string original_media_reference
      string display_media_reference
      string status
    }

    REQUEST {
      identifier request_id PK
      identifier beneficiary_user_id FK
      identifier category_id FK
      identifier area_id FK
      string request_type
      string description
      decimal indicative_price
      string status
    }

    PROVIDER_RESPONSE {
      identifier response_id PK
      identifier request_id FK
      identifier provider_profile_id FK
      decimal proposed_price
      boolean requires_deposit
      string note
      string status
    }

    CONVERSATION {
      identifier conversation_id PK
      identifier beneficiary_user_id FK
      identifier provider_profile_id FK
      string status
    }

    MESSAGE {
      identifier message_id PK
      identifier conversation_id FK
      identifier sender_user_id FK
      string message_type
      datetime sent_at
    }

    TRANSACTION {
      identifier transaction_id PK
      identifier beneficiary_user_id FK
      identifier provider_profile_id FK
      identifier conversation_id FK
      identifier request_id FK_optional
      identifier selected_response_id FK_optional
      string origin_type
      string status
      string cancellation_actor_role
      string cancellation_reason
      datetime cancelled_at
    }

    INVOICE_VERSION {
      identifier invoice_version_id PK
      identifier transaction_id FK
      int version_number
      string status
      decimal total_amount
      string revision_note
    }

    INVOICE_ITEM {
      identifier invoice_item_id PK
      identifier invoice_version_id FK
      string description
      decimal quantity
      decimal unit_price
      decimal line_total
    }

    PROVIDER_RATING {
      identifier provider_rating_id PK
      identifier transaction_id FK
      identifier beneficiary_user_id FK
      identifier provider_profile_id FK
      int stars
      string comment
    }

    BENEFICIARY_RATING {
      identifier beneficiary_rating_id PK
      identifier transaction_id FK
      identifier provider_profile_id FK
      identifier beneficiary_user_id FK
      int request_communication_score
      int agreement_commitment_score
      int cooperation_score
      string comment
    }
```

---

## 3. Core Entity Semantics

### USER
يمثل حساب الشخص الواحد في YADD. يمكن أن يعمل الشخص كمستفيد مباشرة، ويمكنه امتلاك Provider Profile واحد كحد أقصى.

### PROVIDER_PROFILE
يمثل هوية Provider داخل الحساب نفسه. يحدد `provider_type` نوعًا واحدًا فقط في MVP: `SERVICE` أو `PRODUCT` وفق DEC-074. ترتبط به Verification، الأنشطة/التصنيفات، مناطق الخدمة، Portfolio/Catalog والاشتراك. سياسة تغيير النوع بعد اختياره لم تعتمد بعد.

### PROVIDER_ACTIVITY
يمثل ارتباط Provider Profile بتصنيف داخل نوعه المختار. يمكن للملف أن يمتلك عدة Provider Activities، لكن يجب أن تتوافق جميع Categories مع `provider_type`. يسمح Draft بصفر Activities مؤقتًا، بينما أهلية وظائف التقديم تتطلب Activity واحدة على الأقل وفق DEC-076.

### CATEGORY / AREA / PROVIDER_SERVICE_AREA / AREA_ADJACENCY
- `CATEGORY` تصنيف النشاط/الطلب، وله `category_type` يجب أن يتوافق مع نوع Provider Profile عند استخدامه في ProviderActivity.
- `AREA` تمثل District/Neighborhood بصورة مفاهيمية parent-child.
- `PROVIDER_SERVICE_AREA` تمثل المناطق التي يخدمها Provider.
- `AREA_ADJACENCY` تمثل قائمة الجوار المُدارة بين الأحياء وفق DEC-033؛ العلاقة المنطقية جوار متبادل، بينما طريقة فرض symmetry/uniqueness في قاعدة البيانات تؤجل إلى Chapter Four.
- الموقع الدقيق/GPS ليس بيانات عامة في هذا النموذج.

### SHOWCASE_ITEM
يوحد Portfolio وCatalog مفاهيميًا. إذا كان Provider Type = SERVICE يعرض كPortfolio، وإذا كان PRODUCT يعرض كProduct Catalog. يحتوي مرجعًا للأصل غير العام ومرجعًا لنسخة العرض ذات العلامة المائية.

### REQUEST
يمثل طلب Service أو Product. يجب أن يتوافق `request_type` مع نوع Provider المؤهل، ويجب أن يملك Provider تصنيف الطلب ضمن Provider Activities. يحتوي التصنيف والمنطقة والوصف والسعر الاسترشادي الاختياري.

### PROVIDER_RESPONSE
المصطلح القياسي بدل `OFFER`.

- يرتبط بـRequest واحد وProvider Profile واحد.
- يجب أن يكون نوع Provider Profile متوافقًا مع نوع Request، وأن يكون Provider مؤهلًا لتصنيف الطلب.
- يمكن أن يحتوي proposed price وملاحظة و`requires_deposit`.
- لا يوجد DepositAmount أو PaymentStatus أو Refund Entity.
- لكل Provider Response فعالة واحدة لكل Request.
- يجوز تعديلها أو سحبها فقط ما دام Request Open ولم يتم اختيار Provider.

### CONVERSATION / MESSAGE
المحادثة يمكن أن تبدأ قبل Transaction من Direct Search أو Request context. Chat وحدها لا تنشئ Transaction. في Direct Search يبدأ Transaction فقط بعد طلب بدء صريح وتأكيد الطرف الآخر.

وفق DEC-075، تبقى Conversation واحدة مستمرة بين نفس Beneficiary ونفس Provider، ويمكن أن تضم صفرًا أو عدة Transactions عبر الزمن. يجب أن تظهر داخلها فواصل/أحداث نظام واضحة لبدء وانتهاء كل Transaction.

القيد المفاهيمي هو **`{unique Conversation per Beneficiary–Provider pair}`**. طريقة فرض uniqueness فعليًا، وكذلك ربط Message/System Event بمعاملة محددة، تؤجل إلى Chapter Four.

> لا يفرض Core ERD علاقة مباشرة بين `REQUEST` و`CONVERSATION`: قد تبدأ أو تستمر المحادثة في سياق Request، لكن نفس Conversation المستمرة قد تمر بعدة Request contexts عبر الزمن. طريقة تمثيل وربط تلك السياقات تؤجل إلى Physical/Interaction Design في Chapter Four دون كسر القرار المفاهيمي أعلاه.

### TRANSACTION
هو الكيان المركزي بعد بدء التعامل الرسمي.

يمكن أن ينشأ:
1. من Provider Response مختارة في Request Route.
2. مباشرة في Direct Search Route بعد Mutual Start Confirmation.

كل Transaction ترتبط بالمحادثة المستمرة بين الطرفين. `request_id` و`selected_response_id` اختياريان مفاهيميًا، بينما Beneficiary وProvider وConversation إلزاميون.

الحالات النهائية بحسب المسار تشمل:
- `Completed` للنجاح بعد اعتماد الفاتورة.
- `Cancelled` عند الإلغاء وفق القواعد.
- `Disputed` عند استمرار الخلاف قبل اعتماد الفاتورة وعدم الوصول إلى اتفاق — DEC-073.

عند الإلغاء يسجل YADD الطرف الذي ألغى والسبب والتوقيت وفق DEC-048/BR-019.

### INVOICE_VERSION / INVOICE_ITEM
يمثلان الاحتفاظ بتاريخ نسخ الفاتورة بدل الكتابة فوق نسخة واحدة.

### PROVIDER_RATING
تقييم Beneficiary للمقدم بعد Transaction Completed: 1–5 stars، comment optional، وبحد أقصى تقييم واحد لكل Transaction.

### BENEFICIARY_RATING
تقييم Provider للمستفيد بعد Transaction Completed: optional، ثلاثة مؤشرات 1–5، comment optional، وبحد أقصى تقييم واحد لكل Transaction.

---

## 4. Supporting Trust / Administration ERD

```mermaid
erDiagram
    USER ||--o| PROVIDER_PROFILE : may_have

    PROVIDER_PROFILE ||--o{ VERIFICATION_CASE : submits
    VERIFICATION_CASE ||--|{ VERIFICATION_ARTIFACT : includes

    PROVIDER_PROFILE ||--o{ SUBSCRIPTION : has

    USER ||--o{ USER_BLOCK : creates
    USER ||--o{ USER_BLOCK : is_target_of

    USER ||--o{ REPORT : submits
    USER o|--o{ REPORT : may_target_user
    PROVIDER_PROFILE o|--o{ REPORT : may_target_provider
    SHOWCASE_ITEM o|--o{ REPORT : may_target_content
    CONVERSATION o|--o{ REPORT : may_contextualize
    TRANSACTION o|--o{ REPORT : may_contextualize

    VERIFICATION_CASE {
      identifier verification_case_id PK
      identifier provider_profile_id FK
      string status
      string review_note
      datetime submitted_at
      datetime reviewed_at
    }

    VERIFICATION_ARTIFACT {
      identifier artifact_id PK
      identifier verification_case_id FK
      string artifact_type
      string private_media_reference
      string review_status
    }

    SUBSCRIPTION {
      identifier subscription_id PK
      identifier provider_profile_id FK
      string status
      date start_date
      date end_date
    }

    USER_BLOCK {
      identifier block_id PK
      identifier blocker_user_id FK
      identifier blocked_user_id FK
    }

    REPORT {
      identifier report_id PK
      identifier reporter_user_id FK
      string target_type
      identifier target_reference
      string reason
      string status
      datetime created_at
    }

    SAFETY_FLAG {
      identifier flag_id PK
      string target_type
      identifier target_reference
      string risk_level
      string reason_category
    }

    ADMIN_AUDIT_RECORD {
      identifier audit_record_id PK
      string subject_type
      identifier subject_reference
      string event_type
      datetime recorded_at
    }
```

### Supporting-model notes

- `USER_BLOCK` يمثل Block كعلاقة حماية مباشرة مستقلة عن `REPORT`.
- `REPORT.target_reference` تمثيل مفاهيمي polymorphic؛ التنفيذ الفيزيائي قد يفصله إلى علاقات أكثر صرامة.
- `VERIFICATION_CASE.review_note` يمثل الملاحظة/السبب عند طلب إعادة التقديم أو الرفض.
- `SAFETY_FLAG.reason_category` يمثل سبب/فئة الاشتباه المطلوبة للمراجعة البشرية؛ taxonomy والـthresholds لم تعتمد بعد.
- `SAFETY_FLAG` و`ADMIN_AUDIT_RECORD` مفاهيم تحليلية؛ schema/retention/thresholds لم تعتمد بعد.

---

## 5. Removed Legacy Concepts

| Legacy Concept | Current Model |
|---|---|
| `ROLE / USER_ROLE` لتمييز Beneficiary/Provider | لا يستخدم لهذا الغرض؛ User واحد + optional Provider Profile. |
| `SERVICE_REQUEST` | `REQUEST` يغطي Service وProduct. |
| `OFFER` | `PROVIDER_RESPONSE`. |
| `AGREEMENT` | غير موجود كEntity مستقل في MVP. |
| Single mutable `INVOICE` | Invoice history محفوظ مفاهيميًا عبر versions/revisions. |
| Generic `REVIEW` | `PROVIDER_RATING` + `BENEFICIARY_RATING`. |
| `PORTFOLIO_ITEM` فقط | `SHOWCASE_ITEM` يدعم Portfolio/Catalog وفق Provider Type. |
| Service + Product active together on one Provider Profile | غير مسموح في MVP وفق DEC-074. |

---

## 6. Cardinality / Constraint Decisions for Chapter Four

1. `USER ↔ PROVIDER_PROFILE`: User يمتلك صفر أو Provider Profile واحدًا.
2. Provider Profile له نوع واحد فقط `SERVICE` أو `PRODUCT` — DEC-074.
3. Draft Provider Profile يمكن أن يمتلك صفر أو عدة Provider Activities، لكن أهلية وظائف التقديم تتطلب Provider Activity واحدة على الأقل — DEC-076.
4. يمكن لـProvider Profile امتلاك عدة Provider Activities/تصنيفات داخل نوعه، وكل Provider Activity ترتبط بـCategory واحدة متوافقة مع Provider Type — DEC-076.
5. كل `REQUEST` ينشئه Beneficiary واحد ويرتبط بتصنيف ومنطقة عامة واحدة.
6. كل `PROVIDER_RESPONSE` ترتبط بـRequest واحد وProvider Profile واحد ويجب أن يتوافق نوعهما وتصنيفهما.
7. لكل Provider استجابة فعالة واحدة فقط لكل Request — DEC-070.
8. في Request Route تصبح Provider Response واحدة فقط `Selected`.
9. Request واحد ينتج صفر أو Transaction واحدة فقط.
10. كل `TRANSACTION` لها Beneficiary واحد وProvider واحد وConversation واحدة.
11. Conversation واحدة بين نفس الطرفين يمكن أن ترتبط بعدة Transactions عبر الزمن — DEC-075.
12. يجب أن يكون زوج `(beneficiary_user_id, provider_profile_id)` فريدًا مفاهيميًا داخل `CONVERSATION`; آلية فرضه الفيزيائية تحسم في Chapter Four.
13. Direct Search Transaction قد تكون بلا Request/Provider Response — DEC-066/069.
14. Transaction الناتجة من Direct Search لا تنشأ إلا بعد Mutual Start Confirmation — DEC-069.
15. كل Invoice Version تنتمي إلى Transaction واحدة وتحتوي بندًا واحدًا على الأقل.
16. Transaction `Completed` تسمح Provider Rating واحدة بحد أقصى من Beneficiary.
17. Transaction `Completed` تسمح Beneficiary Rating واحدة بحد أقصى من Provider، وهي اختيارية.
18. Transaction `Disputed` لا تسمح Ratings — DEC-073.
19. `AREA_ADJACENCY` يمثل علاقة جوار مُدارة بين الأحياء.
20. `USER_BLOCK` و`REPORT` مستقلان — DEC-053.
21. Transaction Cancellation تسجل Actor/Reason/Time — DEC-048 / BR-019.

---

## 7. Remaining Design Decisions / Needs Verification

- Provider Type switching policy after initial selection.
- Accepted identity document types / Verification Artifact details.
- Retention period for verification data, conversations and AI flags.
- Subscription plans/prices/payment-proof details.
- AI provider/threshold/storage model and final reason-category taxonomy.
- Numeric request-expiry/reminder timing.
- Physical enforcement of Conversation pair uniqueness and Message/SystemEvent↔Transaction mapping.
