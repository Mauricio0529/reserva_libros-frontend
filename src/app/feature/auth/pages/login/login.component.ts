import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthLoginRequest } from 'src/app/core/models/authLoginRequest';
import { CustomerResponseDto } from 'src/app/core/models/customerResponseDto';
import { RegisterRequest } from 'src/app/core/models/registerRequest';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenService } from 'src/app/core/service/token.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import Swal from 'sweetalert2';

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

  public showModalCodeValidationEmail() {
    
    Swal.fire({
      title: 'Has olvidado tu contraseña',
      text: 'Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña',
      input: 'text',
      inputPlaceholder: 'Correo electrónico',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,

      preConfirm: (email) => {

        // ESTO ES TEMPORAL, TOCA HACER UN SERVICE
        /**
         * Esto retorna un customerDto, ese se guarda en el localStorage
         */
        return fetch(`http://localhost:8080/auth/send-email/${email}`)
        
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Fallo al enviar: ${error}`
            )
          })
      },
       
      allowOutsideClick: () => !Swal.isLoading()

    }).then((result) => {
      
      // ESTE ES EL BOTON DE ENVIAR
      if (result.isConfirmed) {
        
        /** AQUI SE MUESTRA EL MENSAJE QUE SE ENVIO EL ENLACE AL CORREO Y MOSTRAR EL CORREO EN EL SWEETALERT
         * result, retorna el objecto de customerDto del backend
         */
        localStorage.setItem("pruebaTestPass", JSON.stringify(result.value));

        this.showAlterReenviaEmail();
        
      }
    })

  }

  public showAlterReenviaEmail() {

    let getInfoLocalStorage = JSON.parse(localStorage.getItem('pruebaTestPass'));

    Swal.fire({
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      title: 'Te hemos enviado un correo electronico con un enlace para restablecer la contraseña.',
      text: `Tu email es: ` + getInfoLocalStorage.email,
      confirmButtonText: 'Reenviar enlace',
      
      preConfirm: (email) => {
        return fetch(`http://localhost:8080/auth/send-email/${getInfoLocalStorage.email}`)
      
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Fallo al enviar: ${error}`
          )
        })
      }
    }).then((result) => {
      
      // BOTON DE ENVIAR
      if (result.isConfirmed) {
        this.showAlterReenviaEmail();
      }
    })

  }
}