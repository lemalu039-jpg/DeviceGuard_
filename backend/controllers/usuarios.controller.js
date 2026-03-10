const UsuarioModel = require('../models/usuarios.model');

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
}

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await UsuarioModel.getById(req.params.id);
        if(!usuario) return res.status(404).json({ message: 'User not found' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
}

exports.createUsuario = async (req, res) => {
    try {
        const insertId = await UsuarioModel.create(req.body);
        res.status(201).json({ message: 'User created successfully', id: insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

exports.updateUsuario = async (req, res) => {
    try {
        const affected = await UsuarioModel.update(req.params.id, req.body);
        if(!affected) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

exports.deleteUsuario = async (req, res) => {
    try {
        const affected = await UsuarioModel.delete(req.params.id);
        if(!affected) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}

exports.loginUsuario = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const usuario = await UsuarioModel.authenticate(correo, contrasena);
        if(!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });
        res.json({ message: 'Login successful', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
}
