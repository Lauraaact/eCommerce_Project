//MIDDLEWARES - intermediarios entre peticion del cliente y controladores que obtienen la respuesta del servidor

// DEPENDENCIAS Y MÓDULOS
import { verifyToken } from "../lib/jwt.js";

//OPCION DIF. ROLES
const auth = (requiredRole)=>{
    return async(req, res, next) =>{
        //Validación token
        let token = req.headers['authorization'];
        if (!token){
            return res.status('401').json({
                msg: 'No se encontro Token'
            });
        }

        token = token.split(" ")[1];
        //return res.json({token: token})
        if (!token){
            return res.status(400).json({
                msg : 'Token no autorizado'
            });
        }
        //Verificacion token
        try {
            const decoded = await verifyToken(token);
            console.log('Token decodificado: ' , decoded);

            //Validacion rol 
            if (requiredRole== 'admin'&& !decoded.isAdmin){
                return res.status(403).json({
                    msg: 'Acceso denegado, no tiene permisos de administrador'
                })
            }
            req.user = decoded;
            
        } catch (error) {
            return res.status(401).json({
                status: '401',
                msg : 'Fallo autenticación - token invalido',
                error: error.message ||error
            })
            
        }

        //Siguiente intermediario controlador
        next();
    }
}
export default auth;