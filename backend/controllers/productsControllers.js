// CONTROLADOR PRODUCTOS - productsContollers.js

// DEPENDENCIAS Y MÓDULOS
import productModel from '../models/productsModel.js';

//Peticion GET
export const getProducts = async (req,res) =>{
    try{
        let products = await productModel.find();
        if(products.length == 0){
            return res.status(404).json({message: 'No se encontraron productos'});
        }
        return res.status(200).send(products);
    } catch (error){
        return res.status(500).json({message : 'Error de servidor' + error.message});
    }
}

//Petición POST
export const postProduct  = async (req,res) => {
    const {nombre, descripcion, tiempo, dificultad, calorias, precio} = req.body;
    if (!nombre || !descripcion || !tiempo || !dificultad || !calorias || !precio){
        return res.status(400).json({message : 'Debe ingresar todos los campos requeridos'});
    }
    try{
        const newProduct = await productModel.create(req.body);
        return res.status(201).json(newProduct);
    }catch(error){
        return res.status(500).json({message : 'Error de servidor' + error.message});
    }
}

//Petición DELETE 
export const deleteProductByID  = async (req,res) => {
    let idForDelete = req.params._id;
    let productDeleted = await productModel.findByIdAndDelete(idForDelete);
    if (!productDeleted){
        return res.status (404).json({message : 'No se encontro el producto para eliminar'});
    }
    return res.status(200).json({msg : 'Producto eliminado correctamente'});
}

//Petición PUT
export const putProductByID  = async (req,res) => {
    try {
        let idForUpdate = req.params._id;
        let productUpdated = await productModel.findByIdAndUpdate(idForUpdate, req.body);
        if (!productUpdated){
            return res.status (404).json({message : 'No se encontro el producto para modificar'});
        }
        return res.status(200).json({message : 'Producto actualizado correctamente'});
    }catch(error){
        return res.status(500).json({message : 'Error de servidor' + error.message});
    }
}