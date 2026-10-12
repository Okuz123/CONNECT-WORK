import { Router } from 'express'
const r = Router()
r.get('/', (_req, res) => res.json({ jobs: [] }))
r.post('/', (_req, res) => res.status(201).json({ created: true }))
export default r
