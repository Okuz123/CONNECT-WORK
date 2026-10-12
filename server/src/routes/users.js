import { Router } from 'express';
import { listCollection, createDoc, getDoc, updateDoc } from '../services/firestore.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try { res.json({ users: await listCollection('users') }); }
  catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const u = await getDoc('users', req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, phone, email, role = 'customer', skills = [] } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const user = await createDoc('users', {
      name, phone, email, role, skills, verified: false,
    });
    res.status(201).json(user);
  } catch (e) { next(e); }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try { res.json(await updateDoc('users', req.params.id, req.body)); }
  catch (e) { next(e); }
});

export default router;
