import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Shell.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../state/AppState.jsx';

// Derived UX — public "More" menu
export default function More() {
  const nav = useNavigate();
  const { authed, portal } = useApp();
  const row = (icon, title, desc, to) => (
    <div className="card tappable" onClick={() => nav(to)} role="button" tabIndex={0}>
      <div className="row-between">
        <div>
          <b>{title}</b>
          {desc && <p className="muted small mt8">{desc}</p>}
        </div>
        <span className="cat-ic"><Icon name={icon} /></span>
      </div>
    </div>
  );
  return (
    <Screen id="MORE" name="المزيد" nav="public" active="more">
      <div className="h2" style={{ margin: '6px 2px 12px' }}>المزيد</div>
      {authed
        ? row('user', 'الحساب', `البوابة الحالية: ${portal === 'provider' ? 'مقدم' : 'مستفيد'}`, '/account')
        : row('user', 'تسجيل الدخول / إنشاء حساب', 'للوصول إلى الطلبات والمعاملات.', '/signin')}
      {authed && row('swap', 'التبديل بين البوابات', null, '/switch')}
      {row('grid', 'فهرس شاشات النموذج', 'كل شاشات P0 للعرض واللقطات.', '/_index')}
      <div className="card">
        <b>عن هذا النموذج</b>
        <p className="muted small mt8">
          نموذج تفاعلي DRAFT FOR PRELIMINARY DEFENSE — النطاق P0: الزائر، الحساب،
          طلب المستفيد، واستجابة المقدم. صنعاء — أمانة العاصمة.
        </p>
      </div>
    </Screen>
  );
}
