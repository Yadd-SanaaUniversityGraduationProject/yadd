# بوابة الجاهزية قبل اعتماد الفصول الأربعة للمناقشة الأولية

> **الحالة:** `ACTIVE — SYNCHRONIZED 2026-09-20 THROUGH DEC-091`
>
> وجود مسودة فصل أو مخطط لا يعني اجتياز هذه البوابة. تستخدم القائمة لمنع اعتبار التحليل/التصميم نهائيًا أو جاهزًا للتسليم قبل تحقق البنود فعليًا.

## Governance
- [x] حسم GOV-Q01: نطاق Chapter Four في التسليم القريب — `DEC-059`.
- [x] حسم GOV-Q02: منهج التحليل والمخططات — DFD + UML معًا وفق `DEC-060`.
- [x] حسم GOV-Q03: لغة التقرير — العربية مع المصطلحات التقنية عند الحاجة وفق `DEC-061`.
- [x] حسم GOV-Q04: أداة جمع بيانات المستخدمين — Survey-only مقبول وفق `DEC-062` دون ادعاء مقابلات/Observation غير منفذة.
- [x] توثيق قرارات Core الحالية في Decision Register حتى `DEC-091`.
- [x] اعتماد Guest public browsing/authentication boundary في `DEC-077` مع إبقاء Backend/API مرجع الصلاحيات.

## Research
- [ ] ثلاثة أنظمة مشابهة على الأقل بمصادر موثقة ومراجعة نهائية صالحة للفصل.
- [ ] Comparison Matrix مكتملة للمستوى المطلوب في النسخة النهائية.
- [ ] كل استنتاج بحثي مستخدم أكاديميًا قابل للتتبع إلى Source Register/Evidence Map.

## Requirements
- [x] Stakeholders/Actors الأساسية متزامنة مع `DEC-067/077`: Guest, Beneficiary, Provider, YADD Administrator.
- [ ] User Requirements مراجعة مراجعة Baseline نهائية.
- [x] FR مرقمة وحالاتها ظاهرة في SRS v0.9.10، بما فيها `UR/FR-GST-*`.
- [ ] NFR قابلة للقياس قدر الإمكان؛ البنود التي تحتاج Prototype/Evidence تبقى صريحة.
- [x] Business Rules للعمليات الحرجة متزامنة مع Requirements Closure حتى `DEC-090` في نطاقها؛ DEC-091 قرار Stack تقني ولا يضيف Business Rule جديدة بذاته.
- [x] Public/private access boundary موثقة: Guest public browse فقط، protected actions authenticated، phone/direct private contact غير Public Profile.
- [ ] AI detailed policy/provider/threshold/retention ما تزال Needs Verification؛ لا تعتبر محسومة.
- [x] الاستثناءات الأساسية والإلغاء والنزاعات موثقة؛ Request 24/48/72، Direct Start 12h، Invoice 24/48/72، Subscription 30d أغلقت. السياسات الأخرى المفتوحة تبقى Needs Verification.

## Modeling
- [ ] Main Use Case Diagram بصيغة UML قياسية نهائية + Specifications مراجعة؛ Working semantic model يشمل Guest وAuthentication boundary، لكن إعادة الرسم الأكاديمي النهائية ما تزال مطلوبة.
- [ ] Activity/Sequence بصيغها النهائية للمناقشة؛ Working semantic sources متزامنة، وحزمة Activity تحتوي 20 مخططًا مرقمًا وحزمة Sequence تحتوي 20 rendered diagrams؛ ما يزال Visual/A4 review والتصدير الأكاديمي النهائي مطلوبين.
- [x] Class Diagram package مشتق ومزامن دلاليًا مع ERD والقرارات حتى `DEC-091`؛ يشمل TradeName/Hybrid Rating/Service Identity Verification/Notification؛ يبقى التصدير/المراجعة البصرية النهائية مفتوحًا.
- [ ] DFD Context + Level 0 بصيغة نهائية قابلة للطباعة وفق `DEC-060`؛ Working semantics synchronized through DEC-091; final standard-notation/A4 redraw remains open.
- [ ] ERD متتبع إلى المتطلبات ومراجع بصريًا للنسخة المقدمة؛ بنيويًا متزامن حتى DEC-091 ولا يحتوي Guest entity؛ DEC-091 لم يغير الـConceptual ERD.
- [x] Process/Data Flow/Data Store descriptions موجودة ومزامنة مع Core Model حتى DEC-091.

## Design
- [ ] Relation Schema مشتق من ERD الحالي ومراجع؛ Working draft أعيدت مزامنته عبر DEC-091 لكنه ما يزال غير Baselined والقرارات الفيزيائية المفتوحة ظاهرة.
- [ ] Data Dictionary متزامن مع Relation Schema والقيود المعتمدة؛ Working skeleton أعيدت مزامنته عبر DEC-091، بينما SQL types/constraints النهائية TBD.
- [ ] Interface hierarchy/wireframes مرتبطة بالUse Cases الحالية؛ Guest public screens/auth gate موثقة، لكن Figma/final UX validation pending.
- [ ] Forms/queries/reports محددة بالقدر الأكاديمي المطلوب دون اختراع وظائف.

## Project Management
- [ ] Economic/Technical/Operational Feasibility مكتملة ومدعومة.
- [x] Work Plan الحالي يتضمن Task Schedule وGantt وClosure Tracker وفق Roadmap v3.
- [ ] PERT Diagram/Network موجود ومراجع داخل Work Plan أو كمخرج مرتبط به؛ لا يعتبر مكتملًا حتى يظهر فعليًا وفق متطلب الجامعة.
- [x] Risk Register محدث مع Roadmap v3.

## Consistency
- [ ] لا يوجد متطلب نهائي بلا مصدر/قرار بعد المراجعة النهائية.
- [x] DEC-078..090 متتبعة عبر SRS → Business Rules → Use Cases/Lifecycles → DFD/Traceability → ERD/Class boundary → Interface/Database/Data Dictionary drafts؛ DEC-091 متتبع كقرار تقني عبر Project Baseline/Feasibility/DFD-ERD boundary/Database Design/Data Dictionary ولا يُعامل كRequirement Closure.
- [ ] لا توجد ميزة في التصميم غير موجودة في SRS/قرار حاكم.
- [ ] لا يوجد كيان ERD/Relation Schema بلا حاجة موثقة.
- [ ] لا توجد حالات Lifecycle متعارضة بين الوثائق الحالية.
- [x] حالة الوثائق المتأثرة بـDEC-078..091 محدثة في Document Register بعد مزامنة 2026-09-20.
- [x] Chapter Three derived draft متزامن نصيًا عبر DEC-090 Requirements Closure؛ مخططات DFD/UML/ERD working sources أصبحت موثقة عبر DEC-091 دون إدخال تفاصيل الـstack داخل التحليل المنطقي؛ يلزم تحديث الفصل المشتق عند التجميع النهائي ثم redraw/export.
- [ ] الفصول المشتقة النهائية تشير إلى النسخ الحالية ولا تتغلب على Sources of Truth.

بعد اجتياز هذه البوابة يمكن تثبيت Preliminary Defense Snapshot ثم الانتقال لاحقًا إلى Baseline رسمي بحسب مراجعة الفريق/المشرف. الفصول الموجودة في `docs/05-report-drafts/` تبقى Derived Drafts حتى ذلك الحين.
