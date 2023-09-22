import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent }from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

/**
 * formulario reactivo
 */
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePasswordComponent } from './pages/updateCustomerPassword/update-password/update-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UpdatePasswordComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent // borrar
  ],

  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})

export class AuthModule { }
