import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { HitoryReservesComponent } from './pages/hitory-reserves/hitory-reserves.component';
import { ReserveStatusComponent } from './pages/reserve-status/reserve-status.component';
import { ReserveStatusDetailsComponent } from './pages/reserve-status/reserve-status-details/reserve-status-details.component';

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
  {
    path: 'reserve-status/details',
    component: ReserveStatusDetailsComponent,
  },

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
