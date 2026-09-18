import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useApp } from '../state/AppState.jsx';

export function BrandMark({ size = 38 }) {
  return (
    <span className="mark" style={{ width: size, height: size, fontSize: size * 0.55 }} aria-label="يَد">
      ي
    </span>
  );
}

// Top strip: Screen ID + contract state (hidden with ?clean=1 for screenshots)
export function ScreenTag({ id, name }) {
  return (
    <div className="screen-tag">
      <span className="dot" />
      <span className="ltr">{id}</span>
      <span>·</span>
      <span>{name}</span>
    </div>
  );
}

export function MockNote({ children }) {
  return (
    <div className="mock-note">
      <b>بيانات تجريبية للعرض فقط</b>
      {children ? <> — {children}</> : <> — لا تمثل بيانات حقيقية.</>}
    </div>
  );
}

export function TopBar({ title, back, action }) {
  const nav = useNavigate();
  return (
    <div className="appbar">
      {back ? (
        <button className="icon-btn bordered" onClick={() => nav(back)} aria-label="رجوع">
          <Icon name="back" />
        </button>
      ) : (
        <span className="brand">
          <BrandMark />
          يَد <span className="ltr small muted">YADD</span>
        </span>
      )}
      {title && !back ? null : null}
      {back && <span className="detail-title">{title}</span>}
      <span className="spacer" />
      {action}
    </div>
  );
}

export function BottomNav({ variant = 'public', active = '' }) {
  const { authed, portal } = useApp();
  const items =
    variant === 'beneficiary'
      ? [
          { to: '/b', key: 'home', label: 'الرئيسية', icon: 'home' },
          { to: '/search', key: 'search', label: 'البحث', icon: 'search' },
          { to: '/b/requests', key: 'reqs', label: 'طلباتي', icon: 'file' },
          { to: '/account', key: 'account', label: 'الحساب', icon: 'user' },
        ]
      : variant === 'provider'
        ? [
            { to: '/p', key: 'home', label: 'الرئيسية', icon: 'home' },
            { to: '/p/requests', key: 'reqs', label: 'الطلبات', icon: 'file' },
            { to: '/soon/TRX-03', key: 'trx', label: 'معاملاتي', icon: 'swap' },
            { to: '/account', key: 'account', label: 'الحساب', icon: 'user' },
          ]
        : [
            { to: '/', key: 'home', label: 'الرئيسية', icon: 'home' },
            { to: '/search', key: 'search', label: 'البحث', icon: 'search' },
            {
              to: authed ? (portal === 'provider' ? '/p' : '/b') : '/signin',
              key: 'account',
              label: authed ? 'الحساب' : 'تسجيل الدخول',
              icon: 'user',
            },
            { to: '/more', key: 'more', label: 'المزيد', icon: 'grid' },
          ];
  return (
    <nav className="bottomnav">
      {items.map((i) => (
        <Link key={i.key} to={i.to} className={active === i.key ? 'active' : ''}>
          <Icon name={i.icon} size={23} />
          <span>{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}

// Page frame: ScreenTag + content + optional nav + demo footer
export function Screen({ id, name, nav, active, children, flush }) {
  const [params] = useSearchParams();
  useEffect(() => {
    document.body.classList.toggle('clean', params.get('clean') === '1');
  }, [params]);
  return (
    <div className="stage">
      <div className="col">
        <ScreenTag id={id} name={name} />
        <div className={flush ? 'content flush' : 'content'}>{children}</div>
        {nav && <BottomNav variant={nav} active={active} />}
        <div className="demo-bar">
          <span>نموذج P0 للمناقشة الأولية</span>
          <span>·</span>
          <Link to="/_index">فهرس الشاشات</Link>
        </div>
      </div>
    </div>
  );
}
