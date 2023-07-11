import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthLoginRequest } from 'src/app/core/models/authLoginRequest';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends AppBaseComponent {

  /**
   * formulario reactivo de login
   */
  public loginFrom: FormGroup;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private loginService: AuthService,
    private tokenService: TokenService

    ) {
    super();
    this.loginFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  public async signIn(): Promise<void> {
    let dtoLogin: AuthLoginRequest;
    // let dtoLogin: AuthLoginRequest = this.loginFrom.value;

    if(this.loginFrom.valid) {
      let emailInput = this.loginFrom.get('email').value;
      let passwordInput = this.loginFrom.get('password').value;
      
      /**
       * mapeamos el dto
       */
      dtoLogin = { 
        'email': emailInput,
        'password': passwordInput
      }

      /**
       * await, primero que se ejecute el servicio login antes de cualquier cosa.
       * espera a que se ejecute el servicio de login.
       * lastValueFrom castea un Observable a un Promise.
       * quiero que se ejecute este servicio,
       * para que luego se ejecute el console.log(localStorage.getItem("token"));
       */
      await lastValueFrom(this.loginService.signIn(dtoLogin));

      console.log(this.tokenService.getToken());

      // redirige al catalogo de libros
      await this.router.navigateByUrl("/catalogo");

    } else {
      // validar si el formulario esta mal
      this.loginFrom.markAllAsTouched();
    }
  }

  /*
  public signUp():void {
    this.router.navigateByUrl("autenticacion/registro");
  }*/

  public getErrorsFrom(field: string): string {
    let message;
    
    if(this.isTochedField(this.loginFrom, field)) {
      if(this.loginFrom.get(field).hasError('required')) {
        message = 'El campo es requerido';
      } else if(this.loginFrom.get(field).hasError('email')){
        message = 'Requiere el formato de un correo';
        // console.log(this.getAllErrorsForm(this.loginFrom));
      }
    }
    return message;
  }
}
