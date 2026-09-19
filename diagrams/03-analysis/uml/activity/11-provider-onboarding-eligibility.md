# Activity 11 — Provider Onboarding & Eligibility

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-010/030/043/074/076/080/085/086, BR-030/041/043/051/060/062, Provider Activity Model.

```mermaid
flowchart TD
    S([Start]) --> A[User Opens Provider Profile Setup]
    A --> B[Choose One Provider Type]
    B --> C{Service or Product?}
    C -- Service --> D[Enter Shared Profile Data and Service Areas]
    C -- Product --> D
    D --> E[Choose One or More Valid Categories]
    E --> F{Profile and Activities Complete?}
    F -- No --> G[Keep Provider Profile Draft]
    G --> Z([End — Setup Incomplete])
    F -- Yes --> H{Service Provider?}
    H -- Yes --> I[Complete Activity 12 Identity Verification]
    H -- No --> J[Check Account / Profile Eligibility]
    I --> J
    J --> K[Complete Activity 16 Subscription Activation]
    K --> L{All Applicable Conditions Satisfied?}
    L -- No --> M[Show Current Eligibility Restrictions]
    M --> Z2([End — Provider Portal Available])
    L -- Yes --> N[Enable New Provider Interactions]
    N --> Z2
```

One Provider Profile has exactly one type in MVP. Draft may temporarily have no Category, but provider-function eligibility requires at least one valid Category. Product Providers do not perform government-ID verification; both types require an Active Subscription for new interactions.
