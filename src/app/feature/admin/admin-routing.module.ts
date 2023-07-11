import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBookComponent } from './pages/register-book/register-book.component';

const routes: Routes = [
  {
    path: 'register-book',
    component: RegisterBookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
