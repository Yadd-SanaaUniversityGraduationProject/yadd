# Activity 10 — Post-Transaction Ratings

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-07/07B, DEC-051/063/087, BR-015/016/063/064, Rating & Reputation Model.

```mermaid
flowchart TD
    S([Start]) --> A{Transaction Completed?}
    A -- No --> B[Reject Rating]
    B --> Z([End])
    A -- Yes --> C[Prompt Beneficiary to Rate Provider]
    C --> D{Rate Now?}
    D -- Later --> E[Schedule 24-Hour Reminder]
    E --> F[Require Provider Rating Before New Transaction]
    F --> G[Enter Hybrid Provider Rating]
    D -- Yes --> G
    G --> H[Validate and Save Provider Rating]
    H --> I{Provider Chooses to Rate Beneficiary?}
    I -- No --> Z2([End — Ratings Flow Complete])
    I -- Yes --> J[Enter Beneficiary Rating]
    J --> K[Validate and Save Beneficiary Rating]
    K --> Z2
```

Provider rating by the Beneficiary is required with a Later option and approved reminder rule; Provider-to-Beneficiary rating is optional. Ratings never change the Completed status and are unavailable for Cancelled or Disputed Transactions.
