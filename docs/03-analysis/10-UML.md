# UML Models — YADD Preliminary Defense

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — SYNCHRONIZED 2026-09-04`
>
> **المراجع الحاكمة:** DEC-046/047/048/050/051/063/064/066/067/068/069/070/071/072 + `05-SRS.md` + `06-business-rules.md` + `07-lifecycles.md` + `08-use-cases.md`.
>
> يستخدم المشروع DFD وUML معًا وفق DEC-060. جميع التسميات داخل المخططات باللغة الإنجليزية وفق DEC-072. هذه النماذج تمثل الحالة الحالية للمراجعة مع المشرف وليست Baseline نهائيًا.

## 1. Actor Model

### Actors العامة في المخطط الرئيسي

- `Beneficiary` — المستفيد.
- `Provider` — المقدم.
  - `Service Provider` — تخصص من Provider عند الحاجة.
  - `Product Provider` — تخصص من Provider عند الحاجة.
- `YADD Administrator` — تمثيل عام للأعمال الإدارية في المخطط الرئيسي.

### أدوار إدارية تفصيلية

- `Verification Reviewer`.
- `Content Moderator`.
- `Subscription Administrator`.

استخدام `YADD Administrator` في الرسم الرئيسي هو تبسيط نمذجي فقط ولا يعني أن موظفًا واحدًا يجب أن يمتلك جميع الصلاحيات.

---

## 2. Main Use Case Diagram — Working Representation

> ملاحظة: Mermaid لا يوفر ترميز UML Use Case البيضاوي الأصلي؛ لذلك يمثل الرسم التالي **العلاقات ومحتوى System Boundary** بصورة عمل، ويجب عند إخراج النسخة الأكاديمية النهائية رسم الحالات بأشكال Use Case القياسية دون تغيير العلاقات الموضحة هنا.

```mermaid
flowchart LR
    B[Beneficiary]
    P[Provider]
    A[YADD Administrator]

    subgraph YADD[YADD System]
        UC1([Register / Login / Manage Account])
        UC2([Search Providers])
        UC3([View Provider Profile & Portfolio/Catalog])
        UC4([Create Request])
        UC5([Compare Provider Responses])
        UC6([Chat / Inquire])
        UC7([Select Provider])
        UC8([Manage Active Transaction])
        UC9([Approve Invoice / Request Revision])
        UC10([Rate Provider])
        UC11([Block / Report User or Content])

        UC12([Manage Provider Profile])
        UC13([Submit Verification])
        UC14([Manage Portfolio / Catalog])
        UC15([Set Service Areas])
        UC16([View Matching Requests])
        UC17([Respond to Request])
        UC18([Indicate Deposit Required])
        UC19([Create / Revise Final Invoice])
        UC20([Optionally Rate Beneficiary])

        UC21([Review Provider Verification])
        UC22([Review Reports / Flags])
        UC23([Manage Provider Subscription Status])
    end

    B --- UC1
    B --- UC2
    B --- UC3
    B --- UC4
    B --- UC5
    B --- UC6
    B --- UC7
    B --- UC8
    B --- UC9
    B --- UC10
    B --- UC11

    P --- UC1
    P --- UC6
    P --- UC8
    P --- UC11
    P --- UC12
    P --- UC13
    P --- UC14
    P --- UC15
    P --- UC16
    P --- UC17
    P --- UC18
    P --- UC19
    P --- UC20

    A --- UC21
    A --- UC22
    A --- UC23
```

### ملاحظات على الرسم

1. `Service Provider` و`Product Provider` يرثان الوظائف العامة من `Provider`، ويمكن إظهارهما كتخصصين في نسخة UML الرسومية النهائية إذا احتاج المشرف ذلك.
2. `Guest` غير موجود في النموذج الحالي؛ لم يعتمد Actor مستقل للتصفح العام.
3. `Agreement` ليس Use Case أو Entity مستقلًا في MVP الحالي؛ المسار المعتمد هو `Request → Provider Response → Selection → Transaction`.
4. `Indicate Deposit Required` يعني فقط `RequiresDeposit = Yes/No` ولا يتضمن مبلغًا أو دفعًا أو Refund داخل YADD.
5. تقييم المستفيد للمقدم إلزامي بعد اكتمال المعاملة، وتقييم المقدم للمستفيد اختياري.
6. في البحث المباشر يمكن لأي طرف طلب بدء المعاملة، والطرف الآخر يجب أن يؤكد قبل إنشاء Active Transaction.

---

## 3. Activity Diagram — Published Request to Post-Transaction Ratings

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Creates Request]
    A --> B{Request Data Valid?}
    B -- No --> A
    B -- Yes --> C[Publish Open Request]
    C --> D[Eligible Providers View Request]
    D --> E[Provider Submits Provider Response]
    E --> E1[Optional Proposed Price / Note]
    E1 --> E2[Set RequiresDeposit Yes or No]
    E2 --> F[Beneficiary Views and Compares Responses]
    F --> G{Needs Inquiry Before Selection?}
    G -- Yes --> H[Private Chat / Inquiry]
    H --> F
    G -- No --> I{Select Provider?}
    I -- No --> F
    I -- Yes --> J[Close Request to New Responses]
    J --> K[Mark Other Responses NotSelected]
    K --> L[Create Active Transaction]
    L --> M{Transaction Cancelled?}
    M -- Yes --> N[Record Cancellation Actor, Reason and Time]
    N --> Z([End — Cancelled])
    M -- No --> O[Provider Performs Service / Prepares Product]
    O --> P[Provider Creates Final Invoice]
    P --> Q[Invoice Pending Customer Approval]
    Q --> R{Beneficiary Decision}
    R -- Request Revision --> T[Record Revision Note]
    T --> U[Provider Revises Invoice]
    U --> Q
    R -- Dispute --> V[Raise Complaint for Administrative Review]
    V --> Z2([End — Disputed])
    R -- Approve --> W[Invoice Approved / Transaction Completed]
    W --> X[Beneficiary Rates Provider — Required]
    X --> Y{Provider Wants to Rate Beneficiary?}
    Y -- Yes --> Y1[Rate 3 Behavioral Indicators + Optional Comment]
    Y1 --> ZE([End — Post-Transaction Flow Complete])
    Y -- No --> ZE
```

### حدود النشاط

- `Completed` هي الحالة النهائية الناجحة للـTransaction؛ عقد التقييمات هنا يمثل Post-Transaction workflow ولا يغيّر Transaction Status إلى `Closed`.
- أي دفع أو عربون أو استرداد يتم خارج YADD.
- عدم الرد على الفاتورة لا يعد موافقة ولا يوجد Auto-Approval.
- لا يوجد `Agreement` مستقل ولا Change Order مستقل في MVP.
- تقييم المقدم للمستفيد لا ينتج عقوبة آلية.

---

## 4. Activity Diagram — Direct Search Route to Active Transaction

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Searches by Category and Area]
    A --> B[View Provider Profile and Portfolio/Catalog]
    B --> C{Start Inquiry?}
    C -- No --> Z([End])
    C -- Yes --> D[Private Chat / Inquiry]
    D --> E[Either Party Requests Transaction Start]
    E --> F{Other Party Confirms?}
    F -- No --> D
    F -- Yes --> G[Create Active Transaction]
    G --> H[Continue Through Common Transaction / Invoice Flow]
    H --> Z2([End])
```

المحادثة وحدها لا تنشئ Transaction؛ يلزم `Request Transaction Start` من أحد الطرفين ثم تأكيد الطرف الآخر وفق DEC-069.

---

## 5. Sequence Diagram — Published Request Route

```mermaid
sequenceDiagram
    actor B as Beneficiary
    participant Y as YADD Backend/API
    actor P as Provider
    participant DB as Database

    B->>Y: Create and publish request
    Y->>DB: Save Request = Open
    Y-->>P: Expose matching request

    P->>Y: Submit Provider Response
    Note over P,Y: Proposed price/note optional
RequiresDeposit = Yes/No only
    Y->>DB: Save active response
    Y-->>B: Show response for comparison

    opt Provider edits or withdraws before selection
        P->>Y: Edit / withdraw active response
        Y->>DB: Update active response state
        Y-->>B: Refresh response information
    end

    opt Inquiry before selection
        B->>Y: Send message
        Y-->>P: Deliver private message
        P->>Y: Reply
        Y-->>B: Deliver reply
    end

    B->>Y: Select provider
    Y->>DB: Request = Matched
Other responses = NotSelected
Create Active Transaction
    Y-->>P: Provider selected / transaction active
    Y-->>B: Transaction active

    alt Transaction cancelled before final invoice
        B->>Y: Cancel + reason
        Y->>DB: Save Cancelled + actor + reason + time
        Y-->>P: Cancellation recorded
    else Work completed / product prepared
        P->>Y: Submit final invoice
        Y->>DB: Save invoice = PendingCustomerApproval
        Y-->>B: Request invoice review

        alt Request revision
            B->>Y: Request revision + note
            Y-->>P: Revision requested
            P->>Y: Submit revised invoice
            Y-->>B: Show revised invoice
        else Approve
            B->>Y: Approve final invoice
            Y->>DB: Invoice = Final
Transaction = Completed
            Y-->>B: Require Provider rating
            B->>Y: Submit provider rating 1-5 + optional comment
            Y->>DB: Save provider rating
            Y-->>P: Show optional beneficiary rating prompt
            opt Provider chooses to rate beneficiary
                P->>Y: Submit 3 behavioral scores + optional comment
                Y->>DB: Save beneficiary interaction rating
            end
            Note over B,P: Transaction remains Completed
        end
    end
```

---

## 6. Sequence Diagram — Direct Search Route

```mermaid
sequenceDiagram
    actor B as Beneficiary
    participant Y as YADD Backend/API
    actor P as Provider
    participant DB as Database

    B->>Y: Search providers by category/area
    Y->>DB: Query eligible providers
    DB-->>Y: Matching Provider Profiles
    Y-->>B: Results

    B->>Y: Open Provider Profile
    Y->>DB: Load public profile + Portfolio/Catalog
    DB-->>Y: Public provider data
    Y-->>B: Show profile and watermarked display images

    B->>Y: Start private inquiry
    Y-->>P: Deliver inquiry
    P->>Y: Reply
    Y-->>B: Deliver reply

    alt Beneficiary requests transaction start
        B->>Y: Request Transaction Start
        Y-->>P: Request Start Confirmation
        P->>Y: Confirm Transaction Start
        Y->>DB: Create Active Transaction
        Y-->>B: Transaction active
        Y-->>P: Transaction active
    else Provider requests transaction start
        P->>Y: Request Transaction Start
        Y-->>B: Request Start Confirmation
        B->>Y: Confirm Transaction Start
        Y->>DB: Create Active Transaction
        Y-->>B: Transaction active
        Y-->>P: Transaction active
    else No confirmation
        Note over B,P: Chat continues or ends without Transaction
    end
```

---

## 7. Class Diagram — Deferred Until ERD Synchronization

الـClass Diagram القديم كان يعتمد `Offer → Agreement → Invoice/Review` ولذلك لم يعد صالحًا بعد DEC-066.

**الحالة:** `READY TO REBUILD FROM SYNCHRONIZED ERD`.

سيشتق Class Diagram الجديد من `11-ERD.md` مع مراعاة DEC-069/070/071. الحد الأدنى المتوقع للمراجعة يشمل:

- User / roles or permissions.
- ProviderProfile and provider activities.
- Request.
- ProviderResponse.
- Transaction.
- Invoice and invoice revisions/items.
- Provider rating and beneficiary interaction rating.
- Portfolio/Catalog items and media.
- Category / Area.
- Verification / Subscription / Report entities بالقدر المثبت في SRS.

---

## 8. Review Checklist Before Supervisor Delivery

- [x] لا يستخدم `Customer` بدل `Beneficiary`.
- [x] لا يستخدم `Offer` كالمصطلح الرئيسي؛ المصطلح القياسي `Provider Response`.
- [x] لا يوجد `Agreement` مستقل.
- [x] اختيار Provider Response يبدأ Transaction في مسار الطلب.
- [x] Provider Response واحدة فعالة لكل Provider/Request ويمكن تعديلها أو سحبها قبل الاختيار.
- [x] البحث المباشر يستخدم Request Start + Other Party Confirmation قبل Transaction.
- [x] العربون معلومة Yes/No فقط والدفع خارجي.
- [x] Invoice approval يؤدي إلى Transaction Completed.
- [x] `Completed` هي النهاية الناجحة للـTransaction ولا توجد Transaction state باسم `Closed`.
- [x] Beneficiary → Provider rating إلزامي بعد Completed.
- [x] Provider → Beneficiary rating اختياري بثلاثة مؤشرات بعد Completed.
- [x] Portfolio/Catalog ظاهر ضمن وظائف Provider.
- [x] Actors متوافقة مع DEC-067.
- [x] تسميات المخططات داخل الرسم بالإنجليزية وفق DEC-072.
- [ ] Class Diagram يحتاج إعادة بناء من ERD الحالي.
- [ ] مراجعة بصرية نهائية وإخراج UML قياسي للطباعة قبل تسليم 5 سبتمبر.
