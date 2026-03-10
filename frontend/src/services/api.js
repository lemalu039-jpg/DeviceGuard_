import axios from 'axios';
import dispositivosMock from '../data/dispositivos.json';
import prestamosMock from '../data/prestamos.json';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 3000 // Short timeout to failover to mocks quickly
});

const handleFailover = (error, mockData) => {
    console.warn('Backend connection failed, falling back to mock data.', error.message);
    return { data: mockData };
}

export const dispositivosService = {
    getAll: async (filters = {}) => {
        try { 
            const params = new URLSearchParams(filters).toString();
            return await api.get(`/dispositivos?${params}`); 
        } 
        catch (err) { 
            // Basic mock filtering 
            let data = [...dispositivosMock];
            if(filters.busqueda) data = data.filter(d => d.nombre.toLowerCase().includes(filters.busqueda.toLowerCase()) || d.serial.toLowerCase().includes(filters.busqueda.toLowerCase()));
            if(filters.estado) data = data.filter(d => d.estado === filters.estado);
            return handleFailover(err, data); 
        }
    },
    getById: async (id) => {
        try { return await api.get(`/dispositivos/${id}`); }
        catch (err) { return handleFailover(err, dispositivosMock.find(d => d.id == id)); }
    },
    create: async (data) => api.post('/dispositivos', data),
    update: async (id, data) => api.put(`/dispositivos/${id}`, data),
    delete: async (id) => api.delete(`/dispositivos/${id}`)
};

export const prestamosService = {
    getAll: async () => {
        try { return await api.get('/prestamos'); }
        catch (err) { return handleFailover(err, prestamosMock); }
    },
    create: async (data) => api.post('/prestamos', data),
    updateStatus: async (id, estado) => api.put(`/prestamos/${id}/estado`, { estado })
};

export const mantenimientoService = {
    getAll: async () => {
        try { return await api.get('/mantenimiento'); }
        catch (err) { return handleFailover(err, []); }
    },
    create: async (data) => api.post('/mantenimiento', data),
    updateStatus: async (id, data) => api.put(`/mantenimiento/${id}/estado`, data)
};

export const usuariosService = {
    getAll: async () => {
        try { return await api.get('/usuarios'); }
        catch (err) { return handleFailover(err, []); }
    },
    login: async (correo, contrasena) => {
        return await api.post('/usuarios/login', { correo, contrasena });
    }
};

export const historialService = {
    getAll: async () => {
        try { return await api.get('/historial'); }
        catch (err) { return handleFailover(err, []); }
    },
    getByDispositivo: async (id) => {
        try { return await api.get(`/historial/dispositivo/${id}`); }
        catch (err) { return handleFailover(err, []); }
    }
};

export default api;
