import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent }from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

/**
 * formulario reactivo
 */
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
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
