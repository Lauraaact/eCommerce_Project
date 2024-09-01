import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Peticiones get, post, delete
  private httpClient = inject (HttpClient);
  private URL_USER = 'http://localhost:3000/user';

  //GET - Obtener usuario especifico
  getUser(id:string, token:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(`${this.URL_USER}/${id}`, {headers});
  }
  getUsers(token:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(this.URL_USER, {headers})
  }
  //POST - Crear usuario
  createUser(user:User){
    return this.httpClient.post(this.URL_USER, user);
  }

  //DELETE - Eliminar usuario 
  deleteUser(id:string, token: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.URL_USER}/${id}`, { headers });
  }

  //PUT - Actualizar usuario
  putUser(id: string, user: User, token:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put(`${this.URL_USER}/${id}`, user), {headers};
  }
}
