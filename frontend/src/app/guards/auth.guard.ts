import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //Importar dependencias o servicios
  const router = inject(Router);
  const loginService = inject(LoginService);
  //Si esta logeado
  if (!loginService.isLogged()){
    router.navigate(['/']);
    return false;
  }
  //Si es admin
  if (!loginService.isAdmin()){
    router.navigate(['/']);
    return false;
  }
  return true;
};
