import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { HitoryReservesComponent } from './pages/hitory-reserves/hitory-reserves.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HitoryReservesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
