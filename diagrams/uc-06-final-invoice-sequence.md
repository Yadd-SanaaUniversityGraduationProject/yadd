# UC-06 — Create, Revise and Approve Final Invoice Sequence Diagrams

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** تم تفكيك `UC-06 — Create, Revise and Approve Final Invoice` إلى سيناريوهين متماسكين بدل وضع دورة الفاتورة كاملة في Sequence Diagram واحدة كبيرة. هذا **Scenario Decomposition** داخل UC-06 وليس إنشاء Use Cases جديدة.

## Source basis

- **Approved behavior:** `UC-06 — Create, Revise and Approve Final Invoice` in `docs/03-analysis/08-use-cases.md`.
- **Requirements:** `FR-010`, `FR-010A`, `FR-011`, `FR-011A`, `FR-011B`, `FR-011C`, `FR-011D`, and the current completion requirement in `docs/03-analysis/05-SRS.md`.
- **Business rules:** `BR-009` through `BR-013`, plus the current dispute/completion rules.
- **Lifecycle:** Final Invoice is sent as `Pending Customer Approval`; approval makes Transaction `Completed`; revision returns the invoice to Provider and then back for review; no response is not approval and there is no Auto-Approval.
- **Detailed model:** `docs/03-analysis/15-invoice-approval-and-dispute.md`.
- **Derived modeling roles:** `ProviderUI`, `BeneficiaryUI`, `InvoiceController`, and `TransactionController` are Sequence modeling roles, not approved implementation class names.
- **Abstraction rule:** this draft does **not** commit to an `InvoiceVersion` implementation class. The requirement to preserve revision history is represented abstractly on `Invoice`.

---

## Scenario A — Provider Creates and Submits Final Invoice

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#D8E8D0","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor P as Provider
    actor B as Beneficiary
    participant PUI as ProviderUI «boundary»
    participant IC as InvoiceController «control»
    participant T as Transaction «entity»
    participant I as Invoice «entity»
    participant BUI as BeneficiaryUI «boundary»

    Note over P,T: Precondition: Transaction exists and fulfillment/preparation reached the appropriate stage

    P->>PUI: createFinalInvoice(transactionId, invoiceData)
    PUI->>IC: submitFinalInvoice(transactionId, invoiceData)
    IC->>T: checkInvoiceSubmissionAllowed(transactionId)
    T-->>IC: transactionState

    alt Submission allowed
        IC->>I: recordFinalInvoice(invoiceData)
        I-->>IC: invoiceCreated(invoiceId)
        IC->>I: markPendingCustomerApproval()
        I-->>IC: invoicePendingApproval()
        IC-->>PUI: invoiceSubmitted(invoiceId)
        IC-->>BUI: finalInvoiceReady(invoiceId)
        PUI-->>P: showSubmissionConfirmation()
        BUI-->>B: requestInvoiceReview()
    else Submission not allowed
        IC-->>PUI: invoiceSubmissionRejected(reason)
        PUI-->>P: showSubmissionError()
    end

    Note over P,I: Invoice contains parties, items, prices and total — images are optional
```

### Scenario A postcondition

عند نجاح الإرسال تصبح الفاتورة `Pending Customer Approval`. لا يعني ذلك أن Transaction اكتملت، ولا يثبت أي Payment داخل YADD.

---

## Scenario B — Beneficiary Reviews, Requests Revision, or Approves

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    actor P as Provider
    participant BUI as BeneficiaryUI «boundary»
    participant PUI as ProviderUI «boundary»
    participant IC as InvoiceController «control»
    participant TC as TransactionController «control»
    participant I as Invoice «entity»
    participant T as Transaction «entity»

    Note over B,I: Precondition: Invoice is Pending Customer Approval

    loop Review cycle until approval or unresolved complaint path
        B->>BUI: reviewFinalInvoice(invoiceId)
        BUI->>IC: getFinalInvoice(invoiceId)
        IC->>I: loadCurrentInvoice()
        I-->>IC: invoiceDetails
        IC-->>BUI: invoiceDetails
        BUI-->>B: showInvoice()

        alt Beneficiary requests revision
            B->>BUI: requestInvoiceRevision(note)
            BUI->>IC: requestRevision(invoiceId, note)
            IC->>I: recordRevisionRequest(note)
            I-->>IC: revisionRequestRecorded()
            IC-->>PUI: revisionRequested(note)
            PUI-->>P: showRevisionRequest(note)

            P->>PUI: submitRevisedInvoice(changes)
            PUI->>IC: reviseFinalInvoice(invoiceId, changes)
            IC->>I: saveRevisedInvoiceAndPreserveHistory(changes)
            I-->>IC: revisedInvoicePendingApproval()
            IC-->>PUI: revisionSubmitted()
            IC-->>BUI: revisedInvoiceReady()
            PUI-->>P: showRevisionConfirmation()
            BUI-->>B: requestInvoiceReview()

        else Beneficiary approves
            BUI-->>B: showFinalApprovalWarning()
            B->>BUI: confirmFinalApproval()
            BUI->>IC: approveFinalInvoice(invoiceId)
            IC->>I: markFinalImmutable()
            I-->>IC: invoiceApproved()
            IC->>TC: completeTransaction(transactionId)
            TC->>T: setStatus(COMPLETED)
            T-->>TC: transactionCompleted()
            TC-->>IC: completionRecorded()
            IC-->>BUI: approvalConfirmed()
            IC-->>PUI: transactionCompleted()
            BUI-->>B: showCompletedStatus()
            PUI-->>P: showCompletedStatus()

        else Continued disagreement before approval
            Note over B,P: Continue to the separate Transaction Complaint / Administrative Review sequence
            Note over B,T: Raising a complaint does not by itself mean immediate automatic Disputed status
        end
    end

    Note over B,I: No response keeps the invoice Pending Customer Approval — no Auto-Approval
    Note over B,I: Reminder concept is approved, but long-pending escalation timing remains open
```

## Scope boundary

UC-06 ينتهي في المسار الناجح عند:

`Final Invoice Approved → Transaction = Completed`

ولا يتضمن عمدًا تفاصيل التقييم؛ `Rate Provider` و`Rate Beneficiary` هما Post-Transaction Use Cases مستقلة.

المسار التفصيلي للشكوى والمراجعة الإدارية **لم يُحشر داخل هذا الرسم** حتى لا يتضخم UC-06، وسيُمثل في Sequence Diagram مستقلة للـTransaction Complaint / Administrative Review. عندها يجب الحفاظ على `DEC-073`: الإدارة تراجع أدلة YADD وتطبق سياسة المنصة، ولا تحكم في الدفع/الاسترداد/التعويض، و`Disputed` لا يُعامل كأثر آلي فوري لمجرد فتح Complaint.

## Approved behavior represented here

- Provider creates the final invoice after fulfillment/preparation and stabilized final terms.
- Invoice is sent as `Pending Customer Approval`.
- Beneficiary may request revision with a note.
- Provider may revise and resubmit, and previous revisions must remain traceable.
- Before final approval, Beneficiary sees a clear warning and confirms separately.
- Approved invoice becomes final/immutable inside YADD.
- Invoice approval makes the Transaction `Completed`.
- No response does not equal approval; there is no Auto-Approval.
- No Payment/Refund lifecycle is modeled inside YADD.

## Needs Verification / intentionally omitted

`INV-PENDING-Q01` remains open, so this diagram does not invent a duration, reminder count, or automatic escalation rule for a long-pending invoice.
