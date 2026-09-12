# UML Class Diagram Package — Detailed Analysis Class Model

> **Status:** `SEMANTICALLY VERIFIED — TEAM APPROVED — NOT BASELINED — VISUAL/A4 FINALIZATION PENDING`
>
> هذه الحزمة تمثل **Detailed Analysis Class Model واحدًا** مشتقًا من مصادر التحليل الحاكمة في المشروع. يوجد **Integrated Master View** للنموذج كاملًا، إضافة إلى ثلاث Detailed Subject-Area Views مستقلة بصريًا لأسباب الوضوح والطباعة على A4. هذا لا يعني وجود أربعة نماذج أو Designs منفصلة.

## Working diagrams

0. `00-integrated-master.md` — Integrated Master View of the complete Detailed Analysis Class Model.
1. `01-account-provider-discovery.md` — Account, Provider, Discovery, Location, Request and Portfolio.
2. `02-transaction-invoice-ratings.md` — Communication, Transaction, Invoice and Ratings.
3. `03-verification-subscription-trust.md` — Verification, Subscription, Block/Report, Safety Flags and Audit.

## Decomposition rationale

التقسيم إلى Views 1–3 يعتمد على **functional cohesion and responsibility boundaries**:

- View 1 يجمع Account / Provider / Discovery / Request concepts.
- View 2 يجمع Communication / Transaction / Invoice / Ratings lifecycle concepts.
- View 3 يجمع Verification / Subscription / Trust / Administration concepts.

الـMaster يجمع هذه المناطق في رسم واحد، بينما الـDetailed Views تعرض كل منطقة بمستوى قراءة أفضل. الـClasses المشتركة بين المناطق تعمل كـAnchor Classes ولا تمثل نسخًا مستقلة.

## Modeling rules

- المصدر الأعلى للمعنى يبقى Decision Register ثم SRS/Business Rules/Lifecycles/Use Cases والـConceptual ERD.
- لا تمثل `Beneficiary` و`Provider` كحسابات منفصلة؛ كلاهما أدوار سلوكية لنفس `User`.
- لا يوجد `Agreement` entity مستقل.
- لا توجد Payment/Escrow/Refund/Settlement entities داخل معاملات Beneficiary↔Provider.
- تعرض الـViews Attributes وData Types وVisibility وOperations عندما يوجد لها سند تحليلي كافٍ من المتطلبات أو Use Cases أو Lifecycles أو ERD.
- الـOperations المعروضة تمثل **Analysis-level responsibilities** وليست API signatures أو method implementations نهائية، وVisibility markers لا تعتمد access modifiers خاصة بلغة برمجة بعينها.
- `selectProviderType(type)` يمثل اختيار نوع Provider Profile أثناء الإعداد، ولا يعتمد تغيير النوع لاحقًا؛ Type Switching يبقى غير محسوم.
- لا تُملأ الـClasses أو العلاقات بتفاصيل غير مثبتة لمجرد جعل الرسم أكثر امتلاءً. العناصر المفتوحة تبقى `Needs Verification` أو Chapter Four Design concerns.
- الـPK/FK الفيزيائية، الـindexes، SQL constraints، أسماء الجداول، storage implementation، framework-specific methods، والـcomposition/lifecycle ownership تبقى Design concerns في Chapter Four ما لم يحسمها مصدر أعلى.
- بعض العناصر الداعمة مثل `RequestImage`, `MessageAttachment`, `InvoiceImage`, و`SystemEvent` هي **Derived Analysis Elements** من متطلبات وسلوكيات معتمدة، ولا تعني اعتماد schema أو storage design نهائي.
- `Conversation ↔ Transaction` محسومة مفاهيميًا وفق DEC-075: Conversation واحدة بين نفس Beneficiary وProvider يمكن أن تضم صفرًا أو عدة Transactions عبر الزمن، مع القيد **`{unique Conversation per Beneficiary–Provider pair}`**. طريقة الفرض الفيزيائي وربط الرسائل/الأحداث بمعاملة محددة تبقى Design concern في Chapter Four.
- `ProviderProfile → ProviderActivity` محسومة مفاهيميًا وفق DEC-076: يمكن لـDraft Provider Profile امتلاك `0..*` Activities، لكن أهلية وظائف Provider التي تتطلب نشاطًا/تصنيفًا تشترط وجود Activity واحدة على الأقل. طريقة فرض هذا الشرط وقيود uniqueness/type consistency في قاعدة البيانات تبقى Design concern في Chapter Four.
- `ProviderProfile ↔ Area` و`Area ↔ Area` ممثلتان كـAssociations في Class Model، وتقابلان مفاهيميًا associative entities `PROVIDER_SERVICE_AREA` و`AREA_ADJACENCY` في ERD. هذا اختلاف تمثيل بين نموذج سلوكي/كائني ونموذج بيانات، وليس تعارضًا دلاليًا.
- `SafetyFlag.reasonCategory` يمثل سبب/فئة الاشتباه اللازمة للمراجعة البشرية؛ قائمة القيم والـthresholds تبقى مفتوحة.
- لا تستخدم Composition في الحزمة الحالية لأن object-lifetime/deletion ownership لم يثبت بعد من مصادر التحليل المعتمدة.

## Cross-view rule

أي Class مكرر بين View وأخرى مثل `User`, `ProviderProfile`, `Request`, `ProviderResponse`, `Conversation`, `ShowcaseItem`, أو `Transaction` هو **نفس Analysis Class**، وليس implementation duplicate.

كل View يعرض فقط الـAttributes/Operations اللازمة لسياقه. لذلك لا تعتبر نسخة الـClass في View منفردة تعريفًا كاملًا بالضرورة؛ التعريف التحليلي الكامل يُقرأ من **اتحاد التفاصيل المتسقة عبر الـViews الثلاثة**، ويظهر هذا الاتحاد في `00-integrated-master.md`.

## Current review state

- Integrated Master: semantically reviewed against the three detailed views and higher analysis sources.
- View 1: semantically verified and team approved.
- View 2: semantically verified and team approved.
- View 3: semantically verified and team approved.
- Semantic consistency checked against Decision Register, SRS, Business Rules, Use Cases, ERD and Traceability Matrix.
- Package remains `NOT BASELINED` because the SRS is not baselined and Visual/A4 finalization is still pending.
