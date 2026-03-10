const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historial.controller');

router.get('/', historialController.getHistorialAll);
router.get('/dispositivo/:dispositivoId', historialController.getHistorialByDispositivo);

module.exports = router;
