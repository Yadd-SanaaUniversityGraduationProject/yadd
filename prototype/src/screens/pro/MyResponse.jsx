import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen, TopBar } from '../../components/Shell.jsx';
import Icon from '../../components/Icon.jsx';
import { StatusChip } from '../../components/cards.jsx';
import { useApp } from '../../state/AppState.jsx';
import { fmtPrice } from '../../data/mock.js';

// PRO-05 — Edit / Withdraw Response (while Open and before selection)
export default function MyResponse() {
  const { id } = useParams();
  const nav = useNavigate();
  const { authed, suitable, responses, editResponse, withdrawResponse } = useApp();
  const [editing, setEditing] = useState(false);
  const [confirmW, setConfirmW] = useState(false);
  const [note, setNote] = useState('');
  const [price, setPrice] = useState('');
  if (!authed) {
    nav('/gate');
    return null;
  }
  const r = suitable.find((x) => x.id === id);
  const x = responses.find((v) => v.requestId === id && v.providerId === '__me__' && v.status === 'Active');
  if (!r) return null;
  if (!x) {
    return (
      <Screen id="PRO-05" name="إدارة الاستجابة" nav="provider" active="reqs">
        <TopBar title="استجابتي" back={`/p/requests/${id}`} />
        <div className="empty">
          <div className="big">لا توجد استجابة نشطة لهذا الطلب.</div>
          <button className="btn btn-primary mt16" onClick={() => nav(`/p/requests/${id}/respond`)}>
            إرسال استجابة
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen id="PRO-05" name="إدارة الاستجابة" nav="provider" active="reqs">
      <TopBar title="استجابتي" back={`/p/requests/${id}`} />
      <div className="card">
        <div className="row-between">
          <b>استجابتك الحالية</b>
          <StatusChip status={x.status} />
        </div>
        <div className="kv"><span className="muted">السعر</span><b>{x.acceptIndicative ? `يقبل الاسترشادي (${fmtPrice(r.indicativePrice)})` : fmtPrice(x.proposedPrice)}</b></div>
        <div className="kv"><span className="muted">يتطلب عربونًا</span><b>{x.requiresDeposit ? 'نعم' : 'لا'}</b></div>
        {x.note && <p className="small mt8">{x.note}</p>}
      </div>

      {!editing ? (
        <div className="stack">
          <button className="btn btn-primary btn-block" onClick={() => { setNote(x.note || ''); setPrice(x.proposedPrice || ''); setEditing(true); }}>
            تعديل الاستجابة
          </button>
          <button className="btn btn-secondary btn-block" onClick={() => nav('/soon/SH-02')}>
            <Icon name="chat" size={20} /> تواصل / استفسر
          </button>
          {!confirmW ? (
            <button className="btn btn-ghost btn-block" onClick={() => setConfirmW(true)}>
              سحب الاستجابة
            </button>
          ) : (
            <div className="card">
              <b>تأكيد سحب الاستجابة؟</b>
              <div className="btn-row mt12">
                <button className="btn btn-danger" onClick={() => { withdrawResponse(x.id); nav(`/p/requests/${id}`); }}>
                  تأكيد السحب
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmW(false)}>
                  تراجع
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {!x.acceptIndicative && (
            <div className="field">
              <label>السعر المقترح (ر.ي)</label>
              <input className="input" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))} />
            </div>
          )}
          <div className="field">
            <label>ملاحظة</label>
            <textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="btn-row">
            <button
              className="btn btn-primary"
              onClick={() => {
                editResponse(x.id, { note: note.trim(), proposedPrice: price === '' ? null : Number(price) });
                setEditing(false);
              }}
            >
              حفظ التعديل
            </button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>
              إلغاء
            </button>
          </div>
        </>
      )}
      <p className="caption mt12 center">التعديل والسحب متاحان ما دام الطلب مفتوحًا ولم يتم الاختيار.</p>
    </Screen>
  );
}
