# YADD Use Case Diagrams — Working Package

> **Status:** `WORKING PACKAGE — NOT BASELINED — SYNCHRONIZED THROUGH DEC-091 — RENDER-VERIFIED 2026-09-19`
>
> **Model:** One YADD Use Case Model presented as one overview and four focused views for repository readability.

## Source basis

This package is derived from the current project sources in authority order:

1. `docs/00-governance/02-decision-register.md`
2. `docs/03-analysis/05-SRS.md`
3. `docs/03-analysis/06-business-rules.md`
4. `docs/03-analysis/07-lifecycles.md`
5. `docs/03-analysis/08-use-cases.md`
6. `docs/03-analysis/10-UML.md`
7. `docs/03-analysis/13-traceability-matrix.md`

The diagrams do not create new requirements or decisions. They visualize the currently approved/analyzed Use Case semantics and remain subordinate to the sources above.

## Views

| File | Purpose |
|---|---|
| `00-main-overview.md` | High-level system overview: actors and major YADD goals. |
| `01-public-access-discovery.md` | Guest/public discovery, authentication/recovery entry points and direct inquiry. |
| `02-request-provider-response.md` | Published Request lifecycle, expiry/republish, Provider Responses, comparison and selection. |
| `03-transaction-invoice-rating.md` | Direct transaction start, cancellation, final invoice, complaint and ratings. |
| `04-provider-management-verification-safety.md` | Provider profile management, Service-only identity verification, Provider subscription renewal/admin confirmation, and safety administration. |

These are **views of the same Use Case Model**, not five independent models.

## Repository rendering convention

The editable repository source is Markdown + Mermaid. Mermaid `flowchart` syntax is used to keep every view directly readable/renderable on GitHub while preserving the approved Use Case semantics:

- rounded nodes = Use Cases;
- dark rectangular nodes = external Actors;
- blue system boundary = `YADD System`;
- pale yellow nodes = included system behavior, not independent Actor goals;
- solid lines = Actor associations;
- dotted arrows labeled `«include»` / `«extend»` = approved UML relationships only.

The Mermaid presentation is a working visual source. If the final academic report requires stricter graphical UML notation or print tuning, the same semantics may be redrawn/exported in PlantUML, draw.io, or another approved tool without changing the model.

## Modeling rules preserved

- Diagram labels are English only — DEC-072.
- Main Actors: `Guest`, `Beneficiary`, `Provider`, `YADD Administrator` — DEC-067 as updated by DEC-077.
- Guest is unauthenticated and can only use public discovery capabilities; protected actions require authentication — DEC-077.
- Authentication is a precondition, not a mechanical `<<include>>` on every protected Use Case.
- `Service Provider` and `Product Provider` remain valid Provider specializations but are omitted from these views unless specialization adds information.
- `Request → Provider Response → Selection → Transaction` is preserved.
- Chat alone never creates a Transaction.
- Ratings are available only after `Transaction = Completed`.
- `Block User` and `Report User / Content` are separate concepts; Unblock restores future interaction only.
- User-facing location UI exposes Neighborhood only; District remains internal/derived while retained in the underlying data model.
- Generic Report requires Reason, while Description is not universally mandatory; Transaction Complaint requires Reason + Description.
- Expired Subscription preserves Provider Portal and ongoing Transaction access but blocks new Provider Responses and new Direct Search Transactions.
- Administrative complaint review does not grant financial/commercial settlement authority.
- No unresolved numeric policy or implementation detail is invented in these diagrams.

## Relationship source

Only the `include` / `extend` relationships explicitly documented in `docs/03-analysis/08-use-cases.md` and synchronized in `docs/03-analysis/10-UML.md` are shown. Lifecycle dependencies such as authentication, `Completed` before rating, or an existing submission before administrative review remain preconditions rather than artificial UML relationships.
