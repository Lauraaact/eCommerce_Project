import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // inyección de dependencias
  private httpClient = inject(HttpClient);
  private URL_ADMIN = 'http://localhost:3000/admin';

  // GET - 
  getAdmins(){
    return this.httpClient.get(this.URL_ADMIN);
  }
}