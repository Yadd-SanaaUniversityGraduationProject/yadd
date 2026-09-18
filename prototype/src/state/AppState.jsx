import React, { createContext, useContext, useMemo, useState } from 'react';
import { SEED_MY_REQUESTS, SEED_SUITABLE_REQUESTS, SEED_RESPONSES } from '../data/mock.js';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

let seq = 100;
const nid = (p) => `${p}-${Date.now().toString(36)}${seq++}`;

export function AppStateProvider({ children }) {
  // ---- session ----
  const [session, setSession] = useState({ status: 'guest' }); // guest | auth
  const [portal, setPortal] = useState(null); // beneficiary | provider
  const [intended, setIntended] = useState(null); // protected action context (derived UX)

  // ---- domain ----
  const [myRequests, setMyRequests] = useState(SEED_MY_REQUESTS);
  const [suitable] = useState(SEED_SUITABLE_REQUESTS);
  const [responses, setResponses] = useState(SEED_RESPONSES);
  const [search, setSearch] = useState({ text: '', kind: '', category: '', neighborhood: '' });
  // demo provider profile of the current user (SERVICE electrician)
  const [myProvider] = useState({
    kind: 'SERVICE',
    categories: ['electric'],
    areas: ['حدة', 'السبعين'],
    about: 'فني كهرباء منزلية.',
    verified: true,
    subscription: 'Active',
  });

  const authed = session.status === 'auth';

  const value = useMemo(
    () => ({
      session, portal, intended, setIntended, authed, myProvider,
      signIn: (identifier) => {
        setSession({ status: 'auth', name: 'عمرو ناجي', identifier });
      },
      signUp: (data) => {
        setSession({ status: 'auth', name: `${data.first} ${data.family}`, identifier: data.mobile });
      },
      signOut: () => {
        setSession({ status: 'guest' });
        setPortal(null);
      },
      choosePortal: (p) => setPortal(p),

      search, setSearch,

      myRequests, suitable, responses,
      createRequest: (draft) => {
        const r = { ...draft, id: nid('rq'), mine: true, status: 'Open', createdAt: '2026-09-18', updatedAt: '2026-09-18' };
        setMyRequests((l) => [r, ...l]);
        return r;
      },
      closeRequest: (id) =>
        setMyRequests((l) => l.map((r) => (r.id === id ? { ...r, status: 'ClosedByBeneficiary' } : r))),
      republishRequest: (id) => {
        const old = myRequests.find((r) => r.id === id);
        if (!old) return null;
        const r = { ...old, id: nid('rq'), status: 'Open', createdAt: '2026-09-18', updatedAt: '2026-09-18' };
        setMyRequests((l) => [r, ...l]);
        return r;
      },
      createResponse: (requestId, draft) => {
        const r = { ...draft, id: nid('rs'), requestId, providerId: '__me__', status: 'Active', createdAt: '2026-09-18' };
        setResponses((l) => [...l, r]);
        return r;
      },
      editResponse: (id, patch) =>
        setResponses((l) => l.map((r) => (r.id === id ? { ...r, ...patch } : r))),
      withdrawResponse: (id) =>
        setResponses((l) => l.map((r) => (r.id === id ? { ...r, status: 'Withdrawn' } : r))),
      selectProvider: (requestId, responseId) => {
        setMyRequests((l) => l.map((r) => (r.id === requestId ? { ...r, status: 'Matched' } : r)));
        setResponses((l) =>
          l.map((r) =>
            r.requestId !== requestId
              ? r
              : r.id === responseId
                ? { ...r, status: 'Selected' }
                : { ...r, status: 'NotSelected' }
          )
        );
      },
      myResponseFor: (requestId) => responses.find((r) => r.requestId === requestId && r.providerId === '__me__' && r.status === 'Active'),
    }),
    [session, portal, intended, myRequests, suitable, responses, search, myProvider, authed]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
