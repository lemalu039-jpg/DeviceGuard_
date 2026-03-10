import { useState, useEffect } from 'react';
import { mantenimientoService } from '../services/api';

const Mantenimiento = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  
  useEffect(() => {
    const fetchMantenimientos = async () => {
      try {
        const res = await mantenimientoService.getAll();
        setMantenimientos(res.data);
      } catch (err) {
        console.error("Error al cargar mantenimientos", err);
      }
    };
    fetchMantenimientos();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' }}>Historial de Mantenimiento</h1>
        <button className="btn-primary">+ Registrar Seguimiento</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dispositivo</th>
              <th>Falla / Descripción</th>
              <th>Técnico Asignado</th>
              <th>Fecha Inicio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mantenimientos.length > 0 ? mantenimientos.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td style={{ fontWeight: '500', color: '#1a1a1a' }}>{m.dispositivo_nombre} ({m.serial})</td>
                <td>{m.descripcion_falla}</td>
                <td>{m.tecnico_asignado}</td>
                <td>{new Date(m.fecha_inicio).toLocaleDateString()}</td>
                <td>
                  <span className={`badge badge-${m.estado === 'Finalizado' ? 'returned' : 'repair'}`}>
                     {m.estado}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                 <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                    No hay registros de mantenimiento en base de datos. (Ejecute el script SQL para cargar datos de prueba).
                 </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mantenimiento;
