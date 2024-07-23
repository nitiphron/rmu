import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' }) };
const httpOptionsMultipart = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'accept': '*/*' }) };
const httpOptionsText = { headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }) };

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(API_ENDPOINT.concat('/order/save'), body, httpOptions); // Adjust the API endpoint as per your backend implementation
  }

  addToCart(product: any): void {
    const currentCart = this.cartSubject.value;
    currentCart.push(product);
    this.cartSubject.next(currentCart);
  }

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  removeFromCart(productId: any): void {
    const currentCart = this.cartSubject.value.filter(product => product.id !== productId);
    this.cartSubject.next(currentCart);
  }

  // ฟังก์ชันล้างตะกร้า
  clearCart(): void {
    this.cartSubject.next([]);
  }

  // ฟังก์ชันเรียกดูรายการสินค้าในตะกร้า
  getCartItems(): Observable<any[]> {
    return this.cart$;
  }
}
