# Activity 02 — Direct Search & Inquiry

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-01, DEC-012/031..033/046/064/075/077, BR-001/005/042/044/047.

```mermaid
flowchart TD
    S([Start]) --> A[Search Providers by Category and Neighborhood]
    A --> B[Derive District Internally]
    B --> C[Display Matching Public Provider Results]
    C --> D{Open Provider Profile?}
    D -- No --> Z([End])
    D -- Yes --> E[View Public Profile and Portfolio / Catalog]
    E --> F{Start Private Inquiry?}
    F -- No --> Z
    F -- Yes --> G{Authenticated?}
    G -- No --> H[Open Log In / Create Account Gate]
    H --> Z
    G -- Yes --> I[Open or Reuse Persistent Conversation]
    I --> J[Exchange Private Messages]
    J --> K{Continue Inquiry?}
    K -- Yes --> J
    K -- No --> Z
```

Chat alone does not create a Transaction. Public views exclude phone/direct private-contact data and sensitive records. One persistent Conversation is reused for the same Beneficiary–Provider pair.
