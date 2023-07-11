import { Injectable } from '@angular/core';
import { AuthLoginRequest } from '../models/authLoginRequest';
import { Observable, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthLoginResponse } from '../models/authLoginResponse';
import { TokenService } from './token.service';
import { RegisterRequest } from '../models/registerRequest';
import { RegisterResponse } from '../models/registerResponse';

const { apiUrl } = environment;

/**
 * Consume los servicios de autenticacion de usuario (login y registro)
 */

@Injectable({
  providedIn: 'root'
})

export class AuthService {

//  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  /**
   * el pipe() permite realizar logica antes que retorne el resultado del Observable.
   * el tap() permite realizar operaciones secundarias. 
   * el tap() Hace entender que operaciones o que logica va hacer el pipe().
   */
  public signIn(auth: AuthLoginRequest): Observable<AuthLoginResponse> { 
    return this.http.post<AuthLoginResponse>(`${apiUrl}auth/sign-in`, auth).pipe(
      tap(response => {
        /**
         * Obtenemos el token del AuthLoginResponse ya que este metodo retorna esa clase
         * y lo guardamos en el localStorage
         */
        this.tokenService.saveToken(response.jwt);
      })
    );
    //return this.http.post<AuthLoginResponse>(this.apiUrl+"auth/sign-in", auth);
    
  }

  public signUp(customerDto: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${apiUrl}auth/register`, customerDto);
  }

}