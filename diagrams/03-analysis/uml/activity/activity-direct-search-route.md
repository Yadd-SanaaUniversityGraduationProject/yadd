# Activity Diagram — Direct Search Route

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-12`
>
> **Type:** Derived workflow view based on `UC-01 — Search and Inquire Directly` and the approved direct-start rules.

## Source basis

- `UC-01 — Search and Inquire Directly`
- `DEC-012`, `DEC-031..033`, `DEC-046`, `DEC-047`, `DEC-064`, `DEC-066`, `DEC-069`, `DEC-075`
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

    E -- Yes --> G[Send Request Transaction Start]
    G --> H{Other Party Confirms?}
    H -- Yes --> I[Create Active Transaction]
    I --> J[Continue Through Common Transaction / Invoice Flow]
    J --> ZE([End of Direct-Search Activity View])

    H -- No / Reject --> K{Continue Chat?}
    K -- Yes --> D1
    K -- No --> Z
```

## Semantic constraints

- بين نفس Beneficiary ونفس Provider توجد Conversation واحدة مستمرة وفق DEC-075؛ إذا كانت موجودة يعاد استخدامها، وإذا لم تكن موجودة تُفتح Conversation جديدة.
- Private Chat by itself never creates a Transaction.
- Either Beneficiary or Provider may request Transaction Start.
- `Active Transaction` is created only after the other party confirms.
- No confirmation or rejection leaves the parties without a Transaction; the continuing Conversation may remain available for later interaction.
- There is no standalone `Agreement` entity/form in this route.
- تمثيل حدود Transactions داخل Conversation المستمرة وربط Message/System Event بمعاملة محددة يبقى ضمن Chapter Four ولا يحسمه هذا Activity Diagram.

## Scope boundary

Cancellation, Final Invoice, Complaint, Completion and Ratings are intentionally represented in their common downstream workflows rather than duplicated here.
