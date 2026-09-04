# In-App Communication Model

> **الحالة:** `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-04`
>
> **القرارات المرجعية:** DEC-023/024/046/047/053/055/069.

## 1. Core Decision

YADD provides private in-app communication between Beneficiary and Provider. Communication may begin **before a Transaction** for inquiry and negotiation. Chat alone does not create a Transaction.

After Transaction starts, the same private context may continue for execution details. Basic in-app communication does not require exposing a phone number to the other party.

## 2. Communication Routes

### Published Request Route

`Request → Provider Response → Inquiry / Chat → Beneficiary Selects Provider → Active Transaction`

Provider selection closes the Request to new responses and starts the Transaction with the selected Provider. No extra Agreement entity or mandatory agreement form exists in this route.

### Direct Search Route

`Search → Provider Profile → Inquiry / Chat → Request Transaction Start → Other Party Confirmation → Active Transaction`

Rules:
- either Beneficiary or Provider may send `Request Transaction Start`;
- YADD asks the other party for confirmation;
- only explicit confirmation creates `Active Transaction`;
- rejection or no confirmation leaves the conversation without a Transaction.

## 3. MVP Communication Scope

Minimum supported concepts:
- text messages;
- images/attachments related to the request or execution when needed;
- message notifications;
- conversation retention according to privacy/retention policy;
- Block + Report.

Voice/video calls are not part of the current core model. Voice messages remain `PROPOSED` and must not appear as an approved use case unless separately approved.

## 4. Communication, Negotiation and Invoice

- price/details/changes may be discussed in chat;
- MVP has no standalone Change Order entity/process;
- conversation may be used as supporting evidence in a complaint;
- the approved final invoice is the authoritative final record of items and prices inside YADD.

## 5. External Communication

YADD does not claim to prevent external communication. External discussions are not automatically part of YADD's official record; if they change the final items/prices, the agreed result must be reflected in the final invoice to become part of YADD's transaction record.

## 6. Approved Rules

- `COM-BR-01`: Private inquiry is allowed before Transaction.
- `COM-BR-02`: Chat alone does not create Transaction.
- `COM-BR-03`: Request route starts Transaction when Beneficiary selects Provider.
- `COM-BR-04`: Direct Search starts Transaction only after one party sends `Request Transaction Start` and the other confirms.
- `COM-BR-05`: Basic in-app communication does not require phone-number exposure.
- `COM-BR-06`: Messages/attachments follow privacy and retention policy.
- `COM-BR-07`: Conversation may support complaint review.
- `COM-BR-08`: Approved final invoice is the final YADD record of items/prices.
- `COM-BR-09`: Block + Report is supported; reports require review.

## 7. Diagram Guidance

For Activity/Sequence diagrams, never replace the Direct Search start flow with a vague `Both Agree to Start` action. Show the two explicit interactions:

`Request Transaction Start → Other Party Confirmation → Active Transaction`.

The exact UI control used for requesting/confirming start is a design detail and does not block analysis diagrams.