# Preview — YADD Use Case Model — View A of 2

> **Status:** `PROPOSAL / VISUAL PREVIEW — NOT BASELINED`
>
> **Purpose:** Temporary Mermaid preview for human visual review before any adoption into the formal Use Case documentation. This file does **not** replace `00-main-overview.md` and does not change the approved Use Case semantics.
>
> **Focus:** Guest / Beneficiary journey with Provider shown only where interaction is required to understand the same journey.

## Mermaid Preview

```mermaid
%%{init: {"flowchart": {"curve": "linear", "nodeSpacing": 30, "rankSpacing": 34, "htmlLabels": true}}}%%
flowchart LR

    subgraph LEFT[" "]
        direction TB
        G["Guest"]:::actor
        B["Beneficiary"]:::actor
    end

    subgraph SYS["YADD System — View A of 2"]
        direction TB

        subgraph R1[" "]
            direction LR
            REGISTER(["Create Account"]):::usecase
            LOGIN(["Log In"]):::anchor
            ACCOUNT(["Manage Account"]):::usecase
        end

        subgraph R2[" "]
            direction LR
            BROWSE(["Browse Public Content"]):::usecase
            SEARCH(["Search Providers"]):::usecase
            PROFILE(["View Provider Profile"]):::usecase
            PORTFOLIO(["View Portfolio / Catalog"]):::usecase
        end

        subgraph R3[" "]
            direction LR
            CREATE_REQ(["Create Request"]):::usecase
            CLOSE_REQ(["Close Open Request"]):::usecase
            COMPARE(["Compare Provider Responses"]):::usecase
            SELECT(["Select Provider"]):::usecase
        end

        subgraph R4[" "]
            direction LR
            CHAT(["Communicate / Inquire"]):::usecase
            REQUEST_START(["Request Transaction Start"]):::usecase
            CONFIRM_START(["Confirm Transaction Start"]):::usecase
            CREATE_TX(["Create Active Transaction"]):::systemuc
            CANCEL_TX(["Cancel Transaction"]):::usecase
        end

        subgraph R5[" "]
            direction LR
            REVIEW_INV(["Review Final Invoice"]):::usecase
            APPROVE_INV(["Approve Final Invoice"]):::usecase
            REQUEST_REV(["Request Invoice Revision"]):::usecase
            COMPLAINT(["Raise Transaction Complaint"]):::usecase
            COMPLETE_TX(["Complete Transaction"]):::systemuc
            RATE_PROVIDER(["Rate Provider"]):::usecase
        end

        subgraph R6[" "]
            direction LR
            BLOCK(["Block User"]):::usecase
            REPORT(["Report User / Content"]):::usecase
        end
    end

    P["Provider"]:::actor

    %% Guest associations
    G --- REGISTER
    G --- LOGIN
    G --- BROWSE
    G --- SEARCH

    %% Beneficiary associations: principal goals only where possible
    B --- ACCOUNT
    B --- SEARCH
    B --- CREATE_REQ
    B --- CLOSE_REQ
    B --- COMPARE
    B --- CHAT
    B --- CONFIRM_START
    B --- CANCEL_TX
    B --- REVIEW_INV
    B --- RATE_PROVIDER
    B --- BLOCK
    B --- REPORT

    %% Provider is deliberately kept on the right edge of View A
    CHAT --- P
    REQUEST_START --- P
    CONFIRM_START --- P
    CANCEL_TX --- P

    %% Approved / derived extend relationships
    PROFILE -. "«extend»" .-> SEARCH
    PORTFOLIO -. "«extend»" .-> PROFILE
    CHAT -. "«extend»" .-> PROFILE
    CHAT -. "«extend»" .-> COMPARE
    SELECT -. "«extend»" .-> COMPARE
    REQUEST_START -. "«extend»" .-> CHAT
    APPROVE_INV -. "«extend»" .-> REVIEW_INV
    REQUEST_REV -. "«extend»" .-> REVIEW_INV
    COMPLAINT -. "«extend»" .-> REVIEW_INV

    %% Approved / derived include relationships
    SELECT -. "«include»" .-> CREATE_TX
    CONFIRM_START -. "«include»" .-> CREATE_TX
    APPROVE_INV -. "«include»" .-> COMPLETE_TX

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#FFFFFF,stroke:#3F6FA5,stroke-width:1.35px,color:#111827;
    classDef anchor fill:#EEF6FF,stroke:#2563EB,stroke-width:2px,color:#111827,font-weight:bold;
    classDef systemuc fill:#FFF8E6,stroke:#B7791F,stroke-width:1.35px,color:#111827;

    style LEFT fill:transparent,stroke:transparent
    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.4px
    style R1 fill:transparent,stroke:transparent
    style R2 fill:transparent,stroke:transparent
    style R3 fill:transparent,stroke:transparent
    style R4 fill:transparent,stroke:transparent
    style R5 fill:transparent,stroke:transparent
    style R6 fill:transparent,stroke:transparent
```

## Reading notes

- `Log In` is visually emphasized as the shared anchor intended to align with View B, but Authentication remains a **precondition** for protected actions rather than an automatic `<<include>>` relation.
- `Provider` is intentionally placed on the right edge because View B will continue from the Provider side.
- `Create Active Transaction` and `Complete Transaction` are included system behaviors, not independent Actor goals.
- This preview intentionally connects Actors mainly to principal goals and uses the documented `<<include>>` / `<<extend>>` relations to expose subordinate behavior, following the academic reference style.
- View B is not created yet; this file exists only so the team can judge View A visually in GitHub first.

## Source basis

- `docs/03-analysis/08-use-cases.md`
- DEC-066..077, especially DEC-069/071/072/077.
