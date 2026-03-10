import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosService } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if(email && password) {
      try {
         const res = await usuariosService.login(email, password);
         if(res.data) {
             navigate('/dashboard');
         }
      } catch (error) {
         setErrorMsg('Correo o contraseña incorrectos');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1b1b2f', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
          backgroundColor: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '480px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)', textAlign: 'center'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#fff0f5', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>Registrar usuario autorizado</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>Por Favor Ingresa Tu Usuario y tu Contraseña</p>
        
        {errorMsg && (
            <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                {errorMsg}
            </div>
        )}

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px' }}>Correo Electronico:</label>
            <input 
                type="email" 
                placeholder="nombre.apellido@deviceguard.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#f9fafb', fontSize: '0.95rem', outline: 'none' }}
                required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px' }}>Contraseña:</label>
            <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#e5e7eb', fontSize: '0.95rem', outline: 'none' }}
                required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="checkbox" /> Recuerdame
            </label>
            <a href="#" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Olvidaste la Contraseña?</a>
          </div>
          <button type="submit" style={{ 
              width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: '#2e3362', 
              color: 'white', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer' 
          }}>
            Inicia sesion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
