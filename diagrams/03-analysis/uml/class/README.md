# UML Class Diagram Package — Detailed Analysis Class Model

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-12 THROUGH DEC-076`
>
> هذه الحزمة تمثل **Detailed Analysis Class Model واحدًا** مشتقًا من مصادر التحليل الحاكمة في المشروع، ومقسّمًا إلى ثلاث Views مستقلة بصريًا لأسباب الوضوح والطباعة على A4. التقسيم لا يعني وجود ثلاثة نماذج أو ثلاثة Designs منفصلة.

## Working diagrams

1. `01-account-provider-discovery.md` — Account, Provider, Discovery, Location, Request and Portfolio.
2. `02-transaction-invoice-ratings.md` — Communication, Transaction, Invoice and Ratings.
3. `03-verification-subscription-trust.md` — Verification, Subscription, Block/Report, Safety Flags and Audit.

## Modeling rules

- المصدر الأعلى للمعنى يبقى Decision Register ثم SRS/Business Rules/Lifecycles/Use Cases والـConceptual ERD.
- لا تمثل `Beneficiary` و`Provider` كحسابات منفصلة؛ كلاهما أدوار سلوكية لنفس `User`.
- لا يوجد `Agreement` entity مستقل.
- لا توجد Payment/Escrow/Refund/Settlement entities داخل معاملات Beneficiary↔Provider.
- تعرض الـViews Attributes وData Types وVisibility وOperations عندما يوجد لها سند تحليلي كافٍ من المتطلبات أو Use Cases أو Lifecycles أو ERD.
- الـOperations المعروضة تمثل **Analysis-level responsibilities** وليست API signatures أو method implementations نهائية، وVisibility markers لا تعتمد access modifiers خاصة بلغة برمجة بعينها.
- لا تُملأ الـClasses أو العلاقات بتفاصيل غير مثبتة لمجرد جعل الرسم أكثر امتلاءً. العناصر المفتوحة تبقى `Needs Verification` أو Chapter Four Design concerns.
- الـPK/FK الفيزيائية، الـindexes، SQL constraints، أسماء الجداول، storage implementation، framework-specific methods، والـcomposition/lifecycle ownership تبقى Design concerns في Chapter Four ما لم يحسمها مصدر أعلى.
- بعض العناصر الداعمة مثل `RequestImage`, `MessageAttachment`, `InvoiceImage`, و`SystemEvent` هي **Derived Analysis Elements** من متطلبات وسلوكيات معتمدة، ولا تعني اعتماد schema أو storage design نهائي.
- `Conversation ↔ Transaction` محسومة مفاهيميًا وفق DEC-075: Conversation واحدة بين نفس Beneficiary وProvider يمكن أن تضم صفرًا أو عدة Transactions عبر الزمن. طريقة الربط الفيزيائي للرسائل/الأحداث بمعاملة محددة تبقى Design concern في Chapter Four.
- `ProviderProfile → ProviderActivity` محسومة مفاهيميًا وفق DEC-076: يمكن لـDraft Provider Profile امتلاك `0..*` Activities، لكن أهلية وظائف Provider التي تتطلب نشاطًا/تصنيفًا تشترط وجود Activity واحدة على الأقل. طريقة فرض هذا الشرط وقيود uniqueness/type consistency في قاعدة البيانات تبقى Design concern في Chapter Four.
- لا تستخدم Composition في الحزمة الحالية لأن object-lifetime/deletion ownership لم يثبت بعد من مصادر التحليل المعتمدة.

## Cross-view rule

أي Class مكرر بين View وأخرى مثل `User`, `ProviderProfile`, `Request`, `ProviderResponse`, `Conversation`, `ShowcaseItem`, أو `Transaction` هو **نفس Analysis Class**، وليس implementation duplicate.

كل View يعرض فقط الـAttributes/Operations اللازمة لسياقه. لذلك لا تعتبر نسخة الـClass في View منفردة تعريفًا كاملًا بالضرورة؛ التعريف التحليلي الكامل يُقرأ من **اتحاد التفاصيل المتسقة عبر الـViews الثلاثة** مع الرجوع إلى المصادر الحاكمة عند أي تعارض.

## Current review state

- View 1: converted from conceptual summary to Detailed Analysis Class View.
- View 2: converted from conceptual summary to Detailed Analysis Class View.
- View 3: converted from conceptual summary to Detailed Analysis Class View.
- Semantic package review completed for cross-view consistency; package remains `REVIEW DRAFT — NOT BASELINED` until visual/A4 review and final academic packaging are completed.
