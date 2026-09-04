# Requirements Traceability Matrix — Core Diagram Model

> **الحالة:** `CORE TRACEABILITY SYNCHRONIZED 2026-09-04 — DESIGN TRACEABILITY PENDING`
>
> الغرض من هذه النسخة هو منع اعتماد المخططات على FR/Entities تاريخية. المرجع الأعلى يبقى Decision Register ثم SRS وBusiness Rules.
>
> **ملاحظة:** معرفات `UR-OFF-*` محفوظة من SRS لأسباب الاستمرارية فقط؛ المصطلح الحالي في النموذج هو `Provider Response` وليس `Offer`.

| Requirement | Decision Basis | Business Rule / Model | Use Case / Interaction | DFD Process | Core Entity / Concept | Status |
|---|---|---|---|---|---|---|
| UR-ACC-01 | DEC-008 | Account/Portal Model | Manage Account | 1.0 | USER | `ANALYZED_APPROVED` |
| UR-ACC-02 | DEC-009/011 | Account/Portal Model | Manage Account / Switch Portal | 1.0 | USER, PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PROV-01 | DEC-029/030 | Provider Activity Model | Manage Provider Profile | 1.0 | PROVIDER_PROFILE, PROVIDER_ACTIVITY | `ANALYZED_APPROVED` |
| UR-VER-01 | DEC-034/035 | BR-027/028 | UC-09 Provider Verification | 6.0 | VERIFICATION_CASE, VERIFICATION_ARTIFACT | `ANALYZED_APPROVED` |
| UR-DIS-01 | DEC-012/031..033 | BR-001/031 | UC-01 Search and Inquire Directly | 2.0 | CATEGORY, AREA, PROVIDER_SERVICE_AREA, PROVIDER_PROFILE | `ANALYZED_APPROVED` |
| UR-PORT-01 | DEC-064 | BR-035/036 | UC-01 / UC-10 Manage Portfolio/Catalog | 1.0 / 2.0 | SHOWCASE_ITEM | `ANALYZED_APPROVED` |
| UR-REQ-01 | DEC-012 | BR-001 | UC-02 Create Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-02 | DEC-013 | BR-002/003 | UC-02 Create Request | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-REQ-03 | DEC-048 | BR-018/020 | UC-02 alternative closure | 2.0 | REQUEST | `ANALYZED_APPROVED` |
| UR-COM-01 | DEC-046 | BR-005/008 | UC-01 / UC-03 / UC-04 communication | 3.0 | CONVERSATION, MESSAGE | `ANALYZED_APPROVED` |
| UR-OFF-01 | DEC-013/041 | BR-003/033 | UC-03 Respond to Request | 3.0 | PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-OFF-02 | DEC-014/047 | BR-004/006 | UC-04 Select Provider | 3.0 / 4.0 | REQUEST, PROVIDER_RESPONSE, TRANSACTION | `ANALYZED_APPROVED` |
| UR-OFF-03 | DEC-070 | BR-039 | UC-03 Manage Provider Response | 3.0 | PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-TX-01 | DEC-046/047/066/069 | BR-006/007/037 | UC-01 direct start / UC-04 selection | 3.0 / 4.0 | TRANSACTION, CONVERSATION, PROVIDER_RESPONSE | `ANALYZED_APPROVED` |
| UR-TX-02 | DEC-056 | BR-023 | Transaction management | 4.0 | TRANSACTION | `ANALYZED_APPROVED` |
| UR-TX-03 | DEC-071 | BR-010/016 | UC-06 completion + post-transaction ratings | 4.0 / 5.0 | TRANSACTION | `ANALYZED_APPROVED` |
| UR-INV-01 | DEC-015/025/050/071 | BR-009..013 | UC-06 Create and Approve Invoice | 4.0 | INVOICE_VERSION, INVOICE_ITEM, TRANSACTION | `ANALYZED_APPROVED` |
| UR-REV-01 | DEC-051 | BR-014/016 | UC-07 Rate Provider | 5.0 | PROVIDER_RATING | `ANALYZED_APPROVED` |
| UR-REV-02 | DEC-063 | BR-015/016 | UC-07B Provider Rates Beneficiary | 5.0 | BENEFICIARY_RATING | `ANALYZED_APPROVED` |
| UR-REP-01 | DEC-063 | BR-034 | UC-07B / provider interaction context | 5.0 | BENEFICIARY_RATING / interaction record | `ANALYZED_APPROVED` |
| UR-SAFE-01 | DEC-053/054 | BR-021/022 | UC-08 Block and Report | 6.0 | REPORT / moderation records | `ANALYZED_APPROVED` |
| UR-PAY-01 | DEC-018/041 | BR-024/033 | Scope constraint on UC-03/06 | — | **No Payment/Escrow/Refund entity** | `ANALYZED_APPROVED` |
| UR-SUB-01 | DEC-042/043 | BR-029/030 | Provider Subscription Administration | 6.0 | SUBSCRIPTION | `ANALYZED_APPROVED` |

## Diagram-Level Invariants

The following must remain consistent across Use Case, DFD, Activity, Sequence, ERD and Class diagrams:

1. Main actors: `Beneficiary`, `Provider`, `YADD Administrator`; Service/Product Provider are Provider specializations when useful.
2. No `Guest` actor unless a later decision explicitly adds anonymous browsing.
3. Canonical request path: `Request → Provider Response → Selection → Transaction`; no standalone Agreement entity/store.
4. Direct Search requires `Request Transaction Start → Other Party Confirmation → Active Transaction`.
5. One active Provider Response per Provider per Request; edit/withdraw allowed before selection while Request is Open.
6. `RequiresDeposit` is a boolean attribute of Provider Response, not a Payment use case/entity/process.
7. Invoice approval makes Transaction `Completed`.
8. `Completed` is the successful terminal Transaction state; there is no Transaction state `Closed`.
9. Ratings occur after Completed and do not change Transaction status.
10. No Beneficiary↔Provider Payment, Escrow or Refund entity/process inside YADD.
11. Diagram labels are English only according to DEC-072.

## Open Items and Traceability Scope

Open numeric/policy items such as expiry timing, AI thresholds, exact identity-document types, geographic seed lists and subscription plan pricing remain `Needs Verification`. They must not be invented in diagrams and do not block the core diagram structure above.

Chapter Four design columns (Relation Schema, final PK/FK/Constraints, Data Dictionary, interface IDs, query IDs) are intentionally deferred until the design work is produced; this does not make the core analysis traceability provisional.