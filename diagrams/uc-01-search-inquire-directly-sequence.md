# UC-01 — Search and Inquire Directly Sequence Diagrams

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence modeling مشتق من `UC-01 — Search and Inquire Directly` فقط. تم تقسيم الـUse Case إلى سيناريوهين مترابطين حتى تبقى كل Sequence Diagram واضحة وقابلة للعرض على A4 بدل دمج البحث والمحادثة وبدء Transaction في رسم واحد مزدحم.

## Source basis

- **Approved behavior:** `UC-01 — Search and Inquire Directly` in `docs/03-analysis/08-use-cases.md`.
- **Decision/business basis:** `DEC-012`, `DEC-031..033`, `DEC-046`, `DEC-047`, `DEC-064`, `DEC-066`, `DEC-069` and the corresponding current business rules.
- **Core rule:** Chat alone never creates a Transaction.
- **Direct-search start rule:** either party may request Transaction Start, but `Active Transaction` is created only after the other party confirms.
- **Alternative:** no confirmation or rejection leaves the conversation without a Transaction.
- **Derived modeling roles:** `BeneficiaryUI`, `ProviderUI`, `DiscoveryController`, `CommunicationController`, and `TransactionController` are Sequence modeling roles, not approved implementation class names.

---

## Scenario A — Search, View Profile, and Inquire

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    actor P as Provider
    participant BUI as BeneficiaryUI «boundary»
    participant PUI as ProviderUI «boundary»
    participant DC as DiscoveryController «control»
    participant CC as CommunicationController «control»
    participant PROF as ProviderProfile «entity»
    participant CONV as Conversation «entity»

    B->>BUI: searchProviders(category, area)
    BUI->>DC: searchProviders(category, area)
    DC->>PROF: findEligibleProviders(category, area)
    PROF-->>DC: matchingProviderProfiles
    DC-->>BUI: searchResults
    BUI-->>B: showProviders()

    B->>BUI: openProviderProfile(providerId)
    BUI->>DC: getProviderProfile(providerId)
    DC->>PROF: loadPublicProfileAndShowcase()
    PROF-->>DC: publicProfileData
    DC-->>BUI: providerProfile
    BUI-->>B: showProviderProfile()

    opt Beneficiary starts or continues an inquiry
        B->>BUI: sendInquiry(message)
        BUI->>CC: sendInquiry(providerId, message)
        CC->>CONV: createOrAppendMessage(message)
        CONV-->>CC: messageStored()
        CC-->>PUI: deliverInquiry(message)
        PUI-->>P: showInquiry()

        opt Provider replies
            P->>PUI: reply(message)
            PUI->>CC: sendReply(conversationId, message)
            CC->>CONV: appendMessage(message)
            CONV-->>CC: messageStored()
            CC-->>BUI: deliverReply(message)
            BUI-->>B: showReply()
        end
    end

    Note over B,P: Inquiry or Chat does not create a Transaction
```

### Scenario A postcondition

- Beneficiary may have viewed a Provider Profile and Portfolio/Catalog.
- A private Conversation may exist or continue.
- No Transaction is created merely because Chat occurred.

---

## Scenario B — Request and Confirm Transaction Start

> **Precondition:** a valid direct-search Conversation/context already exists between the same Beneficiary and Provider.

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    actor P as Provider
    participant BUI as BeneficiaryUI «boundary»
    participant PUI as ProviderUI «boundary»
    participant TC as TransactionController «control»
    participant TX as Transaction «entity»

    alt Beneficiary requests Transaction Start
        B->>BUI: requestTransactionStart()
        BUI->>TC: requestTransactionStart(conversationId)
        TC-->>PUI: requestStartConfirmation()
        PUI-->>P: showStartRequest()

        alt Provider confirms
            P->>PUI: confirmTransactionStart()
            PUI->>TC: confirmTransactionStart(conversationId)
            TC->>TX: createActiveTransaction(Beneficiary, Provider)
            TX-->>TC: transactionCreated(transactionId, ACTIVE)
            TC-->>BUI: transactionActive(transactionId)
            TC-->>PUI: transactionActive(transactionId)
            BUI-->>B: showActiveTransaction()
            PUI-->>P: showActiveTransaction()
        else Provider does not confirm or rejects
            TC-->>BUI: noTransactionCreated()
            BUI-->>B: keepConversationWithoutTransaction()
        end

    else Provider requests Transaction Start
        P->>PUI: requestTransactionStart()
        PUI->>TC: requestTransactionStart(conversationId)
        TC-->>BUI: requestStartConfirmation()
        BUI-->>B: showStartRequest()

        alt Beneficiary confirms
            B->>BUI: confirmTransactionStart()
            BUI->>TC: confirmTransactionStart(conversationId)
            TC->>TX: createActiveTransaction(Beneficiary, Provider)
            TX-->>TC: transactionCreated(transactionId, ACTIVE)
            TC-->>BUI: transactionActive(transactionId)
            TC-->>PUI: transactionActive(transactionId)
            BUI-->>B: showActiveTransaction()
            PUI-->>P: showActiveTransaction()
        else Beneficiary does not confirm or rejects
            TC-->>PUI: noTransactionCreated()
            PUI-->>P: keepConversationWithoutTransaction()
        end
    end
```

### Scenario B postconditions

If the other party confirms:

- one `Active Transaction` is created between the Beneficiary and Provider.

If the other party does not confirm or rejects:

- no Transaction is created.
- the Conversation may continue or end.

---

## Scope boundary

UC-01 ends when either:

- the parties remain in direct inquiry/chat without a Transaction, or
- the other party confirms Transaction Start and YADD creates an `Active Transaction`.

The diagrams intentionally do not include Cancellation, Final Invoice, Complaint, Completion, or Ratings. Those are later Use Cases/Scenarios and must not be folded into UC-01.

## Modeling note

The two diagrams above are a **scenario decomposition of one approved Use Case**, not two new Use Cases. This is a presentation/modeling choice intended to preserve readability and A4 print quality without changing project scope or requirements.
