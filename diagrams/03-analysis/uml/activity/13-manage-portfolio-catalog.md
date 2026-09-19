# Activity 13 — Manage Portfolio / Catalog

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-10, DEC-064/074/077, BR-035/036/041/044, Provider Activity Model.

```mermaid
flowchart TD
    S([Start]) --> A[Provider Opens Portfolio / Catalog Management]
    A --> B{Choose Operation}
    B -- Add --> C[Enter Item Data and Media]
    B -- Edit --> D[Update Existing Item]
    B -- Remove --> E[Confirm Item Removal]
    C --> F{Data Valid for Provider Type?}
    D --> F
    F -- No --> G[Show Validation Errors]
    G --> B
    F -- Yes --> H[Save Display Copy]
    E --> I{Removal Confirmed?}
    I -- No --> B
    I -- Yes --> J[Remove Item from Public Showcase]
    H --> K[Refresh Public Provider Showcase]
    J --> K
    K --> L{Manage Another Item?}
    L -- Yes --> B
    L -- No --> Z([End])
```

Service Providers manage Portfolio items; Product Providers manage Catalog items. Public display copies expose only approved public fields and do not expose private account, verification, subscription, transaction, or report data.
