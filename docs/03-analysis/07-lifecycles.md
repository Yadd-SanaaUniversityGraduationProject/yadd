# Lifecycles & State Machines

> **الحالة:** `PARTIALLY ANALYZED`
>
> يعكس هذا الملف القرارات الحالية مع إبقاء القيم الزمنية والـthresholds والسياسات المفتوحة دون افتراض.

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

- Provider Response قد تتضمن سعرًا مقترحًا وملاحظة و`RequiresDeposit` نعم/لا.
- لا توجد حالة Payment/Deposit مالية مرتبطة بالاستجابة.

## 3. Communication and Transaction Start

### Request route

```text
Open Request → Provider Responses → Inquiry/Chat → Beneficiary Selects Provider → Active Transaction
```

اختيار المقدم يغلق الطلب أمام استجابات جديدة ويجعل الاستجابات الأخرى `NotSelected`.
لا يوجد Agreement entity مستقل في هذا المسار.

### Direct-search route

```text
Search → Provider Profile/Portfolio → Inquiry/Chat → Both Agree to Start → Active Transaction
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
    Completed --> ProviderRatingRequired
    ProviderRatingRequired --> ProviderRatingSubmitted: beneficiary rates provider
    ProviderRatingSubmitted --> BeneficiaryRatingOffered
    BeneficiaryRatingOffered --> BeneficiaryRatingSubmitted: provider chooses to rate
    BeneficiaryRatingOffered --> Closed: provider skips optional rating
    BeneficiaryRatingSubmitted --> Closed
    Closed --> [*]
    Cancelled --> [*]
    Disputed --> [*]
```

- لا يوجد Auto-Approval للفاتورة.
- بعد بدء المعاملة، الإلغاء يحتاج سببًا مسجلًا.
- عدة Transactions قد تكون Active للمستخدم بالتوازي؛ الحد الرقمي غير معتمد.
- تقييم المستفيد للمقدم إلزامي؛ تقييم المقدم للمستفيد اختياري.
- لا Payment/Refund lifecycle داخل Transaction.

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

### Beneficiary rates Provider — mandatory

```mermaid
stateDiagram-v2
    [*] --> Locked
    Locked --> ProviderRatingRequired: invoice approved / transaction completed
    ProviderRatingRequired --> ProviderRatingSubmitted: beneficiary rates provider 1-5 stars
    ProviderRatingSubmitted --> [*]
```

- النجوم 1–5 إلزامية والتعليق اختياري.
- لا يفتح التقييم لمعاملة ملغاة أو غير مكتملة.

### Provider rates Beneficiary — optional

```mermaid
stateDiagram-v2
    [*] --> Locked
    Locked --> BeneficiaryRatingOffered: transaction completed
    BeneficiaryRatingOffered --> Submitted: provider rates beneficiary
    BeneficiaryRatingOffered --> Skipped: provider skips
    Submitted --> [*]
    Skipped --> [*]
```

- التقييم اختياري ويظهر Prompt بارزًا.
- المؤشرات: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون؛ كل مؤشر 1–5.
- التعليق اختياري.
- النتائج تدخل سجل تعامل المستفيد الذي يظهر فقط لمقدمي الخدمات/المنتجات في سياق تعامل مشروع.
- لا ينتج عنه منع أو عقوبة آلية في MVP.

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

YADD لا يدير مندوب توصيل أو تتبع شحنة. إذا كان Provider Response يتطلب عربونًا، يعرض النظام الدلالة فقط؛ مبلغ العربون والدفع والاسترداد خارج YADD ولا يملكان lifecycle داخل النظام.
