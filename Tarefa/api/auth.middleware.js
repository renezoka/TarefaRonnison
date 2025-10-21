import jwt from 'jsonwebtoken';

export function authenticate (req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if(!token) return res.status(401).json({ error : "Token ausente." });

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = { id : payload.sub, role :  payload.role };
        return next();
    } catch (err) {
        return res.status(401).json( { error : "Token inválido ou expirado." } );
    }
}