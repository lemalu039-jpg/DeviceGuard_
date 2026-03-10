-- Script de creación de base de datos para DeviceGuard

-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS deviceguard_db;
USE deviceguard_db;

-- 2. Crear tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'docente', 'estudiante', 'soporte') DEFAULT 'docente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear tabla de Dispositivos (añadidas marca y modelo)
CREATE TABLE IF NOT EXISTS dispositivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    tipo VARCHAR(100) NOT NULL,
    serial VARCHAR(100) UNIQUE NOT NULL,
    estado ENUM('Activo', 'Prestado', 'En Reparación', 'Devuelto', 'Inactivo') DEFAULT 'Activo',
    ubicacion VARCHAR(150),
    imagen_url VARCHAR(255),
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear tabla de Préstamos
CREATE TABLE IF NOT EXISTS prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    dispositivo_id INT NOT NULL,
    fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion_esperada DATETIME,
    fecha_devolucion_real DATETIME,
    estado ENUM('Activo', 'Devuelto', 'Con Retraso') DEFAULT 'Activo',
    observaciones TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (dispositivo_id) REFERENCES dispositivos(id) ON DELETE CASCADE
);

-- 5. Crear tabla de Mantenimiento
CREATE TABLE IF NOT EXISTS mantenimiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dispositivo_id INT NOT NULL,
    descripcion_falla TEXT NOT NULL,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    estado ENUM('Pendiente', 'En Proceso', 'Finalizado') DEFAULT 'Pendiente',
    tecnico_asignado VARCHAR(150),
    costo DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (dispositivo_id) REFERENCES dispositivos(id) ON DELETE CASCADE
);

-- 6. Crear tabla de Historial de Movimientos
CREATE TABLE IF NOT EXISTS historial_movimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dispositivo_id INT NOT NULL,
    usuario_id INT,
    accion VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dispositivo_id) REFERENCES dispositivos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- DATOS DE PRUEBA (MOCK DATA)

-- Insertar usuarios de prueba
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol) VALUES 
('Juan', 'Montiel', 'juan.montiel@deviceguard.com', 'admin123', 'admin'),
('Maria', 'Lopez', 'maria.lopez@deviceguard.com', 'docente123', 'docente'),
('Carlos', 'Perez', 'carlos.perez@deviceguard.com', 'estudiante123', 'estudiante');

-- Insertar dispositivos de prueba
INSERT INTO dispositivos (nombre, marca, modelo, tipo, serial, estado, ubicacion, imagen_url) VALUES 
('MacBook Pro 16"', 'Apple', 'Pro 16 2021', 'Laptop', 'MBP3P-7R2K9Q14', 'Activo', 'Ambiente 4110', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200'),
('Dell XPS 13 9340', 'Dell', 'XPS 13', 'Laptop', 'XPS9340-AP41T6M2', 'Devuelto', 'Recepcion', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=200'),
('Lenovo ThinkPad X1', 'Lenovo', 'ThinkPad X1', 'Laptop', 'X1C11-9NQ7-2Z4F', 'Devuelto', 'Ambiente 7201', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=200'),
('HP EliteBook 840 G10', 'HP', 'EliteBook 840', 'Laptop', '840G10-PL93S0D7', 'Activo', 'Coordinación', 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=200'),
('Apple iPad Pro 2022', 'Apple', 'iPad Pro 11"', 'Tablet', 'IPP129-22-GH41ZB', 'Activo', 'Auditorio', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200'),
('Archer AX6000 (Router)', 'TP-Link', 'Archer AX6000', 'Redes', 'AX6000-Q3P1D7H9', 'Devuelto', 'Ambiente 4114', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200'),
('BenQ TK700STi Proyector', 'BenQ', 'TK700STi', 'Proyector', 'L3250-9A6F0Q', 'En Reparación', 'Oficina C-2', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200');

-- Insertar historial inicial simulado
INSERT INTO historial_movimientos (dispositivo_id, usuario_id, accion, descripcion) VALUES
(1, 1, 'Registro de Equipo', 'Equipo registrado por administrador en BD'),
(2, 2, 'Préstamo', 'Préstamo al docente para clases en Recepcion'),
(2, 2, 'Devolución', 'Equipo devuelto en buen estado'),
(7, 1, 'Mantenimiento', 'Enviado a soporte técnico por lámpara agotada');
