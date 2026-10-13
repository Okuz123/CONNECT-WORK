import PostJobForm from './owner/PostJobForm';

export default function OwnerPanel() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Business / Employer</h1>
      <p style={{ textAlign: 'center', color: 'var(--cw-text-muted)' }}>
        Post a job and get workers near you.
      </p>
      <PostJobForm />
    </div>
  );
}
