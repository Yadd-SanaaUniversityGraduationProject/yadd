# Data Dictionary

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — CURRENT MODEL SKELETON — SYNCHRONIZED THROUGH DEC-077 — 2026-09-15`
>
> **المصدر:** `docs/04-design/01-database-design.md` المشتق من `docs/03-analysis/11-ERD.md` وSRS v0.9.9. الأنواع الفيزيائية والقيود غير المثبتة تبقى `TBD` بدل اختراعها.

## Current Dictionary Skeleton

| Entity | Field | Type | Required | Key/Constraint | Description | Source |
|---|---|---|---|---|---|---|
| User | UserId | TBD | Yes | PK | معرف حساب المستخدم الواحد بعد Create Account/Auth؛ لا يوجد Guest row لمجرد التصفح | DEC-008/077 / ERD |
| User | AccountStatus | TBD | Yes | lifecycle/design constraint TBD | حالة الحساب | SRS / ERD |
| User | FullName | TBD | Yes/TBD by final account design | validation TBD | الاسم المرتبط بالحساب؛ public exposure تحددها واجهة Public Profile ولا يفترض عرض كل بيانات User | ERD / DEC-077 |
| User | Phone | TBD | Yes/TBD by final account design | verification/account constraint TBD | رقم الحساب/التحقق؛ **ليس Public Provider Profile field ولا يعرض للGuest** | ERD / DEC-046/077 |
| ProviderProfile | ProviderProfileId | TBD | Yes | PK | معرف ملف المقدم | DEC-010/074 |
| ProviderProfile | UserId | TBD | Yes | FK + Unique candidate | يربط Provider Profile بحساب User واحد | DEC-008..011/074 |
| ProviderProfile | ProviderType | TBD | Yes when profile type selected | allowed values `SERVICE`/`PRODUCT` | نوع مقدم واحد فقط في MVP | DEC-074 |
| ProviderProfile | VerificationStatus | TBD | Yes | lifecycle constraint | حالة تحقق المقدم؛ ليست public verification evidence | DEC-034..036 |
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
| InvoiceVersion | Status | TBD | Yes | lifecycle constraint | Draft/PendingCustomerApproval/Approved/RevisionRequested وفق التصميم النهائي | DEC-025/050 |
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
| ProviderRating | Stars | TBD | Yes | 1..5 | تقييم المقدم | DEC-051 |
| ProviderRating | Comment | TBD | No | moderation policy applies | تعليق اختياري | DEC-051/052 |
| BeneficiaryRating | BeneficiaryRatingId | TBD | Yes | PK | تقييم Provider للمستفيد | DEC-063 |
| BeneficiaryRating | TransactionId | TBD | Yes | FK + Unique candidate | تقييم اختياري واحد بحد أقصى لكل Completed Transaction | DEC-063/071 |
| BeneficiaryRating | RequestCommunicationScore | TBD | Yes when rating submitted | 1..5 | وضوح الطلب والتواصل | DEC-063 |
| BeneficiaryRating | AgreementCommitmentScore | TBD | Yes when rating submitted | 1..5 | الالتزام بالاتفاق | DEC-063 |
| BeneficiaryRating | CooperationScore | TBD | Yes when rating submitted | 1..5 | حسن التعامل والتعاون | DEC-063 |
| BeneficiaryRating | Comment | TBD | No | moderation policy applies | تعليق اختياري؛ سجل Beneficiary ليس public Guest data | DEC-063/077 |
| VerificationCase | VerificationCaseId | TBD | Yes | PK | حالة تحقق مقدم؛ ليست Public Guest data | DEC-034..036/077 |
| VerificationCase | ProviderProfileId | TBD | Yes | FK | Provider Profile موضوع التحقق | DEC-034 |
| VerificationCase | Status | TBD | Yes | lifecycle constraint | حالة التحقق | Verification model |
| VerificationCase | ReviewNote | TBD | No/conditional | required on ResubmissionRequired/Rejected conceptually | ملاحظة/سبب المراجع | Verification model |
| VerificationArtifact | ArtifactType | TBD | Yes | allowed types Needs Verification | نوع مستند/أثر تحقق، خاص/حساس | VER-DOC-Q01 / DEC-036 |
| VerificationArtifact | PrivateMediaReference | TBD | Yes | private/non-public | مرجع وثيقة/وسيط تحقق غير عام | DEC-036/077 |
| Subscription | Status | TBD | Yes | lifecycle/design constraint | حالة الاشتراك؛ ليست Public Guest data | DEC-042/043/077 |
| Subscription | StartDate | TBD | Yes | date rule TBD | بداية فترة الاشتراك | DEC-042 |
| Subscription | EndDate | TBD | Yes | date rule TBD | نهاية فترة الاشتراك | DEC-042 |
| UserBlock | BlockId | TBD | Yes | PK | سجل Block لمستخدم authenticated | DEC-053/077 |
| Report | ReportId | TBD | Yes | PK | بلاغ/Complaint context للمراجعة الإدارية؛ Guest لا ينشئه قبل Authentication | DEC-053/073/077 |
| Report | TargetType | TBD | Yes | allowed targets TBD | نوع الهدف المبلغ عنه | DEC-053/064/073 |
| Report | TargetReference | TBD | Yes | physical implementation TBD | مرجع الهدف؛ polymorphic implementation غير محسوم | ERD / DEC-053/073 |
| SafetyFlag | ReasonCategory | TBD | Yes when flag exists | taxonomy TBD | سبب/فئة الاشتباه اللازمة للمراجعة البشرية؛ ليست Public Guest data | SRS / Trust & Safety model |
| AdminAuditRecord | EventType | TBD | Yes | taxonomy TBD | نوع حدث التدقيق الإداري الحساس؛ غير عام | Trust & Safety / ERD |

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

- SQL/PostgreSQL data types and lengths.
- exact Check/Unique/Foreign-key names and cascade behavior.
- media storage model.
- invoice revision physical model.
- ProviderResponse edit-history model.
- physical Message/SystemEvent↔Transaction mapping within persistent Conversation.
- public Provider Profile projection/API response design.
- admin authorization tables.
- verification document types/retention.
- AI flags/audit storage after policy decisions.
- polymorphic Report target implementation.

لا يوجد في Data Dictionary الحالي Payment/Wallet/Escrow/Refund/Settlement أو DepositAmount لأن هذه ليست جزءًا من النموذج الحالي.