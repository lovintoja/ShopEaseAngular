import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { AboutComponent } from './components/about/about.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductManagementComponent } from './components/admin/admin-product-management/admin-product-management.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { AdminOrderManagementComponent } from './components/admin/admin-order-management/admin-order-management.component';

export const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [NotLoggedInGuard] 
  },
  { path: 'products', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { 
    path: 'basket', 
    component: BasketComponent,
    canActivate: [LoggedInGuard] 
  },
  { path: 'about', component: AboutComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [LoggedInGuard] 
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [NotLoggedInGuard] 
  },
  {
    path: 'admin/products',
    component: ProductManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/orders',
    component: AdminOrderManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
