const HistorialModel = require('../models/historial.model');

exports.getHistorialAll = async (req, res) => {
    try {
        const historial = await HistorialModel.getAll();
        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving global history', error: error.message });
    }
}

exports.getHistorialByDispositivo = async (req, res) => {
    try {
        const historial = await HistorialModel.getByDispositivoId(req.params.dispositivoId);
        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving device history', error: error.message });
    }
}
