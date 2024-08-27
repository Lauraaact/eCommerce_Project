import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({ //decorador
  selector: 'app-root',//Etiqueta de html
  standalone: true,
  //Especifica las importaciones
  imports: [
    RouterOutlet, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

//Componente principal
export class AppComponent {
  //Lógica general
}
