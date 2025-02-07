import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BasketItem } from '../models/basketitem.model';
import { Product } from '../models/product.model';
import { environment } from '../environments/environment';
import { UpdateBasket } from '../models/update.basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketUrl: string = environment.apiBasketUrl;
  private basketSubject = new BehaviorSubject<BasketItem[]>([]);
  public basket$ = this.basketSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.initializeBasket();
    this.authService.loggedIn$.subscribe((loggedIn) => this.handleAuthChange(loggedIn));
  }

  private initializeBasket(): void {
    if (this.authService.isAuthenticated()) {
      this.loadBasketFromBackend();
    } else {
      this.basketSubject.next([]); // Empty basket for unauthenticated users
    }
  }

  private handleAuthChange(loggedIn: boolean): void {
    if (loggedIn) {
      // User logged in: load basket from backend
      this.loadBasketFromBackend();
    } else {
      // User logged out: clear the basket
      this.basketSubject.next([]);
    }
  }

  private loadBasketFromBackend(): void {
    this.http.get<{ items: BasketItem[] }>(this.basketUrl).subscribe({
      next: (response) => {
        this.basketSubject.next(response.items || []);
      },
      error: () => {
        this.basketSubject.next([]); // Fallback to empty basket on error
      },
    });
  }

  private syncBasket(basket: BasketItem[]): void {
    if (this.authService.isAuthenticated()) {
      const basketMapped: UpdateBasket = { 
        items: basket.map(item => {
        return {
          id: item.product.id, // Get the product ID
          quantity: item.quantity, // Get the quantity
        };
      })}
      
        this.http.put(this.basketUrl, basketMapped).subscribe({
        next: () => this.basketSubject.next(basket),
        error: () => this.basketSubject.next([]), // Fallback to empty basket on error
      });
    } else {
      // If not authenticated, clear the basket
      this.basketSubject.next([]);
    }
  }

  addToBasket(product: Product, quantity: number = 1): void {
    if (!this.authService.isAuthenticated()) {
      return; // Do nothing if not authenticated
    }

    const currentBasket = this.basketSubject.value;
    const existingItem = currentBasket.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentBasket.push({ product, quantity });
    }

    this.syncBasket(currentBasket);
  }

  removeFromBasket(productId: number, quantity: number = 1): void {
    if (!this.authService.isAuthenticated()) {
      return; // Do nothing if not authenticated
    }

    const currentBasket = this.basketSubject.value;
    const itemIndex = currentBasket.findIndex((item) => item.product.id === productId);

    if (itemIndex !== -1) {
      const item = currentBasket[itemIndex];
      item.quantity -= quantity;

      if (item.quantity <= 0) {
        currentBasket.splice(itemIndex, 1);
      }

      this.syncBasket(currentBasket);
    }
  }

  clearBasket(): void {
    if (this.authService.isAuthenticated()) {
      this.http.delete(this.basketUrl).subscribe({
        next: () => this.basketSubject.next([]),
        error: () => this.basketSubject.next([]), // Fallback to empty basket on error
      });
    } else {
      this.basketSubject.next([]);
    }
  }

  getBasket(): BasketItem[] {
    return this.basketSubject.value;
  }

  getTotal(): number {
    const basket = this.basketSubject.value;
    return basket.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getItemsAmount(): Observable<number> {
    const basket = this.basketSubject.value;
    return this.basket$.pipe(map((item, sum) => item.reduce((total, item) => total + item.quantity, 0)));
  }
}