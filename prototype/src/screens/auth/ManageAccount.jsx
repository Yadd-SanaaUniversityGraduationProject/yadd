import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// AUTH-06 — Manage / Deactivate Account (no self-service hard delete)
export default function ManageAccount() {
  const nav = useNavigate();
  const { session, portal, signOut, authed } = useApp();
  const [confirmOff, setConfirmOff] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!authed) {
    nav('/gate');
    return null;
  }

  return (
    <Screen id="AUTH-06" name="إدارة الحساب" nav={portal === 'provider' ? 'provider' : 'beneficiary'} active="account">
      <TopBar title="الحساب" back={portal === 'provider' ? '/p' : '/b'} />
      {saved && <div className="alert green">تم حفظ التعديلات.</div>}
      <div className="card">
        <div className="row-between">
          <div>
            <div className="h3">{session.name || 'المستخدم'}</div>
            <div className="caption mt8 ltr" style={{ textAlign: 'right' }}>{session.identifier}</div>
          </div>
          <span className="avatar">{(session.name || 'م').trim()[0]}</span>
        </div>
      </div>

      <div className="card" onClick={() => nav('/switch')} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
        <div className="row-between">
          <div>
            <b>التبديل بين البوابات</b>
            <p className="muted small mt8">البوابة الحالية: {portal === 'provider' ? 'مقدم' : 'مستفيد'}</p>
          </div>
          <Icon name="swap" />
        </div>
      </div>

      <div className="h3" style={{ margin: '16px 2px 10px' }}>بيانات الحساب</div>
      <div className="field">
        <label>الاسم الرباعي</label>
        <input className="input" defaultValue={session.name || ''} />
        <div className="helper">تغيير الاسم الحقيقي لمقدم خدمة موثق يعيد مراجعة التحقق من الهوية.</div>
      </div>
      <div className="field">
        <label>رقم الهاتف</label>
        <input className="input ltr" style={{ textAlign: 'right' }} defaultValue="774123456" inputMode="numeric" />
        <div className="helper">تغيير الرقم يتطلب تحقق OTP جديدًا.</div>
      </div>
      <div className="field">
        <label>البريد الإلكتروني</label>
        <input className="input ltr" style={{ textAlign: 'right' }} defaultValue="" placeholder="اختياري — يحتاج توثيقًا قبل الاستخدام" />
      </div>
      <button className="btn btn-secondary btn-block" onClick={() => setSaved(true)}>
        حفظ التعديلات
      </button>

      <div className="h3" style={{ margin: '20px 2px 10px' }}>الحساب</div>
      {!confirmOff ? (
        <button className="btn btn-secondary btn-block" onClick={() => setConfirmOff(true)}>
          تعطيل الحساب
        </button>
      ) : (
        <div className="card">
          <b>تأكيد تعطيل الحساب؟</b>
          <p className="muted small mt8">يمكن إعادة التفعيل لاحقًا بالتحقق من الهاتف. لا يوجد حذف نهائي ذاتي في MVP.</p>
          <div className="btn-row mt12">
            <button className="btn btn-danger" onClick={() => { signOut(); nav('/'); }}>
              تأكيد التعطيل
            </button>
            <button className="btn btn-secondary" onClick={() => setConfirmOff(false)}>
              تراجع
            </button>
          </div>
        </div>
      )}
      <button
        className="btn btn-ghost btn-block mt8"
        onClick={() => { signOut(); nav('/'); }}
      >
        تسجيل الخروج
      </button>
    </Screen>
  );
}
