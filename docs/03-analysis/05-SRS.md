# Software Requirements Specification — YADD MVP

> **الإصدار:** v0.9.10
>
> **الحالة:** `PARTIALLY ANALYZED — NOT BASELINED`
>
> هذه النسخة تزامن المتطلبات مع القرارات حتى 2026-09-18، بما في ذلك DEC-078..090 الخاصة بالحساب والمصادقة، ملف المقدم، Expiry، بدء المعاملة المباشر، الفاتورة/النزاع، التحقق حسب نوع المقدم، الاشتراك، التقييم، Block/Report، نتائج المراجعة الإدارية والإشعارات. البنود المفتوحة المتبقية صريحة ولا تعتبر متطلبات نهائية.

## 1. Scope

مرجع النطاق: `00-project-baseline.md` و`docs/00-governance/02-decision-register.md`.

- YADD نظام Client–Server مركزي.
- الـBackend/API هو المرجع النهائي لمعالجة البيانات والصلاحيات وBusiness Rules والتعامل مع قاعدة البيانات.
- واجهة الويب هي واجهة الاستخدام الأساسية الحالية.
- Flutter اتجاه معتمد كعميل Mobile لاحق يتصل بالـAPI نفسه؛ لا يعد مرجعًا نهائيًا للصلاحيات أو قواعد العمل.
- يدعم MVP `Guest` غير مسجل الدخول لتصفح المحتوى العام والبحث عن Providers واستعراض ملفاتهم العامة وPortfolio/Catalog. الوظائف التفاعلية/المعاملاتية المحمية تتطلب Authentication — DEC-077.
- جميع المخططات الأكاديمية تستخدم تسميات داخل الرسم باللغة الإنجليزية وفق DEC-072؛ لغة التقرير النصية تبقى العربية وفق DEC-061.

## 2. Account / Portal Model — Approved

- قبل Authentication يستطيع الشخص استخدام المنصة بصفة `Guest` ضمن حدود التصفح العام فقط — DEC-077.
- عند محاولة Guest تنفيذ وظيفة محمية، يوجّه إلى `Log In` أو `Create Account` قبل متابعة الإجراء.
- حساب `User` واحد للشخص.
- إنشاء الحساب يتطلب الاسم الرباعي في أربعة حقول، رقم هاتف، كلمة مرور، وتأكيد الشروط/الخصوصية؛ البريد الإلكتروني اختياري.
- لا يكتمل إنشاء الحساب حتى ينجح OTP على رقم الهاتف.
- تسجيل الدخول يقبل رقم الهاتف الموثق أو البريد الإلكتروني الموثق مع كلمة المرور.
- استعادة كلمة المرور أساسها OTP إلى الهاتف، مع البريد الموثق كخيار إضافي.
- اختيار «مستفيد» أو «مقدم» بعد التسجيل يحدد بوابة البداية لا نوع حساب دائمًا.
- يتذكر النظام آخر Portal مستخدم، مع زر تبديل دائم بين Beneficiary وProvider عند استيفاء الشروط.
- استخدام بوابة المقدم يحتاج `Provider Profile` داخل الحساب نفسه.
- يدعم الحساب Deactivate/Reactivate في MVP ولا يوجد Hard Delete ذاتي مباشر.

## 3. Provider Type / Activity Model — Approved

- Provider Profile واحد للحساب.
- في MVP يكون كل Provider Profile من نوع واحد فقط: `SERVICE` أو `PRODUCT`؛ لا يمكن تفعيل النوعين معًا على الملف نفسه — DEC-074.
- يمكن للمقدم اختيار تصنيف واحد أو أكثر داخل نوعه فقط — DEC-076.
- يسمح Draft Provider Profile مؤقتًا بصفر تصنيفات، لكن لا يصبح الملف مؤهلًا لوظائف التقديم قبل وجود تصنيف واحد على الأقل — DEC-076.
- لا يجوز ربط Provider Activity/Category من النوع الآخر بنوع Provider Profile المختار.
- بيانات الملف المطلوبة قبل الأهلية: النوع، تصنيف صالح واحد على الأقل، مناطق الخدمة، ونبذة؛ الصورة/الشعار وPortfolio/Catalog اختيارية.
- `Product Provider` قد يحدد `Trade Name` اختياريًا ليكون اسم العرض العام بدل الاسم الشخصي، مع بقاء الهوية الحقيقية في User Account.
- `Service Provider` يخضع لـIdentity Verification قبل وظائف التقديم؛ `Product Provider` لا يطلب منه Government ID في MVP، لكنه يحتاج Account Verified وبقية شروط الأهلية.
- سياسة تغيير Provider Type بعد اختياره لم تعتمد بعد؛ لا يفترض النظام الحالي السماح أو المنع دون قرار لاحق.

## 4. Location & Neighborhood Model — Approved

- موقع الطلب العام = المديرية + الحي.
- لا يظهر العنوان الدقيق/GPS للعامة.
- يمكن مشاركة موقع أدق في التواصل الخاص عند الحاجة.
- يحدد المقدم مناطق خدمته.
- التوسع إلى الأحياء المجاورة يحتاج موافقة المستفيد؛ بيانات الجوار والمدة التشغيلية ما تزال مفتوحة.

## 5. Provider Verification Model — Approved

- `Service Provider` فقط يحتاج Identity Verification رسميًا قبل وظائف التقديم.
- الحد الأدنى لمقدم الخدمة: هاتف موثق + الاسم الحقيقي + `National ID` أو `Passport` + صورة الوثيقة + صورة شخصية مع الوثيقة.
- `Product Provider` لا يرفع Government ID في MVP، ولا يوصف بأنه Identity Verified لمجرد توثيق الهاتف.
- القرار النهائي في Identity Verification يدوي من موظف YADD مخول؛ AI مساعد فقط.
- بيانات التحقق حساسة وغير عامة.
- مدة الاحتفاظ والتراخيص المهنية الخاصة ما تزال مفتوحة.

## 6. AI Trust & Safety Model — Approved / Partial Policy

- AI يدعم Provider Verification وTrust & Safety Moderation.
- AI Flags ليست إثباتًا قطعيًا ولا تصدر وحدها عقوبة نهائية عالية الأثر.
- يجب أن يستطيع الموظف المخول معرفة سبب/فئة الاشتباه التي ولدت Flag؛ تفاصيل الفئات والعتبات ما تزال مفتوحة.
- يدعم النظام Block + Report، وتخضع البلاغات للمراجعة الإدارية.
- يمكن رصد أنماط إساءة استخدام الطلبات كـFlags دون عقوبة آلية لمجرد التكرار.
- السياسة التفصيلية والعتبات والمزود والاحتفاظ بالنتائج مفتوحة.

## 7. Provider Subscription Model — Approved

- نموذج الإيراد اشتراك دوري من المقدمين دون عمولة من المعاملات.
- يدير YADD حالة وفترة الاشتراك؛ التحصيل خارجي والتأكيد يدوي.
- الاشتراك مطلوب لكل من Service Provider وProduct Provider ومدته التشغيلية في MVP هي 30 يومًا من التفعيل اليدوي.
- تذكير تجديد قبل 3 أيام وآخر قبل 24 ساعة.
- عند Expired تستمر المعاملات الجارية، لكن يمنع بدء Transaction جديدة أو إرسال Provider Response جديدة حتى التجديد.
- Service Provider يحتاج Identity Verified + Active Subscription؛ Product Provider يحتاج Account/Profile eligible + Active Subscription.

## 8. Actors

### Actors العامة للمخطط الرئيسي
- `Guest` — `ANALYZED_APPROVED` للتصفح العام فقط — DEC-077.
- `Beneficiary` — `ANALYZED_APPROVED`.
- `Provider` — `ANALYZED_APPROVED` كActor عام.
  - `Service Provider` — تخصص من Provider عند الحاجة.
  - `Product Provider` — تخصص من Provider عند الحاجة.
- `YADD Administrator` — `ANALYZED_APPROVED_AS_MODELING_ACTOR` للمخطط الرئيسي.

> `Guest` ليس نوع حساب ولا Entity/Class مستقل؛ هو Actor غير authenticated. بعد Log In/Create Account يصبح التفاعل تحت هوية `User` وفق الأدوار المناسبة.

> وفق DEC-074، يكون Provider Profile الواحد في MVP إما Service Provider أو Product Provider، ولا يجمع النوعين معًا.

### أدوار إدارية متخصصة للصلاحيات والتفاصيل
- `Verification Reviewer` — `ANALYZED_APPROVED` في أصل الدور.
- `Content Moderator` — `ANALYZED_APPROVED` في أصل الدور.
- `Subscription Administrator` — `ANALYZED_APPROVED` في أصل الدور.

> استخدام `YADD Administrator` في المخطط الرئيسي لا يعني أن موظفًا واحدًا يجب أن يمتلك كل الصلاحيات؛ التفصيل يبقى داخل Authorization/Administration model.

## 9. User Requirements

| ID | User Requirement | Status | Source/Reason |
|---|---|---|---|
| UR-GST-01 | يستطيع الزائر غير المسجل تصفح المحتوى العام والبحث عن Providers واستعراض Public Provider Profile وPortfolio/Catalog. | `ANALYZED_APPROVED` | DEC-077 |
| UR-GST-02 | عند محاولة الزائر تنفيذ وظيفة محمية مثل Create Request أو Chat، يجب توجيهه إلى Log In أو Create Account قبل متابعة الإجراء. | `ANALYZED_APPROVED` | DEC-077 |
| UR-GST-03 | لا تعرض Public Provider Profile وسائل الاتصال المباشر الخاصة مثل رقم الهاتف، وتبقى البيانات الحساسة/الخاصة غير عامة. | `ANALYZED_APPROVED` | DEC-036/046/077 |
| UR-ACC-01 | استخدام حساب واحد للاستفادة والتقديم. | `ANALYZED_APPROVED` | DEC-008 |
| UR-ACC-02 | اختيار بوابة البداية مع إمكانية الانتقال للبوابة الأخرى وتذكر آخر Portal مستخدم. | `ANALYZED_APPROVED` | DEC-009/011/078 |
| UR-ACC-03 | إنشاء الحساب بالاسم الرباعي والهاتف وكلمة المرور مع OTP، والسماح بالدخول بالهاتف أو البريد الموثق واستعادة كلمة المرور عبر قناة موثقة. | `ANALYZED_APPROVED` | DEC-078 |
| UR-ACC-04 | إدارة بيانات الحساب مع تحقق عند تغيير الهاتف/البريد، ودعم Deactivate/Reactivate دون Hard Delete ذاتي مباشر. | `ANALYZED_APPROVED` | DEC-079 |
| UR-PROV-01 | اختيار نوع واحد فقط للـProvider Profile في MVP: خدمة أو منتج، دون تفعيل النوعين معًا على الملف نفسه. | `ANALYZED_APPROVED` | DEC-074/030 |
| UR-PROV-02 | اختيار تصنيف واحد أو أكثر داخل نوع المقدم نفسه، مع اشتراط تصنيف واحد على الأقل قبل أهلية وظائف التقديم. | `ANALYZED_APPROVED` | DEC-076 |
| UR-PROV-03 | إدارة بيانات Provider Profile الأساسية ومناطق الخدمة والنبذة؛ Product Provider يمكنه استخدام Trade Name اختياريًا كاسم عرض عام. | `ANALYZED_APPROVED` | DEC-080 |
| UR-VER-01 | Service Provider يقدم متطلبات Identity Verification وينتظر اعتمادًا بشريًا قبل وظائف التقديم؛ Product Provider لا يحتاج Government ID في MVP. | `ANALYZED_APPROVED` | DEC-035/085 |
| UR-DIS-01 | البحث المباشر عن مقدم حسب التصنيف والمنطقة. | `ANALYZED_APPROVED` | DEC-012/031..033 |
| UR-PORT-01 | استعراض معرض أعمال/كتالوج المقدم داخل Provider Profile. | `ANALYZED_APPROVED` | DEC-064 |
| UR-REQ-01 | إنشاء طلب خدمة/منتج ونشره للمقدمين المناسبين. | `ANALYZED_APPROVED` | DEC-012 |
| UR-REQ-02 | إضافة وصف وصور اختيارية وسعر استرشادي اختياري. | `ANALYZED_APPROVED` | DEC-013 |
| UR-COM-01 | الاستفسار من مقدم قبل بدء المعاملة دون أن تعتبر المحادثة وحدها Transaction. | `ANALYZED_APPROVED` | DEC-046 |
| UR-COM-02 | الاحتفاظ بمحادثة واحدة مستمرة بين نفس Beneficiary وProvider يمكن أن تضم عدة Transactions مع فواصل/أحداث نظام واضحة لحدود كل Transaction. | `DERIVED_FROM_APPROVED_DECISION` | DEC-075 |
| UR-OFF-01 | استجابة المقدم للطلب واقتراح سعر عند الحاجة وتحديد ما إذا كان يتطلب عربونًا. | `ANALYZED_APPROVED` | DEC-013/041 |
| UR-OFF-02 | مقارنة الاستجابات واختيار مقدم واحد. | `ANALYZED_APPROVED` | DEC-014/047 |
| UR-OFF-03 | تعديل أو سحب الاستجابة قبل الاختيار مع بقاء استجابة فعالة واحدة للمقدم لكل طلب. | `ANALYZED_APPROVED` | DEC-070 |
| UR-REQ-03 | إغلاق الطلب إذا لم يعد مطلوبًا دون اعتباره إلغاء معاملة. | `ANALYZED_APPROVED` | DEC-048 |
| UR-REQ-04 | تطبيق Reminder بعد 24h و48h وExpiry بعد 72h من عدم نشاط المستفيد، مع Republish كطلب جديد بدل Reopen للطلب المنتهي. | `ANALYZED_APPROVED` | DEC-081 |
| UR-TX-01 | بدء المعاملة عند اختيار مقدم في مسار الطلب، أو بعد طلب أحد الطرفين بدء المعاملة وتأكيد الطرف الآخر خلال 12 ساعة في البحث المباشر. | `ANALYZED_APPROVED` | DEC-046/047/066/069/082 |
| UR-TX-02 | امتلاك عدة معاملات جارية بالتوازي. | `ANALYZED_APPROVED` | DEC-056 |
| UR-TX-03 | اعتبار `Completed` الحالة النهائية للمعاملة الناجحة بعد اعتماد الفاتورة؛ التقييمات لاحقة ولا تنشئ حالة `Closed`. | `ANALYZED_APPROVED` | DEC-071 |
| UR-TX-04 | إذا استمر الخلاف قبل اعتماد الفاتورة ولم يتوصل الطرفان إلى اتفاق، تنتهي المعاملة في `Disputed` ولا تعتبر `Completed`. | `ANALYZED_APPROVED` | DEC-073 |
| UR-INV-01 | فاتورة نهائية موثقة لإغلاق المعاملة الناجحة، مع تذكير 24h/48h وOverdue عند 72h دون Auto-Approval، وتاريخ نسخ للتعديلات. | `ANALYZED_APPROVED` | DEC-015/025/050/071/083 |
| UR-DSP-01 | رفع شكوى بسبب ووصف إلزاميين ومرفقات اختيارية عند استمرار الخلاف قبل اعتماد الفاتورة، مع مراجعة إدارية لسجلات YADD دون تحكيم مالي/تجاري بين الطرفين. | `ANALYZED_APPROVED` | DEC-073/084 |
| UR-REV-01 | تقييم مقدم الخدمة/المنتج بعد Completed باستخدام Overall Stars + Structured Textual Criteria + Optional Comment، مع تذكير بعد 24h وإلزام الإكمال قبل Transaction جديدة. | `ANALYZED_APPROVED` | DEC-051/087 |
| UR-REV-02 | إمكانية تقييم المقدم للمستفيد اختياريًا بعد اكتمال المعاملة وفق مؤشرات سلوكية محددة. | `ANALYZED_APPROVED` | DEC-063 |
| UR-REP-01 | عرض سجل تعامل المستفيد للمقدمين فقط في سياق تعامل مشروع معه دون عقوبات آلية. | `ANALYZED_APPROVED` | DEC-063 |
| UR-SAFE-01 | حظر/إلغاء حظر المستخدم والإبلاغ عنه/عن المحتوى مع الحفاظ على Active Transaction، ومراجعة البلاغ إداريًا بنتائج بشرية مسجلة. | `ANALYZED_APPROVED` | DEC-053/088/089 |
| UR-PAY-01 | لا ينفذ YADD أي دفع بين المستفيد والمقدم؛ يوضح فقط إذا كانت استجابة المقدم تتطلب عربونًا دون قيمة أو حالة دفع. | `ANALYZED_APPROVED` | DEC-018/041 |
| UR-SUB-01 | معرفة حالة اشتراك المقدم وفترة صلاحيته وتجديده؛ الاشتراك 30 يومًا لكلا نوعي المقدم مع تذكيرات قبل الانتهاء. | `ANALYZED_APPROVED` | DEC-042/043/086 |
| UR-NOT-01 | استلام In-App Notifications افتراضيًا، واستخدام SMS للـOTP وأحداث الأمان/الحساب الحرجة، والبريد الموثق اختياريًا. | `ANALYZED_APPROVED` | DEC-090 |

## 10. Functional Requirements

### Guest / Public Access
- `FR-GST-01` `ANALYZED_APPROVED`: يسمح النظام للـGuest بتصفح الصفحة العامة ومحتوى الاكتشاف العام.
- `FR-GST-02` `ANALYZED_APPROVED`: يسمح للـGuest بالبحث/التصفية عن Providers باستخدام البيانات العامة المسموح بها.
- `FR-GST-03` `ANALYZED_APPROVED`: يسمح للـGuest بفتح Public Provider Profile واستعراض Provider type/category/service-area information وPortfolio/Catalog ومؤشرات الملف العامة المعتمدة.
- `FR-GST-04` `ANALYZED_APPROVED`: لا يعرض Public Provider Profile رقم الهاتف أو أي وسيلة اتصال مباشر خاصة، ولا بيانات Verification/Subscription/Reports/Transactions أو غيرها من البيانات الحساسة/الخاصة.
- `FR-GST-05` `ANALYZED_APPROVED`: عند محاولة Guest تنفيذ protected action مثل Create Request أو Private Chat/Inquiry، يطلب النظام Log In أو Create Account قبل السماح بالمتابعة.
- `FR-GST-06` `ANALYZED_APPROVED_AS_ARCH_PRINCIPLE`: يفرض Backend/API Authentication/Authorization للوظائف المحمية؛ لا يعتمد الأمان على إخفاء الأزرار أو Redirect في الواجهة فقط.

### Account / Portal
- `FR-001` `ANALYZED_APPROVED`: يدير النظام حساب User واحدًا للشخص.
- `FR-001A` `ANALYZED_APPROVED`: ينشئ الحساب باستخدام First/Father/Grandfather/Family Name + Mobile Number + Password + Terms/Privacy، والبريد اختياري.
- `FR-001B` `ANALYZED_APPROVED`: لا يكتمل إنشاء الحساب قبل OTP ناجح على رقم الهاتف.
- `FR-001C` `ANALYZED_APPROVED`: يسمح Log In برقم الهاتف الموثق أو البريد الإلكتروني الموثق مع كلمة المرور.
- `FR-001D` `ANALYZED_APPROVED`: يدعم Forgot Password عبر OTP للهاتف، ويمكن استخدام البريد الموثق كخيار إضافي.
- `FR-001E` `ANALYZED_APPROVED`: يسمح بعد التسجيل باختيار بوابة البداية Beneficiary أو Provider دون إنشاء نوع حساب دائم.
- `FR-001F` `ANALYZED_APPROVED`: يسمح بالتبديل بين البوابتين ويتذكر آخر Portal مستخدم.
- `FR-001G` `ANALYZED_APPROVED`: يسمح بإدارة الاسم الرباعي والهاتف والبريد وكلمة المرور والصورة، مع إعادة تحقق الهاتف/البريد عند تغييره.
- `FR-001H` `ANALYZED_APPROVED`: يدعم Deactivate/Reactivate Account ولا يوفر Hard Delete ذاتي مباشر في MVP.
- `FR-002` `ANALYZED_APPROVED`: يسمح بإنشاء وإدارة Provider Profile.
- `FR-002A` `ANALYZED_APPROVED`: Service Provider لا تتاح له وظائف التقديم قبل Identity Verified؛ Product Provider يخضع لأهلية الحساب/الملف والاشتراك دون Government ID.
- `FR-002B` `ANALYZED_APPROVED`: يسمح للـProvider Profile باختيار نوع مقدم واحد فقط `SERVICE` أو `PRODUCT` في MVP، ويمنع تفعيل النوعين معًا على الملف نفسه.
- `FR-002C` `ANALYZED_APPROVED`: يسمح للمقدم باختيار تصنيف واحد أو أكثر داخل نوعه المختار فقط.
- `FR-002D` `ANALYZED_APPROVED`: يسمح Draft Provider Profile مؤقتًا بصفر تصنيفات، لكن يتطلب تفعيل وظائف التقديم وجود تصنيف واحد على الأقل.
- `FR-002E` `ANALYZED_APPROVED`: يتطلب الملف قبل الأهلية Service Areas + About/Description، وتبقى الصورة/الشعار وPortfolio/Catalog اختيارية.
- `FR-002F` `ANALYZED_APPROVED`: يسمح لـProduct Provider بحقل Trade Name اختياري كاسم العرض العام؛ الهوية الحقيقية تبقى في User Account.

### Provider Portfolio / Catalog
- `FR-PORT-01` `ANALYZED_APPROVED`: يسمح للمقدم بإضافة عناصر صور لأعماله أو منتجاته داخل Provider Profile مع وصف اختياري.
- `FR-PORT-02` `ANALYZED_APPROVED`: ينشئ النظام نسخة عرض من الصورة بعلامة مائية تعريفية مرتبطة بـYADD وحساب المقدم، مع عدم جعل الأصل عامًا.
- `FR-PORT-03` `ANALYZED_APPROVED`: يتطلب رفع المحتوى إقرار المقدم بحقه في نشره.
- `FR-PORT-04` `ANALYZED_APPROVED`: يسمح بالإبلاغ عن صورة/عنصر يشتبه في انتحاله أو عدم أحقية نشره للمراجعة الإدارية.
- `FR-PORT-05` `ANALYZED_APPROVED`: لا تقدم العلامة المائية إثباتًا قانونيًا لملكية العمل؛ هي وسيلة تعريف وردع لإعادة الاستخدام المباشر.

### Provider Verification
- `FR-VER-01` `ANALYZED_APPROVED`: يسمح لـService Provider بإرسال طلب Identity Verification.
- `FR-VER-02` `ANALYZED_APPROVED`: يقبل MVP `National ID` أو `Passport` مع صورة الوثيقة وصورة شخصية مع الوثيقة وبيانات الحساب المطابقة.
- `FR-VER-03` `ANALYZED_APPROVED`: يدعم حالات Draft/Submitted/UnderReview/Verified/ResubmissionRequired/Rejected مفاهيميًا لمقدم الخدمة.
- `FR-VER-04` `ANALYZED_APPROVED`: القرار النهائي لموظف مخول.
- `FR-VER-05` `ANALYZED_APPROVED`: AI لا يقرر Verified/Rejected وحده.
- `FR-VER-06` `ANALYZED_APPROVED`: Product Provider لا يطلب منه Government ID ولا يعرض Identity Verified badge في MVP.

### Discovery / Location
- `FR-003` `ANALYZED_APPROVED`: يسمح بالبحث المباشر حسب التصنيف والمديرية/الحي؛ البحث العام متاح للGuest بينما الأفعال التفاعلية اللاحقة تحتاج Authentication وفق DEC-077.
- `FR-003A` `ANALYZED_APPROVED`: يبدأ توزيع الطلب في حي الطلب.
- `FR-003B` `ANALYZED_APPROVED`: التوسع إلى الأحياء المجاورة يحتاج موافقة المستفيد.
- `FR-003C` `ANALYZED_APPROVED`: يسمح للمقدم بتحديد مناطق خدمته.
- `FR-003D` `PROPOSED/BLOCKED BY LOC-DATA-Q01`: قائمة الأحياء والجوار تحتاج تحققًا.

### Request Creation / Closure / Expiry
- `FR-005` `ANALYZED_APPROVED`: يسمح بإنشاء طلب خدمة أو منتج مع الفئة والوصف والمديرية والحي؛ يتطلب Authentication ولا ينفذه Guest مباشرة.
- `FR-005A` `ANALYZED_APPROVED`: الصور والمعلومات الإضافية اختيارية.
- `FR-005B` `ANALYZED_APPROVED`: السعر الاسترشادي اختياري وغير ملزم.
- `FR-005C` `ANALYZED_APPROVED`: يسمح للمستفيد بإغلاق Request Open قبل اختيار مقدم دون إنشاء Transaction Cancellation.
- `FR-005D` `ANALYZED_APPROVED`: يرسل النظام Reminder بعد 24 ساعة من عدم نشاط Beneficiary، وثانيًا بعد 48 ساعة، ويحوّل الطلب إلى Expired بعد 72 ساعة.
- `FR-005E` `ANALYZED_APPROVED`: نشاط Beneficiary الدال على استمرار الحاجة يعيد عداد عدم النشاط؛ Provider Response وحدها لا تعيده.
- `FR-005F` `ANALYZED_APPROVED`: Republish للطلب Expired ينشئ Request جديدًا بعد المراجعة؛ لا يعاد فتح الطلب القديم ولا تعود استجاباته فعالة.
- `FR-006` `ANALYZED_APPROVED`: يعرض الطلب للمقدمين المؤهلين حسب نوع Provider Profile والتصنيف والمنطقة.

### Provider Response / Selection / Communication
- `FR-007` `ANALYZED_APPROVED`: يسمح للمقدم المؤهل ذي الاشتراك Active بإرسال `Provider Response` لطلب Open.
- `FR-007A` `ANALYZED_APPROVED`: يسمح بقبول السعر الاسترشادي أو اقتراح سعر آخر.
- `FR-007B` `ANALYZED_APPROVED`: تسمح Provider Response بتحديد `RequiresDeposit = Yes/No` فقط؛ لا يسجل النظام قيمة العربون أو نسبته أو طريقة دفعه أو حالته.
- `FR-007C` `ANALYZED_APPROVED`: يسمح للمقدم بتعديل Provider Response أو سحبها ما دام Request في حالة Open ولم يتم اختياره.
- `FR-007D` `ANALYZED_APPROVED`: يحتفظ النظام باستجابة فعالة واحدة فقط لكل Provider لكل Request؛ لا يحسم هذا المتطلب طريقة حفظ تاريخ التعديلات في قاعدة البيانات.
- `FR-007E` `ANALYZED_APPROVED`: لا توجد مدة صلاحية مستقلة لـProvider Response؛ تنتهي فعاليتها مع Withdraw/Selection/Request Close/Expiry.
- `FR-008` `ANALYZED_APPROVED`: يسمح بمحادثة/استفسار خاص قبل بدء المعاملة من البحث المباشر أو Provider Response، بعد Authentication فقط.
- `FR-008A` `ANALYZED_APPROVED`: المحادثة وحدها لا تنشئ Transaction.
- `FR-008B` `ANALYZED_APPROVED`: يحتفظ النظام بسجل المحادثة وفق سياسة الخصوصية والاحتفاظ.
- `FR-008C` `ANALYZED_APPROVED`: يسمح بمشاركة موقع أدق في التواصل الخاص عند الحاجة دون عرضه للعامة.
- `FR-008D` `DERIVED_FROM_APPROVED_DECISION`: يحتفظ النظام بـConversation واحدة مستمرة لكل زوج Beneficiary–Provider ويمكن أن ترتبط بصفر أو عدة Transactions عبر الزمن — DEC-075.
- `FR-008E` `DERIVED_FROM_APPROVED_DECISION`: يعرض النظام فواصل/أحداث نظام واضحة عند بدء وانتهاء كل Transaction داخل Conversation المستمرة — DEC-075.
- `FR-009` `ANALYZED_APPROVED`: عند اختيار المستفيد مقدمًا من Provider Responses يغلق النظام الطلب أمام استجابات جديدة، يجعل البقية NotSelected، ويبدأ Transaction مع المختار.
- `FR-009A` `ANALYZED_APPROVED`: في البحث المباشر يمكن لأي طرف إرسال Request Transaction Start من المحادثة، ولا تبدأ Transaction حتى يؤكد الطرف الآخر.
- `FR-009B` `ANALYZED_APPROVED`: لا يستخدم MVP كيان/نموذج `Agreement` مستقل؛ مصدر بدء Transaction هو Selection في مسار الطلب أو تأكيد الطرفين في البحث المباشر.
- `FR-009C` `ANALYZED_APPROVED`: Request Transaction Start يبقى Pending لمدة 12 ساعة؛ القبول ينشئ Active Transaction، والرفض أو انتهاء المهلة يلغي الطلب دون إغلاق Conversation.
- `FR-009D` `ANALYZED_APPROVED`: لا يسمح بأكثر من Pending Transaction Start Request واحد بين الطرفين في الوقت نفسه.

### Transaction / Cancellation / Dispute
- `FR-TX-01` `ANALYZED_APPROVED`: يدعم النظام عدة معاملات Active للمستخدم بالتوازي.
- `FR-TX-02` `ANALYZED_APPROVED`: يسمح بالإلغاء من Active Transaction حتى ما قبل اعتماد Final Invoice/Completed، مع سبب إلزامي مسجل يظهر للطرف الآخر.
- `FR-TX-03` `ANALYZED_APPROVED`: يسجل النظام الطرف الملغي والتوقيت وسبب الإلغاء للمراجعة عند الحاجة.
- `FR-TX-04` `PROPOSED/BLOCKED BY TX-CONC-Q01`: لا يوجد حد أقصى رقمي معتمد للمعاملات المتوازية.
- `FR-TX-05` `ANALYZED_APPROVED`: عند استمرار نزاع الفاتورة دون اتفاق، تصبح Transaction `Disputed` كحالة نهائية غير ناجحة.
- `FR-TX-06` `ANALYZED_APPROVED`: لا يسمح Ratings لمعاملة `Disputed` لأنها لم تصل إلى `Completed`.

### External Payment / Fulfillment Boundaries
- `FR-EXT-01` `ANALYZED_APPROVED`: لا ينفذ النظام Payment Transaction بين المستفيد والمقدم.
- `FR-EXT-02` `ANALYZED_APPROVED`: يمكن عرض وسائل الدفع المقبولة كمعلومة عند الحاجة دون تنفيذ الدفع داخل YADD.
- `FR-EXT-03` `ANALYZED_APPROVED`: في المنتجات يسمح بالاستلام أو توصيل يرتبه المقدم خارج YADD.
- `FR-EXT-04` `ANALYZED_APPROVED`: يمكن إدراج تكلفة التوصيل في الفاتورة.
- `FR-EXT-05` `ANALYZED_APPROVED`: `RequiresDeposit` معلومة في Provider Response فقط؛ لا Deposit/Escrow/Refund lifecycle ولا DepositAmount داخل YADD.

### Invoice / Transaction Completion
- `FR-010` `ANALYZED_APPROVED`: يسمح للمقدم بإنشاء الفاتورة النهائية بعد التنفيذ/التجهيز واستقرار الاتفاق.
- `FR-010A` `ANALYZED_APPROVED`: تحتوي الفاتورة هوية الطرفين والبنود والأسعار والإجمالي، مع صور اختيارية.
- `FR-011` `ANALYZED_APPROVED`: يرسل النظام الفاتورة للمستفيد ويتيح Approve أو Request Revision مع ملاحظة.
- `FR-011A` `ANALYZED_APPROVED`: يحتفظ بتاريخ نسخ الفاتورة والتعديلات.
- `FR-011B` `ANALYZED_APPROVED`: الاعتماد نهائي داخل YADD بعد تحذير واضح.
- `FR-011C` `ANALYZED_APPROVED`: يمكن رفع شكوى مرتبطة بالمعاملة عند استمرار الخلاف قبل الاعتماد.
- `FR-011D` `ANALYZED_APPROVED`: الفاتورة غير المستجاب لها تبقى Pending Customer Approval؛ Reminder بعد 24h و48h، وبعد 72h تصبح `Overdue` دون Auto-Approval.
- `FR-011E` `ANALYZED_APPROVED`: طلب Revision يحتاج ملاحظة إلزامية ويحفظ Version History؛ لا حد أقصى صلب، وبعد ثاني Revision متتالٍ يظهر Complaint prompt.
- `FR-011F` `ANALYZED_APPROVED`: تتيح المراجعة الإدارية الوصول إلى سجلات YADD المرتبطة بالشكوى وفق الصلاحيات، بهدف تطبيق سياسات المنصة واتخاذ إجراء إداري عند وجود مخالفة.
- `FR-011G` `ANALYZED_APPROVED`: لا تتيح إدارة YADD إصدار حكم مالي/تجاري بين الطرفين أو إلزام دفع أو Refund أو Compensation.
- `FR-012` `ANALYZED_APPROVED`: عند اعتماد الفاتورة تحفظ في سجل الطرفين وتصبح Transaction `Completed`.
- `FR-012A` `ANALYZED_APPROVED`: `Completed` هي الحالة النهائية للـTransaction الناجحة؛ التقييمات التالية عمليات Post-Transaction ولا تنقلها إلى حالة `Closed`.

### Reviews / Reputation
- `FR-013` `ANALYZED_APPROVED`: لا يسمح بتقييم المستفيد للمقدم إلا إذا كان مرتبطًا بمعاملة Completed مع ذلك المقدم.
- `FR-014` `ANALYZED_APPROVED`: بعد اعتماد الفاتورة يصبح تقييم المقدم خطوة إلزامية على المستفيد.
- `FR-014A` `ANALYZED_APPROVED`: تقييم المستفيد للمقدم = Overall Stars 1–5 + Structured Textual Criteria حسب نوع Provider + Optional Comment.
- `FR-014B` `ANALYZED_APPROVED`: بعد Transaction Completed يعرض النظام للمقدم Prompt بارزًا لتقييم المستفيد، والتقييم اختياري ويمكن تخطيه.
- `FR-014C` `ANALYZED_APPROVED`: تقييم المقدم للمستفيد يتكون من ثلاثة مؤشرات 1–5: وضوح الطلب والتواصل، الالتزام بالاتفاق، حسن التعامل والتعاون؛ التعليق النصي اختياري.
- `FR-014D` `ANALYZED_APPROVED`: يعرض ملف المقدم عدد المعاملات المكتملة داخل YADD كمؤشر «عدد الأعمال».
- `FR-014E` `ANALYZED_APPROVED`: تجمع تقييمات المستفيد في سجل تعامل/سمعة محدود يظهر لمقدمي الخدمات والمنتجات فقط في سياق تعامل مشروع مع المستفيد.
- `FR-014F` `ANALYZED_APPROVED`: لا ينتج عن انخفاض تقييم المستفيد في MVP منع أو تعليق أو تخفيض ظهور أو أي عقوبة آلية.
- `FR-014G` `ANALYZED_APPROVED`: إكمال أو تخطي أي Rating بعد `Completed` لا يغير Transaction Status.

### Trust & Safety / Abuse
- `FR-SAFE-01` `ANALYZED_APPROVED`: يسمح للمستخدم بحظر مستخدم آخر لإيقاف التواصل المباشر.
- `FR-SAFE-02` `ANALYZED_APPROVED`: يسمح بالإبلاغ عن مستخدم/محادثة أو سلوك أو Portfolio/Catalog Item لإدارة YADD.
- `FR-SAFE-03` `ANALYZED_APPROVED`: البلاغ لا يؤدي وحده إلى عقوبة نهائية؛ يخضع للمراجعة.
- `FR-SAFE-04` `ANALYZED_APPROVED`: يمكن للنظام رفع Flag لأنماط إنشاء/إغلاق الطلبات غير الطبيعية للمراجعة دون عقوبة آلية لمجرد التكرار.
- `FR-SAFE-05` `PROPOSED/BLOCKED BY SAFE-REQ-Q01`: Thresholds الرصد لم تعتمد.

### AI Trust & Safety
- `FR-AI-01` `ANALYZED_APPROVED`: AI يساعد في Provider Verification دون قرار نهائي منفرد.
- `FR-AI-02` `ANALYZED_APPROVED`: يفحص النصوص/الصور/الأنشطة وفق السياسة ويولد Risk Flags.
- `FR-AI-03` `ANALYZED_APPROVED`: الحالات الحساسة والعقوبات النهائية عالية الأثر تحتاج مراجعة بشرية.
- `FR-AI-03A` `DERIVED_FROM_APPROVED_MODEL`: يجب أن تعرض بيانات الـFlag سبب/فئة الاشتباه بما يكفي لفهمها أثناء المراجعة البشرية؛ لا يعتمد هذا المتطلب قائمة فئات نهائية أو Thresholds.
- `FR-AI-04` `PROPOSED/BLOCKED BY AI-MOD-Q01/02`: السياسة والعتبات التفصيلية لم تعتمد.

### Provider Subscription
- `FR-SUB-01` `APPROVED_AS_BUSINESS_MODEL`: اشتراك دوري على Service Provider وProduct Provider دون عمولة معاملات.
- `FR-SUB-02` `ANALYZED_APPROVED`: خطة MVP التشغيلية مدتها 30 يومًا من StartDate إلى EndDate.
- `FR-SUB-03` `ANALYZED_APPROVED`: التحصيل خارجي ولا Payment Gateway للاشتراك في MVP.
- `FR-SUB-04` `ANALYZED_APPROVED`: موظف مخول يؤكد التفعيل/التجديد يدويًا.
- `FR-SUB-05` `ANALYZED_APPROVED`: يرسل النظام Reminder قبل 3 أيام وآخر قبل 24 ساعة من EndDate.
- `FR-SUB-06` `ANALYZED_APPROVED`: Expired يمنع Provider Response جديدة وDirect Transaction جديدة حتى التجديد، لكنه لا يوقف المعاملات الجارية أو تسجيل الدخول.

### Administration
- `FR-015` `PARTIALLY_ANALYZED`: يدير موظفو YADD الوظائف الإدارية وفق الصلاحيات.
- `FR-015A` `ANALYZED_APPROVED`: يسمح للمخول بمراجعة Verification وTrust & Safety Flags والبلاغات وتسجيل نتيجة من: No Violation, Warning, Content Removal, Temporary Restriction, Account Suspension, Permanent Ban وفق السياسة والمراجعة البشرية.
- `FR-015B` `ANALYZED_APPROVED`: يحتفظ النظام بسجل مناسب للأحداث الإدارية الحساسة.
- `FR-015C` `ANALYZED_APPROVED`: في Complaint مرتبطة بمعاملة، تقتصر صلاحية الإدارة على مراجعة سجلات المنصة وتطبيق سياسة YADD واتخاذ الإجراء الإداري المناسب؛ لا تعد الإدارة جهة تحكيم مالي/تجاري ولا تصدر التزامًا بالدفع أو الاسترداد أو التعويض.

### Notifications
- `FR-NOT-01` `ANALYZED_APPROVED`: In-App Notification هي القناة الافتراضية للأحداث التشغيلية.
- `FR-NOT-02` `ANALYZED_APPROVED`: يستخدم SMS للـOTP وأحداث أمن الحساب والإجراءات الحرجة على الحساب، ولا يستخدم لكل حدث.
- `FR-NOT-03` `ANALYZED_APPROVED`: البريد قناة اختيارية فقط إذا كان Verified؛ Push Notifications خارج Web MVP الحالي.

## 11. Non-Functional Requirements — Draft / Partial

- `NFR-SEC-01` `ANALYZED_APPROVED` في المبدأ: حماية الحساب والمحادثات والمرفقات وبيانات التحقق.
- `NFR-SEC-02` `ANALYZED_APPROVED`: وصول بيانات التحقق الحساسة مقيد ومسجل.
- `NFR-SEC-03` `ANALYZED_APPROVED_AS_ARCH_PRINCIPLE`: لا يعتمد Client/Browser/Mobile كمرجع نهائي للصلاحيات أو Business Rules؛ يطبق Backend/API التحقق النهائي من Authentication/Authorization والمدخلات الحساسة، بما في ذلك منع Guest من الوظائف المحمية وفق DEC-077.
- `NFR-PRV-01` `ANALYZED_APPROVED`: تقليل جمع/إظهار البيانات الشخصية وعدم جعل الموقع الدقيق أو رقم الهاتف جزءًا من Public Provider Profile.
- `NFR-AI-01` `ANALYZED_APPROVED`: AI Flags ليست إثباتًا قطعيًا.
- `NFR-USA-01` `ANALYZED_APPROVED` في المبدأ: يجب أن تعرض الواجهة خطوات ومصطلحات بسيطة للفئة المستهدفة، مع التحقق الميداني قبل الادعاء بالملاءمة.
- `NFR-USA-02` `NEEDS_EVIDENCE/BLOCKED BY UX-VAL-Q01`: معايير نجاح Usability/low-connectivity تحدد وتختبر على الفئة المستهدفة.
- `NFR-REL-01` `ANALYZED_APPROVED`: لا يعتبر عدم الرد على الفاتورة موافقة ولا تغلق Transaction تلقائيًا.
- `NFR-PER-01` `NEEDS_VERIFICATION`: أهداف الأداء بعد Prototype/Architecture.
- `NFR-AVL-01` `NEEDS_VERIFICATION`: متطلبات التوفر/التعامل مع الاتصال المتقطع تحتاج تحديدًا واقعيًا.
- `NFR-LEG-01` `NEEDS_LEGAL_VERIFICATION`: الاحتفاظ بوثائق الهوية/البيانات الحساسة يحتاج تحققًا قانونيًا.

## 12. Out of Scope — MVP / Current Boundary

- `OOS-01`: عمولة من معاملات المستخدمين.
- `OOS-02`: شبكة توصيل/سائقون/تتبع شحنات.
- `OOS-03`: التوسع خارج أمانة العاصمة.
- `OOS-04`: النقل وصيانة السيارات والورش الثقيلة.
- `OOS-05`: حسابات الشركات والمتاجر الكبرى.
- `OOS-06`: مكالمات صوتية/فيديو أو شبكة اجتماعية عامة.
- `OOS-07`: GPS Radius كأساس للأهلية الجغرافية.
- `OOS-08`: AI يصدر حظرًا نهائيًا عالي الأثر أو Verification نهائيًا دون إشراف بشري.
- `OOS-09`: Payment Gateway لتحصيل اشتراك المقدم في MVP.
- `OOS-10`: Change Order System مستقل.
- `OOS-11`: Payment/Wallet/Escrow/Refund أو تسجيل مبلغ العربون بين المستفيد والمقدم.
- `OOS-12`: Agreement entity مستقل في Core Transaction Model.
- `OOS-13`: Transaction state مستقلة باسم `Closed` بعد `Completed`.
- `OOS-14`: Financial/commercial arbitration أو إلزام Beneficiary/Provider بالدفع أو Refund أو Compensation بواسطة إدارة YADD.

## 13. Open Decisions Before v1.0

`SAFE-REQ-Q01`, `TX-CONC-Q01`, `UX-VAL-Q01`, `LOC-DATA-Q01`, `LOC-OPS-TIME-Q01`, `VER-RET-Q01`, `VER-LIC-Q01`, `AI-MOD-Q01`, `AI-MOD-Q02`, `AI-PROV-Q01`, `AI-RET-Q01`, `AI-APPEAL-Q01`, `SUB-PAY-Q01`، إضافة إلى سعر الاشتراك والظهور العام عند Expired.

- Provider Type switching after initial selection remains `Needs Verification / Team Decision`; no switching behavior is approved in the current SRS.

> **Baseline note:** إغلاق P0 الحالي يجعل Core Flow قابلًا للنمذجة، لكنه لا يحول هذه النسخة إلى Baselined SRS تلقائيًا؛ ما تزال مراجعة الاتساق والتتبع والاعتماد النهائي مطلوبة.