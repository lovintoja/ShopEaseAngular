import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatDialogContent, ReactiveFormsModule, MatButton, MatInputModule],
  styleUrls: ['./checkout-dialog.component.css'],
  animations: [
    trigger('dialogAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 100ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition('* => void', [
        animate('300ms 100ms', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class CheckoutDialogComponent {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CheckoutDialogComponent>,
    private basketService: BasketService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  submitOrder() {
    if (this.checkoutForm.valid) {
      alert('Order completed successfully!');
      this.basketService.clearBasket();
      this.dialogRef.close();
      this.router.navigate(['/']);
    } 
    else {
      alert('Invalid form! Check email format!')
    }
  }
}

