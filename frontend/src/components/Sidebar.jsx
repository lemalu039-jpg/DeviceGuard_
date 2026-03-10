import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Monitor, Star, Mail, Edit, Search, FileText, Upload, Calendar, BarChart2, Users, Bell, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ width: '250px', backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ color: 'var(--accent-color)', cursor: 'pointer' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a1a1a' }}>DeviceGuard</h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/dashboard" style={({isActive}) => ({
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive ? 'var(--sidebar-bg)' : 'transparent',
              color: isActive ? 'white' : 'var(--text-secondary)',
              fontWeight: isActive ? '600' : '500'
            })}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/dispositivos" style={({isActive}) => ({
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive ? 'var(--sidebar-bg)' : 'transparent',
              color: isActive ? 'white' : 'var(--text-secondary)',
            })}>
              <Monitor size={20} /> Dispositivos
            </NavLink>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/prestamos" style={({isActive}) => ({
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive ? 'var(--sidebar-bg)' : 'transparent',
              color: isActive ? 'white' : 'var(--text-secondary)',
            })}>
              <Upload size={20} /> Préstamos
            </NavLink>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/mantenimiento" style={({isActive}) => ({
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none',
              backgroundColor: isActive ? 'var(--sidebar-bg)' : 'transparent',
              color: isActive ? 'white' : 'var(--text-secondary)',
            })}>
              <Settings size={20} /> Mantenimiento
            </NavLink>
          </li>
        </ul>

        <div style={{ marginTop: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#a0a0a0', textTransform: 'uppercase', paddingLeft: '16px' }}>PÁGINAS</span>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
            <li style={{ marginBottom: '4px' }}>
                <NavLink to="/reportes" style={({isActive}) => ({display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)', textDecoration: 'none'})}>
                    <FileText size={18} /> Generar Reportes
                </NavLink>
            </li>
            <li style={{ marginBottom: '4px' }}><a href="#" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--text-secondary)', textDecoration: 'none'}}><Upload size={18} /> Registrar Salida</a></li>
            <li style={{ marginBottom: '4px' }}><a href="#" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--text-secondary)', textDecoration: 'none'}}><Calendar size={18} /> Calendario</a></li>
            <li style={{ marginBottom: '4px' }}><a href="#" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--text-secondary)', textDecoration: 'none'}}><BarChart2 size={18} /> Estadisticas</a></li>
          </ul>
        </div>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}>
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
