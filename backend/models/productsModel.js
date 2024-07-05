// MODELS PRODUCTOS - productsModel.js

// DEPENDENCIAS Y MÓDULOS
import mongoose from 'mongoose';

// VARIABLE DE SCHEMA MONGOOSE
const schema = mongoose.Schema;

// ESQUEMAS
// Estructura información del producto en DB
const productShema = new schema ({
    nombre : {
        type : String, 
        require : true
    },
    descripcion : {
        type : String,
        require : true
    },
    tiempo : {
        type : String,
        require : true
    },
    dificultad : {
        type : String,
        require : true
    },
    calorias : {
        type : String,
        require : true
    },
    precio : {
        type : Number,
        require : true
    }
});

// CREACION MODELO
const productModel = mongoose.model('productos',productShema);
export default productModel; //Exportar modelo