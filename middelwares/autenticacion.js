import jwt from 'jsonwebtoken';

const validateAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ mensaje: 'Usuario no autenticado, por favor inicie sesion primero.' });
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1]; // Extraer token de "Bearer <token>"
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token no valido' });
        }
        req.usuario = user.usuario;
        next();
    });
}
export default validateAuth;