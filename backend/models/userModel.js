// MODELS USER - userModel.js

// DEPENDENCIAS Y MÓDULOS
import mongoose from 'mongoose';

// VARIABLE DE SCHEMA MONGOOSE
const schema = mongoose.Schema;

// ESQUEMAS
// Estructura información del usuario en DB
const userSchema = new schema ({
    nombreUsuario : {
        type : String, 
        require : true
    },
    correo : {
        type : String, 
        require : true, 
        unique : true
    },
    contrasena : {
        type : String,
        require : true
    },
});

// CREACION MODELO
const userModel = mongoose.model('usuarios',userSchema);
export default userModel; //Exportar modelo