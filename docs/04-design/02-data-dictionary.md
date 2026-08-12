# Data Dictionary

> **الحالة:** `SKELETON`

## Template

| Entity | Field | Type | Required | Key/Constraint | Description | Source |
|---|---|---|---|---|---|---|
| ServiceRequest | RequestId | TBD | Yes | PK | معرف الطلب | ERD |
| ServiceRequest | Status | TBD | Yes | lifecycle constraint | حالة الطلب | BUS-Q03 |
| Offer | ProposedPrice | TBD | TBD | non-negative TBD | سعر العرض | BUS-Q04 |
| Agreement | AgreedPrice | TBD | Yes | rule TBD | السعر المتفق عليه | BR-003 |
| Invoice | Amount | TBD | Yes | rule TBD | قيمة الفاتورة | BUS-Q05 |
| Review | Rating | TBD | Yes | range TBD | التقييم | BUS-Q06 |

`TBD` متعمد حتى لا نخترع قيودًا قبل اعتماد قواعد العمل.
