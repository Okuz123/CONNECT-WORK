import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRoute from './routes/users.js'
import jobsRoute from './routes/jobs.js'
import applicationsRoute from './routes/applications.js'
import adminRoute from './routes/admin.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => res.json({ name: 'CONNECT WORK API', version: '0.1.0' }))
app.use('/api/users', usersRoute)
app.use('/api/jobs', jobsRoute)
app.use('/api/applications', applicationsRoute)
app.use('/api/admin', adminRoute)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`CONNECT WORK API on :${PORT}`))
