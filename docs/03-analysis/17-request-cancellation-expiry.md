# نموذج إغلاق الطلب والإلغاء والانتهاء — Request Closure, Cancellation & Expiry Model

> **الحالة:** `ANALYZED_APPROVED / PARTIAL POLICY — SYNCHRONIZED 2026-09-04`
>
> **القرارات المرجعية:** DEC-047..050/054/071.

## 1. الطلب المفتوح — Open Request

بعد نشر `Service/Product Request` تصبح حالته `Open`. وتبقى كذلك حتى يحدث أحد الآتي:

- يختار `Beneficiary` مقدمًا → تصبح الحالة `Matched` ويبدأ `Active Transaction`.
- لا يعود `Beneficiary` بحاجة إلى الـ`Request` → تصبح `ClosedByBeneficiary`.
- تتحقق سياسة عدم النشاط → تصبح `Expired`.

تظل المدة الدقيقة لعدم النشاط وجدول التذكيرات ضمن `REQ-EXP-Q01` ولا يجوز اختلاقها داخل المخططات.

## 2. إغلاق الطلب قبل الاختيار — Request Closure Before Selection

إذا لم يتم اختيار أي `Provider` بعد، فإن إغلاق الـ`Request` **ليس Transaction Cancellation** لأنه لا توجد `Transaction` أصلًا في هذه المرحلة.

- يتوقف قبول `Provider Responses` جديدة؛
- لا تنشأ بيانات إلغاء `Transaction`؛
- تصبح حالة `Request` هي `ClosedByBeneficiary`.

## 3. اختيار المقدم — Provider Selection

عندما يختار `Beneficiary` استجابة `Provider Response` واحدة:

1. يتوقف `Request` عن قبول استجابات جديدة.
2. تتحول الاستجابات الفعالة الأخرى إلى `NotSelected`.
3. تصبح حالة `Request` هي `Matched`.
4. يبدأ `Active Transaction` واحد مع الـ`Provider` المختار.

لا يتطلب هذا المسار نموذجًا أو كيانًا إضافيًا باسم `Agreement`.

## 4. إلغاء المعاملة — Transaction Cancellation

بعد بدء `Transaction`، يمكن لأي من الطرفين الإلغاء قبل وصول مسار الفاتورة النهائية إلى الاكتمال، وفق القواعد الحالية:

- سبب الإلغاء مطلوب؛
- يسجل النظام الطرف الذي ألغى والوقت؛
- يظهر السبب للطرف الآخر؛
- يمكن رفع الأنماط المتكررة/المشبوهة للمراجعة؛
- التكرار وحده لا يسبب عقوبة تلقائية.

## 5. انتهاء الطلب — Request Expiry

لا يترك YADD أي `Open Request` فعالًا إلى أجل غير محدد. يمكن للنظام تذكير `Beneficiary` لتأكيد أن الطلب ما يزال مطلوبًا، ويمكن لاحقًا تحويله إلى `Expired` وفق سياسة عدم نشاط معتمدة.

**Needs Verification:** يحدد `REQ-EXP-Q01` المدة الرقمية وجدول التذكيرات.

## 6. مؤشرات إساءة الاستخدام — Abuse Signals

يمكن للنظام تسجيل أنماط إنشاء/إغلاق الطلبات ورفع `Flag` للمراجعة الإدارية. تظل العتبات ضمن `SAFE-REQ-Q01` ولا تظهر كقيم رقمية في مخططات التحليل.

## 7. بعد إرسال الفاتورة النهائية — After Final Invoice Submission

بعد إرسال الفاتورة النهائية، يستخدم مسار `Transaction` الطبيعي حالات وقرارات الفاتورة التالية:

- `PendingCustomerApproval`
- `RevisionRequested`
- `Disputed`
- `Approved`

عدم الرد لا يعد موافقة، ولا يوجد `Auto-Approval`.

## 8. نموذج الحالات — State Model

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Open: Publish Request
    Open --> Matched: Select Provider
    Open --> ClosedByBeneficiary: No Longer Needed
    Open --> Expired: Inactivity Policy Reached
    Matched --> [*]
    ClosedByBeneficiary --> [*]
    Expired --> [*]
```

تمثل `Transaction` بصورة منفصلة:

```mermaid
stateDiagram-v2
    [*] --> Active
    Active --> Cancelled: Cancel With Recorded Reason
    Active --> AwaitingInvoice: Provider Sends Final Invoice
    AwaitingInvoice --> AwaitingInvoice: No Response / Reminder
    AwaitingInvoice --> RevisionRequested: Request Revision
    RevisionRequested --> AwaitingInvoice: Revised Invoice Submitted
    RevisionRequested --> Disputed: Complaint Raised
    AwaitingInvoice --> Completed: Invoice Approved
    Completed --> [*]
    Cancelled --> [*]
    Disputed --> [*]
```

`Completed` هي الحالة النهائية الناجحة للـ`Transaction`. تحدث عمليات `Ratings` بعدها كـPost-Transaction workflows ولا تنشئ حالة `Transaction` باسم `Closed`.

## 9. القواعد المعتمدة

- `REQ-BR-01`: إغلاق `Request` قبل الاختيار ليس `Transaction Cancellation`.
- `REQ-BR-02`: اختيار `Provider` واحد في `Published Request` يغلق الطلب أمام الاستجابات الجديدة ويبدأ `Transaction` واحدة.
- `REQ-BR-03`: يتطلب `Transaction Cancellation` سببًا مسجلًا.
- `REQ-BR-04`: تخضع `Open Requests` للتذكيرات/`Expiry` من حيث المبدأ.
- `REQ-BR-05`: قد ينتج عن الإغلاق المتكرر `Flag + Admin Review`، وليس عقوبة تلقائية.
- `REQ-BR-06`: بعد إرسال الفاتورة النهائية، يحكم `Invoice workflow` المسار المتبقي.
- `REQ-BR-07`: `Completed` هي الحالة النهائية الناجحة للـ`Transaction`، و`Ratings` عمليات Post-Transaction.