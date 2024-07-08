import { Component, inject } from '@angular/core';//Directivas Angular
import { FormsModule } from '@angular/forms';//Interacción formularios
import { Router } from '@angular/router';//Redireccion

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  //Inyeccion directiva router
  router = inject(Router);
  //Datos para validar admin
  admin = {
    correo: "admin@gmail.com",
    contrasena: "123456"
  };
  correo : string = '';
  contrasena : string = '';
  //Redireccionar
  iniciarSesion(){
    if(this.correo === this.admin.correo && this.contrasena == this.admin.contrasena){
      alert('Bienvenido admin!');
      this.router.navigate(['/admin']);
    } else{
      alert('Correo o contraseña incorrecto');
    }
  }

}
