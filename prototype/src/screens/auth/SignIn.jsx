import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar, BrandMark } from '../../components/Shell.jsx';
import { useApp } from '../../state/AppState.jsx';

// AUTH-01 — Sign In (verified phone or verified email + password; no username)
export default function SignIn() {
  const nav = useNavigate();
  const { signIn, intended, setIntended, choosePortal } = useApp();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const submit = () => {
    if (!id.trim() || !pw) {
      setErr('أدخل رقم الهاتف أو البريد الإلكتروني وكلمة المرور.');
      return;
    }
    signIn(id.trim());
    if (intended?.to) {
      choosePortal(intended.to.startsWith('/p') ? 'provider' : 'beneficiary');
      const to = intended.to;
      setIntended(null);
      nav(to);
    } else {
      choosePortal('beneficiary');
      nav('/b');
    }
  };

  return (
    <Screen id="AUTH-01" name="تسجيل الدخول">
      <TopBar back="/" title="تسجيل الدخول" />
      <div className="center mt8">
        <BrandMark size={52} />
      </div>
      <div className="field mt16">
        <label>
          رقم الهاتف أو البريد الإلكتروني <span className="req">*</span>
        </label>
        <input className="input ltr" style={{ textAlign: 'right' }} value={id} onChange={(e) => setId(e.target.value)} placeholder="77XXXXXXX أو name@mail.com" />
      </div>
      <div className="field">
        <label>
          كلمة المرور <span className="req">*</span>
        </label>
        <input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
      </div>
      {err && <div className="error-text" style={{ marginBottom: 10 }}>{err}</div>}
      <button className="btn btn-primary btn-block" onClick={submit}>
        تسجيل الدخول
      </button>
      <div className="row-between mt12">
        <button className="link small" onClick={() => nav('/forgot')}>
          نسيت كلمة المرور؟
        </button>
        <button className="link small" onClick={() => nav('/signup')}>
          إنشاء حساب جديد
        </button>
      </div>
      <p className="caption mt16 center">الدخول برقم هاتف موثق أو بريد موثق — لا يوجد اسم مستخدم مستقل.</p>
    </Screen>
  );
}
