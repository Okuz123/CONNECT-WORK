import { Router } from 'express';
import { listCollection } from '../services/firestore.js';

const router = Router();

router.get('/stats', async (_req, res, next) => {
  try {
    const users = await listCollection('users');
    const jobs = await listCollection('jobs');
    const apps = await listCollection('applications');
    res.json({
      users: users.length,
      workers: users.filter((u) => u.role === 'worker').length,
      owners: users.filter((u) => u.role === 'owner').length,
      jobs: jobs.length,
      applications: apps.length,
      revenue: 0,
      ts: Date.now(),
    });
  } catch (e) { next(e); }
});

router.get('/users', async (_req, res, next) => {
  try { res.json({ users: await listCollection('users') }); }
  catch (e) { next(e); }
});

router.post('/approve/:id', (req, res) => {
  res.json({ approved: true, id: req.params.id });
});

router.post('/reject/:id', (req, res) => {
  res.json({ rejected: true, id: req.params.id });
});

export default router;
