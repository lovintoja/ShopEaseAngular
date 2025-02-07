import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminOrder } from '../models/admin-order.model';
import { AdminOrderSearchQuery } from '../models/admin-order-search-query.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderManagementService {
  private orderManagementUrl = environment.apiOrderManagement;

  constructor(private http: HttpClient) {}

  searchOrders(query: AdminOrderSearchQuery): Observable<AdminOrder[]> {
    let params = new HttpParams();

    if (query.userId) {
      params = params.append('userId', query.userId.toString());
    }
    if (query.startDate) {
      params = params.append('startDate', query.startDate.toISOString());
    }
    if (query.endDate) {
      params = params.append('endDate', query.endDate.toISOString());
    }
    if (query.status) {
      params = params.append('status', query.status);
    }
    if (query.paymentMethod) {
      params = params.append('paymentMethod', query.paymentMethod);
    }
    if (query.minTotalPrice) {
      params = params.append('minTotalPrice', query.minTotalPrice.toString());
    }
    if (query.maxTotalPrice) {
      params = params.append('maxTotalPrice', query.maxTotalPrice.toString());
    }

    return this.http.get<AdminOrder[]>(`${this.orderManagementUrl}/search`, { params });
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<AdminOrder> {
    const url = `${this.orderManagementUrl}/${orderId}/status`;
    return this.http.patch<AdminOrder>(url, { newStatus: newStatus });
  }
}