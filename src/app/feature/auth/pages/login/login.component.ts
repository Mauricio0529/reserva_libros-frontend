import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginRequest } from 'src/app/core/models/authLoginRequest';
import { LoginService } from 'src/app/core/service/login.service';
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
    private loginService: LoginService
    ) {
    super();
    this.loginFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  public signIn():void {
    let dtoLogin: AuthLoginRequest;
    
    if(this.loginFrom.valid) {
      alert("Login");
      let emailInput = this.loginFrom.get('email').value;
      let passwordInput = this.loginFrom.get('password').value;
      
      /**
       * mapeamos el dto
       */
      dtoLogin = { 
        'email': emailInput,
        'password': passwordInput
      }

      this.loginService.signIn(dtoLogin);

      console.log(dtoLogin);
    } else {
      alert("Campos vacios");
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
