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
- `DEC-047/048/050/051/063/066/068/070/071/073`
- Current Business Rules and Transaction/Invoice lifecycles.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Creates Request]
    A --> B{Request Data Valid?}
    B -- No --> A
    B -- Yes --> C[Publish Open Request]

    C --> D[Eligible Providers View Request]
    D --> E[Provider Submits Provider Response]
    E --> F[Beneficiary Compares Responses]
    F --> G{Needs Inquiry?}
    G -- Yes --> H[Private Chat / Inquiry]
    H --> F
    G -- No --> I{Select Provider?}
    I -- No --> F
    I -- Yes --> J[Close Request to New Responses]

    J --> K[Mark Selected Response and Others NotSelected]
    K --> L[Create Active Transaction]
    L --> M{Transaction Cancelled?}
    M -- Yes --> N[Record Actor, Reason and Time]
    N --> ZC([End — Cancelled])

    M -- No --> O[Provider Performs Service / Prepares Product]
    O --> P[Provider Creates Final Invoice]
    P --> Q[Invoice Pending Customer Approval]
    Q --> R{Beneficiary Decision}

    R -- Request Revision --> T[Record Revision Note]
    T --> U[Provider Revises Final Invoice]
    U --> Q

    R -- Raise Complaint --> V[Transaction Complaint]
    V --> V1[Administrator Reviews YADD Evidence and Applies Platform Policy]
    V1 --> V2{Agreement Reached Before Final Approval?}
    V2 -- Yes --> Q
    V2 -- No --> ZD([End — Disputed])

    R -- Approve --> W[Invoice Approved]
    W --> X[Transaction Completed]
    X --> Y[Beneficiary Rates Provider — Required]
    Y --> Y2{Provider Rates Beneficiary?}
    Y2 -- Yes --> Y3[Provider Rates Beneficiary]
    Y3 --> ZE([End — Post-Transaction Flow Complete])
    Y2 -- No --> ZE
```

## Semantic constraints

- Chat alone does not create a Transaction.
- Request Route creates `Active Transaction` only after Provider selection.
- `Close Open Request` before selection is different from `Transaction Cancellation`.
- Final Invoice approval makes Transaction `Completed`.
- Complaint does not automatically make Transaction `Disputed`; `Disputed` occurs only when disagreement remains unresolved without agreement before final approval.
- Ratings open only after `Completed` and do not change Transaction status.
- No Payment/Refund/Escrow lifecycle exists inside YADD.

## Presentation note

هذا مخطط Route-Level وليس Activity لكل Use Case. الهدف إظهار workflow العام والقرارات الرئيسية دون تكرار مخططات UC الفردية.
