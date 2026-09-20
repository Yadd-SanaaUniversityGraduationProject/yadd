# Data Dictionary

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — LOGICAL DICTIONARY + COMPLETE 32-TABLE PHYSICAL CATALOG — SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **المصدر:** `docs/04-design/01-database-design.md` المشتق من `docs/03-analysis/11-ERD.md` وSRS v0.9.10، مع DBMS/Data Access المعتمدين في DEC-091. Microsoft SQL Server أصبح DBMS التنفيذ، لكن أنواع SQL Server الدقيقة والقيود والـIdentity physical mapping غير المثبتة تبقى `TBD` بدل اختراعها.

## Current Dictionary Skeleton

| Entity | Field | Type | Required | Key/Constraint | Description | Source |
|---|---|---|---|---|---|---|
| User | UserId | TBD | Yes | PK | معرف حساب المستخدم الواحد بعد Create Account/Auth؛ لا يوجد Guest row لمجرد التصفح | DEC-008/077 / ERD |
| User | AccountStatus | TBD | Yes | lifecycle/design constraint TBD | حالة الحساب | SRS / ERD |
| User | FirstName | TBD | Yes | name validation | الاسم الأول؛ يمكن إظهاره فقط في public rating reviewer label وفق DEC-087 | DEC-078/087 |
| User | FatherName | TBD | Yes | name validation | اسم الأب | DEC-078 |
| User | GrandfatherName | TBD | Yes | name validation | اسم الجد | DEC-078 |
| User | FamilyName | TBD | Yes | name validation | اللقب/اسم العائلة | DEC-078 |
| User | Phone | TBD | Yes | unique/account constraint | رقم الهاتف الأساسي؛ لا يعتمد قبل OTP؛ ليس Public Provider Profile field | DEC-078/077 |
| User | PhoneVerifiedAt | TBD | Yes after registration | verification timestamp | إثبات نجاح OTP للهاتف | DEC-078 |
| User | Email | TBD | No | unique when present | بريد اختياري | DEC-078 |
| User | EmailVerifiedAt | TBD | No | verification timestamp | يلزم قبل استخدام البريد في Login/Recovery | DEC-078 |
| User | LastPortal | TBD | No | BENEFICIARY/PROVIDER | آخر Portal مستخدم | DEC-078 |
| User | ProfilePhotoReference | TBD | No | private/account media reference | صورة الحساب الاختيارية | DEC-079 |
| User | DeactivatedAt | TBD | No | lifecycle field | يدعم self-deactivation/reactivation | DEC-079 |
| ProviderProfile | ProviderProfileId | TBD | Yes | PK | معرف ملف المقدم | DEC-010/074 |
| ProviderProfile | UserId | TBD | Yes | FK + Unique candidate | يربط Provider Profile بحساب User واحد | DEC-008..011/074 |
| ProviderProfile | ProviderType | TBD | Yes when profile type selected | allowed values `SERVICE`/`PRODUCT` | نوع مقدم واحد فقط في MVP | DEC-074 |
| ProviderProfile | TradeName | TBD | No | allowed only for PRODUCT | اسم عرض تجاري اختياري لمقدم المنتج | DEC-080 |
| ProviderProfile | Description | TBD | Yes before eligibility | content validation | نبذة المقدم | DEC-080 |
| ProviderProfile | IdentityVerificationStatus | TBD | Conditional | required for SERVICE only | حالة تحقق هوية مقدم الخدمة؛ Product Provider لا يحتاج Government ID | DEC-085 |
| ProviderProfile | ProfileStatus | TBD | Yes | lifecycle/design constraint TBD | حالة ملف المقدم | ERD |
| Category | CategoryId | TBD | Yes | PK | معرف التصنيف | ERD / DEC-076 |
| Category | Name | TBD | Yes | uniqueness/localization TBD | اسم التصنيف | ERD |
| Category | CategoryType | TBD | Yes | type consistency constraint | يحدد توافق التصنيف مع ProviderType/RequestType | DEC-076 |
| ProviderActivity | ProviderActivityId | TBD | Yes | PK | ارتباط Provider Profile بتصنيف داخل النوع | DEC-076 |
| ProviderActivity | ProviderProfileId | TBD | Yes | FK | Provider Profile صاحب النشاط | DEC-076 |
| ProviderActivity | CategoryId | TBD | Yes | FK + type-consistency rule | Category يجب أن يطابق ProviderType | DEC-076 |
| ProviderActivity | Status | TBD | Yes | lifecycle/design constraint TBD | حالة النشاط/الارتباط | ERD |
| Area | AreaId | TBD | Yes | PK | معرف المنطقة | DEC-031..033 |
| Area | ParentAreaId | TBD | No | self FK candidate | علاقة District/Neighborhood المفاهيمية | DEC-031..033 |
| Area | Name | TBD | Yes | reference-data uniqueness TBD | اسم المنطقة | ERD |
| Area | AreaType | TBD | Yes | allowed values TBD | District/Neighborhood concept | ERD |
| ProviderServiceArea | ProviderProfileId | TBD | Yes | FK + composite key candidate | Provider الذي يخدم المنطقة | DEC-032 |
| ProviderServiceArea | AreaId | TBD | Yes | FK + composite key candidate | منطقة خدمة عامة | DEC-032 |
| AreaAdjacency | SourceAreaId | TBD | Yes | FK + composite key candidate | الحي/المنطقة المصدر | DEC-033 |
| AreaAdjacency | AdjacentAreaId | TBD | Yes | FK + composite key candidate | الحي/المنطقة المجاورة | DEC-033 |
| ShowcaseItem | ShowcaseItemId | TBD | Yes | PK | عنصر Portfolio/Catalog | DEC-064 |
| ShowcaseItem | ProviderProfileId | TBD | Yes | FK | Provider صاحب العنصر | DEC-064 |
| ShowcaseItem | ItemType | TBD | Yes | type consistency TBD | نوع عنصر العرض حسب Provider type | DEC-064/074 |
| ShowcaseItem | Description | TBD | No | content policy applies | وصف اختياري | DEC-064 |
| ShowcaseItem | OriginalMediaReference | TBD | Yes | private/non-public | مرجع الأصل غير العام؛ لا يعاد للGuest | DEC-064/077 |
| ShowcaseItem | DisplayMediaReference | TBD | Yes | watermarked display | مرجع نسخة العرض التي يمكن أن تظهر في Public Provider Profile | DEC-064/077 |
| ShowcaseItem | Status | TBD | Yes | lifecycle/moderation constraint TBD | حالة عنصر العرض | ERD |
| Request | RequestId | TBD | Yes | PK | معرف طلب Service/Product؛ Guest لا ينشئ Request قبل Authentication | DEC-012/077 |
| Request | BeneficiaryUserId | TBD | Yes | FK | صاحب الطلب authenticated | DEC-012/077 |
| Request | CategoryId | TBD | Yes | FK | تصنيف الطلب | DEC-012/076 |
| Request | AreaId | TBD | Yes | FK | المنطقة العامة للطلب | DEC-031 |
| Request | RequestType | TBD | Yes | type consistency | Service/Product ويجب أن يتوافق مع Category/Provider type | DEC-074/076 |
| Request | Description | TBD | Yes | content/length TBD | وصف الطلب | SRS |
| Request | IndicativePrice | TBD | No | non-negative constraint TBD | سعر استرشادي اختياري | DEC-013 |
| Request | Status | TBD | Yes | lifecycle constraint | Draft/Open/Matched/ClosedByBeneficiary/Expired وفق lifecycle الحالي | DEC-047..049 |
| ProviderResponse | ResponseId | TBD | Yes | PK | معرف استجابة المقدم للطلب | DEC-013/014 |
| ProviderResponse | RequestId | TBD | Yes | FK | الطلب المرتبطة به الاستجابة | DEC-013/014 |
| ProviderResponse | ProviderProfileId | TBD | Yes | FK | المقدم صاحب الاستجابة | DEC-013/014 |
| ProviderResponse | ProposedPrice | TBD | No | non-negative constraint TBD | سعر مقترح اختياري | DEC-013 |
| ProviderResponse | RequiresDeposit | TBD | Yes | Boolean | هل يتطلب المقدم عربونًا خارجيًا؛ لا قيمة/حالة دفع داخل YADD | DEC-041 |
| ProviderResponse | Note | TBD | No | content constraint TBD | ملاحظة اختيارية من Provider | ERD |
| ProviderResponse | Status | TBD | Yes | lifecycle constraint | Submitted/Selected/NotSelected/Withdrawn وحالة التعديل حسب النموذج الحالي | DEC-047/070 |
| Conversation | ConversationId | TBD | Yes | PK | محادثة خاصة مستمرة؛ Guest لا ينشئها قبل Authentication | DEC-046/075/077 |
| Conversation | BeneficiaryUserId | TBD | Yes | FK + pair uniqueness candidate | طرف Beneficiary | DEC-075 |
| Conversation | ProviderProfileId | TBD | Yes | FK + pair uniqueness candidate | طرف Provider | DEC-075 |
| Conversation | Status | TBD | Yes | design/lifecycle TBD | حالة المحادثة المستمرة | ERD |
| Message | MessageId | TBD | Yes | PK | رسالة مرتبطة بمحادثة | DEC-023/046 |
| Message | ConversationId | TBD | Yes | FK | Conversation الحاوية | DEC-075 |
| Message | SenderUserId | TBD | Yes | FK | المرسل authenticated | DEC-046/077 |
| Message | MessageType | TBD | Yes | allowed values TBD | نوع الرسالة | ERD |
| Message | SentAt | TBD | Yes | timestamp | وقت الإرسال | ERD |
| TransactionStartRequest | TransactionStartRequestId | TBD | Yes | PK | معرف طلب بدء المعاملة المباشر | DEC-082 |
| TransactionStartRequest | ConversationId | TBD | Yes | FK | المحادثة المستمرة بين الطرفين | DEC-075/082 |
| TransactionStartRequest | RequestedByUserId | TBD | Yes | FK | الطرف الذي طلب بدء المعاملة | DEC-082 |
| TransactionStartRequest | Status | TBD | Yes | Pending/Confirmed/Rejected/Expired | حالة طلب البدء | DEC-082 |
| TransactionStartRequest | RequestedAt | TBD | Yes | timestamp | وقت الطلب | DEC-082 |
| TransactionStartRequest | ExpiresAt | TBD | Yes | RequestedAt + 12h | انتهاء صلاحية الطلب | DEC-082 |
| TransactionStartRequest | RespondedAt | TBD | No | timestamp | وقت التأكيد/الرفض إن حدث | DEC-082 |
| Transaction | TransactionId | TBD | Yes | PK | معرف المعاملة الرسمية | DEC-047/066/069 |
| Transaction | BeneficiaryUserId | TBD | Yes | FK | Beneficiary في المعاملة | ERD |
| Transaction | ProviderProfileId | TBD | Yes | FK | Provider في المعاملة | ERD |
| Transaction | ConversationId | TBD | Yes | FK | Conversation المستمرة التي تجمع المعاملة | DEC-075 |
| Transaction | RequestId | TBD | No | FK | مصدر Request إن وجدت؛ Direct Search قد لا يملك Request | DEC-066/069 |
| Transaction | SelectedResponseId | TBD | No | FK | Provider Response المختارة في Request Route | DEC-047/066 |
| Transaction | OriginType | TBD | Yes | allowed values TBD | Request route أو Direct Search concept | DEC-066 |
| Transaction | Status | TBD | Yes | lifecycle constraint | Active/AwaitingInvoice/RevisionRequested/Completed/Cancelled/Disputed حسب lifecycle | DEC-048/050/071/073 |
| Transaction | CancellationActorRole | TBD | No | required when Cancelled | الطرف الذي ألغى | DEC-048 / BR-019 |
| Transaction | CancellationReason | TBD | No | required when Cancelled | سبب الإلغاء بعد بدء المعاملة | DEC-048 |
| Transaction | CancelledAt | TBD | No | required when Cancelled | توقيت الإلغاء | DEC-048 / BR-019 |
| InvoiceVersion | InvoiceVersionId | TBD | Yes | PK | نسخة فاتورة مرتبطة بالمعاملة | DEC-015/025/050 |
| InvoiceVersion | TransactionId | TBD | Yes | FK | المعاملة صاحبة الفاتورة | DEC-015 |
| InvoiceVersion | VersionNumber | TBD | Yes | uniqueness per transaction TBD | ترتيب النسخة لحفظ تاريخ التعديل | DEC-025 |
| InvoiceVersion | Status | TBD | Yes | lifecycle constraint | Draft/PendingCustomerApproval/Overdue/Approved/RevisionRequested وفق التصميم النهائي | DEC-025/050 |
| InvoiceVersion | TotalAmount | TBD | Yes | calculated/check constraint TBD | إجمالي الفاتورة؛ لا يثبت دفعًا | DEC-015/018 |
| InvoiceVersion | RevisionNote | TBD | No | content constraint TBD | ملاحظة المراجعة/التعديل | DEC-025 |
| InvoiceItem | InvoiceItemId | TBD | Yes | PK | بند فاتورة | DEC-015 |
| InvoiceItem | InvoiceVersionId | TBD | Yes | FK | نسخة الفاتورة الحاوية | ERD |
| InvoiceItem | Description | TBD | Yes | — | وصف البند | DEC-015 |
| InvoiceItem | Quantity | TBD | Yes | positive constraint TBD | كمية البند | ERD derived |
| InvoiceItem | UnitPrice | TBD | Yes | non-negative constraint TBD | سعر الوحدة | DEC-015 |
| InvoiceItem | LineTotal | TBD | Yes | calculation/check TBD | إجمالي البند | ERD |
| ProviderRating | ProviderRatingId | TBD | Yes | PK | تقييم Beneficiary للمقدم | DEC-051 |
| ProviderRating | TransactionId | TBD | Yes | FK + Unique candidate | تقييم واحد بحد أقصى لكل Completed Transaction | DEC-051/071 |
| ProviderRating | OverallStars | TBD | Yes | 1..5 | المؤشر الإجمالي للتقييم | DEC-051/087 |
| ProviderRating | WorkflowStatus | TBD | Yes/derived | Required/Deferred/Submitted candidate | يدعم Later/Reminder/required-before-next-transaction | DEC-087 |
| ProviderRating | Comment | TBD | No | moderation policy applies | تعليق اختياري | DEC-051/052/087 |
| ProviderRatingCriterion | ProviderRatingCriterionId | TBD | Yes | PK | معرف بند التقييم المنظم | DEC-087 |
| ProviderRatingCriterion | ProviderRatingId | TBD | Yes | FK | التقييم الأب | DEC-087 |
| ProviderRatingCriterion | CriterionType | TBD | Yes | provider-type-specific approved criteria | نوع المؤشر النصي | DEC-087 |
| ProviderRatingCriterion | TextualValue | TBD | Yes | Excellent/Good/Acceptable/NeedsImprovement candidate labels | القيمة النصية السريعة | DEC-087 |
| BeneficiaryRating | BeneficiaryRatingId | TBD | Yes | PK | تقييم Provider للمستفيد | DEC-063 |
| BeneficiaryRating | TransactionId | TBD | Yes | FK + Unique candidate | تقييم اختياري واحد بحد أقصى لكل Completed Transaction | DEC-063/071 |
| BeneficiaryRating | RequestCommunicationScore | TBD | Yes when rating submitted | 1..5 | وضوح الطلب والتواصل | DEC-063 |
| BeneficiaryRating | AgreementCommitmentScore | TBD | Yes when rating submitted | 1..5 | الالتزام بالاتفاق | DEC-063 |
| BeneficiaryRating | CooperationScore | TBD | Yes when rating submitted | 1..5 | حسن التعامل والتعاون | DEC-063 |
| BeneficiaryRating | Comment | TBD | No | moderation policy applies | تعليق اختياري؛ سجل Beneficiary ليس public Guest data | DEC-063/077 |
| VerificationCase | VerificationCaseId | TBD | Yes | PK | حالة Identity Verification لمقدم خدمة؛ ليست Public Guest data | DEC-035/036/085 |
| VerificationCase | ProviderProfileId | TBD | Yes | FK; SERVICE provider only | Service Provider Profile موضوع Identity Verification | DEC-085 |
| VerificationCase | Status | TBD | Yes | lifecycle constraint | حالة التحقق | Verification model |
| VerificationCase | ReviewNote | TBD | No/conditional | required on ResubmissionRequired/Rejected conceptually | ملاحظة/سبب المراجع | Verification model |
| VerificationArtifact | ArtifactType | TBD | Yes | NationalID/Passport/PersonalPhotoWithDocument at analysis level | نوع مستند/أثر تحقق خاص بـService Provider | DEC-036/085 |
| VerificationArtifact | PrivateMediaReference | TBD | Yes | private/non-public | مرجع وثيقة/وسيط تحقق غير عام | DEC-036/077 |
| Subscription | Status | TBD | Yes | lifecycle/design constraint | حالة الاشتراك؛ ليست Public Guest data | DEC-042/043/077 |
| Subscription | StartDate | TBD | Yes | activation date | بداية فترة الاشتراك | DEC-042/086 |
| Subscription | EndDate | TBD | Yes | StartDate + 30 days | نهاية فترة الاشتراك | DEC-086 |
| UserBlock | BlockId | TBD | Yes | PK | سجل Block لمستخدم authenticated | DEC-053/077 |
| UserBlock | Status | TBD | Yes | Active/Unblocked candidate | حالة الحظر | DEC-088 |
| UserBlock | BlockedAt | TBD | Yes | timestamp | وقت الحظر | DEC-088 |
| UserBlock | UnblockedAt | TBD | No | timestamp | وقت فك الحظر | DEC-088 |
| Report | ReportId | TBD | Yes | PK | بلاغ/Complaint context للمراجعة الإدارية؛ Guest لا ينشئه قبل Authentication | DEC-053/073/077 |
| Report | TargetType | TBD | Yes | allowed targets TBD | نوع الهدف المبلغ عنه | DEC-053/064/073 |
| Report | TargetReference | TBD | Yes | physical implementation TBD | مرجع الهدف؛ polymorphic implementation غير محسوم | ERD / DEC-053/073 |
| Report | Reason | TBD | Yes | policy categories/detail TBD | سبب البلاغ | DEC-053/089 |
| Report | Description | TBD | Yes for transaction complaint; policy-dependent for generic report | content validation | وصف/تفاصيل البلاغ أو الشكوى | DEC-084/089 |
| SafetyFlag | ReasonCategory | TBD | Yes when flag exists | taxonomy TBD | سبب/فئة الاشتباه اللازمة للمراجعة البشرية؛ ليست Public Guest data | SRS / Trust & Safety model |
| AdminAuditRecord | EventType | TBD | Yes | taxonomy TBD | نوع حدث التدقيق الإداري الحساس؛ غير عام | Trust & Safety / ERD |
| AdminAuditRecord | DecisionOutcome | TBD | Conditional | NoViolation/Warning/ContentRemoval/TemporaryRestriction/AccountSuspension/PermanentBan | نتيجة القرار الإداري | DEC-089 |
| AdminAuditRecord | Reason | TBD | Conditional | required with administrative decision | سبب القرار | DEC-089 |

## Public / Private Visibility Boundary — DEC-077

هذه ليست أعمدة DB جديدة بالضرورة، بل قاعدة على API/query/interface projections:

- Guest يمكنه قراءة Public Provider Profile data وCategory/Area/service-area العامة و`ShowcaseItem.DisplayMediaReference` والمعلومات/المؤشرات المعتمدة للعرض العام.
- لا يعاد `User.Phone`, `ShowcaseItem.OriginalMediaReference`, Verification data, Subscription internals, Conversation/Message, Transaction/Invoice, Report/Safety/Audit data للGuest.
- إنشاء Request/Message/Transaction/Rating/Block/Report يتطلب authenticated User context.
- لا يوجد Entity/Field باسم `GuestId` مطلوب لمجرد public browsing.

## Removed Stale Dictionary Concepts

لا تستخدم في التصميم الحالي بوصفها Entities قياسية:

- `Guest` كجدول لمجرد anonymous browsing → Actor/authorization context فقط وفق DEC-077.
- `ServiceRequest` → `Request`.
- `Offer` → `ProviderResponse`.
- `Agreement` → لا Entity مستقلة في MVP.
- generic `Review` → `ProviderRating` + `BeneficiaryRating`.
- `Role/UserRole` لتمييز Beneficiary/Provider → User واحد + optional ProviderProfile.
- `ProviderActivity.ActivityType` كبديل عن نوع ProviderProfile → النوع على ProviderProfile، والتصنيف عبر Category حسب DEC-074/076.
- `Conversation.RequestId/TransactionId` كربط أحادي → Conversation مستمرة، وTransaction تشير إلى Conversation؛ physical message-event mapping يبقى مفتوحًا وفق DEC-075.

## Open Design Details

`TBD` لا يعني غياب التحليل، بل أن القرار الفيزيائي لم يعتمد بعد. من أهم ما يبقى للمراجعة:

- SQL Server data types and lengths.
- exact Check/Unique/Foreign-key names and cascade behavior.
- media storage model.
- invoice revision physical model.
- ProviderResponse edit-history model.
- physical Message/SystemEvent↔Transaction mapping within persistent Conversation.
- public Provider Profile projection/API response design.
- admin authorization tables.
- verification-data retention and physical artifact encoding.
- AI flags/audit storage after policy decisions.
- polymorphic Report target implementation.

لا يوجد في Data Dictionary الحالي Payment/Wallet/Escrow/Refund/Settlement أو DepositAmount لأن هذه ليست جزءًا من النموذج الحالي.
| Notification | NotificationId | TBD | Yes | PK | معرف الإشعار | DEC-090 |
| Notification | UserId | TBD | Yes | FK | المستلم | DEC-090 |
| Notification | Channel | TBD | Yes | InApp/SMS/Email | InApp افتراضي، SMS للأمان/OTP، Email موثق اختياري | DEC-090 |
| Notification | Status | TBD | Yes | delivery/read lifecycle | حالة الإشعار | DEC-090 |


---

# Appendix — Complete 32-Table Physical Field Catalog (2026-09-20)

> القاموس التحليلي أعلاه محفوظ لتتبع معنى الحقول ومصادر القرارات. هذا الملحق يضيف أسماء الحقول وأنواع SQL Server الحالية من Working Physical Model. عند التعارض في **اسم/نوع الحقل الفيزيائي** يستخدم هذا الملحق لChapter Four؛ وعند تفسير **المعنى/Business Rule** تبقى المصادر التحليلية الحاكمة أعلاه وSRS/Business Rules هي المرجع.

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

