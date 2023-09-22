import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdatePasswordComponent } from './pages/updateCustomerPassword/update-password/update-password.component';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    component: LoginComponent,
  },
  
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
