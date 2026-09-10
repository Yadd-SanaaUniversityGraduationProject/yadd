# UC-09 — Provider Verification / Portal Activation Sequence Diagrams

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** تم تفكيك `UC-09 — Provider Verification / Portal Activation` إلى سيناريوهين متماسكين داخل الملف نفسه حتى يبقى الرسم قابلًا للقراءة على A4: تقديم/إعادة تقديم التحقق، ثم المراجعة البشرية والقرار. هذا Scenario Decomposition داخل UC-09 ولا ينشئ Use Cases جديدة.

## Source basis

- **Approved behavior:** `UC-09 — Provider Verification / Portal Activation` in `docs/03-analysis/08-use-cases.md`.
- **Provider Verification Model:** `docs/03-analysis/21-provider-verification-model.md`.
- **Team decisions:** `DEC-010`, `DEC-034`, `DEC-035`, `DEC-036`, `DEC-037..040`.
- **Business rules:** `BR-027`, `BR-028` and the current verification rules.
- **Core verification rule:** every Provider Profile must pass formal verification before Provider functions become available.
- **Minimum approved evidence:** official identity document + a personal photo with the document + required account data for matching.
- **Human decision rule:** final `Verified`, `Resubmission Required`, or `Rejected` decision is made by authorized YADD staff. AI/automated checks are advisory only.
- **Sensitive-data rule:** identity images, personal verification photos, matching results and related verification data are non-public and access-controlled.
- **Derived modeling roles:** `ProviderUI`, `VerificationController`, `VerificationAssistant`, and `ReviewerUI` are Sequence modeling roles only, not approved implementation class names or committed services.

## Scenario A — Submit or Resubmit Verification

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#D8E8D0","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor U as User
    participant UI as ProviderUI «boundary»
    participant VC as VerificationController «control»
    participant VP as ProviderProfile «entity»
    participant CASE as VerificationCase «entity»

    U->>UI: openProviderVerification()
    UI->>VC: getVerificationRequirements(userId)
    VC-->>UI: verificationRequirements
    UI-->>U: showVerificationForm()

    Note over U,CASE: Minimum approved inputs: official identity document, personal photo with document, required account data

    U->>UI: submitVerification(verificationData)
    UI->>VC: submitVerification(userId, verificationData)
    VC->>VP: getProviderProfile(userId)
    VP-->>VC: providerProfile

    alt Required verification inputs present
        VC->>CASE: createOrUpdateVerificationCase(verificationData)
        CASE-->>VC: caseSaved(caseId)
        VC->>CASE: setStatus(SUBMITTED)
        CASE-->>VC: statusUpdated()
        VC-->>UI: verificationSubmitted(caseId)
        UI-->>U: showSubmittedForReviewStatus()
    else Required verification inputs missing or unusable
        VC-->>UI: submissionRejected(reason)
        UI-->>U: showVerificationErrors()
    end

    opt Resubmission requested after review
        U->>UI: resubmitVerification(updatedData)
        UI->>VC: resubmitVerification(caseId, updatedData)
        VC->>CASE: updateVerificationEvidence(updatedData)
        CASE-->>VC: evidenceUpdated()
        VC->>CASE: setStatus(SUBMITTED)
        CASE-->>VC: statusUpdated()
        VC-->>UI: resubmissionAccepted()
        UI-->>U: showSubmittedForReviewStatus()
    end
```

### Scenario A notes

- لا يتم تفعيل Provider Profile تلقائيًا بمجرد رفع البيانات.
- بعد الإرسال تكون الحالة المفاهيمية `Submitted`، وتنتقل إلى `UnderReview` عند بدء المراجعة البشرية وفق lifecycle المعتمد.
- أثناء انتظار المراجعة يمكن للحساب الاستمرار كمستفيد، لكن لا تُفتح وظائف Provider المعتمدة على التحقق.
- لم يُفترض نوع وثيقة محدد أو عدد صور أو مدة صلاحية تشغيلية لأن هذه التفاصيل ما تزال مفتوحة.

---

## Scenario B — Assisted Checks, Human Review, and Final Verification Decision

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor R as Verification Reviewer
    actor U as User
    participant RUI as ReviewerUI «boundary»
    participant VC as VerificationController «control»
    participant VA as VerificationAssistant «control»
    participant CASE as VerificationCase «entity»
    participant VP as ProviderProfile «entity»
    participant PUI as ProviderUI «boundary»

    Note over R,CASE: Precondition: Verification Case is Submitted or Under Review

    R->>RUI: openVerificationCase(caseId)
    RUI->>VC: loadVerificationCase(caseId)
    VC->>CASE: getCaseAndEvidence(caseId)
    CASE-->>VC: verificationEvidence

    opt Case is still Submitted
        VC->>CASE: setStatus(UNDER_REVIEW)
        CASE-->>VC: statusUpdated()
    end

    opt Automated assistance is available
        VC->>VA: runAssistiveChecks(verificationEvidence)
        VA-->>VC: ocrQualityMatchAndRiskIndicators
        VC->>CASE: recordAssistiveIndicators(indicators)
        CASE-->>VC: indicatorsRecorded()
    end

    VC-->>RUI: reviewContext
    RUI-->>R: showVerificationEvidenceAndIndicators()

    Note over R,VA: Automated results are advisory only — final decision remains human

    R->>RUI: submitVerificationDecision(decision, note)
    RUI->>VC: recordVerificationDecision(caseId, decision, note)

    alt Authorized reviewer approves
        VC->>CASE: setStatus(VERIFIED)
        CASE-->>VC: statusUpdated()
        VC->>VP: markVerified()
        VP-->>VC: providerVerified()
        VC-->>PUI: verificationApproved()
        PUI-->>U: showVerifiedStatus()

    else Authorized reviewer requests resubmission
        VC->>CASE: setStatus(RESUBMISSION_REQUIRED, note)
        CASE-->>VC: statusUpdated()
        VC-->>PUI: resubmissionRequired(note)
        PUI-->>U: showResubmissionRequest(note)

    else Authorized reviewer rejects
        VC->>CASE: setStatus(REJECTED, note)
        CASE-->>VC: statusUpdated()
        VC-->>PUI: verificationRejected(note)
        PUI-->>U: showRejectedStatus()
    end

    Note over VP,PUI: Verified status enables Provider eligibility subject to other current conditions
```

## Scope boundary

هذا الملف يوضح Verification وPortal eligibility فقط. لا يتضمن عمدًا:

- اشتراك Provider كجزء من قرار التحقق نفسه. `Verified` لا يعني تلقائيًا أن الاشتراك `Active`، وإرسال Provider Responses الجديدة ما يزال يحتاج الشرطين معًا وفق القواعد الحالية.
- نوع مزود AI أو OCR/Face/Liveness service بعينه. `VerificationAssistant` مجرد modeling role ولا يثبت اختيار Vendor أو API.
- أي قرار نهائي آلي بالقبول أو الرفض.
- وصولًا إلى قواعد بيانات حكومية أو سجل جنائي، لأن ذلك غير معتمد.
- أنواع وثائق محددة، مدة الاحتفاظ، أو تراخيص مهنية خاصة، لأنها ما تزال `Needs Verification`.
- عرض بيانات التحقق الحساسة لأي Beneficiary أو Provider آخر.
- تفاصيل إنشاء/تعديل Provider Profile والنشاط ومناطق الخدمة؛ هذه أهداف نمذجة مستقلة في Main Use Case decomposition، بينما هذا الملف يركز على Verification/Activation interaction نفسها.

## Postconditions

### Verified

- `VerificationCase.status = Verified`.
- يصبح Provider Profile متحققًا.
- يمكن فتح وظائف Provider المناسبة فقط مع استيفاء الشروط الأخرى ذات الصلة.

### Resubmission Required

- لا يصبح Provider Profile Verified.
- يتلقى المستخدم ملاحظة/سبب إعادة التقديم ويستطيع تقديم Evidence محدثة.

### Rejected

- لا يصبح Provider Profile Verified.
- يسجل القرار والملاحظة/السبب بواسطة الموظف المخول.

## Sensitive-data and governance note

صور الهوية والصور الشخصية ونتائج المطابقة وبيانات التحقق مواد حساسة غير عامة. الوصول والمراجعات الحساسة يجب أن تكون مقيّدة ومُسجلة في Audit Trail وفق نموذج التحقق الحالي. تفاصيل مدة الاحتفاظ والحذف ما تزال `NEEDS_LEGAL_VERIFICATION` ولا تُخترع في هذا الرسم.
