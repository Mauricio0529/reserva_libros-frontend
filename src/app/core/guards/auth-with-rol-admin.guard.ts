import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
import { Roles } from '../enums/Roles';

@Injectable({
  providedIn: 'root'
})


export class AuthWithRolAdminGuard implements CanActivate {
  
  constructor(
    private tokenService: TokenService,
    private router: Router) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      /**
       * Customer que ha iniciado sesion, si es admin pasa
       */
    //this.tokenService.getInfoToken().rol
    if(this.tokenService.getInfoToken().rol != Roles.ADMIN && !this.tokenService.getToken()) {
      alert("No eres administrador");
      this.router.navigateByUrl('autenticacion/inicio-sesion');
      return false;
    }
    return true;
  } 
}