const express = require('express');
const router = express.Router();
const prestamosController = require('../controllers/prestamos.controller');

router.get('/', prestamosController.getAllPrestamos);
router.get('/:id', prestamosController.getPrestamoById);
router.post('/', prestamosController.createPrestamo);
router.put('/:id/estado', prestamosController.updatePrestamoStatus);

module.exports = router;
