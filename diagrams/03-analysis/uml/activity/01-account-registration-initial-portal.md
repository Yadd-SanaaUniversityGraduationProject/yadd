# Activity 01 — Account Registration & Initial Portal Selection

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-077/078, BR-045/048/049, Account & Portal Model.

```mermaid
flowchart TD
    S([Start]) --> A[Guest Opens Account Registration]
    A --> B[Enter Required Account Data and Mobile Number]
    B --> C{Input Valid?}
    C -- No --> D[Show Validation Errors]
    D --> B
    C -- Yes --> E[Send Mobile OTP]
    E --> F[Enter OTP]
    F --> G{OTP Valid?}
    G -- No --> H[Show Verification Error]
    H --> F
    G -- Yes --> I[Create One User Account]
    I --> J[Choose Initial Portal]
    J --> K{Portal Choice}
    K -- Beneficiary --> L[Open Beneficiary Portal]
    K -- Provider --> M[Open Provider Profile Setup]
    L --> Z([End])
    M --> Z
```

The created account is one User account serving both portals. Provider selection starts profile setup; it does not create a second account or automatically grant provider eligibility.
