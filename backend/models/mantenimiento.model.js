const pool = require('../database/connection');
const HistorialModel = require('./historial.model');

class MantenimientoModel {
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT m.*, d.nombre as dispositivo_nombre, d.serial 
            FROM mantenimiento m
            JOIN dispositivos d ON m.dispositivo_id = d.id
        `);
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT m.*, d.nombre as dispositivo_nombre, d.serial 
            FROM mantenimiento m
            JOIN dispositivos d ON m.dispositivo_id = d.id
            WHERE m.id = ?
        `, [id]);
        return rows[0];
    }
    
    static async create(data) {
        const { dispositivo_id, descripcion_falla, tecnico_asignado, costo } = data;
        const [result] = await pool.query(
            'INSERT INTO mantenimiento (dispositivo_id, descripcion_falla, estado, tecnico_asignado, costo) VALUES (?, ?, ?, ?, ?)',
            [dispositivo_id, descripcion_falla, 'Pendiente', tecnico_asignado, costo || 0]
        );
        
        await pool.query('UPDATE dispositivos SET estado = ? WHERE id = ?', ['En Reparación', dispositivo_id]);
        await HistorialModel.logAction(dispositivo_id, null, 'Mantenimiento', `Enviado a mantenimiento: ${descripcion_falla}`);

        return result.insertId;
    }
    
    static async updateStatus(id, data) {
        const { estado, costo } = data;
        const [mant] = await pool.query('SELECT dispositivo_id FROM mantenimiento WHERE id = ?', [id]);
        if(mant.length === 0) return 0;

        let query = 'UPDATE mantenimiento SET estado = ?, costo = ?';
        const params = [estado, costo || 0];

        if (estado === 'Finalizado') {
            query += ', fecha_fin = NOW()';
            await pool.query('UPDATE dispositivos SET estado = ? WHERE id = ?', ['Activo', mant[0].dispositivo_id]);
            await HistorialModel.logAction(mant[0].dispositivo_id, null, 'Fin Mantenimiento', `Mantenimiento finalizado con éxito. Costo: ${costo || 0}`);
        } else {
            await HistorialModel.logAction(mant[0].dispositivo_id, null, 'Actualización Mantenimiento', `Estado mantenimiento: ${estado}`);
        }
        
        query += ' WHERE id = ?';
        params.push(id);
        
        const [result] = await pool.query(query, params);
        return result.affectedRows;
    }
}

module.exports = MantenimientoModel;
