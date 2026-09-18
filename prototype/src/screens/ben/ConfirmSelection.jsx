import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { useApp } from '../../state/AppState.jsx';
import { providerById, fmtPrice } from '../../data/mock.js';

// BEN-07 — Confirm Provider Selection (Published Request route: direct Active Transaction)
export default function ConfirmSelection() {
  const { id, respId } = useParams();
  const nav = useNavigate();
  const { authed, myRequests, responses, selectProvider } = useApp();
  const [done, setDone] = useState(false);
  if (!authed) {
    nav('/gate');
    return null;
  }
  const r = myRequests.find((x) => x.id === id);
  const x = responses.find((v) => v.id === respId);
  if (!r || !x) return null;
  const p = providerById(x.providerId);

  if (done) {
    return (
      <Screen id="BEN-07" name="تأكيد اختيار المقدم" nav="beneficiary" active="reqs">
        <TopBar title="تم الاختيار" back={`/b/requests/${id}`} />
        <div className="success-hero">
          <div className="ring"><Icon name="check" size={38} /></div>
          <div className="h2">بدأت معاملتك الرسمية</div>
          <p className="muted mt8">
            الطلب أصبح <b>Matched</b> ومغلقًا أمام الاستجابات الجديدة، وأُنشئت <b>معاملة نشطة</b> مع {p?.displayName}.
          </p>
        </div>
        <div className="alert yellow">شاشة تفاصيل المعاملة (TRX-02) ضمن الدفعة P1 — تُعرض هنا كنتيجة للاختيار.</div>
        <button className="btn btn-primary btn-block" onClick={() => nav(`/b/requests/${id}`)}>
          العودة إلى الطلب
        </button>
      </Screen>
    );
  }

  return (
    <Screen id="BEN-07" name="تأكيد اختيار المقدم" nav="beneficiary" active="reqs">
      <TopBar title="تأكيد الاختيار" back={`/b/requests/${id}/compare`} />
      <div className="card">
        <div className="h3">{p?.displayName}</div>
        <div className="kv"><span className="muted">السعر</span><b>{x.acceptIndicative ? `الاسترشادي (${fmtPrice(r.indicativePrice)})` : fmtPrice(x.proposedPrice)}</b></div>
        <div className="kv"><span className="muted">يتطلب عربونًا</span><b>{x.requiresDeposit ? 'نعم' : 'لا'}</b></div>
        {x.note && <p className="small mt8">{x.note}</p>}
      </div>
      <div className="alert yellow">
        عند التأكيد سيُغلق الطلب أمام الاستجابات الجديدة وتبدأ معاملة رسمية مع المقدم المختار.
      </div>
      <div className="stack">
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            selectProvider(id, respId);
            setDone(true);
          }}
        >
          تأكيد اختيار المقدم
        </button>
        <button className="btn btn-secondary btn-block" onClick={() => nav(`/b/requests/${id}/compare`)}>
          العودة للمقارنة
        </button>
      </div>
    </Screen>
  );
}
