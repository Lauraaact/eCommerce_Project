// SERVICIO DE LOGIN - loginService.js

// DEPENDENCIAS Y MÓDULOS
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/jwt.js";

// FUNCION VALIDACION DE USER Y GENERACION TOKEN

const loginService = async(req, res) =>{
    try {
        //credenciales del formulario y se verifica en la bd
        const {email, password} =req.body;
        // buscar si existe el email
        const userFound = await userModel.findOne({
        correo : email
    })
    if (!userFound){
        return res.status(404).json({
            msg: 'Usuario no encontrado, por favor registrase'
        })
    }
    // comparar password con contraseña guardada
    const isValidPassword = await bcrypt.compare(password, userFound.contrasena);
    // validar si la contraseña es correcta
    if (!isValidPassword){
        return res.status(400).json({
            estado: '400',
            msg:'Error al iniciar sesión, contraseña incorrecta'
        })
    }
    // crear payload - Info para crear Token 
    const payload = {
        id: userFound._id,
        name : userFound.nombreUsuario,
    }
    if(userFound.categoriaAdmin){
        payload.isAdmin = true;
    }

    //GENERAR TOKEN 
    const token = await generateToken(payload);

    // Validacion inicio de sesion correcto
    return res.status(200).json({
        estado: '200',
        msg : 'Inicio de sesión exitoso',
        tokenGenerado : token,
        id: userFound._id,
    })
    } catch (error) {
        return res.status(400).json({
            estado: '400',
            msg : 'Error al intentar iniciar sesión',
            error: error.message || error
        })
    }
}

export default loginService;