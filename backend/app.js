// MAIN - app.js

// DEPENDENCIAS Y MÓDULOS
import express from 'express'; // Importar express
import dotenv from 'dotenv'; //Importar dotenv
import connectionMongo from './config/db.js'; // Importar módulo db

// SERVIDOR Y VARIABLES DE ENTORNO
const app = express(); // Usar express para configurar el servidor 
dotenv.config(); // Configuracion variables de entorno

const port = process.env.PORT; // Traer variable desde .env

//CONEXIÓN DB
connectionMongo();

// ENVIAR DATOS .json
app.use(express.json());

// USAR RUTAS
app.use ('/', productsRouter);

// EJECUTAR SERVIDOR
app.listen(port, ()=>{
    console.log (`El servidor se esta escuchando en : http://localhost:${port}`);
});

