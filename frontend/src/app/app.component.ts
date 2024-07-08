import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({ //decorador
  selector: 'app-root',//Etiqueta de html
  standalone: true,
  //Especifica las importaciones
  imports: [RouterOutlet, NavegacionComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

//Componente principal
export class AppComponent {
  //Lógica general
}
