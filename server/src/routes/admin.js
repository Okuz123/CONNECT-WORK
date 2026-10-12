import { Router } from 'express';

const router = Router();

// GET /api/admin/stats
router.get('/stats', (_req, res) => {
  res.json({
    users: 0,
    workers: 0,
    owners: 0,
    jobs: 0,
    applications: 0,
    revenue: 0,
    ts: Date.now(),
  });
});

// GET /api/admin/users
router.get('/users', (_req, res) => {
  res.json({ users: [] });
});

// POST /api/admin/approve/:id
router.post('/approve/:id', (req, res) => {
  res.json({ approved: true, id: req.params.id });
});

// POST /api/admin/reject/:id
router.post('/reject/:id', (req, res) => {
  res.json({ rejected: true, id: req.params.id });
});

export default router;
