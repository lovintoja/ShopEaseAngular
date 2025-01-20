import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [CurrencyPipe, MatIcon, CommonModule, MatTableModule],
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems$!: Observable<{ product: Product; quantity: number; }[]>;
  displayedColumns: string[] = ['image', 'title', 'price', 'quantity', 'total', 'actions'];

  constructor(private basketService: BasketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.basketItems$ = this.basketService.getBasket();
  }

  addItem(product: Product): void {
    this.basketService.addToBasket(product);
  }

  removeItem(productId: number, quantity: number): void {
    this.basketService.removeFromBasket(productId, quantity);
  }

  calculateTotal(basketItems: { product: Product; quantity: number }[]): number {
    return basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  openCheckoutForm() {
    this.dialog.open(CheckoutDialogComponent, {
      width: '400px'
    });
  }
}
