# Use Case View 00 — YADD Main Overview

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-077`
>
> **Purpose:** High-level overview of the single YADD Use Case Model. Detailed `<<include>>`, `<<extend>>`, lifecycle and precondition semantics are intentionally delegated to the detailed view below and the focused Views 01–04.

## Source basis

- `docs/00-governance/02-decision-register.md`
- `docs/03-analysis/08-use-cases.md`
- `docs/03-analysis/10-UML.md`
- DEC-066..077, especially DEC-067/072/077.

## Main Overview Diagram

```mermaid
flowchart LR
    G["Guest"]:::actor
    B["Beneficiary"]:::actor

    subgraph SYS["YADD System"]
        direction TB

        subgraph ACCESS["Access & Discovery"]
            direction LR
            LOGIN(["Log In"]):::usecase
            REGISTER(["Create Account"]):::usecase
            UC00(["Browse Public Provider<br/>Information"]):::usecase
            UC01(["Search and Inquire<br/>Directly"]):::usecase
        end

        subgraph REQUESTS["Request & Matching"]
            direction LR
            UC02(["Create Request"]):::usecase
            UC03(["Respond to Request"]):::usecase
            UC04(["Select Provider<br/>from Request"]):::usecase
        end

        subgraph TRANSACTIONS["Transaction & Completion"]
            direction LR
            UC05(["Cancel Active<br/>Transaction"]):::usecase
            UC06(["Create, Revise and Approve<br/>Final Invoice"]):::usecase
            UC07(["Rate Provider"]):::usecase
            UC07B(["Rate Beneficiary"]):::usecase
        end

        subgraph TRUST["Provider & Trust"]
            direction LR
            BLOCK(["Block User"]):::usecase
            REPORT(["Report User / Content"]):::usecase
            UC09(["Provider Verification /<br/>Portal Activation"]):::usecase
            UC10(["Manage Portfolio /<br/>Catalog"]):::usecase
            SUB(["Manage Provider<br/>Subscription"]):::usecase
        end
    end

    P["Provider"]:::actor
    A["YADD Administrator"]:::actor

    G --- LOGIN
    G --- REGISTER
    G --- UC00

    B --- UC01
    B --- UC02
    B --- UC04
    B --- UC05
    B --- UC06
    B --- UC07
    B --- BLOCK
    B --- REPORT

    UC01 --- P
    UC03 --- P
    UC05 --- P
    UC06 --- P
    UC07B --- P
    BLOCK --- P
    REPORT --- P
    UC09 --- P
    UC10 --- P

    REPORT --- A
    UC09 --- A
    SUB --- A

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#F7FBFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;

    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.2px
    style ACCESS fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style REQUESTS fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style TRANSACTIONS fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style TRUST fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
```

## Reading note

This overview answers only two questions: **Who interacts with YADD?** and **What major goals does each Actor have?** It intentionally avoids relationship-level detail so the diagram remains readable at repository and report scale.

`Block User` and `Report User / Content` remain separate Use Cases because the current model explicitly treats blocking and reporting as independent concepts.

---

# Detailed Main Use Case View

> **Status:** `REVIEW DRAFT — NOT BASELINED — DETAILED MAIN VIEW — SYNCHRONIZED THROUGH DEC-077`
>
> **Purpose:** Detailed Actor–goal expansion of the same YADD Use Case Model shown above. This view preserves the decomposed Main Diagram Use Cases and the approved/derived UML relationships currently documented in `08-use-cases.md`.
>
> **Presentation basis:** The team-supplied academic Use Case examples guide the presentation style only: Actors remain outside the system boundary, Actor associations are distinct from Use Case relationships, and `<<include>>`, `<<extend>>`, and Actor generalization are shown explicitly only where the YADD model supports them.

## Detailed source basis

- `docs/00-governance/02-decision-register.md`
- `docs/03-analysis/05-SRS.md`
- `docs/03-analysis/06-business-rules.md`
- `docs/03-analysis/07-lifecycles.md`
- `docs/03-analysis/08-use-cases.md`
- `docs/03-analysis/10-UML.md`
- DEC-066..077, especially DEC-067/069/070/071/072/073/074/076/077.

## Detailed Diagram

```mermaid
flowchart LR
    G2["Guest"]:::actor
    B2["Beneficiary"]:::actor

    subgraph SYS2["YADD System"]
        direction TB

        subgraph ACCESS2["Access, Account & Discovery"]
            direction LR
            BROWSE2(["Browse Public Content"]):::usecase
            SEARCH2(["Search Providers"]):::usecase
            PROFILE2(["View Provider Profile"]):::usecase
            VIEW_PORTFOLIO2(["View Portfolio / Catalog"]):::usecase
            LOGIN2(["Log In"]):::usecase
            REGISTER2(["Create Account"]):::usecase
            MANAGE_ACCOUNT2(["Manage Account"]):::usecase
            CHAT2(["Communicate / Inquire"]):::usecase
        end

        subgraph REQUESTS2["Request & Provider Response"]
            direction LR
            CREATE_REQ2(["Create Request"]):::usecase
            CLOSE_REQ2(["Close Open Request"]):::usecase
            COMPARE2(["Compare Provider Responses"]):::usecase
            SELECT2(["Select Provider"]):::usecase
            VIEW_MATCHING2(["View Matching Requests"]):::usecase
            SUBMIT_RESPONSE2(["Submit Provider Response"]):::usecase
            EDIT_RESPONSE2(["Edit Provider Response"]):::usecase
            WITHDRAW_RESPONSE2(["Withdraw Provider Response"]):::usecase
            VALIDATE_RESPONSE2(["Validate Response Eligibility"]):::systemuc
        end

        subgraph TRANSACTION2["Transaction Start & Cancellation"]
            direction LR
            REQUEST_START2(["Request Transaction Start"]):::usecase
            CONFIRM_START2(["Confirm Transaction Start"]):::usecase
            CREATE_TX2(["Create Active Transaction"]):::systemuc
            CANCEL_TX2(["Cancel Transaction"]):::usecase
        end

        subgraph INVOICE2["Invoice, Complaint & Completion"]
            direction LR
            CREATE_INV2(["Create Final Invoice"]):::usecase
            REVIEW_INV2(["Review Final Invoice"]):::usecase
            APPROVE_INV2(["Approve Final Invoice"]):::usecase
            REQUEST_REV2(["Request Invoice Revision"]):::usecase
            REVISE_INV2(["Revise Final Invoice"]):::usecase
            COMPLAINT2(["Raise Transaction Complaint"]):::usecase
            REVIEW_COMPLAINT2(["Review Transaction Complaint"]):::usecase
            COMPLETE_TX2(["Complete Transaction"]):::systemuc
            RATE_PROVIDER2(["Rate Provider"]):::usecase
            RATE_BENEFICIARY2(["Rate Beneficiary"]):::usecase
        end

        subgraph PROVIDER_TRUST2["Provider Management, Verification & Safety"]
            direction LR
            MANAGE_PROFILE2(["Manage Provider Profile"]):::usecase
            MANAGE_PORTFOLIO2(["Manage Portfolio / Catalog"]):::usecase
            SERVICE_AREAS2(["Manage Service Areas"]):::usecase
            SUBMIT_VERIFICATION2(["Submit Verification"]):::usecase
            REVIEW_VERIFICATION2(["Review Provider Verification"]):::usecase
            SUBSCRIPTION2(["Manage Provider Subscription"]):::usecase
            BLOCK2(["Block User"]):::usecase
            REPORT2(["Report User / Content"]):::usecase
            REVIEW_REPORTS2(["Review Reports / Flags"]):::usecase
        end
    end

    P2["Provider"]:::actor
    SP2["Service Provider"]:::actor
    PP2["Product Provider"]:::actor
    A2["YADD Administrator"]:::actor

    %% Guest associations
    G2 --- BROWSE2
    G2 --- SEARCH2
    G2 --- PROFILE2
    G2 --- VIEW_PORTFOLIO2
    G2 --- LOGIN2
    G2 --- REGISTER2

    %% Beneficiary associations
    B2 --- MANAGE_ACCOUNT2
    B2 --- SEARCH2
    B2 --- PROFILE2
    B2 --- CREATE_REQ2
    B2 --- CLOSE_REQ2
    B2 --- COMPARE2
    B2 --- CHAT2
    B2 --- SELECT2
    B2 --- REQUEST_START2
    B2 --- CONFIRM_START2
    B2 --- CANCEL_TX2
    B2 --- REVIEW_INV2
    B2 --- APPROVE_INV2
    B2 --- REQUEST_REV2
    B2 --- COMPLAINT2
    B2 --- RATE_PROVIDER2
    B2 --- BLOCK2
    B2 --- REPORT2

    %% Provider associations
    P2 --- MANAGE_ACCOUNT2
    P2 --- MANAGE_PROFILE2
    P2 --- MANAGE_PORTFOLIO2
    P2 --- SERVICE_AREAS2
    P2 --- SUBMIT_VERIFICATION2
    P2 --- VIEW_MATCHING2
    P2 --- SUBMIT_RESPONSE2
    P2 --- EDIT_RESPONSE2
    P2 --- WITHDRAW_RESPONSE2
    P2 --- CHAT2
    P2 --- REQUEST_START2
    P2 --- CONFIRM_START2
    P2 --- CANCEL_TX2
    P2 --- CREATE_INV2
    P2 --- REVISE_INV2
    P2 --- RATE_BENEFICIARY2
    P2 --- BLOCK2
    P2 --- REPORT2

    %% Administrator associations
    A2 --- REVIEW_VERIFICATION2
    A2 --- REVIEW_REPORTS2
    A2 --- REVIEW_COMPLAINT2
    A2 --- SUBSCRIPTION2

    %% Actor generalization
    SP2 -. "«generalization»" .-> P2
    PP2 -. "«generalization»" .-> P2

    %% Approved / derived extend relationships
    PROFILE2 -. "«extend»" .-> SEARCH2
    VIEW_PORTFOLIO2 -. "«extend»" .-> PROFILE2
    CHAT2 -. "«extend»" .-> PROFILE2
    CHAT2 -. "«extend»" .-> COMPARE2
    SELECT2 -. "«extend»" .-> COMPARE2
    SUBMIT_RESPONSE2 -. "«extend»" .-> VIEW_MATCHING2
    REQUEST_START2 -. "«extend»" .-> CHAT2
    APPROVE_INV2 -. "«extend»" .-> REVIEW_INV2
    REQUEST_REV2 -. "«extend»" .-> REVIEW_INV2
    COMPLAINT2 -. "«extend»" .-> REVIEW_INV2

    %% Approved / derived include relationships
    SUBMIT_RESPONSE2 -. "«include»" .-> VALIDATE_RESPONSE2
    SELECT2 -. "«include»" .-> CREATE_TX2
    CONFIRM_START2 -. "«include»" .-> CREATE_TX2
    APPROVE_INV2 -. "«include»" .-> COMPLETE_TX2

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#FFFFFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;
    classDef systemuc fill:#FFF8E6,stroke:#B7791F,stroke-width:1.4px,color:#111827;

    style SYS2 fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.4px
    style ACCESS2 fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style REQUESTS2 fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style TRANSACTION2 fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style INVOICE2 fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
    style PROVIDER_TRUST2 fill:#FBFDFF,stroke:#CBD5E1,stroke-width:1px
```

## How to read the detailed view

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

The detailed diagram is an **expansion of the overview above**, not a replacement and not a separate model. Views 01–04 reuse these same model elements and relationships to provide focused, easier-to-read diagrams for Public Access & Discovery, Request & Provider Response, Transaction/Invoice/Rating, and Provider Management/Verification/Safety.