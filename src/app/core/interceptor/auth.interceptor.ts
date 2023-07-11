import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';

/**
 * SIRVE PARA VALIDAR EXCEPCIONES DE STATUS.
 * ESTA VA CON BASE A LAS EXCEPCIONES QUE TIENE EL BACKEN VALIDADO EN SU REST
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("entre al interceptor");

    let headers;

    let token = this.tokenService.getToken();

    if (!token) {
      return next.handle(request);
    }

    headers = {
      'Authorization': 'Bearer '+token
    }

    let authRequest = request.clone({
      setHeaders: {
        ...headers
      },
    });

    console.log(authRequest)
    return next.handle(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos para acceder a ésta página.'
          })
        }
        return throwError(() => err);
      })
    );
  }
  
}


/*
  let headers; // cabezela de la peticion
    let token = this.tokenService.getToken();

    if(!token) {
      return next.handle(request);  
    }
    /**
     * Obtenemos el token con el Bearer
     /
    headers = {
      'Authorization': 'Bearer '+token
    }

    /**
     * Clonar peticion 
     * y 
     * pasamos el Authorization del objecto "headers"
     /
    let authRequest = request.clone({
      setHeaders: {
        ...headers
      }
    });

    console.log(authRequest);
    return next.handle(authRequest).pipe(

      catchError((err: HttpErrorResponse) => {
        if(err.status == 403) {
          Swal.fire(
            'Oops...',
            'Su cuenta ha cerrado sesion',
            'error'
          );
        }
     
        return throwError(err);
      })
    );
    */