# Use Case View 04 — Provider Management, Verification & Safety

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-077`
>
> **Purpose:** Focused view of Provider profile management, verification, subscription administration and safety/report review.

## Source basis

- `UC-08 — Block and Report User / Content`
- `UC-09 — Provider Verification / Portal Activation`
- `UC-10 — Manage Portfolio / Catalog`
- DEC-010/034..040/042/053/054/064/074/076/077
- Current Provider activity, verification, subscription and trust/safety models.

## Diagram

```mermaid
flowchart LR
    P["Provider"]:::actor

    subgraph SYS["YADD System"]
        direction TB

        subgraph PROFILE["Provider Management"]
            direction LR
            MANAGE_PROFILE(["Manage Provider Profile"]):::usecase
            MANAGE_SHOWCASE(["Manage Portfolio / Catalog"]):::usecase
            MANAGE_AREAS(["Manage Service Areas"]):::usecase
        end

        subgraph VERIFY["Verification"]
            direction LR
            SUBMIT_VERIFICATION(["Submit Verification"]):::usecase
            REVIEW_VERIFICATION(["Review Provider Verification"]):::usecase
        end

        subgraph SUBSCRIPTION["Subscription"]
            MANAGE_SUBSCRIPTION(["Manage Provider Subscription"]):::usecase
        end

        subgraph SAFETY["Safety & Moderation"]
            direction LR
            BLOCK(["Block User"]):::usecase
            REPORT(["Report User / Content"]):::usecase
            REVIEW_REPORTS(["Review Reports / Flags"]):::usecase
        end
    end

    B["Beneficiary"]:::actor
    A["YADD Administrator"]:::actor

    P --- MANAGE_PROFILE
    P --- MANAGE_SHOWCASE
    P --- MANAGE_AREAS
    P --- SUBMIT_VERIFICATION
    P --- BLOCK
    P --- REPORT

    B --- BLOCK
    B --- REPORT

    REVIEW_VERIFICATION --- A
    MANAGE_SUBSCRIPTION --- A
    REVIEW_REPORTS --- A

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#F7FBFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;

    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.2px
    style PROFILE fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style VERIFY fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style SUBSCRIPTION fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style SAFETY fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
```

## Semantic constraints

- Provider Profile is attached to the same User account; it is not a separate account.
- In MVP, a Provider Profile has one Provider Type only: `SERVICE` or `PRODUCT`; one or more categories may be selected within that type.
- `Submit Verification` and `Review Provider Verification` are separate Actor goals. Review requires an existing submission; this is a precondition, not an `<<include>>` / `<<extend>>` relation.
- Final verification decision is human; AI may assist but does not decide independently.
- Provider subscription administration is an administrative capability; external collection/payment details are not modeled here.
- `Block User` and `Report User / Content` are separate concepts. One does not imply the other.
- `Review Reports / Flags` is an administrative goal triggered by existing reports/flags, not an extension relationship invented for sequence.
- Guest is intentionally absent from protected Block/Report capabilities because DEC-077 requires authentication for them.
