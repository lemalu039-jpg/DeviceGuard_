const pool = require('../database/connection');

class HistorialModel {
    static async getByDispositivoId(dispositivoId) {
        const [rows] = await pool.query(`
            SELECT h.*, u.nombre as usuario_nombre, u.apellido as usuario_apellido 
            FROM historial_movimientos h
            LEFT JOIN usuarios u ON h.usuario_id = u.id
            WHERE h.dispositivo_id = ?
            ORDER BY h.fecha DESC
        `, [dispositivoId]);
        return rows;
    }

    static async getAll() {
        const [rows] = await pool.query(`
            SELECT h.*, d.nombre as dispositivo_nombre, d.serial, u.nombre as usuario_nombre, u.apellido as usuario_apellido 
            FROM historial_movimientos h
            JOIN dispositivos d ON h.dispositivo_id = d.id
            LEFT JOIN usuarios u ON h.usuario_id = u.id
            ORDER BY h.fecha DESC
        `);
        return rows;
    }

    static async logAction(dispositivo_id, usuario_id, accion, descripcion) {
        const [result] = await pool.query(
            'INSERT INTO historial_movimientos (dispositivo_id, usuario_id, accion, descripcion) VALUES (?, ?, ?, ?)',
            [dispositivo_id, usuario_id || null, accion, descripcion]
        );
        return result.insertId;
    }
}

module.exports = HistorialModel;
