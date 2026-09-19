# Activity 14 — Block / Unblock & Report

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-08, DEC-053/054/075/077/088, BR-021/022/065, In-App Communication and Trust & Safety models.

```mermaid
flowchart TD
    S([Start]) --> A[Authenticated User Opens Safety Actions]
    A --> B{Choose Action}
    B -- Block --> C[Confirm Block User]
    C --> D[Create User Block]
    D --> E[Restrict Future Interaction Outside Active Transaction Duties]
    E --> Z([End])
    B -- Unblock --> F[Confirm Unblock User]
    F --> G[Remove User Block]
    G --> H[Restore Future Interaction Only]
    H --> Z
    B -- Report --> I[Select Target and Required Reason]
    I --> J[Add Optional Description and Evidence]
    J --> K{Required Data Valid?}
    K -- No --> L[Show Validation Errors]
    L --> I
    K -- Yes --> M[Submit Report]
    M --> N[Queue for Activity 15 Administrative Review]
    N --> Z
```

Block/Unblock and Report are independent actions. Blocking does not cancel an Active Transaction. Unblock does not reopen ended Requests/Transactions or cancel a prior Report. Generic Report requires a Reason; Description is not universally mandatory.
