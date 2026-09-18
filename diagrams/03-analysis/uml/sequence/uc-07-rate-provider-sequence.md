# UC-07 — Rate Provider Sequence Diagram

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-18 — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من `UC-07 — Rate Provider` فقط. يمثل التقييم الإلزامي للمقدم بعد اكتمال Transaction، باعتباره Post-Transaction operation مستقلة.

## Source basis

- **Approved behavior:** `UC-07 — Rate Provider` in `docs/03-analysis/08-use-cases.md`.
- **Rating model:** `docs/03-analysis/18-rating-reputation-model.md`.
- **Business/decision basis:** `DEC-051`, `DEC-071`, `DEC-087` and the corresponding rating/business rules.
- **Precondition:** Transaction is `Completed` between the same Beneficiary and Provider, with the final invoice approved.
- **Rating data:** Overall 1–5 stars + structured textual criteria by provider type are required; text comment is optional.
- **State rule:** submitting the rating does not change Transaction status; it remains `Completed`.
- **Derived modeling roles:** `RatingUI` and `RatingController` are Sequence modeling roles, not approved implementation class names.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    participant UI as RatingUI «boundary»
    participant C as RatingController «control»
    participant T as Transaction «entity»
    participant PP as ProviderProfile «entity»
    participant R as ProviderRating «entity»

    Note over B,T: Precondition: Transaction Completed + final invoice approved

    UI-->>B: promptRequiredProviderRating(transactionId)

    alt Beneficiary rates now
        B->>UI: openProviderRating(transactionId)
        UI->>C: getProviderRatingForm(transactionId)
        C->>T: verifyCompletedTransaction(transactionId, Beneficiary)
        T-->>C: ratingEligibility

        alt Eligible
            C->>PP: getProviderType(providerId)
            PP-->>C: SERVICE or PRODUCT
            C-->>UI: ratingFormForProviderType()

            Note over B,UI: Required: Overall Stars 1-5 + five Structured Criteria appropriate to Provider Type
            Note over B,UI: Optional: text Comment

            B->>UI: submitProviderRating(overallStars, structuredCriteria, optionalComment)
            UI->>C: submitProviderRating(transactionId, ratingData)
            C->>R: createProviderRating(transactionId, ratingData)
            R-->>C: ratingSaved(ratingId)
            C-->>UI: ratingSubmitted(ratingId)
            UI-->>B: showRatingConfirmation()
        else Not eligible
            C-->>UI: ratingRejected(reason)
            UI-->>B: showRatingError()
        end

    else Beneficiary chooses Later
        B->>UI: chooseLater()
        UI->>C: deferRequiredProviderRating(transactionId)
        C-->>UI: ratingRemainsOutstanding()
        UI-->>B: continueWithoutRatingNow()

        Note over B,UI: After 24h, YADD sends a reminder while the rating remains outstanding
        Note over B,C: Before starting a new Transaction, any previous required Provider Rating must be completed
    end

    Note over B,PP: SERVICE criteria: Service Quality / Punctuality / Adherence to Agreement / Communication-Responsiveness / Professional Conduct
    Note over B,PP: PRODUCT criteria: Matches Description / Product Quality / Readiness-Agreed Timing / Communication-Responsiveness / Adherence to Agreement
    Note over T,R: Transaction remains COMPLETED — rating is Post-Transaction
```

## Scope boundary

هذا المخطط يركز فقط على `Beneficiary → Provider` rating.

لا يتضمن عمدًا:

- Invoice approval flow؛ هو precondition وتم تمثيله في UC-06.
- Provider rating of Beneficiary؛ مغطى في `UC-07B` منفصلة.
- أي انتقال إلى Transaction state باسم `Closed`؛ لا توجد هذه الحالة في النموذج الحالي.
- تفاصيل Content Moderation للتعليق؛ التعليق يخضع لسياسة المحتوى، لكن المراجعة الإدارية ليست خطوة إلزامية في كل Rating.

## Public review projection

- Public reviewer identity exposes First Name only plus a Verified Transaction Review indicator.
- No phone/email/full legal name is exposed with the review.

## Postconditions

عند نجاح الإرسال:

- ترتبط Provider Rating بالـCompleted Transaction نفسها.
- تحفظ Overall Stars 1–5 + Structured Criteria المناسبة لنوع Provider، والتعليق إن أضيف.
- تبقى `Transaction.status = Completed`.

## Modeling note

التحقق من أهلية Transaction والحقول الإلزامية يمثل حماية تنفيذية مشتقة من المتطلبات المعتمدة. اختيار `Later` لا يلغي الالتزام؛ يبقى التقييم مطلوبًا مع Reminder بعد 24h وقيد إكماله قبل بدء Transaction جديدة.
