import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      if (this.authService.isAuthenticated()) {
        return true;
      } else {
        alert('Log in to use this functionality.')
        return false;
      }
    } catch (error) {
      alert('Something went wrong..')
      console.error('Error checking login status:', error);
      this.router.navigate(['/']);
      return false;
    }
  }
}
