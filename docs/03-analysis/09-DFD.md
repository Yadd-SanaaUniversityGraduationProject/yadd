# Data Flow Diagrams

> **الحالة:** `DRAFT / SUBJECT TO GOV-Q02`
>
> هيكل 1447 يطلب DFD، بينما دليل المشاريع يتضمن تنبيهًا حول عدم خلط منهجيات التحليل. يعتمد الاستخدام النهائي على قرار المشرف.

## Context DFD — Working View

```mermaid
flowchart LR
    C[Customer] -->|profile, request, acceptance, invoice response, review| Y((YADD System))
    Y -->|results, offers, agreement, invoice, history| C
    P[Service Provider] -->|profile, portfolio, offer, invoice, review| Y
    Y -->|requests, agreement status, invoice status, reviews| P
    H[Home Producer/Seller] -->|profile, product catalog| Y
    Y -->|discovery/orders TBD| H
    A[Administrator] -->|administrative actions| Y
    Y -->|reports/alerts TBD| A
```

> تدفق "products/orders" غير مكتمل؛ وثائق المشروع لم تحسم دورة شراء المنتجات كما حسمت فكرة طلب الخدمة. يجب عدم افتراض Shopping Cart/Order/Delivery.

## Level 1 — Service Transaction Candidate

```mermaid
flowchart LR
    C[Customer] --> P1((1.0 Manage Service Request))
    P1 --> D1[(Requests)]
    D1 --> P2((2.0 Match/Discover Providers))
    P2 --> SP[Service Provider]
    SP --> P3((3.0 Manage Offers))
    P3 --> D2[(Offers)]
    D2 --> P4((4.0 Record Agreement))
    C --> P4
    P4 --> D3[(Agreements)]
    SP --> P5((5.0 Manage Invoice))
    D3 --> P5
    P5 --> D4[(Invoices)]
    C --> P5
    D4 --> P6((6.0 Manage Reviews))
    P6 --> D5[(Reviews)]
```

كل Process/Data Store يوثق لاحقًا في `12-process-data-specifications.md`.
