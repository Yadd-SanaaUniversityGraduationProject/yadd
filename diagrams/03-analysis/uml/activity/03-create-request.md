# Activity 03 — Create Request

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-02, DEC-012/013/077/081, BR-001..003/045/052/053.

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Opens Create Request]
    A --> B[Enter Category, Neighborhood and Request Details]
    B --> C[Derive District Internally]
    C --> D{Required Data Valid?}
    D -- No --> E[Show Validation Errors]
    E --> B
    D -- Yes --> F[Review Request]
    F --> G{Publish?}
    G -- No --> H[Keep or Discard Draft]
    H --> Z([End])
    G -- Yes --> I[Create Request with Open Status]
    I --> J[Set Beneficiary Activity Time]
    J --> K[Make Request Available to Eligible Providers]
    K --> Z
```

Authentication is a precondition. User-facing location is Neighborhood; District is derived internally. Publication creates an Open Request, not a Transaction.
