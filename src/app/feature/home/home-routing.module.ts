import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { HitoryReservesComponent } from './pages/hitory-reserves/hitory-reserves.component';
import { ReserveStatusComponent } from './pages/reserve-status/reserve-status.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'reservas',
    component: ShoppingCartComponent,
  },
  {
    path: 'historial',
    component: HitoryReservesComponent,
  },
  {
    path: 'reserve-status',
    component: ReserveStatusComponent,
  },

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
