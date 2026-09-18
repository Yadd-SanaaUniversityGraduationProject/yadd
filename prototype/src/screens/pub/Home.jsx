import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar, BrandMark, MockNote } from '../../components/Shell.jsx';
import Icon, { CATEGORY_ICON } from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';

// PUB-01 — Public Home / Discovery
const CATS = [
  { kind: 'SERVICE', id: 'electric', name: 'كهرباء' },
  { kind: 'SERVICE', id: 'ac', name: 'تكييف' },
  { kind: 'SERVICE', id: 'home-repair', name: 'صيانة منزلية' },
  { kind: 'PRODUCT', id: 'sweets', name: 'حلويات' },
  { kind: 'PRODUCT', id: 'bakery', name: 'مخبوزات' },
  { kind: 'PRODUCT', id: 'handmade', name: 'هدايا يدوية' },
];

export default function PubHome() {
  const nav = useNavigate();
  const { authed, setIntended, setSearch } = useApp();

  const publish = () => {
    if (authed) nav('/b/requests/new');
    else {
      setIntended({ action: 'انشر طلبًا', to: '/b/requests/new' });
      nav('/gate');
    }
  };
  const pickCat = (c) => {
    setSearch({ text: '', kind: c.kind, category: c.id, neighborhood: '' });
    nav('/results');
  };

  return (
    <Screen id="PUB-01" name="الرئيسية العامة / الاكتشاف" nav="public" active="home">
      <div className="appbar">
        <span className="brand">
          <BrandMark /> يَد <span className="ltr small muted">YADD</span>
        </span>
        <span className="spacer" />
        <span className="chip">صنعاء</span>
      </div>
      <MockNote>نطاق العرض: أمانة العاصمة — صنعاء، مستوى الحي فقط.</MockNote>

      <div className="hero">
        <div className="display">ما الذي تحتاجه؟</div>
        <p className="muted">خدمات مهنية ومنتجات منزلية — اكتشاف، طلب، تواصل، وتوثيق.</p>
      </div>

      <div className="search-wrap mt16" onClick={() => nav('/search')} role="button" tabIndex={0}>
        <Icon name="search" />
        <div className="input" style={{ color: 'var(--text-secondary)' }}>
          ابحث عن خدمة أو منتج
        </div>
      </div>

      <div className="btn-row mt16">
        <button className="btn btn-primary" onClick={() => nav('/search')}>
          <Icon name="search" size={20} /> ابحث عن مقدم
        </button>
        <button className="btn btn-secondary" onClick={publish}>
          <Icon name="plus" size={20} /> انشر طلبًا
        </button>
      </div>

      <div className="section-title">
        <span className="h3">تصفح الفئات</span>
        <span className="caption">أمثلة — ليست تصنيفًا نهائيًا</span>
      </div>
      <div className="cat-grid">
        {CATS.map((c) => (
          <button key={c.id} className="cat-card" onClick={() => pickCat(c)}>
            <span className="cat-ic">
              <Icon name={CATEGORY_ICON[c.id]} size={24} />
            </span>
            {c.name}
          </button>
        ))}
      </div>
    </Screen>
  );
}
