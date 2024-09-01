import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productos: Products[] = [];
  private carritoSubject = new BehaviorSubject<{productos: Products[], total: number}>({productos: [], total: 0});

  carrito$ = this.carritoSubject.asObservable();

  private actualizarCarrito() {
    const total = this.totalCarrito();
    this.carritoSubject.next({ productos: this.productos, total });
  }

  agregarProducto(producto: Products) {
    const productoExistente = this.productos.find(p => p._id === producto._id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      producto.cantidad = 1;
      this.productos.push(producto);
    }
    this.actualizarCarrito();
  }

  eliminarProducto(id: string) {
    this.productos = this.productos.filter(p => p._id !== id);
    this.actualizarCarrito();
  }

  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }

  totalCarrito(){
    return this.productos.reduce((total, producto) => {
      const totalProducto = producto.precio * producto.cantidad; // Calcula el total por producto
      return total + totalProducto; // Suma al total acumulado
    }, 0);
  }

}

