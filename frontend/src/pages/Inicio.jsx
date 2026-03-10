import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lock, Server, FileText, Menu, Instagram, Twitter, Youtube, Linkedin, X } from 'lucide-react';

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Menu size={24} color="#0f172a" style={{cursor: 'pointer'}} />
            <div className="landing-logo">
            <Lock size={32} />
            DeviceGuard
            </div>
        </div>
        
        <div className="landing-links">
          <Link to="/inicio" style={{ borderBottom: '2px dotted var(--accent-color)', color: 'var(--accent-color)' }}>Inicio</Link>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
          <Link to="/login" className="btn-landing-outline">Unete a nosotros</Link>
        </div>
      </nav>

      <div className="landing-container">
        {/* Hero Section */}
        <section className="landing-hero">
          <button className="hero-nav left"><ChevronLeft size={24} /></button>
          <button className="hero-nav right"><ChevronRight size={24} /></button>
          
          <h3>Somos</h3>
          <h1>La mejor empresa de seguridad que vas a encontrar</h1>
          <button className="btn-hero" onClick={() => navigate('/login')}>Escribenos</button>
        </section>

        {/* Info Rows */}
        <section id="nosotros" className="info-section">
          <div className="info-card">¿Quienes Somos?</div>
          <div className="info-text">
            <strong>DeviceGuard</strong> es una solución digital diseñada para mejorar el control,
            monitoreo y gestión de dispositivos tecnológicos en entornos educativos o
            Instituconales.<br/><br/>
            El sistema permite registrar y organizar el inventario de equipos como
            Computadores, tabletas y proyectores, facilitando su prestamo, devolucion,
            mantenimiento y seguimiento en tiempo
          </div>
        </section>

        <section className="info-section reverse">
          <div className="info-text">
            Entendemos que el control de Muchos recursos tecnologicos es una necesidad
            Real, y muchas veces no se tiene una solución práctica para manejarlo.<br/>
            Nuestro Propósito es ofrecer una plataforma clara, rapida y útil, que ayude a
            Mantener todo Organizado y Bajo Control, sin Necesidad de procesos complicados
            o Papeleo Extra
          </div>
          <div className="info-card dark">Nuestro Objetivo</div>
        </section>

        {/* Features Banner */}
        <div className="features-banner">
          ¿Que hace DeviceGuard?
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Lock size={40} />
            </div>
            <h3>Registro y Control<br/>de Equipos.</h3>
            <p>
              Permitimos registrar todos los equipos con sus datos: Tipo, Serial, Estado, Ubicacion, Accesorios.<br/>
              Ayuda a asignar y Devolver dispositivos facilmente, con historial automatico de quien lo usó y cuándo
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="feature-card">
                <div className="feature-icon-wrapper">
                <Server size={40} />
                </div>
                <h3>Monitoreo y<br/>Mantenimiento en Tiempo<br/>Real</h3>
                <p>
                Facilitamos la consulta en tiempo Real de la disponibilidad de cada equipo, permitiendo registrar Mantenimientos, observaciones y fallas con todo el historial guardado
                </p>
            </div>
            
            <div className="feature-card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}>
                <div className="feature-icon-wrapper" style={{ margin: '0', flexShrink: 0 }}>
                    <FileText size={40} />
                </div>
                <div>
                    <h3 style={{ marginBottom: '8px' }}>Reportes y Análisis de Datos</h3>
                    <p style={{ fontSize: '0.85rem' }}>Genera reportes claros para hacer seguimiento, exportarlos y tomar decisiones informadas</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contacto" className="landing-footer">
        <div>
           <div className="footer-logo">
             DeviceGuard<br/>
             <Lock size={24} color="var(--accent-color)" style={{marginTop: '10px'}} />
           </div>
           <div className="footer-socials">
             <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg></a>
             <a href="#"><Instagram size={20} /></a>
             <a href="#"><Youtube size={20} /></a>
             <a href="#"><Linkedin size={20} /></a>
           </div>
        </div>
        <div className="footer-links">
           <h4>Links</h4>
           <ul>
             <li><a href="#">Instagram</a></li>
             <li><a href="#">Twitter</a></li>
             <li><a href="#">Youtube</a></li>
           </ul>
        </div>
        <div className="footer-text">
           <h4>Resumen proyecto</h4>
           <p>
             Se necesita un sistema web con NFC para monitorear en tiempo real computadores
             y televisores del primer piso de la Nave 4.
           </p>
           <p>
             Debe mostrar estado, uso y ubicación, generar alertas y reportes, y funcionar desde
             celular.
           </p>
           <p>
             El contrato dura 6 meses e incluye desarrollo, pruebas, capacitación y soporte por 12 meses.
           </p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
