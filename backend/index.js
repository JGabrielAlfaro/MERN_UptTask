
import  express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import UsuarioRoutes from "./routes/usuarioRoutes.js";

const app = express(); // asignamos el dato de la funcion.
app.use(express.json()); //Procesa la información tipo JSON.
dotenv.config()
conectarDB();

//Routing
app.use('/api/usuarios',UsuarioRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

