import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Screen, TopBar, MockNote } from '../components/Shell.jsx';

// Prototype gallery: every P0 screen with traceability IDs (demo + screenshots aid)
const GROUPS = [
  {
    title: 'الزائر العام — Public / Guest',
    items: [
      ['PUB-01', 'الرئيسية العامة / الاكتشاف', '/'],
      ['PUB-02', 'البحث / التصفية', '/search'],
      ['PUB-03', 'نتائج البحث', '/results'],
      ['PUB-04', 'ملف المقدم العام', '/provider/pr-1'],
      ['PUB-05', 'معرض الأعمال / الكتالوج', '/provider/pr-1/works'],
      ['PUB-06', 'بوابة تسجيل الدخول', '/gate'],
    ],
  },
  {
    title: 'الحساب — Account / Portal',
    items: [
      ['AUTH-01', 'تسجيل الدخول', '/signin'],
      ['AUTH-02', 'إنشاء حساب + تحقق الهاتف', '/signup'],
      ['AUTH-03', 'اختيار بوابة البداية', '/portal'],
      ['AUTH-04', 'التبديل بين البوابات', '/switch'],
      ['AUTH-05', 'استعادة كلمة المرور', '/forgot'],
      ['AUTH-06', 'إدارة الحساب', '/account'],
    ],
  },
  {
    title: 'المستفيد — Beneficiary (يتطلب دخولًا)',
    items: [
      ['BEN-01', 'رئيسية المستفيد', '/b'],
      ['BEN-02', 'طلباتي', '/b/requests'],
      ['BEN-03', 'إنشاء طلب', '/b/requests/new'],
      ['BEN-04', 'تفاصيل الطلب', '/b/requests/rq-1'],
      ['BEN-05', 'استجابات المقدمين', '/b/requests/rq-1/responses'],
      ['BEN-06', 'مقارنة الاستجابات', '/b/requests/rq-1/compare'],
      ['BEN-07', 'تأكيد اختيار المقدم', '/b/requests/rq-1/confirm/rs-1'],
    ],
  },
  {
    title: 'المقدم — Provider (يتطلب دخولًا)',
    items: [
      ['PRO-01', 'رئيسية المقدم', '/p'],
      ['PRO-02', 'الطلبات المناسبة', '/p/requests'],
      ['PRO-03', 'تفاصيل الطلب المنشور', '/p/requests/sq-1'],
      ['PRO-04', 'إرسال استجابة', '/p/requests/sq-1/respond'],
      ['PRO-05', 'إدارة الاستجابة', '/p/requests/sq-1/my-response'],
    ],
  },
];

export default function PrototypeIndex() {
  const nav = useNavigate();
  return (
    <Screen id="_INDEX" name="فهرس شاشات النموذج">
      <TopBar title="فهرس الشاشات (P0)" back="/" />
      <MockNote>للقطات نظيفة للفصل الرابع أضف <b className="ltr">?clean=1</b> لرابط أي شاشة لإخفاء الشارات.</MockNote>
      {GROUPS.map((g) => (
        <div key={g.title} className="index-group">
          <h3>{g.title}</h3>
          {g.items.map(([id, name, to]) => (
            <Link key={id + to} className="index-link" to={to}>
              <code>{id}</code>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      ))}
      <button className="btn btn-secondary btn-block" onClick={() => nav('/')}>
        العودة للرئيسية العامة
      </button>
    </Screen>
  );
}
