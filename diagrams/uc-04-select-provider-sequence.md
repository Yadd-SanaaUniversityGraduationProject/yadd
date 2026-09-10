# UC-04 — Select Provider from Request Sequence Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من `UC-04 — Select Provider from Request` فقط. يوضح المقارنة والاختيار وبدء Transaction في Published Request Route دون دمج بقية رحلة النظام.

## Source basis

- **Approved behavior:** `UC-04 — Select Provider from Request` in `docs/03-analysis/08-use-cases.md`.
- **Business/decision basis:** `DEC-014`, `DEC-047`, `DEC-066`, `DEC-070` and the corresponding current business rules.
- **Precondition:** Request is `Open` and has one or more selectable Provider Responses.
- **Core invariant:** selection closes the Request to new responses, marks the selected response `Selected`, marks the others `NotSelected`, and creates an `Active Transaction` with the selected Provider.
- **No Agreement:** there is no standalone Agreement entity/form in this route.
- **Derived modeling roles:** `BeneficiaryUI`, `SelectionController`, and `TransactionController` are Sequence modeling roles; they are not approved implementation class names.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    participant UI as BeneficiaryUI «boundary»
    participant SC as SelectionController «control»
    participant TC as TransactionController «control»
    participant RQ as Request «entity»
    participant PR as ProviderResponse «entity»
    participant TX as Transaction «entity»

    Note over B,PR: Precondition: Request Open + at least one selectable Provider Response

    B->>UI: openProviderResponses(requestId)
    activate UI
    UI->>SC: getProviderResponses(requestId)
    activate SC
    SC->>PR: listSelectableResponses(requestId)
    activate PR
    PR-->>SC: providerResponses
    deactivate PR
    SC-->>UI: comparisonData
    deactivate SC
    UI-->>B: showResponseComparison()
    deactivate UI

    B->>UI: selectProvider(responseId)
    activate UI
    UI->>SC: selectProvider(requestId, responseId)
    activate SC

    SC->>RQ: checkRequestOpen(requestId)
    activate RQ
    RQ-->>SC: requestState
    deactivate RQ

    SC->>PR: checkResponseSelectable(responseId)
    activate PR
    PR-->>SC: responseState
    deactivate PR

    alt Request Open + response selectable
        SC->>RQ: closeToNewResponses()
        activate RQ
        RQ-->>SC: requestClosedToNewResponses()
        deactivate RQ

        SC->>PR: markSelected(responseId)
        activate PR
        PR-->>SC: selectedResponseSaved()
        deactivate PR

        SC->>PR: markOtherResponsesNotSelected(requestId, responseId)
        activate PR
        PR-->>SC: otherResponsesUpdated()
        deactivate PR

        SC->>TC: createTransactionFromSelection(requestId, responseId)
        activate TC
        TC->>TX: createActiveTransaction(requestId, responseId)
        activate TX
        TX-->>TC: transactionCreated(transactionId, ACTIVE)
        deactivate TX
        TC-->>SC: transactionActive(transactionId)
        deactivate TC

        SC-->>UI: selectionConfirmed(transactionId)
        deactivate SC
        UI-->>B: showActiveTransaction(transactionId)
        deactivate UI
    else Request no longer Open or response no longer selectable
        SC-->>UI: selectionRejected(reason)
        deactivate SC
        UI-->>B: showSelectionError()
        deactivate UI
    end
```

## Scope boundary

هذا المخطط يركز فقط على قرار Beneficiary باختيار Provider من Provider Responses الموجودة.

لا يتضمن عمدًا:

- إنشاء Request؛ مغطى في `UC-02 — Create Request`.
- إرسال/Edit/Withdraw Provider Response؛ مغطى في `UC-03 — Respond to Request`.
- تفاصيل Chat؛ يمكن للمستفيد الرجوع للمحادثات ذات الصلة أثناء المقارنة، لكن التواصل نفسه يمثل Interaction مستقلًا حتى لا يتضخم هذا الرسم.
- أي `Request Transaction Start` أو confirmation؛ هذه الآلية تخص Direct Search Route فقط.
- Invoice, Cancellation, Complaint, أو Ratings؛ كلها Use Cases/Scenarios لاحقة مستقلة.

## Postconditions

عند نجاح الاختيار:

- Request is closed to new responses.
- Selected Provider Response is `Selected`.
- Other Provider Responses are `NotSelected`.
- One `Active Transaction` is created with the selected Provider.

عند فشل التحقق من الحالة الحالية:

- لا يتم تغيير حالة Request/Responses ولا يتم إنشاء Transaction.

## Modeling note

فرع `Request no longer Open or response no longer selectable` هو **Derived consistency/error behavior** لحماية الـprecondition وقت التنفيذ، وليس Business Rule جديدة أو سياسة مستقلة.
