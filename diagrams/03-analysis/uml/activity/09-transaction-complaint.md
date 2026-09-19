# Activity 09 — Transaction Complaint

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** UC-06 dispute alternative, DEC-073/084, BR-040/059, Invoice Approval & Dispute Model.

```mermaid
flowchart TD
    S([Start — Invoice Not Finally Approved]) --> A[Beneficiary Chooses Raise Complaint]
    A --> B[Enter Required Reason and Description]
    B --> C[Add Optional Attachments]
    C --> D{Required Data Present?}
    D -- No --> E[Show Validation Errors]
    E --> B
    D -- Yes --> F[Submit Transaction Complaint]
    F --> G[Administrator Reviews YADD Evidence]
    G --> H[Apply Platform Policy if Applicable]
    H --> I{Agreement Reached Before Final Approval?}
    I -- Yes --> J[Return to Invoice Resolution]
    J --> Z([End — Resolution Continues])
    I -- No --> K[Set Transaction Disputed]
    K --> L[Record Administrative Review Outcome]
    L --> Z2([End — Disputed])
```

A Complaint does not automatically set `Disputed`. Administration reviews platform evidence and policy only; it does not decide payment, refund, compensation, or external commercial entitlement.
