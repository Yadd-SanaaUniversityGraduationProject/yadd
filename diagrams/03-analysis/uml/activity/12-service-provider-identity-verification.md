# Activity 12 — Service Provider Identity Verification

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-09, DEC-010/035..040/085, BR-060/061, Provider Verification Model.

```mermaid
flowchart TD
    S([Start]) --> A[Service Provider Opens Identity Verification]
    A --> B[Load Verified Account Data and Legal Name]
    B --> C[Upload National ID or Passport and Personal Photo with Document]
    C --> D{Inputs Present and Usable?}
    D -- No --> E[Show Verification Errors]
    E --> B
    D -- Yes --> F[Submit Verification Case]
    F --> G[Set Status Submitted then Under Review]
    G --> H[Run Optional Assistive Checks]
    H --> I[Authorized Human Reviewer Examines Evidence]
    I --> J{Human Decision}
    J -- Verified --> K[Set Case Verified]
    K --> Z1([End — Verification Approved])
    J -- Resubmission Required --> L[Record Review Note or Reason]
    L --> M[Set Resubmission Required]
    M --> C
    J -- Rejected --> N[Record Review Note or Reason]
    N --> O[Set Case Rejected]
    O --> Z2([End — Rejected])
```

Automated checks are advisory; the final decision is human. Verification data is private and access-controlled. Verification satisfies only the identity condition, not every Provider eligibility condition.
