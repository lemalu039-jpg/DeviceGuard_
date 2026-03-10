const express = require('express');
const router = express.Router();
const dispositivosController = require('../controllers/dispositivos.controller');

router.get('/', dispositivosController.getAllDispositivos);
router.get('/:id', dispositivosController.getDispositivoById);
router.post('/', dispositivosController.createDispositivo);
router.put('/:id', dispositivosController.updateDispositivo);
router.delete('/:id', dispositivosController.deleteDispositivo);

module.exports = router;
