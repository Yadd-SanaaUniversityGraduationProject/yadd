# Data Dictionary

> **الحالة:** `DRAFT FOR PRELIMINARY DEFENSE — CURRENT MODEL SKELETON — 2026-09-05`
>
> **المصدر:** `docs/04-design/01-database-design.md` المشتق من `docs/03-analysis/11-ERD.md` وSRS v0.9.5. الأنواع الفيزيائية والقيود غير المثبتة تبقى `TBD` بدل اختراعها.

## Current Dictionary Skeleton

| Entity | Field | Type | Required | Key/Constraint | Description | Source |
|---|---|---|---|---|---|---|
| User | UserId | TBD | Yes | PK | معرف حساب المستخدم الواحد | DEC-008..011 / ERD |
| User | AccountStatus | TBD | Yes | lifecycle/design constraint TBD | حالة الحساب | SRS / ERD |
| ProviderProfile | ProviderProfileId | TBD | Yes | PK | معرف ملف المقدم | DEC-010/029 |
| ProviderProfile | UserId | TBD | Yes | FK + Unique candidate | يربط Provider Profile بحساب User واحد | DEC-008..011 |
| ProviderProfile | VerificationStatus | TBD | Yes | lifecycle constraint | حالة تحقق المقدم | DEC-034..036 |
| ProviderActivity | ActivityType | TBD | Yes | allowed-values constraint TBD | Service أو Product حسب النموذج الحالي | DEC-029/030 |
| Area | ParentAreaId | TBD | No | self FK candidate | علاقة District/Neighborhood المفاهيمية | DEC-031..033 |
| Request | RequestId | TBD | Yes | PK | معرف طلب Service/Product | DEC-012 |
| Request | BeneficiaryUserId | TBD | Yes | FK | صاحب الطلب | DEC-012 |
| Request | IndicativePrice | TBD | No | non-negative constraint TBD | سعر استرشادي اختياري | DEC-013 |
| Request | Status | TBD | Yes | lifecycle constraint | Draft/Open/Matched/ClosedByBeneficiary/Expired وفق lifecycle الحالي | DEC-047..049 |
| ProviderResponse | ResponseId | TBD | Yes | PK | معرف استجابة المقدم للطلب | DEC-013/014 |
| ProviderResponse | RequestId | TBD | Yes | FK | الطلب المرتبطة به الاستجابة | DEC-013/014 |
| ProviderResponse | ProviderProfileId | TBD | Yes | FK | المقدم صاحب الاستجابة | DEC-013/014 |
| ProviderResponse | ProposedPrice | TBD | No | non-negative constraint TBD | سعر مقترح اختياري | DEC-013 |
| ProviderResponse | RequiresDeposit | TBD | Yes | Boolean | هل يتطلب المقدم عربونًا خارجيًا؛ لا قيمة/حالة دفع داخل YADD | DEC-041 |
| ProviderResponse | Status | TBD | Yes | lifecycle constraint | Submitted/Selected/NotSelected/Withdrawn وحالة التعديل حسب النموذج الحالي | DEC-047/070 |
| Conversation | ConversationId | TBD | Yes | PK | محادثة خاصة قبل/بعد بدء Transaction | DEC-023/046 |
| Message | MessageId | TBD | Yes | PK | رسالة مرتبطة بمحادثة | DEC-023/046 |
| Transaction | TransactionId | TBD | Yes | PK | معرف المعاملة الرسمية | DEC-047/066/069 |
| Transaction | RequestId | TBD | No | FK | مصدر Request إن وجدت؛ Direct Search قد لا يملك Request | DEC-066/069 |
| Transaction | SelectedResponseId | TBD | No | FK | Provider Response المختارة في Request Route | DEC-047/066 |
| Transaction | Status | TBD | Yes | lifecycle constraint | Active/AwaitingInvoice/RevisionRequested/Completed/Cancelled/Disputed حسب lifecycle | DEC-048/050/071/073 |
| Transaction | CancellationReason | TBD | No | required condition when Cancelled | سبب الإلغاء بعد بدء المعاملة | DEC-048 |
| InvoiceVersion | InvoiceVersionId | TBD | Yes | PK | نسخة فاتورة مرتبطة بالمعاملة | DEC-015/025/050 |
| InvoiceVersion | TransactionId | TBD | Yes | FK | المعاملة صاحبة الفاتورة | DEC-015 |
| InvoiceVersion | VersionNumber | TBD | Yes | uniqueness per transaction TBD | ترتيب النسخة لحفظ تاريخ التعديل | DEC-025 |
| InvoiceVersion | Status | TBD | Yes | lifecycle constraint | Draft/PendingCustomerApproval/Approved/RevisionRequested وفق التصميم النهائي | DEC-025/050 |
| InvoiceVersion | TotalAmount | TBD | Yes | calculated/check constraint TBD | إجمالي الفاتورة؛ لا يثبت دفعًا | DEC-015/018 |
| InvoiceItem | InvoiceItemId | TBD | Yes | PK | بند فاتورة | DEC-015 |
| InvoiceItem | Quantity | TBD | Yes | positive constraint TBD | كمية البند | ERD derived |
| InvoiceItem | UnitPrice | TBD | Yes | non-negative constraint TBD | سعر الوحدة | DEC-015 |
| ProviderRating | ProviderRatingId | TBD | Yes | PK | تقييم Beneficiary للمقدم | DEC-051 |
| ProviderRating | TransactionId | TBD | Yes | FK + Unique candidate | تقييم واحد بحد أقصى لكل Completed Transaction | DEC-051/071 |
| ProviderRating | Stars | TBD | Yes | 1..5 | تقييم المقدم | DEC-051 |
| ProviderRating | Comment | TBD | No | moderation policy applies | تعليق اختياري | DEC-051/052 |
| BeneficiaryRating | BeneficiaryRatingId | TBD | Yes | PK | تقييم Provider للمستفيد | DEC-063 |
| BeneficiaryRating | TransactionId | TBD | Yes | FK + Unique candidate | تقييم اختياري واحد بحد أقصى لكل Completed Transaction | DEC-063/071 |
| BeneficiaryRating | RequestCommunicationScore | TBD | Yes when rating submitted | 1..5 | وضوح الطلب والتواصل | DEC-063 |
| BeneficiaryRating | AgreementCommitmentScore | TBD | Yes when rating submitted | 1..5 | الالتزام بالاتفاق | DEC-063 |
| BeneficiaryRating | CooperationScore | TBD | Yes when rating submitted | 1..5 | حسن التعامل والتعاون | DEC-063 |
| ShowcaseItem | ShowcaseItemId | TBD | Yes | PK | عنصر Portfolio/Catalog | DEC-064 |
| ShowcaseItem | OriginalMediaReference | TBD | Yes | private/non-public | مرجع الأصل غير العام | DEC-064 |
| ShowcaseItem | DisplayMediaReference | TBD | Yes | watermarked display | مرجع نسخة العرض | DEC-064 |
| VerificationCase | VerificationCaseId | TBD | Yes | PK | حالة تحقق مقدم | DEC-034..036 |
| VerificationArtifact | ArtifactType | TBD | Yes | allowed types Needs Verification | نوع مستند/أثر تحقق | VER-DOC-Q01 |
| Subscription | Status | TBD | Yes | lifecycle/design constraint | حالة الاشتراك | DEC-042/043 |
| Subscription | StartDate | TBD | Yes | date rule TBD | بداية فترة الاشتراك | DEC-042 |
| Subscription | EndDate | TBD | Yes | date rule TBD | نهاية فترة الاشتراك | DEC-042 |
| Report | ReportId | TBD | Yes | PK | بلاغ/Complaint context للمراجعة الإدارية | DEC-053/073 |
| Report | TargetType | TBD | Yes | allowed targets TBD | نوع الهدف المبلغ عنه | DEC-053/064/073 |
| Report | TargetReference | TBD | Yes | physical implementation TBD | مرجع الهدف؛ polymorphic implementation غير محسوم | ERD / DEC-053/073 |

## Removed Stale Dictionary Concepts

لا تستخدم في التصميم الحالي بوصفها Entities قياسية:

- `ServiceRequest` → `Request`.
- `Offer` → `ProviderResponse`.
- `Agreement` → لا Entity مستقلة في MVP.
- generic `Review` → `ProviderRating` + `BeneficiaryRating`.
- `Role/UserRole` لتمييز Beneficiary/Provider → User واحد + optional ProviderProfile.

## Open Design Details

`TBD` لا يعني غياب التحليل، بل أن القرار الفيزيائي لم يعتمد بعد. من أهم ما يبقى للمراجعة:

- SQL/PostgreSQL data types and lengths.
- exact Check/Unique/Foreign-key names and cascade behavior.
- media storage model.
- invoice revision physical model.
- admin authorization tables.
- verification document types/retention.
- AI flags/audit storage after policy decisions.
- polymorphic Report target implementation.

لا يوجد في Data Dictionary الحالي Payment/Wallet/Escrow/Refund/Settlement أو DepositAmount لأن هذه ليست جزءًا من النموذج الحالي.
