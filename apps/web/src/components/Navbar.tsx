import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../i18n/useLang';

export default function Navbar() {
  const { pathname } = useLocation();
  const { lang, setLang, t, langs } = useLang();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/customer', label: t('nav.workers') },
    { to: '/jobs', label: t('nav.jobs') },
    { to: '/worker', label: t('nav.hire') },
    { to: '/owner', label: t('nav.business') },
    { to: '/admin', label: t('nav.admin') },
  ];

  return (
    <header className="nav">
      <Link to="/" className="nav__brand">CONNECT WORK</Link>
      <nav className="nav__links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={pathname === l.to ? 'nav__link nav__link--active' : 'nav__link'}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        style={{
          padding: '6px 10px',
          borderRadius: 8,
          border: '1px solid var(--cw-border)',
          background: 'var(--cw-surface)',
          fontFamily: 'inherit',
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        {langs.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>

      <Link to="/login" className="nav__cta">Sign in</Link>
    </header>
  );
}
