import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; //Redireccionamiento
import { NOTYF } from '../../notyf.token'; //Alerts y notif.

declare var bootstrap: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LoginComponent, 
    FormsModule, 
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  userService = inject (UserService);
  router = inject (Router)
  notyf = inject(NOTYF);
  submitted = false;

  usuario = {
    nombreUsuario : '',
    correo : '',
    contrasena : '',
  }
  crear(){
    this.submitted = true;
    if (!this.usuario.nombreUsuario || !this.usuario.correo || !this.usuario.contrasena){
      return;
    } else {
      this.userService.createUser(this.usuario).subscribe({
        next: () => {
          this.notyf.success('Usuario creado exitosamente');
          //Cerrar el modal
          const modalElement = document.getElementById('registerModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement); // Obtener instancia existente del modal
            if (modal) {
              modal.hide(); // Ocultar modal
            }
          }
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          // Manejo del mensaje de error específico
          if (err.error && err.error.msg === 'El correo ya se encuentra registrado') {
            this.notyf.error('El correo se encuentra registrado');
          } else {
            this.notyf.error(`Ocurrió un error al crear el usuario: ${err.error?.msg || 'Error desconocido'}`);
          }
        }
      });
    }
  }

  toggleLogin() {
    const modalElement = document.getElementById('loginModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
