import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavAdminComponent } from '../../components/nav-admin/nav-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    NavAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  productService = inject(ProductsService);
  allProducts : any[] = [];
  nuevoProducto : boolean = false;
  editarProducto : boolean = false;
  inicio : boolean = true;
  productosActuales : boolean = false;
  soporte : boolean = false;

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

  //MENU
  bienvenido(){
    this.inicio = true;
    this.nuevoProducto = false;
    this.productosActuales=false;
    this.editarProducto=false;
    this.soporte=false;
  }
  gestionProductos(){
    this.inicio = false;
    this.nuevoProducto = false;
    this.productosActuales= true;
    this.editarProducto=false;
    this.soporte=false;
  }
  soporteAyuda(){
    this.inicio = false;
    this.nuevoProducto = false;
    this.productosActuales= false;
    this.editarProducto=false;
    this.soporte=true;
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
    this.producto.alergenos = '';
    this.producto.ingredientes =[];
    this.productosActuales = false;
  }
  cancelarNuevo(){
    this.nuevoProducto = false;
    this.productosActuales = true;
  }
  crear(){
    if (!this.producto.nombre || !this.producto.imagen || !this.producto.descripcion || !this.producto.tiempo || !this.producto.dificultad|| !this.producto.precio || !this.producto.alergenos || !this.producto.ingredientes){
      alert('Debe ingresar todos los campos requeridos');
    } else {
      this.productService.postProducts(this.producto.nombre,this.producto.imagen,this.producto.descripcion,this.producto.tiempo,this.producto.dificultad,this.producto.precio, this.producto.alergenos, this.producto.ingredientes).subscribe(()=>{
        alert('Producto agregado exitosamente');
        window.location.reload();
      })
    }
  }
  //PUT
  cancelarEditar(){
    this.inicio = false;
    this.nuevoProducto = false;
    this.productosActuales= true;
    this.editarProducto=false;
    this.soporte=false;
  }
  editar(producto: any){
    this.producto = producto
    this.inicio = false;
    this.nuevoProducto = false;
    this.productosActuales= false;
    this.editarProducto=true;
    this.soporte=true;
  }
  guardar(producto: any){
    this.producto = producto;
    if (!this.producto.nombre || !this.producto.imagen || !this.producto.descripcion || !this.producto.tiempo || !this.producto.dificultad|| !this.producto.precio|| !this.producto.alergenos || !this.producto.ingredientes){
      alert('Debe ingresar todos los campos requeridos');
    } else {
      this.productService.putProduct(this.producto.nombre,this.producto.imagen,this.producto.descripcion,this.producto.tiempo,this.producto.dificultad,this.producto.precio,this.producto._id, this.producto.ingredientes, this.producto.alergenos).subscribe(()=>{
        alert('Producto editado exitosamente');
        window.location.reload();
      })
    }
  }
  ngOnInit(){
    this.obtenerProductos();
  }
}
