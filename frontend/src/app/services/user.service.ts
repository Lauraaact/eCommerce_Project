import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Peticiones get, post, delete
  private httpClient = inject (HttpClient);
  private URL_USER = 'http://localhost:3000/user';

  //GET - Obtener usuario especifico
  getUser(id:string){
    return this.httpClient.get(`${this.URL_USER}/${id}`);
  }
  //POST - Crear usuario
  createUser(user:User){
    return this.httpClient.post(this.URL_USER, user);
  }

  //DELETE - Eliminar usuario 
  deleteUser(id:string){
    return this.httpClient.delete(`${this.URL_USER}/${id}`);
  }

  //PUT - Actualizar usuario
  putUser(id: string, user: User) {
    return this.httpClient.put(`${this.URL_USER}/${id}`, user);
  }
}
