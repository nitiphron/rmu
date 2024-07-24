import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = []; // เริ่มต้นด้วยรายการสินค้าในรถเข็นที่มีอยู่
  private qrCodeImage: string = ''; // เส้นทางภาพ QR code

  constructor(private http: HttpClient) {}

  getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${API_ENDPOINT}/api/cart/getAllcart`);
  }

  getByIdCart(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${API_ENDPOINT}/api/cart/getById?cartId=${cartId}`);
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${API_ENDPOINT}/api/cart/add`, cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINT}/api/cart/delete/${id}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINT}/api/cart/clear`);
  }

  setQrCodeImage(imagePath: string): void {
    this.qrCodeImage = imagePath;
  }

  getQrCodeImage(): Observable<string> {
    return of(this.qrCodeImage);
  }

  saveCart(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${API_ENDPOINT}/api/cart/save`, body, httpOptions);
  }
}
