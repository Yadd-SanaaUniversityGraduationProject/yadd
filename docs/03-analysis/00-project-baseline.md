# خط أساس مشروع يَد | YADD

> **الحالة:** `DRAFT — TEAM REVIEW REQUIRED`
>
> **الغرض:** توحيد ما نعرفه قبل تحويله إلى متطلبات ونماذج.

## 1. تعريف المشروع

YADD منصة رقمية تستهدف تسهيل اكتشاف وطلب الخدمات المهنية والمنتجات المنزلية في أمانة العاصمة — صنعاء، مع تركيز معلن على تنظيم التعاملات وبناء الثقة.

## 2. Problem Hypothesis

بحسب وثائق المشروع الحالية توجد فرضيات مشكلة تتمثل في:

- صعوبة وصول المهنيين والأسر المنتجة إلى العملاء محليًا.
- غياب مسار منظم لطلبات الخدمات ومقارنة الاستجابات.
- صعوبة توثيق السعر/الاتفاق النهائي.
- الحاجة إلى تقييمات أكثر ارتباطًا بمعاملة فعلية.
- ضعف سجل التعاملات في القنوات غير المنظمة.

**الحالة:** `ASSUMPTION / PARTIALLY SUPPORTED` بحسب كل بند. مرجع الأدلة الحالي هو `SUR-01` + Document Analysis + Similar Systems + Research في `02-data-gathering.md`.

### Data-gathering clarification — 2026-09-03

- المشرف قبل الاكتفاء بالاستبيان كأداة جمع بيانات المستخدمين للمشروع.
- إجابات شخصين جُمعت شفهيًا باستخدام أسئلة الاستبيان نفسها وأدخلت في SUR-01؛ تعامل كـ`interviewer-administered questionnaire` ولا تضاعف كعينة مقابلات مستقلة.
- أي معلومات إضافية تذكرت من الحوار أو الملاحظة الميدانية لاحقًا لا تعامل كـFact أو مقابلة موثقة؛ يمكن تسجيلها فقط كـ`Retrospective Supplementary Evidence` مع فصل الملاحظة المباشرة عن الاستنتاج وعدم اختلاق اقتباسات/تفاصيل.

## 3. Scope — مستقر عالي المستوى

- `APPROVED`: أمانة العاصمة — صنعاء.
- `APPROVED`: الخدمات المهنية والفنية.
- `APPROVED`: منتجات الأسر المنتجة/المشاريع المنزلية.
- `APPROVED`: مسارا الاكتشاف الأساسيان: بحث مباشر أو نشر Request للمقدمين المناسبين.
- `APPROVED`: Portfolio/Catalog داخل Provider Profile مع آلية علامة مائية تعريفية وفق DEC-064.
- `APPROVED`: أي حركة مالية بين المستفيد والمقدم خارج YADD؛ لا Payment/Escrow/Refund، والعربون مجرد `RequiresDeposit` في Provider Response دون مبلغ.
- `OUT_OF_SCOPE`: المحافظات الأخرى في MVP.
- `OUT_OF_SCOPE`: بوابات Visa/MasterCard ومدفوعات معاملات المستخدمين داخل YADD.
- `OUT_OF_SCOPE`: إدارة النقل/التوصيل والسيارات/الورش الثقيلة.
- `OUT_OF_SCOPE`: الحسابات المؤسسية والمتاجر الكبرى.
- `OUT_OF_SCOPE`: Agreement entity مستقل في Core Transaction Model.

## 4. Core Model — Approved for Modeling

```text
Discovery
  ├─ Direct Search → Profile/Portfolio → Chat → Both Agree to Start
  └─ Request → Provider Responses → Chat/Compare → Selection
                                      ↓
                              Active Transaction
                                      ↓
                         Fulfillment / Execution
                                      ↓
                               Final Invoice
                                      ↓
                    Approve / Request Revision
                                      ↓
                          Transaction Completed
                                      ↓
              Beneficiary rates Provider — mandatory
                                      ↓
               Provider rates Beneficiary — optional
                                      ↓
                                    Close
```

- إغلاق Request قبل الاختيار ليس Transaction Cancellation.
- إلغاء Transaction بعد البدء يحتاج سببًا مسجلًا.
- التقييم المقابل للمستفيد اختياري ومحدود الظهور ولا يؤدي إلى عقوبات آلية في MVP.

## 5. Actors — Main Modeling View

- `Beneficiary`.
- `Provider` كActor عام، مع `Service Provider` و`Product Provider` كتخصصين عند الحاجة.
- `YADD Administrator` كActor عام في المخطط الرئيسي، مع بقاء Verification/Moderation/Subscription أدوار صلاحيات متخصصة في التفاصيل.

## 6. Technical Direction — Approved / Technology Details Partial

- YADD يتبع Client–Server Architecture.
- Backend/API مركزي هو المرجع النهائي لمعالجة البيانات والصلاحيات وBusiness Rules والتعامل مع قاعدة البيانات.
- واجهة الويب هي واجهة الاستخدام الأساسية في المرحلة الحالية.
- Flutter اتجاه معتمد كعميل Mobile لاحق يتصل بالـBackend/API نفسه.
- اختيار Framework الويب وBackend وقاعدة البيانات والمزودات التفصيلية يبقى خاضعًا لدراسة الجدوى والاعتماد التقني؛ ASP.NET Core/PostgreSQL مرشحان حاليًا ولا يحولهما هذا الملف إلى قرار نهائي.

## 7. Academic Delivery Direction — Supervisor Closure 2026-09-03

- التقرير باللغة العربية.
- Chapter Three يستخدم DFD وUML معًا وفق هيكل 1447.
- ERD ضمن Chapter Three.
- Chapter Four مطلوب بمستوى تصميم كامل، بما في ذلك Relation Schema وPK/FK/Constraints وData Dictionary وQuery Statements وتصميم الواجهات وهيكلها والنماذج والاستعلامات والتقارير.

## 8. المرحلة الحالية

- التخطيط الإداري: `ACTIVE` مع بوابة عاجلة لتسليم المخططات الرئيسية للمشرف في 5 سبتمبر 2026.
- البحث: `ACTIVE` ويحتاج مزامنة نهائية للأنظمة المشابهة والدراسات والفجوة.
- Data Gathering: الاستبيان منفذ ومحلل ومقبول من المشرف؛ Retrospective evidence إن أضيف يجب أن يبقى موسومًا بوضوح.
- SRS: `PARTIALLY ANALYZED — NOT BASELINED` لكنه متزامن مع P0 المغلقة حتى 2026-09-03.
- Modeling/Design: Core Flow أصبح قابلًا للنمذجة؛ DFD/UML/ERD القديمة تعتبر Synchronization Debt حتى إعادة بنائها وفق القرارات الحالية.
- Implementation: لم يبدأ وفق أدلة المستودع الحالية.
