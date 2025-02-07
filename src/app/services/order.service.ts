

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { map, Observable } from 'rxjs';
  import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { environment } from '../environments/environment';
  
  @Injectable({
    providedIn: 'root'
  })
  export class OrderService {
    private apiUrl: string = environment.apiOrderUrl; 
    
    constructor(private http: HttpClient) {}
  
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
      }

    createOrder(order: Order): Observable<boolean> {
        return this.http.post<{ success: boolean }>(this.apiUrl, order).pipe(
            map((response) => response.success)
        )
    }
  }
  