import { Component } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [
    NavegacionComponent, 
    FooterComponent,
  ],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css'
})
export class NoEncontradoComponent {

}
