import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductDto } from '../models/productdto.model'; // Define these models
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  private productManagementUrl: string = environment.apiProductManagementUrl

  constructor(private http: HttpClient, private productService: ProductService) {}

  getProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }

  addProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.productManagementUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productManagementUrl, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productManagementUrl}/${id}`);
  }
}