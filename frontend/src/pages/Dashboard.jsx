import { useState, useEffect } from 'react';
import { dispositivosService } from '../services/api';

const Dashboard = () => {
  const [dispositivos, setDispositivos] = useState([]);
  
  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const res = await dispositivosService.getAll();
        setDispositivos(res.data);
      } catch (err) {
        console.error("Error al cargar dispositivos", err);
      }
    };
    fetchDispositivos();
  }, []);

  const totalActivos = dispositivos.filter(d => d.estado === 'Activo' || d.estado === 'Devuelto').length;
  const enMantenimiento = dispositivos.filter(d => d.estado === 'En Reparación').length;

  const getBadgeClass = (estado) => {
    switch(estado) {
      case 'Activo': return 'badge badge-active';
      case 'Devuelto': return 'badge badge-returned';
      case 'En Reparación': return 'badge badge-repair';
      default: return 'badge';
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Dispositivos en Uso</h3>
            <div style={{ backgroundColor: '#f0f4ff', padding: '8px', borderRadius: '8px', color: 'var(--accent-blue)' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
          </div>
          <div className="stat-value">{totalActivos}</div>
          <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '500' }}>↗ 8.5% <span style={{ color: 'var(--text-secondary)', fontWeight: '400'}}>Mas que ayer</span></span>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Total Equipos</h3>
            <div style={{ backgroundColor: '#fff8e6', padding: '8px', borderRadius: '8px', color: '#f59e0b' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
          </div>
          <div className="stat-value">{dispositivos.length}</div>
          <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '500' }}>↗ 1.3% <span style={{ color: 'var(--text-secondary)', fontWeight: '400'}}>Mas que el año Pasado</span></span>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>En Mantenimiento</h3>
            <div style={{ backgroundColor: '#ffebee', padding: '8px', borderRadius: '8px', color: '#dc3545' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            </div>
          </div>
          <div className="stat-value">{enMantenimiento}</div>
          <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: '500' }}>↘ 4.3% <span style={{ color: 'var(--text-secondary)', fontWeight: '400'}}>Mas que la semana pasada</span></span>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista Dispositivos</h2>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Ubicacion</th>
              <th>Fecha - Hora Entrada</th>
              <th>Serial</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {dispositivos.map(d => (
              <tr key={d.id}>
                <td><img src={d.imagen_url} alt={d.nombre} /></td>
                <td style={{ fontWeight: '500', color: '#1a1a1a' }}>{d.nombre}</td>
                <td>{d.ubicacion}</td>
                <td>{new Date(d.fecha_ingreso).toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</td>
                <td>{d.serial}</td>
                <td><span className={getBadgeClass(d.estado)}>{d.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
