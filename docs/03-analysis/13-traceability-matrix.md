# Requirements Traceability Matrix — Core Diagram Model

> **الحالة:** `CORE TRACEABILITY SYNCHRONIZED 2026-09-18 THROUGH DEC-090 — DESIGN TRACEABILITY PARTIAL`
>
> الغرض من هذه النسخة هو منع اعتماد المخططات على FR/Entities تاريخية. المرجع الأعلى يبقى Decision Register ثم SRS وBusiness Rules.
>
> **ملاحظة:** معرفات `UR-OFF-*` محفوظة من SRS لأسباب الاستمرارية فقط؛ المصطلح الحالي في النموذج هو `Provider Response` وليس `Offer`. كما أن أسماء `UC-00..UC-10` في `08-use-cases.md` تمثل مواصفات سيناريوهات وقد تفكك إلى أكثر من Oval في Main Use Case Diagram عند الحاجة؛ لذلك عمود `Use Case / Interaction` أدناه يتتبع كلا المستوىين: المواصفة الأصلية + اسم الـActor goal المستخدم في الرسم.

| Requirement | Decision Basis | Business Rule / Model | Use Case / Interaction | DFD Process | Core Entity / Concept | Status |
|---|---|---|---|---|---|---|
| UR-GST-01 | DEC-077 | BR-044 / Guest Public Access | UC-00 → Browse Public Content / Search Providers / View Provider Profile / View Portfolio-Catalog | 2.0 | Public projection of PROVIDER_PROFILE, CATEGORY, AREA, SHOWCASE_ITEM; **no GUEST entity** | `ANALYZED_APPROVED` |
| UR-GST-02 | DEC-077 | BR-045/046 / Account-Portal Model | UC-00 protected-action alternative → Log In / Create Account; protected actor goals have Authentication precondition | 1.0 / protected processes | Authentication boundary; no protected domain record before auth | `ANALYZED_APPROVED` |
| UR-GST-03 | DEC-036/046/077 | BR-047 | UC-00 Public Provider Profile | 2.0 | Public/private field boundary; phone not public | `ANALYZED_APPROVED` |
| UR-ACC-01 | DEC-008 | Account/Portal Model | Manage Account | 1.0 | USER | `ANALYZED_APPROVED` |
| UR-ACC-02 | DEC-009/011/078 | Account/Portal Model | Manage Account / Switch Portal | 1.0 | USER, PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-ACC-03 | DEC-078 | BR-048/049 | Create Account / Log In / Forgot Password | 1.0 | USER + authentication verification state | `ANALYZED_APPROVED` |
| UR-ACC-04 | DEC-079 | BR-050 | Manage Account / Deactivate / Reactivate | 1.0 | USER, historical references retained | `ANALYZED_APPROVED` |
| UR-PROV-01 | DEC-074/030 | BR-041 | Manage Provider Profile / Manage Service Areas | 1.0 | PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PROV-02 | DEC-076 | BR-043 / Provider Activity Model | Manage Provider Profile / Manage Provider Categories | 1.0 | PROVIDER_ACTIVITY, CATEGORY | `ANALYZED_APPROVED` |
| UR-PROV-03 | DEC-080 | BR-051 | Manage Provider Profile | 1.0 | PROVIDER_PROFILE.TradeName/Description + service areas | `ANALYZED_APPROVED` |
| UR-VER-01 | DEC-035/085 | BR-060/061 | UC-09 → Service Provider Identity Verification / Review | 6.0 | VERIFICATION_CASE, VERIFICATION_ARTIFACT, ADMIN_AUDIT_RECORD; Product Provider has no government-ID case | `ANALYZED_APPROVED` |
| UR-DIS-01 | DEC-012/031..033/077 | BR-001/031/044 | UC-00/01 → Search Providers / View Provider Profile | 2.0 | CATEGORY, AREA, AREA_ADJACENCY, PROVIDER_SERVICE_AREA, PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PORT-01 | DEC-064/077 | BR-035/036/044 | UC-00/01/10 → View Provider Profile / View Portfolio-Catalog / Manage Portfolio-Catalog | 1.0 / 2.0 | SHOWCASE_ITEM | `ANALYZED_APPROVED` |
| UR-REQ-01 | DEC-012/077 | BR-001/045 | UC-02 → Create Request; Authentication precondition | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-02 | DEC-013 | BR-002/003 | UC-02 → Create Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-03 | DEC-048 | BR-018/020 | UC-02 alternative → Close Open Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-04 | DEC-081 | BR-052/053 | Create Request lifecycle → reminder/expiry/republish | 2.0 | REQUEST timestamps/status + new Request on republish | `ANALYZED_APPROVED` |
| UR-COM-01 | DEC-046/077 | BR-005/008/045/047 | UC-01 / UC-03 / UC-04 → Communicate / Inquire; Authentication precondition | 3.0 | CONVERSATION, MESSAGE | `ANALYZED_APPROVED` |
| UR-COM-02 | DEC-075 | BR-042 / In-App Communication Model | UC-01 / UC-03 / UC-04 communication context; persistent conversation invariant | 3.0 / 4.0 | CONVERSATION, SYSTEM_EVENT, TRANSACTION context | `DERIVED_FROM_APPROVED_DECISION` |
| UR-OFF-01 | DEC-013/041 | BR-003/033 | UC-03 → Submit Provider Response | 3.0 | PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-OFF-02 | DEC-014/047 | BR-004/006 | UC-04 → Compare Provider Responses / Select Provider / Create Active Transaction | 3.0 / 4.0 | REQUEST, PROVIDER_RESPONSE, TRANSACTION | `ANALYZED_APPROVED` |
| UR-OFF-03 | DEC-070 | BR-039 | UC-03 → Edit Provider Response / Withdraw Provider Response | 3.0 | PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-TX-01 | DEC-046/047/066/069/075 | BR-006/007/037/042 | UC-01 direct route → Request Transaction Start / Confirm Transaction Start / Create Active Transaction; UC-04 request route → Select Provider / Create Active Transaction | 3.0 / 4.0 | TRANSACTION, CONVERSATION, PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-TX-02 | DEC-056 | BR-023 | Transaction management / Cancel Transaction | 4.0 | TRANSACTION (including cancellation actor/reason/time concept) | `ANALYZED_APPROVED` |
| UR-TX-03 | DEC-071 | BR-010/016 | UC-06 → Approve Final Invoice / Complete Transaction; UC-07/07B post-transaction ratings | 4.0 / 5.0 | TRANSACTION | `ANALYZED_APPROVED` |
| UR-TX-04 | DEC-073 | BR-040 | UC-06 dispute branch → Raise Transaction Complaint / Review Transaction Complaint | 4.0 / 6.0 | TRANSACTION, REPORT / complaint record | `ANALYZED_APPROVED` |
| UR-INV-01 | DEC-015/025/050/071/083 | BR-057/058 | UC-06 → Create/Review/Approve/Revise Final Invoice | 4.0 | INVOICE_VERSION, INVOICE_ITEM, TRANSACTION + reminder/overdue state | `ANALYZED_APPROVED` |
| UR-DSP-01 | DEC-073/084 | BR-059 | UC-06 dispute branch → Raise Transaction Complaint / Review Transaction Complaint | 4.0 / 6.0 | complaint record/evidence, TRANSACTION, ADMIN_AUDIT_RECORD | `ANALYZED_APPROVED` |
| UR-REV-01 | DEC-051/087 | BR-063/064 | UC-07 → Rate Provider; Completed precondition + Later/Reminder/Hybrid criteria | 5.0 | PROVIDER_RATING + structured criteria | `ANALYZED_APPROVED` |
| UR-REV-02 | DEC-063 | BR-015/016 | UC-07B → Rate Beneficiary; Precondition: Transaction Completed | 5.0 | BENEFICIARY_RATING | `ANALYZED_APPROVED` |
| UR-REP-01 | DEC-063 | BR-034 | UC-07B / provider interaction context | 5.0 | BENEFICIARY_RATING / interaction record | `ANALYZED_APPROVED` |
| UR-SAFE-01 | DEC-053/054/077/088/089 | BR-065/066 | UC-08 → Block/Unblock / Report / Human Review Outcomes | 6.0 | USER_BLOCK, REPORT, SAFETY_FLAG, ADMIN_AUDIT_RECORD | `ANALYZED_APPROVED` |
| UR-PAY-01 | DEC-018/041/073 | BR-024/033/040 | Scope constraint on Provider Response / Invoice / Complaint flows | — | **No Payment/Escrow/Refund/Settlement entity** | `ANALYZED_APPROVED` |
| UR-SUB-01 | DEC-042/043/086 | BR-062 | Manage Provider Subscription + Validate Eligibility | 6.0 | SUBSCRIPTION (30-day period + expiry reminders) | `ANALYZED_APPROVED` |
| UR-NOT-01 | DEC-090 | BR-067 | Notification delivery across auth/request/invoice/subscription/admin flows | cross-cutting | NOTIFICATION concept + SMS/email channels | `ANALYZED_APPROVED` |

## Use-Case Relationship Traceability

| UML Relationship | Type | Decision / Rule Basis | Status |
|---|---|---|---|
| View Provider Profile → Search Providers | `<<extend>>` | UC-00/01 / DEC-012/064/077 | `DERIVED_FROM_APPROVED_FLOW` |
| View Portfolio / Catalog → View Provider Profile | `<<extend>>` | UC-00/10 / DEC-064/077 | `DERIVED_FROM_APPROVED_FLOW` |
| Communicate / Inquire → View Provider Profile | `<<extend>>` | DEC-046/077 | `DERIVED_FROM_APPROVED_FLOW` |
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

> `Log In` / `Create Account` are **not** mechanically included in every protected Use Case. Authentication is a Precondition for authenticated actor goals; Guest attempts on protected CTAs redirect to Authentication according to DEC-077. This is a derived modeling rule, not a new Team Decision.

> علاقات الجدول أعلاه **Derived Modeling Relations** وليست Team Decisions جديدة. إذا تغير السيناريو أو Business Rule الحاكم، يجب إعادة تقييم العلاقة بدل معاملتها كقرار مستقل.

## Diagram-Level Invariants

The following must remain consistent across Use Case, DFD, Activity, Sequence, ERD and Class diagrams:

1. Main actors now include `Guest`, `Beneficiary`, `Provider`, `YADD Administrator`; Service/Product Provider are Provider specializations when useful — DEC-067/077.
2. Guest may Browse/Search/View public provider content only; protected interactive/transactional actions require Authentication — DEC-077.
3. Guest does not create a `GUEST` domain entity/Class solely because anonymous browsing exists.
4. Public Provider Profile does not expose phone/direct private-contact information or sensitive/private data — DEC-036/046/077.
5. One User account; optional single Provider Profile; each Provider Profile is exclusively `SERVICE` or `PRODUCT` in MVP — DEC-074.
6. A Provider may choose one or more Categories inside that type; Draft may temporarily have none, but provider-function eligibility requires at least one valid Category — DEC-076.
7. Canonical request path: `Request → Provider Response → Selection → Transaction`; no standalone Agreement entity/store.
8. Direct Search requires `Request Transaction Start → Other Party Confirmation → Active Transaction`.
9. One active Provider Response per Provider per Request; edit/withdraw allowed before selection while Request is Open.
10. `RequiresDeposit` is a boolean attribute of Provider Response, not a Payment use case/entity/process.
11. Between the same Beneficiary and Provider, one persistent Conversation may contain multiple Transactions over time; transaction boundaries must be visible through system separators/events — DEC-075.
12. The persistent-conversation Class constraint is `{unique Conversation per Beneficiary–Provider pair}`; physical enforcement is Chapter Four work.
13. Invoice approval makes Transaction `Completed`.
14. `Completed` is the successful terminal Transaction state; there is no Transaction state `Closed`.
15. Unresolved pre-approval invoice dispute makes Transaction `Disputed`, a terminal unsuccessful state.
16. Administration reviews platform evidence and applies YADD policy; it does not arbitrate financial/commercial rights or order Payment/Refund/Compensation.
17. Ratings occur only after Completed; no Ratings for Cancelled or Disputed Transactions.
18. `Rate Provider` and `Rate Beneficiary` are Post-Transaction actor goals with `Transaction = Completed` preconditions; this lifecycle dependency is not represented as `include/extend` merely because it occurs later.
19. `Block User` and `Report User / Content` are separate actor goals; neither is mandatory for the other. Static model may represent them separately as `USER_BLOCK` and `REPORT`.
20. Neighborhood adjacency is managed YADD reference data and is not modeled as GPS-radius eligibility logic.
21. Transaction Cancellation records actor, reason and time.
22. Verification resubmission/rejection review supports a recorded note/reason.
23. Safety Flags and sensitive administrative review/access events require conceptual traceability without inventing thresholds or a final physical schema; a Flag must preserve enough reason/category information for human review.
24. `Close Open Request` is distinct from `Cancel Transaction`.
25. No Beneficiary↔Provider Payment, Escrow, Refund or Settlement entity/process inside YADD.
26. Diagram labels are English only according to DEC-072.
27. User-facing discovery/request/service-area location uses Neighborhood; District is derived internally and remains part of the data model.
28. Returning User authentication accepts verified Phone or verified Email + Password; Forgot Password is based on verified recovery channels; Portal Switch uses the same User account and remembers lastPortal.
29. Account Deactivate/Reactivate is supported; self-service Hard Delete is not part of MVP.
30. Request inactivity: 24h/48h reminders, 72h Expired; meaningful Beneficiary activity resets the clock, Provider Response alone does not; Republish creates a new Request.
31. Subscription Expired preserves login/Provider Portal and existing Active Transactions while blocking new Provider Responses and new Direct Search Transactions until renewal.
32. Generic Report requires Reason; Description is not universally mandatory, while Transaction Complaint requires Reason + Description.

## Open Items and Traceability Scope

Open items such as AI/moderation thresholds, verification-data retention/licensing, geographic seed lists, final subscription price/payment-proof/public-visibility policy, Provider Type switching, and physical design details remain `Needs Verification` or Chapter Four concerns. Resolved request/invoice/direct-start/subscription timings and accepted Service Provider identity-document types must not be treated as open.

The structural questions previously open are now resolved at the analysis level:

- Guest public browsing and Authentication gating are resolved by DEC-077.
- Conversation reuse is resolved by DEC-075: one persistent Conversation between the same parties can group multiple Transactions.
- Provider Activity multiplicity is resolved by DEC-076: multiple Categories are allowed inside one Provider Type; Draft may have zero temporarily, while provider-function eligibility requires at least one.

Still open:

- Exact public presentation of optional non-sensitive rating details beyond already-approved provider indicators may be refined in interface design without exposing private beneficiary interaction records.
- Provider Type switching after initial selection remains unresolved and must not be inferred from class operations.
- Physical enforcement of Conversation pair uniqueness and linking messages/system events to a specific Transaction remains Chapter Four work.

Chapter Four design columns (Relation Schema, final PK/FK/Constraints, Data Dictionary, interface IDs, query IDs) are intentionally deferred until the design work is produced; this does not make the core analysis traceability provisional.