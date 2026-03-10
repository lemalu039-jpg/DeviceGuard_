const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimiento.controller');

router.get('/', mantenimientoController.getAllMantenimientos);
router.get('/:id', mantenimientoController.getMantenimientoById);
router.post('/', mantenimientoController.createMantenimiento);
router.put('/:id/estado', mantenimientoController.updateMantenimientoStatus);

module.exports = router;
