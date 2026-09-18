import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import { useApp } from '../../state/AppState.jsx';
import { providerById, fmtPrice, metric } from '../../data/mock.js';

// BEN-06 — Compare Provider Responses (neutral; no "best" recommendation)
export default function Compare() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, myRequests, responses } = useApp();
  if (!authed) {
    nav('/gate');
    return null;
  }
  const r = myRequests.find((x) => x.id === id);
  if (!r) return null;
  const list = responses.filter((x) => x.requestId === id && x.status === 'Active');

  return (
    <Screen id="BEN-06" name="مقارنة الاستجابات" nav="beneficiary" active="reqs">
      <TopBar title="مقارنة الاستجابات" back={`/b/requests/${id}/responses`} />
      <p className="muted small">قارن بنفسك — المنصة لا تختار «الأفضل» نيابة عنك.</p>
      <div className="compare mt12">
        {list.map((x) => {
          const p = providerById(x.providerId);
          return (
            <div key={x.id} className="col-card">
              <div className="row-between">
                <b>{p?.displayName}</b>
                <button className="link small" onClick={() => nav(`/provider/${x.providerId}`)}>
                  الملف العام
                </button>
              </div>
              <div className="kv"><span className="muted">السعر</span><b>{x.acceptIndicative ? `يقبل الاسترشادي (${fmtPrice(r.indicativePrice)})` : fmtPrice(x.proposedPrice)}</b></div>
              <div className="kv"><span className="muted">يتطلب عربونًا</span><b>{x.requiresDeposit ? 'نعم' : 'لا'}</b></div>
              <div className="kv"><span className="muted">التقييم العام</span><b>{metric(p?.rating)}</b></div>
              <div className="kv"><span className="muted">أعمال مكتملة</span><b>{metric(p?.completed)}</b></div>
              {x.note && <p className="small mt8">{x.note}</p>}
              <button className="btn btn-primary btn-block mt12" onClick={() => nav(`/b/requests/${id}/confirm/${x.id}`)}>
                اختيار هذا المقدم
              </button>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}
