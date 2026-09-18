# Activity Diagram — Direct Search Route

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-18 THROUGH DEC-082`
>
> **Type:** Derived workflow view based on `UC-01 — Search and Inquire Directly` and the approved direct-start rules.

## Source basis

- `UC-01 — Search and Inquire Directly`
- `DEC-012`, `DEC-031..033`, `DEC-046`, `DEC-047`, `DEC-064`, `DEC-066`, `DEC-069`, `DEC-075`, `DEC-082`
- Current communication and Transaction-start business rules.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Searches Providers by Category and Area]
    A --> B[View Provider Profile and Portfolio / Catalog]
    B --> C{Start or Continue Inquiry?}
    C -- No --> Z([End — No Transaction])
    C -- Yes --> D[Open or Reuse Continuing Conversation]
    D --> D1[Private Chat / Inquiry]

    D1 --> E{Either Party Requests Transaction Start?}
    E -- No --> F{Continue Chat?}
    F -- Yes --> D1
    F -- No --> Z

    E -- Yes --> G[Create Pending Transaction Start Request]
    G --> G1[Set Expiry = 12 Hours]
    G1 --> H{Other Party Response Before Expiry?}
    H -- Confirm --> I[Create Active Transaction]
    I --> J[Continue Through Common Transaction / Invoice Flow]
    J --> ZE([End of Direct-Search Activity View])

    H -- Reject --> K{Continue Chat?}
    H -- No Response / 12h --> X[Set Start Request = Expired]
    X --> K
    K -- Yes --> D1
    K -- No --> Z
```

## Semantic constraints

- بين نفس Beneficiary ونفس Provider توجد Conversation واحدة مستمرة وفق DEC-075؛ إذا كانت موجودة يعاد استخدامها، وإذا لم تكن موجودة تُفتح Conversation جديدة.
- Private Chat by itself never creates a Transaction.
- Either Beneficiary or Provider may request Transaction Start.
- `Active Transaction` is created only after the other party confirms within 12 hours.
- Only one Pending Transaction Start Request may exist between the pair at a time.
- Rejection or 12-hour expiry cancels only the start request; the continuing Conversation remains available and a new start request may be sent later.
- There is no standalone `Agreement` entity/form in this route.
- تمثيل حدود Transactions داخل Conversation المستمرة وربط Message/System Event بمعاملة محددة يبقى ضمن Chapter Four ولا يحسمه هذا Activity Diagram.

## Scope boundary

Cancellation, Final Invoice, Complaint, Completion and Ratings are intentionally represented in their common downstream workflows rather than duplicated here.
