import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { StatusChip } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';
import { categoryName, fmtPrice } from '../../data/mock.js';

// BEN-04 — Request Details (state-valid actions only)
export default function RequestDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, myRequests, responses, closeRequest, republishRequest } = useApp();
  const [confirmClose, setConfirmClose] = useState(false);
  if (!authed) {
    nav('/gate');
    return null;
  }
  const r = myRequests.find((x) => x.id === id);
  if (!r) return null;
  const count = responses.filter((x) => x.requestId === id && x.status === 'Active').length;

  return (
    <Screen id="BEN-04" name="تفاصيل الطلب" nav="beneficiary" active="reqs">
      <TopBar title="تفاصيل الطلب" back="/b/requests" />
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
        <div className="kv"><span className="muted">الاستجابات النشطة</span><b>{count}</b></div>
        <div className="kv"><span className="muted">تاريخ الإنشاء</span><b className="ltr">{r.createdAt}</b></div>
      </div>

      {r.status === 'Open' && (
        <>
          <div className="alert yellow">
            <Icon name="clock" size={18} /> سياسة عدم النشاط: تذكير بعد ٢٤ ساعة و٤٨ ساعة، ثم ينتهي الطلب بعد ٧٢ ساعة.
          </div>
          <div className="stack">
            <button className="btn btn-primary btn-block" onClick={() => nav(`/b/requests/${r.id}/responses`)}>
              عرض الاستجابات ({count})
            </button>
            {!confirmClose ? (
              <button className="btn btn-secondary btn-block" onClick={() => setConfirmClose(true)}>
                إغلاق الطلب
              </button>
            ) : (
              <div className="card">
                <b>إغلاق الطلب قبل اختيار مقدم؟</b>
                <p className="muted small mt8">هذا إغلاق طلب — وليس إلغاء معاملة.</p>
                <div className="btn-row mt12">
                  <button className="btn btn-danger" onClick={() => { closeRequest(r.id); setConfirmClose(false); }}>
                    تأكيد الإغلاق
                  </button>
                  <button className="btn btn-secondary" onClick={() => setConfirmClose(false)}>
                    تراجع
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {r.status === 'Expired' && (
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            const n = republishRequest(r.id);
            if (n) nav(`/b/requests/${n.id}`);
          }}
        >
          إعادة نشر الطلب (طلب جديد)
        </button>
      )}

      {r.status === 'Matched' && (
        <div className="alert green">
          تم اختيار مقدم لهذا الطلب — الطلب مغلق أمام الاستجابات الجديدة. المعاملة المرتبطة تُعرض في الدفعة P1 (TRX-02).
        </div>
      )}
      {r.status === 'ClosedByBeneficiary' && (
        <div className="alert red">هذا الطلب مغلق من قبلك.</div>
      )}
    </Screen>
  );
}
