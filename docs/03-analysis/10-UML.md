# UML Working Models

> **الحالة:** `DRAFT / SUBJECT TO GOV-Q02`

## Activity — Service Request to Agreement

```mermaid
flowchart TD
    S([Start]) --> A[Customer creates request]
    A --> B{Valid data?}
    B -- No --> A
    B -- Yes --> C[Publish request]
    C --> D[Eligible providers view request]
    D --> E[Provider submits offer]
    E --> F[Customer compares offers]
    F --> G{Accept offer?}
    G -- No --> D
    G -- Yes --> H[Record agreement]
    H --> I([End])
```

## Sequence — Offer Acceptance and Invoice Candidate

```mermaid
sequenceDiagram
    actor C as Customer
    participant Y as YADD
    actor P as Provider

    C->>Y: Publish service request
    Y-->>P: Expose/notify eligible request
    P->>Y: Submit offer
    Y-->>C: Show offer
    C->>Y: Accept selected offer
    Y-->>P: Agreement recorded
    P->>Y: Create invoice
    Y-->>C: Request invoice confirmation
    alt accepted
        C->>Y: Accept invoice
        Y-->>P: Transaction closure status
    else revision/rejection
        C->>Y: Request revision / reject
        Y-->>P: Invoice response
    end
```

## Class Model — Conceptual Candidate

```mermaid
classDiagram
    class User
    class Role
    class ProviderProfile
    class ServiceRequest
    class Offer
    class Agreement
    class Invoice
    class Review
    class Category
    class Area
    class PortfolioItem

    User "*" -- "*" Role
    User "1" -- "0..1" ProviderProfile
    User "1" --> "*" ServiceRequest : creates
    ProviderProfile "1" --> "*" Offer : submits
    ServiceRequest "1" --> "*" Offer
    Offer "0..1" --> "1" Agreement : selected as
    Agreement "1" --> "0..*" Invoice
    Agreement "1" --> "0..2" Review
    ServiceRequest "*" --> "1" Category
    ServiceRequest "*" --> "1" Area
    ProviderProfile "1" --> "*" PortfolioItem
```

Role model وInvoice cardinality وReviews تعتمد على القرارات المفتوحة.
