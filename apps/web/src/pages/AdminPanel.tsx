export default function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card"><h3>Users</h3><p>0 total</p></div>
        <div className="card"><h3>Workers</h3><p>0 verified</p></div>
        <div className="card"><h3>Owners</h3><p>0 businesses</p></div>
        <div className="card"><h3>Jobs</h3><p>0 open</p></div>
        <div className="card"><h3>Applications</h3><p>0 pending</p></div>
        <div className="card"><h3>Revenue</h3><p>₹0</p></div>
      </div>
      <h2 style={{ marginTop: 24 }}>Pending approvals</h2>
      <div className="card">No pending approvals.</div>
    </div>
  );
}
