# Activity Diagram — Report and Administrative Review

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-18 THROUGH DEC-089`
>
> **Type:** Derived workflow view focused on the Report branch of `UC-08 — Block and Report User / Content`.

## Source basis

- `UC-08 — Block and Report User / Content`
- `DEC-053`, `DEC-054`, `DEC-089`
- `BR-021`, `BR-022`, `BR-066`
- Current Trust & Safety / moderation rules and traceability.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[User Chooses Report]
    A --> B[Select Report Target and Enter Details]
    B --> C[Submit Report]
    C --> D[Record Report and Linked Evidence References]
    D --> E[Queue Report for Administrative Review]
    E --> F[Authorized Administrator Opens Report]
    F --> G[Review Report and Available YADD Evidence]

    G --> H{Administrative Action Warranted Under Approved Policy?}
    H -- Yes --> I{Select Human-Authorized Outcome}
    I --> I1[Warning / Content Removal / Temporary Restriction / Account Suspension / Permanent Ban]
    I1 --> J[Save Outcome + Reason + Admin + Timestamp]
    J --> Z1([End — Review Recorded])

    H -- No --> K[Record No Violation + Reason / Review Context]
    K --> Z2([End — Review Recorded])
```

## Semantic constraints

- `Block User` is independent from `Report User / Content`; one does not require the other.
- A Report is not proof of a violation and does not automatically justify a final punishment.
- Administrative action must follow approved YADD policy and human authorization.
- AI or behavioral Flags may support review elsewhere in Trust & Safety, but this Activity Diagram does not make AI a mandatory step for every Report.
- No numeric risk threshold or automatic punishment is invented here. The approved outcome catalog is: No Violation, Warning, Content Removal, Temporary Restriction, Account Suspension, Permanent Ban; high-impact outcomes require human authorization.

## Scope boundary

This diagram does not model Transaction Complaint from UC-06. Transaction Complaint has its own workflow because its semantics and `Disputed` outcome are different from generic User / Content reporting.
