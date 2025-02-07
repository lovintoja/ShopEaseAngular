import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../models/order.model';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [MatExpansionModule, CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, CurrencyPipe, DatePipe, MatInputModule ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;
  changePasswordForm: FormGroup;
  orders: Order[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, 
    private orderService: OrderService, 
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
      this.changePasswordForm = this.fb.group(
        {
          oldPassword: ['', Validators.required],
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmNewPassword: ['', Validators.required],
        },
        { validator: this.passwordMatchValidator }
      );
    }

  ngOnInit(): void {
    this.getProfile();
    this.loadOrders();
  }

  getProfile(): void {
    this.authService.getProfile().subscribe(
      (profileData) => {
        this.profileData = profileData;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load profile. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loadProductDetailsForOrders();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders. Please try again later.';
        console.error(err);
      },
    });
  }

  loadProductDetailsForOrders(): void {
    this.orders.forEach((order) => {
      order.items.forEach((item) => {
        this.productService.getProduct(item.productId).subscribe({
          next: (product) => {
            item.product = product;
          },
          error: (err) => {
            console.error(`Failed to load product details for ID ${item.productId}`, err);
          },
        });
      });
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const oldPassword: string = this.changePasswordForm.value.oldPassword
    const newPassword: string = this.changePasswordForm.value.newPassword
    

    this.authService.changePassword(oldPassword, newPassword).subscribe({
      next: () => {
        this.snackBar.open('Password changed successfully!', 'Close', {
          duration: 3000,
        });
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to change password. Please try again.';
        console.error(err);
      },
    });
  }

  openEditProfileDialog() {
    this.dialog.open(EditProfileDialogComponent, {
      width: '400px'
    });
  }
}

