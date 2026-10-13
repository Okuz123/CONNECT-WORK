import { useState } from 'react';
import { CATEGORIES, DISTRICTS } from '../../shared/districts';
import { saveWorkerProfile } from '../../lib/workers';

export default function WorkerProfileForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState<'Anantnag' | 'Kulgam' | ''>('');
  const [block, setBlock] = useState('');
  const [experienceYears, setExp] = useState('0');
  const [dailyWage, setWage] = useState('');
  const [bio, setBio] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const blocks = district ? DISTRICTS[district] : [];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setBusy(true);
    try {
      await saveWorkerProfile({
        uid: 'demo-' + Date.now(),
        name, phone, category, district, block,
        experienceYears: Number(experienceYears) || 0,
        dailyWage: Number(dailyWage) || 0,
        bio,
        createdAt: Date.now(),
      });
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="card" style={{ maxWidth: 560, margin: '40px auto' }}>
        <h2>Profile saved ✅</h2>
        <p style={{ color: 'var(--cw-text-muted)' }}>
          Your profile is now visible to employers near you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ maxWidth: 560, margin: '20px auto' }}>
      <h2 style={{ marginTop: 0 }}>Get Hired — Create your profile</h2>

      <label style={labelStyle}>Full name</label>
      <input className="input" value={name} onChange={e => setName(e.target.value)} required />

      <label style={labelStyle}>Phone number</label>
      <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+91 ..." />

      <label style={labelStyle}>What work do you do?</label>
      <select className="input" value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <label style={labelStyle}>District</label>
      <select className="input" value={district}
        onChange={e => { setDistrict(e.target.value as any); setBlock(''); }} required>
        <option value="">Select district</option>
        <option value="Anantnag">Anantnag</option>
        <option value="Kulgam">Kulgam</option>
      </select>

      <label style={labelStyle}>Block</label>
      <select className="input" value={block} onChange={e => setBlock(e.target.value)}
        required disabled={!district}>
        <option value="">{district ? 'Select block' : 'Pick district first'}</option>
        {blocks.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
        <div>
          <label style={labelStyle}>Years of experience</label>
          <input className="input" type="number" min="0" value={experienceYears}
            onChange={e => setExp(e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>Daily wage (₹)</label>
          <input className="input" type="number" min="0" value={dailyWage}
            onChange={e => setWage(e.target.value)} required placeholder="e.g. 600" />
        </div>
      </div>

      <label style={labelStyle}>Short bio</label>
      <textarea className="input" rows={3} value={bio} onChange={e => setBio(e.target.value)}
        placeholder="Tell employers about your work…" />

      {error && <p style={{ color: 'var(--cw-danger)', marginTop: 12 }}>{error}</p>}

      <button className="btn" style={{ width: '100%', marginTop: 20 }} disabled={busy}>
        {busy ? 'Saving…' : 'Save my profile'}
      </button>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  marginTop: 14,
  color: 'var(--cw-text)',
};
