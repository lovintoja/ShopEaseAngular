import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basket: Product[] = [];
  private basketSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.basket);

  // Observable for components to subscribe
  basket$: Observable<Product[]> = this.basketSubject.asObservable();

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
  
  addToBasket(product: Product): void {
    this.basket.push(product);
    this.updateLocalStorage();
    this.basketSubject.next([...this.basket]);
  }
  
  removeFromBasket(productId: number): void {
    this.basket = this.basket.filter((p) => p.id !== productId);
    this.updateLocalStorage();
    this.basketSubject.next([...this.basket]);
  }
  
  clearBasket(): void {
    this.basket = [];
    localStorage.removeItem('basket');
    this.basketSubject.next([...this.basket]);
  }
  

  getBasket(): Observable<Product[]> {
    return this.basket$;
  }
}
