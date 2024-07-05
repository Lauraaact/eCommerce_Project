// DATABASE - db.js

// DEPENDENCIAS Y MÓDULOS
import mongoose from 'mongoose';

// CONEXIÓN BASE DE DATOS
const connectionMongo = async ()=>{
    //Traer link variable de entorno
    await mongoose.connect(process.env.CONEXION_DB,{}) 
    //Control de errores
    try {
        console.log('Conexión exitosa DB');
    } catch (error) {
        console.error('Error de conexión :',error.message);
    }
} 

export default connectionMongo; // Exportar módulo