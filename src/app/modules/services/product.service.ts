// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'api/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Example method to fetch products (replace with your actual method)
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Example method to fetch cart items (replace with your actual method)
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>('api/cart'); // Replace with your cart API endpoint
  }
}
