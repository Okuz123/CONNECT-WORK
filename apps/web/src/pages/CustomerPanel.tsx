import { CATEGORIES } from '../shared/constants';

export default function CustomerPanel() {
  return (
    <div>
      <h1>Find Workers</h1>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className="btn btn--ghost" style={{ whiteSpace: 'nowrap' }}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid" style={{ marginTop: 20 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <h3>Worker {i}</h3>
            <p style={{ color: 'var(--cw-muted)' }}>Plumbing • Mumbai • ₹300/hr</p>
          </div>
        ))}
      </div>
    </div>
  );
}
