import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar, MockNote } from '../../components/Shell.jsx';
import { useApp } from '../../state/AppState.jsx';

// AUTH-02 — Create Account + mandatory Phone OTP
export default function CreateAccount() {
  const nav = useNavigate();
  const { signUp } = useApp();
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ first: '', father: '', grand: '', family: '', mobile: '', email: '', pw: '', pw2: '', terms: false });
  const [err, setErr] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const set = (k, v) => setF({ ...f, [k]: v });

  const next = () => {
    if (!f.first.trim() || !f.father.trim() || !f.grand.trim() || !f.family.trim()) {
      setErr('الاسم الرباعي مطلوب كاملًا (الأول، الأب، الجد، العائلة).');
      return;
    }
    if (!/^7\d{8}$/.test(f.mobile.trim())) {
      setErr('أدخل رقم هاتف يمنيًا صحيحًا يبدأ بـ 7 ويتكون من 9 أرقام.');
      return;
    }
    if (f.pw.length < 6) {
      setErr('كلمة المرور مطلوبة (٦ أحرف على الأقل في هذا النموذج).');
      return;
    }
    if (f.pw !== f.pw2) {
      setErr('تأكيد كلمة المرور غير مطابق.');
      return;
    }
    if (!f.terms) {
      setErr('يجب الموافقة على الشروط وسياسة الخصوصية.');
      return;
    }
    setErr('');
    setStep(2);
  };

  const verify = () => {
    if (otp.some((d) => !/^\d$/.test(d))) {
      setErr('أدخل رمز التحقق المكون من ٤ أرقام.');
      return;
    }
    signUp(f);
    nav('/portal');
  };

  return (
    <Screen id="AUTH-02" name="إنشاء حساب + تحقق الهاتف">
      <TopBar back="/gate" title="إنشاء حساب جديد" />
      <div className="steps">
        <span className="on" />
        <span className={step === 2 ? 'on' : ''} />
      </div>
      {step === 1 ? (
        <>
          <div className="field">
            <label>الاسم الأول <span className="req">*</span></label>
            <input className="input" value={f.first} onChange={(e) => set('first', e.target.value)} />
          </div>
          <div className="field">
            <label>اسم الأب <span className="req">*</span></label>
            <input className="input" value={f.father} onChange={(e) => set('father', e.target.value)} />
          </div>
          <div className="field">
            <label>اسم الجد <span className="req">*</span></label>
            <input className="input" value={f.grand} onChange={(e) => set('grand', e.target.value)} />
          </div>
          <div className="field">
            <label>اسم العائلة <span className="req">*</span></label>
            <input className="input" value={f.family} onChange={(e) => set('family', e.target.value)} />
          </div>
          <div className="field">
            <label>رقم الهاتف <span className="req">*</span></label>
            <input className="input ltr" style={{ textAlign: 'right' }} value={f.mobile} onChange={(e) => set('mobile', e.target.value)} placeholder="77XXXXXXX" inputMode="numeric" />
          </div>
          <div className="field">
            <label>البريد الإلكتروني (اختياري)</label>
            <input className="input ltr" style={{ textAlign: 'right' }} value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="name@mail.com" />
          </div>
          <div className="field">
            <label>كلمة المرور <span className="req">*</span></label>
            <input className="input" type="password" value={f.pw} onChange={(e) => set('pw', e.target.value)} />
          </div>
          <div className="field">
            <label>تأكيد كلمة المرور <span className="req">*</span></label>
            <input className="input" type="password" value={f.pw2} onChange={(e) => set('pw2', e.target.value)} />
            <div className="helper">حقل تحقق في الواجهة فقط لتقليل أخطاء الإدخال.</div>
          </div>
          <div className="card">
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
              <input type="checkbox" checked={f.terms} onChange={(e) => set('terms', e.target.checked)} style={{ width: 22, height: 22, marginTop: 2 }} />
              أوافق على الشروط وسياسة الخصوصية.
            </label>
          </div>
          {err && <div className="error-text" style={{ marginBottom: 10 }}>{err}</div>}
          <button className="btn btn-primary btn-block" onClick={next}>
            إنشاء الحساب والمتابعة
          </button>
        </>
      ) : (
        <>
          <MockNote>في النموذج: أدخل أي ٤ أرقام للمتابعة. لا توجد مهلة أو حد محاولات مثبتة.</MockNote>
          <p className="body">
            تم إرسال رمز تحقق إلى الرقم <b className="ltr">{f.mobile}</b>
          </p>
          <div className="otp-row mt16">
            {otp.map((d, i) => (
              <input
                key={i}
                value={d}
                inputMode="numeric"
                maxLength={1}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(-1);
                  const n = [...otp];
                  n[i] = v;
                  setOtp(n);
                }}
              />
            ))}
          </div>
          {err && <div className="error-text mt8">{err}</div>}
          <button className="btn btn-primary btn-block mt16" onClick={verify}>
            تحقق
          </button>
          <button className="btn btn-ghost btn-block" onClick={() => setErr('')}>
            إعادة إرسال الرمز
          </button>
        </>
      )}
    </Screen>
  );
}
