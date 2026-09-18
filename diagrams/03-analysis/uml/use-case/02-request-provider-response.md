# Use Case View 02 — Request & Provider Response

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-090`
>
> **Purpose:** Focused view of the published Request route from request creation through Provider Responses, comparison and Provider selection.

## Source basis

- `UC-02 — Create Request`
- `UC-03 — Respond to Request`
- `UC-04 — Select Provider from Request`
- DEC-013/014/041/043/047/066/070/077/081/082/085/086
- Approved relationship table in `docs/03-analysis/08-use-cases.md`.

## Diagram

```mermaid
flowchart LR
    B["Beneficiary"]:::actor

    subgraph SYS["YADD System"]
        direction TB

        subgraph BENEFICIARY["Beneficiary Goals"]
            direction LR
            CREATE_REQ(["Create Request"]):::usecase
            CLOSE_REQ(["Close Open Request"]):::usecase
            REPUBLISH(["Republish Expired Request"]):::usecase
            COMPARE(["Compare Provider Responses"]):::usecase
            CHAT(["Communicate / Inquire"]):::usecase
            SELECT(["Select Provider"]):::usecase
        end

        subgraph PROVIDER_SIDE["Provider Goals"]
            direction LR
            MATCHING(["View Matching Requests"]):::usecase
            SUBMIT(["Submit Provider Response"]):::usecase
            EDIT(["Edit Provider Response"]):::usecase
            WITHDRAW(["Withdraw Provider Response"]):::usecase
        end

        subgraph SYSTEM_BEHAVIOR["Included System Behavior"]
            direction LR
            VALIDATE(["Validate Response Eligibility"]):::systemcase
            CREATE_TX(["Create Active Transaction"]):::systemcase
        end
    end

    P["Provider"]:::actor

    B --- CREATE_REQ
    B --- CLOSE_REQ
    B --- REPUBLISH
    B --- COMPARE
    B --- CHAT
    B --- SELECT

    MATCHING --- P
    SUBMIT --- P
    EDIT --- P
    WITHDRAW --- P
    CHAT --- P

    SUBMIT -.->|«extend»| MATCHING
    SUBMIT -.->|«include»| VALIDATE
    CHAT -.->|«extend»| COMPARE
    SELECT -.->|«extend»| COMPARE
    SELECT -.->|«include»| CREATE_TX

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#F7FBFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;
    classDef systemcase fill:#FFF7D6,stroke:#C79200,stroke-width:1.4px,color:#111827;

    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.2px
    style BENEFICIARY fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style PROVIDER_SIDE fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style SYSTEM_BEHAVIOR fill:#FFFDF5,stroke:#E5C45B,stroke-width:1px
```

## Semantic constraints

- Request Closure is allowed before Provider selection and is not Transaction Cancellation.
- A Provider may keep only one active Provider Response per Request.
- `Edit Provider Response` and `Withdraw Provider Response` require an existing active response, an `Open` Request and no selected Provider.
- `Validate Response Eligibility` is mandatory for a new Provider Response and enforces type-specific eligibility + Active Subscription + Open Request. SERVICE requires Identity Verified; PRODUCT does not require Government-ID verification.
- `Select Provider` always creates one Active Transaction for the selected Provider and closes the Request to new responses.
- `Communicate / Inquire` before selection is optional and therefore extends comparison rather than being required by it.

## DEC-081/082/085/086 synchronization

- Request inactivity: reminders at 24h/48h and Expired at 72h; meaningful Beneficiary activity resets the clock, Provider Response arrival alone does not; Republish creates a new editable Request and never reopens the expired one.
- User-facing Request location uses Neighborhood only; District is derived internally from the selected Neighborhood.
- Provider Response has no independent expiry; it ends with Withdraw/Selection/Request Close/Expiry.
- Submit Provider Response eligibility is type-specific: SERVICE requires Identity Verified; PRODUCT requires Account/Profile eligible; both require Active Subscription.
