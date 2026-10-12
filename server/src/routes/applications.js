import { Router } from 'express';
import { listCollection, createDoc, updateDoc } from '../services/firestore.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.jobId) filters.jobId = req.query.jobId;
    if (req.query.workerId) filters.workerId = req.query.workerId;
    res.json({ applications: await listCollection('applications', filters) });
  } catch (e) { next(e); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { jobId, message, proposedRate } = req.body;
    if (!jobId) return res.status(400).json({ error: 'jobId required' });
    const app = await createDoc('applications', {
      jobId,
      workerId: req.user?.uid || 'demo',
      message: message || '',
      proposedRate,
      status: 'pending',
    });
    res.status(201).json(app);
  } catch (e) { next(e); }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try { res.json(await updateDoc('applications', req.params.id, req.body)); }
  catch (e) { next(e); }
});

export default router;
