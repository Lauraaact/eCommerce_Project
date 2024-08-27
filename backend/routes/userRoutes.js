// RUTAS USERS - userRoutes.js

// DEPENDENCIAS Y MÓDULOS
import { Router } from 'express';
import { getUserById, postUser, getUsers, putUserByID, deleteUserByID } from '../controllers/userControllers.js';
import auth from '../middlewares/auth.js';

//ROUTER DE EXPRESS
const userRouter = Router();

//Ruta para peticion GET 
userRouter.get('/:_id', auth(), getUserById); //Solo un usuario
userRouter.get('/', auth('admin'), getUsers); //Todos los usuarios

//Ruta para peticion POST
userRouter.post('/', postUser);

//Ruta para peticion DELETE
userRouter.delete('/:_id', auth(), deleteUserByID);

//Ruta para peticion PUT
userRouter.put('/:_id', auth(), putUserByID);

export default userRouter;