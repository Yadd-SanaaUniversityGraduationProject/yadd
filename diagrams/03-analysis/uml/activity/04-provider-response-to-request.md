# Activity 04 — Provider Response to Request

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-03, DEC-013/041/043/070/074/076/086, BR-003/030/033/039/041/043/062.

```mermaid
flowchart TD
    S([Start]) --> A[Provider Opens Matching Open Request]
    A --> B[Validate Provider Type, Activities and Eligibility]
    B --> C{Eligible for New Response?}
    C -- No --> D[Reject Response and Show Reason]
    D --> Z([End])
    C -- Yes --> E{Existing Active Response?}
    E -- No --> F[Enter Response Terms and Requires Deposit Yes / No]
    E -- Yes --> G{Edit or Withdraw?}
    G -- Edit --> F
    G -- Withdraw --> H[Withdraw Provider Response]
    H --> Z
    F --> I{Request Still Open and Unmatched?}
    I -- No --> D
    I -- Yes --> J[Save One Active Provider Response]
    J --> K[Notify Beneficiary]
    K --> Z
```

There is at most one active response per Provider per Request. Edit/withdraw is allowed only while the Request is Open and before selection. `RequiresDeposit` is a boolean only; YADD does not process payment.
