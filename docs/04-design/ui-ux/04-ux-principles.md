# YADD UX Principles — Working Baseline

> **Status:** IN PROGRESS — CORE UX PRINCIPLES APPROVED 2026-09-18
>
> These principles govern interaction quality and usability across YADD. They do not create new Business Requirements.

## 1. Evidence and Classification Rule

Do not frame demographic assumptions about Yemeni users as facts.

Any claim about actual user behavior, literacy, or digital skill requires project evidence or usability research.

However, the team has approved a **UX design direction** to make the interface usable for people with **low digital familiarity**. This is a design constraint, not a demographic claim.

## 2. Task-First Hierarchy

- Every screen has one clear primary task.
- Avoid competing primary CTAs.
- Secondary actions must remain visually secondary.
- The interface should make the next valid action obvious without requiring technical knowledge of YADD's internal model.

## 3. Arabic-First RTL

- Arabic interaction hierarchy is RTL.
- Labels, cards, forms, navigation, and directional controls must be designed for RTL from the beginning.
- Do not build LTR layouts and mirror them informally afterward.
- Directional icons must express the correct RTL navigation meaning.

## 4. Low-Digital-Familiarity Resilience — Approved UX Direction

Use visual guidance to reinforce meaning without making the interface dependent on icon interpretation alone.

Rules:

- Important navigation/actions should normally use **icon + clear Arabic label**.
- Icons reinforce the text; they do not replace the text for unfamiliar or consequential actions.
- Use short, concrete Arabic action verbs.
- Reuse the same icon for the same function everywhere.
- Avoid icon-only controls when the meaning is not universally recognizable.
- Do not overload a screen with decorative icons.
- Keep important touch/click targets visually distinct and comfortably sized.

This principle is intended to reduce cognitive load; it is not evidence that every YADD user has low technical skill.

## 5. Icon Semantics and Visual Trust

YADD must not use the common low-quality mockup pattern of unrelated emoji, miscellaneous Unicode symbols, and mixed icon styles.

Mandatory rules:

- Functional icons come from **one coherent vector icon family/style**.
- Emoji are not production UI icons.
- Unicode symbols such as decorative stars, diamonds, squares, or arbitrary glyphs must not be used as substitutes for actual interface icons.
- An icon must have a direct semantic relationship to its action/content.
- Category illustrations/icons use a consistent optical size, stroke/fill language, container treatment, and color logic.
- Do not assign random colors to categories merely to make the screen visually varied.
- Decorative graphics must not look like actionable controls.

## 6. Alignment and Component Predictability

A user should be able to predict where labels, icons, and actions will appear.

- Comparable controls use the same alignment model across all screens.
- Button icon and label are one component group; they are not independently positioned.
- App-bar actions occupy defined slots; do not place icons wherever visual space remains.
- Cards follow one internal alignment/grid language.
- Text alignment must follow the component's RTL specification rather than arbitrary per-screen placement.

## 7. Wireflow Scenario Coherence

A wireflow/mockup is an explanatory artifact and must tell a logically coherent scenario.

For static search flows:

- the selected search/filter criteria must be visible or unambiguously summarized;
- every displayed result must satisfy the active scenario;
- do not mix unrelated Service/Product categories as if they resulted from a single narrow search;
- if a result set is intentionally broad/unfiltered, the UI must make that state explicit;
- do not invent factual-looking result counts, ratings, provider identities, or locations;
- unresolved real location data must remain clearly placeholder/neutral until verified.

This is a **presentation/evidence-quality rule**, not a new search algorithm.

## 8. Clear State Boundaries

Clearly distinguish:

- Guest vs authenticated actions;
- Chat vs Transaction;
- Request vs Transaction;
- Invoice review vs payment;
- Pending / blocked / expired / completed states.

Visual similarity must never blur different business states.

## 9. Privacy-Safe Public Presentation

Public screens must not expose data that belongs to private/account/verification/transaction contexts.

Privacy boundaries remain governed by the approved Screen Contracts and higher project sources.

## 10. Error / Empty / Pending Clarity

Loading, empty, error, pending, rejected, expired, and disabled states should explain:

1. what happened;
2. what the user can do next.

Avoid technical system language when a plain-language message is sufficient.

## 11. Low-Connectivity Awareness

Where implementation supports it, interaction design should avoid unnecessary heavy media and repeated user work.

Exact offline/caching behavior remains an engineering concern unless separately specified.

## 12. Usability Validation Rule

Visual polish is not sufficient evidence of usability.

Before final production freeze, usability validation should specifically check:

- whether users understand the primary CTA;
- whether icons are correctly interpreted;
- whether search criteria and results are logically understood;
- whether protected-action/authentication boundaries are understood;
- whether users can distinguish Request, Chat, Transaction, and Invoice;
- whether RTL navigation/action placement is predictable.
