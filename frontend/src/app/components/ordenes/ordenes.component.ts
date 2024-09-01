import { Component, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service'; //Carrito
import { CommonModule } from '@angular/common';//Condicionales
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent {

  private carritoService = inject(CarritoService);
  loginService = inject (LoginService);

  total: number = 0;
  carritoVacio : boolean = false;
  inicioS : boolean = false;

  productosCarrito: any[] = [];
  producto ={
    _id:'',
    nombre : '',
    imagen : '',
    precio : 0, 
    cantidad : 0,
  }

  estaLoggeado(){
    this.inicioS = this.loginService.isLogged();
  }

  obtenerCarrito(){
    this.carritoService.obtenerCarrito().subscribe(carrito => {
      this.productosCarrito = carrito.productos;
      this.total = carrito.total;
      this.carritoVacio = this.productosCarrito.length === 0;
      this.estaLoggeado()
    });
  }

  eliminarDelCarrito(id: string) {
    this.carritoService.eliminarProducto(id);
  }

  actualizarTotal() {
    this.total = this.carritoService.totalCarrito();
  }

  ngOnInit() {
    this.obtenerCarrito();
    this.actualizarTotal();
    this.estaLoggeado();
  }
}
