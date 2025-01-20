import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [CurrencyPipe, CommonModule],
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  productsInBasket: any[] = []; // List of products added to the basket
}
