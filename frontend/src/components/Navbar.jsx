import { useState, useEffect } from 'react';
import { Search, Bell, Menu, ChevronDown, AlertTriangle, Calendar, Settings } from 'lucide-react';
import { prestamosService } from '../services/api';

const Navbar = () => {
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const prestamosRes = await prestamosService.getAll();
        
        // Simular alertas basadas en préstamos activos y devoluciones esperadas
        const retrasos = prestamosRes.data
            .filter(p => p.estado === 'Activo' && new Date(p.fecha_devolucion_esperada) < new Date())
            .map(p => ({
                id: p.id,
                tipo: 'retraso',
                titulo: 'Devolución Retrasada',
                desc: `${p.dispositivo_nombre} debido por ${p.usuario_nombre}`,
                icon: <AlertTriangle size={18} color="#dc3545" />
            }));
            
        // Simulando otras notificaciones estáticas para el UI
        const otrasAlertas = [
            { id: 'n1', tipo: 'info', titulo: 'Mantenimiento Programado', desc: 'Revisión de Proyectores D-15', icon: <Settings size={18} color="#3b82f6" /> },
            { id: 'n2', tipo: 'info', titulo: 'Actualización de Sistema', desc: 'Se actualizarán inventarios', icon: <Calendar size={18} color="#10b981" /> }
        ];

        setAlertas([...retrasos, ...otrasAlertas]);
      } catch (e) {
        console.error("Error al cargar alertas");
      }
    };
    fetchAlerts();
  }, []);

  return (
    <header style={{ 
        height: '70px', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <Menu size={24} />
        </button>
        <div style={{ 
            display: 'flex', alignItems: 'center', backgroundColor: '#f5f6fa', borderRadius: '24px', 
            padding: '8px 16px', width: '300px'
        }}>
          <Search size={18} color="#a0a0a0" />
          <input type="text" placeholder="Buscar" style={{ 
              border: 'none', backgroundColor: 'transparent', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '0.9rem' 
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ position: 'relative' }}>
            <div 
                style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}
                onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            >
              <Bell size={22} />
              {alertas.length > 0 && (
                  <span style={{ 
                      position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'var(--accent-color)', 
                      color: 'white', fontSize: '0.65rem', fontWeight: 'bold', width: '16px', height: '16px', 
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>{alertas.length}</span>
              )}
            </div>
            
            {showNotificationPopup && (
                <div style={{
                    position: 'absolute', top: '100%', right: '0', marginTop: '15px', width: '320px', 
                    backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                    zIndex: 50, border: '1px solid var(--border-color)', overflow: 'hidden'
                }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontWeight: '600', fontSize: '1rem' }}>
                        Notificaciones Activas
                    </div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                        {alertas.length > 0 ? alertas.map((alerta) => (
                            <li key={alerta.id} style={{ display: 'flex', gap: '12px', padding: '16px', borderBottom: '1px solid #f9fafb' }}>
                                <div style={{ 
                                    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f5f6fa', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    {alerta.icon}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '2px', color: '#1a1a1a' }}>{alerta.titulo}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{alerta.desc}</p>
                                </div>
                            </li>
                        )) : (
                            <li style={{ padding: '16px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No tienes notificaciones</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img src="https://flagcdn.com/w20/ve.png" alt="Español" style={{ width: '20px', borderRadius: '2px' }} />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Español</span>
          <ChevronDown size={14} color="var(--text-secondary)" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <img src="https://i.pravatar.cc/150?img=32" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>Juan Montiel</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin</span>
          </div>
          <ChevronDown size={14} color="var(--text-secondary)" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
