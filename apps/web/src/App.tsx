import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import OwnerPanel from './pages/OwnerPanel';
import WorkerPanel from './pages/WorkerPanel';
import CustomerPanel from './pages/CustomerPanel';
import WorkerDetail from './pages/worker/WorkerDetail';
import JobsList from './pages/jobs/JobsList';
import JobDetail from './pages/jobs/JobDetail';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/owner/*" element={<OwnerPanel />} />
          <Route path="/worker/*" element={<WorkerPanel />} />
          <Route path="/customer/*" element={<CustomerPanel />} />
          <Route path="/worker/:id" element={<WorkerDetail />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">© 2026 CONNECT WORK</footer>
    </div>
  );
}
