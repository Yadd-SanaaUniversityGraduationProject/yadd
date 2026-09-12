# نموذج التواصل داخل التطبيق — In-App Communication Model

> **الحالة:** `ANALYZED_APPROVED — SYNCHRONIZED 2026-09-12`
>
> **القرارات المرجعية:** DEC-023/024/046/047/053/055/069/075.

## 1. القرار الأساسي

يوفر YADD تواصلًا خاصًا داخل التطبيق بين `Beneficiary` و`Provider`. يمكن أن يبدأ التواصل **قبل وجود Transaction** لأغراض الاستفسار والتفاوض. المحادثة وحدها لا تنشئ `Transaction`.

بين نفس Beneficiary ونفس Provider يحتفظ YADD **Conversation واحدة مستمرة** يمكن أن ترتبط بصفر أو عدة Transactions عبر الزمن. بعد بدء Transaction يستمر سياق التواصل نفسه، مع فواصل/أحداث نظام واضحة عند بدء وانتهاء كل Transaction حتى تبقى حدود التعاملات قابلة للفهم والتتبع — DEC-075.

لا يتطلب التواصل الأساسي داخل التطبيق كشف رقم الهاتف للطرف الآخر.

## 2. مسارات التواصل

### مسار الطلب المنشور — Published Request Route

`Request → Provider Response → Inquiry / Chat → Beneficiary Selects Provider → Active Transaction`

يؤدي اختيار المقدم إلى إغلاق `Request` أمام الاستجابات الجديدة وبدء `Transaction` مع الـ`Provider` المختار. لا يوجد في هذا المسار `Agreement` entity إضافية أو نموذج اتفاق إلزامي.

يمكن أن تكون Conversation المستمرة قائمة قبل هذا الطلب أو تبدأ أثناءه. لا يفرض نموذج التحليل علاقة مباشرة دائمة `Request ↔ Conversation` لأن نفس Conversation قد تمر بعدة Request contexts عبر الزمن؛ طريقة الربط الفيزيائي تؤجل إلى Chapter Four.

### مسار البحث المباشر — Direct Search Route

`Search → Provider Profile → Inquiry / Chat → Request Transaction Start → Other Party Confirmation → Active Transaction`

القواعد:
- يمكن لأي من `Beneficiary` أو `Provider` إرسال `Request Transaction Start`؛
- يطلب YADD من الطرف الآخر التأكيد؛
- التأكيد الصريح وحده ينشئ `Active Transaction`؛
- الرفض أو عدم التأكيد يترك المحادثة دون `Transaction`؛
- بدء Transaction جديد لاحقًا بين الطرفين لا ينشئ Conversation جديدة؛ بل يستخدم نفس Conversation المستمرة مع حدث/فاصل واضح لحدود المعاملة.

## 3. نطاق التواصل في MVP

الحد الأدنى من المفاهيم المدعومة:
- رسائل نصية؛
- صور/مرفقات مرتبطة بالطلب أو التنفيذ عند الحاجة؛
- إشعارات الرسائل؛
- Conversation مستمرة واحدة لكل زوج Beneficiary/Provider؛
- فواصل/أحداث نظام واضحة لبدء وانتهاء Transactions داخل Conversation؛
- الاحتفاظ بالمحادثة وفق سياسة الخصوصية/الاحتفاظ؛
- `Block + Report`.

مكالمات الصوت/الفيديو ليست جزءًا من الـCore Model الحالي. تظل الرسائل الصوتية `PROPOSED` ولا يجوز إظهارها كـUse Case معتمدة ما لم تعتمد بصورة مستقلة.

## 4. التواصل والتفاوض والفاتورة

- يمكن مناقشة السعر/التفاصيل/التغييرات داخل المحادثة؛
- لا يحتوي MVP على `Change Order` entity/process مستقلة؛
- يمكن استخدام المحادثة كدليل داعم في الشكوى؛
- تمثل الفاتورة النهائية المعتمدة السجل النهائي المرجعي للعناصر والأسعار داخل YADD.

## 5. التواصل الخارجي

لا يدعي YADD أنه يمنع التواصل خارج المنصة. لا تصبح المناقشات الخارجية تلقائيًا جزءًا من السجل الرسمي لـYADD؛ وإذا غيرت العناصر/الأسعار النهائية، فيجب أن تنعكس النتيجة المتفق عليها في الفاتورة النهائية حتى تصبح جزءًا من سجل `Transaction` داخل YADD.

## 6. القواعد المعتمدة

- `COM-BR-01`: يسمح بالاستفسار الخاص قبل `Transaction`.
- `COM-BR-02`: المحادثة وحدها لا تنشئ `Transaction`.
- `COM-BR-03`: يبدأ مسار `Request` الـ`Transaction` عندما يختار `Beneficiary` مقدمًا.
- `COM-BR-04`: يبدأ `Direct Search` الـ`Transaction` فقط بعد أن يرسل أحد الطرفين `Request Transaction Start` ويؤكد الطرف الآخر.
- `COM-BR-05`: لا يتطلب التواصل الأساسي داخل التطبيق كشف رقم الهاتف.
- `COM-BR-06`: تخضع الرسائل/المرفقات لسياسة الخصوصية والاحتفاظ.
- `COM-BR-07`: يمكن للمحادثة أن تدعم مراجعة الشكوى.
- `COM-BR-08`: الفاتورة النهائية المعتمدة هي سجل YADD النهائي للعناصر/الأسعار.
- `COM-BR-09`: يدعم النظام `Block + Report`، وتحتاج البلاغات إلى مراجعة.
- `COM-BR-10`: بين نفس Beneficiary ونفس Provider توجد Conversation مستمرة واحدة يمكن أن ترتبط بعدة Transactions عبر الزمن — DEC-075.
- `COM-BR-11`: يجب إظهار فواصل/أحداث نظام واضحة عند بدء وانتهاء Transactions داخل Conversation المستمرة.

## 7. إرشادات المخططات — Diagram Guidance

في مخططات `Activity/Sequence`، لا تستبدل مسار بدء `Direct Search` بعبارة عامة مثل `Both Agree to Start`. يجب إظهار التفاعلين الصريحين:

`Request Transaction Start → Other Party Confirmation → Active Transaction`.

كما يجب أن تبقى Conversation نفسها قابلة لإعادة الاستخدام بين نفس الطرفين، مع System Event/Separator يوضح حدود كل Transaction. الربط الفيزيائي بين Message/System Event وTransaction محددة ما يزال Design concern في Chapter Four.

عنصر الواجهة الدقيق المستخدم لطلب/تأكيد البدء هو تفصيل تصميمي ولا يعيق مخططات التحليل.
