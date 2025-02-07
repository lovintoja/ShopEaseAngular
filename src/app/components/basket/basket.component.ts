import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatHeaderCell, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { BasketItem } from '../../models/basketitem.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [CurrencyPipe, MatIcon, CommonModule, MatTableModule, MatButton, MatIcon, MatHeaderCell, MatIconButton],
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems$!: Observable<BasketItem[]>;
  displayedColumns: string[] = ['image', 'title', 'price', 'quantity', 'total', 'actions'];

  constructor(private basketService: BasketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.basketItems$ = this.basketService.basket$;
  }

  addItem(product: Product): void {
    this.basketService.addToBasket(product);
  }

  removeItem(productId: number, quantity: number): void {
    this.basketService.removeFromBasket(productId, quantity);
  }

  getTotal(): number {
    return this.basketService.getTotal();
  }

  openCheckoutForm() {
    this.dialog.open(CheckoutDialogComponent, {
      width: '400px'
    });
  }
}
