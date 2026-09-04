# UML Models — YADD Preliminary Defense

> **Status:** `DRAFT FOR PRELIMINARY DEFENSE — CORE SYNCHRONIZED 2026-09-04`
>
> **Governing basis:** DEC-046/047/048/050/051/063/064/066/067/068/069/070/071/072 + `05-SRS.md` + `06-business-rules.md` + `07-lifecycles.md` + `08-use-cases.md`.
>
> YADD uses DFD and UML together according to DEC-060. All labels inside final academic diagrams must be English according to DEC-072.

## 1. Actor Model

### Main actors
- `Beneficiary`
- `Provider`
  - `Service Provider` specialization when useful
  - `Product Provider` specialization when useful
- `YADD Administrator`

### Specialized administrative roles
- `Verification Reviewer`
- `Content Moderator`
- `Subscription Administrator`

`YADD Administrator` is a modeling simplification for the main diagram and does not imply one employee owns all administrative permissions.

---

## 2. Main Use Case Diagram — Working Representation

> Mermaid is used only as a working semantic representation. The final academic Use Case Diagram must use standard UML actors, system boundary and oval use cases.

```mermaid
flowchart LR
    B[Beneficiary]
    P[Provider]
    A[YADD Administrator]

    subgraph YADD[YADD System]
        UC1([Manage Account])
        UC2([Search Providers])
        UC3([View Provider Profile])
        UC4([Create Request])
        UC5([Compare Provider Responses])
        UC6([Communicate / Inquire])
        UC7([Select Provider])
        UC8([Start Transaction])
        UC9([Manage Transaction])
        UC10([Review / Approve Invoice])
        UC11([Rate Provider])
        UC12([Block / Report])

        UC13([Manage Provider Profile])
        UC14([Manage Portfolio / Catalog])
        UC15([Manage Service Areas])
        UC16([Submit Verification])
        UC17([View Matching Requests])
        UC18([Manage Provider Response])
        UC19([Create / Revise Final Invoice])
        UC20([Rate Beneficiary])

        UC21([Review Provider Verification])
        UC22([Review Reports / Flags])
        UC23([Manage Provider Subscription])
    end

    B --- UC1
    B --- UC2
    B --- UC3
    B --- UC4
    B --- UC5
    B --- UC6
    B --- UC7
    B --- UC8
    B --- UC9
    B --- UC10
    B --- UC11
    B --- UC12

    P --- UC1
    P --- UC6
    P --- UC8
    P --- UC9
    P --- UC12
    P --- UC13
    P --- UC14
    P --- UC15
    P --- UC16
    P --- UC17
    P --- UC18
    P --- UC19
    P --- UC20

    A --- UC21
    A --- UC22
    A --- UC23
```

### Main Use Case semantics

1. `Service Provider` and `Product Provider` inherit general Provider behavior; do not duplicate all inherited use cases unless needed for clarity.
2. No `Guest` actor is currently approved.
3. No standalone `Agreement` use case/entity exists. Request route is `Request → Provider Response → Selection → Transaction`.
4. `Manage Provider Response` covers submit/edit/withdraw under DEC-070. `RequiresDeposit = Yes/No` is data inside Provider Response, **not a standalone Use Case**.
5. `Start Transaction` has both Beneficiary and Provider associations because either may request start in Direct Search. The other party must confirm before Active Transaction is created.
6. In Request route, Beneficiary selection starts the Transaction with the selected Provider. Do not force an `<<include>>` relation in the main overview if it obscures the different Direct Search semantics; details belong in specifications/Activity/Sequence.
7. Beneficiary→Provider rating is mandatory after Completed; Provider→Beneficiary rating is optional.

---

## 3. Activity Diagram — Published Request Route

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Creates Request]
    A --> B{Request Data Valid?}
    B -- No --> A
    B -- Yes --> C[Publish Open Request]
    C --> D[Eligible Providers View Request]
    D --> E[Provider Submits Provider Response]
    E --> E1[Optional Proposed Price / Note]
    E1 --> E2[Set RequiresDeposit Yes or No]
    E2 --> F[Beneficiary Compares Responses]
    F --> G{Needs Inquiry?}
    G -- Yes --> H[Private Chat / Inquiry]
    H --> F
    G -- No --> I{Select Provider?}
    I -- No --> F
    I -- Yes --> J[Close Request to New Responses]
    J --> K[Mark Other Responses NotSelected]
    K --> L[Create Active Transaction]
    L --> M{Transaction Cancelled?}
    M -- Yes --> N[Record Cancellation Actor, Reason and Time]
    N --> Z([End — Cancelled])
    M -- No --> O[Provider Performs Service / Prepares Product]
    O --> P[Provider Creates Final Invoice]
    P --> Q[Invoice Pending Customer Approval]
    Q --> R{Beneficiary Decision}
    R -- Request Revision --> T[Record Revision Note]
    T --> U[Provider Revises Invoice]
    U --> Q
    R -- Dispute --> V[Raise Complaint for Administrative Review]
    V --> Z2([End — Disputed])
    R -- Approve --> W[Invoice Approved / Transaction Completed]
    W --> X[Beneficiary Rates Provider — Required]
    X --> Y{Provider Wants to Rate Beneficiary?}
    Y -- Yes --> Y1[Rate 3 Behavioral Indicators + Optional Comment]
    Y1 --> ZE([End — Post-Transaction Flow Complete])
    Y -- No --> ZE
```

`Completed` is the successful terminal Transaction state; ratings shown afterward are Post-Transaction workflow only.

---

## 4. Activity Diagram — Direct Search Route

```mermaid
flowchart TD
    S([Start]) --> A[Beneficiary Searches by Category and Area]
    A --> B[View Provider Profile and Portfolio/Catalog]
    B --> C{Start Inquiry?}
    C -- No --> Z([End])
    C -- Yes --> D[Private Chat / Inquiry]
    D --> E[Either Party Requests Transaction Start]
    E --> F{Other Party Confirms?}
    F -- No --> D
    F -- Yes --> G[Create Active Transaction]
    G --> H[Continue Through Common Transaction / Invoice Flow]
    H --> Z2([End])
```

Chat alone does not create Transaction.

---

## 5. Sequence Diagram — Published Request Route

```mermaid
sequenceDiagram
    actor B as Beneficiary
    participant Y as YADD Backend/API
    actor P as Provider
    participant DB as Database

    B->>Y: Create and publish Request
    Y->>DB: Save Request = Open
    Y-->>P: Expose matching Request

    P->>Y: Submit Provider Response
    Note over P,Y: Proposed price/note optional; RequiresDeposit = Yes/No only
    Y->>DB: Save active Provider Response
    Y-->>B: Show response for comparison

    opt Provider edits or withdraws before selection
        P->>Y: Edit / withdraw active response
        Y->>DB: Update response data/status
        Y-->>B: Refresh response information
    end

    opt Inquiry before selection
        B->>Y: Send message
        Y-->>P: Deliver private message
        P->>Y: Reply
        Y-->>B: Deliver reply
    end

    B->>Y: Select Provider
    Y->>DB: Request = Matched; other responses = NotSelected; create Active Transaction
    Y-->>P: Provider selected / Transaction active
    Y-->>B: Transaction active

    alt Transaction cancelled
        B->>Y: Cancel + reason
        Y->>DB: Save Cancelled + actor + reason + time
        Y-->>P: Cancellation recorded
    else Work completed / product prepared
        P->>Y: Submit final invoice
        Y->>DB: Save invoice = PendingCustomerApproval
        Y-->>B: Request invoice review

        alt Request revision
            B->>Y: Request revision + note
            Y-->>P: Revision requested
            P->>Y: Submit revised invoice
            Y-->>B: Show revised invoice
        else Approve
            B->>Y: Approve final invoice
            Y->>DB: Invoice = Final; Transaction = Completed
            Y-->>B: Require Provider rating
            B->>Y: Submit provider rating 1-5 + optional comment
            Y->>DB: Save provider rating
            Y-->>P: Show optional beneficiary rating prompt
            opt Provider chooses to rate Beneficiary
                P->>Y: Submit 3 behavioral scores + optional comment
                Y->>DB: Save beneficiary rating
            end
            Note over B,P: Transaction remains Completed
        end
    end
```

---

## 6. Sequence Diagram — Direct Search Route

```mermaid
sequenceDiagram
    actor B as Beneficiary
    participant Y as YADD Backend/API
    actor P as Provider
    participant DB as Database

    B->>Y: Search providers by category/area
    Y->>DB: Query eligible Provider Profiles
    DB-->>Y: Matching Provider Profiles
    Y-->>B: Results

    B->>Y: Open Provider Profile
    Y->>DB: Load public profile + Portfolio/Catalog
    DB-->>Y: Public provider data
    Y-->>B: Show profile

    B->>Y: Start private inquiry
    Y-->>P: Deliver inquiry
    P->>Y: Reply
    Y-->>B: Deliver reply

    alt Beneficiary requests transaction start
        B->>Y: Request Transaction Start
        Y-->>P: Request Start Confirmation
        P->>Y: Confirm Transaction Start
        Y->>DB: Create Active Transaction
        Y-->>B: Transaction active
        Y-->>P: Transaction active
    else Provider requests transaction start
        P->>Y: Request Transaction Start
        Y-->>B: Request Start Confirmation
        B->>Y: Confirm Transaction Start
        Y->>DB: Create Active Transaction
        Y-->>B: Transaction active
        Y-->>P: Transaction active
    else No confirmation
        Note over B,P: Chat continues or ends without Transaction
    end
```

---

## 7. Class Diagram — Source Model

The Class Diagram must be rebuilt from the synchronized conceptual ERD in `11-ERD.md`; do not reuse the old `Offer → Agreement → Review` class model.

Minimum current domain classes/concepts:
- User
- ProviderProfile
- ProviderActivity
- Category
- Area / ProviderServiceArea
- ShowcaseItem
- Request
- ProviderResponse
- Conversation / Message
- Transaction
- Invoice / InvoiceVersion / InvoiceItem according to chosen class abstraction
- ProviderRating
- BeneficiaryRating
- VerificationCase / VerificationArtifact
- Subscription
- Report

Physical database choices such as Media table structure or `InvoiceVersion` vs `Invoice + Revision` are Chapter Four design decisions and must not be invented as analysis facts.

---

## 8. Diagram Readiness Checklist

- [x] Actors aligned with DEC-067.
- [x] English-only labels aligned with DEC-072.
- [x] No Guest actor.
- [x] No standalone Agreement.
- [x] Canonical term is Provider Response.
- [x] Provider Response edit/withdraw represented.
- [x] RequiresDeposit is response data, not a standalone use case/payment flow.
- [x] Direct Search start request + other-party confirmation represented.
- [x] Request selection creates one Transaction.
- [x] Invoice approval leads to Completed.
- [x] No Transaction state Closed.
- [x] Ratings are Post-Transaction.
- [x] Beneficiary→Provider rating mandatory; Provider→Beneficiary optional.
- [x] Class Diagram source concepts defined from synchronized ERD.
- [ ] Final visual redraw/export in standard UML notation remains to be produced.
