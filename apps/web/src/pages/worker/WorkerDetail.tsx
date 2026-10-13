import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firestore';
import type { WorkerProfile } from '../../shared/districts';

export default function WorkerDetail() {
  const { id } = useParams<{ id: string }>();
  const [w, setW] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !db) { setLoading(false); return; }
    getDoc(doc(db, 'workers', id))
      .then((s) => setW(s.exists() ? ({ uid: s.id, ...(s.data() as any) } as WorkerProfile) : null))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;
  if (err) return <p style={{ padding: 24, color: 'var(--cw-danger)' }}>{err}</p>;
  if (!w) return <p style={{ padding: 24 }}>Worker not found.</p>;

  const initials = w.name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{ maxWidth: 720, margin: '20px auto' }}>
      <Link to="/customer" style={{ fontSize: 14 }}>← Back to workers</Link>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'var(--cw-primary-light)', color: 'var(--cw-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 24,
          }}>{initials}</div>
          <div>
            <h2 style={{ margin: 0 }}>{w.name}</h2>
            <div style={{ color: 'var(--cw-text-muted)', fontSize: 14 }}>
              {w.category} • {w.block}, {w.district}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          <Stat label="Experience" value={`${w.experienceYears} yr${w.experienceYears === 1 ? '' : 's'}`} />
          <Stat label="Daily wage" value={`₹${w.dailyWage}`} />
          <Stat label="District" value={String(w.district)} />
          <Stat label="Block" value={w.block} />
        </div>

        {w.bio && (
          <>
            <h3 style={{ marginTop: 20 }}>About</h3>
            <p style={{ color: 'var(--cw-text-muted)' }}>{w.bio}</p>
          </>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <a href={`tel:${w.phone}`} className="btn" style={{ flex: 1, textAlign: 'center' }}>Call {w.phone}</a>
          <a href={`https://wa.me/${w.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
            className="btn btn--ghost" style={{ flex: 1, textAlign: 'center' }}>
            WhatsApp
          </a>
        </div>
      </div>
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
