import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../lib/firestore';

async function count(name: string): Promise<number> {
  if (!db) return 0;
  try {
    const snap = await getDocs(query(collection(db, name), limit(1000)));
    return snap.size;
  } catch { return 0; }
}

export default function AdminPanel() {
  const [stats, setStats] = useState({
    workers: 0, jobs: 0, applications: 0, chats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [workers, jobs, applications, chats] = await Promise.all([
        count('workers'), count('jobs'), count('applications'), count('chats'),
      ]);
      setStats({ workers, jobs, applications, chats });
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 style={{ marginTop: 20 }}>Admin Dashboard</h1>
      <p style={{ color: 'var(--cw-text-muted)' }}>Live platform data from Firestore.</p>

      {loading ? (
        <p style={{ marginTop: 24, color: 'var(--cw-text-muted)' }}>Loading…</p>
      ) : (
        <>
          <div className="grid" style={{ marginTop: 20 }}>
            <StatCard label="Workers registered" value={stats.workers} />
            <StatCard label="Jobs posted" value={stats.jobs} />
            <StatCard label="Applications" value={stats.applications} />
            <StatCard label="Active chats" value={stats.chats} />
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h3 style={{ marginTop: 0 }}>Collections</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--cw-text-muted)', fontSize: 14 }}>
              <li><strong>workers</strong> — {stats.workers} doc(s)</li>
              <li><strong>jobs</strong> — {stats.jobs} doc(s)</li>
              <li><strong>applications</strong> — {stats.applications} doc(s)</li>
              <li><strong>chats</strong> — {stats.chats} doc(s)</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <div style={{ fontSize: 13, color: 'var(--cw-text-muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}
