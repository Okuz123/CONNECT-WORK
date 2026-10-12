export default function OwnerPanel() {
  return (
    <div>
      <h1>Business Owner Panel</h1>
      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card"><h3>Active jobs</h3><p>0</p></div>
        <div className="card"><h3>Assigned workers</h3><p>0</p></div>
        <div className="card"><h3>Earnings</h3><p>₹0</p></div>
        <div className="card"><h3>Rating</h3><p>—</p></div>
      </div>
      <h2 style={{ marginTop: 24 }}>Post a job</h2>
      <div className="card">
        <p style={{ color: 'var(--cw-muted)' }}>Job posting form goes here.</p>
      </div>
    </div>
  );
}
