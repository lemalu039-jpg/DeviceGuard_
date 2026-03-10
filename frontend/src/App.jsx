import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Dispositivos from './pages/Dispositivos';
import Prestamos from './pages/Prestamos';
import Mantenimiento from './pages/Mantenimiento';
import Reportes from './pages/Reportes';
import Inicio from './pages/Inicio';
import './index.css';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/dispositivos" element={<MainLayout><Dispositivos /></MainLayout>} />
        <Route path="/prestamos" element={<MainLayout><Prestamos /></MainLayout>} />
        <Route path="/mantenimiento" element={<MainLayout><Mantenimiento /></MainLayout>} />
        <Route path="/reportes" element={<MainLayout><Reportes /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
