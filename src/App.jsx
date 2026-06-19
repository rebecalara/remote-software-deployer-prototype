import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Machines from './pages/Machines';
import SoftwareCatalog from './pages/SoftwareCatalog';
import NewInstallation from './pages/NewInstallation';
import Monitoring from './pages/Monitoring';
import History from './pages/History';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/software" element={<SoftwareCatalog />} />
          <Route path="/new-installation" element={<NewInstallation />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
