// MODELS PRODUCTOS - productsModel.js

// DEPENDENCIAS Y MÓDULOS
import mongoose from 'mongoose';

// VARIABLE DE SCHEMA MONGOOSE
const schema = mongoose.Schema;

// ESQUEMAS
// Estructura información del producto en DB
const productSchema = new schema ({
    nombre : {
        type : String, 
        required : true
    },
    imagen : {
        type : String, 
        required : true
    },
    descripcion : {
        type : String,
        required : true
    },
    tiempo : {
        type : String,
        required : true
    },
    dificultad : {
        type : String,
        required : true
    },
    precio : {
        type : Number,
        required : true
    },
    alergenos : {
        type : String,
        required : true
    },
    ingredientes : {
        type : Array,
        required : true
    }
});

// CREACION MODELO
const productModel = mongoose.model('productos',productSchema);
export default productModel; //Exportar modelo