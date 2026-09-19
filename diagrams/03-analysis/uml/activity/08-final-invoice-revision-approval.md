# Activity 08 — Final Invoice, Revision & Approval

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-06, DEC-015/025/050/071/083, BR-009..013/057/058, Invoice Approval & Dispute Model.

```mermaid
flowchart TD
    S([Start]) --> A[Provider Creates Final Invoice]
    A --> B{Invoice Data Valid?}
    B -- No --> A
    B -- Yes --> C[Send Invoice for Beneficiary Approval]
    C --> D[Set Invoice Pending Customer Approval]
    D --> E{Beneficiary Decision}
    E -- Request Revision --> F[Enter Mandatory Revision Note]
    F --> G[Provider Creates New Invoice Version]
    G --> H[Preserve Revision History]
    H --> D
    E -- Approve --> I[Show Final Approval Warning]
    I --> J{Confirm Final Approval?}
    J -- No --> D
    J -- Yes --> K[Mark Invoice Final and Immutable]
    K --> L[Set Transaction Completed]
    L --> Z([End — Completed])
    E -- Raise Complaint --> Z2([Continue in Activity 09])
```

No response is not approval. The pending invoice receives reminders at 24h and 48h and becomes Overdue at 72h without Auto-Approval. Revision has no hard maximum; every revision request requires a note.
