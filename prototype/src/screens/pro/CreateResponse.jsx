import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import { useApp } from '../../state/AppState.jsx';
import { fmtPrice } from '../../data/mock.js';

// PRO-04 — Create Provider Response (one active; RequiresDeposit Yes/No only)
export default function CreateResponse() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, suitable, createResponse, myResponseFor } = useApp();
  const [accept, setAccept] = useState(true);
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [dep, setDep] = useState(false);
  const [err, setErr] = useState('');
  if (!authed) {
    nav('/gate');
    return null;
  }
  const r = suitable.find((x) => x.id === id);
  if (!r) return null;
  if (myResponseFor(id)) {
    nav(`/p/requests/${id}/my-response`);
    return null;
  }

  const submit = () => {
    if (!accept && !price) return setErr('أدخل السعر المقترح أو اقبل السعر الاسترشادي.');
    setErr('');
    createResponse(id, {
      acceptIndicative: r.indicativePrice ? accept : false,
      proposedPrice: accept && r.indicativePrice ? null : price === '' ? null : Number(price),
      note: note.trim(),
      requiresDeposit: dep,
    });
    nav(`/p/requests/${id}/my-response`);
  };

  return (
    <Screen id="PRO-04" name="إرسال استجابة" nav="provider" active="reqs">
      <TopBar title="إرسال استجابة" back={`/p/requests/${id}`} />
      {r.indicativePrice ? (
        <div className="field">
          <label>السعر الاسترشادي: {fmtPrice(r.indicativePrice)}</label>
          <div className="seg">
            <button className={accept ? 'active' : ''} onClick={() => setAccept(true)}>أقبل السعر</button>
            <button className={!accept ? 'active' : ''} onClick={() => setAccept(false)}>أقترح سعرًا</button>
          </div>
        </div>
      ) : (
        <div className="alert yellow">لا يوجد سعر استرشادي في هذا الطلب — أدخل سعرك المقترح.</div>
      )}
      {(!accept || !r.indicativePrice) && (
        <div className="field">
          <label>السعر المقترح (ر.ي)</label>
          <input className="input" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))} />
        </div>
      )}
      <div className="field">
        <label>ملاحظة (اختياري)</label>
        <textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)} placeholder="موعد التنفيذ، تفاصيل العرض…" />
      </div>
      <div className="field">
        <label>يتطلب عربونًا؟ <span className="req">*</span></label>
        <div className="seg">
          <button className={!dep ? 'active' : ''} onClick={() => setDep(false)}>لا</button>
          <button className={dep ? 'active' : ''} onClick={() => setDep(true)}>نعم</button>
        </div>
        <div className="helper">يُسجل «نعم/لا» فقط — المبلغ والدفع والاسترداد خارج YADD.</div>
      </div>
      {err && <div className="error-text" style={{ marginBottom: 10 }}>{err}</div>}
      <button className="btn btn-primary btn-block" onClick={submit}>
        إرسال الاستجابة
      </button>
      <p className="caption mt8 center">استجابة فعالة واحدة فقط لكل طلب — قابلة للتعديل أو السحب ما دام الطلب مفتوحًا.</p>
    </Screen>
  );
}
