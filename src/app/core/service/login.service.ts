import { Injectable } from '@angular/core';
import { AuthLoginRequest } from '../models/authLoginRequest';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthLoginResponse } from '../models/authLoginResponse';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public signIn(auth: AuthLoginRequest): Observable<AuthLoginResponse> {
    return this.http.post<AuthLoginResponse>(this.apiUrl+"auth/sign-in", auth);
  }

}