// RUTAS LOGIN - loginRoutes.js

// DEPENDENCIAS Y MÓDULOS
import { Router } from 'express';
import loginService from '../services/loginService.js';

//ROUTER DE EXPRESS
const loginRouter = Router();

loginRouter.post('/',loginService);

export default loginRouter;