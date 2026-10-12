import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import usersRoute from './routes/users.js';
import jobsRoute from './routes/jobs.js';
import applicationsRoute from './routes/applications.js';
import adminRoute from './routes/admin.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ name: 'CONNECT WORK API', version: '0.1.0', status: 'ok' });
});

app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.use('/api/users', usersRoute);
app.use('/api/jobs', jobsRoute);
app.use('/api/applications', applicationsRoute);
app.use('/api/admin', adminRoute);

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CONNECT WORK API listening on http://localhost:${PORT}`);
});
