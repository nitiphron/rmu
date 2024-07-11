// order-status.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // import ProductService ที่สร้างขึ้นมา

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'] // เชื่อมโยงไฟล์ CSS ที่นี่
})
export class OrderStatusComponent implements OnInit {
  orderStatus: string = '';
  orderDetails: any = {}; // เพิ่ม property สำหรับเก็บข้อมูลรายละเอียดคำสั่งซื้อ
  cartItems: any[] = []; // เพิ่ม property สำหรับเก็บรายการสินค้าในตระกล้า

  constructor(
    private router: Router,
    private productService: ProductService // เพิ่ม ProductService เข้ามาใน constructor
  ) {}

  ngOnInit(): void {
    // ดึงข้อมูลสินค้าจากตระกล้า
    this.productService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });

    // ตั้งค่า order status แบบ hard-coded สำหรับตัวอย่าง
    this.orderStatus = 'คำสั่งซื้อของคุณได้รับการยืนยันแล้ว';

    // ตั้งค่า order details แบบ hard-coded เพื่อตัวอย่าง
    this.orderDetails = {
      orderId: '123456',
      orderDate: new Date(),
      totalItems: this.cartItems.length, // จำนวนสินค้าทั้งหมดในตระกล้า
      totalPrice: this.calculateTotalPrice(), // ราคารวมของสินค้าทั้งหมด
      shippingAddress: '123 Street, City, Country'
      // สามารถเพิ่มข้อมูลเพิ่มเติมตามที่ต้องการ
    };
  }

  // ฟังก์ชันสำหรับคำนวณราคารวมของสินค้าทั้งหมด
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price;
    }
    return totalPrice;
  }

  navigateToDashbordAdmin(): void {
    this.router.navigate(['/dashbord-admin']); // แก้ไขชื่อ path ตามที่คุณต้องการ
  }
}
