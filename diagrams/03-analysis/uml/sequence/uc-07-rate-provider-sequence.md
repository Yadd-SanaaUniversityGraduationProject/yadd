# UC-07 — Rate Provider Sequence Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من `UC-07 — Rate Provider` فقط. يمثل التقييم الإلزامي للمقدم بعد اكتمال Transaction، باعتباره Post-Transaction operation مستقلة.

## Source basis

- **Approved behavior:** `UC-07 — Rate Provider` in `docs/03-analysis/08-use-cases.md`.
- **Rating model:** `docs/03-analysis/18-rating-reputation-model.md`.
- **Business/decision basis:** `DEC-051`, `DEC-071` and the corresponding rating/business rules.
- **Precondition:** Transaction is `Completed` between the same Beneficiary and Provider, with the final invoice approved.
- **Rating data:** 1–5 stars are required; text comment is optional.
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
    participant R as ProviderRating «entity»

    Note over B,T: Precondition: Transaction Completed + final invoice approved

    UI-->>B: promptRequiredProviderRating(transactionId)
    B->>UI: submitProviderRating(stars, optionalComment)
    UI->>C: submitProviderRating(transactionId, stars, comment)
    C->>T: verifyCompletedTransaction(transactionId, Beneficiary)
    T-->>C: ratingEligibility

    alt Eligible + stars from 1 to 5
        C->>R: createProviderRating(transactionId, stars, comment)
        R-->>C: ratingSaved(ratingId)
        C-->>UI: ratingSubmitted(ratingId)
        UI-->>B: showRatingConfirmation()
    else Not eligible or invalid required rating
        C-->>UI: ratingRejected(reason)
        UI-->>B: showRatingError()
    end

    Note over T,R: Transaction remains COMPLETED — rating is Post-Transaction
```

## Scope boundary

هذا المخطط يركز فقط على `Beneficiary → Provider` rating.

لا يتضمن عمدًا:

- Invoice approval flow؛ هو precondition وتم تمثيله في UC-06.
- Provider rating of Beneficiary؛ مغطى في `UC-07B` منفصلة.
- أي انتقال إلى Transaction state باسم `Closed`؛ لا توجد هذه الحالة في النموذج الحالي.
- تفاصيل Content Moderation للتعليق؛ التعليق يخضع لسياسة المحتوى، لكن المراجعة الإدارية ليست خطوة إلزامية في كل Rating.

## Postconditions

عند نجاح الإرسال:

- ترتبط Provider Rating بالـCompleted Transaction نفسها.
- تحفظ درجة 1–5، والتعليق إن أضيف.
- تبقى `Transaction.status = Completed`.

## Modeling note

فرع رفض التقييم يمثل حماية تنفيذية مشتقة من شروط الأهلية ومن إلزامية قيمة النجوم 1–5. لا يضيف عقوبة أو حالة Transaction جديدة.
