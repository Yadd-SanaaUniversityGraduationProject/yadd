# UML Class Diagram Package — Conceptual Domain Model

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED THROUGH DEC-076`
>
> هذه الحزمة تمثل **Conceptual Domain Model واحدًا** مشتقًا من `docs/03-analysis/11-ERD.md`، ومقسّمًا إلى ثلاث Views مستقلة بصريًا لأسباب الوضوح والطباعة على A4. التقسيم لا يعني وجود ثلاثة نماذج أو ثلاثة Designs منفصلة.

## Working diagrams

1. `01-account-provider-discovery.md` — Account, Provider, Discovery, Location, Request and Portfolio.
2. `02-transaction-invoice-ratings.md` — Communication, Transaction, Invoice and Ratings.
3. `03-verification-subscription-trust.md` — Verification, Subscription, Block/Report, Safety Flags and Audit.

## Modeling rules

- المصدر الأعلى للمعنى يبقى Decision Register ثم SRS/Business Rules/Lifecycles/Use Cases والـConceptual ERD.
- لا تمثل `Beneficiary` و`Provider` كحسابات منفصلة؛ كلاهما أدوار سلوكية لنفس `User`.
- لا يوجد `Agreement` entity مستقل.
- لا توجد Payment/Escrow/Refund/Settlement entities داخل معاملات Beneficiary↔Provider.
- Attributes هنا مفاهيمية وليست exhaustive، ولا تستخدم visibility markers مثل `+/-/#` لأنها ليست قرارات Design معتمدة.
- PK/FK والـindexes والـSQL constraints والـcomposition/lifecycle ownership تبقى Design concerns في Chapter Four ما لم يحسمها مصدر أعلى.
- `Conversation ↔ Transaction` محسومة مفاهيميًا وفق DEC-075: Conversation واحدة بين نفس Beneficiary وProvider يمكن أن تضم صفرًا أو عدة Transactions عبر الزمن. طريقة الربط الفيزيائي للرسائل/الأحداث بمعاملة محددة تبقى Design concern في Chapter Four.
- `ProviderProfile → ProviderActivity` محسومة مفاهيميًا وفق DEC-076: يمكن لـDraft Provider Profile امتلاك `0..*` Activities، لكن أهلية وظائف Provider التي تتطلب نشاطًا/تصنيفًا تشترط وجود Activity واحدة على الأقل. طريقة فرض هذا الشرط وقيود uniqueness/type consistency في قاعدة البيانات تبقى Design concern في Chapter Four.

## Cross-view rule

أي Class مكرر بين View وأخرى مثل `User`, `ProviderProfile`, `Request`, `Conversation`, أو `Transaction` هو **نفس Conceptual Class**، وليس implementation duplicate.
