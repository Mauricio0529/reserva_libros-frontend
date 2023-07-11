import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})

/**
 * de esta forma se hacia desde la version 14 de angular
 */
export class AuthWithGuard implements CanActivate {
  
  constructor(
    private tokenService: TokenService,
    private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      /**
       * si existe el token o ya inicio sesion, no me permita volver a la ruta del login
      */
      if(this.tokenService.getToken()) {        
        this.router.navigateByUrl('catalogo');
        return false;
      }
      /*  ESTA BIEN, CON AUTENTICARSE */
  
      return true;
  } 
}