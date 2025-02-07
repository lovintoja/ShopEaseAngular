import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';
import { Order, Address, PaymentInfo, OrderItem } from '../../models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css'],
  imports: [MatFormFieldModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class CheckoutDialogComponent {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CheckoutDialogComponent>,
    private basketService: BasketService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      transactionId: ['', Validators.required],
      note: ['']
    });
  }

  submitOrder() {
    if (this.checkoutForm.valid) {
      const formValue = this.checkoutForm.value;

      const shippingAddress: Address = {
        street: formValue.street,
        city: formValue.city,
        postalCode: formValue.postalCode,
        country: formValue.country
      };

      const paymentInfo: PaymentInfo = {
        paymentMethod: formValue.paymentMethod,
        transactionId: formValue.transactionId,
        paymentDate: new Date()
      };

      const items: OrderItem[] = this.basketService.getBasket().map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price
      }));

      const order: Order = {
        id: 0,
        orderDate: new Date(),
        status: 'Pending',
        totalPrice: this.basketService.getTotal(),
        shippingAddress: shippingAddress,
        paymentInfo: paymentInfo,
        contactPhone: formValue.phone,
        note: formValue.note,
        items: items
      };

      this.orderService.createOrder(order).subscribe(
        (success) => {
          if (success) {
            alert('Order completed successfully!');
            this.basketService.clearBasket();
            this.dialogRef.close();
            this.router.navigate(['/']);
          }
          else {
            alert('Could not submit order.');
          }
        }
      )
    }
  }
}