import { Component, inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component'; //Registro
import { CommonModule } from '@angular/common'; //Condicionales
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms'; //formulario
import { Credentials } from '../../interfaces/credentials'; //Credenciales
import { LoginService } from '../../services/login.service'; //Login
import { NOTYF } from '../../notyf.token'; //Alerts y notif.

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  submited: boolean = false;
  loginservice = inject (LoginService);
  notyf = inject(NOTYF);

  credentialForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  toggleRegister() {
    const modalElement = document.getElementById('registerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  getCredentials(){
    const email = this.credentialForm.value.email;
    const password = this.credentialForm.value.password;

    if(typeof email == 'string' && typeof password == 'string'){
      const validarCredenciales : Credentials ={
        email,
        password
      }
      return validarCredenciales
    }
    return null
  }

  handleSubmit(){
    this.submited = true;
    if (!this.credentialForm.value.email || !this.credentialForm.value.password){
      return;
    } else {
    const credenciales = this.getCredentials();
    console.log(credenciales);
    if (credenciales){
      this.loginservice.login(credenciales).subscribe({
        next: (res: any) => {
          this.notyf.success('Inicio de sesión correcto');
          if (res){
            localStorage.setItem('token', res.tokenGenerado)
            localStorage.setItem('id', res.id)
            const modalElement = document.getElementById('loginModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement); // Obtener instancia existente del modal
              if (modal) {
                modal.hide(); // Ocultar modal
              }
            }
            this.loginservice.redirect();
          }
        },
        error: (err)=>{
          this.notyf.error(err.error.msg)
          this.credentialForm.reset();
        }
      })
    }}
  }

}


