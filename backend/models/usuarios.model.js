const pool = require('../database/connection');

class UsuarioModel {
    static async getAll() {
        const [rows] = await pool.query('SELECT id, nombre, apellido, correo, rol, fecha_creacion FROM usuarios');
        return rows;
    }
    
    static async getById(id) {
        const [rows] = await pool.query('SELECT id, nombre, apellido, correo, rol, fecha_creacion FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }
    
    static async create(data) {
        const { nombre, apellido, correo, contrasena, rol } = data;
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, correo, contrasena, rol || 'docente']
        );
        return result.insertId;
    }
    
    static async update(id, data) {
        const { nombre, apellido, correo, rol } = data;
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, rol = ? WHERE id = ?',
            [nombre, apellido, correo, rol, id]
        );
        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async authenticate(correo, contrasena) {
        const [rows] = await pool.query(
            'SELECT id, nombre, apellido, correo, rol, fecha_creacion FROM usuarios WHERE correo = ? AND contrasena = ?',
            [correo, contrasena]
        );
        return rows[0];
    }
}

module.exports = UsuarioModel;
