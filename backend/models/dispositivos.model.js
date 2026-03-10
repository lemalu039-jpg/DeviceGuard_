const pool = require('../database/connection');
const HistorialModel = require('./historial.model');

class DispositivoModel {
    static async getAll(filtros = {}) {
        let query = 'SELECT * FROM dispositivos';
        const params = [];
        const wheres = [];

        if (filtros.busqueda) {
            wheres.push('(nombre LIKE ? OR serial LIKE ? OR marca LIKE ?)');
            params.push(`%${filtros.busqueda}%`, `%${filtros.busqueda}%`, `%${filtros.busqueda}%`);
        }
        if (filtros.estado) {
            wheres.push('estado = ?');
            params.push(filtros.estado);
        }
        if (filtros.tipo) {
            wheres.push('tipo = ?');
            params.push(filtros.tipo);
        }
        if (filtros.ubicacion) {
            wheres.push('ubicacion LIKE ?');
            params.push(`%${filtros.ubicacion}%`);
        }

        if (wheres.length > 0) {
            query += ' WHERE ' + wheres.join(' AND ');
        }

        const [rows] = await pool.query(query, params);
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM dispositivos WHERE id = ?', [id]);
        return rows[0];
    }
    
    static async create(data) {
        const { nombre, marca, modelo, tipo, serial, estado, ubicacion, imagen_url } = data;
        const [result] = await pool.query(
            'INSERT INTO dispositivos (nombre, marca, modelo, tipo, serial, estado, ubicacion, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, marca, modelo, tipo, serial, estado || 'Activo', ubicacion, imagen_url]
        );
        
        await HistorialModel.logAction(result.insertId, null, 'Registro de Equipo', 'Equipo registrado en el sistema');
        return result.insertId;
    }
    
    static async update(id, data) {
        const { nombre, marca, modelo, tipo, serial, estado, ubicacion, imagen_url } = data;
        const [result] = await pool.query(
            'UPDATE dispositivos SET nombre=?, marca=?, modelo=?, tipo=?, serial=?, estado=?, ubicacion=?, imagen_url=? WHERE id=?',
            [nombre, marca, modelo, tipo, serial, estado, ubicacion, imagen_url, id]
        );
        
        await HistorialModel.logAction(id, null, 'Actualización', 'Datos del equipo actualizados');
        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM dispositivos WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = DispositivoModel;
