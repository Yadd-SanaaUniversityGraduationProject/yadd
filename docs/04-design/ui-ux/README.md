# YADD UI/UX Working Design Package

> **Status:** WORKING DESIGN PACKAGE
>
> هذا القسم يجمع تفاصيل عمل الهوية البصرية وتجربة المستخدم والواجهات. لا يستبدل مصادر الحقيقة الأعلى في المشروع، ولا يحوّل اقتراحات التصميم إلى Requirements أو Business Rules أو Team Decisions رسمية.

## Governance

ترتيب السلطة عند التعارض:

1. ملفات الجامعة الأصلية.
2. `docs/00-governance/02-decision-register.md`.
3. `docs/03-analysis/05-SRS.md` بحسب حالة الاعتماد والتتبع.
4. `docs/03-analysis/06-business-rules.md`.
5. `docs/04-design/03-interface-design.md` للـinterface hierarchy الحالية.
6. هذا المجلد كتفاصيل عمل وتصميم مشتقة.

إذا ظهر تعارض، لا يُحسم داخل هذا المجلد بصمت؛ يُصنّف كـSynchronization أو Decision أو Needs Verification حسب نوعه.

## Purpose

الغرض من هذا القسم هو:

- حفظ مرجع الهوية البصرية الجاري اعتماده.
- تتبع جميع الشاشات المطلوبة وحالتها.
- توثيق User Flows قبل التصميم النهائي.
- تثبيت مبادئ UX وUI Foundation بعد المراجعة.
- توثيق مواصفات الشاشات والحالات وليس الصور فقط.
- حفظ نتائج Usability Validation لاحقًا.
- توثيق رابط Figma وحالة الـhandoff دون جعل Figma مصدرًا للمتطلبات.

## Files

| File | Purpose | Current Status |
|---|---|---|
| `01-brand-system.md` | هوية YADD البصرية ومواصفاتها | IN PROGRESS |
| `02-screen-inventory.md` | قائمة الواجهات وتتبعها إلى المصادر | IN PROGRESS |
| `03-user-flows.md` | المسارات الوظيفية الأساسية | NOT STARTED |
| `04-ux-principles.md` | مبادئ UX والقيود التصميمية | NOT STARTED |
| `05-ui-foundation.md` | Colors / Type / Spacing / Components | NOT STARTED |
| `06-screen-specifications.md` | مواصفات تفصيلية لكل شاشة | NOT STARTED |
| `07-usability-validation.md` | اختبارات القابلية للاستخدام والنتائج | NOT STARTED |
| `08-figma-handoff.md` | رابط Figma، الصفحات، وحالة النقل | NOT STARTED |

## Relationship to Chapter Four

`docs/04-design/03-interface-design.md` يبقى وثيقة التصميم الأكاديمية الأساسية الحالية للفصل الرابع. هذا المجلد هو Working Design Package تفصيلي؛ بعد استقرار التصميم والتحقق منه، تُزامن النتائج اللازمة إلى وثائق الفصل الرابع دون تغيير قواعد العمل أو النطاق من داخل هذا القسم.

## Information Classification

كل معلومة مهمة يجب أن تُفهم وفق تصنيف المشروع: Fact / Team Decision / Evidence / Inference / Assumption / Proposal / Needs Verification / Legacy.

وجود عنصر في هذا المجلد لا يعني تلقائيًا أنه Approved Requirement أو Team Decision رسمي.