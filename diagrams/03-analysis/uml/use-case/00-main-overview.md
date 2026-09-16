# Use Case View 00 — YADD Main Overview

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-077`
>
> **Purpose:** High-level overview of the single YADD Use Case Model. Detailed `<<include>>`, `<<extend>>`, lifecycle and precondition semantics are intentionally delegated to focused Views 01–04.
>
> **Presentation convention:** The PlantUML view follows the team-supplied academic Use Case reference style: external stick-figure Actors, one clear system boundary, oval Use Cases, solid Actor associations, and relationship stereotypes only where semantically justified. The reference controls presentation only; YADD semantics remain governed by the sources below.

## Source basis

- `docs/00-governance/02-decision-register.md`
- `docs/03-analysis/08-use-cases.md`
- `docs/03-analysis/10-UML.md`
- DEC-066..077, especially DEC-067/072/077.

## Academic Use Case Diagram — PlantUML

```plantuml
@startuml YADD_Main_Use_Case_Overview
left to right direction

skinparam backgroundColor white
skinparam shadowing false
skinparam dpi 170
skinparam defaultFontName Arial
skinparam defaultFontSize 13
skinparam ArrowColor #3F3F46
skinparam ArrowThickness 1.1
skinparam linetype ortho
skinparam nodesep 42
skinparam ranksep 38
skinparam packageStyle rectangle

skinparam actor {
  BorderColor #2F75B5
  FontColor #111827
  BackgroundColor white
}

skinparam usecase {
  BackgroundColor white
  BorderColor #3F6FA5
  FontColor #111827
  BorderThickness 1.4
}

skinparam rectangle {
  BackgroundColor white
  BorderColor #2F75B5
  FontColor #111827
  BorderThickness 2.2
}

skinparam package {
  BackgroundColor #FBFDFF
  BorderColor #C7D2E0
  FontColor #374151
  BorderThickness 1
}

title YADD — Main Use Case Diagram (Overview)

actor Guest as G
actor Beneficiary as B

rectangle "YADD System" as SYS {

  package "Access & Discovery" as ACCESS {
    usecase "Log In" as LOGIN
    usecase "Create Account" as REGISTER
    usecase "Browse Public Provider\nInformation" as UC00
    usecase "Search and Inquire\nDirectly" as UC01

    LOGIN -[hidden]down-> REGISTER
    REGISTER -[hidden]down-> UC00
    UC00 -[hidden]down-> UC01
  }

  package "Request & Matching" as REQUESTS {
    usecase "Create Request" as UC02
    usecase "Respond to Request" as UC03
    usecase "Select Provider\nfrom Request" as UC04

    UC02 -[hidden]down-> UC03
    UC03 -[hidden]down-> UC04
  }

  package "Transaction & Completion" as TX {
    usecase "Cancel Active\nTransaction" as UC05
    usecase "Create, Revise and Approve\nFinal Invoice" as UC06
    usecase "Rate Provider" as UC07
    usecase "Rate Beneficiary" as UC07B

    UC05 -[hidden]down-> UC06
    UC06 -[hidden]down-> UC07
    UC07 -[hidden]down-> UC07B
  }

  package "Provider & Trust" as TRUST {
    usecase "Block User" as BLOCK
    usecase "Report User / Content" as REPORT
    usecase "Provider Verification /\nPortal Activation" as UC09
    usecase "Manage Portfolio /\nCatalog" as UC10
    usecase "Manage Provider\nSubscription" as SUB

    BLOCK -[hidden]down-> REPORT
    REPORT -[hidden]down-> UC09
    UC09 -[hidden]down-> UC10
    UC10 -[hidden]down-> SUB
  }

  ACCESS -[hidden]down-> REQUESTS
  REQUESTS -[hidden]down-> TX
  TX -[hidden]down-> TRUST
}

actor Provider as P
actor "YADD Administrator" as A

' Guest associations
G -right- LOGIN
G -right- REGISTER
G -right- UC00

' Beneficiary associations
B -right- UC01
B -right- UC02
B -right- UC04
B -right- UC05
B -right- UC06
B -right- UC07
B -right- BLOCK
B -right- REPORT

' Provider associations
P -left- UC01
P -left- UC03
P -left- UC05
P -left- UC06
P -left- UC07B
P -left- BLOCK
P -left- REPORT
P -left- UC09
P -left- UC10

' Administrator associations
A -left- REPORT
A -left- UC09
A -left- SUB

note bottom of SYS
This is the high-level overview of one YADD Use Case Model.
Detailed <<include>>, <<extend>>, lifecycle, authentication,
and other precondition relationships are shown in Views 01–04.
end note

@enduml
```

## Repository-readable interpretation — Mermaid

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
    classDef usecase fill:#FFFFFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;

    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.2px
    style ACCESS fill:#FBFDFF,stroke:#C7D2E0,stroke-width:1px
    style REQUESTS fill:#FBFDFF,stroke:#C7D2E0,stroke-width:1px
    style TRANSACTIONS fill:#FBFDFF,stroke:#C7D2E0,stroke-width:1px
    style TRUST fill:#FBFDFF,stroke:#C7D2E0,stroke-width:1px
```

## Reading note

This overview answers only two questions: **Who interacts with YADD?** and **What major goals does each Actor have?** It intentionally avoids relationship-level detail so the diagram remains readable at repository and report scale.

The absence of `<<include>>` / `<<extend>>` in this overview is intentional, not missing data. Those approved relationships are displayed in the focused Views 01–04 where their context is clear and line crossing is manageable.

`Block User` and `Report User / Content` remain separate Use Cases because the current model explicitly treats blocking and reporting as independent concepts.
