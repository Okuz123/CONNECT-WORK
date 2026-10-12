import { Router } from 'express';
import { listCollection, createDoc, getDoc, updateDoc } from '../services/firestore.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, city, status } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (city) filters.city = city;
    if (status) filters.status = status;
    res.json({ jobs: await listCollection('jobs', filters) });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const job = await getDoc('jobs', req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (e) { next(e); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { title, description, category, budget, city } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'title, description, category required' });
    }
    const job = await createDoc('jobs', {
      title, description, category, budget, city,
      postedBy: req.user?.uid || 'demo',
      status: 'open',
    });
    res.status(201).json(job);
  } catch (e) { next(e); }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    res.json(await updateDoc('jobs', req.params.id, req.body));
  } catch (e) { next(e); }
});

export default router;
