// RUTAS ADMIN - adminRoutes.js

// DEPENDENCIAS Y MÓDULOS
import { Router } from 'express';
import { postAdmin, getAdmin, deleteAdminByID } from '../controllers/adminControllers.js';
import auth from '../middlewares/auth.js';

//ROUTER DE EXPRESS
const adminRouter = Router();

adminRouter.get('/', auth('admin'), getAdmin);
adminRouter.post('/', auth('admin'), postAdmin);
adminRouter.delete('/:_id',auth('admin'),deleteAdminByID);

export default adminRouter;
