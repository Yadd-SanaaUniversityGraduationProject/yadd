import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import { RequestCard } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';

// PRO-02 — Suitable Requests (Open only; type/category/area matched)
export default function Suitable() {
  const nav = useNavigate();
  const { authed, suitable } = useApp();
  if (!authed) {
    nav('/gate');
    return null;
  }
  return (
    <Screen id="PRO-02" name="الطلبات المناسبة" nav="provider" active="reqs">
      <TopBar title="الطلبات المناسبة" back="/p" />
      <p className="muted small">طلبات مفتوحة متوافقة مع نوعك وفئاتك ومناطق خدمتك.</p>
      <div className="mt12">
        {suitable.filter((r) => r.status === 'Open').map((r) => (
          <RequestCard key={r.id} r={r} to={`/p/requests/${r.id}`} />
        ))}
      </div>
    </Screen>
  );
}
