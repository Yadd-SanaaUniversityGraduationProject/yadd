# UML Class Diagram Package — Conceptual Domain Model

> **Status:** `REVIEW DRAFT — NOT BASELINED`
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
- `Conversation ↔ Transaction` multiplicity وminimum cardinality لـ`ProviderProfile → ProviderActivity` ما تزالان بحاجة Reconciliation/Verification قبل Relation Schema النهائي.

## Cross-view rule

أي Class مكرر بين View وأخرى مثل `User`, `ProviderProfile`, `Request`, `Conversation`, أو `Transaction` هو **نفس Conceptual Class**، وليس implementation duplicate.
