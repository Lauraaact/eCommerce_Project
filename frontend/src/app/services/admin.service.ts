import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // inyección de dependencias
  private httpClient = inject(HttpClient);
  private URL_ADMIN = 'http://localhost:3000/admin';

  // GET -
  getAdmins(token:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(this.URL_ADMIN, {headers});
  }
  // POST
  createAdmin(admin:Admin, token:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(this.URL_ADMIN, admin, {headers});
  }
}