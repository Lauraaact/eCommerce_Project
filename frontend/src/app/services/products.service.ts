import { Injectable, inject } from '@angular/core';
//Peticiones a back o API
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  httpClient = inject(HttpClient);

  API_URL_GET = 'http://localhost:3000/obtenerProductos';
  API_URL_POST = 'http://localhost:3000/obtenerProductos';
  API_URL_DELETE = 'http://localhost:3000/eliminarProducto';
  API_URL_PUT = 'http://localhost:3000/actualizarProducto';

  //OBTENER DATOS
  getProducts(){
    return this.httpClient.get(this.API_URL_GET);
  }
  //CREAR DATOS
  postProducts(nombre:string, imagen:string, descripcion:string, tiempo:string, dificultad:string,precio:number){
    const infoProductos ={
      nombre:nombre,
      imagen:imagen,
      descripcion:descripcion,
      tiempo:tiempo,
      dificultad:dificultad,
      precio:precio
    }
    return this.httpClient.post(this.API_URL_POST, infoProductos);
  }
  //MODIFICAR DATOS
  putProduct(nombre:string, imagen:string, descripcion:string, tiempo:string, dificultad:string, precio:number, id:string){
    const infoProductos ={
      nombre:nombre,
      imagen:imagen,
      descripcion:descripcion,
      tiempo:tiempo,
      dificultad:dificultad,
      precio:precio
    }
    return this.httpClient.put(`${this.API_URL_PUT}/${id}`, infoProductos);
  }
  //ELIMINAR DATOS
  deleteProduct(id:string){
    return this.httpClient.delete(`${this.API_URL_DELETE}/${id}`);
  }
}
