import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule} from '@angular/common';
import { OrdenesComponent } from '../ordenes/ordenes.component';

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

}
