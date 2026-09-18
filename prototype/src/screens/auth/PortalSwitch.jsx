import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// AUTH-04 — Portal Switch (same account; incomplete provider profile routes to completion)
export default function PortalSwitch() {
  const nav = useNavigate();
  const { portal, choosePortal } = useApp();
  const go = (p) => {
    choosePortal(p);
    nav(p === 'provider' ? '/p' : '/b');
  };
  return (
    <Screen id="AUTH-04" name="التبديل بين البوابات">
      <TopBar back="/account" title="التبديل بين البوابات" />
      <p className="muted">الحساب نفسه يعمل مستفيدًا ومقدمًا — التبديل لا ينشئ حسابًا جديدًا.</p>
      <div className="stack mt16">
        <div className="card tappable" onClick={() => go('beneficiary')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <div className="h3">بوابة المستفيد {portal === 'beneficiary' && <span className="chip green">الحالية</span>}</div>
              <p className="muted small mt8">البحث، الطلبات، والمعاملات.</p>
            </div>
            <Icon name="fwd" />
          </div>
        </div>
        <div className="card tappable" onClick={() => go('provider')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <div className="h3">بوابة المقدم {portal === 'provider' && <span className="chip green">الحالية</span>}</div>
              <p className="muted small mt8">الطلبات المناسبة، الملف، والاشتراك.</p>
            </div>
            <Icon name="fwd" />
          </div>
        </div>
      </div>
      <p className="caption mt16">يتذكر النظام آخر بوابة استخدمتها كافتراضية عند الدخول التالي.</p>
    </Screen>
  );
}
