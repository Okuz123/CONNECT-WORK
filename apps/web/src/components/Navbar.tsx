import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/customer', label: 'Find Workers' },
  { to: '/worker', label: 'Get Hired' },
  { to: '/owner', label: 'Business' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">CONNECT&nbsp;WORK</Link>
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
      <Link to="/login" className="nav__cta">Sign in</Link>
    </header>
  );
}
