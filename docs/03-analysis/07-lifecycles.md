# Lifecycles & State Machines

> **الحالة:** `PARTIALLY ANALYZED — SYNCHRONIZED 2026-09-04`
>
> يعكس هذا الملف القرارات الحالية مع إبقاء القيم الزمنية والـthresholds والسياسات المفتوحة دون افتراض.
>
> **Modeling convention:** جميع أسماء الحالات والأفعال داخل المخططات باللغة الإنجليزية وفق DEC-072.

## 1. Published Request Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Open: Publish request
    Open --> Open: Beneficiary confirms still needed
    Open --> Matched: Beneficiary selects provider response
    Open --> ClosedByBeneficiary: No longer needed
    Open --> Expired: Inactivity policy reached
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
    Submitted --> Submitted: Edit response while request is Open
    Submitted --> Selected: Beneficiary selects provider
    Submitted --> NotSelected: Another provider selected / request closed
    Submitted --> Withdrawn: Provider withdraws before selection
    Selected --> [*]
    NotSelected --> [*]
    Withdrawn --> [*]
```

- لكل Provider **استجابة فعالة واحدة فقط لكل Request** وفق DEC-070.
- يمكن تعديل الاستجابة أو سحبها ما دام Request في حالة `Open` ولم يتم اختيار المقدم.
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
Search → Provider Profile/Portfolio → Inquiry/Chat → Request Transaction Start → Other Party Confirms → Active Transaction
```

- يمكن لأي طرف إرسال `Request Transaction Start` من المحادثة.
- لا تصبح Transaction `Active` إلا بعد تأكيد الطرف الآخر.
- عدم التأكيد أو الرفض يبقي المحادثة دون Transaction.
- المحادثة وحدها ليست Transaction.

## 4. Transaction Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Active
    Active --> Cancelled: Cancel with recorded reason
    Active --> AwaitingInvoice: Provider sends final invoice
    AwaitingInvoice --> AwaitingInvoice: No response / reminders
    AwaitingInvoice --> RevisionRequested: Beneficiary requests revision
    RevisionRequested --> AwaitingInvoice: Provider sends revised invoice
    RevisionRequested --> Disputed: Unresolved complaint
    AwaitingInvoice --> Completed: Beneficiary approves invoice
    Completed --> [*]
    Cancelled --> [*]
    Disputed --> [*]
```

- `Completed` هي **النهاية الناجحة للـTransaction** وفق DEC-071.
- `Disputed` هي **نهاية غير ناجحة للـTransaction** عندما يستمر الخلاف قبل اعتماد الفاتورة ولا يتوصل الطرفان إلى اتفاق، وفق DEC-073.
- عند `Disputed` تراجع إدارة YADD الشكوى لتطبيق سياسات المنصة واتخاذ إجراء إداري عند وجود مخالفة؛ لا تحكم الإدارة في الحقوق المالية/التجارية ولا تفرض Payment/Refund/Compensation.
- لا تفتح Ratings لمعاملة `Disputed` لأنها لم تصل إلى `Completed`.
- لا توجد حالة Transaction باسم `Closed` بعد التقييمات.
- لا يوجد Auto-Approval للفاتورة.
- بعد بدء المعاملة، الإلغاء يحتاج سببًا مسجلًا.
- عدة Transactions قد تكون Active للمستخدم بالتوازي؛ الحد الرقمي غير معتمد.
- Ratings تحدث بعد `Completed` كعمليات Post-Transaction مستقلة ولا تغير Transaction Status.
- لا Payment/Refund lifecycle داخل Transaction.

## 5. Invoice Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> PendingCustomerApproval: Provider sends invoice
    PendingCustomerApproval --> Approved: Beneficiary approves
    PendingCustomerApproval --> PendingCustomerApproval: Reminder / no response
    PendingCustomerApproval --> RevisionRequested: Beneficiary requests revision + note
    RevisionRequested --> Draft: Provider revises
    RevisionRequested --> Disputed: Unresolved complaint
    Approved --> Archived
    Archived --> [*]
    Disputed --> [*]
```

- `Approved` يغلق العمل التوثيقي للفاتورة داخل YADD ويؤدي إلى `Transaction = Completed`، لكنه لا يثبت دفعًا إلكترونيًا.
- `Disputed` يعني أن الفاتورة لم تعتمد وأن Transaction لا تصبح Completed.
- الشكوى الإدارية لا تمنح YADD صلاحية الفصل في المبالغ أو إصدار Refund/Compensation؛ دور الإدارة هو تطبيق سياسة المنصة على السلوك والسجلات الداخلية.
- سياسة التصعيد عند عدم الاستجابة الطويلة: `INV-PENDING-Q01`.

## 6. Rating Lifecycles — Post-Transaction

### Beneficiary rates Provider — mandatory

```mermaid
stateDiagram-v2
    [*] --> Locked
    Locked --> ProviderRatingRequired: Transaction completed
    ProviderRatingRequired --> ProviderRatingSubmitted: Beneficiary rates provider 1-5 stars
    ProviderRatingSubmitted --> [*]
```

- النجوم 1–5 إلزامية والتعليق اختياري.
- لا يفتح التقييم لمعاملة ملغاة أو `Disputed` أو غير مكتملة.
- اكتمال هذا التقييم لا يغير Transaction من `Completed` إلى حالة أخرى.

### Provider rates Beneficiary — optional

```mermaid
stateDiagram-v2
    [*] --> Locked
    Locked --> BeneficiaryRatingOffered: Transaction completed
    BeneficiaryRatingOffered --> Submitted: Provider rates beneficiary
    BeneficiaryRatingOffered --> Skipped: Provider skips
    Submitted --> [*]
    Skipped --> [*]
```

- التقييم اختياري ويظهر Prompt بارزًا.
- المؤشرات: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون؛ كل مؤشر 1–5.
- التعليق اختياري.
- النتائج تدخل سجل تعامل المستفيد الذي يظهر فقط لمقدمي الخدمات/المنتجات في سياق تعامل مشروع.
- لا ينتج عنه منع أو عقوبة آلية في MVP.
- `Submitted` أو `Skipped` لا يغيران Transaction Status؛ تبقى `Completed`.

## 7. Product-specific Fulfillment Note

```mermaid
flowchart LR
    A[Active Transaction] --> B{Fulfillment Method}
    B --> C[Pickup]
    B --> D[Provider-arranged Delivery]
    D --> E[Handled Outside YADD]
    C --> F[Final Invoice]
    E --> F
```

YADD لا يدير مندوب توصيل أو تتبع شحنة. إذا كان Provider Response يتطلب عربونًا، يعرض النظام الدلالة فقط؛ مبلغ العربون والدفع والاسترداد خارج YADD ولا يملكان lifecycle داخل النظام.