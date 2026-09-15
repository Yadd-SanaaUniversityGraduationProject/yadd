# Database Design — Relation Schema

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — RE-SYNCHRONIZED THROUGH DEC-077 — NOT BASELINED`
>
> **آخر مزامنة:** 2026-09-15
>
> **المصدر:** `docs/03-analysis/11-ERD.md` + SRS v0.9.9 + Business Rules الحالية. هذه الوثيقة تصميم مشتق ولا تنشئ Requirement أو Team Decision جديدًا.

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
  FullName,
  Phone
)

ProviderProfile(
  ProviderProfileId PK,
  UserId FK UNIQUE -> User.UserId,
  ProviderType,
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
  BlockedUserId FK -> User.UserId
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
  RecordedAt
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
9. Direct Search Transaction قد تكون بلا Request/ProviderResponse، ولا تنشأ إلا بعد Mutual Start Confirmation — DEC-069.
10. بين نفس Beneficiary وProvider توجد Conversation واحدة مستمرة؛ Candidate Key المفاهيمي `(BeneficiaryUserId, ProviderProfileId)` — DEC-075.
11. Conversation يمكن أن تضم صفرًا أو عدة Transactions؛ Transaction تحمل ConversationId، ولا يوضع RequestId/TransactionId منفردان داخل Conversation بما يكسر الاستمرارية — DEC-075.
12. `RequiresDeposit` Boolean فقط؛ لا DepositAmount/PaymentStatus/Refund — DEC-041.
13. Transaction Cancellation تحفظ actor/reason/time — DEC-048 / BR-019.
14. `Completed` terminal successful Transaction state؛ `Disputed` terminal unsuccessful state — DEC-071/073.
15. ProviderRating واحدة بحد أقصى لكل Completed Transaction، وهي مطلوبة في تدفق Beneficiary→Provider — DEC-051/071.
16. BeneficiaryRating واحدة بحد أقصى لكل Completed Transaction، وهي اختيارية — DEC-063/071.
17. لا Ratings لـCancelled/Disputed Transactions — DEC-073.
18. Verification resubmission/rejection review يدعم ReviewNote/سبب للمراجع وفق نموذج التحقق الحالي.
19. SafetyFlag يحتفظ بسبب/فئة الاشتباه بما يكفي للمراجعة البشرية؛ taxonomy/thresholds غير مثبتة — SRS/Trust & Safety model.
20. Complaint/Report review لا ينشئ Financial Settlement relation أو سلطة Refund/Compensation — DEC-073.

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