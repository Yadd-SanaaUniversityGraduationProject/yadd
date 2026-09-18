import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { RequestCard } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';

// BEN-02 — My Requests (Open | Matched | ClosedByBeneficiary | Expired)
export default function MyRequests() {
  const nav = useNavigate();
  const { authed, myRequests, responses, republishRequest } = useApp();
  if (!authed) {
    nav('/gate');
    return null;
  }
  const countFor = (id) => responses.filter((r) => r.requestId === id && r.status === 'Active').length;

  return (
    <Screen id="BEN-02" name="طلباتي" nav="beneficiary" active="reqs">
      <TopBar
        title="طلباتي"
        back="/b"
        action={
          <button className="icon-btn bordered" onClick={() => nav('/b/requests/new')} aria-label="إنشاء طلب">
            <Icon name="plus" />
          </button>
        }
      />
      {myRequests.length === 0 ? (
        <div className="empty">
          <div className="big">لا توجد لديك طلبات بعد</div>
          <button className="btn btn-primary mt16" onClick={() => nav('/b/requests/new')}>
            إنشاء طلب
          </button>
        </div>
      ) : (
        myRequests.map((r) => (
          <div key={r.id}>
            <RequestCard r={r} to={`/b/requests/${r.id}`} count={countFor(r.id)} />
            {r.status === 'Expired' && (
              <button
                className="btn btn-secondary btn-block"
                style={{ marginTop: -4, marginBottom: 12 }}
                onClick={() => {
                  const n = republishRequest(r.id);
                  if (n) nav(`/b/requests/${n.id}`);
                }}
              >
                إعادة نشر الطلب (طلب جديد)
              </button>
            )}
          </div>
        ))
      )}
    </Screen>
  );
}
