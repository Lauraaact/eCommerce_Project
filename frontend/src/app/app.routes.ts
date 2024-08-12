import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { AdminComponent } from './pages/admin/admin.component';

// IMPORTAR PÁGINAS
// DEFINIR RUTAS
export const routes: Routes = [
    {path : 'inicio', component : InicioComponent, title: 'uBaker | Inicio'}, 
    {path : 'productos', component : ProductosComponent, title: 'uBaker | Catálogo'},
    {path : 'ingreso', component : IngresoComponent, title: 'uBaker | Ingreso'},
    {path : 'admin', component : AdminComponent, title: 'uBaker | Admin'},
    {path : '', redirectTo : '/inicio', pathMatch : 'full'},//si no hay nada redirecciona a inicio
    {path : '**', component : NoEncontradoComponent}//Si no existe la ruta va a no encontrado
];
