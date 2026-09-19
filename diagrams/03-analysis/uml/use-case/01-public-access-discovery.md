# Use Case View 01 — Public Access & Discovery

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-091`
>
> **Purpose:** Focused view of Guest/public discovery, authentication entry points and authenticated direct inquiry.

## Source basis

- `UC-00 — Browse Public Provider Information`
- `UC-01 — Search and Inquire Directly`
- `UC-10 — Manage Portfolio / Catalog` (public viewing aspect only)
- DEC-036/046/064/077/078/080
- Approved relationship table in `docs/03-analysis/08-use-cases.md`.

## Diagram

```mermaid
flowchart LR
    G["Guest"]:::actor
    B["Beneficiary"]:::actor

    subgraph SYS["YADD System"]
        direction TB

        subgraph AUTH["Authentication Entry"]
            direction LR
            LOGIN(["Log In"]):::usecase
            REGISTER(["Create Account"]):::usecase
            FORGOT(["Forgot / Reset Password"]):::usecase
        end

        subgraph DISCOVERY["Public Discovery"]
            direction LR
            SEARCH(["Search Providers"]):::usecase
            PROFILE(["View Provider Profile"]):::usecase
            SHOWCASE(["View Portfolio / Catalog"]):::usecase
        end

        subgraph INTERACTION["Authenticated Interaction"]
            CHAT(["Communicate / Inquire"]):::usecase
        end
    end

    P["Provider"]:::actor

    G --- LOGIN
    G --- REGISTER
    G --- FORGOT
    G --- SEARCH
    G --- PROFILE
    G --- SHOWCASE

    B --- SEARCH
    B --- PROFILE
    B --- CHAT
    CHAT --- P

    PROFILE -.->|«extend»| SEARCH
    SHOWCASE -.->|«extend»| PROFILE
    CHAT -.->|«extend»| PROFILE

    classDef actor fill:#FFFFFF,stroke:#111827,stroke-width:1.8px,color:#111827,font-weight:bold;
    classDef usecase fill:#F7FBFF,stroke:#3F6FA5,stroke-width:1.4px,color:#111827;

    style SYS fill:#FFFFFF,stroke:#2F75B5,stroke-width:2.2px
    style AUTH fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style DISCOVERY fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
    style INTERACTION fill:#F9FAFB,stroke:#CBD5E1,stroke-width:1px
```

## Semantic constraints

- Guest may search, open the public Provider Profile and view public Portfolio/Catalog content.
- Public Provider Profile excludes phone/direct private-contact data and sensitive Verification, Subscription, Transaction and Report data.
- `Communicate / Inquire` requires an authenticated user. A Guest attempting a protected CTA is redirected to `Log In` or `Create Account`.
- Authentication is a **precondition**, not an `<<include>>` relationship.
- Returning users may use `Forgot / Reset Password`: phone OTP is primary; verified Email may be an additional recovery channel. No Username, security questions, invented OTP lifetime, resend limit or lockout threshold is introduced.
- **Location UI synchronization:** public search exposes Neighborhood to the user; District is derived internally from the selected Neighborhood.
- The three `<<extend>>` relationships shown above are the approved relationships from the current Use Case model.
