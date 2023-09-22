import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { HitoryReservesComponent } from './pages/hitory-reserves/hitory-reserves.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ReserveStatusComponent } from './pages/reserve-status/reserve-status.component';
// NUEVO
//import { ToastModule } from 'primeng/toast';

// NUEVO PARA LAS CATEGORIAS DE CATALOGO
//import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [
    CatalogueComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HitoryReservesComponent,
    ReserveStatusComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
    //SlickCarouselModule // NUEVO PARA LAS CATEGORIAS DE CATALOGO
  ]
})
export class HomeModule { }
