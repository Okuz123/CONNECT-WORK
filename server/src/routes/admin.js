import { Router } from 'express'
const r = Router()
r.get('/stats', (_req, res) => res.json({ users: 0, jobs: 0, applications: 0 }))
export default r
