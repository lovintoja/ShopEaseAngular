import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getToken();
    
    // If token exists, add it to the Authorization header
    if (token) {
      const clonedRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })  
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
