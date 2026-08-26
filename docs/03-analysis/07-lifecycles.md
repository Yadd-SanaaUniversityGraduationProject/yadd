# Lifecycles & State Machines

> **الحالة:** `PARTIALLY ANALYZED`
>
> يعكس هذا الملف القرارات حتى 2026-08-26. القيم الزمنية والـthresholds المفتوحة لا تفترض.

## 1. Published Request Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Open: publish request
    Open --> Open: beneficiary confirms still needed
    Open --> Matched: beneficiary selects provider response
    Open --> ClosedByBeneficiary: no longer needed
    Open --> Expired: inactivity policy reached
    Matched --> [*]
    ClosedByBeneficiary --> [*]
    Expired --> [*]
```

- `Matched` يعني أن الطلب توقف عن استقبال استجابات جديدة وأن المعاملة الرسمية بدأت مع المقدم المختار.
- إغلاق الطلب قبل اختيار مقدم ليس Transaction Cancellation.
- مدة عدم النشاط وتوقيت/عدد التذكيرات: `REQ-EXP-Q01`.

## 2. Provider Response Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Submitted
    Submitted --> Selected: beneficiary selects provider
    Submitted --> NotSelected: another provider selected / request closed
    Submitted --> Withdrawn: provider withdraws before selection
    Selected --> [*]
    NotSelected --> [*]
    Withdrawn --> [*]
```

## 3. Communication and Transaction Start

### Request route

```text
Open Request → Responses → Inquiry/Chat → Beneficiary Selects Provider → Active Transaction
```

اختيار المقدم يغلق الطلب أمام عروض جديدة ويجعل الاستجابات الأخرى `NotSelected`.

### Direct-search route

```text
Search → Provider Profile → Inquiry/Chat → Both Agree to Start → Active Transaction
```

المحادثة وحدها ليست Transaction.

## 4. Transaction Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Active
    Active --> Cancelled: cancellation with recorded reason
    Active --> AwaitingInvoice: provider sends final invoice
    AwaitingInvoice --> AwaitingInvoice: no response / reminders
    AwaitingInvoice --> RevisionRequested: beneficiary requests revision
    RevisionRequested --> AwaitingInvoice: provider sends revised invoice
    RevisionRequested --> Disputed: unresolved issue reported
    AwaitingInvoice --> Completed: beneficiary approves invoice
    Completed --> RatingRequired
    RatingRequired --> Closed: beneficiary submits provider rating
    Cancelled --> [*]
    Disputed --> [*]
    Closed --> [*]
```

- لا يوجد Auto-Approval للفاتورة.
- بعد بدء المعاملة، الإلغاء يحتاج سببًا مسجلًا.
- عدة Transactions قد تكون Active للمستخدم بالتوازي؛ الحد الرقمي غير معتمد.

## 5. Invoice Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> PendingCustomerApproval: provider sends invoice
    PendingCustomerApproval --> Approved: beneficiary approves
    PendingCustomerApproval --> PendingCustomerApproval: reminder / no response
    PendingCustomerApproval --> RevisionRequested: beneficiary requests revision + note
    RevisionRequested --> Draft: provider revises
    RevisionRequested --> Disputed: unresolved complaint
    Approved --> Archived
    Archived --> [*]
```

`Approved` يغلق العمل المالي التوثيقي للمعاملة داخل YADD، لكنه لا يثبت دفعًا إلكترونيًا. سياسة التصعيد عند عدم الاستجابة الطويلة: `INV-PENDING-Q01`.

## 6. Rating Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Locked
    Locked --> Required: invoice approved / transaction completed
    Required --> Submitted: beneficiary rates provider 1-5 stars
    Submitted --> Final
    Final --> [*]
```

- النجوم إلزامية؛ التعليق النصي اختياري.
- لا تقييم للمستفيد من المقدم في النموذج الحالي.
- لا Double-Blind ولا مهلة 14 يومًا في القرار الحالي.
- لا يفتح التقييم لمعاملة ملغاة أو غير مكتملة.

## 7. Product-specific Fulfillment Note

```mermaid
flowchart LR
    A[Active transaction] --> B{Fulfillment method}
    B --> C[Pickup]
    B --> D[Provider-arranged delivery]
    D --> E[Handled outside YADD]
    C --> F[Final invoice]
    E --> F
```

YADD لا يدير مندوب توصيل أو تتبع شحنة. موضوع العربون يبقى مفتوحًا في `DEP-Q02` ولا يضاف له lifecycle مالي حتى قرار المشرف.
