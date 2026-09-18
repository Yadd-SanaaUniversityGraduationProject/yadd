# Activity Diagram — Published Request Route

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-18 THROUGH DEC-090`
>
> **Type:** Derived workflow view. هذا المخطط لا ينشئ Requirement أو Use Case جديدة؛ يجمع المسار الرئيسي من `Create Request` حتى نهاية Transaction الناجحة/غير الناجحة لعرض القرارات الأساسية بصورة واحدة.

## Source basis

- `UC-02 — Create Request`
- `UC-03 — Respond to Request`
- `UC-04 — Select Provider from Request`
- `UC-05 — Cancel Active Transaction`
- `UC-06 — Create, Revise and Approve Final Invoice`
- `UC-07 / UC-07B — Post-Transaction Ratings`
- `DEC-047/048/049/050/051/063/066/068/070/071/073/081/082/083/084/087`
- Current Business Rules and Request/Transaction/Invoice lifecycles.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Creates Request]
    A --> B{Request Data Valid?}
    B -- No --> A
    B -- Yes --> B1[System Derives District Internally from Selected Neighborhood]
    B1 --> C[Publish Open Request]

    C --> D{Request remains open for matching?}
    D -- Beneficiary closes --> ZR([End — ClosedByBeneficiary])
    D -- 24h inactive --> DR1[Send Reminder 1]
    DR1 --> D
    D -- 48h inactive --> DR2[Send Reminder 2]
    DR2 --> D
    D -- 72h inactive --> ZE1[Set Request Expired]
    ZE1 --> REP{Republish?}
    REP -- Yes --> A2[Copy to New Request Draft / Review and Edit]
    A2 --> B
    REP -- No --> ZEX([End — Expired])
    D -- Yes --> E[Eligible Providers View Request]
    E --> F[One or More Providers Submit Responses]
    F --> G[Beneficiary Compares Responses]
    G --> H{Needs Inquiry?}
    H -- Yes --> I[Private Chat / Inquiry]
    I --> G
    H -- No --> J{Select Provider?}
    J -- No --> D
    J -- Yes --> K[Set Request = Matched and Close to New Responses]

    K --> L[Mark Selected Response and Others NotSelected]
    L --> M[Create Active Transaction]
    M --> N{Transaction Cancelled?}
    N -- Yes --> O[Record Actor, Reason and Time]
    O --> ZC([End — Cancelled])

    N -- No --> P[Provider Performs Service / Prepares Product]
    P --> Q[Provider Creates Final Invoice]
    Q --> R[Invoice Pending Customer Approval]
    R --> RT{Pending Duration}
    RT -- 24h --> RR1[Send Invoice Reminder 1]
    RR1 --> R
    RT -- 48h --> RR2[Send Invoice Reminder 2]
    RR2 --> R
    RT -- 72h --> RO[Mark Invoice Overdue]
    RO --> T{Beneficiary Decision}
    RT -- Responds --> T

    T -- Request Revision --> U[Record Mandatory Revision Note]
    U --> V[Provider Revises Final Invoice]
    V --> R

    T -- Raise Complaint --> W[Record Complaint Reason + Description + Optional Attachments]
    W --> W1[Administrator Reviews YADD Evidence and Applies Platform Policy]
    W1 --> W2{Agreement Reached Before Final Approval?}
    W2 -- Yes --> R
    W2 -- No --> ZD([End — Disputed])

    T -- Approve --> X[Invoice Approved]
    X --> Y[Transaction Completed]
    Y --> Y1{Rate Provider Now?}
    Y1 -- Yes --> Y4[Submit Hybrid Provider Rating]
    Y1 -- Later --> YL[Schedule 24h Reminder / Require Before New Transaction]
    YL --> Y4
    Y4 --> Y2{Provider Rates Beneficiary?}
    Y2 -- Yes --> Y3[Provider Rates Beneficiary]
    Y3 --> ZZ([End — Post-Transaction Flow Complete])
    Y2 -- No --> ZZ
```

## Semantic constraints

- Chat alone does not create a Transaction.
- Request Route creates `Active Transaction` only after Provider selection.
- عند اختيار Provider ينتقل Request من `Open` إلى `Matched`; يعني ذلك توقفه عن استقبال Responses جديدة وبدء المعاملة الرسمية مع Provider المختار.
- Beneficiary may close an `Open` Request before selection; this is `Request Closure`, not `Transaction Cancellation`.
- Request expiry uses 24h/48h reminders and 72h Expired from Beneficiary inactivity; meaningful Beneficiary activity resets the inactivity clock, while Provider Response arrival alone does not. Republish creates a new Request and old responses remain inactive.
- **Location UI synchronization:** Request creation exposes Neighborhood to the Beneficiary; District is derived internally and remains part of the underlying data/location model.
- Final Invoice uses 24h/48h reminders and Overdue at 72h without Auto-Approval; explicit approval makes Transaction `Completed`.
- Complaint does not automatically make Transaction `Disputed`; `Disputed` occurs only when disagreement remains unresolved without agreement before final approval.
- Ratings open only after `Completed`; Beneficiary→Provider uses Hybrid Rating with Later/24h reminder and completion before a new Transaction.
- No Payment/Refund/Escrow lifecycle exists inside YADD.

## Presentation note

هذا مخطط Route-Level وليس Activity لكل Use Case. الهدف إظهار workflow العام والقرارات الرئيسية دون تكرار مخططات UC الفردية.
