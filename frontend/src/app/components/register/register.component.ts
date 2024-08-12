import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

declare var bootstrap: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  toggleLogin() {
    const modalElement = document.getElementById('loginModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
