# Lifecycles & State Machines

> **الحالة:** `PARTIALLY ANALYZED`
>
> تم تثبيت نقاط البداية والإغلاق المشتركة، لكن بعض الانتقالات ما تزال محجوبة بأسئلة مفتوحة مثل BUS-Q03 وINV-Q01.

## 1. Core Request / Transaction Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Open: publish request
    Open --> ProviderSelected: beneficiary selects provider response
    ProviderSelected --> InProgress: execution/preparation begins
    InProgress --> AwaitingInvoice: provider creates final invoice
    AwaitingInvoice --> Closed: beneficiary approves invoice
    Closed --> ReviewAvailable
    ReviewAvailable --> [*]

    Open --> Cancelled: cancellation/expiry rule TBD
    ProviderSelected --> Cancelled: cancellation rule TBD
    AwaitingInvoice --> InvoiceIssue: reject/revision rule TBD
    InvoiceIssue --> AwaitingInvoice: revised invoice TBD
    Cancelled --> [*]
```

### نقاط معتمدة

- `Draft → Open`: المستخدم ينشر الطلب.
- `Open → ProviderSelected`: المستخدم يختار مقدمًا واحدًا من الاستجابات.
- `InProgress → AwaitingInvoice`: المقدم ينشئ فاتورة بعد التنفيذ/التجهيز.
- `AwaitingInvoice → Closed`: الفاتورة تعتمد من الطرف المستفيد؛ أصل الإغلاق يعتمد موافقة الطرفين.
- `Closed → ReviewAvailable`: لا يفتح التقييم قبل الإغلاق.

### نقاط غير محسومة

- متى يتحول `ProviderSelected` إلى `InProgress` رسميًا؟
- قواعد الإلغاء والانتهاء.
- ماذا يحدث عند اعتراض المستفيد على الفاتورة.

## 2. Provider Response Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Submitted
    Submitted --> Selected: beneficiary selects response
    Submitted --> NotSelected: another response selected / request closes
    Submitted --> Withdrawn: provider withdraws - rule TBD
    Selected --> [*]
    NotSelected --> [*]
    Withdrawn --> [*]
```

الاستجابة قد تحتوي سعرًا مقترحًا، وفي طلب المنتج قد تحمل `DepositRequired = true`.

## 3. Invoice Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Sent: provider sends invoice
    Sent --> Approved: beneficiary approves
    Sent --> RevisionRequested: TBD - INV-Q01
    RevisionRequested --> Draft: provider revises
    Approved --> Archived: stored in both parties' records
    Archived --> [*]
```

`Approved/Archived` يمثلان الإغلاق الرسمي للمعاملة داخل YADD. لا يعني ذلك إثبات الدفع المالي لأن المدفوعات خارج نطاق النظام.

## 4. Review Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Locked
    Locked --> Available: invoice approved and transaction closed
    Available --> Submitted: party submits rating
    Available --> Skipped: if review remains optional
    Submitted --> [*]
    Skipped --> [*]
```

مهلة التقييم وإمكانية التعديل/الاعتراض تنتظر `RAT-Q01`.

## 5. Product-specific Fulfillment Note

```mermaid
flowchart LR
    A[Provider selected] --> B{Fulfillment method}
    B --> C[Pickup from provider]
    B --> D[Provider-arranged delivery]
    D --> E[Delivery handled outside YADD]
    C --> F[Final invoice]
    E --> F
```

YADD لا يدير مندوب توصيل ولا يتتبع الشحنة. إن وجدت تكلفة توصيل متفق عليها، يمكن إدراجها كبند في الفاتورة.
