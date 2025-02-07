import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  imports: [
    CommonModule,             // For common Angular directives (ngIf, ngFor)
    ReactiveFormsModule,      // For working with reactive forms
    RouterModule,             // For navigation (e.g., routing to login)
    MatFormFieldModule,       // Material Design form fields
    MatInputModule,           // Material Design input fields
    MatIconModule,            // Material Design icons
    MatButtonModule,          // Material Design buttons
  ],
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, username, password } = this.signupForm.value;

    // Call login method from AuthService
    this.authService.register(email, username, password).subscribe({
        next: (response) => {
          // Handle 200 OK response
          this.successMessage = response.message || 'Registration successful!';
          this.errorMessage = '';
        },
        error: (error) => {
          // Handle 400 or 409 errors
          this.errorMessage = error;
          this.successMessage = '';
        },
      });
  }
}
