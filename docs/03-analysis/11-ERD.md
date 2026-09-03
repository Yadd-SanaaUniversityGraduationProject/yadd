# Conceptual ERD — YADD Preliminary Defense

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-04`
>
> هذا ERD **مفاهيمي للفصل الثالث** وليس Relation Schema أو Database Design نهائيًا. الأنواع الفيزيائية، PK/FK التفصيلية، الفهارس، القيود التنفيذية وأسماء الجداول النهائية تنتقل إلى Chapter Four.
>
> **المراجع الحاكمة:** DEC-008..016/018/019/021/023..025/029..043/046..056/063..072 + `05-SRS.md` + `06-business-rules.md` + `07-lifecycles.md` + `08-use-cases.md`.
>
> جميع التسميات داخل الرسم النهائي تكون باللغة الإنجليزية وفق DEC-072.

---

## 1. مبادئ النمذجة الحالية

1. يوجد `USER` واحد للشخص؛ Beneficiary وProvider ليسا حسابين منفصلين.
2. يصبح المستخدم Provider عندما يمتلك `PROVIDER_PROFILE` مستوفيًا شروط التفعيل.
3. يمكن لـProvider Profile تشغيل Service Activity أو Product Activity أو كليهما.
4. يستخدم مسار الطلب النموذج `REQUEST → PROVIDER_RESPONSE → SELECTION → TRANSACTION` ولا يوجد `AGREEMENT` مستقل.
5. البحث المباشر يمكن أن ينشئ `TRANSACTION` دون `REQUEST` أو `PROVIDER_RESPONSE`، لكن فقط بعد `Request Transaction Start` وتأكيد الطرف الآخر.
6. الخدمة والمنتج يستخدمان Core Transaction واحدًا؛ الاختلاف يمثل عبر نوع النشاط/الطلب والبيانات المرتبطة به.
7. العربون لا يمثل كيانًا ماليًا؛ يوجد فقط `requires_deposit` ضمن Provider Response.
8. تقييم Beneficiary للمقدم وتقييم Provider للمستفيد نموذجان مختلفان في الحقول والقواعد، لذلك يمثَّلان ككيانين منفصلين مفاهيميًا.
9. Portfolio/Catalog يمثلان مفهوم عرض موحدًا عبر `SHOWCASE_ITEM` مع `item_type`.
10. `Completed` هي النهاية الناجحة للTransaction ولا توجد حالة Transaction باسم `Closed`.
11. لكل Provider استجابة فعالة واحدة فقط لكل Request؛ يمكن تعديلها أو سحبها قبل الاختيار وفق DEC-070.
12. Request واحد يمكن أن ينتج **صفر أو Transaction واحدة فقط**؛ لأن اختيار Provider واحد يغلق Request أمام الاستجابات الجديدة.

---

## 2. Core Conceptual ERD

```mermaid
erDiagram
    USER ||--o| PROVIDER_PROFILE : may_have

    PROVIDER_PROFILE ||--o{ PROVIDER_ACTIVITY : activates
    CATEGORY ||--o{ PROVIDER_ACTIVITY : classifies

    PROVIDER_PROFILE ||--o{ PROVIDER_SERVICE_AREA : serves
    AREA ||--o{ PROVIDER_SERVICE_AREA : covered_by

    PROVIDER_PROFILE ||--o{ SHOWCASE_ITEM : publishes

    USER ||--o{ REQUEST : creates
    CATEGORY ||--o{ REQUEST : classifies
    AREA ||--o{ REQUEST : locates

    REQUEST ||--o{ PROVIDER_RESPONSE : receives
    PROVIDER_PROFILE ||--o{ PROVIDER_RESPONSE : submits

    USER ||--o{ CONVERSATION : beneficiary_party
    PROVIDER_PROFILE ||--o{ CONVERSATION : provider_party
    REQUEST o|--o{ CONVERSATION : may_contextualize
    CONVERSATION ||--o{ MESSAGE : contains
    USER ||--o{ MESSAGE : sends

    USER ||--o{ TRANSACTION : beneficiary_party
    PROVIDER_PROFILE ||--o{ TRANSACTION : provider_party
    REQUEST o|--o| TRANSACTION : may_origin
    PROVIDER_RESPONSE o|--o| TRANSACTION : may_start
    CONVERSATION o|--o| TRANSACTION : may_link

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
      string verification_status
      string profile_status
    }

    PROVIDER_ACTIVITY {
      identifier provider_activity_id PK
      identifier provider_profile_id FK
      identifier category_id FK
      string activity_type
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
      identifier request_id FK_optional
      identifier transaction_id FK_optional
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
      identifier request_id FK_optional
      identifier selected_response_id FK_optional
      string origin_type
      string status
      string cancellation_reason
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
يمثل هوية Provider داخل الحساب نفسه. ترتبط به Verification، الأنشطة، مناطق الخدمة، Portfolio/Catalog والاشتراك.

### PROVIDER_ACTIVITY
يمثل نشاط Provider بدل `provider_type` مفرد يمنع الجمع بين Service وProduct. الشكل الفيزيائي النهائي لعدد السجلات يحسم في Chapter Four.

### CATEGORY / AREA / PROVIDER_SERVICE_AREA
- `CATEGORY` تصنيف النشاط/الطلب.
- `AREA` تمثل District/Neighborhood بصورة مفاهيمية parent-child.
- `PROVIDER_SERVICE_AREA` تمثل المناطق التي يخدمها Provider.
- الموقع الدقيق/GPS ليس بيانات عامة في هذا النموذج.

### SHOWCASE_ITEM
يوحد Portfolio وCatalog مفاهيميًا. يحتوي مرجعًا للأصل غير العام ومرجعًا لنسخة العرض ذات العلامة المائية. العلامة المائية تعريف/ردع وليست إثبات ملكية.

### REQUEST
يمثل طلب Service أو Product. يحتوي التصنيف والمنطقة والوصف والسعر الاسترشادي الاختياري. الصور/المرفقات مطلوبة وظيفيًا، لكن نموذج Media الفيزيائي يؤجل إلى Chapter Four.

### PROVIDER_RESPONSE
المصطلح القياسي بدل `OFFER`.

- يرتبط بـRequest واحد وProvider Profile واحد.
- يمكن أن يحتوي proposed price وملاحظة و`requires_deposit`.
- لا يوجد DepositAmount أو PaymentStatus أو Refund Entity.
- لكل Provider Response فعالة واحدة لكل Request.
- يجوز تعديلها أو سحبها فقط ما دام Request Open ولم يتم اختيار Provider.

### CONVERSATION / MESSAGE
المحادثة يمكن أن تبدأ قبل Transaction من Direct Search أو Request context. Chat وحدها لا تنشئ Transaction. في Direct Search يبدأ Transaction فقط بعد طلب بدء صريح وتأكيد الطرف الآخر.

### TRANSACTION
هو الكيان المركزي بعد بدء التعامل الرسمي.

يمكن أن ينشأ:

1. من Provider Response مختارة في Request Route.
2. مباشرة في Direct Search Route بعد Mutual Start Confirmation.

لذلك `request_id` و`selected_response_id` اختياريان مفاهيميًا، بينما Beneficiary وProvider إلزاميان.

الحالات النهائية بحسب المسار تشمل:

- `Completed` للنجاح بعد اعتماد الفاتورة.
- `Cancelled` عند الإلغاء وفق القواعد.
- `Disputed` بحسب مسار النزاع الحالي.

لا توجد حالة Transaction باسم `Closed`.

### INVOICE_VERSION / INVOICE_ITEM
يمثلان الاحتفاظ بتاريخ نسخ الفاتورة بدل الكتابة فوق نسخة واحدة.

- Transaction قد تحتوي عدة Invoice Versions.
- كل Invoice Version تحتوي بندًا واحدًا على الأقل.
- النسخة المعتمدة هي السجل النهائي للبنود والأسعار داخل YADD.
- عدم الرد لا يعد موافقة.

> الشكل الفيزيائي النهائي قد يكون `Invoice + InvoiceRevision` بدل `InvoiceVersion`; هذا Design Decision في Chapter Four، مع الحفاظ على المتطلب الأساسي: عدم فقدان تاريخ النسخ.

### PROVIDER_RATING
تقييم Beneficiary للمقدم بعد Transaction Completed:
- 1–5 stars.
- comment optional.
- بحد أقصى تقييم واحد للمقدم لكل Transaction.

### BENEFICIARY_RATING
تقييم Provider للمستفيد بعد Transaction Completed:
- optional.
- ثلاثة مؤشرات 1–5.
- comment optional.
- بحد أقصى تقييم واحد للمستفيد لكل Transaction.
- لا ينتج عقوبة آلية في MVP.

---

## 4. Supporting Trust / Administration ERD

```mermaid
erDiagram
    USER ||--o| PROVIDER_PROFILE : may_have

    PROVIDER_PROFILE ||--o{ VERIFICATION_CASE : submits
    VERIFICATION_CASE ||--|{ VERIFICATION_ARTIFACT : includes

    PROVIDER_PROFILE ||--o{ SUBSCRIPTION : has

    USER ||--o{ REPORT : submits
    PROVIDER_PROFILE o|--o{ REPORT : may_target_provider
    SHOWCASE_ITEM o|--o{ REPORT : may_target_content
    CONVERSATION o|--o{ REPORT : may_contextualize
    TRANSACTION o|--o{ REPORT : may_contextualize

    VERIFICATION_CASE {
      identifier verification_case_id PK
      identifier provider_profile_id FK
      string status
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

    REPORT {
      identifier report_id PK
      identifier reporter_user_id FK
      string target_type
      identifier target_reference
      string reason
      string status
      datetime created_at
    }
```

### Supporting-model notes

- أنواع وثائق الهوية الدقيقة: `VER-DOC-Q01 — Needs Verification`.
- مدة الاحتفاظ ببيانات التحقق: `VER-RET-Q01 — Needs Legal Verification`.
- تفاصيل باقات/أسعار/إثبات دفع الاشتراك: `SUB-PLAN-Q01 / SUB-PAY-Q01` مفتوحة.
- AI Flags/Audit physical tables لا تثبت قبل حسم provider/retention/threshold policies.
- `REPORT.target_reference` تمثيل مفاهيمي polymorphic؛ التنفيذ الفيزيائي قد يفصله إلى علاقات أكثر صرامة.

---

## 5. Removed Legacy Concepts

| Legacy Concept | Current Model |
|---|---|
| `ROLE / USER_ROLE` لتمييز Beneficiary/Provider | لا يستخدم لهذا الغرض؛ User واحد + optional Provider Profile. أدوار الإدارة/الصلاحيات تصمم منفصلة عند الحاجة. |
| `SERVICE_REQUEST` | `REQUEST` يغطي Service وProduct. |
| `OFFER` | `PROVIDER_RESPONSE`. |
| `AGREEMENT` | غير موجود كEntity مستقل في MVP. |
| Single mutable `INVOICE` | Invoice history محفوظ مفاهيميًا عبر versions/revisions. |
| Generic `REVIEW` | `PROVIDER_RATING` + `BENEFICIARY_RATING`. |
| `PORTFOLIO_ITEM` فقط | `SHOWCASE_ITEM` يدعم Portfolio/Catalog. |

---

## 6. Cardinality / Constraint Decisions for Chapter Four

هذه القواعد مستقرة بما يكفي لتتحول إلى Constraints عند Relation Schema:

1. `USER ↔ PROVIDER_PROFILE`: User يمتلك صفر أو Provider Profile واحدًا.
2. كل `REQUEST` ينشئه Beneficiary واحد ويرتبط بتصنيف ومنطقة عامة واحدة.
3. كل `PROVIDER_RESPONSE` ترتبط بـRequest واحد وProvider Profile واحد.
4. **لكل Provider استجابة فعالة واحدة فقط لكل Request** — Team Decision DEC-070.
5. يمكن تعديل/سحب Provider Response قبل Selection فقط — DEC-070.
6. في Request Route تصبح Provider Response واحدة فقط `Selected`.
7. **Request واحد ينتج صفر أو Transaction واحدة فقط**؛ اختيار Provider واحد يغلق Request — DEC-047/066/070.
8. كل `TRANSACTION` لها Beneficiary واحد وProvider واحد.
9. Direct Search Transaction قد تكون بلا Request/Provider Response — DEC-066/069.
10. Transaction الناتجة من Direct Search لا تنشأ إلا بعد Mutual Start Confirmation — DEC-069.
11. كل Invoice Version تنتمي إلى Transaction واحدة وتحتوي بندًا واحدًا على الأقل.
12. Transaction `Completed` تسمح Provider Rating واحدة بحد أقصى من Beneficiary.
13. Transaction `Completed` تسمح Beneficiary Rating واحدة بحد أقصى من Provider، وهي اختيارية.
14. Ratings لا تغير Transaction status بعد Completed — DEC-071.
15. لا توجد علاقة مالية للعربون داخل ERD — DEC-041.

---

## 7. Remaining Design Decisions / Needs Verification

هذه لا تمنع اعتماد Core Conceptual ERD، لكنها تمنع اعتبار Database Design الفيزيائي نهائيًا دون تحليل:

- Accepted identity document types / Verification Artifact details.
- Retention period for verification data, conversations and AI flags.
- Subscription plans/prices/payment-proof details.
- AI provider/threshold/storage model.
- Numeric request-expiry/reminder timing.
- Physical administrative authorization model.
- Shared `Media` table vs entity-specific media relations/references.
- Physical invoice-history implementation: `InvoiceVersion` vs `Invoice + InvoiceRevision`.
- Physical normalization of ProviderActivity.
- Physical implementation of polymorphic Reports.

---

## 8. Traceability Summary

| Concept | Requirement / Decision Basis |
|---|---|
| USER + optional ProviderProfile | DEC-008..011 |
| Service/Product Activity | DEC-029/030 |
| Category/Area/Service Areas | DEC-031..033/045 |
| Request | DEC-012/013/048/049 |
| Provider Response | DEC-013/014/041/047/066/070 |
| Conversation/Message | DEC-023/024/046/069 |
| Transaction | DEC-047/048/056/066/068/069/071 |
| Invoice versions/items | DEC-015/016/025/050/055/071 |
| Provider Rating | DEC-051/052/071 |
| Beneficiary Rating | DEC-063/071 |
| Showcase Item | DEC-064 |
| Verification Case | DEC-034..036 |
| Subscription | DEC-021/042/043 |
| Report | DEC-053/054 |

---

## 9. Core Analysis Gate Status

- [x] No `Agreement` entity.
- [x] Request موحد للخدمة والمنتج.
- [x] Provider Response هو المصطلح القياسي.
- [x] حساب User واحد + optional Provider Profile.
- [x] Service/Product Activity يمكن الجمع بينهما.
- [x] Direct Search can start Transaction without Request only after mutual confirmation.
- [x] RequiresDeposit Boolean only; no payment entities.
- [x] Invoice history represented conceptually.
- [x] Both rating directions represented separately.
- [x] `Completed` is terminal successful Transaction state; no `Closed` state.
- [x] One active Provider Response per Provider/Request is now approved.
- [x] Request produces at most one Transaction.
- [x] Portfolio/Catalog unified concept represented.
- [x] Verification/Subscription/Report represented as supporting model.
- [ ] Final visual ERD redraw in standard notation for supervisor delivery.
- [ ] Class Diagram derivation from this synchronized ERD.
- [ ] Relation Schema/Data Dictionary derivation in Chapter Four.

> **الحكم:** Core Conceptual ERD أصبح مستقرًا بما يكفي لاشتقاق Class Diagram والبدء في Relation Schema، مع إبقاء Design Decisions الفيزيائية المحددة في القسم 7 صريحة وغير مخمّنة.
