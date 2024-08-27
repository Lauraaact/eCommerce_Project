import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  toggleRegister() {
    const modalElement = document.getElementById('registerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}


