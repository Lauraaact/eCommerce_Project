import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productService = inject(ProductsService);
  allProducts : any[] = [];

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
  ngOnInit(){
    this.obtenerProductos();
  }
}
