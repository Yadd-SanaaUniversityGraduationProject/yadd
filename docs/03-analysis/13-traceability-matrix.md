# Requirements Traceability Matrix — Core Diagram Model

> **الحالة:** `CORE TRACEABILITY SYNCHRONIZED 2026-09-11 — DESIGN TRACEABILITY PENDING`
>
> الغرض من هذه النسخة هو منع اعتماد المخططات على FR/Entities تاريخية. المرجع الأعلى يبقى Decision Register ثم SRS وBusiness Rules.
>
> **ملاحظة:** معرفات `UR-OFF-*` محفوظة من SRS لأسباب الاستمرارية فقط؛ المصطلح الحالي في النموذج هو `Provider Response` وليس `Offer`. كما أن أسماء `UC-01..UC-10` في `08-use-cases.md` تمثل مواصفات سيناريوهات وقد تفكك إلى أكثر من Oval في Main Use Case Diagram عند الحاجة؛ لذلك عمود `Use Case / Interaction` أدناه يتتبع كلا المستوىين: المواصفة الأصلية + اسم الـActor goal المستخدم في الرسم.

| Requirement | Decision Basis | Business Rule / Model | Use Case / Interaction | DFD Process | Core Entity / Concept | Status |
|---|---|---|---|---|---|---|
| UR-ACC-01 | DEC-008 | Account/Portal Model | Manage Account | 1.0 | USER | `ANALYZED_APPROVED` |
| UR-ACC-02 | DEC-009/011 | Account/Portal Model | Manage Account / Switch Portal | 1.0 | USER, PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PROV-01 | DEC-074/030 | BR-041 | Manage Provider Profile / Manage Service Areas | 1.0 | PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PROV-02 | DEC-076 | BR-043 / Provider Activity Model | Manage Provider Profile / Manage Provider Categories | 1.0 | PROVIDER_ACTIVITY, CATEGORY | `ANALYZED_APPROVED` |
| UR-VER-01 | DEC-034/035 | BR-027/028 | UC-09 → Submit Verification / Review Provider Verification | 6.0 | VERIFICATION_CASE, VERIFICATION_ARTIFACT, ADMIN_AUDIT_RECORD (conceptual) | `ANALYZED_APPROVED` |
| UR-DIS-01 | DEC-012/031..033 | BR-001/031 | UC-01 → Search Providers / View Provider Profile | 2.0 | CATEGORY, AREA, AREA_ADJACENCY, PROVIDER_SERVICE_AREA, PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PORT-01 | DEC-064 | BR-035/036 | UC-01 / UC-10 → View Provider Profile / Manage Portfolio-Catalog | 1.0 / 2.0 | SHOWCASE_ITEM | `ANALYZED_APPROVED` |
| UR-REQ-01 | DEC-012 | BR-001 | UC-02 → Create Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-02 | DEC-013 | BR-002/003 | UC-02 → Create Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-03 | DEC-048 | BR-018/020 | UC-02 alternative → Close Open Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-COM-01 | DEC-046/075 | BR-005/008/042 | UC-01 / UC-03 / UC-04 → Communicate / Inquire | 3.0 | CONVERSATION, MESSAGE, TRANSACTION context | `ANALYZED_APPROVED` |
| UR-OFF-01 | DEC-013/041 | BR-003/033 | UC-03 → Submit Provider Response | 3.0 | PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-OFF-02 | DEC-014/047 | BR-004/006 | UC-04 → Compare Provider Responses / Select Provider / Create Active Transaction | 3.0 / 4.0 | REQUEST, PROVIDER_RESPONSE, TRANSACTION | `ANALYZED_APPROVED` |
| UR-OFF-03 | DEC-070 | BR-039 | UC-03 → Edit Provider Response / Withdraw Provider Response | 3.0 | PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-TX-01 | DEC-046/047/066/069/075 | BR-006/007/037/042 | UC-01 direct route → Request Transaction Start / Confirm Transaction Start / Create Active Transaction; UC-04 request route → Select Provider / Create Active Transaction | 3.0 / 4.0 | TRANSACTION, CONVERSATION, PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-TX-02 | DEC-056 | BR-023 | Transaction management / Cancel Transaction | 4.0 | TRANSACTION (including cancellation actor/reason/time concept) | `ANALYZED_APPROVED` |
| UR-TX-03 | DEC-071 | BR-010/016 | UC-06 → Approve Final Invoice / Complete Transaction; UC-07/07B post-transaction ratings | 4.0 / 5.0 | TRANSACTION | `ANALYZED_APPROVED` |
| UR-TX-04 | DEC-073 | BR-040 | UC-06 dispute branch → Raise Transaction Complaint / Review Transaction Complaint | 4.0 / 6.0 | TRANSACTION, REPORT / complaint record | `ANALYZED_APPROVED` |
| UR-INV-01 | DEC-015/025/050/071 | BR-009..013 | UC-06 → Create Final Invoice / Review Final Invoice / Approve Final Invoice / Request Invoice Revision / Revise Final Invoice | 4.0 | INVOICE_VERSION, INVOICE_ITEM, TRANSACTION | `ANALYZED_APPROVED` |
| UR-DSP-01 | DEC-073 | BR-040 | UC-06 dispute branch → Raise Transaction Complaint / Review Transaction Complaint | 4.0 / 6.0 | REPORT / complaint record, TRANSACTION, ADMIN_AUDIT_RECORD (conceptual) | `ANALYZED_APPROVED` |
| UR-REV-01 | DEC-051 | BR-014/016 | UC-07 → Rate Provider; Precondition: Transaction Completed | 5.0 | PROVIDER_RATING | `ANALYZED_APPROVED` |
| UR-REV-02 | DEC-063 | BR-015/016 | UC-07B → Rate Beneficiary; Precondition: Transaction Completed | 5.0 | BENEFICIARY_RATING | `ANALYZED_APPROVED` |
| UR-REP-01 | DEC-063 | BR-034 | UC-07B / provider interaction context | 5.0 | BENEFICIARY_RATING / interaction record | `ANALYZED_APPROVED` |
| UR-SAFE-01 | DEC-053/054 | BR-021/022 | UC-08 → Block User / Report User-Content / Review Reports-Flags | 6.0 | USER_BLOCK, REPORT, SAFETY_FLAG, ADMIN_AUDIT_RECORD (conceptual) | `ANALYZED_APPROVED` |
| UR-PAY-01 | DEC-018/041/073 | BR-024/033/040 | Scope constraint on Provider Response / Invoice / Complaint flows | — | **No Payment/Escrow/Refund/Settlement entity** | `ANALYZED_APPROVED` |
| UR-SUB-01 | DEC-042/043 | BR-029/030 | Manage Provider Subscription + Validate Response Eligibility | 6.0 | SUBSCRIPTION | `ANALYZED_APPROVED` |

## Use-Case Relationship Traceability

| UML Relationship | Type | Decision / Rule Basis | Status |
|---|---|---|---|
| View Provider Profile → Search Providers | `<<extend>>` | UC-01 / DEC-012/064 | `DERIVED_FROM_APPROVED_FLOW` |
| Communicate / Inquire → View Provider Profile | `<<extend>>` | DEC-046 | `DERIVED_FROM_APPROVED_FLOW` |
| Communicate / Inquire → Compare Provider Responses | `<<extend>>` | UC-03/04 / DEC-046 | `DERIVED_FROM_APPROVED_FLOW` |
| Select Provider → Compare Provider Responses | `<<extend>>` | DEC-014/047 | `DERIVED_FROM_APPROVED_FLOW` |
| Submit Provider Response → View Matching Requests | `<<extend>>` | UC-03 / DEC-043/070 | `DERIVED_FROM_APPROVED_FLOW` |
| Request Transaction Start → Communicate / Inquire | `<<extend>>` | DEC-046/069 | `DERIVED_FROM_APPROVED_FLOW` |
| Submit Provider Response → Validate Response Eligibility | `<<include>>` | DEC-043/074/076 / BR-030/041/043 | `DERIVED_FROM_APPROVED_RULE` |
| Select Provider → Create Active Transaction | `<<include>>` | DEC-047/066 / BR-006 | `DERIVED_FROM_APPROVED_RULE` |
| Confirm Transaction Start → Create Active Transaction | `<<include>>` | DEC-069 / BR-007 | `DERIVED_FROM_APPROVED_RULE` |
| Approve Final Invoice → Review Final Invoice | `<<extend>>` | DEC-050/071 | `DERIVED_FROM_APPROVED_FLOW` |
| Request Invoice Revision → Review Final Invoice | `<<extend>>` | DEC-025/050 | `DERIVED_FROM_APPROVED_FLOW` |
| Raise Transaction Complaint → Review Final Invoice | `<<extend>>` | DEC-025/073 | `DERIVED_FROM_APPROVED_FLOW` |
| Approve Final Invoice → Complete Transaction | `<<include>>` | DEC-071 / BR-010 | `DERIVED_FROM_APPROVED_RULE` |

> علاقات الجدول أعلاه **Derived Modeling Relations** وليست Team Decisions جديدة. إذا تغير السيناريو أو Business Rule الحاكم، يجب إعادة تقييم العلاقة بدل معاملتها كقرار مستقل.

## Diagram-Level Invariants

The following must remain consistent across Use Case, DFD, Activity, Sequence, ERD and Class diagrams:

1. Main actors: `Beneficiary`, `Provider`, `YADD Administrator`; Service/Product Provider are Provider specializations when useful.
2. No `Guest` actor unless a later decision explicitly adds anonymous browsing.
3. One User account; optional single Provider Profile; each Provider Profile is exclusively `SERVICE` or `PRODUCT` in MVP — DEC-074.
4. A Provider may choose one or more Categories inside that type; Draft may temporarily have none, but provider-function eligibility requires at least one valid Category — DEC-076.
5. Canonical request path: `Request → Provider Response → Selection → Transaction`; no standalone Agreement entity/store.
6. Direct Search requires `Request Transaction Start → Other Party Confirmation → Active Transaction`.
7. One active Provider Response per Provider per Request; edit/withdraw allowed before selection while Request is Open.
8. `RequiresDeposit` is a boolean attribute of Provider Response, not a Payment use case/entity/process.
9. Between the same Beneficiary and Provider, one persistent Conversation may contain multiple Transactions over time; transaction boundaries must be visible through system separators/events — DEC-075.
10. Invoice approval makes Transaction `Completed`.
11. `Completed` is the successful terminal Transaction state; there is no Transaction state `Closed`.
12. Unresolved pre-approval invoice dispute makes Transaction `Disputed`, a terminal unsuccessful state.
13. Administration reviews platform evidence and applies YADD policy; it does not arbitrate financial/commercial rights or order Payment/Refund/Compensation.
14. Ratings occur only after Completed; no Ratings for Cancelled or Disputed Transactions.
15. `Rate Provider` and `Rate Beneficiary` are Post-Transaction actor goals with `Transaction = Completed` preconditions; this lifecycle dependency is not represented as `include/extend` merely because it occurs later.
16. `Block User` and `Report User / Content` are separate actor goals; neither is mandatory for the other. Static model may represent them separately as `USER_BLOCK` and `REPORT`.
17. Neighborhood adjacency is managed YADD reference data and is not modeled as GPS-radius eligibility logic.
18. Transaction Cancellation records actor, reason and time.
19. Verification resubmission/rejection review supports a recorded note/reason.
20. Safety Flags and sensitive administrative review/access events require conceptual traceability without inventing thresholds or a final physical schema.
21. `Close Open Request` is distinct from `Cancel Transaction`.
22. No Beneficiary↔Provider Payment, Escrow, Refund or Settlement entity/process inside YADD.
23. Diagram labels are English only according to DEC-072.

## Open Items and Traceability Scope

Open numeric/policy items such as expiry timing, AI thresholds, exact identity-document types, geographic seed lists and subscription plan pricing remain `Needs Verification`. They must not be invented in diagrams and do not block the core diagram structure above.

The two structural questions previously open are now resolved at the analysis level:

- Conversation reuse is resolved by DEC-075: one persistent Conversation between the same parties can group multiple Transactions.
- Provider Activity multiplicity is resolved by DEC-076: multiple Categories are allowed inside one Provider Type; Draft may have zero temporarily, while provider-function eligibility requires at least one.

Physical implementation details remain for Chapter Four, including uniqueness of `(ProviderProfile, Category)`, enforcement of Provider Type/Category Type compatibility, and linking messages/system events to a specific Transaction inside a persistent Conversation.

Chapter Four design columns (Relation Schema, final PK/FK/Constraints, Data Dictionary, interface IDs, query IDs) are intentionally deferred until the design work is produced; this does not make the core analysis traceability provisional.