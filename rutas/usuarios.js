import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Array simulando base de datos
const users = [];

const router = express.Router();

const userHandling = {

    register: async (usuario, clave, correo) => {

        // verificar si el usuario o correo ya existen
        if (users.find(u => u.usuario === usuario) || users.find(u => u.correo === correo)) {
            throw new Error('Usuario y/o correo ya existen en la base de datos');
        }

        // hashear la clave y guardar el usuario
        const hashedPassword = await bcrypt.hash(clave, 10);
        const newUser = { usuario, clave: hashedPassword, correo };
        users.push(newUser);
        console.log(users);
        return newUser;
    },

    login: async (usuario, clave) => {
        // buscar el usuario en la "base de datos"
        const user = users.find(u => u.usuario === usuario);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // comparar la clave proporcionada con la almacenada
        const match = await bcrypt.compare(clave, user.clave);
        if (!match) {
            throw new Error('Clave incorrecta');
        }

        // generar un token JWT
        const token = jwt.sign(
            { usuario: user.usuario, correo: user.correo },
            process.env.JWT_SECRET,
            { expiresIn: parseInt(process.env.JWT_LIFETIME) }
        );

        return token;
    }
};

router.post('/registro', async (req, res) => {
    try {
        // verificar que los parametros existen
        const { usuario, clave, correo } = req.body;
        if (!usuario || !clave || !correo) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        }

        // enviar datos a la funcion registro
        const registro = await userHandling.register(usuario, clave, correo);
        return res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

    } catch (error) {

        // notificar al usuario si hay algun error
        console.error(error);
        return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
});

router.post('/acceso', async (req, res) => {
    try {
        // verificar que los parametros existen
        const { usuario, clave } = req.body;
        if (!usuario || !clave) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        }

        // enviar datos a la funcion acceso
        const login = await userHandling.login(usuario, clave);

        if (!login){
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
        return res.status(200).json(login);

    } catch (error) {
        // notificar al usuario si hay algun error
        console.error(error);
        return res.status(500).json({ mensaje: error.message || 'Error interno del servidor' });
    }
});



export default router;