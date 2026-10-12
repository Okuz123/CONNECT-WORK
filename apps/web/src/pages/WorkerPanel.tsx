export default function WorkerPanel() {
  return (
    <div>
      <h1>Worker — Get Hired</h1>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Your profile</h3>
        <p style={{ color: 'var(--cw-muted)' }}>
          Set your skills, hourly rate, city, and bio to appear in customer searches.
        </p>
        <button className="btn">Complete profile</button>
      </div>
      <h2 style={{ marginTop: 24 }}>Open jobs near you</h2>
      <div className="card">
        <p style={{ color: 'var(--cw-muted)' }}>No jobs loaded yet.</p>
      </div>
    </div>
  );
}
