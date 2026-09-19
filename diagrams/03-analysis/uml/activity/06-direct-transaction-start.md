# Activity 06 — Direct Transaction Start

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-01 direct-start alternative, DEC-046/069/075/082/086, BR-007/037/042/062.

```mermaid
flowchart TD
    S([Start]) --> A[Either Party Requests Transaction Start]
    A --> B{Pending Start Request Already Exists?}
    B -- Yes --> C[Reject Duplicate Pending Request]
    C --> Z([End])
    B -- No --> D[Create Pending Start Request]
    D --> E[Set 12-Hour Expiry]
    E --> F{Other Party Responds Before Expiry?}
    F -- Reject --> G[Mark Start Request Rejected]
    G --> Z
    F -- No Response --> H[Mark Start Request Expired]
    H --> Z
    F -- Confirm --> I[Revalidate Provider Eligibility]
    I --> J{Eligible for New Interaction?}
    J -- No --> K[Reject Start and Keep Conversation Available]
    K --> Z
    J -- Yes --> L[Create Active Transaction]
    L --> M[Add Transaction Boundary Event to Conversation]
    M --> Z2([End — Active Transaction])
```

Confirmation and current Provider eligibility are both required. Rejection/expiry affects only the start request; the persistent Conversation remains available.
