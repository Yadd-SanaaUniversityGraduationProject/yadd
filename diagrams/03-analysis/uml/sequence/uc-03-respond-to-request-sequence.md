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
    UI->>C: getRequestForResponse(requestId)
    C->>RQ: loadOpenRequest(requestId)
    RQ-->>C: requestDetails
    C-->>UI: requestDetails
    UI-->>P: showRequestDetails()

    Note over P,UI: Response may accept indicative price or propose another price and add a note
    Note over P,UI: RequiresDeposit is Yes or No only

    P->>UI: submitProviderResponse(responseData)
    UI->>C: submitProviderResponse(requestId, responseData)
    C->>RQ: checkRequestStillOpen(requestId)
    RQ-->>C: requestState
    C->>PR: findActiveResponse(providerId, requestId)
    PR-->>C: activeResponseOrNone

    alt Eligible + Request Open + no active response
        C->>PR: createActiveResponse(responseData)
        PR-->>C: responseCreated(responseId)
        C-->>UI: responseSubmitted(responseId)
        UI-->>P: showSubmissionConfirmation()

        loop Zero or more edits while Request is Open and before Provider selection
            P->>UI: editProviderResponse(responseId, changes)
            UI->>C: editProviderResponse(responseId, changes)
            C->>PR: updateActiveResponse(changes)
            PR-->>C: responseUpdated()
            C-->>UI: editConfirmed()
            UI-->>P: showUpdatedResponse()
        end

        opt Provider withdraws while Request is Open and before selection
            P->>UI: withdrawProviderResponse(responseId)
            UI->>C: withdrawProviderResponse(responseId)
            C->>PR: markWithdrawn()
            PR-->>C: responseWithdrawn()
            C-->>UI: withdrawalConfirmed()
            UI-->>P: showWithdrawnStatus()
        end
    else Provider not eligible or Request not Open
        C-->>UI: submissionRejected(reason)
        UI-->>P: showSubmissionError()
    else Active response already exists
        C-->>UI: activeResponseAlreadyExists(responseId)
        UI-->>P: showExistingResponseForEdit()
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
