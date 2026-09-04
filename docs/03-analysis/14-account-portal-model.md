# Account & Portal Model

> **Status:** `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-04`
>
> **Decision basis:** DEC-008..011, DEC-029/030, DEC-034/035.

## 1. Core Account Decision

YADD uses **one User account per person**. Beneficiary and Provider are not separate account types.

On first use, the person may choose which portal to start with:

1. `Beneficiary Portal`
2. `Provider Portal`

This choice controls onboarding/start experience only; it does not create a permanent account type.

## 2. Beneficiary Portal

A User may use Beneficiary capabilities without owning a Provider Profile.

Core Beneficiary capabilities include discovery, Request creation, communication, provider selection/transaction start, invoice review, provider rating, Block/Report, subject to the related business rules.

## 3. Provider Portal

Provider capabilities use a `Provider Profile` attached to the same User account.

Current rules:
- a User may have zero or one Provider Profile;
- Provider Profile may activate `Service Activity`, `Product Activity`, or both;
- Provider Profile must pass Provider Verification before provider submission functions;
- submitting new Provider Responses additionally requires an Active Subscription.

## 4. Portal Switching

- a Beneficiary may create/complete a Provider Profile from the same account;
- after Provider Profile activation, the User may switch between Beneficiary and Provider portals;
- a User who started as Provider may use Beneficiary capabilities without creating another account.

## 5. Conceptual Model

```mermaid
flowchart TD
    START([First Use]) --> CHOOSE{Start As}
    CHOOSE -->|Beneficiary| U[Create or Use User Account]
    CHOOSE -->|Provider| U
    U --> B[Beneficiary Portal]
    U --> HAS{Provider Profile Active?}
    HAS -->|No| CREATE[Create or Complete Provider Profile]
    CREATE --> VERIFY[Provider Verification]
    VERIFY -->|Approved| P[Provider Portal]
    HAS -->|Yes| P
    B <-->|Switch Portal| P
```

All labels in the final academic diagram must be English according to DEC-072.

## 6. Approved Rules

| ID | Rule | Status |
|---|---|---|
| ACC-BR-01 | One User account per person. | `ANALYZED_APPROVED` |
| ACC-BR-02 | First-use choice selects start portal, not permanent account type. | `ANALYZED_APPROVED` |
| ACC-BR-03 | Provider Profile is attached to User, not a separate account. | `ANALYZED_APPROVED` |
| ACC-BR-04 | Switching to Beneficiary Portal never needs another account. | `ANALYZED_APPROVED` |
| ACC-BR-05 | Beneficiary may start Provider Profile creation from the same account. | `ANALYZED_APPROVED` |
| ACC-BR-06 | Provider submission functions require an activated/verified Provider Profile. | `ANALYZED_APPROVED` |
| ACC-BR-07 | Provider Profile may activate Service Activity, Product Activity, or both. | `ANALYZED_APPROVED` |

## 7. Verification Detail Boundary

Provider Verification itself is approved and includes, at minimum, an official identity document plus a personal photo with the document and final human review.

Still open and **not to be invented in diagrams**:
- exact accepted identity-document types/sides;
- retention period for identity/verification data;
- activity categories requiring additional professional licensing.

These do not alter the account/portal structure.

## 8. Diagram Impact

For current diagrams:
- do not create separate `Customer Account` and `Provider Account` entities;
- model `Beneficiary` and `Provider` as behavioral actors using the same User identity;
- use `USER 1 → 0..1 PROVIDER_PROFILE` conceptually;
- Service Provider/Product Provider may appear as specializations of the general Provider actor where useful;
- no Guest actor is approved.