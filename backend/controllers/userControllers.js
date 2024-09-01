// CONTROLADOR USUARIOS - userContollers.js
// Crear, actualizar y eliminar usuarios

// DEPENDENCIAS Y MÓDULOS
import userModel from "../models/userModel.js";
import bcypt from 'bcryptjs';


//Petición POST - Crea usuarios
export const postUser  = async (req,res) => { //asyncronica porque debe esperar bd
    try{
        //desestructurar el body
        const {nombreUsuario, correo, contrasena } = req.body;
        //encriptar contraseña
        //salt rounds -> define nivel de dificultad - #10 (buena seguridad)
        const codedPasswordUser = await bcypt.hash(contrasena, 10);
        //Crea admin con contraseña encryptada
        const newUser = await userModel.create({
            nombreUsuario,
            correo,
            contrasena: codedPasswordUser
        });
        return res.status(201).json({
            estado : '201',
            msg : 'usuario creado correctamente',
            datos : newUser
        });
    }catch(error){
        if (error.code === 11000) { // Código de error de duplicado en MongoDB
            return res.status(400).json({
                estado: '400',
                msg: 'El correo ya se encuentra registrado',
                datos: error
            });
        } else {
            return res.status(400).json({
                estado: '400',
                msg: 'Ocurrió un problema al crear el usuario',
                datos: error
            });
        }
    }
}

//Peticion GET - Muestra usuarios
export const getUsers = async (req,res) =>{
    try{
        let users = await userModel.find();
        if (users.length == 0){
            return res.status(404).json({
                estado : '404',
                msg: 'No se encontraron usuarios',
                datos : null
            });
        }
        return res.status(200).send(users);
    } catch (error){
        return res.status(400).json({
            estado : '400',
            msg : 'Ocurrio un problema al mostrar los usuarios',
            datos : error
        });
    }
}

//Peticion GET - Muestra un solo usuario
export const getUserById = async (req,res) =>{
    try {
        let getUserById = req.params._id;
        let userById = await userModel.findById(getUserById, req.body);
        if (!userById){
            return res.status (404).json({
                estado : '404',
                msg : 'No se encontro el usuario', 
                datos : null
            });
        }
        return res.status(200).json({
            estado : '200',
            user : userById,
        });
    }catch(error){
        return res.status(400).json({
            estado : '400',
            msg : 'Ocurrio un problema al mostrar el usuario',
            datos : error
        });
    }
}

//Petición PUT - Actualizar usuario
export const putUserByID  = async (req,res) => {
    try {
        let idForUpdate = req.params._id;
        let userUpdated = await userModel.findByIdAndUpdate(idForUpdate, req.body);
        if (!userUpdated){
            return res.status (404).json({
                estado : '404',
                msg : 'No se encontro el usuario para modificar',
                datos : null
            });
        }
        return res.status(200).json({
            estado : '200',
            msg : 'Usuario actualizado correctamente',
            user : userUpdated
        });
    }catch(error){
        return res.status(400).json({
            estado : '400',
            msg : 'Ocurrio un problema al crear un usuario',
            datos : error
        });
    }
}

//Petición DELETE - Eliminar usuario
export const deleteUserByID  = async (req,res) => {
    let idForDelete = req.params._id;
    let userDeleted = await userModel.findByIdAndDelete(idForDelete);
    if (!userDeleted){
        return res.status (404).json({
            estado : '404',
            msg : 'No se encontro el usuario para eliminar',
            datos : null
        });
    }
    return res.status(200).json({
        estado : '200',
        msg : 'Usuario eliminado correctamente'
    });
}