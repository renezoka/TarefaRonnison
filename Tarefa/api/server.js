import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth.routes.js';
import { authenticate } from './auth.middleware.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/profile", authenticate, (req,res) => {
    res.json( { message : "Perfil do Motorista", user : req.user } );
})

app.listen(process.env.PORT, ()=> {
    console.log(`executando na porta ${process.env.PORT}`);
})