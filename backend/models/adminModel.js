// MODELS ADMIN - adminModel.js

// DEPENDENCIAS Y MÓDULOS
import mongoose from 'mongoose';
import userModel from './userModel.js';

// VARIABLE DE SCHEMA MONGOOSE
const schema = mongoose.Schema;

// ESQUEMAS
// Estructura admin en DB
const adminSchema = new schema ({
    categoriaAdmin: {
        type: Boolean,
        required: true,
        default: true 
    }
});

// CREACION MODELO
export const adminModel = userModel.discriminator('Admin', adminSchema); //discriminator para un modelo a partir de otro modelo
export default adminModel; //Exportar modelo
