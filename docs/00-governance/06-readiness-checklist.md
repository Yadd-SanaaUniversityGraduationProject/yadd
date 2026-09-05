# بوابة الجاهزية قبل اعتماد الفصول الأربعة للمناقشة الأولية

> **الحالة:** `ACTIVE — SYNCHRONIZED 2026-09-05`
>
> وجود مسودة فصل أو مخطط لا يعني اجتياز هذه البوابة. تستخدم القائمة لمنع اعتبار التحليل/التصميم نهائيًا أو جاهزًا للتسليم قبل تحقق البنود فعليًا.

## Governance
- [x] حسم GOV-Q01: نطاق Chapter Four في التسليم القريب — `DEC-059`.
- [x] حسم GOV-Q02: منهج التحليل والمخططات — DFD + UML معًا وفق `DEC-060`.
- [x] حسم GOV-Q03: لغة التقرير — العربية مع المصطلحات التقنية عند الحاجة وفق `DEC-061`.
- [x] حسم GOV-Q04: أداة جمع بيانات المستخدمين — Survey-only مقبول وفق `DEC-062` دون ادعاء مقابلات/Observation غير منفذة.
- [x] توثيق قرارات Core الحالية في Decision Register حتى `DEC-073`.

## Research
- [ ] ثلاثة أنظمة مشابهة على الأقل بمصادر موثقة ومراجعة نهائية صالحة للفصل.
- [ ] Comparison Matrix مكتملة للمستوى المطلوب في النسخة النهائية.
- [ ] كل استنتاج بحثي مستخدم أكاديميًا قابل للتتبع إلى Source Register/Evidence Map.

## Requirements
- [x] Stakeholders/Actors الأساسية متزامنة مع `DEC-067`.
- [ ] User Requirements مراجعة مراجعة Baseline نهائية.
- [x] FR مرقمة وحالاتها ظاهرة في SRS الحالي.
- [ ] NFR قابلة للقياس قدر الإمكان؛ البنود التي تحتاج Prototype/Evidence تبقى صريحة.
- [x] Business Rules للعمليات الحرجة متزامنة مع Core Decisions الحالية، بما فيها `DEC-073`.
- [ ] AI detailed policy/provider/threshold/retention ما تزال Needs Verification؛ لا تعتبر محسومة.
- [x] الاستثناءات الأساسية والإلغاء والنزاعات موثقة؛ السياسات الرقمية الثانوية المفتوحة تبقى Needs Verification.

## Modeling
- [ ] Main Use Case Diagram بصيغة UML قياسية نهائية + Specifications مراجعة.
- [ ] Activity/Sequence/Class بصيغها النهائية للمناقشة؛ Working Activity/Sequence موجودة وClass derivation ما يزال مطلوبًا.
- [ ] DFD Context + Level 0 بصيغة نهائية قابلة للطباعة وفق `DEC-060`.
- [ ] ERD متتبع إلى المتطلبات ومراجع بصريًا للنسخة المقدمة.
- [x] Process/Data Flow/Data Store descriptions موجودة ومزامنة مع Core Model.

## Design
- [ ] Relation Schema مشتق من ERD الحالي ومراجع.
- [ ] Data Dictionary متزامن مع Relation Schema والقيود المعتمدة.
- [ ] Interface hierarchy/wireframes مرتبطة بالUse Cases الحالية.
- [ ] Forms/queries/reports محددة بالقدر الأكاديمي المطلوب دون اختراع وظائف.

## Project Management
- [ ] Economic/Technical/Operational Feasibility مكتملة ومدعومة.
- [x] Work Plan الحالي يتضمن Task Schedule/Gantt/PERT/Closure Tracker وفق Roadmap v3.
- [x] Risk Register محدث مع Roadmap v3.

## Consistency
- [ ] لا يوجد متطلب نهائي بلا مصدر/قرار بعد المراجعة النهائية.
- [ ] لا توجد ميزة في التصميم غير موجودة في SRS/قرار حاكم.
- [ ] لا يوجد كيان ERD/Relation Schema بلا حاجة موثقة.
- [ ] لا توجد حالات Lifecycle متعارضة بين الوثائق الحالية.
- [ ] حالة كل وثيقة محدثة في Document Register بعد آخر مزامنة.
- [ ] الفصول المشتقة تشير إلى النسخ الحالية ولا تتغلب على Sources of Truth.

بعد اجتياز هذه البوابة يمكن تثبيت Preliminary Defense Snapshot ثم الانتقال لاحقًا إلى Baseline رسمي بحسب مراجعة الفريق/المشرف. الفصول الموجودة في `docs/05-report-drafts/` تبقى Derived Drafts حتى ذلك الحين.
