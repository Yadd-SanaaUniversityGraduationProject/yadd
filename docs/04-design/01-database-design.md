# Database Design — Relation Schema

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — DERIVED FROM CURRENT ERD — NOT BASELINED`
>
> **آخر مزامنة:** 2026-09-05
>
> **المصدر:** `docs/03-analysis/11-ERD.md` + SRS v0.9.5 + Business Rules الحالية. هذه الوثيقة تصميم مشتق ولا تنشئ Requirement أو Team Decision جديدًا.

## 1. Design Boundary

تمت إزالة المفاهيم القديمة التي لم تعد جزءًا من النموذج الحالي:

- لا `Role/UserRole` لتمييز Beneficiary وProvider؛ يوجد User واحد + optional Provider Profile.
- لا `ServiceRequest` منفصل؛ المصطلح الحالي `Request` ويغطي Service/Product.
- لا `Offer`; المصطلح الحالي `ProviderResponse`.
- لا `Agreement` entity مستقلة.
- لا generic `Review`; يوجد `ProviderRating` و`BeneficiaryRating`.
- لا Payment/Wallet/Escrow/Refund/Settlement relations لمعاملات Beneficiary↔Provider.

## 2. Candidate Logical Relations — Preliminary

> الأسماء والحقول أدناه مشتقة من الـConceptual ERD الحالي. الأنواع الفيزيائية، أسماء القيود، الفهارس وسياسة الحذف/التحديث النهائية تحتاج مراجعة Chapter Four ولا تعتبر Baseline.

```text
User(
  UserId PK,
  AccountStatus,
  FullName,
  Phone
)

ProviderProfile(
  ProviderProfileId PK,
  UserId FK UNIQUE -> User.UserId,
  VerificationStatus,
  ProfileStatus
)

Category(
  CategoryId PK,
  Name,
  CategoryType
)

ProviderActivity(
  ProviderActivityId PK,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  CategoryId FK -> Category.CategoryId,
  ActivityType,
  Status
)

Area(
  AreaId PK,
  ParentAreaId FK NULL -> Area.AreaId,
  Name,
  AreaType
)

ProviderServiceArea(
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  AreaId FK -> Area.AreaId,
  CandidateKey(ProviderProfileId, AreaId)
)

ShowcaseItem(
  ShowcaseItemId PK,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  ItemType,
  Description NULL,
  OriginalMediaReference,
  DisplayMediaReference,
  Status
)

Request(
  RequestId PK,
  BeneficiaryUserId FK -> User.UserId,
  CategoryId FK -> Category.CategoryId,
  AreaId FK -> Area.AreaId,
  RequestType,
  Description,
  IndicativePrice NULL,
  Status
)

ProviderResponse(
  ResponseId PK,
  RequestId FK -> Request.RequestId,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  ProposedPrice NULL,
  RequiresDeposit,
  Note NULL,
  Status
)

Conversation(
  ConversationId PK,
  BeneficiaryUserId FK -> User.UserId,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  RequestId FK NULL -> Request.RequestId,
  TransactionId FK NULL -> Transaction.TransactionId,
  Status
)

Message(
  MessageId PK,
  ConversationId FK -> Conversation.ConversationId,
  SenderUserId FK -> User.UserId,
  MessageType,
  SentAt
)

Transaction(
  TransactionId PK,
  BeneficiaryUserId FK -> User.UserId,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  RequestId FK NULL -> Request.RequestId,
  SelectedResponseId FK NULL -> ProviderResponse.ResponseId,
  OriginType,
  Status,
  CancellationReason NULL
)

InvoiceVersion(
  InvoiceVersionId PK,
  TransactionId FK -> Transaction.TransactionId,
  VersionNumber,
  Status,
  TotalAmount,
  RevisionNote NULL
)

InvoiceItem(
  InvoiceItemId PK,
  InvoiceVersionId FK -> InvoiceVersion.InvoiceVersionId,
  Description,
  Quantity,
  UnitPrice,
  LineTotal
)

ProviderRating(
  ProviderRatingId PK,
  TransactionId FK UNIQUE -> Transaction.TransactionId,
  BeneficiaryUserId FK -> User.UserId,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  Stars,
  Comment NULL
)

BeneficiaryRating(
  BeneficiaryRatingId PK,
  TransactionId FK UNIQUE -> Transaction.TransactionId,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  BeneficiaryUserId FK -> User.UserId,
  RequestCommunicationScore,
  AgreementCommitmentScore,
  CooperationScore,
  Comment NULL
)

VerificationCase(
  VerificationCaseId PK,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  Status,
  SubmittedAt,
  ReviewedAt NULL
)

VerificationArtifact(
  ArtifactId PK,
  VerificationCaseId FK -> VerificationCase.VerificationCaseId,
  ArtifactType,
  PrivateMediaReference,
  ReviewStatus
)

Subscription(
  SubscriptionId PK,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  Status,
  StartDate,
  EndDate
)

Report(
  ReportId PK,
  ReporterUserId FK -> User.UserId,
  TargetType,
  TargetReference,
  Reason,
  Status,
  CreatedAt
)
```

## 3. Stable Constraints from Current Decisions

هذه القيود لها أساس تحليلي حالي، لكن صياغتها SQL النهائية تراجع لاحقًا:

1. User يمتلك صفر أو Provider Profile واحدًا — DEC-008..011.
2. Provider Profile يمكن أن يملك Service Activity أو Product Activity أو كليهما — DEC-029/030.
3. لكل Provider استجابة فعالة واحدة فقط لكل Request — DEC-070.
4. Provider Response يمكن تعديلها/سحبها قبل Selection فقط — DEC-070.
5. Request واحد ينتج صفر أو Transaction واحدة فقط في Request Route — DEC-047/066/070.
6. Direct Search Transaction قد تكون بلا Request/ProviderResponse، ولا تنشأ إلا بعد Mutual Start Confirmation — DEC-069.
7. `RequiresDeposit` Boolean فقط؛ لا DepositAmount/PaymentStatus/Refund — DEC-041.
8. `Completed` terminal successful Transaction state؛ `Disputed` terminal unsuccessful state — DEC-071/073.
9. ProviderRating واحدة بحد أقصى لكل Completed Transaction، وهي مطلوبة في تدفق Beneficiary→Provider — DEC-051/071.
10. BeneficiaryRating واحدة بحد أقصى لكل Completed Transaction، وهي اختيارية — DEC-063/071.
11. لا Ratings لـCancelled/Disputed Transactions — DEC-073.
12. Complaint/Report review لا ينشئ Financial Settlement relation أو سلطة Refund/Compensation — DEC-073.

## 4. Physical Design Decisions Still Open

لا تثبت في هذه النسخة دون تحليل/قرار تصميم مناسب:

- أنواع الحقول الفيزيائية الدقيقة وأطوال النصوص.
- Shared `Media` table مقابل references خاصة بكل entity.
- `InvoiceVersion` مقابل `Invoice + InvoiceRevision` كتطبيق فيزيائي.
- طريقة حفظ تاريخ تعديل ProviderResponse.
- Authorization/Roles الفيزيائية للإدارة؛ عدم استخدام Role لتمييز Beneficiary/Provider لا يعني عدم وجود Authorization tables إدارية مستقبلًا.
- طريقة تنفيذ polymorphic `Report.TargetReference`.
- Indexes, cascade rules, audit tables النهائية.
- تفاصيل Verification document types/retention.
- AI flags/storage بعد حسم السياسات المفتوحة.

## 5. Gate

هذه النسخة أصبحت **متزامنة مع النموذج الحالي** لكنها ليست Relation Schema نهائيًا. يلزم قبل اعتمادها:

- مراجعة كل PK/FK/Unique/Check constraint مقابل SRS/Business Rules.
- ربطها بـData Dictionary.
- مراجعة Normalization والأنواع الفيزيائية.
- اجتياز Design/Readiness Gate ثم Baseline المناسب.
