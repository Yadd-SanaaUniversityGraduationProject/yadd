# YADD User Flows — Working Draft

> **Status:** NOT STARTED / STRUCTURE ONLY
>
> This file will document complete user flows derived from approved requirements and current interface hierarchy. It must not invent business rules.

## Planned Core Flows

1. Guest discovery and protected-action authentication gate.
2. Beneficiary direct-search route.
3. Beneficiary request-publication route.
4. Provider response route.
5. Transaction → invoice → completion → rating.
6. Provider verification submission and human review.
7. Safety: block/report/complaint where applicable.
8. Subscription status and authorized confirmation.

## Flow Documentation Template

For each flow record:

- Flow ID.
- Goal.
- Primary actor.
- Preconditions.
- Entry point.
- Ordered screens/states.
- Main success path.
- Alternative/error paths.
- Authentication/authorization boundaries.
- Related FR / Use Case / Decision.
- Open policy dependencies.
- UX risks / validation needs.

## Governance Constraint

If a flow requires behavior not supported by the Decision Register, SRS, Business Rules, or approved Use Cases, mark it `Needs Verification` rather than filling the gap by design assumption.