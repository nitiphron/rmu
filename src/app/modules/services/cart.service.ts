import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor(private http: HttpClient) { }

  // Example: Method to remove item from cart
  removeFromCart(productId: any): Observable<any> {
    return this.http.delete<any>(`/api/cart/${productId}`);
  }

  // Example: Method to clear cart
  clearCart(): Observable<any> {
    return this.http.delete<any>('/api/cart/clear');
  }

  // Example: Method to get cart items
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>('/api/cart/items');
  }
}
