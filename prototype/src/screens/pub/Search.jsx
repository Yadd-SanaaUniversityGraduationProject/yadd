import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import { useApp } from '../../state/AppState.jsx';
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES, NEIGHBORHOODS } from '../../data/mock.js';

// PUB-02 — Search / Filter (Neighborhood only, no District field)
export default function PubSearch() {
  const nav = useNavigate();
  const { search, setSearch } = useApp();
  const cats = search.kind === 'PRODUCT' ? PRODUCT_CATEGORIES : search.kind === 'SERVICE' ? SERVICE_CATEGORIES : [];

  const set = (patch) => setSearch({ ...search, ...patch });

  return (
    <Screen id="PUB-02" name="البحث / التصفية" nav="public" active="search">
      <TopBar title="البحث عن مقدم" back="/" />
      <div className="field">
        <label>ابحث عن خدمة أو منتج</label>
        <input
          className="input"
          value={search.text}
          onChange={(e) => set({ text: e.target.value })}
          placeholder="مثال: كهرباء، حلويات…"
        />
      </div>
      <div className="field">
        <label>نوع المقدم</label>
        <div className="seg">
          <button className={search.kind === 'SERVICE' ? 'active' : ''} onClick={() => set({ kind: 'SERVICE', category: '' })}>
            خدمة
          </button>
          <button className={search.kind === 'PRODUCT' ? 'active' : ''} onClick={() => set({ kind: 'PRODUCT', category: '' })}>
            منتج
          </button>
        </div>
      </div>
      <div className="field">
        <label>الفئة</label>
        <select className="select" value={search.category} onChange={(e) => set({ category: e.target.value })}>
          <option value="">كل الفئات</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {!search.kind && <div className="helper">اختر نوع المقدم أولًا لعرض الفئات المتوافقة.</div>}
      </div>
      <div className="field">
        <label>الحي</label>
        <select className="select" value={search.neighborhood} onChange={(e) => set({ neighborhood: e.target.value })}>
          <option value="">كل الأحياء</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <div className="helper">نطاق أمانة العاصمة — صنعاء. المديرية تُستنتج داخليًا ولا تظهر كحقل مستقل.</div>
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => nav('/results')}>
          عرض النتائج
        </button>
        <button className="btn btn-secondary" onClick={() => setSearch({ text: '', kind: '', category: '', neighborhood: '' })}>
          إعادة تعيين
        </button>
      </div>
    </Screen>
  );
}
