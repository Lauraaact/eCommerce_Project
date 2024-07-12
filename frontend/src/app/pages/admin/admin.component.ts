import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  productService = inject(ProductsService);
  allProducts : any[] = [];
  nuevoProducto : boolean = false;
  editarProducto : boolean = false;

  producto = {
    _id:'',
    nombre : '',
    imagen : '',
    descripcion : '',
    tiempo : '',
    dificultad : '',
    precio : 0
  }

  //GET
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
  //DELETE
  eliminar(id: string){
    if (confirm('¿Esta seguro que desea eliminar este producto?')){
      this.productService.deleteProduct(id).subscribe(()=>{
        window.location.reload();
        alert('Producto eliminado exitosamente');
      })
    }else{
      console.error('Error');
    }
  }
  //POST
  nuevoProductoBtn(){
    this.nuevoProducto = true;
    this.producto.nombre = '';
    this.producto.imagen = '';
    this.producto.descripcion = '';
    this.producto.tiempo = '';
    this.producto.dificultad = '';
    this.producto.precio = 0;
  }
  cancelarNuevo(){
    this.nuevoProducto = false;
  }
  crear(){
    if (!this.producto.nombre || !this.producto.imagen || !this.producto.descripcion || !this.producto.tiempo || !this.producto.dificultad|| !this.producto.precio){
      alert('Debe ingresar todos los campos requeridos');
    } else {
      this.productService.postProducts(this.producto.nombre,this.producto.imagen,this.producto.descripcion,this.producto.tiempo,this.producto.dificultad,this.producto.precio).subscribe(()=>{
        alert('Producto agregado exitosamente');
        window.location.reload();
      })
    }
  }
  //PUT
  cancelarEditar(){
    this.editarProducto = false;
  }
  editar(producto: any){
    this.editarProducto = true;
    this.producto = producto
  }
  guardar(producto: any){
    this.producto = producto;
    if (!this.producto.nombre || !this.producto.imagen || !this.producto.descripcion || !this.producto.tiempo || !this.producto.dificultad|| !this.producto.precio){
      alert('Debe ingresar todos los campos requeridos');
    } else {
      this.productService.putProduct(this.producto.nombre,this.producto.imagen,this.producto.descripcion,this.producto.tiempo,this.producto.dificultad,this.producto.precio,this.producto._id).subscribe(()=>{
        alert('Producto editado exitosamente');
        window.location.reload();
      })
    }
  }
  
  ngOnInit(){
    this.obtenerProductos();
  }
}
