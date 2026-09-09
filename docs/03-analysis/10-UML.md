# نماذج UML — YADD Preliminary Defense

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-04`
>
> **المراجع الحاكمة:** DEC-046/047/048/050/051/063/064/066/067/068/069/070/071/072/073 + `05-SRS.md` + `06-business-rules.md` + `07-lifecycles.md` + `08-use-cases.md`.
>
> يستخدم YADD كلًا من DFD وUML وفق `DEC-060`. يجب أن تكون جميع التسميات داخل المخططات الأكاديمية النهائية باللغة الإنجليزية وفق `DEC-072`.

## 1. نموذج الـActors

### الـActors الرئيسيون
- `Beneficiary`
- `Provider`
  - تخصص `Service Provider` عند الحاجة
  - تخصص `Product Provider` عند الحاجة
- `YADD Administrator`

### الأدوار الإدارية المتخصصة
- `Verification Reviewer`
- `Content Moderator`
- `Subscription Administrator`

استخدام `YADD Administrator` في المخطط الرئيسي هو تبسيط نمذجي، ولا يعني أن موظفًا واحدًا يمتلك جميع الصلاحيات الإدارية.

---

## 2. Main Use Case Diagram — تمثيل عمل

> يستخدم Mermaid هنا كتمثيل دلالي/بصري قابل للمراجعة داخل GitHub. يحاكي القالب الأكاديمي المرجعي من حيث حدود النظام، الحالات البيضاوية، اللون الأزرق الفاتح، وعلاقات `<<include>>` / `<<extend>>` عندما يدعمها السيناريو المعتمد. يبقى التصدير الأكاديمي النهائي بحاجة إلى Actors قياسيين (stick figures) ومراجعة نهائية قبل التسليم.

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","primaryColor":"#ADD8E6","primaryTextColor":"#1F2933","primaryBorderColor":"#9ABFCB","lineColor":"#737373","clusterBkg":"#FFFFFF","clusterBorder":"#B7B7B7","fontFamily":"Arial"}}}%%
flowchart LR
    B["Beneficiary"]:::actor
    P["Provider"]:::actor
    A["YADD Administrator"]:::actor

    subgraph YADD["YADD System"]
        UC1([Manage Account])
        UC2([Search Providers])
        UC3([View Provider Profile])
        UC4([Create Request])
        UC5([Compare Provider Responses])
        UC6([Communicate / Inquire])
        UC7([Select Provider])
        UC8([Start Transaction])
        UC9([Cancel Transaction])
        UC10([Review / Approve Invoice])
        UC11([Rate Provider])
        UC12([Block / Report])

        UC13([Manage Provider Profile])
        UC14([Manage Portfolio / Catalog])
        UC15([Manage Service Areas])
        UC16([Submit Verification])
        UC17([View Matching Requests])
        UC18([Manage Provider Response])
        UC19([Create / Revise Final Invoice])
        UC20([Rate Beneficiary])

        UC21([Review Provider Verification])
        UC22([Review Reports / Flags])
        UC23([Manage Provider Subscription])
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
    B --- UC12

    P --- UC1
    P --- UC6
    P --- UC8
    P --- UC9
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

    UC3 -.->|«extend»| UC2
    UC6 -.->|«extend»| UC3
    UC6 -.->|«extend»| UC5
    UC8 -.->|«extend»| UC6
    UC7 -.->|«include»| UC5
    UC18 -.->|«include»| UC17

    classDef usecase fill:#ADD8E6,stroke:#9ABFCB,stroke-width:1px,color:#1F2933;
    classDef actor fill:#FFFFFF,stroke:#FFFFFF,color:#222222,font-weight:bold;
    class UC1,UC2,UC3,UC4,UC5,UC6,UC7,UC8,UC9,UC10,UC11,UC12,UC13,UC14,UC15,UC16,UC17,UC18,UC19,UC20,UC21,UC22,UC23 usecase;
    style YADD fill:#FFFFFF,stroke:#B7B7B7,stroke-width:1.5px,color:#222222;
```

### دلالات Main Use Case

1. يرث `Service Provider` و`Product Provider` السلوك العام للـ`Provider`؛ لذلك لا تكرر كل Use Cases الموروثة إلا عند الحاجة للوضوح.
2. لا يوجد Actor باسم `Guest` معتمد حاليًا.
3. لا يوجد Use Case أو entity مستقلة باسم `Agreement`. مسار الطلب هو `Request → Provider Response → Selection → Transaction`.
4. تغطي `Manage Provider Response` الإرسال/التعديل/السحب وفق `DEC-070`. وتمثل `RequiresDeposit = Yes/No` بيانات داخل `Provider Response`، **وليست Use Case مستقلة**.
5. ترتبط `Start Transaction` بكل من `Beneficiary` و`Provider` لأن أيًا منهما قد يطلب البدء في `Direct Search`. ويجب أن يؤكد الطرف الآخر قبل إنشاء `Active Transaction`.
6. في مسار `Request`، يبدأ اختيار `Beneficiary` للـ`Provider` المختار الـ`Transaction`. لذلك **لا** توجد علاقة `<<include>>` بين `Select Provider` و`Start Transaction`؛ لأن `Start Transaction` تمثل طلب البدء المتبادل الخاص بمسار `Direct Search`.
7. `Select Provider <<include>> Compare Provider Responses` لأن المقارنة جزء من التدفق الأساسي الحالي لاختيار مقدم من الطلب المنشور.
8. `View Provider Profile <<extend>> Search Providers`، و`Communicate / Inquire <<extend>> View Provider Profile` في مسار البحث المباشر؛ لأن فتح الملف ثم بدء الاستفسار سلوكان اختياريان فوق البحث الأساسي.
9. `Communicate / Inquire <<extend>> Compare Provider Responses` في مسار الطلب المنشور؛ لأن الاستفسار قبل الاختيار اختياري.
10. `Start Transaction <<extend>> Communicate / Inquire` **في مسار البحث المباشر فقط**؛ لأن المحادثة قد تستمر أو تنتهي دون Transaction.
11. `Manage Provider Response <<include>> View Matching Requests` لأن الاستجابة تعتمد على مراجعة Request مؤهل ومفتوح قبل الإرسال/الإدارة.
12. تقييم `Beneficiary→Provider` إلزامي بعد `Completed`؛ وتقييم `Provider→Beneficiary` اختياري. لم تربط التقييمات بعلاقة `include/extend` في الرسم الرئيسي حتى لا نمثل Post-Transaction operations كجزء من اعتماد الفاتورة نفسه.
13. اللون المستخدم لحالات الاستخدام في تمثيل Mermaid هو `LightBlue (#ADD8E6)`، مع خلفية بيضاء وحدود رمادية رفيعة لمحاكاة القالب المرجعي المرفق. هذا قرار عرض للمراجعة وليس Business Rule.

---

## 3. Activity Diagram — Published Request Route

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
    E2 --> F[Beneficiary Compares Responses]
    F --> G{Needs Inquiry?}
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

`Completed` هي الحالة النهائية الناجحة للـ`Transaction`؛ أما التقييمات الظاهرة بعدها فهي Post-Transaction workflow فقط. `Disputed` حالة نهائية غير ناجحة عندما يبقى نزاع الفاتورة قبل الاعتماد دون حل. تراجع الإدارة أدلة YADD وتطبق سياسة المنصة، لكنها لا تقرر الدفع أو الاسترداد أو التعويض أو أي استحقاق مالي/تجاري آخر بين الطرفين.

---

## 4. Activity Diagram — Direct Search Route

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

المحادثة وحدها لا تنشئ `Transaction`.

---

## 5. Sequence Diagram — Published Request Route

```mermaid
sequenceDiagram
    actor B as Beneficiary
    participant Y as YADD Backend/API
    actor P as Provider
    participant DB as Database
    actor A as YADD Administrator

    B->>Y: Create and publish Request
    Y->>DB: Save Request = Open
    Y-->>P: Expose matching Request

    P->>Y: Submit Provider Response
    Note over P,Y: Proposed price or note optional. RequiresDeposit is Yes or No only.
    Y->>DB: Save active Provider Response
    Y-->>B: Show response for comparison

    opt Provider edits or withdraws before selection
        P->>Y: Edit / withdraw active response
        Y->>DB: Update response data/status
        Y-->>B: Refresh response information
    end

    opt Inquiry before selection
        B->>Y: Send message
        Y-->>P: Deliver private message
        P->>Y: Reply
        Y-->>B: Deliver reply
    end

    B->>Y: Select Provider
    Y->>DB: Save Request as Matched, mark other responses NotSelected, create Active Transaction
    Y-->>P: Provider selected / Transaction active
    Y-->>B: Transaction active

    alt Beneficiary cancels Transaction
        B->>Y: Cancel Transaction + reason
        Y->>DB: Save Cancelled + actor + reason + time
        Y-->>P: Cancellation recorded
    else Provider cancels Transaction
        P->>Y: Cancel Transaction + reason
        Y->>DB: Save Cancelled + actor + reason + time
        Y-->>B: Cancellation recorded
    else Work completed / product prepared
        P->>Y: Submit final invoice
        Y->>DB: Save invoice = PendingCustomerApproval
        Y-->>B: Request invoice review

        alt Request revision
            B->>Y: Request revision + note
            Y-->>P: Revision requested
            P->>Y: Submit revised invoice
            Y-->>B: Show revised invoice
        else Dispute remains unresolved
            B->>Y: Raise complaint for administrative review
            Y->>DB: Save complaint and set Transaction = Disputed
            Y-->>A: Send complaint and YADD evidence for review
            A->>Y: Record platform-policy action if applicable
            Y->>DB: Save administrative review outcome
            Note over B,P: No ratings after Disputed. YADD does not decide payment, refund or compensation.
        else Approve
            B->>Y: Approve final invoice
            Y->>DB: Save Final invoice and set Transaction to Completed
            Y-->>B: Require Provider rating
            B->>Y: Submit provider rating 1-5 + optional comment
            Y->>DB: Save provider rating
            Y-->>P: Show optional beneficiary rating prompt
            opt Provider chooses to rate Beneficiary
                P->>Y: Submit 3 behavioral scores + optional comment
                Y->>DB: Save beneficiary rating
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
    Y->>DB: Query eligible Provider Profiles
    DB-->>Y: Matching Provider Profiles
    Y-->>B: Results

    B->>Y: Open Provider Profile
    Y->>DB: Load public profile + Portfolio/Catalog
    DB-->>Y: Public provider data
    Y-->>B: Show profile

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

## 7. Class Diagram — النموذج المصدر

يجب إعادة بناء `Class Diagram` من الـConceptual ERD المتزامن في `11-ERD.md`، وعدم إعادة استخدام نموذج الكلاسات القديم `Offer → Agreement → Review`.

الحد الأدنى من Domain classes/concepts الحالية:
- User
- ProviderProfile
- ProviderActivity
- Category
- Area / ProviderServiceArea
- ShowcaseItem
- Request
- ProviderResponse
- Conversation / Message
- Transaction
- Invoice / InvoiceVersion / InvoiceItem according to chosen class abstraction
- ProviderRating
- BeneficiaryRating
- VerificationCase / VerificationArtifact
- Subscription
- Report

خيارات قاعدة البيانات الفيزيائية مثل بنية جدول Media أو `InvoiceVersion` مقابل `Invoice + Revision` هي قرارات تصميم في Chapter Four، ولا يجوز اختلاقها كحقائق تحليلية.

---

## 8. قائمة جاهزية المخططات — Diagram Readiness Checklist

- [x] الـActors متوافقة مع `DEC-067`.
- [x] التسميات الإنجليزية فقط متوافقة مع `DEC-072`.
- [x] لا يوجد `Guest` actor.
- [x] لا توجد `Agreement` مستقلة.
- [x] المصطلح القياسي هو `Provider Response`.
- [x] تعديل/سحب `Provider Response` ممثل.
- [x] `RequiresDeposit` بيانات داخل الاستجابة وليست Use Case/Payment flow مستقلة.
- [x] طلب بدء `Direct Search` + تأكيد الطرف الآخر ممثلان.
- [x] اختيار `Request` ينشئ `Transaction` واحدة.
- [x] اعتماد الفاتورة يؤدي إلى `Completed`.
- [x] لا توجد حالة `Transaction` باسم `Closed`.
- [x] النزاع غير المحلول قبل الاعتماد يؤدي إلى الحالة النهائية `Disputed`.
- [x] الإدارة لا تقرر استحقاق payment/refund/compensation.
- [x] تحدث `Ratings` فقط بعد `Completed`، وليس بعد `Cancelled` أو `Disputed`.
- [x] تقييم `Beneficiary→Provider` إلزامي؛ وتقييم `Provider→Beneficiary` اختياري.
- [x] `<<include>>` / `<<extend>>` في Main Use Case مرتبطة فقط بالتدفقات المدعومة حاليًا، وليست علاقات شكلية مضافة لإرضاء الرسم.
- [x] مفاهيم مصدر `Class Diagram` محددة من ERD المتزامن.
- [ ] ما يزال مطلوبًا اعتماد/تصدير الرسم البصري النهائي وفق ترميز UML القياسي بعد مراجعة الفريق.
