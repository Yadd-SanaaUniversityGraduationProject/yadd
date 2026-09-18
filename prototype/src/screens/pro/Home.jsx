import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, BrandMark } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// PRO-01 — Provider Home / Work State (eligibility-aware entry points)
export default function ProHome() {
  const nav = useNavigate();
  const { authed, myProvider } = useApp();
  if (!authed) {
    nav('/gate');
    return null;
  }
  const entry = (icon, title, desc, to) => (
    <div className="card tappable" onClick={() => nav(to)} role="button" tabIndex={0}>
      <div className="row-between">
        <div>
          <b>{title}</b>
          <p className="muted small mt8">{desc}</p>
        </div>
        <span className="cat-ic"><Icon name={icon} /></span>
      </div>
    </div>
  );
  return (
    <Screen id="PRO-01" name="رئيسية المقدم" nav="provider" active="home">
      <div className="appbar">
        <span className="brand"><BrandMark /> يَد</span>
        <span className="spacer" />
        <button className="icon-btn bordered" onClick={() => nav('/account')} aria-label="الحساب">
          <Icon name="user" />
        </button>
      </div>
      <div className="card mt8">
        <div className="row-between">
          <b>حالة الأهلية</b>
          <span className="chip green">مؤهل</span>
        </div>
        <div className="chips mt8">
          <span className="chip">خدمة · كهرباء</span>
          <span className="chip">{myProvider.verified ? 'تحقق هوية: موثق' : 'تحقق الهوية مطلوب'}</span>
          <span className="chip">الاشتراك: نشط</span>
        </div>
      </div>
      <div className="stack">
        {entry('file', 'الطلبات المناسبة', 'طلبات مفتوحة متوافقة مع نشاطك ومناطقك.', '/p/requests')}
        {entry('user', 'إدارة ملف المقدم', 'النوع، الفئات، مناطق الخدمة، والنبذة.', '/soon/PRO-06')}
        {entry('image', 'معرض الأعمال', 'صور أعمالك العامة.', '/soon/PRO-07')}
        {entry('shield', 'حالة التحقق', 'التحقق من الهوية لمقدم الخدمة.', '/soon/PRO-09')}
        {entry('card', 'الاشتراك', 'الحالة والتجديد — ٣٠ يومًا.', '/soon/PRO-11')}
        {entry('swap', 'معاملاتي', 'المعاملات الحالية والسابقة.', '/soon/TRX-03')}
      </div>
    </Screen>
  );
}
