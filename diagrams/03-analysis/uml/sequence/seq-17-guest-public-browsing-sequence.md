# Sequence 17 — Guest Public Browsing & Protected Action Gate

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 — NOT BASELINED`
>
> **Purpose:** Represents the approved `Guest` public-browsing boundary and the Authentication gate for protected actions. This is a documentation/interaction decomposition of approved Guest behavior; it does not create a new account type or domain entity.

## Source basis

- `DEC-077` — Guest public browse/search/view + protected-action Authentication gate.
- `DEC-031` and current approved Location UI convention — Neighborhood is user-facing; District is derived internally.
- `FR-GST-01..06`, `FR-003`.
- `UC-00 — Browse Public Provider Information`.
- `PUB-01..06` approved UI contracts.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor G as Guest
    participant UI as PublicUI «boundary»
    participant DC as DiscoveryController «control»
    participant PP as ProviderProfile «entity»
    participant AG as AuthenticationGate «control»

    G->>UI: openPublicDiscovery()
    UI-->>G: showPublicHome()

    G->>UI: searchProviders(category, neighborhood)
    UI->>DC: searchProviders(category, neighborhood)
    DC->>DC: deriveDistrict(neighborhood)
    DC->>PP: findPublicProviders(category, district, neighborhood)
    PP-->>DC: publicProviderResults
    DC-->>UI: publicSearchResults
    UI-->>G: showSearchResults()

    opt Guest opens a Provider Profile
        G->>UI: openProviderProfile(providerId)
        UI->>DC: getPublicProviderProfile(providerId)
        DC->>PP: loadApprovedPublicProfile()
        PP-->>DC: publicProfileData
        DC-->>UI: publicProfileData
        UI-->>G: showProviderProfile()

        opt Guest views Portfolio / Catalog
            G->>UI: viewPortfolioOrCatalog()
            UI->>DC: getPublicShowcase(providerId)
            DC->>PP: loadPublicDisplayCopies()
            PP-->>DC: publicShowcaseItems
            DC-->>UI: publicShowcaseItems
            UI-->>G: showPortfolioOrCatalog()
        end
    end

    opt Guest attempts a protected action
        G->>UI: chooseProtectedAction()
        UI->>AG: requireAuthentication(actionContext)
        AG-->>UI: authenticationRequired()
        UI-->>G: showLogInOrCreateAccountGate()

        alt Guest chooses Log In
            G->>UI: chooseLogIn()
            UI-->>G: openLogIn()
        else Guest chooses Create Account
            G->>UI: chooseCreateAccount()
            UI-->>G: openCreateAccount()
        else Guest returns to browsing
            G->>UI: backToBrowsing()
            UI-->>G: restorePublicBrowsingContext()
        end
    end

    Note over G,PP: Public data excludes phone/direct private contact, verification artifacts, subscription internals, transactions and reports
    Note over G,AG: Guest is an unauthenticated actor, not a stored GUEST account/entity
```

## Scope boundary

- Public browse/search/profile/showcase viewing only.
- Protected actions such as Request creation, private Chat, Transaction, Rating, Block and Report require Authentication.
- The UI redirect is not the security boundary; Backend/API authorization must still enforce protected operations.
- Exact return-to-intended-action behavior after Authentication remains an interaction-detail policy and is not invented here.
