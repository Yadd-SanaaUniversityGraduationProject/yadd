# Activity 17 — Guest Public Browsing & Protected Action Gate

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-077/031, FR-GST-01..06, FR-003, UC-00, PUB-01..06.

```mermaid
flowchart TD
    S([Start — Guest]) --> A[Open Public Discovery]
    A --> B[Search Providers by Category and Neighborhood]
    B --> C[Derive District Internally from Neighborhood]
    C --> D[Display Matching Public Provider Results]
    D --> E{Open Provider Profile?}
    E -- No --> F[Keep Public Search Results Open]
    E -- Yes --> G[Display Approved Public Provider Profile]
    G --> H{View Portfolio / Catalog?}
    H -- Yes --> I[Display Approved Public Portfolio / Catalog Items]
    H -- No --> J[Keep Public Profile Open]
    I --> J
    F --> K{Attempt Protected Action?}
    J --> K
    K -- No --> L[Continue Public Browsing]
    K -- Yes --> M[Require Authentication]
    M --> N[Display Log In or Create Account Gate]
    N --> O{Authentication Choice}
    O -- Log In --> P[Open Log In]
    O -- Create Account --> Q[Open Account Registration]
    O -- Return --> R[Restore Public Browsing Context]
    P --> R
    Q --> R
    L --> R
    R --> T[Display Public Home or Restored Public Context]
    T --> Z([End — Complete Public Browsing Flow])
```

Guest is an unauthenticated actor, not a stored account or separate domain entity. Public information excludes phone/direct private-contact data, identity-verification evidence, subscription internals, Transactions, Reports and other private account data. Protected actions include creating a Request, starting private Chat or a Transaction, submitting a Rating, Blocking a User and submitting a Report. Backend/API authorization is the security boundary; a UI redirect alone is not sufficient. Exact continuation to the originally intended protected action after Authentication remains intentionally unspecified, so the flow restores public-browsing context without inventing that behavior.
