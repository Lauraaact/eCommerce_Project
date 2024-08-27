import { Component } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NavegacionComponent,
    FooterComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
