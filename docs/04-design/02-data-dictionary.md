# Data Dictionary — 32-Table Working Physical Model

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — COMPLETE 32-TABLE FIELD CATALOG SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **المصدر:** `docs/04-design/01-database-design.md` + `docs/03-analysis/11-ERD.md` + approved 2026-09-20 physical database diagram.
>
> هذه النسخة تستبدل Skeleton القديم الذي كان يستخدم `TBD` لأنواع SQL. الأنواع والأطوال أصبحت موثقة من Working Physical Model. **Required/Nullable النهائي** لا يُفترض من الرسم إذا لم يكن مصرحًا به.

## 1. Physical Field Catalog

### ApplicationUser

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `CategoryId` | `uniqueidentifier` | PK |
| `Name` | `nvarchar(150)` | — |
| `CategoryType` | `nvarchar(10)` | — |
| `IsActive` | `bit` | — |

### ProviderActivity

| Field | Type | Key / relation |
|---|---|---|
| `ProviderActivityId` | `uniqueidentifier` | PK |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `CategoryId` | `uniqueidentifier` | FK → Category.CategoryId |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |

### Area

| Field | Type | Key / relation |
|---|---|---|
| `AreaId` | `uniqueidentifier` | PK |
| `ParentAreaId` | `uniqueidentifier` | FK → Area.AreaId |
| `Name` | `nvarchar(150)` | — |
| `AreaType` | `nvarchar(20)` | — |
| `IsActive` | `bit` | — |

### ProviderServiceArea

| Field | Type | Key / relation |
|---|---|---|
| `ProviderProfileId` | `uniqueidentifier` | PK; FK → ProviderProfile.ProviderProfileId |
| `AreaId` | `uniqueidentifier` | PK; FK → Area.AreaId |

### AreaAdjacency

| Field | Type | Key / relation |
|---|---|---|
| `SourceAreaId` | `uniqueidentifier` | PK; FK → Area.AreaId |
| `AdjacentAreaId` | `uniqueidentifier` | PK; FK → Area.AreaId |

### ShowcaseItem

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `RequestImageId` | `uniqueidentifier` | PK |
| `RequestId` | `uniqueidentifier` | FK → Request.RequestId |
| `ImageReference` | `nvarchar(500)` | — |
| `SortOrder` | `int` | — |
| `CreatedAt` | `datetime2` | — |

### ProviderResponse

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `ConversationId` | `uniqueidentifier` | PK |
| `BeneficiaryUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `ProviderProfileId` | `uniqueidentifier` | FK → ProviderProfile.ProviderProfileId |
| `Status` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |
| `UpdatedAt` | `datetime2` | — |

### Message

| Field | Type | Key / relation |
|---|---|---|
| `MessageId` | `uniqueidentifier` | PK |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `SenderUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `MessageType` | `nvarchar(30)` | — |
| `TextContent` | `nvarchar(max)` | — |
| `SentAt` | `datetime2` | — |

### MessageAttachment

| Field | Type | Key / relation |
|---|---|---|
| `MessageAttachmentId` | `uniqueidentifier` | PK |
| `MessageId` | `uniqueidentifier` | FK → Message.MessageId |
| `MediaReference` | `nvarchar(500)` | — |
| `CreatedAt` | `datetime2` | — |

### SystemEvent

| Field | Type | Key / relation |
|---|---|---|
| `SystemEventId` | `uniqueidentifier` | PK |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `TransactionId` | `uniqueidentifier` | FK → Transaction.TransactionId |
| `EventType` | `nvarchar(50)` | — |
| `OccurredAt` | `datetime2` | — |

### TransactionStartRequest

| Field | Type | Key / relation |
|---|---|---|
| `TransactionStartRequestId` | `uniqueidentifier` | PK |
| `ConversationId` | `uniqueidentifier` | FK → Conversation.ConversationId |
| `RequestedByUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `Status` | `nvarchar(20)` | — |
| `RequestedAt` | `datetime2` | — |
| `ExpiresAt` | `datetime2` | — |
| `RespondedAt` | `datetime2` | — |

### Transaction

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `InvoiceItemId` | `uniqueidentifier` | PK |
| `InvoiceVersionId` | `uniqueidentifier` | FK → InvoiceVersion.InvoiceVersionId |
| `Description` | `nvarchar(500)` | — |
| `Quantity` | `decimal(12,3)` | — |
| `UnitPrice` | `decimal(12,2)` | — |
| `LineTotal` | `decimal(12,2)` | — |

### InvoiceImage

| Field | Type | Key / relation |
|---|---|---|
| `InvoiceImageId` | `uniqueidentifier` | PK |
| `InvoiceVersionId` | `uniqueidentifier` | FK → InvoiceVersion.InvoiceVersionId |
| `MediaReference` | `nvarchar(500)` | — |
| `CreatedAt` | `datetime2` | — |

### ProviderRating

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `ProviderRatingCriterionId` | `uniqueidentifier` | PK |
| `ProviderRatingId` | `uniqueidentifier` | FK → ProviderRating.ProviderRatingId |
| `CriterionType` | `nvarchar(80)` | — |
| `TextualValue` | `nvarchar(50)` | — |

### BeneficiaryRating

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `ArtifactId` | `uniqueidentifier` | PK |
| `VerificationCaseId` | `uniqueidentifier` | FK → VerificationCase.VerificationCaseId |
| `ArtifactType` | `nvarchar(40)` | — |
| `PrivateMediaReference` | `nvarchar(500)` | — |
| `ReviewStatus` | `nvarchar(30)` | — |
| `CreatedAt` | `datetime2` | — |

### Subscription

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `BlockId` | `uniqueidentifier` | PK |
| `BlockerUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `BlockedUserId` | `uniqueidentifier` | FK → ApplicationUser.Id |
| `Status` | `nvarchar(20)` | — |
| `BlockedAt` | `datetime2` | — |
| `UnblockedAt` | `datetime2` | — |

### Report

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
|---|---|---|
| `ReportAttachmentId` | `uniqueidentifier` | PK |
| `ReportId` | `uniqueidentifier` | FK → Report.ReportId |
| `MediaReference` | `nvarchar(500)` | — |
| `CreatedAt` | `datetime2` | — |

### SafetyFlag

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
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

| Field | Type | Key / relation |
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

## 2. Semantic Notes

- `ApplicationUser` is the physical ASP.NET Core Identity-backed mapping of the conceptual USER.
- Beneficiary and Provider are roles/portals over the same account; Provider adds an optional `ProviderProfile`.
- `RequestImage`, `MessageAttachment`, `InvoiceImage`, and `ReportAttachment` model repeatable media references.
- `SystemEvent` persists conversation/transaction boundary events.
- `Report`, `SafetyFlag`, and `AdminAuditRecord` now use explicit target/reference columns in the working physical model.
- `Guest` has no persistence table.
- No Payment, Wallet, Escrow, Refund, Settlement, DepositAmount or payment-status table is part of the adopted model.

## 3. Public / Private Visibility

Public access is a projection/authorization concern, not a separate public-table model. Public responses may expose approved ProviderProfile/Category/Area/Showcase display data and approved reputation indicators. Private/security/verification/chat/transaction/invoice/report/safety/audit fields remain protected.

## 4. Finalization Notes

This dictionary now matches the 32-table working physical design for names and SQL Server types. Final nullability, default values, named constraints, indexes, cascade rules, retention and migration details remain subject to the final Chapter Four review.
