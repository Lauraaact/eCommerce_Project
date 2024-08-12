// CONTROLADOR USUARIOS - userContollers.js
// Crear, actualizar y eliminar usuarios

// DEPENDENCIAS Y MÓDULOS
import adminModel from "../models/adminModel.js";
import bcypt from 'bcryptjs';

// Crear y eliminar administradores

//Petición POST - Crea administradores
export const postAdmin  = async (req,res) => { //asyncronica porque debe esperar bd
    try{
        //desestructurar el body
        const {nombreUsuario, correo, contrasena } = req.body;
        //encriptar contraseña
        //salt rounds -> define nivel de dificultad - #10 (buena seguridad)
        const codedPassword = await bcypt.hash(contrasena, 10);
        //Crea admin con contraseña encryptada
        const newAdmin = await adminModel.create({
            nombreUsuario,
            correo,
            contrasena: codedPassword,
            categoriaAdmin: true
        });
        return res.status(201).json({
            estado : '201',
            msg : 'Administrador creado correctamente',
            datos : newAdmin
        });
    }catch(error){
        return res.status(400).json({
            estado : '400',
            msg : 'Ocurrio un problema al crear un administrador',
            datos : error
        });
    }
}

//Peticion GET - Muestra todos los administradores
export const getAdmin = async (req,res) =>{
    try{
        let admins = await adminModel.find();
        if (admins.length == 0){
            return res.status(404).json({
                estado : '404',
                msg: 'No se encontró al administrador',
                datos : null
            });
        }
        return res.status(200).send({
            estado : '200',
            administradores : admins
        });
    } catch (error){
        return res.status(400).json({
            estado : '400',
            msg : 'Ocurrio un problema al mostrar el admnistrador',
            datos : error
        });
    }
}

//Petición DELETE - Eliminar administrador
export const deleteAdminByID  = async (req,res) => {
    let idForDelete = req.params._id;
    let adminDeleted = await adminModel.findByIdAndDelete(idForDelete);
    if (!adminDeleted){
        return res.status (404).json({
            estado : '404',
            msg : 'No se encontro el administrador para eliminar',
            datos : null
        });
    }
    return res.status(200).json({
        estado : '200',
        msg : 'Administrador eliminado correctamente'
    });
}