import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firestore';
import { applyToJob, applicationsForJob, type Application } from '../../lib/applications';
import type { JobPost } from '../../lib/jobs';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobPost | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !db) { setLoading(false); return; }
    getDoc(doc(db, 'jobs', id))
      .then((s) => setJob(s.exists() ? ({ id: s.id, ...(s.data() as any) } as JobPost) : null))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
    applicationsForJob(id).then(setApps).catch(() => {});
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErr(null); setBusy(true);
    try {
      await applyToJob({
        jobId: id,
        workerName: name,
        workerPhone: phone,
        message,
        createdAt: Date.now(),
      });
      setDone(true);
      setApps(await applicationsForJob(id));
    } catch (e: any) {
      setErr(e.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;
  if (!job) return <p style={{ padding: 24 }}>Job not found.</p>;

  return (
    <div style={{ maxWidth: 720, margin: '20px auto' }}>
      <Link to="/jobs" style={{ fontSize: 14 }}>← Back to jobs</Link>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <h2 style={{ margin: 0 }}>{job.title}</h2>
          <span className="badge">₹{job.dailyWage}/day</span>
        </div>
        <div style={{ color: 'var(--cw-text-muted)', fontSize: 14, marginTop: 4 }}>
          {job.category} • {job.block}, {job.district}
        </div>

        <h3 style={{ marginTop: 20 }}>Description</h3>
        <p>{job.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginTop: 12 }}>
          <Stat label="Days" value={String(job.days)} />
          <Stat label="Wage/day" value={`₹${job.dailyWage}`} />
          <Stat label="Total" value={`₹${job.dailyWage * job.days}`} />
          <Stat label="Posted by" value={job.contactName} />
        </div>

        <a href={`tel:${job.contactPhone}`} className="btn" style={{ marginTop: 20 }}>
          Call employer
        </a>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}>Apply for this job</h3>

        {done ? (
          <p style={{ color: 'var(--cw-success)' }}>✅ Application sent. The employer will see it.</p>
        ) : (
          <form onSubmit={submit}>
            <label style={L}>Your name</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} required />

            <label style={L}>Your phone</label>
            <input className="input" type="tel" value={phone}
              onChange={e => setPhone(e.target.value)} required placeholder="+91..." />

            <label style={L}>Message (optional)</label>
            <textarea className="input" rows={3} value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell the employer why you're a good fit…" />

            {err && <p style={{ color: 'var(--cw-danger)', marginTop: 12 }}>{err}</p>}

            <button className="btn" style={{ width: '100%', marginTop: 16 }} disabled={busy}>
              {busy ? 'Sending…' : 'Apply now'}
            </button>
          </form>
        )}
      </div>

      {apps.length > 0 && (
        <div className="card" style={{ marginTop: 20 }}>
          <h3 style={{ marginTop: 0 }}>Applicants ({apps.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {apps.map((a) => (
              <li key={a.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--cw-border)' }}>
                <strong>{a.workerName}</strong> — {a.workerPhone}
                {a.message && <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--cw-text-muted)' }}>{a.message}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--cw-surface-hover)', padding: 12, borderRadius: 10 }}>
      <div style={{ fontSize: 12, color: 'var(--cw-text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, marginTop: 14 };
