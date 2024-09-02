import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';//Productos
import { UserService } from '../../services/user.service';//Usuarios
import { AdminService } from '../../services/admin.service'; //Admin
import { CommonModule } from '@angular/common'; //Condicionales
import { FormsModule } from '@angular/forms'; //Formularios
import { NOTYF } from '../../notyf.token'; //Alerts y notif.
import { LoginService } from '../../services/login.service';
import { HttpHeaders } from '@angular/common/http'; //Cabezeras petición

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  //Inyectar dependencias
  productService = inject(ProductsService);
  userService = inject (UserService);
  adminService = inject (AdminService);
  loginService = inject (LoginService);
  notyf = inject(NOTYF);
  //Arreglos
  allProducts : any[] = [];
  allUsers : any[] = [];
  allAdmins : any[] = [];
  //Token
  token : any = this.loginService.getToken();
  id : any = localStorage.getItem('id');
  //Declaración pags.
  nuevoProducto : boolean = false;
  editarProducto : boolean = false;
  inicio : boolean = true;
  productosActuales : boolean = false;
  soporte : boolean = false;
  users : boolean = false;
  admins : boolean = false;
  nuevoAdministrador : boolean = false;
  ordenes : boolean = false;
  //Declaración producto
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
  user = {
    _id:'',
    nombreUsuario : '',
    correo : '',
    contrasena : '',
  }
  admin ={
    _id:'',
    nombreUsuario : '',
    correo : '',
    contrasena : '',
    categoriaAdmin : true
  }

  //CLEAR EVERYTHING :P
  clear(){
    this.inicio = false;
    this.nuevoProducto = false;
    this.productosActuales = false;
    this.editarProducto = false;
    this.soporte = false;
    this.users = false;
    this.admins = false;
    this.nuevoAdministrador = false;
    this.ordenes = false;
  }
  //MENU
  bienvenido(){
    this.clear();
    this.inicio = true;
  }
  gestionProductos(){
    this.clear();
    this.productosActuales = true;
  }
  gestionAdmins(){
    this.clear();
    this.admins = true;
  }
  gestionUsers(){
    this.clear();
    this.users = true;
  }
  gestionOrdenes(){
    this.clear();
    this.ordenes = true;
  }
  soporteAyuda(){
    this.clear();
    this.soporte = true;
  }
  //Cerrar sesion
  cerrarSesion(){
    this.loginService.logout();
  }

  //PRODUCTOS
  //Get
  obtenerProductos(){
    this.productService.getProducts().subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.allProducts = res;
      }else{
        console.error('Error');
      }
    });
  }
  //Delete
  eliminar(id: string){
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.notyf.success('Producto eliminado');
        this.obtenerProductos();
      },
      error: (err) => {
        // Manejo de errores
        console.error('Error al eliminar el producto:', err);
        this.notyf.error('No se pudo eliminar el producto. Inténtelo de nuevo.');
      }
    });
  }
  //Post
  nuevoProductoBtn(){
    this.clear();
    this.nuevoProducto = true;
    this.producto.nombre = '';
    this.producto.imagen = '';
    this.producto.descripcion = '';
    this.producto.tiempo = '';
    this.producto.dificultad = '';
    this.producto.precio = 0;
    this.producto.alergenos = '';
    this.producto.ingredientes = [];
  }
  cancelarNuevo(){
    this.clear();
    this.productosActuales = true;
  }
  crear(){
    if (!this.producto.nombre || !this.producto.imagen || !this.producto.descripcion || !this.producto.tiempo || !this.producto.dificultad|| !this.producto.precio || !this.producto.alergenos || !this.producto.ingredientes){
      this.notyf.error('Debe ingresar todos los campos requeridos');
    } else {
      this.productService.postProducts(this.producto.nombre,this.producto.imagen,this.producto.descripcion,this.producto.tiempo,this.producto.dificultad,this.producto.precio, this.producto.alergenos, this.producto.ingredientes).subscribe(()=>{
        this.notyf.success('Producto agregado exitosamente');
        this.obtenerProductos();
        this.clear();
        this.productosActuales = true;
      })
    }
  }
  //PUT
  cancelarEditar(){
    this.clear();
    this.productosActuales= true;
  }
  editar(producto: any){
    this.producto = producto
    this.clear();
    this.editarProducto=true;
  }
  guardar(producto: any){
    this.producto = producto;
    if (!this.producto.nombre || !this.producto.imagen || !this.producto.descripcion || !this.producto.tiempo || !this.producto.dificultad|| !this.producto.precio|| !this.producto.alergenos || !this.producto.ingredientes){
      this.notyf.error('Debe ingresar todos los campos requeridos');
    } else {
      this.productService.putProduct(this.producto.nombre,this.producto.imagen,this.producto.descripcion,this.producto.tiempo,this.producto.dificultad,this.producto.precio, this.producto.alergenos,this.producto.ingredientes, this.producto._id).subscribe(()=>{
        this.notyf.success('Producto modificado')
        this.clear();
        this.productosActuales = true;
        this.obtenerProductos();
      })
    }
  }

  //USERS
  //Get
  obtenerUsuario(){
    this.userService.getUser(this.id,this.token).subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.user = res.user;
        console.log(this.user)
      }else{
        console.error('Error');
      }
    });
  }
  obtenerUsuarios(){
    this.userService.getUsers(this.token).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUsers = res;
      },
      error: (err) => {
        this.notyf.error(err);
      }
    });
  }
  //Delete
  eliminarUsuario(id: string){
      this.userService.deleteUser(id, this.token).subscribe(()=>{
        this.notyf.success('Usuario eliminado')
        this.obtenerUsuarios();
      })
  }


  //ADMIN
  //Get
  obtenerAdmins(){
    this.adminService.getAdmins(this.token).subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.allAdmins = res;
      }else{
        console.error('Error');
      }
    });
  }
  //Delete
  eliminarAdmin(id: string){
      this.userService.deleteUser(id, this.token).subscribe(()=>{
        this.notyf.success('Admin eliminado')
        this.obtenerAdmins();
      })
  }
  //Post
  nuevoAdmin(){
    this.clear();
    this.nuevoAdministrador = true;
  }
  cancelarNuevoAdmin(){
    this.clear();
    this.admins = true;
  }
  crearAdmin(){
    if (!this.admin.nombreUsuario || !this.admin.correo || !this.admin.contrasena || !this.admin.categoriaAdmin){
      this.notyf.error('Debe ingresar todos los campos requeridos');
    } else {
      this.adminService.createAdmin(this.admin, this.token).subscribe(()=>{
        this.notyf.success('Admin agregado exitosamente');
        this.obtenerAdmins();
        this.clear();
        this.admins = true;
      })
    }
  }

  ngOnInit(){
    this.obtenerProductos();
    this.obtenerUsuarios();
    this.obtenerAdmins();
    this.obtenerUsuario()
  }

  
}
