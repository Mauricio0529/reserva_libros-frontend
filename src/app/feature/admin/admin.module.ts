import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InfoBasicBookComponent } from './components/info-basic-book/info-basic-book.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterBookComponent } from './pages/register-book/register-book.component';
import { InfoImageBookComponent } from './components/info-image-book/info-image-book.component';
import { InfoAuthorComponent } from './components/info-author/info-author.component';


@NgModule({
  declarations: [
    RegisterBookComponent,
    InfoBasicBookComponent,
    InfoImageBookComponent,
    InfoAuthorComponent,
  ],
  
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]

})

export class AdminModule { }