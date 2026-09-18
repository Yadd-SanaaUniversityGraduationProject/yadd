import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar, MockNote } from '../../components/Shell.jsx';

// AUTH-05 — Forgot / Reset Password (phone OTP primary; verified email optional)
export default function ForgotPassword() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');

  return (
    <Screen id="AUTH-05" name="استعادة كلمة المرور">
      <TopBar back="/signin" title="نسيت كلمة المرور؟" />
      <div className="steps">
        <span className="on" />
        <span className={step >= 2 ? 'on' : ''} />
        <span className={step >= 3 ? 'on' : ''} />
      </div>
      {step === 1 && (
        <>
          <div className="field">
            <label>رقم الهاتف المرتبط بالحساب</label>
            <input className="input ltr" style={{ textAlign: 'right' }} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="77XXXXXXX" inputMode="numeric" />
            <div className="helper">القناة الأساسية للاستعادة. البريد الموثق خيار إضافي فقط.</div>
          </div>
          {err && <div className="error-text" style={{ marginBottom: 10 }}>{err}</div>}
          <button
            className="btn btn-primary btn-block"
            onClick={() => (/^7\d{8}$/.test(mobile.trim()) ? (setErr(''), setStep(2)) : setErr('أدخل رقم هاتف صحيحًا.'))}
          >
            إرسال رمز التحقق
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <MockNote>في النموذج: أدخل أي ٤ أرقام.</MockNote>
          <div className="otp-row">
            {otp.map((d, i) => (
              <input
                key={i}
                value={d}
                inputMode="numeric"
                maxLength={1}
                onChange={(e) => {
                  const n = [...otp];
                  n[i] = e.target.value.replace(/\D/g, '').slice(-1);
                  setOtp(n);
                }}
              />
            ))}
          </div>
          {err && <div className="error-text mt8">{err}</div>}
          <button
            className="btn btn-primary btn-block mt16"
            onClick={() => {
              if (otp.some((d) => !/^\d$/.test(d))) setErr('أدخل الرمز كاملًا.');
              else {
                setErr('');
                setStep(3);
              }
            }}
          >
            تحقق
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <div className="field">
            <label>كلمة المرور الجديدة</label>
            <input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>
          <div className="field">
            <label>تأكيد كلمة المرور الجديدة</label>
            <input className="input" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
          </div>
          {err && <div className="error-text" style={{ marginBottom: 10 }}>{err}</div>}
          <button
            className="btn btn-primary btn-block"
            onClick={() =>
              pw.length < 6 ? setErr('كلمة المرور قصيرة.') : pw !== pw2 ? setErr('التأكيد غير مطابق.') : nav('/signin')
            }
          >
            تعيين كلمة المرور
          </button>
        </>
      )}
      <button className="btn btn-ghost btn-block mt8" onClick={() => nav('/signin')}>
        العودة لتسجيل الدخول
      </button>
    </Screen>
  );
}
