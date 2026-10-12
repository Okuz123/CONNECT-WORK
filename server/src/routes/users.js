import { Router } from 'express'
const r = Router()
r.get('/', (_req, res) => res.json({ users: [] }))
r.get('/:id', (req, res) => res.json({ id: req.params.id }))
r.post('/', (_req, res) => res.status(201).json({ created: true }))
export default r
