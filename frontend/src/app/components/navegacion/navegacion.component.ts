import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; //Redireccionamiento
import { LoginComponent } from '../login/login.component'; //Login
import { RegisterComponent } from '../register/register.component'; //Registro
import { CommonModule} from '@angular/common'; // Condicionales
import { OrdenesComponent } from '../ordenes/ordenes.component'; //Carrito de compras
import { LoginService } from '../../services/login.service'; // Login service
import { UserService } from '../../services/user.service'; //User service

declare var bootstrap: any;

@Component({
  // Esto se usa en HTML
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink, RegisterComponent, LoginComponent, CommonModule, OrdenesComponent],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
//Esta clase de debe importar
export class NavegacionComponent {

  loginService = inject (LoginService);
  userService = inject (UserService);
  //Token
  token : any = this.loginService.getToken();
  isLogged : boolean = this.loginService.isLogged();
  id : any = localStorage.getItem('id');

  user = {
    _id:'',
    nombreUsuario : '',
    correo : '',
    contrasena : '',
  }

  knowLogin(){
    this.isLogged = this.loginService.isLogged();
    if (this.isLogged){
      this.obtenerUsuario();
    }
  }

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

  toggleLogin() {
    const modalElement = document.getElementById('loginModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  toggleRegister() {
    const modalElement = document.getElementById('registerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeService(){
    this.loginService.logout();
    this.isLogged = this.loginService.isLogged();
    window.location.reload();
  }

}
