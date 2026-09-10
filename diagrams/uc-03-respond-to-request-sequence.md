# UC-03 — Respond to Request Sequence Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من `UC-03 — Respond to Request` فقط. لا يمثل رحلة Published Request كاملة.

## Source basis

- **Approved behavior:** `UC-03 — Respond to Request` in `docs/03-analysis/08-use-cases.md`.
- **Business/decision basis:** `DEC-013`, `DEC-041`, `DEC-043`, `DEC-047`, `DEC-066`, `DEC-070` and the corresponding current business rules.
- **Preconditions:** Provider Verified + subscription Active + Request `Open`.
- **Business constraint:** one active Provider Response per Provider per Request.
- **Derived modeling roles:** `ProviderUI` and `ResponseController` are Sequence modeling roles; they are not approved implementation class names.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#D8E8D0","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor P as Provider
    participant UI as ProviderUI «boundary»
    participant C as ResponseController «control»
    participant RQ as Request «entity»
    participant PR as ProviderResponse «entity»

    Note over P,PR: Preconditions: Provider Verified + Active Subscription + Request Open

    P->>UI: openRequest(requestId)
    activate UI
    UI->>C: getRequestForResponse(requestId)
    activate C
    C->>RQ: loadOpenRequest(requestId)
    activate RQ
    RQ-->>C: requestDetails
    deactivate RQ
    C-->>UI: requestDetails
    deactivate C
    UI-->>P: showRequestDetails()
    deactivate UI

    Note over P,UI: Response may accept indicative price or propose another price and add a note
    Note over P,UI: RequiresDeposit is Yes or No only

    P->>UI: submitProviderResponse(responseData)
    activate UI
    UI->>C: submitProviderResponse(requestId, responseData)
    activate C

    C->>RQ: checkRequestStillOpen(requestId)
    activate RQ
    RQ-->>C: requestState
    deactivate RQ

    C->>PR: findActiveResponse(providerId, requestId)
    activate PR
    PR-->>C: activeResponseOrNone
    deactivate PR

    alt Eligible + Request Open + no active response
        C->>PR: createActiveResponse(responseData)
        activate PR
        PR-->>C: responseCreated(responseId)
        deactivate PR
        C-->>UI: responseSubmitted(responseId)
        deactivate C
        UI-->>P: showSubmissionConfirmation()
        deactivate UI
    else Provider not eligible or Request not Open
        C-->>UI: submissionRejected(reason)
        deactivate C
        UI-->>P: showSubmissionError()
        deactivate UI
    else Active response already exists
        C-->>UI: activeResponseAlreadyExists(responseId)
        deactivate C
        UI-->>P: showExistingResponseForEdit()
        deactivate UI
    end

    loop Zero or more edits while Request is Open and before Provider selection
        P->>UI: editProviderResponse(responseId, changes)
        activate UI
        UI->>C: editProviderResponse(responseId, changes)
        activate C
        C->>PR: updateActiveResponse(changes)
        activate PR
        PR-->>C: responseUpdated()
        deactivate PR
        C-->>UI: editConfirmed()
        deactivate C
        UI-->>P: showUpdatedResponse()
        deactivate UI
    end

    opt Provider withdraws while Request is Open and before selection
        P->>UI: withdrawProviderResponse(responseId)
        activate UI
        UI->>C: withdrawProviderResponse(responseId)
        activate C
        C->>PR: markWithdrawn()
        activate PR
        PR-->>C: responseWithdrawn()
        deactivate PR
        C-->>UI: withdrawalConfirmed()
        deactivate C
        UI-->>P: showWithdrawnStatus()
        deactivate UI
    end
```

## Scope boundary

هذا المخطط يركز على استجابة Provider للطلب فقط.

لا يتضمن عمدًا:

- إنشاء Request؛ هذا مغطى في `UC-02 — Create Request`.
- مقارنة Beneficiary للاستجابات أو اختيار Provider؛ هذه تخص `UC-04 — Select Provider from Request`.
- Chat قبل الاختيار؛ رغم أنه مسموح في UC-03، فهو تفاعل مستقل بين Actorين وسيُمثل في Sequence خاص بالتواصل حتى لا يتضخم هذا الرسم.
- إنشاء Transaction؛ في Published Request Route يبدأ ذلك عند اختيار Provider، وليس عند مجرد إرسال Provider Response.
- أي DepositAmount أو Payment/Refund flow؛ `RequiresDeposit` مجرد Yes/No داخل Provider Response.

## Postconditions

عند نجاح الإرسال:

- توجد Provider Response فعالة واحدة فقط لهذا Provider على هذا Request.
- تبقى قابلة للتعديل أو السحب ما دام Request `Open` وقبل Provider selection.

عند سحب الاستجابة:

- لا تبقى الاستجابة Active.
