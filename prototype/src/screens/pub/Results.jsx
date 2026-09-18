import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar, MockNote } from '../../components/Shell.jsx';
import { ProviderCard } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';
import { PROVIDERS, categoryName } from '../../data/mock.js';

// PUB-03 — Search Results (whole card tappable -> PUB-04)
export default function PubResults() {
  const nav = useNavigate();
  const { search } = useApp();

  const list = useMemo(() => {
    const t = search.text.trim();
    return PROVIDERS.filter((p) => {
      if (search.kind && p.kind !== search.kind) return false;
      if (search.category && !p.categories.includes(search.category)) return false;
      if (search.neighborhood && !p.areas.includes(search.neighborhood)) return false;
      if (t && !(p.displayName.includes(t) || p.about.includes(t))) return false;
      return true;
    });
  }, [search]);

  const summary = [
    search.text && `«${search.text}»`,
    search.kind === 'SERVICE' ? 'خدمة' : search.kind === 'PRODUCT' ? 'منتج' : null,
    search.category && categoryName(search.kind || 'SERVICE', search.category),
    search.neighborhood && `الحي: ${search.neighborhood}`,
  ].filter(Boolean);

  return (
    <Screen id="PUB-03" name="نتائج البحث" nav="public" active="search">
      <TopBar title="نتائج البحث" back="/search" />
      <MockNote>البطاقات تعرض بيانات عامة فقط — لا هاتف ولا عنوان دقيق.</MockNote>
      {summary.length > 0 && (
        <div className="chips" style={{ marginBottom: 12 }}>
          {summary.map((s, i) => (
            <span key={i} className="chip">
              {s}
            </span>
          ))}
        </div>
      )}
      {list.length === 0 ? (
        <div className="empty">
          <div className="big">لم نجد نتائج مطابقة لبحثك.</div>
          <p className="small">جرّب تعديل الفئة أو الحي أو نص البحث.</p>
          <button className="btn btn-primary mt16" onClick={() => nav('/search')}>
            تعديل البحث
          </button>
        </div>
      ) : (
        <>
          {list.map((p) => (
            <ProviderCard key={p.id} p={p} />
          ))}
          <button className="btn btn-secondary btn-block mt8" onClick={() => nav('/search')}>
            تعديل البحث
          </button>
        </>
      )}
    </Screen>
  );
}
