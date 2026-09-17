# YADD Screen Inventory — Working Draft

> **Status:** IN PROGRESS
>
> This inventory is derived primarily from `docs/04-design/03-interface-design.md` and the currently approved project decisions. It is not a new source of requirements.

## Status Labels

- **Core**: directly supported by current approved project sources.
- **Derived**: interface/state needed to access or operate an approved function without adding a new business capability.
- **Needs Verification**: do not finalize until the relevant open policy/requirement is resolved.

## Public / Guest

| ID | Interface | Actor | Status | Notes |
|---|---|---|---|---|
| PUB-01 | Public Home / Discovery | Guest | Core | Public entry point |
| PUB-02 | Search / Filter | Guest/User | Core | Category + area discovery |
| PUB-03 | Search Results | Guest/User | Derived | Result presentation for approved search |
| PUB-04 | Public Provider Profile | Guest/User | Core | Public data only |
| PUB-05 | Public Portfolio / Catalog | Guest/User | Core | Depends on provider type |
| PUB-06 | Protected Action Authentication Gate | Guest | Core | Browse remains public; protected actions require auth |

## Account / Portal Access

| ID | Interface | Actor | Status | Notes |
|---|---|---|---|---|
| AUTH-01 | Sign In | Guest/User | Core | |
| AUTH-02 | Create Account | Guest | Core | One `User` account per person |
| AUTH-03 | Initial Portal Selection | User | Core | Beneficiary/provider choice is not a permanent account type |
| AUTH-04 | Portal Switch | User | Core | Same account may switch when eligible |

## Beneficiary

| ID | Interface | Actor | Status | Notes |
|---|---|---|---|---|
| BEN-01 | Beneficiary Home / Discovery State | Beneficiary | Derived | Personalized portal state, not a separate account |
| BEN-02 | My Requests | Beneficiary | Derived | Navigation to existing requests |
| BEN-03 | Create Request | Beneficiary | Core | Second discovery path |
| BEN-04 | Request Details | Beneficiary | Core | Request data + status |
| BEN-05 | Provider Responses | Beneficiary | Core | Multiple responses may exist |
| BEN-06 | Compare Provider Responses | Beneficiary | Core | Supports provider selection |
| BEN-07 | Confirm Provider Selection | Beneficiary | Derived | Confirmation state, not a new business capability |

## Provider

| ID | Interface | Actor | Status | Notes |
|---|---|---|---|---|
| PRO-01 | Provider Home / Work State | Provider | Derived | Entry to provider functions |
| PRO-02 | Suitable Requests | Provider | Core | |
| PRO-03 | Published Request Details | Provider | Core | Before response |
| PRO-04 | Create Provider Response | Provider | Core | |
| PRO-05 | Edit / Withdraw Response | Provider | Core | |
| PRO-06 | Manage Provider Profile | Provider | Core | |
| PRO-07 | Manage Portfolio | Service Provider | Core | |
| PRO-08 | Manage Catalog | Product Provider | Core | |
| PRO-09 | Verification Status | Provider | Core | |
| PRO-10 | Verification Submission | Provider | Core | Minimum official ID + selfie with document |
| PRO-11 | Subscription Status | Provider | Core | Collection is external/manual-confirmation path |

## Shared Communication / Transactions

| ID | Interface | Actor | Status | Notes |
|---|---|---|---|---|
| SH-01 | Conversations List | User | Derived | Navigation to existing chats |
| SH-02 | Private Chat | Beneficiary/Provider | Core | Chat alone does not create a transaction |
| TRX-01 | Direct Transaction Start Confirmation | Other Party | Core | Required on direct-search route |
| TRX-02 | Transaction Details | Both Parties | Core | Central transaction state |
| TRX-03 | My Transactions | User | Derived | Navigation to current/history transactions |
| INV-01 | Create / Revise Invoice | Provider | Core | Invoice required for successful completion |
| INV-02 | Invoice Review | Beneficiary | Core | Approve / request revision / complaint path |
| RAT-01 | Rate Provider | Beneficiary | Core | After `Completed` |
| RAT-02 | Rate Beneficiary | Provider | Core | After `Completed`; separate path |
| SAFE-01 | Block User | User | Core | May be a dialog/sheet instead of full page |
| SAFE-02 | Report User / Content | User | Core | May be a dialog/sheet instead of full page |

## Administration

| ID | Interface | Actor | Status | Notes |
|---|---|---|---|---|
| ADM-01 | Admin Work Queue / Entry | Authorized Admin | Derived | Unified navigation only; no invented analytics |
| ADM-02 | Verification Requests | Authorized Admin | Core | |
| ADM-03 | Verification Review | Authorized Admin | Core | Final decision remains human |
| ADM-04 | Reports / Flags Queue | Authorized Admin | Core | |
| ADM-05 | Report / Complaint Review | Authorized Admin | Core | Policy enforcement only |
| ADM-06 | Subscription Records | Authorized Admin | Core | |
| ADM-07 | Subscription Confirmation | Authorized Admin | Core | Manual/external collection confirmation |

## Explicitly Excluded UI

Do not design these as MVP interfaces unless a higher source changes:

- Payment gateway / wallet / escrow.
- Deposit amount, payment status, refund lifecycle.
- Separate Beneficiary Account and Provider Account models.
- Independent Agreement screen/entity.
- Generic `Offers` flow replacing Provider Responses.
- Delivery-management UI operated by YADD.
- Admin analytics dashboards not supported by requirements.

## Current Count

This working inventory contains approximately **42 interface/state entries**. This does **not** imply 42 full standalone pages. During wireframing, entries may appropriately become tabs, sheets, dialogs, empty/error/loading states, or sections inside a larger screen while preserving traceability.

## Next Work

1. Reconcile each entry to exact FR / Use Case / Decision references.
2. Build user flows in `03-user-flows.md`.
3. Identify merge candidates without losing functional traceability.
4. Mark open-policy-dependent screens as `Needs Verification` before high-fidelity design.