import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basket: { product: Product; quantity: number }[] = [];
  private basketSubject: BehaviorSubject<{ product: Product; quantity: number }[]> = 
    new BehaviorSubject<{ product: Product; quantity: number }[]>(this.basket);

  basket$: Observable<{ product: Product; quantity: number }[]> = this.basketSubject.asObservable();

  constructor() {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      this.basket = JSON.parse(storedBasket);
      this.basketSubject.next([...this.basket]);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  addToBasket(product: Product, quantity: number = 1): void {
    const existingProduct = this.basket.find((item) => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.basket.push({ product, quantity });
    }

    this.updateLocalStorage();
    this.basketSubject.next([...this.basket]);
  }

  removeFromBasket(productId: number, quantity: number = 1): void {
    const existingProduct = this.basket.find((item) => item.product.id === productId);

    if (existingProduct) {
      if (existingProduct.quantity > quantity) {
        existingProduct.quantity -= quantity;
      } else {
        this.basket = this.basket.filter((item) => item.product.id !== productId);
      }
    }

    this.updateLocalStorage();
    this.basketSubject.next([...this.basket]);
  }

  clearBasket(): void {
    this.basket = [];
    localStorage.removeItem('basket');
    this.basketSubject.next([...this.basket]);
  }

  getBasket(): Observable<{ product: Product; quantity: number }[]> {
    return this.basket$;
  }

  getTotal(): number {
    return this.basket.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}
