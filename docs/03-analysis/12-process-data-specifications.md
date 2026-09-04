# Process, Data Flow & Data Store Specifications

> **الحالة:** `ANALYZED — SYNCHRONIZED 2026-09-04`
>
> هذه الوثيقة مشتقة من `05-SRS.md`, `06-business-rules.md`, `07-lifecycles.md`, `08-use-cases.md`, و`09-DFD.md`. جميع التسميات داخل المخططات النهائية باللغة الإنجليزية وفق DEC-072.

## 1. Processes — DFD Level 0

| ID | Process | Main Inputs | Main Outputs | Logical Stores | Basis |
|---|---|---|---|---|---|
| 1.0 | Manage Accounts & Provider Profiles | account data, provider profile data, service areas, portfolio/catalog data | account/profile information, portal information | D1, D2, D7 | DEC-008..011/029..036/064 |
| 2.0 | Manage Discovery & Requests | search criteria, request data, request closure | search results, matching requests, request status | D1, D2, D3 | DEC-012..014/031..033/045/048/049 |
| 3.0 | Manage Provider Responses & Communication | provider response data, response edit/withdrawal, messages, provider selection, transaction-start request/confirmation | responses, messages, selection/start result | D3, D4 | DEC-023/046/047/066/069/070 |
| 4.0 | Manage Transactions & Invoices | selected provider, confirmed direct start, cancellation data, invoice/revision data, invoice approval | transaction status, invoice status, completed transaction reference | D4, D5 | DEC-015/025/048/050/055/066/069/071 |
| 5.0 | Manage Ratings & Reputation | provider rating, beneficiary behavioral rating | provider reputation, beneficiary interaction record | D4, D6 | DEC-051/052/063/071 |
| 6.0 | Manage Administration, Verification & Safety | verification submission/decision, subscription updates, reports, moderation actions | verification/subscription/report status, flags, audit information | D1, D7, D8 | DEC-034..043/053/054/064 |

## 2. Logical Data Stores

| ID | Store | Purpose |
|---|---|---|
| D1 | Users & Provider Profiles | User account, Provider Profile and core profile state |
| D2 | Categories & Areas | categories, districts/neighborhoods and service-area reference data |
| D3 | Requests & Provider Responses | Requests and Provider Responses including response status and `RequiresDeposit` boolean |
| D4 | Conversations & Transactions | private conversations/messages and Transaction records/status |
| D5 | Invoices | final/revised invoice versions and invoice items |
| D6 | Ratings & Interaction Records | Beneficiary→Provider rating and optional Provider→Beneficiary interaction rating |
| D7 | Portfolio / Catalog | Showcase/Portfolio/Catalog metadata and display media references |
| D8 | Verification / Subscription / Reports & Admin Audit | verification cases, subscription records, reports/flags and administrative audit information |

## 3. Process Constraints Relevant to Diagrams

### 1.0 Manage Accounts & Provider Profiles
- One `User` account per person.
- A User may have zero or one `Provider Profile`.
- Provider Profile may activate Service Activity, Product Activity, or both.
- Provider submission functions require required verification; response submission also requires Active Subscription.

### 2.0 Manage Discovery & Requests
- Two discovery routes exist: Direct Search and Create Request.
- Request location uses District + Neighborhood; exact address/GPS is not public.
- Request expiry exists in principle; exact inactivity/reminder timing remains `REQ-EXP-Q01` and must not be invented in a diagram.

### 3.0 Manage Provider Responses & Communication
- Canonical term is `Provider Response`, not Offer.
- One active Provider Response per Provider per Request.
- Provider may edit or withdraw the response while Request is Open and no Provider has been selected.
- `RequiresDeposit` is Yes/No only; no deposit amount or payment state exists in YADD.
- Chat alone does not create a Transaction.
- Request route: Beneficiary selection starts the Transaction.
- Direct Search route: either party sends `Request Transaction Start`; the other party must confirm before `Active Transaction` is created.

### 4.0 Manage Transactions & Invoices
- No standalone `Agreement` process or store exists.
- Transaction may start from Request selection or confirmed Direct Search start.
- Invoice may be Approved or Revision Requested; no Auto-Approval.
- Invoice approval sets Transaction to `Completed`.
- `Completed` is the successful terminal Transaction state. Ratings occur after it and do not create `Closed` Transaction status.
- Payment/Refund/Escrow are outside YADD.

### 5.0 Manage Ratings & Reputation
- Beneficiary→Provider rating is required after Completed: 1–5 stars, optional comment.
- Provider→Beneficiary rating is optional after Completed: three 1–5 behavioral indicators plus optional comment.
- Ratings are Post-Transaction operations and never reopen or close the Transaction.

### 6.0 Manage Administration, Verification & Safety
- Verification final decision is human.
- AI may assist and produce Flags but does not issue final high-impact decisions alone.
- Subscription collection is external; YADD records/administratively confirms subscription state.

## 4. Data Flow Naming Rule

Data flows in DFD must be named as **data/noun phrases**, not actions. Examples:

- `Request Data`, not `Create Request`.
- `Provider Response Data`, not `Submit Response`.
- `Transaction Start Request` / `Start Confirmation`, not `Start Transaction` as a data-flow label.
- `Invoice Approval`, `Revision Request`, `Transaction Status`, `Rating Data`.

## 5. Open Items That Do Not Block Core Diagrams

The following must be omitted or shown only generically, without invented numeric values:

- `REQ-EXP-Q01` expiry/reminder timing.
- `INV-PENDING-Q01` long-pending invoice escalation.
- `SAFE-REQ-Q01` abuse thresholds.
- `LOC-DATA-Q01` final geographic seed list and `LOC-OPS-TIME-Q01` timing.
- exact verification document types/retention/licensing.
- detailed AI policy/provider/threshold/retention.
- subscription packages/prices/payment-proof method/expiry operational effects.

These do **not** alter the current Actors, core DFD processes/stores, core Transaction lifecycle, or core ERD relationships.