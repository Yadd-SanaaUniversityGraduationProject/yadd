# Activity Diagram — Service Provider Identity Verification

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-18 THROUGH DEC-090`
>
> **Type:** Derived workflow view focused on the verification portion of `UC-09 — Service Provider Identity Verification / Provider Portal Eligibility`.

## Source basis

- `UC-09 — Service Provider Identity Verification / Provider Portal Eligibility`
- `DEC-010`, `DEC-035`, `DEC-036`, `DEC-037..040`, `DEC-085`
- Current verification business rules
- `docs/03-analysis/21-provider-verification-model.md`
- Current Verification lifecycle.

## Diagram

```mermaid
flowchart TD
    S([Start]) --> A[Service Provider Opens Identity Verification]
    A --> B[Load Verified Account Data / Legal Name]
    B --> C[Upload National ID or Passport + Personal Photo with Document]
    C --> D{Required Inputs Present and Usable?}

    D -- No --> E[Show Verification Errors]
    E --> B

    D -- Yes --> F[Submit Verification Case]
    F --> G[Set Status Submitted]
    G --> H[Authorized Reviewer Opens Case]
    H --> I[Set Status UnderReview]

    I --> J{Automated Assistance Available?}
    J -- Yes --> K[Run Assistive OCR / Quality / Match / Risk Checks]
    K --> L[Present Evidence and Assistive Indicators to Reviewer]
    J -- No --> L

    L --> M{Human Review Decision}

    M -- Verified --> N[Set VerificationCase Verified]
    N --> O[Mark Service Provider Identity Verified]
    O --> ZV([End — Verification Approved])

    M -- Resubmission Required --> P[Record Review Note / Reason]
    P --> Q[Set Status ResubmissionRequired]
    Q --> R[User Updates Verification Evidence]
    R --> F

    M -- Rejected --> T[Record Review Note / Reason]
    T --> U[Set Status Rejected]
    U --> ZR([End — Rejected])
```

## Product Provider boundary

Product Provider does not enter this Government-ID flow in MVP; it uses Account Verification + Provider Profile eligibility + Active Subscription and must not be labeled Identity Verified.

## Semantic constraints

- Uploading documents does not activate Provider Profile automatically.
- Final `Verified`, `ResubmissionRequired`, or `Rejected` decision is human and must come from an authorized reviewer.
- Automated checks are advisory only and do not make the final verification decision.
- `Verified` satisfies the verification condition only; it does not by itself mean that every Provider eligibility or activation condition has been fulfilled.
- Provider permissions remain subject to the other applicable conditions defined elsewhere in the project model.
- Before `Verified`, the account may continue as Beneficiary but cannot use Provider functions that require verification.
- Sensitive verification data is non-public and access-controlled.
- Accepted MVP document types are National ID or Passport; retention periods and profession-specific licenses remain open.

## Presentation note

هذا Activity Diagram يركز على lifecycle وdecision logic للتحقق فقط. نجاح التحقق لا يساوي تلقائيًا اكتمال جميع شروط أهلية Provider، كما أن تفاصيل Provider Profile editing أو subscription ليست جزءًا من مسار التحقق نفسه.
