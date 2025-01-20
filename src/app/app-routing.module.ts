import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'order', component: OrderFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
