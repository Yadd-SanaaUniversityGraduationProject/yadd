# UC-08 — Block and Report User / Content Sequence Diagrams

> **Status:** `REVIEW DRAFT — NOT BASELINED`
>
> **Purpose:** تم تفكيك `UC-08 — Block and Report User / Content` إلى سيناريوهين مستقلين داخل الملف نفسه لأن `Block User` و`Report User / Content` هدفان منفصلان للمستخدم، ولا يشترط أحدهما الآخر. هذا متوافق مع Traceability الحالية ولا ينشئ Use Cases جديدة.

## Source basis

- **Approved behavior:** `UC-08 — Block and Report User / Content` in `docs/03-analysis/08-use-cases.md`.
- **Team decisions:** `DEC-053` and `DEC-054`.
- **Business rules:** `BR-021` and `BR-022`.
- **Traceability:** `UR-SAFE-01` maps to `UC-08 → Block User / Report User-Content / Review Reports-Flags` and to `REPORT / moderation records`.
- **Trust & Safety rule:** Report and AI/behavioral Flags are inputs for review and do not by themselves prove a violation or authorize an automatic final high-impact punishment.
- **Open items intentionally excluded:** AI/moderation thresholds and detailed policy categories remain open and are not invented here.
- **Derived modeling roles:** `UserUI`, `SafetyController`, `AdminUI`, and `ModerationController` are Sequence modeling roles, not approved implementation class names.

### Actor note

`User` هنا هو الـPrimary actor كما هو مكتوب في UC-08، ويعني شخصًا يستخدم YADD في سياق Beneficiary أو Provider. لا يمثل هذا إضافة Actor رئيسي جديد إلى Main Use Case Diagram، الذي يبقى وفق النموذج الحالي: `Beneficiary`, `Provider`, `YADD Administrator`.

---

## Scenario A — Block User

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor U as User
    participant UI as UserUI «boundary»
    participant SC as SafetyController «control»

    U->>UI: blockUser(targetUserId)
    UI->>SC: blockUser(userId, targetUserId)
    SC-->>UI: blockApplied()
    UI-->>U: showBlockConfirmation()

    Note over U,SC: Direct communication between the two users is stopped
```

### Scenario A postcondition

- التواصل المباشر بين المستخدم الحاظر والطرف المحظور يتوقف وفق `DEC-053 / BR-022`.
- لا يعني `Block` تلقائيًا وجود Report.
- لم يُفترض وجود عقوبة إدارية أو إدانة للطرف الآخر لمجرد الحظر.

---

## Scenario B — Report User / Content and Administrative Review

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor U as User
    actor A as YADD Administrator
    participant UI as UserUI «boundary»
    participant SC as SafetyController «control»
    participant R as Report «entity»
    participant AUI as AdminUI «boundary»
    participant MC as ModerationController «control»

    U->>UI: submitReport(targetType, targetRef, details)
    UI->>SC: createReport(reporterId, targetType, targetRef, details)
    SC->>R: recordReport(details, evidenceRefs)
    R-->>SC: reportCreated(reportId)
    SC-->>UI: reportSubmitted(reportId)
    SC-->>AUI: reportReadyForReview(reportId)
    UI-->>U: showReportConfirmation()

    Note over U,R: Report may relate to a user, conversation, behavior, or Portfolio/Catalog item
    Note over U,A: A Report is not proof of a violation and does not equal automatic punishment

    A->>AUI: openReport(reportId)
    AUI->>MC: reviewReport(reportId)
    MC->>R: loadReportAndPlatformEvidence(reportId)
    R-->>MC: reportAndEvidence
    MC-->>AUI: reviewContext
    AUI-->>A: showReviewContext()

    A->>AUI: recordReviewOutcome(outcome)
    AUI->>MC: recordAuthorizedReviewOutcome(reportId, outcome)
    MC->>R: saveReviewOutcome(outcome)
    R-->>MC: outcomeSaved()
    MC-->>AUI: reviewRecorded()
    AUI-->>A: showReviewConfirmation()

    Note over A,MC: Any administrative action must follow approved YADD policy and human authorization
```

## Scope boundary

هذا الملف لا يجعل `Block` شرطًا لرفع `Report` ولا يجعل `Report` شرطًا لتنفيذ `Block`.

كما لا يتضمن عمدًا:

- AI كخطوة إلزامية في كل Report؛ AI/Rules قد تولد Flags في Trust & Safety، لكن UC-08 لا تشترط أن يمر كل Report عبر AI.
- أي threshold رقمي أو Risk Score محدد؛ هذه تفاصيل `Needs Verification`.
- قائمة نهائية بأنواع المخالفات أو العقوبات؛ السياسة التفصيلية ما تزال مفتوحة جزئيًا.
- أي عقوبة نهائية آلية بمجرد Report أو Flag.

## Postconditions

### Block

- يتوقف التواصل المباشر بين المستخدمين المعنيين.

### Report

- يتم حفظ Report كسجل قابل للمراجعة الإدارية.
- يراجع موظف مخول Report والأدلة المتاحة داخل YADD.
- يسجل Review Outcome وفق السياسة المعتمدة.
- Report وحده لا يساوي إدانة، ولا يؤدي تلقائيًا إلى حظر نهائي أو عقوبة عالية الأثر.

## Modeling note

استخدام `Report «entity»` مدعوم بالـTraceability الحالية (`REPORT / moderation records`). أما أسماء الـUI والـControllers فهي Derived interaction roles فقط، ولا تمثل قرارًا معماريًا أو Classes تنفيذية معتمدة.
