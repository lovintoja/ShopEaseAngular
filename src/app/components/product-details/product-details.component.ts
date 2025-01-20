import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [MatCardModule, CurrencyPipe, CommonModule],
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private basketService: BasketService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(Number(id)).subscribe(data => {
        this.product = data;
      });
    }
  }

  addToBasket(): void {
    alert(`${this.product.title} has been added to the basket!`);
    this.basketService.addToBasket(this.product);
  }
}
