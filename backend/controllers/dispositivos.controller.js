const DispositivoModel = require('../models/dispositivos.model');

exports.getAllDispositivos = async (req, res) => {
    try {
        const dispositivos = await DispositivoModel.getAll(req.query);
        res.json(dispositivos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving devices', error: error.message });
    }
}

exports.getDispositivoById = async (req, res) => {
    try {
        const dispositivo = await DispositivoModel.getById(req.params.id);
        if(!dispositivo) return res.status(404).json({ message: 'Device not found' });
        res.json(dispositivo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving device', error: error.message });
    }
}

exports.createDispositivo = async (req, res) => {
    try {
        const insertId = await DispositivoModel.create(req.body);
        res.status(201).json({ message: 'Device created successfully', id: insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating device', error: error.message });
    }
}

exports.updateDispositivo = async (req, res) => {
    try {
        const affected = await DispositivoModel.update(req.params.id, req.body);
        if(!affected) return res.status(404).json({ message: 'Device not found' });
        res.json({ message: 'Device updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating device', error: error.message });
    }
}

exports.deleteDispositivo = async (req, res) => {
    try {
        const affected = await DispositivoModel.delete(req.params.id);
        if(!affected) return res.status(404).json({ message: 'Device not found' });
        res.json({ message: 'Device deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting device', error: error.message });
    }
}
