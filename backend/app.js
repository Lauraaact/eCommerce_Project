// MAIN - app.js

// DEPENDENCIAS Y MÓDULOS
import express from 'express'; // Importar express
import dotenv from 'dotenv'; //Importar dotenv
import connectionMongo from './config/db.js'; // Importar módulo db
import cors from 'cors'; //middleware
//Importar rutas
import productsRouter from './routes/productsRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import loginRouter from './routes/loginRoutes.js';

// SERVIDOR Y VARIABLES DE ENTORNO
const app = express(); // Usar express para configurar el servidor 
dotenv.config(); // Configuracion variables de entorno

const port = process.env.PORT; // Traer variable desde .env

//CONEXIÓN DB
connectionMongo();

// ENVIAR DATOS .json
app.use(express.json());
// USAR MIDLEWARES
app.use(cors());

// USAR RUTAS
app.use ('/', productsRouter);
app.use ('/user', userRouter);
app.use ('/admin', adminRouter);
app.use ('/login',loginRouter);


// EJECUTAR SERVIDOR
app.listen(port, ()=>{
    console.log (`El servidor se esta escuchando en : http://localhost:${port}`);
});

