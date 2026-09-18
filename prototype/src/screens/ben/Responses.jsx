import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import { ResponseCard } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';
import { providerById } from '../../data/mock.js';

// BEN-05 — Provider Responses
export default function Responses() {
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
    <Screen id="BEN-05" name="استجابات المقدمين" nav="beneficiary" active="reqs">
      <TopBar title="استجابات المقدمين" back={`/b/requests/${id}`} />
      {list.length === 0 ? (
        <div className="empty">
          <div className="big">لم تصل استجابات إلى طلبك حتى الآن.</div>
        </div>
      ) : (
        <>
          {list.map((x) => (
            <ResponseCard
              key={x.id}
              r={x}
              provider={providerById(x.providerId)}
              onOpen={() => nav(`/provider/${x.providerId}`)}
              onCompare={() => nav(`/b/requests/${id}/compare`)}
              selectable
              onSelect={() => nav(`/b/requests/${id}/confirm/${x.id}`)}
            />
          ))}
          <button className="btn btn-secondary btn-block" onClick={() => nav(`/b/requests/${id}/compare`)}>
            مقارنة الاستجابات
          </button>
        </>
      )}
    </Screen>
  );
}
