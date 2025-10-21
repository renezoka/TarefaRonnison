import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const users = [];
const refreshStore = new Map();

function signAccessToken(user) {
    return jwt.sign(
        { role : user.role || "user" },
        process.env.JWT_ACCESS_SECRET,
        {expiresIn : process.env.JWT_ACCESS_EXPIRES, subject : String(user.id)}
    );
}

function signRefreshToken(user) {
    const token = jwt.sign(
        { type : "refresh" },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn : process.env.JWT_REFRESH_EXPIRES, subject : String(user.id) }
    );
    refreshStore.set(user.id, token);
    return token;
}

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body || {};
    if(!name || !email || !password) {
        return res.status(400).json({ error : "name, email e password, são obrigatórios" });
    }
    const exists = users.find(u => u.email === email);
    if(exists) return res.status(409).json({ error : "email já cadastrado." });
    const hash = await bcrypt.hash(password, 10);
    const user = { id : users.length+1, name, email, password : hash, role : "user" };
    users.push(user);

    const acessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    res.status(201).json({ user: { id: user.id, name : name, email : email }, acessToken, refreshToken });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    const user = users.find(u => u.email === email);
    if(!user) return res.status(401).json({ error: "Crendenciais  invalidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error : "Crendenciais  invalidas" });

    const acessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    res.json({ user : { id : user.id, name : user.name, email }, acessToken, refreshToken });
})

export default router;