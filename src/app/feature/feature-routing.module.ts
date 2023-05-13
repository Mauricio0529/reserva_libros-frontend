import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "autenticacion",
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})

export class FeatureRoutingModule { }
