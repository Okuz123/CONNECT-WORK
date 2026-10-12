import { Router } from 'express';

const router = Router();
const apps = [];

// GET /api/applications  ?jobId=  ?workerId=
router.get('/', (req, res) => {
  const { jobId, workerId } = req.query;
  let out = apps;
  if (jobId) out = out.filter((a) => a.jobId === jobId);
  if (workerId) out = out.filter((a) => a.workerId === workerId);
  res.json({ applications: out });
});

// POST /api/applications
router.post('/', (req, res) => {
  const { jobId, workerId, message, proposedRate } = req.body || {};
  if (!jobId || !workerId) {
    return res.status(400).json({ error: 'jobId and workerId required' });
  }
  const app = {
    id: String(Date.now()),
    jobId,
    workerId,
    message: message || '',
    proposedRate,
    status: 'pending',
    createdAt: Date.now(),
  };
  apps.push(app);
  res.status(201).json(app);
});

// PATCH /api/applications/:id  { status: 'accepted' | 'rejected' }
router.patch('/:id', (req, res) => {
  const a = apps.find((x) => x.id === req.params.id);
  if (!a) return res.status(404).json({ error: 'Application not found' });
  Object.assign(a, req.body, { updatedAt: Date.now() });
  res.json(a);
});

export default router;
