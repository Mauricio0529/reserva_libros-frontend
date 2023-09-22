import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CustomerResponseDto } from 'src/app/core/models/customerResponseDto';
import { RegisterRequest } from 'src/app/core/models/registerRequest';
import { AuthService } from 'src/app/core/service/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent extends AppBaseComponent {

  public registerUpdatePasswordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private auth: AuthService) {
    super();
    this.registerUpdatePasswordForm = this.fb.group({
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {}

  /**
   * Actualizar contraseña de un usuario
   */
  public async updatePasswordCustomer():Promise<void> {

    let getPasswordCustomer = this.registerUpdatePasswordForm.get('password').value;

    let getInfoLocalStorage = JSON.parse(localStorage.getItem('pruebaTestPass'));

     // CustomerResponseDto
     let customerDto: CustomerResponseDto = {

      'cardId': getInfoLocalStorage.cardId,
      'name': getInfoLocalStorage.name,
      'lestName': getInfoLocalStorage.lestName,
      'username': getInfoLocalStorage.username,
      'email': getInfoLocalStorage.email,
      'password': getPasswordCustomer,
      'active': getInfoLocalStorage.active,
      'rol': getInfoLocalStorage.rol,
      'numberCellPhone': getInfoLocalStorage.numberCellPhone,
      
    }

    if(this.registerUpdatePasswordForm.valid) {
      
      await lastValueFrom(this.auth.updatePassword(customerDto)).then(response => {
          //this.passwordGenerated = response.password;
          localStorage.clear();
          
          Swal.fire({
            allowOutsideClick: false,
            title: 'Tu contraseña a sido actualizada',
            icon: 'success',
            confirmButtonText: 'Iniciar Sesion',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("autenticacion/inicio-sesion");
            }
          })
      
      });
        
    } else {
      // validar si el formulario esta mal
      this.registerUpdatePasswordForm.markAllAsTouched();
    }
  }

  public cleanDataEmail(): void {
    localStorage.clear();
    this.router.navigateByUrl("autenticacion/inicio-sesion");
  }
}