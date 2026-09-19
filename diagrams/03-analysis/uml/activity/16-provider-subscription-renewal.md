# Activity 16 — Provider Subscription & Renewal

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-042/043/086/090, BR-062/067, Provider Subscription Model.

```mermaid
flowchart TD
    S([Start]) --> A[Provider Opens Subscription]
    A --> B{New Activation or Renewal?}
    B -- New Activation --> C[Submit Activation Request and Required Operational Evidence]
    B -- Renewal --> D[Submit Renewal Request and Required Operational Evidence]
    C --> E[Authorized Employee Reviews Request]
    D --> E
    E --> F{Operational Verification Successful?}
    F -- No --> G[Record Rejection or Required Correction]
    G --> Z([End — Not Activated])
    F -- Yes --> H[Authorize Activation or Renewal]
    H --> I[Set Active Period to 30 Days from Authorization]
    I --> J[Enable New Provider Responses and Direct Transactions]
    J --> K[Schedule Approved Expiry Notifications]
    K --> Z2([End — Active Subscription])
```

Activation/renewal is manually confirmed by an authorized employee after external operational verification. YADD does not process a Beneficiary–Provider payment. Expiry preserves login, Provider Portal, and existing Active Transactions, but blocks new Provider Responses and new Direct Search Transactions. Public-search visibility while expired remains open and is not inferred.
