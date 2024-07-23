import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' }) };

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Existing methods...

  // Function to add item to cart
  addToCart(product: any): Observable<any> {
    const currentCart = this.cartSubject.value;
    currentCart.push(product);
    this.cartSubject.next(currentCart);
    // Optionally, call an API endpoint to save the cart on the backend
    return this.http.post<any>(API_ENDPOINT.concat('/cart/add'), product, httpOptions);
  }

  // Function to update cart item quantity
  updateCartItem(item: any): Observable<any> {
    const body = JSON.stringify(item);
    return this.http.put<any>(API_ENDPOINT.concat('/cart/update/' + item.id), body, httpOptions);
  }

  // Function to remove item from cart
  removeFromCart(productId: any): Observable<any> {
    const currentCart = this.cartSubject.value.filter(product => product.id !== productId);
    this.cartSubject.next(currentCart);
    // Call backend to remove item
    return this.http.delete<any>(API_ENDPOINT.concat('/cart/remove/' + productId));
  }

  // Function to clear cart
  clearCart(): Observable<any> {
    this.cartSubject.next([]);
    // Call backend to clear the cart
    return this.http.delete<any>(API_ENDPOINT.concat('/cart/clear'));
  }

  // Function to get cart items
  getCartItems(): Observable<any[]> {
    return this.cart$;
  }

  // Other existing methods
  getAllRole(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/role/getAll'));
  }

  saveRegister(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/register/save'), body, httpOptions);
  }

  authen(userName: any, password: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/login/authen?userName=' + userName + '&password=' + password));
  }

  updateProfile(data: any, userId: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/register/update/' + userId), body, httpOptions);
  }

  getByUserId(userId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/register/getById?userId=' + userId));
  }

  getAllUser(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/manage/user/getAllUser'));
  }

  deleteUserByUserId(userId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/register/delete?userId=' + userId));
  }

  getProductImgByProductId(productId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getProductImgByProductId?productId=' + productId));
  }

  getBlobThumbnail(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Blob>(
      API_ENDPOINT.concat('/product/getImageByte?fileName=' + fileName),
      { headers: headers, responseType: 'blob' as 'json' }
    );
  }

  getImageByte(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Blob>(
      API_ENDPOINT.concat('/product/getImageByte?fileName=' + fileName),
      { headers: headers, responseType: 'blob' as 'json' }
    );
  }

  getAllProduct(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getAll'));
  }

  getProductTypeAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getProductTypeAll'));
  }

  saveImage(formData: FormData, productId: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat('/product/saveImage/' + productId), formData);
  }

  saveProduct(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/product/save'), body, httpOptions);
  }

  removeImgByProductId(productId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/product/removeImgByProductId?productId=' + productId));
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/product/delete?productId=' + productId));
  }

  getProductByProductId(productId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getById?productId=' + productId));
  }

  updateProduct(data: any, productId: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/product/update/' + productId), body, httpOptions);
  }

  deleteImage(fileName: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/product/deleteImgByFileName?fileName=' + fileName));
  }

  saveOrder(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/order/save'), body, httpOptions);
  }
}
