// RUTAS PRODUCTOS - productsRoutes.js

// DEPENDENCIAS Y MÓDULOS
import express from 'express';
import { getProducts , postProduct, deleteProductByID, putProductByID } from '../controllers/productsControllers.js';
import auth from '../middlewares/auth.js';

//ROUTER DE EXPRESS
const productsRouter = express.Router();

//Ruta para peticion GET 
productsRouter.get('/obtenerProductos', getProducts);

//Ruta para peticion POST
productsRouter.post('/registrarProducto',auth('admin'), postProduct);

//Ruta para peticion DELETE
productsRouter.delete('/eliminarProducto/:_id',auth('admin'), deleteProductByID);

//Ruta para peticion PUT
productsRouter.put('/actualizarProducto/:_id',auth('admin'), putProductByID);

export default productsRouter;