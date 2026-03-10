const pool = require('../database/connection');
const HistorialModel = require('./historial.model');

class PrestamoModel {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT p.*, u.nombre as usuario_nombre, u.apellido as usuario_apellido, d.nombre as dispositivo_nombre
            FROM prestamos p
            JOIN usuarios u ON p.usuario_id = u.id
            JOIN dispositivos d ON p.dispositivo_id = d.id
        `);
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT p.*, u.nombre as usuario_nombre, u.apellido as usuario_apellido, d.nombre as dispositivo_nombre
            FROM prestamos p
            JOIN usuarios u ON p.usuario_id = u.id
            JOIN dispositivos d ON p.dispositivo_id = d.id
            WHERE p.id = ?
        `, [id]);
        return rows[0];
    }
    
    static async create(data) {
        const { usuario_id, dispositivo_id, fecha_devolucion_esperada, observaciones } = data;
        
        const [result] = await pool.query(
            'INSERT INTO prestamos (usuario_id, dispositivo_id, fecha_devolucion_esperada, estado, observaciones) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, dispositivo_id, fecha_devolucion_esperada || null, 'Activo', observaciones || '']
        );
        
        await pool.query('UPDATE dispositivos SET estado = ? WHERE id = ?', ['Prestado', dispositivo_id]);
        await HistorialModel.logAction(dispositivo_id, usuario_id, 'Préstamo', `Préstamo registrado. Obvs: ${observaciones || 'Ninguna'}`);
        return result.insertId;
    }
    
    static async updateStatus(id, estado) {
        const [prestamo] = await pool.query('SELECT dispositivo_id, usuario_id FROM prestamos WHERE id = ?', [id]);
        if(prestamo.length === 0) return 0;

        let query = 'UPDATE prestamos SET estado = ?';
        const params = [estado];
        
        if (estado === 'Devuelto') {
            query += ', fecha_devolucion_real = NOW()';
            await pool.query('UPDATE dispositivos SET estado = ? WHERE id = ?', ['Devuelto', prestamo[0].dispositivo_id]);
            await HistorialModel.logAction(prestamo[0].dispositivo_id, prestamo[0].usuario_id, 'Devolución', 'Equipo devuelto');
        } else {
            await HistorialModel.logAction(prestamo[0].dispositivo_id, prestamo[0].usuario_id, 'Actualización de Préstamo', `Estado cambiado a ${estado}`);
        }
        
        query += ' WHERE id = ?';
        params.push(id);
        
        const [result] = await pool.query(query, params);
        return result.affectedRows;
    }
}

module.exports = PrestamoModel;
