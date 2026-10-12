import { useState } from 'react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState<'phone' | 'otp'>('phone');

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate Firebase signInWithPhoneNumber(auth, phone, recaptcha)
    setStage('otp');
    alert(`Demo: OTP sent to ${phone}`);
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with Firebase confirmationResult.confirm(otp)
    if (otp === '123456') {
      alert('Signed in (demo). Wire up Firebase to make this real.');
    } else {
      alert('Wrong OTP. Try 123456 for demo.');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Sign in</h2>
        <p style={{ color: 'var(--cw-muted)' }}>
          Use your phone number. Google sign-in wiring is in `src/lib/firebase.ts`.
        </p>

        {stage === 'phone' ? (
          <form onSubmit={sendOtp}>
            <input
              className="input"
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button className="btn" style={{ width: '100%', marginTop: 12 }}>
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verify}>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
            <button className="btn" style={{ width: '100%', marginTop: 12 }}>
              Verify
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => setStage('phone')}
            >
              Change number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
