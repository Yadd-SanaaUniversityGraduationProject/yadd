# Use Case View 00 — YADD Main Overview

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-090`
>
> **Purpose:** High-level overview of the single YADD Use Case Model. Detailed `<<include>>`, `<<extend>>`, lifecycle and precondition semantics are intentionally delegated to focused Views 01–04.

## Source basis

- `docs/00-governance/02-decision-register.md`
- `docs/03-analysis/08-use-cases.md`
- `docs/03-analysis/10-UML.md`
- DEC-066..090, especially DEC-067/072/077/078/085/086/087/088/089/090.

## Diagram

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
            UC09(["Service Provider Identity<br/>Verification / Eligibility"]):::usecase
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