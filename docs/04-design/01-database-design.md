# Database Design — 32-Table Physical Relation Schema

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — 32-TABLE PHYSICAL MODEL SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **المصدر:** `docs/03-analysis/11-ERD.md` + SRS/Business Rules/Lifecycles + DEC-091 + team-approved physical database diagram dated 2026-09-20.
>
> **Implementation:** Microsoft SQL Server + Entity Framework Core + ASP.NET Core Identity. Conceptual `USER` maps physically to `ApplicationUser`.

## 1. Scope and Synchronization Result

The adopted working physical design contains exactly **32 tables**. It preserves all current YADD business boundaries: no Guest table, no Agreement entity, and no Payment/Wallet/Escrow/Refund/Settlement tables. Five support tables are now explicit: `RequestImage`, `MessageAttachment`, `SystemEvent`, `InvoiceImage`, and `ReportAttachment`.

Exact field names and SQL Server types below are synchronized from the approved physical diagram. Where the diagram does not explicitly state nullability, named constraints, cascade actions or indexes, this document does not invent them; those remain final migration-review items.

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
