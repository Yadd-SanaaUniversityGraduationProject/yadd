# Activity 05 — Select Provider from Request

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-04, DEC-014/046/047/066/075, BR-004..006/042.

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Opens Provider Responses]
    A --> B[Compare Responses and Provider Profiles]
    B --> C{Need Inquiry?}
    C -- Yes --> D[Open or Reuse Persistent Conversation]
    D --> E[Exchange Private Messages]
    E --> B
    C -- No --> F{Select Provider?}
    F -- No --> Z([End — Request Remains Open])
    F -- Yes --> G[Confirm Selected Provider]
    G --> H{Request Still Open and Response Active?}
    H -- No --> I[Reject Selection and Refresh State]
    I --> A
    H -- Yes --> J[Mark Request Matched]
    J --> K[Mark Selected Response Selected]
    K --> L[Mark Other Responses Not Selected]
    L --> M[Create Active Transaction]
    M --> N[Add Transaction Boundary Event to Conversation]
    N --> Z2([End — Active Transaction])
```

Selection closes the Request to new responses and creates one Active Transaction. Inquiry/chat alone never creates a Transaction.
