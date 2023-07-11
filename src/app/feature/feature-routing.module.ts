import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWithGuard } from '../core/guards/auth-with.guard';
import { AuthWithoutGuard } from '../core/guards/auth-without.guard';
import { AuthWithRolAdminGuard } from '../core/guards/auth-with-rol-admin.guard';

const routes: Routes = [
  {
    path: 'autenticacion',
    canActivate: [AuthWithGuard],
    //canActivate: AuthWithGuard, () => inject(GuardAuthService).canActiveWithAuth(),
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },
  {
    path: 'catalogo',
    canActivate: [AuthWithoutGuard],
    //canActivate: () => inject(GuardAuthService).canActiveWithoutAuth(),
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  },
  {
    path: 'admin',
    canActivate: [AuthWithRolAdminGuard], //AuthWithoutGuard,
    loadChildren: () => import("./admin/admin.module").then(a => a.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})

export class FeatureRoutingModule { }
