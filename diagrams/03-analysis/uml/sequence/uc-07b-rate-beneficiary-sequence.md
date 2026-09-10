# UC-07B — Provider Rates Beneficiary Sequence Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من `UC-07B — Provider Rates Beneficiary` فقط. يمثل التقييم الاختياري للمستفيد بعد اكتمال Transaction، باعتباره Post-Transaction operation مستقلة.

## Source basis

- **Approved behavior:** `UC-07B — Provider Rates Beneficiary` in `docs/03-analysis/08-use-cases.md`.
- **Rating model:** `docs/03-analysis/18-rating-reputation-model.md`.
- **Business/decision basis:** `DEC-063`, `DEC-071` and the corresponding rating/business rules.
- **Precondition:** Transaction is `Completed` between the same Provider and Beneficiary.
- **Rating data:** three behavioral indicators are required if Provider chooses to rate, each from 1 to 5; text comment is optional.
- **Optionality:** Provider may skip the rating.
- **Visibility/consequence rule:** the resulting Beneficiary interaction record has limited visibility to Providers in a legitimate interaction context and causes no automatic penalty in MVP.
- **State rule:** submitting or skipping the rating does not change Transaction status; it remains `Completed`.
- **Derived modeling roles:** `RatingUI` and `RatingController` are Sequence modeling roles, not approved implementation class names.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#D8E8D0","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor P as Provider
    participant UI as RatingUI «boundary»
    participant C as RatingController «control»
    participant T as Transaction «entity»
    participant R as BeneficiaryRating «entity»

    Note over P,T: Precondition: Transaction Completed with the same Beneficiary

    UI-->>P: offerBeneficiaryRating(transactionId)

    alt Provider chooses to rate
        P->>UI: submitBeneficiaryRating(threeScores, optionalComment)
        UI->>C: submitBeneficiaryRating(transactionId, scores, comment)
        C->>T: verifyCompletedTransaction(transactionId, Provider)
        T-->>C: ratingEligibility

        alt Eligible + all three scores from 1 to 5
            C->>R: createBeneficiaryRating(transactionId, scores, comment)
            R-->>C: ratingSaved(ratingId)
            C-->>UI: ratingSubmitted(ratingId)
            UI-->>P: showRatingConfirmation()
        else Not eligible or invalid required scores
            C-->>UI: ratingRejected(reason)
            UI-->>P: showRatingError()
        end

    else Provider skips
        P->>UI: skipBeneficiaryRating()
        UI-->>P: continueWithoutRating()
    end

    Note over T,R: Transaction remains COMPLETED — rating workflow is optional and Post-Transaction
```

## Scope boundary

هذا المخطط يركز فقط على `Provider → Beneficiary` rating.

لا يتضمن عمدًا:

- Beneficiary rating of Provider؛ مغطى في `UC-07` منفصلة.
- أي Transaction state جديدة بعد التقييم أو التخطي.
- عقوبة أو تعليقًا آليًا للمستفيد بناءً على التقييم؛ ذلك غير موجود في MVP الحالي.
- تفاصيل حساب المتوسطات أو خوارزمية السمعة؛ الوثيقة الحالية تعتمد سجل تعامل محدود الظهور ولا تفرض صيغة حسابية جديدة هنا.

## Postconditions

إذا اختار Provider التقييم ونجح الإرسال:

- ترتبط Beneficiary Rating بالـCompleted Transaction نفسها.
- تحفظ المؤشرات الثلاثة 1–5 والتعليق إن أضيف.
- تصبح مساهمة في سجل تعامل Beneficiary محدود الظهور وفق القواعد الحالية.
- تبقى `Transaction.status = Completed`.

إذا اختار Provider التخطي:

- لا تنشأ Rating.
- تبقى `Transaction.status = Completed` دون أثر إضافي.

## Modeling note

فرع التحقق من Completed Transaction وقيم 1–5 هو حماية تنفيذية مشتقة من شروط الأهلية والحقول المعتمدة، وليس Policy جديدة أو عقوبة آلية.
