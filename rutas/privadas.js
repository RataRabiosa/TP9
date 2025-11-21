import express from 'express';
import validateAuth from '../middelwares/autenticacion.js';

const router = express.Router();

router.get('/perfil', validateAuth, (req, res) => {
    try {
        return res.status(200).json({ mensaje: 'Bienvenido, ' + req.usuario });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

export default router;