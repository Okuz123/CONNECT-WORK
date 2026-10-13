import { useState } from 'react';
import { CATEGORIES, DISTRICTS } from '../../shared/districts';
import { postJob } from '../../lib/jobs';

export default function PostJobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState<'Anantnag' | 'Kulgam' | ''>('');
  const [block, setBlock] = useState('');
  const [dailyWage, setWage] = useState('');
  const [days, setDays] = useState('1');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const blocks = district ? DISTRICTS[district] : [];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setBusy(true);
    try {
      await postJob({
        title, description, category, district, block,
        dailyWage: Number(dailyWage) || 0,
        days: Number(days) || 1,
        contactName, contactPhone,
        createdAt: Date.now(),
      });
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="card" style={{ maxWidth: 560, margin: '40px auto' }}>
        <h2>Job posted ✅</h2>
        <p style={{ color: 'var(--cw-text-muted)' }}>Workers near you can now see and apply.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card" style={{ maxWidth: 560, margin: '20px auto' }}>
      <h2 style={{ marginTop: 0 }}>Post a job</h2>

      <label style={L}>Job title</label>
      <input className="input" value={title} onChange={e => setTitle(e.target.value)}
        placeholder="e.g. Need plumber for 1 day" required />

      <label style={L}>Description</label>
      <textarea className="input" rows={3} value={description}
        onChange={e => setDescription(e.target.value)} required />

      <label style={L}>Work type</label>
      <select className="input" value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Select</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <label style={L}>District</label>
      <select className="input" value={district}
        onChange={e => { setDistrict(e.target.value as any); setBlock(''); }} required>
        <option value="">Select</option>
        <option value="Anantnag">Anantnag</option>
        <option value="Kulgam">Kulgam</option>
      </select>

      <label style={L}>Block</label>
      <select className="input" value={block} onChange={e => setBlock(e.target.value)}
        required disabled={!district}>
        <option value="">{district ? 'Select block' : 'Pick district first'}</option>
        {blocks.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={L}>Daily wage (₹)</label>
          <input className="input" type="number" min="0" value={dailyWage}
            onChange={e => setWage(e.target.value)} required />
        </div>
        <div>
          <label style={L}>Days</label>
          <input className="input" type="number" min="1" value={days}
            onChange={e => setDays(e.target.value)} required />
        </div>
      </div>

      <label style={L}>Your name</label>
      <input className="input" value={contactName} onChange={e => setContactName(e.target.value)} required />

      <label style={L}>Your phone</label>
      <input className="input" type="tel" value={contactPhone}
        onChange={e => setContactPhone(e.target.value)} required placeholder="+91..." />

      {error && <p style={{ color: 'var(--cw-danger)', marginTop: 12 }}>{error}</p>}

      <button className="btn" style={{ width: '100%', marginTop: 20 }} disabled={busy}>
        {busy ? 'Posting…' : 'Post job'}
      </button>
    </form>
  );
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, marginTop: 14 };
