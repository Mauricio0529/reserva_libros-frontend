import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ErrorForms } from 'src/app/core/enums/ErrorForm';
import { RegisterRequest } from 'src/app/core/models/registerRequest';
import { AuthService } from 'src/app/core/service/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/CustomValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent {

  public registerForm: FormGroup;
  public passwordGenerated: string;
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
    ) {
      super();
      this.registerForm = this.fb.group({
        cardId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        name: ['', Validators.required],
        lestName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        + "[^-][uni]+(\\.[edu]+)*(\\.[co]{2,})$")]],
        numberCellPhone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
        //password: ['', Validators.required]
      });
  }

  ngOnInit(): void { }

  public async signUp (): Promise<void> {
    let dtoRegister: RegisterRequest = this.registerForm.value;

    if(this.registerForm.valid) {
      
      await lastValueFrom(this.auth.signUp(dtoRegister)).then(response => {
          this.passwordGenerated = response.password;

          Swal.fire(
            'Tu registro a sido completado',
            `Tu contraseña definida es: ${response.password}`,
            'success'
          )
        });
        
    } else {
      // validar si el formulario esta mal
      this.registerForm.markAllAsTouched();
    }
  }

  /**
   * Mensaje de error en los input
   * @param field Es el nombre del input
   * @returns Mensaje con el error
   */
  public getErrorsFrom(field: string): string {
    let message;

    const required: Array<string> = ["cardId", "name", "lestName", "username", "email", "numberCellPhone"];
    const formatEmail: Array<string> = ["email"];
    const onlyNumber: Array<string> = ["cardId", "numberCellPhone"];
    
    if(this.isTochedField(this.registerForm, field)) {

      if(required.includes(field) && this.registerForm.get(field).hasError('required')) {
        message = ErrorForms.REQUIRED;
      
      } else if(onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorForms.ONLY_NUMBER;

      } else if(formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')){
        message = ErrorForms.FORMAT_EMAIL;
      }
    }
    return message;
  }

}