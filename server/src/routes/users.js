import { Router } from 'express';

const router = Router();

// In-memory demo store (replace with Firestore later)
const users = [];

// GET /api/users
router.get('/', (_req, res) => {
  res.json({ users });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const u = users.find((x) => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});

// POST /api/users
router.post('/', (req, res) => {
  const { name, phone, email, role = 'customer', skills = [] } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name is required' });

  const user = {
    id: String(Date.now()),
    name,
    phone,
    email,
    role,
    skills,
    verified: false,
    createdAt: Date.now(),
  };
  users.push(user);
  res.status(201).json(user);
});

// PATCH /api/users/:id
router.patch('/:id', (req, res) => {
  const u = users.find((x) => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  Object.assign(u, req.body, { updatedAt: Date.now() });
  res.json(u);
});

export default router;
