import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { StatusChip } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';
import { categoryName, fmtPrice } from '../../data/mock.js';

// PRO-03 — Published Request Details (provider view; no private beneficiary contact)
export default function ProReqDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, suitable, myResponseFor } = useApp();
  if (!authed) {
    nav('/gate');
    return null;
  }
  const r = suitable.find((x) => x.id === id);
  if (!r) return null;
  const mine = myResponseFor(id);

  return (
    <Screen id="PRO-03" name="تفاصيل الطلب المنشور" nav="provider" active="reqs">
      <TopBar title="تفاصيل الطلب" back="/p/requests" />
      <div className="card">
        <div className="row-between">
          <span className="chip">{r.type === 'SERVICE' ? 'خدمة' : 'منتج'} · {categoryName(r.type, r.category)}</span>
          <StatusChip status={r.status} />
        </div>
        <p className="body mt12">{r.description}</p>
        {r.extra && <p className="muted small mt8">{r.extra}</p>}
        <div className="divider" />
        <div className="kv"><span className="muted">الحي</span><b>{r.neighborhood}</b></div>
        <div className="kv"><span className="muted">السعر الاسترشادي</span><b>{r.indicativePrice ? fmtPrice(r.indicativePrice) : '—'}</b></div>
        <div className="kv"><span className="muted">تاريخ النشر</span><b className="ltr">{r.createdAt}</b></div>
      </div>
      <p className="caption">لا تظهر بيانات التواصل الخاصة بالمستفيد — التواصل داخل المنصة فقط.</p>
      <div className="stack mt12">
        {mine ? (
          <button className="btn btn-primary btn-block" onClick={() => nav(`/p/requests/${id}/my-response`)}>
            عرض / إدارة استجابتي
          </button>
        ) : (
          <button className="btn btn-primary btn-block" onClick={() => nav(`/p/requests/${id}/respond`)}>
            إرسال استجابة
          </button>
        )}
        <button className="btn btn-secondary btn-block" onClick={() => nav('/soon/SH-02')}>
          <Icon name="chat" size={20} /> تواصل / استفسر
        </button>
      </div>
    </Screen>
  );
}
