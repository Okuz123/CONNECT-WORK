import { useState } from 'react';
import { signInWithGoogle, sendOtp, verifyOtp } from '../lib/auth';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState<'phone' | 'otp'>('phone');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGoogle = async () => {
    setError(null); setBusy(true);
    try { await signInWithGoogle(); alert('Signed in with Google'); }
    catch (e: any) { setError(e.message); }
    finally { setBusy(false); }
  };

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setBusy(true);
    try { await sendOtp(phone); setStage('otp'); }
    catch (e: any) { setError(e.message); }
    finally { setBusy(false); }
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setBusy(true);
    try { await verifyOtp(otp); alert('Signed in with phone'); }
    catch (e: any) { setError(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <div id="recaptcha-container" />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Sign in</h2>

        <button className="btn" style={{ width: '100%' }} onClick={onGoogle} disabled={busy}>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', color: 'var(--cw-muted)', margin: '20px 0' }}>— or —</p>

        {stage === 'phone' ? (
          <form onSubmit={onSendOtp}>
            <input
              className="input" type="tel" placeholder="+91 9876543210"
              value={phone} onChange={(e) => setPhone(e.target.value)} required
            />
            <button className="btn" style={{ width: '100%', marginTop: 12 }} disabled={busy}>
              {busy ? 'Sending…' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={onVerify}>
            <input
              className="input" inputMode="numeric" placeholder="6-digit OTP"
              value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required
            />
            <button className="btn" style={{ width: '100%', marginTop: 12 }} disabled={busy}>
              {busy ? 'Verifying…' : 'Verify'}
            </button>
            <button
              type="button" className="btn btn--ghost"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => setStage('phone')}
            >Change number</button>
          </form>
        )}

        {error && (
          <p style={{ color: 'var(--cw-danger)', marginTop: 12, fontSize: 13 }}>{error}</p>
        )}

        <p style={{ color: 'var(--cw-muted)', fontSize: 12, marginTop: 16 }}>
          Requires Firebase env vars (VITE_FIREBASE_*). See <code>apps/web/.env.local</code>.
        </p>
      </div>
    </div>
  );
}
