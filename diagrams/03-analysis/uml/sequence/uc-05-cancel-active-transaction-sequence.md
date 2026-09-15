# UC-05 — Cancel Active Transaction Sequence Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من `UC-05 — Cancel Active Transaction` فقط. يوضح إلغاء Transaction بعد أن تكون قد بدأت رسميًا، ولا يخلط ذلك مع إغلاق Request قبل الاختيار.

## Source basis

- **Approved behavior:** `UC-05 — Cancel Active Transaction` in `docs/03-analysis/08-use-cases.md`.
- **Business rule:** `BR-019` — after Transaction start, cancellation requires a recorded reason shown to the other party and reviewable administratively.
- **Lifecycle:** current Transaction lifecycle allows `Active → Cancelled` with a recorded reason.
- **Related decisions:** `DEC-048`, `DEC-054`.
- **Derived modeling roles:** `TransactionUI` and `TransactionController` are Sequence modeling roles; they are not approved implementation class names.
- **Derived consistency/error behavior:** the current Transaction state is checked at execution time before cancellation is committed.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    actor P as Provider
    participant UI as TransactionUI «boundary»
    participant C as TransactionController «control»
    participant T as Transaction «entity»

    Note over B,T: Precondition: Transaction is in a cancellable state

    alt Beneficiary initiates cancellation
        B->>UI: cancelTransaction(transactionId, reason)
        UI->>C: requestCancellation(transactionId, Beneficiary, reason)
        C->>T: getCurrentState(transactionId)
        T-->>C: currentState

        alt Transaction cancellable + reason provided
            C->>T: setCancelled(actor, reason, time)
            T-->>C: cancellationRecorded()
            C-->>UI: cancellationConfirmed()
            UI-->>B: showCancelledStatus()
            UI-->>P: showCancellationReason(reason)
        else Transaction not cancellable or reason missing
            C-->>UI: cancellationRejected(reason)
            UI-->>B: showCancellationError()
        end

    else Provider initiates cancellation
        P->>UI: cancelTransaction(transactionId, reason)
        UI->>C: requestCancellation(transactionId, Provider, reason)
        C->>T: getCurrentState(transactionId)
        T-->>C: currentState

        alt Transaction cancellable + reason provided
            C->>T: setCancelled(actor, reason, time)
            T-->>C: cancellationRecorded()
            C-->>UI: cancellationConfirmed()
            UI-->>P: showCancelledStatus()
            UI-->>B: showCancellationReason(reason)
        else Transaction not cancellable or reason missing
            C-->>UI: cancellationRejected(reason)
            UI-->>P: showCancellationError()
        end
    end
```

## Scope boundary

هذا المخطط يركز على Transaction Cancellation فقط.

لا يتضمن عمدًا:

- `Close Open Request`؛ هذا يحدث قبل اختيار Provider وهو Request Closure وليس Transaction Cancellation.
- أي Deposit/Payment/Refund flow؛ هذه خارج YADD وفق النموذج الحالي.
- Administrative review التفصيلية؛ إمكانية مراجعة النمط موجودة كقاعدة، لكن المراجعة نفسها Interaction إداري لاحق وليست جزءًا إلزاميًا من كل عملية إلغاء.
- Invoice أو Ratings؛ `Cancelled` حالة نهائية غير ناجحة ولا تفتح Ratings.

## Postconditions

عند نجاح الإلغاء:

- `Transaction.status = Cancelled`.
- يسجل YADD الطرف الذي ألغى والسبب والتوقيت.
- يظهر سبب الإلغاء للطرف الآخر.

عند رفض الإلغاء:

- لا تتغير حالة Transaction.

## Modeling note

فرع `Transaction not cancellable or reason missing` يمثل حماية تنفيذية مشتقة من الـprecondition ومن إلزامية السبب. لم تُخترع أي مهلة زمنية أو سياسة مالية أو threshold إضافي.
