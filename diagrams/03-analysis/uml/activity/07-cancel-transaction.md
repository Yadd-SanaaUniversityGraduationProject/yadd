# Activity 07 — Cancel Transaction

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-05, DEC-056/075, BR-023, Request Closure/Cancellation/Expiry Model.

```mermaid
flowchart TD
    S([Start]) --> A[User Opens Active Transaction]
    A --> B[Choose Cancel Transaction]
    B --> C[Enter Cancellation Reason]
    C --> D{Reason Present and Transaction Active?}
    D -- No --> E[Show Validation or State Error]
    E --> C
    D -- Yes --> F[Show Cancellation Confirmation]
    F --> G{Confirm Cancellation?}
    G -- No --> Z([End — Transaction Remains Active])
    G -- Yes --> H[Record Actor, Reason and Time]
    H --> I[Set Transaction Cancelled]
    I --> J[Add Transaction End Event to Conversation]
    J --> K[Notify Other Party]
    K --> Z2([End — Cancelled])
```

Cancellation applies after Transaction start and is distinct from closing an Open Request. Cancelled Transactions do not permit invoice completion or ratings.
