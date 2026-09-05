# تحليل الوضع الحالي والمشكلة

> **الحالة:** `DRAFT — SURVEY EVIDENCE AVAILABLE; SURVEY-ONLY APPROACH ACCEPTED; MORE CORROBORATION MAY BE NEEDED`

## Current System / Current Practice

لا يوجد في المصادر الحالية نظام واحد رسمي يمكن وصفه بأنه "النظام الحالي" لـYADD. الأقرب هو **مجموعة ممارسات وقنوات غير موحدة** للوصول والتعامل بين العملاء ومقدمي الخدمات/المشاريع المنزلية.

يجب أن يعتمد وصف الواقع على الأدلة المنفذة فعليًا: `SUR-01`، Document Analysis، Similar Systems والمصادر البحثية. لا تُنسب للمشروع مقابلات أو User Observation لم تُنفذ.

## Problem Hypotheses

| ID | الفرضية | الحالة | الدليل الحالي/المطلوب |
|---|---|---|---|
| PRB-01 | الوصول المحلي لمقدم الخدمة/العميل غير منظم أو صعب | `PARTIALLY SUPPORTED / NEEDS CAUTION` | `SUR-01:B-Q01,B-Q02,B-Q04` + Similar Systems/Research |
| PRB-02 | الاستجابات/الأسعار والمقارنة قد تتطلب تواصلًا منفصلًا وغير موحد | `PARTIALLY SUPPORTED / NEEDS CAUTION` | `SUR-01:B-Q04` + Research/Similar Systems |
| PRB-03 | الاتفاق النهائي على السعر قد لا يبقى كسجل موحد | `PARTIALLY SUPPORTED / NEEDS CAUTION` | `SUR-01:B-Q07,P-Q03`؛ لا يصح الادعاء بانعدام السجل لأن واتساب يوفر سجلًا في حالات كثيرة |
| PRB-04 | التقييمات غير المرتبطة بمعاملة قد تكون أقل موثوقية | `RESEARCH HYPOTHESIS` | مصادر الثقة/السمعة + Similar Systems؛ الاستبيان يقيس الأهمية ولا يثبت ضعف أنظمة التقييم الحالية |
| PRB-05 | مقدم الخدمة يحتاج معلومات تساعده في تقييم التعامل مع العميل | `PARTIALLY SUPPORTED` | `SUR-01:S-Q05,S-Q06`؛ العينة صغيرة ولا تعمم |

## Opportunities — لا تتحول تلقائيًا إلى Scope

- تنظيم دورة Request → Provider Responses → Selection → Transaction، مع Direct Search كمسار بديل.
- ربط تقييم Provider بمعاملة Completed داخل YADD، مع تقييم Beneficiary الاختياري وفق القرار الحالي.
- تحسين الاكتشاف الجغرافي ضمن نطاق الخدمة.
- حفظ سجل Transaction/Invoice واضح داخل المنصة.

الحالة: `PROPOSED/ANALYZED OPPORTUNITIES` بحسب ما تقرره Sources of Truth الأعلى، ولا تستخدم نتائج الاستبيان وحدها لإثبات نجاح الحل. لا يوجد `Agreement` entity مستقل في Core Model الحالي.

## قرار جمع البيانات الحالي

حُسم `GOV-Q04` وفق `DEC-062`: قبل المشرف الاستبيان كأداة جمع بيانات المستخدمين الرسمية للمشروع. الإجابات الشفهية باستخدام أسئلة الاستبيان نفسها تعامل ضمن `SUR-01` كـinterviewer-administered questionnaire وليست مقابلات مستقلة.

لا ينسب المشروع لنفسه Interviews أو User Observation لم تنفذ. تعتمد الأدلة الميدانية للمستخدمين على `SUR-01` مع الاستفادة من المصادر البحثية وفحص الأنظمة المشابهة.

> **Academic Compliance:** يبقى نص هيكل 1447 الأصلي كما هو، بما فيه ذكر Interviews وObservation، لكن حالة تطبيق المشروع الحالية موثقة بقرار المشرف `DEC-062`. أي توجيه أكاديمي لاحق يغير ذلك يعامل كتحديث جديد ولا يفترض مسبقًا.

## المطلوب لإغلاق الوثيقة

- دمج نتائج `SUR-01` بصورة نهائية مع Similar Systems/Research.
- عدم تعميم نتائج عينة الاستبيان خارج حدودها.
- فصل المشكلة عن الحل المقترح.
- تحديد Prioritized Problems المدعومة بما يكفي من الأدلة.
- إبقاء أي Claim غير مدعوم بالكامل مصنفًا بوضوح بدل تحويله إلى Fact.
