import WorkerProfileForm from './worker/WorkerProfileForm';

export default function WorkerPanel() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Get Hired</h1>
      <p style={{ textAlign: 'center', color: 'var(--cw-text-muted)' }}>
        Fill in your profile. Employers near you will see it.
      </p>
      <WorkerProfileForm />
    </div>
  );
}
