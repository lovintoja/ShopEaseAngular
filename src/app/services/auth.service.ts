import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';  // Modify as needed
import { Profile } from '../models/profile.model';
import { ProfileWithData } from '../models/profile-with-data.model';
8
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${environment.apiAuthUrl}/auth/login`;  // Modify as per your API endpoint
  private profileUrl =  `${environment.apiAuthUrl}/auth/profile`;
  private registerUrl = `${environment.apiAuthUrl}/auth/register`;
  private roleUrl = `${environment.apiAuthUrl}/auth/role`;
  private passwordUrl = `${environment.apiAuthUrl}/auth/password`

  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}
    
  // Login method
  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<{ token: string }>(this.loginUrl, body, { headers }).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.loggedInSubject.next(true)
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);
      })
    );
  }

  register(email: string, username: string, password: string): Observable<{ message: string }> {
    const body = { email, username, password };

    return this.http.post<{ message: string }>(this.registerUrl, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 409:
        return 'User already exists. Please use a different email.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  // Optional: To check if the user is logged in (token exists)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Optional: Logout (remove token)
  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedInSubject.next(false);
  }

  // Optionally: Get the stored token for future API calls
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getProfile(): Observable<ProfileWithData> {
    return this.http.get<ProfileWithData>(this.profileUrl);  // Send GET request to retrieve the profile
  }

  getUserRole(): Observable<string> {
    return this.http.get<{ userRole: string }>(this.roleUrl).pipe(
      map((response) => response.userRole)
    );
  }

  editProfile(profile: Profile): Observable<boolean> {
    return this.http.put<{success: boolean}>(this.profileUrl, profile).pipe(
      map((response) => response.success)
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    return this.http.put<void>(this.passwordUrl, { oldPassword: oldPassword, newPassword: newPassword});
  }
}
