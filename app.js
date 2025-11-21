import express from 'express';
import dotenv from 'dotenv';
import users from './rutas/usuarios.js';
import perfil from './rutas/privadas.js';

// Obtener variables de entorno
dotenv.config();

// Configurar el puerto predeterminado
const defaultPort = process.env.HTTP_PORT || 3000;

// Crear la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());


app.use('/api/privado', perfil);
app.use('/api/usuarios', users);

// Iniciar el servidor
app.listen(defaultPort, () => {
  console.log(`Servidor escuchando en el puerto ${defaultPort}`);
});