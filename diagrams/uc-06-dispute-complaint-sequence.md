# UC-06 — Transaction Complaint / Administrative Review Sequence Diagram

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** Sequence Diagram مشتق من **Alternative — Dispute** داخل `UC-06 — Create, Revise and Approve Final Invoice`. هذا الملف لا ينشئ Use Case جديدة؛ هو Scenario منفصل لأن مسار الشكوى والمراجعة الإدارية معقد بما يكفي ليكون رسمًا مستقلًا وقابلًا للعرض على A4.

## Source basis

- **Approved behavior:** dispute alternative in `UC-06` from `docs/03-analysis/08-use-cases.md`.
- **Team decision:** `DEC-073`.
- **Business rule:** `BR-040`.
- **Detailed model:** `docs/03-analysis/15-invoice-approval-and-dispute.md`.
- **Precondition:** disagreement continues before final invoice approval.
- **Governance rule:** YADD Administration reviews evidence available inside YADD and applies platform policy only. It does not arbitrate financial/commercial rights and does not order Payment, Refund, or Compensation.
- **Terminal rule:** Transaction becomes `Disputed` only when the disagreement remains unresolved and the parties do not reach agreement before invoice approval.
- **Rating rule:** `Disputed` Transactions do not open Ratings.
- **Derived modeling roles:** `BeneficiaryUI`, `ProviderUI`, `AdminUI`, and `ComplaintController` are Sequence modeling roles, not approved implementation class names.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    actor P as Provider
    actor A as YADD Administrator
    participant BUI as BeneficiaryUI «boundary»
    participant PUI as ProviderUI «boundary»
    participant C as ComplaintController «control»
    participant R as Report «entity»
    participant T as Transaction «entity»
    participant AUI as AdminUI «boundary»

    Note over B,T: Precondition: disagreement continues before final invoice approval

    B->>BUI: raiseTransactionComplaint(transactionId, details)
    BUI->>C: createTransactionComplaint(transactionId, details)
    C->>R: recordComplaint(transactionId, details, evidenceRefs)
    R-->>C: complaintCreated(complaintId)
    C-->>BUI: complaintRecorded(complaintId)
    C-->>PUI: complaintOpened(complaintId)
    C-->>AUI: complaintReadyForReview(complaintId)
    BUI-->>B: showComplaintConfirmation()
    PUI-->>P: showComplaintNotice()
    AUI-->>A: showComplaintForReview()

    A->>AUI: openComplaint(complaintId)
    AUI->>C: loadComplaintReviewContext(complaintId)
    C->>R: loadComplaintAndLinkedPlatformEvidence(complaintId)
    R-->>C: complaintAndEvidence
    C-->>AUI: reviewContext
    AUI-->>A: showPlatformEvidence()

    A->>AUI: recordPlatformPolicyReview(outcome)
    AUI->>C: recordAdministrativeReviewOutcome(complaintId, outcome)
    C->>R: saveAdministrativeReviewOutcome(outcome)
    R-->>C: reviewOutcomeSaved()

    Note over A,C: Administration applies YADD policy only — no financial or commercial arbitration

    alt Parties reach agreement before final invoice approval
        C-->>BUI: complaintReviewRecorded()
        C-->>PUI: complaintReviewRecorded()
        BUI-->>B: returnToInvoiceResolutionFlow()
        PUI-->>P: returnToInvoiceResolutionFlow()
        Note over B,P: Invoice review or revision may continue — Transaction is not automatically Disputed
    else Disagreement remains unresolved and no agreement is reached
        C->>T: setStatus(DISPUTED)
        T-->>C: disputedStatusSaved()
        C-->>BUI: transactionDisputed()
        C-->>PUI: transactionDisputed()
        BUI-->>B: showDisputedStatus()
        PUI-->>P: showDisputedStatus()
    end

    Note over T,AUI: No Ratings are opened for a Disputed Transaction
```

## Scope boundary

هذا الرسم يبدأ فقط بعد استمرار الخلاف قبل اعتماد Final Invoice. لا يعيد رسم إنشاء الفاتورة أو طلب التعديل، لأنهما موجودان في `uc-06-final-invoice-sequence.md`.

لا يتضمن عمدًا:

- أي Payment, Refund, Compensation, Escrow, أو Settlement داخل YADD.
- أي ادعاء بأن قرار الإدارة يحسم الحقوق التجارية بين Beneficiary وProvider.
- أي automatic punishment بمجرد تقديم Complaint.
- تفاصيل قائمة العقوبات أو سياسة moderation الدقيقة إذا لم تكن معتمدة.

## Postconditions

### If parties reach agreement

- يسجل Administrative Review Outcome داخل YADD.
- لا تتحول Transaction تلقائيًا إلى `Disputed`.
- يمكن العودة إلى مسار مراجعة/تعديل الفاتورة وفق الحالة الفعلية.

### If disagreement remains unresolved

- `Transaction.status = Disputed`.
- الحالة نهائية غير ناجحة.
- لا تفتح Ratings.

## Modeling note

استخدام `Report «entity»` هنا يتبع Traceability الحالية التي تمثل Transaction Complaint كسجل Report/complaint record. أما `ComplaintController` فهو Derived interaction role فقط.
