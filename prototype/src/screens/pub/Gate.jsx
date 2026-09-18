import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, BrandMark } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// PUB-06 — Protected Action Authentication Gate (no credential fields here)
export default function PubGate() {
  const nav = useNavigate();
  const { intended } = useApp();
  return (
    <Screen id="PUB-06" name="بوابة تسجيل الدخول">
      <div className="success-hero">
        <span className="brand" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <BrandMark size={52} />
        </span>
        <div className="h2 mt12">سجّل الدخول للمتابعة</div>
        <p className="muted mt8">
          {intended?.action ? (
            <>
              إجراء «<b>{intended.action}</b>» يتطلب حسابًا مسجلًا.
            </>
          ) : (
            <>هذا الإجراء يتطلب حسابًا مسجلًا.</>
          )}
          <br />
          يمكنك متابعة التصفح العام دون حساب.
        </p>
      </div>
      <div className="stack">
        <button className="btn btn-primary btn-block" onClick={() => nav('/signin')}>
          <Icon name="user" size={20} /> تسجيل الدخول
        </button>
        <button className="btn btn-secondary btn-block" onClick={() => nav('/signup')}>
          إنشاء حساب جديد
        </button>
        <button className="btn btn-ghost btn-block" onClick={() => nav(-1)}>
          العودة إلى التصفح
        </button>
      </div>
    </Screen>
  );
}
