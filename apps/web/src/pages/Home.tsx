import { Link } from 'react-router-dom';
import { CATEGORIES } from '../shared/constants';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find skilled workers. Get hired.</h1>
        <p>CONNECT WORK connects customers with verified workers nearby.</p>
        <div className="hero__actions">
          <Link to="/customer" className="btn">I need help</Link>
          <Link to="/worker" className="btn btn--ghost">I want work</Link>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Browse categories</h2>
        <div className="grid">
          {CATEGORIES.map((c) => (
            <div key={c} className="card">
              <strong>{c}</strong>
              <p style={{ color: 'var(--cw-muted)', margin: '6px 0 0' }}>
                Find {c.toLowerCase()} pros near you
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
