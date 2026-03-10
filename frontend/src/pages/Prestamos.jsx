import { useState, useEffect } from 'react';
import { prestamosService } from '../services/api';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  
  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const res = await prestamosService.getAll();
        setPrestamos(res.data);
      } catch (err) {
        console.error("Error al cargar prestamos", err);
      }
    };
    fetchPrestamos();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' }}>Préstamos Activos e Historial</h1>
        <button className="btn-primary">+ Registrar Préstamo</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Dispositivo</th>
              <th>Fecha Préstamo</th>
              <th>Devolución Esperada</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td style={{ fontWeight: '500', color: '#1a1a1a' }}>{p.usuario_nombre} {p.usuario_apellido}</td>
                <td>{p.dispositivo_nombre}</td>
                <td>{new Date(p.fecha_prestamo).toLocaleDateString()}</td>
                <td>{new Date(p.fecha_devolucion_esperada).toLocaleDateString()}</td>
                <td>
                  <span className={`badge badge-${p.estado === 'Activo' ? 'active' : p.estado === 'Devuelto' ? 'returned' : 'repair'}`}>
                     {p.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prestamos;
