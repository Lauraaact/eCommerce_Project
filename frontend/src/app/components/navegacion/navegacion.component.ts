import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  // Esto se usa en HTML
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
//Esta clase de debe importar
export class NavegacionComponent {

}
