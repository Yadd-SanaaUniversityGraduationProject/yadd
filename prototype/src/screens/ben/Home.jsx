import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, BrandMark } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// BEN-01 — Beneficiary Home / Discovery State
export default function BenHome() {
  const nav = useNavigate();
  const { session, authed } = useApp();
  if (!authed) {
    nav('/gate');
    return null;
  }
  return (
    <Screen id="BEN-01" name="رئيسية المستفيد" nav="beneficiary" active="home">
      <div className="appbar">
        <span className="brand">
          <BrandMark /> يَد
        </span>
        <span className="spacer" />
        <button className="icon-btn bordered" onClick={() => nav('/account')} aria-label="الحساب">
          <Icon name="user" />
        </button>
      </div>
      <div className="hero">
        <div className="h2">أهلًا {session.name?.split(' ')[0] || 'بك'}</div>
        <p className="muted">ماذا تحتاج اليوم؟</p>
      </div>
      <div className="stack mt16">
        <div className="card tappable" onClick={() => nav('/search')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <b>ابحث عن مقدم</b>
              <p className="muted small mt8">تصفح المقدمين حسب الفئة والحي.</p>
            </div>
            <span className="cat-ic"><Icon name="search" /></span>
          </div>
        </div>
        <div className="card tappable" onClick={() => nav('/b/requests/new')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <b>انشر طلبًا</b>
              <p className="muted small mt8">صف حاجتك واستقبل استجابات المقدمين.</p>
            </div>
            <span className="cat-ic"><Icon name="plus" /></span>
          </div>
        </div>
        <div className="card tappable" onClick={() => nav('/b/requests')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <b>طلباتي</b>
              <p className="muted small mt8">تابع طلباتك الحالية والسابقة.</p>
            </div>
            <span className="cat-ic"><Icon name="file" /></span>
          </div>
        </div>
      </div>
    </Screen>
  );
}
