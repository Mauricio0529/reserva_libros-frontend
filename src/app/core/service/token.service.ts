import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { CustomerJwt } from '../models/customerJwt';

import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  /**
   * obtenemos el token
   */
  public getToken(): string {
    return getCookie('token');
  }

  /**
   * guardar el token en la cookies
   */
  public saveToken(token: string): void {
    setCookie('token', token, {expires: 1, path: '/'});
    //localStorage.setItem('token', token);
  }

   /**
   * eliminar el token en el localStorage o en cookies
   */
  public deleteToken(): void {
    removeCookie('token');
  }

  /**
   * Obtiene informacion del usuario
   */
  public getInfoToken(): CustomerJwt {
    // npm install jwt-decode
    let infoToken = jwt_decode(getCookie('token'));
    return <CustomerJwt>infoToken;
  }


}