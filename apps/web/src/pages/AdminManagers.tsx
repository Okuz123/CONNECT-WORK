import { useEffect, useState } from 'react';
import { addManager, listManagers, removeManager, type Manager } from '../lib/managers';
import { DISTRICTS } from '../shared/districts';

export default function AdminManagers() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState<'Anantnag' | 'Kulgam'>('Anantnag');
  const [block, setBlock] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const refresh = () => listManagers().then(setManagers).catch(() => {});
  useEffect(() => { refresh(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!block) return;
    setBusy(true); setErr(null);
    try {
      await addManager({ name, phone, district, blocks: [block], createdAt: Date.now() });
      setName(''); setPhone(''); setBlock('');
      await refresh();
    } catch (e: any) {
      setErr(e.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '20px auto' }}>
      <h2>Managers</h2>
      <p style={{ color: 'var(--cw-text-muted)' }}>
        Assign a block-level manager to moderate workers and jobs in their block.
      </p>

      <form onSubmit={submit} className="card" style={{ marginTop: 12 }}>
        <label style={L}>Manager name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />

        <label style={L}>Phone</label>
        <input className="input" type="tel" value={phone}
          onChange={(e) => setPhone(e.target.value)} required />

        <label style={L}>District</label>
        <select className="input" value={district} onChange={(e) => { setDistrict(e.target.value as any); setBlock(''); }}>
          <option value="Anantnag">Anantnag</option>
          <option value="Kulgam">Kulgam</option>
        </select>

        <label style={L}>Block</label>
        <select className="input" value={block} onChange={(e) => setBlock(e.target.value)} required>
          <option value="">Select block</option>
          {DISTRICTS[district].map((b) => <option key={b} value={b}>{b}</option>)}
        </select>

        {err && <p style={{ color: 'var(--cw-danger)', marginTop: 12 }}>{err}</p>}

        <button className="btn" style={{ width: '100%', marginTop: 16 }} disabled={busy}>
          {busy ? 'Adding…' : 'Add manager'}
        </button>
      </form>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}>Current managers ({managers.length})</h3>
        {managers.length === 0 ? (
          <p style={{ color: 'var(--cw-text-muted)' }}>No managers assigned yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {managers.map((m) => (
              <li key={m.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--cw-border)', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <strong>{m.name}</strong> — {m.phone}
                  <div style={{ fontSize: 12, color: 'var(--cw-text-muted)' }}>
                    {m.blocks.join(', ')}, {m.district}
                  </div>
                </div>
                <button className="btn btn--ghost" onClick={async () => { if (m.id) { await removeManager(m.id); refresh(); } }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, marginTop: 14 };
