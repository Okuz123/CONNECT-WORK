import { useEffect, useState } from 'react';
import { listJobs, type JobPost } from '../../lib/jobs';

export default function JobsList() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    listJobs(100)
      .then(setJobs)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = filter === 'all' ? jobs : jobs.filter((j) => j.category === filter);
  const categories = Array.from(new Set(jobs.map((j) => j.category)));

  return (
    <div>
      <h1 style={{ marginTop: 20 }}>Open jobs</h1>
      <p style={{ color: 'var(--cw-text-muted)' }}>Daily-wage work posted by employers near you.</p>

      {categories.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', paddingBottom: 4 }}>
          <button className={filter === 'all' ? 'btn' : 'btn btn--ghost'}
            onClick={() => setFilter('all')} style={{ whiteSpace: 'nowrap' }}>All</button>
          {categories.map((c) => (
            <button key={c} className={filter === c ? 'btn' : 'btn btn--ghost'}
              onClick={() => setFilter(c)} style={{ whiteSpace: 'nowrap' }}>{c}</button>
          ))}
        </div>
      )}

      {err && <p style={{ color: 'var(--cw-danger)', marginTop: 12 }}>{err}</p>}

      {loading ? (
        <p style={{ color: 'var(--cw-text-muted)', marginTop: 24 }}>Loading jobs…</p>
      ) : visible.length === 0 ? (
        <div className="card" style={{ marginTop: 24, textAlign: 'center' }}>
          <h3>No jobs yet</h3>
          <p style={{ color: 'var(--cw-text-muted)' }}>No jobs posted in this category.</p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 24 }}>
          {visible.map((j) => (
            <a key={j.id} href={`/jobs/${j.id}`} className="card"
               style={{ color: 'inherit', display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <h3 style={{ margin: 0, marginBottom: 4 }}>{j.title}</h3>
                <span className="badge">₹{j.dailyWage}/day</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--cw-text-muted)' }}>
                {j.category} • {j.block}, {j.district}
              </div>
              <p style={{ fontSize: 13, marginTop: 10, color: 'var(--cw-text)' }}>{j.description}</p>
              <div style={{ fontSize: 12, color: 'var(--cw-text-dim)', marginTop: 8 }}>
                {j.days} day{j.days > 1 ? 's' : ''} • Posted by {j.contactName}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
