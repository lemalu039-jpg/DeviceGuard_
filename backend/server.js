require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const usuariosRoutes = require('./routes/usuarios.routes');
const dispositivosRoutes = require('./routes/dispositivos.routes');
const prestamosRoutes = require('./routes/prestamos.routes');
const mantenimientoRoutes = require('./routes/mantenimiento.routes');
const historialRoutes = require('./routes/historial.routes');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/dispositivos', dispositivosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/mantenimiento', mantenimientoRoutes);
app.use('/api/historial', historialRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de DeviceGuard' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
