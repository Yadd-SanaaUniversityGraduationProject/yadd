import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar, MockNote } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';
import { providerById } from '../../data/mock.js';

// PUB-05 — Public Portfolio / Catalog (watermarked display copies concept)
export default function PubPortfolio() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, setIntended } = useApp();
  const [open, setOpen] = useState(null);
  const p = providerById(id);
  if (!p) return null;
  const title = p.kind === 'SERVICE' ? 'معرض الأعمال' : 'الكتالوج';

  const contact = () => {
    if (authed) nav('/soon/SH-02');
    else {
      setIntended({ action: 'تواصل / استفسر', to: '/soon/SH-02' });
      nav('/gate');
    }
  };

  return (
    <Screen id="PUB-05" name={title} nav="public" active="search">
      <TopBar title={`${title} — ${p.displayName}`} back={`/provider/${p.id}`} />
      <MockNote>صور العرض نسخ عامة بعلامة تعريفية — الأصل غير عام. العلامة للتعريف والردع وليست إثبات ملكية.</MockNote>
      {p.works.length === 0 ? (
        <div className="empty">
          <div className="big">لا توجد عناصر منشورة حاليًا.</div>
        </div>
      ) : (
        <div className="thumb-grid">
          {p.works.map((w) => (
            <div key={w.id} className="thumb" onClick={() => setOpen(w)} role="button" tabIndex={0}>
              <Icon name="image" size={26} />
            </div>
          ))}
        </div>
      )}
      {open && (
        <div className="card mt16">
          <div className="row-between">
            <b>{open.title}</b>
            <button className="icon-btn" onClick={() => setOpen(null)} aria-label="إغلاق">
              <Icon name="x" />
            </button>
          </div>
          <div className="thumb mt8" style={{ aspectRatio: '16/9' }}>
            <Icon name="image" size={34} />
          </div>
          <p className="small mt8">{open.desc}</p>
          <p className="caption mt8">نسخة عرض عامة — يَد | YADD</p>
        </div>
      )}
      <button className="btn btn-primary btn-block mt20" onClick={contact}>
        <Icon name="chat" size={20} /> تواصل / استفسر
      </button>
    </Screen>
  );
}
