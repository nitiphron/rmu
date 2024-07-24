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

  // ฟังก์ชันในการเพิ่มรายการลงในรถเข็น
  addToCart(product: any): Observable<any> {
    const currentCart = this.cartSubject.value;
    currentCart.push(product);
    this.cartSubject.next(currentCart);
    // อาจเรียกใช้ API เพื่อลงบันทึกในเซิร์ฟเวอร์
    return this.http.post<any>(API_ENDPOINT.concat('/cart/add'), product, httpOptions);
  }

  // ฟังก์ชันในการอัปเดตปริมาณรายการในรถเข็น
  updateCartItem(item: any): Observable<any> {
    const body = JSON.stringify(item);
    return this.http.put<any>(API_ENDPOINT.concat('/cart/update/' + item.id), body, httpOptions);
  }

  // ฟังก์ชันในการลบรายการออกจากรถเข็น
  removeFromCart(productId: any): Observable<any> {
    const currentCart = this.cartSubject.value.filter(product => product.id !== productId);
    this.cartSubject.next(currentCart);
    // เรียกใช้ API เพื่อลบรายการ
    return this.http.delete<any>(API_ENDPOINT.concat('/cart/remove/' + productId));
  }

  // ฟังก์ชันในการเคลียร์รถเข็น
  clearCart(): Observable<any> {
    this.cartSubject.next([]);
    // เรียกใช้ API เพื่อล้างรถเข็น
    return this.http.delete<any>(API_ENDPOINT.concat('/cart/clear'));
  }

  // ฟังก์ชันในการดึงรายการในรถเข็น
  getCartItems(): Observable<any[]> {
    return this.cart$;
  }

  // ฟังก์ชันในการดึงข้อมูลทุกบทบาท
  getAllRole(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/role/getAll'));
  }

  // ฟังก์ชันในการบันทึกการลงทะเบียน
  saveRegister(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/register/save'), body, httpOptions);
  }

  // ฟังก์ชันในการตรวจสอบการเข้าสู่ระบบ
  authen(userName: any, password: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/login/authen?userName=' + userName + '&password=' + password));
  }

  // ฟังก์ชันในการอัปเดตข้อมูลโปรไฟล์
  updateProfile(data: any, userId: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/register/update/' + userId), body, httpOptions);
  }

  // ฟังก์ชันในการดึงข้อมูลผู้ใช้ตาม ID
  getByUserId(userId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/register/getById?userId=' + userId));
  }

  // ฟังก์ชันในการดึงข้อมูลผู้ใช้ทั้งหมด
  getAllUser(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/manage/user/getAllUser'));
  }

  // ฟังก์ชันในการลบผู้ใช้ตาม ID
  deleteUserByUserId(userId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/register/delete?userId=' + userId));
  }

  // ฟังก์ชันในการดึงภาพสินค้าโดย ID
  getProductImgByProductId(productId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getProductImgByProductId?productId=' + productId));
  }

  // ฟังก์ชันในการดึงภาพที่เป็น Blob
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

  // ฟังก์ชันในการดึงข้อมูลภาพเป็น Byte
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

  // ฟังก์ชันในการดึงข้อมูลสินค้าทั้งหมด
  getAllProduct(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getAll'));
  }

  // ฟังก์ชันในการดึงข้อมูลประเภทสินค้า
  getProductTypeAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getProductTypeAll'));
  }

  // ฟังก์ชันในการบันทึกภาพ
  saveImage(formData: FormData, productId: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.concat('/product/saveImage/' + productId), formData);
  }

  // ฟังก์ชันในการบันทึกสินค้า
  saveProduct(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/product/save'), body, httpOptions);
  }

  // ฟังก์ชันในการลบภาพตาม ID สินค้า
  removeImgByProductId(productId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/product/removeImgByProductId?productId=' + productId));
  }

  // ฟังก์ชันในการลบสินค้า
  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/product/delete?productId=' + productId));
  }

  // ฟังก์ชันในการดึงข้อมูลสินค้าตาม ID
  getProductByProductId(productId: any): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/product/getById?productId=' + productId));
  }

  // ฟังก์ชันในการอัปเดตข้อมูลสินค้า
  updateProduct(data: any, productId: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(API_ENDPOINT.concat('/product/update/' + productId), body, httpOptions);
  }

  // ฟังก์ชันในการลบภาพตามชื่อไฟล์
  deleteImage(fileName: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('/product/deleteImgByFileName?fileName=' + fileName));
  }

  // ฟังก์ชันในการบันทึกคำสั่งซื้อ
  saveOrder(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/order/save'), body, httpOptions);
  }

  // ฟังก์ชันในการดึงรายละเอียดคำสั่งซื้อตาม ID
  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.concat('/order/getById?orderId=' + orderId));
  }

  saveCart(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(API_ENDPOINT.concat('/api/cart/save'), body, httpOptions);
  }
}
