import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Peticiones http
import { Router } from '@angular/router'; //Redireccionamiento
import { jwtDecode } from 'jwt-decode'; //Decodificar token
import { Credentials } from '../interfaces/credentials'; //Estructura credenciales

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient = inject(HttpClient);
  private router = inject (Router);
  private API_URL = 'http://localhost:3000/login'

  //Validar credenciales Post
  login(credenciales: Credentials){
    return this.httpClient.post(this.API_URL, credenciales)
  }
  //Aceder y guardar token
  getToken(){
    //Aceder a el token almacenado de forma local
    return localStorage.getItem('token')
  }
  //Validación admin 
  isAdmin(){
    const token = this.getToken();
    if (token){
      const decoded: any = jwtDecode (token);
      return decoded.isAdmin || false;
    } else{
      console.log ('No se encontro Token');
      return false;
    }
    }
  redirect(){
    if (this.isAdmin()){
      this.router.navigate(['/admin']);
    } else{
      this.router.navigate(['/']);
    }
  }
  isLogged(){
    return this.getToken() ? true : false;
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/'])
  }

}
