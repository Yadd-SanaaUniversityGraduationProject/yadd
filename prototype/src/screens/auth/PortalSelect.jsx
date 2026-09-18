import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// AUTH-03 — Initial Portal Selection (starting portal, not permanent account type)
export default function PortalSelect() {
  const nav = useNavigate();
  const { choosePortal, intended, setIntended } = useApp();

  const go = (p) => {
    choosePortal(p);
    if (intended?.to) {
      const to = intended.to;
      setIntended(null);
      nav(to);
    } else nav(p === 'provider' ? '/p' : '/b');
  };

  return (
    <Screen id="AUTH-03" name="اختيار بوابة البداية">
      <div className="success-hero">
        <div className="ring">
          <Icon name="check" size={38} />
        </div>
        <div className="h2">تم إنشاء حسابك بنجاح</div>
        <p className="muted mt8">كيف تريد استخدام يَد الآن؟</p>
      </div>
      <div className="stack">
        <div className="card tappable" onClick={() => go('beneficiary')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <div className="h3">مستفيد</div>
              <p className="muted small mt8">ابحث عن مقدمي الخدمات والمنتجات وانشر طلباتك.</p>
            </div>
            <Icon name="fwd" />
          </div>
        </div>
        <div className="card tappable" onClick={() => go('provider')} role="button" tabIndex={0}>
          <div className="row-between">
            <div>
              <div className="h3">مقدم</div>
              <p className="muted small mt8">قدّم خدماتك أو منتجاتك عبر ملف مقدم.</p>
            </div>
            <Icon name="fwd" />
          </div>
        </div>
      </div>
      <p className="caption center mt16">هذا اختيار بوابة بداية — يمكنك التبديل لاحقًا بالحساب نفسه.</p>
    </Screen>
  );
}
