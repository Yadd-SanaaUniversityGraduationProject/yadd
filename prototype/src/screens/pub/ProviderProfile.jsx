import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar, MockNote } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { Stars } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';
import { providerById, categoryName, metric } from '../../data/mock.js';

// PUB-04 — Public Provider Profile (public data only)
export default function PubProviderProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, setIntended } = useApp();
  const p = providerById(id);

  if (!p) {
    return (
      <Screen id="PUB-04" name="ملف المقدم العام">
        <TopBar title="ملف المقدم" back="/results" />
        <div className="empty">
          <div className="big">تعذر تحميل الملف.</div>
          <button className="btn btn-secondary mt16" onClick={() => nav('/results')}>
            إعادة المحاولة
          </button>
        </div>
      </Screen>
    );
  }

  const contact = () => {
    if (authed) nav('/soon/SH-02');
    else {
      setIntended({ action: 'تواصل / استفسر', to: '/soon/SH-02' });
      nav('/gate');
    }
  };

  return (
    <Screen id="PUB-04" name="ملف المقدم العام" nav="public" active="search">
      <TopBar title="ملف المقدم" back="/results" />
      <MockNote>لا يعرض الملف العام: الهاتف، العنوان الدقيق، وثائق التحقق، أو بيانات الاشتراك.</MockNote>
      <div className="card">
        <div style={{ display: 'flex', gap: 12 }}>
          <span className="avatar" style={{ width: 64, height: 64, fontSize: 26 }}>
            {p.displayName.trim()[0]}
          </span>
          <div style={{ flex: 1 }}>
            <div className="h2">{p.displayName}</div>
            <div className="caption mt8">
              {p.kind === 'SERVICE' ? 'مقدم خدمة' : 'مقدم منتج'} ·{' '}
              {p.categories.map((c) => categoryName(p.kind, c)).join('، ')}
            </div>
            <div className="caption mt8" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="pin" size={15} /> مناطق الخدمة: {p.areas.join('، ')}
            </div>
          </div>
        </div>
        <div className="divider" />
        <p className="body">{p.about}</p>
        <div className="row-between mt12">
          <Stars value={p.rating} />
          <span className="muted small">أعمال مكتملة: {metric(p.completed)}</span>
        </div>
      </div>

      <div className="section-title">
        <span className="h3">{p.kind === 'SERVICE' ? 'معرض الأعمال' : 'الكتالوج'}</span>
        <button className="link small" onClick={() => nav(`/provider/${p.id}/works`)}>
          عرض الكل
        </button>
      </div>
      {p.works.length === 0 ? (
        <div className="card">
          <p className="muted center">لا توجد عناصر منشورة حاليًا.</p>
        </div>
      ) : (
        <div className="thumb-grid">
          {p.works.slice(0, 3).map((w) => (
            <div key={w.id} className="thumb">
              <Icon name="image" size={26} />
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary btn-block mt20" onClick={contact}>
        <Icon name="chat" size={20} /> تواصل / استفسر
      </button>
      <p className="caption center mt8">التواصل وحده لا ينشئ معاملة رسمية.</p>
    </Screen>
  );
}
