# Activity Diagram — Published Request Route

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Type:** Derived workflow view. هذا المخطط لا ينشئ Requirement أو Use Case جديدة؛ يجمع المسار الرئيسي من `Create Request` حتى نهاية Transaction الناجحة/غير الناجحة لعرض القرارات الأساسية بصورة واحدة.

## Source basis

- `UC-02 — Create Request`
- `UC-03 — Respond to Request`
- `UC-04 — Select Provider from Request`
- `UC-05 — Cancel Active Transaction`
- `UC-06 — Create, Revise and Approve Final Invoice`
- `UC-07 / UC-07B — Post-Transaction Ratings`
- `DEC-047/048/049/050/051/063/066/068/070/071/073`
- Current Business Rules and Request/Transaction/Invoice lifecycles.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Creates Request]
    A --> B{Request Data Valid?}
    B -- No --> A
    B -- Yes --> C[Publish Open Request]

    C --> D{Request remains open for matching?}
    D -- Beneficiary closes --> ZR([End — ClosedByBeneficiary])
    D -- Inactivity policy reached --> ZE1([End — Expired])
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
    R --> T{Beneficiary Decision}

    T -- Request Revision --> U[Record Revision Note]
    U --> V[Provider Revises Final Invoice]
    V --> R

    T -- Raise Complaint --> W[Transaction Complaint]
    W --> W1[Administrator Reviews YADD Evidence and Applies Platform Policy]
    W1 --> W2{Agreement Reached Before Final Approval?}
    W2 -- Yes --> R
    W2 -- No --> ZD([End — Disputed])

    T -- Approve --> X[Invoice Approved]
    X --> Y[Transaction Completed]
    Y --> Y1[Beneficiary Rates Provider — Required]
    Y1 --> Y2{Provider Rates Beneficiary?}
    Y2 -- Yes --> Y3[Provider Rates Beneficiary]
    Y3 --> ZZ([End — Post-Transaction Flow Complete])
    Y2 -- No --> ZZ
```

## Semantic constraints

- Chat alone does not create a Transaction.
- Request Route creates `Active Transaction` only after Provider selection.
- عند اختيار Provider ينتقل Request من `Open` إلى `Matched`; يعني ذلك توقفه عن استقبال Responses جديدة وبدء المعاملة الرسمية مع Provider المختار.
- Beneficiary may close an `Open` Request before selection; this is `Request Closure`, not `Transaction Cancellation`.
- Request expiry is represented conceptually only. Exact inactivity duration and reminder timing remain open and are not invented here.
- Final Invoice approval makes Transaction `Completed`.
- Complaint does not automatically make Transaction `Disputed`; `Disputed` occurs only when disagreement remains unresolved without agreement before final approval.
- Ratings open only after `Completed` and do not change Transaction status.
- No Payment/Refund/Escrow lifecycle exists inside YADD.

## Presentation note

هذا مخطط Route-Level وليس Activity لكل Use Case. الهدف إظهار workflow العام والقرارات الرئيسية دون تكرار مخططات UC الفردية.
