# Database Design — Relation Schema

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — LOGICAL + 32-TABLE PHYSICAL MODEL SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **آخر مزامنة:** 2026-09-20
>
> **المصدر:** `docs/03-analysis/11-ERD.md` + SRS v0.9.10 + Business Rules الحالية + DEC-091 للتقنيات التنفيذية. هذه الوثيقة تصميم مشتق ولا تنشئ Requirement أو Team Decision جديدًا.
>
> **Implementation DBMS/Data Access:** Microsoft SQL Server عبر Entity Framework Core. يستخدم ASP.NET Core Identity كآلية تنفيذ لإدارة الحسابات/المصادقة؛ تبقى `User` هنا علاقة منطقية للمجال، وقد حُسم Working Physical mapping الحالي إلى `ApplicationUser`/ASP.NET Core Identity؛ تبقى nullability/constraint names/indexes/cascade/migrations للمراجعة النهائية قبل Baseline.

## 1. Design Boundary

تمت إزالة/منع المفاهيم القديمة التي لم تعد جزءًا من النموذج الحالي:

- لا `Guest` table لمجرد anonymous browsing؛ Guest Actor غير authenticated حتى Create Account/Log In — DEC-077.
- لا `Role/UserRole` لتمييز Beneficiary وProvider؛ يوجد User واحد + optional Provider Profile.
- لا `ServiceRequest` منفصل؛ المصطلح الحالي `Request` ويغطي Service/Product.
- لا `Offer`; المصطلح الحالي `ProviderResponse`.
- لا `Agreement` entity مستقلة.
- لا generic `Review`; يوجد `ProviderRating` و`BeneficiaryRating`.
- لا Payment/Wallet/Escrow/Refund/Settlement relations لمعاملات Beneficiary↔Provider.
- Public Provider Profile هو **projection/read model** من بيانات مسموح بعرضها، وليس Relation مستقلة ملزمة في هذا المستوى. `User.Phone` لا يعد public field — DEC-077.

## 2. Candidate Logical Relations — Preliminary

> الأسماء والحقول أدناه مشتقة من الـConceptual ERD الحالي. الأنواع الفيزيائية، أسماء القيود، الفهارس وسياسة الحذف/التحديث النهائية تحتاج مراجعة Chapter Four ولا تعتبر Baseline.

```text
User(
  UserId PK,
  AccountStatus,
  FirstName,
  FatherName,
  GrandfatherName,
  FamilyName,
  Phone,
  PhoneVerifiedAt,
  Email NULL,
  EmailVerifiedAt NULL,
  PasswordHash,
  LastPortal,
  ProfilePhotoReference NULL,
  DeactivatedAt NULL
)

ProviderProfile(
  ProviderProfileId PK,
  UserId FK UNIQUE -> User.UserId,
  ProviderType,
  TradeName NULL,
  Description,
  ProfileImageReference NULL,
  IdentityVerificationStatus NULL,
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

AreaAdjacency(
  SourceAreaId FK -> Area.AreaId,
  AdjacentAreaId FK -> Area.AreaId,
  CandidateKey(SourceAreaId, AdjacentAreaId)
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
  Status,
  CandidateKey(BeneficiaryUserId, ProviderProfileId)
)

Message(
  MessageId PK,
  ConversationId FK -> Conversation.ConversationId,
  SenderUserId FK -> User.UserId,
  MessageType,
  SentAt
)

TransactionStartRequest(
  TransactionStartRequestId PK,
  ConversationId FK -> Conversation.ConversationId,
  RequestedByUserId FK -> User.UserId,
  Status,
  RequestedAt,
  ExpiresAt,
  RespondedAt NULL
)

Transaction(
  TransactionId PK,
  BeneficiaryUserId FK -> User.UserId,
  ProviderProfileId FK -> ProviderProfile.ProviderProfileId,
  ConversationId FK -> Conversation.ConversationId,
  RequestId FK NULL -> Request.RequestId,
  SelectedResponseId FK NULL -> ProviderResponse.ResponseId,
  OriginType,
  Status,
  CancellationActorRole NULL,
  CancellationReason NULL,
  CancelledAt NULL
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
  OverallStars,
  WorkflowStatus,
  Comment NULL
)

ProviderRatingCriterion(
  ProviderRatingCriterionId PK,
  ProviderRatingId FK -> ProviderRating.ProviderRatingId,
  CriterionType,
  TextualValue,
  CandidateKey(ProviderRatingId, CriterionType)
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
  ReviewNote NULL,
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

UserBlock(
  BlockId PK,
  BlockerUserId FK -> User.UserId,
  BlockedUserId FK -> User.UserId,
  Status,
  BlockedAt,
  UnblockedAt NULL
)

Report(
  ReportId PK,
  ReporterUserId FK -> User.UserId,
  TargetType,
  TargetReference,
  Reason,
  Description NULL,
  Status,
  CreatedAt
)

SafetyFlag(
  FlagId PK,
  TargetType,
  TargetReference,
  RiskLevel,
  ReasonCategory
)

AdminAuditRecord(
  AuditRecordId PK,
  SubjectType,
  SubjectReference,
  EventType,
  DecisionOutcome NULL,
  Reason NULL,
  RecordedAt
)

Notification(
  NotificationId PK,
  UserId FK -> User.UserId,
  Type,
  Channel,
  Status,
  CreatedAt,
  ReadAt NULL
)

```

> `SystemEvent`/message-to-transaction physical mapping داخل Conversation المستمرة ما يزال Design Decision مفتوحًا وفق DEC-075. لذلك لا تُخترع FK نهائية هنا قبل اختيار التصميم المناسب.

## 3. Stable Constraints from Current Decisions

هذه القيود لها أساس تحليلي حالي، لكن صياغتها SQL النهائية تراجع لاحقًا:

1. Guest لا يحتاج Relation مستقلة لمجرد public browsing؛ protected writes/operations تبدأ فقط بعد Authentication/User context — DEC-077.
2. `User.Phone` ليس Public Provider Profile field، ولا تعرض البيانات الحساسة/الخاصة عبر public projection — DEC-036/046/077.
3. User يمتلك صفر أو Provider Profile واحدًا — DEC-008..011/074.
4. Provider Profile له نوع واحد فقط `SERVICE` أو `PRODUCT` في MVP — DEC-074.
5. Provider Profile يمكن أن يملك عدة ProviderActivity داخل نوعه؛ Draft قد يحتوي صفرًا مؤقتًا، لكن أهلية وظائف التقديم تتطلب Activity واحدة على الأقل، وكل Category يجب أن تطابق ProviderType — DEC-076.
6. لكل Provider استجابة فعالة واحدة فقط لكل Request — DEC-070.
7. Provider Response يمكن تعديلها/سحبها قبل Selection فقط — DEC-070.
8. Request واحد ينتج صفر أو Transaction واحدة فقط في Request Route — DEC-047/066/070.
9. Direct Search Transaction قد تكون بلا Request/ProviderResponse، ولا تنشأ إلا بعد `TransactionStartRequest` مؤكد خلال 12 ساعة — DEC-069/082.
9A. يسمح بحد أقصى Pending TransactionStartRequest واحد لنفس Conversation/الطرفين، ويؤدي Reject/Expiry إلى بقاء Conversation دون Active Transaction — DEC-082.
10. بين نفس Beneficiary وProvider توجد Conversation واحدة مستمرة؛ Candidate Key المفاهيمي `(BeneficiaryUserId, ProviderProfileId)` — DEC-075.
11. Conversation يمكن أن تضم صفرًا أو عدة Transactions؛ Transaction تحمل ConversationId، ولا يوضع RequestId/TransactionId منفردان داخل Conversation بما يكسر الاستمرارية — DEC-075.
12. `RequiresDeposit` Boolean فقط؛ لا DepositAmount/PaymentStatus/Refund — DEC-041.
13. Transaction Cancellation تحفظ actor/reason/time — DEC-048 / BR-019.
14. `Completed` terminal successful Transaction state؛ `Disputed` terminal unsuccessful state — DEC-071/073.
15. ProviderRating واحدة بحد أقصى لكل Completed Transaction، وهي مطلوبة في تدفق Beneficiary→Provider، وتستخدم OverallStars + structured criteria + optional comment — DEC-051/071/087.
16. BeneficiaryRating واحدة بحد أقصى لكل Completed Transaction، وهي اختيارية — DEC-063/071.
17. لا Ratings لـCancelled/Disputed Transactions — DEC-073.
18. VerificationCase/Artifacts تستخدم لـService Provider Identity Verification فقط؛ المقبول National ID أو Passport + document image + personal photo with document، مع ReviewNote عند إعادة التقديم/الرفض — DEC-085.
19. SafetyFlag يحتفظ بسبب/فئة الاشتباه بما يكفي للمراجعة البشرية؛ taxonomy/thresholds غير مثبتة — SRS/Trust & Safety model.
20. Complaint/Report review لا ينشئ Financial Settlement relation أو سلطة Refund/Compensation — DEC-073.
21. UserBlock يدعم Unblock ولا يؤدي إلى حذف/إخفاء Active Transaction — DEC-088.
22. القرارات الإدارية عالية الأثر تسجل Outcome + Reason وتبقى بشرية — DEC-089.
23. Notification channel policy = InApp default; SMS security/OTP/critical account; verified Email optional — DEC-090.

## 4. Public / Private Data Boundary — DEC-077

على مستوى التصميم، Guest access لا يبرر نسخ البيانات في جداول عامة منفصلة تلقائيًا. المطلوب هو فرض **read projection / authorization boundary** بحيث:

- يمكن إرجاع البيانات العامة المعتمدة من ProviderProfile/Category/Area/ShowcaseItem والمؤشرات العامة المرتبطة بالملف.
- لا يعاد `User.Phone` أو private direct-contact data في Public Provider Profile.
- لا تعاد Verification artifacts, Subscription internals, Conversations, Transactions, Invoices, Reports, Safety/Audit data للGuest.
- `OriginalMediaReference` لا يعاد كوسيط عام؛ `DisplayMediaReference` هو مرشح نسخة العرض العامة وفق DEC-064.
- protected mutation endpoints مثل Create Request أو Chat/Message يجب أن ترفض unauthenticated caller في Backend/API حتى لو تم تجاوز UI redirect.

التفصيل النهائي لـviews/endpoints/row-level authorization يبقى ضمن Architecture/API Design، وليس قرار schema مفاهيميًا جديدًا.

## 5. Physical Design Decisions Still Open

لا تثبت في هذه النسخة دون تحليل/قرار تصميم مناسب:

- أنواع الحقول الفيزيائية الدقيقة وأطوال النصوص.
- Shared `Media` table مقابل references خاصة بكل entity.
- `InvoiceVersion` مقابل `Invoice + InvoiceRevision` كتطبيق فيزيائي.
- طريقة حفظ تاريخ تعديل ProviderResponse.
- Authorization/Roles الفيزيائية للإدارة؛ عدم استخدام Role لتمييز Beneficiary/Provider لا يعني عدم وجود Authorization tables إدارية مستقبلًا.
- طريقة تنفيذ polymorphic `Report.TargetReference`.
- طريقة تخزين `SystemEvent` وربط Message/SystemEvent بمعاملة بعينها داخل Conversation المستمرة.
- exact implementation of public Provider Profile projection/API fields.
- Indexes, cascade rules, audit tables النهائية.
- تفاصيل Verification document types/retention.
- AI flags/storage بعد حسم السياسات المفتوحة.

## 6. Gate

هذه النسخة **مزامنة دلاليًا مع Core ERD/DEC-074..077** لكنها ليست Relation Schema نهائيًا. يلزم قبل اعتمادها:

- مراجعة كل PK/FK/Unique/Check constraint مقابل SRS/Business Rules.
- ربطها بـData Dictionary.
- مراجعة Normalization والأنواع الفيزيائية.
- حسم Message/SystemEvent↔Transaction physical mapping دون كسر Conversation المستمرة.
- مراجعة Public/Private projection وBackend authorization ضد DEC-077.
- اجتياز Design/Readiness Gate ثم Baseline المناسب.
## DEC-085/086/087/090 synchronization notes

- `VerificationCase`/`VerificationArtifact` rows are required for Service Provider identity verification only; Product Provider does not require Government ID rows in MVP.
- Subscription duration is 30 days; expiry does not terminate existing Transaction rows.
- ProviderRating must support overall score plus structured criterion values and optional comment; public reviewer projection exposes FirstName only.
- Notification storage is a candidate cross-cutting relation; SMS/email delivery details remain integration design.


---

# Appendix — Adopted 32-Table Working Physical Model (2026-09-20)

> يحتفظ القسم السابق بالـLogical Relation Schema والقيود التحليلية كاملة. الملحق التالي يثبت أسماء الجداول/الحقول وأنواع SQL Server من Working Physical Model المعتمد، دون اختراع nullability أو named constraints غير ظاهرة في المصدر.

## 2. Physical Tables and Fields

### ApplicationUser

| Field | SQL Server type | Key / relation |
|---|---|---|
| `Id` | `uniqueidentifier` | PK |
| `UserName` | `nvarchar(256)` | — |
| `NormalizedUserName` | `nvarchar(256)` | — |
| `Email` | `nvarchar(256)` | — |
| `NormalizedEmail` | `nvarchar(256)` | — |
| `EmailConfirmed` | `bit` | — |
| `PasswordHash` | `nvarchar(max)` | — |
| `SecurityStamp` | `nvarchar(max)` | — |
| `ConcurrencyStamp` | `nvarchar(max)` | — |
| `PhoneNumber` | `nvarchar(32)` | — |
| `PhoneNumberConfirmed` | `bit` | — |
| `TwoFactorEnabled` | `bit` | — |
| `LockoutEnd` | `datetimeoffset` | — |
| `LockoutEnabled` | `bit` | — |
| `AccessFailedCount` | `int` | — |
| `FirstName` | `nvarchar(100)` | — |
| `FatherName` | `nvarchar(100)` | — |
| `GrandfatherName` | `nvarchar(100)` | — |
| `FamilyName` | `nvarchar(100)` | — |
| `PhoneVerifiedAt` | `datetime2` | — |
| `EmailVerifiedAt` | `datetime2` | — |
| `AccountStatus` | `nvarchar(30)` | — |
| `LastPortal` | `nvarchar(20)` | — |
| `ProfilePhotoReference` | `nvarchar(500)` | — |
| `DeactivatedAt` | `datetime2` | — |
| `TermsAcceptedAt` | `datetime2` | — |
| `PrivacyAcceptedAt` | `datetime2` | — |
| `CreatedAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |

### ProviderProfile

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ProviderProfileId` | `uniqueidentifier` | PK |
| `UserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `ProviderType` | `nvarchar(10)` | — |
| `TradeName` | `nvarchar(150)` | — |
| `Description` | `nvarchar(1000)` | — |
| `ProfileImageReference` | `nvarchar(500)` | — |
| `IdentityVerificationStatus` | `nvarchar(30)` | — |
| `ProfileStatus` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |

### Category

| Field | SQL Server type | Key / relation |
|---|---|---|
| `CategoryId` | `uniqueidentifier` | PK |
| `Name` | `nvarchar(150)` | — |
| `CategoryType` | `nvarchar(10)` | — |
| `IsActive` | `bit` | — |

### ProviderActivity

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ProviderActivityId` | `uniqueidentifier` | PK |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `CategoryId` | `uniqueidentifier` | FK → Category.CategoryId |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |

### Area

| Field | SQL Server type | Key / relation |
|---|---|---|
| `AreaId` | `uniqueidentifier` | PK |
| `ParentAreaId` | `uniqueidentifier` | FK → Area.AreaId |
| `Name` | `nvarchar(150)` | — |
| `AreaType` | `nvarchar(20)` | — |
| `IsActive` | `bit` | — |

### ProviderServiceArea

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ProviderProfileId` | `uniqueidentifier` | PK; FK → ProviderProfile.ProviderProfileId |
| `AreaId` | `uniqueidentifier` | PK; FK → Area.AreaId |

### AreaAdjacency

| Field | SQL Server type | Key / relation |
|---|---|---|
| `SourceAreaId` | `uniqueidentifier` | PK; FK → Area.AreaId |
| `AdjacentAreaId` | `uniqueidentifier` | PK; FK → Area.AreaId |

### ShowcaseItem

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ShowcaseItemId` | `uniqueidentifier` | PK |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `ItemType` | `nvarchar(20)` | — |
| `Description` | `nvarchar(1000)` | — |
| `OriginalMediaReference` | `nvarchar(500)` | — |
| `DisplayMediaReference` | `nvarchar(500)` | — |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |

### Request

| Field | SQL Server type | Key / relation |
|---|---|---|
| `RequestId` | `uniqueidentifier` | PK |
| `BeneficiaryUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `CategoryId` | `uniqueidentifier` | FK → Category.CategoryId |
| `AreaId` | `uniqueidentifier` | FK → Area.AreaId |
| `RequestType` | `nvarchar(10)` | — |
| `Description` | `nvarchar(2000)` | — |
| `IndicativePrice` | `decimal(12,2)` | — |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |
| `PublishedAt` | `datetime2` | — |
| `LastBeneficiaryActivityAt` | `datetime2` | — |
| `ClosedAt` | `datetime2` | — |
| `ExpiredAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |

### RequestImage

| Field | SQL Server type | Key / relation |
|---|---|---|
| `RequestImageId` | `uniqueidentifier` | PK |
| `RequestId` | `uniqueidentifier` | FK → Request.RequestId |
| `ImageReference` | `nvarchar(500)` | — |
| `SortOrder` | `int` | — |
| `CreatedAt` | `datetime2` | — |

### ProviderResponse

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ResponseId` | `uniqueidentifier` | PK |
| `RequestId` | `uniqueidentifier` | FK → Request.RequestId |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `ProposedPrice` | `decimal(12,2)` | — |
| `RequiresDeposit` | `bit` | — |
| `Note` | `nvarchar(1000)` | — |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |
| `WithdrawnAt` | `datetime2` | — |

### Conversation

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ConversationId` | `uniqueidentifier` | PK |
| `BeneficiaryUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |

### Message

| Field | SQL Server type | Key / relation |
|---|---|---|
| `MessageId` | `uniqueidentifier` | PK |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `SenderUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `MessageType` | `nvarchar(30)` | — |
| `TextContent` | `nvarchar(max)` | — |
| `SentAt` | `datetime2` | — |

### MessageAttachment

| Field | SQL Server type | Key / relation |
|---|---|---|
| `MessageAttachmentId` | `uniqueidentifier` | PK |
| `MessageId` | `uniqueidentifier` | FK → Message.MessageId |
| `MediaReference` | `nvarchar(500)` | — |
| `CreatedAt` | `datetime2` | — |

### SystemEvent

| Field | SQL Server type | Key / relation |
|---|---|---|
| `SystemEventId` | `uniqueidentifier` | PK |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `TransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `EventType` | `nvarchar(50)` | — |
| `OccurredAt` | `datetime2` | — |

### TransactionStartRequest

| Field | SQL Server type | Key / relation |
|---|---|---|
| `TransactionStartRequestId` | `uniqueidentifier` | PK |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `RequestedByUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `Status` | `nvarchar(20)` | — |
| `RequestedAt` | `datetime2` | — |
| `ExpiresAt` | `datetime2` | — |
| `RespondedAt` | `datetime2` | — |

### Transaction

| Field | SQL Server type | Key / relation |
|---|---|---|
| `TransactionId` | `uniqueidentifier` | PK |
| `BeneficiaryUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `RequestId` | `uniqueidentifier` | FK → Request.RequestId |
| `SelectedResponseId` | `uniqueidentifier` | FK → ProviderResponse.ResponseId |
| `OriginType` | `nvarchar(20)` | — |
| `Status` | `nvarchar(30)` | — |
| `StartedAt` | `datetime2` | — |
| `CompletedAt` | `datetime2` | — |
| `DisputedAt` | `datetime2` | — |
| `CancellationActorRole` | `nvarchar(20)` | — |
| `CancellationReason` | `nvarchar(1000)` | — |
| `CancelledAt` | `datetime2` | — |

### InvoiceVersion

| Field | SQL Server type | Key / relation |
|---|---|---|
| `InvoiceVersionId` | `uniqueidentifier` | PK |
| `TransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `VersionNumber` | `int` | — |
| `Status` | `nvarchar(40)` | — |
| `TotalAmount` | `decimal(12,2)` | — |
| `RevisionNote` | `nvarchar(1000)` | — |
| `CreatedAt` | `datetime2` | — |
| `SubmittedAt` | `datetime2` | — |
| `ApprovedAt` | `datetime2` | — |

### InvoiceItem

| Field | SQL Server type | Key / relation |
|---|---|---|
| `InvoiceItemId` | `uniqueidentifier` | PK |
| `InvoiceVersionId` | `uniqueidentifier` | FK → InvoiceVersion.InvoiceVersionId |
| `Description` | `nvarchar(500)` | — |
| `Quantity` | `decimal(12,3)` | — |
| `UnitPrice` | `decimal(12,2)` | — |
| `LineTotal` | `decimal(12,2)` | — |

### InvoiceImage

| Field | SQL Server type | Key / relation |
|---|---|---|
| `InvoiceImageId` | `uniqueidentifier` | PK |
| `InvoiceVersionId` | `uniqueidentifier` | FK → InvoiceVersion.InvoiceVersionId |
| `MediaReference` | `nvarchar(500)` | — |
| `CreatedAt` | `datetime2` | — |

### ProviderRating

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ProviderRatingId` | `uniqueidentifier` | PK |
| `TransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `BeneficiaryUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `OverallStars` | `tinyint` | — |
| `WorkflowStatus` | `nvarchar(20)` | — |
| `Comment` | `nvarchar(2000)` | — |
| `CreatedAt` | `datetime2` | — |
| `DeferredAt` | `datetime2` | — |
| `SubmittedAt` | `datetime2` | — |

### ProviderRatingCriterion

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ProviderRatingCriterionId` | `uniqueidentifier` | PK |
| `ProviderRatingId` | `uniqueidentifier` | FK → ProviderRating.ProviderRatingId |
| `CriterionType` | `nvarchar(80)` | — |
| `TextualValue` | `nvarchar(50)` | — |

### BeneficiaryRating

| Field | SQL Server type | Key / relation |
|---|---|---|
| `BeneficiaryRatingId` | `uniqueidentifier` | PK |
| `TransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `BeneficiaryUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `RequestCommunicationScore` | `tinyint` | — |
| `AgreementCommitmentScore` | `tinyint` | — |
| `CooperationScore` | `tinyint` | — |
| `Comment` | `nvarchar(2000)` | — |
| `SubmittedAt` | `datetime2` | — |

### VerificationCase

| Field | SQL Server type | Key / relation |
|---|---|---|
| `VerificationCaseId` | `uniqueidentifier` | PK |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `Status` | `nvarchar(30)` | — |
| `ReviewNote` | `nvarchar(1000)` | — |
| `SubmittedAt` | `datetime2` | — |
| `ReviewedAt` | `datetime2` | — |
| `ReviewedByUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `CreatedAt` | `datetime2` | — |

### VerificationArtifact

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ArtifactId` | `uniqueidentifier` | PK |
| `VerificationCaseId` | `uniqueidentifier` | FK → VerificationCase.VerificationCaseId |
| `ArtifactType` | `nvarchar(40)` | — |
| `PrivateMediaReference` | `nvarchar(500)` | — |
| `ReviewStatus` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |

### Subscription

| Field | SQL Server type | Key / relation |
|---|---|---|
| `SubscriptionId` | `uniqueidentifier` | PK |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `Status` | `nvarchar(30)` | — |
| `StartDate` | `date` | — |
| `EndDate` | `date` | — |
| `ConfirmedByUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `ConfirmedAt` | `datetime2` | — |
| `CreatedAt` | `datetime2` | — |

### UserBlock

| Field | SQL Server type | Key / relation |
|---|---|---|
| `BlockId` | `uniqueidentifier` | PK |
| `BlockerUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `BlockedUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `Status` | `nvarchar(20)` | — |
| `BlockedAt` | `datetime2` | — |
| `UnblockedAt` | `datetime2` | — |

### Report

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ReportId` | `uniqueidentifier` | PK |
| `ReporterUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `TargetType` | `nvarchar(40)` | — |
| `TargetUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `TargetProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `TargetShowcaseItemId` | `uniqueidentifier` | FK → ShowcaseItem.ShowcaseItemId |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `TransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `Reason` | `nvarchar(200)` | — |
| `Description` | `nvarchar(2000)` | — |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |

### ReportAttachment

| Field | SQL Server type | Key / relation |
|---|---|---|
| `ReportAttachmentId` | `uniqueidentifier` | PK |
| `ReportId` | `uniqueidentifier` | FK → Report.ReportId |
| `MediaReference` | `nvarchar(500)` | — |
| `CreatedAt` | `datetime2` | — |

### SafetyFlag

| Field | SQL Server type | Key / relation |
|---|---|---|
| `FlagId` | `uniqueidentifier` | PK |
| `SourceType` | `nvarchar(20)` | — |
| `RiskLevel` | `nvarchar(20)` | — |
| `RiskScore` | `decimal(5,4)` | — |
| `ReasonCategory` | `nvarchar(100)` | — |
| `Status` | `nvarchar(30)` | — |
| `TargetUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `TargetProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `TargetRequestId` | `uniqueidentifier` | FK → Request.RequestId |
| `TargetMessageId` | `uniqueidentifier` | FK → Message.MessageId |
| `TargetShowcaseItemId` | `uniqueidentifier` | FK → ShowcaseItem.ShowcaseItemId |
| `TargetVerificationCaseId` | `uniqueidentifier` | FK → VerificationCase.VerificationCaseId |
| `TargetTransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `TargetReportId` | `uniqueidentifier` | FK → Report.ReportId |
| `CreatedAt` | `datetime2` | — |
| `ReviewedAt` | `datetime2` | — |

### AdminAuditRecord

| Field | SQL Server type | Key / relation |
|---|---|---|
| `AuditRecordId` | `uniqueidentifier` | PK |
| `ActorUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `TargetUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `RelatedReportId` | `uniqueidentifier` | FK → Report.ReportId |
| `RelatedSafetyFlagId` | `uniqueidentifier` | FK → SafetyFlag.FlagId |
| `RelatedVerificationCaseId` | `uniqueidentifier` | FK → VerificationCase.VerificationCaseId |
| `RelatedSubscriptionId` | `uniqueidentifier` | FK → Subscription.SubscriptionId |
| `SubjectType` | `nvarchar(50)` | — |
| `EventType` | `nvarchar(80)` | — |
| `DecisionOutcome` | `nvarchar(40)` | — |
| `Reason` | `nvarchar(2000)` | — |
| `RecordedAt` | `datetime2` | — |

### Notification

| Field | SQL Server type | Key / relation |
|---|---|---|
| `NotificationId` | `uniqueidentifier` | PK |
| `UserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `Type` | `nvarchar(50)` | — |
| `Channel` | `nvarchar(20)` | — |
| `Status` | `nvarchar(30)` | — |
| `Title` | `nvarchar(200)` | — |
| `Body` | `nvarchar(1000)` | — |
| `ReferenceType` | `nvarchar(50)` | — |
| `ReferenceId` | `uniqueidentifier` | — |
| `CreatedAt` | `datetime2` | — |
| `SentAt` | `datetime2` | — |
| `ReadAt` | `datetime2` | — |

## 3. Adopted Relationship Constraints

- `ProviderProfile.UserId` maps the optional Provider role to the same ApplicationUser account; one ProviderProfile per User remains the model constraint.
- `ProviderActivity` links ProviderProfile to Category; category type must match ProviderType.
- `ProviderServiceArea(ProviderProfileId, AreaId)` and `AreaAdjacency(SourceAreaId, AdjacentAreaId)` are composite-key candidates.
- `Conversation(BeneficiaryUserId, ProviderProfileId)` remains unique as the persistent pair conversation.
- `RequestId` and `SelectedResponseId` on Transaction support the Request route but are absent in the Direct Search route.
- `SystemEvent.ConversationId` plus optional transaction context records persistent-conversation boundaries.
- `ProviderRating.TransactionId` and `BeneficiaryRating.TransactionId` are unique-per-rating-type candidates.
- Report/Safety/Audit target columns implement the formerly polymorphic conceptual targets explicitly.
- Verification review and Subscription confirmation can reference the acting ApplicationUser.
- Notification belongs to ApplicationUser and retains generic reference metadata.

## 4. Stable Business Constraints

1. Guest browsing creates no persistence row.
2. ProviderProfile type is one of SERVICE/PRODUCT; Service Provider Government-ID Verification only.
3. A Provider may have multiple ProviderActivity rows inside the same ProviderType; eligibility requires at least one valid activity.
4. One active ProviderResponse per Provider/Request; edit/withdraw before selection.
5. Request route yields at most one Transaction.
6. Direct-start request expires after 12 hours and requires confirmation.
7. Request inactivity uses 24h/48h reminders and 72h expiry; republish creates a new Request identity.
8. Conversation is persistent across multiple Transactions.
9. RequiresDeposit is Boolean only; financial transfer is outside YADD.
10. Completed is the successful terminal Transaction state; Disputed is unsuccessful terminal.
11. Invoice history is versioned and never overwritten.
12. Ratings are only after Completed and are unavailable for Cancelled/Disputed.
13. Block and Report are independent; Unblock is supported.
14. Administrative high-impact decisions remain human-reviewed and auditable.
15. Notification policy remains In-App default, SMS for security/critical flows, verified Email optional.

## 5. Public / Private Boundary

Public Guest projection may expose approved ProviderProfile/Category/Area/Showcase display information and approved public reputation indicators. It must not expose direct private contact data, Identity security fields, original/private media, verification artifacts, subscription internals, conversations/messages, transactions/invoices, reports, safety flags or audit records.

## 6. Final Physical Items Still Open

The following are not asserted by the source diagram and remain final design/migration review items:

- nullability for every column;
- final named PK/FK/Unique/Check constraints;
- cascade/update/delete rules;
- final indexes and query-tuning choices;
- retention/deletion policy for verification, conversation, attachments, AI/safety and audit data;
- media storage provider and lifecycle;
- admin authorization tables/claims beyond the shown domain tables;
- migration scripts and EF Core configurations.

The 32-table set, field names, SQL Server types and current FK mapping are now the synchronized working physical baseline candidate.

