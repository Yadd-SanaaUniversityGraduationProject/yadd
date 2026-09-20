# Activity 20 — Open Request Closure, Inactivity, Expiry & Republish

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-048/081, FR-005C..005F, BR-018/020/052/053, Request Lifecycle and Request Cancellation/Expiry Model, BEN-02/04.

```mermaid
flowchart TD
    S([Start — Request Open and Unmatched]) --> A[Beneficiary Opens Request Details]
    A --> B{Choose Close Request?}

    B -- Yes --> C[Load Open Request]
    C --> D[Verify Request Is Still Open and Unmatched]
    D --> E[Set Request Status to CLOSED_BY_BENEFICIARY]
    E --> F[Confirm Request Closure]
    F --> G[Beneficiary Views Closed Request]
    G --> Z1([End — Closed by Beneficiary])

    B -- No --> H[YADD Scheduler Monitors Beneficiary Inactivity]
    H --> I{24 Hours of Inactivity?}
    I -- No --> J[Keep Request Open]
    J --> H
    I -- Yes --> K[Trigger First Inactivity Reminder]
    K --> L[Send 24-Hour Reminder]
    L --> M[Beneficiary Views 24-Hour Reminder]
    M --> N{Meaningful Beneficiary Activity Performed?}
    N -- Yes --> O[Record Beneficiary Activity]
    O --> P[Reset Inactivity Clock]
    P --> Q[Keep Request Open]
    Q --> H
    N -- No --> R{Provider Response Arrives?}
    R -- Yes --> R1[Record Provider Response Arrival]
    R1 --> S1[Continue Monitoring Beneficiary Inactivity]
    R -- No --> S1

    S1 --> T{48 Hours of Inactivity?}
    T -- No --> U[Keep Request Open]
    U --> H
    T -- Yes --> V[Trigger Second Inactivity Reminder]
    V --> W[Send 48-Hour Reminder]
    W --> X[Beneficiary Views 48-Hour Reminder]
    X --> Y{Meaningful Beneficiary Activity Before Expiry?}
    Y -- Yes --> Y1[Record Beneficiary Activity]
    Y1 --> Y2[Reset Inactivity Clock]
    Y2 --> Y3[Keep Request Open]
    Y3 --> H
    Y -- No --> AA{72 Hours of Inactivity Reached?}
    AA -- No --> AB[Continue with Open Request]
    AB --> H
    AA -- Yes --> AC[Set Request Status to EXPIRED]
    AC --> AD[Notify Request Expiry]
    AD --> AE[Beneficiary Views Expired Request]

    AE --> AF{Republish Request?}
    AF -- No --> Z2([End — Finish Without Republishing])
    AF -- Yes --> AG[Choose Republish]
    AG --> AH[Copy Approved Request Data to a New Draft]
    AH --> AI[Create New Request Identity]
    AI --> AJ[Prepare Republish Draft]
    AJ --> AK[Beneficiary Reviews and Edits New Request Draft]
    AK --> AL{Publish New Request?}
    AL -- No --> AM[Keep or Discard New Draft]
    AM --> Z3([End — Old Request Remains Expired])
    AL -- Yes --> AN[Confirm Publication]
    AN --> AO[Validate New Request Data]
    AO --> AP[Set New Request Status to OPEN]
    AP --> AQ[Confirm New Request Publication]
    AQ --> AR[Keep Old Request Expired]
    AR --> AS[Beneficiary Views New Open Request]
    AS --> Z4([End — New Request Open])
```

Closing an Open Request is not Transaction cancellation. Meaningful Beneficiary activity resets the inactivity clock; a Provider Response arrival alone does not. Reminders occur after 24 and 48 hours of Beneficiary inactivity, and the Request becomes `EXPIRED` after 72 hours if inactivity continues. Republish never reopens the old Expired Request: old responses remain inactive, while the republished Request receives a new identity and editable copied data. The scheduler represents the approved timing policy and does not mandate a specific background-service architecture.
