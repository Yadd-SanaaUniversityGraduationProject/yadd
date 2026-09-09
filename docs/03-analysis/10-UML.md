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

## 2. Main Use Case Diagram — Working UML Decomposition

> هذا الرسم يعيد تفكيك السيناريوهات المركبة إلى Actor goals أصغر حتى تكون علاقات `<<include>>` و`<<extend>>` ذات معنى UML واضح. لا تستخدم العلاقات لتمثيل مجرد التسلسل الزمني؛ التبعيات الزمنية/الحالية تمثل كـPreconditions/Postconditions في المواصفات. اللون والأسلوب البصري يحاكيان القالب المرجعي الذي وفره الفريق، بينما Actors القياسية النهائية تحتاج إعادة رسم/تصدير بصري لاحق.

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
        UC5([Close Open Request])
        UC6([Compare Provider Responses])
        UC7([Communicate / Inquire])
        UC8([Select Provider])

        UC9([Request Transaction Start])
        UC10([Confirm Transaction Start])
        UC11([Create Active Transaction])
        UC12([Cancel Transaction])

        UC13([Review Final Invoice])
        UC14([Approve Final Invoice])
        UC15([Request Invoice Revision])
        UC16([Raise Transaction Complaint])
        UC17([Complete Transaction])
        UC18([Rate Provider])

        UC19([Manage Provider Profile])
        UC20([Manage Portfolio / Catalog])
        UC21([Manage Service Areas])
        UC22([Submit Verification])
        UC23([View Matching Requests])
        UC24([Submit Provider Response])
        UC25([Edit Provider Response])
        UC26([Withdraw Provider Response])
        UC27([Validate Response Eligibility])
        UC28([Create Final Invoice])
        UC29([Revise Final Invoice])
        UC30([Rate Beneficiary])

        UC31([Block User])
        UC32([Report User / Content])

        UC33([Review Provider Verification])
        UC34([Review Reports / Flags])
        UC35([Review Transaction Complaint])
        UC36([Manage Provider Subscription])
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
    B --- UC12
    B --- UC13
    B --- UC14
    B --- UC15
    B --- UC16
    B --- UC18
    B --- UC31
    B --- UC32

    P --- UC1
    P --- UC7
    P --- UC9
    P --- UC10
    P --- UC12
    P --- UC19
    P --- UC20
    P --- UC21
    P --- UC22
    P --- UC23
    P --- UC24
    P --- UC25
    P --- UC26
    P --- UC28
    P --- UC29
    P --- UC30
    P --- UC31
    P --- UC32

    A --- UC33
    A --- UC34
    A --- UC35
    A --- UC36

    UC3 -.->|«extend»| UC2
    UC7 -.->|«extend»| UC3
    UC7 -.->|«extend»| UC6
    UC8 -.->|«extend»| UC6
    UC24 -.->|«extend»| UC23
    UC9 -.->|«extend»| UC7

    UC24 -.->|«include»| UC27
    UC8 -.->|«include»| UC11
    UC10 -.->|«include»| UC11

    UC14 -.->|«extend»| UC13
    UC15 -.->|«extend»| UC13
    UC16 -.->|«extend»| UC13
    UC14 -.->|«include»| UC17

    classDef usecase fill:#ADD8E6,stroke:#9ABFCB,stroke-width:1px,color:#1F2933;
    classDef actor fill:#FFFFFF,stroke:#FFFFFF,color:#222222,font-weight:bold;
    class UC1,UC2,UC3,UC4,UC5,UC6,UC7,UC8,UC9,UC10,UC11,UC12,UC13,UC14,UC15,UC16,UC17,UC18,UC19,UC20,UC21,UC22,UC23,UC24,UC25,UC26,UC27,UC28,UC29,UC30,UC31,UC32,UC33,UC34,UC35,UC36 usecase;
    style YADD fill:#FFFFFF,stroke:#B7B7B7,stroke-width:1.5px,color:#222222;
```

### دلالات Main Use Case

1. `Service Provider` و`Product Provider` تخصصان من `Provider` وفق `DEC-067`، ولا يلزم تكرارهما داخل الرسم الرئيسي.
2. لا يوجد Actor مستقل باسم `Guest` حاليًا.
3. لا توجد Use Case/Entity باسم `Agreement`; المسار القياسي في الطلب هو `Request → Provider Response → Selection → Transaction`.
4. `View Provider Profile <<extend>> Search Providers` لأن البحث قد ينتهي دون فتح ملف بعينه.
5. `Communicate / Inquire <<extend>> View Provider Profile` في Direct Search، ويمتد أيضًا من `Compare Provider Responses` في Request Route لأن الاستفسار قبل الاختيار اختياري.
6. `Select Provider <<extend>> Compare Provider Responses`: المقارنة يمكن أن تتم دون اختيار، بينما الاختيار يحدث عند قرار المستفيد. عند حدوث الاختيار فهو **يتضمن** `Create Active Transaction` لأن `DEC-047/066` يفرضان بدء Transaction في Request Route.
7. `Submit Provider Response <<extend>> View Matching Requests`: مشاهدة الطلب لا تلزم Provider بالاستجابة. وعند الإرسال يجب دائمًا تنفيذ `Validate Response Eligibility` الذي يمثل شرط Verified Provider + Active Subscription + Open Request.
8. `Request Transaction Start <<extend>> Communicate / Inquire` في Direct Search فقط؛ المحادثة قد تستمر أو تنتهي دون Transaction. أما عند `Confirm Transaction Start` الإيجابي فيتم تضمين `Create Active Transaction` وفق `DEC-069`.
9. `Review Final Invoice` هو الأساس؛ `Approve Final Invoice` و`Request Invoice Revision` و`Raise Transaction Complaint` امتدادات شرطية لقرار المراجعة. عند الاعتماد فقط يتم `<<include>> Complete Transaction` لأن الاعتماد يجعل Transaction = `Completed` دائمًا.
10. `Rate Provider` و`Rate Beneficiary` Use Cases مستقلة من ناحية Actor goal، لكنهما **غير متاحتين بحرية**: كلتاهما تتطلبان `Transaction = Completed`. الأولى إلزامية على Beneficiary بعد Completed، والثانية اختيارية على Provider. لذلك لا تمثل تبعية Completed بأسهم `include/extend`.
11. `Cancel Transaction` تتطلب Transaction قائمة وفي حالة تسمح بالإلغاء. `Close Open Request` مختلفة عنها وتتطلب Request Open قبل الاختيار.
12. `Edit Provider Response` و`Withdraw Provider Response` تتطلبان استجابة فعالة مع Request Open وقبل selection وفق `DEC-070`; لا تربطان بعلاقة `include/extend` مصطنعة مع `Submit Provider Response`.
13. `Revise Final Invoice` تتطلب `Revision Requested` سابقة؛ و`Review Provider Verification`/`Review Transaction Complaint` أهداف إدارية لاحقة مستقلة تعتمد على وجود submission/complaint، وليست أجزاء included داخل فعل المرسل.
14. تم فصل `Block User` عن `Report User / Content`: يستطيع المستخدم تنفيذ أحدهما دون الآخر، وReport يخضع لاحقًا لمراجعة إدارية.
15. `Create Active Transaction`, `Complete Transaction`, و`Validate Response Eligibility` تمثل سلوكًا نظاميًا مشتركًا/إلزاميًا، وليس Actor goals مستقلة؛ لذلك لا ترتبط مباشرة بـActor.
16. اللون المستخدم لحالات الاستخدام هو `LightBlue (#ADD8E6)` مع خلفية بيضاء وحدود رمادية رفيعة لمحاكاة القالب المرجعي؛ هذا قرار عرض لا Business Rule.

### Preconditions / Postconditions التي يجب ألا تُفهم كـ`include`/`extend`

- `Rate Provider`: Precondition = `Transaction Completed`; Post-Transaction required step.
- `Rate Beneficiary`: Precondition = `Transaction Completed`; optional Provider action.
- `Cancel Transaction`: Precondition = active/cancellable Transaction.
- `Close Open Request`: Precondition = Request Open + no Provider selected.
- `Edit/Withdraw Provider Response`: Precondition = active response + Request Open + before selection.
- `Review Final Invoice`: Precondition = invoice `Pending Customer Approval`.
- `Revise Final Invoice`: Precondition = revision previously requested.
- `Review Provider Verification`: Precondition = verification submission exists.
- `Review Transaction Complaint`: Precondition = complaint exists.

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
- [x] تعديل/سحب `Provider Response` ممثلان كتبعيات مشروطة لا كعلاقات UML مصطنعة.
- [x] `RequiresDeposit` بيانات داخل الاستجابة وليست Use Case/Payment flow مستقلة.
- [x] Request Route وDirect Search يفصلان آليتي بدء Transaction بصورة صحيحة.
- [x] `<<include>>` يستخدم فقط للسلوك الإلزامي داخل الـBase Use Case.
- [x] `<<extend>>` يستخدم فقط للسلوك الشرطي/الاختياري.
- [x] التبعيات الزمنية/الحالية مثل Ratings بعد Completed ممثلة كـPreconditions/Postconditions.
- [x] اعتماد الفاتورة يؤدي إلى `Completed`.
- [x] لا توجد حالة `Transaction` باسم `Closed`.
- [x] النزاع غير المحلول قبل الاعتماد يؤدي إلى الحالة النهائية `Disputed`.
- [x] الإدارة لا تقرر استحقاق payment/refund/compensation.
- [x] تحدث `Ratings` فقط بعد `Completed`، وليس بعد `Cancelled` أو `Disputed`.
- [x] تقييم `Beneficiary→Provider` إلزامي؛ وتقييم `Provider→Beneficiary` اختياري.
- [x] `Block User` و`Report User / Content` منفصلتان في الرسم الرئيسي.
- [x] مفاهيم مصدر `Class Diagram` محددة من ERD المتزامن.
- [ ] ما يزال مطلوبًا اعتماد/تصدير الرسم البصري النهائي وفق ترميز UML القياسي بعد مراجعة الفريق.
