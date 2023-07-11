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
export class AuthWithoutGuard implements CanActivate {
/**
 * es cuando ya estoy autenticado
 */  
constructor(
  private tokenService: TokenService,
  private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      /**
       * Customer no esta autenticado
       */
    if(!this.tokenService.getToken()) {
      alert("Su cuenta ha cerrado sesion");
      this.router.navigateByUrl('autenticacion/inicio-sesion');
      return false;
    }
    /*  ESTA BIEN, SIN AUTENTICARSE */

    return true;
  } 
}