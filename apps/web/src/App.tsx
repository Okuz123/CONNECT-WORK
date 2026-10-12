import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import OwnerPanel from './pages/OwnerPanel'
import WorkerPanel from './pages/WorkerPanel'
import CustomerPanel from './pages/CustomerPanel'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/owner" element={<OwnerPanel />} />
        <Route path="/worker" element={<WorkerPanel />} />
        <Route path="/customer" element={<CustomerPanel />} />
      </Routes>
    </BrowserRouter>
  )
}
