import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { categoryName, fmtPrice, metric } from '../data/mock.js';

export function Stars({ value }) {
  if (value === null || value === undefined)
    return <span className="muted small">التقييم: —</span>;
  return (
    <span className="small" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Icon name="star" size={16} />
      <b>{value}</b>
      <span className="muted">من ٥</span>
    </span>
  );
}

// PUB-03 provider result card (whole card tappable -> PUB-04). Public data only.
export function ProviderCard({ p }) {
  const nav = useNavigate();
  return (
    <div className="card tappable" onClick={() => nav(`/provider/${p.id}`)} role="button" tabIndex={0}>
      <div style={{ display: 'flex', gap: 12 }}>
        <span className="avatar">{p.displayName.trim()[0]}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row-between">
            <b style={{ fontSize: 16 }}>{p.displayName}</b>
          </div>
          <div className="caption mt8">
            {p.kind === 'SERVICE' ? 'مقدم خدمة' : 'مقدم منتج'} ·{' '}
            {p.categories.map((c) => categoryName(p.kind, c)).join('، ')}
          </div>
          <div className="caption mt8" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="pin" size={15} /> {p.areas.join('، ')}
          </div>
          <div className="row-between mt8">
            <Stars value={p.rating} />
            <span className="muted small">أعمال مكتملة: {metric(p.completed)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// BEN-02 / PRO-02 request card
export function RequestCard({ r, to, count }) {
  const nav = useNavigate();
  return (
    <div className="card tappable" onClick={() => nav(to)} role="button" tabIndex={0}>
      <div className="row-between">
        <span className="chip {">{r.type === 'SERVICE' ? 'خدمة' : 'منتج'}</span>
        <StatusChip status={r.status} />
      </div>
      <p className="mt8" style={{ fontSize: 15 }}>
        {r.description}
      </p>
      <div className="caption mt8">
        {categoryName(r.type, r.category)} · الحي: {r.neighborhood}
      </div>
      <div className="row-between mt8">
        <span className="small">
          السعر الاسترشادي: <b>{r.indicativePrice ? fmtPrice(r.indicativePrice) : '—'}</b>
        </span>
        {count !== undefined && <span className="muted small">الاستجابات: {count}</span>}
      </div>
    </div>
  );
}

export function StatusChip({ status }) {
  const map = {
    Open: ['green', 'مفتوح'],
    Matched: ['blue', 'تم اختيار مقدم'],
    ClosedByBeneficiary: ['red', 'مغلق'],
    Expired: ['yellow', 'منتهي'],
    Active: ['green', 'نشطة'],
    Selected: ['blue', 'مختارة'],
    NotSelected: ['', 'غير مختارة'],
    Withdrawn: ['red', 'مسحوبة'],
  };
  const [cls, label] = map[status] || ['', status];
  return <span className={`chip ${cls}`}>{label}</span>;
}

// BEN-05 provider response card
export function ResponseCard({ r, provider, onOpen, onCompare, selectable, onSelect }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 12 }}>
        <span className="avatar">{(provider?.displayName || 'م').trim()[0]}</span>
        <div style={{ flex: 1 }}>
          <button className="link" style={{ fontSize: 16 }} onClick={onOpen}>
            {provider?.displayName || 'مقدم'}
          </button>
          <div className="caption mt8">
            {r.acceptIndicative ? (
              <>يقبل السعر الاسترشادي</>
            ) : (
              <>سعر مقترح: <b>{fmtPrice(r.proposedPrice)}</b></>
            )}
          </div>
          {r.note && <p className="small mt8">{r.note}</p>}
          <div className="mt8">
            <span className="chip">يتطلب عربونًا: {r.requiresDeposit ? 'نعم' : 'لا'}</span>
          </div>
          <div className="row-between mt8">
            <Stars value={provider?.rating ?? null} />
            <span className="muted small">أعمال مكتملة: {metric(provider?.completed)}</span>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="btn-row">
        <button className="btn btn-secondary btn-sm" onClick={onCompare}>
          مقارنة
        </button>
        {selectable && (
          <button className="btn btn-primary btn-sm" onClick={onSelect}>
            اختيار هذا المقدم
          </button>
        )}
      </div>
    </div>
  );
}
