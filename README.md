# DeviceGuard - Institución Educativa

DeviceGuard es una solución digital completa para el control y mantenimiento de dispositivos electrónicos (computadores, tabletas, proyectores, etc.) en entornos educativos, como SENA. El sistema cuenta con frontend moderno en React y backend en Node.js, y una base de datos MySQL relacional.

## Requisitos previos
- Node.js (v18+)
- MySQL Base de datos
- npm o pnpm

## Arquitectura del Proyecto
- **Frontend**: Vite + React, diseño responsivo, uso de custom CSS inspirado en UX/UI moderna.
- **Backend**: Node.js + Express, APIs RESTful, mysql2 Connection Pool.
- **Base de Datos**: Script de generación incluido para MySQL, 4 tablas principales.

## 1. Configuración de Base de Datos
1. Abre tu gestor de base de datos MySQL favorito (Workbench, phpMyAdmin, DBeaver).
2. Ejecuta el script `database.sql` incluido en la raíz del proyecto. Este script creará la base de datos `deviceguard_db`, las tablas pertinentes y poblará las tablas con datos dummy iniciales.

## 2. Iniciar el Backend
1. Abre una terminal y navega a la carpeta backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. (Opcional) Puedes crear un archivo `.env` configurando la base de datos si difiere de los valores por defecto (localhost/root):
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tus_password
   DB_NAME=deviceguard_db
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   node server.js
   ```

## 3. Iniciar el Frontend
1. Abre otra terminal y navega a la carpeta frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación React:
   ```bash
   npm run dev
   ```
4. Visita la URL proporcionada por Vite (generalmente `http://localhost:5173`).

### Notas Adicionales
- La conexión entre frontend y backend se implementó nativamente apuntando a `localhost:3000/api`.
- Si el backend Node.js falla o no está conectado, el frontend React entrará en un modo _Mock Data Fallback_ automático y usará los JSON locales provistos en `/src/data/` para mostrar la funcionalidad sin requerir el backend o bases de datos corriendo localmente.
