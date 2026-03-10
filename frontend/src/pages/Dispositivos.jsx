import { useState, useEffect } from 'react';
import { dispositivosService, historialService } from '../services/api';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const Dispositivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [filtros, setFiltros] = useState({ busqueda: '', estado: '', tipo: '' });
  const [modalHistorial, setModalHistorial] = useState({ open: false, data: [], deviceName: '' });
  const [favoritos, setFavoritos] = useState([]);
  
  const fetchDispositivos = async () => {
    try {
      const activeFilters = Object.fromEntries(Object.entries(filtros).filter(([_, v]) => v !== ''));
      const res = await dispositivosService.getAll(activeFilters);
      setDispositivos(res.data);
    } catch (err) {
      console.error("Error al cargar dispositivos", err);
    }
  };

  useEffect(() => {
    fetchDispositivos();
  }, [filtros]);

  const handleFilterChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const verHistorial = async (dispositivo) => {
    try {
      const res = await historialService.getByDispositivo(dispositivo.id);
      setModalHistorial({ open: true, data: res.data, deviceName: dispositivo.nombre });
    } catch (err) {
      console.error("Error cargando historial", err);
    }
  };

  const toggleFavorito = (id) => {
     if(favoritos.includes(id)) {
        setFavoritos(favoritos.filter(fid => fid !== id));
     } else {
        setFavoritos([...favoritos, id]);
     }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' }}>Dispositivos</h1>
      </div>

      <div className="devices-banner">
         <h1>Registra Nuevos Dispositivos</h1>
         <p>Registra y Guarda Nuevos Dispositivos</p>
         <button className="btn-banner">Registrar Dispositivo</button>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <input 
            type="text" 
            name="busqueda"
            placeholder="Buscar por nombre, serial o marca..." 
            value={filtros.busqueda}
            onChange={handleFilterChange}
            style={{ flex: 1, minWidth: '250px', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
        />
        <select name="estado" value={filtros.estado} onChange={handleFilterChange} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'white' }}>
            <option value="">Todos los Estados</option>
            <option value="Activo">Activo</option>
            <option value="Devuelto">Devuelto</option>
            <option value="Prestado">Prestado</option>
            <option value="En Reparación">En Reparación</option>
            <option value="Inactivo">Inactivo</option>
        </select>
        <select name="tipo" value={filtros.tipo} onChange={handleFilterChange} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'white' }}>
            <option value="">Todos los Tipos</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
            <option value="Proyector">Proyector</option>
            <option value="Redes">Redes</option>
        </select>
      </div>

      <div className="devices-grid">
        {dispositivos.map(d => (
          <div key={d.id} className="device-card">
              <div className="device-card-img-wrapper">
                 <button className="device-nav-arrow left"><ChevronLeft size={18} /></button>
                 <img src={d.imagen_url} alt={d.nombre} />
                 <button className="device-nav-arrow right"><ChevronRight size={18} /></button>
              </div>

              <div className="device-card-content">
                  <div className="device-badge-floating">
                    <span className={`badge badge-${d.estado === 'Activo' ? 'active' : d.estado === 'Devuelto' ? 'returned' : 'repair'}`}>
                        {d.estado}
                    </span>
                  </div>
                  
                  <div className="device-header">
                     <h3 className="device-title">{d.nombre}</h3>
                     <div className={`heart-icon ${favoritos.includes(d.id) ? 'active' : ''}`} onClick={() => toggleFavorito(d.id)}>
                        <Heart size={18} fill={favoritos.includes(d.id) ? "currentColor" : "none"} />
                     </div>
                  </div>

                  <div className="device-ids">
                     <span className="device-serial">{d.serial}</span>
                     <span className="device-location">{d.ubicacion}</span>
                  </div>

                  <div className="device-dates">
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>25 - SEP - 2025</span>
                        <span style={{ color: '#1a1a1a' }}>6:29</span>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>26 - SEP - 2025</span>
                        <span style={{ color: '#1a1a1a' }}>7:46</span>
                     </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <button className="btn-edit" onClick={() => alert(`Editando ${d.nombre}`)}>Editar Producto</button>
                    <button className="btn-edit" onClick={() => verHistorial(d)} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}>Historial</button>
                  </div>
              </div>
          </div>
        ))}
        {dispositivos.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '16px', color: '#64748b' }}>
               No hay dispositivos registrados bajo estos filtros
            </div>
        )}
      </div>

      {modalHistorial.open && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 20px' }}>
                  <h2 style={{ fontSize: '1.4rem' }}>Historial: {modalHistorial.deviceName}</h2>
                  <button onClick={() => setModalHistorial({ open: false, data: [] })} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
               </div>
               
               {modalHistorial.data.length > 0 ? (
                   <ul style={{ listStyle: 'none', padding: 0 }}>
                      {modalHistorial.data.map(h => (
                          <li key={h.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <strong style={{ color: 'var(--accent-color)' }}>{h.accion}</strong>
                                <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(h.fecha).toLocaleString()}</span>
                             </div>
                             <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{h.descripcion}</p>
                             {h.usuario_nombre && (
                                 <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    Responsable: {h.usuario_nombre} {h.usuario_apellido}
                                 </span>
                             )}
                          </li>
                      ))}
                   </ul>
               ) : (
                   <p style={{ color: '#888' }}>No hay registros en el historial de este dispositivo.</p>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

export default Dispositivos;
