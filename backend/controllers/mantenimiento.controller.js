const MantenimientoModel = require('../models/mantenimiento.model');

exports.getAllMantenimientos = async (req, res) => {
    try {
        const mantenimientos = await MantenimientoModel.getAll();
        res.json(mantenimientos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving maintenance records', error: error.message });
    }
}

exports.getMantenimientoById = async (req, res) => {
    try {
        const mantenimiento = await MantenimientoModel.getById(req.params.id);
        if(!mantenimiento) return res.status(404).json({ message: 'Maintenance record not found' });
        res.json(mantenimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving maintenance record', error: error.message });
    }
}

exports.createMantenimiento = async (req, res) => {
    try {
        const insertId = await MantenimientoModel.create(req.body);
        res.status(201).json({ message: 'Maintenance created successfully', id: insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating maintenance', error: error.message });
    }
}

exports.updateMantenimientoStatus = async (req, res) => {
    try {
        const affected = await MantenimientoModel.updateStatus(req.params.id, req.body);
        if(!affected) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Maintenance status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error: error.message });
    }
}
