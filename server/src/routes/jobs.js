import { Router } from 'express';

const router = Router();
const jobs = [];

// GET /api/jobs  ?category=  ?city=  ?status=
router.get('/', (req, res) => {
  const { category, city, status } = req.query;
  let out = jobs;
  if (category) out = out.filter((j) => j.category === category);
  if (city) out = out.filter((j) => j.city === city);
  if (status) out = out.filter((j) => j.status === status);
  res.json({ jobs: out });
});

// GET /api/jobs/:id
router.get('/:id', (req, res) => {
  const j = jobs.find((x) => x.id === req.params.id);
  if (!j) return res.status(404).json({ error: 'Job not found' });
  res.json(j);
});

// POST /api/jobs
router.post('/', (req, res) => {
  const { title, description, category, budget, city, postedBy } = req.body || {};
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'title, description, category required' });
  }
  const job = {
    id: String(Date.now()),
    title,
    description,
    category,
    budget,
    city,
    postedBy,
    status: 'open',
    createdAt: Date.now(),
  };
  jobs.push(job);
  res.status(201).json(job);
});

// PATCH /api/jobs/:id
router.patch('/:id', (req, res) => {
  const j = jobs.find((x) => x.id === req.params.id);
  if (!j) return res.status(404).json({ error: 'Job not found' });
  Object.assign(j, req.body, { updatedAt: Date.now() });
  res.json(j);
});

export default router;
