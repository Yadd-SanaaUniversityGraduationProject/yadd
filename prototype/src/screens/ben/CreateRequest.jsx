import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES, NEIGHBORHOODS } from '../../data/mock.js';

// BEN-03 — Create Request (type, compatible category, Neighborhood only, description)
export default function CreateRequest() {
  const nav = useNavigate();
  const { authed, createRequest } = useApp();
  const [f, setF] = useState({ type: 'SERVICE', category: '', neighborhood: '', description: '', extra: '', indicativePrice: '' });
  const [err, setErr] = useState('');
  if (!authed) {
    nav('/gate');
    return null;
  }
  const cats = f.type === 'PRODUCT' ? PRODUCT_CATEGORIES : SERVICE_CATEGORIES;
  const set = (k, v) => setF({ ...f, [k]: v });

  const publish = () => {
    if (!f.category) return setErr('اختر الفئة.');
    if (!f.neighborhood) return setErr('اختر الحي.');
    if (f.description.trim().length < 10) return setErr('اكتب وصفًا واضحًا للطلب (١٠ أحرف على الأقل).');
    setErr('');
    const r = createRequest({
      ...f,
      indicativePrice: f.indicativePrice === '' ? null : Number(f.indicativePrice),
      images: 0,
    });
    nav(`/b/requests/${r.id}`);
  };

  return (
    <Screen id="BEN-03" name="إنشاء طلب" nav="beneficiary" active="reqs">
      <TopBar title="إنشاء طلب" back="/b" />
      <div className="field">
        <label>نوع الطلب <span className="req">*</span></label>
        <div className="seg">
          <button className={f.type === 'SERVICE' ? 'active' : ''} onClick={() => setF({ ...f, type: 'SERVICE', category: '' })}>
            خدمة
          </button>
          <button className={f.type === 'PRODUCT' ? 'active' : ''} onClick={() => setF({ ...f, type: 'PRODUCT', category: '' })}>
            منتج
          </button>
        </div>
      </div>
      <div className="field">
        <label>الفئة <span className="req">*</span></label>
        <select className="select" value={f.category} onChange={(e) => set('category', e.target.value)}>
          <option value="">اختر الفئة</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>الحي <span className="req">*</span></label>
        <select className="select" value={f.neighborhood} onChange={(e) => set('neighborhood', e.target.value)}>
          <option value="">اختر الحي</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <div className="helper">المديرية تُستنتج داخليًا من الحي — لا عنوان دقيق للعامة.</div>
      </div>
      <div className="field">
        <label>وصف الطلب <span className="req">*</span></label>
        <textarea className="textarea" value={f.description} onChange={(e) => set('description', e.target.value)} placeholder="اشرح ما تحتاجه بوضوح…" />
      </div>
      <div className="field">
        <label>صور (اختياري)</label>
        <div className="card center" style={{ borderStyle: 'dashed' }}>
          <Icon name="image" size={28} />
          <p className="muted small mt8">إرفاق صور توضيحية — عرض فقط في النموذج</p>
        </div>
      </div>
      <div className="field">
        <label>معلومات إضافية (اختياري)</label>
        <input className="input" value={f.extra} onChange={(e) => set('extra', e.target.value)} placeholder="وقت مفضل، تفاصيل إضافية…" />
      </div>
      <div className="field">
        <label>سعر استرشادي (اختياري — غير ملزم)</label>
        <input className="input" inputMode="numeric" value={f.indicativePrice} onChange={(e) => set('indicativePrice', e.target.value.replace(/\D/g, ''))} placeholder="بالريال اليمني" />
      </div>
      {err && <div className="error-text" style={{ marginBottom: 10 }}>{err}</div>}
      <button className="btn btn-primary btn-block" onClick={publish}>
        نشر الطلب
      </button>
    </Screen>
  );
}
