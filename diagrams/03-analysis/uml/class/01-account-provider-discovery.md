# Class Diagram — Account, Provider, Discovery and Portfolio

> **Status:** `REVIEW DRAFT — NOT BASELINED — SYNCHRONIZED 2026-09-11`
>
> **Type:** View 1 of one Conceptual Domain Model.

## Source basis

- `docs/03-analysis/11-ERD.md` — corrected Conceptual ERD.
- `DEC-008..014`, `DEC-030..033`, `DEC-041`, `DEC-045`, `DEC-064`, `DEC-066`, `DEC-070`, `DEC-074`, `DEC-076`.
- Current Account/Portal, Provider Activity and Location models.

## Diagram

```mermaid
classDiagram
    direction LR

    class User {
        String fullName
        String phone
        String accountStatus
    }

    class ProviderProfile {
        String providerType
        String verificationStatus
        String profileStatus
    }

    class ProviderActivity {
        String status
    }

    class Category {
        String name
        String categoryType
    }

    class Area {
        String name
        String areaType
    }

    class ProviderServiceArea
    class AreaAdjacency

    class ShowcaseItem {
        String itemType
        String description
        String originalMediaReference
        String displayMediaReference
        String status
    }

    class Request {
        String requestType
        String description
        Decimal indicativePrice
        String status
    }

    class ProviderResponse {
        Decimal proposedPrice
        Boolean requiresDeposit
        String note
        String status
    }

    User "1" --> "0..1" ProviderProfile : may own
    ProviderProfile "1" --> "0..*" ProviderActivity : defines
    Category "1" --> "0..*" ProviderActivity : classifies

    Area "0..1" --> "0..*" Area : parent of
    ProviderProfile "1" --> "0..*" ProviderServiceArea : serves through
    Area "1" --> "0..*" ProviderServiceArea : covered by
    Area "1" --> "0..*" AreaAdjacency : source area
    Area "1" --> "0..*" AreaAdjacency : adjacent area

    ProviderProfile "1" --> "0..*" ShowcaseItem : publishes

    User "1" --> "0..*" Request : creates
    Category "1" --> "0..*" Request : classifies
    Area "1" --> "0..*" Request : locates

    Request "1" --> "0..*" ProviderResponse : receives
    ProviderProfile "1" --> "0..*" ProviderResponse : submits
```

## Constraints and interpretation

- `User` واحد يمكنه امتلاك صفر أو `ProviderProfile` واحد؛ Beneficiary/Provider ليست Classes لحسابين منفصلين.
- `ProviderProfile.providerType` في MVP يأخذ نوعًا واحدًا فقط: `SERVICE` أو `PRODUCT`، ولا يمكن الجمع بينهما على الملف نفسه — DEC-074.
- يمكن لـProviderProfile امتلاك عدة `ProviderActivity`، وكل Activity تمثل تصنيفًا داخل نوع المقدم نفسه — DEC-076.
- `0..*` بين ProviderProfile وProviderActivity تسمح بوجود Draft Provider Profile دون تصنيفات مؤقتًا؛ قبل أهلية وظائف التقديم يجب وجود Activity واحدة على الأقل.
- يجب أن يكون `Category.categoryType` متوافقًا مع `ProviderProfile.providerType` لكل ProviderActivity.
- `Area` يمثل District/Neighborhood hierarchy بصورة مفاهيمية.
- `AreaAdjacency` يمثل قائمة جوار مُدارة وفق DEC-033، وليس GPS Radius. اتجاه/تناظر العلاقة وكيفية منع duplicates قرار Physical Design لاحق.
- `ProviderServiceArea` يمثل تغطية Provider للمناطق.
- `ShowcaseItem` يمثل Portfolio إذا كان النوع SERVICE وProduct Catalog إذا كان النوع PRODUCT باستخدام مفهوم عرض موحد.
- `Request.indicativePrice` اختياري وغير ملزم على مستوى المتطلبات.
- لكل Provider استجابة فعالة واحدة فقط لكل Request؛ هذا Business Constraint وليس مجرد multiplicity.
- `requiresDeposit` Boolean فقط ولا ينشئ Payment/Deposit lifecycle.

## Scope note

الـAttributes المعروضة مختارة لإظهار البنية المفاهيمية وليست قائمة exhaustive لكل الحقول أو الوسائط. Media storage والـPK/FK والـindexes والتفاصيل الفيزيائية تؤجل إلى Chapter Four.