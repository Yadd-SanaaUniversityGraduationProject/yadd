# Conceptual ERD — YADD

> **الحالة:** `DRAFT — NOT DATABASE DESIGN`
>
> هذا ERD مفاهيمي لا يعد Schema نهائيًا. يجب تحديثه بعد اعتماد SRS وBusiness Rules.

```mermaid
erDiagram
    USER ||--o{ USER_ROLE : has
    ROLE ||--o{ USER_ROLE : assigned
    USER ||--o| PROVIDER_PROFILE : may_have
    PROVIDER_PROFILE ||--o{ PORTFOLIO_ITEM : publishes
    USER ||--o{ SERVICE_REQUEST : creates
    CATEGORY ||--o{ SERVICE_REQUEST : classifies
    AREA ||--o{ SERVICE_REQUEST : locates
    SERVICE_REQUEST ||--o{ OFFER : receives
    PROVIDER_PROFILE ||--o{ OFFER : submits
    OFFER ||--o| AGREEMENT : selected_as
    AGREEMENT ||--o{ INVOICE : has
    AGREEMENT ||--o{ REVIEW : enables
    USER ||--o{ REVIEW : writes
    USER ||--o{ REVIEW : receives

    USER {
      uuid user_id PK
      string status
    }
    ROLE {
      int role_id PK
      string name
    }
    USER_ROLE {
      uuid user_id FK
      int role_id FK
    }
    PROVIDER_PROFILE {
      uuid provider_profile_id PK
      uuid user_id FK
      string provider_type
      string status
    }
    CATEGORY {
      int category_id PK
      string name
      string type
    }
    AREA {
      int area_id PK
      string name
      int parent_area_id FK
    }
    SERVICE_REQUEST {
      uuid request_id PK
      uuid customer_id FK
      int category_id FK
      int area_id FK
      string status
    }
    OFFER {
      uuid offer_id PK
      uuid request_id FK
      uuid provider_profile_id FK
      decimal proposed_price
      string status
    }
    AGREEMENT {
      uuid agreement_id PK
      uuid offer_id FK
      decimal agreed_price
      string status
    }
    INVOICE {
      uuid invoice_id PK
      uuid agreement_id FK
      decimal amount
      string status
    }
    REVIEW {
      uuid review_id PK
      uuid agreement_id FK
      uuid author_user_id FK
      uuid target_user_id FK
      int rating
    }
    PORTFOLIO_ITEM {
      uuid item_id PK
      uuid provider_profile_id FK
      string item_type
    }
```

## عناصر لم تدخل عمدًا

- AI verification entities: محجوبة حتى AI-Q01.
- Subscription/payment entities: محجوبة حتى SUB-Q01/PAY-Q01.
- Product order/cart/delivery: لا توجد دورة عمل معتمدة لها بعد.
- Media storage details: تصميم تقني لاحق.

هذا يمنع الـERD من تثبيت Features لم تعتمد.
