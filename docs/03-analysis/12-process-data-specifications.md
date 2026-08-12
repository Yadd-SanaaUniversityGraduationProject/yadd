# Process, Data Flow & Data Store Specifications

> **الحالة:** `DRAFT`

## Processes

| ID | Process | Inputs | Outputs | Stores | Related FR |
|---|---|---|---|---|---|
| P1 | Manage Service Request | request details | request status | Requests | FR-005/006 |
| P2 | Provider Discovery | request/category/area | eligible provider view | Requests/Provider profiles | FR-003/006 |
| P3 | Manage Offers | offer data | offer/status | Offers | FR-007/008 |
| P4 | Record Agreement | accepted offer | agreement | Agreements | FR-009 |
| P5 | Manage Invoice | invoice/response | invoice status | Invoices | FR-010..012 |
| P6 | Manage Review | rating/comment TBD | review | Reviews | FR-013/014 |

## Data Stores — Conceptual

| ID | Store | Purpose | Open Questions |
|---|---|---|---|
| D1 | Users/Profiles | identity/account/provider profile | Role model |
| D2 | Requests | service request lifecycle | BUS-Q03 |
| D3 | Offers | provider offers | BUS-Q04 |
| D4 | Agreements | accepted offer / agreed terms | price-lock rules |
| D5 | Invoices | invoice lifecycle | BUS-Q05 |
| D6 | Reviews | transaction-linked reviews | BUS-Q06 |
| D7 | Catalog/Portfolio | provider work/products | product workflow |

## Data Flow Naming Rule

سمّ التدفق باسم البيانات (`Offer Details`) لا باسم الإجراء (`Submit Offer`). يجب تحديث DFD النهائي بعد حسم الحقول وقواعد الحياة.
