//JSONWEBTOKEN - jwt.js

// DEPENDENCIAS Y MÓDULOS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); //Config variables de entorno

// CONFIGURACION CLAVE
const secretKey = process.env.JWT_SECRET;

//FUNCIONES PARA GENERAR Y VERIFICAR JWT
export function generateToken(payload){
    //Configurar para que sea asincronica
    return new Promise ((resolve, reject)=>{
        //Se requiere payload, clave, tiempo exp. 
        jwt.sign(payload, secretKey, {expiresIn: '1h'}, (error, token)=>{
            //Control de errores
            if (error){
                reject(new Error ('Error al generar jwt' + error.message));
            } else{
                resolve(token);
            }
        });
    })
}
export function verifyToken(token){
    return new Promise ((resolve, reject)=>{
        jwt.verify(token, secretKey, (error, decoded)=>{
            //validar decodificación
            if (error){
                reject(new Error ('Error al decodificar jwt', error.message));
            } else{
                resolve(decoded);
            }
        });
    });
}
