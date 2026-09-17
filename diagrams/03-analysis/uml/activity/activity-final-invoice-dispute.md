# Activity Diagram — Final Invoice, Revision and Dispute

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-18`
>
> **Type:** Derived workflow view focused on the decision-heavy part of `UC-06`.

## Source basis

- `UC-06 — Create, Revise and Approve Final Invoice`
- `DEC-015/016/025/050/055/071/073/083/084`
- `BR-009..013` and current dispute rule
- `docs/03-analysis/15-invoice-approval-and-dispute.md`
- Current Invoice and Transaction lifecycles.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[Provider Creates Final Invoice]
    A --> B[Send Final Invoice]
    B --> C[Invoice Pending Customer Approval]
    C --> D{Beneficiary Responds?}

    D -- No --> E{Pending Duration}
    E -- 24h --> E1[Send Reminder 1]
    E -- 48h --> E2[Send Reminder 2]
    E -- 72h --> E3[Mark Invoice Overdue]
    E1 --> C
    E2 --> C
    E3 --> C

    D -- Yes --> F{Beneficiary Decision}

    F -- Approve --> G[Show Final Approval Warning]
    G --> H{Confirm Final Approval?}
    H -- No --> C
    H -- Yes --> I[Mark Invoice Final / Immutable]
    I --> J[Set Transaction Completed]
    J --> ZC([End — Completed])

    F -- Request Revision --> K[Record Mandatory Revision Note]
    K --> L[Provider Revises Invoice]
    L --> M[Preserve Revision History]
    M --> C

    F -- Continued Disagreement --> N[Raise Complaint: Required Reason + Description / Optional Attachments]
    N --> O[Administrator Reviews YADD Evidence]
    O --> P[Apply Platform Policy if Applicable]
    P --> Q{Agreement Reached Before Final Approval?}
    Q -- Yes --> R[Return to Invoice Resolution Flow]
    R --> C
    Q -- No --> T[Set Transaction Disputed]
    T --> ZD([End — Disputed])
```

## Semantic constraints

- No response is not approval and there is no Auto-Approval.
- Revision may repeat until approval or unresolved dispute.
- Complaint itself does not automatically create `Disputed`.
- Administration reviews platform evidence and applies YADD policy only; it does not decide Payment, Refund, Compensation, or external financial rights.
- `Completed` opens post-transaction ratings in later workflows; `Disputed` does not.
- Pending timing is approved: 24h/48h reminders and Overdue at 72h without Auto-Approval.
- Revision count is not capped; after the second consecutive revision the UI surfaces Complaint as an option.

## Presentation note

هذا الرسم يركز على decision logic للفواتير والنزاع؛ لذلك لا يكرر Create Request أو Provider Selection أو Ratings.
