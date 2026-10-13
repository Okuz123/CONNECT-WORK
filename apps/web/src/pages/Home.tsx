import { Link } from 'react-router-dom';
import { CATEGORIES } from '../shared/constants';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find skilled workers.<br/>Get hired.</h1>
        <p>
          CONNECT WORK connects customers with verified local professionals —
          plumbers, electricians, tutors, drivers, and more. Post a job in
          seconds, or list your skills and start earning.
        </p>
        <div className="hero__actions">
          <Link to="/customer" className="btn">I need help</Link>
          <Link to="/worker" className="btn btn--ghost">I want work</Link>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <h2 style={{ margin: 0 }}>Browse by category</h2>
          <Link to="/customer" style={{ fontSize: 14 }}>View all →</Link>
        </div>

        <div className="grid">
          {CATEGORIES.slice(0, 12).map((c) => (
            <Link
              key={c}
              to="/customer"
              className="card"
              style={{ color: 'inherit', display: 'block' }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'var(--cw-primary-light)',
                color: 'var(--cw-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                marginBottom: 12,
              }}>
                {c[0]}
              </div>
              <h3 style={{ marginBottom: 4 }}>{c}</h3>
              <p style={{ color: 'var(--cw-text-muted)', margin: 0, fontSize: 13 }}>
                Find {c.toLowerCase()} pros near you
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 60, textAlign: 'center' }}>
        <h2>Ready to get started?</h2>
        <p style={{ color: 'var(--cw-text-muted)', marginBottom: 24 }}>
          Join thousands of workers and customers connecting every day.
        </p>
        <div className="hero__actions">
          <Link to="/login" className="btn">Create free account</Link>
        </div>
      </section>
    </>
  );
}
