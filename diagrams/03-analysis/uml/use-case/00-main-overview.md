# Use Case View 00 — YADD Main Use Case Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED — DETAILED MAIN VIEW — SYNCHRONIZED THROUGH DEC-077`
>
> **Purpose:** Detailed main Actor–goal view of the single YADD Use Case Model. This file preserves the decomposed Main Diagram Use Cases and the approved/derived UML relationships currently documented in `08-use-cases.md`.
>
> **Presentation basis:** The team-supplied academic Use Case examples guide the presentation style only: Actors remain outside the system boundary, Actor associations are distinct from Use Case relationships, and `<<include>>`, `<<extend>>`, and Actor generalization are shown explicitly only where the YADD model supports them.

## Source basis

- `docs/00-governance/02-decision-register.md`
- `docs/03-analysis/05-SRS.md`
- `docs/03-analysis/06-business-rules.md`
- `docs/03-analysis/07-lifecycles.md`
- `docs/03-analysis/08-use-cases.md`
- `docs/03-analysis/10-UML.md`
- DEC-066..077, especially DEC-067/069/070/071/072/073/074/076/077.

## Diagram

```mermaid
flowchart LR
    G["Guest"]:::actor
    B["Beneficiary"]:::actor

    subgraph SYS["YADD System"]
        direction TB

        subgraph ACCESS["Access, Account & Discovery"]
            direction LR
            BROWSE(["Browse Public Content"]):::usecase
            SEARCH(["Search Providers"]):::usecase
            PROFILE(["View Provider Profile"]):::usecase
            VIEW_PORTFOLIO(["View Portfolio / Catalog"]):::usecase
            LOGIN(["Log In"]):::usecase
            REGISTER(["Create Account"]):::usecase
            MANAGE_ACCOUNT(["Manage Account"]):::usecase
            CHAT(["Communicate / Inquire"]):::usecase
        end

        subgraph REQUESTS["Request & Provider Response"]
            direction LR
            CREATE_REQ(["Create Request"]):::usecase
            CLOSE_REQ(["Close Open Request"]):::usecase
            COMPARE(["Compare Provider Responses"]):::usecase
            SELECT(["Select Provider"]):::usecase
            VIEW_MATCHING(["View Matching Requests"]):::usecase
            SUBMIT_RESPONSE(["Submit Provider Response"]):::usecase
            EDIT_RESPONSE(["Edit Provider Response"]):::usecase
            WITHDRAW_RESPONSE(["Withdraw Provider Response"]):::usecase
            VALIDATE_RESPONSE(["Validate Response Eligibility"]):::systemuc
        end

        subgraph TRANSACTION["Transaction Start & Cancellation"]
            direction LR
            REQUEST_START(["Request Transaction Start"]):::usecase
            CONFIRM_START(["Confirm Transaction Start"]):::usecase
            CREATE_TX(["Create Active Transaction"]):::systemuc
            CANCEL_TX(["Cancel Transaction"]):::usecase
        end

        subgraph INVOICE["Invoice, Complaint & Completion"]
            direction LR
            CREATE_INV(["Create Final Invoice"]):::usecase
            REVIEW_INV(["Review Final Invoice"]):::usecase
            APPROVE_INV(["Approve Final Invoice"]):::usecase
            REQUEST_REV(["Request Invoice Revision"]):::usecase
            REVISE_INV(["Revise Final Invoice"]):::usecase
            COMPLAINT(["Raise Transaction Complaint"]):::usecase
            REVIEW_COMPLAINT(["Review Transaction Complaint"]):::usecase
            COMPLETE_TX(["Complete Transaction"]):::systemuc
            RATE_PROVIDER(["Rate Provider"]):::usecase
            RATE_BENEFICIARY(["Rate Beneficiary"]):::usecase
        end

        subgraph PROVIDER_TRUST["Provider Management, Verification & Safety"]
            direction LR
            MANAGE_PROFILE(["Manage Provider Profile"]):::usecase
            MANAGE_PORTFOLIO(["Manage Portfolio / Catalog"]):::usecase
            SERVICE_AREAS(["Manage Service Areas"]):::usecase
            SUBMIT_VERIFICATION(["Submit Verification"]):::usecase
            REVIEW_VERIFICATION(["Review Provider Verification"]):::usecase
            SUBSCRIPTION(["Manage Provider Subscription"]):::usecase
            BLOCK(["Block User"]):::usecase
            REPORT(["Report User / Content"]):::usecase
            REVIEW_REPORTS(["Review Reports / Flags"]):::usecase
        end
    end

    P["Provider"]:::actor
    SP["Service Provider"]:::actor
    PP["Product Provider"]:::actor
    A["YADD Administrator"]:::actor

    %% Guest associations
    G --- BROWSE
    G --- SEARCH
    G --- PROFILE
    G --- VIEW_PORTFOLIO
    G --- LOGIN
    G --- REGISTER

    %% Beneficiary associations
    B --- MANAGE_ACCOUNT
    B --- SEARCH
    B --- PROFILE
    B --- CREATE_REQ
    B --- CLOSE_REQ
    B --- COMPARE
    B --- CHAT
    B --- SELECT
    B --- REQUEST_START
    B --- CONFIRM_START
    B --- CANCEL_TX
    B --- REVIEW_INV
    B --- APPROVE_INV
    B --- REQUEST_REV
    B --- COMPLAINT
    B --- RATE_PROVIDER
    B --- BLOCK
    B --- REPORT

    %% Provider associations
    P --- MANAGE_ACCOUNT
    P --- MANAGE_PROFILE
    P --- MANAGE_PORTFOLIO
    P --- SERVICE_AREAS
    P --- SUBMIT_VERIFICATION
    P --- VIEW_MATCHING
    P --- SUBMIT_RESPONSE
    P --- EDIT_RESPONSE
    P --- WITHDRAW_RESPONSE
    P --- CHAT
    P --- REQUEST_START
    P --- CONFIRM_START
    P --- CANCEL_TX
    P --- CREATE_INV
    P --- REVISE_INV
    P --- RATE_BENEFICIARY
    P --- BLOCK
    P --- REPORT

    %% Administrator associations
    A --- REVIEW_VERIFICATION
    A --- REVIEW_REPORTS
    A --- REVIEW_COMPLAINT
    A --- SUBSCRIPTION

    %% Actor generalization
    SP -. "«generalization»" .-> P
    PP -. "«generalization»" .-> P

    %% Approved / derived extend relationships
    PROFILE -. "«extend»" .-> SEARCH
    VIEW_PORTFOLIO -. "«extend»" .-> PROFILE
    CHAT -. "«extend»" .-> PROFILE
    CHAT -. "«extend»" .-> COMPARE
    SELECT -. "«extend»" .-> COMPARE
    SUBMIT_RESPONSE -. "«extend»" .-> VIEW_MATCHING
    REQUEST_START -. "«extend»" .-> CHAT
    APPROVE_INV -. "«extend»" .-> REVIEW_INV
    REQUEST_REV -. "«extend»" .-> REVIEW_INV
    COMPLAINT -. "«extend»" .-> REVIEW_INV

    %% Approved / derived include relationships
    SUBMIT_RESPONSE -. "«include»" .-> VALIDATE_RESPONSE
    SELECT -. "«include»" .-> CREATE_TX
    CONFIRM_START -. "«include»" .-> CREATE_TX
    APPROVE_INV -. "«include»" .-> COMPLETE_TX

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#FFFFFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;
    classDef systemuc fill:#FFF8E6,stroke:#B7791F,stroke-width:1.4px,color:#111827;

    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.4px
    style ACCESS fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style REQUESTS fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style TRANSACTION fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style INVOICE fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style PROVIDER_TRUST fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
```

## How to read this view

- Solid lines connect an external Actor to a Use Case that the Actor participates in.
- Dashed relationships labeled `«extend»` represent optional/conditional behavior that extends a base Use Case.
- Dashed relationships labeled `«include»` represent mandatory included behavior.
- Gold Use Cases are included system behavior and are **not independent Actor goals**.
- `Service Provider` and `Product Provider` are specializations of `Provider`. In MVP, one Provider Profile operates under exactly one of these two Provider Types at a time.

## Authentication boundary

`Log In` and `Create Account` are **not** mechanically included by every protected Use Case. Authentication is a precondition for protected Beneficiary/Provider goals. A Guest may see a protected CTA, but must authenticate before the protected action can be executed.

## Lifecycle / state dependencies that are intentionally not `include` or `extend`

| Use Case | Required dependency / precondition |
|---|---|
| `Rate Provider` | Transaction must already be `Completed`; the Beneficiary rating is then required by the current model. |
| `Rate Beneficiary` | Transaction must already be `Completed`; the Provider rating remains optional. |
| `Cancel Transaction` | Transaction exists and is in a cancellable active state. |
| `Close Open Request` | Request is `Open` and no Provider has been selected. |
| `Edit Provider Response` | An active response exists; Request remains `Open`; no Provider has been selected. |
| `Withdraw Provider Response` | An active response exists; Request remains `Open`; no Provider has been selected. |
| `Review Final Invoice` | Final Invoice is `Pending Customer Approval`. |
| `Revise Final Invoice` | Beneficiary previously requested an invoice revision. |
| `Review Provider Verification` | A verification submission exists. |
| `Review Transaction Complaint` | A Transaction complaint exists. |
| `Submit Provider Response` | Provider is Verified, Subscription is Active and Request is Open; the mandatory eligibility check is modeled by `Validate Response Eligibility`. |

## Coverage note

This is the **detailed Main Use Case View**. Views 01–04 do not define different models; they provide focused, easier-to-read views of the same Use Case elements and relationships for Public Access & Discovery, Request & Provider Response, Transaction/Invoice/Rating, and Provider Management/Verification/Safety.