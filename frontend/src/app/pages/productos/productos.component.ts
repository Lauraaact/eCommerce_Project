import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service'; //Productos
import { CommonModule } from '@angular/common'; //Condicionales
import { NavegacionComponent } from '../../components/navegacion/navegacion.component'; //Menú nav.
import { FooterComponent } from '../../components/footer/footer.component'; // Footer
import { CarritoService } from '../../services/carrito.service'; //Carrito de compras

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    NavegacionComponent,
    FooterComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  carritoService = inject (CarritoService);
  productService = inject (ProductsService);
  allProducts : any[] = [];
  ingrediente : string[] = [];
  productoEspecifico : boolean = false;
  producto = {
    _id:'',
    nombre : '',
    imagen : '',
    descripcion : '',
    tiempo : '',
    dificultad : '',
    precio : 0, 
    alergenos : '',
    ingredientes : [],
  }

  obtenerProductos(){
    console.log('Este es mi metodo de obtener productos');
    this.productService.getProducts().subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.allProducts = res;
      }else{
        console.error('Error');
      }
    });
  }

  especifico(producto: any){
    this.productoEspecifico = true;
    this.producto = producto;
    this.ingrediente = this.producto.ingredientes;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  principal(){
    this.productoEspecifico = false;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  anadirCarrito(producto:any){
    this.carritoService.agregarProducto(producto);
  }

  ngOnInit(){
    this.obtenerProductos();
  }
}
