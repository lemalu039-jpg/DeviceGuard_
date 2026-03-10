const PrestamoModel = require('../models/prestamos.model');

exports.getAllPrestamos = async (req, res) => {
    try {
        const prestamos = await PrestamoModel.getAll();
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving loans', error: error.message });
    }
}

exports.getPrestamoById = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.getById(req.params.id);
        if(!prestamo) return res.status(404).json({ message: 'Loan not found' });
        res.json(prestamo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving loan', error: error.message });
    }
}

exports.createPrestamo = async (req, res) => {
    try {
        const insertId = await PrestamoModel.create(req.body);
        res.status(201).json({ message: 'Loan created successfully', id: insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating loan', error: error.message });
    }
}

exports.updatePrestamoStatus = async (req, res) => {
    try {
        const { estado } = req.body;
        const affected = await PrestamoModel.updateStatus(req.params.id, estado);
        if(!affected) return res.status(404).json({ message: 'Loan not found' });
        res.json({ message: 'Loan status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating loan status', error: error.message });
    }
}
